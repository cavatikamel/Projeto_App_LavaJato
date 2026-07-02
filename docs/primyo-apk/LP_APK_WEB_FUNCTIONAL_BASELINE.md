# LP APK Web Functional Baseline

## Objetivo

Mapear a referencia funcional real do LavaPrime Web para impedir improviso na reconstrucao do app Android nativo `LavaPrime`.

## Visao geral funcional

- o Web atual e um monolito funcional centrado em `app/main.js`, com boundaries locais de sessao/permissao em `app/boundaries/sessionAccessBoundary.js`;
- o produto roda sobre bootstrap local em `app/demo/lavaprimeBootstrapMode.js`, com massa `demo/teste` e persistencia local;
- os perfis reais observados sao `Administrador` e `Operador`;
- o `Administrador` navega por dashboard, patio, orcamentos, cadastros, estoque, financeiro, documentos, negocio, usuarios e mensagens;
- o `Operador` entra no patio e executa a rotina operacional principal;
- o Android deve preservar a logica operacional do Web, mas sem copiar layout desktop literalmente.

## Perfis existentes

| Perfil | Superficies observadas | Restricoes observadas |
| --- | --- | --- |
| `Administrador` | dashboard, patio, orcamentos, clientes, veiculos, servicos, produtos, insumos, estoque, vendas, financeiro, faturas, pagamentos em aberto, documentos, negocio, usuarios, mensagens | acoes sensiveis e views administrativas dependem de `accessBoundary` |
| `Operador` | login, patio, abertura de atendimento pelo fluxo operacional | nao acessa financeiro, relatorios, documentos, configuracoes, usuarios, cadastros administrativos nem negocio |

## Entidades manipuladas

- `clientRegistry`
- `vehicleRegistry`
- `serviceCatalog`
- `productCatalog`
- `supplyCatalog`
- `serviceSupplyProfiles`
- `patioVehicles`
- `quoteEstimates`
- `productSales`
- `openPayments`
- `billingClients`
- `billingInvoices`
- `invoiceLineItems`
- `cashEntries`
- `documentHistory`
- `adminOperators`
- configuracoes de negocio, Pix, contas bancarias, mensagens e relatorios

## Dependencias entre modulos

- patio depende de clientes, veiculos, servicos, pagamentos, produtos e checklist;
- clientes dependem de placas/veiculos vinculados e, quando faturados, de aprovacao administrativa;
- veiculos dependem de cliente, historico, cuidados especiais e referencias FIPE locais;
- servicos dependem de tipo/categoria de veiculo e podem depender de ficha tecnica de insumos;
- produtos e insumos dependem de estoque e movimentos;
- orcamentos podem virar entrada de patio;
- pagamentos, pagamentos em aberto e faturas dependem de atendimento, venda, cliente faturado e configuracoes financeiras;
- documentos e relatorios dependem de dados da empresa, pagamento e historico operacional;
- mensagens dependem de telefone, templates e contexto do dominio.

## Regras observadas

- login exige usuario, senha e perfil selecionado;
- `Operador` vai direto para o patio; `Administrador` entra no shell administrativo;
- cliente comum pode ficar sem documento, mas cliente faturado exige documento, aprovacao e ciclo;
- cadastro de cliente exige ao menos uma placa vinculada;
- uma placa nao pode ficar vinculada a mais de um cliente;
- abertura de atendimento exige pelo menos um servico;
- agendamento exige data e hora futuras e bloqueia conflito de placa no mesmo horario;
- `Pagamento na entrada` nao aceita forma `Faturado`;
- fechamento do atendimento impacta caixa, pagamentos em aberto, faturas, estoque, documentos e mensagens;
- venda de produtos baixa estoque e gera lancamento financeiro;
- baixa parcial de fatura exige destino explicito para o saldo remanescente.

## Validacoes observadas

- formularios usam `reportValidity()` e checagens especificas de negocio;
- filtros e buscas por texto existem em quase todos os modulos administrativos;
- regras de permissao sao verificadas por `accessBoundary`;
- varios fluxos usam `showToast` e `showMessageBox` para bloqueios operacionais;
- adapters contratuais existem em `app/adapters/**`, mas no Web atual entram de forma diagnostica ou em sombra, nao como runtime oficial do dominio.

## Pontos ainda incertos

- politica final de autenticacao real continua fora do Web atual e deve ficar como `needs-decision` para fases futuras;
- a extensao exata da mensageria automatica no Android continua `needs-decision`;
- relatorios completos em mobile versus resumos operacionais continuam `needs-decision`;
- impressao termica nao existe como rotina Web nativa; o Android deve adaptar documentos PDF estruturados para bobina.

## Modulos mapeados

### Login e sessao

- modulo: `Login e sessao`
- descricao: entrada local por usuario, senha e perfil, com redirecionamento para shell administrativo ou patio
- perfis que usam: `Administrador`, `Operador`
- telas/areas Web relacionadas: login inicial, shell admin, patio
- rotinas: `confirmLogin`, `showAdmin`, `showPatio`, `showAdminView`
- dados envolvidos: usuario, senha, perfil, sessao ativa
- regras: perfil e obrigatorio; admin abre dashboard; operador abre patio
- validacoes: campos obrigatorios e selecao de perfil
- estados: autenticado, nao autenticado, admin, operador
- acoes criticas: entrar, trocar perfil, logout
- documentos/relatorios relacionados: nenhum
- equivalente esperado no Android: login local e selecao de perfil nativos, com guards de navegacao
- observacoes: nao ha auth backend real; o Android nao deve inferir credenciais remotas inexistentes

### Dashboard

- modulo: `Dashboard`
- descricao: resumo administrativo da operacao com metricas, fluxo de status, alertas e manutencoes previstas
- perfis que usam: `Administrador`
- telas/areas Web relacionadas: dashboard admin
- rotinas: `renderAdminDashboard`, `renderAdminAlerts`, `renderMaintenanceDashboardPanel`
- dados envolvidos: patio, caixa, vendas, estoque, pagamentos em aberto, cuidados especiais, servicos sem ficha tecnica
- regras: receitas e taxas sao agregadas localmente; alertas dependem do estado operacional atual
- validacoes: renderizacao segura mesmo com colecoes vazias
- estados: operacao ativa, sem prioridades, estoque minimo, faturado aberto
- acoes criticas: navegar para modulos a partir dos indicadores
- documentos/relatorios relacionados: relatorios de producao e historicos sao alimentados pelo mesmo dominio
- equivalente esperado no Android: cards operacionais e atalhos mobile para admin
- observacoes: o Android deve adaptar densidade e prioridade visual sem perder significado dos indicadores

### Patio e atendimento

- modulo: `Patio`
- descricao: centro operacional com lista de veiculos, agendamentos, atendimento em execucao, checklist, produtos e fechamento
- perfis que usam: `Administrador`, `Operador`
- telas/areas Web relacionadas: patio, dialogos de entrada, status, pagamento, recibo e quote-to-patio
- rotinas: `renderPatio`, `handleVehicleEntrySubmit`, `openStatusDialog`, `saveStatusServiceEdit`, `confirmVehiclePayment`
- dados envolvidos: veiculo, cliente, servicos, checklist, cuidados especiais, pagamento, produtos vendidos
- regras: atendimento exige servico; certos status liberam produtos; fechamento impacta caixa, estoque, mensagem e documentos
- validacoes: conflito de agendamento, restricoes de pagamento, aprovacao faturada, checklist e ownership
- estados: `agendado`, `aguardando`, `lavando`, `pronto`, `finalizado`, `cancelado`
- acoes criticas: abrir atendimento, alterar status, editar servicos, confirmar pagamento, gerar recibo
- documentos/relatorios relacionados: recibo, checklist, resumo e comprovantes
- equivalente esperado no Android: patio nativo com fluxo de atendimento offline-first
- observacoes: este e o modulo de maior prioridade funcional para o app

### Orcamentos e pre-vendas

- modulo: `Orcamentos`
- descricao: propostas com cliente, veiculo, servicos, extras, validade e conversao em patio
- perfis que usam: `Administrador`, `Operador`
- telas/areas Web relacionadas: `quotes`, dialogo de orcamento, patio quotes
- rotinas: `saveQuoteFromDialog`, `renderPatioQuotes`, `createPatioEntryFromQuote`, `finishQuotePatioEntry`
- dados envolvidos: cliente, veiculo, servicos, itens extras, pagamento, validade
- regras: precisa de servico ou item extra; validade deve ser maior que zero
- validacoes: etapas minimas, prazo e dados de proprietario/veiculo
- estados: `Pendente`, `Aprovado`, `Rejeitado`
- acoes criticas: salvar, aprovar, converter em atendimento
- documentos/relatorios relacionados: proposta e eventual documento comercial
- equivalente esperado no Android: fluxo mobile de orcamento/pre-venda com conversao futura
- observacoes: o Android nao deve confundir orcamento com atendimento fechado

### Clientes

- modulo: `Clientes`
- descricao: cadastro de cliente comum ou faturado com placas vinculadas e relacionamento
- perfis que usam: `Administrador` para editar; operador sem gestao administrativa
- telas/areas Web relacionadas: `Cadastros > Clientes`, dialogo de cliente, dialogo de mensagem
- rotinas: `renderClientsScreen`, `openClientDialog`, `saveClientRegistration`, `openClientMessageDialog`
- dados envolvidos: tipo PF/PJ, nome/razao, documento, telefone, endereco, email, responsavel, aprovador, ciclo, placas
- regras: cliente faturado exige aprovacao, ciclo e documento; cliente comum pode ficar sem documento; precisa de ao menos uma placa
- validacoes: placa duplicada bloqueada, formulario HTML, restricao de edicao por perfil
- estados: avulso, faturado, PF, PJ, aprovado, pendente
- acoes criticas: criar, editar, aprovar faturamento, abrir mensagem
- documentos/relatorios relacionados: faturas, recibos, mensagens de relacionamento
- equivalente esperado no Android: CRUD mobile admin-only com busca rapida e vinculo de veiculos
- observacoes: o Android deve preservar a distincao entre cliente comum e faturado

### Veiculos

- modulo: `Veiculos`
- descricao: cadastro de veiculo com vinculo ao cliente, historico, cuidados especiais e apoio FIPE local
- perfis que usam: `Administrador` para edicao administrativa; operador pelo fluxo operacional
- telas/areas Web relacionadas: `Cadastros > Veiculos`, dialogos de veiculo e entrada no patio
- rotinas: `renderVehiclesScreen`, `openAdminVehicleRegistryDialog`, `persistVehicleRegistration`, `saveEntryVehicleRegistryDialog`
- dados envolvidos: placa, marca, modelo, ano, cor, tipo, categoria, combustivel, observacoes, ownerHistory, serviceHistory
- regras: placa e identidade central; alguns edits a partir do patio redirecionam para admin
- validacoes: prevencao de duplicidade, vinculo por placa e checagens de cor/tipo/categoria
- estados: veiculo vinculado, sem vinculo, com cuidado especial, com historico
- acoes criticas: criar, editar, transferir proprietario, registrar cuidado especial
- documentos/relatorios relacionados: ordem de servico, checklist e historico
- equivalente esperado no Android: CRUD mobile com pesquisa por placa e historico basico
- observacoes: o Android deve tratar veiculo como dominio proprio, nao so subregistro do cliente

### Servicos

- modulo: `Servicos`
- descricao: catalogo de servicos contrataveis por tipo/categoria de veiculo
- perfis que usam: `Administrador`
- telas/areas Web relacionadas: `Cadastros > Servicos`
- rotinas: `renderServicesScreen`, `saveServiceRegistration`, `renderServiceSuppliesDialog`, `saveServiceSupplies`
- dados envolvidos: nome, tipo, categoria, duracao, preco, status, manutencao, ficha tecnica de insumos
- regras: nome normalizado nao pode duplicar; servico pode ter lembrete de manutencao e consumo previsto
- validacoes: nome, preco, tipo/categoria quando aplicavel
- estados: ativo, inativo, com ficha tecnica, sem ficha tecnica
- acoes criticas: criar, editar, ativar, inativar, vincular insumos
- documentos/relatorios relacionados: composicao de atendimento e produtividade
- equivalente esperado no Android: catalogo de servicos admin-only com integracao ao atendimento
- observacoes: o Android deve carregar o escopo do veiculo para filtrar servicos validos

### Produtos, insumos e estoque

- modulo: `Produtos, Insumos e Estoque`
- descricao: catalogos separados para venda e consumo tecnico, com movimentos e alertas de estoque
- perfis que usam: `Administrador`
- telas/areas Web relacionadas: `Produtos`, `Insumos`, `Estoque`, `Vendas de produtos`
- rotinas: `renderProductsScreen`, `renderSuppliesScreen`, `renderInventoryScreen`, `renderProductSalesScreen`, `saveProductSale`
- dados envolvidos: SKU, nome, unidade, estoque, minimo, custo, preco, risco, fornecedor, movimentos
- regras: produto vendavel e insumo tecnico sao entidades distintas; venda baixa estoque e gera caixa; composicao de servico pode consumir insumo
- validacoes: campos obrigatorios, filtro de estoque minimo, ajustes manuais controlados
- estados: ativo, inativo, baixo estoque, movimento de entrada/saida, mais vendidos
- acoes criticas: cadastrar, ajustar estoque, vender, gerar comprovante
- documentos/relatorios relacionados: comprovante de venda, alertas e relatorios de estoque
- equivalente esperado no Android: modulos separados para produto e insumo, com estoque simplificado
- observacoes: o Android nao deve colapsar insumo dentro de produto

### Pagamentos, financeiro e faturamento

- modulo: `Financeiro`
- descricao: caixa, pagamentos em aberto, faturas, baixas parciais e configuracao de recebimento
- perfis que usam: `Administrador`
- telas/areas Web relacionadas: `Caixa`, `Pagamentos em aberto`, `Faturas`, `Configuracoes financeiras`
- rotinas: `renderCashflowScreen`, `saveCashEntry`, `renderOpenPaymentsScreen`, `settleOpenPayment`, `renderInvoicesScreen`, `settleInvoice`
- dados envolvidos: lancamento, metodo, taxa, valor liquido, cliente, fatura, saldo remanescente, conta bancaria, Pix
- regras: baixa parcial exige roteamento do saldo; faturamento depende de cliente aprovado; formas de pagamento podem exigir chave Pix
- validacoes: descricao, valor, metodo, categoria, conta bancaria, destino do saldo
- estados: aberto, baixado, vencido, pago parcial, pago, agendado
- acoes criticas: registrar lancamento, baixar pagamento em aberto, baixar fatura, criar nova fatura, criar saldo em aberto
- documentos/relatorios relacionados: recibos, faturas, comprovantes, exportacoes e relatorios
- equivalente esperado no Android: resumo e operacao financeira mobile limitada ao essencial
- observacoes: este dominio e amplo demais para copiar integralmente no primeiro shell Android

### Documentos e relatorios

- modulo: `Documentos e relatorios`
- descricao: historico de PDFs gerados e emissores de recibos, comprovantes e relatorios administrativos
- perfis que usam: `Administrador`, com alguns comprovantes gerados a partir do patio
- telas/areas Web relacionadas: `Documentos`, fluxo de recibo do patio, relatorios de operadores
- rotinas: `renderDocumentsScreen`, `generateReceiptPdf`, `generateProductSaleReceiptPdf`, `generateChecklistPdf`, `emitOperatorReport`
- dados envolvidos: empresa, cliente, veiculo, itens, pagamento, operador, numeracao e historico
- regras: documentos saem pelo gerador PDF central e usam dados do negocio
- validacoes: historico e dados de contexto; numeracao e metadados
- estados: documento emitido, recibo, relatorio, comprovante
- acoes criticas: gerar recibo, gerar comprovante, emitir relatorio
- documentos/relatorios relacionados: o proprio modulo centraliza esse historico
- equivalente esperado no Android: documentos estruturados e impressao adaptada a bobina
- observacoes: Android nao deve reaproveitar PDF A4 como se fosse recibo termico final

### Negocio, usuarios e mensagens

- modulo: `Negocio, usuarios e mensagens`
- descricao: configuracoes da empresa, financeiro, canais sociais, templates de mensagem e equipe
- perfis que usam: `Administrador`
- telas/areas Web relacionadas: `Meu negocio`, `Financeiro do negocio`, `Social`, `Mensagens`, `Operadores`
- rotinas: `renderBusinessScreen`, `renderBusinessFinanceScreen`, `renderBusinessSocialScreen`, `renderBusinessMessagesScreen`, `renderOperatorsScreen`, `saveOperatorRegistration`
- dados envolvidos: dados institucionais, Pix, contas, formas de pagamento, templates, operador, comissao, historico de acesso
- regras: algumas formas de pagamento exigem Pix; login de operador nao pode duplicar; perfis impactam acesso
- validacoes: campos bancarios, usuario/senha, comissao, telefone, toggle de exibicao em relatorio
- estados: conta ativa, forma ativa/inativa, template ativo/inativo, operador ativo/inativo
- acoes criticas: salvar dados da empresa, ativar meios de pagamento, cadastrar operador, disparar mensagem
- documentos/relatorios relacionados: rodape institucional, faturas, relatorios, mensagens automatizadas
- equivalente esperado no Android: empresa e configuracoes minimas primeiro; usuarios e mensageria podem entrar por etapas
- observacoes: o Android deve preservar dados institucionais e permissao, mas pode reduzir backoffice completo nas fases iniciais

## Impacto no Android

- o Android deve preservar a ordem funcional `login -> shell/perfil -> dashboard/patio -> atendimento -> pagamento/documento`;
- operador mobile deve continuar focado em patio e atendimento;
- admin mobile deve enxugar escritorio, mas manter cadastros, negocio, financeiro resumido e documentos essenciais;
- o Web confirma que o dominio tem fortes acoplamentos entre atendimento, estoque, financeiro, mensagem e documento;
- qualquer fase Android que ignore esse baseline corre risco alto de paridade falsa.
