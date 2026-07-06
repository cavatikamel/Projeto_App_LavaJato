# Metrics Definition

## Disponiveis agora

### `revenue_confirmed`

- `metricId`: `revenue_confirmed`
- `nome`: Receita confirmada
- `objetivo`: mostrar o faturamento confirmado no periodo selecionado
- `pergunta gerencial`: quanto entrou de receita validada no periodo?
- `entidade origem`: `cashEntries`
- `campos`: `date`, `time`, `value`, `status`
- `formula`: soma de `value > 0` apenas quando `status === "Confirmado"`
- `filtros`: periodo global
- `periodo`: `Hoje`, `7 dias`, `30 dias`, `Mes atual`
- `agrupamento`: hora para hoje, dia para os demais
- `unidade`: BRL
- `formatacao`: moeda
- `emptyState`: `R$ 0,00`
- `qualidade`: `CONFIRMED`
- `disponibilidade`: implementada

### `attendances_total`

- `metricId`: `attendances_total`
- `nome`: Atendimentos no periodo
- `objetivo`: mostrar o volume operacional real
- `pergunta gerencial`: quantos atendimentos nao cancelados existiram no periodo?
- `entidade origem`: `patioVehicles`
- `campos`: `status`, `scheduledDate`, `finishedDate`, `date`
- `formula`: contagem de atendimentos com data no periodo e `status !== "cancelado"`
- `filtros`: periodo global
- `periodo`: global
- `agrupamento`: hora ou dia
- `unidade`: quantidade
- `formatacao`: inteiro
- `emptyState`: `0`
- `qualidade`: `CONFIRMED`
- `disponibilidade`: implementada

### `active_patio`

- `metricId`: `active_patio`
- `nome`: Patio atual
- `objetivo`: mostrar a carga atual da operacao
- `pergunta gerencial`: quantos veiculos estao ativos agora no patio?
- `entidade origem`: `patioVehicles`
- `campos`: `status`
- `formula`: contagem de `status in [agendado, aguardando, lavando, pronto]`
- `filtros`: sem filtro temporal adicional
- `periodo`: instantaneo
- `agrupamento`: nenhum
- `unidade`: quantidade
- `formatacao`: inteiro
- `emptyState`: `0`
- `qualidade`: `CONFIRMED`
- `disponibilidade`: implementada

### `receivables_open`

- `metricId`: `receivables_open`
- `nome`: Contas a receber
- `objetivo`: mostrar pressao financeira de recebimentos ainda abertos
- `pergunta gerencial`: quanto ainda falta receber?
- `entidade origem`: `openPayments`
- `campos`: `value`, `status`
- `formula`: soma de `value` para registros com `status !== "Baixado"`
- `filtros`: sem filtro por periodo no KPI atual
- `periodo`: foto atual
- `agrupamento`: nenhum
- `unidade`: BRL
- `formatacao`: moeda
- `emptyState`: `R$ 0,00`
- `qualidade`: `CONFIRMED`
- `disponibilidade`: implementada

### `payment_methods_distribution`

- `metricId`: `payment_methods_distribution`
- `nome`: Formas de pagamento
- `objetivo`: mostrar a composicao da receita confirmada
- `pergunta gerencial`: quais meios de pagamento sustentam a receita do periodo?
- `entidade origem`: `cashEntries`
- `campos`: `value`, `status`, `method`
- `formula`: soma confirmada por metodo, com colapso de excesso em `Outros`
- `filtros`: periodo global
- `periodo`: global
- `agrupamento`: por metodo
- `unidade`: BRL
- `formatacao`: moeda
- `emptyState`: `Ainda nao ha dados suficientes para este periodo.`
- `qualidade`: `CONFIRMED`
- `disponibilidade`: implementada

## Disponiveis com calculo derivado

### `ticket_average`

- `metricId`: `ticket_average`
- `nome`: Ticket medio
- `objetivo`: medir valor medio dos atendimentos com valor apurado
- `pergunta gerencial`: quanto cada atendimento valido gera em media?
- `entidade origem`: `patioVehicles`
- `campos`: `totalValue`, datas do atendimento
- `formula`: soma dos `totalValue > 0` / quantidade de atendimentos com valor
- `filtros`: periodo global
- `periodo`: global
- `agrupamento`: nenhum
- `unidade`: BRL
- `formatacao`: moeda
- `emptyState`: `R$ 0,00`
- `qualidade`: `DERIVED`
- `disponibilidade`: implementada

### `net_cash`

- `metricId`: `net_cash`
- `nome`: Resultado liquido
- `objetivo`: medir saldo do fluxo de caixa do periodo
- `pergunta gerencial`: entradas menos saidas ficaram positivas ou negativas?
- `entidade origem`: `cashEntries`
- `campos`: `value`, `date`, `status`
- `formula`: soma de entradas positivas menos soma de saidas negativas absolutas
- `filtros`: periodo global
- `periodo`: global
- `agrupamento`: nenhum
- `unidade`: BRL
- `formatacao`: moeda
- `emptyState`: `R$ 0,00`
- `qualidade`: `DERIVED`
- `disponibilidade`: implementada

### `top_services`

- `metricId`: `top_services`
- `nome`: Servicos mais vendidos
- `objetivo`: priorizar mix operacional
- `pergunta gerencial`: quais servicos concentram mais vendas no periodo?
- `entidade origem`: `patioVehicles`
- `campos`: `service`, `services`, `totalValue`, datas
- `formula`: contagem por servico dentro do periodo, limitado aos 5 principais
- `filtros`: periodo global
- `periodo`: global
- `agrupamento`: servico
- `unidade`: quantidade
- `formatacao`: inteiro
- `emptyState`: `Ainda nao ha dados suficientes para este periodo.`
- `qualidade`: `DERIVED`
- `disponibilidade`: implementada

### `cashflow_breakdown`

- `metricId`: `cashflow_breakdown`
- `nome`: Entradas x saidas
- `objetivo`: comparar composicao de caixa no periodo
- `pergunta gerencial`: o periodo esta mais puxado por entradas ou por saidas?
- `entidade origem`: `cashEntries`
- `campos`: `value`, `date`, `time`
- `formula`: entradas positivas e saidas negativas por bucket temporal
- `filtros`: periodo global
- `periodo`: global
- `agrupamento`: hora ou dia
- `unidade`: BRL
- `formatacao`: moeda
- `emptyState`: `Ainda nao ha dados suficientes para este periodo.`
- `qualidade`: `DERIVED`
- `disponibilidade`: implementada

## Futuras

- `new_vs_recurring_customers`
  - depende de historico real e criterio oficial de recorrencia
  - qualidade atual: `FUTURE`
- `operator_productivity_series`
  - depende de data ownership mais estavel entre patio e operadores
  - qualidade atual: `PARTIAL`
- `stock_turnover`
  - depende de `inventoryMovements` confiavel e persistencia historica
  - qualidade atual: `FUTURE`
- `cash_session_balance`
  - depende de sessao de caixa formal
  - qualidade atual: `FUTURE`
- `document_emission_performance`
  - depende de historico documental mais consistente
  - qualidade atual: `PARTIAL`
- `supabase_multi_unit_metrics`
  - depende de backend real e sincronizacao futura
  - qualidade atual: `FUTURE`
