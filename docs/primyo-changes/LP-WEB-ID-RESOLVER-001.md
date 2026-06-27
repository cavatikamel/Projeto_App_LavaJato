# LP-WEB-ID-RESOLVER-001

## Objetivo

Planejar a futura camada de resolucao de IDs entre contratos e adapters do LavaPrime sem implementar codigo, sem alterar runtime e sem abrir Supabase.

## Tipo de fase

- `Planning Phase`
- `Documentation Phase`

## Arquivos criados

- `docs/primyo-web-contracts/id-resolution/ID_RESOLVER_STRATEGY.md`
- `docs/primyo-web-contracts/id-resolution/ID_RESOLUTION_MAP.md`
- `docs/primyo-web-contracts/id-resolution/LEGACY_ID_RISKS.md`
- `docs/primyo-web-contracts/id-resolution/RESOLVER_TEST_REQUIREMENTS.md`
- `docs/primyo-web-contracts/id-resolution/IMPLEMENTATION_READINESS.md`
- `docs/primyo-changes/LP-WEB-ID-RESOLVER-001.md`

## Arquivos atualizados

- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`

## Decisoes consolidadas

- o resolvedor de IDs sera necessario, mas continua fora do runtime nesta fase;
- `legacyRefs` continua como trilha de reconciliacao, nao como ownership oficial;
- nome, placa, texto livre e chaves derivadas continuam proibidos como identidade oficial;
- relacoes ambiguas devem bloquear, nao resolver automaticamente;
- Supabase continua fechado;
- implementacao real do resolvedor fica para uma fatia futura e pequena.

## Riscos

- IDs legados instaveis;
- ausencia de `sourceId`;
- uso de placa ou nome como identidade;
- duplicidade entre clientes operacionais e faturados;
- mistura entre produto e insumo;
- `serviceSupplyProfiles` sem IDs canonicos;
- relacoes financeiras sem referencia primaria clara;
- migracao prematura para Supabase.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Rollback

1. remover `docs/primyo-web-contracts/id-resolution/`;
2. reverter este change record;
3. reverter backlog, change control, next slice e requisitos de teste atualizados;
4. reexecutar `npm.cmd run primyo:gate`.

## Limitacoes

- nenhum resolver foi criado;
- nenhum adapter foi alterado;
- nenhum gate foi alterado;
- nenhuma integracao funcional foi iniciada.
