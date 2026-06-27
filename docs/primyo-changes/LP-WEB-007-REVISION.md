# LP-WEB-007-REVISION

- Change ID: `LP-WEB-007-REVISION`
- Backlog ID: `LP-WEB-007-REVISION`
- Titulo: Customer adapter alignment to shared contract standards
- Data: `2026-06-26`
- Tipo: Implementacao estrutural controlada

## Objetivo

Revisar `app/adapters/customerAdapter.js` para aderir explicitamente aos padroes compartilhados de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade definidos em `LP-DATA-005`.

## Motivo da revisao

`LP-WEB-007` provou a primeira traducao real entre legado e contrato, mas ainda refletia uma fase anterior do envelope e do tratamento de contexto.

Esta revisao existe para:

- transformar `customerAdapter` na primeira referencia aderente ao baseline comum;
- evitar que um segundo adapter replique um envelope antigo;
- manter o adapter puro e fora do runtime;
- preparar a trilha de adapters para Web, Android e Supabase sem integracao prematura.

## Arquivos criados ou alterados

- `app/adapters/customerAdapter.js`
- `docs/primyo-changes/LP-WEB-007-REVISION.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
- `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`

## Alteracoes no adapter

### 1. Identidade canonica

- `id` canonico passou a seguir o padrao `customer:legacy:<sourceId>` quando a estrategia e `namespaceLegacySource`;
- `sourceId` deixou de ser misturado com `id` canonico e passou a ser tratado como rastreabilidade da origem;
- ausencia de `sourceId` agora bloqueia a validacao compartilhada do adapter.

### 2. Contexto compartilhado

- `organizationId` continua vindo apenas de contexto;
- `status` passou a ser resolvido por `context.status`, `context.defaultStatus` ou default controlado de master data;
- `createdAt` e `updatedAt` passaram a depender de `context.createdAt`, `context.updatedAt` ou `context.now`;
- o adapter nao usa mais tempo implicito de runtime para gerar envelope.

### 3. Envelope padronizado

`createCustomerContractEnvelope(...)` passou a gerar envelope compativel com `CONTRACT_ENVELOPE_STANDARD.md`, com:

- `contractName`
- `contractVersion`
- `payload`
- `organizationId`
- `source`
- `sourceId`
- `legacyRefs`
- `createdAt`
- `updatedAt`
- `status`
- `warnings`
- `validation`
- `metadata`

### 4. Validation e warnings padronizados

- `validation` passou a seguir o shape oficial: `ok`, `errors`, `missingRequiredFields`, `blocking`;
- warnings deixaram de ser mensagens soltas espalhadas e passaram a usar codigos padronizados, por exemplo:
  - `CTX_ORGANIZATION_ID_REQUIRED`
  - `CTX_NOW_REQUIRED`
  - `CTX_SOURCE_ID_REQUIRED`
  - `LEGACY_PLATES_PRESERVED`
  - `LEGACY_PARALLEL_CUSTOMER_SOURCE`

### 5. Metadata padronizada

O adapter passou a expor `metadata` estruturada com:

- `adapterName`
- `adapterMode`
- `contractNamespace`
- `idStrategy`
- `strictMode`
- `allowWarnings`
- `emittedAt`, quando fornecido por contexto

### 6. Legacy refs estruturadas

`legacyRefs` passou a seguir melhor o padrao compartilhado com:

- `sourceCollection`
- `sourceId`
- `alternateIds`
- `relatedCollections`
- `legacyPlates`
- `notes`
- campos auxiliares controlados como `personType` e `billingFlag`

## Aderencia aos padroes compartilhados

O adapter revisado agora adere explicitamente a:

- `CONTRACT_IDENTITY_POLICY.md`
- `CONTRACT_ENVELOPE_STANDARD.md`
- `ADAPTER_CONTEXT_STANDARD.md`
- `LEGACY_REFERENCES_POLICY.md`
- `CONTRACT_STATUS_AND_TIMESTAMP_POLICY.md`
- `CONTRACT_COMPATIBILITY_RULES.md`

Pontos principais de aderencia:

- sem leitura de `window`, DOM, `localStorage`, Supabase ou runtime global;
- sem `new Date()` implicito para `emittedAt`;
- sem deduplicacao real entre `clientRegistry` e `billingClients`;
- sem promocao automatica de placas para `vehicleIds`;
- sem integracao a `app/main.js`.

## Cenarios conceituais validados

### 1. Cliente legado valido com contexto completo

Resultado observado:

- `ok: true`
- `id` canonico gerado como `customer:legacy:42`
- `sourceId` preservado como `42`
- `validation.ok: true`
- warnings controlados quando existem placas legadas e fonte paralela de faturamento

### 2. Cliente legado incompleto com warnings permitidos

Resultado observado:

- `ok: true`
- contrato minimo preservado
- warning controlado para placas preservadas apenas em `legacyRefs`
- nenhuma invencao de `vehicleIds`

### 3. Cliente sem documento obrigatorio

Resultado observado:

- `ok: false`
- `validation.errors` inclui `PAYLOAD_REQUIRED_FIELD_MISSING`
- `missingRequiredFields` inclui `document`

### 4. Contexto sem `organizationId`

Resultado observado:

- `ok: false`
- `validation.blocking: true`
- `missingRequiredFields` inclui `organizationId`
- warning controlado `CTX_ORGANIZATION_ID_REQUIRED`

### 5. Contexto sem `now`

Resultado observado:

- `ok: false` quando `createdAt` e `updatedAt` nao sao fornecidos explicitamente
- `missingRequiredFields` inclui `createdAt` e `updatedAt`
- warning controlado `CTX_NOW_REQUIRED`

### 6. `sourceId` ausente

Resultado observado:

- `ok: false`
- `validation.errors` inclui `CTX_SOURCE_ID_REQUIRED`
- `missingRequiredFields` inclui `sourceId`
- o `id` canonico nao e inventado sem rastreabilidade de origem

### 7. `legacyRefs` contendo `clientRegistry`

Resultado observado:

- `legacyRefs.relatedCollections` preserva `clientRegistry` quando aprovado no contexto
- a referencia fica registrada para reconciliacao, sem virar ownership canonico

### 8. `legacyRefs` contendo `billingClients`

Resultado observado:

- `legacyRefs.relatedCollections` preserva `billingClients`
- `billingClients` continua tratado apenas como fonte paralela legada e nao como segunda identidade oficial

### 9. Status padrao aplicado

Resultado observado:

- status padrao `active` pode ser aplicado de forma controlada
- warning `CTX_DEFAULT_STATUS_APPLIED` registra que nao houve status explicito no contexto

### 10. Envelope gerado com `validation` e `warnings`

Resultado observado:

- `ok: true` com contexto completo
- envelope inclui `payload`, `warnings`, `validation` e `metadata`
- `metadata.emittedAt` vem de contexto
- warnings de rastreabilidade do payload podem ser carregados para o envelope

## Limitacoes

- o adapter continua sem consumo em runtime;
- o adapter nao reconcilia `clientRegistry` com `billingClients`;
- o adapter nao resolve ownership de veiculo;
- o adapter nao gera `vehicleIds` a partir de placas;
- o adapter nao cria persistencia nem integra Supabase.

## Riscos

- a trilha de `clientRegistry` x `billingClients` segue aberta para fase futura;
- `vehicleIds` continuam dependendo de resolucao externa;
- o proximo adapter nao deve nascer antes de reutilizar o mesmo baseline comum;
- a integracao prematura ao runtime ainda aumentaria acoplamento sem ganho tecnico proporcional.

## Rollback

1. Reverter `app/adapters/customerAdapter.js` para o estado anterior a `LP-WEB-007-REVISION`.
2. Reverter eventual ajuste minimo em `scripts/primyo-gate.mjs` caso tivesse sido necessario.
3. Reverter a documentacao desta revisao.
4. Reexecutar `node --check app/adapters/customerAdapter.js`.
5. Reexecutar `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`.
