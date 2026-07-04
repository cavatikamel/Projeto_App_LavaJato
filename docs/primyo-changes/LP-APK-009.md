# LP-APK-009

- Change ID: `LP-APK-009`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Objetivo

Alinhar o `Dashboard` Android do app `LavaPrime` ao `Dashboard` real do Web, preservando o app nativo, a leitura mobile e a identidade visual oficial, sem alterar o Web e sem abrir regra de negocio nova.

## Escopo

- ler a governanca obrigatoria do programa APK;
- mapear o `Dashboard` real do Web em `app/main.js` e `app/styles.css` em modo leitura;
- reestruturar a `DashboardScreen` Android para refletir os mesmos blocos centrais do Web;
- reforcar hierarquia, contraste, cards e leitura mobile;
- preservar o shell Android atual;
- atualizar progresso, registro da fase e closure;
- validar com gate Web e build Android.

## Fora de escopo

- alterar Web, contratos Web ou Supabase;
- implementar vendas, cobrancas, pagamentos ou manutencoes reais;
- abrir regra financeira nova;
- refatorar outras telas fora do Dashboard;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-009.md`
- `docs/primyo-changes/LP-APK-009-CLOSURE.md`
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

- espelhar o Dashboard Web sem inventar leitura financeira inexistente no Android atual;
- criar indicadores visuais que aparentem regra pronta quando o dado ainda nao existe localmente;
- quebrar Compose por excesso de reestruturacao em uma tela central.

## Rollback

- reverter apenas os arquivos Android e documentais desta fase;
- preservar a sujeira preexistente fora do recorte;
- nao tocar Web, Supabase ou arquivos proibidos.
