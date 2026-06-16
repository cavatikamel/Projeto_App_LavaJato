import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || "";
const adminRoles = new Set(["owner", "admin", "manager", "finance"]);

let browserClient = null;

function isMissingSupabaseSessionError(error) {
  const name = String(error?.name || "").trim();
  const code = String(error?.code || "").trim();
  const message = String(error?.message || "").trim();
  return (
    name === "AuthSessionMissingError" ||
    code === "session_not_found" ||
    message.toLowerCase().includes("auth session missing")
  );
}

function ensureSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase não configurado no navegador.");
  }
}

function getDisplayName(profile, user) {
  return (
    profile?.full_name?.trim() ||
    user?.user_metadata?.full_name?.trim() ||
    user?.user_metadata?.name?.trim() ||
    user?.email?.split("@")[0] ||
    "Usuário LavaPrime"
  );
}

export function hasSupabaseBrowserConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function isSupabaseAdminRole(role) {
  return adminRoles.has(String(role || "").trim().toLowerCase());
}

export function getSupabaseBrowserClient() {
  ensureSupabaseConfig();

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true
      }
    });
  }

  return browserClient;
}

async function fetchSingleRow(query, missingMessage) {
  const { data, error } = await query.limit(1);
  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : null;
  if (!row && missingMessage) throw new Error(missingMessage);
  return row || null;
}

export async function getLavaprimeSessionContext() {
  if (!hasSupabaseBrowserConfig()) return null;

  const client = getSupabaseBrowserClient();
  const {
    data: { user },
    error: userError
  } = await client.auth.getUser();

  if (userError) {
    if (isMissingSupabaseSessionError(userError)) return null;
    throw userError;
  }
  if (!user) return null;

  const membership = await fetchSingleRow(
    client
      .from("organization_memberships")
      .select("organization_id, role, is_active, created_at")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: true }),
    "Nenhuma organização ativa foi encontrada para este usuário."
  );

  const organization = await fetchSingleRow(
    client.from("organizations").select("id, name, slug, status").eq("id", membership.organization_id),
    "A organização vinculada ao usuário não foi encontrada."
  );

  const profile = await fetchSingleRow(client.from("profiles").select("id, email, full_name").eq("id", user.id));

  return {
    client,
    displayName: getDisplayName(profile, user),
    membership,
    organization,
    profile,
    user
  };
}

export async function signInLavaprime(credentials) {
  const client = getSupabaseBrowserClient();
  const { error } = await client.auth.signInWithPassword(credentials);
  if (error) throw error;
  return getLavaprimeSessionContext();
}

export async function signOutLavaprime() {
  if (!hasSupabaseBrowserConfig()) return;

  const client = getSupabaseBrowserClient();
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export async function fetchOrganizationAppState(organizationId) {
  const client = getSupabaseBrowserClient();
  return fetchSingleRow(
    client
      .from("organization_app_states")
      .select("organization_id, state, state_version, updated_at")
      .eq("organization_id", organizationId)
  );
}

export async function upsertOrganizationAppState({ organizationId, state, stateVersion = 1, userId }) {
  const client = getSupabaseBrowserClient();
  const payload = {
    organization_id: organizationId,
    state,
    state_version: stateVersion,
    last_synced_by: userId,
    updated_at: new Date().toISOString()
  };
  const { error } = await client.from("organization_app_states").upsert(payload, { onConflict: "organization_id" });
  if (error) throw error;
}

async function selectOrganizationRows(table, columns, organizationId, options = {}) {
  const client = getSupabaseBrowserClient();
  let query = client.from(table).select(columns).eq("organization_id", organizationId);
  if (options.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? true });
  }
  const { data, error } = await query;
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function fetchOrganizationRelationalDataset(organizationId) {
  if (!organizationId) return null;

  const [
    clients,
    vehicles,
    operators,
    services,
    supplies,
    products,
    serviceSupplyProfiles,
    vehicleSpecialCare
  ] = await Promise.all([
    selectOrganizationRows(
      "clients",
      "id, organization_id, client_code, name, document, phone, email, notes, tags, is_active, billing_preferences, created_at, updated_at, metadata",
      organizationId
    ),
    selectOrganizationRows(
      "vehicles",
      "id, organization_id, client_id, plate, brand, model, model_year, manufacture_year, color, vehicle_type, category, chassis, notes, is_active, metadata, created_at, updated_at",
      organizationId
    ),
    selectOrganizationRows(
      "operators",
      "id, organization_id, profile_id, name, role, email, phone, commission_percent, status, metadata, created_at, updated_at",
      organizationId
    ),
    selectOrganizationRows(
      "services",
      "id, organization_id, service_code, name, description, price, duration_minutes, vehicle_type, vehicle_category, is_active, metadata, created_at, updated_at",
      organizationId
    ),
    selectOrganizationRows(
      "supplies",
      "id, organization_id, sku, name, unit, stock, min_stock, cost, risk_tags, metadata, created_at, updated_at",
      organizationId
    ),
    selectOrganizationRows(
      "products",
      "id, organization_id, sku, name, unit, stock, min_stock, cost, price, is_active, metadata, created_at, updated_at",
      organizationId
    ),
    selectOrganizationRows(
      "service_supply_profiles",
      "id, organization_id, service_id, name, notes, items, created_at, updated_at",
      organizationId
    ),
    selectOrganizationRows(
      "vehicle_special_care",
      "id, organization_id, vehicle_id, care_type, attention_level, source, restrictions, recommendations, notes, active, last_acknowledged_at, metadata, created_at, updated_at",
      organizationId
    )
  ]);

  return {
    clients,
    vehicles,
    operators,
    services,
    supplies,
    products,
    serviceSupplyProfiles,
    vehicleSpecialCare
  };
}

export async function upsertOrganizationRows(table, rows, options = {}) {
  if (!Array.isArray(rows) || !rows.length) return [];

  const client = getSupabaseBrowserClient();
  let query = client.from(table).upsert(rows, { onConflict: options.onConflict || "id" }).select();

  if (options.orderBy) {
    query = query.order(options.orderBy, { ascending: options.ascending ?? true });
  }

  const { data, error } = await query;
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}
