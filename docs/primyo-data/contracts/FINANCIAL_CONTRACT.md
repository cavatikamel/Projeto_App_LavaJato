# Financial Contract

## 1. Objetivo

Definir o contrato oficial de comunicacao do contexto financeiro compartilhado do LavaPrime.

Este contrato nao representa uma tabela unica. Ele representa o envelope de troca entre superficies quando uma origem precisa expor seu estado financeiro consolidado.

O header comum `contractName`, `contractVersion` e `emittedAt` segue `CONTRACT_GUIDELINES.md`.

## 2. Identificador canonico

- `id`
- `organizationId`

Regra:

- `Financial` identifica um contexto financeiro compartilhado por `sourceType` e `sourceId`, sem confundir obrigacao, pagamento, caixa e documento.

## 3. Campos obrigatorios

| Campo | Tipo | Papel |
| --- | --- | --- |
| `id` | string | identificador canonico do contexto financeiro |
| `organizationId` | string | ownership de tenant |
| `sourceType` | string | origem principal do contexto |
| `sourceId` | string | identificador da origem principal |
| `financialKind` | string | categoria do contexto: receivable, invoice, payable, settlement, mixed |
| `status` | string | estado financeiro atual |
| `grossAmount` | money | valor bruto associado ao contexto |
| `confirmedAmount` | money | valor efetivamente liquidado |
| `openAmount` | money | saldo ainda aberto |
| `currencyCode` | string | moeda do contrato |
| `createdAt` | datetime | criacao do registro |
| `updatedAt` | datetime | ultima atualizacao |

## 4. Campos opcionais

| Campo | Tipo | Papel |
| --- | --- | --- |
| `clientId` | string | cliente vinculado |
| `vehicleId` | string | veiculo vinculado |
| `attendanceId` | string | atendimento vinculado |
| `invoiceRef` | object | referencia resumida de invoice |
| `receivableRefs` | object[] | referencias resumidas de recebiveis |
| `paymentRefs` | object[] | referencias resumidas de pagamentos |
| `cashEntryRefs` | object[] | referencias resumidas de caixa |
| `payableRef` | object | referencia resumida de conta a pagar |
| `documentRefs` | object[] | recibos, comprovantes e relatorios associados |
| `dueDate` | datetime | vencimento principal quando existir |
| `issueDate` | datetime | emissao principal quando existir |
| `totalsBreakdown` | object | subtotal, desconto, taxas e liquido |
| `reminderState` | object | estado de lembretes e cobranca |
| `legacyRefs` | object | referencias transitivas do legado |

## 5. Relacionamentos

- `Financial` -> `Customer`: N:1
- `Financial` -> `Vehicle`: N:1
- `Financial` -> `Attendance`: N:1
- `Financial` -> `Payment`: 1:N

## 6. Regras obrigatorias

1. este contrato agrega comunicacao; ele nao substitui `Receivable`, `Invoice`, `Payment` ou `CashEntry`.
2. `grossAmount`, `confirmedAmount` e `openAmount` devem ser coerentes entre si.
3. pendente e confirmado precisam permanecer semanticamente distintos.
4. `totalsBreakdown` e derivado de eventos e documentos, nao fonte primaria.
5. `sourceType` e `sourceId` devem permitir rastrear a origem operacional ou financeira sem ambiguidade.
6. quando houver parcial, o contrato deve expor claramente qual parte foi liquidada e qual parte segue aberta.

## 7. Campos nao autoritativos

Nao definem o contexto oficial:

- filtros da tela financeira;
- ordenacao de relatorios;
- agregados locais nao rastreaveis;
- previews de documento antes de emissao;
- visoes sinteticas sem referencias canonicas.

## 8. Decisao desta fase

`Financial` passa a ser o contrato de troca para estado financeiro consolidado, sem reintroduzir a confusao entre configuracao, obrigacao, pagamento, caixa e documento.
