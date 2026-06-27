# LavaPrime Persistence Inventory

## 1. Objetivo

Inventariar todos os mecanismos de persistencia ou quasi-persistencia observados no LavaPrime.

## 2. Resumo executivo

Nao existe hoje uma unica tecnologia de persistencia dominando o produto inteiro. O estado atual esta distribuido entre:

- arrays e objetos em memoria no web;
- `window.localStorage`;
- arquivos locais versionados no repositorio;
- Room no Android;
- schema planejado em Supabase;
- defaults e mocks embutidos no codigo.

## 3. Arrays e objetos em memoria no web

Estruturas observadas em `app/main.js` que funcionam como fonte operacional atual do navegador:

- `patioVehicles`
- `quoteEstimates`
- `clientRegistry`
- `vehicleRegistry`
- `adminOperators`
- `serviceCatalog`
- `billingClients`
- `billingInvoices`
- `invoiceAmounts`
- `invoiceLineItems`
- `openPayments`
- `payableAccounts`
- listas auxiliares de categorias, tipos de veiculo, ciclos de faturamento, opcoes de servico e filtros

Caracteristicas:

- sao carregadas junto com o bootstrap do web;
- em varios casos recebem `push`, `unshift`, `splice` e atualizacoes diretas;
- varias delas nao possuem persistencia duravel observada no navegador.

## 4. `localStorage` do navegador

Chaves observadas via `businessStorageKeys`:

| Chave | Conteudo principal | Observacao |
| --- | --- | --- |
| `lavaprime-business-profile-v1` | perfil do negocio | identidade do negocio para documentos e operacao |
| `lavaprime-business-bank-accounts-v1` | contas bancarias | usado em financeiro e exibicao operacional |
| `lavaprime-business-pix-v1` | PIX do negocio | usado em QR code e recebimentos |
| `lavaprime-business-payment-methods-v1` | metodos de pagamento | afeta caixa, faturamento e relatorios |
| `lavaprime-business-finance-settings-v1` | configuracoes financeiras | categorias, centros de custo e ajustes de operacao |
| `lavaprime-products-v1` | catalogo de produtos | base de venda e estoque |
| `lavaprime-supplies-v1` | catalogo de insumos | base de estoque e consumo por servico |
| `lavaprime-product-sales-v1` | vendas de produtos | historico comercial local |
| `lavaprime-inventory-movements-v1` | movimentos de estoque | rastreia entradas e saidas locais |
| `lavaprime-service-supply-profiles-v1` | perfis de consumo por servico | vincula servico a insumos |
| `lavaprime-document-history-v1` | historico documental | metadados locais de documentos gerados |
| `lavaprime-cash-entries-v1` | caixa e lancamentos | principal persistencia financeira local observada |
| `lavaprime-vehicle-special-care-v1` | cuidados especiais por veiculo | alertas e restricoes operacionais |
| `lavaprime-business-social-v1` | canais sociais | usado em comunicacao e identidade do negocio |
| `lavaprime-business-message-templates-v1` | templates de mensagem | usado em WhatsApp e comunicacao comercial |

Caracteristicas:

- persistencia JSON no navegador;
- sem camada de versionamento robusta por dominio;
- sem arbitragem multiusuario;
- sensivel a limpeza local, troca de dispositivo e divergencia entre navegadores.

## 5. Arquivos locais do projeto

Arquivos que sustentam dados ou referencia operacional:

- `app/assets/data/fipe-veiculos.json`
- `app/assets/data/fipe-veiculos.js`
- `app/assets/templates/lavaprime-papel-timbrado.html`

Observacoes:

- a base FIPE e carregada por `fetch(...)` e depois cacheada em memoria;
- o template de papel timbrado apoia documentos, mas nao deve ser tratado como fonte de negocio;
- esses arquivos sao versionados com o codigo, nao com eventos operacionais do produto.

## 6. Memoria temporaria e estado transitivo

Estados observados que nao sao persistencia de negocio, mas influenciam a operacao:

- `sessionBoundary`
- `accessBoundary`
- `selectedProfile`
- `activeSessionUser`
- `localVehicleDatabase`
- `localVehicleDatabasePromise`
- selecoes correntes de servicos, filtros e modais
- caches de logo e objetos auxiliares para PDF

Uso recomendado futuro:

- continuar apenas como estado de UI, sessao, cache ou derivacao local;
- nao usar como fonte oficial de dados compartilhados.

## 7. Room no Android

Evidencias observadas:

- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/LavaPrimeDatabase.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/model/Models.kt`
- `LavaPrimeAndroidApp/app/schemas/br.com.primyo.lavaprime.data.local.LavaPrimeDatabase/2.json`

Tabelas Room observadas:

- `usuarios`
- `clientes`
- `veiculos`
- `servicos`
- `produtos`
- `atendimentos`
- `audit_logs`
- `sync_queue`

Caracteristicas:

- representa uma trilha de persistencia local mobile mais formal do que o web;
- inclui fila de sincronizacao e trilha de auditoria;
- ainda convive com `fallbackToDestructiveMigration()`, elevando risco de perda de dados mobile em mudancas futuras.

## 8. Supabase planejado

Evidencias observadas:

- `supabase/README.md`
- `supabase/migrations/20260614133000_init_lavaprime.sql`

Grupos de tabelas planejadas:

- identidade e organizacao:
  - `profiles`
  - `organizations`
  - `organization_memberships`
- configuracoes do negocio:
  - `business_profiles`
  - `business_bank_accounts`
  - `business_pix_keys`
  - `payment_methods`
  - `finance_settings`
  - `social_links`
  - `message_templates`
- cadastros centrais:
  - `clients`
  - `vehicles`
  - `vehicle_owner_history`
  - `operators`
  - `services`
  - `supplies`
  - `products`
  - `service_supply_profiles`
- operacao:
  - `quotes`
  - `quote_items`
  - `attendances`
  - `attendance_services`
  - `product_sales`
  - `product_sale_items`
- financeiro:
  - `open_payments`
  - `invoices`
  - `invoice_line_items`
  - `cash_entries`
  - `payable_accounts`
- rastreabilidade e historico:
  - `vehicle_special_care`
  - `vehicle_special_care_history`
  - `document_history`

Observacao critica:

- o schema existe, mas nao governa o runtime do web observado nesta fase.

## 9. Mocks, seeds e defaults embutidos

Fontes locais de dados padrao observadas:

- `getDefaultMessageTemplates()`
- `getDefaultCashEntries()`
- `getDefaultProductCatalog()`
- `getDefaultSupplyCatalog()`
- `getDefaultServiceSupplyProfiles()`
- `getDefaultVehicleSpecialCareRecords()`
- arrays iniciais hardcoded de clientes faturados, faturas, itens de fatura, operadores, servicos, patio e cadastros

Impacto:

- ajudam o produto a operar sem backend;
- aumentam o risco de confundir seed inicial com dado oficial de negocio.

## 10. Persistencias nao observadas no web atual

Nao foi observada persistencia funcional ativa do web atual em:

- Supabase em runtime
- banco remoto relacional conectado ao fluxo principal
- IndexedDB
- `sessionStorage`
- arquivos de negocio gravados no servidor

## 11. Conclusao do inventario

O inventario confirma que o LavaPrime ainda opera com persistencia fragmentada. O maior risco nao esta apenas em haver varios armazenamentos, mas em cada um deles responder por dominios diferentes sem uma arbitragem oficial entre web, Android e backend planejado.
