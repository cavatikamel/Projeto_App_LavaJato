# Service Order Read Model

## Objetivo

Definir um modelo de leitura leve, seguro e reutilizavel para consumir a `Service Order` sem trocar a estrutura principal do runtime.

## Builder

`buildServiceOrderReadModel(serviceOrderSnapshot, options = {})`

## Campos

- `serviceOrderId`
- `serviceOrderNumber`
- `legacyAttendanceId`
- `status`
- `customerName`
- `vehicleLabel`
- `totalAmount`
- `paidAmount`
- `pendingAmount`
- `documentRefs`
- `paymentRefs`
- `ready`
- `source`
- `fallbackActive`
- `fallbackReason`
- `matchedBy`

## Origem atual

- `service-order-storage-contract`
- `legacy-document-fallback`

## Regras

- nao mutar registros legados;
- nao gerar `NaN`, `undefined` visivel ou `Invalid Date`;
- indicar explicitamente quando a OS veio de fallback;
- permanecer pequeno o suficiente para uso auxiliar em runtime.
