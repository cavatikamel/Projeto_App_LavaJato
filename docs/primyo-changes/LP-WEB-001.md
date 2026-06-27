# Change Record

- Change ID: `LP-WEB-001`
- Backlog ID: `LP-WEB-001`
- Titulo: Criar fronteira tecnica unica para sessao e perfil no web
- Objetivo: Centralizar perfil ativo, usuario atual, estado logado/deslogado e checagens basicas de acesso administrativo e operacional sem alterar o comportamento funcional atual.
- Motivo da mudanca: O onboarding e o plano de adequacao identificaram que sessao, perfil e roteamento de acesso estavam espalhados no core web. Esta fatia cria uma camada minima para reduzir o risco das proximas evolucoes de autenticacao e permissao.
- Area afetada: Web
- Arquivos afetados:
  - `app/main.js`
  - `docs/primyo-changes/LP-WEB-001.md`
- Risco: `Medio`
- Dependencias:
  - `LP-TEST-001`
  - baseline em `docs/primyo-baseline/`
- Responsavel: Codex
- Aprovador tecnico: Pendente de confirmacao do programa
- Data: `2026-06-19`

## Escopo

- introduzir uma boundary minima de sessao no web;
- fazer a selecao de perfil usar essa boundary;
- fazer login admin e operador iniciar sessao pela mesma boundary;
- fazer logout limpar sessao pela mesma boundary;
- usar a boundary nas checagens centrais de acesso administrativo.

## Fora de escopo

- autenticacao real;
- integracao Supabase;
- alteracao de banco;
- alteracao de Android;
- mudanca visual;
- mudanca de fluxo funcional;
- refatoracao ampla do monolito;
- mudancas em assets, scripts, build ou deploy.

## Plano de implementacao

1. Ler baseline e limites de mudanca.
2. Localizar os pontos centrais de sessao em `app/main.js`.
3. Criar uma `sessionBoundary` local com API minima:
   - `selectProfile(...)`
   - `startSession(...)`
   - `clearSession()`
   - `getState()`
   - `getActiveProfile()`
   - `getCurrentUser()`
   - `isLoggedIn()`
   - `hasAdminAccess()`
   - `hasOperatorAccess()`
4. Sincronizar a boundary com as variaveis legadas `selectedProfile` e `activeSessionUser` para manter compatibilidade com o restante do monolito.
5. Migrar apenas os pontos centrais de mutacao e checagem:
   - `selectProfile(...)`
   - `confirmLogin()`
   - `showPatio(...)`
   - `showAdmin(...)`
   - `returnToLogin()`
   - `canEditClientRegistrations()`
   - `getActiveAdminApproverName()`
6. Executar baseline automatica.
7. Validar manualmente os fluxos de sessao e registrar resultado.

## Plano de teste

Validacoes automaticas executadas:

- `npm.cmd run build`
- `npm.cmd run verify:build`
- `node --check app/main.js`
- `node --check scripts/sync-fipe-local-db.mjs`

Validacoes manuais executadas:

- login com perfil `Administrador`
- acesso administrativo ao dashboard
- navegacao administrativa para `Patio de Atendimento`
- logout a partir da sessao administrativa
- retorno ao login e troca de perfil para `Operador`
- login com perfil `Operador`
- acesso ao patio operacional
- verificacao de ausencia de erros `warn/error` no console capturado pelo navegador embutido

## Plano de rollback

Rollback simples:

1. Reverter `app/main.js` para o estado anterior desta fatia.
2. Remover `docs/primyo-changes/LP-WEB-001.md`, se a mudanca for descartada integralmente.
3. Reexecutar:
   - `npm.cmd run build`
   - `npm.cmd run verify:build`
   - `node --check app/main.js`
   - `node --check scripts/sync-fipe-local-db.mjs`
4. Revalidar login admin, login operador e logout.

## Resultado da validacao

Status final: `Aprovado`

Resultado observado:

- build aprovado;
- `verify:build` aprovado;
- `node --check` do core web aprovado;
- `node --check` do script FIPE aprovado;
- administrador continuou acessando a shell administrativa;
- administrador continuou navegando para o patio;
- logout continuou funcionando;
- operador continuou acessando o patio;
- nao foram capturados erros visiveis de console em `warn/error` durante os cenarios executados.

## Evidencias anexadas

- diff localizado em `app/main.js`
- saidas dos comandos obrigatorios de baseline
- snapshots de navegador do login, dashboard administrativo, patio administrativo, logout e patio do operador
- status de console sem erros `warn/error` nos fluxos exercitados

## Decisao final

`Aprovado`
