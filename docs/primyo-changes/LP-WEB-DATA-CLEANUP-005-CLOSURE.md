# LP-WEB-DATA-CLEANUP-005-CLOSURE

## Objetivo da fase

Preparar um mecanismo seguro de trial para `CLEAN_BOOTSTRAP`, sem alterar o modo padrao e sem impactar o fluxo normal do LavaPrime Web.

## Trial protegido preparado

- `window.__lavaprimeCleanBootstrapTrialReadiness` foi preparado como diagnostico protegido, silencioso e somente leitura;
- o mecanismo separa readiness para trial protegido de readiness para promocao a default.

## Diagnostico criado ou atualizado

- `window.__lavaprimeCleanBootstrapReadiness` continua registrando dependencias residuais e cobertura de fallback;
- `window.__lavaprimeCleanBootstrapTrialReadiness` passa a registrar:
  - modo padrao atual;
  - disponibilidade do `CLEAN_BOOTSTRAP`;
  - superficies cobertas por fallback;
  - superficies ainda inseguras;
  - motivo para nao promover o modo limpo a default;
  - checklist minimo para trial futuro;
  - rollback esperado.

## Arquivos alterados

- `app/main.js`
- `app/demo/lavaprimeCleanBootstrap.js`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-005.md`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-005-CLOSURE.md`
- `docs/primyo-web-integration/CLEAN_BOOTSTRAP_TRIAL_READINESS.md`
- `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Modo padrao confirmado

- `DEMO_BOOTSTRAP`

## O que nao foi removido

- `app/demo/lavaprimeDemoData.js`
- toda a massa demo/teste de clientes, veiculos, patio, faturamento, pagamentos, dashboard e relatorios

## Validacoes executadas

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Resultado do smoke manual

- dashboard admin carregou;
- `Cadastros > Clientes` carregou;
- patio admin carregou;
- financeiro admin carregou;
- `Recibos e Documentos` carregou;
- logout admin funcionou;
- patio operador carregou;
- console permaneceu sem erro bloqueante;
- `DEMO_BOOTSTRAP` permaneceu como comportamento observado padrao;
- `CLEAN_BOOTSTRAP` nao foi ativado.

## Observacoes operacionais

- os objetos globais de readiness nao apareceram na inspecao visual do browser, mas sem erro funcional;
- `build` manteve warning nao bloqueante de chunk acima de `500 kB`.

## Riscos

- dashboard, patio, relatorios, documentos e vinculos cross-domain continuam semanticamente dependentes da seed demo;
- o trial ainda nao foi executado de fato;
- `CLEAN_BOOTSTRAP` segue inadequado para promocao a default.

## Rollback

1. reverter `app/main.js`;
2. reverter `app/demo/lavaprimeCleanBootstrap.js`;
3. remover `docs/primyo-web-integration/CLEAN_BOOTSTRAP_TRIAL_READINESS.md`;
4. reverter a documentacao desta fase;
5. reexecutar gate, build, verify e smoke rapido.

## Proxima fatia recomendada

- `LP-WEB-DATA-CLEANUP-006 - Protected CLEAN_BOOTSTRAP trial execution`

## Confirmacoes finais

- comportamento visual e funcional preservado;
- Supabase continua fechado;
- nao houve push.
