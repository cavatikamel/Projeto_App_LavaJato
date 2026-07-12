# Dashboard Visual Structure

## Estrutura desktop

```text
[ KPI ][ KPI ][ KPI ][ KPI ]

[ Faturamento            ][ Lucro estimado ]

[ Situacao do patio                           ]

[ Graficos opcionais conforme escolha do administrador ]
```

## Estrutura mobile

```text
[ KPI ]
[ KPI ]
[ KPI ]
[ KPI ]

[ Faturamento ]
[ Lucro estimado ]
[ Situacao do patio ]
[ Opcionais, um por linha ]
```

## Regras aplicadas

- grid analitico principal em 2 colunas no desktop util
- cards com `height: 100%` e `min-width: 0`
- card de `Situacao do patio` ocupando linha inteira
- colapso para uma coluna apenas a partir de `960px`
- abaixo de `960px`, cards empilhados e sem overflow horizontal

## Leitura visual desejada

- primeiro: resultado financeiro
- segundo: rentabilidade estimada
- terceiro: situacao operacional do patio
- depois: exploracao opcional de graficos secundarios
