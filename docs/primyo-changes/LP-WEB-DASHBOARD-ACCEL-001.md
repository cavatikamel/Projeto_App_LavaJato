# LP-WEB-DASHBOARD-ACCEL-001

## Objetivo

Ajustar a Visao Geral do LavaPrime Web para que os graficos gerenciais fiquem alinhados, responsivos e legiveis em `app/main.js` e `app/styles.css`, com publicacao controlada em `staging`.

## Auditoria executada

- arquivos revisados:
  - `app/main.js`
  - `app/styles.css`
  - `package.json`
- pontos confirmados:
  - a Visao Geral responsiva e renderizada por `renderResponsiveDashboardChartsV2(...)`
  - os dados principais continuam vindo de `cashEntries`, `patioVehicles` e `openPayments`
  - os graficos principais ativos sao `Faturamento`, `Lucro estimado` e `Situacao do patio`
  - os graficos opcionais continuam controlados pelo administrador
- problema observado:
  - o grid analitico estava caindo cedo demais para uma unica coluna
  - os cards longos ficavam desalinhados por falta de altura/min-width consistente
  - o `1024px` ainda se comportava como tablet por conta do breakpoint global de `1060px`

## Implementacao

### `app/main.js`

- removido `dashboard-chart-card--wide` de `Faturamento`
- removido `dashboard-chart-card--wide` de `Lucro estimado`
- promovido `Situacao do patio` para `dashboard-chart-card--full-row`
- mantida a logica atual de metricas, filtros e graficos opcionais

### `app/styles.css`

- grid principal reduzido de `3` para `2` colunas no desktop do bloco analitico
- adicionados `align-items: start`, `height: 100%` e `min-width: 0` nos cards de graficos
- ajustado o header interno do card para `align-items: stretch`
- criado `dashboard-chart-card--full-row`
- deslocado o colapso para uma coluna do grid analitico para `max-width: 960px`
- preservado o comportamento mobile de uma coluna abaixo de `960px`

## Resultado esperado

- desktop com dupla principal:
  - `Faturamento`
  - `Lucro estimado`
- linha dedicada:
  - `Situacao do patio`
- graficos opcionais continuam abaixo, controlados pelo administrador
- mobile continua empilhado sem overflow horizontal

## Validacoes previstas

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

## Smoke previsto

- login admin
- Visao Geral
- leitura de KPIs e graficos principais
- validacao responsiva em `1024px`, `768px`, `480px`, `390px` e `360px`
- checagem de ausencia de `NaN`, `undefined`, `null` e `Invalid Date`
- abertura de Patio, Financeiro e Documentos/Relatorios
- logout e login operador

## Publicacao autorizada da fase

- commit seletivo apenas dos arquivos permitidos
- push exclusivo com `git push origin HEAD:staging`
- sem alteracao em `main`
- sem deploy manual de producao
