# LP-WEB-DATA-CLEANUP-001-CLOSURE

## Objetivo real executado

Isolar a massa central `demo/teste` do LavaPrime Web em modulo dedicado, mapear dependencias e preparar uma limpeza segura antes do Supabase, sem remover seed e sem alterar comportamento funcional.

## Observacao de desvio de escopo

Esta fase nasceu como desdobramento seguro da analise anterior sobre validacao legada de clientes, mas foi aceita como fatia separada porque o trabalho efetivo realizado foi de extracao controlada da massa demo, nao de ampliacao de `shadow read`.

## Massa demo mapeada

- `clientRegistry`
- `vehicleRegistry`
- `patioVehicles`
- `billingClients`
- `billingInvoices`
- `invoiceLineItems`
- `invoiceAmounts`
- `openPayments`

## Arquivo demo extraido

- `app/demo/lavaprimeDemoData.js`

## O que foi isolado

- a massa demo central de clientes, veiculos, patio, faturamento, itens de fatura e pagamentos;
- o consumo dessa massa passou a acontecer por importacao em `app/main.js`.

## O que nao foi removido

- nenhum seed demo/teste foi removido nesta fase;
- `quoteEstimates` e outros mocks paralelos permaneceram fora desta microextracao.

## O que continua dependente da massa demo

- dashboard;
- `Cadastros > Clientes`;
- patio;
- financeiro;
- relatorios derivados;
- smoke visual atual do ambiente local.

## Arquivos alterados

- `app/main.js`
- `app/demo/lavaprimeDemoData.js`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-001.md`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-001-CLOSURE.md`
- `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/adapters/customerAdapter.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Smoke rapido

- app local aberta;
- login admin realizado;
- dashboard aberto;
- `Cadastros > Clientes` aberto;
- patio aberto;
- financeiro aberto;
- console sem erro bloqueante.

## Riscos restantes

- a massa demo continua alimentando telas e relatorios do legado;
- ainda nao existe bootstrap limpo separado do bootstrap demo;
- remocao prematura ainda pode quebrar dashboard, patio, clientes ou financeiro.

## Rollback

1. remover `app/demo/lavaprimeDemoData.js`;
2. recolocar as colecoes isoladas em `app/main.js`;
3. reexecutar gate, build, verify e smoke rapido;
4. confirmar que dashboard, clientes, patio e financeiro continuam integros.

## Proxima fatia recomendada

- `LP-WEB-DATA-CLEANUP-002 - Segregacao entre bootstrap demo e bootstrap limpo`

## Confirmacoes finais

- nao houve impacto visual ou funcional;
- Supabase continua fechado;
- nao houve push.
