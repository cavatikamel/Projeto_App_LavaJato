# LavaPrime Financial Migration Risks

## 1. Objetivo

Classificar os riscos especificos do dominio financeiro antes de qualquer integracao com Supabase.

## 2. Riscos criticos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Critico | O mesmo evento financeiro aparece em mais de uma estrutura | `patioVehicles`, `cashEntries`, `openPayments`, `billingInvoices` | perda de rastreabilidade e dupla contagem | definir fonte primaria por evento antes da migracao |
| Critico | `invoiceAmounts` e um total derivado fora dos itens de fatura | `invoiceAmounts` + `invoiceLineItems` | total de fatura pode divergir do detalhe real | tornar o total reprocessavel a partir de itens e pagamentos |
| Critico | Pagamento parcial gera cadeia multipla de saldo | `settleInvoice()`, `settleOpenPayment()`, `confirmVehiclePayment()` | migracao pode duplicar ou perder saldo remanescente | modelar parcial como evento + saldo residual explicitamente vinculado |
| Critico | `openPayments` e `cashEntries` misturam previsao e realizacao | status pendente x confirmado no mesmo conjunto | receita pode ser tratada como realizada antes da hora | separar obrigacao, pagamento e caixa no modelo alvo |
| Critico | Documentos e comprovantes estao desacoplados do armazenamento oficial | `documentHistory` guarda metadados, nao o binario central | risco de perder evidencias de cobranca e liquidacao | definir estrategia de metadata + storage antes de cutover |

## 3. Riscos altos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Alto | Cliente operacional e cliente faturado convivem em estruturas diferentes | `clientRegistry` x `billingClients` | cobranca pode migrar para o cliente errado | reconciliar identidade antes de migrar invoices e receivables |
| Alto | `payableAccounts` tem pouca trilha de manutencao observada | seed em memoria e visualizacao | migracao de contas a pagar pode inventar historico | tratar payables como subdominio de baixa evidencia inicial |
| Alto | Taxa, prazo e valor liquido dependem de configuracao local no momento do evento | `businessPaymentMethods`, `getPaymentMethodFee()` | reprocessamento futuro pode mudar resultado historico | congelar snapshot financeiro por evento confirmado |
| Alto | Contas bancarias e Pix afetam tanto cobranca quanto liquidacao | `businessBankAccounts`, `businessPixInfo` | mudar configuracao pode apagar contexto de cobranca antiga | armazenar referencia da conta/chave usada no evento |
| Alto | Relatorios e comissoes consomem `cashEntries` diretamente | fluxo de caixa, producao e comissao | qualquer erro em caixa contamina varios relatorios | estabilizar `cash_entries` como projecao auditavel e nao fonte ambigua |

## 4. Riscos medios

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Medio | Metodo `Faturado` atua como forma de pagamento e como politica de cobranca | `businessPaymentMethods` e fluxos de patio/fatura | mistura semantica entre modo de cobranca e recebimento | separar contrato de billing do contrato de settlement |
| Medio | Contas a receber abertas usam defaults de vencimento locais | `businessFinanceSettings.receiptRules` | migracao pode recalcular vencimentos de forma errada | persistir due date efetivo no registro de origem |
| Medio | Anexo de comprovante e apenas metadata do arquivo local | `attachment.name` e `attachment.type` | comprovante pode perder valor probatorio | definir storage futuro e checksum/logica de retencao |
| Medio | O dominio usa nomes livres em descricao de servico e produto | `description`, `service`, `operator` | integracao futura pode perder relacoes estruturadas | levar ids canonicos sempre que houver origem conhecida |
| Medio | Contas a pagar, contas a receber e faturamento usam categorias e centros locais | categorias em configuracao local | classificacao pode divergir entre ambientes | congelar classificacao por evento e manter dicionario oficial |

## 5. Riscos baixos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Baixo | Layouts de relatorio podem mudar sem mudar semantica | PDFs e document history | baixo impacto transacional | manter testes de documento separados dos testes de valor |
| Baixo | FIPE local afeta pouco o financeiro diretamente | vinculo indireto por veiculo | influencia apenas contexto do documento | manter como referencia, fora do ownership financeiro |
| Baixo | Estado de filtros e telas financeiras pode se perder | telas do admin | baixo impacto em dado oficial | nao migrar estado de UI como dado financeiro |

## 6. Leitura final

O maior risco financeiro do LavaPrime nao esta apenas em mover dados para outro lugar. O risco real esta em mover um dominio que hoje mistura obrigacao, liquidacao, caixa, configuracao e documento sem antes separar quem e registro primario e quem e apenas reflexo.
