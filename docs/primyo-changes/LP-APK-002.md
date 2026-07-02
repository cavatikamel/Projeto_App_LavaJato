# LP-APK-002

- Change ID: `LP-APK-002`
- Titulo: Android Current State Reuse Decision
- Tipo: `Documentation Phase`
- Data: `2026-07-02`
- Objetivo: auditar o estado atual do `LavaPrimeAndroidApp` e decidir formalmente o que deve ser `keep`, `refactor`, `replace` ou `archive` antes da reconstrucao tela por tela do APK oficial

## Escopo

- ler governanca Primyo, governanca APK, baseline funcional Web e documentacao Android existente;
- auditar `LavaPrimeAndroidApp/**` e `Material_Visual/**` em modo leitura;
- registrar decisao geral de reuse, matriz por area e estrategia de rebuild dentro do projeto atual;
- atualizar progresso e rastreabilidade oficial da trilha APK.

## Fora de escopo

- alterar `LavaPrimeAndroidApp/**`;
- alterar `app/main.js`, `app/styles.css`, `app/adapters/**`, `app/demo/**` ou `scripts/**`;
- alterar banco Room, implementar migracoes ou refatorar codigo Android;
- abrir Supabase;
- alterar contratos, UI ou fluxo runtime do Web;
- fazer push.

## Arquivos permitidos

- `docs/primyo-apk/LP_APK_ANDROID_REUSE_DECISION.md`
- `docs/primyo-apk/LP_APK_ANDROID_REUSE_MATRIX.md`
- `docs/primyo-apk/LP_APK_ANDROID_REBUILD_STRATEGY.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS_MATRIX.md`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-002.md`
- `docs/primyo-changes/LP-APK-002-CLOSURE.md`
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

- `Medio`, porque a fase redefine oficialmente quanto do checkpoint Android atual ainda e base de produto e quanto deixa de ser tratado como fundacao evolutiva.

## Rollback

1. remover os novos documentos de reuse e rebuild strategy do programa APK;
2. reverter `LP_APK_REQUIREMENTS_MATRIX.md` e `LP_APK_PROGRESS.md`;
3. reverter `LP-APK-002.md`, `LP-APK-002-CLOSURE.md` e os complementos minimos de governanca;
4. reexecutar `git status --short`, `git diff --name-only` e `npm.cmd run primyo:gate`.
