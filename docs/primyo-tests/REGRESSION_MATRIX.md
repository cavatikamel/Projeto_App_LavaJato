# LavaPrime Regression Matrix

## Objetivo

Relacionar cada tipo de mudanca aos fluxos minimos de validacao obrigatoria.

Esta matriz serve para reduzir subjetividade e impedir que uma fatia avance sem validar o impacto mais provavel.

## Legenda de fluxos

- `LA`: login administrador
- `LO`: login operador
- `LG`: logout
- `PA`: acesso ao patio
- `AD`: acesso administrativo
- `NV`: navegacao principal
- `CD`: cadastros principais
- `FN`: financeiro principal
- `RL`: relatorios e documentos

## Matriz

| Mudanca | LA | LO | LG | PA | AD | NV | CD | FN | RL |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| LP-WEB-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional | Opcional |
| LP-SEC-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional | Opcional |
| LP-SEC-003 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional |
| LP-DATA-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-DATA-004 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-002 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional |
| LP-TEST-002 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional | Opcional |
| LP-WEB-003 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-INTEGRATION-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional |
| LP-WEB-INTEGRATION-002 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional |
| LP-WEB-007 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-007-REVISION | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-008 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-009 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-010 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-011 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-ID-RESOLVER-002 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-ADAPTER-HELPERS-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-TEST-AUTO-003 | Opcional | Opcional | Opcional | Opcional | Opcional | Opcional | Opcional | Opcional | Opcional |
| LP-PERM-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-004 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |

## Regras de leitura

- `Obrigatorio` significa que o fluxo deve ser executado e registrado.
- `Opcional` significa que o fluxo entra quando a mudanca tocar o modulo correspondente ou gerar risco indireto relevante.
- Se houver duvida, executar o fluxo.

## Pacotes minimos recomendados

### Mudancas de sessao, perfil, permissao ou autenticacao

- `LA`
- `LO`
- `LG`
- `PA`
- `AD`
- `NV`

Quando a mudanca tocar regras de permissao, tambem devem ser avaliados os cenarios de `docs/primyo-permissions/PERMISSION_TEST_SCENARIOS.md`.

### Mudancas de dados ou financeiro

- pacote anterior
- `CD`
- `FN`
- `RL` quando houver emissao documental

### Mudancas de contratos e adapters web

- `LA`
- `LO`
- `LG`
- `PA`
- `AD`
- `NV`
- `CD`
- `FN`
- `RL`

Regra:

- mesmo quando a fatia for documental ou de adapter puro, tratar qualquer traducao entre legado e contrato como impacto potencial em todo o produto ate que exista segregacao maior por dominio.

Checklist complementar obrigatorio para futuras fases de adapter:

- validar entrada legada valida;
- validar entrada legada incompleta;
- validar campos obrigatorios ausentes;
- validar conversao para contrato;
- validar compatibilidade com `contractVersion`;
- validar ausencia de alteracao funcional no runtime.
- validar ausencia de efeitos colaterais sobre a entrada legada quando o adapter ainda nao estiver integrado ao produto.

Cobertura tecnica minima agora esperada para adapters puros:

- arquivo do adapter presente no workspace;
- exports minimos protegidos no gate quando o modulo for promovido a critico;
- importacao do adapter em Node puro;
- `node --check` do adapter;
- ausencia de integracao funcional prematura;
- compatibilidade explicita com `contractVersion`.
- envelope aderente ao padrao compartilhado com `payload`, `warnings`, `validation` e `metadata`.
- `customerAdapter` revisado tratado como baseline de regressao estrutural para os proximos adapters.
- `vehicleAdapter` tratado como segunda prova de repetibilidade do baseline estrutural dos adapters puros.
- `serviceAdapter` tratado como terceira prova de repetibilidade do baseline estrutural dos adapters puros.
- `productAdapter` tratado como quarta prova de repetibilidade do baseline estrutural dos adapters puros.
- `supplyAdapter` tratado como quinta prova de repetibilidade do baseline estrutural dos adapters puros.
- todo novo adapter puro deve ser incorporado ao Adapter Contract Gate com pelo menos uma fixture valida e uma fixture invalida antes de qualquer integracao ao runtime.
- futuras mudancas em gate, helpers comuns de adapter, resolucao de IDs ou integracao funcional devem revalidar `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` em conjunto antes de avancar.
- cenarios validos e invalidos controlados devem continuar cobrindo `organizationId`, timestamps, `sourceId`, `id` canonico, envelope, `warnings` e `missingRequiredFields`.
- o estado oficial atual do Adapter Contract Gate cobre `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` como baseline minima obrigatoria da trilha.
- `app/adapters/shared/adapterHelpers.js` passa a ser parte do baseline estrutural minimo e deve ser validado por `node --check`.
- a regressao estrutural agora tambem deve provar que os cinco adapters continuam importando o helper compartilhado sem ganhar dependencia de runtime.
- a consolidacao de helpers nao autoriza mudanca de API publica, `contractVersion`, `contractName` ou integracao funcional antecipada.
- alteracoes em `adapterHelpers.js` passam a impactar simultaneamente `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter`, exigindo revalidacao conjunta dos cinco adapters, do Adapter Gate, do Primyo Gate, do build e do verify.
- qualquer sexto adapter promovido a baseline deve entrar no Adapter Gate no mesmo slice da sua criacao, antes de qualquer integracao funcional ou abertura de Supabase.
- `app/adapters/shared/idResolver.js` passa a ser baseline tecnico da trilha de identidade cross-domain e deve ser validado por `node --check`.
- o Adapter Gate agora deve cobrir resolucao canonica valida, resolucao por `legacyRefs` aprovados, falha por identificador ausente, ambiguidade bloqueada e proibicao de resolver por nome ou placa.
- o Adapter Gate agora tambem deve cobrir `canonicalId` com entidade correta, falha por entidade errada, `legacyRefs` inexistentes, `legacyRefs` ambiguos, query vazia, indice vazio, entradas invalidas, contratos duplicados, imutabilidade das fixtures e falhas com `code` e `reason` explicitos.
- futuras mudancas em `idResolver.js` devem revalidar Adapter Gate, Primyo Gate, build e verify junto com os cinco adapters puros oficiais.

Cobertura minima esperada para futura integracao de adapter ou `idResolver` ao runtime:

- `npm.cmd run primyo:gate`;
- smoke manual do dominio tocado;
- revalidacao de `LA`, `LO`, `LG`, `PA`, `AD` e `NV`;
- console limpo no fluxo integrado;
- comparacao controlada entre dado legado ativo e contrato derivado quando a fatia estiver em modo sombra;
- proibicao de combinar primeira integracao de adapter com uso funcional de `idResolver` no mesmo slice;
- proibicao de tocar estoque, financeiro ou Supabase na primeira entrada de runtime da trilha.

Regra aplicada em `LP-WEB-INTEGRATION-001`:

- o smoke manual precisa cobrir lista de clientes preservada;
- a abertura de edicao de cliente existente precisa continuar funcional;
- a abertura de novo cliente sem salvar precisa continuar funcional;
- o patio admin e o patio operador precisam continuar acessiveis;
- o logout precisa continuar funcionando;
- o console do browser deve permanecer sem erro bloqueante.

Regra aplicada em `LP-WEB-INTEGRATION-002`:

- a edicao de cliente existente precisa continuar preenchida pelo legado;
- o diagnostico interno deve registrar cliente analisado, sucesso/falha, motivo, campos ausentes, tipo, documento, timestamp, rollback e `legacySourceActive`;
- a abertura de `Novo cliente` nao deve adicionar entrada indevida ao historico de sombra;
- o fluxo de operador deve permanecer protegido;
- o console do browser deve permanecer sem erro bloqueante.

Regra aplicada em `LP-WEB-INTEGRATION-004`:

- a lista de clientes precisa continuar preservada no caminho legado;
- a validacao legada deve ficar silenciosa para o usuario;
- o diagnostico tecnico deve registrar total analisado, compativeis estruturais, incompatibilidades reais, registros `demo/teste`, campos opcionais ausentes, bloqueios especificos de faturamento, exemplos limitados, recomendacao final e `legacySourceActive`;
- `document` nao pode bloquear cliente comum;
- `document` deve continuar bloqueando apenas cliente faturado;
- os flags `canExpandShadowReadForCommonCustomers` e `canExpandShadowReadForBilledCustomers` devem permanecer separados;
- a massa `demo/teste` nao pode ser tratada como base real pronta para Supabase;
- a validacao nao pode alterar formulario, save, permissao, UI ou shell do operador;
- o console do browser deve permanecer sem erro bloqueante;
- a expansao da sombra continua proibida nesta fatia enquanto a massa `demo/teste` nao for limpa ou isolada de forma controlada.

Regra aplicada em `LP-WEB-DATA-CLEANUP-001`:

- a extracao de seeds para modulo dedicado nao pode alterar lista de clientes, dashboard, patio, financeiro ou relatorios;
- a massa `demo/teste` deve continuar explicitamente classificada como nao real;
- nenhuma remocao direta de seed pode ocorrer sem mapa previo de vinculos;
- o smoke manual minimo deve cobrir dashboard, `Cadastros > Clientes`, patio e financeiro;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve separar bootstrap demo de bootstrap limpo antes de qualquer remocao real.

Regra aplicada em `LP-WEB-DATA-CLEANUP-002`:

- a segregacao entre bootstrap demo e bootstrap limpo nao pode mudar o modo padrao atual;
- `DEMO_BOOTSTRAP` deve continuar sustentando dashboard, `Cadastros > Clientes`, patio, financeiro e relatorios;
- `CLEAN_BOOTSTRAP` pode existir apenas como estrutura protegida e inativa por padrao;
- nenhuma seed demo pode ser removida nesta fatia;
- a validacao minima deve cobrir admin em dashboard, clientes, patio e financeiro, alem de operador no patio;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve revisar dependencias residuais antes de qualquer ativacao do bootstrap limpo.

Regra aplicada em `LP-WEB-DATA-CLEANUP-003`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode ser ativado como default nesta fatia;
- `window.__lavaprimeCleanBootstrapReadiness` deve permanecer silencioso, somente leitura e em memoria;
- o diagnostico deve mapear dashboard, clientes, veiculos, patio, financeiro, faturas, pagamentos, relatorios, documentos e vinculos cross-domain;
- nenhuma seed demo pode ser removida;
- o smoke manual minimo deve revalidar dashboard, `Cadastros > Clientes`, patio, financeiro, relatorios/documentos, logout e patio operador;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve endurecer fallback de telas criticas antes de qualquer tentativa futura com bootstrap limpo.

Regra aplicada em `LP-WEB-DATA-CLEANUP-004`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- clientes, veiculos, pagamentos, caixa e faturas devem permanecer renderizaveis com colecoes vazias;
- o runtime nao pode gerar `undefined`, `null` ou `NaN` visiveis por ausencia das colecoes criticas;
- `window.__lavaprimeCleanBootstrapReadiness` deve permanecer silencioso, somente leitura e em memoria, agora com cobertura adicional de fallback por superficie;
- nenhuma seed demo pode ser removida;
- o smoke manual minimo deve revalidar dashboard, `Cadastros > Clientes`, patio, financeiro, relatorios/documentos, logout e patio operador;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve continuar com trial protegido do bootstrap limpo, sem troca de default.

Regra aplicada em `LP-WEB-DATA-CLEANUP-005`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode ser ativado como default nesta fatia;
- `window.__lavaprimeCleanBootstrapTrialReadiness` deve permanecer silencioso, somente leitura e em memoria;
- o diagnostico de trial deve diferenciar readiness para teste protegido de readiness para promocao do modo limpo;
- nenhuma seed demo pode ser removida;
- o smoke manual minimo deve revalidar dashboard, `Cadastros > Clientes`, patio, financeiro, relatorios/documentos, logout e patio operador;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia pode executar trial protegido, mas ainda sem troca de default.

Regra aplicada em `LP-WEB-DATA-CLEANUP-006`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- o trial protegido pode apenas avaliar `CLEAN_BOOTSTRAP` em memoria;
- `CLEAN_BOOTSTRAP` nao pode ser ativado como default nem como origem funcional de runtime;
- o diagnostico de trial deve registrar superfícies que passam com fallback e superfícies ainda inseguras;
- nenhuma seed demo pode ser removida;
- o smoke manual minimo deve revalidar dashboard, `Cadastros > Clientes`, patio, financeiro, relatorios/documentos, logout e patio operador;
- a inspeção do browser deve registrar se os objetos globais tecnicos aparecem ou nao;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve atacar apenas os bloqueios semanticos remanescentes antes de qualquer nova tentativa com bootstrap limpo.

Regra aplicada em `LP-WEB-DATA-CLEANUP-007`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- o hardening semantico deve ser limitado a `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks`;
- agregacoes numericas e composicao de documentos nao podem expor `NaN`, `undefined` ou `null` visiveis quando o modo limpo estiver vazio;
- lookups cross-domain devem degradar com fallback sem quebrar o runtime;
- nenhuma seed demo pode ser removida;
- o smoke manual minimo deve revalidar dashboard, `Cadastros > Clientes`, patio, financeiro, relatorios/documentos, logout e patio operador;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve reavaliar o trial protegido com o hardening aplicado, sem promover o modo limpo a default.

Regra aplicada em `LP-WEB-DATA-CLEANUP-008`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- a reavaliacao deve comparar explicitamente o estado pre-hardening com o estado atual do trial protegido;
- o diagnostico deve registrar quais superficies melhoraram e se restou alguma superficie insegura para o trial protegido;
- `CLEAN_BOOTSTRAP` nao pode ser promovido a default mesmo quando o contador de superficies inseguras do trial cair para `0`;
- nenhuma seed demo pode ser removida;
- o smoke manual minimo deve revalidar dashboard, `Cadastros > Clientes`, patio, financeiro, relatorios/documentos, logout e patio operador;
- a inspecao do browser deve confirmar que `DEMO_BOOTSTRAP` continua o comportamento observado padrao;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve priorizar observabilidade do trial antes de qualquer conversa sobre promocao do modo limpo.

Regra aplicada em `LP-WEB-DATA-CLEANUP-009`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode ser ativado como default;
- a observabilidade tecnica deve permanecer somente leitura e sem UI nova;
- a leitura manual via `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` e `window.__lavaprimeDiagnostics?.cleanBootstrap` deve continuar disponivel;
- a automacao deve conseguir validar o estado tecnico pelo espelho no DOM sem depender de persistencia, Supabase ou telemetria externa;
- nenhuma seed demo pode ser removida;
- o smoke manual minimo deve revalidar dashboard, `Cadastros > Clientes`, patio, financeiro, relatorios/documentos, logout e patio operador;
- a consulta tecnica no browser deve registrar modo ativo, modo padrao, status do trial e disponibilidade dos diagnosticos;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve confirmar repetibilidade do metodo novo antes de qualquer conversa sobre promocao do modo limpo.

Regra aplicada em `LP-WEB-DATA-CLEANUP-010`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode ser ativado como default;
- a confirmacao precisa revalidar tanto `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` quanto `window.__lavaprimeDiagnostics?.cleanBootstrap`;
- o espelho tecnico no DOM deve continuar legivel por `dataset` e por `#lavaprime-clean-bootstrap-diagnostics`;
- o estado pre-login pode exibir snapshot parcial, mas o estado operacional final precisa convergir para `unsafeSurfaceCount=0` e `improvedSurfaceCount=5`;
- nenhuma seed demo pode ser removida;
- o smoke manual minimo deve revalidar dashboard, `Cadastros > Clientes`, patio, financeiro, relatorios/documentos, logout e patio operador;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve consolidar os bloqueios remanescentes para promocao de `CLEAN_BOOTSTRAP` a default.

Regra aplicada em `LP-WEB-DATA-CLEANUP-011`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode ser ativado como default;
- a consolidacao deve separar bloqueios ja mitigados de observabilidade/hardening dos bloqueios ainda abertos de dados limpos e relacionamentos persistidos;
- a trilha deve registrar explicitamente dependencia da seed demo para demonstracao comercial e smoke funcional;
- nenhuma seed demo pode ser removida;
- o smoke reduzido deve confirmar abertura do app, login admin, dashboard, patio, documentos/relatorios, logout e patio operador;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve transformar os bloqueios consolidados em prerequisitos formais de ativacao gradual.

Regra aplicada em `LP-WEB-DATA-CLEANUP-012`:

- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode ser ativado como default;
- os pre-requisitos de ativacao futura devem ficar agrupados por dados, relacionamentos, smoke, dashboards, documentos, seed demo, governance e rollback;
- a fase deve deixar claros os criterios de aceite e de bloqueio antes de qualquer ativacao futura;
- nenhuma seed demo pode ser removida;
- o smoke reduzido deve confirmar abertura do app, login admin, dashboard, patio, documentos/relatorios, logout e patio operador;
- o console do browser deve permanecer sem erro bloqueante;
- a proxima fatia deve definir a estrategia da base limpa futura sem abrir Supabase e sem trocar o bootstrap padrao.

Regra aplicada em `LP-DOC-FINAL-001`:

- a fase deve permanecer somente documental;
- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode virar `default`;
- nenhuma seed demo pode ser removida;
- Supabase deve continuar fechado;
- o handoff final precisa registrar working tree fora de escopo, status tecnico, trilhas futuras independentes e rollback geral;
- o pacote oficial `node --check`, Adapter Gate, `primyo:gate`, `build` e `verify:build` continua obrigatorio;
- o smoke reduzido deve confirmar app, dashboard, patio, documentos/relatorios, logout e patio operador;
- `LP-WEB-DATA-CLEANUP-013` deve permanecer registrada como trilha futura, nao como bloqueio de encerramento.

Regra aplicada em `LP-DEPLOY-GOV-001`:

- a fase deve permanecer documental e de auditoria;
- nenhuma alteracao de runtime, Netlify, DNS, Supabase ou producao pode ocorrer;
- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode virar `default`;
- a governanca de branches deve distinguir `main`, `staging` e `primyo/onboarding`;
- a validacao local continua exigindo `node --check`, Adapter Gate, `primyo:gate`, `build` e `verify:build`;
- o smoke reduzido continua obrigatorio antes de qualquer fase futura de publish;
- arquivos fora de escopo no working tree devem bloquear push ou deploy sem isolamento seletivo.

Regra aplicada em `LP-DEPLOY-GOV-002`:

- a fase deve permanecer documental e de auditoria;
- a ausencia atual de `staging` local e remota deve ser tratada como bloqueio de homologacao pronta;
- a baseline Web para futura `staging` deve ser revisada antes de qualquer `push` ou branch deploy;
- nenhuma alteracao de runtime, Netlify, DNS, Supabase ou producao pode ocorrer;
- `DEMO_BOOTSTRAP` deve continuar como modo padrao oficial;
- `CLEAN_BOOTSTRAP` nao pode virar `default`;
- o pacote oficial de validacao permanece `git`, `node --check`, Adapter Gate, `primyo:gate`, `build` e `verify:build`;
- o smoke reduzido continua obrigatorio antes de qualquer fase futura de publicacao em homologacao;
- arquivos fora de escopo no working tree devem continuar bloqueando push ou deploy sem isolamento seletivo.

Regra aplicada em `LP-DEPLOY-GOV-003`:

- a fase deve permanecer documental e de auditoria;
- a revisao da baseline deve distinguir risco de historico Android/APK de risco do snapshot Web atual;
- o `HEAD` atual pode ser aceito como candidato apenas se os deltas apos o ultimo fechamento Web forem documentais;
- nenhuma criacao de branch, `checkout`, `push` ou deploy pode ocorrer;
- o pacote oficial de validacao permanece `git`, `node --check`, Adapter Gate, `primyo:gate`, `build` e `verify:build`;
- o smoke reduzido continua obrigatorio quando o ambiente de browser estiver disponivel;
- working tree com `.gitignore`, `app/styles.css`, `LavaPrimeAndroidApp/**` ou `app/assets/data/fipe-veiculos.*` continua bloqueando criacao/push seguro da futura `staging`.

Regra aplicada em `LP-DEPLOY-GOV-004`:

- a fase deve permanecer documental e de auditoria;
- o working tree deve ser classificado por item, sem limpeza destrutiva;
- nenhuma criacao de branch, `restore`, `clean`, `stash`, `push` ou deploy pode ocorrer;
- o plano de isolamento deve separar pelo menos Git governance, Web visual, FIPE/dados e Android/APK;
- a baseline Web recomendada para futura `staging` deve ser reavaliada quando o `HEAD` atual carregar commits fora da trilha Web revisada;
- o pacote oficial de validacao permanece `git`, `node --check`, Adapter Gate, `primyo:gate`, `build` e `verify:build`;
- o smoke reduzido pode herdar a ultima evidencia valida quando nao houver mudanca de runtime e o browser nao estiver disponivel;
- working tree com `.gitignore`, `app/styles.css`, `LavaPrimeAndroidApp/**` ou `app/assets/data/fipe-veiculos.*` continua bloqueando criacao/push seguro da futura `staging`.

Observacao para `LP-TEST-AUTO-003`:

- por ser uma fase de gate e documentacao, os fluxos funcionais ficam `Opcional` na matriz;
- ainda assim, a validacao tecnica do pacote da fase continua obrigatoria.

### Mudancas de navegacao ou modularizacao web

- `LA`
- `LO`
- `LG`
- `PA`
- `AD`
- `NV`
- `CD` quando a area tocada envolver cadastro

## Uso operacional

Antes de iniciar qualquer mudanca:

1. identificar o backlog ID;
2. localizar a linha correspondente nesta matriz;
3. transformar os fluxos `Obrigatorio` no checklist da execucao;
4. registrar resultado no `TEST_EXECUTION_TEMPLATE.md`.
