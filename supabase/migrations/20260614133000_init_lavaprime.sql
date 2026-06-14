create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(coalesce(new.email, ''), '@', 1))
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.profiles.full_name),
      updated_at = timezone('utc', now());

  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active' check (status in ('trial', 'active', 'suspended', 'archived')),
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'admin', 'manager', 'operator', 'finance', 'viewer')),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, user_id)
);

create table if not exists public.business_profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations (id) on delete cascade,
  legal_name text,
  trade_name text,
  cnpj text,
  email text,
  phone text,
  whatsapp text,
  address jsonb not null default '{}'::jsonb,
  report_preferences jsonb not null default '{}'::jsonb,
  logo_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.business_bank_accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  bank_name text not null,
  account_holder text,
  account_type text,
  branch_code text,
  account_number text,
  pix_enabled boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.business_pix_keys (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  key_type text not null,
  key_value text not null,
  is_primary boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  method_type text not null,
  enabled boolean not null default true,
  settlement_days integer not null default 0,
  fee_fixed numeric(12, 2) not null default 0,
  fee_percent numeric(6, 3) not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, name)
);

create table if not exists public.finance_settings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations (id) on delete cascade,
  allow_manual_inventory boolean not null default false,
  allow_negative_stock boolean not null default false,
  allow_product_sale_without_stock boolean not null default false,
  default_due_days integer not null default 7,
  cashflow_categories jsonb not null default '[]'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  channel text not null,
  label text,
  value text,
  report_visibility text not null default 'all',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, channel)
);

create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  template_key text not null,
  category text not null,
  title text not null,
  body text not null,
  enabled boolean not null default true,
  variables jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, template_key)
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_code text,
  name text not null,
  document text,
  phone text,
  email text,
  notes text,
  tags text[] not null default '{}',
  is_active boolean not null default true,
  billing_preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_id uuid references public.clients (id) on delete set null,
  plate text not null,
  brand text,
  model text,
  model_year integer,
  manufacture_year integer,
  color text,
  vehicle_type text,
  category text,
  chassis text,
  notes text,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (organization_id, plate)
);

create table if not exists public.vehicle_owner_history (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  client_id uuid references public.clients (id) on delete set null,
  relationship_type text not null default 'owner',
  started_at date not null default current_date,
  ended_at date,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.operators (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  profile_id uuid references public.profiles (id) on delete set null,
  name text not null,
  role text not null default 'operator',
  email text,
  phone text,
  commission_percent numeric(5, 2) not null default 0,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  service_code text,
  name text not null,
  description text,
  price numeric(12, 2) not null default 0,
  duration_minutes integer not null default 0,
  vehicle_type text,
  vehicle_category text,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.supplies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  sku text,
  name text not null,
  unit text not null default 'un',
  stock numeric(12, 3) not null default 0,
  min_stock numeric(12, 3) not null default 0,
  cost numeric(12, 2) not null default 0,
  risk_tags text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  sku text,
  name text not null,
  unit text not null default 'un',
  stock numeric(12, 3) not null default 0,
  min_stock numeric(12, 3) not null default 0,
  cost numeric(12, 2) not null default 0,
  price numeric(12, 2) not null default 0,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.service_supply_profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  service_id uuid not null references public.services (id) on delete cascade,
  name text not null,
  notes text,
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  inventory_kind text not null check (inventory_kind in ('supply', 'product')),
  supply_id uuid references public.supplies (id) on delete set null,
  product_id uuid references public.products (id) on delete set null,
  movement_type text not null,
  quantity numeric(12, 3) not null,
  unit text,
  previous_stock numeric(12, 3),
  current_stock numeric(12, 3),
  reason text,
  source_code text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (
    (inventory_kind = 'supply' and supply_id is not null and product_id is null)
    or
    (inventory_kind = 'product' and product_id is not null and supply_id is null)
  )
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_id uuid references public.clients (id) on delete set null,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  status text not null default 'draft',
  reference text,
  valid_until date,
  subtotal numeric(12, 2) not null default 0,
  discount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  notes text,
  approved_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.quote_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  quote_id uuid not null references public.quotes (id) on delete cascade,
  line_order integer not null default 1,
  item_type text not null default 'service',
  service_id uuid references public.services (id) on delete set null,
  product_id uuid references public.products (id) on delete set null,
  description text not null,
  quantity numeric(12, 3) not null default 1,
  unit_price numeric(12, 2) not null default 0,
  discount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.attendances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_id uuid references public.clients (id) on delete set null,
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  operator_id uuid references public.operators (id) on delete set null,
  status text not null default 'scheduled',
  scheduled_for timestamptz,
  checked_in_at timestamptz,
  ready_at timestamptz,
  delivered_at timestamptz,
  payment_status text not null default 'pending',
  payment_method text,
  subtotal numeric(12, 2) not null default 0,
  products_total numeric(12, 2) not null default 0,
  extra_charges numeric(12, 2) not null default 0,
  discount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  notes text,
  checklist jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.attendance_services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  attendance_id uuid not null references public.attendances (id) on delete cascade,
  service_id uuid references public.services (id) on delete set null,
  service_name text not null,
  quantity numeric(12, 3) not null default 1,
  unit_price numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.product_sales (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  attendance_id uuid references public.attendances (id) on delete set null,
  client_id uuid references public.clients (id) on delete set null,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  status text not null default 'completed',
  subtotal numeric(12, 2) not null default 0,
  discount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  payment_method text,
  sold_at timestamptz not null default timezone('utc', now()),
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.product_sale_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  product_sale_id uuid not null references public.product_sales (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  sku text,
  name text not null,
  quantity numeric(12, 3) not null default 1,
  unit_price numeric(12, 2) not null default 0,
  discount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.open_payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  attendance_id uuid references public.attendances (id) on delete set null,
  client_id uuid references public.clients (id) on delete set null,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  status text not null default 'open',
  description text not null,
  amount numeric(12, 2) not null default 0,
  paid_amount numeric(12, 2) not null default 0,
  balance_amount numeric(12, 2) not null default 0,
  due_date date,
  reminder_frequency text not null default 'daily',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  client_id uuid references public.clients (id) on delete set null,
  attendance_id uuid references public.attendances (id) on delete set null,
  status text not null default 'open',
  invoice_number text,
  issue_date date not null default current_date,
  due_date date,
  subtotal numeric(12, 2) not null default 0,
  discount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  paid_amount numeric(12, 2) not null default 0,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.invoice_line_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  invoice_id uuid not null references public.invoices (id) on delete cascade,
  attendance_id uuid references public.attendances (id) on delete set null,
  client_id uuid references public.clients (id) on delete set null,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  description text not null,
  service_name text,
  quantity numeric(12, 3) not null default 1,
  unit_price numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  operator_name text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.cash_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  attendance_id uuid references public.attendances (id) on delete set null,
  invoice_id uuid references public.invoices (id) on delete set null,
  kind text not null default 'income',
  category text,
  cost_center text,
  description text not null,
  method text,
  status text not null default 'confirmed',
  amount numeric(12, 2) not null default 0,
  entry_date date not null default current_date,
  due_date date,
  paid_at timestamptz,
  attachment_path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payable_accounts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  supplier_name text not null,
  description text not null,
  amount numeric(12, 2) not null default 0,
  due_date date,
  status text not null default 'open',
  category text,
  payment_method text,
  paid_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vehicle_special_care (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  care_type text not null,
  attention_level text not null default 'info',
  source text,
  restrictions text[] not null default '{}',
  recommendations text[] not null default '{}',
  notes text,
  active boolean not null default true,
  last_acknowledged_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.vehicle_special_care_history (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  vehicle_special_care_id uuid not null references public.vehicle_special_care (id) on delete cascade,
  action text not null,
  notes text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.document_history (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  related_entity_type text not null,
  related_entity_id uuid,
  document_type text not null,
  file_name text not null,
  file_path text,
  template_reference text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_org_memberships_org_user on public.organization_memberships (organization_id, user_id);
create index if not exists idx_clients_org_name on public.clients (organization_id, name);
create index if not exists idx_vehicles_org_plate on public.vehicles (organization_id, plate);
create index if not exists idx_quotes_org_status on public.quotes (organization_id, status);
create index if not exists idx_attendances_org_status on public.attendances (organization_id, status);
create index if not exists idx_open_payments_org_due_date on public.open_payments (organization_id, due_date);
create index if not exists idx_invoices_org_due_date on public.invoices (organization_id, due_date);
create index if not exists idx_cash_entries_org_entry_date on public.cash_entries (organization_id, entry_date);
create index if not exists idx_inventory_movements_org_created_at on public.inventory_movements (organization_id, created_at desc);
create index if not exists idx_vehicle_special_care_org_vehicle on public.vehicle_special_care (organization_id, vehicle_id);

create or replace function public.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_memberships membership
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
      and membership.is_active = true
  );
$$;

create or replace function public.is_org_admin(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_memberships membership
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
      and membership.is_active = true
      and membership.role in ('owner', 'admin', 'manager')
  );
$$;

create or replace function public.bootstrap_organization(
  organization_name text,
  organization_slug text,
  owner_display_name text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_organization_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Usuario autenticado obrigatorio para criar organizacao.';
  end if;

  insert into public.organizations (name, slug)
  values (organization_name, lower(organization_slug))
  returning id into new_organization_id;

  insert into public.organization_memberships (organization_id, user_id, role, is_active)
  values (new_organization_id, auth.uid(), 'owner', true);

  update public.profiles
  set full_name = coalesce(owner_display_name, full_name),
      updated_at = timezone('utc', now())
  where id = auth.uid();

  insert into public.business_profiles (organization_id, trade_name)
  values (new_organization_id, organization_name);

  insert into public.finance_settings (organization_id)
  values (new_organization_id);

  insert into public.payment_methods (organization_id, name, method_type, enabled)
  values
    (new_organization_id, 'Pix', 'instantaneo', true),
    (new_organization_id, 'Dinheiro', 'dinheiro', true),
    (new_organization_id, 'Cartao de credito', 'cartao', true),
    (new_organization_id, 'Cartao de debito', 'cartao', true),
    (new_organization_id, 'Transferencia', 'transferencia', true),
    (new_organization_id, 'Faturado', 'faturado', true);

  return new_organization_id;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

insert into public.profiles (id, email, full_name)
select
  users.id,
  users.email,
  coalesce(users.raw_user_meta_data ->> 'full_name', users.raw_user_meta_data ->> 'name', split_part(coalesce(users.email, ''), '@', 1))
from auth.users as users
on conflict (id) do nothing;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'organizations',
    'organization_memberships',
    'business_profiles',
    'business_bank_accounts',
    'business_pix_keys',
    'payment_methods',
    'finance_settings',
    'social_links',
    'message_templates',
    'clients',
    'vehicles',
    'vehicle_owner_history',
    'operators',
    'services',
    'supplies',
    'products',
    'service_supply_profiles',
    'inventory_movements',
    'quotes',
    'quote_items',
    'attendances',
    'attendance_services',
    'product_sales',
    'product_sale_items',
    'open_payments',
    'invoices',
    'invoice_line_items',
    'cash_entries',
    'payable_accounts',
    'vehicle_special_care',
    'vehicle_special_care_history',
    'document_history'
  ]
  loop
    execute format('drop trigger if exists set_%1$s_updated_at on public.%1$I;', table_name);
    execute format('create trigger set_%1$s_updated_at before update on public.%1$I for each row execute function public.set_updated_at();', table_name);
  end loop;
end;
$$;

revoke all on all tables in schema public from anon;
revoke all on all tables in schema public from public;
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;

alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke all on tables from public;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;

grant execute on function public.bootstrap_organization(text, text, text) to authenticated;

alter table public.profiles enable row level security;
drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own" on public.profiles
  for select to authenticated
  using (id = auth.uid());
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

alter table public.organizations enable row level security;
drop policy if exists "organizations select member" on public.organizations;
create policy "organizations select member" on public.organizations
  for select to authenticated
  using (public.is_org_member(id));
drop policy if exists "organizations update admin" on public.organizations;
create policy "organizations update admin" on public.organizations
  for update to authenticated
  using (public.is_org_admin(id))
  with check (public.is_org_admin(id));
drop policy if exists "organizations delete admin" on public.organizations;
create policy "organizations delete admin" on public.organizations
  for delete to authenticated
  using (public.is_org_admin(id));

alter table public.organization_memberships enable row level security;
drop policy if exists "memberships select self or admin" on public.organization_memberships;
create policy "memberships select self or admin" on public.organization_memberships
  for select to authenticated
  using (user_id = auth.uid() or public.is_org_admin(organization_id));
drop policy if exists "memberships insert admin" on public.organization_memberships;
create policy "memberships insert admin" on public.organization_memberships
  for insert to authenticated
  with check (public.is_org_admin(organization_id));
drop policy if exists "memberships update admin" on public.organization_memberships;
create policy "memberships update admin" on public.organization_memberships
  for update to authenticated
  using (public.is_org_admin(organization_id))
  with check (public.is_org_admin(organization_id));
drop policy if exists "memberships delete admin" on public.organization_memberships;
create policy "memberships delete admin" on public.organization_memberships
  for delete to authenticated
  using (public.is_org_admin(organization_id));

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'business_profiles',
    'business_bank_accounts',
    'business_pix_keys',
    'payment_methods',
    'finance_settings',
    'social_links',
    'message_templates',
    'operators',
    'services',
    'supplies',
    'products',
    'service_supply_profiles'
  ]
  loop
    execute format('alter table public.%1$I enable row level security;', table_name);
    execute format('drop policy if exists "%1$s select member" on public.%1$I;', table_name);
    execute format(
      'create policy "%1$s select member" on public.%1$I for select to authenticated using (public.is_org_member(organization_id));',
      table_name
    );
    execute format('drop policy if exists "%1$s insert admin" on public.%1$I;', table_name);
    execute format(
      'create policy "%1$s insert admin" on public.%1$I for insert to authenticated with check (public.is_org_admin(organization_id));',
      table_name
    );
    execute format('drop policy if exists "%1$s update admin" on public.%1$I;', table_name);
    execute format(
      'create policy "%1$s update admin" on public.%1$I for update to authenticated using (public.is_org_admin(organization_id)) with check (public.is_org_admin(organization_id));',
      table_name
    );
    execute format('drop policy if exists "%1$s delete admin" on public.%1$I;', table_name);
    execute format(
      'create policy "%1$s delete admin" on public.%1$I for delete to authenticated using (public.is_org_admin(organization_id));',
      table_name
    );
  end loop;
end;
$$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'clients',
    'vehicles',
    'vehicle_owner_history',
    'inventory_movements',
    'quotes',
    'quote_items',
    'attendances',
    'attendance_services',
    'product_sales',
    'product_sale_items',
    'open_payments',
    'invoices',
    'invoice_line_items',
    'cash_entries',
    'payable_accounts',
    'vehicle_special_care',
    'vehicle_special_care_history',
    'document_history'
  ]
  loop
    execute format('alter table public.%1$I enable row level security;', table_name);
    execute format('drop policy if exists "%1$s select member" on public.%1$I;', table_name);
    execute format(
      'create policy "%1$s select member" on public.%1$I for select to authenticated using (public.is_org_member(organization_id));',
      table_name
    );
    execute format('drop policy if exists "%1$s insert member" on public.%1$I;', table_name);
    execute format(
      'create policy "%1$s insert member" on public.%1$I for insert to authenticated with check (public.is_org_member(organization_id));',
      table_name
    );
    execute format('drop policy if exists "%1$s update member" on public.%1$I;', table_name);
    execute format(
      'create policy "%1$s update member" on public.%1$I for update to authenticated using (public.is_org_member(organization_id)) with check (public.is_org_member(organization_id));',
      table_name
    );
    execute format('drop policy if exists "%1$s delete admin" on public.%1$I;', table_name);
    execute format(
      'create policy "%1$s delete admin" on public.%1$I for delete to authenticated using (public.is_org_admin(organization_id));',
      table_name
    );
  end loop;
end;
$$;
