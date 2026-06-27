# Customer Contract

## 1. Objetivo

Definir o contrato oficial de comunicacao do cliente entre Web, Android, API e futuras integracoes.

O header comum `contractName`, `contractVersion` e `emittedAt` segue `CONTRACT_GUIDELINES.md`.

## 2. Identificador canonico

- `id`
- `organizationId`

Regra:

- o identificador do cliente deve ser opaco, estavel e independente de nome, telefone ou documento.

## 3. Campos obrigatorios

| Campo | Tipo | Papel |
| --- | --- | --- |
| `id` | string | identificador canonico do cliente |
| `organizationId` | string | ownership de tenant |
| `kind` | string | `PF` ou `PJ` |
| `name` | string | nome principal exibido e pesquisavel |
| `document` | string | CPF ou CNPJ normalizado |
| `status` | string | estado do cadastro |
| `billingApproved` | boolean | indica se pode operar como cliente faturado |
| `createdAt` | datetime | criacao do registro |
| `updatedAt` | datetime | ultima atualizacao do registro |

## 4. Campos opcionais

| Campo | Tipo | Papel |
| --- | --- | --- |
| `customerCode` | string | codigo legivel de negocio |
| `legalName` | string | razao social ou nome civil completo |
| `phonePrimary` | string | telefone principal normalizado |
| `phoneSecondary` | string | telefone alternativo |
| `email` | string | email principal |
| `address` | object | endereco estruturado |
| `billingCycle` | string | regra de cobranca futura |
| `allowMultipleOpenInvoices` | boolean | politica de faturamento |
| `vehicleIds` | string[] | referencias de veiculos atuais ou historicos relevantes |
| `notes` | string | observacoes administrativas |
| `legacyRefs` | object | ponte controlada para `billingClientId` e estruturas legadas |

## 5. Relacionamentos

- `Customer` -> `Vehicle`: 1:N
- `Customer` -> `Attendance`: 1:N
- `Customer` -> `Payment`: 1:N por obrigacoes e liquidacoes
- `Customer` -> `Financial`: 1:N por faturamento, recebiveis e documentos

## 6. Regras obrigatorias

1. `document` deve ser normalizado antes da troca entre superficies.
2. `billingClients` nao pode existir como segunda entidade autoritativa definitiva.
3. `name` nao pode ser o unico criterio de reconciliacao.
4. `vehicleIds` e derivado util; ownership primario de veiculo continua no contrato de `Vehicle`.
5. aprovacao de faturamento nao deve nascer implicitamente de um fluxo visual sem trilha.
6. exclusao fisica so e aceitavel se o cliente nunca sustentou veiculo, atendimento, documento ou evento financeiro.

## 7. Campos nao autoritativos

Os campos abaixo podem existir apenas como apoio local e nao definem ownership:

- marcadores de selecao de UI;
- filtros temporarios;
- estados de modal;
- caches de pesquisa;
- ids locais transitivos sem correspondencia canonica.

## 8. Decisao desta fase

`Customer` passa a ser o contrato unico para cliente operacional e cliente faturado, encerrando a ideia de duas entidades paralelas para o mesmo dominio.
