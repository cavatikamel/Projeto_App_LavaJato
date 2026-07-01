# Staging Validation Checklist

## Pre-requisitos

- branch alvo confirmada como `staging`
- push autorizado
- PR ou branch deploy documentado
- build remoto concluido com sucesso

## Validacao local antes do push

- `git status --short`
- `git branch --show-current`
- `git diff --cached --name-only`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Smoke em homologacao

- app abre
- login admin funciona
- dashboard carrega
- patio carrega
- documentos/relatorios nao quebram
- logout funciona
- operador acessa patio
- `DEMO_BOOTSTRAP` continua padrao
- `CLEAN_BOOTSTRAP` nao foi ativado como `default`

## Bloqueios de homologacao

- branch errada
- arquivos fora de escopo misturados
- gate falhando
- build falhando
- smoke falhando
- runtime inesperadamente ligado a Supabase

## Saida da homologacao

- aprovacao do usuario
- decisao formal de promocao
- rollback disponivel
