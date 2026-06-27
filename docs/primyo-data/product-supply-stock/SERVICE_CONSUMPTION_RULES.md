# Service Consumption Rules

## 1. Objetivo

Definir as regras oficiais para o futuro consumo de insumos por servico sem automatizar nada nesta fase.

## 2. Conceito oficial

Servico pode ter perfil de consumo.

Consumo por servico, porem, so passa a existir oficialmente quando houver evento rastreavel que ligue:

- servico;
- atendimento ou contexto operacional;
- insumo;
- quantidade;
- motivo;
- timestamp;
- actor quando disponivel.

## 3. Regras oficiais

1. servico pode ter perfil de consumo.
2. perfil de consumo nao deve baixar estoque sozinho.
3. consumo deve ser calculavel, revisavel e auditavel.
4. relacao `service -> supplies` deve ser explicita.
5. o vinculo deve preservar historico mesmo se o insumo mudar depois.
6. `serviceSupplyProfiles` nao deve ser resolvido automaticamente nesta fase.
7. nome de servico nao deve sustentar relacionamento critico de consumo.
8. consumo tecnico nao deve ser confundido com venda de produto.

## 4. Snapshot e historico

Quando consumo por servico existir de forma oficial no futuro, ele devera preservar:

- qual servico originou o consumo;
- qual insumo foi referenciado no momento;
- qual quantidade foi calculada ou confirmada;
- qual regra ou perfil originou o evento;
- qual snapshot tecnico foi usado se o cadastro mestre mudar depois.

## 5. O que esta fase nao autoriza

Esta fase nao autoriza:

- baixa automatica por perfil;
- resolucao de `serviceSupplyProfiles` por adapter;
- integracao com runtime;
- ligacao funcional entre `serviceAdapter` e `supplyAdapter`;
- alteracao de estoque real.

## 6. Implicacoes futuras

Antes de qualquer automacao real, o programa ainda precisara:

- resolver IDs canonicos entre servico e insumo;
- definir ownership do evento de consumo;
- escolher onde o snapshot de consumo sera persistido;
- separar evento previsto, evento executado e ajuste posterior.

## 7. Decisao oficial desta fase

Consumo por servico continua apenas como relacao futura controlada, explicitamente separado de catalogo, saldo observado e baixa automatica.
