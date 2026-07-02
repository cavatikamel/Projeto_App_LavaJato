# LP APK Requirements Dependency Map

## Objetivo

Registrar as dependencias formais entre requisitos para impedir implementacao fora de ordem.

| Requisito | Depende de | Bloqueia | Dados necessarios | Tela relacionada | Risco | Fase recomendada | Observacao |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `APK-BOOT-001` | `LP-APK-005` | `APK-BOOT-002`, `APK-AUTH-001` | assets oficiais, versao, rota inicial | Splash | `low` | `LP-APK-006` | sem splash coerente, a entrada oficial continua incompleta |
| `APK-BOOT-002` | `APK-BOOT-001` | `APK-AUTH-001`, `APK-SHELL-001`, `APK-SYNC-003` | sessao local, db local, fila local | Inicializacao | `medium` | `LP-APK-006` | precisa validar sessao e estado local antes da navegacao |
| `APK-AUTH-001` | `APK-BOOT-002` | `APK-AUTH-002`, `APK-SHELL-001` | usuario, senha, sessao | Login | `medium` | `LP-APK-007` | login local e pre-condicao do shell |
| `APK-AUTH-002` | `APK-AUTH-001` | `APK-PERM-001`, `APK-SHELL-001` | perfil, permissoes, sessao | Login, Selecao de perfil | `medium` | `LP-APK-007` | perfil dirige rotas e restricoes |
| `APK-SHELL-001` | `APK-AUTH-001`, `APK-AUTH-002` | `APK-DASH-001`, `APK-PATIO-001`, `APK-COMP-001` | sessao, rotas, modulo ativo | Shell | `medium` | `LP-APK-008` | shell governa entrada em todos os modulos |
| `APK-PERM-001` | `APK-AUTH-002`, `APK-SHELL-001` | modulos administrativos sensiveis | perfil, policy local | Shell | `medium` | `LP-APK-008` | guardas devem nascer cedo para evitar retrabalho |
| `APK-DASH-001` | `APK-SHELL-001`, `APK-PATIO-001`, `APK-PAY-001`, `APK-FIN-001`, `APK-SYNC-003` | `APK-REP-001` | kpis de patio, financeiro, estoque, sync | Dashboard | `high` | `LP-APK-009` | dashboard depende de agregados confiaveis |
| `APK-PATIO-001` | `APK-SHELL-001`, `APK-ATT-001` | `APK-PATIO-002`, `APK-PATIO-003`, `APK-PATIO-004`, `APK-DASH-001` | atendimento, cliente, veiculo, status | Patio | `high` | `LP-APK-010` | patio e a fila operacional central |
| `APK-PATIO-002` | `APK-PATIO-001`, `APK-ATT-001`, `APK-BUD-002` | `APK-ATT-002`, `APK-ATT-003` | atendimento base, quote opcional | Patio, Novo atendimento | `high` | `LP-APK-011` | conversao de quote e entrada manual convergem aqui |
| `APK-PATIO-003` | `APK-PATIO-001`, `APK-ATT-002`, `APK-ATT-003`, `APK-ATT-004` | `APK-ATT-005`, `APK-ATT-008` | atendimento em execucao, itens | Patio, Atendimento em execucao | `high` | `LP-APK-012` | edicao precisa operar sobre itens e historico |
| `APK-PATIO-004` | `APK-PATIO-001`, `APK-ATT-006`, `APK-PAY-001`, `APK-DOC-001` | `APK-REP-001` | totais, pagamento, documento | Patio, Finalizacao | `critical` | `LP-APK-013` | finalizar pelo patio depende do fechamento completo |
| `APK-ATT-001` | `APK-CUST-001`, `APK-VEH-001`, `APK-SERV-001` | `APK-PATIO-001`, `APK-ATT-002`, `APK-ATT-003`, `APK-ATT-006` | cliente, veiculo, servico, status inicial | Novo atendimento | `high` | `LP-APK-011` | atendimento e o centro do dominio operacional |
| `APK-ATT-002` | `APK-ATT-001` | `APK-PATIO-003`, `APK-ATT-007`, `APK-ATT-008` | atendimento, notes, status history | Atendimento em execucao | `high` | `LP-APK-012` | edicao base precisa existir antes dos complementos |
| `APK-ATT-003` | `APK-ATT-001`, `APK-SERV-001` | `APK-ATT-005`, `APK-DOC-002` | serviceEntries, snapshots | Atendimento em execucao | `high` | `LP-APK-012` | servicos alteram total e documento |
| `APK-ATT-004` | `APK-ATT-001`, `APK-PROD-001` | `APK-ATT-005`, `APK-SALE-002`, `APK-DOC-002` | productEntries, estoque | Atendimento em execucao | `high` | `LP-APK-012` | produto vinculado altera total e estoque |
| `APK-ATT-005` | `APK-ATT-003`, `APK-ATT-004`, `APK-PAY-001` | `APK-ATT-006`, `APK-PAY-002`, `APK-DOC-001` | subtotal, desconto, extras, total | Atendimento em execucao, Finalizacao | `critical` | `LP-APK-012`, `LP-APK-013` | total confiavel e pre-condicao do fechamento |
| `APK-ATT-006` | `APK-ATT-005`, `APK-PAY-001`, `APK-DOC-001` | `APK-PATIO-004`, `APK-ATT-008` | fechamento, payment refs, document refs | Finalizacao de atendimento | `critical` | `LP-APK-013` | finalizar depende de pagamento e documento estruturado |
| `APK-ATT-007` | `APK-ATT-001`, `APK-AUD-001` | cancelamentos rastreaveis | motivo, status final, audit event | Atendimento em execucao | `high` | `LP-APK-013` | cancelamento sem trilha e proibido |
| `APK-ATT-008` | `APK-ATT-002`, `APK-PAY-001`, `APK-DOC-001`, `APK-AUD-001` | `APK-REP-001` | historicos, refs, eventos | Atendimento em execucao, Documentos | `medium` | `LP-APK-012`, `LP-APK-013` | historico consolida a trilha do atendimento |
| `APK-CUST-001` | `APK-SHELL-001` | `APK-CUST-002`, `APK-CUST-003`, `APK-ATT-001`, `APK-VEH-003` | customer contract basico | Clientes | `high` | `LP-APK-014` | cliente e requisito base para a operacao |
| `APK-CUST-002` | `APK-CUST-001` | `APK-CUST-003`, `APK-ATT-001` | customer update, refs | Clientes | `medium` | `LP-APK-014` | edicao precisa preservar ownership e vinculos |
| `APK-CUST-003` | `APK-CUST-001`, `APK-PAY-001` | `APK-FIN-002`, `APK-PATIO-004` em fluxo faturado | document, billing flags, invoice policy | Clientes, Pagamentos | `high` | `LP-APK-014` | faturado exige documento e aprovacao |
| `APK-VEH-001` | `APK-CUST-001` | `APK-VEH-002`, `APK-VEH-003`, `APK-ATT-001` | vehicle contract, owner atual | Veiculos | `high` | `LP-APK-015` | veiculo sem owner claro quebra atendimento |
| `APK-VEH-002` | `APK-VEH-001` | `APK-ATT-001`, `APK-DOC-002` | alertas, notes, historico | Veiculos | `medium` | `LP-APK-015` | dados do veiculo alimentam operacao e documento |
| `APK-VEH-003` | `APK-CUST-001`, `APK-VEH-001` | `APK-ATT-001` | currentCustomerId, owner refs | Veiculos, Clientes | `high` | `LP-APK-015` | ownership e estruturante |
| `APK-SERV-001` | `APK-SHELL-001` | `APK-ATT-001`, `APK-ATT-003`, `APK-BUD-001` | service catalog | Servicos | `medium` | `LP-APK-016` | catalogo de servicos alimenta varios fluxos |
| `APK-PROD-001` | `APK-SHELL-001` | `APK-ATT-004`, `APK-SALE-001`, `APK-SALE-002` | product catalog, estoque | Produtos | `medium` | `LP-APK-017` | catalogo de produtos sustenta vendas e add-ons |
| `APK-SUP-001` | `APK-SERV-001` | consumo tecnico e estoque critico | supply catalog | Insumos | `high` | `LP-APK-018` | insumo separado evita modelagem errada |
| `APK-BUD-001` | `APK-CUST-001`, `APK-VEH-001`, `APK-SERV-001`, `APK-PROD-001` | `APK-BUD-002`, `APK-DOC-003` | quote, itens, validade | Orcamentos | `medium` | `LP-APK-019` | proposta precisa dos catalogos e cadastros |
| `APK-BUD-002` | `APK-BUD-001`, `APK-ATT-001` | `APK-PATIO-002` | quote refs, atendimento | Orcamentos, Patio | `medium` | `LP-APK-019` | conversao depende de quote persistido |
| `APK-SALE-001` | `APK-PROD-001`, `APK-PAY-001` | `APK-DOC-001`, `APK-FIN-001` | venda, itens, pagamento | Vendas | `medium` | `LP-APK-020` | venda avulsa precisa checkout e pagamento |
| `APK-SALE-002` | `APK-ATT-004`, `APK-PAY-001` | `APK-DOC-001`, `APK-FIN-001` | add-on vinculado ao atendimento | Atendimento em execucao, Vendas | `medium` | `LP-APK-020` | venda vinculada depende do atendimento |
| `APK-PAY-001` | `APK-COMP-001`, `APK-ATT-005` ou `APK-SALE-001` | `APK-PAY-002`, `APK-FIN-001`, `APK-DOC-001`, `APK-ATT-006` | payment contract, source refs, methods | Pagamentos, Finalizacao, Vendas | `critical` | `LP-APK-021` | pagamento e centro do fechamento financeiro |
| `APK-PAY-002` | `APK-PAY-001`, `APK-FIN-002` | `APK-ATT-006`, `APK-REP-001` | paidAmount, remainingAmount, open refs | Pagamentos, Financeiro | `critical` | `LP-APK-021` | parcial e pendente precisam de saldo rastreavel |
| `APK-FIN-001` | `APK-PAY-001`, `APK-PAY-002`, `APK-DASH-001` | `APK-REP-001` | financial context, cash/open/invoice refs | Financeiro, Dashboard | `high` | `LP-APK-025` | resumo financeiro deriva de eventos reais |
| `APK-FIN-002` | `APK-PAY-001`, `APK-PAY-002` | `APK-PAY-002`, `APK-REP-001` | open payments, invoices, saldo | Financeiro, Pagamentos | `high` | `LP-APK-025` | baixa de pendencia depende do payment model |
| `APK-DOC-001` | `APK-COMP-001`, `APK-PAY-001` | `APK-ATT-006`, `APK-PRINT-001`, `APK-PRINT-002`, `APK-PRINT-004` | document payload, empresa, totais | Documentos, Finalizacao | `high` | `LP-APK-022` | sem documento estruturado nao ha impressao coerente |
| `APK-DOC-002` | `APK-ATT-001`, `APK-ATT-003`, `APK-ATT-004` | `APK-PRINT-001`, `APK-PRINT-002` | atendimento, itens, observacoes | Documentos, Atendimento | `medium` | `LP-APK-022` | ordem/resumo depende do atendimento vivo |
| `APK-DOC-003` | `APK-BUD-001`, `APK-COMP-001` | `APK-PRINT-001`, `APK-PRINT-002` | quote payload, validade | Documentos, Orcamentos | `medium` | `LP-APK-022` | proposta documentada depende de quote consolidado |
| `APK-PRINT-001` | `APK-DOC-001`, `APK-PRINT-003`, `APK-PRINT-004` | entrega 58mm | document payload, printer config | Impressao | `high` | `LP-APK-023` | shell de impressao deve nascer depois do documento |
| `APK-PRINT-002` | `APK-DOC-001`, `APK-PRINT-003`, `APK-PRINT-004` | entrega 80mm | document payload, printer config | Impressao | `high` | `LP-APK-023` | 80mm compartilha a mesma base documental |
| `APK-PRINT-003` | `APK-COMP-001` | `APK-PRINT-001`, `APK-PRINT-002`, `APK-PRINT-004` | printer settings | Impressao, Configuracoes | `medium` | `LP-APK-023` | configuracao de impressora e pre-condicao do job |
| `APK-PRINT-004` | `APK-DOC-001`, `APK-PRINT-003` | `APK-PRINT-001`, `APK-PRINT-002` | preview payload | Impressao, Documentos | `medium` | `LP-APK-023` | preview textual e o primeiro shell seguro |
| `APK-COMP-001` | `APK-SHELL-001` | `APK-PAY-001`, `APK-DOC-001`, `APK-PRINT-003` | company data, Pix, methods | Empresa, Configuracoes | `medium` | `LP-APK-024` | empresa alimenta cobranca e documentos |
| `APK-REP-001` | `APK-DASH-001`, `APK-FIN-001`, `APK-ATT-008`, `APK-SYNC-003` | consultas operacionais | agregados operacionais e financeiros | Relatorios | `medium` | `LP-APK-026` | relatorios ficam para depois da base operacional |
| `APK-SYNC-001` | `APK-BOOT-002` + entidades criticas | `APK-SYNC-002`, `APK-SYNC-003`, `APK-AUD-001` | queue item, payload, action | Seguranca/Sync | `critical` | `LP-APK-027` | toda operacao local precisa poder gerar pendencia |
| `APK-SYNC-002` | `APK-SYNC-001` | `APK-SYNC-003` | retry, conflict policy, ids | Seguranca/Sync | `critical` | `LP-APK-028` | sync futuro depende da fila oficial |
| `APK-SYNC-003` | `APK-SYNC-001`, `APK-SYNC-002` | `APK-DASH-001`, `APK-REP-001` | queue summary, connectivity, errors | Seguranca/Sync, Dashboard | `high` | `LP-APK-028` | status de sync exposto ao usuario evita operacao cega |
| `APK-AUD-001` | `APK-AUTH-001`, `APK-SYNC-001`, eventos de negocio | rastreabilidade minima transversal | actor, action, entity, outcome | Seguranca/Sync, Historicos | `high` | `LP-APK-029` | auditoria atravessa login, cadastros, atendimento e pagamento |
