# LavaPrime Smoke Test Plan

## Objetivo

Definir o conjunto minimo de validacoes manuais de fumaça que deve ser executado para detectar regressao critica nas proximas mudancas do LavaPrime Web.

Este plano nao tenta cobrir o produto inteiro.

Ele existe para proteger os fluxos mais sensiveis antes de fatias como `LP-SEC-001`.

## Escopo minimo da fumaca

Fluxos obrigatorios nesta fundacao:

- login administrador
- login operador
- logout
- acesso ao patio
- acesso administrativo
- navegacao principal

## Ordem recomendada de execucao

1. Login administrador
2. Acesso administrativo
3. Navegacao principal
4. Logout
5. Login operador
6. Acesso ao patio
7. Logout final, quando aplicavel

## Casos de fumaca

| ID | Fluxo | Pre-condicao | Passos | Resultado esperado | Severidade |
| --- | --- | --- | --- | --- | --- |
| ST-001 | Login administrador | Aplicacao carregada na tela de autenticacao | Informar usuario e senha validos de demonstracao. Selecionar `Administrador`. Confirmar login. | Shell administrativa abre sem erro visivel. Dashboard fica acessivel. | Critico |
| ST-002 | Login operador | Aplicacao carregada na tela de autenticacao | Informar usuario e senha validos de demonstracao. Selecionar `Operador`. Confirmar login. | Patio operacional abre sem shell administrativa completa. | Critico |
| ST-003 | Logout | Usuario autenticado como admin ou operador | Acionar `Sair`. | Aplicacao retorna ao estado inicial de login. Senha e contexto de sessao sao encerrados sem erro visivel. | Critico |
| ST-004 | Acesso ao patio | Usuario autenticado | Entrar no patio pelo fluxo natural do perfil. No admin, navegar para `Patio de Atendimento`. No operador, abrir a tela inicial do patio. | Patio carrega com cards, status e acoes basicas sem erro visivel. | Alto |
| ST-005 | Acesso administrativo | Usuario autenticado como `Administrador` | Confirmar abertura do dashboard e navegar para um modulo administrativo principal. | Area administrativa permanece acessivel ao admin e indisponivel como shell principal do operador. | Critico |
| ST-006 | Navegacao principal | Usuario autenticado como `Administrador` | Navegar entre `Visao Geral` e `Patio de Atendimento`. Quando a mudanca tocar outros modulos, incluir os modulos impactados. | Navegacao principal permanece funcional, sem erro visivel, perda de contexto ou tela quebrada. | Alto |

## Regras de aplicacao

- Toda mudanca que tocar sessao, perfil, autenticacao, permissao ou roteamento deve executar `ST-001` a `ST-006`.
- Mudancas que nao tocam sessao podem executar um subconjunto, conforme `REGRESSION_MATRIX.md`.
- Qualquer falha em caso `Critico` bloqueia a mudanca ate correcao ou rollback.

## Evidencia minima por execucao

Cada execucao de fumaca deve registrar:

- data;
- versao ou commit;
- backlog ID ou change ID;
- resultado por caso;
- evidencias observaveis;
- falhas ou ressalvas.
