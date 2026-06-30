# Demo Data Cleanup Plan

## Objetivo

Mapear, isolar e preparar a remocao segura da massa `demo/teste` do LavaPrime Web antes de qualquer migracao real para Supabase.

## Escopo desta fase

- isolamento tecnico dos seeds centrais em modulo dedicado;
- classificacao explicita do que continua sendo `demo/teste`;
- mapeamento de vinculos entre clientes, veiculos, patio, faturamento, pagamentos, dashboard e relatorios;
- nenhuma remocao direta de seed com risco de quebra.

## Modulo isolado nesta fase

- `app/demo/lavaprimeDemoData.js`

Colecoes movidas de `app/main.js`:

- `billingClients`
- `billingInvoices`
- `invoiceAmounts`
- `invoiceLineItems`
- `clientRegistry`
- `vehicleRegistry`
- `patioVehicles`
- `openPayments`

Efeito desta extracao:

- `app/main.js` deixa de carregar inline a massa demo principal;
- a UI continua renderizando do mesmo jeito;
- o legado continua fonte ativa;
- a remocao futura fica mais rastreavel.

## Massa demo/teste mapeada

### Clientes

- `clientRegistry`
- `5` registros
- status: `demo/teste`
- nao devem ser tratados como clientes reais

### Faturamento

- `billingClients`
- `billingInvoices`
- `invoiceLineItems`
- status: `demo/teste`

### Veiculos

- `vehicleRegistry`
- `5` registros
- status: `demo/teste`

### Atendimento / Patio

- `patioVehicles`
- `5` registros
- status: `demo/teste`

### Pagamentos

- `openPayments`
- `1` registro aberto
- status: `demo/teste`

### Dashboard e relatorios

Nao possuem seed proprio isolado nesta fatia, mas continuam derivando dessas colecoes demo:

- `patioVehicles`
- `openPayments`
- `billingInvoices`
- `invoiceLineItems`
- `vehicleRegistry`
- `clientRegistry`

## Mapa tecnico de vinculos

### Cliente -> Faturamento

- `clientRegistry.billingClientId` aponta para `billingClients.id`
- `billingInvoices.clientId` aponta para `billingClients.id`
- `invoiceLineItems.clientId` acompanha o faturamento

### Cliente -> Veiculo

- `clientRegistry.plates[]` referencia placas do `vehicleRegistry`
- `vehicleRegistry.currentClientId` aponta para `clientRegistry.id`
- `vehicleRegistry.ownerHistory` preserva nomes seed

### Cliente / Veiculo -> Patio

- `patioVehicles.plate` coincide com `vehicleRegistry.plate`
- `patioVehicles.owner` e `phone` ainda refletem massa demo

### Cliente / Veiculo -> Pagamentos

- `openPayments.clientId` aponta para `clientRegistry.id`
- `openPayments.vehicleId` aponta para `vehicleRegistry.id`
- `openPayments.plate` coincide com patio/registro

### Dashboard / Relatorios

- dashboard operacional deriva contagens e totais a partir de `patioVehicles`, `openPayments` e estruturas relacionadas;
- relatorios financeiros e de faturamento continuam lendo `billingInvoices`, `invoiceLineItems` e `openPayments`;
- relatorios veiculares continuam lendo `vehicleRegistry` e relacoes com cliente.

## Classificacao por destino

### Necessario para UI renderizar hoje

- `clientRegistry`
- `vehicleRegistry`
- `patioVehicles`
- `billingClients`
- `billingInvoices`
- `invoiceLineItems`
- `openPayments`

### Necessario para smoke / demonstracao visual atual

- `clientRegistry`
- `patioVehicles`
- `vehicleRegistry`
- `openPayments`
- `billingInvoices`

### Pode virar seed/demo controlado

- todas as colecoes isoladas em `app/demo/lavaprimeDemoData.js`

### Nao deve ir para Supabase

- toda a massa atual isolada em `app/demo/lavaprimeDemoData.js`

### Nao remover agora

- qualquer colecao acima enquanto ainda sustentar dashboard, patio, clientes, financeiro ou relatorios do legado

## O que foi mantido fora desta fatia

Estruturas demo paralelas que ainda existem no legado, mas nao foram movidas nesta etapa por nao serem o nucleo da massa cliente/faturamento/patio:

- `quoteEstimates`
- defaults locais de `cashEntries`
- demais mocks visuais nao ligados diretamente ao fluxo de clientes confirmado nesta trilha

Motivo:

- evitar abrir uma frente ampla de arquitetura;
- manter a extracao pequena e reversivel;
- isolar primeiro a massa demo diretamente ligada ao cleanup antes do Supabase.

## O que nao foi removido

- nenhum seed foi removido nesta fase

Motivo:

- os vinculos ainda sustentam telas, dashboard, relatorios e smoke

## Estrategia segura recomendada

### Etapa 1

- manter os seeds em modulo dedicado
- registrar claramente que sao `demo/teste`

### Etapa 2

- criar bootstrap limpo opcional para ambiente sem seed demo
- manter bootstrap demo separado para demonstracao local

Status apos `LP-WEB-DATA-CLEANUP-002`:

- `app/demo/lavaprimeBootstrapMode.js` passa a ser o ponto unico de selecao do bootstrap;
- `app/demo/lavaprimeCleanBootstrap.js` passa a existir como placeholder seguro e vazio;
- `DEMO_BOOTSTRAP` permanece o padrao oficial;
- `CLEAN_BOOTSTRAP` permanece protegido e inativo por padrao;
- `FUTURE_PERSISTED_BOOTSTRAP` fica reservado apenas como direcao estrutural, sem runtime ativo.

### Etapa 3

- remover referencias demo que nao forem mais necessarias para smoke visual
- revalidar dashboard, clientes, patio e financeiro a cada micro-remocao

### Etapa 4

- somente depois disso preparar a migracao real para Supabase

## Proxima microfase recomendada

`LP-WEB-DATA-CLEANUP-002 - Segregacao entre bootstrap demo e bootstrap limpo`

Objetivo:

- permitir ambiente local demo continuar existindo;
- permitir ambiente limpo sem seed central de clientes/faturamento/patio;
- continuar sem abrir Supabase runtime.

## Estado apos LP-WEB-DATA-CLEANUP-003

- `window.__lavaprimeCleanBootstrapReadiness` passa a existir como diagnostico silencioso em memoria;
- o readiness confirma que dashboard, clientes, veiculos, patio, financeiro, faturas, pagamentos, relatorios, documentos e vinculos cross-domain ainda dependem da seed demo;
- `DEMO_BOOTSTRAP` continua o unico modo seguro como padrao;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a default nesta etapa.

## Estado apos LP-WEB-DATA-CLEANUP-004

- superficies criticas passam a ter cobertura minima adicional de fallback estrutural;
- clientes, veiculos, pagamentos, caixa e faturas agora exibem empty state explicito quando a colecao base estiver vazia;
- geracao de IDs de clientes faturados e faturas fica protegida para colecoes vazias;
- `window.__lavaprimeCleanBootstrapReadiness` passa a registrar cobertura de fallback por superficie;
- `DEMO_BOOTSTRAP` continua o unico modo seguro como padrao;
- nenhuma seed demo foi removida.

## Estado apos LP-WEB-DATA-CLEANUP-005

- `window.__lavaprimeCleanBootstrapTrialReadiness` passa a existir como diagnostico protegido para um futuro trial do bootstrap limpo;
- o trial readiness diferencia explicitamente readiness para teste protegido de readiness para default;
- `canStartProtectedTrial` pode ficar habilitado para a proxima microfase;
- `canPromoteCleanBootstrapToDefault` permanece bloqueado;
- `DEMO_BOOTSTRAP` continua o unico modo seguro como padrao;
- nenhuma seed demo foi removida.

## Estado apos LP-WEB-DATA-CLEANUP-006

- `window.__lavaprimeCleanBootstrapTrialExecution` passa a existir como diagnostico tecnico previsto para trial protegido;
- o trial permanece somente leitura e nao altera o modo padrao;
- `fallbackCoverageCount` esperado do trial: `8`;
- `unsafeSurfaceCount` esperado do trial: `5`;
- `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` continuam como bloqueios para qualquer promocao do modo limpo;
- nenhuma seed demo foi removida.

## Estado apos LP-WEB-DATA-CLEANUP-007

- `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` passam a contar com hardening semantico minimo adicional;
- agregacoes numericas passam a ser protegidas contra `NaN`;
- recibos, documentos e relatorios passam a normalizar linhas antes da geracao;
- contextos de cliente, veiculo e faturamento passam a degradar com fallback por placa, telefone e `billingClientId`;
- o trial protegido fica semanticamente mais seguro, mas o modo limpo continua sem base suficiente para virar default;
- nenhuma seed demo foi removida.

## Estado apos LP-WEB-DATA-CLEANUP-008

- a reavaliacao do trial protegido passa a registrar comparacao explicita entre o estado pre-hardening e o estado atual;
- as `5` superficies antes inseguras deixam de aparecer como bloqueios do trial protegido;
- o trial protegido passa a ser tratado como mais viavel para diagnostico interno, mas ainda nao para promocao de `default`;
- o bloqueio remanescente deixa de ser fallback semantico imediato e passa a ser falta de volume limpo, relacionamentos persistidos e observabilidade suficiente;
- nenhuma seed demo foi removida.

## Proxima microfase recomendada

`LP-WEB-DATA-CLEANUP-009 - Protected clean bootstrap trial observability review`

Objetivo:

- melhorar a evidencia pratica dos diagnosticos internos no browser/runtime;
- manter `DEMO_BOOTSTRAP` como default;
- continuar sem Supabase e sem remocao da seed demo.

## Rollback

1. remover `app/demo/lavaprimeDemoData.js`;
2. recolocar as colecoes isoladas de volta em `app/main.js`;
3. reexecutar `node --check app/main.js`;
4. reexecutar `node scripts/primyo-adapter-gate.mjs`;
5. reexecutar `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`;
6. repetir smoke de dashboard, clientes, patio e financeiro.
