# LP-WEB-009

## Objetivo

Criar o terceiro adapter puro do LavaPrime Web: `serviceAdapter`.

Esta fase existe para adaptar o dominio de servicos ao contrato oficial `Service`, sem integrar o adapter a `app/main.js`, sem alterar comportamento funcional e sem abrir Supabase.

## Arquivos criados ou alterados

- `app/adapters/serviceAdapter.js`
- `scripts/primyo-adapter-gate.mjs`
- `scripts/primyo-gate.mjs`
- `docs/primyo-changes/LP-WEB-009.md`
- `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## API do adapter

O modulo expoe:

- `toServiceContract(legacyService, context)`
- `validateServiceContract(serviceContract)`
- `createServiceContractEnvelope(serviceContract, context)`
- `SERVICE_CONTRACT_NAME`
- `SERVICE_CONTRACT_VERSION`

## Campos mapeados

Campos principais cobertos nesta fase:

- `id` canonico a partir de `sourceId`
- `organizationId`
- `serviceCode`
- `name`
- `price`
- `isActive`
- `createdAt`
- `updatedAt`

Campos opcionais mapeados quando existirem:

- `description`
- `durationMinutes`
- `vehicleType`
- `vehicleCategory`
- `defaultVehicleCareType`
- `maintenanceRequired`
- `maintenanceInterval`
- `maintenanceDate`
- `supplyProfileRefs`
- `notes`
- `legacyRefs`

## Campos ausentes ou problematicos

Lacunas observadas no legado atual:

- `serviceCatalog` observado em `app/main.js` nao expone `id` estavel por item;
- `serviceCatalog` nao expone `serviceCode` tecnico estavel;
- `description` nao aparece no seed legado atual;
- `supplyProfileRefs` nao pode ser resolvido automaticamente nesta fase porque a composicao tecnica ainda depende de chave derivada por nome;
- `createdAt` e `updatedAt` nao existem no seed legado atual e dependem de contexto controlado.

Decisoes aplicadas:

- `sourceId` permanece obrigatorio via contexto ou legado;
- `serviceCode` pode ser derivado de forma controlada a partir de `sourceId`, com warning explicito;
- `duration` textual legado e convertido para `durationMinutes` quando o parse e possivel;
- `status` legado e tratado como sinal para `isActive`, enquanto o `status` do envelope continua vindo de contexto ou default controlado.

## Aderencia ao padrao dos adapters anteriores

O `serviceAdapter` segue o baseline de `customerAdapter` e `vehicleAdapter`:

- modulo puro e sem IO;
- ausencia de acesso a `window`, `localStorage`, DOM, Supabase ou `app/main.js`;
- `id` canonico separado de `sourceId`;
- `organizationId`, timestamps e `status` controlados por contexto;
- envelope com `payload`, `warnings`, `validation` e `metadata`;
- warnings e erros controlados, sem efeitos colaterais na entrada.

## Cenarios automatizados no Adapter Gate

O gate passa a cobrir:

- servico valido com contexto completo;
- servico invalido sem nome;
- servico invalido sem `sourceId`;
- servico invalido sem `organizationId`;
- envelope valido com `validation`, `warnings`, `metadata` e `sourceId` preservado.

## Riscos

- `serviceCode` ainda depende de estrategia provisoria quando o legado nao fornece codigo tecnico;
- `supplyProfileRefs` continua sem resolucao automatica e exige fatia futura dedicada;
- o parse de `duration` continua limitado ao formato observado no legado;
- integrar `serviceAdapter` ao runtime antes de uma fatia propria continua prematuro.

## Limitacoes

- nenhuma lookup real em `serviceSupplyProfiles` foi introduzida;
- nenhum snapshot financeiro foi criado;
- nenhuma persistencia, deduplicacao ou migracao foi iniciada;
- o adapter ainda nao e consumido por nenhuma tela do produto.

## Rollback

1. Remover `app/adapters/serviceAdapter.js`.
2. Reverter os ajustes em `scripts/primyo-adapter-gate.mjs`.
3. Reverter eventual ajuste minimo em `scripts/primyo-gate.mjs`.
4. Reverter este registro e as atualizacoes documentais da fase.
5. Reexecutar `node scripts/primyo-adapter-gate.mjs`.
6. Reexecutar `npm.cmd run primyo:gate`, build e verify.
