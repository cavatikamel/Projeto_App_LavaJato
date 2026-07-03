# LP-DEPLOY-GOV-004 - Working Tree Isolation Before Staging Branch

## Objetivo

Auditar o working tree atual e definir uma estrategia segura para isolar itens fora de escopo antes de qualquer criacao ou `push` futuro da branch `staging`.

## Estado auditado

- branch atual: `primyo/onboarding`
- `HEAD` atual: `79ae86e`
- ultimo commit Web revisado especificamente para homologacao: `9205f09`
- nenhum arquivo staged
- nenhum arquivo deletado
- `DEMO_BOOTSTRAP`: continua padrao
- `CLEAN_BOOTSTRAP`: continua protegido e nao `default`
- Supabase: continua fechado

## Itens fora de escopo encontrados

### 1. `.gitignore`

- classificacao: `revisar manualmente`
- risco: alterar regra de ignorar diretoria pode contaminar fluxo Git do repositorio inteiro
- observacao: o delta ancora `LavaPrime/` para `/LavaPrime/`, o que parece ajuste intencional de raiz, mas segue fora da fase Web atual

### 2. `app/styles.css`

- classificacao: `preservar para fase Web visual propria`
- risco: altera UI/CSS fora da trilha de staging governada
- observacao: o diff adiciona blocos de manutencao, cuidados especiais e layout responsivo, portanto nao deve entrar em homologacao documental

### 3. `app/assets/data/fipe-veiculos.js`

- classificacao: `commitar em trilha propria de dados/FIPE`
- risco: muda referencia da base local de veiculos e pode alterar comportamento de busca/catalogo sem fase propria
- observacao: o diff e pequeno no JS espelho, mas aponta para refresh de base

### 4. `app/assets/data/fipe-veiculos.json`

- classificacao: `commitar em trilha propria de dados/FIPE`
- risco: refresh massivo da base local de FIPE, com nova referencia `julho/2026`, aumento de modelos e alteracao de snapshot operacional
- observacao: deve ficar fora da `staging` Web ate existir fase propria de dados

### 5. `LavaPrimeAndroidApp/**`

- classificacao: `preservar para trilha Android propria`
- risco: mistura Android nativo com homologacao Web e amplia o escopo de qualquer push futuro
- observacao: os arquivos sujos incluem manifesto, componentes/temas Kotlin, navegacao, mipmaps, estilos, cores, regras XML, wrapper, documentacao Android e assets/fontes Android nao rastreados

### 6. `docs/primyo-apk/LP_APK_REQUIREMENTS.md`

- classificacao: `sem bloqueio atual`
- risco: nenhum no working tree desta fase
- observacao: o arquivo era esperado como sujo no contexto anterior, mas a auditoria atual confirmou que ele esta limpo

## Decisao sobre baseline futura de staging

- o `HEAD` atual `79ae86e` nao altera runtime Web, mas adiciona documentacao da trilha APK apos a revisao Web de `9205f09`
- para evitar contaminacao de homologacao com historico APK recem-adicionado, a origem mais conservadora para futura `staging` passa a ser:
  - `9205f09`, como ultimo commit revisado especificamente para baseline Web
- o `HEAD` atual `79ae86e` so deve ser usado como origem de `staging` se uma fase futura aceitar explicitamente incluir os commits documentais de APK no ramo de homologacao Web

## Condicao minima antes de criar/pushar staging

1. working tree sem itens fora de escopo misturados
2. nenhum arquivo staged fora da fase autorizada
3. baseline Web escolhida explicitamente
4. `npm.cmd run primyo:gate` aprovado
5. `npm.cmd run build` aprovado
6. `npm.cmd run verify:build` aprovado
7. smoke local valido ou ultima evidencia herdada explicitamente sem mudanca de runtime
8. autorizacao formal antes de qualquer `push`

## Comandos futuros sugeridos

Somente para fase futura autorizada. Nao executados nesta fase.

```bash
git status --short
git diff --name-only
git diff -- .gitignore
git diff -- app/styles.css
git diff -- app/assets/data/fipe-veiculos.js
git diff -- app/assets/data/fipe-veiculos.json
git switch --detach 9205f09
git switch -c staging
git push -u origin staging
```

Se a fase futura optar por limpar itens fora de escopo sem perder trabalho, ela devera definir previamente qual trilha absorve cada delta antes de qualquer `restore`, `stash` ou `push`.

## Rollback

1. manter o working tree atual sem limpeza destrutiva nesta fase
2. abortar qualquer tentativa futura de criacao de `staging` se ainda houver item fora de escopo nao classificado
3. se uma baseline errada for escolhida em fase futura, descartar a branch local criada incorretamente e repetir a derivacao a partir do commit Web aprovado

## Proxima fase recomendada

`LP-DEPLOY-GOV-005 - Execute authorized working tree isolation and prepare clean staging source`
