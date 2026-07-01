# LP APK Requirements

## Objetivo

Registrar os requisitos obrigatorios do app Android oficial `LavaPrime`.

## Matriz oficial inicial

| ID | Nome | Modulo | Descricao | Referencia Web | Perfil permitido | Dados envolvidos | Offline necessario | Impressao relacionada | Fase responsavel | Prioridade | Criterio de aceite | Status inicial |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `APK-AUTH-001` | Login | Auth | permitir entrada local controlada no app | login/sessao atual do Web | Admin, Operador | usuario, perfil, sessao | `Sim` | `Nao` | `LP-APK-007` | `P1` | usuario entra com feedback claro e sem quebrar shell | `partial` |
| `APK-AUTH-002` | Selecao de perfil | Auth | escolher contexto `Administrador` ou `Operador` | permissao/perfis atuais | Admin, Operador | perfil, permissoes, sessao | `Sim` | `Nao` | `LP-APK-007` | `P1` | perfil altera areas visiveis e acoes permitidas | `partial` |
| `APK-SHELL-001` | Navegacao principal | Shell | fornecer shell mobile nativo com rotas e logout | shell e menu do Web | Admin, Operador | sessao, rotas, estado de menu | `Sim` | `Nao` | `LP-APK-008` | `P1` | navegacao funciona sem depender do Web | `partial` |
| `APK-DASH-001` | Dashboard operacional | Dashboard | resumir a operacao principal em cards e atalhos | dashboard Web | Admin | atendimentos, estoque, sync, receita | `Parcial` | `Nao` | `LP-APK-009` | `P1` | dashboard mostra KPIs uteis e legiveis | `partial` |
| `APK-PATIO-001` | Listar patio | Patio | listar atendimentos/veiculos em operacao | patio Web | Admin, Operador | atendimento, cliente, veiculo, status | `Sim` | `Nao` | `LP-APK-010` | `P1` | patio exibe lista operacional clara | `partial` |
| `APK-PATIO-002` | Abrir atendimento pelo patio | Patio | iniciar ou abrir um atendimento a partir do patio | patio + fluxo de atendimento Web | Admin, Operador | atendimento, cliente, veiculo, servicos | `Sim` | `Nao` | `LP-APK-011` | `P1` | o patio encaminha ao atendimento correto | `partial` |
| `APK-ATT-001` | Criar atendimento | Atendimento | criar atendimento offline | fluxo operacional Web | Admin, Operador | atendimento, cliente, veiculo, servicos iniciais | `Sim` | `Futuro` | `LP-APK-011` | `P1` | atendimento nasce com dados minimos coerentes | `not-started` |
| `APK-ATT-002` | Editar atendimento | Atendimento | editar atendimento em execucao | fluxo operacional Web | Admin, Operador | atendimento, itens, observacoes, status | `Sim` | `Futuro` | `LP-APK-012` | `P1` | atendimento pode ser atualizado e salvo offline | `not-started` |
| `APK-ATT-003` | Finalizar atendimento | Atendimento | encerrar atendimento com totais e rastreabilidade | fechamento do Web | Admin, Operador | atendimento, totais, status final | `Sim` | `Sim` | `LP-APK-013` | `P1` | atendimento finalizado gera estado fechado coerente | `not-started` |
| `APK-CUST-001` | Cadastrar cliente | Clientes | criar e editar clientes | clientes Web | Admin, Operador | cliente, documento, telefone, observacoes | `Sim` | `Nao` | `LP-APK-014` | `P1` | cliente persiste offline conforme regra de negocio | `partial` |
| `APK-VEH-001` | Cadastrar veiculo | Veiculos | criar e editar veiculos vinculados | veiculos Web | Admin, Operador | veiculo, placa, cliente, observacoes | `Sim` | `Nao` | `LP-APK-015` | `P1` | veiculo vincula e persiste corretamente | `partial` |
| `APK-SERV-001` | Gerenciar servicos | Servicos | manter catalogo de servicos ativo | servicos Web | Admin | servico, preco, duracao, consumo previsto | `Sim` | `Nao` | `LP-APK-016` | `P1` | servicos ficam disponiveis para uso operacional | `not-started` |
| `APK-PROD-001` | Gerenciar produtos | Produtos | manter catalogo comercial de produtos | produtos Web | Admin | produto, preco, custo, estoque | `Sim` | `Nao` | `LP-APK-017` | `P1` | produtos ficam disponiveis para venda/uso | `partial` |
| `APK-SUP-001` | Gerenciar insumos | Insumos | manter catalogo tecnico de insumos separado de produto | insumos Web | Admin | insumo, unidade, custo, estoque minimo | `Sim` | `Nao` | `LP-APK-018` | `P1` | insumos possuem modelo proprio e utilizavel | `not-started` |
| `APK-BUD-001` | Criar orcamento/pre-venda | Orcamentos | registrar proposta comercial mobile | orcamentos/pre-vendas Web | Admin, Operador | itens, cliente, veiculo, validade | `Sim` | `Sim` | `LP-APK-019` | `P2` | proposta e salva e consultavel | `not-started` |
| `APK-SALE-001` | Registrar venda | Vendas | registrar venda avulsa ou vinculada | vendas Web | Admin, Operador | itens, totais, forma de pagamento | `Sim` | `Sim` | `LP-APK-020` | `P2` | venda persistida com total coerente | `not-started` |
| `APK-PAY-001` | Registrar pagamento | Pagamentos | registrar recebimentos e status | pagamentos/financeiro Web | Admin, Operador | pagamento, metodo, valor, origem | `Sim` | `Sim` | `LP-APK-021` | `P1` | pagamento rastreavel e vinculado | `not-started` |
| `APK-DOC-001` | Gerar recibo/documento | Documentos | gerar comprovantes estruturados do mobile | documentos/recibos Web | Admin, Operador | origem, empresa, cliente, itens, total | `Sim` | `Sim` | `LP-APK-022` | `P2` | recibo/documento e gerado a partir dos dados corretos | `not-started` |
| `APK-PRINT-001` | Imprimir recibo termico | Impressao | emitir recibo em 58mm/80mm | impressao futura alinhada ao dominio Web | Admin, Operador | payload de documento e impressora | `Sim` | `Sim` | `LP-APK-023` | `P2` | preview e shell de impressao funcionam | `not-started` |
| `APK-COMP-001` | Configurar dados da empresa | Empresa | manter dados institucionais do lava jato | meu negocio/empresa Web | Admin | empresa, contato, pix, rodape | `Sim` | `Sim` | `LP-APK-024` | `P2` | dados da empresa persistem e alimentam documentos | `not-started` |
| `APK-FIN-001` | Resumo financeiro mobile | Financeiro | resumir recebimentos e pendencias | financeiro Web | Admin | financeiro, pagamentos, pendencias | `Parcial` | `Nao` | `LP-APK-025` | `P2` | resumo responde ao basico da rotina de caixa | `not-started` |
| `APK-REP-001` | Relatorios mobile | Relatorios | consultar relatorios simplificados no mobile | relatorios Web | Admin | atendimentos, receita, estoque, sync | `Parcial` | `Nao` | `LP-APK-026` | `P3` | relatorios resumidos sao legiveis e uteis | `not-started` |
| `APK-SYNC-001` | Registrar operacao offline | Sync | registrar operacoes pendentes localmente | estrategia offline do programa | Admin, Operador | fila, payload, entidade, status | `Sim` | `Nao` | `LP-APK-027`, `LP-APK-028` | `P1` | escrita local gera pendencia coerente | `partial` |
| `APK-SYNC-002` | Sincronizar ao reconectar | Sync | processar fila quando houver conectividade | sync futuro Web/Backend | Admin, Operador | fila, conectividade, retry, conflito | `Sim` | `Nao` | `LP-APK-028` | `P1` | fila possui protocolo oficial de sync | `not-started` |
| `APK-AUD-001` | Registrar auditoria minima | Auditoria | rastrear eventos sensiveis no app | trilha de auditoria do programa | Admin, Operador | ator, acao, entidade, data | `Sim` | `Nao` | `LP-APK-029` | `P1` | eventos minimos ficam auditaveis | `partial` |

