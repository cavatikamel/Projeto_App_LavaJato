# Staging Validation Checklist

## Pre-requisitos

- branch alvo confirmada como `staging`
- baseline Web confirmada antes de criar ou atualizar `staging`
- estado de `staging` local/remota auditado
- push autorizado
- PR ou branch deploy documentado
- build remoto concluido com sucesso

## Validacao local antes do push

- `git status --short`
- `git branch --show-current`
- `git branch --list staging`
- `git branch -r`
- `git log -1 --oneline`
- `git remote -v`
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
- baseline Web nao confirmada
- `staging` ausente ou apontando para baseline errada
- arquivos fora de escopo misturados
- gate falhando
- build falhando
- smoke falhando
- runtime inesperadamente ligado a Supabase

## Saida da homologacao

- aprovacao do usuario
- decisao formal de promocao
- rollback disponivel

## Comandos futuros recomendados

Somente para fase futura autorizada:

- `git switch --detach <baseline-web-aprovada>`
- `git switch -c staging`
- `git push -u origin staging`
