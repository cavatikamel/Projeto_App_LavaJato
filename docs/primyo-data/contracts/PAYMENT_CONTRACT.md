# Payment Contract

## 1. Objetivo

Definir o contrato oficial de comunicacao do evento de pagamento entre Web, Android, API e futuras integracoes.

O header comum `contractName`, `contractVersion` e `emittedAt` segue `CONTRACT_GUIDELINES.md`.

## 2. Identificador canonico

- `id`
- `organizationId`

Regra:

- `Payment` representa liquidacao, parcial, cancelamento ou estorno. Ele nao e o mesmo contrato de `CashEntry`.

## 3. Campos obrigatorios

| Campo | Tipo | Papel |
| --- | --- | --- |
| `id` | string | identificador canonico do evento de pagamento |
| `organizationId` | string | ownership de tenant |
| `sourceType` | string | tipo de origem do pagamento |
| `sourceId` | string | identificador da origem principal |
| `methodId` | string | metodo de pagamento canonico |
| `kind` | string | natureza do evento: recebimento, parcial, estorno, saida |
| `status` | string | pendente, confirmado, cancelado ou revertido |
| `grossAmount` | money | valor bruto do evento |
| `feeAmount` | money | taxa aplicada no evento |
| `netAmount` | money | valor liquido apos taxa |
| `paidAmount` | money | valor efetivamente liquidado nesta ocorrencia |
| `remainingAmount` | money | saldo remanescente apos o evento |
| `effectiveAt` | datetime | data efetiva da liquidacao ou reversao |
| `createdAt` | datetime | criacao do registro |
| `updatedAt` | datetime | ultima atualizacao |

## 4. Campos opcionais

| Campo | Tipo | Papel |
| --- | --- | --- |
| `receivableId` | string | obrigacao a receber vinculada |
| `invoiceId` | string | fatura vinculada |
| `payableId` | string | conta a pagar vinculada |
| `clientId` | string | cliente relacionado |
| `vehicleId` | string | veiculo relacionado |
| `attendanceId` | string | atendimento relacionado |
| `financialAccountId` | string | conta financeira de liquidacao |
| `paymentDate` | datetime | data informada no fluxo quando diferente de `effectiveAt` |
| `methodSnapshot` | object | fee, prazo e labels congelados no momento do evento |
| `financialAccountSnapshot` | object | conta ou chave utilizada no evento |
| `reversalOfPaymentId` | string | pagamento original em caso de estorno |
| `documentRefs` | string[] | comprovantes e documentos associados |
| `notes` | string | observacoes controladas |
| `legacyRefs` | object | referencias transitivas do legado |

## 5. Relacionamentos

- `Payment` -> `Attendance`: N:1 quando a origem vier do patio
- `Payment` -> `Customer`: N:1
- `Payment` -> `Vehicle`: N:1
- `Payment` -> `Financial`: 1:N por cash entries, documentos e saldos

## 6. Regras obrigatorias

1. `Payment` nao substitui `CashEntry`; ele e o evento primario de liquidacao.
2. pagamento parcial deve preservar `paidAmount` e `remainingAmount`.
3. pagamento confirmado vira historico e nao deve ser editado destrutivamente.
4. estorno deve gerar novo evento ligado por `reversalOfPaymentId`.
5. taxa, prazo e conta usada devem ficar congelados em snapshot quando houver impacto historico.
6. `sourceType` e `sourceId` devem apontar para origem operacional ou financeira clara.

## 7. Campos nao autoritativos

Nao definem o evento oficial:

- previews de simulacao;
- calculos visuais de formulario;
- filtros de tela;
- estados temporarios de dialogo;
- labels locais nao normalizados.

## 8. Decisao desta fase

`Payment` passa a ser o contrato canonico do evento financeiro, separando liquidacao de obrigacao, caixa e documento.
