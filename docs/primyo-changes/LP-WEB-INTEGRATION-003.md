# LP-WEB-INTEGRATION-003

## Objetivo

Revisar a cobertura atual do `Customer Adapter Shadow Read` e decidir se ja e seguro ampliar a sombra para outros pontos do fluxo de clientes.

## Motivo

- `LP-WEB-INTEGRATION-001` introduziu a primeira integracao real em modo sombra;
- `LP-WEB-INTEGRATION-002` adicionou diagnostico interno mais rico;
- antes de ampliar a superficie em `app/main.js`, era necessario avaliar cobertura, lacunas e risco.

## Evidencias revisadas

- `app/main.js`
- `app/adapters/customerAdapter.js`
- `docs/primyo-changes/LP-WEB-INTEGRATION-001-CLOSURE.md`
- `docs/primyo-changes/LP-WEB-INTEGRATION-002-CLOSURE.md`
- `docs/primyo-web-integration/INTEGRATION_ROLLBACK_PLAN.md`
- `docs/primyo-web-integration/INTEGRATION_SMOKE_TEST_PLAN.md`
- `docs/primyo-data/contracts/CUSTOMER_CONTRACT.md`

## Cobertura atual identificada

- o `shadow read` roda apenas na edicao de cliente existente;
- `Novo cliente`, lista de clientes e salvamento continuam fora da sombra;
- o diagnostico continua tecnico, silencioso e apenas em memoria.

## Decisao registrada

- nao ampliar a integracao nesta fase;
- recomendar como proxima fatia `LP-WEB-INTEGRATION-004 — Customer Legacy Data Validation Before Shadow Expansion`;
- rejeitar por enquanto expansao direta para:
  - lista de clientes;
  - salvamento de cliente;
  - fluxos indiretos de ownership, faturamento ou veiculo.

## Validacoes

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Confirmacoes

- nenhum codigo foi alterado;
- nenhum push foi executado;
- `app/main.js`, adapters, scripts, Supabase, banco, Android, CSS, UI e dependencias permaneceram intactos.
