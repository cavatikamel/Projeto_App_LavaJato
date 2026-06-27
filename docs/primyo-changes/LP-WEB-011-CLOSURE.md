# LP-WEB-011-CLOSURE

## Resumo da fase

`LP-WEB-011` formaliza a criacao do `supplyAdapter` como quinto adapter puro oficial do LavaPrime Web.

A fase foi executada sem integrar adapters ao runtime, sem tocar em `app/main.js`, sem alterar estoque real, sem criar movimentacao operacional e sem abrir qualquer etapa de Supabase.

## Adapter criado

- `app/adapters/supplyAdapter.js`

## API exposta

- `toSupplyContract(legacySupply, context)`
- `validateSupplyContract(supplyContract)`
- `createSupplyContractEnvelope(supplyContract, context)`
- `SUPPLY_CONTRACT_NAME`
- `SUPPLY_CONTRACT_VERSION`

## Campos mapeados

Campos principais:

- `id`
- `organizationId`
- `sku`
- `name`
- `unit`
- `costPrice`
- `isActive`
- `createdAt`
- `updatedAt`

Campos opcionais quando existirem:

- `stockBalance`
- `minStock`
- `supplierName`
- `riskTags`
- `compatibilityMetadata`
- `notes`
- `legacyRefs`

## Diferenca preservada entre produto e insumo

- `Supply` nao foi tratado como item vendavel;
- `salePrice` nao foi introduzido no contrato `Supply`;
- `supplierName` permaneceu no dominio de insumo, sem contaminar o contrato `Product`;
- `stockBalance` permaneceu como saldo observado, nao como trilha auditavel ou movimentacao operacional;
- nenhuma baixa, reposicao, consumo por servico ou reconciliacao com estoque real foi integrada nesta fase.

## Campos ausentes ou problematicos

- `organizationId` continua vindo de contexto controlado;
- `sourceId` continua obrigatorio para identidade canonica;
- `category` e `type` do legado ainda nao possuem campo canonico aprovado no contrato `Supply` e permanecem em `legacyRefs`;
- relacoes com `serviceSupplyProfiles` ainda nao sao ownership oficial do contrato;
- o shape legado atual nao traz trilha auditavel de movimentacao de estoque.

## Cenarios do Adapter Gate

- insumo valido com contexto completo;
- insumo invalido sem nome;
- insumo invalido sem `sourceId`;
- insumo invalido sem `organizationId`;
- envelope valido com `validation`, `warnings`, `metadata`, `organizationId` e `sourceId` preservados.

## Validacoes executadas

- `node --check app/adapters/shared/adapterHelpers.js` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `node --check app/adapters/serviceAdapter.js` -> sucesso
- `node --check app/adapters/productAdapter.js` -> sucesso
- `node --check app/adapters/supplyAdapter.js` -> sucesso
- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## Riscos remanescentes

- `supplierName` ainda nao conversa com ownership transversal de fornecedor em outros dominios;
- `stockBalance` continua sendo estado observado e nao historico auditavel;
- relacoes entre servico e insumo ainda dependem de resolver de IDs e ownership cross-domain;
- integrar `supplyAdapter` ao runtime antes de fase propria continua prematuro;
- abrir Supabase antes de resolver identidade e ownership cross-domain continua prematuro.

## Rollback

1. Remover `app/adapters/supplyAdapter.js`.
2. Reverter os ajustes em `scripts/primyo-adapter-gate.mjs`.
3. Reverter eventual ajuste minimo em `scripts/primyo-gate.mjs`.
4. Reverter `docs/primyo-changes/LP-WEB-011.md`, este closure e as atualizacoes documentais da fase.
5. Reexecutar `node scripts/primyo-adapter-gate.mjs`.
6. Reexecutar `npm.cmd run primyo:gate`, build e verify.

## Decisao final

- Decisao: `Aceito`
- Aceite tecnico: `Aprovado`

## Observacoes finais

- `app/main.js` permaneceu intacto;
- nenhum adapter foi integrado ao runtime;
- nenhum estoque real foi alterado;
- nenhuma mudanca funcional foi iniciada;
- `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `adapterHelpers` permaneceram intactos nesta closure.
