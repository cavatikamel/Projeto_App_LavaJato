# LP-DATA-006

## Objetivo

Definir a fronteira oficial entre produto, insumo, estoque, movimentacao de estoque e consumo por servico no LavaPrime antes de qualquer integracao funcional, Supabase ou runtime.

## Tipo de fase

- `Documentation Phase`

## Arquivos criados

- `docs/primyo-data/product-supply-stock/PRODUCT_SUPPLY_STOCK_BOUNDARY.md`
- `docs/primyo-data/product-supply-stock/PRODUCT_RULES.md`
- `docs/primyo-data/product-supply-stock/SUPPLY_RULES.md`
- `docs/primyo-data/product-supply-stock/STOCK_MOVEMENT_RULES.md`
- `docs/primyo-data/product-supply-stock/SERVICE_CONSUMPTION_RULES.md`
- `docs/primyo-data/product-supply-stock/RISKS_AND_DECISIONS.md`
- `docs/primyo-changes/LP-DATA-006.md`

## Arquivos atualizados

- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-data/contracts/PRODUCT_CONTRACT.md`
- `docs/primyo-data/contracts/SUPPLY_CONTRACT.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`

## Decisoes consolidadas

- `Product` continua representando item vendavel e catalogo comercial;
- `Supply` continua representando item tecnico consumivel;
- `stockBalance` continua sendo projecao observada;
- `StockMovement` continua apenas como modelo futuro, sem implementacao;
- consumo por servico continua separado de perfil de catalogo e de baixa automatica;
- adapters continuam fora do runtime;
- Supabase continua fechado.

## Riscos

- confusao entre produto vendavel e insumo tecnico;
- uso de `stockBalance` como verdade oficial;
- baixa de estoque sem trilha auditavel;
- reescrita de preco ou custo historico;
- resolucao prematura de vinculos entre servico e insumo;
- abertura antecipada de Supabase antes da fronteira estabilizar.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Limitacoes

- nenhuma implementacao funcional foi iniciada;
- nenhum adapter foi alterado;
- nenhuma movimentacao de estoque foi criada;
- nenhum comportamento de runtime foi modificado.

## Rollback

1. remover a pasta `docs/primyo-data/product-supply-stock/`;
2. reverter este registro;
3. reverter backlog, change control, next slice e contratos anotados;
4. reexecutar `npm.cmd run primyo:gate`.
