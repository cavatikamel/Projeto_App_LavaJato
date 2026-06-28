# LP-WEB-INTEGRATION-001-CLOSURE

## Objetivo da fase

Encerrar formalmente a primeira integracao real controlada da trilha Primyo:

- `customerAdapter` em `shadow read`;
- apenas leitura/adaptacao;
- sem substituir a fonte ativa legada;
- sem integrar `idResolver`;
- sem abrir Supabase.

## Fluxo escolhido

- `Cadastros > Clientes`
- edicao de cliente existente via `openClientDialog(clientId)`

## Como o shadow read foi aplicado

- `app/main.js` passou a importar `toCustomerContract`;
- o adapter roda apenas quando um cliente legado existente e aberto para edicao;
- o contrato derivado usa contexto local controlado com `organizationId`, `source`, `sourceCollection`, `sourceId` e `now`;
- o resultado adaptado fica apenas em memoria local em `lastCustomerShadowReadReport`;
- renderizacao, preenchimento do formulario e salvamento continuam no caminho legado.

## Arquivos alterados

- `app/main.js`
- `docs/primyo-changes/LP-WEB-INTEGRATION-001.md`
- `docs/primyo-changes/LP-WEB-INTEGRATION-001-CLOSURE.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `node --check app/main.js`
- `node --check app/adapters/customerAdapter.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Resultado final:

- todas as validacoes passaram com sucesso.

## Resultado do smoke manual

- app abriu normalmente em `http://127.0.0.1:4174/`;
- login administrador -> sucesso;
- `Cadastros > Clientes` preservado com lista de 5 clientes;
- edicao de `Frota Prime Ltda` -> sucesso;
- abertura de `Novo cliente` sem salvar -> sucesso;
- patio admin -> sucesso;
- logout -> sucesso;
- login operador -> sucesso;
- patio operador -> sucesso;
- shell administrativa oculta para operador -> sucesso;
- console do browser sem `warn` ou `error`.

## Riscos

- primeira alteracao real em `app/main.js` dentro da trilha de adapters;
- clientes PF sem documento seguem invalidos para o contrato oficial, entao a sombra nao pode virar dependencia funcional nesta etapa;
- `organizationId` segue tecnico/local ate ownership oficial futuro;
- qualquer expansao para escrita, `idResolver`, outros dominios, estoque, financeiro ou Supabase continua fora da ordem segura.

## Rollback

1. remover o import de `toCustomerContract` em `app/main.js`;
2. remover `CUSTOMER_SHADOW_READ_ORGANIZATION_ID`;
3. remover `lastCustomerShadowReadReport`;
4. remover `runCustomerDialogShadowRead(client)`;
5. remover a chamada em `openClientDialog(clientId)`;
6. reexecutar `node --check app/main.js`;
7. reexecutar `node scripts/primyo-adapter-gate.mjs`;
8. reexecutar `npm.cmd run primyo:gate`;
9. reexecutar `npm.cmd run build`;
10. reexecutar `npm.cmd run verify:build`;
11. repetir o smoke manual do fluxo.

## Aceite tecnico

Fase aceita como pequena, reversivel e aderente ao plano de readiness.

## Confirmacoes de escopo

- o legado continua fonte ativa;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.
