# LavaPrime Financial Supabase Readiness

## 1. Objetivo

Definir o que precisa existir antes de conectar o dominio financeiro do LavaPrime ao Supabase.

## 2. Principio de readiness

O dominio financeiro so pode ser conectado ao backend quando estiverem claros:

- ownership;
- relacoes;
- validacoes;
- rollback;
- dados que nao podem ser perdidos.

## 3. Tabelas e estruturas necessarias

### 3.1 Estruturas ja previstas no schema atual

- `payment_methods`
- `finance_settings`
- `business_bank_accounts`
- `business_pix_keys`
- `open_payments`
- `invoices`
- `invoice_line_items`
- `cash_entries`
- `payable_accounts`
- `document_history`

### 3.2 Relacoes operacionais ja previstas

- `clients`
- `vehicles`
- `attendances`
- `attendance_services`
- `product_sales`
- `product_sale_items`
- `products`
- `services`
- `operators`

### 3.3 Gap logico que precisa de decisao antes da integracao

Gap identificado:

- o modelo conceitual exige uma entidade de `payments`, mas o schema atual ainda nao a materializa explicitamente.

Antes da integracao real, precisa haver decisao formal sobre:

- criar tabela dedicada no futuro;
- ou representar `payments` por contrato explicito sobre `cash_entries` e metadata.

Sem essa definicao, a integracao financeira tende a misturar liquidacao com projecao de caixa.

## 4. Relacoes minimas obrigatorias

Antes de ligar backend, devem estar validadas as seguintes relacoes:

- `open_payments.client_id -> clients.id`
- `open_payments.vehicle_id -> vehicles.id`
- `open_payments.attendance_id -> attendances.id`
- `invoices.client_id -> clients.id`
- `invoices.attendance_id -> attendances.id`
- `invoice_line_items.invoice_id -> invoices.id`
- `invoice_line_items.attendance_id -> attendances.id`
- `invoice_line_items.vehicle_id -> vehicles.id`
- `cash_entries.invoice_id -> invoices.id`
- `cash_entries.attendance_id -> attendances.id`
- `product_sales.attendance_id -> attendances.id`
- `product_sales.client_id -> clients.id`
- `product_sales.vehicle_id -> vehicles.id`

## 5. Politicas RLS futuras

### 5.1 Configuracao financeira

Para:

- `payment_methods`
- `finance_settings`
- `business_bank_accounts`
- `business_pix_keys`

Regra recomendada:

- `select`: membro da organizacao
- `insert/update/delete`: administrador da organizacao

### 5.2 Operacao financeira

Para:

- `open_payments`
- `invoices`
- `invoice_line_items`
- `cash_entries`
- `payable_accounts`
- `document_history`

Regra minima recomendada:

- `select`: membro da organizacao
- `insert`: membro autorizado pelo fluxo de negocio
- `update`: somente para estados ainda abertos ou pendentes
- `delete`: administrador, preferencialmente evitado para historico confirmado

### 5.3 Restricoes aplicacionais adicionais

Mesmo com RLS permissiva por membership, o dominio financeiro precisa de controle adicional no aplicativo ou backend para:

- baixa de fatura;
- baixa de pagamento em aberto;
- cancelamento;
- estorno;
- alteracao de configuracoes financeiras;
- reencaminhamento de saldo parcial.

## 6. Validacoes obrigatorias antes de conectar

1. nenhum `invoice` sem `client_id` valido quando exigido pelo fluxo;
2. nenhum `invoice_line_item` sem `invoice_id`;
3. nenhum `open_payment` com saldo negativo;
4. nenhum `cash_entry` de entrada confirmada sem metodo conhecido;
5. todo parcial precisa manter `amount paid + balance remaining = total original`;
6. total de fatura precisa ser recalculavel por itens e eventos;
7. toda liquidacao precisa ter destino financeiro explicito;
8. configuracoes de prazo, taxa e conta financeira precisam estar congeladas por evento quando aplicavel;
9. relatorios financeiros precisam continuar distinguindo pendente de confirmado;
10. documentos emitidos precisam continuar apontando para a origem correta.

## 7. Plano de rollback minimo

Antes de ligar o dominio financeiro ao Supabase, o rollback minimo precisa prever:

1. manter a fonte local legada intacta durante a convivencia inicial;
2. registrar exatamente quais entidades entram em leitura e quais entram em escrita;
3. exportar snapshot local de `cashEntries`, `openPayments`, `billingInvoices`, `invoiceLineItems`, `invoiceAmounts` e `payableAccounts`;
4. desligar escrita remota antes de qualquer limpeza local;
5. impedir delecao remota em massa enquanto nao houver paridade validada;
6. reverter o cliente para modo legado caso haja divergencia de saldo, total ou vinculo.

## 8. Dados que nao podem ser perdidos

Dados sensiveis que nao podem se perder:

- valor bruto e valor liquido;
- taxa percentual e taxa fixa aplicadas;
- metodo de pagamento usado;
- conta bancaraia ou chave Pix associada a cobranca ou liquidacao;
- data de vencimento;
- data de liquidacao;
- cadeia de pagamentos parciais;
- saldo remanescente e seu destino;
- vinculo com cliente;
- vinculo com veiculo;
- vinculo com atendimento;
- vinculo com produto, servico ou fatura quando existir;
- numero de documento, recibo ou fatura;
- metadata de comprovantes e relatorios;
- operador ou responsavel pela acao.

## 9. Criterio de readiness

O dominio financeiro sera considerado pronto para uma futura fatia de integracao apenas quando:

- os contratos financeiros estiverem aprovados;
- o gap da entidade `payments` tiver decisao formal;
- as relacoes obrigatorias estiverem validadas;
- o rollback estiver testavel documentalmente;
- os dados criticos sem perda estiverem enumerados e protegidos.

## 10. Decisao desta fase

O dominio financeiro ainda nao esta pronto para conexao direta com Supabase. A readiness existe apenas em nivel de planejamento. Antes da primeira integracao real, ainda e necessario fechar contratos, ownership de pagamentos e plano de convivencia por entidade.
