# LP APK Android Reuse Matrix

## Objetivo

Classificar cada parte relevante do `LavaPrimeAndroidApp` como `keep`, `refactor`, `replace` ou `archive` antes da reconstrucao oficial do APK.

| Area | Arquivos principais | Funcao atual | Status atual | Paridade Web | Paridade visual | Risco tecnico | Risco de dados | Decisao | Justificativa | Fase futura responsavel |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Gradle/build | `settings.gradle.kts`, `build.gradle.kts`, `app/build.gradle.kts` | define stack, plugins, env vars e schema export | `usable` | `n/a` | `n/a` | `medium` | `low` | `keep` | stack moderna e projeto unico funcionam; ajustes futuros devem ser incrementais | `LP-APK-005` |
| Manifest/app label/icon | `AndroidManifest.xml`, `mipmap-anydpi/**` | label, theme e launcher entry | `partial` | `partial` | `weak` | `medium` | `low` | `refactor` | manifest esta aceitavel, mas iconografia e tema de entrada nao usam baseline oficial completa | `LP-APK-003`, `LP-APK-005`, `LP-APK-006` |
| Material_Visual | `Material_Visual/**` | referencia oficial de marca | `usable` | `n/a` | `partial` | `low` | `low` | `keep` | assets oficiais existem e devem virar fonte unica de identidade | `LP-APK-003` |
| Theme/design system | `ui/theme/**` | paleta, tipografia e tema base Compose | `partial` | `partial` | `partial` | `medium` | `low` | `refactor` | boa direcao de paleta, mas ainda sem baseline oficial fechada nem tokens finais | `LP-APK-005` |
| Componentes reutilizaveis | `ui/components/LavaPrimeComponents.kt` | shell de cards, buttons, drawer, top bar e chips | `usable` | `partial` | `partial` | `medium` | `low` | `refactor` | varios componentes sao aproveitaveis, mas estao acoplados a rotas e placeholders atuais | `LP-APK-005` |
| Navegacao/root | `ui/navigation/AppNavigationModels.kt`, `ui/screens/LavaPrimeRoot.kt` | stages, drawer, selecao de rota e shell principal | `partial` | `partial` | `partial` | `medium` | `low` | `refactor` | existe shell funcional, mas a estrutura final precisa refletir fases e modulos oficiais | `LP-APK-008` |
| Splash | `ui/screens/AuthScreens.kt` | splash e entrada inicial | `partial` | `partial` | `weak` | `low` | `low` | `refactor` | ha fluxo inicial real, mas os assets e o comportamento ainda nao estao alinhados a baseline visual final | `LP-APK-006` |
| Initial screen | `ui/screens/AuthScreens.kt` | tela inicial antes do login | `partial` | `partial` | `partial` | `low` | `low` | `refactor` | conceito e util, mas texto e hierarquia ainda sao provisoria | `LP-APK-006` |
| Login/perfis | `ui/screens/AuthScreens.kt`, `ui/viewmodel/AuthViewModel.kt` | auth local demo e perfil admin/operador | `risky` | `partial` | `partial` | `high` | `medium` | `replace` | UX pode inspirar a versao futura, mas auth heuristica e defaults demo nao servem como fundacao final | `LP-APK-007` |
| Dashboard | `ui/screens/DashboardScreen.kt` | resumo local de patio, estoque critico e fila sync | `partial` | `partial` | `partial` | `medium` | `medium` | `refactor` | ha shell funcional, mas os dados e cards ainda nao refletem a profundidade do Web | `LP-APK-009` |
| Drawer/menu | `ui/components/LavaPrimeComponents.kt` | navegacao lateral e contexto do usuario | `usable` | `partial` | `partial` | `medium` | `low` | `refactor` | estrutura e reutilizavel, mas precisa ser afinada com modulos e hierarquia final | `LP-APK-008` |
| Patio | `ui/screens/PatioScreen.kt`, `ui/viewmodel/PatioViewModel.kt` | lista operacional, filtros e atendimento rapido | `partial` | `partial` | `partial` | `medium` | `medium` | `refactor` | e a melhor tela operacional atual, mas cobre apenas parte da rotina real do Web | `LP-APK-010`, `LP-APK-011`, `LP-APK-012`, `LP-APK-013` |
| Novo atendimento rapido | `ui/screens/PatioScreen.kt`, `LavaPrimeRepository.kt` | cria cliente, veiculo e atendimento simples | `risky` | `partial` | `partial` | `high` | `high` | `refactor` | ideia util, mas modelo atual e simplificado demais para atendimento completo | `LP-APK-011` |
| Clientes/veiculos | `ui/screens/CadastrosScreen.kt`, `ui/viewmodel/CadastroViewModel.kt` | cadastro combinado de cliente e veiculo | `weak` | `weak` | `partial` | `high` | `high` | `replace` | conflita com a separacao funcional e com os contratos oficiais do Web | `LP-APK-014`, `LP-APK-015` |
| Produtos/insumos | `ui/screens/ProductsScreen.kt`, `ProdutoEntity` | lista simples com tipo e estoque | `weak` | `weak` | `partial` | `high` | `high` | `replace` | mistura produto e insumo e nao cobre catalogo, uso, estoque e contexto corretos | `LP-APK-017`, `LP-APK-018` |
| Security/sync screen | `ui/screens/SecuritySyncScreen.kt`, `ui/viewmodel/SyncViewModel.kt` | status local de sync, auditoria e checklist | `partial` | `partial` | `partial` | `medium` | `medium` | `refactor` | boa shell de observabilidade, mas o motor de sync ainda e apenas demonstrativo | `LP-APK-028`, `LP-APK-029` |
| Room database | `data/local/LavaPrimeDatabase.kt` | banco local principal | `risky` | `weak` | `n/a` | `critical` | `critical` | `replace` | `fallbackToDestructiveMigration()` e schema curto tornam a fundacao insegura para evolucao real | `LP-APK-027` |
| Entities/models | `data/model/Models.kt` | entidades locais e enums centrais | `risky` | `weak` | `n/a` | `critical` | `critical` | `replace` | faltam dominios, envelope de sync e separacao alinhada aos contratos | `LP-APK-004`, `LP-APK-027` |
| DAOs | `data/local/Daos.kt` | CRUD local por entidade | `weak` | `weak` | `n/a` | `high` | `high` | `replace` | DAOs refletem o schema atual e precisam nascer junto com o novo modelo Room | `LP-APK-027` |
| Repository | `data/repository/LavaPrimeRepository.kt` | monolito local com auth demo, seed, CRUD e sync | `risky` | `weak` | `n/a` | `critical` | `critical` | `replace` | camada mistura responsabilidades demais e nao suporta a arquitetura final por feature/domain | `LP-APK-008`, `LP-APK-011` a `LP-APK-029` |
| sync_queue | `SyncQueueEntity`, `SyncQueueDao` | fila local por entidade/operacao | `partial` | `partial` | `n/a` | `medium` | `medium` | `refactor` | conceito esta correto, mas envelope, payload e politicas ainda sao rasos | `LP-APK-028` |
| SyncWorker/WorkManager | `sync/SyncWorker.kt` | agenda tentativa de sync | `partial` | `partial` | `n/a` | `medium` | `medium` | `refactor` | hook tecnico e util, mas faltam retry real, resultado e integracao remota | `LP-APK-028` |
| Audit logs | `AuditLogEntity`, `AuditLogDao` | trilha minima de mudancas locais | `partial` | `partial` | `n/a` | `medium` | `medium` | `refactor` | fundamento util, mas ainda sem cobertura de eventos e envelope final de auditoria | `LP-APK-029` |
| Schemas | `app/schemas/**` | snapshot Room exportado | `partial` | `partial` | `n/a` | `high` | `high` | `refactor` | schema export existe, mas sem historico de migracoes nem testes associados | `LP-APK-027` |
| Sync coordinator/config | `sync/SyncCoordinator.kt`, `sync/SupabaseRuntimeConfig.kt`, `sync/LastWriteWinsPolicy.kt` | readiness local para sync futuro | `weak` | `partial` | `n/a` | `high` | `high` | `refactor` | comunica intencao futura, mas nao pode ser tratado como motor de sync pronto | `LP-APK-028` |
| Connectivity monitor | `sync/ConnectivityMonitor.kt` | detecta online/offline via Flow | `usable` | `aligned` | `n/a` | `low` | `low` | `keep` | utilitario tecnico solido e pouco acoplado ao modelo parcial atual | `LP-APK-028` |
| Testes | `app/src/test/**`, `app/src/androidTest/**` | cobertura automatizada Android | `not-found` | `n/a` | `n/a` | `high` | `high` | `replace` | nao ha base minima de testes para sustentar rebuild seguro | `LP-APK-030` |
| Documentacao Android existente | `docs/primyo-android/**`, `docs/PROMPT_CODEX_CONTINUACAO.md` | baseline e estrategia documental | `usable` | `partial` | `partial` | `low` | `low` | `keep` | documentacao atual ajuda a orientar a trilha e nao deve ser descartada | `LP-APK-003`, `LP-APK-004` |
| Placeholders de modulo | `ModuleScreen`, rotas `AGENDAMENTOS`, `SERVICOS`, `FINANCEIRO`, `RELATORIOS`, `CONFIG` | telas casca sem regra real | `weak` | `weak` | `partial` | `medium` | `low` | `archive` | devem deixar de ser tratados como progresso funcional do produto | `LP-APK-005` a `LP-APK-026` |
| Seed e heuristica demo | `seedInicial()`, `loginDemo()` | massa local de demonstracao e auth simulada | `risky` | `weak` | `n/a` | `critical` | `high` | `archive` | uteis apenas como checkpoint de auditoria; nao devem guiar a fundacao final | `LP-APK-007`, `LP-APK-027` |

## Resumo executivo

- `keep`: stack Gradle, `Material_Visual`, monitor de conectividade, parte da documentacao.
- `refactor`: shell visual, navegacao, patio, dashboard, sync screen e componentes.
- `replace`: Room, modelos, DAOs, repositorio, auth demo, cadastros combinados e catalogo produto/insumo.
- `archive`: placeholders de modulo e seed/demo heuristica como base de produto.
