# LavaPrime Web Boundary Candidates

## 1. Objetivo

Listar candidatos a extracao futura do `app/main.js`, com responsabilidade, dependencias, risco, beneficio e arquivos futuros possiveis.

Nenhum candidato esta autorizado para implementacao nesta fase.

## 2. Candidatos

| Candidato | Responsabilidade | Dependencias atuais | Risco | Beneficio | Arquivos futuros possiveis |
| --- | --- | --- | --- | --- | --- |
| Session boundary | sessao local, perfil ativo, usuario atual e compatibilidade legada | `selectedProfile`, `activeSessionUser`, `confirmLogin`, `showAdmin`, `showPatio`, `returnToLogin` | Medio | reduzir espalhamento de sessao antes de auth real | `app/src/legacy/boundaries/sessionBoundary.js` |
| Access boundary | autorizacao local, policies de view e acoes sensiveis | `sessionBoundary`, `showAdminView`, cadastros, financeiro, settings | Medio | preservar um ponto unico para permissao futura | `app/src/legacy/boundaries/accessBoundary.js` |
| Policy helpers | mapas `adminViewPolicies`, `sensitiveActionPolicies` e normalizacao de chave | `accessBoundary` | Baixo | separar politica declarativa de execucao | `app/src/legacy/policies/webAccessPolicies.js` |
| DOM/UI shell helpers | `$`, `$$`, `initIcons`, toast, message box, splash | DOM legado e IDs existentes | Baixo | diminuir ruido do core e facilitar testes de helpers | `app/src/legacy/ui/domHelpers.js`, `app/src/legacy/ui/feedback.js` |
| Formatting utilities | moeda, data, telefone, documento, placa, texto e HTML | chamados por quase todos os dominios | Baixo/Medio | extrair funcoes puras com baixo impacto funcional | `app/src/legacy/utils/formatters.js`, `app/src/legacy/utils/text.js` |
| Constants and dictionaries | icones, status, opcoes, labels e categorias | renderizacao, documentos, patio e cadastros | Baixo/Medio | reduzir tamanho do monolito sem tocar regra | `app/src/legacy/constants/uiIcons.js`, `app/src/legacy/constants/domainOptions.js` |
| Local persistence adapter | `businessStorageKeys`, load/save e normalizadores locais | `localStorage`, defaults, catalogos, financeiro | Alto | preparar convivencia com Supabase sem trocar fonte agora | `app/src/legacy/storage/localStorageAdapter.js` |
| Business settings boundary | perfil do negocio, bancos, Pix, metodos, social, mensagens | `businessProfile`, `businessFinanceSettings`, `businessPaymentMethods`, documentos | Alto | separar configuracao mestre do resto do fluxo | `app/src/legacy/domains/businessSettings.js` |
| Master data boundary | clientes, veiculos, operadores e servicos | `clientRegistry`, `vehicleRegistry`, `adminOperators`, `serviceCatalog`, faturamento | Alto | alinhar web ao modelo de master data aprovado | `app/src/legacy/domains/masterData.js` |
| Inventory boundary | produtos, insumos, perfis de consumo, estoque e vendas | `productCatalog`, `supplyCatalog`, `serviceSupplyProfiles`, `inventoryMovements`, financeiro | Alto | isolar estoque antes de persistencia real | `app/src/legacy/domains/inventory.js` |
| Finance boundary | caixa, open payments, faturas, payables e liquidacoes | `cashEntries`, `openPayments`, `billingInvoices`, `invoiceLineItems`, `invoiceAmounts`, metodos | Critico | reduzir risco do dominio mais sensivel antes de Supabase | `app/src/legacy/domains/finance.js` |
| Documents boundary | geracao de PDF, documentos e historico documental | `downloadPdfFile`, `documentHistory`, negocio, financeiro, equipe | Alto | preservar documentos com API clara por dominio | `app/src/legacy/documents/pdfEngine.js`, `app/src/legacy/documents/documentHistory.js` |
| Navigation boundary | login, patio/admin, `showAdminView`, `renderAdminScreen` | DOM, `accessBoundary`, todos os renderizadores admin | Medio/Alto | centralizar roteamento antes de modularizar telas | `app/src/legacy/navigation/webNavigation.js` |
| Yard and attendance boundary | patio, status, checklist, pagamento e fluxo de atendimento | clientes, veiculos, servicos, produtos, financeiro, documentos | Critico | separar o fluxo operacional principal | `app/src/legacy/domains/yard.js`, `app/src/legacy/domains/attendance.js` |
| Quotes and schedule boundary | orcamentos, agenda, entrada futura e checklist de orcamento | clientes, veiculos, servicos, patio e documentos | Alto | isolar pre-venda e agendamento | `app/src/legacy/domains/quotes.js`, `app/src/legacy/domains/schedule.js` |
| Render boundary by screen | renderizacao das telas administrativas e dialogos | DOM, dados globais, policies, eventos | Alto | permitir modularizacao por tela sem mudar UX | `app/src/legacy/screens/*.js` |

## 3. Agrupamento por familia

### 3.1 Baixo risco inicial

- policy helpers;
- formatadores puros;
- DOM helpers;
- constantes estaticas.

### 3.2 Risco medio

- `sessionBoundary`;
- `accessBoundary`;
- navegacao administrativa;
- helpers de UI compartilhada.

### 3.3 Risco alto

- persistencia local;
- configuracoes;
- master data;
- produtos/insumos;
- documentos;
- renderizacao por tela.

### 3.4 Risco critico

- financeiro;
- patio e atendimento;
- pagamento de atendimento;
- faturas, recebiveis e caixa.

## 4. Regras para qualquer extracao futura

1. Uma extracao deve manter API publica compativel com o `app/main.js`.
2. A primeira versao extraida deve preservar nomes, retorno e efeitos colaterais.
3. Arquivos novos devem ser pequenos e ter rollback por exclusao + restauracao do trecho original.
4. Nenhuma extracao pode misturar refatoracao de comportamento com mudanca fisica.
5. Todo candidato acima de risco `Medio` exige smoke test manual do fluxo afetado.

## 5. Decisao desta fase

As melhores fronteiras iniciais sao `sessionBoundary`, `accessBoundary`, policy helpers e utilitarios puros.

Dominios como financeiro, patio, master data e inventario devem esperar ate existir base de teste mais forte.
