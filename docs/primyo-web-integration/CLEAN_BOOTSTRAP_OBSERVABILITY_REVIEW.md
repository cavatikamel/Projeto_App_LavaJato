# Clean Bootstrap Observability Review

## Objetivo

Registrar a revisao tecnica da observabilidade do trial protegido do `CLEAN_BOOTSTRAP` sem ativar o modo limpo como padrao, sem remover a massa `demo/teste` e sem abrir Supabase.

## Causa encontrada

A baixa observabilidade anterior passou a ter duas causas documentadas:

1. `app/main.js` nao entra no primeiro instante do carregamento da pagina, porque o shell React faz bootstrap assincrono do legado em `app/src/App.jsx`;
2. a inspecao automatizada usada no smoke nao estava enxergando os globais tecnicos do runtime de forma confiavel, mesmo com o app legado funcional.

Consequencia:

- os diagnosticos tecnicos continuam existindo para leitura manual via console real do navegador;
- a automacao passa a depender de um espelho tecnico somente leitura no DOM para confirmar o estado do trial protegido.

## Metodo tecnico oficial

### Leitura manual via console do navegador

Comandos oficiais:

```text
window.__lavaprimeGetCleanBootstrapDiagnostics?.()
window.__lavaprimeDiagnostics?.cleanBootstrap
```

Essas leituras devem retornar snapshot tecnico contendo:

- modo ativo;
- modo padrao;
- confirmacao de que `DEMO_BOOTSTRAP` continua default;
- confirmacao de que `CLEAN_BOOTSTRAP` continua protegido;
- `readinessLatest`;
- `trialReadinessLatest`;
- `trialExecutionLatest`;
- bloqueio explicito para promocao do modo limpo;
- confirmacao de que Supabase continua fechado.

### Leitura automatizada via DOM

O runtime passa a publicar o espelho tecnico abaixo:

```text
document.documentElement.dataset.lavaprimeDiagnosticsAvailable
document.documentElement.dataset.lavaprimeCleanBootstrapMode
document.documentElement.dataset.lavaprimeCleanBootstrapDefaultMode
document.documentElement.dataset.lavaprimeCleanBootstrapTrialStatus
document.documentElement.dataset.lavaprimeCleanBootstrapUnsafeSurfaceCount
document.documentElement.dataset.lavaprimeCleanBootstrapImprovedSurfaceCount
document.getElementById("lavaprime-clean-bootstrap-diagnostics")?.textContent
```

Uso esperado:

- `dataset` para checks rapidos de disponibilidade e modo;
- `script[type="application/json"]` para leitura estruturada do snapshot completo.

## Diagnosticos atualmente disponiveis

- `window.__lavaprimeCleanBootstrapReadiness`
- `window.__lavaprimeCleanBootstrapTrialReadiness`
- `window.__lavaprimeCleanBootstrapTrialExecution`
- `window.__lavaprimeBootstrapMode`
- `window.__lavaprimeDiagnostics?.cleanBootstrap`
- `window.__lavaprimeGetCleanBootstrapDiagnostics?.()`

## Resultado observado na validacao desta fase

Na inspecao automatizada do browser:

- `window.__lavaprimeGetCleanBootstrapDiagnostics` permaneceu `undefined`;
- `window.__lavaprimeDiagnostics?.cleanBootstrap` permaneceu indisponivel no contexto automatizado;
- o espelho no DOM respondeu corretamente e passou a ser a evidencia automatizada confiavel;
- `document.documentElement.dataset.lavaprimeDiagnosticsAvailable` retornou `true`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapMode` retornou `DEMO_BOOTSTRAP`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapDefaultMode` retornou `DEMO_BOOTSTRAP`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapTrialStatus` retornou `diagnostic-only`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapUnsafeSurfaceCount` retornou `0`;
- `document.documentElement.dataset.lavaprimeCleanBootstrapImprovedSurfaceCount` retornou `5`;
- o `script` JSON espelhado retornou snapshot completo com `readinessLatest`, `trialReadinessLatest`, `trialExecutionLatest` e `supabaseRuntimeOpened: false`.

Leitura pratica adotada:

- console real do navegador continua sendo o ponto manual desejado para `window.__lavaprimeGetCleanBootstrapDiagnostics?.()`;
- automacao e smoke assistido devem usar prioritariamente o espelho tecnico no DOM enquanto a exposicao de globais continuar inconsistente nesse contexto de inspecao.

## Confirmacoes preservadas

- `DEMO_BOOTSTRAP` continua o modo padrao oficial;
- `CLEAN_BOOTSTRAP` continua protegido e nao ativo como default;
- o trial continua apenas como diagnostico tecnico;
- nenhuma seed demo foi removida;
- nenhuma persistencia nova foi criada;
- nenhuma UI nova foi criada;
- Supabase continua fechado.

## Riscos remanescentes

- a visibilidade dos objetos globais continua podendo variar conforme o contexto de inspecao automatizada;
- a confianca operacional passa a depender do uso combinado de console real e espelho no DOM;
- a melhoria de observabilidade nao muda o bloqueio estrutural para promocao de `CLEAN_BOOTSTRAP` a `default`.

## Rollback

1. reverter `app/main.js`;
2. remover o espelho tecnico no DOM e a funcao `window.__lavaprimeGetCleanBootstrapDiagnostics`;
3. remover este documento e os registros da fase;
4. reexecutar `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke manual.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-010 - Observable clean bootstrap diagnostics confirmation`

Objetivo:

- confirmar repetibilidade da leitura tecnica no browser com o metodo novo;
- manter `DEMO_BOOTSTRAP` como default;
- continuar sem Supabase e sem remocao de seed demo.
