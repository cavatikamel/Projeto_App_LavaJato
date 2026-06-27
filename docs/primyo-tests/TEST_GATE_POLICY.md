# LavaPrime Test Gate Policy

## Objetivo

Definir quando uma mudanca pode avancar, quando deve ser bloqueada e quando exige rollback.

Esta politica e a primeira camada oficial de gate de regressao do LavaPrime.

## Gate minimo obrigatorio

Toda mudanca futura no LavaPrime Web deve, no minimo, executar e registrar:

- `npm.cmd run primyo:gate`

O comando `primyo:gate` e a validacao tecnica oficial adotada em `LP-TEST-AUTO-001`.

Ele executa:

- preflight de ambiente Node;
- verificacao de arquivos obrigatorios;
- `node --check scripts/primyo-adapter-gate.mjs`;
- `node scripts/primyo-adapter-gate.mjs`;
- `node --check app/main.js`;
- `node --check app/boundaries/sessionAccessBoundary.js`;
- `node --check scripts/sync-fipe-local-db.mjs`;
- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- resumo final com `Gate Result: SUCCESS` ou `Gate Result: FAILED`.

Quando a mudanca tocar sessao, perfil, autenticacao, permissao ou navegacao principal, tambem e obrigatorio:

- executar `ST-001` a `ST-006` do `SMOKE_TEST_PLAN.md`;
- registrar a execucao em `TEST_EXECUTION_TEMPLATE.md`.

Os comandos individuais continuam validos para diagnostico, mas nao substituem o registro do gate oficial quando a mudanca for encerrada.

## Automacao planejada em LP-TEST-003

`LP-TEST-003` definiu a estrategia de automacao incremental, mas nao implementou scripts.

Estado historico apos `LP-TEST-003`:

- o gate tecnico continua sendo executado pelos comandos manuais obrigatorios;
- o smoke funcional continua manual;
- nenhuma dependencia de teste foi adicionada;
- nenhum framework de automacao foi instalado;
- nenhuma pipeline foi criada.

Primeira automacao futura recomendada:

- script Node simples, sem dependencias novas;
- consolidacao dos quatro comandos obrigatorios;
- registro local de resultado;
- ponte para smoke manual conforme matriz de regressao.

## Automacao adotada em LP-TEST-AUTO-001

`LP-TEST-AUTO-001` implementou o primeiro gate tecnico local.

Estado oficial apos `LP-TEST-AUTO-001`:

- `npm.cmd run primyo:gate` e obrigatorio para encerramento tecnico de mudancas web;
- o gate falha com codigo diferente de zero se qualquer etapa obrigatoria falhar;
- o smoke funcional continua manual;
- nenhuma dependencia nova foi adicionada;
- nenhum framework de automacao foi instalado;
- nenhuma pipeline foi criada.

## Automacao adotada em LP-TEST-AUTO-003

`LP-TEST-AUTO-003` adicionou um gate conceitual especifico para adapters puros, sem dependencias novas.

Estado oficial apos `LP-TEST-AUTO-003`:

- `scripts/primyo-adapter-gate.mjs` passa a ser executado dentro de `npm.cmd run primyo:gate`;
- o gate importa `customerAdapter` e `vehicleAdapter` em Node puro;
- o gate valida exports minimos dos adapters;
- o gate executa cenarios validos e invalidos controlados para cliente e veiculo;
- o gate valida envelope, `validation`, `warnings`, `organizationId`, timestamps, separacao entre `id` e `sourceId` e ausencia de dependencia de runtime;
- `customerAdapter` e `vehicleAdapter` passam a estar protegidos por regressao automatica minima oficial;
- todo novo adapter puro devera entrar no Adapter Contract Gate com fixture valida e fixture invalida antes de qualquer integracao ao runtime;
- nenhuma dependencia nova foi instalada;
- nenhum adapter foi integrado ao runtime;
- `app/main.js` permanece fora do escopo desta fase.

Limites atuais desta cobertura:

- o gate ainda cobre apenas `customerAdapter` e `vehicleAdapter`;
- a cobertura continua conceitual e local, nao browser-based;
- smoke funcional continua obrigatorio quando futuras fatias tocarem runtime, navegacao, dados ou permissao.

## Niveis futuros de automacao

Os niveis abaixo devem evoluir em fatias separadas e aprovadas:

1. Gate tecnico local.
2. Checklist estruturado.
3. Smoke assistido.
4. Smoke browser.
5. Testes de unidade.
6. Testes E2E criticos.

Nenhum nivel futuro substitui automaticamente a validacao manual atual.

## Regra para substituir validacao manual

Um smoke manual so pode ser substituido por automacao quando:

- a automacao estiver aprovada em fatia propria;
- a automacao produzir evidencia equivalente ou superior;
- o resultado tiver sido comparado com execucao manual;
- o rollback da automacao estiver documentado;
- a decisao estiver registrada no change control.

## Quando uma mudanca pode avancar

Uma mudanca pode avancar quando:

- `npm.cmd run primyo:gate` passar;
- todos os fluxos `Obrigatorio` da `REGRESSION_MATRIX.md` passarem;
- nao houver erro visivel bloqueador;
- o escopo continuar dentro dos limites aprovados;
- o rollback estiver descrito;
- o resultado estiver registrado.

## Quando uma mudanca deve ser bloqueada

Uma mudanca deve ser bloqueada quando:

- `npm.cmd run primyo:gate` falhar;
- login admin falhar;
- login operador falhar;
- logout falhar;
- patio nao abrir quando obrigatorio;
- area administrativa deixar de abrir para admin;
- o operador receber acesso indevido a shell administrativa;
- a navegacao principal quebrar;
- nao houver evidencia suficiente para decidir com seguranca.

## Quando uma mudanca exige rollback

Uma mudanca exige rollback quando:

- altera comportamento critico e nao passa o pacote minimo de regressao;
- abre regressao em sessao, perfil, login, logout ou roteamento principal;
- quebra `npm.cmd run primyo:gate` apos ter sido aplicada;
- gera desvio fora do escopo aprovado e nao pode ser contida rapidamente;
- nao existe correcao pequena e segura dentro da mesma janela.

## Niveis de decisao

- `Pode avancar`: todos os gates verdes.
- `Aprovado com ressalva`: gates verdes, mas existe observacao nao bloqueadora documentada.
- `Bloqueado`: pelo menos um gate obrigatorio falhou.
- `Revertido`: a mudanca foi desfeita para restaurar a baseline esperada.

## Evidencia registrada nesta fase

Revalidacao inicial executada em `2026-06-19` para sustentar esta politica:

- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- `node --check app/main.js` -> sucesso
- `node --check scripts/sync-fipe-local-db.mjs` -> sucesso

Planejamento de automacao executado em `2026-06-23`:

- estrategia de automacao criada em `docs/primyo-tests/automation/AUTOMATED_TEST_STRATEGY.md`;
- decisao de ferramenta criada em `docs/primyo-tests/automation/TEST_TOOLING_DECISION.md`;
- primeira automacao futura definida em `docs/primyo-tests/automation/FIRST_AUTOMATION_SLICE.md`;
- desenho de gate criado em `docs/primyo-tests/automation/AUTOMATED_GATE_DESIGN.md`;
- roadmap manual para automatizado criado em `docs/primyo-tests/automation/MANUAL_TO_AUTOMATED_ROADMAP.md`;
- requisitos de teste para extracoes criados em `docs/primyo-tests/automation/EXTRACTION_TEST_REQUIREMENTS.md`.

Revalidacao tecnica executada em `2026-06-23` para fechar `LP-TEST-003`:

- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- `node --check app/main.js` -> sucesso
- `node --check scripts/sync-fipe-local-db.mjs` -> sucesso

Adocao do gate oficial executada em `2026-06-24` para fechar `LP-TEST-AUTO-001`:

- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Implementacao e closure do gate de adapters executadas em `2026-06-26` para absorver `LP-TEST-AUTO-003`:

- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## Resultado esperado do gate

Depois desta fase, nenhuma proxima fatia deve avancar apenas por percepcao manual solta.

Ela devera avancar por:

- checklist definido;
- matriz de impacto;
- evidencia registrada;
- decisao final objetiva.
