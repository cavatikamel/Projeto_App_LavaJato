# Android Architecture

## Objetivo

Registrar a arquitetura observada em `LavaPrimeAndroidApp` e a direcao de consolidacao tecnica apos `LP-ANDROID-002`.

## Stack e runtime atual

- modulo unico: `:app`;
- `com.android.application` `8.7.3`;
- `Kotlin` `2.0.21`;
- `Compose BOM` `2024.10.01`;
- `Room` `2.6.1` com `KSP`;
- `Navigation Compose` `2.8.3` apenas como dependencia, sem `NavHost` em uso;
- `WorkManager` `2.10.0` preparado, sem agendamento observado;
- `security-crypto` `1.1.0-alpha06` presente, sem uso funcional observado;
- `compileSdk` e `targetSdk` `35`;
- `minSdk` `26`;
- `applicationId` e `namespace`: `br.com.primyo.lavaprime`.

## Estrutura observada

- `MainActivity.kt`: entrada Compose unica.
- `LavaPrimeApp.kt`: monta `database`, `repository`, `connectivityMonitor`, `supabaseConfig` e `syncCoordinator`.
- `ui/screens/`: telas e shell principal.
- `ui/viewmodel/`: `AuthViewModel`, `PatioViewModel`, `CadastroViewModel`, `SyncViewModel`.
- `data/model/`: entidades Room e enums de dominio local.
- `data/local/`: `RoomDatabase`, `Dao`s e `Converters`.
- `data/repository/`: `LavaPrimeRepository` com seed local, login demo, cadastro, patio, auditoria e fila.
- `sync/`: conectividade, configuracao Supabase, politica `last write wins`, `SyncWorker` e coordenador.

## Fluxo de UI atual

- `AppStage` controla `SPLASH`, `INICIAL`, `LOGIN` e `APP`;
- a navegacao interna do app autenticado usa `enum MobileRoute` e `mutableStateOf(route)`;
- nao ha back stack formal, deep links, nested graphs nem restauracao de grafo de navegacao;
- o filtro por perfil acontece no drawer, ocultando rotas `adminOnly` para `Operador`.

## Estado atual por modulo

- real: `Dashboard`, `Patio`, `Clientes e veiculos`, `Produtos e insumos`, `Seguranca e sincronizacao`;
- parcial: login, perfis, shell, drawer, sync status;
- placeholder: `Agendamentos`, `Servicos`, `Financeiro`, `Relatorios`, `Meu negocio`.

## Persistencia observada

- banco local `lavaprime.db`;
- schema exportado em `app/schemas/.../2.json`;
- entidades locais: `usuarios`, `clientes`, `veiculos`, `servicos`, `produtos`, `atendimentos`, `audit_logs`, `sync_queue`;
- migracoes versionadas nao foram encontradas;
- `fallbackToDestructiveMigration()` continua ativo.

## Modelo de dados real por tela

- `DashboardScreen` combina `repository.produtos`, `patioState.atendimentos` e `syncState`;
- `PatioScreen` e `PatioViewModel` operam sobre `AtendimentoEntity` e `ServicoEntity`;
- `CadastrosScreen` e `CadastroViewModel` operam sobre `ClienteEntity` e `VeiculoEntity`;
- `ProductsScreen` le `ProdutoEntity` em modo somente leitura;
- `SecuritySyncScreen` consome `SyncQueueEntity`, `AuditLogEntity`, conectividade e runtime de sync.

## Desalinhamentos estruturais de dados

- nao existe entidade Android propria para `Payment`, `Financial`, `Document`, `Quote` ou configuracao de empresa;
- `ProdutoEntity` mistura catalogo comercial com pseudo-insumo via campo `tipo`, sem fronteira contratual propria para `Supply`;
- `AtendimentoEntity` guarda snapshots de nome e placa, mas nao possui colecoes locais para servicos executados, produtos consumidos, historico de status nem refs financeiras;
- `SyncQueueEntity` registra apenas texto resumido de mutacao e nao o envelope contratual oficial com `contractVersion`, `sourceId`, `legacyRefs` e `validation`;
- `empresaId` local continua servindo como marcador demo e nao como tenancy oficial alinhada a `organizationId`.

## Pontos fortes

- base pequena e legivel;
- fluxo offline local ja existente;
- separacao basica entre UI, estado, persistencia e sync;
- dados locais ja carregam `empresaId`, `syncStatus` e `updatedAt`.

## Pontos de fragilidade

- modulo unico concentra toda a superficie mobile;
- nao existe camada formal de contratos/mappers entre modelo local e modelo oficial do programa;
- navegacao e DI ainda sao manuais;
- sem testes automatizados observados;
- sync remoto e agendamento real ainda nao entraram em runtime;
- a arquitetura local ainda nao separa claramente `id` canonico, `sourceId` e referencias legadas por dominio.

## Direcao arquitetural recomendada

1. preservar o modulo unico por enquanto, mas separar melhor por feature dentro dele;
2. introduzir camada explicita de contratos Android <-> backend antes de sync real;
3. substituir migracao destrutiva por plano versionado e testavel;
4. manter `Room` como cache offline e fila local, nunca como verdade compartilhada;
5. separar `Product` de `Supply`, `Attendance` de `Payment` e configuracao de empresa da seed demo antes de imprimir ou sincronizar de verdade;
6. usar `docs/primyo-android/ANDROID_DATA_PARITY_MATRIX.md` como mapa oficial de convergencia.
