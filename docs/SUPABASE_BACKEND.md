# Supabase Backend

## Estado atual

Hoje o frontend ainda opera majoritariamente com dados locais em `app/main.js` e `localStorage`.

O repositorio agora ficou preparado para iniciar a migracao para Supabase com:

- schema inicial versionado em `supabase/migrations/20260614133000_init_lavaprime.sql`
- organizacao multi-tenant por empresa
- perfis de usuario
- RLS nas tabelas do dominio
- funcao de bootstrap para criar a empresa principal

## Estrutura planejada

Grupos principais de tabelas:

- identidade: `profiles`, `organizations`, `organization_memberships`
- configuracao da empresa: `business_profiles`, `business_bank_accounts`, `business_pix_keys`, `payment_methods`, `finance_settings`, `social_links`, `message_templates`
- cadastros: `clients`, `vehicles`, `vehicle_owner_history`, `operators`, `services`, `supplies`, `products`, `service_supply_profiles`
- operacao: `quotes`, `quote_items`, `attendances`, `attendance_services`, `product_sales`, `product_sale_items`
- financeiro: `open_payments`, `invoices`, `invoice_line_items`, `cash_entries`, `payable_accounts`
- rastreabilidade: `inventory_movements`, `vehicle_special_care`, `vehicle_special_care_history`, `document_history`

## Mapeamento do app atual para o banco

- dados empresariais e financeiros locais passam para tabelas de configuracao por `organization_id`
- clientes, veiculos, operadores e servicos deixam de ficar presos ao `main.js`
- caixa, pagamentos em aberto, faturas e historico documental passam a ser persistidos
- os cuidados especiais do veiculo deixam de depender apenas de estado local

## Publicacao no Supabase

1. Criar um projeto novo no Supabase.
2. Configurar Auth com email/senha ou magic link.
3. Ajustar URLs de redirect da autenticacao para a URL da Netlify.
4. Aplicar a migration inicial em `supabase/migrations/`.
5. Criar os buckets:
   - `brand-assets`: publico, para logo institucional se necessario
   - `documents`: privado, para PDFs e comprovantes
   - `attachments`: privado, para anexos de caixa e operacao
6. Configurar variaveis de ambiente da Netlify e do ambiente local.
7. Conectar o frontend ao Supabase por etapas, comecando por autenticacao e perfis.

## Variaveis de ambiente

Browser-safe:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Somente servidor ou automacao:

- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_SERVICE_ROLE_KEY`

## Checklist de seguranca

- nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend
- manter RLS ativo em todas as tabelas expostas
- permitir acesso anonimo apenas ao minimo necessario
- usar buckets privados para documentos e anexos
- reservar operacoes administrativas e integracoes sensiveis para backend ou Edge Functions
- revisar periodicamente politicas, grants e usuarios ativos

## O que ainda falta para a migracao completa

- criar a camada cliente do Supabase no frontend
- trocar `localStorage` por leitura/escrita real no banco
- migrar login visual para Auth real
- mover uploads e comprovantes para Storage
- criar seeds ou script de migracao dos dados locais, se necessario

## Verdade importante

Este repositorio ficou pronto para receber o backend no Supabase, mas a publicacao real no Supabase ainda depende do seu projeto, das credenciais e da ligacao efetiva do frontend com esse backend.
