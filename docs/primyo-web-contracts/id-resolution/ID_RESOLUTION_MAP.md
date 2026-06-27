# ID Resolution Map

## 1. Objetivo

Mapear as relacoes futuras que exigirao resolucao de IDs entre contratos e adapters.

## 2. Mapa oficial

| Origem | Destino | Campo de origem esperado | Campo canonico futuro | `legacyRefs` envolvidos | Risco | Automatico? |
| --- | --- | --- | --- | --- | --- | --- |
| `Vehicle` | `Customer` | `currentClientId` legado ou ref equivalente | `currentCustomerId` | `clientRegistryId`, `billingClientId`, `legacyPlates` quando houver colisao contextual | Medio/Alto | somente se houver ID explicito e univoco |
| `Attendance` | `Customer` | `clientId`, `billingClientId` ou ref operacional futura | `customerId` | `clientRegistry`, `billingClients`, aliases de faturamento | Alto | nao quando houver duplicidade |
| `Attendance` | `Vehicle` | `vehicleId`, placa ou ref operacional futura | `vehicleId` | `legacyPlates`, refs de patio | Alto | placa so como pista, nunca como ID oficial |
| `Attendance` | `Service` | item de servico, `serviceCode`, `sourceId` ou ref de catalogo | `serviceId` | chaves derivadas de nome/tipo/categoria | Alto | somente com `sourceId` ou codigo tecnico confiavel |
| `Service` | `Supply` | `supplyProfileRefs`, perfis legados e refs de composicao | `supplyId` | `serviceSupplyProfiles`, `derivedKeys`, refs locais de insumo | Critico | nao nesta fase; ambiguidade alta |
| `Product` | `StockMovement` futura | `id`, `sku`, contexto de evento | `itemId` com `itemType=product` | `sku`, refs de venda, refs de atendimento | Medio | somente por evento explicito |
| `Supply` | `StockMovement` futura | `id`, `sku`, contexto de evento | `itemId` com `itemType=supply` | fornecedor, perfil de consumo, refs tecnicas | Medio/Alto | somente por evento explicito |
| `Payment` | `Customer` | `sourceId`, `attendanceId`, invoice/open payment ref | `customerId` | refs de faturamento e recebiveis | Alto | apenas se origem financeira carregar referencia canonica suficiente |
| `Payment` | `Attendance` | `attendanceId`, `invoiceRef`, `receivableRef` | `attendanceId` | refs de caixa, invoice e open payment | Alto | nao quando a origem financeira for agregada ou ambigua |
| `Financial` | `Customer` | `clientId`, `sourceType`, `sourceId` | `customerId` | refs de invoice, receivable e payment | Alto | somente quando o contexto financeiro apontar origem primaria clara |
| `Financial` | `Attendance` | `attendanceId`, `sourceType`, `sourceId` | `attendanceId` | refs de invoice, cash entry e payment | Alto | apenas com referencia primaria valida |

## 3. Regras de leitura do mapa

1. Automatico so pode ocorrer com `sourceId` estavel ou referencia canonica suficiente.
2. Nome, placa, SKU e texto livre podem servir como pista de reconciliacao, nunca como identidade oficial.
3. `legacyRefs` deve sobreviver ao processo sem ser promovido automaticamente a ownership.
4. Relacoes financeiras e de atendimento tendem a exigir validacao mais estrita do que master data puro.

## 4. Decisao oficial desta fase

As relacoes acima passam a ser o mapa minimo de referencia para a futura implementacao do resolvedor de IDs, com prioridade maior para `Vehicle -> Customer`, `Attendance -> Customer`, `Attendance -> Vehicle`, `Attendance -> Service` e `Service -> Supply`.
