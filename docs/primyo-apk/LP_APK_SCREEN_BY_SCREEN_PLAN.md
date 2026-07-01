# LP APK Screen By Screen Plan

## Objetivo

Registrar a trilha oficial tela por tela do app `LavaPrime`.

| Tela Android | Modulo Web de referencia | Rotina funcional que deve preservar | Fase responsavel | Dependencias | Risco | Criterio de aceite visual | Criterio de aceite funcional |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Splash | entrada institucional | marca oficial e inicio rapido | `LP-APK-006` | `LP-APK-005` | Baixo | logo oficial, contraste e safe area corretos | app encaminha para inicializacao sem erro |
| Inicializacao | bootstrap/app shell | checagem de sessao, DB e estado local | `LP-APK-006` | `LP-APK-006` | Medio | transicao limpa e nativa | define rota correta com base no estado local |
| Login | acesso local atual do Web | entrada por usuario e perfil | `LP-APK-007` | `LP-APK-006` | Medio | formulario legivel e profissional | login local e bloqueio de erro funcionam |
| Selecao de perfil | `Admin` / `Operador` | escolher o contexto operacional | `LP-APK-007` | `LP-APK-007` | Medio | seletor claro e touch-friendly | perfil impacta rotas permitidas |
| Shell / Navegacao | estrutura principal do Web | navegacao por modulos e logout | `LP-APK-008` | `LP-APK-007` | Medio | drawer/top bar coerentes com a marca | rotas e guards obedecem o perfil |
| Dashboard | dashboard Web | visao geral operacional e atalhos | `LP-APK-009` | `LP-APK-008` | Medio | cards, hierarquia e estados legiveis | KPIs principais carregam do estado local |
| Patio | patio Web | listar atendimentos, filtrar e agir rapido | `LP-APK-010` | `LP-APK-008` | Alto | lista operacional clara, estados visiveis | operador consegue acompanhar o patio |
| Novo atendimento | patio + atendimento | abrir atendimento a partir do fluxo real | `LP-APK-011` | `LP-APK-014`, `LP-APK-015`, `LP-APK-016` | Alto | formulario compacto e legivel | atendimento cria rascunho offline valido |
| Atendimento em execucao | patio + servicos | editar, adicionar itens e observacoes | `LP-APK-012` | `LP-APK-011` | Alto | itens e acoes rapidas sem excesso visual | atendimento evolui sem internet |
| Finalizacao de atendimento | fechamento operacional | concluir servico e preparar recebimento | `LP-APK-013` | `LP-APK-012`, `LP-APK-021` | Alto | resumo final claro | estado final e totais ficam rastreaveis |
| Clientes | cadastros Web | criar, buscar e editar clientes | `LP-APK-014` | `LP-APK-008` | Medio | busca, lista e formulario coerentes | cliente salva offline com campos corretos |
| Veiculos | cadastros Web | criar, vincular e consultar veiculos | `LP-APK-015` | `LP-APK-014` | Medio | placa e vinculo bem destacados | veiculo vincula ao cliente corretamente |
| Servicos | catalogo Web | manter catalogo e usar no atendimento | `LP-APK-016` | `LP-APK-008` | Medio | catalogo claro e status ativo legivel | servico fica disponivel no fluxo operacional |
| Produtos | catalogo/vendas Web | manter catalogo vendavel | `LP-APK-017` | `LP-APK-008` | Medio | preco, estoque e estado legiveis | produto pode ser usado em venda/atendimento |
| Insumos | estoque tecnico Web | separar insumo de produto | `LP-APK-018` | `LP-APK-016`, `LP-APK-017` | Alto | tela evita confusao com produto | insumo possui identidade e estoque proprios |
| Orcamentos | propostas Web | montar pre-venda/orcamento | `LP-APK-019` | `LP-APK-014` a `LP-APK-017` | Medio | proposta clara e imprimivel depois | itens e validade ficam persistidos |
| Vendas | comercial Web | vender itens com total e forma de pagamento | `LP-APK-020` | `LP-APK-017`, `LP-APK-021` | Medio | checkout mobile enxuto | venda registra itens e total |
| Pagamentos | pagamentos/financeiro Web | registrar recebimento e status | `LP-APK-021` | `LP-APK-013`, `LP-APK-020` | Alto | formas de pagamento claras | pagamento fica vinculado e rastreavel |
| Documentos | documentos/recibos Web | gerar recibo, ordem e comprovante | `LP-APK-022` | `LP-APK-021`, `LP-APK-024` | Alto | preview nativo limpo | documento nasce de dados estruturados |
| Impressao | recibos/ordens | imprimir bobina termica | `LP-APK-023` | `LP-APK-022`, `LP-APK-024` | Alto | preview 58mm/80mm consistente | shell de impressao aceita jobs reais |
| Empresa | meu negocio/configuracoes | dados institucionais do lava jato | `LP-APK-024` | `LP-APK-008` | Medio | formulario institucional coerente | dados alimentam recibos e layout |
| Financeiro | financeiro Web | resumo diario e pendencias | `LP-APK-025` | `LP-APK-021`, `LP-APK-024` | Medio | resumo legivel em mobile | totalizadores e pendencias fazem sentido |
| Relatorios | relatorios Web | consultas resumidas para gestao | `LP-APK-026` | `LP-APK-009`, `LP-APK-010`, `LP-APK-025` | Medio | visual limpo e sem poluicao | consultas principais respondem perguntas reais |
| Seguranca / Sync | configuracoes/sync | fila, conectividade, erros e auditoria | `LP-APK-028`, `LP-APK-029` | `LP-APK-027` | Alto | estados de sync claros e em portugues | fila e auditoria refletem eventos reais |
| Configuracoes | shell/configuracoes | versao, tema, dados locais e saida | `LP-APK-008`, `LP-APK-024` | `LP-APK-008` | Baixo | tela enxuta e profissional | usuario consegue revisar estado local e versao |

