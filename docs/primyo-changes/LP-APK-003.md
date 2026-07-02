# LP-APK-003

- Change ID: `LP-APK-003`
- Titulo: Mobile Visual Reference Baseline
- Tipo: `Documentation Phase`
- Data: `2026-07-02`
- Objetivo: criar a referencia visual oficial do APK `LavaPrime` a partir do Web real, do `Material_Visual` e da auditoria do Android atual, sem alterar codigo Android ou Web

## Escopo

- ler governanca Primyo, governanca APK, baseline funcional e decisao de reuse;
- auditar `app/styles.css`, `app/main.js`, `LavaPrimeAndroidApp/**` e `Material_Visual/**` em modo leitura;
- criar baseline visual, mapa de tokens, alvo visual por tela e matriz de gaps;
- atualizar regras de paridade visual, progresso e rastreabilidade da trilha APK.

## Fora de escopo

- alterar `LavaPrimeAndroidApp/**`;
- alterar `app/main.js`, `app/styles.css`, `app/adapters/**`, `app/demo/**` ou `scripts/**`;
- criar tema Compose;
- trocar assets;
- abrir Supabase;
- alterar contratos, UI ou fluxo runtime do Web;
- fazer push.

## Arquivos permitidos

- `docs/primyo-apk/LP_APK_MOBILE_VISUAL_BASELINE.md`
- `docs/primyo-apk/LP_APK_VISUAL_TOKEN_MAP.md`
- `docs/primyo-apk/LP_APK_ANDROID_SCREEN_VISUAL_TARGETS.md`
- `docs/primyo-apk/LP_APK_ANDROID_VISUAL_GAP_MATRIX.md`
- `docs/primyo-apk/LP_APK_VISUAL_PARITY_RULES.md`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-003.md`
- `docs/primyo-changes/LP-APK-003-CLOSURE.md`
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

- `Medio`, porque a fase fixa oficialmente a referencia visual que passara a governar as proximas fases de design system, shell e telas Android.

## Rollback

1. remover os novos documentos de baseline visual, token map, screen targets e gap matrix;
2. reverter `LP_APK_VISUAL_PARITY_RULES.md` e `LP_APK_PROGRESS.md`;
3. reverter `LP-APK-003.md`, `LP-APK-003-CLOSURE.md` e os complementos minimos de governanca;
4. reexecutar `git status --short`, `git diff --name-only` e `npm.cmd run primyo:gate`.
