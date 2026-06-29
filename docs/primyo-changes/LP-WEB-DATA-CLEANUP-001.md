# LP-WEB-DATA-CLEANUP-001

## Objetivo

Executar a primeira limpeza controlada da massa `demo/teste` do LavaPrime Web antes do Supabase, com foco em:

- mapear vinculos;
- isolar seeds centrais;
- evitar remocao prematura;
- manter o legado e a UI funcionando sem mudanca visual.

## O que foi mapeado

Colecoes hardcoded diretamente ligadas a clientes, veiculos, patio, faturamento, faturas, itens de fatura, pagamentos, dashboard e relatorios:

- `clientRegistry`
- `vehicleRegistry`
- `patioVehicles`
- `billingClients`
- `billingInvoices`
- `invoiceLineItems`
- `invoiceAmounts`
- `openPayments`

Vinculos confirmados:

- cliente faturado <-> `billingClients`
- faturamento <-> `billingInvoices`
- faturas <-> `invoiceLineItems`
- cliente <-> veiculo por `currentClientId` e `plates`
- veiculo/cliente <-> patio por `plate`, `owner` e `phone`
- cliente/veiculo <-> `openPayments`
- dashboard e relatorios continuam derivando desses seeds

## O que foi isolado

Foi criado o modulo:

- `app/demo/lavaprimeDemoData.js`

Colecoes movidas de `app/main.js` para esse modulo:

- `billingClients`
- `billingInvoices`
- `invoiceAmounts`
- `invoiceLineItems`
- `clientRegistry`
- `vehicleRegistry`
- `patioVehicles`
- `openPayments`

Resultado:

- `app/main.js` ficou menos carregado;
- a massa demo central passou a ter fronteira tecnica propria;
- a extracao permaneceu pequena, reversivel e sem alterar comportamento funcional.

## O que foi removido

- nada nesta fase

Motivo:

- a massa demo atual ainda sustenta dashboard, clientes, patio, financeiro e relatorios;
- a remocao direta ainda nao e segura.

## O que foi mantido

- toda a massa demo/teste isolada no novo modulo;
- `quoteEstimates` e outros seeds paralelos fora do nucleo cliente/faturamento/patio permaneceram onde estavam;
- o legado continua fonte ativa;
- nenhum fluxo de save, permissao, autenticacao ou UI foi alterado.

## Riscos restantes

- os seeds continuam alimentando telas e relatorios do legado;
- ainda nao existe bootstrap limpo separado do bootstrap demo;
- remocao prematura continua podendo quebrar dashboard, patio, clientes ou financeiro;
- Supabase permanece fechado e ainda nao existe base realmente limpa pronta para migracao.

## Rollback

1. remover `app/demo/lavaprimeDemoData.js`;
2. recolocar as colecoes isoladas de volta em `app/main.js`;
3. reexecutar `node --check app/main.js`;
4. reexecutar `node --check app/adapters/customerAdapter.js`;
5. reexecutar `node scripts/primyo-adapter-gate.mjs`;
6. reexecutar `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`;
7. repetir smoke de dashboard, clientes, patio e financeiro.

## Validacoes executadas

- `node --check app/main.js`
- `node --check app/adapters/customerAdapter.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Smoke rapido executado

- login admin;
- dashboard preservado;
- `Cadastros > Clientes` preservado;
- `Patio` preservado;
- financeiro preservado;
- console sem erro bloqueante.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-002 - Segregacao entre bootstrap demo e bootstrap limpo`

Motivo:

- a massa principal ja esta isolada;
- o passo seguro seguinte e separar ambiente demo de ambiente limpo sem abrir Supabase ainda.
