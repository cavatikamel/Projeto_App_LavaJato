# LP-APK-000

- Change ID: `LP-APK-000`
- Titulo: Program Charter And Governance Reset
- Tipo: `Documentation Phase`
- Data: `2026-07-01`
- Objetivo: iniciar oficialmente o `Programa LavaPrime APK` com charter, fases, progresso, requisitos, LPFRs, politica de QA e rastreabilidade, sem alterar Android ou Web

## Escopo

- criar `docs/primyo-apk/**`;
- registrar `LPFR` como `LavaPrime Future Requirement`;
- separar requisitos obrigatorios do APK de backlog futuro;
- registrar a fase e a proxima trilha recomendada.

## Fora de escopo

- alterar `LavaPrimeAndroidApp/**`;
- alterar `app/main.js`, `app/styles.css`, `app/adapters/**`, `app/demo/**`, `scripts/**`;
- abrir Supabase;
- refatorar Android;
- implementar telas ou regras de negocio;
- fazer push.

## Arquivos permitidos

- `docs/primyo-apk/**`
- `docs/primyo-changes/LP-APK-000.md`
- `docs/primyo-changes/LP-APK-000-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Arquivos proibidos

- `LavaPrimeAndroidApp/**`
- `app/main.js`
- `app/styles.css`
- `app/adapters/**`
- `app/demo/**`
- `scripts/**`
- migracoes Supabase
- contratos e UI Web

## Documentos criados previstos

- `docs/primyo-apk/LP_APK_PROGRAM_CHARTER.md`
- `docs/primyo-apk/LP_APK_PHASES.md`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-apk/LP_APK_ENGINEERING_RULES.md`
- `docs/primyo-apk/LP_APK_SCREEN_BY_SCREEN_PLAN.md`
- `docs/primyo-apk/LP_APK_VISUAL_PARITY_RULES.md`
- `docs/primyo-apk/LP_APK_QA_POLICY.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS_MATRIX.md`
- `docs/primyo-apk/LPFR.md`
- `docs/primyo-apk/LPFR_STATUS_MATRIX.md`
- `docs/primyo-changes/LP-APK-000.md`
- `docs/primyo-changes/LP-APK-000-CLOSURE.md`

## Validacoes previstas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Risco

- `Medio`, por depender de coerencia entre governanca existente, trilha Android parcial e backlog futuro sem reabrir escopo tecnico.

## Rollback

1. remover `docs/primyo-apk/**`;
2. reverter `docs/primyo-changes/LP-APK-000.md` e `LP-APK-000-CLOSURE.md`;
3. reverter os complementos de governanca desta fase;
4. reexecutar `git status --short`, `git diff --name-only` e `npm.cmd run primyo:gate`.

