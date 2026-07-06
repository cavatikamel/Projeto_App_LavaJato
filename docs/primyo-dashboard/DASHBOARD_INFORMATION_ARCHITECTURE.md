# Dashboard Information Architecture

## Desktop

### Faixa superior

- 12 KPIs operacionais em cards compactos:
  - Receita confirmada
  - Ticket medio
  - Atendimentos
  - Patio atual
  - Contas a receber
  - Resultado liquido
  - Receita prevista
  - Faturado aberto
  - Com cuidado especial
  - Alertas confirmados
  - Alertas de estoque
  - Servicos sem ficha

### Faixa intermediaria

- fluxo do patio por status
- prioridades e alertas clicaveis
- manutencao / lembretes operacionais

### Faixa analitica

- filtro temporal global:
  - `Hoje`
  - `7 dias`
  - `30 dias`
  - `Mes atual`
- graficos responsivos:
  - Evolucao da receita
  - Entradas x saidas
  - Atendimentos por periodo
  - Status do patio
  - Servicos mais vendidos
  - Formas de pagamento

## Comportamento sem dados

- KPI: volta para `0` ou `R$ 0,00`
- grafico: exibe `Ainda nao ha dados suficientes para este periodo.`
- periodo invalido: series sao zeradas, sem `NaN`, `null` ou `Invalid Date`

## Acessibilidade

- cada grafico exposto com `role="img"` e texto auxiliar visivel
- legenda textual para status e donut
- sem dependencia exclusiva de cor

## Drilldown suportado agora

- alertas de prioridade levam para:
  - Agendamentos
  - Patio
  - Recebimentos
  - Servicos
- o dashboard ainda nao abre drilldown por clique em serie de grafico
