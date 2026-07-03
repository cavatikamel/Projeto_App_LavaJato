# LP-DEPLOY-GOV-004 - Closure

## Objetivo da fase

Auditar o working tree e definir uma estrategia segura para isolar itens fora de escopo antes de qualquer criacao ou `push` futuro da branch `staging`.

## Working tree auditado

- branch atual: `primyo/onboarding`
- `HEAD` atual: `79ae86e`
- ultimo commit revisado especificamente como baseline Web: `9205f09`
- nenhum arquivo staged
- nenhum arquivo deletado

## Itens fora de escopo classificados

- `.gitignore` -> revisar manualmente em trilha propria de governance Git
- `app/styles.css` -> preservar para fase Web visual propria
- `app/assets/data/fipe-veiculos.js` -> trilha propria de dados/FIPE
- `app/assets/data/fipe-veiculos.json` -> trilha propria de dados/FIPE
- `LavaPrimeAndroidApp/**` -> trilha Android/APK propria, incluindo componentes, navegacao, temas Kotlin, mipmaps, estilos, cores e assets/fontes nao rastreados
- `docs/primyo-apk/LP_APK_REQUIREMENTS.md` -> sem diff atual, portanto sem bloqueio presente

## Riscos identificados

1. contaminar a futura `staging` com arquivos fora de escopo do working tree
2. usar automaticamente o `HEAD` atual `79ae86e` como origem de homologacao, apesar do delta documental APK acima da ultima revisao Web
3. misturar trilha Web, FIPE e Android no mesmo push futuro
4. tentar limpar o working tree com comando destrutivo sem autorizacao e sem destino definido por item

## Plano de isolamento criado

- documento principal: `docs/primyo-deploy/WORKING_TREE_ISOLATION_PLAN.md`
- baseline conservadora recomendada para futura `staging`: `9205f09`
- condicao minima para avancar: working tree isolado, baseline explicitamente aprovada, gate/build/verify aprovados e autorizacao formal antes de `push`

## Validacoes executadas

- `git status --short`
- `git status --porcelain=v1`
- `git diff --name-only`
- `git diff -- .gitignore`
- `git diff -- app/styles.css`
- `git diff -- app/assets/data/fipe-veiculos.js`
- `git diff -- app/assets/data/fipe-veiculos.json`
- `git diff -- docs/primyo-apk/LP_APK_REQUIREMENTS.md`
- `git branch --show-current`
- `git log -1 --oneline`
- `git remote -v`
- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Smoke manual

- browser embutido nao foi reutilizado nesta fase documental
- como nao houve mudanca de runtime Web, a fase herdou a ultima evidencia valida de smoke reduzido registrada na trilha de deploy anterior
- gate, build e verify passaram novamente
- warning de chunk acima de `500 kB` permanece nao bloqueante

## Rollback

1. remover apenas os documentos desta fase
2. reexecutar `npm.cmd run primyo:gate`
3. reexecutar `npm.cmd run build`
4. reexecutar `npm.cmd run verify:build`

## Proxima fase recomendada

`LP-DEPLOY-GOV-005 - Execute authorized working tree isolation and prepare clean staging source`

## Confirmacoes finais

- nenhuma limpeza destrutiva executada
- nenhuma branch criada
- nenhum `push`
- nenhum deploy
- nenhuma alteracao de runtime
