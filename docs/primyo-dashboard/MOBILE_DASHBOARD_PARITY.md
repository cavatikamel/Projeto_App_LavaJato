# Mobile Dashboard Parity

## Objetivo

Definir paridade conceitual entre Web e Android sem alterar `LavaPrimeAndroidApp/**`.

## Metricas compartilhaveis

- `revenue_confirmed`
- `ticket_average`
- `attendances_total`
- `active_patio`
- `receivables_open`
- `net_cash`
- `top_services`
- `payment_methods_distribution`
- `cashflow_breakdown`
- `patio_status`

## Formula

- a formula deve ser compartilhada por significado, nao por componente visual
- o modulo `app/dashboard/dashboardMetrics.js` passa a ser a referencia conceitual do Web
- Android futuro deve reaproveitar:
  - mesmo periodo
  - mesma regra de filtro
  - mesma limpeza de valores invalidos
  - mesmo empty state sem `NaN`

## Ordem mobile recomendada

1. Receita confirmada
2. Ticket medio
3. Patio atual
4. Recebiveis em aberto, se confiavel
5. Faturamento
6. Lucro estimado
7. Situacao do patio
8. Graficos opcionais apenas quando habilitados pelo administrador

## Diferencas permitidas no Android

- pode usar cards e composicoes nativas diferentes
- pode reduzir densidade de legenda
- pode esconder graficos secundarios atras de acordeon
- pode trocar donut por lista resumida quando o espaco for curto

## Graficos omitidos ou resumidos em mobile

- `Status do patio`
  - pode virar bloco resumido por chips
- `Entradas x saidas`
  - pode usar barras mais baixas e menos labels
- `Formas de pagamento`
  - no mobile compacto, limitar visualizacao aos 4 maiores metodos

## Breakpoints validados nesta fase

- `360px`
- `390px`
- `480px`
- `768px`
- `1024px` como desktop util de homologacao

## Restricoes permanentes

- um grafico por coluna em viewport pequeno
- sem overflow horizontal
- sem legenda larga quebrando layout
- sem tabela horizontal como bloco principal
- `Faturamento` e `Lucro estimado` permanecem como prioridade visual da fase acelerada
