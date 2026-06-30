# Clean Bootstrap Diagnostics Confirmation

## Objetivo

Confirmar a repetibilidade e a confiabilidade do metodo de diagnostico observavel criado em `LP-WEB-DATA-CLEANUP-009`, sem ativar `CLEAN_BOOTSTRAP` como padrao, sem remover massa demo e sem abrir Supabase.

## Consultas reexecutadas

Leituras manuais previstas:

```text
window.__lavaprimeGetCleanBootstrapDiagnostics?.()
window.__lavaprimeDiagnostics?.cleanBootstrap
```

Leituras automatizadas previstas:

```text
document.documentElement.dataset
document.querySelector('#lavaprime-clean-bootstrap-diagnostics')?.textContent
```

## Resultado por canal

### 1. Globais de `window`

Resultado confirmado no contexto de avaliacao direta da pagina:

- `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` ficou disponivel como `function`;
- `window.__lavaprimeDiagnostics?.cleanBootstrap` ficou disponivel de forma repetivel;
- os dois canais responderam tanto antes do login quanto nos estados admin e operador.

Leitura importante:

- o contexto automatizado que consulta a pagina diretamente consegue ler os globais com consistencia nesta fase;
- isso nao invalida a cautela registrada na fase 009 para outros contextos de inspecao, mas reduz a incerteza operacional.

### 2. Espelho tecnico no DOM

Resultado confirmado:

- `document.documentElement.dataset.*` respondeu em todas as verificacoes;
- `#lavaprime-clean-bootstrap-diagnostics` respondeu com snapshot JSON legivel;
- o espelho permaneceu consistente entre as etapas observadas.

## Valores observados

### Pre-login

- `activeMode=DEMO_BOOTSTRAP`
- `defaultMode=DEMO_BOOTSTRAP`
- `trialStatus=diagnostic-only`
- `diagnosticsAvailable=true`
- `supabaseRuntimeOpened=false`
- `unsafeSurfaceCount=-1`
- `improvedSurfaceCount=0`

Interpretacao:

- o snapshot pre-login existe e e util para provar disponibilidade do diagnostico;
- ele ainda nao representa o estado operacional final da trilha, porque os contadores permanecem parciais antes da consolidacao do fluxo.

### Admin

- `activeMode=DEMO_BOOTSTRAP`
- `defaultMode=DEMO_BOOTSTRAP`
- `trialStatus=diagnostic-only`
- `diagnosticsAvailable=true`
- `supabaseRuntimeOpened=false`
- `cleanBootstrapDefault=false`
- `unsafeSurfaceCount=0`
- `improvedSurfaceCount=5`

### Operador

- `activeMode=DEMO_BOOTSTRAP`
- `defaultMode=DEMO_BOOTSTRAP`
- `trialStatus=diagnostic-only`
- `diagnosticsAvailable=true`
- `supabaseRuntimeOpened=false`
- `cleanBootstrapDefault=false`
- `unsafeSurfaceCount=0`
- `improvedSurfaceCount=5`

## Metodo recomendado de auditoria

### Manual no browser

Usar:

```text
window.__lavaprimeGetCleanBootstrapDiagnostics?.()
window.__lavaprimeDiagnostics?.cleanBootstrap
```

### Automatizado e repetivel

Usar prioritariamente:

```text
document.documentElement.dataset.lavaprimeDiagnosticsAvailable
document.documentElement.dataset.lavaprimeCleanBootstrapMode
document.documentElement.dataset.lavaprimeCleanBootstrapDefaultMode
document.documentElement.dataset.lavaprimeCleanBootstrapTrialStatus
document.documentElement.dataset.lavaprimeCleanBootstrapUnsafeSurfaceCount
document.documentElement.dataset.lavaprimeCleanBootstrapImprovedSurfaceCount
document.querySelector('#lavaprime-clean-bootstrap-diagnostics')?.textContent
```

Motivo:

- o espelho DOM continua sendo a evidencia mais estavel entre automacao, smoke assistido e auditoria documental;
- os globais de `window` passaram a responder bem nesta fase, mas o DOM continua sendo o canal mais facil de padronizar em evidencias futuras.

## Confirmacoes preservadas

- `DEMO_BOOTSTRAP` continua o modo padrao oficial;
- `CLEAN_BOOTSTRAP` continua protegido e nao ativo como default;
- o trial continua apenas diagnostico;
- nenhuma seed demo foi removida;
- nenhuma integracao com Supabase foi iniciada.

## Bloqueio remanescente para promocao a default

Mesmo com a observabilidade confirmada:

- ainda falta base limpa com volume util;
- ainda faltam relacionamentos persistidos confiaveis;
- ainda nao existe readiness operacional para trocar o bootstrap padrao.

## Riscos

- o estado pre-login pode ser interpretado de forma errada se for tratado como fotografia final do trial;
- a disponibilidade de `window` pode continuar sensivel ao contexto exato de inspecao, mesmo tendo se mostrado repetivel nesta fase;
- a confirmacao da observabilidade nao deve ser confundida com permissao para ativar `CLEAN_BOOTSTRAP`.

## Rollback

1. remover este documento;
2. remover o change record da fase;
3. manter `app/main.js` sem novos ajustes de observabilidade;
4. reexecutar `primyo:gate`, `build`, `verify:build` e smoke manual.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-011 - Clean bootstrap default blockers consolidation`
