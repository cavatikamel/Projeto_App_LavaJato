# LavaPrime First Automation Slice

## Objetivo

Definir a primeira automacao futura permitida para o LavaPrime, sem implementa-la nesta fase.

## Fatia recomendada

Primeira automacao futura recomendada:

`LP-TEST-AUTO-001`: gate tecnico local em Node sem dependencias novas.

## Escopo futuro permitido

Quando esta fatia for formalmente autorizada, ela podera:

- criar um script Node simples para orquestrar comandos existentes;
- executar os quatro comandos obrigatorios de validacao;
- registrar status, data, duracao e resultado;
- apontar onde registrar smoke manual;
- falhar com codigo diferente de zero se um comando obrigatorio falhar;
- gerar um relatorio local simples.

## Comandos a consolidar

- `npm.cmd run build`
- `npm.cmd run verify:build`
- `node --check app/main.js`
- `node --check scripts/sync-fipe-local-db.mjs`

## Arquivos futuros possiveis

Opcoes a avaliar somente na fase de implementacao:

- `scripts/primyo-technical-gate.mjs`
- `docs/primyo-tests/executions/YYYY-MM-DD-LP-TEST-AUTO-001.md`

Nenhum desses arquivos deve ser criado em `LP-TEST-003`.

## Fora de escopo

Nao entra na primeira automacao:

- Playwright;
- Vitest;
- Cypress;
- testes de navegador;
- mock de autenticacao;
- Supabase;
- Android;
- banco de dados;
- alteracao em `package.json`;
- pipeline de CI/CD.

## Criterios de entrada

Antes de implementar a primeira automacao futura, devem existir:

- aprovacao explicita de uma nova fatia;
- escopo de arquivos permitido;
- rollback descrito;
- baseline de comandos confirmada;
- decisao se o script sera chamado manualmente ou por comando npm existente.

## Criterios de aceite futuro

A fatia futura so deve ser aceita se:

- nao instalar dependencias;
- nao alterar comportamento do produto;
- executar os comandos obrigatorios na ordem definida;
- registrar resultado claro;
- falhar quando qualquer comando falhar;
- preservar smoke manual como obrigatorio;
- possuir rollback simples.

## Plano de rollback futuro

Rollback esperado:

- remover o script criado;
- remover ou arquivar relatorio gerado se necessario;
- voltar a executar os quatro comandos manualmente;
- manter `TEST_GATE_POLICY.md` como fonte oficial.

## Decisao desta fase

A fatia foi planejada, mas nao implementada.
