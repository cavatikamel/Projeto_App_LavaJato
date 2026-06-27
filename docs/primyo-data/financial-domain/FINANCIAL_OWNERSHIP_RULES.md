# LavaPrime Financial Ownership Rules

## 1. Objetivo

Definir ownership, editabilidade e regras de ciclo de vida do dominio financeiro.

## 2. Regras gerais

1. Configuracao financeira e dado mestre da organizacao.
2. Obrigacao financeira e criada por evento de negocio ou por acao administrativa controlada.
3. Pagamento confirmado vira historico, nao rascunho.
4. Cancelamento e estorno sao eventos explicitos.
5. Pagamento parcial sempre preserva historico do valor pago e do saldo restante.

## 3. Ownership por entidade

| Entidade | Dono oficial futuro | Quem pode criar | Quem pode editar | Quando deixa de ser editavel | Regra principal |
| --- | --- | --- | --- | --- | --- |
| `financial_accounts` | organizacao | administrador | administrador | apos uso em documento, apenas campos nao auditaveis | nao apagar conta usada em liquidacao historica |
| `payment_methods` | organizacao | administrador | administrador | apos uso em evento, nao reescrever historico | taxa e prazo valem para novos eventos, nao retroativamente |
| `receivables` | dominio financeiro | atendimento automatizado ou administrador | administrador e fluxo sistemico controlado | apos liquidacao total ou cancelamento | saldo so pode mudar por pagamento, cancelamento ou estorno |
| `invoices` | dominio financeiro | administrador ou fluxo faturado aprovado | administrador ate primeiro pagamento | apos pagamento parcial ou total | nao sobrescrever fatura paga; usar evento complementar |
| `invoice_items` | origem operacional que gerou a cobranca | sistema e administrador controlado | administrador ate fatura sair do estado editavel | apos emissao/primeiro pagamento | item faturado nao pode sumir sem rastro |
| `payments` | dominio financeiro | fluxo sistemico ou administrador | administrador apenas enquanto pendente | apos confirmacao | estorno deve gerar novo evento, nao edicao destrutiva |
| `cash_entries` | dominio financeiro | sistema ou administrador | administrador com controle reforcado | apos conciliacao/confirmacao definitiva | ajuste vira novo evento ou marcacao, nao substituicao silenciosa |
| `payables` | dominio financeiro | administrador | administrador | apos pagamento ou cancelamento | conta paga vira historico e nao pode voltar sem evento de estorno |
| `financial_documents` | dominio financeiro e documental | sistema | nao deve editar conteudo historico | imediatamente apos emissao | nova versao gera novo documento e novo registro |

## 4. Regras de editabilidade

### 4.1 Dado mestre

Pode ser editado:

- contas bancarias;
- configuracao Pix;
- metodos de pagamento;
- regras de prazo e exibicao.

Condicao:

- a edicao vale para eventos futuros;
- historico anterior nao deve ser recalculado automaticamente sem regra formal.

### 4.2 Obrigacoes abertas

Podem ser editadas enquanto abertas:

- vencimento;
- frequencia de lembrete;
- observacao;
- vinculos ainda nao liquidados, com controle.

Nao podem ser editadas livremente:

- valor ja parcialmente pago;
- cliente/veiculo/origem depois de existir pagamento associado.

### 4.3 Pagamentos confirmados

Pagamentos confirmados devem ser tratados como historico.

Correcao futura:

- por estorno;
- por evento complementar;
- por ajuste auditavel vinculado ao evento anterior.

## 5. Regra de cancelamento

Cancelamento e permitido quando:

- a obrigacao ainda nao foi liquidada;
- o atendimento ou faturamento foi cancelado legitimamente;
- a decisao foi registrada com motivo.

Efeito esperado:

- registro muda para status de cancelado;
- historico permanece;
- documentos ja emitidos podem ser marcados como substituidos, nunca apagados silenciosamente.

## 6. Regra de estorno

Estorno deve ser tratado como evento financeiro novo.

Obrigatorio:

- referenciar o pagamento original;
- registrar motivo;
- preservar valor original, valor estornado e saldo resultante;
- refletir no caixa por evento de reversao correspondente.

Proibido:

- editar retroativamente um pagamento confirmado como se ele nunca tivesse existido.

## 7. Regra de pagamento parcial

Pagamento parcial deve obedecer ao seguinte modelo:

1. registrar valor pago como evento de pagamento;
2. registrar reflexo em caixa do valor pago;
3. manter o saldo remanescente como `receivable` controlado;
4. registrar o destino do saldo remanescente:
   - mesmo receivable;
   - nova fatura;
   - fatura existente;
   - novo pagamento em aberto.

Obrigatorio:

- preservar a cadeia de origem;
- nao perder o total original;
- nao sobrescrever o saldo anterior sem rastro.

## 8. Regra de pagamento pendente

Pagamento pendente significa:

- obrigacao existe;
- caixa ainda nao recebeu o valor final;
- o status operacional pode depender de confirmacao posterior.

Consequencia:

- `cash_entry` pendente nao equivale a receita realizada;
- dashboards e relatorios devem distinguir confirmado de pendente;
- lembretes e cobrancas precisam apontar para o registro pendente correto.

## 9. Regra de documentos e comprovantes

Todo documento financeiro emitido deve:

- apontar para uma origem financeira;
- ter numero ou referencia;
- registrar data de emissao;
- preservar metadados mesmo quando o storage mudar no futuro.

Comprovante anexado:

- nao substitui o evento financeiro;
- apenas o evidencia.

## 10. Regra de ownership operacional

Enquanto a governanca de perfis ainda e local ao frontend, recomenda-se:

- operador pode originar evento via atendimento;
- administrador pode liquidar, cancelar, rerrotear saldo e ajustar configuracoes;
- integracoes futuras com backend devem reforcar essa separacao por papel.

## 11. Decisao desta fase

O dominio financeiro do LavaPrime passa a seguir a regra de que somente dados abertos e nao liquidados sao livremente editaveis. Qualquer dado confirmado, pago, cancelado ou estornado deve permanecer historico e sofrer apenas eventos complementares.
