# First Runtime Integration Candidates

## 1. Objetivo

Comparar os candidatos possiveis para a primeira integracao real ao runtime.

## 2. Comparativo resumido

| Candidato | Risco | Impacto | Dependencias | Rollback | Valor tecnico | Valor funcional |
| --- | --- | --- | --- | --- | --- | --- |
| `customerAdapter` | Medio | Baixo/Medio | contexto, leitura de cliente, sem resolver | Simples | Alto | Medio |
| `vehicleAdapter` | Medio/Alto | Medio | ownership de cliente, placa, historico | Simples/Medio | Alto | Medio |
| `serviceAdapter` | Medio/Alto | Medio | `serviceCode`, duracao, perfis de insumo ainda pendentes | Simples/Medio | Medio/Alto | Medio |
| `productAdapter` | Alto | Alto | estoque observado, preco, SKU, relatorios | Medio | Medio | Alto |
| `supplyAdapter` | Alto | Alto | consumo por servico, estoque, fornecedor | Medio | Medio | Medio |
| `idResolver` | Alto | Alto | relacoes cross-domain reais, ambiguidade controlada | Medio | Alto | Baixo no primeiro slice |

## 3. Analise por candidato

### 3.1 `customerAdapter`

Pontos fortes:

- dominio ja estabilizado como primeiro adapter da trilha;
- menor dependencia relacional imediata;
- leitura de cliente pode acontecer sem acionar estoque, financeiro ou ownership tecnico;
- modo sombra e facil de desligar.

Pontos fracos:

- ainda existe legado paralelo entre operacao e faturamento;
- `vehicleIds` continuam dependendo de resolucao externa.

Decisao:

- melhor candidato para a primeira integracao.

### 3.2 `vehicleAdapter`

Pontos fortes:

- ownership de veiculo e tema central do runtime;
- valor tecnico relevante para preparar atendimento.

Pontos fracos:

- depende de `currentCustomerId` transitorio;
- placa ainda aparece como pista forte no legado;
- historico de ownership nao esta maduro.

Decisao:

- rejeitado como primeira fatia.

### 3.3 `serviceAdapter`

Pontos fortes:

- prepara o dominio para relacao futura com atendimento e insumos;
- possui validacoes boas de nome, `serviceCode` e duracao.

Pontos fracos:

- `supplyProfileRefs` ainda nao pode virar relacao funcional;
- qualquer erro aqui contamina servico, atendimento e estoque futuro.

Decisao:

- rejeitado como primeira fatia.

### 3.4 `productAdapter`

Pontos fortes:

- dominio comercial relevante;
- shape relativamente consistente.

Pontos fracos:

- aproxima a trilha de estoque, preco e relatorio comercial;
- `stockBalance` ainda e apenas projecao;
- qualquer integracao precoce pode ser confundida com verdade operacional.

Decisao:

- rejeitado como primeira fatia.

### 3.5 `supplyAdapter`

Pontos fortes:

- prepara consumo tecnico.

Pontos fracos:

- depende da fronteira entre insumo, servico e estoque;
- risco alto de confundir catalogo tecnico com consumo real.

Decisao:

- rejeitado como primeira fatia.

### 3.6 `idResolver`

Pontos fortes:

- modulo puro e ja endurecido por gate.

Pontos fracos:

- seu valor aparece quando ha relacoes reais;
- ligar cedo demais ao runtime eleva risco de ambiguidade, ownership incorreto e regressao de dados.

Decisao:

- deve permanecer fora do runtime na primeira fatia.

## 4. Ranking recomendado

1. `customerAdapter`
2. `vehicleAdapter`
3. `serviceAdapter`
4. `idResolver`
5. `productAdapter`
6. `supplyAdapter`

## 5. Decisao oficial

Primeiro candidato recomendado:

- `customerAdapter` em leitura controlada e modo sombra.
