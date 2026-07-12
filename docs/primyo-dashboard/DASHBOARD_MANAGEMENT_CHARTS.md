# Dashboard Management Charts

## Origem dos dados confirmados

- `Faturamento`
  - origem principal: `cashEntries`
  - leitura: entradas confirmadas dentro do periodo ativo
- `Lucro estimado`
  - origem principal: `cashEntries` e `netAmount`
  - leitura: saldo estimado do periodo apos taxas e saidas registradas
- `Situacao do patio`
  - origem principal: `patioVehicles`
  - leitura: snapshot atual dos status operacionais
- graficos opcionais:
  - `Atendimentos por periodo` -> `patioVehicles`
  - `Servicos mais vendidos` -> `patioVehicles`
  - `Formas de pagamento` -> `cashEntries`
  - `Entradas x saidas` -> `cashEntries`

## Regras desta aceleracao

- nao inventar nova metrica
- nao abrir Supabase
- nao trocar bootstrap padrao
- nao exibir `NaN`, `undefined`, `null` ou `Invalid Date`
- limitar o dashboard principal ao que responde perguntas gerenciais imediatas

## Perguntas gerenciais cobertas

1. Quanto entrou no periodo?
2. Qual a estimativa liquida do periodo?
3. Quantos veiculos estao em cada etapa do patio?
4. Quais leituras secundarias o administrador quer manter visiveis?

## Escolhas visuais aprovadas

- `Faturamento`
  - tipo: linha / area
  - motivo: leitura temporal clara
- `Lucro estimado`
  - tipo: linha / area
  - motivo: mesma leitura temporal com comparacao liquida
- `Situacao do patio`
  - tipo: barra empilhada simples
  - motivo: leitura operacional instantanea
- `Servicos mais vendidos`
  - tipo: barras horizontais
- `Formas de pagamento`
  - tipo: donut simples
- `Entradas x saidas`
  - tipo: barras agrupadas

## Observacao de layout

O foco desta fase foi:

- organizar a area analitica
- estabilizar os spans dos cards
- deslocar o breakpoint de colapso do grid para preservar `1024px` como desktop util
