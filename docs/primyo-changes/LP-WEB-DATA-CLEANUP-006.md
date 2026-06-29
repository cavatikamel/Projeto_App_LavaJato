# LP-WEB-DATA-CLEANUP-006

## Objetivo

Executar um trial protegido do `CLEAN_BOOTSTRAP`, sem trocar o modo padrao do LavaPrime Web e sem remover a massa `demo/teste`.

## Trial protegido executado

- `window.__lavaprimeCleanBootstrapTrialExecution` foi adicionado como diagnostico tecnico somente leitura;
- o runtime continua em `DEMO_BOOTSTRAP`;
- `CLEAN_BOOTSTRAP` foi apenas avaliado de forma protegida e em memoria;
- o trial nao passa a comandar save, permissao, autenticacao, dashboard, patio, financeiro ou relatorios.

## Resultado tecnico esperado do trial

- superfícies que passam com fallback estrutural:
  - `dashboard`
  - `clients`
  - `vehicles`
  - `patio`
  - `financial`
  - `invoices`
  - `reports`
  - `documents`
- superfícies ainda inseguras para qualquer promocao:
  - `dashboard`
  - `patio`
  - `reports`
  - `documents`
  - `customerVehicleBillingLinks`
- `fallbackCoverageCount`: `8`
- `unsafeSurfaceCount`: `5`
- `cleanBootstrapActivatedInRuntime`: `false`
- `cleanBootstrapActivatedAsDefault`: `false`

## Garantias preservadas

- `DEMO_BOOTSTRAP` continua como modo padrao;
- nenhuma seed demo foi removida;
- `CLEAN_BOOTSTRAP` continua protegido;
- nenhuma alteracao visual intencional foi introduzida;
- nenhuma regra de negocio, salvamento, permissao ou autenticacao foi alterada;
- Supabase continua fechado.

## Observacao operacional do browser

- o fluxo admin e operador continuou funcional no modo padrao;
- a inspeção do browser continuou sem expor os objetos globais tecnicos de readiness/trial;
- mesmo assim, nao houve erro bloqueante no console e o trial permaneceu estritamente nao funcional e nao padrao.

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
- `DEMO_BOOTSTRAP` permaneceu como comportamento observado padrao;
- `CLEAN_BOOTSTRAP` nao foi ativado como padrao.

## Riscos

- `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` continuam inseguros para qualquer promocao do modo limpo;
- a ausencia visual dos objetos globais no browser limita a observabilidade direta do diagnostico;
- o trial continua diagnostico e nao autoriza troca de default.

## Rollback

1. reverter `app/main.js`;
2. reverter `app/demo/lavaprimeCleanBootstrap.js`;
3. remover `docs/primyo-web-integration/CLEAN_BOOTSTRAP_TRIAL_EXECUTION.md`;
4. reverter a documentacao desta fase;
5. reexecutar gate, build, verify e smoke rapido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-007 - Targeted semantic hardening after protected clean bootstrap trial`
