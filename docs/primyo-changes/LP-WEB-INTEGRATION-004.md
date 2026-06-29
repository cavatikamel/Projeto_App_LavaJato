# LP-WEB-INTEGRATION-004

## Objetivo

Ajustar a validacao silenciosa dos dados legados de clientes para refletir a regra oficial do LavaPrime:

- `document` nao e obrigatorio para cliente comum;
- `document` continua obrigatorio para cliente faturado;
- a base atual de `clientRegistry` deve ser tratada como massa `demo/teste`, nao como base real pronta para Supabase.

## Implementacao

### `app/adapters/customerAdapter.js`

- `document` deixou de ser obrigatorio de forma global no payload;
- o adapter passou a exigir `document` apenas quando o cliente esta configurado como faturado;
- cliente comum sem `document` agora gera apenas warning controlado;
- nenhuma API publica do adapter foi alterada.

### `app/main.js`

- `window.__lavaprimeCustomerLegacyDataValidation` passou a diferenciar:
  - cliente comum;
  - cliente faturado;
  - massa `demo/teste`;
- a validacao agora separa:
  - compatibilidade estrutural;
  - incompatibilidade real;
  - campos opcionais ausentes;
  - bloqueios especificos de faturamento;
  - capacidade tecnica de expansao de sombra para `common` e `billed`;
- a rotina continua apenas em memoria e continua silenciosa para o usuario.

## Resultado tecnico encontrado

### Fonte dos registros

Os `5` clientes atuais continuam vindo de `clientRegistry` hardcoded em `app/main.js`.

Confirmacao desta fase:

- nao ha cliente real na base atual;
- os `5` registros atuais foram classificados como `demo/teste`;
- os seeds continuam ligados a faturamento, veiculos, patio, pagamentos, dashboard e relatorios.

### Regra de validacao consolidada

- `name` efetivo ausente -> incompatibilidade;
- `phone` ausente -> incompatibilidade operacional;
- `plate` ausente em cliente comum -> incompatibilidade operacional;
- `type` ausente -> incompatibilidade;
- `legacyId` ausente -> incompatibilidade;
- `document` ausente em cliente comum -> opcional/recomendado;
- `document` ausente em cliente faturado -> bloqueio real.

### Snapshot tecnico absorvido

- `5` clientes analisados;
- `5` registros classificados como `demo/teste`;
- `0` registros reais analisados;
- `5` clientes estruturalmente compativeis sob a regra atual;
- `0` incompatibilidades reais;
- `2` ausencias opcionais de `document` em clientes comuns;
- `0` bloqueios de faturamento por `document`;
- `canExpandShadowReadForCommonCustomers = true`;
- `canExpandShadowReadForBilledCustomers = true`;
- `canPrepareSupabaseMigration = false`.

## Vínculos mapeados antes de qualquer limpeza

- `clientRegistry` -> `5` registros seed;
- `billingClients` -> `3` registros paralelos para os clientes faturados;
- `billingInvoices` -> `3` registros seed;
- `invoiceLineItems` -> `3` registros seed;
- `vehicleRegistry` -> `5` veiculos ligados por `currentClientId`, placa e historico;
- `patioVehicles` -> `5` entradas visuais/operacionais usando a mesma massa;
- `openPayments` -> `1` pagamento aberto ligado ao cliente `5`;
- dashboard e relatorios -> continuam consumindo essas estruturas seed.

## Decisao sobre limpeza

### O que foi apenas mapeado

- a origem dos `5` clientes;
- a classificacao `common` vs `billed`;
- os vinculos com faturamento, veiculos, patio, pagamentos, dashboard e relatorios;
- o impacto da massa `demo/teste` para a futura migracao.

### O que foi removido

- nada nesta fase.

### O que foi mantido

- todos os dados seed de cliente;
- todos os vinculos seed de faturamento, patio, veiculos e pagamentos;
- toda a renderizacao atual do legado.

Conclusao:

- ainda nao e seguro limpar agora;
- a remocao/isolation precisa virar fatia propria e controlada.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-001 — Limpeza controlada da massa demo/teste antes do Supabase`

Motivo:

- a regra de `document` ja foi corrigida;
- a massa atual continua inteiramente ficticia;
- os seeds permanecem entrelacados com varias telas e estruturas derivadas;
- a limpeza precisa vir antes da preparacao real para Supabase.

## Arquivos alterados

- `app/adapters/customerAdapter.js`
- `app/main.js`
- `scripts/primyo-adapter-gate.mjs`
- `docs/primyo-web-integration/CUSTOMER_LEGACY_DATA_VALIDATION.md`
- `docs/primyo-changes/LP-WEB-INTEGRATION-004.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Validacoes executadas

- `node --check app/main.js`
- `node --check app/adapters/customerAdapter.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Riscos

- a massa demo/teste continua sustentando partes visuais e operacionais do legado;
- a limpeza prematura ainda pode quebrar patio, faturamento, relatorios ou smoke se vier sem fatiamento;
- `customerAdapter` continua fora da escrita, entao a regra corrigida ainda e uma validacao de preparo, nao uma migracao concluida;
- `idResolver` continua fora do runtime.

## Rollback

1. reverter `app/adapters/customerAdapter.js` para o estado anterior;
2. reverter `app/main.js` para o diagnostico anterior;
3. reverter `scripts/primyo-adapter-gate.mjs`;
4. reverter a documentacao desta fase;
5. reexecutar `node --check app/main.js`;
6. reexecutar `node --check app/adapters/customerAdapter.js`;
7. reexecutar `node scripts/primyo-adapter-gate.mjs`;
8. reexecutar `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`.
