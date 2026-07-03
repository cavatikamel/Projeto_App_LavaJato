# LP-APK-006-CLOSURE

- Change ID: `LP-APK-006-CLOSURE`
- Referencia: `LP-APK-006`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-02`

## Fase executada

Consolidacao da abertura nativa do app Android `LavaPrime` com splash oficial, preload inicial, verificacao de banco local, verificacao de sessao local e roteamento para login ou home.

## Arquivos lidos

- governanca Primyo obrigatoria;
- governanca do `Programa LavaPrime APK`;
- `LP-APK-005-CLOSURE`;
- `AuthViewModel`, `LavaPrimeRoot`, `LavaPrimeApp`, `LavaPrimeRepository`, `LavaPrimeDatabase`, `Daos`, `Models` e `Material_Visual`.

## Arquivos criados/alterados

- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/LavaPrimeApp.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/Daos.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/LocalSessionStore.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/repository/LavaPrimeRepository.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/AuthScreens.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/LavaPrimeRoot.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/AuthViewModel.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/LavaPrimeViewModelFactory.kt`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-006.md`
- `docs/primyo-changes/LP-APK-006-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`

## Entrega principal

- preload inicial real criado no `AuthViewModel`;
- banco local validado antes da entrada do app;
- sessao local simples persistida em aparelho via `SharedPreferences`;
- restauracao de usuario local salva no banco quando a sessao ainda for valida;
- limpeza automatica de sessao invalida;
- roteamento inicial decidido entre `LOGIN` e `APP`;
- splash oficial passou a mostrar estado de banco local, sessao local e roteamento.

## Preservado

- app continua nativo;
- auth remota continua fora do escopo;
- Room e sync real continuam sem alteracao estrutural;
- Web e Supabase permaneceram intactos.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate` -> `SUCCESS`
- `.\gradlew.bat tasks --no-daemon --console=plain` -> `BUILD SUCCESSFUL`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain` -> `BUILD SUCCESSFUL`

## Evidencia de build Android

- APK debug localizado em `C:\Users\kamel\AppData\Local\LavaPrimeAndroidBuild\LavaPrimeAndroid\app\outputs\apk\debug\app-debug.apk`
- observacao: o projeto continua usando diretorio local externo de build, por isso o APK nao aparece em `LavaPrimeAndroidApp/app/build/**` dentro do OneDrive.

## Falhas encontradas

- nenhuma falha bloqueante de build;
- nao houve erro de Gradle ou JDK nesta fase;
- smoke manual em aparelho/emulador continua pendente.

## Smoke manual

- splash abre com preload visivel: `nao validado`
- banco local leva ao proximo passo: `nao validado`
- sessao local restaura home quando existir: `nao validado`
- sem sessao local vai para login: `nao validado`
- motivo tecnico: fase validada por build e APK gerado, sem execucao assistida em dispositivo nesta janela.

## Percentual oficial

- antes: `28%`
- depois: `31%`

## Commit

- mensagem prevista: `feat(android): add splash and app initialization flow`

## Push

- nenhum push foi executado.

## Proxima fase recomendada

- `LP-APK-007 - Login And Profile Selection`
