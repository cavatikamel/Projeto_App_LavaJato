# LP-APK-002-CLOSURE

- Change ID: `LP-APK-002-CLOSURE`
- Referencia: `LP-APK-002`
- Tipo: `Documentation Phase`
- Data: `2026-07-02`

## Fase executada

Decisao formal de reuso da base atual do `LavaPrimeAndroidApp` para orientar a reconstrucao controlada do app Android nativo `LavaPrime`.

## Arquivos lidos

- governanca Primyo obrigatoria;
- governanca do `Programa LavaPrime APK`;
- baseline funcional Web e documentos de paridade Android;
- `LavaPrimeAndroidApp/**` e `LavaPrimeAndroidApp/Material_Visual/**` em modo leitura;
- `app/main.js` e `app/styles.css` em modo leitura para referencia de dominio e identidade.

## Arquivos criados/alterados

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

## Decisao oficial de reuse

- recomendacao principal: `clean-foundation-inside-current-project`;
- `keep`: setup Gradle, projeto Android atual, `Material_Visual`, monitor de conectividade e documentacao;
- `refactor`: design system atual, splash, drawer, top bar, navigation/root, dashboard, patio e shell de sync;
- `replace`: Room, modelos, DAOs, repositorio, auth demo, cadastros combinados e catalogo produto/insumo;
- `archive`: placeholders de modulo e seed/demo heuristica como fundacao evolutiva.

## Principais evidencias que sustentam a decisao

- o app atual possui stack moderna e shells reais de tela, portanto nao compensa abandonar o projeto;
- a base de dados atual segue curta, sem migracoes explicitas e com `fallbackToDestructiveMigration()`;
- o repositorio atual mistura seed demo, auth demo, CRUD local e mudancas de sync;
- `Material_Visual` contem assets oficiais que ainda nao sao a fonte primaria de logo e iconografia no runtime atual;
- o patio e o dashboard mostram valor de conceito, mas a maior parte das rotinas ainda esta parcial ou ausente.

## Percentual oficial

- antes: `10%`
- depois: `15%`
- checkpoint Android atual continua `8% estimado`, sem substituir o progresso oficial do programa

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

Resultado observado:

- `npm.cmd run primyo:gate` -> `sucesso`
- `npm.cmd run build` e `npm.cmd run verify:build` foram executados pelo gate oficial com sucesso
- warning nao bloqueante de chunk acima de `500 kB` permaneceu no build Web, sem relacao com o escopo documental desta fase

## Falhas encontradas

- nenhuma falha nova foi introduzida nesta fase documental;
- nenhuma validacao Android de build foi executada, por nao haver alteracao de codigo e por estar fora do escopo da fase.

## Commit

- mensagem criada: `docs(apk): record android reuse decision`

## Push

- nenhum push foi executado.

## Escopo preservado

- nenhum arquivo em `LavaPrimeAndroidApp/**` foi alterado;
- nenhum arquivo Web funcional foi alterado;
- nenhuma migracao Room foi criada;
- nenhuma integracao Supabase foi iniciada.

## Proxima fase recomendada

- `LP-APK-003 - Mobile Visual Reference Baseline`
