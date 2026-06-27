# LP-DATA-006-CLOSURE

## Objetivo da fase

Definir a fronteira oficial entre produto, insumo, estoque, movimentacao de estoque e consumo por servico no LavaPrime antes de qualquer integracao funcional, runtime ou Supabase.

## Documentos criados

- `docs/primyo-data/product-supply-stock/PRODUCT_SUPPLY_STOCK_BOUNDARY.md`
- `docs/primyo-data/product-supply-stock/PRODUCT_RULES.md`
- `docs/primyo-data/product-supply-stock/SUPPLY_RULES.md`
- `docs/primyo-data/product-supply-stock/STOCK_MOVEMENT_RULES.md`
- `docs/primyo-data/product-supply-stock/SERVICE_CONSUMPTION_RULES.md`
- `docs/primyo-data/product-supply-stock/RISKS_AND_DECISIONS.md`
- `docs/primyo-changes/LP-DATA-006.md`
- `docs/primyo-changes/LP-DATA-006-CLOSURE.md`

## Documentos atualizados

- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-data/contracts/PRODUCT_CONTRACT.md`
- `docs/primyo-data/contracts/SUPPLY_CONTRACT.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`

## Decisoes registradas

- `Product` e `Supply` continuam separados.
- `stockBalance` continua como projecao observada.
- `StockMovement` continua sem implementacao.
- consumo por servico continua sem automacao.
- adapters continuam fora do runtime.
- Supabase continua fechado.

## Riscos

- confundir produto vendavel com insumo tecnico;
- usar `stockBalance` como verdade oficial;
- baixar estoque sem trilha auditavel;
- reescrever preco ou custo historico;
- resolver cedo demais os vinculos entre servico e insumo;
- abrir Supabase antes da fronteira estabilizar.

## Rollback

1. Remover `docs/primyo-data/product-supply-stock/`.
2. Reverter `docs/primyo-changes/LP-DATA-006.md` e esta closure.
3. Reverter backlog, change control, next slice e observacoes contratuais da fase.
4. Reexecutar `npm.cmd run primyo:gate`.

## Aceite tecnico

- fase documental concluida;
- fronteira produto/insumo/estoque registrada;
- nenhuma implementacao funcional iniciada;
- nenhum adapter, script ou arquivo de runtime alterado;
- `npm.cmd run primyo:gate` mantido como evidencia obrigatoria.

## Confirmacao final

Nenhuma implementacao funcional foi iniciada nesta fase.
