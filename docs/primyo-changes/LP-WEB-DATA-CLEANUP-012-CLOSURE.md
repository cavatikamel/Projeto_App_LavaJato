# LP-WEB-DATA-CLEANUP-012-CLOSURE

## Objetivo da fase

Transformar os bloqueios restantes do `CLEAN_BOOTSTRAP` em um plano objetivo de pre-requisitos para futura ativacao, sem promover o modo limpo a `default`, sem remover massa demo e sem abrir Supabase.

## Plano criado

- criacao de `CLEAN_BOOTSTRAP_ACTIVATION_PREREQUISITES.md` como plano oficial de ativacao futura;
- consolidacao dos pre-requisitos, criterios de aceite, criterios de bloqueio, sequencia futura, riscos e rollback;
- propagacao do estado oficial para cleanup plan, backlog, change control, next slice e politicas de teste.

## Pre-requisitos definidos

1. base limpa com dados minimos reais ou seed institucional controlada;
2. relacionamentos persistidos entre cliente, veiculo, atendimento, faturamento, pagamentos e documentos;
3. contratos das entidades confirmados;
4. smoke do modo limpo em cenarios vazio, parcial e completo;
5. dashboards validados com dados vazios, parciais e completos;
6. relatorios e documentos validados com dados vazios, parciais e completos;
7. criterio claro para manter, restringir ou desligar a seed demo;
8. plano de ativacao gradual;
9. plano de rollback;
10. gates e builds aprovados;
11. decisao formal documentada antes de qualquer promocao;
12. Supabase explicitamente decidido como fechado, planejado ou ativado em fase propria;
13. Android explicitamente mantido em trilha propria, sem bloquear o Web.

## Criterios de aceite

- pre-requisitos criticos definidos;
- criterios verificaveis de entrada e saida;
- sequencia futura clara;
- `DEMO_BOOTSTRAP` mantido como unico padrao oficial;
- `CLEAN_BOOTSTRAP` mantido protegido;
- seed demo preservada;
- Supabase fechado.

## Criterios de bloqueio

- base limpa insuficiente;
- relacionamentos persistidos ausentes;
- dashboards, relatorios ou documentos sem validacao em cenarios vazio, parcial e completo;
- ausencia de plano de ativacao gradual;
- ausencia de rollback formal;
- tentativa de abrir Supabase ou promover `CLEAN_BOOTSTRAP` sem decisao formal.

## Sequencia futura recomendada

1. definir estrategia da base limpa futura;
2. estruturar relacionamentos minimos persistidos;
3. validar smoke do modo limpo em cenarios vazio, parcial e completo;
4. validar dashboards, relatorios e documentos;
5. executar trial controlado;
6. validar rollback;
7. decidir formalmente sobre eventual promocao.

## Documentos criados ou alterados

- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-012.md`
- `docs/primyo-changes/LP-WEB-DATA-CLEANUP-012-CLOSURE.md`
- `docs/primyo-web-integration/CLEAN_BOOTSTRAP_ACTIVATION_PREREQUISITES.md`
- `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## Modo padrao confirmado

- `DEMO_BOOTSTRAP` continua o modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao foi ativado como `default`.

## O que nao foi removido

- massa demo e seed demo;
- bootstrap demo atual;
- runtime atual;
- Supabase permanece fechado;
- trilha Android permanece fora do escopo.

## Validacoes executadas

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

## Resultado do smoke manual

- app abriu;
- login admin funcionou;
- dashboard carregou;
- patio carregou;
- documentos e relatorios nao quebraram;
- logout funcionou;
- operador acessou o patio;
- `DEMO_BOOTSTRAP` permaneceu padrao;
- `CLEAN_BOOTSTRAP` nao virou `default`;
- console sem erro bloqueante.

## Observacoes operacionais

- `npm.cmd run build` manteve apenas warning nao bloqueante de chunk acima de `500 kB`;
- o comportamento visual e funcional foi preservado;
- Supabase continua fechado;
- nenhum push foi executado.

## Riscos

- a base limpa futura continua indefinida;
- a dependencia comercial da seed demo continua ativa;
- a ausencia de relacionamentos persistidos reais ainda bloqueia a promocao do modo limpo.

## Rollback

1. remover `LP-WEB-DATA-CLEANUP-012` e `CLEAN_BOOTSTRAP_ACTIVATION_PREREQUISITES.md`;
2. reverter ajustes em cleanup plan, backlog, change control, next slice e politicas de teste;
3. reexecutar `primyo:gate`, `build`, `verify:build` e smoke reduzido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-013 - Institutional clean dataset strategy`
