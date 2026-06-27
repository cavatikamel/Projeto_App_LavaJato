# Supply Rules

## 1. Objetivo

Registrar as regras oficiais do dominio `Supply` apos a consolidacao da fronteira entre insumo, produto e estoque.

## 2. Papel oficial de Supply

`Supply` representa item tecnico consumido por servico, preparo operacional ou manutencao interna.

Uso permitido:

- catalogo tecnico de insumos;
- apoio a perfis futuros de consumo por servico;
- apoio a custo operacional;
- apoio a controle futuro de estoque tecnico.

## 3. Campos e semantica

- `costPrice` e permitido como custo atual observado;
- `supplierName` e permitido como fornecedor principal;
- `stockBalance` pode existir como projecao de saldo;
- `minStock` pode existir como referencia operacional;
- `riskTags` e `compatibilityMetadata` podem existir como metadado tecnico;
- `salePrice` nao pertence ao shape padrao de primeiro nivel nesta fase.

## 4. Regras oficiais

1. insumo e item tecnico consumido por servico.
2. insumo pode ter custo unitario.
3. insumo pode ter fornecedor.
4. insumo nao deve ter `salePrice` por padrao.
5. insumo nao deve virar produto automaticamente.
6. relacao com servico deve ser futura, explicita e controlada.
7. consumo nao deve ocorrer sem evento rastreavel.
8. saldo observado continua sendo projecao e nao trilha auditavel.
9. insumo com uso historico deve preferir inativacao a exclusao.

## 5. O que Supply nao deve fazer sozinho

`Supply` nao deve:

- virar produto vendavel por proximidade de nome ou SKU;
- disparar baixa automatica ao ser referenciado em perfil de servico;
- substituir uma entidade futura de `StockMovement`;
- esconder relacionamento real com servico dentro de texto livre;
- apagar rastreabilidade tecnica quando fornecedor, risco ou compatibilidade mudarem.

## 6. Relacao com Service

`Supply` podera se relacionar com `Service` no futuro, mas sob estas regras:

- a relacao deve usar IDs canonicos;
- o vinculo deve ser explicito;
- o catalogo do insumo nao pode depender de nome do servico para existir;
- o perfil de consumo nao deve ser confundido com movimento real.

## 7. Relacao com Product

`Supply` e `Product` permanecem dominios distintos.

Mesmo quando houver intersecao operacional:

- nao ha conversao automatica;
- nao ha compartilhamento implicito de `salePrice`;
- nao ha baixa cruzada sem evento proprio.

## 8. Decisao oficial desta fase

O dominio `Supply` continua restrito a item tecnico de consumo, com custo e rastreabilidade futura separados do dominio comercial de `Product`.
