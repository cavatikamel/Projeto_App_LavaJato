# Service Order Storage Validation

## Funcao local

A validacao local da fase usa:

```javascript
validateServiceOrderStorageContract(contract)
```

## Regras minimas

Valida:

- `schemaVersion`;
- identidade da OS;
- numero da OS;
- status;
- `createdAt`;
- `legacyAttendanceId`;
- totais numericos;
- `payments[*].serviceOrderId`;
- `documents[*].serviceOrderId`;
- `events[*].serviceOrderId`.

## Resultado esperado

Retorna:

- `valid`
- `errors`
- `warnings`
- `missingRequiredFields`
- `backendRequired`
- `migrationRequired`
- `readyForSupabaseDesign`
- `readyForSupabaseWrite`

## Leitura operacional

- ausencia de snapshot de cliente pode virar `warning`;
- ausencia de snapshot de veiculo pode virar `warning`;
- ausencia de identidade, numero, status, data principal ou legacy reference vira `error`;
- `readyForSupabaseWrite` continua `false` nesta fase.
