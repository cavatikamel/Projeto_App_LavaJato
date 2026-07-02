# LP-APK-003-CLOSURE

- Change ID: `LP-APK-003-CLOSURE`
- Referencia: `LP-APK-003`
- Tipo: `Documentation Phase`
- Data: `2026-07-02`

## Fase executada

Baseline visual oficial do app Android `LavaPrime`, consolidando Web, `Material_Visual` e gaps do APK atual.

## Arquivos lidos

- governanca Primyo obrigatoria;
- governanca do `Programa LavaPrime APK`;
- baseline funcional Web, alvo de paridade Android e decisao de reuse;
- `app/main.js`, `app/styles.css`, `app/adapters/**` e `app/demo/**` em modo leitura;
- `LavaPrimeAndroidApp/**` e `LavaPrimeAndroidApp/Material_Visual/**` em modo leitura.

## Arquivos criados/alterados

- `docs/primyo-apk/LP_APK_MOBILE_VISUAL_BASELINE.md`
- `docs/primyo-apk/LP_APK_VISUAL_TOKEN_MAP.md`
- `docs/primyo-apk/LP_APK_ANDROID_SCREEN_VISUAL_TARGETS.md`
- `docs/primyo-apk/LP_APK_ANDROID_VISUAL_GAP_MATRIX.md`
- `docs/primyo-apk/LP_APK_VISUAL_PARITY_RULES.md`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-003.md`
- `docs/primyo-changes/LP-APK-003-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`

## Baseline visual criada

- o Web passa a ser a referencia de linguagem, estrutura e hierarquia operacional;
- `Material_Visual` passa a ser a referencia oficial de marca, iconografia e tipografia;
- o conflito atual entre assets legados do Web e a marca nova oficial foi explicitado;
- o APK atual foi comparado contra essas duas referencias e deixou de ter leitura subjetiva de "visual parcial".

## Tokens visuais mapeados

- paleta navy/cyan/lime/fundo claro foi consolidada como familia oficial;
- tipografia alvo foi formalizada como `Inter`, com `Roboto` apenas como referencia observada no Web;
- tokens com conflito de hex entre artes foram marcados como `needs-confirmation` em vez de inventados;
- radius, spacing, borda e sombra tambem foram traduzidos para a futura implementacao Compose.

## Gaps visuais principais

- a marca oficial nova ainda nao esta aplicada no runtime Android;
- o Web ainda usa assets legados de carro/gota, enquanto `Material_Visual` define o sistema novo `LP`;
- tipografia oficial ainda nao esta implementada no Android;
- drawer, dashboard e login do APK atual ainda estao abaixo do alvo final;
- `Clientes/Veiculos` e `Produtos/Insumos` ainda misturam identidade visual e funcional;
- placeholders de modulo ainda contaminam a leitura de maturidade visual.

## Telas que exigem redesign

- `Login`
- `Drawer/Menu`
- `Dashboard`
- `Clientes`
- `Veiculos`
- `Produtos`
- `Insumos`
- placeholders de modulo
- sistema de marca/logo/icon

## Telas que podem ser ajustadas

- `Splash`
- `Inicializacao`
- `Selecao de perfil`
- `Patio`
- `Security/Sync`
- cards
- chips/status
- iconografia geral

## Percentual oficial

- antes: `15%`
- depois: `19%`

Observacao:

- esta fase nao corrige o visual do APK;
- ela apenas cria a referencia oficial para que as proximas fases corrijam o visual sem improviso.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

Resultado observado:

- `npm.cmd run primyo:gate` -> `sucesso`
- `npm.cmd run build` e `npm.cmd run verify:build` foram executados pelo gate com sucesso
- warning nao bloqueante de chunk acima de `500 kB` permaneceu no build Web, sem relacao com o escopo documental desta fase

## Falhas encontradas

- nenhuma falha nova foi introduzida nesta fase documental;
- nenhuma validacao Android de build foi executada, por nao haver alteracao de codigo Android.

## Commit

- mensagem criada: `docs(apk): establish mobile visual reference baseline`

## Push

- nenhum push foi executado.

## Escopo preservado

- nenhum arquivo em `LavaPrimeAndroidApp/**` foi alterado;
- nenhum arquivo Web funcional foi alterado;
- nenhum asset foi trocado;
- nenhum tema Compose foi implementado;
- nenhuma integracao Supabase foi iniciada.

## Proxima fase recomendada

- `LP-APK-004 - APK Requirements Finalization`
