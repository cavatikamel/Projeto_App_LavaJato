# Netlify Environment Strategy

## Objetivo

Definir a estrategia segura de homologacao e producao no Netlify para o LavaPrime Web.

## Estado atual auditado

- `netlify.toml` existe
- build configurado:
  - `command = "npm run build"`
  - `publish = "dist"`
- SPA redirect configurado para `index.html`
- CSP atual permite conexoes futuras com dominios `*.supabase.co`, mas o runtime atual continua fechado para Supabase

## Ambientes recomendados

### Producao

- site oficial Netlify ligado ao dominio `app.lavaprime.com.br`
- branch de origem recomendada: `main`
- nao publicar automaticamente nenhuma branch diferente de `main`

### Homologacao

- ambiente Netlify separado para `staging`
- pode ser:
  - branch deploy do proprio site, ou
  - site Netlify separado de homologacao
- objetivo: validar o app publicado antes da promocao

### Deploy Preview

- habilitar para PRs quando a fase futura autorizar
- serve para inspecao tecnica rapida
- nao substitui homologacao oficial
- nao autoriza producao

## Comandos obrigatorios antes de publicacao

Localmente, antes de qualquer push autorizado:

- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

No Netlify:

- build oficial continua `npm run build`
- qualquer falha de build bloqueia o deploy

## Smoke em ambiente publicado

Em `staging` e em producao futura, validar no minimo:

- app abre
- login admin funciona
- dashboard carrega
- patio carrega
- documentos/relatorios nao quebram
- logout funciona
- operador acessa patio
- `DEMO_BOOTSTRAP` continua padrao
- `CLEAN_BOOTSTRAP` nao foi ativado como `default`

## Como impedir publicacao da branch errada

- vincular producao somente a `main`
- vincular homologacao somente a `staging`
- nao habilitar publicacao de `primyo/onboarding` para producao
- revisar branch alvo antes de qualquer configuracao de deploy em fase futura

## Rollback Netlify

Cada fase futura de publicacao deve prever:

1. ultimo deploy saudavel conhecido
2. commit correspondente
3. procedimento de redeploy do build anterior
4. smoke minimo apos rollback

## Regra desta fase

- nenhum deploy foi executado
- nenhuma configuracao Netlify foi alterada
- nenhum DNS foi alterado
