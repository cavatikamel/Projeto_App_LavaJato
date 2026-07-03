# Netlify Staging Preparation

## Objetivo

Preparar a publicacao futura do LavaPrime Web em homologacao Netlify sem tocar producao, DNS, painel Netlify ou runtime.

## Estado auditado

- branch atual: `primyo/onboarding`
- `HEAD` auditado originalmente em `LP-DEPLOY-GOV-002`: `87975a5`
- baseline Web revisada em `LP-DEPLOY-GOV-003`: `9205f09`
- `HEAD` atual de trabalho em `LP-DEPLOY-GOV-004`: `79ae86e`
- `staging` local: ausente
- `origin/staging`: ausente
- `netlify.toml`: presente
- comando de build confirmado: `npm run build`
- pasta de publicacao confirmada: `dist`
- `DEMO_BOOTSTRAP` continua padrao
- `CLEAN_BOOTSTRAP` continua protegido e nao `default`
- Supabase continua fechado para runtime

## Risco principal

O historico de `primyo/onboarding` mistura commits Web, Android e APK. A futura branch `staging` nao deve ser criada enquanto o working tree continuar misturado, e tambem nao deve nascer automaticamente do `HEAD` atual enquanto a baseline Web revisada e o delta documental de APK nao estiverem explicitamente aceitos.

## Baselines candidatas para criar staging

- `9205f09` como candidato recomendado de staging
  - justificativa: ultimo commit revisado especificamente como baseline Web antes da mistura adicional de docs APK
- `79ae86e` como `HEAD` atual
  - justificativa: nao altera runtime Web, mas so deve ser aceito se a documentacao APK adicional puder acompanhar a homologacao Web
- `094a5b7` como ultimo fechamento formal do programa Web
  - justificativa: referencia de fechamento, mas inferior a `9205f09` para staging por perder a revisao documental de baseline

## Comandos futuros recomendados

Somente para fase futura autorizada. Nao executados nesta fase.

### Opcao A - staging a partir da baseline Web revisada recomendada

```bash
git switch --detach 9205f09
git switch -c staging
```

### Opcao B - somente se uma fase futura aceitar explicitamente o `HEAD` atual

```bash
git switch primyo/onboarding
git rev-parse --short HEAD
git switch -c staging
```

### Push remoto futuro

```bash
git push -u origin staging
```

## Estrategia Netlify recomendada

- manter `main` como unica branch candidata a producao
- manter `app.lavaprime.com.br` ligado somente a producao
- usar `staging` como branch deploy de homologacao
- validar staging antes de qualquer merge para `main`
- bloquear publicacao se a baseline da `staging` nao estiver formalmente confirmada

## Variaveis de ambiente a revisar em fase futura

Conforme `.env.example`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_SERVICE_ROLE_KEY`

Nesta fase, nenhuma variavel foi criada, alterada ou exposta.

## Condicoes antes da publicacao real

1. baseline Web da `staging` aprovada
2. working tree fora de escopo isolado ou limpo
3. branch `staging` criada localmente
4. autorizacao formal para `push`
5. configuracao de branch deploy no Netlify validada
6. `npm.cmd run primyo:gate` aprovado
7. `npm.cmd run build` aprovado
8. `npm.cmd run verify:build` aprovado
9. smoke local aprovado
10. smoke em homologacao aprovado
11. rollback documentado

## Bloqueio operacional atual

- `staging` continua bloqueada enquanto:
  - `.gitignore`
  - `app/styles.css`
  - `app/assets/data/fipe-veiculos.js`
  - `app/assets/data/fipe-veiculos.json`
  - `LavaPrimeAndroidApp/**`
  permanecerem misturados no working tree

## Rollback futuro

1. reverter a branch `staging` para o ultimo commit homologado saudavel
2. redeployar a ultima publicacao saudavel de staging
3. repetir smoke reduzido
4. bloquear promocao para `main` ate nova aprovacao
