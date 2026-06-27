# LavaPrime Web Adapter Extraction Order

## 1. Objetivo

Definir a ordem recomendada para a futura criacao dos adapters do web.

## 2. Criterios de ordenacao

A ordem abaixo considera:

- risco tecnico;
- dependencia entre dominios;
- impacto financeiro;
- facilidade de teste;
- preparo para Supabase;
- preparo para Android offline sync.

## 3. Ordem recomendada

### 1. `customerAdapter`

Motivo:

- resolve primeiro a maior duplicidade de cadastro do legado;
- prepara `Customer` para Web, backend e Android;
- tem risco relevante, mas ainda menor que atendimento e financeiro;
- habilita reconciliacao antes de adapters dependentes.

Estado atual:

- `LP-WEB-007` criou `app/adapters/customerAdapter.js` e encerrou a primeira implementacao controlada;
- o modulo permanece puro e sem integracao ao runtime;
- reconciliacao real entre `clientRegistry` e `billingClients` continua fora do escopo desta fatia.

### 2. `vehicleAdapter`

Motivo:

- depende de cliente;
- prepara ownership atual e historico;
- reduz a ambiguidade entre placa, owner atual e historico.

### 3. `serviceAdapter`

Motivo:

- remove dependencias de nome livre como ponte de integracao;
- prepara o terreno para perfis de insumo por `serviceId`;
- antecede attendance, payment e financial.

### 4. `productAdapter`

Motivo:

- shape relativamente claro;
- naming inconsistente simples de mapear;
- importante para venda de produto, estoque e financeiro, mas com risco menor que atendimento.

### 5. `supplyAdapter`

Motivo:

- depende da decisao sobre metadados tecnicos e compatibilidade;
- tem ligacao forte com `serviceSupplyProfiles`;
- deve vir depois de `serviceAdapter`.

### 6. `attendanceAdapter`

Motivo:

- so e seguro depois que cliente, veiculo e servico ja tiverem adapters estaveis;
- precisa reconciliar estado de patio, IDs indiretos e dados denormalizados.

### 7. `paymentAdapter`

Motivo:

- depende de attendance, payment method e snapshots;
- precisa operar sobre eventos e nao sobre agregados apenas;
- e a primeira fronteira realmente sensivel para Supabase.

### 8. `financialAdapter`

Motivo:

- e o adapter mais dependente de todos os outros;
- agrega invoices, receivables, payments, cash entries e documentos;
- deve ser o ultimo da primeira onda por concentrar maior risco de compatibilidade.

## 4. Ordem de suporte recomendada

Os componentes abaixo devem nascer antes dos adapters de maior risco ou junto com o primeiro adapter aprovado:

1. `contractEnvelopeFactory`
2. `legacyIdResolver`
3. `paymentMethodSnapshotResolver`

## 5. Relacao com Supabase

Relacao direta:

- `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` preparam master data para leitura e escrita controlada;
- `attendanceAdapter` prepara o dominio operacional;
- `paymentAdapter` e `financialAdapter` preparam a cadeia mais sensivel para persistencia remota.

Conclusao:

- Supabase nao deve ser conectado antes de pelo menos a primeira onda de master data estar resolvida em adapters.

## 6. Relacao com Android

Relacao direta:

- Android depende dos mesmos contratos para convergencia offline futura;
- master data bem adaptado reduz divergencia entre Room e backend;
- attendance, payment e financial exigem sync mais disciplinado e, por isso, ficam depois.

## 7. Decisao desta fase

A ordem oficial recomendada passa a ser:

1. `customerAdapter`
2. `vehicleAdapter`
3. `serviceAdapter`
4. `productAdapter`
5. `supplyAdapter`
6. `attendanceAdapter`
7. `paymentAdapter`
8. `financialAdapter`

Confirmacao apos `LP-WEB-007`:

- `customerAdapter` foi criado;
- o proximo adapter recomendado continua sendo `vehicleAdapter`;
- a criacao do proximo adapter deve aguardar a decisao formal da proxima fatia e nao autoriza integracao prematura do adapter atual ao runtime.

Confirmacao apos `LP-DATA-005`:

- a proxima criacao de adapter continua tecnicamente direcionada a `vehicleAdapter`;
- antes dessa criacao, o padrao comum de identidade, envelope, contexto e `legacyRefs` deve ser refletido em uma revisao controlada do `customerAdapter`;
- portanto, `vehicleAdapter` continua sendo o proximo candidato de criacao, mas nao a proxima mudanca recomendada do programa;
- a integracao do `customerAdapter` ao runtime continua explicitamente nao autorizada.

Confirmacao apos `LP-WEB-007-REVISION`:

- `customerAdapter` passa a servir como referencia inicial aderente ao baseline compartilhado de contratos;
- o modulo continua puro, sem integracao ao runtime e sem alteracao de `app/main.js`;
- a proxima criacao de adapter continua sendo `vehicleAdapter`;
- a integracao funcional do `customerAdapter` continua nao autorizada antes de mais maturidade da trilha.
- com o encerramento formal desta revisao, a criacao de `vehicleAdapter` passa a ser considerada tecnicamente segura como proxima fatia controlada.

Confirmacao apos `LP-WEB-008`:

- `vehicleAdapter` passa a existir como segundo adapter puro da trilha de master data;
- o modulo segue o baseline compartilhado validado em `customerAdapter`;
- nenhuma integracao funcional ao runtime foi iniciada nesta fase;
- `vehicleAdapter` passa a ser oficialmente aceito como segunda prova de repetibilidade do baseline estrutural dos adapters puros;
- a proxima criacao de adapter recomendada continua sendo `serviceAdapter`, mas nao necessariamente a proxima fatia do programa;
- antes de criar um terceiro adapter ou integrar qualquer adapter ao runtime, continua preferivel reforcar gate e regressao estruturais da trilha;
- `customerAdapter` e `vehicleAdapter` continuam explicitamente nao autorizados para integracao funcional nesta etapa.

Confirmacao apos `LP-WEB-009`:

- `serviceAdapter` passa a existir como terceiro adapter puro da trilha de master data;
- o modulo segue o baseline compartilhado validado em `customerAdapter` e `vehicleAdapter`;
- o Adapter Contract Gate passa a cobrir cliente, veiculo e servico em Node puro;
- nenhuma integracao funcional ao runtime foi iniciada nesta fase;
- a proxima criacao de adapter recomendada passa a ser `productAdapter`;
- a proxima fatia recomendada do programa passa a ser `LP-WEB-ADAPTER-HELPERS-001`, para consolidar helper comum minimo antes do quarto adapter;
- helpers comuns continuam mais seguros agora do que antes, porque tres adapters puros ja provaram repetibilidade suficiente para extrair apenas o que for claramente estavel;
- `serviceAdapter` continua explicitamente nao autorizado para integracao funcional nesta etapa.

Confirmacao apos `LP-WEB-ADAPTER-HELPERS-001`:

- `LP-WEB-ADAPTER-HELPERS-001` passa a estar formalmente encerrado na trilha;
- `app/adapters/shared/adapterHelpers.js` passa a existir como camada comum minima da trilha de adapters puros;
- a extracao consolidou apenas responsabilidades estruturais repetidas entre `customerAdapter`, `vehicleAdapter` e `serviceAdapter`;
- `customerAdapter`, `vehicleAdapter` e `serviceAdapter` permanecem puros, fora do runtime e com API publica preservada;
- `id` canonico, `sourceId`, `metadata`, `legacyRefs`, `warnings`, `validation` compartilhada de `customer/vehicle` e envelope passam a ter um ponto unico de manutencao estrutural;
- a semantica especifica de validacao de `serviceAdapter` permanece local e nao foi forçada para dentro do helper comum;
- a proxima criacao de adapter recomendada continua sendo `productAdapter`;
- a proxima fatia recomendada do programa passa a ser `LP-WEB-010`, com foco em `productAdapter`;
- a integracao funcional de qualquer adapter ao runtime continua explicitamente nao autorizada nesta etapa.

Confirmacao apos `LP-WEB-010`:

- `productAdapter` passa a existir como quarto adapter puro da trilha de master data;
- o modulo reutiliza `app/adapters/shared/adapterHelpers.js` sem alterar a API publica dos adapters anteriores;
- o Adapter Contract Gate passa a cobrir cliente, veiculo, servico e produto em Node puro;
- nenhuma integracao funcional ao runtime foi iniciada nesta fase;
- a proxima criacao de adapter recomendada passa a ser `supplyAdapter`;
- a proxima fatia do programa ainda nao deve integrar adapters ao runtime nem abrir Supabase sem decisao formal propria;
- a camada compartilhada de helpers agora esta provada em quatro dominios puros diferentes.
- a proxima fatia recomendada do programa passa a ser `LP-WEB-011`, com foco em `supplyAdapter`;
- `LP-WEB-011` deve continuar fora do runtime, sem abrir Supabase e sem misturar produto vendavel, insumo e movimento de estoque no mesmo contrato.
