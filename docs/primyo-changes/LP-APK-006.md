# LP-APK-006

- Change ID: `LP-APK-006`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-02`

## Objetivo

Consolidar a abertura do app Android nativo `LavaPrime` com splash oficial, preload inicial, verificacao de banco local, verificacao de sessao local e roteamento correto para login ou home.

## Escopo

- usar a base visual oficial criada em `LP-APK-005`;
- ajustar `SplashLavaPrime` e o fluxo de inicializacao;
- validar estado inicial do banco local;
- validar estado inicial da sessao local no aparelho;
- definir encaminhamento inicial para login ou home sem auth remota;
- atualizar progresso, change record e closure;
- validar com gate Web e build Android.

## Fora de escopo

- auth remota real;
- Supabase real;
- novas regras de negocio;
- pagamentos;
- sync remoto real;
- alteracoes Web;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `LavaPrimeAndroidApp/app/src/main/res/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-006.md`
- `docs/primyo-changes/LP-APK-006-CLOSURE.md`
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

- quebrar o fluxo de abertura entre splash e login;
- restaurar sessao local inconsistente;
- tratar banco local como pronto sem evidencia de bootstrap;
- misturar esta fase com dirty state Android preexistente fora do recorte.

## Rollback

- reverter apenas os arquivos Android e documentais desta fase;
- preservar dirty state preexistente fora do escopo;
- nao tocar Web, Supabase ou arquivos proibidos.
