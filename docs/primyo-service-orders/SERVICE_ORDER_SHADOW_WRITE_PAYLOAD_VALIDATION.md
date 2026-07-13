# Service Order Shadow Write Payload Validation

## Objetivo

Validar localmente o payload canonico da `Service Order` antes de qualquer futura tentativa de `shadow write`.

## Fonte

A validacao usa o contrato de storage existente como base e adiciona checks especificos de write.

## Campos validados

- `schemaVersion`
- `serviceOrder.id`
- `serviceOrder.orderNumber`
- `serviceOrder.status`
- `legacy.legacyAttendanceId`
- totais numericos essenciais
- `payments[*].serviceOrderId`
- `documents[*].serviceOrderId`
- `events[*].serviceOrderId`

## Resultado esperado

```javascript
{
  valid: true,
  errors: [],
  warnings: [],
  missingRequiredFields: [],
  eligibleForShadowWrite: true,
  readyForSupabaseWrite: false,
  supabaseTouched: false,
  networkWriteAttempted: false
}
```

## Interpretacao

- `eligibleForShadowWrite = true` significa apenas payload local consistente;
- isso nao autoriza write;
- `readyForSupabaseWrite` continua `false` nesta fase;
- a validacao serve para readiness, nao para ativacao.
