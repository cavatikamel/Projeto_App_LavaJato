# LP-ANDROID-001

- Change ID: `LP-ANDROID-001`
- Backlog ID: `LP-ANDROID-001`
- Titulo: Auditoria de baseline do app Android nativo e alinhamento de governanca
- Objetivo: auditar o estado atual do `LavaPrimeAndroidApp` e alinhar a trilha Android ao Primyo Transformation Program sem implementar funcionalidade nova
- Motivo da mudanca: a base Android ja existe e evoluiu fora do baseline documental principal; era necessario consolidar stack, riscos, build, paridade e direcao antes de qualquer proxima fase mobile
- Area afetada: `Android`, `Docs`, `Governanca`
- Arquivos afetados:
  - `docs/primyo-android/ANDROID_APP_STRATEGY.md`
  - `docs/primyo-android/ANDROID_ARCHITECTURE.md`
  - `docs/primyo-android/ANDROID_OFFLINE_FIRST.md`
  - `docs/primyo-android/ANDROID_SYNC_STRATEGY.md`
  - `docs/primyo-android/ANDROID_PRINTING_STRATEGY.md`
  - `docs/primyo-android/ANDROID_WEB_PARITY_MAP.md`
  - `docs/primyo-android/ANDROID_SECURITY_MODEL.md`
  - `docs/primyo-android/ANDROID_TEST_PLAN.md`
  - `docs/primyo-android/ANDROID_ROADMAP.md`
  - `docs/primyo-changes/LP-ANDROID-001.md`
  - `docs/primyo-changes/LP-ANDROID-001-CLOSURE.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
- Risco: `Alto`
- Dependencias:
  - `LP-DATA-001`
  - `LP-DATA-004`
  - `LP-WEB-003`
  - `LP-TEST-003`
- Responsavel: `Codex`
- Aprovador tecnico: `Kamel / Primyo`
- Data: `2026-06-30`

## Escopo

- auditar `LavaPrimeAndroidApp/**` em modo leitura;
- registrar tecnologia, modulos, dependencias, versoes, telas, estado visual, build e riscos;
- criar baseline documental inicial em `docs/primyo-android/`;
- propagar a fase em backlog e change control.

## Fora de escopo

- alterar qualquer arquivo em `LavaPrimeAndroidApp/**`;
- implementar telas novas;
- refatorar o app;
- abrir Supabase;
- criar sync remoto real;
- criar impressao real;
- alterar `app/main.js`, `app/styles.css`, `scripts/**`, migracoes Supabase ou fluxo Web.

## Diagnostico consolidado

### Tecnologia atual

- app nativo `Kotlin` + `Jetpack Compose` + `Material 3`;
- `Room` com `KSP` e banco local `lavaprime.db`;
- `StateFlow` e `ViewModel` por dominio;
- wrapper Gradle disponivel;
- `Compose Navigation` presente como dependencia, mas sem `NavHost` observado;
- `WorkManager` presente, mas sem rotina remota real em uso.

### Estrutura de modulos

- um unico modulo Android `:app`;
- `Application` monta dependencias manualmente;
- `Repository` centraliza seed, login demo, cadastros, patio, auditoria e fila;
- `ui/screens`, `ui/viewmodel`, `data/local`, `data/model` e `sync` organizam a base.

### Versoes principais observadas

- Android Gradle Plugin `8.7.3`;
- Kotlin `2.0.21`;
- Gradle Wrapper `9.3.0`;
- `compileSdk` e `targetSdk` `35`;
- `minSdk` `26`;
- `versionCode` `9`;
- `versionName` `LavaPrime_Mobile_V1.09`;
- `Room` `2.6.1`;
- `Navigation Compose` `2.8.3`;
- `WorkManager` `2.10.0`.

### Telas existentes

- existentes e dedicadas: splash, institucional, login, dashboard, patio, clientes e veiculos, produtos e seguranca/sync;
- parcialmente prontas: shell, drawer, perfil admin/operador, dialog de novo atendimento;
- placeholder: agendamentos, servicos, financeiro, relatorios e meu negocio.

### Estado visual atual

- forte alinhamento visual com o LavaPrime Web: azul, agua, fundo claro, cards arredondados, drawer lateral e patio central para operador;
- estado visual mais maduro do que o estado funcional de alguns modulos;
- validacao em dispositivo nao foi executada nesta fase.

### Build e ambiente

- `gradlew` e `gradlew.bat` existem;
- tentativa de `gradlew tasks --no-daemon --console=plain` falhou;
- erro registrado: lock no download da toolchain JetBrains JDK `21` em `C:\\Users\\kamel\\.gradle\\jdks\\...lock`;
- processo dono do lock observado: `java` PID `28112`;
- `java -version` do shell atual retorna `OpenJDK 17.0.19`;
- conclusao: o baseline de build ficou `nao validado` nesta fase.

### Relacao atual com o LavaPrime Web

- o web continua como referencia funcional e visual;
- o Android nao consome ainda os contratos oficiais do programa;
- a base mobile usa seed local e login demo, portanto ainda vive como modelo paralelo controlado;
- o app esta preparado para futuro backend compartilhado, mas ainda nao converge de verdade com o estado do web.

### Pontos de desalinhamento com nativo, offline-first e Supabase futuro

- `fallbackToDestructiveMigration()` contradiz o objetivo de replica offline duravel;
- `SyncCoordinator` ainda nao implementa push/pull real;
- `SyncWorker` existe sem agendamento observado;
- `security-crypto` esta presente sem uso funcional encontrado;
- os modelos locais ainda nao mostram `contractVersion`, `legacyRefs` ou camada de mapeamento aos contratos oficiais;
- varios modulos do menu ainda sao apenas placeholder;
- auth real, membership e ownership remoto ainda nao entraram no runtime Android.

## Plano de implementacao

1. mapear a base Android em modo leitura;
2. registrar baseline tecnico e arquitetural;
3. registrar baseline de offline, sync, seguranca, paridade e impressao;
4. propagar a fase em backlog e change control sem alterar baseline global do web.

## Plano de teste

- listar estrutura do projeto Android;
- identificar arquivos Gradle, wrapper e package;
- identificar versoes principais;
- verificar `Compose`, `Room`, `ViewModel`, `Flow` e `Navigation`;
- tentar `gradlew tasks`;
- registrar falha integral se ocorrer;
- registrar smoke manual como `Nao validado` quando nao houver execucao em dispositivo.

## Plano de rollback

1. remover `docs/primyo-android/`;
2. reverter `docs/primyo-changes/LP-ANDROID-001.md` e `docs/primyo-changes/LP-ANDROID-001-CLOSURE.md`;
3. reverter as entradas desta fase em `ADEQUATION_BACKLOG.md` e `CHANGE_CONTROL.md`;
4. reexecutar `git status --short`, `git diff --name-only` e `npm.cmd run primyo:gate`.

## Resultado da validacao

- auditoria documental concluida;
- baseline Android registrado;
- nenhuma alteracao funcional no app Android foi feita;
- `npm.cmd run primyo:gate` aprovado;
- validacao de build ficou bloqueada por lock externo na toolchain do Gradle;
- smoke manual ficou `Nao validado` por ausencia de execucao em aparelho/emulador.

## Evidencias anexadas

- `LavaPrimeAndroidApp/build.gradle.kts`
- `LavaPrimeAndroidApp/app/build.gradle.kts`
- `LavaPrimeAndroidApp/settings.gradle.kts`
- `LavaPrimeAndroidApp/gradle/wrapper/gradle-wrapper.properties`
- `LavaPrimeAndroidApp/README.md`
- `LavaPrimeAndroidApp/app/src/main/AndroidManifest.xml`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/LavaPrimeDatabase.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/repository/LavaPrimeRepository.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/LavaPrimeRoot.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/navigation/AppNavigationModels.kt`

## Resultado de npm.cmd run primyo:gate

- `Aprovado`
- resumo: `Gate Result: SUCCESS`
- observacao: o warning nao bloqueante de chunk acima de `500 kB` permaneceu no build web, sem relacao com o escopo Android desta fase.

## Decisao final

- `Aprovado com ressalva`
- ressalvas:
  - build Android nao validado;
  - app nao executado manualmente;
  - trilha Android segue dependente de fase dedicada para dados e migracoes.
