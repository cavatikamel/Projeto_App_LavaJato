# LavaPrime Web First Extraction Proposal

## 1. Objetivo

Definir a primeira extracao futura permitida do `app/main.js`.

Esta proposta nao implementa a extracao nesta fase.

## 2. Extracao recomendada

Primeira extracao futura recomendada:

`sessionBoundary` + `accessBoundary`

## 3. Por que esta extracao

Motivos:

- as duas fronteiras ja existem no topo do `app/main.js`;
- possuem responsabilidade clara;
- nao gravam dados de negocio diretamente;
- preparam autenticacao e permissao futuras;
- tem smoke tests objetivos;
- rollback e simples: restaurar as factories no corpo do `app/main.js`.

## 4. Escopo futuro permitido

Quando esta extracao for autorizada em fase propria, o escopo deve ser:

- criar arquivo futuro para as factories de sessao e autorizacao;
- mover `createSessionBoundary(...)`;
- mover `createAccessBoundary(...)`;
- preservar os mesmos metodos publicos;
- preservar `window.__lavaprimeSessionBoundary`;
- preservar `window.__lavaprimeAccessBoundary`;
- preservar compatibilidade com `selectedProfile` e `activeSessionUser`;
- manter `app/main.js` como coordenador do bootstrap.

## 5. Fora de escopo

Nao fazer junto com a primeira extracao:

- autenticar com Supabase;
- mudar login demo/local;
- alterar layout;
- mudar perfis;
- mudar permissoes;
- trocar `selectedProfile` ou `activeSessionUser` em massa;
- modularizar telas;
- tocar financeiro;
- tocar patio;
- tocar Android;
- tocar banco.

## 6. Arquivos futuros possiveis

Opcoes aceitaveis em fase futura:

- `app/src/legacy/boundaries/sessionBoundary.js`;
- `app/src/legacy/boundaries/accessBoundary.js`;
- ou `app/src/legacy/boundaries/sessionAccessBoundary.js` para manter a primeira fatia menor.

Decisao recomendada:

- comecar com um unico arquivo `sessionAccessBoundary.js`;
- separar em dois arquivos apenas depois, se a evolucao justificar.

## 7. Plano de implementacao futuro

1. Criar o arquivo de fronteira com as duas factories.
2. Importar as factories no `app/main.js`.
3. Instanciar `sessionBoundary` e `accessBoundary` exatamente como hoje.
4. Manter exposicao em `window.__lavaprimeSessionBoundary` e `window.__lavaprimeAccessBoundary`.
5. Executar validacoes tecnicas.
6. Executar smoke test de sessao e acesso.
7. Registrar change control.

## 8. Plano de teste futuro

Obrigatorio:

- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- `node --check app/main.js`;
- `node --check scripts/sync-fipe-local-db.mjs`;
- login Administrador;
- acesso administrativo;
- navegacao principal;
- logout;
- login Operador;
- acesso ao patio;
- acesso do admin ao patio;
- console sem `warn` ou `error` visivel.

Complementar:

- acesso a financeiro como Administrador;
- acesso a configuracoes como Administrador;
- acesso a cadastros como Administrador;
- tentativa de operador permanecer restrito ao patio.

## 9. Plano de rollback futuro

Rollback:

1. remover import da fronteira;
2. restaurar `createSessionBoundary(...)` e `createAccessBoundary(...)` no `app/main.js`;
3. remover arquivo extraido se nao for mais usado;
4. reexecutar build, verify e checks;
5. repetir smoke de login/acesso/logout.

## 10. Criterio de aceite futuro

A extracao so sera aceita se:

- API publica permanecer igual;
- comportamento atual for preservado;
- Administrador continuar acessando area administrativa;
- Operador continuar acessando patio;
- logout continuar funcionando;
- build e checks passarem;
- smoke test passar;
- rollback estiver documentado.

## 11. Decisao desta fase

A primeira extracao futura recomendada e `sessionBoundary` + `accessBoundary`.

Essa escolha equilibra reducao de risco, tamanho pequeno, utilidade arquitetural e capacidade de teste.

## 12. Execucao em LP-WEB-004

`LP-WEB-004` executou a primeira extracao controlada.

Decisao de local:

- arquivo criado: `app/boundaries/sessionAccessBoundary.js`;
- motivo: manter a fronteira no nivel legado do web, proxima de `app/main.js`, sem tocar no React shell;
- alternativa rejeitada nesta fase: `app/src/legacy/boundaries/...`, por ser mais invasiva para a primeira extracao.

Resultado tecnico:

- `createSessionBoundary(...)` saiu de `app/main.js`;
- `createAccessBoundary(...)` saiu de `app/main.js`;
- `app/main.js` passou a importar as factories;
- `app/main.js` continua instanciando e expondo `window.__lavaprimeSessionBoundary` e `window.__lavaprimeAccessBoundary`;
- compatibilidade com `selectedProfile` e `activeSessionUser` foi preservada por callback de sincronizacao.

Fora de escopo mantido:

- nenhuma autenticacao real;
- nenhuma mudanca de regra;
- nenhuma mudanca visual;
- nenhuma alteracao em Supabase, banco, Android, CSS, Vite, scripts ou dependencias.
