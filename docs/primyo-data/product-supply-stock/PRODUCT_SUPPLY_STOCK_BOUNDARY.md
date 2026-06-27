# Product Supply Stock Boundary

## 1. Objetivo

Definir a fronteira oficial entre `Product`, `Supply`, estoque, movimentacao de estoque e consumo por servico no LavaPrime antes de qualquer integracao funcional, runtime ou Supabase.

## 2. Definicoes oficiais

### 2.1 Product

`Product` e o item vendavel ou de catalogo comercial.

Ele pode:

- existir para venda avulsa;
- existir para venda vinculada a atendimento;
- possuir `salePrice`, `costPrice`, `sku` e saldo observado;
- aparecer em relatorios comerciais e financeiros.

Ele nao deve:

- virar automaticamente insumo tecnico;
- gerar consumo automatico por servico;
- carregar sozinho a semantica de movimentacao auditavel de estoque.

### 2.2 Supply

`Supply` e o item tecnico consumivel por servico ou operacao.

Ele pode:

- possuir `costPrice`;
- possuir fornecedor;
- carregar metadados tecnicos e de compatibilidade;
- ter saldo observado e estoque minimo.

Ele nao deve:

- ser tratado como produto vendavel por padrao;
- ganhar `salePrice` como campo de primeiro nivel sem fase propria;
- virar `Product` automaticamente por compartilhar nome, SKU ou categoria.

### 2.3 Stock

`Stock` e o estado observado de disponibilidade de um item controlado.

Nesta fase:

- `stockBalance` continua sendo projecao observada;
- saldo observado pode existir em `Product` e `Supply`;
- saldo observado nao substitui trilha auditavel.

### 2.4 Stock Movement

`StockMovement` e o evento futuro que explicara por que um saldo mudou.

Ele ainda nao existe como implementacao oficial nesta fase.

Quando existir, devera representar:

- entrada;
- saida por venda;
- consumo por servico;
- ajuste;
- perda;
- devolucao.

### 2.5 Service Consumption

`ServiceConsumption` e o uso calculado e rastreavel de insumos por servico executado.

Ele nao deve nascer apenas do catalogo do servico nem de saldo observado.

## 3. O que nao deve ser misturado

As seguintes fronteiras passam a ser obrigatorias:

1. `Product` nao e `Supply`.
2. saldo observado nao e historico auditavel.
3. perfil de consumo nao e movimento de estoque.
4. custo atual nao e snapshot historico de evento passado.
5. venda de produto nao e consumo tecnico de insumo.
6. ajuste manual futuro nao podera apagar a trilha de venda, consumo ou perda.

## 4. Relacao futura com adapters

Estado atual:

- `productAdapter` e `supplyAdapter` continuam puros e fora do runtime;
- nenhum adapter pode gerar baixa de estoque, consumo automatico ou integracao funcional nesta fase.

Diretriz:

- adapters continuarao convertendo shape legado para contrato;
- ownership de estoque e consumo nao sera escondido dentro de adapter;
- qualquer adapter futuro que toque estoque devera diferenciar saldo observado de movimento auditavel.

## 5. Relacao futura com Supabase

Supabase continua fechado nesta fase.

Quando a integracao for aberta:

- `Product` e `Supply` deverao persistir em contratos separados;
- `StockMovement` devera nascer como trilha propria, nao como simples campo derivado;
- consumo por servico devera apontar para IDs canonicos e manter historico;
- snapshots financeiros e operacionais nao poderao ser reescritos por mudancas futuras de preco, custo ou catalogo.

## 6. Relacao futura com relatorios

Relatorios futuros deverao diferenciar:

- venda de produto;
- custo de insumo;
- consumo tecnico por servico;
- saldo observado;
- movimento auditavel;
- ajuste e perda.

Conclusao:

- relatorio comercial nao substitui relatorio de estoque;
- relatorio de estoque nao substitui relatorio financeiro;
- relatorio de consumo por servico nao substitui o catalogo mestre de insumos.

## 7. Decisao oficial desta fase

O LavaPrime passa a adotar formalmente a seguinte fronteira:

- `Product` representa item vendavel e catalogo comercial;
- `Supply` representa item tecnico consumivel;
- `stockBalance` representa apenas estado observado;
- `StockMovement` continua apenas como modelo futuro, ainda sem implementacao;
- `ServiceConsumption` continua conceitualmente separado de catalogo, saldo observado e venda;
- nenhuma baixa automatica, integracao funcional ou abertura de Supabase e autorizada por esta fase.
