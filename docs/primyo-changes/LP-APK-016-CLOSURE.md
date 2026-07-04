# LP-APK-016-CLOSURE

- Change ID: `LP-APK-016-CLOSURE`
- Referencia: `LP-APK-016`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Fase executada

Alinhamento do fluxo de `Serviços` Android ao `Serviços` real do Web, junto com o ajuste final da `Splash` e a reorganização visual do `Pátio` para leitura mobile mais próxima do sistema Web.

## Arquivos lidos

- governança Primyo obrigatória;
- governança do `Programa LavaPrime APK`;
- `LP-APK-015` e `LP-APK-015-CLOSURE`;
- `app/main.js` em modo leitura para mapear `renderServicesScreen`, `renderServiceDialogForm`, `saveServiceRegistration`, `updateServiceCategoryState`, `shouldUseVehicleCategory`, `statusMeta` e `renderVehicleCard`;
- `app/styles.css` em modo leitura para referências visuais de catálogo e pátio;
- `LavaPrimeAndroidApp/**` em modo leitura para conferir repository, Room, componentes, shell e telas atuais.

## Arquivos criados/alterados

- `LavaPrimeAndroidApp/app/schemas/br.com.primyo.lavaprime.data.local.LavaPrimeDatabase/5.json`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/Daos.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/local/LavaPrimeDatabase.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/model/Models.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/data/repository/LavaPrimeRepository.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/AuthScreens.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/LavaPrimeRoot.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/PatioScreen.kt`
- `LavaPrimeAndroidApp/app/src/main/java/br/com/primyo/lavaprime/ui/screens/ServicesScreen.kt`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-016.md`
- `docs/primyo-changes/LP-APK-016-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`

## Entrega principal

- a rota `Serviços` deixou de ser apenas espelho de leitura e passou a ter fluxo mobile real;
- a tela agora replica a base do Web com:
  - métricas `Serviços ativos`, `Tipos de veículo`, `Categorias` e `Fichas técnicas`;
  - busca por serviço, tipo ou categoria;
  - filtros `Todos`, `Ativos`, `Inativos`, `Com ficha` e `Com manutenção`;
  - painel `Tipos e categorias`;
  - cards de serviço com status, tempo, preço, escopo de veículo e sinais técnicos;
  - cadastro e edição com os campos do Web: `Nome do serviço`, `Tipo de veículo`, `Categoria de veículo`, `Valor`, `Tempo previsto`, `Status`, `Ficha técnica`, `Custo aproximado`, `pH estimado`, `Usa produto ácido`, `Usa produto alcalino`, `Requer manutenção`, `Intervalo` e `Data da manutenção`.

## Ajustes visuais adicionais

- a `Splash` manteve apenas `Carregando sistema...` e o texto foi reposicionado para a faixa inferior, dentro de caixa clara com cantos arredondados;
- o `Pátio` removeu a caixa explicativa antiga;
- os cards-resumo de `Agendados`, `Aguardando`, `Em Serviço`, `Prontos` e `Finalizados` ficaram compactos para caber em até duas linhas no mobile;
- os cards de veículo do `Pátio` foram reorganizados com status, fila, pagamento, sync, valor, operador e alerta sem texto estourando;
- o `Pátio` passou a usar os equivalentes Android dos ícones do Web para `agendado`, `aguardando`, `em serviço`, `pronto` e `finalizado`.

## Ajustes de dados locais

- o modelo `ServicoEntity` foi ampliado para sustentar melhor a paridade com o Web:
  - `tipoVeiculo`
  - `categoriaVeiculo`
  - `statusCatalogo`
  - `fichaTecnicaAtiva`
  - `custoFichaTecnicaCentavos`
  - `requerManutencao`
  - `intervaloManutencao`
  - `dataManutencao`
- a base Room passou para a versão `5`;
- foi criada a migration `4 -> 5`;
- a fase manteve o builder atual, mas adicionou migration explícita para este passo de paridade.

## Limites atuais da paridade

- o Web ainda possui controle mais profundo de composição de insumos e registros auxiliares de tipos/categorias;
- no Android, a fase fechou o catálogo e a edição de serviços, mas ainda não cobre o gerenciamento dedicado de insumos do serviço;
- a etapa `Prontos` do `Pátio` continua sem status próprio no dado local e permanece como espelho estrutural.

## Validações executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate` -> `SUCCESS`
- `.\gradlew.bat tasks --no-daemon --console=plain` -> `BUILD SUCCESSFUL`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain` -> comando executado com sucesso após correção local de compilação

## Evidência de build Android

- APK debug localizado em `C:\Users\kamel\AppData\Local\LavaPrimeAndroidBuild\LavaPrimeAndroid\app\outputs\apk\debug\app-debug.apk`

## Falhas encontradas

- o primeiro `assembleDebug` falhou por dois pontos de compilação introduzidos nesta fase:
  - import incorreto de `KeyboardOptions` em `ServicesScreen.kt`;
  - anotação faltante de API experimental em `NovoAtendimentoDialog` no `PatioScreen.kt`;
- os dois pontos foram corrigidos na própria fase e o build final foi concluído com sucesso.

## Smoke manual

- fluxo de serviços em aparelho/emulador: `não validado`
- ajustes visuais de splash e pátio em aparelho/emulador: `não validado`
- motivo técnico: a fase foi fechada com gate e build válidos, mas sem sessão assistida em dispositivo nesta janela.

## Percentual oficial

- antes: `49%`
- depois: `51%`

## Commit

- mensagem prevista: `feat(android): align services flow with web parity`

## Push

- nenhum push foi executado.

## Próxima fase recomendada

- `LP-APK-017 - Products Flow`
