# LP-WEB-DATA-CLEANUP-002-CLOSURE

## Objetivo da fase

Separar bootstrap demo e bootstrap limpo sem remover a massa `demo/teste`, sem trocar o modo padrao e sem abrir Supabase.

## Separacao criada

- `app/demo/lavaprimeBootstrapMode.js` centraliza a escolha do bootstrap ativo;
- `app/demo/lavaprimeCleanBootstrap.js` prepara um bootstrap limpo estrutural e seguro;
- `app/main.js` passa a consumir o bootstrap por um ponto unico;
- `DEMO_BOOTSTRAP` permanece como modo padrao oficial.

## Arquivos alterados

- `app/main.js`
- `app/demo/lavaprimeBootstrapMode.js`
- `app/demo/lavaprimeCleanBootstrap.js`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-002.md`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-002-CLOSURE.md`
- `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Modo padrao atual

- `DEMO_BOOTSTRAP`

## O que nao foi removido

- `app/demo/lavaprimeDemoData.js` continua preservando toda a massa `demo/teste`;
- clientes, veiculos, patio, faturamento, itens de fatura e pagamentos continuam disponiveis para o runtime legado;
- nenhuma seed demo foi removida nesta fase.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Resultado do smoke manual

- smoke aprovado em `http://127.0.0.1:4174/`;
- login admin, dashboard, `Cadastros > Clientes`, patio, financeiro, `Recibos e Documentos`, logout, login operador e patio do operador permaneceram funcionais;
- console do browser sem erro bloqueante.

## Warning nao bloqueante

- `npm.cmd run build` permaneceu com warning de chunk acima de `500 kB`, sem bloquear o aceite da fase.

## Riscos

- o bootstrap limpo ainda e apenas estrutural e protegido;
- dashboard, clientes, patio, financeiro e relatorios continuam dependentes da seed demo;
- a troca do modo padrao continua insegura sem revisao adicional de dependencias.

## Rollback

1. remover `app/demo/lavaprimeBootstrapMode.js`;
2. remover `app/demo/lavaprimeCleanBootstrap.js`;
3. restaurar em `app/main.js` o import direto de `app/demo/lavaprimeDemoData.js`;
4. reexecutar `node --check`, Adapter Gate, `primyo:gate`, `build`, `verify:build` e smoke rapido.

## Proxima fatia recomendada

- `LP-WEB-DATA-CLEANUP-003 - Clean bootstrap dependency review with protected fallback`

## Aceite tecnico

- comportamento visual e funcional preservado;
- Supabase continua fechado;
- nao houve push.
