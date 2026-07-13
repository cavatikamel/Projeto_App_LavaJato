# Service Order Supabase Readiness

## Situacao atual

`Service Order` ainda nao toca Supabase.

Estado confirmado nesta fase:

- `supabaseTouched = false`
- `requiresBackend = true`
- nenhuma migration criada
- nenhuma variavel de ambiente alterada
- nenhum fluxo de bootstrap alterado

## O que ja esta pronto

- identidade local de OS;
- numero local de OS;
- links explicitos com pagamentos, documentos e eventos;
- snapshot de persistencia local;
- diagnostico ampliado para medir cobertura da bridge;
- contrato canonico de storage com `schemaVersion`;
- validacao local do contrato;
- builder em lote de storage snapshots;
- readiness para design de backend observavel no diagnostico.

## O que falta antes de backend

- contrato persistido definitivo de `service_orders`;
- definicao de chaves externas;
- estrategia de deduplicacao e numeracao definitiva;
- migration formal;
- estrategia de backfill do legado;
- autorizacao explicita para abrir Supabase.

## Decisao desta fase

Supabase continua fechado.

A readiness desta fase e apenas estrutural.

Estado atualizado:

- `readyForSupabaseDesign = true` quando os contratos locais nao apresentam erros estruturais;
- `readyForSupabaseWrite = false`;
- `migrationRequired = true`;
- nenhuma escrita real foi iniciada.

## Atualizacao LP-SERVICE-ORDER-006

Mesmo com adapter e gate de `shadow write` criados:

- `readyForSupabaseWrite` continua `false`;
- `shadowWrite.enabled` continua `false`;
- `shadowWriteAdapter.mode` continua `disabled`;
- `supabaseTouched` continua `false`;
- `networkWriteAttempted` continua `false`.

O adapter desta fase serve apenas para:

- bloquear write acidental;
- validar payload local;
- documentar readiness de ativacao futura em staging.

## Atualizacao LP-SERVICE-ORDER-007

O rehearsal desta fase reforca que:

- payload elegivel localmente nao autoriza write;
- `readyForStagingActivation` continua `false`;
- `readyForSupabaseWrite` continua `false`;
- `networkWriteAttempted` continua `false`;
- `supabaseTouched` continua `false`.
