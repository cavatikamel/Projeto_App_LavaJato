# Service Order Shadow Write Rehearsal

## Objetivo

Executar um ensaio tecnico local do `shadow write` da `Service Order` sem qualquer escrita real.

## Escopo LP-SERVICE-ORDER-007

- analisar contratos em lote;
- validar payloads em lote;
- contar payloads elegiveis apenas localmente;
- verificar bloqueio do adapter;
- confirmar ausencia de rede e ausencia de Supabase;
- publicar diagnostico `shadowWriteRehearsal`.

## Estrutura esperada

```javascript
shadowWriteRehearsal: {
  enabled: true,
  mode: "dry-run-rehearsal",
  contractsAnalyzed: 0,
  payloadsValidated: 0,
  payloadsEligibleLocalOnly: 0,
  payloadsRejected: 0,
  adapterMode: "disabled",
  gateCanActivate: false,
  writeAttempted: false,
  writeBlocked: true,
  blockedWriteVerified: true,
  blockedWriteVerificationMethod: "",
  supabaseTouched: false,
  networkWriteAttempted: false,
  readyForStagingActivation: false,
  blockers: [],
  warnings: []
}
```

## Interpretacao

- `payloadsEligibleLocalOnly` significa payload estruturalmente valido, nao write permitido;
- `blockedWriteVerified = true` significa que a trilha comprovou bloqueio seguro;
- `readyForStagingActivation = false` permanece obrigatorio nesta fase.
