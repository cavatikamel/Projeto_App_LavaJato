# LP-WEB-DATA-CLEANUP-010

## Objetivo

Confirmar a repetibilidade e a confiabilidade do diagnostico observavel do `CLEAN_BOOTSTRAP`, sem ativar o modo limpo como padrao, sem remover a massa demo e sem abrir Supabase.

## Escopo executado

- reexecucao do smoke tecnico no modo padrao `DEMO_BOOTSTRAP`;
- nova leitura de diagnosticos via `window.__lavaprimeGetCleanBootstrapDiagnostics?.()`;
- nova leitura via `window.__lavaprimeDiagnostics?.cleanBootstrap`;
- nova leitura do espelho tecnico por `document.documentElement.dataset.*`;
- nova leitura do snapshot JSON em `#lavaprime-clean-bootstrap-diagnostics`;
- consolidacao documental do resultado.

## Resultado tecnico

- os globais de `window` ficaram disponiveis de forma repetivel no contexto de avaliacao direta da pagina;
- o espelho no DOM permaneceu disponivel, legivel e consistente;
- antes do login, o espelho ja aparece, mas com contadores parciais (`unsafeSurfaceCount=-1` e `improvedSurfaceCount=0`) enquanto o snapshot ainda nao esta no estado operacional final;
- depois do login admin e tambem no contexto operador, os valores convergiram para o estado esperado:
  - `activeMode=DEMO_BOOTSTRAP`;
  - `defaultMode=DEMO_BOOTSTRAP`;
  - `trialStatus=diagnostic-only`;
  - `diagnosticsAvailable=true`;
  - `supabaseRuntimeOpened=false`;
  - `cleanBootstrapDefault=false`;
  - `unsafeSurfaceCount=0`;
  - `improvedSurfaceCount=5`.

## Confirmacoes preservadas

- `DEMO_BOOTSTRAP` continua o modo padrao oficial;
- `CLEAN_BOOTSTRAP` continua protegido e nao ativo como default;
- nenhuma seed demo foi removida;
- nenhuma integracao com Supabase foi iniciada;
- nenhuma UI nova foi criada;
- nenhum comportamento funcional foi alterado.

## Metodo recomendado de auditoria

- para verificacao manual no browser real: usar `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` e `window.__lavaprimeDiagnostics?.cleanBootstrap`;
- para automacao e evidencia repetivel: usar prioritariamente `document.documentElement.dataset.*` e `#lavaprime-clean-bootstrap-diagnostics`;
- para aceite operacional: considerar o espelho DOM como fonte mais estavel entre contextos de inspecao distintos.

## Riscos

- a disponibilidade dos globais de `window` pode continuar variando fora do contexto de avaliacao direta da pagina;
- o estado pre-login ainda expõe snapshot parcial, entao a leitura operacional precisa considerar o momento da coleta;
- a confirmacao da observabilidade nao autoriza promocao de `CLEAN_BOOTSTRAP` a default.

## Rollback

1. remover este change record e os registros documentais da fase;
2. manter `app/main.js` como estava ao final da fase 009;
3. reexecutar `primyo:gate`, `build`, `verify:build` e smoke manual.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-011 - Clean bootstrap default blockers consolidation`

Objetivo sugerido:

- consolidar os bloqueios restantes para promocao de `CLEAN_BOOTSTRAP` a default;
- separar claramente bloqueios de observabilidade, bloqueios de dados limpos e bloqueios de relacionamento persistido;
- continuar sem ativar o modo limpo como padrao e sem abrir Supabase.
