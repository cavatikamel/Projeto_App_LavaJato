# Service Order Staging Promotion Plan

## Objetivo

Preparar a promocao controlada da baseline atual de `Service Order` para `origin/staging`, sem tocar `main`, producao, Supabase, env, DNS ou runtime fora do diff ja validado.

## Baseline local candidata

- `LOCAL_SERVICE_ORDER_BASELINE_CANDIDATE = a3302df`
- mensagem: `docs(primyo): validate netlify staging remote smoke`
- baseline remota atual conhecida: `origin/staging = cf2eb68`

## Diferenca contra `origin/staging`

### Runtime incluido

- `app/main.js`
  - esperado pela trilha `LP-SERVICE-ORDER-001` ate `LP-SERVICE-ORDER-007`
  - diff concentrado em bridge, diagnostics, storage contract, progressive read, document enrichment, shadow write gate e rehearsal

### Documentacao incluida

- `docs/primyo-service-orders/**`
- `docs/primyo-deploy/NETLIFY_STAGING_*`
- `docs/primyo-deploy/STAGING_VALIDATION_CHECKLIST.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`
- `docs/primyo-changes/LP-SERVICE-ORDER-001.md` ate `LP-SERVICE-ORDER-010-CLOSURE.md`
- `docs/primyo-changes/LP-DEPLOY-GOV-010.md` ate `LP-DEPLOY-GOV-011-CLOSURE.md`

## Arquivos explicitamente fora da promocao

- `app/styles.css`
- `app/demo/**`
- `scripts/**`
- `package.json`
- `package-lock.json`
- `netlify.toml`
- `.env*`
- `LavaPrimeAndroidApp/**`
- `app/assets/data/fipe-veiculos.*`
- `supabase/**`
- migrations e banco

## Validacao local desta fase

- `node --check app/main.js`: passou
- `node --check app/demo/lavaprimeDemoData.js`: passou
- `node --check app/demo/lavaprimeBootstrapMode.js`: passou
- `node --check app/demo/lavaprimeCleanBootstrap.js`: passou
- `node scripts/primyo-adapter-gate.mjs`: passou
- `npm.cmd run primyo:gate`: passou
- `npm.cmd run build`: passou
- `npm.cmd run verify:build`: passou
- warning de chunk acima de `500 kB`: permaneceu nao bloqueante

## Lock operacional observado

- historico conhecido: havia risco anterior de lock em `dist/assets`
- resultado nesta fase: o lock nao reapareceu
- classificacao atual: `BUILD_GATE_STATUS = passed`

## Decisao desta fase

- `PROMOTION_READY = true`
- `PUSH_TO_STAGING_EXECUTED = false`
- motivo: nao houve autorizacao explicita do usuario para executar `git push origin HEAD:staging` nesta execucao

## Push futuro autorizado

Somente em fase/autorizacao explicita:

```bash
git push origin HEAD:staging
git ls-remote --heads origin staging
```

## Proxima acao segura

Reexecutar `LP-SERVICE-ORDER-011` com autorizacao explicita para push em `origin/staging` e, somente depois do push confirmado, seguir para smoke remoto da baseline atual de `Service Order`.
