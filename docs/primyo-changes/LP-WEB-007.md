# LP-WEB-007

- Change ID: `LP-WEB-007`
- Backlog ID: `LP-WEB-007`
- Titulo: Customer adapter foundation
- Data: `2026-06-26`
- Tipo: Implementacao estrutural controlada

## Objetivo

Criar o primeiro adapter puro do LavaPrime Web para converter cliente legado em payload compativel com `CUSTOMER_CONTRACT.md`, sem integrar o adapter ao runtime atual.

## Arquivos criados ou alterados

- `app/adapters/customerAdapter.js`
- `scripts/primyo-gate.mjs`
- `docs/primyo-web-contracts/WEB_CONTRACT_ADAPTER_STRATEGY.md`
- `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`

## API do adapter

Modulo criado:

- `toCustomerContract(legacyCustomer, context)`
- `validateCustomerContract(customerContract)`
- `createCustomerContractEnvelope(customerContract, context)`

Constantes expostas:

- `CUSTOMER_CONTRACT_NAME`
- `CUSTOMER_CONTRACT_VERSION`

Comportamento esperado:

- `toCustomerContract(...)` converte o shape legado para o shape do contrato e retorna resultado controlado com `ok`, `customerContract`, `errors`, `warnings` e `missingRequiredFields`;
- `validateCustomerContract(...)` valida obrigatorios, formato e consistencia minima do contrato;
- `createCustomerContractEnvelope(...)` aplica `contractName`, `contractVersion` e `emittedAt`, preservando a validacao controlada.

## Campos mapeados

Mapeamento implementado:

- `id` -> `id` canonico opaco com prefixo legado
- `personType` -> `kind`
- `name` ou `legalName` -> `name`
- `legalName` -> `legalName`
- `document` -> `document` normalizado
- `phone` -> `phonePrimary` normalizado
- `email` -> `email`
- `address` string legado -> `address.raw`
- `billingApproved` -> `billingApproved`
- `billingCycle` -> `billingCycle`
- `allowMultipleOpenInvoices` -> `allowMultipleOpenInvoices`
- `billingClientId` -> `legacyRefs.billingClientId`
- `plates` -> `legacyRefs.plates`
- `id` legado -> `legacyRefs.sourceId`
- `personType` legado -> `legacyRefs.personType`

Campos dependentes de contexto:

- `organizationId`
- `status`
- `createdAt`
- `updatedAt`
- `contractVersion` no envelope
- `vehicleIds`, quando houver resolucao externa aprovada

## Campos ausentes ou problematicos

Lacunas tratadas explicitamente:

- o legado nao fornece `organizationId`;
- o legado nao fornece `status` canonico;
- o legado nao fornece `createdAt` e `updatedAt` historicos;
- `plates` nao foram promovidas automaticamente a `vehicleIds`;
- nao houve deduplicacao real entre `clientRegistry` e `billingClients`;
- clientes PF avulsos sem documento continuam invalidos para o contrato ate resolucao formal da lacuna.

## Riscos

- risco de tratar `clientRegistry` e `billingClients` como mesma fonte sem reconciliacao ainda existe;
- risco de `vehicleIds` permanecerem pendentes enquanto houver apenas placas legadas;
- risco de se interpretar `status` ou timestamps como dados inferidos sem aprovacao, caso contexto nao seja controlado;
- risco de fases futuras integrarem o adapter ao runtime antes de resolver ownership e IDs.

## Limitacoes

- o adapter nao acessa `app/main.js`;
- o adapter nao faz IO;
- o adapter nao acessa DOM, `window`, `localStorage` ou Supabase;
- o adapter nao e consumido por nenhuma tela nesta fase;
- o adapter nao faz merge real entre cadastro operacional e faturamento;
- o adapter nao gera dados obrigatorios ausentes por intuicao; ele sinaliza a lacuna de forma controlada.

## Gate

Ajuste minimo aplicado no `primyo:gate`:

- reconhecimento de `app/adapters/customerAdapter.js` como modulo obrigatorio desta fase;
- `node --check app/adapters/customerAdapter.js`;
- validacao de exports minimos do adapter.

## Rollback

1. Remover `app/adapters/customerAdapter.js`.
2. Reverter o ajuste minimo em `scripts/primyo-gate.mjs`.
3. Reverter a documentacao de `LP-WEB-007`.
4. Reexecutar `node --check app/adapters/customerAdapter.js`, `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`.
