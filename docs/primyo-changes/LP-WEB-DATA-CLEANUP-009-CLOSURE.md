# LP-WEB-DATA-CLEANUP-009-CLOSURE

## Objetivo da fase

Revisar e melhorar a observabilidade tecnica do trial protegido do `CLEAN_BOOTSTRAP`, sem ativar o modo limpo como padrao, sem remover a massa demo e sem abrir Supabase.

## Observabilidade revisada

- o runtime passou a publicar leitura tecnica manual e espelho somente leitura no DOM;
- a fase confirmou que a automacao nao enxergava os globais de `window` com confiabilidade;
- o espelho DOM passou a responder corretamente como evidencia automatizada da trilha.

## Causa encontrada ou hipotese documentada

- o legado sobe por bootstrap assincrono via shell React antes da carga completa do runtime legado;
- a inspecao automatizada usada no smoke nao conseguiu observar os globais tecnicos de `window` com consistencia, mesmo com a aplicacao funcional;
- a leitura automatizada passa a depender do espelho DOM como ponte mais confiavel.

## Metodo tecnico criado ou ajustado

- leitura manual prevista por `window.__lavaprimeGetCleanBootstrapDiagnostics?.()`;
- leitura manual prevista por `window.__lavaprimeDiagnostics?.cleanBootstrap`;
- espelho tecnico no DOM por `document.documentElement.dataset.*`;
- espelho tecnico completo por `#lavaprime-clean-bootstrap-diagnostics` em `application/json`.

## Diagnosticos disponiveis

- `window.__lavaprimeCleanBootstrapReadiness`;
- `window.__lavaprimeCleanBootstrapTrialReadiness`;
- `window.__lavaprimeCleanBootstrapTrialExecution`;
- `window.__lavaprimeBootstrapMode`;
- `window.__lavaprimeGetCleanBootstrapDiagnostics?.()`;
- `window.__lavaprimeDiagnostics?.cleanBootstrap`.

## Arquivos alterados

- `app/main.js`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-009.md`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-009-CLOSURE.md`
- `docs/primyo-web-integration/CLEAN_BOOTSTRAP_OBSERVABILITY_REVIEW.md`
- `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Modo padrao confirmado

- `DEMO_BOOTSTRAP` continua o modo padrao oficial;
- `CLEAN_BOOTSTRAP` continua protegido e nao foi ativado como default.

## O que nao foi removido

- nenhuma seed demo/teste foi removida;
- `app/demo/lavaprimeDemoData.js` continua sustentando o bootstrap demo;
- Supabase continua fechado.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Resultado do smoke manual

- admin com dashboard, `Cadastros > Clientes`, patio, financeiro e `Recibos e Documentos` sem erro bloqueante;
- logout funcionando;
- operador com patio funcionando;
- console sem `warn` ou `error`.

## Resultado da consulta no console

- no contexto automatizado, `window.__lavaprimeGetCleanBootstrapDiagnostics` permaneceu `undefined`;
- `window.__lavaprimeDiagnostics` nao apareceu de forma confiavel na automacao;
- o espelho DOM respondeu corretamente com `diagnosticsAvailable=true`, `activeMode=DEMO_BOOTSTRAP`, `defaultMode=DEMO_BOOTSTRAP`, `trialStatus=diagnostic-only`, `unsafeSurfaceCount=0` e `improvedSurfaceCount=5`;
- o `script` JSON espelhado retornou snapshot completo com `readinessLatest`, `trialReadinessLatest`, `trialExecutionLatest` e `supabaseRuntimeOpened: false`.

## Confirmacao de que o espelho DOM respondeu corretamente

- `document.documentElement.dataset.lavaprimeDiagnosticsAvailable` respondeu `true`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapMode` respondeu `DEMO_BOOTSTRAP`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapDefaultMode` respondeu `DEMO_BOOTSTRAP`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapTrialStatus` respondeu `diagnostic-only`;
- `document.getElementById("lavaprime-clean-bootstrap-diagnostics")?.textContent` respondeu com snapshot JSON consistente.

## Warning nao bloqueante de chunk acima de 500 kB

- `npm.cmd run build` e `npm.cmd run primyo:gate` continuaram aprovados;
- o warning de chunk acima de `500 kB` permaneceu nao bloqueante.

## Riscos

- a automacao ainda depende do espelho no DOM para evidencia confiavel;
- a melhoria de observabilidade nao autoriza promover `CLEAN_BOOTSTRAP` a default;
- a base limpa continua sem volume e sem relacionamentos persistidos suficientes.

## Rollback

1. reverter `app/main.js`;
2. remover a publicacao de `window.__lavaprimeGetCleanBootstrapDiagnostics` e do espelho DOM;
3. reverter os documentos da fase;
4. reexecutar `primyo:gate`, build, verify e smoke manual.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-010 - Observable clean bootstrap diagnostics confirmation`

## Confirmacao de que comportamento visual/funcional foi preservado

- nenhuma UI nova foi criada;
- nenhum fluxo funcional foi alterado;
- `DEMO_BOOTSTRAP` continuou padrao observado.

## Confirmacao de que Supabase continua fechado

- nenhuma integracao com Supabase foi iniciada;
- o snapshot tecnico continua registrando `supabaseRuntimeOpened: false`.

## Confirmacao de que nao houve push

- nenhum `git push` foi executado nesta fase.
