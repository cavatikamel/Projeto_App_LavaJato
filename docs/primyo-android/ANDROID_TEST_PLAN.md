# Android Test Plan

## Objetivo

Consolidar o baseline minimo de validacao Android apos a auditoria `LP-ANDROID-001`.

## Validacoes executadas nesta fase

- estrutura de `LavaPrimeAndroidApp` listada;
- arquivos Gradle e wrapper identificados;
- `applicationId` e `namespace` identificados;
- versoes principais de Android Gradle Plugin, Kotlin, Compose, Room, Navigation, WorkManager e Gradle Wrapper identificadas;
- uso de `Compose`, `Room`, `ViewModel`, `Flow` e dependencia de `Navigation Compose` verificado;
- disponibilidade do wrapper `gradlew` e `gradlew.bat` confirmada;
- tentativa de `gradlew tasks` executada.

## Resultado tecnico observado

- `gradlew tasks --no-daemon --console=plain` falhou;
- falha registrada: lock no download da toolchain JetBrains JDK `21` em `C:\\Users\\kamel\\.gradle\\jdks\\...lock`;
- processo dono do lock observado: `java` PID `28112`;
- `java -version` local observado no shell: `OpenJDK 17.0.19`;
- conclusao: build Android nao foi validado nesta fase.

## Smoke manual esperado

| Pergunta | Estado |
| --- | --- |
| app abre? | `Nao validado` - app nao foi executado em aparelho, emulador ou Android Studio nesta fase |
| tela inicial existente? | `Nao validado manualmente` - o codigo mostra `SplashLavaPrime` e `InitialScreen` |
| login existente? | `Nao validado manualmente` - o codigo mostra `LoginScreen` com perfis `Administrador` e `Operador` |
| selecao de perfil existente? | `Nao validado manualmente` - o codigo mostra seletor de perfil no login |
| navegacao basica existente? | `Nao validado manualmente` - o codigo mostra drawer e rotas por `MobileRoute` |
| patio ou dashboard existente? | `Nao validado manualmente` - o codigo mostra `DashboardScreen` e `PatioScreen` |
| app depende de internet? | `Parcialmente nao` - a estrutura observada indica operacao local com `Room`, mas sem execucao real a validacao fica incompleta |
| ha banco local? | `Sim` - `Room` com `LavaPrimeDatabase` e schema exportado |
| ha fila de sync? | `Sim` - `sync_queue` e `SyncQueueEntity` observados |
| ha impressao? | `Nao` - nenhuma camada de impressao encontrada |
| ha alinhamento visual com Web? | `Parcial` - alinhamento visual observado no codigo, sem validacao em dispositivo |

## Baseline minimo recomendado para futuras fases Android

1. `git status --short`
2. `git diff --name-only`
3. `gradlew tasks`
4. `gradlew assembleDebug` quando o ambiente permitir
5. smoke manual em aparelho ou emulador
6. registro explicito de offline, fila de sync e perfil

## Smoke minimo recomendado para futuras fases Android

- abrir app;
- validar splash e tela inicial;
- validar login Admin;
- validar login Operador;
- validar drawer e rotas disponiveis por perfil;
- validar `Dashboard` e `Patio`;
- validar cadastro rapido local;
- validar mensagem de sync online/offline;
- validar ausencia de erro bloqueante visivel.
