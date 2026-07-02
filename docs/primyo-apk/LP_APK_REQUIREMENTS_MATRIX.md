# LP APK Requirements Matrix

## Objetivo

Refletir o estado consolidado dos requisitos obrigatorios do APK apos baseline funcional Web, decisao de reuse Android e baseline visual mobile.

## Regras desta matriz

- `status Web` nao sobe acima de `mapped` sem nova evidencia funcional;
- `status Android atual` descreve apenas o checkpoint atual, nao autorizacao de reaproveitamento;
- `status testes` permanece `not-started` nesta fase, porque nao houve implementacao nova;
- `decisao` considera a recomendacao oficial de `clean-foundation-inside-current-project`.

| ID | Requisito | Modulo | Status Web | Status Android atual | Status visual | Status funcional | Status dados | Status offline | Status testes | Fase alvo | Prioridade | Decisao |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `APK-BOOT-001` | Splash oficial | Foundation | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-006` | `P1` | `proceed-on-clean-foundation` |
| `APK-BOOT-002` | Inicializacao local | Foundation | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-006` | `P1` | `proceed-on-clean-foundation` |
| `APK-AUTH-001` | Login | Auth | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-007` | `P1` | `proceed-on-clean-foundation` |
| `APK-AUTH-002` | Selecao de perfil | Auth | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-007` | `P1` | `proceed-on-clean-foundation` |
| `APK-SHELL-001` | Navegacao principal | Shell | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-008` | `P1` | `proceed-on-clean-foundation` |
| `APK-PERM-001` | Permissoes por perfil | Shell | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-008` | `P1` | `proceed-on-clean-foundation` |
| `APK-DASH-001` | Dashboard operacional | Dashboard | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-009` | `P1` | `proceed-on-clean-foundation` |
| `APK-PATIO-001` | Listar patio | Patio | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-010` | `P1` | `proceed-on-clean-foundation` |
| `APK-PATIO-002` | Abrir atendimento pelo patio | Patio | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-011` | `P1` | `proceed-on-clean-foundation` |
| `APK-PATIO-003` | Editar atendimento pelo patio | Patio | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-012` | `P1` | `proceed-after-data-foundation` |
| `APK-PATIO-004` | Finalizar atendimento pelo patio | Patio | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-013` | `P1` | `proceed-after-payment-and-document-foundation` |
| `APK-ATT-001` | Criar atendimento | Atendimento | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-011` | `P1` | `proceed-after-data-foundation` |
| `APK-ATT-002` | Editar atendimento | Atendimento | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-012` | `P1` | `proceed-after-data-foundation` |
| `APK-ATT-003` | Adicionar servicos ao atendimento | Atendimento | `mapped` | `not-started` | `not-started` | `not-started` | `partial` | `not-started` | `not-started` | `LP-APK-012` | `P1` | `proceed-after-service-catalog-foundation` |
| `APK-ATT-004` | Adicionar produtos ao atendimento | Atendimento | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-012` | `P1` | `proceed-after-product-foundation` |
| `APK-ATT-005` | Calcular total do atendimento | Atendimento | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-012`, `LP-APK-013` | `P1` | `proceed-after-item-model-foundation` |
| `APK-ATT-006` | Finalizar atendimento | Atendimento | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-013` | `P1` | `proceed-after-payment-and-document-foundation` |
| `APK-ATT-007` | Cancelar atendimento | Atendimento | `mapped` | `not-started` | `not-started` | `not-started` | `partial` | `not-started` | `not-started` | `LP-APK-013` | `P1` | `proceed-after-audit-foundation` |
| `APK-ATT-008` | Historico do atendimento | Atendimento | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-012`, `LP-APK-013` | `P2` | `proceed-after-document-and-audit-foundation` |
| `APK-CUST-001` | Cadastrar cliente | Clientes | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-014` | `P1` | `proceed-after-contract-foundation` |
| `APK-CUST-002` | Editar cliente | Clientes | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-014` | `P1` | `proceed-after-contract-foundation` |
| `APK-CUST-003` | Cliente faturado com documento obrigatorio | Clientes | `mapped` | `not-started` | `not-started` | `not-started` | `partial` | `not-started` | `not-started` | `LP-APK-014` | `P1` | `proceed-after-customer-foundation` |
| `APK-VEH-001` | Cadastrar veiculo | Veiculos | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-015` | `P1` | `proceed-after-contract-foundation` |
| `APK-VEH-002` | Editar veiculo | Veiculos | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-015` | `P1` | `proceed-after-contract-foundation` |
| `APK-VEH-003` | Vincular veiculo ao cliente | Veiculos | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-015` | `P1` | `proceed-after-customer-and-vehicle-foundation` |
| `APK-SERV-001` | Gerenciar servicos | Servicos | `mapped` | `not-started` | `not-started` | `not-started` | `partial` | `not-started` | `not-started` | `LP-APK-016` | `P1` | `proceed-on-clean-foundation` |
| `APK-PROD-001` | Gerenciar produtos | Produtos | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-017` | `P1` | `proceed-after-contract-foundation` |
| `APK-SUP-001` | Gerenciar insumos | Insumos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-018` | `P1` | `proceed-on-clean-foundation` |
| `APK-BUD-001` | Criar orcamento/pre-venda | Orcamentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-019` | `P2` | `proceed-after-catalog-and-customer-foundation` |
| `APK-BUD-002` | Converter orcamento em atendimento | Orcamentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-019` | `P2` | `proceed-after-quote-and-attendance-foundation` |
| `APK-SALE-001` | Registrar venda | Vendas | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-020` | `P2` | `proceed-after-product-and-payment-foundation` |
| `APK-SALE-002` | Venda vinculada ao atendimento | Vendas | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-020` | `P2` | `proceed-after-attendance-and-payment-foundation` |
| `APK-PAY-001` | Registrar pagamento | Pagamentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-021` | `P1` | `proceed-after-payment-contract-foundation` |
| `APK-PAY-002` | Pagamento parcial ou pendente | Pagamentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-021` | `P1` | `proceed-after-payment-contract-foundation` |
| `APK-FIN-001` | Resumo financeiro mobile | Financeiro | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-025` | `P2` | `proceed-after-payment-foundation` |
| `APK-FIN-002` | Pagamentos em aberto | Financeiro | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-025` | `P1` | `proceed-after-payment-foundation` |
| `APK-DOC-001` | Gerar recibo/documento | Documentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-022` | `P1` | `proceed-after-company-and-payment-foundation` |
| `APK-DOC-002` | Ordem/resumo de atendimento | Documentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-022` | `P2` | `proceed-after-attendance-foundation` |
| `APK-DOC-003` | Orcamento/pre-venda em documento | Documentos | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-022` | `P2` | `proceed-after-quote-foundation` |
| `APK-PRINT-001` | Preparar impressao termica 58mm | Impressao | `mapped` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-023` | `P2` | `proceed-after-document-foundation` |
| `APK-PRINT-002` | Preparar impressao termica 80mm | Impressao | `mapped` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-023` | `P2` | `proceed-after-document-foundation` |
| `APK-PRINT-003` | Configurar impressora | Impressao | `mapped` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-023` | `P2` | `proceed-after-design-system-foundation` |
| `APK-PRINT-004` | Preview termico textual | Impressao | `mapped` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `LP-APK-023` | `P2` | `proceed-after-document-foundation` |
| `APK-COMP-001` | Configurar dados da empresa | Empresa | `mapped` | `not-started` | `not-started` | `not-started` | `missing` | `not-started` | `not-started` | `LP-APK-024` | `P1` | `proceed-after-company-contract-foundation` |
| `APK-REP-001` | Relatorios mobile | Relatorios | `mapped` | `not-started` | `not-started` | `not-started` | `partial` | `not-started` | `not-started` | `LP-APK-026` | `P3` | `proceed-after-dashboard-and-financial-foundation` |
| `APK-SYNC-001` | Registrar operacao offline | Sync | `mapped` | `partial` | `partial` | `partial` | `conflict` | `partial` | `not-started` | `LP-APK-027` | `P1` | `proceed-after-clean-data-foundation` |
| `APK-SYNC-002` | Sincronizar ao reconectar | Sync | `mapped` | `partial` | `not-started` | `not-started` | `conflict` | `partial` | `not-started` | `LP-APK-028` | `P1` | `proceed-after-sync-queue-foundation` |
| `APK-SYNC-003` | Exibir status de sincronizacao | Sync | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-028` | `P1` | `proceed-after-sync-queue-foundation` |
| `APK-AUD-001` | Registrar auditoria minima | Auditoria | `mapped` | `partial` | `partial` | `partial` | `partial` | `partial` | `not-started` | `LP-APK-029` | `P1` | `proceed-after-clean-data-foundation` |

## Consolidacao da fase

- requisitos `ready-for-implementation` no plano documental: todos os itens acima, desde que executados sobre a fundacao limpa aprovada em `LP-APK-002`;
- requisitos ainda bloqueados por fundacao de dados: atendimento, pagamento, documentos, sync e cadastros mestres;
- requisito que permanece fora da baseline obrigatoria: `APK-FIN-003`, absorvido por `LPFR-001`.
