# Clean Bootstrap Dependency Review

## Objetivo

Mapear quais partes do LavaPrime Web ainda dependem da massa `demo/teste` e registrar um fallback protegido antes de qualquer tentativa futura com `CLEAN_BOOTSTRAP`.

## Estado atual do bootstrap

- modo padrao atual: `DEMO_BOOTSTRAP`
- modo limpo disponivel: `CLEAN_BOOTSTRAP`
- status do modo limpo: estrutural, protegido e inativo por padrao
- origem demo atual: `app/demo/lavaprimeDemoData.js`
- origem limpa atual: `app/demo/lavaprimeCleanBootstrap.js`
- Supabase: fechado

## Diagnostico protegido

Diagnostico tecnico silencioso exposto apenas em memoria:

- `window.__lavaprimeCleanBootstrapReadiness`

Garantias:

- somente leitura
- sem troca de modo
- sem alteracao visual
- sem persistencia
- sem telemetria externa
- sem dependencia de Supabase

## Dependencias mapeadas

### Dashboard

- depende da seed demo
- colecoes ligadas:
  - `patioVehicles`
  - `openPayments`
  - `billingInvoices`
  - `invoiceLineItems`
  - `vehicleRegistry`
- motivo:
  - cards, alertas e totais operacionais ainda partem dessas estruturas preenchidas

### Clientes

- depende da seed demo
- colecoes ligadas:
  - `clientRegistry`
  - `billingClients`
  - `vehicleRegistry`
- motivo:
  - listagem, relacao com faturamento e vinculo de placas ainda partem da massa demo

### Veiculos

- depende da seed demo
- colecoes ligadas:
  - `vehicleRegistry`
  - `clientRegistry`
  - `patioVehicles`
- motivo:
  - ownership atual, historico e relacao com patio continuam baseados na seed

### Patio

- depende da seed demo
- colecoes ligadas:
  - `patioVehicles`
  - `vehicleRegistry`
  - `clientRegistry`
  - `openPayments`
- motivo:
  - o fluxo operacional continua cruzando placa, cliente, telefone e pagamento da massa demo

### Financeiro

- depende da seed demo
- colecoes ligadas:
  - `openPayments`
  - `billingClients`
  - `billingInvoices`
  - `invoiceLineItems`
  - `clientRegistry`
- motivo:
  - cobranca, faturas e saldos seguem sustentados por seeds demo

### Faturas

- depende da seed demo
- colecoes ligadas:
  - `billingInvoices`
  - `billingClients`
  - `invoiceLineItems`
  - `clientRegistry`

### Pagamentos

- depende da seed demo
- colecoes ligadas:
  - `openPayments`
  - `clientRegistry`
  - `vehicleRegistry`
  - `patioVehicles`

### Relatorios

- depende da seed demo
- colecoes ligadas:
  - `billingInvoices`
  - `invoiceLineItems`
  - `openPayments`
  - `vehicleRegistry`
  - `clientRegistry`

### Documentos e recibos

- depende da seed demo
- colecoes ligadas:
  - `billingInvoices`
  - `invoiceLineItems`
  - `billingClients`
  - `clientRegistry`

### Vinculos entre cliente, veiculo e faturamento

- dependem da seed demo
- pontos ativos:
  - `clientRegistry.billingClientId`
  - `clientRegistry.plates`
  - `vehicleRegistry.currentClientId`
  - `patioVehicles.plate`
  - `openPayments.clientId`
  - `billingInvoices.clientId`

## Leitura do readiness atual

Conclusao tecnica atual:

- `CLEAN_BOOTSTRAP` ainda nao pode virar modo padrao
- o fallback protegido continua obrigatorio
- a massa demo nao pode ser removida nesta etapa
- qualquer teste futuro com bootstrap limpo deve continuar controlado e fora do padrao

## Fallback protegido

O fallback protegido fica definido assim:

1. `DEMO_BOOTSTRAP` continua como default
2. `CLEAN_BOOTSTRAP` continua apenas como referencia estrutural e diagnostica
3. o readiness apenas mede dependencia residual
4. nenhuma tela passa a depender do bootstrap limpo nesta fase

## Riscos principais

- trocar o bootstrap padrao agora quebraria dashboard, clientes, patio, financeiro e relatorios
- a massa demo continua refletida em vinculos cruzados de cliente, veiculo, patio e faturamento
- qualquer remocao sem hardening previo ainda tem risco de quebra visual e operacional

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-004 - Critical surface fallback hardening before clean bootstrap trial`

Objetivo sugerido:

- endurecer estados vazios e fallback seguro em dashboard, clientes, patio, financeiro e relatorios
- continuar com `DEMO_BOOTSTRAP` como padrao
- manter `CLEAN_BOOTSTRAP` protegido
- nao remover massa demo ainda
