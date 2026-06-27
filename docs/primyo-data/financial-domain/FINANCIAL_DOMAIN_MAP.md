# LavaPrime Financial Domain Map

## 1. Objetivo

Mapear o dominio financeiro atual do LavaPrime antes de qualquer integracao com Supabase.

## 2. Leitura executiva

O dominio financeiro atual do LavaPrime nao vive em uma unica estrutura. Ele esta espalhado entre:

- configuracoes financeiras em `localStorage`;
- eventos de caixa em `cashEntries`;
- contas a receber em `openPayments`;
- faturas e itens em `billingInvoices`, `invoiceLineItems` e `invoiceAmounts`;
- contas a pagar em `payableAccounts`;
- estado operacional satelite em `patioVehicles`;
- documentos e comprovantes em `documentHistory`.

Resultado pratico:

- o financeiro atual e uma combinacao de dados mestres, eventos, agregados e metadados;
- parte do dominio ja e persistida, parte ainda vive apenas em memoria;
- pagamentos parciais geram desdobramentos em mais de uma estrutura;
- relatorios e comprovantes dependem do mesmo dominio, mas sao gravados separadamente.

## 3. Fluxos financeiros atuais observados

### 3.1 Atendimento pago no ato

`patioVehicles -> confirmVehiclePayment() -> upsertCashEntryFromVehicle() -> cashEntries -> recibo/documentHistory`

### 3.2 Atendimento com pagamento em aberto

`patioVehicles -> confirmVehiclePayment() -> upsertCashEntryFromVehicle(status pendente) -> upsertOpenPaymentFromVehicle() -> openPayments -> cashEntries`

### 3.3 Atendimento com pagamento parcial

`patioVehicles -> confirmVehiclePayment() -> cashEntries pago + cashEntries pendente + openPayments saldo remanescente`

### 3.4 Atendimento faturado

`patioVehicles -> attachVehicleToInvoice() -> billingInvoices + invoiceLineItems + invoiceAmounts -> baixa futura em settleInvoice()`

### 3.5 Baixa de fatura

`billingInvoices -> settleInvoice() -> cashEntries confirmado -> saldo remanescente vai para nova fatura, fatura existente ou openPayments`

### 3.6 Baixa de pagamento em aberto

`openPayments -> settleOpenPayment() -> cashEntries confirmado -> se parcial, cria novo openPayments e novo cashEntries pendente`

### 3.7 Venda de produto

`productSales -> createCashEntryFromProductSale() -> cashEntries -> comprovante -> documentHistory`

### 3.8 Lancamento manual

`cashflow dialog -> cashEntries -> relatorios e comprovantes`

## 4. Entidades financeiras atuais

| Entidade atual | Onde vive hoje | Quem cria hoje | Quem altera hoje | Quem consome hoje | Dependencias principais |
| --- | --- | --- | --- | --- | --- |
| `businessPaymentMethods` | `localStorage` | configuracao financeira | tela de configuracoes financeiras | patio, venda de produto, faturas, caixa, calculo de taxa e prazo | `businessBankAccounts`, `businessPixInfo`, `businessFinanceSettings` |
| `businessBankAccounts` | `localStorage` | configuracao financeira | tela de contas bancarias | exibicao em faturas, liquidacao, cash entries | `payment_methods`, documentos, settlements |
| `businessPixInfo` | `localStorage` | configuracao financeira | tela de Pix | faturas, QR Code, comprovantes, links de pagamento | `businessFinanceSettings.receiptRules`, `payment_methods` |
| `businessFinanceSettings` | `localStorage` | configuracao financeira | tela de configuracoes financeiras | prazo padrao de fatura, prazo de pagamento em aberto, documentos, inventario | invoices, openPayments, documentos |
| `cashEntries` | `localStorage` | `confirmVehiclePayment()`, `settleInvoice()`, `settleOpenPayment()`, `createCashEntryFromProductSale()`, dialogo manual | dialogo de caixa, baixas, cancelamentos logicos, conciliacao parcial | tela de fluxo de caixa, dashboard, relatarios, comissao/producao, comprovantes | payment methods, bank accounts, patio, productSales, openPayments, invoices |
| `openPayments` | memoria no web | `confirmVehiclePayment()`, `createOpenPaymentFromInvoiceBalance()`, `createRemainingOpenPayment()` | `settleOpenPayment()`, lembretes WhatsApp | tela de pagamentos em aberto, caixa, dashboard, mensagens, relatorio PDF | patio, cashEntries, invoices, clients, vehicles |
| `billingInvoices` | memoria no web | central de faturas, dialogo de status faturado, `createInvoiceFromRemainingBalance()` | `settleInvoice()`, acoplamentos de atendimento | tela de faturas, agendamento faturado, clientes, dashboard, mensagens | billing clients, invoice items, invoice amounts, open payments |
| `invoiceLineItems` | memoria no web | `attachVehicleToInvoice()`, `addRemainingBalanceToInvoice()` | ajustes de atendimento faturado, remocao ao desvincular atendimento | contexto de fatura, total aberto, mensagens, relacoes com veiculo | invoices, vehicles, services, operators |
| `invoiceAmounts` | memoria no web | inicializacao de fatura e atualizacoes derivadas | `attachVehicleToInvoice()`, `settleInvoice()`, edicao de atendimento faturado | valor exibido em faturas, clientes, dashboard | invoices, invoiceLineItems, vehicle totals |
| `payableAccounts` | memoria no web | seed inicial observada | nenhuma trilha de manutencao observada | tabela e metricas de contas a pagar | categoria, vencimento, status |
| `productSales` com reflexo financeiro | `localStorage` | dialogo de venda de produtos | venda concluida e recibo | estoque, comprovante, cashEntries, documentos | products, clients, vehicles, payment methods |
| `documentHistory` financeiro | `localStorage` | `downloadPdfFile()` e `recordGeneratedDocument()` | somente pela geracao de novos documentos | tela de documentos, rastreabilidade de recibos e relatorios | invoices, openPayments, cashEntries, receipts, reports |
| Estado satelite em `patioVehicles` | memoria no web | patio e confirmacao de pagamento | confirmacao, baixa parcial, faturamento | patio, recibo, lancamento de caixa, criacao de receivables | client, vehicle, service, invoice, cash entry |

## 5. Valores calculados e derivados

Valores derivados que nao devem ser tratados como fonte primaria futura:

- `invoiceAmounts`
- `remainingBalance`
- `partialPaidAmount`
- `partialBalance`
- `feeAmount`
- `netAmount`
- `expectedReceiptDate`
- `serviceAmount`
- `productAmount`

Regra arquitetural:

- o evento primario precisa existir primeiro;
- o valor agregado deve ser reprocessavel a partir do evento e das relacoes.

## 6. Criadores e consumidores por fluxo

### Criadores observados

- `confirmVehiclePayment()` cria ou atualiza `cashEntries`, `openPayments` e estado financeiro do patio;
- `attachVehicleToInvoice()` cria `invoiceLineItems`, atualiza `invoiceAmounts` e vincula o atendimento a `billingInvoices`;
- `settleInvoice()` cria `cashEntries` de liquidacao e pode abrir nova fatura ou novo `openPayments`;
- `settleOpenPayment()` confirma recebimento em `cashEntries` e pode reabrir saldo remanescente em novo `openPayments`;
- `createCashEntryFromProductSale()` cria entrada de caixa de venda de produto;
- `downloadPdfFile()` registra comprovantes, recibos e relatorios em `documentHistory`.

### Consumidores observados

- `renderCashflowScreen()`
- `renderOpenPaymentsScreen()`
- `renderInvoicesScreen()`
- dashboard e metricas administrativas
- relatorio de fluxo de caixa
- relatorio de pagamentos em aberto
- recibo de atendimento
- comprovante de venda
- mensagens WhatsApp de pagamento, faturamento e cobranca
- calculo de producao e comissao por operador

## 7. Vinculos criticos do dominio financeiro

Relacoes que precisam sobreviver na migracao futura:

- `cashEntry -> payment method`
- `cashEntry -> bank account`
- `cashEntry -> attendance`
- `cashEntry -> openPayment`
- `cashEntry -> invoice`
- `openPayment -> attendance`
- `openPayment -> client`
- `openPayment -> vehicle`
- `openPayment -> invoice`
- `invoice -> client`
- `invoice -> line items`
- `invoice item -> vehicle`
- `invoice item -> operator`
- `product sale -> cashEntry`
- `documentHistory -> sourceType/sourceId`

## 8. Dependencias externas e de suporte

O dominio financeiro depende de:

- `businessPaymentMethods`
- `businessBankAccounts`
- `businessPixInfo`
- `businessFinanceSettings.receiptRules`
- clientes e billing clients
- veiculos
- atendimentos do patio
- venda de produtos
- templates de mensagem
- geracao de documentos PDF

## 9. Lacunas observadas

Lacunas do estado atual:

- nao existe entidade explicita de `payment` separando evento financeiro de projecao em caixa;
- `payableAccounts` aparece apenas como seed e visualizacao, sem trilha clara de manutencao;
- `invoiceAmounts` concentra total derivado fora da relacao formal de itens;
- pagamento parcial replica informacao em varias estruturas;
- documentos mantem metadados, mas nao um armazenamento central do anexo real.

## 10. Leitura final

O dominio financeiro do LavaPrime hoje ja e amplo o suficiente para exigir desenho por subdominio. Tratar tudo como "caixa" ou tudo como "fatura" levaria a uma migracao errada. O modelo futuro precisa separar configuracao, obrigacao financeira, evento de pagamento, projecao contabil e documento.
