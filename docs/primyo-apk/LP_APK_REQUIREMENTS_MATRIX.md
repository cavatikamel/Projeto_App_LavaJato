# LP APK Requirements Matrix

## Objetivo

Registrar o estado atual dos requisitos obrigatorios do app `LavaPrime` apos o baseline funcional real do Web.

## Leitura da LP-APK-002

- o checkpoint Android atual permanece classificado como `partial` ou `not-started` na maior parte dos requisitos;
- `partial` nao significa reaproveitamento sem reescrita: a decisao oficial de reuse da fase e `clean-foundation-inside-current-project`;
- requisitos com `Status dados = conflict` ou `missing` dependem de nova fundacao de Room/modelos antes de poderem ser tratados como implementados.

| ID | Requisito | Modulo | Status Web mapeado | Status Android atual | Status visual | Status funcional | Status dados | Status offline | Status testes | Fase alvo | Percentual interno |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---: |
| `APK-AUTH-001` | Login | Auth | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-007` | 3.5 |
| `APK-AUTH-002` | Selecao de perfil | Auth | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-007` | 1.5 |
| `APK-SHELL-001` | Navegacao principal | Shell | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-008` | 3.0 |
| `APK-DASH-001` | Dashboard operacional | Dashboard | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-009` | 5.0 |
| `APK-PATIO-001` | Listar patio | Patio | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-010` | 3.0 |
| `APK-PATIO-002` | Abrir atendimento pelo patio | Patio | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-011` | 2.0 |
| `APK-ATT-001` | Criar atendimento | Atendimento | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-011` | 5.0 |
| `APK-ATT-002` | Editar atendimento | Atendimento | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-012` | 5.0 |
| `APK-ATT-003` | Finalizar atendimento | Atendimento | `mapped` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-013` | 5.0 |
| `APK-CUST-001` | Cadastrar cliente | Clientes | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-014` | 2.5 |
| `APK-VEH-001` | Cadastrar veiculo | Veiculos | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-015` | 2.5 |
| `APK-SERV-001` | Gerenciar servicos | Servicos | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-016` | 2.0 |
| `APK-PROD-001` | Gerenciar produtos | Produtos | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-017` | 1.5 |
| `APK-SUP-001` | Gerenciar insumos | Insumos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-018` | 1.5 |
| `APK-BUD-001` | Criar orcamento/pre-venda | Orcamentos | `mapped` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-019` | 1.25 |
| `APK-SALE-001` | Registrar venda | Vendas | `mapped` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-020` | 1.25 |
| `APK-PAY-001` | Registrar pagamento | Pagamentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-021` | 1.5 |
| `APK-DOC-001` | Gerar recibo/documento | Documentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-022` | 1.5 |
| `APK-PRINT-001` | Imprimir recibo termico | Impressao | `partial` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-023` | 7.0 |
| `APK-COMP-001` | Configurar dados da empresa | Empresa | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-024` | 1.25 |
| `APK-FIN-001` | Resumo financeiro mobile | Financeiro | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-025` | 1.75 |
| `APK-REP-001` | Relatorios mobile | Relatorios | `mapped` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-026` | 1.5 |
| `APK-SYNC-001` | Registrar operacao offline | Sync | `partial` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-027` | 2.0 |
| `APK-SYNC-002` | Sincronizar ao reconectar | Sync | `partial` | `partial` | `not-started` | `not-started` | `conflict` | `partial` | `not-started` | `LP-APK-028` | 2.0 |
| `APK-AUD-001` | Registrar auditoria minima | Auditoria | `partial` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-029` | 1.0 |

## Leitura consolidada do checkpoint Android atual

- shell parcialmente existente: `APK-AUTH-001`, `APK-AUTH-002`, `APK-SHELL-001`, `APK-DASH-001`, `APK-PATIO-001`, `APK-PATIO-002`, `APK-ATT-001`, `APK-CUST-001`, `APK-VEH-001`, `APK-PROD-001`, `APK-SYNC-001`, `APK-SYNC-002` e `APK-AUD-001`;
- conflito estrutural de dados mais claro: `APK-CUST-001`, `APK-VEH-001`, `APK-PROD-001`, `APK-SYNC-001` e `APK-SYNC-002`;
- dominios ainda ausentes ou nao iniciados no Android atual: `APK-SUP-001`, `APK-BUD-001`, `APK-SALE-001`, `APK-PAY-001`, `APK-DOC-001`, `APK-PRINT-001`, `APK-COMP-001`, `APK-FIN-001` e `APK-REP-001`.
