# Supabase Backend

## Estado atual

Hoje o frontend ainda opera parcialmente com dados locais em `app/main.js` e `localStorage`, mas a Fase B ja iniciou a gravacao relacional dos cadastros principais.

O repositorio agora ficou preparado para iniciar a migracao para Supabase com:

- schema inicial versionado em `supabase/migrations/20260614133000_init_lavaprime.sql`
- tabela `organization_app_states` em `supabase/migrations/20260615093000_add_organization_app_states.sql`
- organizacao multi-tenant por empresa
- perfis de usuario
- RLS nas tabelas do dominio
- cliente browser para login com email e senha
- script de bootstrap do usuario `Teste`
- camada relacional inicial para `clients`, `vehicles`, `operators`, `services`, `products` e `supplies`

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
- clientes, veiculos, operadores, produtos, insumos e servicos passam a ter leitura e gravacao tambem nas tabelas do Supabase
- caixa, pagamentos em aberto, faturas e historico documental passam a ser persistidos
- os cuidados especiais do veiculo deixam de depender apenas de estado local
- durante a transicao, o app legado ainda sincroniza um snapshot por organizacao em `organization_app_states` para nao quebrar os fluxos existentes enquanto a migracao relacional continua

## Publicacao no Supabase

1. Criar um projeto novo no Supabase.
2. Configurar Auth com email/senha ou magic link.
3. Ajustar URLs de redirect da autenticacao para a URL da Netlify.
4. Aplicar as migrations de `supabase/migrations/`.
5. Criar os buckets:
   - `brand-assets`: publico, para logo institucional se necessario
   - `documents`: privado, para PDFs e comprovantes
   - `attachments`: privado, para anexos de caixa e operacao
6. Configurar variaveis de ambiente da Netlify e do ambiente local.
7. Executar `npm run bootstrap:test-user` com as variaveis de servidor preenchidas para criar ou resetar o usuario `Teste`.
8. Conectar o frontend ao Supabase por etapas, comecando por autenticacao e perfis.

## Variaveis de ambiente

Browser-safe:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Somente servidor ou automacao:

- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_SERVICE_ROLE_KEY`

Bootstrap do usuario de teste:

- `TEST_USER_EMAIL`
- `TEST_USER_PASSWORD`
- `TEST_USER_FULL_NAME`
- `TEST_ORGANIZATION_NAME`
- `TEST_ORGANIZATION_SLUG`

## Checklist de seguranca

- nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend
- manter RLS ativo em todas as tabelas expostas
- permitir acesso anonimo apenas ao minimo necessario
- usar buckets privados para documentos e anexos
- reservar operacoes administrativas e integracoes sensiveis para backend ou Edge Functions
- revisar periodicamente politicas, grants e usuarios ativos

## O que ainda falta para a migracao completa

- aprofundar a migracao do snapshot remoto para tabelas relacionais por modulo
- migrar `service_supply_profiles`, `vehicle_special_care`, operacao, financeiro e documentos para o mesmo padrao relacional
- migrar login visual para Auth real
- mover uploads e comprovantes para Storage
- criar seeds ou script de migracao dos dados locais, se necessario

## Verdade importante

Esta primeira construcao deixa o app apto a autenticar no Supabase e salvar o estado operacional por organizacao, mas a aplicacao real no projeto remoto ainda depende do seu projeto, das credenciais e da execucao das migrations no Supabase.
