# LP-APK-014

- Change ID: `LP-APK-014`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Objetivo

Alinhar o fluxo de `Clientes` do app Android `LavaPrime` ao fluxo real de `Clientes` do Web, mantendo o app nativo, adaptado ao mobile e sem alterar o Web.

## Escopo

- ler a governanca obrigatoria do programa APK;
- mapear o fluxo real de `Clientes` em `app/main.js` em modo leitura;
- ajustar `Splash` e `Login` para remover informacoes acessorias e manter apenas a abertura essencial do app;
- ajustar a tela Android de `Clientes` para refletir os mesmos blocos, campos, termos, regras e acoes centrais do Web;
- manter a identidade visual oficial;
- garantir que nao haja texto fora da area, campos desalinhados ou contraste fraco;
- atualizar docs da fase e closure;
- validar com gate Web e build Android.

## Fora de escopo

- alterar Web, contratos Web ou Supabase;
- abrir autenticacao remota real;
- criar sync remoto real;
- concluir o fluxo dedicado de `Veiculos`;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `LavaPrimeAndroidApp/app/schemas/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-014.md`
- `docs/primyo-changes/LP-APK-014-CLOSURE.md`
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

- ampliar o cadastro local de clientes sem romper a leitura atual do app;
- alinhar as regras de faturamento do Web sem inventar comportamento fora do dominio observado;
- quebrar a compilacao Android ao combinar ajuste de bootstrap/login com a nova tela de `Clientes`.

## Rollback

- reverter apenas os arquivos Android e documentais desta fase;
- preservar a sujeira preexistente fora do recorte;
- nao tocar Web, Supabase ou arquivos proibidos.
