# LP-WEB-008

- Change ID: `LP-WEB-008`
- Backlog ID: `LP-WEB-008`
- Titulo: Vehicle adapter foundation
- Data: `2026-06-26`
- Tipo: Implementacao estrutural controlada

## Objetivo

Criar o segundo adapter puro do LavaPrime Web para converter veiculo legado em payload compativel com `VEHICLE_CONTRACT.md`, sem integrar o adapter ao runtime atual.

## Arquivos criados ou alterados

- `app/adapters/vehicleAdapter.js`
- `scripts/primyo-gate.mjs`
- `docs/primyo-changes/LP-WEB-008.md`
- `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`

## API do adapter

Modulo criado:

- `toVehicleContract(legacyVehicle, context)`
- `validateVehicleContract(vehicleContract)`
- `createVehicleContractEnvelope(vehicleContract, context)`

Constantes expostas:

- `VEHICLE_CONTRACT_NAME`
- `VEHICLE_CONTRACT_VERSION`

Comportamento esperado:

- `toVehicleContract(...)` converte o shape legado para o shape do contrato e retorna resultado controlado com `ok`, `vehicleContract`, `errors`, `warnings` e `missingRequiredFields`;
- `validateVehicleContract(...)` valida obrigatorios, formato e consistencia minima do contrato;
- `createVehicleContractEnvelope(...)` aplica `contractName`, `contractVersion`, `payload`, `warnings`, `validation` e `metadata`, preservando a validacao controlada.

## Campos mapeados

Mapeamento implementado:

- `id` legado ou `context.sourceId` -> `sourceId`
- `sourceId` -> `id` canonico opaco com namespace `vehicle:legacy:<sourceId>`
- `currentClientId` -> `currentCustomerId` transitorio no formato `customer:legacy:<currentClientId>`
- `plate` -> `plate` normalizada
- `brand` -> `brand`
- `model` -> `model`
- `type` ou `vehicleType` -> `vehicleType`
- `category` -> `category`
- `color` -> `color`
- `fuel` -> `fuel`
- `notes` -> `notes`
- `specialCareRecords[].id` -> `specialCareRefs` com namespace `vehicle-special-care:legacy:<id>`
- `currentClientId` -> `legacyRefs.relatedIds.currentCustomerLegacyId`
- `oldPlates`, `previousPlates` ou `legacyPlates` -> `legacyRefs.legacyPlates`
- `year` legado unico -> preservado em `legacyRefs.notes`, sem promover automaticamente a `manufactureYear` ou `modelYear`

Campos dependentes de contexto:

- `organizationId`
- `status`
- `createdAt`
- `updatedAt`
- `contractVersion` no envelope
- `manufactureYear` e `modelYear`, quando vierem explicitamente de contexto ou do legado com granularidade suficiente
- `ownerHistoryRefs`, quando houver refs estaveis explicitos
- `fipeRef`, quando vier explicitamente no legado ou no contexto

## Campos ausentes ou problematicos

Lacunas tratadas explicitamente:

- o legado nao fornece `organizationId`;
- o legado nao fornece `status` canonico;
- o legado nao fornece `createdAt` e `updatedAt` historicos;
- o legado usa `year` unico, mas o contrato espera `manufactureYear` e `modelYear`;
- `ownerHistory` legado nao possui refs estaveis para `ownerHistoryRefs`;
- `currentClientId` e legado e nao ownership contratual definitivo;
- o adapter nao consulta FIPE nem resolve `fipeRef` automaticamente;
- o adapter nao reconcilia relationship real de cliente e veiculo no runtime.

## Aderencia ao padrao do customerAdapter

O `vehicleAdapter` segue o mesmo baseline estrutural do `customerAdapter` revisado:

- adapter puro, sem IO e sem integracao ao runtime;
- contexto explicito para tenancy, status e timestamps;
- `id` canonico separado de `sourceId`;
- `legacyRefs` estruturado para rastreabilidade;
- envelope compativel com `payload`, `warnings`, `validation` e `metadata`;
- `validation` padronizada com `ok`, `errors`, `missingRequiredFields` e `blocking`;
- `metadata.emittedAt` vindo apenas de `context.now` ou `context.emittedAt`.

## Validacao conceitual

### 1. Veiculo legado valido com contexto completo

Resultado observado:

- `ok: true`
- `id` canonico gerado como `vehicle:legacy:4`
- `currentCustomerId` transitorio gerado como `customer:legacy:1`
- `specialCareRefs` derivado de IDs legados disponiveis
- `legacyRefs.legacyPlates` preserva placas antigas

### 2. Veiculo legado incompleto com warnings permitidos

Resultado observado:

- `ok: true`
- campos opcionais ausentes nao bloqueiam o contrato
- warning controlado para `currentCustomerId` derivado de legado quando aplicavel

### 3. Veiculo sem placa

Resultado observado:

- `ok: false`
- `missingRequiredFields` inclui `plate`

### 4. Veiculo sem ID legado estavel

Resultado observado:

- `ok: false`
- `missingRequiredFields` inclui `id` e `sourceId`
- o adapter nao usa placa como identidade oficial

### 5. Contexto sem `organizationId`

Resultado observado:

- `ok: false`
- `missingRequiredFields` inclui `organizationId`
- warning `CTX_ORGANIZATION_ID_REQUIRED`

### 6. Contexto sem `now`

Resultado observado:

- `ok: false` quando `createdAt` e `updatedAt` nao sao fornecidos
- `missingRequiredFields` inclui `createdAt` e `updatedAt`
- warning `CTX_NOW_REQUIRED`

### 7. `sourceId` ausente

Resultado observado:

- `ok: false`
- `missingRequiredFields` inclui `sourceId`
- warning `CTX_SOURCE_ID_REQUIRED`

### 8. `legacyRefs` contendo placa antiga

Resultado observado:

- placas antigas ficam em `legacyRefs.legacyPlates`
- nenhuma placa antiga vira `id` oficial

### 9. `legacyRefs` contendo referencia de cliente legado

Resultado observado:

- `legacyRefs.relatedIds.currentCustomerLegacyId` preserva a origem do relacionamento legado
- a referencia continua apenas como rastreabilidade

### 10. Status padrao aplicado

Resultado observado:

- status padrao `active` pode ser aplicado de forma controlada
- warning `CTX_DEFAULT_STATUS_APPLIED` registra a ausencia de status explicito

### 11. Envelope gerado com `validation` e `warnings`

Resultado observado:

- envelope inclui `payload`, `warnings`, `validation` e `metadata`
- `metadata.emittedAt` vem de contexto
- warnings de rastreabilidade sobrevivem no envelope para auditoria

## Riscos

- risco de interpretar `currentCustomerId` transitorio como relacionamento definitivo antes da fase de integracao controlada;
- risco de `year` unico continuar sem separacao oficial entre `manufactureYear` e `modelYear`;
- risco de `ownerHistory` seguir embutido no legado sem contrato dedicado de ownership;
- risco de fases futuras tentarem usar placa como identidade ou resolver cliente por texto livre;
- risco de integracao prematura ao runtime antes de existir closure formal e baseline atualizada.

## Limitacoes

- o adapter nao acessa `app/main.js`;
- o adapter nao acessa DOM, `window`, `localStorage` ou Supabase;
- o adapter nao consulta FIPE;
- o adapter nao deduplica veiculos;
- o adapter nao resolve ownership real de cliente;
- o adapter nao e consumido por nenhuma tela nesta fase;
- o adapter nao altera o runtime atual.

## Gate

Ajuste minimo aplicado no `primyo:gate`:

- reconhecimento de `app/adapters/vehicleAdapter.js` como modulo obrigatorio desta fase;
- `node --check app/adapters/vehicleAdapter.js`;
- validacao de exports minimos do adapter.

## Rollback

1. Remover `app/adapters/vehicleAdapter.js`.
2. Reverter o ajuste minimo em `scripts/primyo-gate.mjs`.
3. Reverter a documentacao de `LP-WEB-008`.
4. Reexecutar `node --check app/adapters/customerAdapter.js`.
5. Reexecutar `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`.
