# LP-APK-017-CLOSURE

- Change ID: `LP-APK-017-CLOSURE`
- Referencia: `LP-APK-017`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-05`

## Fase executada

Alinhamento do fluxo de `Produtos` Android ao `Produtos` real do Web, junto com a limpeza da `Visão Geral` e a troca do `Novo atendimento` do `Pátio` para uma tela cheia nativa com rascunho preservado.

## Arquivos lidos

- governança Primyo obrigatória;
- governança do `Programa LavaPrime APK`;
- `LP-APK-016` e `LP-APK-016-CLOSURE`;
- `app/main.js` em modo leitura para mapear `renderAdminDashboard`, `renderProductsScreen`, `renderInventoryItemDialog`, `saveInventoryItemForm`, `renderVehicleEntryOptions`, `updateVehicleDialogMode`, `renderVehicleServiceOptions` e o fluxo de entrada do pátio;
- `app/styles.css` em modo leitura para referências visuais de cards e formulários;
- `LavaPrimeAndroidApp/**` em modo leitura para conferir Room, shell, top bar, pátio, dashboard e produtos atuais.

## Arquivos criados/alterados

- `LavaPrimeAndroidApp/app/schemas/br.com.primyo.lavaprime.data.local.LavaPrimeDatabase/6.json`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/Daos.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/LavaPrimeDatabase.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/model/Models.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/repository/LavaPrimeRepository.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/components/LavaPrimeComponents.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/navigation/AppNavigationModels.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/AttendanceEntryScreen.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/DashboardScreen.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/LavaPrimeRoot.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/PatioScreen.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/ProductsScreen.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/viewmodel/PatioViewModel.kt`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-017.md`
- `docs/primyo-changes/LP-APK-017-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`

## Entrega principal

- a rota `Dashboard` passou a se chamar `Visão Geral`;
- a `Visão Geral` removeu a caixa `Dashboard / leitura operacional do dia`, o bloco `Fluxo da operação`, os `Alertas do painel`, a `Fila do momento` e os chips redundantes abaixo do topo;
- o topo passou a concentrar `Online/Offline` e `pendências de sync`, com ação de toque para forçar sincronização;
- os cards operacionais da `Visão Geral` agora levam o usuário ao `Pátio`;
- a área de negócio ganhou o card `Pagamentos em aberto`;
- o `Novo atendimento` do `Pátio` deixou de abrir em popup estreito e passou a ocupar a área toda da tela;
- o rascunho do `Novo atendimento` fica preservado ao fechar e ao salvar;
- a nova tela de atendimento replica a base do Web com:
  - `Entrada no pátio` e `Agendamento`;
  - `Placa`, `Modelo`, `Cor`, `Tipo de veículo` e `Categoria de veículo`;
  - `Serviços cadastrados`;
  - `Telefone com DDD`, `Nome do cliente` e `Forma de pagamento`;
  - `Pago na entrada`, quando aplicável;
  - `Data do agendamento` e `Horário do agendamento`, quando aplicável;
  - `Alerta especial do veículo`.

## Entrega de Produtos

- a rota `Produtos` deixou de ser uma lista simples e passou a refletir a estrutura central do Web com:
  - métricas `Produtos ativos`, `Baixo estoque`, `Margem média` e `Valor em estoque`;
  - busca por `produto`, `SKU` ou `observação`;
  - filtros `Todos`, `Ativos`, `Baixo estoque` e `Inativos`;
  - painel `Produtos em foco`;
  - cards com `SKU`, `estoque`, `mínimo`, `custo`, `venda`, `margem` e `status`;
  - ações `Editar` e `Estoque`;
  - cadastro e edição com os campos do Web: `Nome do produto`, `SKU`, `Unidade`, `Estoque atual`, `Estoque mínimo`, `Custo unitário`, `Preço de venda`, `Observações` e `Item ativo`;
  - ajuste de estoque com `Tipo de movimento`, `Quantidade` e `Motivo`.

## Ajustes de dados locais

- o modelo `ProdutoEntity` foi ampliado para sustentar melhor a paridade com o Web:
  - `sku`
  - `custoCentavos`
  - `observacoes`
  - `ativo`
- o modelo `AtendimentoEntity` recebeu snapshots adicionais para sustentar a nova entrada mobile:
  - `telefoneSnapshot`
  - `veiculoResumoSnapshot`
  - `corSnapshot`
  - `tipoVeiculoSnapshot`
  - `categoriaVeiculoSnapshot`
  - `servicosRelacionadosSnapshot`
  - `pagoNaEntrada`
  - `agendadoParaData`
  - `agendadoParaHora`
- a base Room passou para a versão `6`;
- foi criada a migration `5 -> 6`;
- a fase preservou o builder atual, mas adicionou migration explícita para este passo de paridade.

## Limites atuais da paridade

- o Web ainda possui busca de modelo por banco local FIPE, cliente faturado completo e faturamento com seleção de fatura aberta dentro da entrada do pátio;
- no Android, a fase fechou a tela cheia de atendimento e os campos centrais do Web, mas ainda não conclui o fluxo completo de faturamento dentro do atendimento;
- a etapa `Prontos` do `Pátio` continua sem status próprio no dado local e permanece como espelho estrutural.

## Validações executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate` -> `SUCCESS`
- `.\gradlew.bat tasks --no-daemon --console=plain` -> `BUILD SUCCESSFUL`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain` -> `BUILD SUCCESSFUL`

## Evidência de build Android

- APK debug localizado em `C:\Users\kamel\AppData\Local\LavaPrimeAndroidBuild\LavaPrimeAndroid\app\outputs\apk\debug\app-debug.apk`

## Falhas encontradas

- o primeiro `assembleDebug` falhou por import ausente de `Modifier` em `DashboardScreen.kt`;
- o ponto foi corrigido na própria fase e o build final foi concluído com sucesso.

## Smoke manual

- `Visão Geral`, `Pátio`, `Novo atendimento` em tela cheia e `Produtos` em aparelho/emulador: `não validado`
- motivo técnico: a fase foi fechada com gate e build válidos, mas sem sessão assistida em dispositivo nesta janela.

## Percentual oficial

- antes: `51%`
- depois: `52.5%`

## Commit

- mensagem prevista: `feat(android): align products flow with web parity`

## Push

- nenhum push foi executado.

## Próxima fase recomendada

- `LP-APK-018 - Supplies Flow`
