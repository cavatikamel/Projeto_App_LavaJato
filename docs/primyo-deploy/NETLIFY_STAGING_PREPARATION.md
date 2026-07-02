# Netlify Staging Preparation

## Objetivo

Preparar a publicacao futura do LavaPrime Web em homologacao Netlify sem tocar producao, DNS, painel Netlify ou runtime.

## Estado auditado

- branch atual: `primyo/onboarding`
- `HEAD` auditado: `87975a5`
- `staging` local: ausente
- `origin/staging`: ausente
- `netlify.toml`: presente
- comando de build confirmado: `npm run build`
- pasta de publicacao confirmada: `dist`
- `DEMO_BOOTSTRAP` continua padrao
- `CLEAN_BOOTSTRAP` continua protegido e nao `default`
- Supabase continua fechado para runtime

## Risco principal

O `HEAD` atual de `primyo/onboarding` inclui governanca APK. A futura branch `staging` nao deve nascer cegamente desse `HEAD` sem revisar se a baseline desejada da homologacao Web inclui ou exclui esse historico.

## Baselines candidatas para criar staging

- baseline Web mais conservadora para revisao: `c8b312c`
- `HEAD` atual `87975a5`, somente se a governanca APK for aceita na linha da homologacao Web

## Comandos futuros recomendados

Somente para fase futura autorizada. Nao executados nesta fase.

### Opcao A - staging a partir de baseline Web revisada

```bash
git switch --detach c8b312c
git switch -c staging
```

### Opcao B - staging a partir do HEAD atual, se aprovado

```bash
git switch primyo/onboarding
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
2. branch `staging` criada localmente
3. autorizacao formal para `push`
4. configuracao de branch deploy no Netlify validada
5. `npm.cmd run primyo:gate` aprovado
6. `npm.cmd run build` aprovado
7. `npm.cmd run verify:build` aprovado
8. smoke local aprovado
9. smoke em homologacao aprovado
10. rollback documentado

## Rollback futuro

1. reverter a branch `staging` para o ultimo commit homologado saudavel
2. redeployar a ultima publicacao saudavel de staging
3. repetir smoke reduzido
4. bloquear promocao para `main` ate nova aprovacao
