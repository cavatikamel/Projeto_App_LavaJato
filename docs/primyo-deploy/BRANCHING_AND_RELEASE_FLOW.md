# Branching And Release Flow

## Branches oficiais propostas

- `main`
  - branch oficial de producao
  - unica candidata a publicar `app.lavaprime.com.br`
- `staging`
  - branch oficial de homologacao
  - recebe a versao candidata antes de qualquer promocao
- `primyo/onboarding`
  - branch candidata atual do programa de transformacao
  - nao deve publicar producao diretamente
  - `HEAD` auditado em `LP-DEPLOY-GOV-003`: `ef0bc0e`
  - observacao: o historico da branch inclui commits Android/APK, mas o snapshot Web atual segue estavel e documentalmente preparado para homologacao
- branches de fase
  - exemplos: `lp-deploy-gov-002`, `fix/...`, `hotfix/...`
  - devem nascer da branch alvo correta

## Regra de uso por branch

### main

- somente merge aprovado vindo de `staging`
- deploy de producao
- rollback por revert, redeploy do commit anterior ou reapontamento para release anterior

### staging

- deve nascer de baseline Web revisada antes de qualquer push remoto
- recebe o candidato homologado vindo de `primyo/onboarding` ou de fase posterior aprovada
- usada para validacao publicada
- nao deve receber alteracoes fora do escopo aprovado

### primyo/onboarding

- branch candidata atual
- usada para consolidar o resultado do programa
- precisa passar por homologacao antes de qualquer merge rumo a `main`
- nao deve ser usada como origem cega da futura `staging` sem revisar se a baseline desejada inclui ou exclui a governanca APK atual

## Situacao atual da branch staging

- `staging` local: inexistente na auditoria desta fase
- `origin/staging`: inexistente na auditoria desta fase
- conclusao: a homologacao Netlify continua bloqueada ate a branch ser criada a partir de baseline Web confirmada e com working tree isolado

## Fluxo recomendado

1. desenvolver em branch de fase
2. validar localmente
3. fazer commit seletivo
4. pedir autorizacao para `push`
5. abrir PR para a branch correta
6. validar CI e checklist
7. publicar em `staging`
8. validar staging
9. obter aprovacao do usuario
10. promover `staging` para `main`
11. validar producao

## Comandos futuros recomendados

Somente para fase futura autorizada, sem execucao nesta fase:

- se a baseline aprovada for o `HEAD` atual recomendado:
  - `git switch primyo/onboarding`
  - `git rev-parse --short HEAD`
  - `git switch -c staging`
- se for necessario revalidar apenas o ultimo fechamento Web:
  - `git switch --detach 094a5b7`
  - `git switch -c staging-from-web-closure`
- somente apos aprovacao formal:
  - `git push -u origin staging`

## Push, PR e merge

- `push`:
  - somente com autorizacao explicita do usuario
- PR:
  - permitido apenas apos validacao local completa
  - deve citar gate, build, verify e smoke
- merge:
  - para `staging`, apenas de branch candidata aprovada
  - para `main`, apenas de `staging` aprovado

## Como evitar branch errada

- confirmar `git branch --show-current` antes de stage, commit, push ou PR
- confirmar `git status --short`
- confirmar `git diff --cached --name-only`
- bloquear qualquer publish a partir de branch diferente de `staging` ou `main`
- bloquear publish de `primyo/onboarding` diretamente em producao

## Como tratar arquivos fora de escopo

Os itens abaixo devem continuar fora dos commits Web ate fase propria:

- `.gitignore`
- `app/styles.css`
- `LavaPrimeAndroidApp/**`
- `app/assets/data/fipe-veiculos.js`
- `app/assets/data/fipe-veiculos.json`

Se eles aparecerem no working tree:

1. nao usar `git add .`
2. fazer staging seletivo por caminho
3. revisar `git diff --cached --name-only`
4. cancelar push ou PR se houver mistura de trilhas
