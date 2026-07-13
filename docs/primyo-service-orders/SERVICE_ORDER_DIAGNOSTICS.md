# Service Order Diagnostics

## Funcao global

```javascript
window.__lavaprimeGetServiceOrderDiagnostics?.()
```

## Espelho silencioso para auditoria automatizada

Quando o contexto automatizado nao conseguir ler os globais de `window` com confiabilidade, o runtime tambem publica um espelho tecnico somente leitura em:

- `document.documentElement.dataset.lavaprimeServiceOrderDiagnosticsAvailable`
- `document.documentElement.dataset.lavaprimeServiceOrderTotal`
- `document.documentElement.dataset.lavaprimeServiceOrderMissingCustomer`
- `document.documentElement.dataset.lavaprimeServiceOrderMissingVehicle`
- `document.documentElement.dataset.lavaprimeServiceOrderInvalidTotals`
- `document.documentElement.dataset.lavaprimeServiceOrderDuplicateNumbers`
- `#lavaprime-service-order-diagnostics`

O elemento `#lavaprime-service-order-diagnostics` usa `type="application/json"` e contem o snapshot serializado do diagnostico atual.

## Retorno esperado

- `enabled`
- `source`
- `version`
- `activeBootstrapMode`
- `totalLegacyAttendances`
- `totalServiceOrdersBuilt`
- `missingCustomer`
- `missingVehicle`
- `invalidTotals`
- `duplicateOrderNumbers`
- `unsupportedStatuses`
- `totalCashEntriesLinked`
- `totalOpenPaymentsLinked`
- `totalDocumentsLinked`
- `issueExamples`
- `rollbackPath`

## Uso

- auditar a fundacao tecnica sem poluir UI;
- confirmar quantas OS foram montadas a partir do legado atual;
- localizar lacunas antes de futura persistencia;
- permitir inspeção por console e por automacao sem abrir Supabase.

## Limite desta fase

O diagnostico nao:

- grava nada no banco;
- altera o fluxo do usuario;
- troca bootstrap;
- abre Supabase;
- promove `Service Order` a entidade persistida oficial.

## Atualizacao LP-SERVICE-ORDER-002

Novos campos principais do snapshot:

- `withExplicitId`
- `withOrderNumber`
- `paymentsLinked`
- `paymentsMissingLink`
- `documentsLinked`
- `documentsMissingLink`
- `eventsBuilt`
- `eventsWithServiceOrderId`
- `persistenceSnapshotsBuilt`
- `duplicateServiceOrderIds`
- `unknownStatuses`
- `backendRequired`
- `supabaseTouched`

Novos espelhos tecnicos relevantes:

- `document.documentElement.dataset.lavaprimeServiceOrderWithExplicitId`
- `document.documentElement.dataset.lavaprimeServiceOrderWithOrderNumber`
- `document.documentElement.dataset.lavaprimeServiceOrderDuplicateIds`
- `document.documentElement.dataset.lavaprimeServiceOrderPaymentsLinked`
- `document.documentElement.dataset.lavaprimeServiceOrderPaymentsMissingLink`
- `document.documentElement.dataset.lavaprimeServiceOrderDocumentsLinked`
- `document.documentElement.dataset.lavaprimeServiceOrderDocumentsMissingLink`
- `document.documentElement.dataset.lavaprimeServiceOrderEventsBuilt`
- `document.documentElement.dataset.lavaprimeServiceOrderEventsWithId`
- `document.documentElement.dataset.lavaprimeServiceOrderPersistenceSnapshots`
- `document.documentElement.dataset.lavaprimeServiceOrderSupabaseTouched`

## Atualizacao LP-SERVICE-ORDER-003

Novos campos principais do snapshot:

- `runtimeAdoptionMode`
- `storageContractsBuilt`
- `storageContractsValid`
- `storageContractsInvalid`
- `contractsWithRequiredFields`
- `contractsMissingCustomerSnapshot`
- `contractsMissingVehicleSnapshot`
- `contractsWithLinkedPayments`
- `contractsWithLinkedDocuments`
- `contractsWithEvents`
- `storage`

Bloco `storage` esperado:

- `schemaVersion`
- `contractsBuilt`
- `validContracts`
- `invalidContracts`
- `warnings`
- `invalidExamples`
- `contractsWithRequiredFields`
- `contractsMissingCustomerSnapshot`
- `contractsMissingVehicleSnapshot`
- `contractsWithLinkedPayments`
- `contractsWithLinkedDocuments`
- `contractsWithEvents`
- `backendRequired`
- `supabaseTouched`
- `migrationRequired`
- `readyForSupabaseDesign`
- `readyForSupabaseWrite`

Novos espelhos tecnicos relevantes:

- `document.documentElement.dataset.lavaprimeServiceOrderStorageContracts`
- `document.documentElement.dataset.lavaprimeServiceOrderStorageValidContracts`
- `document.documentElement.dataset.lavaprimeServiceOrderStorageInvalidContracts`
- `document.documentElement.dataset.lavaprimeServiceOrderReadyForSupabaseDesign`
- `document.documentElement.dataset.lavaprimeServiceOrderReadyForSupabaseWrite`
