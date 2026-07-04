# LP-APK-014-CLOSURE

- Change ID: `LP-APK-014-CLOSURE`
- Referencia: `LP-APK-014`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Fase executada

Alinhamento do fluxo de `Clientes` Android ao `Clientes` real do Web, junto com a limpeza final da abertura do app para manter apenas `Splash -> Login` com leitura enxuta.

## Arquivos lidos

- governanca Primyo obrigatoria;
- governanca do `Programa LavaPrime APK`;
- `LP-APK-010` e `LP-APK-010-CLOSURE`;
- `app/main.js` em modo leitura para mapear `renderClientsScreen`, `renderClientDialogForm`, `updateClientFormMode`, `populateClientForm`, `saveClientRegistration` e `renderClientRows`;
- `app/styles.css` em modo leitura para referencias visuais do cadastro de clientes;
- `LavaPrimeAndroidApp/**` em modo leitura para conferir startup, login, repository, Room, viewmodels e shell.

## Arquivos criados/alterados

- `LavaPrimeAndroidApp/app/schemas/br.com.primyo.lavaprime.data.local.LavaPrimeDatabase/3.json`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/Daos.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/LavaPrimeDatabase.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/model/Models.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/repository/LavaPrimeRepository.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/components/LavaPrimeComponents.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/AuthScreens.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/ClientsScreen.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/LavaPrimeRoot.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/AuthViewModel.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/CadastroViewModel.kt`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-014.md`
- `docs/primyo-changes/LP-APK-014-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`

## Entrega principal

- a `Splash` agora mantem apenas `Carregando sistema...`;
- o `Login` passou a ocupar a area util completa, com logo maior no topo, `Autenticacao` centralizada, campos em sequencia limpa, seletor de perfil abaixo dos campos e botao verde de confirmacao centralizado;
- textos explicativos nao essenciais foram removidos do inicio do app;
- a rota `Clientes` deixou de ser apenas um espelho de leitura e virou um fluxo mobile real com:
  - metricas principais;
  - busca por cliente ou placa;
  - filtros `Todos`, `Avulsos`, `Faturados`, `PF` e `PJ`;
  - cards operacionais com telefone, documento, status e placas;
  - cadastro e edicao;
  - regra de `PF/PJ`;
  - regra de `Cliente faturado`;
  - regra de documento obrigatorio para faturamento;
  - ciclo de faturamento e aprovacao;
  - placas vinculadas;
  - acao de mensagem pelo WhatsApp quando houver telefone.

## Ajustes de dados locais

- o modelo `ClienteEntity` foi ampliado para sustentar melhor a paridade com o Web:
  - `personType`
  - `billing`
  - `legalName`
  - `address`
  - `email`
  - `responsible`
  - `approver`
  - `billingApproved`
  - `billingCycle`
  - `allowMultipleOpenInvoices`
- a base Room passou para a versao `3`;
- foi criada a migration `2 -> 3`;
- a fase manteve `fallbackToDestructiveMigration()` no builder, mas adicionou migration explicita para este passo de paridade.

## Limites atuais da paridade

- o Web ainda possui acoes mais avancadas em torno de relacionamento, transferencia de placas e rotinas cruzadas com `Veiculos`;
- a remocao/desvinculacao de placa no Android foi simplificada para `sem-cliente`, preservando o registro local do veiculo sem excluir o dado;
- a autenticacao continua local/demo e nao abre auth remota.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate` -> `SUCCESS`
- `.\gradlew.bat tasks --no-daemon --console=plain` -> `BUILD SUCCESSFUL`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain` -> comando executado com sucesso e APK confirmado no caminho final

## Evidencia de build Android

- APK debug localizado em `C:\Users\kamel\AppData\Local\LavaPrimeAndroidBuild\LavaPrimeAndroid\app\outputs\apk\debug\app-debug.apk`

## Falhas encontradas

- a primeira tentativa de `assembleDebug` falhou por import incorreto ligado ao uso de `weight` nas novas telas Compose;
- o problema foi corrigido na propria fase;
- o build final ficou verde.

## Smoke manual

- splash por cerca de 3 segundos em aparelho/emulador: `nao validado`
- login direto apos splash em aparelho/emulador: `nao validado`
- fluxo de clientes em aparelho/emulador: `nao validado`
- motivo tecnico: a fase foi fechada com build validado e APK gerado, sem sessao assistida em dispositivo nesta janela.

## Percentual oficial

- antes: `44%`
- depois: `46.5%`

## Commit

- mensagem prevista: `feat(android): align customers flow with web parity`

## Push

- nenhum push foi executado.

## Proxima fase recomendada

- `LP-APK-015 - Vehicles Flow`
