# LP-SEC-003 - Access Policy Consolidation

## Objetivo

Consolidar a politica local de acesso do LavaPrime Web, expandindo a `accessBoundary` criada em `LP-SEC-001` para concentrar decisoes por modulo e por acao sensivel, sem ativar autenticacao real.

## Arquivos alterados

- `app/main.js`
- `docs/primyo-changes/LP-SEC-003.md`

## Motivo da alteracao

A `accessBoundary` ja existe, mas ainda cobre um conjunto parcial de decisoes. `LP-SEC-003` amplia essa camada para que a navegacao administrativa e mais acoes sensiveis passem a depender de um ponto unico de decisao local, preparando o caminho para autenticacao e autorizacao reais futuras.

## Risco

Risco geral: Medio.

Principais riscos:

- bloqueio indevido de modulos administrativos ja existentes;
- abertura de dialogos administrativos sem validacao centralizada se algum ponto de chamada ficar fora da consolidacao;
- coexistencia temporaria com checagens legadas ainda espalhadas no monolito.

## Plano de implementacao

1. Expandir a `accessBoundary` com permissoes locais por area e por acao sensivel.
2. Criar politica central para views administrativas do web.
3. Redirecionar pontos de navegacao e aberturas de fluxos administrativos para usar a camada consolidada.
4. Preservar integralmente o comportamento atual de `Administrador` e `Operador`.
5. Validar build, checks sintaticos e smoke test minimo.

## Plano de teste

Validacoes obrigatorias:

- `npm.cmd run build`
- `npm.cmd run verify:build`
- `node --check app/main.js`
- `node --check scripts/sync-fipe-local-db.mjs`

Smoke test minimo obrigatorio:

- login administrador;
- acesso administrativo;
- navegacao principal;
- acesso ao patio pelo admin;
- logout;
- login operador;
- acesso ao patio;
- ausencia de `warn` ou `error` visivel no console.

Validacoes complementares, se a interface permitir sem ampliar escopo:

- acesso financeiro como administrador;
- acesso a configuracoes como administrador;
- acesso a cadastros como administrador;
- acesso a documentos como administrador.

## Plano de rollback

Rollback simples:

1. Remover a expansao da `accessBoundary` em `app/main.js`.
2. Restaurar `showAdminView(...)` e os acionadores administrativos para o comportamento anterior.
3. Restaurar as chamadas diretas anteriores nos pontos sensiveis redirecionados.
4. Reexecutar build, `verify:build` e `node --check`.

## Resultado da validacao

Validacoes executadas com sucesso:

- `npm.cmd run build` - sucesso
- `npm.cmd run verify:build` - sucesso
- `node --check app/main.js` - sucesso
- `node --check scripts/sync-fipe-local-db.mjs` - sucesso

Smoke test minimo executado com sucesso:

- login administrador - aprovado
- acesso administrativo - aprovado
- navegacao principal - aprovado
- acesso ao patio pelo admin - aprovado
- logout - aprovado
- login operador - aprovado
- acesso ao patio - aprovado
- console sem `warn` ou `error` visivel - aprovado

Validacoes complementares executadas com sucesso:

- acesso financeiro como administrador - aprovado
- acesso a configuracoes como administrador - aprovado
- acesso a cadastros como administrador - aprovado
- acesso a documentos como administrador - aprovado

Resultado final: aceito tecnicamente para `LP-SEC-003`, sem necessidade de alterar Supabase, banco, Android, layout ou dependencias.
