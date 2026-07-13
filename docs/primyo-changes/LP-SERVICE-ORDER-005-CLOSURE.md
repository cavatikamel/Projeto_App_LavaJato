# LP-SERVICE-ORDER-005 - Closure

## Objetivo da fase

Enriquecer a origem documental da `Service Order` e deixar o `shadow write` desenhado e auditavel sem tocar backend.

## Entrega tecnica

- `documentServiceOrderSource` auxiliar adicionado aos documentos derivados;
- prioridade oficial de vinculo documento -> OS implementada;
- heuristica por placa rebaixada para fallback;
- `documentSourceQuality` adicionado ao diagnostico da OS;
- `shadowWrite` adicionado ao diagnostico da OS;
- dry-run de `shadow write` definido apenas como plano derivado;
- documentos novos gerados por atendimento passam a carregar metadados de OS desde a origem.

## Compatibilidade preservada

- `DEMO_BOOTSTRAP` mantido;
- `CLEAN_BOOTSTRAP` nao promovido;
- Supabase fechado;
- `shadowWrite.enabled = false`;
- `documentHistory` continua fonte principal visual;
- `visualOutputChanged = false`;
- `primarySourceChanged = false`;
- dashboard, patio e financeiro seguem sem troca de fonte principal.

## Validacoes

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

## Smoke funcional

Resultado parcial.

Evidencias obtidas:

- preview local respondeu em `http://127.0.0.1:4173/`;
- a tela de splash foi renderizada com a nova identidade visual;
- o DOM do login estava presente por baixo do overlay de splash;
- nao houve erro de console capturado no browser;
- a automacao embutida nao conseguiu concluir a transicao visual splash -> login nesta sessao;
- por isso, a confirmacao visual completa de login admin, login operador, logout, documentos e consulta manual do diagnostico ficou registrada como limitada.

## Riscos

- documentos antigos ainda podem cair em fallback por placa;
- `shadow write` continua apenas desenhado;
- os metadados enriquecidos ainda nao existem em todas as fontes legadas;
- a escrita real continua dependente de trilha propria de backend.

## Rollback

`git revert <hash-do-commit-da-fase>`

Reverte:

- normalizacao de origem documental;
- enriquecimento de documentos derivados;
- diagnosticos `documentSourceQuality` e `shadowWrite`;
- documentacao de `shadow write` dry-run.

## Proxima fase recomendada

`LP-SERVICE-ORDER-006 - Service Order shadow write adapters and staging activation gate`
