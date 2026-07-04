# LP-APK-015

- Change ID: `LP-APK-015`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Objetivo

Alinhar o fluxo de `Veiculos` do app Android `LavaPrime` ao fluxo real de `Veiculos` do Web, mantendo o app nativo, adaptado ao mobile e sem alterar o Web.

## Escopo

- ler a governanca obrigatoria do programa APK;
- mapear o fluxo real de `Veiculos` em `app/main.js` em modo leitura;
- ajustar a tela Android de `Veiculos` para refletir os mesmos blocos, campos, termos, regras e acoes centrais do Web;
- ampliar o modelo local apenas no necessario para suportar os campos reais de `Veiculos`;
- manter a identidade visual oficial;
- garantir que nao haja texto fora da area, campos desalinhados ou contraste fraco;
- atualizar docs da fase e closure;
- validar com gate Web e build Android.

## Fora de escopo

- alterar Web, contratos Web ou Supabase;
- abrir autenticacao remota real;
- concluir check-list PDF, transferencia avancada de proprietario ou sync remoto real;
- evoluir `Servicos`, `Produtos` ou `Atendimento` fora do dominio de `Veiculos`;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `LavaPrimeAndroidApp/app/schemas/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-015.md`
- `docs/primyo-changes/LP-APK-015-CLOSURE.md`
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

- ampliar o schema local de `Veiculos` sem perder dados ja existentes no aparelho;
- alinhar o vinculo com cliente e os filtros do Web sem improvisar uma tela paralela;
- quebrar a compilacao Android ao substituir o espelho de leitura por um fluxo mobile real.

## Rollback

- reverter apenas os arquivos Android e documentais desta fase;
- preservar a sujeira preexistente fora do recorte;
- nao tocar Web, Supabase ou arquivos proibidos.

