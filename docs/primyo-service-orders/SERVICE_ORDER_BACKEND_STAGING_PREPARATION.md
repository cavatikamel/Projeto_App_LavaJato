# Service Order Backend Staging Preparation

## Objetivo

Documentar o que precisa existir antes de qualquer backend staging real para `Service Order shadow write`, sem acessar Supabase e sem criar `.env`.

## Situacao atual

- Supabase continua fechado;
- `READY_FOR_STAGING_SHADOW_WRITE = false`;
- `readyForSupabaseWrite = false`;
- `.env.example` existe apenas como referencia de nomes;
- nenhuma credencial real foi auditada;
- nenhuma migration real foi criada.

## Variaveis esperadas por ambiente

Frontend publicas:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Server-side administrativas:

- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_SERVICE_ROLE_KEY`

## Diferenca entre `anon key` e `service role`

### `VITE_SUPABASE_ANON_KEY`

- chave publica destinada ao cliente;
- pode ser exposta no frontend;
- deve operar somente dentro das politicas `RLS` aprovadas;
- deve ser separada entre staging e producao.

### `SUPABASE_SERVICE_ROLE_KEY`

- chave administrativa com privilegios elevados;
- nunca pode ficar no app web;
- nunca pode ser publicada em bundle, `.env` cliente ou painel visivel ao frontend;
- deve ficar restrita a backend seguro, job controlado ou ferramenta administrativa fechada.

## O que precisa existir antes do backend staging

1. projeto Supabase de staging separado do de producao;
2. anon key propria de staging;
3. service role propria de staging, mantida fora do frontend;
4. migration SQL aprovada para `service_orders` e tabelas relacionadas;
5. desenho de `RLS` aprovado;
6. isolamento por tenant/organizacao definido;
7. estrategia de rollback da migration e do write;
8. observabilidade de write, erro e comparacao legado x OS;
9. politica de seed/dataset staging sem confundir base demo com base real.

## Migracoes necessarias antes do write

Continuam apenas como desenho:

- `service_orders`
- `service_order_customer_snapshots`
- `service_order_vehicle_snapshots`
- `service_order_items`
- `service_order_payments`
- `service_order_documents`
- `service_order_events`
- `service_order_totals`
- `service_order_audit`
- `service_order_legacy_references`

## RLS e tenant isolation necessarios

Antes de qualquer `shadow write` real:

- cada registro deve carregar fronteira clara de tenant/organizacao;
- leituras e escritas devem ser limitadas ao tenant correto;
- o frontend deve operar apenas com credenciais publicas e politicas restritas;
- qualquer write privilegiado deve sair do frontend e entrar em backend controlado.

## Rollback minimo exigido

1. rollback de migration aprovado;
2. rollback de configuracao de ambiente;
3. rollback de branch/deploy de staging;
4. rollback de shadow write limitado;
5. criterio claro para abortar promocao a producao.

## Decisao desta fase

- `BACKEND_STAGING_PREPARED = false`
- `SUPABASE_STAGING_PROVEN = false`
- `MIGRATION_APPROVED = false`
- `RLS_READY = false`

## Proxima acao segura

Abrir fase propria de backend staging para:

1. provar projeto Supabase de homologacao;
2. definir variaveis por ambiente sem expor segredo;
3. revisar migration e `RLS`;
4. preparar write controlado apenas depois do smoke remoto Web.
