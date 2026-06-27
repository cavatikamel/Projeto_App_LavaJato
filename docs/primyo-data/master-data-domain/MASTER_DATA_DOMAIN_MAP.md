# LavaPrime Master Data Domain Map

## 1. Objetivo

Mapear o dominio de dados mestres do LavaPrime antes de qualquer integracao real com backend.

## 2. Resumo executivo

O dominio de dados mestres do LavaPrime esta dividido hoje em tres trilhas principais:

- arrays em memoria no `app/main.js` para clientes, veiculos, equipe e servicos;
- `localStorage` para configuracoes do negocio, metodos de pagamento, produtos, insumos e movimentos de estoque;
- arquivos locais versionados para a referencia FIPE.

O principal risco atual nao e apenas a fragmentacao, mas a coexistencia de entidades paralelas e relacoes espelhadas:

- `clientRegistry` convive com `billingClients`;
- `client.plates` convive com `vehicleRegistry.currentClientId`;
- `serviceSupplyProfiles` depende de chave derivada de nome, tipo e categoria do servico;
- `businessPaymentMethods` pode renomear referencias em `patioVehicles`, `quoteEstimates`, `cashEntries`, `openPayments`, `invoiceLineItems` e `billingInvoices`.

## 3. Panorama por dominio

| Dominio | Estruturas atuais observadas | Origem atual | Persistencia atual | Consumidores principais | Dependencias criticas |
| --- | --- | --- | --- | --- | --- |
| Organizacao e identidade do negocio | `businessProfile`, `businessSocialLinks`, `businessMessageTemplates` | telas administrativas do negocio | `localStorage` | documentos, comunicacao, dashboard e dados exibidos ao cliente | `businessFinanceSettings`, documentos e identidade da organizacao |
| Configuracoes financeiras e documentais | `businessFinanceSettings`, `businessBankAccounts`, `businessPixInfo`, `businessPaymentMethods` | telas financeiras administrativas | `localStorage` | patio, vendas, faturas, open payments, caixa, relatorios e PDFs | contas bancarias, Pix, metodos de pagamento e dominio financeiro |
| Clientes | `clientRegistry`, `billingClients` | cadastro manual, entrada no patio e sincronizacao de faturamento | memoria no web | patio, faturamento, documentos, recebimentos e relatorios | placas, faturamento aprovado e vinculo com veiculos |
| Veiculos | `vehicleRegistry`, `vehicleSpecialCareRecords` | cadastro manual, entrada no patio e transferencia de placa | memoria no web + `localStorage` para cuidados especiais | patio, check-list, historicos, faturamento e relatorios | cliente atual, owner history, FIPE local e cuidados especiais |
| Servicos | `serviceCatalog` | cadastro manual no web | memoria no web | patio, relatorios, tecnicas de servico e precificacao | perfis de insumo, lembretes de manutencao e historico operacional |
| Produtos | `productCatalog`, `productSales`, `inventoryMovements` | cadastro manual, venda e ajuste de estoque | `localStorage` | vendas, atendimento, estoque, caixa e relatorios | estoque, regras de inventario e dominio financeiro |
| Insumos | `supplyCatalog`, `serviceSupplyProfiles`, `inventoryMovements` | cadastro manual, composicao de servico e ajuste de estoque | `localStorage` | servicos, estoque e custo operacional | servicos, regras de inventario e consumo automatico |
| Equipe e operadores | `adminOperators` | cadastro manual no web | memoria no web | login demo/local, autorizacao local, patio, relatorios e comissao | `sessionBoundary`, `accessBoundary`, atendimentos e producao |
| Metodos de pagamento | `businessPaymentMethods` | cadastro e manutencao administrativa | `localStorage` | patio, vendas, faturamento, caixa, open payments e invoices | contas bancarias, Pix e snapshots financeiros |
| Referencia FIPE local | `app/assets/data/fipe-veiculos.json`, `app/assets/data/fipe-veiculos.js`, `localVehicleDatabase` | arquivo versionado e `fetch(...)` no browser | arquivo local + cache em memoria | busca assistida de marca/modelo no cadastro de veiculo | veiculo, UX de cadastro e versao local da base |

## 4. Mapeamento detalhado

### 4.1 Organizacao e identidade do negocio

Estado atual:

- `businessProfile` guarda CNPJ, nome legal, nome fantasia, contatos, endereco, logo e preferencias de exibicao em relatorios;
- `businessSocialLinks` e `businessMessageTemplates` apoiam comunicacao e documentos;
- a captura e manutencao passam pelas telas administrativas do negocio e sao persistidas por `saveBusinessStorageItem(...)`.

Dependencias observadas:

- a identidade do negocio e reutilizada em recibos, faturas, comprovantes e relatorios;
- `businessFinanceSettings.documents` controla prefixos, exibicao de Pix e exibicao de dados do negocio.

### 4.2 Configuracoes financeiras e documentais

Estado atual:

- `businessBankAccounts`, `businessPixInfo`, `businessPaymentMethods` e `businessFinanceSettings` vivem em chaves separadas de `localStorage`;
- `businessPaymentMethods` possui taxa, prazo, exibicao por contexto e `linkedBankAccountId`;
- `businessFinanceSettings` concentra regras de recebimento, inventario, margens e documentos.

Dependencias observadas:

- `saveBusinessPaymentMethod(...)` valida conta vinculada e pode renomear referencias operacionais e financeiras;
- `deleteBusinessPaymentMethod(...)` inativa em vez de apagar quando existe uso historico;
- regras de inventario afetam venda de produto, baixa de insumos e ajustes manuais.

### 4.3 Clientes

Estado atual:

- `clientRegistry` e o cadastro operacional principal;
- `billingClients` e uma lista paralela usada por faturamento aprovado;
- `syncBillingClientFromRegistry(...)` e `syncBillingClientRecord(...)` mantem as duas estruturas em convivencia.

Dependencias observadas:

- cada cliente carrega `plates`, aprovacao de faturamento, ciclo de cobranca e politica de multiplas faturas;
- `createCasualClientFromEntry(...)` permite nascer cliente a partir da operacao do patio;
- `getOpenInvoicesByRegistryClient(...)` depende de `billingClientId`.

### 4.4 Veiculos

Estado atual:

- `vehicleRegistry` e a base principal do web;
- cada veiculo guarda `currentClientId`, `ownerHistory`, `serviceHistory` e `notes`;
- `vehicleSpecialCareRecords` fica separado em `localStorage`, ligado por `vehicleId` e placa.

Dependencias observadas:

- `persistVehicleRegistration(...)` valida placa unica e sincroniza ownership com cliente;
- `recordVehicleOwnerChange(...)` preserva historico de proprietario;
- a busca FIPE e usada apenas para apoio de marca/modelo, nao como ownership do veiculo.

### 4.5 Servicos

Estado atual:

- `serviceCatalog` vive em memoria;
- cada servico carrega preco, duracao, tipo de veiculo, categoria, status e campos de manutencao;
- a composicao de insumos fica fora do registro, em `serviceSupplyProfiles`.

Dependencias observadas:

- `saveServiceRegistration(...)` bloqueia duplicidade por nome;
- `getServiceSupplyProfileKey(...)` gera a chave de vinculo com insumos usando nome, tipo e categoria;
- renome de servico exige sincronizacao para nao quebrar a composicao tecnica.

### 4.6 Produtos

Estado atual:

- `productCatalog` fica em `localStorage`;
- vendas e movimentos de estoque sao persistidos separadamente em `productSales` e `inventoryMovements`;
- o mesmo catalogo alimenta venda avulsa e venda vinculada a atendimento.

Dependencias observadas:

- `saveInventoryItemForm(...)` valida SKU unico;
- `saveProductSale(...)` baixa estoque, registra `inventory_movements` locais e gera `cashEntries`;
- `saveAttendanceProductToVehicle(...)` tambem usa o catalogo e baixa estoque.

### 4.7 Insumos

Estado atual:

- `supplyCatalog` fica em `localStorage`;
- insumos alimentam `serviceSupplyProfiles` e `inventoryMovements`;
- campos tecnicos adicionais observados nos defaults ja apontam para compatibilidade quimica e risco.

Dependencias observadas:

- `saveInventoryItemForm(...)` tambem valida SKU unico para insumo;
- `saveServiceSupplies(...)` grava a composicao tecnica por chave derivada do servico;
- `businessFinanceSettings.inventory` pode bloquear ajuste manual ou saldo negativo.

### 4.8 Equipe e operadores

Estado atual:

- `adminOperators` vive apenas em memoria no web;
- cada registro mistura dado mestre de equipe com credenciais demo/local, comissao, turno, historico de acesso e producao;
- `saveOperatorRegistration(...)` impede `username` duplicado.

Dependencias observadas:

- `sessionBoundary` e `accessBoundary` consultam o usuario ativo;
- relatorios, patio e regras de acesso usam esses dados locais;
- o Android ja possui entidade `usuarios`, mas o web ainda nao compartilha uma fonte autoritativa.

### 4.9 Metodos de pagamento

Estado atual:

- `businessPaymentMethods` e tratado como cadastro mestre, mas influencia eventos financeiros e de patio;
- cada metodo pode ser inativado, vinculado a conta bancaria e ter regras de exibicao por contexto.

Dependencias observadas:

- `renameBusinessPaymentMethodReferences(...)` reescreve referencias espalhadas no legado;
- `getPaymentMethodByName(...)` e `getActivePaymentMethods(...)` abastecem fluxos operacionais;
- snapshots de taxa e prazo sao consumidos por `cashEntries`.

### 4.10 Referencia FIPE local

Estado atual:

- a base FIPE esta em arquivo local versionado;
- `fetch(localVehicleDatabaseUrl)` carrega a referencia para `localVehicleDatabase`;
- o dado serve apenas para sugerir marca/modelo no cadastro.

Dependencias observadas:

- o veiculo pode aproveitar a busca FIPE, mas continua sendo entidade de negocio separada;
- nao existe versao de referencia governada dentro do runtime.

## 5. Relacoes estruturais observadas

1. `clientRegistry` e `vehicleRegistry` formam hoje o principal eixo de cadastro operacional.
2. `billingClients` e um derivado parcial do cadastro de cliente e nao pode sobreviver como ownership independente.
3. `serviceCatalog` depende de `serviceSupplyProfiles`, que por sua vez depende de `supplyCatalog`.
4. `productCatalog` e `supplyCatalog` dependem de `inventoryMovements` para rastreabilidade de estoque.
5. `businessPaymentMethods` depende de `businessBankAccounts` e `businessPixInfo`, mas tambem influencia `cashEntries`, `openPayments`, `billingInvoices` e `invoiceLineItems`.
6. A referencia FIPE precisa continuar desacoplada do ownership transacional de cliente e veiculo.

## 6. Conclusao do mapeamento

O dominio de dados mestres do LavaPrime ja contem o nucleo necessario para operacao e financeiro, mas ele ainda esta distribuido entre fontes locais com contratos desiguais.

Antes de qualquer conexao real com Supabase, o programa precisa consolidar:

- reconciliacao entre cliente operacional e cliente faturado;
- ownership unico entre cliente, placa e veiculo;
- ids estaveis para servicos, produtos, insumos e equipe;
- separacao clara entre configuracao mestre e evento financeiro;
- papel permanente da FIPE apenas como referencia local.
