# LP-APK-015-CLOSURE

- Change ID: `LP-APK-015-CLOSURE`
- Referencia: `LP-APK-015`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Fase executada

Alinhamento do fluxo de `Veiculos` Android ao `Veiculos` real do Web, substituindo a tela espelho por um modulo mobile funcional com cadastro, edicao, vinculo com cliente, filtros e historico base.

## Arquivos lidos

- governanca Primyo obrigatoria;
- governanca do `Programa LavaPrime APK`;
- `LP-APK-014` e `LP-APK-014-CLOSURE`;
- `app/main.js` em modo leitura para mapear `renderVehiclesScreen`, `renderVehicleRegistryDialogForm`, `renderVehicleRegistryOwnerField`, `persistVehicleRegistration`, `renderVehicleRegistryRows`, `applyVehicleTableFilter`, `shouldUseVehicleCategory` e listas de apoio;
- `app/styles.css` em modo leitura para referencias visuais da area de cadastros;
- `LavaPrimeAndroidApp/**` em modo leitura para conferir repository, Room, viewmodels e shell.

## Arquivos criados/alterados

- `LavaPrimeAndroidApp/app/schemas/br.com.primyo.lavaprime.data.local.LavaPrimeDatabase/4.json`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/LavaPrimeDatabase.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/model/Models.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/repository/LavaPrimeRepository.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/LavaPrimeRoot.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/VehiclesScreen.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/CadastroViewModel.kt`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-015.md`
- `docs/primyo-changes/LP-APK-015-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`

## Entrega principal

- a rota `Veiculos` deixou de ser apenas espelho de leitura e passou a ter fluxo mobile real;
- a tela agora replica a base do Web com:
  - busca `Buscar placa, modelo ou proprietario`;
  - filtros `Todos`, `Com cliente`, `Sem cliente`, `Com historico` e `No patio`;
  - metricas de base, vinculo, historico e patio;
  - cards de veiculo com placa, veiculo, proprietario atual, ano/cor, tipo/categoria, combustivel e observacoes;
  - acoes `Editar` e `Historico`;
  - cadastro e edicao com os campos do Web: placa, marca, modelo, ano, cor, tipo de veiculo, categoria, combustivel, proprietario atual e observacoes do veiculo.

## Ajustes de dados locais

- o modelo `VeiculoEntity` foi ampliado para sustentar melhor a paridade com o Web:
  - `ano`
  - `tipo`
  - `categoria`
  - `combustivel`
  - `observacoes`
- a base Room passou para a versao `4`;
- foi criada a migration `3 -> 4`;
- a fase manteve `fallbackToDestructiveMigration()` no builder, mas adicionou migration explicita para este passo de paridade.

## Limites atuais da paridade

- o Web ainda possui historico mais profundo, transferencia dedicada de cliente associado e check-list PDF;
- no Android, o historico desta fase ficou como leitura operacional dos atendimentos registrados para o veiculo;
- cuidados especiais e restricoes quimicas continuam preservados no dado local atual, mas nao ganharam editor dedicado nesta fase.

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate` -> `SUCCESS`
- `.\gradlew.bat tasks --no-daemon --console=plain` -> `BUILD SUCCESSFUL`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain` -> comando executado com sucesso e APK confirmado no caminho final

## Evidencia de build Android

- APK debug localizado em `C:\Users\kamel\AppData\Local\LavaPrimeAndroidBuild\LavaPrimeAndroid\app\outputs\apk\debug\app-debug.apk`

## Falhas encontradas

- nenhuma falha nova bloqueante foi encontrada nesta fase;
- permanecem fora de escopo os arquivos sujos preexistentes do repositorio fora do recorte APK.

## Smoke manual

- fluxo de veiculos em aparelho/emulador: `nao validado`
- cadastro e edicao visual em aparelho/emulador: `nao validado`
- motivo tecnico: a fase foi fechada com build validado e APK gerado, sem sessao assistida em dispositivo nesta janela.

## Percentual oficial

- antes: `46.5%`
- depois: `49%`

## Commit

- mensagem prevista: `feat(android): align vehicles flow with web parity`

## Push

- nenhum push foi executado.

## Proxima fase recomendada

- `LP-APK-016 - Services Flow`
