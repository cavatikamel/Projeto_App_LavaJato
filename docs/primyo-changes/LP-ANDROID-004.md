# LP-ANDROID-004

- Change ID: `LP-ANDROID-004`
- Backlog ID: `LP-ANDROID-004`
- Título: `Android Visual Web Parity Correction`
- Objetivo: corrigir a aparência do app Android nativo `LavaPrime` para reduzir o aspecto de protótipo e aproximar a shell mobile da identidade oficial e da linguagem visual do LavaPrime Web.
- Motivo da mudança: o checkpoint anterior já compilava e tinha identidade básica, mas ainda expunha tipografia inconsistente, textos sem acento, drawer com iniciais genéricas, dashboard com cards simplificados demais e login com proporções provisórias.
- Área afetada: `Android UI`
- Arquivos afetados:
  - `LavaPrimeAndroidApp/app/build.gradle.kts`
  - `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/**`
  - `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/components/LavaPrimeComponents.kt`
  - `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/navigation/AppNavigationModels.kt`
  - `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/**`
  - `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/repository/LavaPrimeRepository.kt`
  - `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/sync/SyncCoordinator.kt`
  - `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/SyncViewModel.kt`
  - `docs/primyo-android/ANDROID_WEB_PARITY_MAP.md`
  - `docs/primyo-android/ANDROID_TEST_PLAN.md`
  - `docs/primyo-android/ANDROID_ROADMAP.md`
  - `docs/primyo-changes/LP-ANDROID-004-CLOSURE.md`
- Risco: `Medio`
- Dependências: `LP-ANDROID-MASTER`
- Responsável: `Codex`
- Aprovador técnico: `usuário via prompt LP-ANDROID-004`
- Data: `2026-06-30`

## Escopo

- refinar tipografia, paleta, contraste e componentes reutilizáveis;
- corrigir textos sem acento e labels visíveis;
- melhorar login, dashboard, drawer, top bar e cards operacionais;
- manter o app nativo, sem WebView e sem alterar lógica de negócio.

## Fora de escopo

- pagamento real;
- impressão térmica;
- Supabase;
- migração Room;
- alteração estrutural do Web;
- contratos oficiais;
- push.

## Plano de implementação

1. reler governança e docs Android relevantes;
2. reler `Material_Visual`, `app/styles.css` e a shell Android atual;
3. consolidar um mini design system Compose com tipografia sans, ícones reais e componentes reutilizáveis;
4. aplicar o padrão às telas públicas e internas já existentes;
5. revisar copy visível em português;
6. validar com `git status`, `git diff`, `primyo:gate`, `gradlew tasks` e `assembleDebug`.

## Plano de teste

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`
- `.\gradlew.bat tasks --no-daemon --console=plain`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain`
- tentativa de descobrir dispositivo com `adb devices`

## Plano de rollback

1. reverter apenas os arquivos Android e docs desta fase;
2. manter fora do rollback qualquer item Web ou Android preexistente já sujo no worktree;
3. reexecutar `primyo:gate`, `gradlew tasks` e `assembleDebug`.

## Resultado da validação

- design system Compose criado e aplicado nas telas atuais;
- build Android voltou a compilar com sucesso;
- `adb` não estava disponível no ambiente, então não houve instalação em aparelho/emulador;
- nenhuma alteração estrutural foi feita no Web.

## Evidências anexadas

- `npm.cmd run primyo:gate` -> sucesso
- `.\gradlew.bat tasks --no-daemon --console=plain` -> sucesso
- `.\gradlew.bat assembleDebug --no-daemon --console=plain` -> sucesso

## Resultado de npm.cmd run primyo:gate

- `SUCCESS`

## Decisão final

- `Aprovado com ressalvas`
- ressalva principal: polimento visual e build foram concluídos, mas o smoke visual real em dispositivo não foi possível porque `adb` não estava disponível no ambiente desta execução.
