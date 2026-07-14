# LavaPrime Test Gate Policy

## Objetivo

Definir quando uma mudanca pode avancar, quando deve ser bloqueada e quando exige rollback.

Esta politica e a primeira camada oficial de gate de regressao do LavaPrime.

## Gate minimo obrigatorio

Toda mudanca futura no LavaPrime Web deve, no minimo, executar e registrar:

- `npm.cmd run primyo:gate`

O comando `primyo:gate` e a validacao tecnica oficial adotada em `LP-TEST-AUTO-001`.

Ele executa:

- preflight de ambiente Node;
- verificacao de arquivos obrigatorios;
- `node --check app/adapters/customerAdapter.js`;
- `node --check app/adapters/shared/adapterHelpers.js`;
- `node --check app/adapters/shared/idResolver.js`;
- `node --check app/adapters/vehicleAdapter.js`;
- `node --check app/adapters/serviceAdapter.js`;
- `node --check app/adapters/productAdapter.js`;
- `node --check app/adapters/supplyAdapter.js`;
- `node --check scripts/primyo-adapter-gate.mjs`;
- `node scripts/primyo-adapter-gate.mjs`;
- `node --check app/main.js`;
- `node --check app/boundaries/sessionAccessBoundary.js`;
- `node --check scripts/sync-fipe-local-db.mjs`;
- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- resumo final com `Gate Result: SUCCESS` ou `Gate Result: FAILED`.

Quando a mudanca tocar sessao, perfil, autenticacao, permissao ou navegacao principal, tambem e obrigatorio:

- executar `ST-001` a `ST-006` do `SMOKE_TEST_PLAN.md`;
- registrar a execucao em `TEST_EXECUTION_TEMPLATE.md`.

Os comandos individuais continuam validos para diagnostico, mas nao substituem o registro do gate oficial quando a mudanca for encerrada.

## Aplicacao em fases documentais e Lean Mode

Quando a fase for documental e nao tocar codigo funcional, runtime, scripts, `package.json` ou dependencias:

- executar `git status --short`;
- executar `git diff --name-only`;
- executar `npm.cmd run primyo:gate`;
- registrar a ocorrencia se o gate falhar por causa de mudanca preexistente fora do escopo atual;
- nao improvisar correcao lateral apenas para deixar o gate verde.

Essa reducao vale apenas para fases documentais.

Ela nao substitui o pacote completo de gate, build, verify, `node --check` extra ou smoke quando a fatia tocar codigo, adapters, scripts, runtime, permissao, dados ou integracao.

## Automacao planejada em LP-TEST-003

`LP-TEST-003` definiu a estrategia de automacao incremental, mas nao implementou scripts.

Estado historico apos `LP-TEST-003`:

- o gate tecnico continua sendo executado pelos comandos manuais obrigatorios;
- o smoke funcional continua manual;
- nenhuma dependencia de teste foi adicionada;
- nenhum framework de automacao foi instalado;
- nenhuma pipeline foi criada.

Primeira automacao futura recomendada:

- script Node simples, sem dependencias novas;
- consolidacao dos quatro comandos obrigatorios;
- registro local de resultado;
- ponte para smoke manual conforme matriz de regressao.

## Automacao adotada em LP-TEST-AUTO-001

`LP-TEST-AUTO-001` implementou o primeiro gate tecnico local.

Estado oficial apos `LP-TEST-AUTO-001`:

- `npm.cmd run primyo:gate` e obrigatorio para encerramento tecnico de mudancas web;
- o gate falha com codigo diferente de zero se qualquer etapa obrigatoria falhar;
- o smoke funcional continua manual;
- nenhuma dependencia nova foi adicionada;
- nenhum framework de automacao foi instalado;
- nenhuma pipeline foi criada.

## Automacao adotada em LP-TEST-AUTO-003

`LP-TEST-AUTO-003` adicionou um gate conceitual especifico para adapters puros, sem dependencias novas.

Estado oficial apos `LP-TEST-AUTO-003`:

- `scripts/primyo-adapter-gate.mjs` passa a ser executado dentro de `npm.cmd run primyo:gate`;
- o gate importa `customerAdapter`, `vehicleAdapter` e `serviceAdapter` em Node puro;
- o gate valida exports minimos dos adapters;
- o gate executa cenarios validos e invalidos controlados para cliente, veiculo e servico;
- o gate valida envelope, `validation`, `warnings`, `organizationId`, timestamps, separacao entre `id` e `sourceId` e ausencia de dependencia de runtime;
- `customerAdapter`, `vehicleAdapter` e `serviceAdapter` passam a estar protegidos por regressao automatica minima oficial;
- todo novo adapter puro devera entrar no Adapter Contract Gate com fixture valida e fixture invalida antes de qualquer integracao ao runtime;
- nenhuma dependencia nova foi instalada;
- nenhum adapter foi integrado ao runtime;
- `app/main.js` permanece fora do escopo desta fase.

Estado oficial apos `LP-WEB-ADAPTER-HELPERS-001`:

- `app/adapters/shared/adapterHelpers.js` passa a ser modulo estrutural critico da trilha de adapters;
- `npm.cmd run primyo:gate` passa a validar a existencia do diretorio `app/adapters/shared` e do arquivo `app/adapters/shared/adapterHelpers.js`;
- o Primyo Gate passa a verificar exports minimos do helper compartilhado;
- o Adapter Contract Gate passa a validar pureza estrutural do helper compartilhado;
- o Adapter Contract Gate passa a provar que `customerAdapter`, `vehicleAdapter` e `serviceAdapter` continuam importando o helper comum;
- qualquer mudanca em `adapterHelpers.js` passa a exigir revalidacao conjunta dos tres adapters, do Adapter Gate, do Primyo Gate, do build e do verify;
- a cobertura continua local e sem runtime: nenhum adapter foi integrado ao produto por causa desta consolidacao.

## Aplicacao em LP-SERVICE-ORDER-004

Como a fase toca runtime Web em `app/main.js`, o pacote completo permanece obrigatorio:

- `git status --short`
- `git diff --name-only`
- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Estado oficial apos `LP-WEB-010`:

- `scripts/primyo-adapter-gate.mjs` passa a importar `productAdapter` em Node puro;
- o gate valida exports minimos de `productAdapter`;
- o gate executa cenarios validos e invalidos controlados para produto;
- o gate valida `price -> salePrice`, `cost -> costPrice`, `stock -> stockBalance`, `organizationId`, timestamps, envelope e separacao entre `id` e `sourceId` no dominio de produto;
- `productAdapter` passa a estar protegido por regressao automatica minima oficial;
- o estado oficial do gate passa a cobrir `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `productAdapter`;
- qualquer novo adapter puro deve entrar no Adapter Contract Gate no mesmo slice em que for criado;
- nenhum adapter foi integrado ao runtime;
- `app/main.js` permanece fora do escopo desta fase.

Estado oficial apos `LP-WEB-011`:

- `scripts/primyo-adapter-gate.mjs` passa a importar `supplyAdapter` em Node puro;
- o gate valida exports minimos de `supplyAdapter`;
- o gate executa cenarios validos e invalidos controlados para insumo;
- o gate valida `cost -> costPrice`, `stock -> stockBalance`, `supplier -> supplierName`, `organizationId`, timestamps, envelope e separacao entre `id` e `sourceId` no dominio de insumo;
- `supplyAdapter` passa a estar protegido por regressao automatica minima oficial;
- o estado oficial do gate passa a cobrir `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter`;
- nenhum adapter foi integrado ao runtime;
- `app/main.js` permanece fora do escopo desta fase.

Estado oficial apos `LP-WEB-ID-RESOLVER-002`:

- `scripts/primyo-adapter-gate.mjs` passa a importar `app/adapters/shared/idResolver.js` em Node puro;
- o gate valida exports minimos do resolvedor;
- o gate executa resolucao canonica valida e resolucao valida por `legacyRefs` aprovados;
- o gate executa falha controlada sem `canonicalId` ou `sourceId`;
- o gate executa falha controlada em caso ambiguo;
- o gate bloqueia lookup por nome e por placa como identidade oficial;
- o gate prova preservacao de `legacyRefs` no resultado do resolvedor;
- `idResolver` passa a estar protegido por regressao automatica minima oficial;
- nenhum adapter foi integrado ao runtime;
- `app/main.js` permanece fora do escopo desta fase.

Estado oficial apos `LP-TEST-AUTO-004`:

- o Adapter Gate reforca o `idResolver` sem alterar o modulo nem o runtime;
- o gate passa a validar `canonicalId` correto com filtro de entidade e falha controlada para entidade errada;
- o gate passa a validar `legacyRefs` aprovados preservando `source` e `sourceId`;
- o gate passa a validar `legacyRefs` inexistentes e ambiguos com falha explicita;
- o gate passa a validar query vazia, query por `name` e query por `plate` como casos bloqueados;
- o gate passa a validar derivacao controlada de `id` canonico quando o contrato chega sem `id` explicito;
- o gate passa a validar contratos duplicados, entradas invalidas, indice vazio e imutabilidade das fixtures do resolvedor;
- falhas do resolvedor passam a exigir `code` e `reason` explicitos no baseline automatizado minimo;
- nenhuma integracao funcional foi iniciada;
- `app/main.js` permanece fora do escopo desta fase.

## Readiness para primeira integracao em runtime

Antes de qualquer fase que passe a usar adapters ou `idResolver` dentro de `app/main.js`, passa a valer:

- `npm.cmd run primyo:gate` continua obrigatorio;
- o Adapter Gate continua obrigatorio e nao pode ser afrouxado;
- o primeiro slice deve tocar um unico dominio;
- o primeiro slice deve preferir leitura/sombra;
- `idResolver` nao deve entrar no primeiro slice funcional;
- estoque, financeiro e Supabase continuam proibidos na primeira integracao;
- smoke manual do dominio tocado passa a ser obrigatorio junto com `LA`, `LO`, `LG`, `PA`, `AD` e `NV`;
- rollback simples em `app/main.js` deve estar documentado antes da implementacao.

Diretriz oficial de entrada:

- a primeira integracao recomendada e `customerAdapter` em leitura/sombra;
- `vehicleAdapter`, `serviceAdapter`, `productAdapter`, `supplyAdapter` e `idResolver` ficam rejeitados como primeira entrada de runtime.

Estado oficial apos `LP-WEB-INTEGRATION-001`:

- `app/main.js` passa a executar `customerAdapter` apenas em shadow read;
- o uso fica restrito a edicao de cliente existente em `Cadastros > Clientes`;
- o resultado adaptado fica apenas em memoria local e nao altera renderizacao, persistencia ou save;
- o legado continua fonte ativa de dados e de escrita;
- `idResolver` continua fora do runtime;
- a validacao minima desta primeira entrada exige `npm.cmd run primyo:gate`, build, verify e smoke manual do fluxo de clientes, do patio admin, do logout e do patio operador;
- qualquer expansao para nova escrita, novo dominio, `idResolver`, estoque, financeiro ou Supabase continua bloqueada ate o closure formal da fase.

Estado oficial apos `LP-WEB-INTEGRATION-002`:

- `app/main.js` continua executando `customerAdapter` apenas em shadow read;
- o diagnostico da sombra passa a registrar snapshot rico e historico curto em `window.__lavaprimeCustomerShadowReadDiagnostics`;
- o relatorio interno agora registra cliente analisado, sucesso/falha, motivo, campos obrigatorios ausentes, tipo de cliente, presenca de documento, timestamp, rollback e confirmacao de legado ativo;
- o diagnostico continua silencioso para o usuario, sem nova UI, sem persistencia e sem envio externo;
- `Novo cliente` continua fora do `shadow read`;
- o legado continua fonte ativa de renderizacao e save;
- `idResolver` continua fora do runtime;
- a validacao minima continua exigindo `npm.cmd run primyo:gate`, build, verify e smoke manual do fluxo de clientes, do logout e do perfil operador;
- qualquer expansao para escrita, novo dominio, `idResolver`, estoque, financeiro ou Supabase continua bloqueada ate o closure formal desta fase.

Estado oficial apos `LP-WEB-INTEGRATION-004`:

- `app/main.js` continua executando `customerAdapter` apenas em shadow read;
- `renderClientsScreen(container)` passa a executar validacao silenciosa da base legada antes de qualquer ampliacao da sombra;
- o diagnostico consolidado fica restrito a `window.__lavaprimeCustomerLegacyDataValidation`;
- a leitura continua apenas em memoria, sem persistencia, sem telemetria e sem alteracao visual;
- `document` deixa de bloquear cliente comum e continua bloqueando apenas cliente faturado;
- o diagnostico passa a separar compatibilidade estrutural, incompatibilidade real, registros `demo/teste`, ausencias opcionais de `document` e bloqueios especificos de faturamento;
- a base atual de `clientRegistry` passa a ser tratada oficialmente como seed `demo/teste`, nao como base real pronta para Supabase;
- a ampliacao da sombra continua bloqueada nesta fatia porque a massa `demo/teste` ainda precisa de limpeza/isolation controlada;
- o legado continua fonte ativa de renderizacao e save;
- `idResolver` continua fora do runtime;
- a validacao minima continua exigindo `npm.cmd run primyo:gate`, build, verify e smoke manual do fluxo de clientes;
- qualquer ampliacao para lista, `Novo cliente`, save, novo dominio, `idResolver`, estoque, financeiro ou Supabase continua bloqueada ate o closure formal desta fase.

Estado oficial apos `LP-WEB-DATA-CLEANUP-001`:

- `app/demo/lavaprimeDemoData.js` passa a ser o modulo dedicado da massa `demo/teste` central do LavaPrime Web;
- a existencia do modulo isolado nao autoriza remocao direta de seed nem abertura de Supabase;
- qualquer mudanca em `app/demo/lavaprimeDemoData.js` ou no consumo dele em `app/main.js` deve reexecutar `npm.cmd run primyo:gate`, build, verify e smoke manual de dashboard, clientes, patio e financeiro;
- a massa `demo/teste` deve continuar classificada como nao real em qualquer diagnostico ou documentacao da trilha;
- a proxima etapa segura passa a ser separar bootstrap demo de bootstrap limpo antes de qualquer remocao real.

Estado oficial apos `LP-WEB-DATA-CLEANUP-002`:

- `app/demo/lavaprimeBootstrapMode.js` passa a ser o ponto unico de bootstrap da massa demo;
- `app/demo/lavaprimeCleanBootstrap.js` passa a existir como bootstrap limpo estrutural e protegido;
- `DEMO_BOOTSTRAP` continua o modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode ser promovido a padrao enquanto dashboard, clientes, patio, financeiro e relatorios dependerem da seed demo;
- a regressao minima desta trilha passa a exigir `node --check` do seletor de bootstrap e de qualquer modulo novo em `app/demo/`;
- a proxima etapa segura passa a ser revisar dependencias residuais antes de qualquer ativacao do bootstrap limpo.

Estado oficial apos `LP-WEB-DATA-CLEANUP-003`:

- `app/main.js` passa a publicar `window.__lavaprimeCleanBootstrapReadiness` apenas como diagnostico interno e silencioso;
- o diagnostico confirma que `DEMO_BOOTSTRAP` continua o unico modo seguro como padrao;
- o diagnostico nao autoriza troca automatica de bootstrap, remocao de seed, persistencia ou telemetria externa;
- qualquer mudanca em diagnostico de bootstrap limpo deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke de dashboard, clientes, patio, financeiro e relatorios/documentos;
- a proxima etapa segura continua sendo hardening de fallback antes de qualquer teste futuro com bootstrap limpo.

Estado oficial apos `LP-WEB-DATA-CLEANUP-004`:

- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a default nesta etapa;
- `app/main.js` passa a endurecer fallback estrutural minimo para clientes, veiculos, pagamentos, caixa e faturas;
- `window.__lavaprimeCleanBootstrapReadiness` continua silencioso em memoria e passa a refletir cobertura adicional de fallback por superficie;
- qualquer mudanca nesses fallbacks deve reexecutar `node --check app/main.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke de dashboard, clientes, patio, financeiro e relatorios/documentos;
- nenhuma seed demo pode ser removida sem uma nova microfase dedicada e um trial protegido.

Estado oficial apos `LP-WEB-DATA-CLEANUP-005`:

- `window.__lavaprimeCleanBootstrapTrialReadiness` passa a existir como diagnostico protegido de trial;
- o diagnostico distingue `canStartProtectedTrial` de `canPromoteCleanBootstrapToDefault`;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a default nesta etapa;
- qualquer mudanca no readiness de trial deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke de dashboard, clientes, patio, financeiro e relatorios/documentos;
- nenhuma seed demo pode ser removida sem uma nova microfase dedicada e um trial protegido executado.

Estado oficial apos `LP-WEB-DATA-CLEANUP-006`:

- `window.__lavaprimeCleanBootstrapTrialExecution` passa a existir como baseline tecnico do trial protegido;
- o trial continua somente leitura, silencioso e em memoria;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a default nesta etapa;
- o diagnostico do trial deve registrar cobertura estrutural esperada, superficies ainda inseguras e bloqueios para promocao do modo limpo;
- qualquer mudanca no trial execution deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke de dashboard, clientes, patio, financeiro e relatorios/documentos;
- a observabilidade do trial no browser continua sendo requisito de verificacao manual, inclusive quando os objetos globais tecnicos nao aparecerem na inspeção visual;
- nenhuma seed demo pode ser removida sem nova microfase dedicada e sem reducao dos bloqueios semanticos remanescentes.

Estado oficial apos `LP-WEB-DATA-CLEANUP-007`:

- `app/main.js` passa a endurecer semanticamente `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks`;
- agregacoes financeiras e operacionais usadas nessas superficies devem continuar protegidas contra `NaN`;
- geracao de recibos, relatorios e documentos deve continuar tolerando linhas e vinculos ausentes sem erro bloqueante;
- o diagnostico protegido de bootstrap limpo deve refletir a melhora sem promover `CLEAN_BOOTSTRAP` a modo padrao;
- qualquer mudanca adicional nessa trilha deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeDemoData.js`, `node --check app/demo/lavaprimeBootstrapMode.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke de dashboard, clientes, patio, financeiro e relatorios/documentos;
- nenhuma seed demo pode ser removida e nenhuma integracao com Supabase pode ser iniciada nesta etapa.

Estado oficial apos `LP-WEB-DATA-CLEANUP-008`:

- a reavaliacao do trial protegido passa a registrar comparacao explicita com as `5` superficies inseguras do estado pre-hardening;
- `window.__lavaprimeCleanBootstrapTrialReadiness` e `window.__lavaprimeCleanBootstrapTrialExecution` passam a refletir `improvedSurfaceCount`, `previousUnsafeSurfaceCount` e `currentUnsafeSurfaceCount`;
- o estado esperado do trial protegido apos o hardening passa a ser `currentUnsafeSurfaceCount = 0` sem autorizar promocao de `CLEAN_BOOTSTRAP` a `default`;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- qualquer mudanca adicional nessa trilha deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeDemoData.js`, `node --check app/demo/lavaprimeBootstrapMode.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke de dashboard, clientes, patio, financeiro e relatorios/documentos;
- a proxima etapa segura deixa de ser novo hardening imediato e passa a ser melhoria de observabilidade do trial protegido;
- nenhuma seed demo pode ser removida e nenhuma integracao com Supabase pode ser iniciada nesta etapa.

Estado oficial apos `LP-WEB-DATA-CLEANUP-009`:

- `app/main.js` passa a publicar leitura oficial de diagnostico por `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` e `window.__lavaprimeDiagnostics?.cleanBootstrap`;
- o runtime passa a publicar espelho tecnico somente leitura no DOM via `dataset` e `script[type=\"application/json\"]`;
- a automacao deixa de depender exclusivamente da visibilidade de globais tecnicos no contexto de inspecao e passa a ter um ponto mais confiavel de consulta;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a default nesta etapa;
- qualquer mudanca adicional nessa trilha deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeDemoData.js`, `node --check app/demo/lavaprimeBootstrapMode.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke com consulta tecnica no browser;
- nenhuma seed demo pode ser removida e nenhuma integracao com Supabase pode ser iniciada nesta etapa.

Estado oficial apos `LP-WEB-DATA-CLEANUP-010`:

- `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` e `window.__lavaprimeDiagnostics?.cleanBootstrap` passam a ficar repetiveis no contexto de avaliacao direta da pagina;
- o espelho tecnico no DOM continua sendo a evidencia mais estavel para automacao e aceite documental;
- o estado pre-login pode existir como snapshot parcial, mas o estado operacional final deve convergir para `activeMode=DEMO_BOOTSTRAP`, `defaultMode=DEMO_BOOTSTRAP`, `trialStatus=diagnostic-only`, `unsafeSurfaceCount=0` e `improvedSurfaceCount=5`;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a default nesta etapa;
- qualquer mudanca adicional nessa trilha deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeDemoData.js`, `node --check app/demo/lavaprimeBootstrapMode.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke com consulta tecnica no browser;
- nenhuma seed demo pode ser removida e nenhuma integracao com Supabase pode ser iniciada nesta etapa.

Estado oficial apos `LP-WEB-DATA-CLEANUP-011`:

- a promocao de `CLEAN_BOOTSTRAP` a default continua formalmente bloqueada;
- os bloqueios remanescentes passam a ficar consolidados entre base limpa insuficiente, relacionamentos persistidos ausentes, dependencia comercial da seed demo e falta de ativacao gradual formal;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a default nesta etapa;
- qualquer mudanca adicional nessa trilha deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeDemoData.js`, `node --check app/demo/lavaprimeBootstrapMode.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke reduzido;
- nenhuma seed demo pode ser removida e nenhuma integracao com Supabase pode ser iniciada nesta etapa.

Estado oficial apos `LP-WEB-DATA-CLEANUP-012`:

- a trilha passa a exigir pre-requisitos formais de ativacao antes de qualquer promocao futura de `CLEAN_BOOTSTRAP`;
- esses pre-requisitos precisam cobrir dados de base, relacionamentos persistidos, smoke em cenarios vazio/parcial/completo, dashboards, relatorios, documentos, seed demo, rollback e decisao formal;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a default nesta etapa;
- qualquer mudanca adicional nessa trilha deve reexecutar `node --check app/main.js`, `node --check app/demo/lavaprimeDemoData.js`, `node --check app/demo/lavaprimeBootstrapMode.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke reduzido;
- nenhuma seed demo pode ser removida e nenhuma integracao com Supabase pode ser iniciada nesta etapa.

Estado oficial apos `LP-DOC-FINAL-001`:

- o encerramento documental do Primyo Transformation Program no LavaPrime Web fica consolidado;
- o pacote oficial de validacao permanece `node --check` dos modulos criticos, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke reduzido;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a `default` nesta etapa;
- nenhuma seed demo pode ser removida;
- nenhuma integracao com Supabase pode ser iniciada nesta etapa;
- `LP-WEB-DATA-CLEANUP-013` fica registrada como trilha futura independente e nao como bloqueio do encerramento atual;
- qualquer nova trilha deve abrir escopo proprio e manter Android, CSS e `.gitignore` fora dos commits Primyo Web quando nao houver autorizacao explicita.

Estado oficial apos `LP-DEPLOY-GOV-001`:

- a governanca de homologacao e producao passa a exigir branch, checklist e rollback definidos antes de qualquer push ou deploy;
- o pacote oficial de validacao permanece `node --check` dos modulos criticos, Adapter Gate, `npm.cmd run primyo:gate`, `build`, `verify:build` e smoke reduzido;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a `default` nesta etapa;
- nenhuma integracao runtime com Supabase pode ser iniciada nesta etapa;
- nenhuma publicacao para `app.lavaprime.com.br` pode ocorrer sem staging aprovado e autorizacao formal do usuario;
- arquivos fora de escopo no working tree devem ser tratados como bloqueio de push ou deploy sem isolamento seletivo.

Estado oficial apos `LP-DEPLOY-GOV-002`:

- a preparacao de staging Netlify continua apenas documental e tecnica;
- a branch `staging` segue ausente local e remotamente na auditoria atual;
- a criacao futura de `staging` deve partir de baseline Web revisada e nao do `HEAD` atual de forma cega;
- o `HEAD` atual `87975a5` em `primyo/onboarding` inclui governanca APK e exige revisao antes de qualquer branch deploy Web;
- `build = npm run build` e `publish = dist` seguem confirmados para o Netlify;
- nenhuma publicacao para `app.lavaprime.com.br` pode ocorrer sem `staging` criada, `push` autorizado, deploy de homologacao validado e aprovacao formal do usuario;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a `default` nesta etapa;
- Supabase continua fechado para runtime;
- arquivos fora de escopo no working tree continuam sendo bloqueio de push ou deploy sem isolamento seletivo.

Estado oficial apos `LP-DEPLOY-GOV-003`:

- a baseline Web candidata passa a ser o `HEAD` atual `ef0bc0e`;
- `094a5b7` continua registrado como ultimo fechamento formal do programa Web;
- os deltas entre `094a5b7` e `ef0bc0e` ficam classificados como documentais, sem alteracao de runtime Web;
- o historico da branch continua misturado com commits Android/APK, mas esse risco passa a ser classificado como risco de governance da branch e do merge futuro, nao de snapshot Web atual;
- a criacao ou push da futura `staging` continua bloqueada enquanto o working tree contiver arquivos fora de escopo misturados;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a `default`;
- Supabase continua fechado para runtime.

Estado oficial apos `LP-WEB-DASHBOARD-001`:

- `app/dashboard/dashboardMetrics.js` passa a ser a camada oficial de metricas do dashboard Web;
- a cobertura minima automatizada passa a incluir `node --test app/dashboard/dashboardMetrics.test.mjs`;
- os testes de metricas agora precisam cobrir dataset vazio, dataset parcial, dataset completo, valor zero, valor negativo permitido, `NaN`, `undefined`, data invalida, duplicidade, periodo sem dados, uma unica categoria e muitas categorias;
- a Visao Geral admin passa a exigir smoke com KPIs, graficos, filtros temporais e resize;
- a validacao mobile da Visao Geral passa a exigir verificacao em `360px`, `390px`, `480px` e `768px`, sem overflow horizontal e sem dois graficos lado a lado em viewport pequeno;
- os ajustes de login, Agendamentos, Patio e cuidados especiais desta mesma fatia entram no smoke complementar da mudanca;
- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido e nao pode ser promovido a `default`;
- nenhuma integracao com Supabase foi iniciada nesta etapa.

Limites atuais desta cobertura:

- o gate cobre `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter`, mas ainda nao cobre dominios operacionais ou financeiros;
- a cobertura continua conceitual e local, nao browser-based;
- smoke funcional continua obrigatorio quando futuras fatias tocarem runtime, navegacao, dados ou permissao.

## Niveis futuros de automacao

Os niveis abaixo devem evoluir em fatias separadas e aprovadas:

1. Gate tecnico local.
2. Checklist estruturado.
3. Smoke assistido.
4. Smoke browser.
5. Testes de unidade.
6. Testes E2E criticos.

Nenhum nivel futuro substitui automaticamente a validacao manual atual.

## Regra para substituir validacao manual

Um smoke manual so pode ser substituido por automacao quando:

- a automacao estiver aprovada em fatia propria;
- a automacao produzir evidencia equivalente ou superior;
- o resultado tiver sido comparado com execucao manual;
- o rollback da automacao estiver documentado;
- a decisao estiver registrada no change control.

## Quando uma mudanca pode avancar

Uma mudanca pode avancar quando:

- `npm.cmd run primyo:gate` passar;
- todos os fluxos `Obrigatorio` da `REGRESSION_MATRIX.md` passarem;
- nao houver erro visivel bloqueador;
- o escopo continuar dentro dos limites aprovados;
- o rollback estiver descrito;
- o resultado estiver registrado.

## Quando uma mudanca deve ser bloqueada

Uma mudanca deve ser bloqueada quando:

- `npm.cmd run primyo:gate` falhar;
- login admin falhar;
- login operador falhar;
- logout falhar;
- patio nao abrir quando obrigatorio;
- area administrativa deixar de abrir para admin;
- o operador receber acesso indevido a shell administrativa;
- a navegacao principal quebrar;
- nao houver evidencia suficiente para decidir com seguranca.

## Quando uma mudanca exige rollback

Uma mudanca exige rollback quando:

- altera comportamento critico e nao passa o pacote minimo de regressao;
- abre regressao em sessao, perfil, login, logout ou roteamento principal;
- quebra `npm.cmd run primyo:gate` apos ter sido aplicada;
- gera desvio fora do escopo aprovado e nao pode ser contida rapidamente;
- nao existe correcao pequena e segura dentro da mesma janela.

## Niveis de decisao

- `Pode avancar`: todos os gates verdes.
- `Aprovado com ressalva`: gates verdes, mas existe observacao nao bloqueadora documentada.
- `Bloqueado`: pelo menos um gate obrigatorio falhou.
- `Revertido`: a mudanca foi desfeita para restaurar a baseline esperada.

## Evidencia registrada nesta fase

Revalidacao inicial executada em `2026-06-19` para sustentar esta politica:

- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- `node --check app/main.js` -> sucesso
- `node --check scripts/sync-fipe-local-db.mjs` -> sucesso

Planejamento de automacao executado em `2026-06-23`:

- estrategia de automacao criada em `docs/primyo-tests/automation/AUTOMATED_TEST_STRATEGY.md`;
- decisao de ferramenta criada em `docs/primyo-tests/automation/TEST_TOOLING_DECISION.md`;
- primeira automacao futura definida em `docs/primyo-tests/automation/FIRST_AUTOMATION_SLICE.md`;
- desenho de gate criado em `docs/primyo-tests/automation/AUTOMATED_GATE_DESIGN.md`;
- roadmap manual para automatizado criado em `docs/primyo-tests/automation/MANUAL_TO_AUTOMATED_ROADMAP.md`;
- requisitos de teste para extracoes criados em `docs/primyo-tests/automation/EXTRACTION_TEST_REQUIREMENTS.md`.

Revalidacao tecnica executada em `2026-06-23` para fechar `LP-TEST-003`:

- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- `node --check app/main.js` -> sucesso
- `node --check scripts/sync-fipe-local-db.mjs` -> sucesso

Adocao do gate oficial executada em `2026-06-24` para fechar `LP-TEST-AUTO-001`:

- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Implementacao e closure do gate de adapters executadas em `2026-06-26` para absorver `LP-TEST-AUTO-003`:

- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Revalidacao final executada em `2026-06-26` para encerrar `LP-WEB-009`:

- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `node --check app/adapters/serviceAdapter.js` -> sucesso
- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Revalidacao estrutural executada em `2026-06-26` para absorver `LP-WEB-ADAPTER-HELPERS-001`:

- `node --check app/adapters/shared/adapterHelpers.js` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `node --check app/adapters/serviceAdapter.js` -> sucesso
- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Revalidacao estrutural executada em `2026-06-26` para implementar `LP-WEB-010`:

- `node --check app/adapters/productAdapter.js` -> sucesso
- `node --check app/adapters/shared/adapterHelpers.js` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `node --check app/adapters/serviceAdapter.js` -> sucesso
- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## Resultado esperado do gate

Depois desta fase, nenhuma proxima fatia deve avancar apenas por percepcao manual solta.

Ela devera avancar por:

- checklist definido;
- matriz de impacto;
- evidencia registrada;
- decisao final objetiva.

## Complemento aplicado em `LP-WEB-DASHBOARD-ACCEL-001`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- login admin
- Visao Geral
- leitura dos 3 graficos principais
- checagem de overflow em `1024px`, `768px`, `480px`, `390px` e `360px`
- Patio
- Financeiro
- Documentos / Relatorios
- logout
- login operador sem quebra de fluxo permitido

## Complemento aplicado em `LP-SERVICE-ORDER-001`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- login admin
- login operador
- logout
- patio com atendimento existente
- confirmacao de que atendimento continua editavel e sem quebra visual
- financeiro sem `NaN`, `undefined`, `null` ou `Invalid Date`
- documentos / relatorios sem quebra
- consulta manual de `window.__lavaprimeGetServiceOrderDiagnostics?.()`

Regras adicionais:

- a `Service Order` desta fase continua derivada e sem persistencia dedicada;
- a numeracao local de OS nao pode ser tratada como sequencial definitiva de producao;
- a fase nao autoriza Supabase, bootstrap novo ou refatoracao ampla de UX.

## Complemento aplicado em `LP-SERVICE-ORDER-002`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- login admin
- login operador
- logout
- patio com atendimento existente e sem quebra visual
- financeiro sem `NaN`, `undefined`, `null` ou `Invalid Date`
- documentos / relatorios sem quebra
- consulta manual de `window.__lavaprimeGetServiceOrderDiagnostics?.()` com os novos campos de links e persistencia

Regras adicionais:

- a `Service Order` continua sem persistencia real em banco;
- `serviceOrder.persistence` e um snapshot local de readiness, nao gravacao definitiva;
- Supabase continua fechado;
- a fase nao autoriza migration, bootstrap novo ou refatoracao ampla de UX.

## Complemento aplicado em `LP-SERVICE-ORDER-003`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- login admin
- login operador
- logout
- patio com atendimento existente e sem quebra visual
- financeiro sem `NaN`, `undefined`, `null` ou `Invalid Date`
- documentos / relatorios sem quebra
- consulta manual de `window.__lavaprimeGetServiceOrderDiagnostics?.()` com bloco `storage`

Regras adicionais:

- o contrato de storage continua local e derivado;
- `readyForSupabaseDesign` pode ficar `true`, mas `readyForSupabaseWrite` deve permanecer `false`;
- a fase nao autoriza migration, Supabase, bootstrap novo ou refatoracao ampla de UX.

## Complemento aplicado em `LP-SERVICE-ORDER-005`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- login admin
- login operador
- logout
- documentos / recibos / relatorios sem quebra visual
- ausencia de `NaN`, `undefined`, `null` ou `Invalid Date`
- consulta manual de `window.__lavaprimeGetServiceOrderDiagnostics?.()` com `documentSourceQuality` e `shadowWrite`

Regras adicionais:

- `documentHistory` continua sendo a fonte visual principal;
- fallback por placa continua permitido apenas como fallback;
- `shadowWrite.enabled` deve permanecer `false`;
- `supabaseTouched` deve permanecer `false`;
- a fase nao autoriza migration, Supabase, bootstrap novo ou refatoracao ampla de UX.

## Complemento aplicado em `LP-SERVICE-ORDER-006`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- login admin
- login operador
- logout
- documentos / recibos / relatorios sem quebra visual
- ausencia de `NaN`, `undefined`, `null` ou `Invalid Date`
- consulta manual de `window.__lavaprimeGetServiceOrderDiagnostics?.()` com `shadowWriteAdapter`

Regras adicionais:

- o adapter de `shadow write` deve permanecer inerte;
- `shadowWriteAdapter.mode` deve permanecer `disabled`;
- `shadowWriteAdapter.canActivate` deve permanecer `false`;
- `shadowWriteAdapter.supabaseTouched` deve permanecer `false`;
- `shadowWriteAdapter.networkWriteAttempted` deve permanecer `false`;
- a fase nao autoriza migration, Supabase, bootstrap novo ou refatoracao ampla de UX.

## Complemento aplicado em `LP-SERVICE-ORDER-007`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- login admin
- login operador
- logout
- documentos / recibos / relatorios sem quebra visual
- ausencia de `NaN`, `undefined`, `null` ou `Invalid Date`
- consulta manual de `window.__lavaprimeGetServiceOrderDiagnostics?.()` com `shadowWriteRehearsal`

Regras adicionais:

- o rehearsal pode ficar `enabled`, mas apenas como ensaio tecnico;
- `shadowWrite.enabled` deve permanecer `false`;
- `shadowWriteAdapter.mode` deve permanecer `disabled`;
- `shadowWriteRehearsal.gateCanActivate` deve permanecer `false`;
- `shadowWriteRehearsal.supabaseTouched` deve permanecer `false`;
- `shadowWriteRehearsal.networkWriteAttempted` deve permanecer `false`;
- a fase nao autoriza migration, Supabase, bootstrap novo ou refatoracao ampla de UX.

## Complemento aplicado em `LP-SERVICE-ORDER-008`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- leitura documental da matriz de readiness;
- confirmacao de que nao houve alteracao de runtime;
- confirmacao de que `READY_FOR_STAGING_SHADOW_WRITE = false`;
- confirmacao de que `shadowWrite.enabled` continua `false`;
- confirmacao de que `shadowWriteAdapter.mode` continua `disabled`;
- confirmacao de que `readyForSupabaseWrite` continua `false`.

Regras adicionais:

- a fase nao autoriza `app/main.js`, Netlify, Supabase, migration, env ou push;
- readiness externa so pode ser marcada como `READY` com evidencia comprovada, nunca por inferencia;
- ausencia de URL real de staging, backend staging, migration aprovada ou `RLS` deve bloquear a liberacao.

## Complemento aplicado em `LP-SERVICE-ORDER-009`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- leitura documental da prova de `staging`;
- confirmacao de que nao houve alteracao de runtime;
- confirmacao de que `NETLIFY_STAGING_URL_PROVEN = false` enquanto nao houver URL real;
- confirmacao de que `READY_FOR_STAGING_SHADOW_WRITE = false`;
- confirmacao de que Supabase, Netlify, env e producao nao foram alterados.

Regras adicionais:

- a fase nao autoriza `app/main.js`, Netlify, Supabase, migration, env ou push;
- a existencia de `origin/staging` nao basta como prova de homologacao publicada;
- a baseline atual da trilha de `Service Order` em `staging` precisa ser comprovada antes de qualquer smoke remoto util;
- backend staging continua proibido sem projeto, migration, `RLS` e tenant isolation aprovados.

## Complemento aplicado em `LP-SERVICE-ORDER-010`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- leitura documental da prova do target `staging`;
- validacao da ausencia ou presenca de URL real;
- validacao commit a commit da baseline OS em `origin/staging`;
- se nao houver URL real, registrar `smoke remoto bloqueado`;
- confirmacao de que runtime, Supabase, Netlify, env e producao nao foram alterados.

Regras adicionais:

- a fase nao autoriza `app/main.js`, Netlify, Supabase, migration, env ou push;
- o smoke remoto so pode acontecer com URL real comprovada;
- a existencia de branch remota sem URL nao serve como evidencia de homologacao;
- a defasagem de `origin/staging` deve ser documentada sem promocao tecnica nesta etapa.

## Complemento aplicado em `LP-DEPLOY-GOV-010`

Pacote obrigatorio da fase:

- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Smoke minimo da fase:

- leitura documental do runbook manual de `staging`;
- confirmacao de que `Production branch = main` continua protegida;
- confirmacao de que `staging` foi documentada apenas como branch deploy de homologacao;
- confirmacao de que runtime, Netlify, Supabase, env e producao nao foram alterados.

Regras adicionais:

- a fase nao autoriza `app/main.js`, Netlify, Supabase, migration, env ou push;
- o usuario deve trazer URL real, branch, commit, status e horario do build antes da fase de smoke remoto;
- a baseline atual de `Service Order` fora de `origin/staging` continua bloqueio separado, nao resolvido por esta fase.
