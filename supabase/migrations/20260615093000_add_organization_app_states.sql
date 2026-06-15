create table if not exists public.organization_app_states (
  organization_id uuid primary key references public.organizations (id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  state_version integer not null default 1,
  last_synced_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists set_organization_app_states_updated_at on public.organization_app_states;
create trigger set_organization_app_states_updated_at
before update on public.organization_app_states
for each row execute function public.set_updated_at();

grant select, insert, update, delete on public.organization_app_states to authenticated;

alter table public.organization_app_states enable row level security;

drop policy if exists "organization_app_states select member" on public.organization_app_states;
create policy "organization_app_states select member" on public.organization_app_states
  for select to authenticated
  using (public.is_org_member(organization_id));

drop policy if exists "organization_app_states insert member" on public.organization_app_states;
create policy "organization_app_states insert member" on public.organization_app_states
  for insert to authenticated
  with check (public.is_org_member(organization_id));

drop policy if exists "organization_app_states update member" on public.organization_app_states;
create policy "organization_app_states update member" on public.organization_app_states
  for update to authenticated
  using (public.is_org_member(organization_id))
  with check (public.is_org_member(organization_id));

drop policy if exists "organization_app_states delete admin" on public.organization_app_states;
create policy "organization_app_states delete admin" on public.organization_app_states
  for delete to authenticated
  using (public.is_org_admin(organization_id));
