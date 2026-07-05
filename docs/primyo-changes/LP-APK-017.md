# LP-APK-017

- Change ID: `LP-APK-017`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-05`

## Objetivo

Alinhar o fluxo de `Produtos` do app Android `LavaPrime` ao fluxo real de `Produtos` do Web, mantendo o app nativo, adaptado ao mobile e sem alterar o Web.

## Escopo

- ler a governança obrigatória do programa APK;
- mapear o fluxo real de `Produtos` em `app/main.js` em modo leitura;
- ajustar a `Visão Geral` para remover blocos redundantes e ficar mais fiel ao uso operacional;
- mover o `Novo atendimento` do `Pátio` para uma tela cheia com rascunho preservado;
- ajustar a tela Android de `Produtos` para refletir os blocos, campos, termos, regras e ações centrais do Web;
- ampliar o modelo local apenas no necessário para sustentar `Produtos` e os snapshots centrais do novo atendimento;
- manter a identidade visual oficial;
- garantir que não haja texto fora da área, campos desalinhados ou contraste fraco;
- atualizar docs da fase e closure;
- validar com gate Web e build Android.

## Fora de escopo

- alterar Web, contratos Web ou Supabase;
- abrir autenticação remota real;
- concluir `Insumos`, pagamentos completos, documentos, impressão térmica ou sync remoto real;
- remover telas Android já existentes;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `LavaPrimeAndroidApp/app/schemas/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-017.md`
- `docs/primyo-changes/LP-APK-017-CLOSURE.md`
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

- ampliar o schema local de `Produtos` e `Atendimentos` sem perder os dados já existentes;
- quebrar a compilação Android ao substituir o popup do novo atendimento por um fluxo em tela cheia;
- manter a fidelidade do `Produtos` e do `Pátio` ao Web sem estourar a área útil no mobile.

## Rollback

- reverter apenas os arquivos Android e documentais desta fase;
- preservar a sujeira preexistente fora do recorte;
- não tocar Web, Supabase ou arquivos proibidos.
