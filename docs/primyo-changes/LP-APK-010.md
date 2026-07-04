# LP-APK-010

- Change ID: `LP-APK-010`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Objetivo

Alinhar a tela `Patio` do app Android `LavaPrime` ao `Pátio` real do Web, mantendo o app nativo, adaptado ao mobile e sem alterar o Web.

## Escopo

- ler a governanca obrigatoria do programa APK;
- mapear o `Pátio` real do Web em `app/main.js` e `app/styles.css` em modo leitura;
- ajustar a `PatioScreen` Android para refletir os mesmos blocos, status, termos, filtros e acoes do Web;
- manter a identidade visual oficial;
- corrigir o fluxo de abertura para `Splash -> Login`, com a arte oficial anexada pelo usuario;
- garantir que nao haja texto fora da area, cards desalinhados ou contraste fraco;
- atualizar docs da fase e closure;
- validar com gate Web e build Android.

## Fora de escopo

- alterar Web, contratos Web ou Supabase;
- abrir auth remota real;
- criar sync remoto real;
- implementar pagamento completo do patio;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `LavaPrimeAndroidApp/app/src/main/res/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-010.md`
- `docs/primyo-changes/LP-APK-010-CLOSURE.md`
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

- aproximar o `Pátio` do Web sem abrir status de negocio ainda inexistentes no modelo Room atual;
- simplificar demais a abertura e perder sinais tecnicos de bootstrap;
- quebrar a compilacao por conta da nova splash em imagem raster de tela cheia e pela reestruturacao da `PatioScreen`.

## Rollback

- reverter apenas os arquivos Android e documentais desta fase;
- preservar a sujeira preexistente fora do recorte;
- nao tocar Web, Supabase ou arquivos proibidos.
