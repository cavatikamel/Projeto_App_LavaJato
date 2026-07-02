# LP APK Web Modules Map

## Objetivo

Mapear os modulos reais do LavaPrime Web usados como referencia funcional do APK.

| Modulo Web | Localizacao aproximada no codigo | Funcao do modulo | Perfil | Entidade principal | Dependencias | Status de mapeamento | Observacao |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Login | `app/main.js`, `confirmLogin`, `showAdmin`, `showPatio` | autenticar localmente e abrir shell correto | ambos | sessao | `sessionAccessBoundary` | `mapped` | nao ha auth backend real |
| Selecao de perfil | `app/main.js`, fluxo de login | escolher `Administrador` ou `Operador` | ambos | perfil | sessao, permissao | `mapped` | perfil define rotas e guardas |
| Dashboard | `app/main.js`, `renderAdminDashboard` | resumir operacao e alertas | admin | patio/financeiro | patio, caixa, estoque, pagamentos | `mapped` | administrador only |
| Patio | `app/main.js`, `renderPatio` e dialogos | listar e operar atendimentos | ambos | `patioVehicles` | clientes, veiculos, servicos, pagamentos | `mapped` | modulo central da operacao |
| Orcamentos | `app/main.js`, `saveQuoteFromDialog`, `renderPatioQuotes` | registrar proposta e converter em patio | ambos | `quoteEstimates` | clientes, veiculos, servicos | `mapped` | funciona como pre-venda |
| Clientes | `app/main.js`, `renderClientsScreen`, `saveClientRegistration` | manter clientes comuns e faturados | admin | `clientRegistry` | veiculos, faturamento, mensagens | `mapped` | documento opcional so para cliente comum |
| Veiculos | `app/main.js`, `renderVehiclesScreen`, `persistVehicleRegistration` | manter veiculos e historico | admin | `vehicleRegistry` | clientes, patio, FIPE | `mapped` | placa e identidade central |
| Servicos | `app/main.js`, `renderServicesScreen`, `saveServiceRegistration` | manter catalogo e fichas tecnicas | admin | `serviceCatalog` | tipos/categorias, insumos | `mapped` | impacta atendimento e estoque |
| Produtos | `app/main.js`, `renderProductsScreen` | manter catalogo vendavel | admin | `productCatalog` | estoque, vendas | `mapped` | separado de insumos |
| Insumos | `app/main.js`, `renderSuppliesScreen` | manter catalogo tecnico | admin | `supplyCatalog` | estoque, servicos | `mapped` | inclui risco e fornecedor |
| Estoque | `app/main.js`, `renderInventoryScreen`, `registerInventoryMovement` | controlar movimentos e alertas | admin | movimentos de estoque | produtos, insumos, servicos | `mapped` | consumo tecnico e venda convivem |
| Vendas de produtos | `app/main.js`, `renderProductSalesScreen`, `saveProductSale` | registrar venda avulsa e comprovante | admin | `productSales` | produtos, caixa, documentos | `mapped` | nao depende do patio |
| Pagamentos em aberto | `app/main.js`, `renderOpenPaymentsScreen` | controlar recebimentos pendentes | admin | `openPayments` | patio, clientes, caixa, mensagens | `mapped` | existe baixa e WhatsApp |
| Caixa | `app/main.js`, `renderCashflowScreen`, `saveCashEntry` | controlar entradas/saidas e agenda | admin | `cashEntries` | pagamentos, banco, categorias | `mapped` | modulo financeiro operacional |
| Faturas | `app/main.js`, `renderInvoicesScreen`, `settleInvoice` | controlar faturamento e baixa parcial | admin | `billingInvoices` | clientes faturados, caixa, mensagens | `mapped` | saldo pode virar nova fatura ou open payment |
| Documentos | `app/main.js`, `renderDocumentsScreen` | centralizar historico documental | admin | `documentHistory` | patio, vendas, relatorios, empresa | `mapped` | PDF A4 e historico administrativo |
| Meu negocio | `app/main.js`, `renderBusinessScreen` | manter dados institucionais | admin | dados da empresa | documentos, mensagens | `mapped` | fonte de dados de cabecalho/rodape |
| Financeiro do negocio | `app/main.js`, `renderBusinessFinanceScreen` | configurar Pix, contas e meios de pagamento | admin | config financeira | caixa, faturas, pagamentos | `mapped` | afeta operacao de cobranca |
| Social | `app/main.js`, `renderBusinessSocialScreen` | manter canais e exibicao em relatorios | admin | canais sociais | negocio, relatorios | `mapped` | apoio institucional |
| Mensagens | `app/main.js`, `renderBusinessMessagesScreen` | manter templates e envio contextual | admin | templates de mensagem | clientes, patio, faturas | `mapped` | automacao via WhatsApp |
| Operadores/usuarios | `app/main.js`, `renderOperatorsScreen`, `saveOperatorRegistration` | manter equipe e comissao | admin | `adminOperators` | login local, relatorios | `mapped` | sem auth real centralizado |
| Permissoes | `app/boundaries/sessionAccessBoundary.js` | proteger views e acoes sensiveis | ambos | perfil/permissao | sessao | `mapped` | admin vs operador esta explicito |
| Relatorios | `app/main.js`, emissores PDF e telas de documentos | emitir relatorios administrativos | admin | relatorios PDF | operadores, financeiro, negocio | `partial` | nao ha modulo unico de relatorio puro separado do historico documental |
| Auditoria minima | `app/main.js`, `documentHistory`, historicos e diagnosticos | registrar rastros locais parciais | admin | historicos locais | operadores, documentos, clientes | `partial` | nao existe trilha central unificada de auditoria |
| Sync/offline | bootstrap local e storage do Web | persistir estado local | ambos | storage local | bootstrap e colecoes embutidas | `partial` | nao existe fila real de sync do Web |
| Configuracoes gerais | shell admin + negocio | revisar dados do negocio e operacao | admin | configuracoes locais | negocio, financeiro, mensagens | `needs-decision` | nao ha tela unica de `Settings`; Android deve consolidar isso |
