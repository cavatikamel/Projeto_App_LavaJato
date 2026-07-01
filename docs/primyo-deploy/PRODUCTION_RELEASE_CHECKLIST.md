# Production Release Checklist

## Pre-requisitos

- branch alvo confirmada como `main`
- staging aprovado
- working tree local limpo ou isolado
- sem arquivos fora de escopo staged
- autorizacao explicita do usuario para push, merge e publicacao

## Validacao local obrigatoria

- `git status --short`
- `git branch --show-current`
- `git log -1 --oneline`
- `git diff --cached --name-only`
- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Validacao publicada obrigatoria

- staging abriu sem erro
- smoke de staging aprovado
- aprovacao formal do usuario registrada
- plano de rollback validado

## Liberacao de producao

- PR de `staging` para `main`
- merge aprovado
- deploy de producao controlado
- smoke minimo em `app.lavaprime.com.br`

## Rollback de producao

1. identificar ultimo deploy saudavel
2. reverter merge ou redeploy do commit anterior
3. reexecutar smoke minimo em producao
4. registrar incidente e decisao
