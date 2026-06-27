# Supply Contract

## 1. Objetivo

Definir o contrato oficial de comunicacao do insumo entre Web, Android, API e futuras integracoes.

O header comum `contractName`, `contractVersion` e `emittedAt` segue `CONTRACT_GUIDELINES.md`.

## 2. Identificador canonico

- `id`
- `organizationId`

Regra:

- `sku` e obrigatorio quando existir catalogo estruturado; o contrato continua canonico pelo `id`.

## 3. Campos obrigatorios

| Campo | Tipo | Papel |
| --- | --- | --- |
| `id` | string | identificador canonico do insumo |
| `organizationId` | string | ownership de tenant |
| `sku` | string | identificador operacional do insumo |
| `name` | string | nome do insumo |
| `unit` | string | unidade de medida |
| `costPrice` | money | custo vigente |
| `isActive` | boolean | status do cadastro |
| `createdAt` | datetime | criacao do registro |
| `updatedAt` | datetime | ultima atualizacao |

## 4. Campos opcionais

| Campo | Tipo | Papel |
| --- | --- | --- |
| `stockBalance` | number | saldo atual observado |
| `minStock` | number | estoque minimo |
| `supplierName` | string | fornecedor principal |
| `riskTags` | string[] | marcadores de risco tecnico |
| `compatibilityMetadata` | object | compatibilidades e restricoes tecnicas |
| `notes` | string | observacoes administrativas |
| `legacyRefs` | object | referencias transitivas do legado |

## 5. Relacionamentos

- `Supply` -> `Service`: N:N via perfis de consumo
- `Supply` -> `Attendance`: N:N por consumo operacional
- `Supply` -> `Financial`: 1:N por custo e trilha documental indireta

## 6. Regras obrigatorias

1. relacao entre servico e insumo deve ocorrer por IDs estaveis, nunca por nome.
2. `stockBalance` nao substitui historico de movimentos.
3. risco tecnico e compatibilidade precisam sobreviver a migracoes futuras.
4. ajuste manual de estoque nao pode apagar a trilha de consumo operacional.
5. insumo ja usado em servico, estoque ou relatorio deve preferir inativacao a exclusao.

## 7. Campos nao autoritativos

Nao definem ownership do contrato:

- busca local do catalogo;
- rascunhos de composicao tecnica;
- filtros e ordenacao de tela;
- calculos temporarios de consumo.

## 8. Decisao desta fase

`Supply` passa a ser o contrato mestre dos materiais de consumo, preparado para suportar composicao tecnica, estoque auditavel e integracao futura sem dependencia de nome livre.
