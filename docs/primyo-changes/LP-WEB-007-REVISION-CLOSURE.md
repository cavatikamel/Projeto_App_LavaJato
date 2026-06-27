# LP-WEB-007-REVISION Closure

- Change ID: `LP-WEB-007-REVISION-CLOSURE`
- Backlog ID: `LP-WEB-007-REVISION`
- Titulo: Encerramento formal da revisao do customerAdapter
- Tipo: Implementacao estrutural controlada
- Data: `2026-06-26`
- Decisao final: `Aceito`
- Aceite tecnico: `Aprovado como modelo oficial de referencia para adapters futuros`

## 1. Resumo da revisao

`LP-WEB-007-REVISION` encerra o alinhamento do `customerAdapter` aos padroes compartilhados de contratos definidos em `LP-DATA-005`.

O resultado formal desta fase foi:

- revisao de `app/adapters/customerAdapter.js` sem qualquer integracao ao runtime;
- preservacao da API publica existente;
- aderencia explicita aos padroes de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
- consolidacao do adapter como primeira implementacao aderente ao baseline compartilhado;
- confirmacao de que `app/main.js` permaneceu intacto.

## 2. Motivo da revisao

`LP-WEB-007` criou o primeiro adapter puro do web, mas a fatia seguinte revelou a necessidade de um baseline transversal para todos os contratos.

Esta revisao existiu para:

- evitar propagacao de um envelope antigo para os proximos adapters;
- separar definitivamente `id` canonico de `sourceId`;
- formalizar `legacyRefs` como rastreabilidade e nao como ownership;
- controlar `organizationId`, status e timestamps por contexto;
- transformar o `customerAdapter` no modulo de referencia da trilha.

## 3. Alteracoes feitas no customerAdapter

### 3.1 Identidade e rastreabilidade

- `id` canonico passou a seguir o padrao `customer:legacy:<sourceId>` quando a estrategia padrao e usada;
- `sourceId` deixou de concorrer com o `id` canonico e passou a existir apenas como trilha de origem;
- ausencia de `sourceId` passou a bloquear a validacao compartilhada.

### 3.2 Contexto compartilhado

- `organizationId` continua vindo apenas do contexto;
- `status` passou a respeitar `context.status`, `context.defaultStatus` ou default controlado;
- `createdAt` e `updatedAt` passaram a depender de `context.createdAt`, `context.updatedAt` ou `context.now`;
- `metadata.emittedAt` passou a depender de `context.emittedAt` ou `context.now`, sem tempo implicito de runtime.

### 3.3 Envelope e validacao

`createCustomerContractEnvelope(...)` passou a produzir envelope com:

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

### 3.4 Warnings e metadata

- warnings passaram a usar codigos padronizados e rastreaveis;
- `validation` foi normalizada para `ok`, `errors`, `missingRequiredFields` e `blocking`;
- `metadata` passou a expor `adapterName`, `adapterMode`, `contractNamespace`, `idStrategy`, `strictMode`, `allowWarnings` e `emittedAt`.

## 4. Aderencia aos padroes compartilhados

O `customerAdapter` revisado agora adere explicitamente a:

- `CONTRACT_IDENTITY_POLICY.md`
- `CONTRACT_ENVELOPE_STANDARD.md`
- `ADAPTER_CONTEXT_STANDARD.md`
- `LEGACY_REFERENCES_POLICY.md`
- `CONTRACT_STATUS_AND_TIMESTAMP_POLICY.md`
- `CONTRACT_COMPATIBILITY_RULES.md`

Pontos principais de aderencia:

- `id` canonico opaco e nao baseado em PII;
- `sourceId` separado do ownership contratual;
- `legacyRefs` estruturado para preservar `clientRegistry`, `billingClients`, placas e aliases antigos;
- `organizationId`, status e timestamps vindos por contexto;
- envelope compativel com o baseline transversal;
- ausencia de IO, runtime ou efeito colateral.

## 5. Cenarios conceituais validados

### 5.1 Cliente legado valido com contexto completo

Resultado observado:

- `ok: true`
- `id` canonico gerado a partir de `sourceId`
- `organizationId` preservado
- envelope completo com `validation`, `warnings` e `metadata`

### 5.2 Cliente legado incompleto com warnings permitidos

Resultado observado:

- `ok: true`
- contrato minimo preservado
- warnings controlados para lacunas nao bloqueantes
- nenhuma invencao de `vehicleIds`

### 5.3 Cliente sem documento obrigatorio

Resultado observado:

- `ok: false`
- `validation.errors` inclui `PAYLOAD_REQUIRED_FIELD_MISSING`
- `missingRequiredFields` inclui `document`

### 5.4 Contexto sem `organizationId`

Resultado observado:

- `ok: false`
- `validation.blocking: true`
- `missingRequiredFields` inclui `organizationId`
- warning `CTX_ORGANIZATION_ID_REQUIRED`

### 5.5 Contexto sem `now`

Resultado observado:

- `ok: false` quando `createdAt` e `updatedAt` nao sao fornecidos
- `missingRequiredFields` inclui `createdAt` e `updatedAt`
- warning `CTX_NOW_REQUIRED`

### 5.6 `sourceId` ausente

Resultado observado:

- `ok: false`
- `validation.errors` inclui `CTX_SOURCE_ID_REQUIRED`
- `missingRequiredFields` inclui `sourceId`

### 5.7 `legacyRefs` contendo `clientRegistry`

Resultado observado:

- `legacyRefs.relatedCollections` preserva `clientRegistry`
- a referencia continua apenas como trilha de reconciliacao

### 5.8 `legacyRefs` contendo `billingClients`

Resultado observado:

- `legacyRefs.relatedCollections` preserva `billingClients`
- a colecao paralela nao vira segunda identidade oficial

### 5.9 Status padrao aplicado

Resultado observado:

- status padrao `active` pode ser aplicado de forma controlada;
- warning `CTX_DEFAULT_STATUS_APPLIED` registra a ausencia de status explicito.

### 5.10 Envelope com `validation` e `warnings`

Resultado observado:

- envelope inclui `payload`, `warnings`, `validation` e `metadata`;
- `metadata.emittedAt` vem de contexto;
- warnings de rastreabilidade podem sobreviver no envelope para auditoria.

## 6. Validacoes executadas

- `node --check app/adapters/customerAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Observacao operacional:

- um `npm.cmd run build` isolado encontrou lock transitorio em `dist` durante a revalidacao desta fase;
- a reexecucao concluiu com sucesso;
- o resultado final considerado para aceite ficou limpo.

## 7. Riscos remanescentes

- `clientRegistry` e `billingClients` continuam sem deduplicacao real;
- `vehicleIds` continuam dependendo de resolucao externa;
- ownership de veiculos ainda nao foi tratado;
- integracao ao runtime continua prematura enquanto existir apenas um adapter puro nao consumido;
- a trilha ainda precisa provar o mesmo baseline em um segundo adapter.

## 8. Rollback

1. Reverter `app/adapters/customerAdapter.js` ao estado anterior a `LP-WEB-007-REVISION`.
2. Reverter eventual ajuste minimo em `scripts/primyo-gate.mjs`, se aplicavel.
3. Reverter `docs/primyo-changes/LP-WEB-007-REVISION.md` e este closure.
4. Reexecutar `node --check app/adapters/customerAdapter.js`.
5. Reexecutar `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`.

## 9. Decisao final

`LP-WEB-007-REVISION` foi aceito e incorporado a baseline oficial.

Aceite concedido porque:

- o `customerAdapter` continua puro;
- a API publica permaneceu estavel;
- o envelope segue o baseline compartilhado;
- contexto, identidade, `legacyRefs`, status e timestamps passaram a ter tratamento oficial;
- `app/main.js` permaneceu intacto;
- nenhuma tela passou a consumir o adapter;
- gate, build e verify permaneceram verdes.

Conclusao operacional:

- `customerAdapter` passa a ser o modelo oficial de referencia para adapters futuros;
- a proxima fatia recomendada passa a ser `LP-WEB-008`;
- a integracao do `customerAdapter` ao runtime continua explicitamente nao autorizada nesta etapa.
