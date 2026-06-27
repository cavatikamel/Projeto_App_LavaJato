# LP-WEB-007 Closure

- Change ID: `LP-WEB-007-CLOSURE`
- Backlog ID: `LP-WEB-007`
- Titulo: Encerramento formal do primeiro adapter puro de cliente
- Tipo: Implementacao estrutural controlada
- Data: `2026-06-26`
- Decisao final: `Aceito com observacoes`
- Aceite tecnico: `Aprovado para baseline sem integracao ao runtime`

## 1. Resumo da fase

`LP-WEB-007` encerra a primeira implementacao real da camada de adapters do web.

O resultado formal desta fase foi:

- criacao de `app/adapters/customerAdapter.js`;
- exposicao de uma API publica minima, pura e explicita;
- ajuste minimo em `scripts/primyo-gate.mjs` para reconhecer o novo modulo critico;
- registro das lacunas estruturais ainda abertas antes de qualquer integracao ao runtime;
- confirmacao de que `app/main.js` permaneceu intacto.

## 2. Adapter criado

Modulo criado:

- `app/adapters/customerAdapter.js`

Natureza do modulo:

- puro;
- sem efeitos colaterais;
- sem acesso a DOM;
- sem acesso a `window`;
- sem acesso a `localStorage`;
- sem acesso a Supabase;
- sem dependencia de `app/main.js`;
- sem integracao ao runtime nesta fase.

## 3. API exposta

Funcoes publicas:

- `toCustomerContract(legacyCustomer, context)`
- `validateCustomerContract(customerContract)`
- `createCustomerContractEnvelope(customerContract, context)`

Constantes publicas:

- `CUSTOMER_CONTRACT_NAME`
- `CUSTOMER_CONTRACT_VERSION`

## 4. Campos mapeados

Campos convertidos diretamente:

- `id` legado -> `id` canonico opaco com prefixo controlado;
- `personType` -> `kind`;
- `name` ou `legalName` -> `name`;
- `legalName` -> `legalName`;
- `document` -> `document` normalizado;
- `phone` -> `phonePrimary` normalizado;
- `email` -> `email`;
- `address` string -> `address.raw`;
- `billingApproved` -> `billingApproved`;
- `billingCycle` -> `billingCycle`;
- `allowMultipleOpenInvoices` -> `allowMultipleOpenInvoices`.

Pontes legadas registradas:

- `billingClientId` -> `legacyRefs.billingClientId`;
- `id` legado -> `legacyRefs.sourceId`;
- `personType` legado -> `legacyRefs.personType`;
- `plates` -> `legacyRefs.plates`.

Campos dependentes de contexto:

- `organizationId`;
- `status`;
- `createdAt`;
- `updatedAt`;
- `contractVersion` no envelope;
- `vehicleIds`, quando a resolucao externa existir.

## 5. Campos ausentes ou problematicos

Lacunas assumidas explicitamente:

- o legado nao fornece `organizationId`;
- o legado nao fornece `status` canonico;
- o legado nao fornece `createdAt` e `updatedAt` historicos;
- `plates` nao foram promovidas automaticamente a `vehicleIds`;
- nao houve deduplicacao real entre `clientRegistry` e `billingClients`;
- cliente PF avulso sem documento continua invalido para o contrato.

## 6. Validacoes executadas

Validacoes tecnicas obrigatorias:

- `node --check app/adapters/customerAdapter.js` -> sucesso;
- `npm.cmd run primyo:gate` -> sucesso;
- `npm.cmd run build` -> sucesso;
- `npm.cmd run verify:build` -> sucesso.

Validacao conceitual registrada:

- entrada legada valida -> `ok: true`;
- entrada legada incompleta -> `ok: true` com warning controlado sobre `vehicleIds`;
- ausencia de campo obrigatorio (`document`) -> `ok: false` e `missingRequiredFields: ["document"]`;
- `contractVersion` gerada corretamente no envelope;
- `organizationId` preservado quando fornecido por contexto;
- ausencia de efeitos colaterais confirmada sobre a entrada legada.

## 7. Riscos remanescentes

- a duplicidade `clientRegistry` x `billingClients` continua sem reconciliacao real;
- `vehicleIds` continuam dependentes de resolucao externa;
- `status`, `createdAt` e `updatedAt` ainda dependem de contexto fornecido;
- a integracao prematura ao runtime elevaria risco de acoplamento antes da consolidacao de identidade, envelope e `legacyRefs`;
- a camada ainda nao provou convivencia com um segundo adapter de master data.

## 8. Rollback

1. Remover `app/adapters/customerAdapter.js`.
2. Reverter o ajuste minimo em `scripts/primyo-gate.mjs`.
3. Reverter a documentacao de `LP-WEB-007`.
4. Reexecutar `node --check app/adapters/customerAdapter.js`, `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`.

## 9. Decisao final

`LP-WEB-007` foi aceito como base estrutural do primeiro adapter puro do web, com observacoes.

Aceite concedido porque:

- o adapter existe;
- o adapter e puro;
- o adapter nao foi integrado ao runtime;
- `app/main.js` permaneceu intacto;
- o gate passou com o novo modulo protegido;
- o build e o verify permaneceram verdes;
- nao houve mudanca funcional perceptivel.

Observacao de aceite:

- a proxima fase nao deve integrar `customerAdapter` ao runtime antes da consolidacao de identidade, envelope e `legacyRefs`, nem antes da decisao formal da proxima fatia.
