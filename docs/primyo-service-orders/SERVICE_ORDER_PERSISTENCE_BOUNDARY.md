# Service Order Persistence Boundary

## Status desta fase

A `Service Order` continua local e derivada, mas passa a ter uma fronteira explicita para futura persistencia.

O runtime agora separa:

- identidade tecnica da OS;
- links explicitos com pagamentos, documentos e eventos;
- snapshot pronto para persistencia futura;
- lacunas que ainda dependem de backend.

## O que foi materializado

- `resolveServiceOrderIdentityFromLegacy(...)`
- `createServiceOrderLink(...)`
- `attachServiceOrderLink(...)`
- `buildServiceOrderPersistenceSnapshot(...)`

## Fronteira atual

O objeto `serviceOrder.persistence` representa a fronteira local desta fase.

Campos centrais:

- `ready`
- `mode = local-derived-boundary`
- `requiresBackend = true`
- `supabaseTouched = false`
- `legacyBridgeVersion`
- `serviceOrderId`
- `orderNumber`
- `linkCounts`
- `gaps`

## O que continua derivado

- os registros seguem sendo montados a partir de `patioVehicles`;
- pagamentos continuam derivados de `cashEntries` e `openPayments`;
- documentos continuam derivados de `documentHistory`;
- invoices continuam somente como referencia diagnostica via `invoiceLineItems`;
- eventos continuam sinteticos ou herdados do `attendanceHistory`.

## O que ainda nao e persistencia real

Esta fase nao:

- grava `Service Order` em banco;
- altera Supabase;
- cria migration;
- troca o fluxo visual de `Atendimento`;
- redefine a numeracao definitiva de producao.

## Risco residual

- IDs seguem compativeis com o legado e podem denunciar duplicidade por diagnostico;
- documentos legados ainda dependem parcialmente de heuristica de associacao;
- a persistencia definitiva ainda depende de contrato backend.
