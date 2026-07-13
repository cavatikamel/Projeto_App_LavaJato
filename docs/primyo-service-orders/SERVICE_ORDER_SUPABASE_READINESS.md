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
- diagnostico ampliado para medir cobertura da bridge.

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
