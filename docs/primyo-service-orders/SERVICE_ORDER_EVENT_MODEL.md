# Service Order Event Model

## Shape atual

Cada evento da OS passa a seguir o shape tecnico abaixo:

```javascript
{
  id,
  type,
  description,
  occurredAt,
  createdAt,
  author,
  source,
  sourceType,
  serviceOrderId,
  serviceOrderNumber,
  legacyAttendanceId,
  legacyReference: {
    collection,
    id
  }
}
```

## Tipos usados nesta fase

- `created`
- `status_mapped`
- `payment_linked`
- `document_linked`
- `completed`
- eventos herdados de `attendanceHistory`, mantendo `type` legacy quando existir

## Origem dos eventos

- `attendanceHistory`
- `legacy-attendance-bridge`
- `cashEntries`
- `openPayments`
- `documentHistory`

## Limites

- eventos ainda nao sao persistidos em storage dedicado;
- o historico continua sendo reconstrucao runtime;
- a trilha futura precisara decidir quais eventos passam a ser fonte oficial.
