# LP-APK-005

- Change ID: `LP-APK-005`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-02`

## Objetivo

Fundar o design system oficial do app Android nativo `LavaPrime`.

## Escopo

- aplicar paleta oficial e tokens reutilizaveis;
- adotar tipografia oficial no runtime Android;
- consolidar componentes Compose reutilizaveis;
- aplicar iconografia e logo oficiais no shell atual;
- alinhar splash visual, login, shell, dashboard, patio e modulos base ao novo design system;
- validar `gradlew tasks` e `assembleDebug`;
- atualizar progresso e rastreabilidade da fase.

## Fora de escopo

- novas regras de negocio;
- auth remota real;
- sync remoto real;
- refatoracao de Room e migrations;
- pagamentos, documentos e impressao completos;
- alteracoes Web, Supabase ou contratos runtime;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `LavaPrimeAndroidApp/app/src/main/res/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-005.md`
- `docs/primyo-changes/LP-APK-005-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`

## Arquivos proibidos

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
- `.\gradlew.bat tasks --no-daemon --console=plain`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain`

## Risco

- inconsistencias entre assets oficiais e runtime atual;
- regressao visual no shell existente;
- build passar sem evidencia clara do APK em repositorio OneDrive;
- mistura acidental com dirty state Android preexistente fora do escopo.

## Rollback

- reverter apenas os arquivos Android e documentais desta fase;
- preservar dirty state preexistente fora do recorte atual;
- nao tocar Web nem arquivos proibidos.
