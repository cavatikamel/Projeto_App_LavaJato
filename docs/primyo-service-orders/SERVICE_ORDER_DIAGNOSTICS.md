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

## Atualizacao LP-SERVICE-ORDER-004

Novos campos principais do snapshot:

- `progressiveRead`

Bloco `progressiveRead` esperado:

- `enabled`
- `area`
- `readModelsBuilt`
- `readModelsWithFallback`
- `readModelsWithoutServiceOrder`
- `legacyFallbackActive`
- `visualOutputChanged`
- `primarySourceChanged`

Novos espelhos tecnicos relevantes:

- `document.documentElement.dataset.lavaprimeServiceOrderProgressiveReadArea`
- `document.documentElement.dataset.lavaprimeServiceOrderProgressiveReadModels`
- `document.documentElement.dataset.lavaprimeServiceOrderProgressiveReadWithFallback`
- `document.documentElement.dataset.lavaprimeServiceOrderProgressiveReadWithoutServiceOrder`

## Atualizacao LP-SERVICE-ORDER-005

Novos campos principais do snapshot:

- `documentSourceQuality`
- `shadowWrite`

Bloco `documentSourceQuality` esperado:

- `documentsAnalyzed`
- `documentsWithExplicitServiceOrderId`
- `documentsWithServiceOrderNumber`
- `documentsMatchedByLegacyId`
- `documentsMatchedByPaymentLink`
- `documentsMatchedByDocumentLink`
- `documentsMatchedByPlateFallback`
- `documentsWithoutServiceOrder`
- `highConfidenceMatches`
- `mediumConfidenceMatches`
- `lowConfidenceMatches`
- `fallbackRate`

Bloco `shadowWrite` esperado:

- `designed`
- `dryRunAvailable`
- `enabled`
- `mode`
- `recordsPlanned`
- `tables`
- `blockers`
- `activationCriteria`
- `supabaseTouched`
- `migrationRequired`

Novos espelhos tecnicos relevantes:

- `document.documentElement.dataset.lavaprimeServiceOrderDocumentQualityAnalyzed`
- `document.documentElement.dataset.lavaprimeServiceOrderDocumentQualityFallbackRate`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteDesigned`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteEnabled`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteRecordsPlanned`

## Atualizacao LP-SERVICE-ORDER-006

Novos campos principais do snapshot:

- `shadowWriteAdapter`

Bloco `shadowWriteAdapter` esperado:

- `exists`
- `mode`
- `gateEnabled`
- `canActivate`
- `allowedEnvironment`
- `payloadsValidated`
- `payloadsEligible`
- `writesAttempted`
- `writesBlocked`
- `supabaseTouched`
- `networkWriteAttempted`
- `blockers`

Novos espelhos tecnicos relevantes:

- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteAdapterMode`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteAdapterCanActivate`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteAdapterPayloadsEligible`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteAdapterWritesBlocked`

## Atualizacao LP-SERVICE-ORDER-007

Novos campos principais do snapshot:

- `shadowWriteRehearsal`

Bloco `shadowWriteRehearsal` esperado:

- `enabled`
- `mode`
- `contractsAnalyzed`
- `payloadsValidated`
- `payloadsEligibleLocalOnly`
- `payloadsRejected`
- `adapterMode`
- `gateCanActivate`
- `writeAttempted`
- `writeBlocked`
- `blockedWriteVerified`
- `blockedWriteVerificationMethod`
- `supabaseTouched`
- `networkWriteAttempted`
- `readyForStagingActivation`
- `blockers`
- `warnings`

Novos espelhos tecnicos relevantes:

- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteRehearsalMode`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteRehearsalEligible`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteRehearsalBlockedVerified`
- `document.documentElement.dataset.lavaprimeServiceOrderShadowWriteRehearsalReadyForStaging`

## Atualizacao LP-SERVICE-ORDER-008

Nesta fase nao houve novo campo de runtime.

O diagnostico atual continua suficiente para provar:

- prontidao estrutural local;
- bloqueio do adapter;
- ausencia de rede;
- ausencia de Supabase.

O diagnostico atual continua insuficiente, sozinho, para provar:

- URL real de `staging`;
- alvo operacional Netlify;
- backend Supabase staging real;
- migration aprovada;
- `RLS` e tenant isolation implementados;
- smoke remoto publicado.
