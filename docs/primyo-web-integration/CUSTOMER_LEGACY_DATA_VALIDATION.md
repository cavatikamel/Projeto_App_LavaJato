# Customer Legacy Data Validation

## Objetivo

Registrar a validacao tecnica da base legada de clientes antes de qualquer ampliacao do `Customer Adapter Shadow Read` e antes da preparacao controlada para Supabase.

## Regra oficial aplicada nesta fase

- cliente comum (`customerBillingMode = common`) nao exige `document` para a rotina operacional;
- cliente comum continua exigindo dados minimos operacionais:
  - placa;
  - nome efetivo do cliente;
  - telefone;
- cliente faturado (`customerBillingMode = billed`) exige `document` como bloqueio real para cobranca formal;
- `type` e `legacyId` continuam obrigatorios para rastreabilidade;
- a validacao continua silenciosa, somente em memoria, sem alterar UI, save, permissao ou persistencia.

## Ponto de execucao atual

- a validacao roda em `renderClientsScreen(container)`;
- a origem analisada continua sendo `clientRegistry`;
- a leitura permanece 100% em memoria;
- a saida continua restrita a `window.__lavaprimeCustomerLegacyDataValidation`;
- o legado continua fonte ativa.

## Origem dos 5 registros analisados

Os cinco clientes encontrados atualmente em `clientRegistry` sao seeds embutidos em `app/main.js`, portanto nesta fase foram classificados como massa `demo/teste`, nao como base real de clientes.

Mapeamento tecnico atual:

| `legacyId` | Nome efetivo | Billing mode | Classificacao |
| --- | --- | --- | --- |
| `1` | `Frota Prime Ltda` | `billed` | `demo/teste` |
| `2` | `Condominio Reserva Azul` | `billed` | `demo/teste` |
| `3` | `Auto Center Vila Norte` | `billed` | `demo/teste` |
| `4` | `Marina Alves` | `common` | `demo/teste` |
| `5` | `Rafael Nunes` | `common` | `demo/teste` |

## Vínculos encontrados antes de qualquer limpeza

Nenhum dado foi removido nesta fase. Antes de qualquer remocao, foram mapeados os seguintes vinculos:

- `clientRegistry`: `5` registros seed;
- `billingClients`: `3` clientes faturados paralelos ligados aos `legacyId` `1`, `2` e `3`;
- `billingInvoices`: `3` faturas seed ligadas aos clientes faturados;
- `invoiceLineItems`: `3` itens seed ligados a faturamento e placas demo;
- `vehicleRegistry`: `5` veiculos com `currentClientId`, `ownerHistory` e `serviceHistory` apontando para a massa demo;
- `patioVehicles`: `5` entradas visuais/operacionais usando as mesmas placas seed;
- `openPayments`: `1` pagamento em aberto ligado ao cliente `5`;
- dashboard e relatorios: continuam consumindo esses seeds de patio, faturamento e pagamentos;
- seeds/mocks usados pela UI: permanecem hardcoded em `app/main.js`.

Conclusao desta fase:

- a massa demo/teste esta entrelacada com veiculos, faturamento, pagamentos, patio, dashboard e relatorios;
- por isso, a remocao imediata nao foi considerada segura.

## Estrutura atual do diagnostico em memoria

`window.__lavaprimeCustomerLegacyDataValidation` passa a registrar, no minimo:

- `totalAnalyzed`
- `realRecordsAnalyzed`
- `demoTestRecords`
- `structurallyCompatibleCustomers`
- `realIncompatibleCustomers`
- `demoTestIncompatibleCustomers`
- `commonCustomerCount`
- `billedCustomerCount`
- `customersWithoutDocument`
- `customersWithoutPhone`
- `customersWithoutOperationalPlate`
- `optionalMissingFieldCounts`
- `billingBlockingFieldCounts`
- `billingBlockingIssueCounts`
- `canExpandShadowReadForCommonCustomers`
- `canExpandShadowReadForBilledCustomers`
- `canPrepareSupabaseMigration`
- `cleanupImpact`
- `cleanupDecision`

## Resultado tecnico atual

Snapshot tecnico absorvido nesta fase:

- `5` clientes analisados;
- `0` registros reais analisados;
- `5` registros `demo/teste`;
- `5` clientes estruturalmente compativeis com a regra atual;
- `0` incompatibilidades reais;
- `0` bloqueios atuais de faturamento por `document`;
- `2` ausencias de `document` em clientes comuns;
- `optionalMissingFieldCounts.document = 2`;
- `billingBlockingFieldCounts.document = 0`;
- `canExpandShadowReadForCommonCustomers = true`;
- `canExpandShadowReadForBilledCustomers = true`;
- `canPrepareSupabaseMigration = false`.

Leitura correta da decisao:

- a ausencia de `document` nao bloqueia mais cliente comum;
- a ausencia de `document` continua bloqueando apenas cliente faturado;
- a base atual nao pode ser tratada como prova de prontidao para migracao porque e apenas massa `demo/teste`.

## O que foi apenas mapeado

- classificacao dos `5` clientes como seed `demo/teste`;
- vinculos com faturamento, veiculos, patio, pagamentos, dashboard e relatorios;
- impactos esperados de uma futura remocao/isolation;
- diferenca tecnica entre cliente comum e cliente faturado.

## O que foi mantido

- todos os `5` clientes seed permaneceram no legado;
- `billingClients`, `billingInvoices`, `invoiceLineItems`, `vehicleRegistry`, `patioVehicles` e `openPayments` permaneceram intactos;
- nenhuma UI, fluxo, permissao, save ou persistencia foi alterado por causa da limpeza.

## O que foi removido

- nada nesta fase.

## Plano seguro de limpeza antes do Supabase

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-001 — Limpeza controlada da massa demo/teste antes do Supabase`.

Escopo sugerido:

1. separar seed demo/teste por dominio (`clientes`, `faturamento`, `veiculos`, `pagamentos`, `patio`);
2. identificar dependencias minimas que ainda sustentam renderizacao, smoke e demonstracao visual;
3. isolar primeiro o que puder virar fixture ou mock controlado;
4. remover apenas o que estiver comprovadamente fora do fluxo minimo legado;
5. reexecutar gate, build, verify e smoke apos cada micro-remocao.

## Regras preservadas

- o legado continua fonte ativa;
- a validacao nao altera lista, formulario, save, permissao ou UI;
- nao ha persistencia local ou remota nova;
- nao ha telemetria externa;
- `idResolver` continua fora do runtime;
- Supabase continua fechado;
- nenhuma ampliacao de `shadow read` foi iniciada nesta fase.
