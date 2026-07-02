# LP-APK-001-CLOSURE

- Change ID: `LP-APK-001-CLOSURE`
- Referencia: `LP-APK-001`
- Tipo: `Documentation Phase`
- Data: `2026-07-02`

## Fase executada

Baseline funcional real do LavaPrime Web para orientar a paridade do app Android nativo `LavaPrime`.

## Arquivos lidos

- governanca Primyo obrigatoria;
- governanca do `Programa LavaPrime APK`;
- contratos oficiais em `docs/primyo-data/contracts/**`;
- `app/main.js`, `app/styles.css`, `app/adapters/**`, `app/demo/**` e `scripts/**` em modo leitura;
- `LavaPrimeAndroidApp/**` em modo leitura apenas para contexto de status atual do APK.

## Arquivos criados/alterados

- `docs/primyo-apk/LP_APK_WEB_FUNCTIONAL_BASELINE.md`
- `docs/primyo-apk/LP_APK_WEB_MODULES_MAP.md`
- `docs/primyo-apk/LP_APK_WEB_ROUTINES_MATRIX.md`
- `docs/primyo-apk/LP_APK_ANDROID_PARITY_TARGETS.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS_MATRIX.md`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-001.md`
- `docs/primyo-changes/LP-APK-001-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`

## Baseline funcional consolidada

- login e selecao de perfil foram confirmados como fluxo local real do Web;
- `Administrador` e `Operador` foram confirmados como perfis oficiais observados;
- patio e atendimento foram confirmados como centro da operacao;
- clientes, veiculos, servicos, produtos, insumos, vendas, pagamentos, faturas, documentos, negocio, usuarios e mensagens foram mapeados em rotina real;
- o Android passa a ter alvo funcional explicito por modulo, com pontos de adaptacao mobile e pontos que nao devem ser copiados literalmente.

## Percentual oficial

- antes: `3%`
- depois: `10%`
- checkpoint Android atual continua `8% estimado`, sem substituir o progresso oficial

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

Resultado observado:

- `npm.cmd run primyo:gate` -> `sucesso`
- `npm.cmd run build` e `npm.cmd run verify:build` foram executados pelo gate oficial com sucesso
- warning nao bloqueante de chunk acima de `500 kB` permaneceu no build Web, sem relacao com o escopo documental desta fase

## Falhas encontradas

- nenhuma falha funcional nova foi introduzida nesta fase documental;
- nao houve falha do gate nesta execucao.

## Commit

- mensagem criada: `docs(apk): map web functional baseline for android parity`

## Push

- nenhum push foi executado.

## Escopo preservado

- nenhum arquivo em `LavaPrimeAndroidApp/**` foi alterado;
- nenhum arquivo Web funcional foi alterado;
- nenhum contrato runtime foi alterado;
- nenhuma integracao Supabase foi iniciada.

## Proxima fase recomendada

- `LP-APK-002 - Android Current State Reuse Decision`
