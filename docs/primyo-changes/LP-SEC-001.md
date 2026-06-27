# LP-SEC-001 — Auth Readiness Layer

## Objetivo

Criar uma camada local e centralizada de autorização no LavaPrime Web, apoiada na `sessionBoundary`, para concentrar regras de acesso por perfil sem ativar autenticação real, sem alterar banco, Supabase, Android, dependências, layout ou fluxo do usuário.

## Arquivos alterados

- `app/main.js`
- `docs/primyo-changes/LP-SEC-001.md`

## Motivo da alteração

O estado atual do web já possui uma fronteira mínima de sessão e perfil criada em `LP-WEB-001`, mas as decisões de autorização ainda estavam distribuídas em checagens locais. `LP-SEC-001` prepara o produto para uma futura autenticação/autorização real ao consolidar essas decisões em uma API única, reversível e local.

## Risco

Risco geral: Médio.

Principais riscos:

- regressão em acessos administrativos já existentes;
- bloqueio indevido de fluxos locais de cadastro vinculados ao pátio;
- acoplamento parcial com checagens legadas ainda presentes no monólito.

## Plano de implementação

1. Criar uma `accessBoundary` local em `app/main.js`, derivada da `sessionBoundary`.
2. Expor capacidades mínimas de autorização para administrador, operador, pátio, financeiro, usuários, cadastros e logout.
3. Redirecionar checagens sensíveis já existentes para consultar a nova camada.
4. Preservar o comportamento atual do login demo/local e da navegação.
5. Validar build, verificações sintáticas e smoke test manual.

## Plano de teste

Validações obrigatórias:

- `npm.cmd run build`
- `npm.cmd run verify:build`
- `node --check app/main.js`
- `node --check scripts/sync-fipe-local-db.mjs`

Smoke test manual obrigatório:

- login administrador;
- acesso administrativo;
- navegação principal;
- logout;
- login operador;
- acesso ao pátio;
- ausência de erros visíveis no console.

## Plano de rollback

Rollback simples:

1. Remover a criação e a exposição da `accessBoundary` em `app/main.js`.
2. Restaurar as checagens locais anteriormente usadas nos pontos redirecionados.
3. Reexecutar build, `verify:build` e `node --check`.

## Resultado da validação

Validações executadas com sucesso:

- `npm.cmd run build` — sucesso;
- `npm.cmd run verify:build` — sucesso;
- `node --check app/main.js` — sucesso;
- `node --check scripts/sync-fipe-local-db.mjs` — sucesso.

Smoke test manual executado com sucesso:

- login administrador — aprovado;
- acesso administrativo — aprovado;
- navegação principal até `Pátio de Atendimento` no shell administrativo — aprovado;
- logout — aprovado;
- login operador — aprovado;
- acesso ao pátio — aprovado;
- console visível sem `warn` ou `error` durante o smoke test — aprovado.

Resultado final: aceito tecnicamente para a fase `LP-SEC-001`, sem necessidade de alterar Supabase, banco, Android ou dependências.
