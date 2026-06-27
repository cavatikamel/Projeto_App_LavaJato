# LavaPrime Financial Entity Model

## 1. Objetivo

Propor o modelo logico futuro do dominio financeiro do LavaPrime sem alterar schema nesta fase.

## 2. Principios do modelo

1. Configuracao financeira nao deve se misturar com evento financeiro.
2. Obrigacao financeira nao deve se confundir com pagamento realizado.
3. Valor derivado nao deve ser a unica fonte de verdade.
4. Todo registro financeiro precisa apontar para uma origem operacional clara.
5. Cancelamento, parcial e estorno precisam ser tratados como eventos, nao como sobrescrita silenciosa.

## 3. Modelo logico proposto

| Entidade logica | Papel | Suporte fisico planejado hoje | Observacao |
| --- | --- | --- | --- |
| `financial_accounts` | contas de destino e exibicao financeira | `business_bank_accounts` + `business_pix_keys` | e uma entidade logica agregadora, ainda sem tabela unica dedicada |
| `payment_methods` | regra de pagamento, taxa, prazo e disponibilidade | `payment_methods` | base de fee, settlement e exibicao |
| `receivables` | obrigacoes em aberto a receber | `open_payments` | representa saldo ainda nao liquidado |
| `invoices` | documentos de cobranca por cliente faturado | `invoices` | pode originar novos receivables ou receber pagamentos diretos |
| `invoice_items` | itens cobrados em fatura | `invoice_line_items` | devem carregar origem suficiente para reprocessamento |
| `payments` | evento de recebimento, parcial, cancelamento ou estorno | ainda sem tabela dedicada no schema atual | precisa existir como contrato logico obrigatorio antes da integracao real |
| `cash_entries` | projecao contabil e operacional do evento financeiro | `cash_entries` | nao deve substituir a entidade de pagamento no modelo conceitual |
| `payables` | obrigacoes a pagar | `payable_accounts` | dominio de saida financeira |
| `financial_documents` | comprovantes, recibos, relatorios e anexos | `document_history` + storage futuro | documento e rastreabilidade, nao ownership do evento |

## 4. Relacoes obrigatorias

### 4.1 Configuracao

- `financial_accounts` pertence a `organizationId`
- `payment_methods` pertence a `organizationId`
- um `payment_method` pode apontar para um `financial_account`

### 4.2 Recebiveis e faturamento

- um `receivable` pode nascer de um `attendance`, de uma `invoice` ou de outro `payment` parcial
- uma `invoice` pertence a um `client`
- uma `invoice` pode referenciar um `attendance`
- uma `invoice` possui muitos `invoice_items`
- um `invoice_item` pode referenciar `client`, `vehicle`, `attendance`, `service`, `product` ou apenas uma descricao consolidada

### 4.3 Pagamentos e caixa

- um `payment` pode liquidar total ou parcialmente um `receivable` ou uma `invoice`
- um `payment` pode gerar um ou mais `cash_entries`
- um `cash_entry` deve carregar link para o `payment` que o originou quando existir
- um `cash_entry` pode representar entrada, saida, previsao ou estorno

### 4.4 Contas a pagar

- um `payable` pertence a `organizationId`
- um `payable` pode gerar um `payment` de saida
- um `payable` pode gerar um `cash_entry` de saida

### 4.5 Documentos

- um `financial_document` pode apontar para `invoice`, `payment`, `cash_entry`, `receivable` ou `product_sale`

## 5. Campos minimos por entidade

### `financial_accounts`

- `id`
- `organizationId`
- `kind`
- `label`
- `bankName`
- `accountType`
- `agency`
- `accountNumber`
- `pixKey`
- `pixKeyType`
- `showInInvoices`
- `isActive`
- `createdAt`
- `updatedAt`

### `payment_methods`

- `id`
- `organizationId`
- `name`
- `methodType`
- `isActive`
- `settlementDays`
- `feePercent`
- `fixedFee`
- `immediateSettlement`
- `financialAccountId`
- `usageContext`
- `createdAt`
- `updatedAt`

### `receivables`

- `id`
- `organizationId`
- `sourceType`
- `sourceId`
- `clientId`
- `vehicleId`
- `attendanceId`
- `invoiceId`
- `description`
- `amount`
- `paidAmount`
- `balanceAmount`
- `status`
- `dueDate`
- `reminderFrequency`
- `createdAt`
- `updatedAt`

### `invoices`

- `id`
- `organizationId`
- `clientId`
- `attendanceId`
- `invoiceNumber`
- `issueDate`
- `dueDate`
- `status`
- `subtotal`
- `discount`
- `total`
- `paidAmount`
- `originInvoiceId`
- `createdAt`
- `updatedAt`

### `invoice_items`

- `id`
- `organizationId`
- `invoiceId`
- `attendanceId`
- `clientId`
- `vehicleId`
- `serviceId`
- `productId`
- `description`
- `quantity`
- `unitPrice`
- `total`
- `operatorId` ou `operatorName`
- `createdAt`
- `updatedAt`

### `payments`

- `id`
- `organizationId`
- `sourceType`
- `sourceId`
- `receivableId`
- `invoiceId`
- `payableId`
- `clientId`
- `vehicleId`
- `attendanceId`
- `methodId`
- `financialAccountId`
- `kind`
- `status`
- `grossAmount`
- `feeAmount`
- `netAmount`
- `paidAmount`
- `remainingAmount`
- `paymentDate`
- `effectiveAt`
- `reversalOfPaymentId`
- `createdAt`
- `updatedAt`

### `cash_entries`

- `id`
- `organizationId`
- `paymentId`
- `attendanceId`
- `invoiceId`
- `kind`
- `category`
- `costCenter`
- `description`
- `methodLabel`
- `status`
- `amount`
- `entryDate`
- `dueDate`
- `paidAt`
- `attachmentPath`
- `createdAt`
- `updatedAt`

### `payables`

- `id`
- `organizationId`
- `supplierName`
- `description`
- `category`
- `amount`
- `dueDate`
- `status`
- `paymentMethodId`
- `createdAt`
- `updatedAt`

### `financial_documents`

- `id`
- `organizationId`
- `sourceType`
- `sourceId`
- `title`
- `documentNumber`
- `category`
- `storagePath`
- `summary`
- `createdAt`
- `createdBy`

## 6. Regras de modelagem obrigatorias

### 6.1 Pagamento nao e a mesma coisa que caixa

- `payments` representa o evento de liquidacao;
- `cash_entries` representa o reflexo contabil e operacional.

### 6.2 Obrigacao nao e a mesma coisa que documento

- `receivables` e `payables` representam a obrigacao;
- `invoices` representam o documento de cobranca;
- `financial_documents` representam os artefatos emitidos.

### 6.3 Parcial e estorno sao primeira classe

- pagamento parcial gera novo saldo controlado;
- estorno gera novo evento relacionado ao original;
- cancelamento nao deve apagar historico.

### 6.4 Totais devem ser reprocessaveis

- `invoiceAmounts` nao deve existir como fonte primaria futura;
- saldo, total e valor liquido precisam ser recalculaveis a partir de itens, pagamentos e taxas.

## 7. Mapeamento do legado atual para o modelo futuro

| Estrutura atual | Papel atual | Destino logico futuro |
| --- | --- | --- |
| `businessBankAccounts` | contas exibidas e usadas em liquidacao | `financial_accounts` |
| `businessPixInfo` | configuracao Pix e QR | `financial_accounts` + metadata documental |
| `businessPaymentMethods` | regras de recebimento | `payment_methods` |
| `cashEntries` | caixa, previsao, comprovante e parte do pagamento | `cash_entries` |
| `openPayments` | contas em aberto | `receivables` |
| `billingInvoices` | faturas | `invoices` |
| `invoiceLineItems` | itens de fatura | `invoice_items` |
| `invoiceAmounts` | total derivado em memoria | valor derivado recalculavel |
| `payableAccounts` | contas a pagar | `payables` |
| `documentHistory` | historico documental | `financial_documents` |

## 8. Decisao desta fase

O dominio financeiro do LavaPrime deve ser tratado no futuro como um conjunto de subentidades relacionadas, e nao como um bloco unico de persistencia. A entidade logica `payments` passa a ser obrigatoria no modelo conceitual, mesmo antes de existir decisao fisica sobre sua representacao final.
