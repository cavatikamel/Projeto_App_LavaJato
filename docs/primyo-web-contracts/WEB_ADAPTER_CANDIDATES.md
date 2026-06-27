# LavaPrime Web Adapter Candidates

## 1. Objetivo

Listar os adapters futuros que o web precisara para respeitar os contratos oficiais sem expor o monolito diretamente ao shape de backend ou Android.

## 2. Adapters principais

| Adapter futuro | Responsabilidade | Entrada principal | Saida principal | Risco | Dependencias | Prioridade |
| --- | --- | --- | --- | --- | --- | --- |
| `customerAdapter` | unificar `clientRegistry` e `billingClients` no contrato `Customer` | registro legado de cliente + apoio de faturamento | payload `Customer` | Alto | regras de unificacao de cliente, `vehicleIds`, `legacyRefs` | P1 |
| `vehicleAdapter` | traduzir `vehicleRegistry` e referencias de cuidado especial para `Vehicle` | registro legado de veiculo + referencias de cuidado | payload `Vehicle` | Alto | `currentCustomerId`, ownership history, FIPE e cuidados especiais | P1 |
| `serviceAdapter` | converter `serviceCatalog` e apontar perfis tecnicos para `Service` | item de `serviceCatalog` + lookup de perfis | payload `Service` | Alto | `serviceSupplyProfiles`, regra de `serviceCode`, parse de duracao | P1 |
| `productAdapter` | traduzir `productCatalog` para `Product` | item de `productCatalog` | payload `Product` | Medio | `inventoryMovements`, vendas de produto, snapshots de preco | P1 |
| `supplyAdapter` | traduzir `supplyCatalog` para `Supply` | item de `supplyCatalog` | payload `Supply` | Alto | recuperar metadados de compatibilidade e risco | P2 |
| `attendanceAdapter` | converter `patioVehicles` e referencias cruzadas para `Attendance` | estado atual do patio + lookups de cliente, veiculo, servico e financeiro | payload `Attendance` | Critico | resolucao de IDs, reconciliacao de servicos e pagamentos | P2 |
| `paymentAdapter` | materializar evento financeiro contratual a partir do legado | `cashEntries`, `openPayments`, metodo de pagamento e contexto operacional | payload `Payment` | Critico | snapshots financeiros, metodo canonico, parcial e estorno | P3 |
| `financialAdapter` | expor contexto financeiro consolidado sem misturar ownership primario | invoices, receivables, cash entries, documents e payables | payload `Financial` | Critico | contrato `Payment`, invoice totals, documentos e payables | P3 |

## 3. Componentes de suporte recomendados

Antes ou junto com os adapters de maior risco, o web devera ter componentes de suporte puros:

| Componente futuro | Papel |
| --- | --- |
| `contractEnvelopeFactory` | aplicar `contractName`, `contractVersion`, `emittedAt`, `id` e `organizationId` conforme o dominio |
| `legacyIdResolver` | resolver IDs ausentes ou indiretos a partir de `billingClientId`, `plate`, `vehicleId`, `invoiceId` e chaves locais |
| `paymentMethodSnapshotResolver` | congelar `methodSnapshot` e `financialAccountSnapshot` antes de adaptar `Payment` e `Financial` |

## 4. Leitura operacional

Os adapters de prioridade P1 atacam:

- master data;
- dualidade de cliente;
- chaves textuais em servico;
- naming inconsistente de produto e insumo.

Os adapters de prioridade P2 e P3 atacam:

- dominio operacional do patio;
- cadeia financeira;
- snapshots e derivacoes historicas.

## 5. Decisao desta fase

O web passa a possuir uma lista oficial de adapters futuros, com foco inicial em master data e somente depois em operacao e financeiro.
