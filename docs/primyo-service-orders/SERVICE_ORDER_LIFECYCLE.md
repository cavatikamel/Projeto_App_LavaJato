# Service Order Lifecycle

## Mapeamento inicial

| Status legado | Status interno de OS | Significado |
| --- | --- | --- |
| `agendado` | `scheduled` | atendimento marcado, sem entrada operacional |
| `aguardando` | `waiting` | veiculo no patio aguardando inicio |
| `lavando` | `in_progress` | servico em execucao |
| `pronto` | `ready` | operacionalmente pronto para retirada |
| `finalizado` | `completed` | atendimento encerrado financeiramente |
| `cancelado` | `cancelled` | atendimento cancelado |
| qualquer outro | `unknown` | requer revisao futura |

## Eventos minimos desta fase

- `created`
- `status_changed`
- `payment_registered`
- `document_generated`
- eventos herdados de `attendanceHistory`

## Regras

- a OS nao apaga o historico legado;
- a OS nao muda o status visual do patio nesta fase;
- `completed` continua dependente do fluxo atual de pagamento/finalizacao;
- `ready` continua separado de `completed`, preservando a diferenca entre pronto e entregue.
