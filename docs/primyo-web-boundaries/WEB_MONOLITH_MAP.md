# LavaPrime Web Monolith Map

## 1. Objetivo

Mapear as responsabilidades atuais do `app/main.js` para orientar uma modularizacao futura segura.

Esta fase nao move codigo, nao cria modulos de producao e nao altera comportamento.

## 2. Resumo executivo

O `app/main.js` e o nucleo funcional do LavaPrime Web e possui aproximadamente 20 mil linhas.

Ele concentra:

- estado global de UI e sessao;
- fronteiras locais de sessao e autorizacao;
- constantes, icones e dicionarios;
- dados iniciais hardcoded;
- persistencia via `localStorage`;
- renderizacao de telas;
- manipuladores de eventos;
- regras de negocio;
- financeiro;
- emissao de documentos e PDF;
- fluxo de patio e atendimento.

O arquivo ja possui duas fronteiras tecnicas locais relevantes:

- `sessionBoundary`;
- `accessBoundary`.

O restante ainda esta fortemente acoplado por variaveis globais, DOM direto, arrays em memoria e chamadas entre dominios.

## 3. Mapa por faixas aproximadas

| Faixa aproximada | Responsabilidade principal | Observacoes |
| --- | --- | --- |
| `1-82` | icones e estado global inicial | mistura recursos visuais com variaveis de sessao, dialogos e selecoes |
| `83-294` | `sessionBoundary` e `accessBoundary` | fronteira local mais clara e melhor candidata inicial |
| `295-444` | constantes de busca, faturamento, cuidados especiais, PDF e opcoes | baixa regra de negocio, mas muitas referencias globais |
| `445-500` | chaves de `localStorage` e carregamento de configuracoes/catalogos | ponto central de persistencia local |
| `501-1354` | defaults, templates, status, dados iniciais e seeds | mistura bootstrap, dados demo e dominio operacional |
| `1355-1688` | helpers DOM, splash, toast, login, bind global e navegacao inicial | ponto de entrada funcional do web legado |
| `1690-4464` | entrada de veiculo, agenda, busca FIPE, checklist, cliente/veiculo no intake e faturamento na entrada | fluxo operacional amplo e sensivel |
| `4468-5915` | formatadores, normalizadores, defaults, save/load, estoque, metodos de pagamento e documentos | mistura utilitarios puros com persistencia e regras financeiras |
| `5916-7600` | identidade do negocio, comunicacao, mensagens, orcamentos e dashboard | cruza configuracoes, clientes, veiculos, documentos e patio |
| `7638-7735` | roteador administrativo `renderAdminScreen(...)` | dispatch central de telas admin |
| `7859-9328` | configuracoes do negocio, financeiro do negocio, bancos, Pix, metodos, social e mensagens | forte dependencia de `localStorage` e documentos |
| `9607-11638` | clientes, veiculos, mensagens de cliente, cuidados especiais e historicos | dominio de master data com varios acoplamentos |
| `11654-12619` | operadores, servicos, relatorios de equipe e helpers de admin | mistura equipe, servicos e documentos |
| `12632-14183` | produtos, insumos, inventario, vendas e documentos | dominio de estoque com impactos financeiros |
| `14269-16040` | pagamentos em aberto, caixa, categorias, exportacoes e CSV | dominio financeiro sensivel |
| `16052-17475` | geracao de PDF e documentos | motor documental local amplo |
| `17477-17867` | contas a pagar e faturas | financeiro/faturamento |
| `17868-20374` | componentes compartilhados, patio, status, pagamento de atendimento, recibo e sincronizacoes locais | fluxo operacional mais critico |

## 4. Responsabilidades atuais por dominio

### 4.1 Sessao

Responsabilidades:

- perfil ativo;
- usuario atual;
- estado logado/deslogado;
- compatibilidade com `selectedProfile` e `activeSessionUser`.

Pontos principais:

- `createSessionBoundary()`;
- `sessionBoundary`;
- `selectProfile(...)`;
- `confirmLogin()`;
- `showPatio(...)`;
- `showAdmin(...)`;
- `returnToLogin()`.

### 4.2 Autorizacao

Responsabilidades:

- politica local de acesso por perfil;
- permissoes administrativas;
- autorizacao para views e acoes sensiveis.

Pontos principais:

- `createAccessBoundary(...)`;
- `accessBoundary`;
- `showAdminView(...)`;
- `canPerformSensitiveAction(...)`;
- helpers como `canEditClientRegistrations()`.

### 4.3 Navegacao

Responsabilidades:

- bind inicial da aplicacao;
- roteamento de telas administrativas;
- alternancia entre login, patio e administracao.

Pontos principais:

- `bindEvents()`;
- `showPatio(...)`;
- `showAdmin(...)`;
- `showAdminView(...)`;
- `renderAdminScreen(...)`.

### 4.4 Patio e atendimento

Responsabilidades:

- entrada, agendamento, status e checklist;
- execucao de servicos;
- produtos no atendimento;
- pagamento do atendimento;
- recibos e mensagens automatizadas.

Pontos principais:

- `patioVehicles`;
- `openVehicleDialog(...)`;
- `renderVehicleCards()`;
- `openStatusDialog(...)`;
- `updateVehicleStatus(...)`;
- `confirmVehiclePayment(...)`;
- `upsertCashEntryFromVehicle(...)`;
- `upsertOpenPaymentFromVehicle(...)`.

### 4.5 Cadastros centrais

Responsabilidades:

- clientes;
- veiculos;
- owners;
- operadores;
- servicos.

Pontos principais:

- `clientRegistry`;
- `vehicleRegistry`;
- `adminOperators`;
- `serviceCatalog`;
- `renderClientsScreen(...)`;
- `renderVehiclesScreen(...)`;
- `saveClientRegistration(...)`;
- `saveOperatorRegistration(...)`;
- `saveServiceRegistration(...)`.

### 4.6 Produtos, insumos e estoque

Responsabilidades:

- produtos;
- insumos;
- perfis de consumo por servico;
- estoque;
- vendas de produto;
- movimentos de inventario.

Pontos principais:

- `productCatalog`;
- `supplyCatalog`;
- `serviceSupplyProfiles`;
- `inventoryMovements`;
- `productSales`;
- `openInventoryDialog(...)`;
- `saveInventoryItemForm(...)`;
- `registerInventoryMovement(...)`;
- `saveProductSale(...)`;
- `saveServiceSupplies(...)`.

### 4.7 Financeiro

Responsabilidades:

- caixa;
- pagamentos em aberto;
- faturas;
- contas a pagar;
- metodos de pagamento;
- taxas e prazos;
- relatorios financeiros.

Pontos principais:

- `cashEntries`;
- `openPayments`;
- `billingInvoices`;
- `invoiceLineItems`;
- `invoiceAmounts`;
- `payableAccounts`;
- `renderCashflowScreen(...)`;
- `renderOpenPaymentsScreen(...)`;
- `renderInvoicesScreen(...)`;
- `settleOpenPayment(...)`;
- `settleInvoice(...)`.

### 4.8 Relatorios e documentos

Responsabilidades:

- recibos;
- comprovantes;
- relatorios;
- check-list PDF;
- documentos financeiros.

Pontos principais:

- `downloadPdfFile(...)`;
- `recordGeneratedDocument(...)`;
- `createStandardPdfDocument(...)`;
- `createOperatorProductionPdfDocument(...)`;
- `generateReceiptPdf(...)`;
- `generateProductSaleReceiptPdf(...)`.

### 4.9 Configuracoes

Responsabilidades:

- dados do negocio;
- contas bancarias;
- Pix;
- metodos de pagamento;
- regras financeiras;
- canais sociais;
- templates de mensagem.

Pontos principais:

- `businessProfile`;
- `businessBankAccounts`;
- `businessPixInfo`;
- `businessPaymentMethods`;
- `businessFinanceSettings`;
- `renderBusinessScreen(...)`;
- `renderBusinessFinanceScreen(...)`;
- `saveBusinessPaymentMethod(...)`;
- `saveBusinessPixInfo(...)`.

### 4.10 Utilitarios

Responsabilidades:

- seletores DOM;
- formatacao;
- sanitizacao;
- datas;
- moeda;
- CSV;
- texto PDF.

Pontos principais:

- `$`;
- `$$`;
- `formatCurrency(...)`;
- `formatDateBR(...)`;
- `normalizeText(...)`;
- `escapeHtml(...)`;
- `downloadTextFile(...)`.

### 4.11 Dados e persistencia local

Responsabilidades:

- carregar e salvar dados locais;
- normalizar dados de `localStorage`;
- manter defaults e seeds;
- carregar FIPE local.

Pontos principais:

- `businessStorageKeys`;
- `loadBusinessStorageItem(...)`;
- `saveBusinessStorageItem(...)`;
- `normalize*`;
- `getDefault*`;
- `loadLocalVehicleDatabase(...)`.

## 5. Acoplamentos principais

| Acoplamento | Impacto |
| --- | --- |
| `activeSessionUser` usado em atendimento, documentos, financeiro e equipe | dificulta extracao isolada de sessao |
| `accessBoundary` chamado por navegacao, cadastros e financeiro | bom ponto de controle, mas exige smoke de perfil |
| `businessPaymentMethods` referenciado por caixa, patio, invoices e open payments | alto risco para qualquer extracao financeira |
| `clientRegistry` e `billingClients` convivem em cadastros e faturamento | risco alto para master data e financeiro |
| `vehicleRegistry` usado por patio, historico, checklist e entrada | risco alto para atendimento |
| `productCatalog` e `supplyCatalog` usados por estoque, servico, venda e atendimento | risco medio/alto |
| `downloadPdfFile(...)` usado por varios dominios | qualquer mudanca documental precisa smoke de PDF |
| DOM direto via `$` e `$$` em quase todas as telas | extracao precisa preservar ordem de bind e IDs existentes |

## 6. Conclusao

O monolito web tem fronteiras conceituais claras, mas ainda nao tem fronteiras fisicas.

A modularizacao futura deve comecar por blocos pequenos e testaveis:

1. fronteiras ja existentes de sessao/autorizacao;
2. helpers puros e policy helpers;
3. constantes e adaptadores de persistencia local;
4. dominios maiores somente depois de testes e contratos mais fortes.
