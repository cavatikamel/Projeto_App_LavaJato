# Chart Selection Matrix

| Metrica | Pergunta | Grafico escolhido | Alternativas rejeitadas | Justificativa |
| --- | --- | --- | --- | --- |
| `revenue_confirmed` | como a receita evolui no tempo? | linha com area | donut, tabela seca | a pergunta e temporal e precisa mostrar tendencia |
| `cashflow_breakdown` | entradas e saidas por periodo | barras agrupadas | linha unica, donut | compara dois fluxos discretos no mesmo bucket |
| `attendances_total` por periodo | quantos atendimentos aconteceram por bucket? | colunas | linha, donut | contagem por periodo discreto funciona melhor em coluna |
| `active_patio` por status | como o patio esta distribuido agora? | barra empilhada + legenda | donut, tabela | mostra composicao atual sem perder leitura de status |
| `top_services` | quais servicos lideram vendas? | barras horizontais | donut, tabela | ranking e leitura de nomes longos ficam melhores na horizontal |
| `payment_methods_distribution` | como a receita confirmada se divide por metodo? | donut limitado a 5 + outros | linha, barras horizontais | poucas categorias e leitura composicional clara |
| `ticket_average` | qual o valor medio do periodo? | KPI | linha, donut | leitura imediata e numero principal |
| `receivables_open` | quanto ainda falta receber? | KPI | linha, barra | foto gerencial atual, nao tendencia confirmada |
| `net_cash` | saldo do periodo foi positivo ou negativo? | KPI | linha, barra empilhada | numero de leitura rapida para a dobra superior |

## Graficos rejeitados nesta fase

- `heatmap`
  - sem massa historica suficiente para horario x dia da semana confiavel
- `scatter`
  - nao ha pergunta gerencial principal pedindo correlacao nesta fatia
- `funnel`
  - pipeline comercial nao esta persistido com maturidade suficiente
- `novos x recorrentes`
  - historico atual nao sustenta calculo correto
- `estoque turnover`
  - depende de eventos historicos e ownership mais forte
