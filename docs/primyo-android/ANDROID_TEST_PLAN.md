# Android Test Plan

## Objetivo

Consolidar o baseline minimo de validacao Android apos `LP-ANDROID-001`, `LP-ANDROID-002` e o primeiro checkpoint do `LP-ANDROID-MASTER`.

## Validacoes executadas ate o momento

- estrutura de `LavaPrimeAndroidApp` listada;
- arquivos Gradle e wrapper identificados;
- `applicationId` e `namespace` identificados;
- versoes principais de Android Gradle Plugin, Kotlin, Compose, Room, Navigation, WorkManager e Gradle Wrapper identificadas;
- uso de `Compose`, `Room`, `ViewModel`, `Flow` e dependencia de `Navigation Compose` verificado;
- disponibilidade do wrapper `gradlew` e `gradlew.bat` confirmada;
- `gradlew tasks --no-daemon --console=plain` executado;
- `gradlew assembleDebug --no-daemon --console=plain` executado no checkpoint do `LP-ANDROID-MASTER`.

## Resultado tecnico observado

- o lock historico de toolchain JetBrains JDK `21`, registrado em `LP-ANDROID-001`, deixou de bloquear a execucao atual;
- `gradlew tasks --no-daemon --console=plain` -> sucesso;
- `gradlew assembleDebug --no-daemon --console=plain` -> sucesso;
- APK debug observado em `%LOCALAPPDATA%\\LavaPrimeAndroidBuild\\LavaPrimeAndroid\\app\\outputs\\apk\\debug\\app-debug.apk`;
- conclusao: o baseline atual do app agora possui validacao de build local bem-sucedida.

## Complemento de `LP-ANDROID-004`

- a fase de paridade visual recompilou o app com sucesso apos refino de tipografia, componentes e telas;
- o ambiente atual nao possuia `adb` disponivel, entao nao houve instalacao em aparelho ou emulador nesta execucao;
- por isso, a validacao visual real segue pendente mesmo com `assembleDebug` aprovado.

## Smoke manual esperado

| Pergunta | Estado |
| --- | --- |
| app abre? | `Nao validado` - APK foi gerado, mas o app nao foi executado em aparelho, emulador ou Android Studio nesta execucao |
| tela inicial existente? | `Nao validado manualmente` - o codigo mostra `SplashLavaPrime` e `InitialScreen` |
| login existente? | `Nao validado manualmente` - o codigo mostra `LoginScreen` com perfis `Administrador` e `Operador` |
| selecao de perfil existente? | `Nao validado manualmente` - o codigo mostra seletor de perfil no login |
| navegacao basica existente? | `Nao validado manualmente` - o codigo mostra drawer e rotas por `MobileRoute` |
| patio ou dashboard existente? | `Nao validado manualmente` - o codigo mostra `DashboardScreen` e `PatioScreen` |
| app depende de internet? | `Parcialmente nao` - a estrutura observada indica operacao local com `Room`, e o build confirma a base compilavel, mas sem execucao real a validacao segue incompleta |
| ha banco local? | `Sim` - `Room` com `LavaPrimeDatabase` e schema exportado |
| ha fila de sync? | `Sim` - `sync_queue` e `SyncQueueEntity` observados |
| ha impressao? | `Nao` - nenhuma camada de impressao encontrada |
| ha alinhamento visual com Web? | `Parcial` - alinhamento visual observado no codigo, sem validacao em dispositivo |

## Baseline minimo recomendado para futuras fases Android

1. `git status --short`
2. `git diff --name-only`
3. `gradlew tasks --no-daemon --console=plain`
4. `gradlew assembleDebug --no-daemon --console=plain`
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
