# LavaPrime Web Contract Test Requirements

## 1. Objetivo

Definir os requisitos futuros de teste para qualquer adapter entre legado web e contratos oficiais.

## 2. Regras gerais

Todo adapter futuro devera ser validado contra:

- entrada legada valida;
- entrada legada incompleta;
- campos obrigatorios ausentes;
- conversao de IDs;
- validacao de `id` canonico;
- validacao de `sourceId`;
- preservacao de `legacyRefs`;
- propagacao de `organizationId`;
- coerencia de `status`, `createdAt` e `updatedAt`;
- montagem correta de envelope;
- warnings controlados;
- bloco de `validation` coerente;
- derivacao de campos;
- snapshots obrigatorios;
- compatibilidade de `contractVersion`.

## 3. Casos obrigatorios por categoria

| ID | Categoria | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| ADP-001 | Entrada valida | objeto legado completo e consistente | adapter gera payload contratual valido, com envelope e campos obrigatorios |
| ADP-002 | Entrada incompleta | objeto legado sem opcionais | adapter produz payload minimo sem inventar dado autoritativo |
| ADP-003 | Campo obrigatorio ausente | falta de `id`, `document`, `plate`, `sourceId` ou equivalente critico | adapter falha de forma controlada ou sinaliza bloqueio formal |
| ADP-004 | Conversao de ID | IDs numericos, IDs nulos, referencias indiretas e `billingClientId` | adapter gera ID final coerente ou devolve erro documentado |
| ADP-005 | Campo derivado | `stock -> stockBalance`, `price -> salePrice`, `duration -> durationMinutes` | derivacao e reproduzivel e sem mudar semantica |
| ADP-006 | Snapshot financeiro | pagamento, parcial, invoice ou cash entry | `methodSnapshot`, taxas, conta e valores ficam congelados corretamente |
| ADP-007 | Compatibilidade de versao | `contractVersion` atual e versao anterior ainda suportada | adapter respeita a politica de backward compatibility aprovada |
| ADP-008 | Identidade canonica | entrada legado com `sourceId`, alias e valores mutaveis | `id` canonico nao usa PII, texto livre nem chave visual |
| ADP-009 | Origem e rastreabilidade | origem com `source`, `sourceId` e colecoes paralelas | envelope explicita origem principal e nao mistura ownership com rastreabilidade |
| ADP-010 | `legacyRefs` | IDs antigos, placas, aliases e chaves derivadas | refs sao preservadas sem virar identidade oficial |
| ADP-011 | Contexto organizacional | `organizationId` vindo por contexto | payload e envelope preservam tenancy sem fallback silencioso |
| ADP-012 | Status e timestamps | legado sem historico suficiente | adapter bloqueia ou sinaliza warning controlado sem inventar historico |
| ADP-013 | Envelope contratual | payload pronto para emissao | envelope contem `contractName`, `contractVersion`, `payload`, `warnings`, `validation` e metadata coerente |
| ADP-014 | Resultado controlado | entrada invalida ou incompleta | warnings e `validation` diferenciam erro bloqueante de lacuna tolerada |

## 4. Requisitos especificos por dominio

### 4.1 Customer

Obrigatorio validar:

- reconciliacao `clientRegistry` x `billingClients`;
- PF x PJ;
- `phone -> phonePrimary`;
- `plates -> vehicleIds`;
- ausencia de documento em cliente casual;
- `legacyRefs.billingClientId`.

Observacoes para `LP-WEB-007`:

- nesta primeira fatia, `vehicleIds` nao devem ser inventados a partir de `plates`;
- `organizationId`, `status`, `createdAt` e `updatedAt` devem vir de contexto controlado ou permanecer como lacuna explicitamente invalidada;
- cliente avulso sem documento deve falhar de forma controlada, sem mutar a entrada legada;
- o adapter nao deve reconciliar automaticamente `clientRegistry` com `billingClients`.
- entrada legada valida deve produzir `ok: true`;
- entrada legada incompleta pode permanecer `ok: true` se o contrato minimo for atendido e a lacuna ficar em warning controlado;
- ausencia de `document` deve produzir falha controlada;
- `contractVersion` deve ser gerada no envelope do adapter;
- `organizationId` deve ser preservado quando vier por contexto.

Aprendizados consolidados em `LP-DATA-005`:

- `id` canonico nao deve carregar documento, telefone, placa ou texto livre;
- `sourceId` deve apontar para a origem lida pelo adapter e nao substituir o `id` canonico;
- `legacyRefs` deve preservar `clientRegistry`, `billingClients`, placas antigas, aliases e chaves derivadas sem promover esses campos a ownership oficial;
- `status`, `createdAt` e `updatedAt` devem seguir politica transversal e nao intuicao local do adapter;
- envelope futuro deve expor `payload`, `warnings`, `validation` e `metadata` de forma consistente;
- `organizationId`, `status` e timestamps vindos por contexto precisam permanecer rastreaveis;
- `vehicleIds` continuam dependendo de resolucao externa aprovada;
- nao ha deduplicacao real entre `clientRegistry` e `billingClients` nesta fase.

Aprendizados consolidados em `LP-WEB-007-REVISION`:

- `sourceId` ausente deve bloquear a validacao compartilhada do adapter;
- `id` canonico deve nascer de `sourceId`, nunca de documento, telefone, placa ou texto livre;
- `createCustomerContractEnvelope(...)` deve gerar `payload`, `warnings`, `validation` e `metadata` no shape compartilhado;
- `metadata.emittedAt` deve vir de `context.now` ou `context.emittedAt`, sem uso de tempo implicito de runtime;
- warnings de rastreabilidade do payload podem e devem sobreviver no envelope quando forem relevantes para auditoria;
- `organizationId`, `status`, `createdAt` e `updatedAt` devem continuar rastreaveis como dados de contexto controlado.

Baseline que passa a valer para adapters futuros:

- contexto explicito e obrigatorio para tenancy, status e timestamps;
- `id` canonico separado de `sourceId`;
- `legacyRefs` estruturado e nunca promovido automaticamente a ownership;
- envelope compativel com `payload`, `warnings`, `validation` e `metadata`;
- warnings padronizados e auditaveis;
- `validation` padronizada com bloqueio e campos obrigatorios ausentes;
- ausencia completa de efeitos colaterais, runtime ou IO.

### 4.2 Vehicle

Obrigatorio validar:

- placa unica;
- `year` legado x campos futuros de ano;
- `currentCustomerId`;
- owner history como ref e nao como ownership primario;
- `fipeRef` opcional;
- ausencia de cuidado especial sem quebrar o contrato.

Observacoes para `LP-WEB-008`:

- `currentClientId` legado pode virar `currentCustomerId` transitorio somente quando o ID legado estiver explicitamente presente;
- `currentCustomerId` nao deve ser inferido por placa, nome do owner ou texto livre;
- `year` unico do legado nao deve ser promovido automaticamente para `manufactureYear` e `modelYear`;
- placas antigas devem ficar em `legacyRefs.legacyPlates`;
- `specialCareRefs` so pode nascer de refs explicitas ou de IDs legados disponiveis em `specialCareRecords`;
- `ownerHistory` sem IDs estaveis deve permanecer como rastreabilidade, nao como `ownerHistoryRefs`;
- `fipeRef` so deve ser carregado se vier explicitamente no legado ou no contexto, sem consulta externa;
- `organizationId`, `status`, `createdAt` e `updatedAt` devem continuar vindo de contexto controlado.

Aprendizados consolidados no encerramento de `LP-WEB-008`:

- `currentCustomerId` derivado de `currentClientId` deve ser tratado como referencia transitoria e nunca como ownership definitivo;
- `legacyRefs.legacyPlates` precisa preservar placas antigas sem promover nenhuma delas a identidade canonica;
- `year` legado unico continua sendo lacuna conhecida enquanto nao houver criterio aprovado para separar `manufactureYear` e `modelYear`;
- `specialCareRefs` depende de refs explicitas ou IDs legados observaveis e nao deve ser inferido;
- `ownerHistory` sem IDs estaveis continua sendo apenas rastreabilidade documental;
- `sourceId`, `organizationId`, `status`, timestamps, `warnings`, `validation` e envelope completo permanecem obrigatorios para qualquer adapter futuro do dominio de veiculos.

### 4.3 Service

Obrigatorio validar:

- geracao de `serviceCode`;
- parse de `duration` para `durationMinutes`;
- `status -> isActive`;
- preservacao de `maintenanceRequired`;
- compatibilidade com `serviceSupplyProfiles`.

Observacoes para `LP-WEB-009`:

- o seed legado observado em `serviceCatalog` nao expone `id` estavel por item, entao `sourceId` por contexto continua obrigatorio;
- `serviceCode` pode ser derivado de forma controlada a partir de `sourceId`, mas isso deve permanecer sinalizado por warning ate existir codigo tecnico oficial no legado;
- `duration` textual legado deve virar `durationMinutes` quando o parse for possivel, sem inventar valor quando o formato nao puder ser lido;
- `duration` textual invalida deve produzir warning controlado, nao fallback silencioso;
- `status` legado deve influenciar `isActive`, enquanto o `status` do envelope continua vindo de contexto ou default controlado;
- `defaultVehicleCareType` pode nascer de `autoCreateVehicleCareType`;
- `supplyProfileRefs` nao deve ser resolvido automaticamente nesta fase a partir de `serviceSupplyProfiles`;
- relacionamentos reais com insumos ainda nao devem ser integrados nesta fase;
- ausencia de `name` ou de campos obrigatorios do contrato deve falhar de forma controlada;
- `organizationId`, `createdAt` e `updatedAt` continuam vindo de contexto controlado.

### 4.4 Product

Obrigatorio validar:

- rename de `cost`, `price` e `stock`;
- SKU obrigatorio;
- `createdAt` e `updatedAt`;
- comportamento com saldo zero;
- preservacao de `isActive`.

Observacoes para `LP-WEB-010`:

- `sourceId` por contexto ou legado continua obrigatorio para separar identidade canonica de rastreabilidade;
- `id` canonico deve seguir `product:legacy:<sourceId>` e nunca usar `sku`, nome, barcode ou texto livre como identidade oficial;
- `price -> salePrice`, `cost -> costPrice` e `stock -> stockBalance` devem ocorrer de forma explicita e reproduzivel;
- `isActive` deve refletir o estado legado sem inventar nova regra de negocio;
- `supplier` legado nao deve virar campo canonico de `Product` nesta fase e deve ficar restrito a `legacyRefs` quando presente;
- `type` legado nao deve ser promovido automaticamente a `category`;
- `stockBalance = 0` continua sendo valor valido e nao deve falhar por ausencia de estoque;
- ausencia de `name`, `sku`, `sourceId` ou `organizationId` deve falhar de forma controlada;
- o envelope deve continuar carregando `payload`, `warnings`, `validation`, `metadata`, `organizationId`, `sourceId` e timestamps.

Aprendizados consolidados no encerramento de `LP-WEB-010`:

- `sourceId` por contexto continua obrigatorio quando o legado nao oferece identidade contratual estavel suficiente;
- `supplier` nao pertence ao contrato `Product` de primeiro nivel e deve permanecer em `legacyRefs` quando surgir no legado;
- `type` legado deve permanecer em `legacyRefs` sempre que nao houver campo canonico aprovado;
- `stockBalance` continua sendo projecao observada, nao trilha auditavel de estoque;
- `category` e `barcode` podem estar ausentes no seed legado sem impedir o contrato minimo;
- `productAdapter` nao deve alterar preco, margem ou estoque real;
- sem `name` ou `sourceId` o contrato deve falhar de forma controlada.

### 4.5 Supply

Obrigatorio validar:

- rename de `supplier -> supplierName`;
- suporte a `riskTags`;
- ausencia ou perda de `compatibilityMetadata`;
- comportamento com catalogo sem metadados tecnicos completos.

Observacoes para `LP-WEB-011`:

- `sourceId` por contexto ou legado continua obrigatorio para separar identidade canonica de rastreabilidade;
- `id` canonico deve seguir `supply:legacy:<sourceId>` e nunca usar `sku`, fornecedor, nome ou texto livre como identidade oficial;
- `cost -> costPrice`, `stock -> stockBalance` e `supplier -> supplierName` devem ocorrer de forma explicita e reproduzivel;
- `supplierName` pertence ao contrato `Supply`, diferentemente do dominio `Product`, onde fornecedor continua apenas em `legacyRefs`;
- `compatibilityMetadata` pode nascer do shape tecnico legado atual, mas nao deve consultar fontes externas nem inventar semantica nova;
- `riskTags` devem permanecer como lista contratual controlada quando existirem no legado;
- `serviceSupplyProfiles` ou relacoes futuras com servicos devem permanecer apenas em `legacyRefs` nesta fase;
- `category`, `type` e descricao excedente devem permanecer em `legacyRefs` quando nao houver campo canonico aprovado;
- `stockBalance` continua sendo projecao observada, nao trilha auditavel de movimento;
- ausencia de `name`, `sourceId` ou `organizationId` deve falhar de forma controlada;
- o envelope deve continuar carregando `payload`, `warnings`, `validation`, `metadata`, `organizationId`, `sourceId` e timestamps.

### 4.6 Attendance

Obrigatorio validar:

- resolucao de `clientId` e `vehicleId` a partir de estado denormalizado;
- montagem de `entryAt`;
- mapeamento de `status`;
- formacao de `serviceEntries` e `productEntries` quando disponiveis;
- tratamento de atendimento sem operador resolvido.

### 4.7 Payment

Obrigatorio validar:

- resolucao de `methodId` a partir do nome legado;
- parcial com `paidAmount` e `remainingAmount`;
- confirmacao x pendencia;
- `grossAmount`, `feeAmount` e `netAmount`;
- `financialAccountSnapshot`;
- origem via attendance, invoice ou receivable.

### 4.8 Financial

Obrigatorio validar:

- diferenca entre `Financial` agregado e entidades primarias;
- montagem de `financialKind`;
- coerencia entre `grossAmount`, `confirmedAmount` e `openAmount`;
- referencias a invoice, receivable, payment e cash entry;
- `totalsBreakdown` derivado sem usar `invoiceAmounts` como verdade absoluta.

## 5. Requisitos de erro e bloqueio

Todo adapter futuro deve documentar:

- o que faz quando falta `organizationId`;
- o que faz quando falta `sourceId`;
- o que faz quando falta ID de origem;
- o que faz quando a relacao entre entidades esta ambigua;
- quando devolve erro bloqueante;
- quando devolve payload parcial com `legacyRefs`.

## 6. Requisitos de regressao

Antes de aprovar a primeira implementacao real de adapter:

- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

E, quando o adapter passar a ser consumido por runtime:

- pacote minimo `LA`, `LO`, `LG`, `PA`, `AD`, `NV`;
- `CD` para adapters de cadastro;
- `FN` e `RL` para adapters de pagamento e financeiro.

## 6.1 Cobertura automatizada minima adotada em `LP-TEST-AUTO-003`

Enquanto `customerAdapter`, `vehicleAdapter` e `serviceAdapter` continuarem fora do runtime, o gate automatizado minimo da trilha deve continuar validando:

- importacao dos adapters em Node puro;
- exports minimos esperados;
- cenario valido de `customerAdapter`;
- cenario invalido de `customerAdapter`;
- cenario valido de `vehicleAdapter`;
- cenario invalido de `vehicleAdapter`;
- geracao de envelope para cliente e veiculo;
- `validation.ok = true` nos cenarios validos;
- `validation.ok = false` nos cenarios invalidos;
- `missingRequiredFields` preenchido quando aplicavel;
- `organizationId` vindo de contexto;
- `createdAt`, `updatedAt` e `metadata.emittedAt` vindos de contexto;
- separacao entre `id` canonico e `sourceId`;
- preservacao de `sourceId`;
- `warnings` como arrays;
- ausencia de dependencia de runtime do LavaPrime.

Cobertura expandida em `LP-WEB-009`:

- importacao de `serviceAdapter` em Node puro;
- exports minimos de `serviceAdapter`;
- cenario valido de `serviceAdapter`;
- cenario invalido de `serviceAdapter` sem nome;
- cenario invalido de `serviceAdapter` sem `sourceId`;
- cenario invalido de `serviceAdapter` sem `organizationId`;
- geracao de envelope para servico com `validation`, `warnings`, `metadata` e `sourceId` preservado.

Estado oficial apos a closure de `LP-WEB-009`:

- o Adapter Contract Gate cobre os tres adapters puros oficiais do web;
- qualquer novo adapter devera repetir a mesma dupla minima de fixture valida e invalida;
- qualquer helper comum futuro devera revalidar `customerAdapter`, `vehicleAdapter` e `serviceAdapter` em conjunto antes de liberar o quarto adapter.

Cobertura consolidada em `LP-WEB-ADAPTER-HELPERS-001`:

- `app/adapters/shared/adapterHelpers.js` passa a ser modulo critico da trilha e deve permanecer puro;
- mudancas no helper comum devem revalidar `customerAdapter`, `vehicleAdapter` e `serviceAdapter` em conjunto;
- mudancas no helper comum devem revalidar `scripts/primyo-adapter-gate.mjs`, `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`;
- o helper comum deve preservar `id` canonico, `sourceId`, `legacyRefs`, `metadata`, `warnings`, `validation` e envelope sem introduzir comportamento de runtime;
- `node --check app/adapters/shared/adapterHelpers.js` passa a ser validacao minima obrigatoria da trilha de helpers de adapter;
- helpers comuns nao devem resolver ownership, deduplicacao ou relacionamento real entre dominios;
- quando a regra nao for universal, ela deve permanecer local ao adapter de dominio, como no caso da validacao especifica de `serviceAdapter`;
- qualquer helper novo deve provar que reduz repeticao estrutural real e nao apenas desloca complexidade para outro arquivo.

Cobertura expandida em `LP-WEB-010`:

- importacao de `productAdapter` em Node puro;
- exports minimos de `productAdapter`;
- cenario valido de `productAdapter`;
- cenario invalido de `productAdapter` sem nome;
- cenario invalido de `productAdapter` sem `sourceId`;
- cenario invalido de `productAdapter` sem `organizationId`;
- geracao de envelope para produto com `validation`, `warnings`, `metadata` e `sourceId` preservado.

Cobertura expandida em `LP-WEB-011`:

- importacao de `supplyAdapter` em Node puro;
- exports minimos de `supplyAdapter`;
- cenario valido de `supplyAdapter`;
- cenario invalido de `supplyAdapter` sem nome;
- cenario invalido de `supplyAdapter` sem `sourceId`;
- cenario invalido de `supplyAdapter` sem `organizationId`;
- geracao de envelope para insumo com `validation`, `warnings`, `metadata` e `sourceId` preservado.

Regra oficial para proximos adapters:

- todo novo adapter puro deve entrar no Adapter Contract Gate no mesmo slice em que for criado;
- cada adapter novo deve adicionar ao menos uma fixture valida e uma fixture invalida controladas;
- a fixture invalida deve demonstrar bloqueio formal por campo obrigatorio, contexto ou identidade ausente;
- o gate deve continuar provando `organizationId`, timestamps, envelope, `warnings`, `validation` e separacao entre `id` e `sourceId` para cada adapter promovido ao baseline.
- com `LP-WEB-010`, o baseline automatizado minimo passa a cobrir `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `productAdapter`;
- qualquer mudanca em `adapterHelpers.js` ou no Adapter Gate deve revalidar os quatro adapters em conjunto antes da liberacao de um quinto dominio.
- com `LP-WEB-011`, o baseline automatizado minimo passa a cobrir `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter`;
- qualquer mudanca em `adapterHelpers.js` ou no Adapter Gate deve revalidar os cinco adapters em conjunto antes da liberacao de um sexto dominio.

## 7. Decisao desta fase

Nenhum adapter futuro deve ser aprovado apenas porque converte shape.

Ele precisara provar:

- consistencia de ownership;
- estabilidade de IDs;
- controle de snapshots;
- compatibilidade de versao;
- seguranca de rollback.
