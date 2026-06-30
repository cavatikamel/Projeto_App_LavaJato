# LP-WEB-DATA-CLEANUP-009

## Objetivo

Revisar e melhorar a observabilidade tecnica do trial protegido do `CLEAN_BOOTSTRAP`, sem ativar o modo limpo como padrao, sem remover a massa `demo/teste` e sem abrir Supabase.

## Causa encontrada ou hipotese documentada

Dois fatores explicam a baixa observabilidade anterior:

1. o bootstrap legado nao nasce no primeiro instante do carregamento da pagina, porque `app/main.js` entra por bootstrap assincrono do shell React;
2. a inspecao automatizada usada no smoke nao estava enxergando os globais tecnicos do runtime da pagina de forma confiavel, mesmo quando o app legado ja estava funcional.

Conclusao operacional:

- os diagnosticos em `window` continuam uteis para leitura manual em console do navegador;
- para validacao tecnica mais robusta, a fase passou a publicar tambem um espelho somente leitura no DOM.

## Metodo tecnico criado

### Console do navegador

- `window.__lavaprimeGetCleanBootstrapDiagnostics?.()`
- `window.__lavaprimeDiagnostics?.cleanBootstrap`

### Espelho tecnico no DOM

- `document.documentElement.dataset.lavaprimeDiagnosticsAvailable`
- `document.documentElement.dataset.lavaprimeCleanBootstrapMode`
- `document.documentElement.dataset.lavaprimeCleanBootstrapDefaultMode`
- `document.documentElement.dataset.lavaprimeCleanBootstrapTrialStatus`
- `document.documentElement.dataset.lavaprimeCleanBootstrapUnsafeSurfaceCount`
- `document.documentElement.dataset.lavaprimeCleanBootstrapImprovedSurfaceCount`
- `document.getElementById("lavaprime-clean-bootstrap-diagnostics")?.textContent`

## Diagnosticos cobertos

- `window.__lavaprimeCleanBootstrapReadiness`
- `window.__lavaprimeCleanBootstrapTrialReadiness`
- `window.__lavaprimeCleanBootstrapTrialExecution`
- `window.__lavaprimeBootstrapMode`

O snapshot tecnico agora confirma:

- `DEMO_BOOTSTRAP` continua padrao;
- `CLEAN_BOOTSTRAP` continua protegido;
- `CLEAN_BOOTSTRAP` nao esta ativo como padrao;
- o trial continua apenas diagnostico;
- Supabase continua fechado;
- `currentUnsafeSurfaceCount` pode ser lido no estado atual;
- `improvedSurfaceCount` pode ser lido no estado atual.

## Evidencia observada no browser

Resultado observado no smoke desta fase:

- o contexto automatizado continuou sem expor `window.__lavaprimeGetCleanBootstrapDiagnostics` e `window.__lavaprimeDiagnostics` de forma confiavel;
- o espelho tecnico no DOM passou a responder corretamente;
- `document.documentElement.dataset.lavaprimeDiagnosticsAvailable` retornou `true`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapMode` retornou `DEMO_BOOTSTRAP`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapDefaultMode` retornou `DEMO_BOOTSTRAP`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapTrialStatus` retornou `diagnostic-only`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapUnsafeSurfaceCount` retornou `0` ao fim da reavaliacao atual;
- `document.documentElement.dataset.lavaprimeCleanBootstrapImprovedSurfaceCount` retornou `5`;
- `document.getElementById("lavaprime-clean-bootstrap-diagnostics")?.textContent` retornou snapshot JSON com `readinessLatest`, `trialReadinessLatest`, `trialExecutionLatest` e confirmacao de `supabaseRuntimeOpened: false`.

Leitura operacional adotada:

- usar `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` e `window.__lavaprimeDiagnostics?.cleanBootstrap` como interface manual pretendida para console real do navegador;
- usar o espelho no DOM como evidencia automatizada confiavel desta trilha.

## Garantias preservadas

- nenhum botao, modal ou tela nova foi criado;
- nenhuma mudanca visual intencional foi introduzida;
- nenhuma persistencia nova foi adicionada;
- nenhuma permissao, autenticacao ou salvamento foi alterado;
- nenhuma seed demo foi removida;
- Supabase continua fechado.

## Validacoes previstas

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
- smoke manual com validacao de console e do espelho tecnico

## Riscos

- a observabilidade automatizada continua dependente de estrategia dupla: console da pagina e espelho no DOM;
- a melhoria de observabilidade nao altera o fato de que `CLEAN_BOOTSTRAP` continua inadequado para virar `default`;
- a base limpa continua sem volume e sem relacionamentos persistidos suficientes para promocao.

## Rollback

1. reverter `app/main.js`;
2. remover `docs/primyo-web-integration/CLEAN_BOOTSTRAP_OBSERVABILITY_REVIEW.md`;
3. reverter `DEMO_DATA_CLEANUP_PLAN.md`, backlog, change control, next slice e docs de teste;
4. reexecutar gate, build, verify e smoke rapido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-010 - Observable clean bootstrap diagnostics confirmation`
