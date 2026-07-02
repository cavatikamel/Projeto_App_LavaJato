# Deployment Governance

## Objetivo

Definir a governanca oficial de repositorio, homologacao, publicacao e rollback do LavaPrime Web apos o encerramento do `Primyo Transformation Program`.

## Estado atual auditado

- branch atual: `primyo/onboarding`
- ultimo commit auditado nesta fase: `87975a5`
- remote principal configurado: `origin -> https://github.com/cavatikamel/Projeto_App_LavaJato.git`
- branch `staging` local: `ausente`
- branch `origin/staging`: `ausente`
- build oficial atual: `vite build`
- gate oficial atual:
  - `node scripts/primyo-adapter-gate.mjs`
  - `npm.cmd run primyo:gate`
  - `npm.cmd run verify:build`
- `DEMO_BOOTSTRAP` continua padrao
- `CLEAN_BOOTSTRAP` continua protegido e nao `default`
- Supabase continua fechado para runtime
- Android continua em trilha propria
- `primyo/onboarding` contem tambem governanca APK no `HEAD` atual e nao deve ser promovida cegamente para homologacao Web

## Objetivo de publicacao

O dominio oficial `app.lavaprime.com.br` deve receber apenas versoes aprovadas do LavaPrime Web, sempre por esteira controlada:

1. branch de fase
2. validacao local
3. commit seletivo
4. push autorizado
5. homologacao/staging
6. validacao publicada
7. aprovacao do usuario
8. promocao para producao

## Regras obrigatorias de publicacao

- nao fazer `push` sem autorizacao explicita
- nao fazer deploy sem fase propria
- nao publicar diretamente de `primyo/onboarding`
- nao publicar producao a partir de working tree sujo
- nao deixar arquivos fora de escopo entrarem em staging ou PR
- manter rollback documentado antes de cada promocao

## Itens sujos fora de escopo auditados

Nesta fase, o working tree segue contendo itens fora de escopo que nao podem entrar em publish Web:

- `.gitignore`
- `app/styles.css`
- `LavaPrimeAndroidApp/**`
- `app/assets/data/fipe-veiculos.js`
- `app/assets/data/fipe-veiculos.json`

## Regra de bloqueio para publish

Qualquer tentativa de push, PR, merge ou deploy deve ser bloqueada quando:

- houver arquivo fora da fase staged
- o working tree nao estiver limpo ou explicitamente isolado
- `primyo:gate`, `build` ou `verify:build` falharem
- o smoke local ou publicado falhar
- o alvo de branch/Netlify nao estiver confirmado
- a branch `staging` nao existir local/remotamente
- a baseline Web exata para criar `staging` nao estiver revisada

## Ambientes oficiais

- producao oficial:
  - dominio: `app.lavaprime.com.br`
  - branch recomendada: `main`
  - promocao somente por aprovacao formal
- homologacao oficial:
  - branch recomendada: `staging`
  - destino recomendado: branch deploy ou site separado no Netlify
  - ambiente para validacao previa antes da producao
- branch candidata atual:
  - `primyo/onboarding`
  - status: candidata ao fluxo de homologacao, nunca a producao direta
  - observacao: o `HEAD` atual `87975a5` inclui governanca APK e exige revisao de baseline antes de derivar a futura `staging`

## Regras de validacao

Antes de qualquer push autorizado para branch de homologacao ou producao:

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
- smoke local reduzido

## Regras de rollback

Cada promocao futura deve prever:

1. branch/commit anterior conhecido
2. deploy anterior conhecido
3. checklist de reversao
4. revalidacao minima apos rollback

## Recomendacao objetiva

A proxima fase nao deve publicar producao. O proximo passo seguro e criar a futura `staging` apenas a partir de uma baseline Web revisada, mantendo branch, checklist e rollback proprios.

## Baseline recomendada para futura branch staging

- nao criar `staging` cegamente a partir do `HEAD` atual sem revisar o escopo Web
- revisar pelo menos:
  - `c8b312c` como ultimo commit estritamente alinhado a governanca de deploy Web
  - `87975a5` apenas se a governanca APK for aceita no historico da homologacao Web
- documentar a baseline escolhida antes de qualquer `push` ou branch deploy
