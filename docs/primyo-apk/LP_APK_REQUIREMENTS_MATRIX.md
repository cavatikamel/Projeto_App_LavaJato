# LP APK Requirements Matrix

## Objetivo

Registrar o estado inicial dos requisitos obrigatorios do app `LavaPrime`.

| ID | Requisito | Modulo | Status Web mapeado | Status Android atual | Status visual | Status funcional | Status dados | Status offline | Status testes | Fase alvo | Percentual interno |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: |
| `APK-AUTH-001` | Login | Auth | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `LP-APK-007` | 3.5 |
| `APK-AUTH-002` | Selecao de perfil | Auth | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `LP-APK-007` | 1.5 |
| `APK-SHELL-001` | Navegacao principal | Shell | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `LP-APK-008` | 3.0 |
| `APK-DASH-001` | Dashboard operacional | Dashboard | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-009` | 5.0 |
| `APK-PATIO-001` | Listar patio | Patio | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-010` | 3.0 |
| `APK-PATIO-002` | Abrir atendimento pelo patio | Patio | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-011` | 2.0 |
| `APK-ATT-001` | Criar atendimento | Atendimento | `to-map` | `partial` | `partial` | `to-map` | `partial` | `partial` | `not-started` | `LP-APK-011` | 5.0 |
| `APK-ATT-002` | Editar atendimento | Atendimento | `to-map` | `partial` | `to-map` | `to-map` | `partial` | `partial` | `not-started` | `LP-APK-012` | 5.0 |
| `APK-ATT-003` | Finalizar atendimento | Atendimento | `to-map` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-013` | 5.0 |
| `APK-CUST-001` | Cadastrar cliente | Clientes | `partial` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-014` | 2.5 |
| `APK-VEH-001` | Cadastrar veiculo | Veiculos | `partial` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-015` | 2.5 |
| `APK-SERV-001` | Gerenciar servicos | Servicos | `to-map` | `partial` | `to-map` | `to-map` | `partial` | `partial` | `not-started` | `LP-APK-016` | 2.0 |
| `APK-PROD-001` | Gerenciar produtos | Produtos | `to-map` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-017` | 1.5 |
| `APK-SUP-001` | Gerenciar insumos | Insumos | `to-map` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-018` | 1.5 |
| `APK-BUD-001` | Criar orcamento/pre-venda | Orcamentos | `to-map` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-019` | 1.25 |
| `APK-SALE-001` | Registrar venda | Vendas | `to-map` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-020` | 1.25 |
| `APK-PAY-001` | Registrar pagamento | Pagamentos | `to-map` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-021` | 1.5 |
| `APK-DOC-001` | Gerar recibo/documento | Documentos | `to-map` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-022` | 1.5 |
| `APK-PRINT-001` | Imprimir recibo termico | Impressao | `to-map` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-023` | 7.0 |
| `APK-COMP-001` | Configurar dados da empresa | Empresa | `to-map` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-024` | 1.25 |
| `APK-FIN-001` | Resumo financeiro mobile | Financeiro | `to-map` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-025` | 1.75 |
| `APK-REP-001` | Relatorios mobile | Relatorios | `to-map` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-026` | 1.5 |
| `APK-SYNC-001` | Registrar operacao offline | Sync | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `partial` | `LP-APK-027` | 2.0 |
| `APK-SYNC-002` | Sincronizar ao reconectar | Sync | `to-map` | `partial` | `not-started` | `not-started` | `conflict` | `partial` | `not-started` | `LP-APK-028` | 2.0 |
| `APK-AUD-001` | Registrar auditoria minima | Auditoria | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-029` | 1.0 |

