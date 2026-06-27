# Banco de Dados e Persistencia

## Estado atual por superficie

### Web

- nao foi observada conexao ativa do frontend com banco remoto
- o web opera com arrays em `app/main.js`, objetos normalizados e `localStorage`
- a base local FIPE esta em `app/assets/data/fipe-veiculos.json` e `app/assets/data/fipe-veiculos.js`

### Android

- a superficie Android usa Room local
- nome do banco: `lavaprime.db`
- versionamento Room observado: versao 2 com `exportSchema = true`

### Backend futuro

- schema inicial do Supabase ja esta versionado
- a doc do repo afirma que o backend ainda nao foi conectado a um projeto Supabase real

## Persistencia local web observada

Os seguintes grupos de dados possuem chaves locais observadas em `businessStorageKeys`:

- perfil da empresa
- contas bancarias
- PIX
- metodos de pagamento
- configuracoes financeiras
- produtos
- insumos
- vendas de produtos
- movimentos de inventario
- perfis de consumo de insumos por servico
- historico documental
- lancamentos de caixa
- cuidados especiais do veiculo
- canais sociais
- templates de mensagem

## Modelo Room Android observado

### Entidades

- `usuarios`
- `clientes`
- `veiculos`
- `servicos`
- `produtos`
- `atendimentos`
- `audit_logs`
- `sync_queue`

### Estados e enums relevantes

- `PerfilUsuario`: `ADMINISTRADOR`, `OPERADOR`
- `AtendimentoStatus`: `AGENDADO`, `PATIO`, `EXECUCAO`, `FINALIZADO`, `CANCELADO`
- `SyncStatus`: `LOCAL_ONLY`, `PENDING_SYNC`, `SYNCED`, `CONFLICT`
- `FormaPagamento`: `PIX`, `DINHEIRO`, `DEBITO`, `CREDITO`, `BOLETO`, `CORTESIA`

## Schema Supabase planejado

### Identidade

- `profiles`
- `organizations`
- `organization_memberships`

### Configuracao da empresa

- `business_profiles`
- `business_bank_accounts`
- `business_pix_keys`
- `payment_methods`
- `finance_settings`
- `social_links`
- `message_templates`

### Cadastros

- `clients`
- `vehicles`
- `vehicle_owner_history`
- `operators`
- `services`
- `supplies`
- `products`
- `service_supply_profiles`

### Operacao

- `quotes`
- `quote_items`
- `attendances`
- `attendance_services`
- `product_sales`
- `product_sale_items`

### Financeiro

- `open_payments`
- `invoices`
- `invoice_line_items`
- `cash_entries`
- `payable_accounts`

### Rastreabilidade

- `inventory_movements`
- `vehicle_special_care`
- `vehicle_special_care_history`
- `document_history`

## Conclusoes

- o produto ainda nao possui uma unica fonte de verdade conectada entre web, mobile e backend
- o desenho de dados futuro existe, mas o estado atual ainda e distribuido e parcialmente local
- a superficie Android ja formaliza parte do modelo localmente; o web ainda depende de estruturas mais acopladas ao front
