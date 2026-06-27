# Stock Movement Rules

## 1. Objetivo

Definir as regras oficiais para a futura trilha de movimentacao de estoque do LavaPrime sem implementar qualquer comportamento nesta fase.

## 2. Principio central

Estoque oficial deve nascer de movimentacoes, nao de saldo observado isolado.

Regra:

- `stockBalance` continua sendo leitura operacional util;
- trilha auditavel futura deve ser reconstruivel a partir de eventos.

## 3. Tipos futuros de movimentacao

Os tipos futuros oficialmente previstos passam a ser:

1. `entry`
2. `sale_output`
3. `service_consumption`
4. `adjustment`
5. `loss`
6. `return`

## 4. Campos minimos futuros

Toda movimentacao futura devera carregar, no minimo:

- `organizationId`
- `itemId`
- `itemType`
- `quantity`
- `reason`
- `source`
- `timestamp`
- `actor`

Observacoes:

- `itemType` devera distinguir ao menos `product` e `supply`;
- `actor` pode ficar nulo quando nao houver identidade disponivel, mas o campo continua previsto;
- `source` devera apontar para a origem operacional ou administrativa do evento.

## 5. Regras oficiais

1. saldo observado nao e trilha auditavel.
2. nenhuma baixa futura devera existir sem motivo rastreavel.
3. ajuste manual nao podera apagar o evento anterior que gerou a divergencia.
4. venda, consumo tecnico, perda e devolucao devem continuar semanticamente distintos.
5. a mesma estrutura futura deve servir para `Product` e `Supply`, diferenciando-os por `itemType`.
6. snapshots financeiros e operacionais nao devem depender apenas de saldo recalculado.

## 6. O que esta fase nao autoriza

Esta fase nao autoriza:

- criar tabela;
- criar adapter de movimento;
- recalcular estoque real;
- integrar runtime;
- abrir Supabase;
- criar baixa automatica;
- criar rotina de ajuste.

## 7. Implicacoes futuras

Quando a trilha for implementada:

- relatorio de estoque devera nascer de movimentos;
- saldo observado podera virar cache, leitura derivada ou projecao;
- venda de produto e consumo de insumo precisarao gerar eventos distintos;
- diferenca entre estoque comercial e estoque tecnico devera continuar explicita.

## 8. Decisao oficial desta fase

`StockMovement` passa a ser entidade conceitual obrigatoria para o futuro do estoque do LavaPrime, mas segue sem implementacao nesta fase.
