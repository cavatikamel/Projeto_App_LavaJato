# LP-WEB-DATA-CLEANUP-005

## Objetivo

Preparar um mecanismo seguro de trial para `CLEAN_BOOTSTRAP`, sem alterar o modo padrao e sem impactar o fluxo normal do LavaPrime Web.

## Mecanismo preparado

- `window.__lavaprimeCleanBootstrapTrialReadiness` foi criado como diagnostico protegido, silencioso e somente leitura;
- o objeto registra:
  - modo padrao atual;
  - disponibilidade do `CLEAN_BOOTSTRAP`;
  - superficies cobertas por fallback;
  - superficies ainda inseguras;
  - motivo para nao promover o modo limpo a default;
  - checklist minimo para um trial futuro;
  - rollback esperado.

## Garantias preservadas

- `DEMO_BOOTSTRAP` continua como modo padrao;
- `CLEAN_BOOTSTRAP` continua protegido e nao ativo por padrao;
- nenhuma seed demo foi removida;
- nenhuma alteracao visual intencional foi introduzida;
- nenhuma regra de negocio, salvamento, permissao ou autenticacao foi alterada;
- Supabase continua fechado.

## Leitura esperada do diagnostico

- `canStartProtectedTrial` pode ser `true` para um teste controlado futuro;
- `canPromoteCleanBootstrapToDefault` permanece `false`;
- a readiness do trial nao aciona bootstrap limpo, apenas registra condicoes para uma futura execucao protegida.

## Validacoes executadas

- `node --check app/main.js` -> sucesso;
- `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
- `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
- `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
- `node scripts/primyo-adapter-gate.mjs` -> sucesso;
- `npm.cmd run primyo:gate` -> sucesso;
- `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
- `npm.cmd run verify:build` -> sucesso.

## Smoke manual

- dashboard admin carregou;
- `Cadastros > Clientes` carregou;
- patio admin carregou;
- financeiro admin carregou;
- `Recibos e Documentos` carregou;
- logout admin funcionou;
- patio operador carregou;
- console permaneceu sem erro bloqueante;
- `DEMO_BOOTSTRAP` continuou como comportamento observado padrao;
- `CLEAN_BOOTSTRAP` nao foi ativado;
- os objetos globais de readiness nao apareceram na inspecao visual do browser, mas sem erro bloqueante.

## Limitacoes

- o trial ainda nao foi executado nesta fase;
- dashboard, patio, relatorios, documentos e vinculos cross-domain continuam semanticamente dependentes da seed demo;
- a promocao para default continua bloqueada.

## Riscos

- o runtime ainda pode ficar vazio demais em algumas superficies mesmo sem quebrar estruturalmente;
- os vinculos cross-domain continuam sendo o principal risco para um teste limpo mais amplo;
- o objeto global de trial readiness nao deve ser interpretado como autorizacao para troca de default.

## Rollback

1. reverter `app/main.js`;
2. reverter `app/demo/lavaprimeCleanBootstrap.js`;
3. remover `docs/primyo-web-integration/CLEAN_BOOTSTRAP_TRIAL_READINESS.md`;
4. reverter a documentacao desta fase;
5. reexecutar gate, build, verify e smoke rapido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-006 - Protected CLEAN_BOOTSTRAP trial execution`
