# LP-APK-004

- Change ID: `LP-APK-004`
- Tipo: `Documentation Phase`
- Data: `2026-07-02`

## Objetivo

Finalizar os requisitos oficiais do app Android nativo `LavaPrime` antes da primeira fase de codigo.

## Escopo

- consolidar requisitos obrigatorios do APK;
- fechar status `ready-for-implementation` onde houver evidencia suficiente;
- criar mapa de dependencias, criterios de aceite por tela e mapa de dados;
- atualizar progresso do programa APK;
- registrar itens que continuam como `LPFR`.

## Fora de escopo

- implementar codigo Android;
- alterar `LavaPrimeAndroidApp/**`;
- alterar Web, Supabase, contratos runtime ou relatorios Web;
- executar build Android;
- fazer push.

## Arquivos permitidos

- `docs/primyo-apk/LP_APK_REQUIREMENTS.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS_MATRIX.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS_DEPENDENCY_MAP.md`
- `docs/primyo-apk/LP_APK_SCREEN_ACCEPTANCE_CRITERIA.md`
- `docs/primyo-apk/LP_APK_DATA_REQUIREMENTS_MAP.md`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-apk/LPFR.md`
- `docs/primyo-apk/LPFR_STATUS_MATRIX.md`
- `docs/primyo-changes/LP-APK-004.md`
- `docs/primyo-changes/LP-APK-004-CLOSURE.md`
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
- Supabase migrations
- contratos Web
- fluxo Web
- UI Web
- relatorios Web

## Validacoes previstas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Risco

- confundir baseline obrigatoria com backlog futuro;
- promover requisito sem evidencia suficiente;
- misturar necessidade de caixa opcional com baseline obrigatoria do APK inicial;
- deixar dependencias criticas implicitas antes da primeira fase de codigo.

## Rollback

- reverter apenas os arquivos documentais desta fase;
- preservar qualquer dirty state preexistente fora do escopo;
- nao tocar `LavaPrimeAndroidApp/**` nem arquivos Web.
