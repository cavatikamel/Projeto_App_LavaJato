# LP-TEST-AUTO-004

## Objetivo

Reforcar a regressao automatica de `app/adapters/shared/idResolver.js` antes de qualquer integracao funcional, mantendo `app/main.js`, adapters de dominio, runtime e Supabase fora do escopo.

## Tipo de fase

- `Implementation Phase`

## Arquivos criados

- `docs/primyo-changes/LP-TEST-AUTO-004.md`

## Arquivos atualizados

- `scripts/primyo-adapter-gate.mjs`
- `docs/primyo-web-contracts/id-resolution/RESOLVER_TEST_REQUIREMENTS.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`

## Escopo implementado

- ampliacao do Adapter Gate para cobertura mais forte do `idResolver`;
- manutencao de `idResolver.js` sem alteracao funcional;
- propagacao documental do novo baseline de regressao.

## Cenarios adicionados ao gate

- `canonicalId` valido com filtro de entidade via `contractName`;
- `canonicalId` com entidade errada, bloqueado com `CANONICAL_NOT_FOUND`;
- resolucao por `legacyRefs` aprovados preservando `source` e `sourceId`;
- ambiguidade em `legacyRefs` bloqueada com `LEGACY_REFERENCE_AMBIGUOUS`;
- `legacyRefs` inexistente bloqueado com `LEGACY_REFERENCE_NOT_FOUND`;
- query vazia bloqueada com `RESOLUTION_IDENTIFIER_REQUIRED`;
- query com `name` bloqueada com `FORBIDDEN_LOOKUP_FIELD`;
- query com `plate` bloqueada com `FORBIDDEN_LOOKUP_FIELD`;
- contrato sem `id` explicito derivando `id` canonico a partir de `sourceId`;
- indice com contratos duplicados emitindo warnings de duplicidade;
- garantia de que fixtures e payloads originais nao sao mutados;
- indice vazio aceito de forma controlada;
- indice com entradas invalidas produzindo warnings controlados;
- falhas exigindo `code` e `reason` explicitos.

## Garantias preservadas

- nenhuma integracao funcional foi iniciada;
- `app/main.js` permaneceu intacto;
- nenhum adapter de dominio foi alterado;
- nome, placa e texto livre continuam proibidos como identidade oficial;
- ambiguidade continua bloqueada;
- o gate continua puro, local e sem dependencias novas.

## Riscos

- a cobertura continua conceitual e local, sem browser ou runtime real;
- `idResolver` ainda nao cobre relacoes operacionais e financeiras em uso funcional;
- a camada ainda depende de contratos e envelopes continuarem aderentes ao baseline compartilhado;
- integrar o resolvedor antes do fechamento formal da fase continuaria prematuro.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `node --check app/adapters/shared/idResolver.js`
- `node --check scripts/primyo-adapter-gate.mjs`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Rollback

1. reverter os ajustes em `scripts/primyo-adapter-gate.mjs`;
2. reverter este change record e a documentacao propagada da fase;
3. reexecutar `node --check scripts/primyo-adapter-gate.mjs`;
4. reexecutar `node scripts/primyo-adapter-gate.mjs`;
5. reexecutar `npm.cmd run primyo:gate`, build e verify.

## Limitacoes

- nenhum comportamento de runtime foi exercitado;
- `scripts/primyo-gate.mjs` nao precisou de alteracao;
- a baseline oficial ainda depende de closure formal para absorcao completa da fase.
