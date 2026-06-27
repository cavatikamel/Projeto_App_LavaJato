# Permissoes e Perfis

## 1. Perfis observados

### Web

- `Administrador`
- `Operador`

### Android

- `ADMINISTRADOR`
- `OPERADOR`

## 2. Fronteiras locais atuais no web

O web agora possui duas camadas locais relacionadas a acesso:

### `sessionBoundary`

Responsavel por:

- registrar perfil ativo;
- registrar usuario atual;
- representar o estado autenticado local;
- iniciar sessao em `showAdmin(...)` e `showPatio(...)`;
- encerrar sessao em `returnToLogin()`;
- sincronizar `selectedProfile` e `activeSessionUser` para compatibilidade legada.

### `accessBoundary`

Responsavel por:

- centralizar autorizacao local derivada da sessao atual;
- verificar se o usuario esta autenticado;
- verificar perfil admin e operador;
- autorizar acesso administrativo;
- autorizar acesso ao patio;
- autorizar acoes sensiveis do web sem ativar autenticacao real.

Metodos expostos atualmente:

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

## 3. Regras locais atuais por perfil no web

### Operador

- acessa a tela de patio;
- pode acompanhar veiculos, iniciar atendimento e atuar no fluxo operacional;
- nao recebe a shell administrativa completa;
- continua sem acesso administrativo amplo pela `accessBoundary`.

### Administrador

- acessa dashboard e shell administrativa completa;
- navega por modulos de vendas, cadastros, estoque, financeiro, documentos e gestao da empresa;
- pode editar cadastros de cliente e veiculo pelos pontos ja conectados a `accessBoundary`;
- pode acessar atalhos administrativos sensiveis como configuracoes de negocio no fluxo web atual;
- agora depende de politica local centralizada por view administrativa e por acao sensivel dentro da `accessBoundary`.

## 4. Restricoes explicitamente observadas no web

- edicao de cadastro de cliente deve ser feita por administrador;
- edicao de cadastro de veiculo deve ser feita por administrador;
- cliente faturado continua dependendo de aprovacao administrativa;
- varios fluxos de faturamento seguem associados ao contexto do administrador;
- o operador continua restrito ao patio como shell principal.

## 5. Politica local consolidada por modulo

Na superficie web atual, a `accessBoundary` passou a concentrar decisao para:

- area administrativa geral;
- patio;
- orcamentos e pre-vendas;
- cadastros de clientes e veiculos;
- produtos, insumos e vendas de produto;
- equipe e usuarios;
- servicos;
- financeiro e cobrancas;
- documentos e relatorios emitidos;
- configuracoes da empresa, configuracoes financeiras e comunicacao.

Essa consolidacao ocorre por dois mecanismos:

- `canAccessAdminView(viewName)` para views administrativas do menu;
- `canPerformSensitiveAction(actionName)` para acoes sensiveis locais.

## 6. Diferenca entre autorizacao local atual e autorizacao real futura

### Autorizacao local atual

- roda apenas no frontend;
- depende de perfil em memoria local;
- nao usa token, sessao remota ou RLS;
- nao possui expiracao, revogacao ou trilha centralizada de auditoria;
- preserva comportamento atual sem mudar UX.

### Autorizacao real futura

Devera incluir, no minimo:

- identidade real por usuario;
- sessao controlada por backend;
- autorizacao por papel e por modulo;
- capacidade de revogacao e expiracao;
- rastreabilidade de acesso;
- alinhamento entre web, Android e backend.

## 7. Navegacao mobile observada por perfil

### Rotas admin-only no Android

- `DASHBOARD`
- `SERVICOS`
- `PRODUTOS`
- `FINANCEIRO`
- `RELATORIOS`
- `CONFIG`
- `SEGURANCA`

### Rotas nao restritas no Android

- `PATIO`
- `AGENDAMENTOS`
- `CLIENTES`

O drawer mobile filtra as rotas por `adminOnly`, permitindo todas ao Administrador e somente as nao restritas ao Operador.

## 8. Permissoes de plataforma observadas

### Android Manifest

- `android.permission.INTERNET`
- `android.permission.ACCESS_NETWORK_STATE`

Nao foram observadas permissoes de camera, geolocalizacao, microfone ou armazenamento privilegiado no manifest lido.

## 9. Modelo de permissao futuro planejado

- `organization_memberships.role` no Supabase aceita `owner`, `admin`, `manager`, `operator`, `finance`, `viewer`;
- esse modelo ainda nao foi observado como ativo na execucao atual do frontend;
- a `accessBoundary` atual prepara a superficie web para consumir uma matriz formal futura, mas ainda nao implementa esse modelo;
- `LP-SEC-003` consolidou o ponto unico de decisao local, mas nao ativou autorizacao real.

## 10. Conclusoes

- a separacao funcional principal atual continua sendo `Administrador` vs `Operador`;
- `sessionBoundary` e `accessBoundary` agora documentam explicitamente sessao e autorizacao local no web;
- a `accessBoundary` passou a concentrar mais decisoes por modulo e por acao sensivel;
- o modelo de roles futuro no Supabase e mais rico do que a enforce observada hoje nas superficies ativas;
- ainda nao existe autorizacao real integrada entre web, Android e backend.

## 11. Matriz formal criada em LP-PERM-001

`LP-PERM-001` formalizou a matriz oficial de permissoes sem alterar codigo, Supabase, banco, Android ou perfis em runtime.

Documentos oficiais criados:

- `docs/primyo-permissions/ROLE_PERMISSION_MATRIX.md`
- `docs/primyo-permissions/SENSITIVE_ACTIONS.md`
- `docs/primyo-permissions/PERMISSION_POLICY.md`
- `docs/primyo-permissions/RLS_READINESS_MAP.md`
- `docs/primyo-permissions/PERMISSION_TEST_SCENARIOS.md`

Decisoes formais:

- o estado atual continua com apenas `Administrador` e `Operador`;
- `Administrador` representa o acesso administrativo amplo atual;
- `Operador` representa acesso operacional restrito ao patio;
- perfis futuros como `Dono/Proprietario`, `Supervisor`, `Financeiro` e `Suporte Primyo` permanecem apenas planejados;
- a politica oficial passa a ser `negar por padrao`;
- acoes nao mapeadas devem ser bloqueadas ate classificacao;
- exclusao fisica deve ser evitada e substituida por inativacao sempre que possivel;
- a traducao para Supabase RLS fica preparada, mas nenhuma policy SQL foi criada.

Lacunas remanescentes:

- a autorizacao continua local ao frontend;
- a matriz ainda nao e consumida automaticamente pela `accessBoundary`;
- Android e Supabase ainda nao possuem enforce integrado;
- perfis futuros ainda dependem de fatias especificas.
