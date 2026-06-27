# Product Contract

## 1. Objetivo

Definir o contrato oficial de comunicacao do produto entre Web, Android, API e futuras integracoes.

O header comum `contractName`, `contractVersion` e `emittedAt` segue `CONTRACT_GUIDELINES.md`.

## 2. Identificador canonico

- `id`
- `organizationId`

Regra:

- `sku` e obrigatorio para o dominio, mas nao substitui `id`.

## 3. Campos obrigatorios

| Campo | Tipo | Papel |
| --- | --- | --- |
| `id` | string | identificador canonico do produto |
| `organizationId` | string | ownership de tenant |
| `sku` | string | identificador operacional unico |
| `name` | string | nome do produto |
| `unit` | string | unidade de medida |
| `salePrice` | money | preco de venda vigente |
| `isActive` | boolean | status do cadastro |
| `createdAt` | datetime | criacao do registro |
| `updatedAt` | datetime | ultima atualizacao |

## 4. Campos opcionais

| Campo | Tipo | Papel |
| --- | --- | --- |
| `costPrice` | money | custo vigente |
| `stockBalance` | number | saldo atual observado |
| `minStock` | number | estoque minimo |
| `category` | string | agrupamento operacional |
| `barcode` | string | codigo auxiliar |
| `notes` | string | observacoes |
| `legacyRefs` | object | referencias transitivas do legado |

## 5. Relacionamentos

- `Product` -> `Attendance`: N:N por uso ou venda no atendimento
- `Product` -> `Payment`: 1:N por vendas e reflexos financeiros
- `Product` -> `Financial`: 1:N por line items, cash entries e documentos

## 6. Regras obrigatorias

1. `sku` deve ser unico por `organizationId`.
2. `stockBalance` e estado atual util, mas nao substitui trilha de `inventory_movements`.
3. venda avulsa e venda vinculada a atendimento devem apontar para o mesmo produto canonico.
4. alteracao de preco ou custo nao pode reescrever silenciosamente historico de eventos passados.
5. produto com venda, documento ou movimento historico deve preferir inativacao a exclusao.

## 7. Campos nao autoritativos

Nao definem o registro oficial:

- rascunhos de venda;
- filtros e ordenacao do estoque;
- estados visuais do dialogo de baixa;
- calculos temporarios de checkout.

## 8. Decisao desta fase

`Product` passa a ser o contrato mestre dos itens vendaveis, com SKU estavel, ownership claro e dependencia explicita de trilha auditavel de estoque.

## 9. Observacao apos LP-DATA-006

- `Product` continua separado de `Supply`.
- `supplier` continua fora do primeiro nivel do contrato e deve permanecer em `legacyRefs` enquanto nao houver ownership proprio aprovado.
- `stockBalance` continua sendo projecao observada, nao movimento auditavel.
- consumo por servico e movimentacao de estoque continuam fora do ownership deste contrato isoladamente.
