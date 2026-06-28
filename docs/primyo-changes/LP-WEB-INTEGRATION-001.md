# LP-WEB-INTEGRATION-001

## Objetivo

Implementar a primeira integracao real e controlada da trilha Primyo:

- `customerAdapter` em `shadow read`;
- somente leitura/adaptacao;
- sem alterar a fonte ativa legada;
- sem integrar `idResolver`;
- sem tocar persistencia, Supabase, financeiro, atendimento ou veiculo.

## Fluxo escolhido

- `Cadastros > Clientes`
- edicao de cliente existente via `openClientDialog(clientId)`

Justificativa:

- e o menor fluxo de cliente com leitura legada ja resolvida;
- nao toca `saveClientRegistration(...)`;
- permite adaptar o payload existente sem alterar renderizacao ou escrita;
- possui rollback simples e localizado em `app/main.js`.

## Implementacao

- `app/main.js` passou a importar `toCustomerContract` de `app/adapters/customerAdapter.js`;
- o shadow read roda apenas quando um cliente legado existente e aberto para edicao;
- o contexto minimo usado na sombra e:
  - `organizationId: org:lavaprime-local-web`
  - `source: web.clientDialog.shadowRead`
  - `sourceCollection: clientRegistry`
  - `sourceId: String(client.id)`
  - `now: new Date().toISOString()`
- o resultado adaptado e registrado apenas em memoria local em `lastCustomerShadowReadReport`;
- renderizacao, populacao do formulario e salvamento continuam 100% no caminho legado.

## Arquivos alterados

- `app/main.js`
- `docs/primyo-changes/LP-WEB-INTEGRATION-001.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Riscos

- primeira alteracao real em `app/main.js` dentro da trilha de adapters;
- clientes PF sem documento continuam invalidos para o contrato oficial, entao a sombra nao pode bloquear o fluxo legado;
- `organizationId` continua tecnico e local ate existir ownership oficial no runtime;
- qualquer expansao para escrita, `idResolver`, veiculo, servico, produto, insumo, estoque, financeiro ou Supabase aumenta o risco e continua fora desta fase.

## Rollback

1. remover o import de `toCustomerContract` em `app/main.js`;
2. remover `CUSTOMER_SHADOW_READ_ORGANIZATION_ID`;
3. remover `lastCustomerShadowReadReport`;
4. remover `runCustomerDialogShadowRead(client)`;
5. remover a chamada do shadow read em `openClientDialog(clientId)`;
6. reexecutar `node --check app/main.js`;
7. reexecutar `node scripts/primyo-adapter-gate.mjs`;
8. reexecutar `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`;
9. repetir o smoke manual minimo do fluxo de clientes.

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

- `node --check app/main.js` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## Smoke manual

Preview local usado:

- `http://127.0.0.1:4174/`

Execucao registrada:

1. app aberto com sucesso;
2. login administrador com `mateus.admin` / `admin789` -> sucesso;
3. tela `Cadastros > Clientes` aberta com lista preservada e 5 clientes visiveis;
4. edicao do cliente legado `Frota Prime Ltda` aberta com nome, documento, telefone e faturamento intactos;
5. criacao de `Novo cliente` aberta sem salvar, confirmando que o caminho legado de cadastro continuou funcional;
6. navegacao ate `Pátio de Atendimento` no admin -> sucesso;
7. logout -> sucesso;
8. login operador com `carlos` / `lava123` -> sucesso;
9. patio do operador carregado com shell administrativa oculta -> sucesso;
10. console do browser sem `warn` ou `error` -> sucesso.

## Fora de escopo

- `idResolver` no runtime;
- qualquer escrita via adapter;
- alteracao de UI, CSS ou layout;
- alteracao de `vehicleAdapter`, `serviceAdapter`, `productAdapter`, `supplyAdapter` ou `idResolver`;
- Supabase, banco, Android e dependencias.
