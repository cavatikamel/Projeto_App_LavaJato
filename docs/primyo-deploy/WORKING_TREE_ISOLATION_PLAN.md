# Working Tree Isolation Plan

## Objetivo

Definir como isolar o working tree do repositorio antes de qualquer criacao ou `push` futuro da branch `staging`.

## Estado atual

- branch atual: `primyo/onboarding`
- `HEAD` atual: `79ae86e`
- ultimo commit revisado como baseline Web candidata: `9205f09`
- staging pendente: inexistente
- push/deploy: bloqueados
- staging pendente em index: inexistente
- arquivos deletados: inexistentes

## Itens fora de escopo auditados

| Item | Estado | Classificacao | Risco | Acao futura recomendada |
| --- | --- | --- | --- | --- |
| `.gitignore` | modificado | revisar manualmente | pode alterar fronteira de ignorados do repositorio | abrir microfase propria ou absorver em governance Git |
| `app/styles.css` | modificado | preservar para fase Web visual propria | pode contaminar homologacao com alteracao UI/CSS | manter bloqueado fora da `staging` |
| `app/assets/data/fipe-veiculos.js` | modificado | trilha propria de dados/FIPE | pode alterar snapshot de veiculos local | absorver em fase FIPE/dados |
| `app/assets/data/fipe-veiculos.json` | modificado | trilha propria de dados/FIPE | refresh massivo de catalogo local | absorver em fase FIPE/dados |
| `LavaPrimeAndroidApp/app/src/main/AndroidManifest.xml` | modificado | trilha Android propria | mistura Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/components/LavaPrimeComponents.kt` | modificado | trilha Android propria | mistura componente Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/BrandPalette.kt` | modificado | trilha Android propria | mistura tema Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/Theme.kt` | modificado | trilha Android propria | mistura tema Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/Typography.kt` | modificado | trilha Android propria | mistura tema Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/LavaPrimeTokens.kt` | nao rastreado | trilha Android propria | adiciona novo token/theme Android fora da trilha Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/res/values/styles.xml` | modificado | trilha Android propria | mistura Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/res/xml/data_extraction_rules.xml` | modificado | trilha Android propria | mistura Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/res/drawable-nodpi/lavaprime_app_icon.png` | nao rastreado | trilha Android propria | adiciona asset Android fora da trilha Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/res/drawable-nodpi/lavaprime_logo_primary.png` | nao rastreado | trilha Android propria | adiciona asset Android fora da trilha Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/res/font/inter_italic_variable.ttf` | nao rastreado | trilha Android propria | adiciona fonte Android fora da trilha Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/app/src/main/res/font/inter_variable.ttf` | nao rastreado | trilha Android propria | adiciona fonte Android fora da trilha Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/docs/PROMPT_CODEX_CONTINUACAO.md` | modificado | trilha Android propria | mistura documentacao Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/gradle/wrapper/gradle-wrapper.properties` | modificado | trilha Android propria | mistura infra Android com publish Web | manter fora da `staging` |
| `LavaPrimeAndroidApp/gradlew` | modificado | trilha Android propria | mistura wrapper Android com publish Web | manter fora da `staging` |
| `docs/primyo-apk/LP_APK_REQUIREMENTS.md` | limpo | sem bloqueio atual | nenhum nesta fase | apenas registrar que nao esta sujo |

## Bloco Android observado nesta auditoria

Todos os itens abaixo permanecem com a mesma classificacao `trilha Android propria` e a mesma acao `manter fora da staging`:

- `LavaPrimeAndroidApp/app/src/main/AndroidManifest.xml`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/components/LavaPrimeComponents.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/navigation/AppNavigationModels.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/BrandPalette.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/Theme.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/Typography.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/theme/LavaPrimeTokens.kt`
- `LavaPrimeAndroidApp/app/src/main/res/mipmap-anydpi/ic_launcher.xml`
- `LavaPrimeAndroidApp/app/src/main/res/mipmap-anydpi/ic_launcher_round.xml`
- `LavaPrimeAndroidApp/app/src/main/res/values/colors.xml`
- `LavaPrimeAndroidApp/app/src/main/res/values/styles.xml`
- `LavaPrimeAndroidApp/app/src/main/res/xml/data_extraction_rules.xml`
- `LavaPrimeAndroidApp/app/src/main/res/drawable-nodpi/lavaprime_app_icon.png`
- `LavaPrimeAndroidApp/app/src/main/res/drawable-nodpi/lavaprime_logo_primary.png`
- `LavaPrimeAndroidApp/app/src/main/res/drawable/ic_launcher_foreground.xml`
- `LavaPrimeAndroidApp/app/src/main/res/font/inter_italic_variable.ttf`
- `LavaPrimeAndroidApp/app/src/main/res/font/inter_variable.ttf`
- `LavaPrimeAndroidApp/docs/PROMPT_CODEX_CONTINUACAO.md`
- `LavaPrimeAndroidApp/gradle/wrapper/gradle-wrapper.properties`
- `LavaPrimeAndroidApp/gradlew`

## Diagnostico consolidado

### O que bloqueia staging hoje

1. working tree com residuos Web, Android e FIPE fora da fase
2. `HEAD` atual acima da ultima baseline Web revisada, por commits documentais da trilha APK
3. ausencia de uma fase autorizada para isolar ou redistribuir cada delta

### O que nao bloqueia por si so

1. gate tecnico Web
2. build Web
3. verify build
4. runtime Web atual
5. ausencia de `docs/primyo-apk/LP_APK_REQUIREMENTS.md` no diff atual

## Estrategia segura recomendada

### Etapa 1 - congelar o estado

- nao usar `git add .`
- nao usar `git restore`
- nao usar `git clean`
- nao usar `git stash`
- nao criar `staging` enquanto houver mistura de trilhas

### Etapa 2 - separar por trilha

- trilha Git/governance: `.gitignore`
- trilha Web visual: `app/styles.css`
- trilha dados/FIPE: `app/assets/data/fipe-veiculos.js`, `app/assets/data/fipe-veiculos.json`
- trilha Android/APK: `LavaPrimeAndroidApp/**`, incluindo arquivos modificados e nao rastreados

### Etapa 3 - escolher baseline de branch

- baseline recomendada para a futura `staging`: `9205f09`
- justificativa: ultimo commit revisado especificamente como baseline Web candidata
- excecao: so usar `79ae86e` se houver aceitacao explicita para carregar documentacao APK no ramo de homologacao Web

### Etapa 4 - somente depois iniciar branch

- revalidar `git status --short`
- confirmar working tree isolado
- confirmar baseline escolhida
- executar a fase futura autorizada de criacao/push de `staging`

## Resultado da fase de branch

- a branch `staging` foi criada e publicada em `LP-DEPLOY-GOV-005`
- a operacao usou a baseline conservadora `9205f09`
- a branch de trabalho `primyo/onboarding` permaneceu com o working tree misturado
- a sujeira local continuou fora da branch `staging`

## Comandos futuros documentados

Somente referencia para fase futura. Nao executados nesta fase.

```bash
git status --short
git status --porcelain=v1
git diff --name-only
git diff --cached --name-only
git switch --detach 9205f09
git switch -c staging
git push -u origin staging
```

## Condicao minima para criacao/push de staging

- working tree isolado
- nenhuma mistura Android/FIPE/CSS/Git governance sem trilha propria
- baseline Web explicitamente aprovada
- gate/build/verify aprovados
- smoke local valido ou evidencia herdada sem mudanca de runtime
- autorizacao formal para `push`

## Rollback

1. parar a fase futura se qualquer item ainda estiver sem classificacao ou destino
2. nao criar branch se o working tree continuar contaminado
3. se a branch for criada a partir de baseline errada em fase futura, descarta-la localmente e refazer a derivacao do commit Web aprovado
