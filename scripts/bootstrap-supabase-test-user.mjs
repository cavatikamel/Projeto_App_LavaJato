import { createClient } from "@supabase/supabase-js";

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || "teste@lavaprime.app";
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || "Teste@123456";
const TEST_USER_FULL_NAME = process.env.TEST_USER_FULL_NAME || "Teste";
const TEST_ORGANIZATION_NAME = process.env.TEST_ORGANIZATION_NAME || "LavaPrime Teste";
const TEST_ORGANIZATION_SLUG = process.env.TEST_ORGANIZATION_SLUG || "lavaprime-teste";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ||
  (process.env.SUPABASE_PROJECT_REF ? `https://${process.env.SUPABASE_PROJECT_REF}.supabase.co` : "");
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const organizationScopedTablesToClear = [
  "vehicle_special_care_history",
  "vehicle_special_care",
  "document_history",
  "product_sale_items",
  "product_sales",
  "attendance_services",
  "attendances",
  "quote_items",
  "quotes",
  "inventory_movements",
  "service_supply_profiles",
  "invoice_line_items",
  "invoices",
  "open_payments",
  "cash_entries",
  "payable_accounts",
  "vehicle_owner_history",
  "vehicles",
  "clients",
  "products",
  "supplies",
  "services",
  "operators",
  "message_templates",
  "social_links",
  "payment_methods",
  "business_pix_keys",
  "business_bank_accounts",
  "business_profiles",
  "finance_settings",
  "organization_app_states"
];

function ensureServerConfig() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Defina VITE_SUPABASE_URL ou SUPABASE_PROJECT_REF, além de SUPABASE_SERVICE_ROLE_KEY, para executar o bootstrap."
    );
  }
}

function createEmptyAppState(displayName, email) {
  return {
    billingClients: [],
    billingInvoices: [],
    invoiceLineItems: [],
    patioVehicles: [],
    quoteEstimates: [],
    clientRegistry: [],
    vehicleRegistry: [],
    adminOperators: [
      {
        id: 1,
        name: displayName,
        cpf: "",
        phone: "",
        accessProfile: "Administrador",
        username: email,
        password: "",
        commissionType: "fixed",
        commissionValue: 0,
        role: "Administrador",
        shift: "A definir",
        today: 0,
        status: "Ativo",
        accessHistory: [],
        production: []
      }
    ],
    serviceCatalog: [],
    productCatalog: [],
    supplyCatalog: [],
    productSales: [],
    inventoryMovements: [],
    serviceSupplyProfiles: [],
    documentHistory: [],
    cashEntries: [],
    vehicleSpecialCareRecords: [],
    openPayments: [],
    payableAccounts: [],
    businessProfile: {
      tradeName: "",
      legalName: "",
      cnpj: "",
      phone: "",
      email,
      whatsapp: "",
      logoDataUrl: ""
    },
    businessBankAccounts: [],
    businessPixInfo: {},
    businessPaymentMethods: [],
    businessFinanceSettings: {},
    businessSocialLinks: {},
    businessMessageTemplates: []
  };
}

async function findUserByEmail(client, email) {
  const { data, error } = await client.auth.admin.listUsers();
  if (error) throw error;
  return data.users.find((user) => user.email?.toLowerCase() === email.toLowerCase()) || null;
}

async function ensureTestUser(client) {
  const existingUser = await findUserByEmail(client, TEST_USER_EMAIL);
  if (existingUser) return existingUser;

  const { data, error } = await client.auth.admin.createUser({
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
    email_confirm: true,
    user_metadata: {
      full_name: TEST_USER_FULL_NAME,
      name: TEST_USER_FULL_NAME
    }
  });

  if (error) throw error;
  return data.user;
}

async function ensureOrganization(client) {
  const { data, error } = await client
    .from("organizations")
    .select("id, name, slug")
    .eq("slug", TEST_ORGANIZATION_SLUG)
    .limit(1);

  if (error) throw error;
  if (data?.[0]) return data[0];

  const { data: created, error: insertError } = await client
    .from("organizations")
    .insert({
      name: TEST_ORGANIZATION_NAME,
      slug: TEST_ORGANIZATION_SLUG,
      status: "active",
      settings: {}
    })
    .select("id, name, slug")
    .limit(1);

  if (insertError) throw insertError;
  return created?.[0];
}

async function ensureProfile(client, user) {
  const { error } = await client.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      full_name: TEST_USER_FULL_NAME,
      updated_at: new Date().toISOString()
    },
    { onConflict: "id" }
  );

  if (error) throw error;
}

async function clearOrganizationData(client, organizationId) {
  for (const tableName of organizationScopedTablesToClear) {
    const { error } = await client.from(tableName).delete().eq("organization_id", organizationId);
    if (error) throw new Error(`Falha ao limpar ${tableName}: ${error.message}`);
  }
}

async function seedOrganizationConfig(client, organizationId) {
  const { error: profileError } = await client.from("business_profiles").upsert(
    {
      organization_id: organizationId,
      email: TEST_USER_EMAIL,
      trade_name: "",
      legal_name: "",
      cnpj: "",
      phone: "",
      whatsapp: "",
      address: {},
      report_preferences: {},
      logo_path: null,
      updated_at: new Date().toISOString()
    },
    { onConflict: "organization_id" }
  );
  if (profileError) throw profileError;

  const { error: financeError } = await client.from("finance_settings").upsert(
    {
      organization_id: organizationId,
      allow_manual_inventory: false,
      allow_negative_stock: false,
      allow_product_sale_without_stock: false,
      default_due_days: 7,
      cashflow_categories: [],
      metadata: {},
      updated_at: new Date().toISOString()
    },
    { onConflict: "organization_id" }
  );
  if (financeError) throw financeError;

  const defaultPaymentMethods = [
    { name: "Pix", method_type: "instantaneo" },
    { name: "Dinheiro", method_type: "dinheiro" },
    { name: "Cartão de crédito", method_type: "cartao" },
    { name: "Cartão de débito", method_type: "cartao" },
    { name: "Transferência", method_type: "transferencia" },
    { name: "Faturado", method_type: "faturado" }
  ];

  const { error: paymentsError } = await client.from("payment_methods").upsert(
    defaultPaymentMethods.map((method) => ({
      organization_id: organizationId,
      name: method.name,
      method_type: method.method_type,
      enabled: true,
      settlement_days: 0,
      fee_fixed: 0,
      fee_percent: 0,
      metadata: {},
      updated_at: new Date().toISOString()
    })),
    { onConflict: "organization_id,name" }
  );

  if (paymentsError) throw paymentsError;
}

async function ensureMembership(client, organizationId, userId) {
  const { error } = await client.from("organization_memberships").upsert(
    {
      organization_id: organizationId,
      user_id: userId,
      role: "owner",
      is_active: true,
      updated_at: new Date().toISOString()
    },
    { onConflict: "organization_id,user_id" }
  );

  if (error) throw error;
}

async function seedEmptyAppState(client, organizationId, userId) {
  const { error } = await client.from("organization_app_states").upsert(
    {
      organization_id: organizationId,
      state: createEmptyAppState(TEST_USER_FULL_NAME, TEST_USER_EMAIL),
      state_version: 1,
      last_synced_by: userId,
      updated_at: new Date().toISOString()
    },
    { onConflict: "organization_id" }
  );

  if (error) throw error;
}

async function main() {
  ensureServerConfig();

  const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const user = await ensureTestUser(client);
  const organization = await ensureOrganization(client);

  await ensureProfile(client, user);
  await ensureMembership(client, organization.id, user.id);
  await clearOrganizationData(client, organization.id);
  await seedOrganizationConfig(client, organization.id);
  await seedEmptyAppState(client, organization.id, user.id);

  console.log(
    JSON.stringify(
      {
        organizationId: organization.id,
        organizationSlug: organization.slug,
        userEmail: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
        userId: user.id
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
