# LP-SERVICE-ORDER-007

## Fase

`LP-SERVICE-ORDER-007 - Service Order Shadow Write Rehearsal And Blocked Write Verification`

## Objetivo

Executar um ensaio tecnico seguro do `shadow write` da `Service Order`, validando payloads e comprovando o bloqueio do adapter sem qualquer escrita real.

## Implementacao

- `buildServiceOrderShadowWriteRehearsal(...)` criado;
- payloads passam a ser validados em lote no rehearsal;
- contadores de payloads elegiveis e rejeitados passam a existir;
- verificacao de bloqueio do adapter passa a ficar registrada;
- `shadowWriteRehearsal` adicionado ao diagnostico;
- checklist de ativacao futura em staging criada.

## Fora de escopo mantido

- Supabase;
- migration executavel;
- alteracao visual;
- write real;
- env;
- Netlify;
- producao;
- push.
