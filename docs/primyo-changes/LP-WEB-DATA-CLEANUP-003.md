# LP-WEB-DATA-CLEANUP-003

## Objetivo

Revisar as dependencias residuais da massa `demo/teste` e criar um diagnostico protegido para readiness do `CLEAN_BOOTSTRAP`, sem trocar o modo padrao, sem remover seed e sem abrir Supabase.

## Arquivos alterados

- `app/main.js`
- `app/demo/lavaprimeCleanBootstrap.js`
- `docs/primyo-web-integration/CLEAN_BOOTSTRAP_DEPENDENCY_REVIEW.md`
- `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Implementacao

- `app/main.js` passou a publicar `window.__lavaprimeCleanBootstrapReadiness` como diagnostico interno em memoria;
- o diagnostico mapeia dependencias de:
  - dashboard
  - clientes
  - veiculos
  - patio
  - financeiro
  - faturas
  - pagamentos
  - relatorios
  - documentos
  - vinculos entre cliente, veiculo e faturamento
- `app/demo/lavaprimeCleanBootstrap.js` passou a expor um baseline explicito do fallback protegido do bootstrap limpo;
- o modo padrao continuou `DEMO_BOOTSTRAP`;
- nenhuma seed foi removida.

## Garantias preservadas

- `CLEAN_BOOTSTRAP` nao virou padrao;
- a massa demo continuou preservada;
- o legado continuou sustentando o runtime;
- nenhuma alteracao visual foi introduzida;
- Supabase continuou fechado.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Smoke manual

Executado em `http://127.0.0.1:4174/` com resultado aprovado:

- login admin concluido;
- dashboard carregado;
- `Cadastros > Clientes` carregou;
- patio admin carregou;
- financeiro admin carregou;
- `Recibos e Documentos` carregou;
- logout funcionou;
- login operador concluiu;
- patio do operador carregou;
- console do browser permaneceu sem erro bloqueante;
- o comportamento observado permaneceu consistente com `DEMO_BOOTSTRAP` como modo padrao.

## Riscos

- dashboard, clientes, patio, financeiro e relatorios continuam dependentes da massa demo
- `CLEAN_BOOTSTRAP` continua inseguro como padrao
- qualquer remocao prematura de seed ainda pode quebrar runtime e smoke

## Rollback

1. remover o diagnostico `window.__lavaprimeCleanBootstrapReadiness` de `app/main.js`;
2. remover os helpers de readiness adicionados nesta fase;
3. remover o baseline adicional de `app/demo/lavaprimeCleanBootstrap.js`;
4. reexecutar `node --check`, Adapter Gate, `primyo:gate`, `build`, `verify:build` e smoke rapido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-004 - Critical surface fallback hardening before clean bootstrap trial`
