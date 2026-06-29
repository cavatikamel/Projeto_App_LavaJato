# LavaPrime Adequation Backlog

## Legenda

- Prioridade: `P1`, `P2`, `P3`, `P4`
- Severidade: `Critico`, `Alto`, `Medio`, `Baixo`

## Backlog consolidado

| ID | Titulo | Prioridade | Severidade | Dependencias | Area afetada | Risco | Descricao | Criterio de aceite | Evidencias esperadas |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| LP-SEC-001 | Criar camada local de autorizacao no web | P1 | Alto | LP-WEB-001, LP-TEST-002 | Web, Docs | Medio | Concluido em `2026-06-23`. Foi criada a `accessBoundary` local sobre a `sessionBoundary` para centralizar regras de acesso sem ativar autenticacao real. | Checagens sensiveis passam a consultar a camada local, com comportamento atual preservado. | Change record, closure, build aprovado, verify aprovado, `node --check` aprovado e smoke test minimo aprovado. |
| LP-SEC-002 | Remover o estado de "credencial demo como estrategia definitiva" | P1 | Critico | LP-SEC-001 | Web, Android | Alto | Planejar a substituicao controlada do acesso demonstrativo por uma fronteira evolutiva de autenticacao real. | Existe caminho aprovado de transicao sem desligamento abrupto do acesso atual. | Plano de rollout e rollback, mapa de impacto por tela. |
| LP-SEC-003 | Consolidar matriz de acesso por perfil | P1 | Alto | LP-SEC-001 | Web, Android, Backend, Docs | Medio | Concluido em `2026-06-23`. A `accessBoundary` foi expandida para concentrar mais decisoes locais de acesso por modulo e por acao sensivel, sem ativar autenticacao real. | Mais checagens administrativas consultam a camada local, com comportamento atual preservado. | Change record aprovado, build aprovado, verify aprovado, `node --check` aprovado e smoke test minimo aprovado. |
| LP-DATA-001 | Definir fonte unica de verdade por dominio | P1 | Critico | LP-SEC-001 | Web, Backend, Android, Docs | Alto | Concluido em `2026-06-23`. A descoberta documental consolidou fluxo de dados, ownership, inventario de persistencia, proposta de fonte unica de verdade, riscos de migracao e decisao arquitetural formal. | Todos os dominios criticos possuem decisao registrada. | Mapa de dominios e persistencia, closure formal, decisao arquitetural, plano de adocao e contratos iniciais aprovados. |
| LP-DATA-002 | Planejar transicao do financeiro para persistencia controlada | P1 | Critico | LP-DATA-001 | Web, Backend | Alto | Concluido em `2026-06-23`. O dominio financeiro foi mapeado, teve modelo logico futuro proposto, regras de ownership definidas, riscos especificos classificados, readiness de Supabase descrita e cenarios de teste formalizados. | Existe sequencia segura de transicao sem perda de rastreabilidade. | Mapa financeiro, modelo logico, ownership, readiness, cenarios de teste e contratos financeiros atualizados. |
| LP-DATA-003 | Planejar consolidacao de cadastros centrais | P2 | Alto | LP-DATA-001, LP-DATA-002 | Web, Backend, Android | Medio | Concluido em `2026-06-23`. O dominio de dados mestres foi mapeado, recebeu modelo logico futuro, regras de ownership, relacoes, riscos, readiness de Supabase e cenarios de teste. | Os cadastros centrais possuem origem, ownership, relacoes e fluxo futuro definidos. | Mapa do dominio mestre, modelo de entidades, ownership, relacoes, readiness, cenarios de teste e contratos atualizados. |
| LP-DATA-004 | Formalizar contratos oficiais de dados | P1 | Alto | LP-DATA-001, LP-DATA-002, LP-DATA-003 | Web, Backend, Android, Docs | Medio | Concluido em `2026-06-26`. A camada documental oficial de contratos foi criada em `docs/primyo-data/contracts/`, cobrindo `Customer`, `Vehicle`, `Service`, `Product`, `Supply`, `Attendance`, `Payment`, `Financial` e guidelines de compatibilidade. | As entidades prioritarias passam a ter contrato canonico aprovado, versionavel e orientado a comunicacao. | Contratos oficiais, guidelines, validacao de consistencia cruzada e alinhamento com arquitetura, ownership e dominios de dados. |
| LP-WEB-001 | Criar fronteira tecnica para sessao no web | P1 | Alto | LP-SEC-001, LP-SEC-003 | Web | Medio | Concluido em `2026-06-19`. Foi criada uma camada local minima de sessao e perfil para reduzir o espalhamento da logica de acesso no core atual. | A alteracao futura pode ocorrer em um ponto controlado, com comportamento atual preservado durante a transicao. | Change record, closure, build aprovado, verify aprovado, `node --check` aprovado e validacao manual de sessao. |
| LP-WEB-002 | Separar dominios criticos do monolito web por fatia | P2 | Alto | LP-WEB-001, LP-DATA-002, LP-DATA-003 | Web | Medio | Concluido em `2026-06-23`. O monolito `app/main.js` foi mapeado por responsabilidades, fronteiras candidatas, ordem de extracao, riscos, primeira extracao futura e impacto em testes. | Existe sequencia modular por dominio com testes associados. | Mapa do monolito, candidatos a fronteira, ordem de extracao, riscos, primeira proposta e matriz de testes. |
| LP-WEB-003 | Planejar camada de adapters contratuais do web | P1 | Alto | LP-DATA-004, LP-WEB-002, LP-TEST-AUTO-002 | Web, Backend, Android, Docs | Medio | Concluido e encerrado formalmente em `2026-06-26`. Foi definida a estrategia oficial para adapters do web, com mapa legado -> contrato, candidatos, ordem de extracao, riscos de compatibilidade e requisitos de teste para a futura convivencia entre monolito, contratos, backend e Android. | O web possui estrategia aprovada para adaptar dados legados aos contratos oficiais sem tocar em runtime ou persistencia real. | `docs/primyo-web-contracts/`, `docs/primyo-changes/LP-WEB-003-CLOSURE.md`, backlog atualizado, `NEXT_SLICE_DECISION.md`, `REGRESSION_MATRIX.md`, `npm.cmd run primyo:gate`, build e verify aprovados. |
| LP-WEB-004 | Executar primeira extracao controlada de sessionBoundary e accessBoundary | P1 | Alto | LP-WEB-002, LP-TEST-003, LP-PERM-001 | Web | Medio | Concluido e encerrado formalmente em `2026-06-24`. As factories `createSessionBoundary(...)` e `createAccessBoundary(...)` foram extraidas para `app/boundaries/sessionAccessBoundary.js`, preservando API, comportamento e compatibilidade com o monolito. | Boundaries extraidas sem mudar fluxo, visual, banco, Supabase, Android ou dependencias. | Change record, closure, diff limitado, gate tecnico, smoke completo, cenarios de permissao e rollback. |
| LP-WEB-005 | Extrair helpers puros de texto e formatacao | P1 | Medio | LP-WEB-004, LP-TEST-AUTO-001 | Web | Baixo/Medio | Concluido e encerrado formalmente em `2026-06-24`. Helpers puros de texto, escape e mascaras simples foram extraidos para `app/utils/textFormatters.js`, preservando chamadas em `app/main.js`. | Apenas uma responsabilidade extraida, comportamento preservado e rollback documentado. | Change record, closure, `primyo:gate`, build, verify, `node --check app/utils/textFormatters.js` e smoke minimo aprovado. |
| LP-WEB-006 | Extrair Storage Boundary para acesso bruto ao localStorage | P1 | Alto | LP-WEB-005, LP-TEST-AUTO-001 | Web | Medio/Alto | Concluido e encerrado formalmente em `2026-06-25`. A `storageBoundary` foi criada em `app/storage/storageBoundary.js` e absorveu apenas 2 chamadas diretas simples de `localStorage`, preservando os wrappers existentes em `app/main.js`. | Existe uma unica boundary tecnica para acesso bruto ao `localStorage`, com comportamento preservado e rollback documentado. | Change record, closure, `primyo:gate`, build, verify, `node --check app/storage/storageBoundary.js` e smoke minimo aprovado. |
| LP-WEB-007 | Implementar primeiro adapter puro de contrato para master data de baixo risco | P2 | Medio | LP-WEB-003, LP-DATA-004, LP-TEST-AUTO-002 | Web, Docs | Medio | Concluido e encerrado formalmente em `2026-06-26`. `customerAdapter` foi criado em `app/adapters/customerAdapter.js`, com API publica minima, validacao controlada, envelope contratual e gate estrutural atualizado, sem integracao ao runtime. | O primeiro adapter puro existe, e reversivel, e converte cliente legado para contrato oficial com evidencias e sem alterar comportamento percebido. | Change record, closure, `node --check app/adapters/customerAdapter.js`, gate, build, verify, plano de rollback e evidencia de traducao de payload. |
| LP-WEB-007-REVISION | Alinhar `customerAdapter` ao padrao compartilhado de identidade e envelope | P1 | Medio | LP-WEB-007, LP-DATA-005, LP-TEST-AUTO-002 | Web, Docs | Medio | Concluido e encerrado formalmente em `2026-06-26`. O `customerAdapter` foi revisado para aderir integralmente aos padroes compartilhados de `id`, `sourceId`, `legacyRefs`, envelope, contexto, status e timestamps, sem tocar no runtime. | O adapter de referencia segue o baseline transversal oficial, continua puro, reversivel, fora de `app/main.js` e passa a servir como modelo para os proximos adapters. | Change record, closure, `node --check`, gate, build, verify, validacao conceitual de payload e rollback documentado. |
| LP-WEB-008 | Implementar segundo adapter puro de contrato para master data dependente | P2 | Medio | LP-WEB-007-REVISION, LP-DATA-005, LP-TEST-AUTO-002 | Web, Docs | Medio/Alto | Concluido e encerrado formalmente em `2026-06-26`. `vehicleAdapter` foi criado em `app/adapters/vehicleAdapter.js`, seguindo o baseline compartilhado do `customerAdapter` revisado, sem integracao ao runtime. | O segundo adapter puro amplia cobertura contratual sem alterar comportamento e sem conectar Supabase. | Change record, closure, `node --check` dos adapters, gate, build, verify, testes conceituais de traducao e rollback documentado. |
| LP-WEB-009 | Implementar terceiro adapter puro de contrato para master data de servicos | P2 | Medio | LP-WEB-008, LP-TEST-AUTO-003, LP-DATA-005 | Web, Docs | Medio | Concluido e encerrado formalmente em `2026-06-26`. `serviceAdapter` foi criado em `app/adapters/serviceAdapter.js`, seguindo o baseline compartilhado de `customerAdapter` e `vehicleAdapter`, com gate ampliado e sem integracao ao runtime. | O terceiro adapter puro existe, e reversivel, e converte servico legado para contrato oficial com evidencias e sem alterar comportamento percebido. | Change record, closure, `node --check` dos tres adapters, adapter gate, `primyo:gate`, build, verify, testes conceituais de traducao e rollback documentado. |
| LP-WEB-ADAPTER-HELPERS-001 | Consolidar helper comum minimo para adapters puros | P2 | Medio | LP-WEB-009, LP-DATA-005, LP-TEST-AUTO-003 | Web, Docs | Medio | Concluido e encerrado formalmente em `2026-06-26`. `adapterHelpers.js` foi criado como camada compartilhada minima para `customerAdapter`, `vehicleAdapter` e `serviceAdapter`, com gate ampliado e sem integracao ao runtime. | Existe helper comum minimo, reversivel e fora do runtime, reduzindo drift estrutural antes do quarto adapter. | Change record, closure, `node --check` do helper e dos tres adapters, adapter gate, `primyo:gate`, build, verify e rollback documentado. |
| LP-WEB-010 | Implementar quarto adapter puro de contrato para master data de produtos | P2 | Medio | LP-WEB-ADAPTER-HELPERS-001, LP-DATA-005, LP-TEST-AUTO-003 | Web, Docs | Medio | Concluido e encerrado formalmente em `2026-06-26`. `productAdapter` foi criado em `app/adapters/productAdapter.js`, seguindo o baseline compartilhado dos adapters anteriores, com gate ampliado e sem integracao ao runtime. | O quarto adapter puro existe, e reversivel, e converte produto legado para contrato oficial com evidencias e sem alterar comportamento percebido. | Change record, closure, `node --check`, adapter gate atualizado, `primyo:gate`, build, verify, testes conceituais de traducao e rollback documentado. |
| LP-DOC-EXEC-001 | Consolidar Primyo Lean Mode para prompts curtos e seguros | P2 | Baixo | LP-WEB-010 | Docs, Governanca | Baixo | Concluido em `2026-06-27`. Foi criada a base documental do Lean Mode para reduzir repeticao de regras nos proximos prompts sem reduzir gate, rollback, rastreabilidade ou controle de escopo. | Os prompts futuros podem referenciar regras locais consolidadas, com qualidade e seguranca preservadas. | Documentos de execucao, politica de prompt, formato de resposta, regras de commit, tipos de fase, change record e `npm.cmd run primyo:gate` aprovado. |
| LP-WEB-011 | Implementar quinto adapter puro de contrato para master data de insumos | P2 | Medio | LP-WEB-010, LP-DATA-005, LP-TEST-AUTO-003 | Web, Docs | Medio | Concluido e encerrado formalmente em `2026-06-27`. `supplyAdapter` foi criado em `app/adapters/supplyAdapter.js`, seguindo o baseline compartilhado dos adapters anteriores, com gate ampliado e sem integracao ao runtime. | O quinto adapter puro existe, e reversivel, e converte insumo legado para contrato oficial com evidencias e sem alterar comportamento percebido. | Change record, closure, `node --check`, adapter gate atualizado, `primyo:gate`, build, verify, testes conceituais de traducao e rollback documentado. |
| LP-WEB-ID-RESOLVER-002 | Implementar primeira camada pura de resolucao de IDs cross-domain | P2 | Medio | LP-WEB-ID-RESOLVER-001, LP-TEST-AUTO-003, LP-DATA-006 | Web, Docs | Medio | Concluido e encerrado formalmente em `2026-06-27`. `app/adapters/shared/idResolver.js` foi criado como modulo puro e reversivel, com gate ampliado e sem integracao ao runtime. | O resolvedor puro existe, bloqueia ambiguidade e lookup por nome/placa, preserva `legacyRefs` e nao altera comportamento percebido. | Change record, closure, `node --check`, adapter gate atualizado, `primyo:gate`, build, verify e rollback documentado. |
| LP-WEB-INTEGRATION-READINESS-001 | Avaliar readiness de runtime para adapters e idResolver | P1 | Alto | LP-WEB-011, LP-WEB-ID-RESOLVER-002, LP-TEST-AUTO-004 | Web, Docs | Medio/Alto | Concluido em `2026-06-28`. A readiness de runtime foi documentada com avaliacao dos cinco adapters, do `idResolver`, da cobertura do gate, dos riscos de integracao, do rollback, do smoke manual futuro e da primeira fatia recomendada. | Existe estrategia conservadora aprovada para a primeira integracao real ao runtime, sem tocar `app/main.js` nesta fase. | `docs/primyo-web-integration/`, change record da fase, `npm.cmd run primyo:gate` aprovado e decisao formal da primeira fatia futura. |
| LP-WEB-INTEGRATION-001 | Integrar `customerAdapter` em shadow read no runtime | P1 | Alto | LP-WEB-INTEGRATION-READINESS-001, LP-WEB-007-REVISION | Web | Alto | Implementado em `2026-06-28`. `customerAdapter` passou a rodar em modo sombra apenas na edicao de cliente existente via `openClientDialog(clientId)`, mantendo o legado como fonte ativa, sem escrita via adapter e sem `idResolver` no runtime. | A primeira integracao real existe, e pequena, reversivel e sem alterar comportamento visivel, persistencia, UI ou Supabase. | Change record, `node --check`, adapter gate, `primyo:gate`, build, verify, smoke manual do fluxo de clientes e rollback documentado. |
| LP-WEB-INTEGRATION-002 | Reforcar diagnostico do `customerAdapter` em shadow read | P1 | Alto | LP-WEB-INTEGRATION-001 | Web | Alto | Implementado em `2026-06-28`. O `shadow read` do cliente passou a registrar diagnostico interno mais rico em memoria, com historico curto, motivo de falha, campos ausentes, tipo de cliente, presenca de documento, timestamp e rollback, sem alterar UI, escrita, permissoes ou Supabase. | O diagnostico de sombra fica mais observavel para engenharia sem mudar fonte ativa, renderizacao, save, runtime de outros dominios ou comportamento percebido. | Change record, `node --check`, adapter gate, `primyo:gate`, build, verify, smoke manual do fluxo de clientes e rollback documentado. |
| LP-WEB-INTEGRATION-003 | Revisar cobertura atual do `Customer Adapter Shadow Read` | P1 | Medio | LP-WEB-INTEGRATION-001, LP-WEB-INTEGRATION-002 | Web, Docs | Medio | Concluido em `2026-06-28`. A cobertura atual do `shadow read` foi mapeada, os fluxos de cliente foram avaliados e a recomendacao oficial passou a ser validar os dados legados antes de qualquer ampliacao de sombra no runtime. | Existe decisao formal e conservadora sobre onde nao ampliar ainda, quais fluxos sao candidatos e qual microfase deve vir antes da proxima expansao. | `docs/primyo-web-integration/CUSTOMER_SHADOW_READ_COVERAGE_REVIEW.md`, `docs/primyo-changes/LP-WEB-INTEGRATION-003.md`, `npm.cmd run primyo:gate` aprovado e `NEXT_SLICE_DECISION.md` atualizado. |
| LP-DOC-HANDOFF-001 | Consolidar handoff seguro para compactacao do contexto do Codex | P3 | Baixo | LP-DOC-EXEC-001, LP-WEB-011 | Docs, Governanca | Baixo | Concluido em `2026-06-27`. Foi criada a base documental de handoff para registrar branch, commits relevantes, estado tecnico atual, fora de escopo persistente e checklist de compactacao segura do chat. | O proximo contexto consegue retomar a trilha Primyo com baixo risco de perda de contexto, sem reduzir gate, rollback ou controle de escopo. | Handoff summary, checklist de compactacao, change record, closure e `npm.cmd run primyo:gate` aprovado. |
| LP-PERM-001 | Alinhar regras de administrador e operador | P1 | Alto | LP-SEC-003 | Web, Android | Medio | Concluido em `2026-06-23`. A matriz oficial de permissoes foi formalizada para Administrador e Operador, com perfis futuros planejados sem implementacao. | Cada permissao critica possui racional, politica, readiness RLS e cenarios de teste. | Matriz revisada, acoes sensiveis, politica de permissao, readiness RLS, cenarios de teste e validacoes tecnicas aprovadas. |
| LP-TEST-001 | Formalizar baseline minima de testes web | P1 | Alto | Nenhuma | Web, CI, Docs | Baixo | Consolidar build, verificacoes existentes e fluxos manuais obrigatorios antes de qualquer mudanca funcional. | Existe pacote minimo repetivel para validar cada fatia web. | Documento de baseline, execucao registrada. |
| LP-TEST-002 | Definir validacoes de regressao para fluxos criticos | P1 | Alto | LP-TEST-001 | Web, Android, Docs | Medio | Fixar os fluxos que nunca podem ser alterados sem revalidacao antes e depois. | Fluxos criticos listados com criterio de sucesso. | Checklist de regressao, evidencias manuais padronizadas. |
| LP-TEST-003 | Planejar cobertura automatizada incremental | P2 | Medio | LP-TEST-001, LP-WEB-002 | Web, Android, CI | Medio | Concluido em `2026-06-23`. A estrategia de automacao incremental foi definida sem criar scripts, instalar frameworks ou alterar codigo funcional. | Existe roadmap objetivo de testes por fase e primeira automacao futura planejada. | Estrategia de automacao, decisao de ferramenta, desenho de gate, roadmap e requisitos de teste para extracoes. |
| LP-TEST-AUTO-001 | Implementar gate tecnico local sem dependencias novas | P1 | Alto | LP-TEST-003, LP-WEB-004 | Web, Docs | Baixo | Concluido e encerrado formalmente em `2026-06-24`. O comando `npm.cmd run primyo:gate` foi adotado como gate tecnico oficial minimo para mudancas futuras no LavaPrime Web. | Um comando local executa build, verify e `node --check`, gera resultado claro e preserva smoke manual obrigatorio. | Script sem dependencias novas, closure, rollback, `primyo:gate` aprovado, build aprovado, verify aprovado e smoke manual mantido. |
| LP-TEST-AUTO-002 | Reforcar regressao automatizada assistida para extracoes web | P1 | Medio | LP-TEST-AUTO-001, LP-WEB-006 | Web, Docs | Baixo/Medio | Concluido em `2026-06-25`. O `primyo:gate` foi evoluido para validar diretorios obrigatorios, modulos criticos, imports essenciais, assinaturas esperadas e integridade minima das boundaries, sem alterar runtime ou dependencias. | O gate detecta ausencias estruturais e regressao basica de modulo antes de novas extracoes arquiteturais. | `scripts/primyo-gate.mjs`, doc da fase, `npm.cmd run primyo:gate`, build e verify aprovados. |
| LP-TEST-AUTO-003 | Reforcar gate para adapters e contratos sem dependencias novas | P2 | Medio | LP-TEST-AUTO-002, LP-WEB-003 | Web, CI, Docs | Baixo/Medio | Concluido e encerrado formalmente em `2026-06-26`. O gate agora executa validacao automatica de `customerAdapter` e `vehicleAdapter`, com fixtures controlados, envelope, `validation`, `warnings`, contexto e separacao entre `id` e `sourceId`, sem tocar runtime ou dependencias. | O gate consegue bloquear regressao estrutural e conceitual minima da trilha de adapters antes de novas extracoes ou integracoes. | `scripts/primyo-adapter-gate.mjs`, `scripts/primyo-gate.mjs`, `docs/primyo-changes/LP-TEST-AUTO-003-CLOSURE.md`, politica de gate revisada, requisitos de teste revisados e evidencias de execucao. |
| LP-TEST-AUTO-004 | Reforcar regressao automatica do resolvedor de IDs | P2 | Medio | LP-WEB-ID-RESOLVER-002, LP-TEST-AUTO-003 | Web, CI, Docs | Baixo/Medio | Implementado em `2026-06-27`. O Adapter Gate foi ampliado para endurecer a cobertura do `idResolver` com cenarios de entidade correta/errada, `legacyRefs` inexistentes/ambiguos, query vazia, query por `name` e `plate`, contrato sem `id` explicito, contratos duplicados, entradas invalidas, indice vazio e imutabilidade. | O gate bloqueia regressao conceitual mais ampla do resolvedor antes de qualquer integracao funcional. | `scripts/primyo-adapter-gate.mjs`, `docs/primyo-changes/LP-TEST-AUTO-004.md`, politica de gate revisada, requisitos de resolucao revisados, `primyo:gate`, build e verify aprovados. |
| LP-DATA-005 | Formalizar regras canonicas de identidade, envelope e legacyRefs | P2 | Alto | LP-DATA-004, LP-WEB-003 | Web, Backend, Android, Docs | Medio | Concluido em `2026-06-26`. Foram formalizadas regras compartilhadas de `id`, `sourceId`, `legacyRefs`, `organizationId`, `contractVersion`, envelope, contexto de adapter, status, timestamps e compatibilidade, sem alterar runtime ou adapters em producao. | Existe especificacao unificada de identidade e envelope aplicavel a Web, Android, backend e futuros adapters. | Pasta `docs/primyo-data/contracts/shared/`, guidelines revisadas, requisitos de teste atualizados, ordem de adapters revisada, backlog/change control atualizados e validacoes tecnicas aprovadas. |
| LP-SUPABASE-001 | Planejar primeira leitura controlada via cliente Supabase isolado | P1 | Critico | LP-WEB-007, LP-WEB-008, LP-DATA-005, LP-SEC-002 | Web, Backend | Alto | Definir e preparar a primeira fronteira controlada de leitura remota, com cliente Supabase isolado, sem substituir o runtime inteiro e sem romper rollback. | Existe plano ou implementacao controlada de leitura remota com isolamento, rollback e testes aprovados. | Change record, plano de rollout/rollback, gate, evidencias de isolamento e validacao de risco. |
| LP-OPS-001 | Definir sinais minimos de observabilidade | P2 | Medio | LP-TEST-002 | Operacao, CI, Docs | Medio | Identificar indicadores e verificacoes que denunciem falhas apos mudancas controladas. | Sinais de saude e pontos de verificacao aprovados. | Checklist operacional, plano de observacao. |
| LP-OPS-002 | Formalizar checklist de publicacao controlada | P2 | Medio | LP-OPS-001 | Web, Android, Docs | Baixo | Padronizar como validar release, rollback e aceite antes de publicar. | Checklist aplicado ao menos em simulacao documental. | Checklist de release, aprovadores definidos. |
| LP-AND-001 | Revisar estrategia de dados Android vs backend | P2 | Alto | LP-DATA-001, LP-SEC-001 | Android, Backend | Alto | Definir como o Android saira do acoplamento atual com dados locais e migracoes destrutivas. | Existe plano de convergencia aprovado. | Estrategia mobile, risco de dados, rollback. |
| LP-AND-002 | Planejar substituicao controlada de migracao destrutiva | P2 | Alto | LP-AND-001 | Android | Alto | Preparar caminho para eliminar dependencia permanente de `fallbackToDestructiveMigration()`. | Existe sequencia segura de migracao de dados mobile. | Plano tecnico, cenarios de teste e reversao. |
| LP-REL-001 | Atualizar documentacao operacional junto com cada fase | P1 | Medio | Todas as fases ativas | Docs | Baixo | Garantir que conhecimento consolidado acompanhe cada mudanca aprovada. | Nenhuma fase fecha sem documentos atualizados. | Documentos revisados, referencias cruzadas e historico. |

## Ordem de execucao recomendada

1. `LP-TEST-001`
2. `LP-WEB-001` `concluido em 2026-06-19`
3. `LP-TEST-002`
4. `LP-SEC-001` `concluido em 2026-06-23`
5. `LP-SEC-003` `concluido em 2026-06-23`
6. `LP-DATA-001` `concluido em 2026-06-23`
7. `LP-DATA-002` `concluido em 2026-06-23`
8. `LP-DATA-003` `concluido em 2026-06-23`
9. `LP-WEB-002` `concluido em 2026-06-23`
10. `LP-TEST-003` `concluido em 2026-06-23`
11. `LP-PERM-001` `concluido em 2026-06-23`
12. `LP-WEB-004` `concluido em 2026-06-24`
13. `LP-TEST-AUTO-001` `concluido em 2026-06-24`
14. `LP-WEB-005` `concluido em 2026-06-24`
15. `LP-WEB-006` `concluido em 2026-06-25`
16. `LP-TEST-AUTO-002` `concluido em 2026-06-25`
17. `LP-DATA-004` `concluido em 2026-06-26`
18. `LP-WEB-003` `concluido em 2026-06-26`
19. `LP-WEB-007` `concluido em 2026-06-26`
20. `LP-DATA-005` `concluido em 2026-06-26`
21. `LP-WEB-007-REVISION` `concluido em 2026-06-26`
22. `LP-WEB-008` `concluido em 2026-06-26`
23. `LP-TEST-AUTO-003` `concluido em 2026-06-26`
24. `LP-WEB-009` `concluido em 2026-06-26`
25. `LP-WEB-ADAPTER-HELPERS-001` `concluido em 2026-06-26`
26. `LP-WEB-010` `concluido em 2026-06-26`
27. `LP-DOC-EXEC-001` `concluido em 2026-06-27`
28. `LP-WEB-011` `concluido em 2026-06-27`
29. `LP-DOC-HANDOFF-001` `concluido em 2026-06-27`
30. `LP-DATA-006` `recomendado em 2026-06-27`
31. `LP-SUPABASE-001`
32. `LP-SEC-002`
33. `LP-OPS-001`
33. `LP-OPS-002`
34. `LP-AND-001`
35. `LP-AND-002`
36. `LP-REL-001`

## Observacoes de governanca

- Nenhum item deste backlog autoriza implementacao automatica.
- Cada item devera virar uma mudanca controlada separada ou uma fatia aprovada.
- Itens P1 de severidade critica ou alta exigem rollback documentado antes de qualquer alteracao.

## Itens concluidos

### LP-WEB-001

- Status: `Concluido`
- Data: `2026-06-19`
- Arquivos alterados:
  - `app/main.js`
  - `docs/primyo-changes/LP-WEB-001.md`
- Evidencias:
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
  - `node --check app/main.js`
  - `node --check scripts/sync-fipe-local-db.mjs`
  - validacao manual de login admin, login operador, patio, area administrativa e logout
  - encerramento registrado em `docs/primyo-changes/LP-WEB-001-CLOSURE.md`
- Observacoes:
  - a `sessionBoundary` foi absorvida na baseline oficial do web;
  - `selectedProfile` e `activeSessionUser` continuam em convivencia controlada por compatibilidade;
  - nenhuma autenticacao real, integracao Supabase ou alteracao Android foi iniciada.

### LP-SEC-001

- Status: `Concluido`
- Data: `2026-06-23`
- Arquivos alterados:
  - `app/main.js`
  - `docs/primyo-changes/LP-SEC-001.md`
- Evidencias:
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
  - `node --check app/main.js`
  - `node --check scripts/sync-fipe-local-db.mjs`
  - smoke test minimo com login admin, acesso administrativo, navegacao principal, logout, login operador, acesso ao patio e console sem `warn` ou `error`
  - encerramento registrado em `docs/primyo-changes/LP-SEC-001-CLOSURE.md`
- Observacoes:
  - a `accessBoundary` foi absorvida na baseline oficial do web;
  - as checagens sensiveis passaram a consultar a nova camada local;
  - `selectedProfile` e `activeSessionUser` continuam em convivencia controlada por compatibilidade.
- Riscos remanescentes:
  - a autorizacao ainda e local ao frontend;
  - ainda existem checagens legadas fora da `accessBoundary`;
  - autenticacao real e matriz formal de acesso ainda nao foram implementadas.

### LP-SEC-003

- Status: `Concluido`
- Data: `2026-06-23`
- Arquivos alterados:
  - `app/main.js`
  - `docs/primyo-changes/LP-SEC-003.md`
- Evidencias:
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
  - `node --check app/main.js`
  - `node --check scripts/sync-fipe-local-db.mjs`
  - smoke test minimo com login administrador, acesso administrativo, navegacao principal, acesso ao patio pelo admin, logout, login operador, acesso ao patio e console sem `warn` ou `error`
  - validacoes complementares com acesso financeiro, configuracoes, cadastros e documentos como administrador
- Observacoes:
  - a `accessBoundary` passou a concentrar mais regras locais de acesso por modulo e por acao sensivel;
  - a mudanca foi aceita tecnicamente sem tocar em Supabase, banco, Android, layout ou dependencias.
- Riscos remanescentes:
  - a autorizacao continua local ao frontend;
  - ainda nao existe autenticacao real;
  - a matriz final de permissao segue dependente de `LP-PERM-001`.

### LP-DATA-001

- Status: `Concluido`
- Data: `2026-06-23`
- Arquivos alterados:
  - `docs/primyo-data/DATA_FLOW_MAP.md`
  - `docs/primyo-data/DATA_OWNERSHIP_MATRIX.md`
  - `docs/primyo-data/PERSISTENCE_INVENTORY.md`
  - `docs/primyo-data/SINGLE_SOURCE_OF_TRUTH_PROPOSAL.md`
  - `docs/primyo-data/DATA_MIGRATION_RISKS.md`
  - `docs/primyo-changes/LP-DATA-001-CLOSURE.md`
  - `docs/primyo-data/DATA_ARCHITECTURE_DECISION.md`
  - `docs/primyo-data/SUPABASE_ADOPTION_PLAN.md`
  - `docs/primyo-data/ENTITY_MIGRATION_ORDER.md`
  - `docs/primyo-data/DATA_CONTRACTS_DRAFT.md`
- Evidencias:
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
  - `node --check app/main.js`
  - `node --check scripts/sync-fipe-local-db.mjs`
  - encerramento registrado em `docs/primyo-changes/LP-DATA-001-CLOSURE.md`
  - decisao formal registrada em `docs/primyo-data/DATA_ARCHITECTURE_DECISION.md`
- Observacoes:
  - Supabase foi aprovado como fonte oficial de verdade para dados compartilhados;
  - `localStorage` foi reclassificado como suporte transitorio e cache;
  - Room Android foi classificado como replica offline futura;
  - nenhuma migracao real, conexao backend, alteracao de schema ou mudanca funcional foi iniciada.
- Riscos remanescentes:
  - financeiro continua sendo o dominio mais sensivel para transicao;
  - clientes e faturamento ainda convivem com duplicidades locais;
  - Android segue com modelo proprio e `fallbackToDestructiveMigration()` ate fase especifica.

### LP-DATA-002

- Status: `Concluido`
- Data: `2026-06-23`
- Arquivos alterados:
  - `docs/primyo-data/financial-domain/FINANCIAL_DOMAIN_MAP.md`
  - `docs/primyo-data/financial-domain/FINANCIAL_ENTITY_MODEL.md`
  - `docs/primyo-data/financial-domain/FINANCIAL_OWNERSHIP_RULES.md`
  - `docs/primyo-data/financial-domain/FINANCIAL_MIGRATION_RISKS.md`
  - `docs/primyo-data/financial-domain/FINANCIAL_SUPABASE_READINESS.md`
  - `docs/primyo-data/financial-domain/FINANCIAL_TEST_SCENARIOS.md`
  - `docs/primyo-data/DATA_CONTRACTS_DRAFT.md`
- Evidencias:
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
  - `node --check app/main.js`
  - `node --check scripts/sync-fipe-local-db.mjs`
  - contratos financeiros atualizados em `docs/primyo-data/DATA_CONTRACTS_DRAFT.md`
  - decisao da proxima fatia atualizada em `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Observacoes:
  - o dominio financeiro foi separado em configuracao, obrigacao, pagamento, caixa e documento;
  - a entidade logica `payments` foi formalizada no modelo conceitual, sem alterar schema nesta fase;
  - readiness de Supabase permaneceu apenas documental, sem conexao runtime.
- Riscos remanescentes:
  - o gap fisico da entidade `payments` segue sem decisao de implementacao;
  - clientes faturados e clientes operacionais ainda nao foram reconciliados;
  - modularizacao web e consolidacao de cadastros ainda dependem de planejamento adicional.

### LP-DATA-003

- Status: `Concluido`
- Data: `2026-06-23`
- Arquivos alterados:
  - `docs/primyo-data/master-data-domain/MASTER_DATA_DOMAIN_MAP.md`
  - `docs/primyo-data/master-data-domain/MASTER_DATA_ENTITY_MODEL.md`
  - `docs/primyo-data/master-data-domain/MASTER_DATA_OWNERSHIP_RULES.md`
  - `docs/primyo-data/master-data-domain/MASTER_DATA_RELATIONSHIP_RULES.md`
  - `docs/primyo-data/master-data-domain/MASTER_DATA_MIGRATION_RISKS.md`
  - `docs/primyo-data/master-data-domain/MASTER_DATA_SUPABASE_READINESS.md`
  - `docs/primyo-data/master-data-domain/MASTER_DATA_TEST_SCENARIOS.md`
  - `docs/primyo-data/DATA_CONTRACTS_DRAFT.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
  - `node --check app/main.js`
  - `node --check scripts/sync-fipe-local-db.mjs`
  - contratos ampliados para organizacao, configuracao do negocio, equipe, metodo de pagamento e referencia FIPE
  - decisao da proxima fatia atualizada em `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Observacoes:
  - o dominio mestre foi consolidado como base de clientes, veiculos, servicos, catalogos, equipe, configuracoes e metodos de pagamento;
  - a FIPE foi mantida como referencia local, nao como dado transacional;
  - nenhuma integracao real com Supabase, alteracao de schema ou mudanca funcional foi iniciada.
- Riscos remanescentes:
  - `clientRegistry` e `billingClients` ainda convivem como estruturas paralelas no legado;
  - `serviceSupplyProfiles` ainda depende de chave derivada por nome/tipo/categoria;
  - a modularizacao do web ainda precisa transformar o plano em fronteiras tecnicas reais.

### LP-WEB-002

- Status: `Concluido`
- Data: `2026-06-23`
- Arquivos alterados:
  - `docs/primyo-web-boundaries/WEB_MONOLITH_MAP.md`
  - `docs/primyo-web-boundaries/WEB_BOUNDARY_CANDIDATES.md`
  - `docs/primyo-web-boundaries/WEB_EXTRACTION_ORDER.md`
  - `docs/primyo-web-boundaries/WEB_BOUNDARY_RISK_ANALYSIS.md`
  - `docs/primyo-web-boundaries/WEB_FIRST_EXTRACTION_PROPOSAL.md`
  - `docs/primyo-web-boundaries/WEB_TEST_IMPACT.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
  - `node --check app/main.js`
  - `node --check scripts/sync-fipe-local-db.mjs`
  - mapa do monolito e candidatos a boundaries criados em `docs/primyo-web-boundaries/`
  - proxima fatia recomendada atualizada em `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Observacoes:
  - nenhuma refatoracao foi iniciada;
  - nenhum codigo foi movido;
  - nenhum modulo JS de producao foi criado;
  - a primeira extracao futura recomendada e `sessionBoundary` + `accessBoundary`.
- Riscos remanescentes:
  - financeiro, patio e persistencia local seguem como dominios criticos para extracao;
  - a primeira extracao real ainda precisa de cobertura incremental mais forte;
  - `app/main.js` continua sendo o coordenador funcional do web legado.

### LP-TEST-003

- Status: `Concluido`
- Data: `2026-06-23`
- Arquivos alterados:
  - `docs/primyo-tests/automation/AUTOMATED_TEST_STRATEGY.md`
  - `docs/primyo-tests/automation/TEST_TOOLING_DECISION.md`
  - `docs/primyo-tests/automation/FIRST_AUTOMATION_SLICE.md`
  - `docs/primyo-tests/automation/AUTOMATED_GATE_DESIGN.md`
  - `docs/primyo-tests/automation/MANUAL_TO_AUTOMATED_ROADMAP.md`
  - `docs/primyo-tests/automation/EXTRACTION_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - estrategia de automacao incremental definida;
  - decisao inicial por scripts Node simples sem dependencias novas;
  - primeira automacao futura planejada como gate tecnico local;
  - desenho de gate automatizado documentado;
  - roadmap manual para automatizado criado;
  - requisitos de teste para extracoes documentados;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - `node --check app/main.js` -> sucesso;
  - `node --check scripts/sync-fipe-local-db.mjs` -> sucesso.
- Observacoes:
  - nenhuma automacao foi implementada;
  - nenhum script executavel foi criado;
  - nenhuma dependencia foi instalada;
  - `package.json` nao foi alterado;
  - `app/main.js` nao foi alterado nesta fase.
- Riscos remanescentes:
  - smoke browser ainda nao existe;
  - testes de unidade dependem de extracoes futuras;
  - smoke funcional continua manual;
  - primeira extracao real ainda precisa de aprovacao especifica.

### LP-PERM-001

- Status: `Concluido`
- Data: `2026-06-23`
- Arquivos alterados:
  - `docs/primyo-permissions/ROLE_PERMISSION_MATRIX.md`
  - `docs/primyo-permissions/SENSITIVE_ACTIONS.md`
  - `docs/primyo-permissions/PERMISSION_POLICY.md`
  - `docs/primyo-permissions/RLS_READINESS_MAP.md`
  - `docs/primyo-permissions/PERMISSION_TEST_SCENARIOS.md`
  - `docs/primyo-onboarding/permissoes.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - matriz oficial de permissoes criada;
  - acoes sensiveis classificadas;
  - politica `negar por padrao` formalizada;
  - readiness RLS preparado sem SQL;
  - cenarios de teste de permissao criados;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - `node --check app/main.js` -> sucesso;
  - `node --check scripts/sync-fipe-local-db.mjs` -> sucesso.
- Observacoes:
  - nenhuma autenticacao real foi implementada;
  - nenhum perfil futuro foi criado no app;
  - nenhuma policy SQL foi escrita;
  - Supabase, banco, Android, dependencias e `app/main.js` nao foram alterados nesta fase.
- Riscos remanescentes:
  - a matriz ainda nao e consumida automaticamente em runtime;
  - `accessBoundary` segue local ao frontend;
  - RLS futura ainda depende de schema, membership e auditoria;
  - a primeira extracao fisica ainda exige fatia dedicada.

### LP-WEB-004

- Status: `Concluido`
- Data: `2026-06-24`
- Arquivos alterados:
  - `app/main.js`
  - `app/boundaries/sessionAccessBoundary.js`
  - `docs/primyo-changes/LP-WEB-004.md`
  - `docs/primyo-changes/LP-WEB-004-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-web-boundaries/WEB_FIRST_EXTRACTION_PROPOSAL.md`
  - `docs/primyo-web-boundaries/WEB_EXTRACTION_ORDER.md`
  - `docs/primyo-web-boundaries/WEB_BOUNDARY_RISK_ANALYSIS.md`
  - `docs/primyo-web-boundaries/WEB_TEST_IMPACT.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `sessionBoundary` extraida de `app/main.js`;
  - `accessBoundary` extraida de `app/main.js`;
  - `app/main.js` preserva instanciacao e exposicao global das boundaries;
  - compatibilidade com `selectedProfile` e `activeSessionUser` preservada por callback;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - `node --check app/main.js` -> sucesso;
  - `node --check scripts/sync-fipe-local-db.mjs` -> sucesso;
  - `node --check app/boundaries/sessionAccessBoundary.js` -> sucesso;
  - smoke test de admin, operador, patio, financeiro, logout, permissoes basicas e console registrado em `docs/primyo-changes/LP-WEB-004.md`;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-004-CLOSURE.md`.
- Observacoes:
  - nenhuma outra fronteira foi extraida;
  - nenhuma regra de negocio foi alterada;
  - nenhum layout foi alterado;
  - Supabase, banco, Android, CSS, Vite, scripts, assets e dependencias nao foram alterados nesta fase.
- Riscos remanescentes:
  - a autorizacao continua local ao frontend;
  - a matriz formal de permissoes ainda nao e consumida automaticamente pela boundary;
  - o monolito continua hospedando os demais dominios funcionais;
  - a proxima extracao deve aguardar fortalecimento do gate tecnico.

### LP-TEST-AUTO-001

- Status: `Concluido`
- Data: `2026-06-24`
- Arquivos alterados:
  - `package.json`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-tests/automation/LP-TEST-AUTO-001.md`
  - `docs/primyo-changes/LP-TEST-AUTO-001-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_EXECUTION_REPORT.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-tests/automation/AUTOMATED_GATE_DESIGN.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `npm.cmd run primyo:gate` -> sucesso
  - `npm.cmd run build` -> sucesso
  - `npm.cmd run verify:build` -> sucesso
  - encerramento formal registrado em `docs/primyo-changes/LP-TEST-AUTO-001-CLOSURE.md`
- Observacoes:
  - o gate tecnico oficial foi adotado sem dependencias novas;
  - smoke manual continua obrigatorio quando aplicavel;
  - nenhuma automacao E2E, Playwright, Vitest, Cypress ou pipeline foi criada;
  - nenhuma funcionalidade do LavaPrime foi alterada.
- Riscos remanescentes:
  - o gate nao valida fluxo visual;
  - o gate nao substitui smoke manual;
  - automacoes futuras devem ser aprovadas em fatias separadas.

### LP-WEB-005

- Status: `Concluido`
- Data: `2026-06-24`
- Arquivos alterados:
  - `app/main.js`
  - `app/utils/textFormatters.js`
  - `docs/primyo-changes/LP-WEB-005.md`
  - `docs/primyo-changes/LP-WEB-005-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-web-boundaries/WEB_EXTRACTION_ORDER.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - helpers puros extraidos para `app/utils/textFormatters.js`;
  - `app/main.js` preserva os mesmos nomes e pontos de chamada;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - `node --check app/utils/textFormatters.js` -> sucesso;
  - smoke minimo de admin, operador, patio, financeiro, documentos, logout e console -> aprovado;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-005-CLOSURE.md`.
- Observacoes:
  - nenhuma nova extracao foi iniciada no encerramento;
  - nenhuma regra de negocio foi alterada;
  - nenhum storage, Supabase, banco, Android, CSS, layout ou dependencia foi alterado nesta fase de closure.
- Riscos remanescentes:
  - o monolito segue coordenando os dominios funcionais;
  - helpers puros extraidos sao transversais e exigem cuidado em mudancas futuras;
  - o gate tecnico ainda deve ser complementado por smoke manual ou assistido.

### LP-WEB-006

- Status: `Concluido`
- Data: `2026-06-25`
- Arquivos alterados:
  - `app/main.js`
  - `app/storage/storageBoundary.js`
  - `docs/primyo-changes/LP-WEB-006.md`
  - `docs/primyo-changes/LP-WEB-006-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-web-boundaries/WEB_EXTRACTION_ORDER.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `storageBoundary` criada em `app/storage/storageBoundary.js`;
  - `loadBusinessStorageItem(...)` e `saveBusinessStorageItem(...)` preservados em `app/main.js`;
  - apenas 2 chamadas diretas simples de `localStorage` migradas;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - `node --check app/storage/storageBoundary.js` -> sucesso;
  - smoke minimo de login administrador, financeiro, documentos, logout, login operador, patio operador e console -> aprovado;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-006-CLOSURE.md`.
- Observacoes:
  - nenhuma nova migracao de `localStorage` foi iniciada na closure;
  - nenhuma regra de negocio foi alterada;
  - nenhum Supabase, banco, Android, CSS, layout ou dependencia foi alterado nesta fase.
- Riscos remanescentes:
  - o dominio de persistencia local continua majoritariamente dentro do monolito;
  - a boundary nova ainda nao substitui os wrappers de dominio;
  - o gate tecnico ainda deve ser complementado por protecao de regressao mais forte antes de novas extracoes.

### LP-TEST-AUTO-002

- Status: `Concluido`
- Data: `2026-06-25`
- Arquivos alterados:
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-tests/automation/LP-TEST-AUTO-002.md`
- Evidencias:
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - verificacao estrutural adicionada para diretorios obrigatorios, modulos criticos, imports essenciais e integridade minima das boundaries.
- Observacoes:
  - nenhuma dependencia nova foi instalada;
  - nenhum `app/main.js`, Supabase, banco, Android, CSS ou UI foi alterado nesta fase;
  - o gate continua tecnico e nao substitui smoke manual.
- Riscos remanescentes:
  - a verificacao ainda e estrutural e textual, nao semantica;
  - reorganizacoes futuras aprovadas exigirao ajuste sincronizado do gate;
  - a cobertura funcional continua dependente de smoke e futuras automacoes aprovadas.

### LP-DATA-004

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `docs/primyo-data/contracts/CONTRACT_GUIDELINES.md`
  - `docs/primyo-data/contracts/CUSTOMER_CONTRACT.md`
  - `docs/primyo-data/contracts/VEHICLE_CONTRACT.md`
  - `docs/primyo-data/contracts/SERVICE_CONTRACT.md`
  - `docs/primyo-data/contracts/PRODUCT_CONTRACT.md`
  - `docs/primyo-data/contracts/SUPPLY_CONTRACT.md`
  - `docs/primyo-data/contracts/ATTENDANCE_CONTRACT.md`
  - `docs/primyo-data/contracts/PAYMENT_CONTRACT.md`
  - `docs/primyo-data/contracts/FINANCIAL_CONTRACT.md`
- Evidencias:
  - contratos oficiais criados para Web, Android, API e Supabase;
  - consistencia cruzada revisada contra `DATA_ARCHITECTURE_DECISION.md`, dominios mestre e dominios financeiros;
  - nenhuma alteracao funcional iniciada.
- Observacoes:
  - contrato passou a significar comunicacao, nao tabela;
  - `Payment` foi formalizado como evento distinto de `CashEntry`;
  - `Financial` foi formalizado como envelope agregador, nao entidade fisica unica.
- Riscos remanescentes:
  - o legado ainda nao consome os contratos em runtime;
  - servicos seguem sem ID tecnico estavel no seed legado;
  - o gap fisico da entidade `payments` continua pendente para fases futuras.

### LP-WEB-003

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `docs/primyo-web-contracts/WEB_CONTRACT_ADAPTER_STRATEGY.md`
  - `docs/primyo-web-contracts/WEB_LEGACY_TO_CONTRACT_MAP.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_CANDIDATES.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_COMPATIBILITY_RISKS.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-changes/LP-WEB-003-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
- Evidencias:
  - estrategia de adapters definida;
  - mapa legado -> contrato documentado para `Customer`, `Vehicle`, `Service`, `Product`, `Supply`, `Attendance`, `Payment` e `Financial`;
  - candidatos, ordem de extracao, riscos e requisitos de teste documentados;
  - `npm.cmd run primyo:gate`, build e verify executados com sucesso;
  - ocorrencia operacional transitoria de lock em `dist/assets/checklist-icons` registrada e resolvida por reexecucao do gate;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-003-CLOSURE.md`.
- Observacoes:
  - nenhum adapter JS foi criado;
  - nenhum codigo funcional foi alterado;
  - Supabase, banco, Android, CSS, UI e `app/main.js` permaneceram intactos;
  - `LP-WEB-007` passa a ser a proxima fatia recomendada.
- Riscos remanescentes:
  - `clientRegistry` e `billingClients` ainda convivem como fontes paralelas;
  - `serviceSupplyProfiles` ainda depende de chave derivada por nome;
  - `Attendance`, `Payment` e `Financial` continuam sendo os dominios de maior risco para a primeira implementacao real de adapter.

### LP-WEB-007

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `app/adapters/customerAdapter.js`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-changes/LP-WEB-007.md`
  - `docs/primyo-changes/LP-WEB-007-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `customerAdapter` criado com API publica minima e sem integracao ao runtime;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - validacao conceitual registrada para entrada valida, entrada incompleta, ausencia de `document`, `contractVersion`, `organizationId` e ausencia de efeitos colaterais;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-007-CLOSURE.md`.
- Observacoes:
  - `app/main.js` permaneceu intacto;
  - nenhuma integracao funcional foi iniciada;
  - nenhum novo adapter foi criado;
  - Supabase, banco, Android, CSS, UI e dependencias permaneceram intactos;
  - `LP-DATA-005` passou a ser a fatia que consolidou o baseline transversal antes de novas implementacoes.
- Riscos remanescentes:
  - `organizationId`, `status`, `createdAt` e `updatedAt` ainda dependem de contexto externo;
  - `vehicleIds` ainda dependem de resolucao externa;
  - a integracao prematura ao runtime elevaria o risco antes da consolidacao de identidade, envelope e `legacyRefs`;
  - a duplicidade `clientRegistry` x `billingClients` permanece aberta.

### LP-DATA-005

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `docs/primyo-data/contracts/shared/CONTRACT_IDENTITY_POLICY.md`
  - `docs/primyo-data/contracts/shared/CONTRACT_ENVELOPE_STANDARD.md`
  - `docs/primyo-data/contracts/shared/ADAPTER_CONTEXT_STANDARD.md`
  - `docs/primyo-data/contracts/shared/LEGACY_REFERENCES_POLICY.md`
  - `docs/primyo-data/contracts/shared/CONTRACT_STATUS_AND_TIMESTAMP_POLICY.md`
  - `docs/primyo-data/contracts/shared/CONTRACT_COMPATIBILITY_RULES.md`
  - `docs/primyo-data/contracts/CONTRACT_GUIDELINES.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - padroes compartilhados criados para identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
  - `CONTRACT_GUIDELINES.md` atualizado para referenciar o baseline transversal;
  - requisitos de teste de adapters atualizados com validacoes de `id`, `sourceId`, `legacyRefs`, envelope, warnings e `validation`;
  - ordem de criacao de adapters atualizada com bloqueio de integracao prematura e revisao recomendada do adapter de referencia;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso.
- Observacoes:
  - nenhuma alteracao foi feita em `app/main.js`, `customerAdapter`, `storageBoundary`, `sessionAccessBoundary` ou `textFormatters`;
  - nenhuma integracao com Supabase foi iniciada;
  - a proxima fatia recomendada passa a ser `LP-WEB-007-REVISION`.
- Riscos remanescentes:
  - o `customerAdapter` ainda precisa ser alinhado em codigo ao novo envelope compartilhado;
  - `vehicleAdapter` nao deve nascer antes dessa revisao;
  - a integracao ao runtime continua prematura enquanto houver apenas um adapter puro e ainda nao revisado.

### LP-WEB-007-REVISION

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `app/adapters/customerAdapter.js`
  - `docs/primyo-changes/LP-WEB-007-REVISION.md`
  - `docs/primyo-changes/LP-WEB-007-REVISION-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `customerAdapter` revisado para aderencia a identidade, envelope, contexto, `legacyRefs`, status e timestamps compartilhados;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - validacao conceitual registrada para contexto completo, entrada incompleta, ausencia de `document`, ausencia de `organizationId`, ausencia de `now`, ausencia de `sourceId`, preservacao de `clientRegistry`, preservacao de `billingClients`, status padrao e envelope completo;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-007-REVISION-CLOSURE.md`.
- Observacoes:
  - `app/main.js` permaneceu intacto;
  - nenhuma integracao funcional foi iniciada;
  - nenhum novo adapter foi criado;
  - `customerAdapter` passa a ser o modelo oficial de referencia para adapters futuros;
  - a proxima fatia recomendada passa a ser `LP-WEB-008`.
- Riscos remanescentes:
  - `clientRegistry` e `billingClients` continuam sem deduplicacao real;
  - `vehicleIds` continuam dependendo de resolucao externa;
  - ownership de veiculos continua pendente;
  - a integracao do adapter ao runtime continua prematura nesta etapa.

### LP-WEB-008

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `app/adapters/vehicleAdapter.js`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-changes/LP-WEB-008.md`
  - `docs/primyo-changes/LP-WEB-008-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `vehicleAdapter` criado com API publica minima e sem integracao ao runtime;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node --check app/adapters/vehicleAdapter.js` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - validacao conceitual registrada para entrada valida, entrada incompleta, ausencia de placa, ausencia de ID legado estavel, ausencia de `organizationId`, ausencia de `now`, ausencia de `sourceId`, preservacao de placas antigas, preservacao de referencia de cliente legado, status padrao e envelope completo;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-008-CLOSURE.md`.
- Observacoes:
  - `app/main.js` permaneceu intacto;
  - `customerAdapter` permaneceu intacto;
  - nenhuma integracao funcional foi iniciada;
  - o programa agora possui dois adapters puros oficiais fora do runtime;
  - a proxima fatia recomendada passa a ser `LP-TEST-AUTO-003`.
- Riscos remanescentes:
  - `currentCustomerId` continua transitorio quando nasce de `currentClientId` legado;
  - `year` legado continua sem separacao oficial entre `manufactureYear` e `modelYear`;
  - `ownerHistory` continua sem contrato maduro de relacionamento;
  - integrar adapters ao runtime antes de reforcar gate e regressao continua prematuro.

### LP-TEST-AUTO-003

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `scripts/primyo-adapter-gate.mjs`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-tests/automation/LP-TEST-AUTO-003.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-changes/LP-TEST-AUTO-003-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-baseline/BASELINE_EXECUTION_REPORT.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `node --check scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node --check app/adapters/vehicleAdapter.js` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - encerramento formal registrado em `docs/primyo-changes/LP-TEST-AUTO-003-CLOSURE.md`.
- Observacoes:
  - o Adapter Contract Gate foi absorvido como parte oficial do `primyo:gate`;
  - `customerAdapter` e `vehicleAdapter` passaram a ser protegidos por regressao automatica minima;
  - nenhum adapter foi integrado ao runtime;
  - `app/main.js` permaneceu fora do escopo;
  - nenhuma dependencia nova foi instalada;
  - a proxima fatia recomendada passa a ser `LP-WEB-009`.
- Riscos remanescentes:
  - os fixtures ainda cobrem apenas a baseline minima dos dois adapters atuais;
  - um helper comum ou integracao futura ainda exigira expansao do gate;
  - `LP-WEB-009` deve continuar puro, fora do runtime e sem abrir Supabase.

### LP-WEB-009

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `app/adapters/serviceAdapter.js`
  - `scripts/primyo-adapter-gate.mjs`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-changes/LP-WEB-009.md`
  - `docs/primyo-changes/LP-WEB-009-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-baseline/BASELINE_EXECUTION_REPORT.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `serviceAdapter` criado com API publica minima e sem integracao ao runtime;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node --check app/adapters/vehicleAdapter.js` -> sucesso;
  - `node --check app/adapters/serviceAdapter.js` -> sucesso;
  - `node --check scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - validacao conceitual registrada para entrada valida, entrada incompleta, ausencia de nome, ausencia de `sourceId`, ausencia de `organizationId`, `serviceCode` derivado, `durationMinutes`, status padrao e envelope completo;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-009-CLOSURE.md`.
- Observacoes:
  - `app/main.js` permaneceu intacto;
  - `customerAdapter` e `vehicleAdapter` permaneceram intactos;
  - nenhuma integracao funcional foi iniciada;
  - o programa agora possui tres adapters puros oficiais fora do runtime;
  - a proxima fatia recomendada passa a ser `LP-WEB-ADAPTER-HELPERS-001`.
- Riscos remanescentes:
  - `sourceId` continua obrigatorio por contexto enquanto o legado de servicos nao expuser ID tecnico estavel;
  - `serviceCode` continua provisoriamente derivado quando o legado nao oferece codigo tecnico canonico;
  - `supplyProfileRefs` continua sem resolucao automatica;
  - helpers comuns, integracao funcional e abertura de Supabase continuam exigindo fatias separadas e mais maturidade da trilha.

### LP-WEB-ADAPTER-HELPERS-001

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `app/adapters/shared/adapterHelpers.js`
  - `app/adapters/customerAdapter.js`
  - `app/adapters/vehicleAdapter.js`
  - `app/adapters/serviceAdapter.js`
  - `scripts/primyo-adapter-gate.mjs`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-changes/LP-WEB-ADAPTER-HELPERS-001.md`
  - `docs/primyo-changes/LP-WEB-ADAPTER-HELPERS-001-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-baseline/BASELINE_EXECUTION_REPORT.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `adapterHelpers.js` criado como camada compartilhada minima da trilha de adapters;
  - `customerAdapter`, `vehicleAdapter` e `serviceAdapter` refatorados sem mudanca de API publica;
  - `node --check app/adapters/shared/adapterHelpers.js` -> sucesso;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node --check app/adapters/vehicleAdapter.js` -> sucesso;
  - `node --check app/adapters/serviceAdapter.js` -> sucesso;
  - `node --check scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-ADAPTER-HELPERS-001-CLOSURE.md`.
- Observacoes:
  - `app/main.js` permaneceu intacto;
  - nenhum adapter foi integrado ao runtime;
  - nenhuma mudanca funcional foi iniciada;
  - a proxima fatia recomendada passa a ser `LP-WEB-010`.
- Riscos remanescentes:
  - `serviceAdapter` continua com semantica local propria de `validation`;
  - mudancas futuras em `adapterHelpers.js` passam a impactar os tres adapters ao mesmo tempo;
  - resolver de IDs entre dominios continua pendente de fase propria;
  - integracao funcional e abertura de Supabase continuam exigindo fatias separadas.

### LP-WEB-010

- Status: `Concluido`
- Data: `2026-06-26`
- Arquivos alterados:
  - `app/adapters/productAdapter.js`
  - `scripts/primyo-adapter-gate.mjs`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-changes/LP-WEB-010.md`
  - `docs/primyo-changes/LP-WEB-010-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-baseline/BASELINE_EXECUTION_REPORT.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `productAdapter.js` criado como quarto adapter puro oficial da trilha;
  - `node --check app/adapters/shared/adapterHelpers.js` -> sucesso;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node --check app/adapters/vehicleAdapter.js` -> sucesso;
  - `node --check app/adapters/serviceAdapter.js` -> sucesso;
  - `node --check app/adapters/productAdapter.js` -> sucesso;
  - `node --check scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-010-CLOSURE.md`.
- Observacoes:
  - `app/main.js` permaneceu intacto;
  - `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `adapterHelpers` permaneceram intactos nesta closure;
  - nenhuma integracao funcional foi iniciada;
  - o programa agora possui quatro adapters puros oficiais fora do runtime;
  - a proxima fatia recomendada passa a ser `LP-WEB-011`.
- Riscos remanescentes:
  - `supplier` segue fora do ownership de primeiro nivel de `Product`;
  - `type` legado continua ambiguidade aberta enquanto `category` nao amadurecer;
  - `stockBalance` continua sendo projecao e nao trilha auditavel;
  - `supplyAdapter`, resolver de IDs cross-domain, integracao funcional e abertura de Supabase continuam exigindo fatias separadas.

### LP-WEB-011

- Status: `Concluido`
- Data: `2026-06-27`
- Arquivos alterados:
  - `app/adapters/supplyAdapter.js`
  - `scripts/primyo-adapter-gate.mjs`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-changes/LP-WEB-011.md`
  - `docs/primyo-changes/LP-WEB-011-CLOSURE.md`
  - `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
  - `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
  - `docs/primyo-baseline/BASELINE_EXECUTION_REPORT.md`
  - `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `supplyAdapter.js` criado como quinto adapter puro oficial da trilha;
  - `node --check app/adapters/shared/adapterHelpers.js` -> sucesso;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node --check app/adapters/vehicleAdapter.js` -> sucesso;
  - `node --check app/adapters/serviceAdapter.js` -> sucesso;
  - `node --check app/adapters/productAdapter.js` -> sucesso;
  - `node --check app/adapters/supplyAdapter.js` -> sucesso;
  - `node --check scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - encerramento formal registrado em `docs/primyo-changes/LP-WEB-011-CLOSURE.md`.
- Observacoes:
  - `app/main.js` permaneceu intacto;
  - `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `adapterHelpers` permaneceram intactos nesta closure;
  - nenhuma integracao funcional foi iniciada;
  - o programa agora possui cinco adapters puros oficiais fora do runtime;
  - a proxima fatia recomendada passa a ser `LP-DATA-006`.
- Riscos remanescentes:
  - `supplierName` continua restrito ao contrato `Supply` e ainda nao dialoga com ownership de fornecedor em outros dominios;
  - `stockBalance` continua sendo projecao e nao trilha auditavel;
  - relacoes entre servico e insumo ainda dependem de resolver de IDs e ownership cross-domain;
  - integracao funcional e abertura de Supabase continuam exigindo fatias separadas.

### LP-DATA-006

- Status: `Concluido`
- Data: `2026-06-27`
- Arquivos alterados:
  - `docs/primyo-data/product-supply-stock/PRODUCT_SUPPLY_STOCK_BOUNDARY.md`
  - `docs/primyo-data/product-supply-stock/PRODUCT_RULES.md`
  - `docs/primyo-data/product-supply-stock/SUPPLY_RULES.md`
  - `docs/primyo-data/product-supply-stock/STOCK_MOVEMENT_RULES.md`
  - `docs/primyo-data/product-supply-stock/SERVICE_CONSUMPTION_RULES.md`
  - `docs/primyo-data/product-supply-stock/RISKS_AND_DECISIONS.md`
  - `docs/primyo-changes/LP-DATA-006.md`
  - `docs/primyo-data/contracts/PRODUCT_CONTRACT.md`
  - `docs/primyo-data/contracts/SUPPLY_CONTRACT.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `git status --short` -> sucesso;
  - `git diff --name-only` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - fronteira oficial entre `Product`, `Supply`, `StockMovement` e consumo por servico registrada em `docs/primyo-data/product-supply-stock/`;
  - change record registrado em `docs/primyo-changes/LP-DATA-006.md`.
- Observacoes:
  - `Product` e `Supply` permaneceram separados;
  - `stockBalance` foi reafirmado como projecao observada, nao trilha auditavel;
  - nenhuma movimentacao de estoque foi implementada;
  - nenhum adapter, script ou arquivo funcional foi alterado;
  - a proxima fatia recomendada passa a ser `LP-WEB-ID-RESOLVER-001`.
- Riscos remanescentes:
  - ownership cross-domain entre servico, insumo, produto e estoque continua pendente de fase propria;
  - `StockMovement` continua apenas como entidade conceitual futura;
  - consumo por servico continua sem evento auditavel implementado;
  - integracao funcional e abertura de Supabase continuam explicitamente fora da trilha atual.

### LP-WEB-ID-RESOLVER-001

- Status: `Concluido`
- Data: `2026-06-27`
- Arquivos alterados:
  - `docs/primyo-web-contracts/id-resolution/ID_RESOLVER_STRATEGY.md`
  - `docs/primyo-web-contracts/id-resolution/ID_RESOLUTION_MAP.md`
  - `docs/primyo-web-contracts/id-resolution/LEGACY_ID_RISKS.md`
  - `docs/primyo-web-contracts/id-resolution/RESOLVER_TEST_REQUIREMENTS.md`
  - `docs/primyo-web-contracts/id-resolution/IMPLEMENTATION_READINESS.md`
  - `docs/primyo-changes/LP-WEB-ID-RESOLVER-001.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `git status --short` -> sucesso;
  - `git diff --name-only` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - estrategia e mapa de resolucao registrados em `docs/primyo-web-contracts/id-resolution/`;
  - change record registrado em `docs/primyo-changes/LP-WEB-ID-RESOLVER-001.md`.
- Observacoes:
  - nenhum resolver foi implementado;
  - nenhum adapter, script ou arquivo funcional foi alterado;
  - a fase consolidou apenas estrategia, mapa, riscos, testes e readiness;
  - a proxima fatia recomendada passa a ser `LP-WEB-ID-RESOLVER-002`.
- Riscos remanescentes:
  - a camada de resolucao continua sem implementacao real;
  - relacoes financeiras e de atendimento continuam dependendo de fases futuras de adapter e ownership;
  - integrar runtime ou Supabase antes da implementacao controlada do resolvedor continua prematuro.

### LP-WEB-ID-RESOLVER-002

- Status: `Concluido`
- Data: `2026-06-27`
- Arquivos alterados:
  - `app/adapters/shared/idResolver.js`
  - `scripts/primyo-adapter-gate.mjs`
  - `scripts/primyo-gate.mjs`
  - `docs/primyo-changes/LP-WEB-ID-RESOLVER-002.md`
  - `docs/primyo-changes/LP-WEB-ID-RESOLVER-002-CLOSURE.md`
  - `docs/primyo-web-contracts/id-resolution/IMPLEMENTATION_READINESS.md`
  - `docs/primyo-web-contracts/id-resolution/RESOLVER_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `git status --short` -> sucesso;
  - `git diff --name-only` -> sucesso;
  - `node --check app/adapters/shared/idResolver.js` -> sucesso;
  - `node --check scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - change record registrado em `docs/primyo-changes/LP-WEB-ID-RESOLVER-002.md`;
  - closure registrada em `docs/primyo-changes/LP-WEB-ID-RESOLVER-002-CLOSURE.md`.
- Observacoes:
  - o primeiro resolvedor puro de IDs passou a existir fora do runtime;
  - nenhum adapter existente foi alterado;
  - nome, placa e outros campos livres continuam proibidos como identidade oficial;
  - a proxima fatia recomendada passa a ser `LP-TEST-AUTO-004`.
- Riscos remanescentes:
  - o modulo ainda nao cobre integracao funcional com atendimento, pagamento ou financeiro;
  - o baseline oficial ainda precisara absorver o resolvedor em uma fase propria de baseline se o programa exigir propagacao adicional;
  - abrir runtime ou Supabase antes do encerramento formal continua prematuro.

### LP-TEST-AUTO-004

- Status: `Implementado`
- Data: `2026-06-27`
- Arquivos alterados:
  - `scripts/primyo-adapter-gate.mjs`
  - `docs/primyo-changes/LP-TEST-AUTO-004.md`
  - `docs/primyo-web-contracts/id-resolution/RESOLVER_TEST_REQUIREMENTS.md`
  - `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - o Adapter Gate passou a cobrir `canonicalId` com entidade correta e errada;
  - o Adapter Gate passou a cobrir `legacyRefs` validos, inexistentes e ambiguos;
  - o Adapter Gate passou a cobrir query vazia, query por `name`, query por `plate`, contrato sem `id` explicito, contratos duplicados, entradas invalidas, indice vazio e imutabilidade;
  - `node --check app/adapters/shared/idResolver.js` -> sucesso;
  - `node --check scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - change record registrado em `docs/primyo-changes/LP-TEST-AUTO-004.md`.
- Observacoes:
  - `idResolver.js` permaneceu intacto nesta fase;
  - nenhum adapter de dominio foi alterado;
  - nenhuma integracao funcional foi iniciada;
  - a proxima fatia recomendada passa a ser `LP-TEST-AUTO-004-CLOSURE`.
- Riscos remanescentes:
  - a cobertura continua local e conceitual, sem uso funcional em runtime;
  - relacoes com atendimento, pagamento e financeiro continuam fora do baseline real de uso;
  - integrar runtime ou abrir Supabase continua prematuro antes do closure formal.

### LP-WEB-INTEGRATION-READINESS-001

- Status: `Concluido`
- Data: `2026-06-28`
- Arquivos alterados:
  - `docs/primyo-web-integration/INTEGRATION_READINESS_ASSESSMENT.md`
  - `docs/primyo-web-integration/FIRST_RUNTIME_INTEGRATION_CANDIDATES.md`
  - `docs/primyo-web-integration/INTEGRATION_RISK_MATRIX.md`
  - `docs/primyo-web-integration/INTEGRATION_ROLLBACK_PLAN.md`
  - `docs/primyo-web-integration/INTEGRATION_SMOKE_TEST_PLAN.md`
  - `docs/primyo-web-integration/RECOMMENDED_FIRST_SLICE.md`
  - `docs/primyo-changes/LP-WEB-INTEGRATION-READINESS-001.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `git status --short` -> sucesso;
  - `git diff --name-only` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - readiness de runtime registrada em `docs/primyo-web-integration/`;
  - primeira fatia futura recomendada registrada como `LP-WEB-INTEGRATION-001`.
- Observacoes:
  - nenhum adapter foi alterado;
  - `idResolver` permaneceu intacto;
  - `app/main.js` permaneceu intacto;
  - a fase consolidou apenas readiness, risco, rollback, smoke e decisao da primeira integracao futura;
  - a proxima fatia recomendada passa a ser `LP-WEB-INTEGRATION-001`.
- Riscos remanescentes:
  - tocar `app/main.js` continua sendo risco alto;
  - `idResolver` ainda nao deve entrar no primeiro slice funcional;
  - veiculo, servico, produto, insumo, estoque e Supabase continuam cedo demais para a primeira integracao.

### LP-WEB-INTEGRATION-001

- Status: `Implementado`
- Data: `2026-06-28`
- Arquivos alterados:
  - `app/main.js`
  - `docs/primyo-changes/LP-WEB-INTEGRATION-001.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `git status --short` -> sucesso;
  - `git diff --name-only` -> sucesso;
  - `node --check app/main.js` -> sucesso;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - smoke manual executado em `http://127.0.0.1:4174/` com login admin, fluxo de clientes, edicao de cliente existente, abertura de novo cliente sem salvar, patio admin, logout, login operador e patio operador sem shell administrativa;
  - console do browser sem `warn` ou `error`.
- Observacoes:
  - `customerAdapter` passou a rodar apenas em leitura/sombra na edicao de cliente existente;
  - o resultado adaptado ficou restrito a memoria local em `lastCustomerShadowReadReport`;
  - renderizacao, populacao de formulario e salvamento continuaram no caminho legado;
  - `idResolver` permaneceu fora do runtime;
  - UI, persistencia, Supabase, banco, Android e CSS permaneceram intactos;
  - a proxima fatia recomendada passa a ser `LP-WEB-INTEGRATION-001-CLOSURE`.
- Riscos remanescentes:
  - esta continua sendo a primeira alteracao real em `app/main.js` da trilha de adapters;
  - clientes PF sem documento seguem invalidos para o contrato oficial, por isso a sombra nao pode virar dependencia funcional nesta etapa;
  - qualquer expansao para escrita, `idResolver`, veiculo, servico, produto, insumo, estoque, financeiro ou Supabase continua exigindo closure formal e nova decisao de slice.

### LP-WEB-INTEGRATION-002

- Status: `Implementado`
- Data: `2026-06-28`
- Arquivos alterados:
  - `app/main.js`
  - `docs/primyo-changes/LP-WEB-INTEGRATION-002.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - o `shadow read` do cliente passou a manter snapshot e historico curto em `window.__lavaprimeCustomerShadowReadDiagnostics`;
  - o diagnostico passou a registrar cliente analisado, sucesso/falha, motivo, campos obrigatorios ausentes, tipo, presenca de documento, timestamp, rollback e confirmacao de legado ativo;
  - `node --check app/main.js` -> sucesso;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - smoke manual do fluxo de clientes executado com admin em `Clientes`, edicao de `Frota Prime Ltda`, `Novo cliente`, logout, login operador e console limpo.
- Observacoes:
  - o legado continua fonte ativa de renderizacao e salvamento;
  - `Novo cliente` continua sem disparar `shadow read`;
  - `idResolver` permaneceu fora do runtime;
  - UI, persistencia, Supabase, banco, Android e CSS permaneceram intactos;
  - a proxima fatia recomendada passa a ser `LP-WEB-INTEGRATION-002-CLOSURE`.
- Riscos remanescentes:
  - qualquer crescimento adicional em `app/main.js` sem closure aumentaria o risco da primeira trilha funcional;
  - clientes PF sem documento continuam podendo gerar falha contratual esperada na sombra;
  - o diagnostico em memoria nao pode virar persistencia, telemetria externa ou dependencia funcional;
  - `idResolver`, escrita via adapter, outros dominios e Supabase continuam fora da ordem segura.

### LP-WEB-INTEGRATION-004

- Status: `Implementado`
- Data: `2026-06-28`
- Arquivos alterados:
  - `app/adapters/customerAdapter.js`
  - `app/main.js`
  - `scripts/primyo-adapter-gate.mjs`
  - `docs/primyo-changes/LP-WEB-INTEGRATION-004.md`
  - `docs/primyo-web-integration/CUSTOMER_LEGACY_DATA_VALIDATION.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `node --check app/main.js` -> sucesso;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - validacao tecnica da base `clientRegistry` registrou `5` clientes analisados, `5` registros `demo/teste`, `5` clientes estruturalmente compativeis, `2` documentos opcionais ausentes em clientes comuns e `0` bloqueios de faturamento por documento;
  - massa atual confirmada como seed embutido em `app/main.js`, nao base real pronta para Supabase.
- Observacoes:
  - a nova rotina roda apenas em `renderClientsScreen(container)` e alimenta somente `window.__lavaprimeCustomerLegacyDataValidation`;
  - `document` deixou de bloquear cliente comum e continua bloqueando apenas cliente faturado;
  - `customerAdapter` continua fora da escrita e o legado continua fonte ativa;
  - os seeds continuam ligados a `billingClients`, `billingInvoices`, `invoiceLineItems`, `vehicleRegistry`, `patioVehicles`, `openPayments`, dashboard e relatorios;
  - lista, formulario, save, permissao e UI permaneceram no caminho legado;
  - `idResolver` permaneceu fora do runtime;
  - nenhuma remocao de massa demo/teste foi executada nesta fase;
  - a proxima fatia recomendada passa a ser `LP-WEB-DATA-CLEANUP-001`.
- Riscos remanescentes:
  - a massa demo/teste ainda sustenta partes visuais e operacionais do legado;
  - `clientRegistry` e `billingClients` seguem paralelos no legado;
  - o diagnostico em memoria nao pode virar persistencia nem telemetria;
  - qualquer limpeza sem microfatiamento ainda pode quebrar patio, faturamento, pagamentos, dashboard ou relatorios.

### LP-WEB-DATA-CLEANUP-001

- Status: `Implementado`
- Data: `2026-06-29`
- Arquivos alterados:
  - `app/main.js`
  - `app/demo/lavaprimeDemoData.js`
  - `docs/primyo-changes/LP-WEB-DATA-CLEANUP-001.md`
  - `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `node --check app/main.js` -> sucesso;
  - `node --check app/adapters/customerAdapter.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso;
  - `npm.cmd run verify:build` -> sucesso;
  - smoke rapido com dashboard, `Cadastros > Clientes`, patio e financeiro sem erro bloqueante;
  - massa central confirmada como seed `demo/teste` isolada em modulo dedicado.
- Observacoes:
  - a remocao de seed continua bloqueada nesta fatia;
  - o legado continua fonte ativa;
  - a extracao ficou restrita ao isolamento tecnico da massa demo principal;
  - `quoteEstimates` e outros mocks paralelos permaneceram fora desta microfatia.
- Riscos remanescentes:
  - dashboard, patio, financeiro e relatorios ainda dependem da massa demo isolada;
  - ainda nao existe bootstrap limpo separado do bootstrap demo;
  - qualquer remocao prematura continua com risco de quebra operacional;
  - Supabase continua bloqueado ate a segregacao entre ambiente demo e ambiente limpo.

### LP-WEB-DATA-CLEANUP-002

- Status: `Implementado`
- Data: `2026-06-29`
- Arquivos alterados:
  - `app/main.js`
  - `app/demo/lavaprimeBootstrapMode.js`
  - `app/demo/lavaprimeCleanBootstrap.js`
  - `docs/primyo-changes/LP-WEB-DATA-CLEANUP-002.md`
  - `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `node --check app/main.js` -> sucesso;
  - `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
  - `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
  - `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
  - `npm.cmd run verify:build` -> sucesso;
  - smoke rapido em `http://127.0.0.1:4174/` com dashboard, clientes, patio, financeiro, relatorios, logout e patio operador sem erro bloqueante no console.
- Observacoes:
  - a segregacao ficou restrita ao bootstrap, sem trocar o modo padrao do runtime;
  - `DEMO_BOOTSTRAP` continua ativo por padrao;
  - `CLEAN_BOOTSTRAP` existe apenas como placeholder seguro e protegido;
  - nenhuma seed demo foi removida;
  - Supabase continua fechado.
- Riscos remanescentes:
  - dashboard, clientes, patio, financeiro e relatorios continuam dependentes da seed demo;
  - o bootstrap limpo ainda nao foi exercitado como modo alternativo;
  - qualquer troca de padrao sem fallback protegido continua arriscada.

### LP-WEB-DATA-CLEANUP-003

- Status: `Implementado`
- Data: `2026-06-29`
- Arquivos alterados:
  - `app/main.js`
  - `app/demo/lavaprimeCleanBootstrap.js`
  - `docs/primyo-changes/LP-WEB-DATA-CLEANUP-003.md`
  - `docs/primyo-web-integration/CLEAN_BOOTSTRAP_DEPENDENCY_REVIEW.md`
  - `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `node --check app/main.js` -> sucesso;
  - `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
  - `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
  - `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
  - `npm.cmd run verify:build` -> sucesso;
  - readiness protegido em memoria confirma dependencia residual de dashboard, clientes, veiculos, patio, financeiro, faturas, pagamentos, relatorios e documentos.
- Observacoes:
  - `DEMO_BOOTSTRAP` continua como modo padrao oficial;
  - `CLEAN_BOOTSTRAP` segue protegido e nao ativo por padrao;
  - nenhuma seed demo foi removida;
  - smoke rapido em `http://127.0.0.1:4174/` manteve dashboard, clientes, patio, financeiro, documentos, logout e patio operador funcionais;
  - Supabase permanece fechado.
- Riscos remanescentes:
  - as superficies criticas continuam dependentes da seed demo;
  - o bootstrap limpo ainda nao suporta troca de padrao;
  - qualquer remocao sem hardening de fallback ainda pode quebrar runtime e smoke.

### LP-WEB-DATA-CLEANUP-004

- Status: `Implementado`
- Data: `2026-06-29`
- Arquivos alterados:
  - `app/main.js`
  - `docs/primyo-changes/LP-WEB-DATA-CLEANUP-004.md`
  - `docs/primyo-web-integration/CLEAN_BOOTSTRAP_FALLBACK_PLAN.md`
  - `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `node --check app/main.js` -> sucesso;
  - `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
  - `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
  - `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
  - `npm.cmd run verify:build` -> sucesso;
  - smoke rapido com dashboard, clientes, patio, financeiro, documentos, logout admin e patio operador sem erro bloqueante.
- Observacoes:
  - a fase endurece fallback estrutural sem trocar o bootstrap padrao;
  - `DEMO_BOOTSTRAP` continua ativo por padrao;
  - `CLEAN_BOOTSTRAP` continua protegido e nao ativo;
  - nenhuma seed demo foi removida.
- Riscos remanescentes:
  - dashboard, patio, relatorios e documentos continuam semanticamente dependentes da seed demo;
  - os vinculos cross-domain continuam sendo o maior bloqueio para trial limpo;
  - um trial protegido ainda e necessario antes de qualquer troca de padrao.

### LP-WEB-DATA-CLEANUP-005

- Status: `Implementado`
- Data: `2026-06-29`
- Arquivos alterados:
  - `app/main.js`
  - `app/demo/lavaprimeCleanBootstrap.js`
  - `docs/primyo-changes/LP-WEB-DATA-CLEANUP-005.md`
  - `docs/primyo-web-integration/CLEAN_BOOTSTRAP_TRIAL_READINESS.md`
  - `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `node --check app/main.js` -> sucesso;
  - `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
  - `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
  - `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
  - `npm.cmd run verify:build` -> sucesso;
  - smoke rapido com dashboard, clientes, patio, financeiro, documentos, logout admin e patio operador sem erro bloqueante.
- Observacoes:
  - a fase prepara readiness de trial sem executar o bootstrap limpo;
  - `DEMO_BOOTSTRAP` continua ativo por padrao;
  - `CLEAN_BOOTSTRAP` continua protegido e nao ativo;
  - nenhuma seed demo foi removida.
- Riscos remanescentes:
  - dashboard, patio, relatorios e documentos continuam semanticamente dependentes da seed demo;
  - o trial protegido ainda nao foi executado de fato;
  - os vinculos cross-domain continuam sendo o maior bloqueio para qualquer promocao do modo limpo.

### LP-WEB-DATA-CLEANUP-006

- Status: `Implementado`
- Data: `2026-06-29`
- Arquivos alterados:
  - `app/main.js`
  - `app/demo/lavaprimeCleanBootstrap.js`
  - `docs/primyo-changes/LP-WEB-DATA-CLEANUP-006.md`
  - `docs/primyo-web-integration/CLEAN_BOOTSTRAP_TRIAL_EXECUTION.md`
  - `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- Evidencias:
  - `node --check app/main.js` -> sucesso;
  - `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
  - `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
  - `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
  - `node scripts/primyo-adapter-gate.mjs` -> sucesso;
  - `npm.cmd run primyo:gate` -> sucesso;
  - `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
  - `npm.cmd run verify:build` -> sucesso;
  - smoke rapido com dashboard, clientes, patio, financeiro, documentos, logout admin e patio operador sem erro bloqueante.
- Observacoes:
  - o trial protegido foi executado apenas como diagnostico tecnico;
  - `DEMO_BOOTSTRAP` continua ativo por padrao;
  - `CLEAN_BOOTSTRAP` continua protegido e nao ativo;
  - nenhuma seed demo foi removida;
  - a inspecao visual do browser nao expôs os objetos globais tecnicos de trial/readiness.
- Riscos remanescentes:
  - `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` continuam bloqueando qualquer promocao do modo limpo;
  - a observabilidade do trial no browser continua limitada;
  - Supabase continua fora de escopo.
