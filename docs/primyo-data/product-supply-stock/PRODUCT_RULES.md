# Product Rules

## 1. Objetivo

Registrar as regras oficiais do dominio `Product` apos a consolidacao da fronteira entre produto, insumo e estoque.

## 2. Papel oficial de Product

`Product` representa item vendavel ou catalogo comercial.

Uso permitido:

- venda avulsa;
- venda vinculada a atendimento;
- catalogo de itens comerciais;
- exibicao em relatorios comerciais e financeiros.

## 3. Campos e semantica

- `salePrice` e permitido como preco comercial vigente;
- `costPrice` e permitido como custo atual observado;
- `sku` pode existir como identificador operacional;
- `stockBalance` pode existir como projecao de saldo;
- `category`, `barcode` e `notes` podem existir quando presentes no contrato;
- fornecedor nao e ownership de primeiro nivel do contrato `Product` nesta fase.

## 4. Regras oficiais

1. produto pode ser item vendavel ou catalogo comercial.
2. produto pode ter preco de venda.
3. produto pode ter custo.
4. produto pode ter SKU.
5. produto nao deve gerar consumo automatico por servico nesta fase.
6. supplier nao e campo principal de `Product` quando o contrato atual nao o autoriza.
7. `stockBalance` e projecao observada, nao historico auditavel.
8. alteracao de preco nao deve reescrever historico financeiro ja emitido.
9. alteracao de custo nao deve reescrever custo historico de evento ja fechado.
10. produto com uso historico deve preferir inativacao a exclusao.

## 5. O que Product nao deve fazer sozinho

`Product` nao deve:

- representar insumo tecnico por padrao;
- disparar baixa de estoque sem evento rastreavel;
- substituir uma entidade futura de `StockMovement`;
- carregar semantica de consumo por servico apenas por estar no atendimento;
- misturar historico financeiro com preco atual do catalogo.

## 6. Relacao com estoque

Enquanto nao existir trilha oficial de movimentos:

- saldo observado pode seguir sendo usado como indicador operacional;
- saldo observado nao deve ser promovido a verdade auditavel;
- qualquer conciliacao futura devera nascer de movimentos, nao de recalculo cego por catalogo.

## 7. Relacao com Supply

`Product` e `Supply` continuam separados.

Mesmo quando o mesmo item parecer existir nos dois dominios:

- a duplicidade deve ser tratada como decisao futura de catalogo;
- nao ha conversao automatica entre os contratos;
- nao ha heranca implicita entre venda e consumo tecnico.

## 8. Decisao oficial desta fase

O dominio `Product` continua limitado ao catalogo e a venda, sem absorver automaticamente responsabilidade por insumo tecnico, baixa de estoque auditavel ou consumo por servico.
