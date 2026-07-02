# Next Slice Decision

## Objetivo

Registrar a proxima trilha oficial apos `LP-DEPLOY-GOV-003`.

## Estado atual consolidado

- os `5` clientes de `clientRegistry` continuam oficialmente classificados como massa `demo/teste`;
- a massa demo principal permanece isolada em `app/demo/lavaprimeDemoData.js`;
- `app/main.js` consome o bootstrap por meio de `app/demo/lavaprimeBootstrapMode.js`;
- `app/demo/lavaprimeCleanBootstrap.js` continua existindo como bootstrap limpo estrutural e protegido;
- `window.__lavaprimeCleanBootstrapReadiness`, `window.__lavaprimeCleanBootstrapTrialReadiness` e `window.__lavaprimeCleanBootstrapTrialExecution` continuam como diagnosticos internos somente leitura;
- `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` e `window.__lavaprimeDiagnostics?.cleanBootstrap` passam a existir como ponto oficial de leitura manual no browser;
- o runtime publica tambem um espelho tecnico somente leitura no DOM para automacao e inspecao controlada;
- `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` receberam hardening semantico minimo adicional;
- a reavaliacao do trial protegido agora compara explicitamente o estado pre-hardening com o estado atual;
- as `5` superficies antes inseguras deixaram de bloquear o trial protegido;
- `DEMO_BOOTSTRAP` continua o modo padrao;
- nenhuma remocao direta de seed foi executada;
- a confirmacao operacional mostrou que os globais de `window` ficam repetiveis no contexto de avaliacao direta da pagina;
- o espelho DOM continua sendo a evidencia mais estavel para automacao e aceite repetivel;
- o estado pre-login ainda expoe snapshot parcial e nao deve ser usado como referencia final de readiness operacional;
- os bloqueios restantes para promocao de `CLEAN_BOOTSTRAP` a default passaram a ficar consolidados em documento unico;
- os bloqueios consolidados passaram a ser transformados em pre-requisitos formais de ativacao;
- o modo limpo continua sem base suficiente para virar default, apesar da observabilidade tecnica confirmada;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.
- o encerramento documental do Primyo Transformation Program no Web fica consolidado;
- `LP-WEB-DATA-CLEANUP-013` passa a ser trilha futura independente e nao bloqueio do encerramento atual.
- a governanca de deploy, homologacao e producao para `app.lavaprime.com.br` passa a estar documentada;
- `netlify.toml`, `vite.config.js`, `.env.example` e o remote `origin` foram auditados sem alteracao;
- a branch `staging` continua ausente local e remotamente;
- o `HEAD` atual de `primyo/onboarding` passou a ser `ef0bc0e`;
- a revisao da baseline concluiu que os deltas apos `094a5b7` sao documentais e nao alteram o runtime Web;
- o historico da branch continua incluindo commits Android/APK, mas esse risco ficou classificado como risco de governance da branch, nao de snapshot Web atual;
- a preparacao documental da homologacao Netlify foi concluida sem `push`, sem deploy e sem alteracao de runtime;
- o working tree continua com arquivos fora de escopo que devem bloquear push ou deploy sem isolamento:
  - `.gitignore`
  - `app/styles.css`
  - `LavaPrimeAndroidApp/**`
  - `app/assets/data/fipe-veiculos.js`
  - `app/assets/data/fipe-veiculos.json`

## Decisao oficial

- encerramento documental do programa: `consolidado`
- proxima trilha recomendada: `LP-DEPLOY-GOV-004 - Isolate working tree and create staging branch candidate`
- demais trilhas futuras independentes:
  - `LP-DEPLOY-GOV-005 - Validate Netlify staging deployment`
  - `LP-WEB-DATA-CLEANUP-013 - Institutional clean dataset strategy`
  - `LavaPrime Android nativo oficial`
  - `Supabase/backend real`
  - `producao controlada Web`
  - `ativacao futura do CLEAN_BOOTSTRAP`
  - `funcionalidades futuras LPFR`

## Justificativa

`LP-DEPLOY-GOV-004` passa a ser a melhor proxima fase porque:

1. a baseline Web candidata ja foi revisada;
2. o `HEAD` atual `ef0bc0e` foi aceito como snapshot candidato de homologacao;
3. o bloqueio restante deixou de ser a baseline e passou a ser o working tree misturado;
4. o proximo passo seguro e isolar os arquivos fora de escopo antes de criar ou pushar `staging`;
5. a branch atual ainda nao deve ser publicada enquanto existirem sujeiras Web/Android/FIPE fora do escopo;
6. `LP-WEB-DATA-CLEANUP-013` continua importante, mas como trilha paralela de dados limpos e nao como passo obrigatorio previo ao staging.

## Fatias rejeitadas por enquanto

- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto a base limpa seguir semanticamente pobre e sem relacionamentos persistidos suficientes;
- qualquer remocao real da seed demo:
  - rejeitada antes de comprovacao de que dashboard, patio, relatorios e documentos sobrevivem sem a seed;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir bootstrap limpo validado;
- qualquer ampliacao do `shadow read`:
  - rejeitada enquanto a trilha de cleanup nao estabilizar melhor a diferenca entre ambiente demo e ambiente limpo;
- qualquer integracao de `idResolver` ao runtime:
  - continua cedo demais.
- qualquer tentativa de tratar `LP-WEB-DATA-CLEANUP-013` como obrigacao imediata para fechar o programa:
  - rejeitada, porque o encerramento documental ja esta consolidado.
- qualquer tentativa de publicar `app.lavaprime.com.br` direto de `primyo/onboarding`:
  - rejeitada, porque a estrategia aprovada exige homologacao e aprovacao previa.
- qualquer tentativa de criar ou pushar `staging` com o working tree atual:
  - rejeitada, porque os itens fora de escopo continuam misturados e podem contaminar a homologacao.

## Direcao recomendada

Para a proxima fase, `LP-DEPLOY-GOV-004` deve:

1. isolar ou limpar os itens fora de escopo do working tree;
2. criar localmente a branch de homologacao recomendada (`staging`) a partir de `ef0bc0e`;
3. pedir autorizacao antes de qualquer `push` remoto;
4. manter `main` e `app.lavaprime.com.br` protegidos de publicacao direta;
5. manter `DEMO_BOOTSTRAP` como padrao oficial;
6. continuar sem abrir Supabase runtime e sem remover a seed demo.

Para as demais trilhas:

- clean dataset institucional:
  - seguir como trilha propria para definir a futura base limpa;
- Android:
  - abrir chat proprio e manter `LavaPrimeAndroidApp/**` fora dos commits Web;
- Supabase/backend:
  - abrir trilha propria e manter claro se a fase sera documental, de persistencia ou de runtime real;
- producao controlada Web:
  - so iniciar depois de criterio operacional proprio;
- ativacao futura de `CLEAN_BOOTSTRAP`:
  - somente apos todos os pre-requisitos formais;
- funcionalidades `LPFR`:
  - tratar como backlog funcional independente.

## Resultado desta fase

- bootstrap demo e bootstrap limpo seguem segregados;
- a dependencia residual da seed demo segue mapeada por diagnosticos protegidos;
- as superficies criticas do trial agora contam com fallback semantico adicional;
- a reavaliacao, a confirmacao operacional, a consolidacao dos bloqueios e o plano de pre-requisitos nao autorizaram promocao do modo limpo;
- o encerramento documental final do programa foi consolidado em handoff proprio;
- a esteira de homologacao e producao para `app.lavaprime.com.br` passa a estar definida documentalmente;
- a homologacao Netlify passa a ter plano de preparacao documentado, mas continua sem branch `staging` criada;
- a revisao da baseline candidata confirmou que o snapshot Web atual continua seguro do ponto de vista de runtime;
- nenhuma seed foi removida;
- nenhuma tela foi quebrada;
- o modo demo continuou padrao.

## Complemento APK

- trilha Android nativa passa a operar sob governanca propria do `Programa LavaPrime APK`;
- a abertura oficial desta governanca foi registrada em `LP-APK-000`;
- a baseline funcional real do Web foi consolidada em `LP-APK-001`;
- a decisao formal de reuse da base Android atual foi consolidada em `LP-APK-002`;
- a baseline visual mobile oficial foi consolidada em `LP-APK-003`;
- os requisitos oficiais do APK foram consolidados em `LP-APK-004`;
- a proxima fase recomendada da trilha APK passa a ser `LP-APK-005 - Android Design System Foundation`.

Justificativa:

1. o Android atual foi formalizado como checkpoint tecnico parcial, nao como produto final;
2. os requisitos obrigatorios do APK agora passam a apontar para rotinas Web mapeadas, reduzindo drift funcional;
3. a base atual do Android agora ja tem classificacao oficial de `keep`, `refactor`, `replace` e `archive`, com recomendacao de rebuild controlado dentro do projeto atual;
4. a identidade visual oficial do APK agora tambem ja tem baseline formal, com separacao explicita entre linguagem do Web e marca oficial de `Material_Visual`;
5. os requisitos obrigatorios, dependencias, mapa de dados e aceite por tela agora ja estao congelados antes da primeira fase de codigo;
6. o proximo risco principal deixa de ser ausencia de fechamento de requisitos e passa a ser implementacao visual/estrutural fora da ordem aprovada;
7. a trilha APK continua separada da trilha Web principal e nao autoriza alterar `app/main.js`, `app/styles.css` ou contratos runtime.
