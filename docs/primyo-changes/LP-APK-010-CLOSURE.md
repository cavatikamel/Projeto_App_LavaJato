# LP-APK-010-CLOSURE

- Change ID: `LP-APK-010-CLOSURE`
- Referencia: `LP-APK-010`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Fase executada

Alinhamento do `Pátio` Android ao `Pátio` real do Web, junto com a simplificacao da abertura do app para `Splash -> Login`, usando a arte oficial enviada pelo usuario.

## Arquivos lidos

- governanca Primyo obrigatoria;
- governanca do `Programa LavaPrime APK`;
- `LP-APK-009` e `LP-APK-009-CLOSURE`;
- `app/main.js` em modo leitura para mapear `showPatio()`, `renderPatioSummary()`, `renderVehicleCards()`, `renderVehicleGroup()` e `renderVehicleCard()`;
- `app/styles.css` em modo leitura para mapear login, patio topbar, patio summary, patio board e vehicle cards;
- `LavaPrimeAndroidApp/**` em modo leitura para conferir startup, login, patio, viewmodels e shell.

## Arquivos criados/alterados

- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/AuthScreens.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/LavaPrimeRoot.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/PatioScreen.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/AuthViewModel.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/PatioViewModel.kt`
- `LavaPrimeAndroidApp/app/src/main/res/drawable-nodpi/lavaprime_startup_splash.png`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-010.md`
- `docs/primyo-changes/LP-APK-010-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`

## Entrega principal

- a abertura do app agora ficou em um fluxo unico:
  - `Splash` com a imagem oficial enviada pelo usuario;
  - login imediatamente em seguida;
- a tela intermediaria de abertura deixou de fazer parte do fluxo normal;
- o login passou a abrir como `Autenticacao`, com leitura mais proxima do Web;
- o `Pátio` Android foi reestruturado para refletir o quadro do Web com:
  - cards resumo;
  - grupos por status;
  - filtros principais;
  - fila de aguardando;
  - acoes operacionais mais claras;
- os status foram aproximados do Web na leitura da tela:
  - `Agendados`
  - `Aguardando`
  - `Em Servico`
  - `Prontos`
  - `Finalizados`
- `Finalizados` agora usa historico recente local;
- a etapa `Prontos` ficou visivel e reservada no espelho, sem regra artificial.

## Limites atuais da paridade

- o modelo Room atual ainda nao separa a etapa `Prontos` como status proprio;
- por isso, a coluna e os filtros do Web foram espelhados visualmente, mas essa etapa ainda nao tem movimentacao local real;
- o login continua local/demo e nao abre autenticacao remota;
- a sessao local continua sendo lida no bootstrap, mas nao pula mais o login automaticamente.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate` -> `SUCCESS`
- `.\gradlew.bat tasks --no-daemon --console=plain` -> `BUILD SUCCESSFUL`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain` -> comando executado com sucesso e APK confirmado no caminho final

## Evidencia de build Android

- APK debug localizado em `C:\Users\kamel\AppData\Local\LavaPrimeAndroidBuild\LavaPrimeAndroid\app\outputs\apk\debug\app-debug.apk`

## Falhas encontradas

- a primeira tentativa de `assembleDebug` falhou por:
  - `FlowRow` sem `OptIn` em pontos novos;
  - duas lambdas da `PatioScreen` sendo executadas na hora em vez de passadas como callback;
- os pontos foram corrigidos na propria fase;
- o build final ficou verde.

## Smoke manual

- splash com a nova arte em aparelho/emulador: `nao validado`
- login direto apos splash em aparelho/emulador: `nao validado`
- patio refeito em aparelho/emulador: `nao validado`
- motivo tecnico: a fase foi fechada com build validado e APK gerado, sem sessao assistida em dispositivo nesta janela.

## Percentual oficial

- antes: `39%`
- depois: `44%`

## Commit

- mensagem prevista: `feat(android): align patio flow and startup with web parity`

## Push

- nenhum push foi executado.

## Proxima fase recomendada

- `LP-APK-014 - Customers Flow`
