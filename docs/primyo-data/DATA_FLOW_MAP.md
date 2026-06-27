# LavaPrime Data Flow Map

## 1. Objetivo

Mapear onde cada dado relevante do LavaPrime nasce, onde e armazenado hoje, quem altera, quem consome e qual deve ser o destino de migracao futuro.

## 2. Escopo e evidencia usada

Este mapa foi consolidado a partir de:

- `docs/primyo-onboarding/banco-de-dados.md`
- `docs/primyo-onboarding/arquitetura.md`
- `docs/primyo-onboarding/integracoes.md`
- `docs/primyo-onboarding/fluxos.md`
- `docs/primyo-onboarding/divida-tecnica.md`
- `docs/primyo-onboarding/riscos.md`
- `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `app/main.js`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/LavaPrimeDatabase.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/model/Models.kt`
- `supabase/migrations/20260614133000_init_lavaprime.sql`

## 3. Topologia atual de dados

Estado atual observado:

1. O web concentra a maior parte da operacao em `app/main.js`.
2. Parte do estado vive somente em arrays e objetos em memoria.
3. Parte do estado persiste em `window.localStorage` via `businessStorageKeys`.
4. O Android mantem uma trilha paralela em Room (`lavaprime.db`).
5. Existe schema alvo em Supabase, mas ele ainda nao e a fonte ativa do web observado.

Consequencia pratica:

- hoje nao existe uma fonte unica de verdade;
- a mesma capacidade de negocio aparece em formas diferentes no web, no Android e no schema planejado;
- varios fluxos criticos dependem de estado local do navegador.

## 4. Fluxos principais observados

### 4.1 Fluxo comercial e operacional

`Cliente -> Veiculo -> Patio/Atendimento -> Servicos/Produtos -> Caixa/Pagamentos -> Recibos/Relatorios`

### 4.2 Fluxo de faturamento

`Cliente cadastrado -> Billing client -> Fatura -> Itens da fatura -> Pagamento em aberto -> Caixa`

### 4.3 Fluxo de estoque

`Produto/Insumo -> Perfil de insumos por servico -> Movimento de estoque -> Venda/consumo -> Caixa`

### 4.4 Fluxo de configuracao

`Perfil do negocio -> Bancos/PIX/metodos -> Financeiro/documentos/mensagens -> Relatorios`

### 4.5 Fluxo de referencia externa

`Arquivo FIPE local -> Busca de marca/modelo -> Cadastro de veiculo -> Atendimento/orcamento`

## 5. Mapa por entidade

| Entidade | Onde nasce hoje | Onde e armazenada hoje | Quem altera hoje | Quem consome hoje | Como persiste hoje | Caminho de migracao futuro |
| --- | --- | --- | --- | --- | --- | --- |
| Clientes | Cadastro manual em clientes e, em alguns casos, desdobramento para faturamento | `clientRegistry` e tambem `billingClients` | Tela de clientes, associacao de faturamento, patio ao vincular placa/cliente | Clientes, veiculos, patio, orcamentos, faturas, pagamentos, recibos e relatorios | Em memoria no web; no Android ha `clientes`; no Supabase existe `public.clients` | Consolidar em uma unica entidade `clients`, removendo a duplicidade entre cadastro operacional e cadastro faturado |
| Veiculos | Cadastro manual em veiculos e entrada operacional no patio | `vehicleRegistry`, referencias em `patioVehicles`, historicos aninhados (`ownerHistory`, `serviceHistory`) e cuidados especiais separados | Tela de veiculos, patio, atualizacoes de historico e cuidados especiais | Patio, clientes, check-list, recibos, orcamentos, pagamentos, faturas e relatorios | Em memoria no web; no Android ha `veiculos`; no Supabase existem `vehicles`, `vehicle_owner_history` e `vehicle_special_care` | Desanexar historicos da estrutura local e centralizar em `vehicles` com tabelas relacionais de historico |
| Servicos | Cadastro manual em servicos | `serviceCatalog` e chaveamento em `serviceSupplyProfiles` | Tela de servicos e perfis de insumo por servico | Patio, orcamentos, operacao, check-list, relatorios e calculos de atendimento | `serviceCatalog` em memoria; `serviceSupplyProfiles` em `localStorage`; no Android ha `servicos`; no Supabase existem `services` e `service_supply_profiles` | Tornar `services` a fonte oficial e manter perfis de insumo como relacao persistida no backend |
| Produtos | Cadastro manual em produtos | `productCatalog`, `productSales`, referencias em estoque e atendimentos | Tela de produtos, venda de produtos e lancamentos de estoque | Vendas, estoque, patio, financeiro, recibos e relatorios | `productCatalog` e `productSales` em `localStorage`; no Android ha `produtos`; no Supabase existem `products`, `product_sales` e `product_sale_items` | Centralizar catalogo e vendas no backend, deixando no cliente apenas cache controlado e rascunhos transitivos |
| Insumos | Cadastro manual em insumos | `supplyCatalog`, `inventoryMovements`, `serviceSupplyProfiles` | Tela de insumos, estoque e configuracao de consumo por servico | Servicos, estoque, patio, relatorios operacionais | `supplyCatalog`, `inventoryMovements` e `serviceSupplyProfiles` em `localStorage`; sem persistencia equivalente completa no web alem disso; no Supabase existem `supplies`, `inventory_movements` e `service_supply_profiles` | Tornar insumos e movimentos entidades relacionais sincronizadas com regras de estoque unificadas |
| Equipe | Cadastro manual de operadores/colaboradores | `adminOperators` | Tela de operadores | Login demo, aprovacao administrativa, patio, recibos, relatorios, permissoes locais | Em memoria no web; no Android ha `usuarios`; no Supabase existem `operators`, `profiles` e `organization_memberships` | Separar identidade de acesso de cadastro operacional de colaborador, com ids estaveis e papeis formais |
| Usuarios de acesso e sessao | Login demo/local e troca de perfil local | `sessionBoundary`, `accessBoundary`, `selectedProfile`, `activeSessionUser` | Login local, logout, troca de perfil e camada local de acesso | Navegacao, controle de menu, acesso admin, acesso operador, patio | Apenas em memoria no web; no Android ha `usuarios`; no Supabase o alvo e `auth.users` + `profiles` + memberships | Migrar para autenticacao real e manter no cliente apenas estado de sessao derivado |
| Orcamentos | Criacao manual na jornada de orcamentos | `quoteEstimates` | Tela de orcamentos | Comercial, WhatsApp, previsao de atendimento e historico local | Em memoria no web; sem persistencia local duravel observada; no Supabase existem `quotes` e `quote_items` | Persistir como dominio formal de orcamentos, hoje sensivel a perda por refresh ou troca de dispositivo |
| Atendimentos e patio | Entrada operacional do veiculo no patio | `patioVehicles` com referencias a cliente, veiculo, servicos, pagamentos e historico | Patio, atualizacao de status, checkout, faturamento e recibos | Dashboard, patio, caixa, pagamentos em aberto, faturas, recibos e relatorios | Em memoria no web; no Android ha `atendimentos`; no Supabase existem `attendances` e `attendance_services` | Tornar atendimento a linha mestra operacional e origem oficial dos eventos de caixa e faturamento |
| Financeiro | Lancamentos manuais, checkout do patio, faturamento e baixas de pagamento | `cashEntries`, `openPayments`, `payableAccounts`, `billingInvoices`, `invoiceLineItems`, `invoiceAmounts` | Fluxos de caixa, pagamentos em aberto, faturas, faturamento e ajustes de recebimento | Dashboard, financeiro, relatorios, recibos, faturamento e conciliacao local | `cashEntries` em `localStorage`; `openPayments`, `payableAccounts`, `billingInvoices`, `invoiceLineItems` e `invoiceAmounts` em memoria; no Supabase existem `open_payments`, `invoices`, `invoice_line_items`, `cash_entries` e `payable_accounts` | Centralizar financeiro no backend com trilha auditavel e eliminar mapas derivados em memoria como `invoiceAmounts` |
| Configuracoes de negocio | Telas de configuracao da empresa | `businessProfile`, `businessBankAccounts`, `businessPixInfo`, `businessPaymentMethods`, `businessFinanceSettings`, `businessSocialLinks`, `businessMessageTemplates` | Telas de negocio, bancos, PIX, financeiro, social e mensagens | Documentos, relatorios, QR code, financeiro, comunicacoes e identidade visual do negocio | Persistencia em `localStorage`; no Supabase existem `business_profiles`, `business_bank_accounts`, `business_pix_keys`, `payment_methods`, `finance_settings`, `social_links` e `message_templates` | Migrar para backend como configuracao oficial da organizacao, com cache local apenas auxiliar |
| Relatorios e documentos | Gerados sob demanda nas telas e operacoes | Metadados em `documentHistory`; conteudo final e baixado no cliente | Geracao de recibos, check-list, comprovantes, relatorios e documentos comerciais | Operacao, cliente, financeiro e historico documental | `documentHistory` em `localStorage`; arquivos gerados nao retornam a um repositorio central; no Supabase existe `document_history` | Manter metadados no backend e definir armazenamento futuro para artefatos, sem usar download local como memoria oficial |
| Cuidados especiais do veiculo | Registro manual ligado ao veiculo | `vehicleSpecialCareRecords` e reflexos no historico do veiculo | Tela de cuidados especiais e operacao do patio | Check-list, servicos, alertas, patio e documentos | Persistencia em `localStorage`; no Supabase existem `vehicle_special_care` e `vehicle_special_care_history` | Normalizar como dominio proprio ligado ao veiculo, sem depender de estrutura aninhada em tela |
| FIPE local e referencia veicular | Arquivo versionado no projeto | `app/assets/data/fipe-veiculos.json`, `app/assets/data/fipe-veiculos.js` e cache em memoria `localVehicleDatabase` | Sincronizacao manual via script e consumo no cadastro de veiculo | Busca de marca/modelo e apoio a cadastro | Arquivo local do projeto + cache em memoria; sem persistencia transacional | Manter como referencia local versionada ou substituir por servico externo controlado; nao deve ser fonte de verdade de negocio |

## 6. Duplicidades e bifurcacoes mais criticas

### 6.1 Cliente operacional x cliente faturado

- `clientRegistry` representa o cadastro principal visivel no web.
- `billingClients` sustenta a camada de faturamento.
- A mesma pessoa/empresa pode existir nas duas estruturas.

Impacto:

- risco de divergencia cadastral;
- necessidade de reconciliacao antes de migrar faturamento.

### 6.2 Faturas e seus derivados

- `billingInvoices` guarda a fatura.
- `invoiceLineItems` guarda os itens.
- `invoiceAmounts` guarda um total derivado em objeto separado.
- `openPayments` e `cashEntries` refletem o mesmo evento financeiro em outras estruturas.

Impacto:

- risco de totais inconsistentes;
- risco de vinculos orfaos ao migrar historico financeiro.

### 6.3 Servicos x consumo de estoque

- `serviceCatalog` nao persiste como `localStorage`, mas os perfis de consumo sim.
- `serviceSupplyProfiles` depende do nome/perfil do servico para chavear parte da relacao.

Impacto:

- um renome de servico pode quebrar a relacao com insumos;
- a migracao exige ids estaveis por servico.

### 6.4 Estado operacional sem durabilidade

- `quoteEstimates`, `patioVehicles`, `clientRegistry`, `vehicleRegistry`, `adminOperators`, `billingInvoices` e `openPayments` vivem em memoria no web.

Impacto:

- refresh do navegador ou troca de sessao pode eliminar estado nao migrado;
- o navegador atual funciona como banco de negocio de fato.

## 7. Leituras principais desta descoberta

1. O web atual opera com um banco misto de arrays locais, `localStorage` e calculos derivados em memoria.
2. O Android ja possui uma camada Room mais formal, mas ela ainda nao converge com o web.
3. O schema Supabase ja desenha um destino coerente para a maioria das entidades.
4. A migracao futura deve partir de dominio por dominio, e nao de uma unica troca global.
5. Financeiro, atendimento e cadastros centrais sao os pontos mais sensiveis para definicao de fonte unica de verdade.
