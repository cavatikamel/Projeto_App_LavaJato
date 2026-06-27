# LavaPrime Manual To Automated Roadmap

## Objetivo

Definir a evolucao gradual de validacoes manuais para automacao, sem criar scripts nesta fase.

## Etapa 1: Gate tecnico local

Objetivo:

- automatizar comandos obrigatorios de build, verify e sintaxe.

Escopo:

- Node simples;
- sem dependencias novas;
- sem browser;
- sem pipeline.

Criterio de conclusao:

- comando unico futuro executa o gate tecnico e registra resultado.

## Etapa 2: Checklist estruturado

Objetivo:

- reduzir variacao na execucao manual.

Escopo:

- template de execucao;
- vinculo com ID de backlog;
- resultado por fluxo.

Criterio de conclusao:

- toda mudanca com impacto funcional possui evidencia manual padronizada.

## Etapa 3: Smoke assistido

Objetivo:

- orientar manualmente a execucao dos fluxos obrigatorios.

Escopo:

- instrucoes geradas a partir da matriz de regressao;
- lista de casos obrigatorios por tipo de mudanca;
- registro de pendencias.

Criterio de conclusao:

- o executor recebe uma lista objetiva de fluxos para validar.

## Etapa 4: Smoke browser

Objetivo:

- automatizar parte dos fluxos no navegador.

Escopo futuro possivel:

- Playwright;
- login demo/local;
- logout;
- patio;
- area administrativa;
- navegacao principal;
- captura de evidencias.

Criterio de entrada:

- aprovacao explicita para dependencia nova;
- ambiente local estabilizado;
- seletores confiaveis;
- dados de teste conhecidos.

## Etapa 5: Testes de unidade

Objetivo:

- proteger helpers puros e boundaries extraidos.

Escopo futuro possivel:

- Vitest;
- `sessionBoundary`;
- `accessBoundary`;
- policy helpers;
- formatadores;
- validadores.

Criterio de entrada:

- codigo extraido com contratos claros;
- baixo acoplamento com DOM;
- ausencia de dependencia direta de estado global mutavel.

## Etapa 6: Testes E2E criticos

Objetivo:

- proteger jornadas de maior risco operacional e financeiro.

Escopo futuro possivel:

- login administrador;
- login operador;
- atendimento no patio;
- pagamento;
- financeiro;
- documentos;
- configuracoes criticas.

Criterio de entrada:

- dados de teste controlados;
- estrategia de reset;
- rollback definido;
- ambiente de teste separado de producao.

## Sequencia recomendada

1. Gate tecnico local.
2. Checklist estruturado.
3. Smoke assistido.
4. Smoke browser.
5. Testes de unidade.
6. Testes E2E criticos.

## Decisao desta fase

O roadmap foi criado para orientar futuras fatias.

Nenhuma etapa foi implementada em `LP-TEST-003`.
