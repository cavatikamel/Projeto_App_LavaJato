# LP-WEB-INTEGRATION-002

## Objetivo

Melhorar o diagnostico interno do `Customer Adapter Shadow Read` sem alterar o comportamento visivel ou funcional do LavaPrime.

Escopo desta fase:

- enriquecer o relatorio em memoria do `shadow read`;
- manter o legado como fonte ativa;
- manter `idResolver` fora do runtime;
- manter Supabase fechado;
- manter renderizacao, formulario, save e permissoes no caminho legado.

## Fluxo escolhido

- `Cadastros > Clientes`
- edicao de cliente existente via `openClientDialog(clientId)`

Justificativa:

- reaproveita o mesmo ponto controlado da primeira integracao;
- permite diagnostico mais rico sem ampliar superficie;
- continua com rollback pequeno e localizado em `app/main.js`.

## Implementacao

- `runCustomerDialogShadowRead(client)` continua rodando apenas na edicao de cliente existente;
- o relatorio em memoria agora registra:
  - cliente analisado;
  - sucesso ou falha da adaptacao;
  - motivo da falha;
  - campos obrigatorios ausentes;
  - tipo de cliente;
  - presenca ou ausencia de documento;
  - timestamp simples;
  - caminho de rollback;
  - confirmacao de que o legado continuou ativo;
- o snapshot continua disponivel em `lastCustomerShadowReadReport`;
- um historico curto silencioso passa a ficar exposto apenas para inspecao tecnica em `window.__lavaprimeCustomerShadowReadDiagnostics`;
- o fluxo de `Novo cliente` continua sem disparar o `shadow read`.

## Arquivos alterados

- `app/main.js`
- `docs/primyo-changes/LP-WEB-INTEGRATION-002.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Riscos

- o runtime continua tocando `app/main.js`, entao qualquer crescimento fora do diagnostico aumentaria risco rapidamente;
- clientes PF sem documento continuam podendo gerar falha contratual esperada na sombra;
- o historico em memoria pode ser usado para troubleshooting, mas nao pode virar dependencia funcional ou persistencia oficial;
- qualquer expansao para escrita, `idResolver`, outros dominios, estoque, financeiro ou Supabase continua fora desta fase.

## Rollback

1. remover `CUSTOMER_SHADOW_READ_DIAGNOSTICS_LIMIT`;
2. remover `CUSTOMER_SHADOW_READ_ROLLBACK_PATH`;
3. remover `customerShadowReadDiagnostics`;
4. remover `window.__lavaprimeCustomerShadowReadDiagnostics`;
5. reverter `runCustomerDialogShadowRead(client)` para o snapshot minimo anterior;
6. remover os helpers diagnosticos desta fase em `app/main.js`;
7. reexecutar `node --check app/main.js`;
8. reexecutar `node scripts/primyo-adapter-gate.mjs`;
9. reexecutar `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`;
10. repetir o smoke manual minimo do fluxo de clientes.

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

Preview local previsto:

- `http://127.0.0.1:4174/`

Cenarios obrigatorios desta fase:

1. login admin;
2. `Cadastros > Clientes`;
3. abrir cliente existente e confirmar formulario legado preservado;
4. confirmar que o shadow read continua silencioso e sem efeito visual na edicao existente;
5. abrir `Novo cliente` e confirmar ausencia de nova entrada indevida no historico;
6. login operador e confirmar fluxo protegido;
7. console sem erro bloqueante.

Resultado final:

1. app abriu normalmente em `http://127.0.0.1:4174/`;
2. login admin com `mateus.admin` / `admin789` -> sucesso;
3. `Cadastros > Clientes` preservado com 5 clientes;
4. edicao de `Frota Prime Ltda` manteve formulario legado com `legalName`, `cnpj`, `phone`, faturamento e aprovacao intactos;
5. abertura de `Novo cliente` preservou formulario em branco, sem regressao visual e sem efeito funcional indevido;
6. logout admin -> sucesso;
7. login operador com `carlos` / `lava123` -> sucesso;
8. patio do operador carregado com `#adminShell` oculto;
9. console do browser sem `warn` ou `error`.

## Fora de escopo

- tornar `customerAdapter` fonte ativa;
- qualquer escrita via adapter;
- integracao de `idResolver`;
- integracao de veiculo, servico, produto, insumo, estoque, financeiro ou atendimento;
- alteracao de UI, CSS ou layout;
- Supabase, banco, Android e dependencias.
