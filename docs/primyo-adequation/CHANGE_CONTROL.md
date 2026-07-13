# LavaPrime Change Control

## Objetivo

Estabelecer a regra oficial de controle de mudancas do LavaPrime a partir da fase de adequacao.

Nenhuma mudanca futura devera ser iniciada sem rastreabilidade entre:

- backlog aprovado;
- objetivo da mudanca;
- arquivos afetados;
- risco assumido;
- plano de teste;
- plano de rollback;
- resultado da validacao.

## 1. Regras obrigatorias

- Toda mudanca deve estar vinculada a um item de `ADEQUATION_BACKLOG.md`.
- Toda mudanca deve ter escopo pequeno e reversivel.
- Uma mudanca nao pode misturar backlog IDs nao relacionados sem aprovacao formal.
- Mudancas em autenticacao, permissao, banco, financeiro ou Android exigem aprovacao tecnica explicita antes da implementacao.
- Nao e permitido corrigir "aproveitando a janela" sem registrar novo item de backlog.
- Nao e permitido publicar mudanca sem baseline antes e depois.
- Toda mudanca web deve registrar evidencia de `npm.cmd run primyo:gate`.

## 2. Registro minimo obrigatorio por mudanca

Toda proposta futura devera registrar, no minimo:

- `Change ID`
- `Backlog ID`
- `Titulo`
- `Objetivo`
- `Motivo da mudanca`
- `Arquivos afetados`
- `Area afetada`
- `Risco`
- `Dependencias`
- `Plano de implementacao`
- `Plano de teste`
- `Plano de rollback`
- `Resultado da validacao`
- `Resultado de npm.cmd run primyo:gate`
- `Aprovador tecnico`
- `Data`

## 3. Template oficial de registro

```md
# Change Record

- Change ID:
- Backlog ID:
- Titulo:
- Objetivo:
- Motivo da mudanca:
- Area afetada:
- Arquivos afetados:
- Risco:
- Dependencias:
- Responsavel:
- Aprovador tecnico:
- Data:

## Escopo

## Fora de escopo

## Plano de implementacao

## Plano de teste

## Plano de rollback

## Resultado da validacao

## Evidencias anexadas

## Resultado de npm.cmd run primyo:gate

## Atualizacao LP-SERVICE-ORDER-004

- `Change ID`: `LP-SERVICE-ORDER-004`
- `Backlog ID`: `Service Order progressive read adoption`
- `Area afetada`: `service orders`, `documents`, `diagnostics`
- `Arquivos afetados`: `app/main.js` e documentacao `docs/primyo-service-orders/**`
- `Risco`: medio controlado, porque a fonte visual principal de documentos nao foi trocada
- `Plano de rollback`: `git revert <hash-do-commit-da-fase>`

## Decisao final
```

## 4. Niveis de risco

- `Baixo`: mudanca localizada, com rollback simples e sem impacto em dados ou acesso.
- `Medio`: muda comportamento interno de fluxo conhecido, mas com cobertura de validacao suficiente.
- `Alto`: toca autenticacao, permissao, financeiro, persistencia ou integracao relevante.
- `Critico`: pode afetar acesso, dados, publicacao, sincronizacao ou multiplas superficies simultaneamente.

## 5. Exigencia por nivel de risco

- `Baixo`: baseline minima e rollback simples.
- `Medio`: baseline minima, checklist manual completo e revisao tecnica.
- `Alto`: baseline reforcada, rollback detalhado, aprovacao tecnica explicita e evidencias antes/depois.
- `Critico`: aprovacao tecnica previa, fase dedicada, rollback testavel, janela controlada e criterio de abortar mudanca definido antes de iniciar.

## 6. Criticos que exigem controle reforcado

As categorias abaixo sempre entram como `Alto` ou `Critico`:

- autenticacao;
- sessao;
- permissao;
- faturamento;
- persistencia de dados;
- integracao backend;
- sincronizacao Android;
- configuracao de publicacao.

## 7. Resultado da validacao

Ao final de cada mudanca futura, o resultado devera ser classificado como:

- `Aprovado`
- `Aprovado com ressalva`
- `Bloqueado`
- `Revertido`

Toda classificacao diferente de `Aprovado` deve explicar:

- qual evidencia falhou;
- qual risco permaneceu aberto;
- qual decisao operacional foi tomada.

## 8. Criterio de encerramento

Uma mudanca so pode ser encerrada quando:

- o backlog ID estiver atendido;
- os arquivos alterados estiverem registrados;
- o plano de teste tiver sido executado;
- o rollback estiver atualizado;
- `npm.cmd run primyo:gate` tiver sido executado e registrado para mudancas web;
- a documentacao impactada tiver sido revisada;
- a decisao final estiver assinada pelo aprovador tecnico.

## 9. Gate tecnico oficial

Desde `LP-TEST-AUTO-001`, o gate tecnico oficial minimo do LavaPrime Web e:

```text
npm.cmd run primyo:gate
```

Esse comando deve ser tratado como evidencia obrigatoria em novas mudancas web.

Os comandos individuais de build, verify e `node --check` continuam validos para diagnostico, mas o encerramento formal deve registrar o resultado do gate oficial.

## 10. Encerramentos registrados

### LP-WEB-001

- Change record: `docs/primyo-changes/LP-WEB-001.md`
- Closure: `docs/primyo-changes/LP-WEB-001-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: a `sessionBoundary` foi aceita e incorporada a baseline, mantendo convivencia controlada com variaveis legadas do monolito.

### LP-SEC-001

- Change record: `docs/primyo-changes/LP-SEC-001.md`
- Closure: `docs/primyo-changes/LP-SEC-001-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: a `accessBoundary` foi aceita e incorporada a baseline, mas a autorizacao real e a matriz formal de acesso seguem pendentes.

### LP-WEB-004

- Change record: `docs/primyo-changes/LP-WEB-004.md`
- Closure: `docs/primyo-changes/LP-WEB-004-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `sessionBoundary` e `accessBoundary` foram extraidas para `app/boundaries/sessionAccessBoundary.js`, preservando instanciacao e compatibilidade no `app/main.js`.

### LP-TEST-AUTO-001

- Change record: `docs/primyo-tests/automation/LP-TEST-AUTO-001.md`
- Closure: `docs/primyo-changes/LP-TEST-AUTO-001-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `npm.cmd run primyo:gate` foi adotado como validacao tecnica oficial minima para mudancas futuras no LavaPrime Web, sem instalar dependencias e sem substituir smoke manual.

### LP-WEB-005

- Change record: `docs/primyo-changes/LP-WEB-005.md`
- Closure: `docs/primyo-changes/LP-WEB-005-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: helpers puros de texto e formatacao foram extraidos para `app/utils/textFormatters.js`, preservando chamadas em `app/main.js`, sem alterar storage, Supabase, banco, Android, CSS, layout ou dependencias.

### LP-WEB-006

- Change record: `docs/primyo-changes/LP-WEB-006.md`
- Closure: `docs/primyo-changes/LP-WEB-006-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: a `storageBoundary` foi criada em `app/storage/storageBoundary.js`, absorvendo apenas as 2 chamadas diretas simples de `localStorage` ja centralizadas no monolito, sem migrar novos call sites de dominio e sem alterar Supabase, banco, Android, CSS, layout ou dependencias.

### LP-WEB-003

- Change record: `fase documental sem adapter JS`
- Closure: `docs/primyo-changes/LP-WEB-003-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: a estrategia oficial de adapters do web foi absorvida na baseline sem alterar runtime, e a proxima fatia recomendada passa a ser `LP-WEB-007` com `customerAdapter` como primeira implementacao controlada.
- Observacao operacional: a validacao registrou lock transitorio em `dist/assets/checklist-icons` no primeiro `npm.cmd run primyo:gate`; a reexecucao concluiu com sucesso e o evento ficou documentado no closure.

### LP-WEB-007

- Change record: `docs/primyo-changes/LP-WEB-007.md`
- Closure: `docs/primyo-changes/LP-WEB-007-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: `customerAdapter` foi aceito como primeiro adapter puro oficial do web, com gate atualizado e sem qualquer integracao a `app/main.js` ou ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar o adapter antes da consolidacao de identidade, envelope e `legacyRefs`.

### LP-DATA-005

- Change record: `fase documental de padronizacao transversal`
- Closure: `encerramento absorvido em backlog, next slice e contratos compartilhados`
- Resultado: `Aceito`
- Observacao principal: foram formalizadas as regras compartilhadas de identidade, envelope, contexto de adapter, `legacyRefs`, status, timestamps e compatibilidade, sem alterar runtime, adapter JS existente ou qualquer comportamento funcional.
- Observacao de risco: a proxima fatia recomendada deve revisar `customerAdapter` para aderir plenamente ao padrao comum antes da criacao de um segundo adapter ou de qualquer integracao ao runtime.

### LP-WEB-007-REVISION

- Change record: `docs/primyo-changes/LP-WEB-007-REVISION.md`
- Closure: `docs/primyo-changes/LP-WEB-007-REVISION-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `customerAdapter` foi alinhado ao baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status e timestamps, preservando pureza, API publica e ausencia de integracao ao runtime.
- Observacao de risco: a proxima fatia deve criar `vehicleAdapter` sob o mesmo baseline e nao integrar `customerAdapter` ao runtime antes de mais maturidade da trilha.

### LP-WEB-008

- Change record: `docs/primyo-changes/LP-WEB-008.md`
- Closure: `docs/primyo-changes/LP-WEB-008-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `vehicleAdapter` foi aceito como segundo adapter puro oficial do web, aderente ao baseline compartilhado e sem qualquer integracao a `app/main.js` ou ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar adapters ainda; a prioridade recomendada passa a ser reforcar gate e regressao estrutural da trilha em `LP-TEST-AUTO-003`.

### LP-TEST-AUTO-003

- Change record: `docs/primyo-tests/automation/LP-TEST-AUTO-003.md`
- Closure: `docs/primyo-changes/LP-TEST-AUTO-003-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `scripts/primyo-adapter-gate.mjs` foi incorporado oficialmente ao `primyo:gate`, protegendo `customerAdapter` e `vehicleAdapter` com cenarios validos e invalidos, envelope, `validation`, `warnings`, contexto e separacao entre `id` e `sourceId`.
- Observacao de risco: a proxima fatia deve permanecer fora do runtime e fora de Supabase; a prioridade recomendada passa a ser `LP-WEB-009` antes de helpers comuns ou integracao funcional.

### LP-WEB-009

- Change record: `docs/primyo-changes/LP-WEB-009.md`
- Closure: `docs/primyo-changes/LP-WEB-009-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `serviceAdapter` foi aceito como terceiro adapter puro oficial do web, aderente ao baseline compartilhado e com o Adapter Contract Gate ampliado para tres adapters, sem qualquer integracao a `app/main.js` ou ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar adapters nem abrir Supabase; a prioridade recomendada passa a ser `LP-WEB-ADAPTER-HELPERS-001` para consolidar helper comum minimo antes do quarto adapter.

### LP-WEB-ADAPTER-HELPERS-001

- Change record: `docs/primyo-changes/LP-WEB-ADAPTER-HELPERS-001.md`
- Closure: `docs/primyo-changes/LP-WEB-ADAPTER-HELPERS-001-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `app/adapters/shared/adapterHelpers.js` foi aceito como camada compartilhada minima oficial da trilha de adapters, com `customerAdapter`, `vehicleAdapter` e `serviceAdapter` refatorados sem mudanca de API publica e sem qualquer integracao a `app/main.js` ou ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar adapters nem abrir Supabase; a prioridade recomendada passa a ser `LP-WEB-010` com `productAdapter` como quarto adapter puro oficial, aproveitando o helper comum ja consolidado.

### LP-WEB-010

- Change record: `docs/primyo-changes/LP-WEB-010.md`
- Closure: `docs/primyo-changes/LP-WEB-010-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `productAdapter` foi aceito como quarto adapter puro oficial do web, aderente ao baseline compartilhado e com o Adapter Contract Gate ampliado para quatro adapters, sem qualquer integracao a `app/main.js`, ao runtime ou ao estoque real.
- Observacao de risco: a proxima fatia nao deve integrar adapters nem abrir Supabase; a prioridade recomendada passa a ser `LP-WEB-011` com `supplyAdapter` como proximo adapter puro oficial, preservando a diferenca entre produto vendavel, insumo tecnico e movimento de estoque.

### LP-DOC-EXEC-001

- Change record: `docs/primyo-changes/LP-DOC-EXEC-001.md`
- Closure: `fase documental sem closure separado`
- Resultado: `Aceito`
- Observacao principal: o Primyo Lean Mode foi consolidado em documentos locais para reduzir repeticao de regras nos proximos prompts sem perder gate, rollback, rastreabilidade, controle de escopo ou proibicao de push sem autorizacao.
- Observacao de risco: prompts curtos continuam exigindo objetivo, escopo, validacoes e criterio de aceite; Lean Mode reduz repeticao, mas nao autoriza atalho perigoso nem integracao funcional prematura.

### LP-WEB-011

- Change record: `docs/primyo-changes/LP-WEB-011.md`
- Closure: `docs/primyo-changes/LP-WEB-011-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `supplyAdapter` foi aceito como quinto adapter puro oficial do web, aderente ao baseline compartilhado e com o Adapter Contract Gate ampliado para cinco adapters, sem qualquer integracao a `app/main.js`, ao runtime, ao estoque real ou ao Supabase.
- Observacao de risco: a proxima fatia nao deve integrar adapters nem abrir Supabase; a prioridade recomendada passa a ser `LP-DATA-006` para formalizar resolver de IDs, ownership cross-domain e relacoes entre produto, insumo e servico antes de qualquer integracao funcional.

### LP-DOC-HANDOFF-001

- Change record: `docs/primyo-changes/LP-DOC-HANDOFF-001.md`
- Closure: `docs/primyo-changes/LP-DOC-HANDOFF-001-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: o handoff seguro do Codex foi consolidado em documentos locais para permitir compactacao do chat sem perda do contexto critico da trilha Primyo, preservando branch esperada, commits relevantes, fora de escopo persistente e checklist de retomada.
- Observacao de risco: o handoff precisa ser atualizado sempre que uma nova fase for concluida; a proxima fatia tecnica continua sendo `LP-DATA-006`, sem integracao de adapters ao runtime e sem abertura de Supabase.

### LP-DATA-006

- Change record: `docs/primyo-changes/LP-DATA-006.md`
- Closure: `fase documental absorvida no proprio change record e nos documentos de dados`
- Resultado: `Aceito`
- Observacao principal: a fronteira oficial entre `Product`, `Supply`, `StockMovement` e consumo por servico foi documentada sem alterar runtime, adapters, scripts, estoque real ou Supabase.
- Observacao de risco: a proxima fatia nao deve integrar adapters ao runtime nem abrir Supabase; a prioridade recomendada passa a ser `LP-WEB-ID-RESOLVER-001` para consolidar identidade e ownership cross-domain antes de qualquer integracao funcional.

### LP-WEB-ID-RESOLVER-001

- Change record: `docs/primyo-changes/LP-WEB-ID-RESOLVER-001.md`
- Closure: `fase documental absorvida no proprio change record e nos documentos de id-resolution`
- Resultado: `Aceito`
- Observacao principal: a estrategia oficial da futura camada de resolucao de IDs foi documentada sem alterar runtime, adapters, scripts, `app/main.js` ou Supabase.
- Observacao de risco: a proxima fatia nao deve integrar o resolvedor ao runtime; a prioridade recomendada passa a ser `LP-WEB-ID-RESOLVER-002` como implementacao pura, pequena e reversivel.

### LP-WEB-ID-RESOLVER-002

- Change record: `docs/primyo-changes/LP-WEB-ID-RESOLVER-002.md`
- Closure: `docs/primyo-changes/LP-WEB-ID-RESOLVER-002-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `app/adapters/shared/idResolver.js` foi criado como modulo puro e reversivel para resolucao de IDs canonicos e `legacyRefs`, com gate ampliado e sem qualquer integracao ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar o resolvedor ao runtime nem abrir Supabase; a prioridade recomendada passa a ser `LP-TEST-AUTO-004` para reforcar a automacao antes de qualquer integracao funcional.

### LP-TEST-AUTO-004

- Change record: `docs/primyo-changes/LP-TEST-AUTO-004.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: o Adapter Gate foi reforcado para ampliar a regressao automatica do `idResolver`, cobrindo entidade correta, entidade errada, `legacyRefs` inexistentes/ambiguos, query vazia, query por `name`, query por `plate`, contrato sem `id` explicito, contratos duplicados, entradas invalidas, indice vazio e imutabilidade das fixtures.
- Observacao de risco: a proxima fatia nao deve integrar o resolvedor ao runtime nem abrir Supabase; a prioridade recomendada passa a ser `LP-TEST-AUTO-004-CLOSURE` para absorver formalmente a nova baseline antes de qualquer uso funcional.

### LP-WEB-INTEGRATION-READINESS-001

- Change record: `docs/primyo-changes/LP-WEB-INTEGRATION-READINESS-001.md`
- Closure: `fase documental absorvida nos documentos de readiness`
- Resultado: `Aceito`
- Observacao principal: a readiness de runtime para adapters e `idResolver` foi documentada sem alterar `app/main.js`, adapters, `idResolver`, scripts ou qualquer comportamento funcional.
- Observacao de risco: a primeira integracao recomendada passa a ser um slice pequeno de leitura/sombra com `customerAdapter`; `idResolver`, estoque, financeiro e Supabase continuam fora do primeiro uso em runtime.

### LP-WEB-INTEGRATION-001

- Change record: `docs/primyo-changes/LP-WEB-INTEGRATION-001.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: `customerAdapter` foi integrado em `app/main.js` apenas em shadow read, restrito a edicao de cliente existente, com legado mantido como fonte ativa de renderizacao e salvamento.
- Observacao de risco: a proxima fatia deve ser `LP-WEB-INTEGRATION-001-CLOSURE`; `idResolver`, escrita via adapter, veiculo, servico, produto, insumo, estoque, financeiro e Supabase continuam fora desta primeira entrada de runtime.

### LP-WEB-INTEGRATION-002

- Change record: `docs/primyo-changes/LP-WEB-INTEGRATION-002.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: o `customerAdapter` continua apenas em shadow read, mas o runtime agora passa a registrar diagnostico interno mais rico e historico curto em memoria para o fluxo de edicao de cliente existente.
- Observacao de risco: a proxima fatia deve ser `LP-WEB-INTEGRATION-002-CLOSURE`; o diagnostico segue silencioso para o usuario, o legado continua fonte ativa e `idResolver`, escrita via adapter, outros dominios e Supabase continuam fora do runtime.

### LP-WEB-INTEGRATION-003

- Change record: `docs/primyo-changes/LP-WEB-INTEGRATION-003.md`
- Closure: `fase documental absorvida no proprio change record e em CUSTOMER_SHADOW_READ_COVERAGE_REVIEW.md`
- Resultado: `Aceito`
- Observacao principal: a cobertura atual do `Customer Adapter Shadow Read` foi revisada sem alterar `app/main.js`, e a ordem segura passa a exigir uma microfase de validacao dos dados legados antes de qualquer ampliacao de sombra.
- Observacao de risco: lista de clientes, `Novo cliente`, salvamento, `idResolver`, outros dominios e Supabase continuam fora da proxima ampliacao; a prioridade recomendada passa a ser `LP-WEB-INTEGRATION-004`.

### LP-WEB-INTEGRATION-004

- Change record: `docs/primyo-changes/LP-WEB-INTEGRATION-004.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: a validacao silenciosa da base legada de clientes foi ajustada para refletir a regra oficial do negocio, com `document` opcional para cliente comum, obrigatorio apenas para cliente faturado e classificacao explicita dos `5` registros atuais como massa `demo/teste`.
- Observacao de risco: os seeds continuam ligados a faturamento, veiculos, patio, pagamentos, dashboard e relatorios, entao nenhuma remocao foi executada nesta fase; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-001` para limpeza controlada antes de Supabase.

### LP-WEB-DATA-CLEANUP-001

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-001.md`
- Closure: `fase absorvida no proprio change record e em DEMO_DATA_CLEANUP_PLAN.md`
- Resultado: `Implementado`
- Observacao principal: a massa central `demo/teste` de clientes, veiculos, patio, faturamento, itens de fatura e pagamentos foi isolada de `app/main.js` para `app/demo/lavaprimeDemoData.js`, sem remocao direta de seed e sem alterar comportamento visual ou funcional.
- Observacao de risco: dashboard, clientes, patio, financeiro e relatorios ainda dependem desses seeds; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-002` para separar bootstrap demo de bootstrap limpo antes de qualquer remocao real ou abertura de Supabase.

### LP-WEB-DATA-CLEANUP-002

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-002.md`
- Closure: `fase absorvida no proprio change record e em DEMO_DATA_CLEANUP_PLAN.md`
- Resultado: `Implementado`
- Observacao principal: o runtime passou a consumir a massa demo por meio de `app/demo/lavaprimeBootstrapMode.js`, com `app/demo/lavaprimeCleanBootstrap.js` preparado como bootstrap limpo estrutural e protegido, sem mudar o comportamento padrao do produto.
- Observacao de risco: dashboard, clientes, patio, financeiro e relatorios ainda dependem da seed demo; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-003` para revisar dependencias residuais antes de qualquer ativacao do bootstrap limpo.

### LP-WEB-DATA-CLEANUP-003

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-003.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: o runtime passou a publicar `window.__lavaprimeCleanBootstrapReadiness` apenas como diagnostico protegido em memoria, confirmando que dashboard, clientes, veiculos, patio, financeiro, faturas, pagamentos, relatorios e documentos ainda dependem da seed demo.
- Observacao de risco: `CLEAN_BOOTSTRAP` continua inseguro como modo padrao e nenhuma seed foi removida; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-004` para endurecer fallback das superficies criticas antes de qualquer teste futuro com bootstrap limpo.

### LP-WEB-DATA-CLEANUP-004

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-004.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: fallbacks estruturais minimos foram endurecidos em `app/main.js` para clientes, veiculos, pagamentos em aberto, caixa e faturas, enquanto o readiness protegido passou a registrar cobertura adicional por superficie critica.
- Observacao de risco: `DEMO_BOOTSTRAP` continua o unico modo padrao seguro, nenhuma seed foi removida e os vinculos cross-domain ainda bloqueiam qualquer tentativa agressiva com `CLEAN_BOOTSTRAP`; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-005`.

### LP-WEB-DATA-CLEANUP-005

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-005.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: `window.__lavaprimeCleanBootstrapTrialReadiness` foi preparado como mecanismo protegido para trial futuro, distinguindo readiness para teste controlado de readiness para promocao de `CLEAN_BOOTSTRAP` a default.
- Observacao de risco: o trial ainda nao foi executado, nenhuma seed foi removida e os vinculos cross-domain seguem bloqueando qualquer promocao do modo limpo; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-006`.

### LP-WEB-DATA-CLEANUP-006

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-006.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: `window.__lavaprimeCleanBootstrapTrialExecution` foi adicionado para executar o trial protegido apenas como diagnostico tecnico em memoria, mantendo `DEMO_BOOTSTRAP` como default e `CLEAN_BOOTSTRAP` fora do runtime funcional.
- Observacao de risco: `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` continuam bloqueando qualquer promocao do modo limpo, e a inspecao visual do browser segue sem expor os objetos globais tecnicos; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-007`.

### LP-WEB-DATA-CLEANUP-007

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-007.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: o runtime recebeu hardening semantico minimo para `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks`, reduzindo o risco de `NaN`, contexto ausente e lookup cruzado quebrado durante o trial protegido.
- Observacao de risco: `CLEAN_BOOTSTRAP` continua improprio para virar default porque a base limpa permanece sem volume e sem relacionamentos persistidos suficientes; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-008`.

### LP-WEB-DATA-CLEANUP-008

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-008.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: a reavaliacao do trial protegido registrou comparacao explicita entre o estado pre-hardening e o estado atual, e as `5` superficies antes inseguras deixaram de bloquear o diagnostico protegido do `CLEAN_BOOTSTRAP`.
- Observacao de risco: a promocao de `CLEAN_BOOTSTRAP` para modo padrao continua bloqueada por falta de volume limpo, relacionamentos persistidos e observabilidade suficiente no browser; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-009`.

### LP-WEB-DATA-CLEANUP-009

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-009.md`
- Closure: `pendente`
- Resultado: `Implementado`
- Observacao principal: a observabilidade tecnica do trial protegido passou a ter leitura oficial via `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` e `window.__lavaprimeDiagnostics?.cleanBootstrap`, com espelho somente leitura no DOM para automacao e inspecoes mais confiaveis.
- Observacao de risco: a promocao de `CLEAN_BOOTSTRAP` continua bloqueada por falta de volume limpo, relacionamentos persistidos e readiness operacional; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-010`.

### LP-WEB-DATA-CLEANUP-010

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-010.md`
- Closure: `fase absorvida no proprio change record e em CLEAN_BOOTSTRAP_DIAGNOSTICS_CONFIRMATION.md`
- Resultado: `Implementado`
- Observacao principal: a confirmacao repetiu com sucesso a leitura tecnica por `window.__lavaprimeGetCleanBootstrapDiagnostics?.()`, `window.__lavaprimeDiagnostics?.cleanBootstrap`, `document.documentElement.dataset.*` e `#lavaprime-clean-bootstrap-diagnostics`, mantendo `DEMO_BOOTSTRAP` como padrao e `CLEAN_BOOTSTRAP` apenas como diagnostico protegido.
- Observacao de risco: o estado pre-login ainda mostra snapshot parcial e a promocao de `CLEAN_BOOTSTRAP` continua bloqueada por falta de base limpa e relacionamentos persistidos; a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-011`.

### LP-WEB-DATA-CLEANUP-011

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-011.md`
- Closure: `fase absorvida no proprio change record e em CLEAN_BOOTSTRAP_DEFAULT_BLOCKERS.md`
- Resultado: `Implementado`
- Observacao principal: a fase consolidou em documento unico os bloqueios remanescentes para promocao de `CLEAN_BOOTSTRAP` a default, separando gargalos ja mitigados de observabilidade e hardening dos gargalos ainda abertos de dados limpos, relacionamentos persistidos e readiness operacional.
- Observacao de risco: a promocao do modo limpo continua bloqueada e a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-012`, focada em prerequisitos formais de ativacao gradual.

### LP-WEB-DATA-CLEANUP-012

- Change record: `docs/primyo-changes/LP-WEB-DATA-CLEANUP-012.md`
- Closure: `fase absorvida no proprio change record e em CLEAN_BOOTSTRAP_ACTIVATION_PREREQUISITES.md`
- Resultado: `Implementado`
- Observacao principal: a fase transformou os bloqueios consolidados em pre-requisitos formais, com criterios de aceite, criterios de bloqueio, sequencia futura e rollback antes de qualquer conversa sobre ativacao de `CLEAN_BOOTSTRAP`.
- Observacao de risco: a definicao da base limpa futura continua em aberto e a prioridade recomendada passa a ser `LP-WEB-DATA-CLEANUP-013`, focada na estrategia da base institucional/controlada que sustentara essa ativacao.

### LP-DOC-FINAL-001

- Change record: `docs/primyo-changes/LP-DOC-FINAL-001.md`
- Closure: `docs/primyo-changes/LP-DOC-FINAL-001-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a fase consolida o encerramento documental do Primyo Transformation Program no LavaPrime Web, atualiza o handoff final e separa oficialmente as proximas trilhas independentes.
- Observacao de risco: `LP-WEB-DATA-CLEANUP-013` continua recomendada como trilha futura, mas deixa de ser bloqueio para o encerramento documental do programa.

### LP-DEPLOY-GOV-001

- Change record: `docs/primyo-changes/LP-DEPLOY-GOV-001.md`
- Closure: `docs/primyo-changes/LP-DEPLOY-GOV-001-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a fase define a governanca de repositório, homologacao, producao, Netlify e ambientes Supabase sem executar push, deploy ou alteracao de runtime.
- Observacao de risco: a publicacao oficial continua bloqueada ate existir fase propria de staging, com isolamento dos arquivos fora de escopo e aprovacao formal do usuario.

### LP-ANDROID-001

- Change record: `docs/primyo-changes/LP-ANDROID-001.md`
- Closure: `docs/primyo-changes/LP-ANDROID-001-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: a baseline do `LavaPrimeAndroidApp` foi auditada e alinhada ao programa sem alterar codigo Android, criando a primeira camada documental oficial da trilha mobile em `docs/primyo-android/`.
- Observacao de risco: o build Android nao ficou validado porque `gradlew tasks` falhou por lock externo no download da toolchain JetBrains JDK `21`; a prioridade recomendada passa a ser `LP-AND-001` para estrategia de dados Android vs backend antes de qualquer expansao funcional.

### LP-ANDROID-002

- Change record: `docs/primyo-changes/LP-ANDROID-002.md`
- Closure: `docs/primyo-changes/LP-ANDROID-002-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: a estrategia de dados Android foi revisada contra o dominio do Web e os contratos oficiais, com matriz documental de equivalencias, ausencias, conflitos, IDs, offline e sync registrada em `docs/primyo-android/ANDROID_DATA_PARITY_MATRIX.md`.
- Observacao de risco: o Android continua sem dominios locais de pagamento, financeiro, documentos e empresa, e a prioridade recomendada passa a ser `LP-AND-002` para sair de `fallbackToDestructiveMigration()` antes de qualquer sync real ou expansao funcional.

### LP-APK-000

- Change record: `docs/primyo-changes/LP-APK-000.md`
- Closure: `docs/primyo-changes/LP-APK-000-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: o `Programa LavaPrime APK` passa a ter governanca oficial propria em `docs/primyo-apk/`, com charter, fases, progresso, requisitos obrigatorios, politica de QA, plano tela por tela e registro formal de `LPFR`.
- Observacao de risco: a fase nao altera Android nem Web; a prioridade recomendada passa a ser `LP-APK-001` para mapear a baseline funcional do Web antes de qualquer nova ampliacao de paridade no app nativo.

### LP-APK-001

- Change record: `docs/primyo-changes/LP-APK-001.md`
- Closure: `docs/primyo-changes/LP-APK-001-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a baseline funcional real do LavaPrime Web foi consolidada em documentos especificos do programa APK, com mapa de modulos, matriz de rotinas, alvos de paridade Android e requisitos reclassificados a partir do Web observado.
- Observacao de risco: a fase nao altera Android nem Web; a prioridade recomendada passa a ser `LP-APK-002` para decidir o reuso controlado da base Android atual antes de qualquer implementacao adicional.

### LP-APK-002

- Change record: `docs/primyo-changes/LP-APK-002.md`
- Closure: `docs/primyo-changes/LP-APK-002-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a base atual de `LavaPrimeAndroidApp` foi reclassificada formalmente por area em `keep`, `refactor`, `replace` e `archive`, com recomendacao oficial de `clean-foundation-inside-current-project`.
- Observacao de risco: a fase nao altera Android nem Web; a prioridade recomendada passa a ser `LP-APK-003` para fechar a baseline visual mobile oficial antes da fundacao de design system e da reconstrucao funcional.

### LP-APK-003

- Change record: `docs/primyo-changes/LP-APK-003.md`
- Closure: `docs/primyo-changes/LP-APK-003-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a baseline visual oficial do APK foi formalizada com separacao clara entre linguagem/hierarquia do Web e marca oficial de `Material_Visual`, incluindo tokens, alvos por tela e matriz de gaps do Android atual.
- Observacao de risco: a fase nao altera Android nem Web; a prioridade recomendada passa a ser `LP-APK-004` para fechar requisitos finais antes da fase de design system e implementacao visual.

### LP-DEPLOY-GOV-002

- Change record: `docs/primyo-changes/LP-DEPLOY-GOV-002.md`
- Closure: `docs/primyo-changes/LP-DEPLOY-GOV-002-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a fase preparou a homologacao Netlify de forma documental e tecnica, confirmando `build = npm run build`, `publish = dist`, ausencia atual da branch `staging` e necessidade de revisar a baseline Web antes de qualquer criacao remota.
- Observacao de risco: a publicacao continua bloqueada porque `primyo/onboarding` esta em `87975a5` com governanca APK no `HEAD`, a `staging` ainda nao existe local/remotamente e o working tree segue misturado com arquivos fora de escopo.

### LP-DEPLOY-GOV-003

- Change record: `docs/primyo-changes/LP-DEPLOY-GOV-003.md`
- Closure: `docs/primyo-changes/LP-DEPLOY-GOV-003-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a fase revisou a baseline Web candidata e concluiu que o `HEAD` atual `ef0bc0e` pode seguir como candidato de homologacao, porque os deltas apos `094a5b7` sao documentais e nao alteram runtime Web.
- Observacao de risco: o historico da branch continua misturado com commits Android/APK e o working tree ainda bloqueia criacao ou push seguro de `staging` enquanto `.gitignore`, `app/styles.css`, `LavaPrimeAndroidApp/**` e `app/assets/data/fipe-veiculos.*` nao forem isolados.

### LP-WEB-DASHBOARD-001

- Change record: `docs/primyo-changes/LP-WEB-DASHBOARD-001.md`
- Closure: `docs/primyo-changes/LP-WEB-DASHBOARD-001-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a Visao Geral passa a usar uma camada dedicada de metricas em `app/dashboard/dashboardMetrics.js`, com KPIs e 6 graficos responsivos baseados em `patioVehicles`, `cashEntries` e `openPayments`, sem abrir Supabase e sem mudar o bootstrap padrao.
- Observacao de risco: a base continua majoritariamente `demo/teste`, entao as metricas ficam limitadas ao que existe no runtime atual; publicacao e deploy continuam dependentes de fase propria de homologacao.

### LP-WEB-DASHBOARD-ACCEL-001

- Change record: `docs/primyo-changes/LP-WEB-DASHBOARD-ACCEL-001.md`
- Closure: `docs/primyo-changes/LP-WEB-DASHBOARD-ACCEL-001-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a area analitica da Visao Geral foi reorganizada diretamente em `app/main.js` e `app/styles.css`, com `Faturamento` e `Lucro estimado` na dupla principal, `Situacao do patio` em linha dedicada e colapso do grid movido para `960px`.
- Observacao de risco: o warning de chunk acima de `500 kB` permanece nao bloqueante e a homologacao publicada em `staging` continua sendo a evidencia final mais confiavel para viewport repetido.

### LP-SERVICE-ORDER-001

- Change record: `docs/primyo-changes/LP-SERVICE-ORDER-001.md`
- Closure: `docs/primyo-changes/LP-SERVICE-ORDER-001-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: o runtime passa a montar `Service Order` interna a partir de `patioVehicles`, com numeracao local, lifecycle minimo, vinculos financeiros/documentais derivados e diagnostico tecnico silencioso, sem trocar a UX atual de `Atendimento`.
- Observacao de risco: a fundacao continua local e derivada, sem persistencia propria, com numeracao nao definitiva e documentos ainda parcialmente ligados por heuristica legacy; a proxima fatia deve consolidar boundary de persistencia e vinculos explicitos sem abrir Supabase.

### LP-SERVICE-ORDER-002

- Change record: `docs/primyo-changes/LP-SERVICE-ORDER-002.md`
- Closure: `docs/primyo-changes/LP-SERVICE-ORDER-002-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a bridge de `Service Order` passa a resolver identidade explicita, anexar `serviceOrderId` e `serviceOrderNumber` a pagamentos, documentos e eventos derivados, e publicar um snapshot local de persistencia futura sem tocar Supabase.
- Observacao de risco: a persistencia continua somente preparada, a numeracao ainda e local e os documentos legacy seguem parcialmente dependentes de heuristica; a proxima fatia deve formalizar contrato de storage e plano de migracao antes de qualquer backend real.

### LP-SERVICE-ORDER-003

- Change record: `docs/primyo-changes/LP-SERVICE-ORDER-003.md`
- Closure: `docs/primyo-changes/LP-SERVICE-ORDER-003-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a `Service Order` passa a ter contrato canonico de storage, validacao local e builder em lote para readiness de backend, com adocao runtime limitada ao diagnostico tecnico.
- Observacao de risco: o contrato continua local e derivado, ainda sem migration, sem escrita real e sem troca das fontes atuais de dashboard, financeiro ou documentos.

### LP-SERVICE-ORDER-005

- Change record: `docs/primyo-changes/LP-SERVICE-ORDER-005.md`
- Closure: `docs/primyo-changes/LP-SERVICE-ORDER-005-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a trilha de `Service Order` passa a enriquecer a origem dos documentos derivados com prioridade explicita de vinculo, diagnostico de qualidade documental e desenho local de `shadow write`, sem alterar a fonte visual principal.
- Observacao de risco: documentos antigos ainda podem cair em fallback por placa e o `shadow write` continua apenas desenhado, sem migration, sem Supabase e sem escrita real.

### LP-SERVICE-ORDER-006

- Change record: `docs/primyo-changes/LP-SERVICE-ORDER-006.md`
- Closure: `docs/primyo-changes/LP-SERVICE-ORDER-006-CLOSURE.md`
- Resultado: `Implementado`
- Observacao principal: a trilha de `Service Order` passa a ter gate explicito, adapter inerte e validacao local de payload para o futuro `shadow write`, com diagnostico pronto para homologacao controlada.
- Observacao de risco: o adapter continua totalmente desligado e a ativacao depende de staging, migration, RLS, rollback e autorizacao explicita do usuario.
