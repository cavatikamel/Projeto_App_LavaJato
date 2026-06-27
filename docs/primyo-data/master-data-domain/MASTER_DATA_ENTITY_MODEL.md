# LavaPrime Master Data Entity Model

## 1. Objetivo

Propor o modelo logico futuro dos dados mestres do LavaPrime sem alterar schema nesta fase.

## 2. Principios do modelo

1. Toda entidade mestre compartilhada deve possuir `organizationId`.
2. Dado mestre nao deve se confundir com evento operacional ou financeiro.
3. Relacoes entre entidades devem usar IDs estaveis, nunca nome livre como chave primaria.
4. Historicos relevantes devem ser entidades dedicadas ou colecoes explicitamente versionadas.
5. Referencias locais, como FIPE, nao devem assumir ownership transacional.

## 3. Modelo logico proposto

### 3.1 Organizacao

Entidade logica: `organizations`

Papel:

- delimitar tenant, ownership e escopo de seguranca.

Campos minimos:

- `id`
- `slug`
- `name`
- `status`
- `createdAt`
- `updatedAt`

Observacao:

- continua sendo a raiz de ownership para web, Android e backend.

### 3.2 Configuracao do negocio

Entidade logica: `business_settings`

Papel:

- consolidar a configuracao mestre da operacao e da identidade do negocio.

Suporte fisico planejado:

- `business_profiles`
- `finance_settings`
- `social_links`
- `message_templates`

Campos minimos:

- `id`
- `organizationId`
- `legalName`
- `tradeName`
- `cnpj`
- `phone`
- `email`
- `address`
- `logoPath`
- `reportPreferences`
- `receiptRules`
- `inventoryRules`
- `documentRules`
- `socialPreferences`
- `messageDefaults`
- `createdAt`
- `updatedAt`

### 3.3 Contas bancarias e Pix

Entidades logicas:

- `business_bank_accounts`
- `business_pix_keys`

Papel:

- representar instrumentos mestres de recebimento e exibicao em documentos.

Campos minimos de `business_bank_accounts`:

- `id`
- `organizationId`
- `bankName`
- `accountHolder`
- `accountType`
- `branchCode`
- `accountNumber`
- `showInInvoices`
- `isActive`
- `createdAt`
- `updatedAt`

Campos minimos de `business_pix_keys`:

- `id`
- `organizationId`
- `keyType`
- `keyValue`
- `receiver`
- `paymentUrl`
- `copyPasteCode`
- `showInInvoices`
- `isPrimary`
- `createdAt`
- `updatedAt`

### 3.4 Clientes

Entidade logica: `customers`

Papel:

- representar pessoa fisica ou juridica atendida pelo negocio.

Campos minimos:

- `id`
- `organizationId`
- `customerCode`
- `kind`
- `name`
- `legalName`
- `document`
- `phonePrimary`
- `email`
- `address`
- `billingApproved`
- `billingCycle`
- `allowMultipleOpenInvoices`
- `status`
- `createdAt`
- `updatedAt`

### 3.5 Veiculos

Entidade logica: `vehicles`

Papel:

- representar o ativo fisico vinculado ao cliente e aos atendimentos.

Campos minimos:

- `id`
- `organizationId`
- `currentCustomerId`
- `plate`
- `brand`
- `model`
- `modelYear`
- `manufactureYear`
- `color`
- `vehicleType`
- `category`
- `fuel`
- `notes`
- `fipeBrandCode`
- `fipeModelCode`
- `status`
- `createdAt`
- `updatedAt`

Entidade auxiliar obrigatoria:

- `vehicle_owner_history`

Campos minimos:

- `id`
- `organizationId`
- `vehicleId`
- `customerId`
- `relationshipType`
- `startedAt`
- `endedAt`
- `notes`
- `createdAt`
- `updatedAt`

### 3.6 Servicos

Entidade logica: `services`

Papel:

- representar o catalogo mestre de servicos prestados.

Campos minimos:

- `id`
- `organizationId`
- `serviceCode`
- `name`
- `description`
- `price`
- `durationMinutes`
- `vehicleType`
- `vehicleCategory`
- `defaultVehicleCareType`
- `maintenanceRequired`
- `maintenanceInterval`
- `maintenanceDate`
- `isActive`
- `createdAt`
- `updatedAt`

### 3.7 Perfis de consumo por servico

Entidade logica: `service_supply_profiles`

Papel:

- representar a relacao canonica entre servico e consumo padrao de insumos.

Campos minimos:

- `id`
- `organizationId`
- `serviceId`
- `name`
- `notes`
- `items`
- `createdAt`
- `updatedAt`

Regra obrigatoria:

- o relacionamento deve ser por `serviceId`, nunca por chave derivada de nome.

### 3.8 Produtos

Entidade logica: `products`

Papel:

- representar itens vendaveis ou usados em operacao com controle de estoque.

Campos minimos:

- `id`
- `organizationId`
- `sku`
- `name`
- `unit`
- `stockBalance`
- `minStock`
- `costPrice`
- `salePrice`
- `isActive`
- `notes`
- `createdAt`
- `updatedAt`

### 3.9 Insumos

Entidade logica: `supplies`

Papel:

- representar materiais de consumo interno ligados a servicos e estoque.

Campos minimos:

- `id`
- `organizationId`
- `sku`
- `name`
- `unit`
- `stockBalance`
- `minStock`
- `costPrice`
- `supplierName`
- `riskTags`
- `compatibilityMetadata`
- `isActive`
- `notes`
- `createdAt`
- `updatedAt`

### 3.10 Movimentos de estoque

Entidade logica: `inventory_movements`

Papel:

- preservar a trilha auditavel de alteracao de saldo para produto ou insumo.

Campos minimos:

- `id`
- `organizationId`
- `inventoryKind`
- `productId`
- `supplyId`
- `movementType`
- `quantity`
- `unit`
- `previousStock`
- `currentStock`
- `reason`
- `sourceCode`
- `createdBy`
- `createdAt`
- `updatedAt`

### 3.11 Equipe e operadores

Entidade logica: `team_members`

Suporte fisico planejado:

- `operators`
- `profiles`
- `organization_memberships`

Papel:

- representar a pessoa da equipe e seu papel operacional, sem confundir isso com a futura autenticacao real.

Campos minimos:

- `id`
- `organizationId`
- `profileId`
- `name`
- `role`
- `accessProfile`
- `phone`
- `email`
- `shift`
- `commissionType`
- `commissionValue`
- `status`
- `createdAt`
- `updatedAt`

Regra obrigatoria:

- credenciais de login definitivas devem migrar para a camada de identidade, nao permanecer no cadastro mestre.

### 3.12 Metodos de pagamento

Entidade logica: `payment_methods`

Papel:

- representar cadastro mestre de recebimento, taxa, prazo e contexto de uso.

Campos minimos:

- `id`
- `organizationId`
- `name`
- `methodType`
- `linkedBankAccountId`
- `pixKeyId`
- `showInService`
- `showInProductSale`
- `showInQuote`
- `showInInvoice`
- `immediateSettlement`
- `settlementDays`
- `feePercent`
- `fixedFee`
- `notes`
- `isActive`
- `createdAt`
- `updatedAt`

### 3.13 Referencia FIPE local

Entidade logica: `fipe_reference_versions`

Papel:

- representar a referencia tecnica usada para enriquecer cadastro de veiculos.

Campos minimos:

- `id`
- `sourceName`
- `sourceVersion`
- `filePath`
- `loadedAt`
- `status`

Regra obrigatoria:

- FIPE nao entra como entidade transacional do negocio.

## 4. Invariantes obrigatorios

1. `customers` substitui o ownership paralelo de `clientRegistry` e `billingClients`.
2. `vehicles.currentCustomerId` e `vehicle_owner_history` precisam ser consistentes entre si.
3. `services` precisa de `id` tecnico estavel para sustentar `service_supply_profiles`.
4. `products` e `supplies` nao devem depender apenas do saldo corrente; `inventory_movements` permanece obrigatorio.
5. `team_members` nao pode ser o mesmo objeto conceitual de credencial local.
6. `payment_methods` e dado mestre; taxas e prazos usados em eventos financeiros precisam ser congelados em snapshot.
7. `business_settings` controla regras futuras, mas nao substitui eventos ja emitidos.
8. `fipe_reference_versions` permanece somente como apoio de catalogo.

## 5. Mapeamento do legado atual para o modelo futuro

| Estrutura atual | Papel atual | Destino logico futuro |
| --- | --- | --- |
| `businessProfile` | identidade do negocio e preferencias de relatorio | `business_settings` |
| `businessFinanceSettings` | regras de recebimento, estoque e documentos | `business_settings` |
| `businessBankAccounts` | contas de recebimento | `business_bank_accounts` |
| `businessPixInfo` | chave Pix e QR/local de cobranca | `business_pix_keys` |
| `clientRegistry` | cadastro operacional principal de cliente | `customers` |
| `billingClients` | cadastro paralelo de cliente faturado | derivacao temporaria a ser absorvida por `customers` |
| `vehicleRegistry` | cadastro de veiculos | `vehicles` |
| `ownerHistory` aninhado | historico de proprietario | `vehicle_owner_history` |
| `serviceCatalog` | catalogo de servicos | `services` |
| `serviceSupplyProfiles` | composicao tecnica por chave derivada | `service_supply_profiles` |
| `productCatalog` | catalogo de produtos | `products` |
| `supplyCatalog` | catalogo de insumos | `supplies` |
| `inventoryMovements` | historico de estoque | `inventory_movements` |
| `adminOperators` | equipe, credencial local e indicadores | `team_members` + identidade futura |
| `businessPaymentMethods` | regras de recebimento | `payment_methods` |
| `fipe-veiculos.json` | referencia local de marca/modelo | `fipe_reference_versions` |

## 6. Decisao desta fase

O dominio de dados mestres do LavaPrime passa a ser modelado como um conjunto de entidades estaveis de organizacao, configuracao, cadastro, estoque, equipe e referencia local.

Esse modelo prepara:

- a separacao do monolito web por dominio;
- a futura integracao com Supabase sem ambiguidade de ownership;
- a transicao controlada entre legado local e backend oficial.
