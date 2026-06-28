# LP-WEB-ID-RESOLVER-002

## Objetivo

Implementar a primeira versao pura e reversivel de `app/adapters/shared/idResolver.js` para resolucao segura de IDs canonicos e `legacyRefs`, sem tocar no runtime, sem alterar `app/main.js` e sem abrir Supabase.

## Tipo de fase

- `Implementation Phase`

## Arquivos criados

- `app/adapters/shared/idResolver.js`
- `docs/primyo-changes/LP-WEB-ID-RESOLVER-002.md`

## Arquivos atualizados

- `scripts/primyo-adapter-gate.mjs`
- `scripts/primyo-gate.mjs`
- `docs/primyo-web-contracts/id-resolution/IMPLEMENTATION_READINESS.md`
- `docs/primyo-web-contracts/id-resolution/RESOLVER_TEST_REQUIREMENTS.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`

## API exposta

O modulo expoe:

- `createResolutionIndex(contracts, options)`
- `resolveCanonicalId(index, query)`
- `resolveLegacyReference(index, query)`
- `createResolutionResult(options)`
- `ID_RESOLVER_VERSION`

## Garantias preservadas

- modulo puro, sem IO e sem dependencia de runtime;
- nenhuma alteracao em `app/main.js`;
- nenhum adapter existente foi alterado;
- nenhuma integracao funcional foi iniciada;
- ambiguidade continua bloqueada explicitamente;
- nome, placa, telefone, documento e texto livre continuam proibidos como identidade oficial.

## Cenarios automatizados no gate

- importacao e exports minimos do `idResolver`;
- independencia estrutural em Node puro;
- resolucao canonica valida;
- resolucao valida por `legacyRefs` aprovados;
- falha controlada sem `canonicalId` ou `sourceId`;
- falha controlada em caso ambiguo;
- bloqueio de lookup por nome;
- bloqueio de lookup por placa;
- preservacao de `legacyRefs` no resultado.

## Riscos

- o resolvedor ainda nao cobre attendance, payment, financial ou ownership completo entre dominios;
- o shape atual depende de contratos e envelopes seguirem o baseline de identidade ja aprovado;
- integracao ao runtime antes de uma fase propria continuaria prematura;
- ainda nao existe fechamento formal da fase, baseline ou smoke de integracao porque o modulo permanece fora do runtime.

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

1. remover `app/adapters/shared/idResolver.js`;
2. reverter os ajustes em `scripts/primyo-adapter-gate.mjs`;
3. reverter os ajustes em `scripts/primyo-gate.mjs`;
4. reverter este change record e a documentacao associada;
5. reexecutar `node scripts/primyo-adapter-gate.mjs`;
6. reexecutar `npm.cmd run primyo:gate`, build e verify.

## Limitacoes

- nenhum adapter passou a consumir o resolvedor;
- nenhuma relacao cross-domain foi integrada ao produto;
- nenhum dado real foi migrado;
- nenhum comportamento funcional foi alterado.
