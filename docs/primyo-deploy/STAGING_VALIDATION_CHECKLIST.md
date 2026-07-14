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

## Complemento LP-DEPLOY-GOV-010

Antes do primeiro smoke remoto oficial, o usuario deve copiar do painel Netlify:

- URL real de staging;
- branch publicada;
- commit publicado;
- status do build;
- data e hora do deploy;
- erros do build, se houver.

Regra adicional:

- `Production branch` deve continuar `main`;
- `staging` deve existir apenas como branch deploy de homologacao;
- `app.lavaprime.com.br` nao pode ser alterado durante a prova de staging.

## Complemento LP-DEPLOY-GOV-011

Resultado da validacao remota atual:

- URL comprovada: `https://staging--lavaprime.netlify.app/`;
- branch deploy comprovado: `staging`;
- commit publicado informado: `cf2eb68`;
- tela de autenticacao carregada corretamente;
- nenhum erro bloqueante de console foi observado;
- o login admin nao ficou comprovado nesta automacao;
- a baseline atual de `Service Order` continua fora do staging remoto.

## Comandos futuros recomendados

Somente para fase futura autorizada:

- `git switch --detach <baseline-web-aprovada>`
- `git switch -c staging`
- `git push -u origin staging`
