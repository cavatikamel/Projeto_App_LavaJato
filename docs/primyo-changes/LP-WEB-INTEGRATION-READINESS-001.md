# LP-WEB-INTEGRATION-READINESS-001

## Objetivo

Avaliar readiness de runtime para a futura integracao de adapters e do `idResolver` ao LavaPrime Web, sem iniciar implementacao funcional.

## Escopo

- leitura tecnica dos cinco adapters puros;
- leitura do `idResolver`;
- leitura do Adapter Gate, contratos e baseline;
- comparacao de candidatos de integracao;
- definicao de riscos, rollback, smoke futuro e primeira fatia recomendada.

## Arquivos criados

- `docs/primyo-web-integration/INTEGRATION_READINESS_ASSESSMENT.md`
- `docs/primyo-web-integration/FIRST_RUNTIME_INTEGRATION_CANDIDATES.md`
- `docs/primyo-web-integration/INTEGRATION_RISK_MATRIX.md`
- `docs/primyo-web-integration/INTEGRATION_ROLLBACK_PLAN.md`
- `docs/primyo-web-integration/INTEGRATION_SMOKE_TEST_PLAN.md`
- `docs/primyo-web-integration/RECOMMENDED_FIRST_SLICE.md`

## Decisao principal

A primeira integracao futura recomendada passa a ser:

- `LP-WEB-INTEGRATION-001`
- `customerAdapter` em leitura/sombra

Decisoes associadas:

- `idResolver` nao deve entrar no runtime no primeiro slice;
- veiculo, servico, produto e insumo foram rejeitados como primeira integracao;
- Supabase continua fechado.

## Riscos principais

- tocar `app/main.js` cedo demais;
- introduzir dependencia funcional de `legacyRefs`;
- misturar ownership cross-domain na primeira entrada;
- confundir `stockBalance` com verdade auditavel;
- abrir `idResolver` no runtime antes de um caso unico e controlado.

## Rollback esperado

O rollback futuro deve:

1. remover o uso do adapter em `app/main.js`;
2. restaurar o caminho legado;
3. reexecutar `npm.cmd run primyo:gate`;
4. reexecutar smoke manual do dominio tocado.

## Validacao desta fase

Fase documental:

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Fora de escopo

- integracao funcional;
- alteracao de `app/main.js`;
- alteracao de adapters;
- alteracao de `idResolver`;
- alteracao de scripts;
- Supabase;
- banco;
- Android;
- CSS/UI;
- dependencias.
