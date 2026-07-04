# LP-APK-016

- Change ID: `LP-APK-016`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Objetivo

Alinhar o fluxo de `Serviços` do app Android `LavaPrime` ao fluxo real de `Serviços` do Web, mantendo o app nativo, adaptado ao mobile e sem alterar o Web.

## Escopo

- ler a governança obrigatória do programa APK;
- mapear o fluxo real de `Serviços` em `app/main.js` em modo leitura;
- ajustar a tela Android de `Serviços` para refletir os mesmos blocos, campos, termos, regras e ações centrais do Web;
- consolidar os ajustes visuais pedidos para `Splash` e `Pátio`;
- ampliar o modelo local apenas no necessário para suportar os campos reais de `Serviços`;
- manter a identidade visual oficial;
- garantir que não haja texto fora da área, campos desalinhados ou contraste fraco;
- atualizar docs da fase e closure;
- validar com gate Web e build Android.

## Fora de escopo

- alterar Web, contratos Web ou Supabase;
- abrir autenticação remota real;
- concluir impressão térmica, pagamentos, documentos ou sync remoto real;
- evoluir `Produtos`, `Insumos` ou `Atendimento` fora do domínio direto de `Serviços`;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `LavaPrimeAndroidApp/app/schemas/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-016.md`
- `docs/primyo-changes/LP-APK-016-CLOSURE.md`
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
- relatórios Web

## Validações previstas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`
- `.\gradlew.bat tasks --no-daemon --console=plain`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain`

## Risco

- ampliar o schema local de `Serviços` sem perder dados já existentes no aparelho;
- quebrar a compilação Android ao substituir o espelho de leitura por um fluxo mobile real;
- manter a paridade visual do `Pátio` com o Web sem deixar cards ou textos estourarem no mobile.

## Rollback

- reverter apenas os arquivos Android e documentais desta fase;
- preservar a sujeira preexistente fora do recorte;
- não tocar Web, Supabase ou arquivos proibidos.
