# Service Order Shadow Write Adapter

## Objetivo

Representar a futura porta tecnica de `shadow write` da `Service Order` sem executar escrita real nesta fase.

## Escopo LP-SERVICE-ORDER-006

- adapter interno criado em `app/main.js`;
- adapter desligado por padrao;
- gate explicito acoplado ao adapter;
- validacao de payload antes de qualquer write futuro;
- dry-run integrado;
- nenhuma chamada remota.

## Comportamento atual

O adapter:

- existe;
- roda em `mode = disabled`;
- usa `evaluateServiceOrderShadowWriteGate(...)`;
- usa `validateServiceOrderShadowWritePayload(...)`;
- usa `buildServiceOrderShadowWritePlan(...)`;
- expõe `dryRun()` apenas como plano derivado;
- expõe `write(...)` apenas como bloqueio explicito.

## Garantias obrigatorias

- `shadowWrite.enabled = false`;
- `readyForSupabaseWrite = false`;
- `supabaseTouched = false`;
- `networkWriteAttempted = false`;
- nenhum `fetch`;
- nenhum cliente Supabase;
- nenhuma persistencia oficial.

## Resultado esperado do write

Nesta fase, `write(...)` deve sempre retornar bloqueado:

```javascript
{
  attempted: false,
  blocked: true,
  reason: "shadow-write-disabled",
  supabaseTouched: false,
  networkWriteAttempted: false
}
```

## Limite desta fase

O adapter nao autoriza:

- write local oficial;
- write remoto;
- dual write;
- staging activation automatica;
- promocao de runtime.
