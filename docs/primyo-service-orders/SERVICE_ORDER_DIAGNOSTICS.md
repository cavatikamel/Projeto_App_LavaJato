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
