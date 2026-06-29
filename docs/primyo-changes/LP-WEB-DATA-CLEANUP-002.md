# LP-WEB-DATA-CLEANUP-002

## Objetivo

Separar bootstrap demo e bootstrap limpo sem remover a massa `demo/teste`, sem abrir Supabase e sem alterar o comportamento visual ou funcional do LavaPrime Web.

## Arquivos alterados

- `app/main.js`
- `app/demo/lavaprimeCleanBootstrap.js`
- `app/demo/lavaprimeBootstrapMode.js`
- `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Implementacao

- o bootstrap ativo deixou de importar as colecoes diretamente de `app/demo/lavaprimeDemoData.js`;
- `app/demo/lavaprimeBootstrapMode.js` passou a concentrar a escolha do bootstrap ativo;
- `app/demo/lavaprimeCleanBootstrap.js` foi criado como placeholder seguro para ambiente limpo;
- o modo padrao permaneceu `DEMO_BOOTSTRAP`;
- o modo limpo ficou preparado, mas protegido e inativo por padrao;
- `app/main.js` continuou consumindo as mesmas colecoes mutaveis do legado, agora via ponto unico de bootstrap.

## Garantias preservadas

- nenhuma seed demo foi removida;
- dashboard, clientes, patio, financeiro e relatorios continuam carregando no caminho atual;
- `app/main.js` continua fonte ativa do runtime;
- Supabase continua fechado;
- autenticacao, permissao, save e UI permanecem intactos.

## Validacoes executadas

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Resultado:

- todas as validacoes tecnicas passaram;
- `build` permaneceu com warning nao bloqueante de chunk acima de `500 kB`;
- o warning nao alterou a decisao de aceite desta fatia.

## Smoke manual

Executado em `http://127.0.0.1:4174/` com resultado aprovado:

- login admin concluido;
- dashboard carregado;
- `Cadastros > Clientes` carregou;
- patio admin carregou;
- financeiro admin carregou;
- `Recibos e Documentos` carregou;
- logout funcionou;
- login operador concluiu;
- patio do operador carregou;
- console do browser permaneceu sem `warn` ou `error` bloqueante.

## Riscos

- o bootstrap limpo ainda e apenas estrutural e nao foi promovido a modo padrao;
- dashboard, patio, financeiro e relatorios seguem dependentes da massa demo;
- qualquer ativacao prematura do bootstrap limpo ainda pode quebrar fluxos visuais e relatorios.

## Rollback

1. remover `app/demo/lavaprimeBootstrapMode.js`;
2. remover `app/demo/lavaprimeCleanBootstrap.js`;
3. restaurar o import direto de `app/main.js` para `app/demo/lavaprimeDemoData.js`;
4. reexecutar `node --check`, Adapter Gate, `primyo:gate`, `build`, `verify:build` e smoke rapido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-003 - Clean bootstrap dependency review with protected fallback`

Objetivo sugerido:

- validar quais telas ainda exigem seed demo obrigatoria;
- exercitar bootstrap limpo apenas em microescopo controlado;
- manter `DEMO_BOOTSTRAP` como padrao ate existir fallback seguro em todos os fluxos criticos.
