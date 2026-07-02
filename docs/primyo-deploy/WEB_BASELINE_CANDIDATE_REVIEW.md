# Web Baseline Candidate Review

## Objetivo

Revisar a baseline Web candidata antes de qualquer criacao futura da branch `staging`.

## Estado auditado

- branch atual: `primyo/onboarding`
- `HEAD` atual: `ef0bc0e`
- ultimo fechamento formal do programa Web: `094a5b7`
- `main` local: presente
- `origin/main`: presente
- `staging` local: ausente
- `origin/staging`: ausente
- `origin`: configurado
- `DEMO_BOOTSTRAP`: continua padrao
- `CLEAN_BOOTSTRAP`: continua protegido e nao `default`
- Supabase: continua fechado

## Linha de commits relevante

### Fechamento e deploy Web

- `094a5b7` - `docs(primyo): finalize transformation program handoff`
- `c8b312c` - `docs(primyo): define deploy environment governance`
- `ef0bc0e` - `docs(primyo): prepare netlify staging deployment`

### Commits Android/APK misturados na branch candidata

- `f614805` - `docs(primyo): audit android native app baseline`
- `198bd28` - `docs(android): review data strategy and backend contracts`
- `8fe1fe5` - `feat(android): rebuild native lavaprime mobile foundation`
- `af2df50` - `style(android): align mobile UI with lavaprime web`
- `87975a5` - `docs(apk): establish lavaprime apk program governance`

## Avaliacao objetiva

### 1. HEAD atual

O `HEAD` atual e `ef0bc0e`. Ele nao altera runtime Web. O commit adiciona apenas documentacao de governanca de staging.

### 2. Ultimo fechamento Web

O ultimo fechamento formal do programa Web e `094a5b7`. Ele consolida o handoff final do programa, sem tocar runtime.

### 3. Mudancas Web apos o fechamento

Depois de `094a5b7`, os commits Web desta trilha continuam documentais:

- `c8b312c`
- `ef0bc0e`

Nao houve alteracao adicional em `app/main.js`, `app/demo/**`, adapters, scripts ou runtime Web nessa janela.

### 4. Risco Android/APK

Existe mistura real de historico Android/APK na branch `primyo/onboarding`.

- parte dessa mistura e apenas documental (`f614805`, `198bd28`, `87975a5`)
- parte dela afeta codigo Android de fato (`8fe1fe5`, `af2df50`)

Conclusao:

- o risco existe no historico da branch
- esse risco nao altera o snapshot atual do runtime Web
- esse risco importa para governanca de branch e para o futuro merge, nao para o build Web atual

### 5. Working tree sujo

O working tree atual ainda bloqueia criacao/push seguro de branch:

- `.gitignore`
- `app/styles.css`
- `LavaPrimeAndroidApp/**`
- `app/assets/data/fipe-veiculos.js`
- `app/assets/data/fipe-veiculos.json`

Esses itens continuam fora de escopo e precisam ser isolados antes de qualquer fase de criacao ou push de `staging`.

## Conclusao de baseline

- `094a5b7` continua sendo o ultimo fechamento formal do programa Web
- `ef0bc0e` passa a ser o candidato mais atualizado para homologacao
- como os deltas entre `094a5b7` e `ef0bc0e` sao documentais, nao ha motivo tecnico para recuar o snapshot Web
- o bloqueio operacional nao e o `HEAD`, e sim o working tree misturado

## Origem recomendada para futura staging

Origem recomendada:

- usar o `HEAD` atual `ef0bc0e`
- somente depois de isolar/limpar os itens fora de escopo do working tree

Origem rejeitada por enquanto:

- voltar para `87975a5`
  - rejeitado porque esse commit nao e o `HEAD` atual e ainda carrega governanca APK sem agregar a preparacao final de staging
- voltar para `094a5b7`
  - rejeitado como origem preferencial porque perderia a documentacao mais recente de deploy sem ganho de runtime
- criar `staging` imediatamente com o working tree sujo
  - rejeitado por risco de contaminacao no push

## Comandos futuros recomendados

Somente para fase futura autorizada:

```bash
git status --short
git diff --name-only
git switch primyo/onboarding
git rev-parse --short HEAD
git switch -c staging
git push -u origin staging
```

Se a fase futura exigir isolamento previo do working tree, o primeiro passo deve ser limpar ou separar os itens fora de escopo antes do `git switch -c staging`.

## Riscos

1. criar `staging` com working tree misturado
2. publicar branch contendo sujeira fora de escopo
3. confundir risco de historico Android com risco de runtime Web atual
4. promover homologacao sem validar o snapshot `ef0bc0e`

## Rollback esperado

1. abortar a fase futura se o working tree continuar misturado
2. nao criar nem pushar `staging` ate o isolamento estar confirmado
3. se a branch for criada futuramente de forma errada, descartar a branch local e repetir a derivacao a partir de `ef0bc0e`
