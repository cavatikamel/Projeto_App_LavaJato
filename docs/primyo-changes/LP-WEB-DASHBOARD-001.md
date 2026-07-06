# LP-WEB-DASHBOARD-001

- Change ID: LP-WEB-DASHBOARD-001
- Backlog ID: LP-WEB-DASHBOARD-001
- Titulo: Complete data mapping and responsive management charts
- Objetivo: auditar os dados reais do LavaPrime, definir metricas confiaveis e implementar um dashboard responsivo de gestao
- Motivo da mudanca: substituir leituras genricas da Visao Geral por KPIs e graficos rastreaveis, com base em dados existentes e sem abrir Supabase
- Area afetada: Web, Dashboard, Docs
- Arquivos afetados:
  - `app/main.js`
  - `app/styles.css`
  - `app/assets/brand/icone_carro.png`
  - `app/dashboard/dashboardMetrics.js`
  - `app/dashboard/dashboardMetrics.test.mjs`
  - `docs/primyo-dashboard/*`
  - `docs/primyo-adequation/*`
  - `docs/primyo-tests/*`
- Risco: Medio
- Dependencias: `patioVehicles`, `cashEntries`, `openPayments`, `serviceCatalog`, `productCatalog`, `supplyCatalog`
- Data: 2026-07-05

## Escopo

- corrigir continuidade visual entre splash e login
- manter login sem scroll vertical desnecessario
- ampliar Agendamentos com calendario dominante, filtros e acoes
- restaurar icone de carro do patio
- simplificar cuidados especiais em lista compacta com selecao multipla
- implementar camada de metricas reutilizavel e graficos responsivos na Visao Geral

## Fora de escopo

- Supabase
- Android
- `.gitignore`
- `app/assets/data/fipe-veiculos.*`
- mudanca de `DEMO_BOOTSTRAP` para default limpo
- push ou deploy automatico nesta fase

## Plano de implementacao

1. validar e ajustar login, splash, agenda e patio
2. mapear entidades reais usadas pela operacao
3. criar calculadores puros de metricas
4. renderizar KPIs e graficos responsivos no dashboard
5. documentar fontes, formulas, escolhas visuais e paridade mobile

## Plano de teste

- `node --check` dos modulos criticos
- `node --test app/dashboard/dashboardMetrics.test.mjs`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`
- smoke desktop:
  - login admin
  - Visao Geral
  - Agendamentos
  - Patio
  - Financeiro
  - Relatorios/documentos
  - logout
- smoke mobile:
  - validacao de viewport sem overflow horizontal nos breakpoints alvo

## Plano de rollback

1. remover import e uso de `app/dashboard/dashboardMetrics.js`
2. restaurar o bloco anterior da Visao Geral
3. reverter ajustes de agenda, login e cuidados especiais
4. reexecutar gate, build, verify e smoke principal

## Resultado da validacao

- `node --check app/main.js` aprovado
- `node --check app/demo/lavaprimeDemoData.js` aprovado
- `node --check app/demo/lavaprimeBootstrapMode.js` aprovado
- `node --check app/demo/lavaprimeCleanBootstrap.js` aprovado
- `node --check app/dashboard/dashboardMetrics.js` aprovado
- `node --check app/dashboard/dashboardMetrics.test.mjs` aprovado
- `node --test app/dashboard/dashboardMetrics.test.mjs` aprovado
- `node scripts/primyo-adapter-gate.mjs` aprovado
- `npm.cmd run primyo:gate` aprovado
- `npm.cmd run build` aprovado
- `npm.cmd run verify:build` aprovado
- smoke funcional aprovado para login, agenda, patio, cuidados especiais e dashboard responsivo
- observacao: warning de chunk acima de `500 kB` permanece nao bloqueante

## Resultado de npm.cmd run primyo:gate

- `SUCCESS`

## Decisao final

- fase concluida com dashboard responsivo, calendario ampliado, ajustes visuais de login/splash e patio restaurado
- mudanca pronta para deploy controlado sem abrir Supabase e sem alterar `DEMO_BOOTSTRAP` como modo padrao
