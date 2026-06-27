# LavaPrime Financial Test Scenarios

## 1. Objetivo

Definir os cenarios futuros de teste do dominio financeiro antes de qualquer integracao com Supabase.

## 2. Regras gerais de teste

- todo teste financeiro deve validar valor bruto, valor liquido, status e vinculos;
- testes de parcial, cancelamento e estorno exigem verificacao de historico;
- nenhum teste deve aceitar apenas a tela como evidencia;
- relatorio e comprovante precisam apontar para a origem financeira correta.

## 3. Cenarios

| ID | Cenario | Pre-condicao | Passos essenciais | Resultado esperado |
| --- | --- | --- | --- | --- |
| FT-001 | Venda a vista com Pix | metodo Pix ativo, conta ou chave valida configurada | registrar atendimento pago no ato via Pix e emitir recibo | recebedor correto, entrada confirmada, valor liquido igual ao bruto, comprovante referenciado |
| FT-002 | Venda a vista com dinheiro | metodo Dinheiro ativo | registrar atendimento pago no ato em dinheiro | entrada confirmada, sem taxa, sem receivable residual |
| FT-003 | Venda a vista com cartao | metodo cartao ativo com taxa e prazo configurados | registrar atendimento pago no ato em cartao | taxa aplicada, valor liquido calculado, previsao de recebimento coerente |
| FT-004 | Venda parcelada ou pagamento parcial de atendimento | fluxo de parcial habilitado | registrar valor pago menor que o total e confirmar destino do saldo | evento pago registrado, saldo remanescente preservado, receivable residual criado corretamente |
| FT-005 | Conta a receber criada a partir do patio | atendimento com pagamento em aberto | concluir atendimento gerando `openPayment` | obrigacao aberta com cliente, veiculo, valor, vencimento e origem coerentes |
| FT-006 | Conta paga integralmente | receivable em aberto existente | baixar pagamento em aberto pelo valor total | receivable fechado, caixa confirmado, nenhum saldo residual |
| FT-007 | Conta vencida | receivable com due date anterior ao dia atual | abrir tela de pagamentos em aberto e relatorio | status vencido detectavel, lembrete disponivel, sem alterar saldo por isso |
| FT-008 | Fatura criada e abastecida por atendimento faturado | cliente faturado aprovado e fatura aberta | vincular atendimento a fatura e conferir item de fatura | invoice e invoice item coerentes, total reprocessavel, vinculo com cliente e veiculo preservado |
| FT-009 | Baixa parcial de fatura | fatura aberta com saldo | baixar parcialmente e escolher destino do saldo | valor pago registrado, saldo remanejado para destino escolhido, historico da fatura preservado |
| FT-010 | Cancelamento de obrigacao financeira ainda aberta | receivable ou invoice sem liquidacao | cancelar por motivo formal | status cancelado, historico preservado, sem exclusao destrutiva |
| FT-011 | Estorno de pagamento confirmado | pagamento previamente confirmado | registrar estorno do valor total ou parcial | evento de reversao ligado ao original, caixa refletindo estorno, trilha auditavel preservada |
| FT-012 | Conta a pagar quitada | payable em aberto existente | registrar pagamento da conta a pagar | saida confirmada, categoria e vencimento preservados, historico mantido |
| FT-013 | Relatorio financeiro | caixa, receivables e invoices com dados representativos | emitir relatorio de fluxo e pagamentos em aberto | totais coerentes com os registros de origem, pendente separado de confirmado |
| FT-014 | Comprovante financeiro | pagamento ou lancamento com comprovante | gerar ou baixar comprovante/documento | documento vinculado ao evento certo, metadata registrada, identificador preservado |

## 4. Evidencias minimas por cenario

Cada cenario futuro deve registrar:

- ids ou referencias dos registros afetados;
- status antes e depois;
- valor bruto, taxa, valor liquido e saldo;
- vinculos com cliente, veiculo, atendimento e documento quando existirem;
- resultado do relatorio ou comprovante correspondente;
- resultado do rollback quando o cenario envolver parcial, cancelamento ou estorno.

## 5. Cenarios criticos para gate de migracao

Nenhuma futura integracao financeira deve avancar sem revalidar pelo menos:

- FT-001
- FT-003
- FT-004
- FT-005
- FT-006
- FT-008
- FT-009
- FT-011
- FT-013
- FT-014

## 6. Decisao desta fase

Os cenarios acima passam a ser a base minima de validacao do dominio financeiro para qualquer fatia futura de integracao, persistencia remota ou refatoracao controlada.
