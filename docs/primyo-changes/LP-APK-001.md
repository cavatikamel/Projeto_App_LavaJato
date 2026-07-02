# LP-APK-001

- Change ID: `LP-APK-001`
- Titulo: Web Functional Baseline
- Tipo: `Documentation Phase`
- Data: `2026-07-02`
- Objetivo: mapear a referencia funcional real do LavaPrime Web para orientar a reconstrucao tela por tela do app Android nativo `LavaPrime`, sem alterar Android, Web ou Supabase

## Escopo

- ler governanca Primyo e governanca APK;
- auditar o comportamento funcional real do Web em modo leitura;
- criar baseline funcional, mapa de modulos, matriz de rotinas e alvos de paridade Android;
- atualizar requisitos, matriz de requisitos, progresso e rastreabilidade da trilha APK.

## Fora de escopo

- alterar `LavaPrimeAndroidApp/**`;
- alterar `app/main.js`, `app/styles.css`, `app/adapters/**`, `app/demo/**` ou `scripts/**`;
- abrir Supabase;
- implementar Android;
- alterar fluxo, UI ou contratos runtime do Web;
- fazer push.

## Arquivos permitidos

- `docs/primyo-apk/LP_APK_WEB_FUNCTIONAL_BASELINE.md`
- `docs/primyo-apk/LP_APK_WEB_MODULES_MAP.md`
- `docs/primyo-apk/LP_APK_WEB_ROUTINES_MATRIX.md`
- `docs/primyo-apk/LP_APK_ANDROID_PARITY_TARGETS.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS_MATRIX.md`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-001.md`
- `docs/primyo-changes/LP-APK-001-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`

## Arquivos proibidos

- `LavaPrimeAndroidApp/**`
- `app/main.js`
- `app/styles.css`
- `app/adapters/**`
- `app/demo/**`
- `scripts/**`
- migracoes Supabase
- contratos e UI Web

## Validacoes previstas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Risco

- `Medio`, porque a fase reclassifica o baseline funcional oficial do APK e pode induzir erro de paridade se o Web for mapeado de forma incompleta.

## Rollback

1. remover os novos documentos de baseline Web do programa APK;
2. reverter `LP_APK_REQUIREMENTS.md`, `LP_APK_REQUIREMENTS_MATRIX.md` e `LP_APK_PROGRESS.md`;
3. reverter `LP-APK-001.md`, `LP-APK-001-CLOSURE.md` e os complementos minimos de governanca;
4. reexecutar `git status --short`, `git diff --name-only` e `npm.cmd run primyo:gate`.
