# Vehicle Contract

## 1. Objetivo

Definir o contrato oficial de comunicacao do veiculo entre Web, Android, API e futuras integracoes.

O header comum `contractName`, `contractVersion` e `emittedAt` segue `CONTRACT_GUIDELINES.md`.

## 2. Identificador canonico

- `id`
- `organizationId`

Regra:

- a placa e chave operacional importante, mas nao substitui `id`.

## 3. Campos obrigatorios

| Campo | Tipo | Papel |
| --- | --- | --- |
| `id` | string | identificador canonico do veiculo |
| `organizationId` | string | ownership de tenant |
| `currentCustomerId` | string | owner atual aprovado |
| `plate` | string | placa normalizada e unica por organizacao |
| `brand` | string | marca exibida |
| `model` | string | modelo exibido |
| `vehicleType` | string | tipo principal do veiculo |
| `status` | string | estado do cadastro |
| `createdAt` | datetime | criacao do registro |
| `updatedAt` | datetime | ultima atualizacao do registro |

## 4. Campos opcionais

| Campo | Tipo | Papel |
| --- | --- | --- |
| `category` | string | categoria operacional |
| `manufactureYear` | number | ano de fabricacao |
| `modelYear` | number | ano modelo |
| `color` | string | cor |
| `fuel` | string | combustivel |
| `notes` | string | observacoes livres controladas |
| `specialCareRefs` | string[] | referencias para cuidados especiais |
| `ownerHistoryRefs` | string[] | referencias para historico de ownership |
| `fipeRef` | object | ponteiros para referencia tecnica FIPE |
| `legacyRefs` | object | vinculos temporarios com estruturas locais antigas |

## 5. Relacionamentos

- `Vehicle` -> `Customer`: N:1 para owner atual
- `Vehicle` -> `Attendance`: 1:N
- `Vehicle` -> `Payment`: 1:N por origem operacional e financeira
- `Vehicle` -> `Financial`: 1:N por invoices, receivables e documentos

## 6. Regras obrigatorias

1. `plate` deve ser unica por `organizationId`.
2. `currentCustomerId` e a referencia primaria do owner atual.
3. ownership historico deve existir fora do objeto principal quando houver transferencia.
4. `client.plates` ou equivalentes podem existir como derivacao, nunca como ownership primario.
5. `fipeRef` e apenas enriquecimento tecnico; FIPE nao define ownership de negocio.
6. um veiculo que ja sustentou atendimento, documento ou financeiro nao deve ser apagado sem reconciliacao formal.

## 7. Campos nao autoritativos

Nao definem o registro oficial:

- cache FIPE em memoria;
- indicadores visuais do patio;
- filtros e ordenacoes de tela;
- estados temporarios de selecao.

## 8. Decisao desta fase

`Vehicle` passa a ser o contrato canonico do ativo operacional, com owner atual explicito e historico tratado como relacao dedicada, nao como espelhamento silencioso.
