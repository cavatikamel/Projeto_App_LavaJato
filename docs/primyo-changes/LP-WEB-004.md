# LP-WEB-004 - First Controlled Web Extraction

## Objetivo

Extrair `sessionBoundary` e `accessBoundary` do monolito `app/main.js` para um modulo proprio, mantendo comportamento equivalente e preservando a API publica atual.

## Arquivos alterados

- `app/main.js`
- `app/boundaries/sessionAccessBoundary.js`
- `docs/primyo-changes/LP-WEB-004.md`
- `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
- `docs/primyo-web-boundaries/WEB_FIRST_EXTRACTION_PROPOSAL.md`
- `docs/primyo-web-boundaries/WEB_EXTRACTION_ORDER.md`
- `docs/primyo-web-boundaries/WEB_BOUNDARY_RISK_ANALYSIS.md`
- `docs/primyo-web-boundaries/WEB_TEST_IMPACT.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`

## Motivo

`LP-WEB-002`, `LP-TEST-003` e `LP-PERM-001` prepararam a primeira extracao segura do monolito.

As fronteiras de sessao e acesso ja tinham responsabilidade clara, baixo acoplamento com dados de negocio e smoke tests objetivos.

## Risco

Risco geral: `Medio`.

Principais riscos:

- perder sincronizacao com `selectedProfile`;
- perder sincronizacao com `activeSessionUser`;
- quebrar login administrador;
- quebrar login operador;
- bloquear indevidamente area administrativa ou patio;
- introduzir erro de importacao no build.

## Plano de implementacao

1. Criar `app/boundaries/sessionAccessBoundary.js`.
2. Mover para o novo arquivo apenas as factories `createSessionBoundary(...)` e `createAccessBoundary(...)`.
3. Exportar as duas factories.
4. Importar as factories em `app/main.js`.
5. Instanciar `sessionBoundary` e `accessBoundary` em `app/main.js`.
6. Preservar `window.__lavaprimeSessionBoundary`.
7. Preservar `window.__lavaprimeAccessBoundary`.
8. Preservar compatibilidade com `selectedProfile` e `activeSessionUser` por callback de sincronizacao.
9. Nao extrair nenhuma outra fronteira.

## Plano de teste

Validacoes obrigatorias:

- `npm.cmd run build`
- `npm.cmd run verify:build`
- `node --check app/main.js`
- `node --check scripts/sync-fipe-local-db.mjs`
- `node --check app/boundaries/sessionAccessBoundary.js`

Smoke test obrigatorio:

- login administrador;
- acesso administrativo;
- navegacao principal;
- acesso ao patio pelo admin;
- logout;
- login operador;
- acesso ao patio;
- validacoes de permissoes basicas;
- console sem `warn` ou `error` visivel.

## Plano de rollback

Rollback simples:

1. Remover o import de `app/boundaries/sessionAccessBoundary.js` em `app/main.js`.
2. Restaurar as factories `createSessionBoundary(...)` e `createAccessBoundary(...)` dentro de `app/main.js`.
3. Remover `app/boundaries/sessionAccessBoundary.js`.
4. Reexecutar build, verify, `node --check` e smoke test.

## Resultado da validacao

Validacoes executadas em `2026-06-24`:

- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- `node --check app/main.js` -> sucesso
- `node --check scripts/sync-fipe-local-db.mjs` -> sucesso
- `node --check app/boundaries/sessionAccessBoundary.js` -> sucesso

Smoke test executado:

- login administrador -> aprovado
- acesso administrativo -> aprovado
- navegacao principal -> aprovado
- acesso ao patio pelo admin -> aprovado
- acesso financeiro como admin -> aprovado
- logout -> aprovado
- login operador -> aprovado
- acesso ao patio -> aprovado
- operador sem shell administrativa -> aprovado
- console sem `warn` ou `error` visivel -> aprovado

Validacoes de permissoes basicas:

- admin acessa area administrativa;
- admin acessa financeiro;
- admin acessa patio;
- operador acessa patio;
- operador nao recebe shell administrativa.

## Decisao final

Resultado final: `Aprovado tecnicamente`

Observacao:

- a fase ainda devera ter encerramento formal posterior para incorporar `LP-WEB-004` a baseline consolidada antes da proxima implementacao.
