# LavaPrime Baseline Technical Map

## 1. Objetivo

Identificar os pontos tecnicos mais sensiveis do LavaPrime apos a absorcao de `LP-TEST-AUTO-003` na baseline oficial.

## 2. Arquivos criticos

### Bootstrap e entrada do web

- `app/index.html`
  - define `#root`, manifesto e icone da aplicacao
- `app/src/main.jsx`
  - monta o React no DOM e importa o shell principal
- `app/src/App.jsx`
  - injeta o markup legado, carrega `fipe-veiculos.js` e importa `app/main.js`
- `app/legacy-body.html`
  - preserva a estrutura HTML da interface legada

### Core funcional web

- `app/main.js`
  - concentra login, sessao, autorizacao local, dashboard, patio, clientes, veiculos, servicos, produtos, financeiro, documentos e configuracoes
  - instancia e expoe a `sessionBoundary` e a `accessBoundary` locais do web
- `app/adapters/customerAdapter.js`
  - hospeda o primeiro adapter puro oficial de contrato do web
  - converte cliente legado para o contrato `Customer` sem integrar o runtime atual
- `app/adapters/vehicleAdapter.js`
  - hospeda o segundo adapter puro oficial de contrato do web
  - converte veiculo legado para o contrato `Vehicle` sem integrar o runtime atual
- `app/boundaries/sessionAccessBoundary.js`
  - hospeda as factories `createSessionBoundary(...)` e `createAccessBoundary(...)`
  - preserva a API publica das fronteiras locais extraidas em `LP-WEB-004`
- `app/utils/textFormatters.js`
  - hospeda helpers puros de texto, escape e formatacao simples extraidos em `LP-WEB-005`
  - preserva os nomes consumidos por `app/main.js`
- `app/storage/storageBoundary.js`
  - hospeda a boundary unica de acesso bruto ao `localStorage`
  - preserva a compatibilidade dos wrappers de persistencia locais usados em `app/main.js`

### Assets e persistencia local

- `app/assets/data/fipe-veiculos.json`
  - base local de busca de veiculos
- `app/assets/data/fipe-veiculos.js`
  - mesma base exposta ao navegador como script legado
- `app/assets/templates/lavaprime-papel-timbrado.html`
  - referencia base para documentos emitidos
- `app/assets/brand/*`
  - logotipos e icones obrigatorios no build

### Build e validacao

- `package.json`
  - define comandos `build` e `verify:build`
- `vite.config.js`
  - fixa `root: app`, `outDir: ../dist` e copia assets legados
- `scripts/verify-build-artifacts.mjs`
  - valida o build gerado em `dist/`
- `scripts/sync-fipe-local-db.mjs`
  - sincroniza a base FIPE local
- `.github/workflows/validate.yml`
  - oficializa as verificacoes de CI observadas
- `scripts/primyo-gate.mjs`
  - orquestra o gate tecnico oficial do LavaPrime
  - executa preflight, verificacao estrutural, adapter gate, build e verify
- `scripts/primyo-adapter-gate.mjs`
  - valida `customerAdapter.js` e `vehicleAdapter.js` em Node puro
  - executa fixtures controlados validos e invalidos para cliente e veiculo
  - valida imports, exports minimos, envelope, `validation`, `warnings`, contexto e separacao entre `id` e `sourceId`

### Planejamento contratual absorvido

- `docs/primyo-data/contracts/*`
  - formaliza os contratos oficiais de comunicacao entre web, backend, Android e integracoes futuras
- `docs/primyo-web-contracts/*`
  - formaliza a estrategia de adapters, o mapa legado -> contrato, a ordem de criacao futura, os riscos de compatibilidade e os requisitos minimos de teste

## 3. Modulos criticos observados

Modulos funcionais concentrados no core atual:

- autenticacao local e sessao
- autorizacao local por perfil
- roteamento de perfil e exibicao de tela
- patio e ciclo de atendimento
- cadastros de clientes e veiculos
- servicos, produtos, insumos e estoque
- financeiro, pagamentos em aberto, caixa e faturas
- emissao de recibos, comprovantes, check-list e relatorios
- configuracoes da empresa, bancos, PIX, metodos de pagamento e templates de mensagem

## 4. Pontos de entrada

Pontos de entrada do web:

1. `app/index.html`
2. `app/src/main.jsx`
3. `app/src/App.jsx`
4. `app/main.js`

Pontos de entrada de sessao e autorizacao observados em `app/main.js`:

- `sessionBoundary`
- `accessBoundary`
- import de `createSessionBoundary(...)` e `createAccessBoundary(...)` a partir de `app/boundaries/sessionAccessBoundary.js`
- import de helpers puros a partir de `app/utils/textFormatters.js`
- import de `storageBoundary` a partir de `app/storage/storageBoundary.js`
- `selectedProfile` em modo legado sincronizado
- `activeSessionUser` em modo legado sincronizado
- submissao do `#loginForm`
- roteamento entre `showAdmin(...)`, patio e `showAdminView(...)`
- retorno por `returnToLogin()`

## 5. Pontos de persistencia

Persistencia observada no web:

- arrays e objetos inicializados em `app/main.js`
- `window.localStorage` via `businessStorageKeys` e `app/storage/storageBoundary.js`
- assets locais em `app/assets/data/`
- historico documental e configuracoes de negocio persistidos localmente

Chaves locais observadas:

- `lavaprime-business-profile-v1`
- `lavaprime-business-bank-accounts-v1`
- `lavaprime-business-pix-v1`
- `lavaprime-business-payment-methods-v1`
- `lavaprime-business-finance-settings-v1`
- `lavaprime-products-v1`
- `lavaprime-supplies-v1`
- `lavaprime-product-sales-v1`
- `lavaprime-inventory-movements-v1`
- `lavaprime-service-supply-profiles-v1`
- `lavaprime-document-history-v1`
- `lavaprime-cash-entries-v1`
- `lavaprime-vehicle-special-care-v1`
- `lavaprime-business-social-v1`
- `lavaprime-business-message-templates-v1`

Persistencia nao observada no web atual:

- cliente Supabase ativo em runtime
- banco remoto conectado ao fluxo funcional atual

## 6. Pontos de integracao

Integracoes ativas ou observaveis:

- `fetch("./assets/data/fipe-veiculos.json")` para dados locais de veiculos
- `https://wa.me/...` para comunicacao com clientes
- `https://api.qrserver.com/v1/create-qr-code/` para QR code
- assets locais de template e marca copiados no build

Integracoes planejadas, mas nao ativas no web observado:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- schema em `supabase/migrations/20260614133000_init_lavaprime.sql`

## 7. Fronteiras locais atuais

### `sessionBoundary`

Localizacao atual:

- factory em `app/boundaries/sessionAccessBoundary.js`;
- instancia criada em `app/main.js`;
- exposicao mantida em `window.__lavaprimeSessionBoundary`.

Relacao com `app/main.js`:

- `app/main.js` importa a factory;
- `app/main.js` fornece callback para sincronizar `selectedProfile` e `activeSessionUser`;
- `app/main.js` continua sendo o coordenador de login, logout e troca de tela.

Responsabilidades:

- armazenar o perfil ativo;
- armazenar o usuario atual;
- representar o estado autenticado local;
- centralizar o inicio e o encerramento de sessao;
- responder por checagens basicas de acesso admin e operador;
- sincronizar compatibilidade com variaveis legadas.

Pontos onde e usada:

- `selectProfile(...)`
- `confirmLogin()`
- `showPatio(...)`
- `showAdmin(...)`
- `returnToLogin()`
- `getActiveAdminApproverName()`

### `accessBoundary`

Localizacao atual:

- factory em `app/boundaries/sessionAccessBoundary.js`;
- instancia criada em `app/main.js`;
- exposicao mantida em `window.__lavaprimeAccessBoundary`.

Relacao com `app/main.js`:

- `app/main.js` importa a factory;
- `app/main.js` injeta a instancia de `sessionBoundary`;
- `app/main.js` continua chamando a boundary nos pontos sensiveis de navegacao e permissao.

Responsabilidades:

- centralizar regras locais de autorizacao derivadas da sessao atual;
- responder por acesso administrativo;
- responder por acesso de operador;
- responder por acesso ao patio;
- responder por acoes administrativas sensiveis do web;
- preparar o sistema para uma autorizacao real futura sem ativa-la agora.

Metodos expostos:

- `isAuthenticated()`
- `isAdminProfile()`
- `isOperatorProfile()`
- `canAccessAdminArea()`
- `canAccessOperatorArea()`
- `canAccessYard()`
- `canAccessFinance()`
- `canAccessReports()`
- `canAccessDocuments()`
- `canAccessSettings()`
- `canManageBusinessSettings()`
- `canViewFinancial()`
- `canManageUsers()`
- `canManageTeam()`
- `canManageClientRegistrations()`
- `canManageVehicleRegistrations()`
- `canManageProducts()`
- `canManageSupplies()`
- `canManageServices()`
- `canManageQuotes()`
- `canApproveBillingClients()`
- `canLogout()`
- `canAccessAdminView(viewName)`
- `canPerformSensitiveAction(actionName)`
- `getState()`

Pontos onde e usada:

- `showAdminView(...)`
- acionadores de abertura de cliente, veiculo, equipe, servico, produto, insumo e venda
- `openEntryVehicleRegistryEditor(...)`
- `openEntryClientRegistryEditor(...)`
- `openQuoteVehicleRegistryEditor(...)`
- `openQuoteClientRegistryEditor(...)`
- `canEditClientRegistrations()`
- atalho `data-open-business-finance` no dialogo de fluxo de caixa

## 8. Modulos extraidos de baixo acoplamento

### `textFormatters`

Localizacao atual:

- `app/utils/textFormatters.js`.

Relacao com `app/main.js`:

- `app/main.js` importa diretamente as funcoes extraidas;
- os pontos de chamada mantiveram os mesmos nomes;
- nao existe dependencia inversa do modulo para o monolito.

Responsabilidades:

- capitalizacao simples;
- escape HTML;
- escape CSS para seletores;
- normalizacao textual;
- extracao de digitos;
- formatacao de placa;
- formatacao de telefone;
- formatacao de CPF;
- formatacao de CNPJ.

Helpers expostos:

- `capitalize(...)`
- `escapeHtml(...)`
- `cssEscape(...)`
- `normalizeText(...)`
- `onlyDigits(...)`
- `formatPlate(...)`
- `formatPhone(...)`
- `formatCpf(...)`
- `formatCnpj(...)`

Riscos de importacao e utilizacao transversal:

- alteracoes futuras nestes helpers podem afetar filtros, renderizacao e mascaras em diversas telas;
- `cssEscape(...)` ainda depende de `window.CSS?.escape` quando disponivel;
- o modulo deve permanecer sem acesso a DOM, storage, Supabase, banco ou estado global do produto.

### `storageBoundary`

Localizacao atual:

- `app/storage/storageBoundary.js`.

Relacao com `app/main.js`:

- `app/main.js` importa a boundary;
- `app/main.js` continua concentrando os wrappers `loadBusinessStorageItem(...)` e `saveBusinessStorageItem(...)`;
- os consumidores de dominio nao foram alterados nesta fase.

Responsabilidades:

- encapsular leitura bruta de `localStorage`;
- encapsular escrita bruta de `localStorage`;
- oferecer metodos auxiliares minimos para existencia, remocao e fallback seguro;
- preparar uma fronteira tecnica para reduzir acoplamento com persistencia local.

Metodos expostos:

- `read(key)`
- `write(key, value)`
- `remove(key)`
- `exists(key)`
- `safeRead(key, fallback)`
- `safeWrite(key, value)`

Pontos onde e usada:

- `loadBusinessStorageItem(...)`
- `saveBusinessStorageItem(...)`

Limitacoes atuais:

- somente 2 chamadas diretas foram migradas;
- `remove(...)`, `exists(...)`, `safeRead(...)` e `safeWrite(...)` ainda nao sao consumidos pelo runtime;
- a normalizacao de payload continua no monolito.

## 9. Camada futura de adapters contratuais

### Relacao entre `app/main.js`, contratos e adapters

- `app/main.js` continua sendo a fonte do shape legado observado em runtime;
- os contratos oficiais vivem em `docs/primyo-data/contracts/` e nao devem ser tratados como tabelas;
- os futuros adapters deverao ficar entre o legado web e os contratos, convertendo entrada e saida sem alterar o comportamento visivel do produto;
- o runtime ainda nao consome adapters em producao nesta baseline;
- a futura adocao de Supabase e Android sincronizado depende dessa fronteira de traducao existir primeiro.

### Modulos planejados

Modulos documentados para criacao futura:

- `serviceAdapter`
- `productAdapter`
- `supplyAdapter`
- `attendanceAdapter`
- `paymentAdapter`
- `financialAdapter`

Suportes planejados:

- `contractEnvelopeFactory`
- `legacyIdResolver`
- `paymentMethodSnapshotResolver`

### Modulo contratual criado

#### `customerAdapter`

Localizacao atual:

- `app/adapters/customerAdapter.js`.

API publica:

- `toCustomerContract(...)`
- `validateCustomerContract(...)`
- `createCustomerContractEnvelope(...)`
- `CUSTOMER_CONTRACT_NAME`
- `CUSTOMER_CONTRACT_VERSION`

Relacao com `CUSTOMER_CONTRACT.md`:

- converte o shape legado de cliente para o contrato `Customer`;
- preserva a API publica original da primeira fatia de adapter;
- agora adere aos padroes compartilhados de `id`, `sourceId`, `legacyRefs`, envelope, contexto, status, timestamps e compatibilidade;
- depende de contexto para `organizationId`, `status`, `createdAt`, `updatedAt` e `metadata.emittedAt`;
- registra `legacyRefs` sem reconciliar `clientRegistry` e `billingClients`.

Relacao atual com `app/main.js`:

- nenhuma integracao em runtime nesta baseline;
- nenhum import ativo em `app/main.js`;
- nenhuma alteracao de comportamento funcional ou visual.

Relacao futura com `vehicleAdapter`:

- `customerAdapter` agora funciona como referencia de baseline para o proximo adapter de master data;
- `vehicleAdapter` reutilizou o mesmo padrao de `id` canonico, `sourceId`, `legacyRefs`, envelope e contexto;
- a relacao entre ambos agora comprova repetibilidade tecnica do baseline compartilhado sem consumo funcional em runtime.

Relacao futura com `app/main.js`:

- so deve ser consumido depois de fatia dedicada de integracao controlada;
- qualquer integracao futura deve preservar rollback simples e nao alterar comportamento perceptivel sem aprovacao explicita.

Relacao futura com Supabase:

- prepara a traducao legado -> contrato antes de qualquer leitura ou escrita remota;
- nao conhece tabelas, cliente Supabase, storage ou backend;
- reduz o acoplamento necessario antes da primeira leitura controlada.

#### `vehicleAdapter`

Localizacao atual:

- `app/adapters/vehicleAdapter.js`.

API publica:

- `toVehicleContract(...)`
- `validateVehicleContract(...)`
- `createVehicleContractEnvelope(...)`
- `VEHICLE_CONTRACT_NAME`
- `VEHICLE_CONTRACT_VERSION`

Relacao com `VEHICLE_CONTRACT.md`:

- converte o shape legado de veiculo para o contrato `Vehicle`;
- segue o baseline compartilhado de `id`, `sourceId`, `legacyRefs`, envelope, contexto, status, timestamps e compatibilidade;
- trata `currentCustomerId` apenas como referencia transitoria quando a origem legada existe;
- preserva placas antigas e referencias de ownership legado em `legacyRefs`, sem promover placa a identidade oficial.

Relacao atual com `app/main.js`:

- nenhuma integracao em runtime nesta baseline;
- nenhum import ativo em `app/main.js`;
- nenhuma alteracao de comportamento funcional ou visual.

Relacao futura com `customerAdapter`:

- ambos devem convergir para um futuro resolver comum de IDs e relacionamentos, sem acoplamento prematuro ao monolito;
- `customerAdapter` continua sendo a referencia de baseline e `vehicleAdapter` passa a ser a segunda prova de repetibilidade da trilha;
- a integracao funcional entre cliente e veiculo continua proibida nesta fase.

Relacao futura com Supabase:

- prepara o dominio de veiculos para futura traducao controlada entre legado, contratos e leitura remota;
- ainda nao resolve ownership real, FIPE remoto ou sincronizacao Android;
- reduz o risco de abrir `LP-SUPABASE-001` sem uma segunda evidenca pratica de adapter puro.

Riscos tecnicos ainda pendentes:

- `currentCustomerId` continua transitorio quando nasce de `currentClientId` legado;
- `year` legado ainda nao resolve automaticamente `manufactureYear` e `modelYear`;
- `ownerHistory` segue como rastreabilidade e nao como relacionamento contratual maduro;
- `specialCareRefs` ainda depende de IDs legados explicitos;
- integrar os adapters ao runtime antes de mais gate e testes continua prematuro.

### Cobertura automatica atual de adapters

Relacao entre os gates:

- `scripts/primyo-gate.mjs` continua sendo o gate tecnico principal do produto;
- `scripts/primyo-adapter-gate.mjs` agora e um subgate especializado executado dentro do Primyo Gate;
- o subgate existe para proteger a trilha contratual antes de qualquer integracao ao runtime.

Cobertura atual absorvida na baseline:

- importacao em Node puro de `customerAdapter` e `vehicleAdapter`;
- checagem de exports minimos dos dois adapters;
- fixture valida de cliente;
- fixture invalida de cliente;
- fixture valida de veiculo;
- fixture invalida de veiculo;
- validacao de envelope, `validation`, `warnings`, `organizationId`, timestamps e separacao entre `id` e `sourceId`;
- verificacao de ausencia de dependencia de runtime do LavaPrime;
- verificacao de ausencia de mutacao dos fixtures de entrada.

### Riscos tecnicos ainda nao resolvidos

- duplicidade de cliente entre operacao e faturamento;
- IDs indiretos ou ausentes em varios dominios;
- `organizationId`, `status` e timestamps ainda dependem de contexto externo;
- `vehicleIds` ainda dependem de resolucao externa;
- dependencia de chaves derivadas por nome em servicos e perfis de insumo;
- snapshots financeiros e ownership historico ainda sem implementacao concreta de adapter;
- compatibilidade futura de `contractVersion` ainda depende de disciplina na primeira fatia real.

## 10. Limitacoes atuais

- a autorizacao continua inteiramente local ao frontend;
- nao existe token, sessao remota, expiracao, revogacao ou enforce de backend;
- as permissoes administrativas atuais ainda convergem quase todas para a mesma regra de admin local;
- a `accessBoundary` ainda nao consome matriz formal de acesso por modulo e acao;
- Android e Supabase ainda nao participam desta camada.
- `app/main.js` e os modulos extraidos convivem com variaveis legadas globais;
- qualquer nova extracao deve preservar a ordem de inicializacao entre `app/main.js` e `app/boundaries/sessionAccessBoundary.js`.
- qualquer alteracao em `app/utils/textFormatters.js` deve considerar consumo transversal no monolito.
- qualquer alteracao em `app/storage/storageBoundary.js` deve preservar chaves, payloads e fallback atual de persistencia local.
- a maior parte da persistencia de negocio continua atravessando wrappers dentro de `app/main.js`.
- os adapters puros ainda nao compartilham helpers comuns de identidade ou resolucao de relacionamentos.
- o Adapter Contract Gate ainda cobre somente os dois adapters existentes e nao substitui smoke funcional futuro.

## 11. Checagens legadas que ainda existem

Compatibilidade e regras legadas ainda observadas:

- `selectedProfile` continua sincronizado para convivencia com o monolito;
- `activeSessionUser` continua sendo lido em varios fluxos como emissor, operador, autor, responsavel ou aprovador;
- varias regras de negocio ainda usam comparacoes literais de perfil como `Administrador`;
- o nome do admin ativo ainda e inferido em parte por `getActiveAdminApproverName()` a partir do contexto legado;
- a maior parte do produto continua concentrada no mesmo arquivo e fora da `accessBoundary`.

Riscos de convivencia com legado:

- divergencia futura entre estado da boundary e variaveis legadas se o callback for removido;
- introducao de nova regra diretamente em `app/main.js` sem passar pela `accessBoundary`;
- importacao circular se novas extracoes passarem a depender de dominios do monolito;
- divergencia futura se helpers puros passarem a carregar regra de negocio ou estado global;
- divergencia futura se a `storageBoundary` passar a alterar formato, ownership ou semantica de fallback sem fatia propria;
- divergencia futura se adapters passarem a ler ou publicar contratos sem envelope comum, `legacyRefs` ou politica clara de `contractVersion`;
- divergencia futura se um terceiro adapter for criado sem fixture valida e invalida no Adapter Contract Gate;
- falsa sensacao de autorizacao real, ja que a camada continua local ao frontend.

## 12. Conclusao

O mapa tecnico confirma que o LavaPrime agora possui duas fronteiras locais oficiais, dois modulos extraidos de baixo acoplamento no web, uma estrategia documental oficial para adapters contratuais e dois adapters puros criados, mas ainda precisa evoluir com controle:

- o web continua dependendo de um unico arquivo funcional central;
- sessao, perfil e autorizacao ficaram mais identificaveis e suas factories foram extraidas para `app/boundaries/sessionAccessBoundary.js`;
- helpers puros de texto e formatacao foram extraidos para `app/utils/textFormatters.js`;
- o acesso bruto ao `localStorage` ficou identificado em `app/storage/storageBoundary.js`, mas o dominio de persistencia ainda nao saiu do monolito;
- `customerAdapter` foi criado fora do runtime e conecta o shape legado ao contrato `Customer` sem consumo funcional nesta baseline;
- `customerAdapter` revisado passa a ser o modelo de referencia para os proximos adapters puros, sem consumo funcional em runtime;
- `vehicleAdapter` amplia essa trilha como segunda prova de repetibilidade do baseline compartilhado, ainda sem consumo funcional em runtime;
- `scripts/primyo-adapter-gate.mjs` agora protege os dois adapters puros com regressao automatica minima antes de qualquer integracao funcional;
- as checagens mais sensiveis ja estao centralizadas, mas a cobertura ainda e parcial;
- integracoes futuras existem, mas seguem proibidas nesta fase;
- a proxima etapa nao deve integrar adapters ao runtime ainda;
- a proxima prioridade recomendada passa a ser `LP-WEB-009`, como terceiro adapter puro e controlado, antes de helpers comuns, integracao funcional ou abertura de Supabase.
