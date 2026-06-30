# LP-ANDROID-MASTER

- Change ID: `LP-ANDROID-MASTER`
- Tipo: `Android Phase`
- Data: `2026-06-30`
- Status desta execucao: `Parcial em andamento`
- Objetivo: iniciar a trilha mestre de reconstrucao controlada do app Android nativo oficial `LavaPrime`, preservando o que ja e util, alinhando identidade visual oficial e consolidando uma fundacao commitavel sem tocar no Web.

## Fatias internas executadas nesta execucao

### Fatia A - Inventario e decisao

- governanca obrigatoria relida;
- docs Android relidos;
- app atual auditado no worktree real;
- `Material_Visual` inventariado;
- classificacao `keep/refactor/replace/archive` consolidada.

### Fatia B - Identidade e baseline visual segura

- paleta Compose aproximada aos valores oficiais do `Material_Visual`;
- CTA principais alinhados ao verde-lima oficial;
- icon background e vetor base realinhados a marinho/ciano/lima da marca;
- baseline de app icon, splash Compose e marca oficial revalidada.

### Validacao tecnica da fundacao atual

- `gradlew tasks --no-daemon --console=plain` -> sucesso;
- `gradlew assembleDebug --no-daemon --console=plain` -> sucesso;
- APK debug gerado em `%LOCALAPPDATA%\\LavaPrimeAndroidBuild\\LavaPrimeAndroid\\app\\outputs\\apk\\debug\\app-debug.apk`.

## Inventario do `Material_Visual`

Arquivos observados:

- `ChatGPT Image 27 de jun. de 2026, 00_29_01.png`
- `ChatGPT Image 27 de jun. de 2026, 22_08_01 (1).png`
- `ChatGPT Image 27 de jun. de 2026, 22_08_01 (2).png`
- `ChatGPT Image 27 de jun. de 2026, 22_08_02 (4).png`
- `ChatGPT Image 27 de jun. de 2026, 22_08_26 (1).png`
- `ChatGPT Image 27 de jun. de 2026, 22_08_26 (2).png`
- `ChatGPT Image 27 de jun. de 2026, 22_08_27 (3).png`
- `ChatGPT Image 27 de jun. de 2026, 22_08_27 (4).png`
- `ChatGPT Image 27 de jun. de 2026, 22_08_27 (5).png`

Identificacao funcional desta fase:

- logo principal: composicao `LP + LavaPrime` observada nos assets `00_29_01` e `22_08_26 (1)`;
- guia de identidade: `22_08_01 (1)` com marca principal, variacoes, paleta, tipografia e exemplos de componentes;
- icone isolado: variacao `icone isolado` mostrada no guia visual;
- icone de app/avatar: variacao `icone app / avatar` mostrada no guia visual;
- cores oficiais identificadas: `#0B3348`, `#22B8EA`, `#A6D608`, `#EEF6F8`, `#C9DCE5`, `#0F2230`;
- mockups/referencias visuais: `22_08_27 (5)` e outras pranchas da pasta.

## Classificacao da base atual

### Keep

- `MainActivity.kt` e `LavaPrimeApp.kt`;
- identidade do app como `LavaPrime` no manifest;
- build externo em `%LOCALAPPDATA%\\LavaPrimeAndroidBuild` para fugir do lock do OneDrive;
- `Material_Visual/**` como fonte oficial de identidade;
- adaptive icon e branding vetorial base;
- telas `Splash`, `Initial`, `Login`, `Dashboard`, `Patio`, `Cadastros`, `Produtos`, `Seguranca/Sync`;
- `ConnectivityMonitor`, `SyncCoordinator`, `SyncWorker` como fundacao;
- README Android atualizado para a base atual.

### Refactor

- `ui/components/LavaPrimeComponents.kt` para evoluir a um design system com nomes/padroes mais formais;
- navegacao atual por `MobileRoute` manual, sem `NavHost`;
- `LavaPrimeRepository` muito centralizado;
- `Theme.kt` e paleta para aproximacao mais fiel e reutilizavel;
- placeholders de `Agendamentos`, `Servicos`, `Financeiro`, `Relatorios` e `Meu negocio`.

### Replace

- `fallbackToDestructiveMigration()` na base final;
- uso de `ProdutoEntity(tipo = "Insumo")` como substituto permanente de dominio proprio;
- `payloadResumo` como representacao definitiva da fila de sync;
- login demo como estrategia definitiva.

### Archive

- launcher XML legado em `mipmap-anydpi-v26`, substituido pela estrutura nova em `mipmap-anydpi`;
- qualquer starter antigo que ainda descreva a base como prototipo simplificado e nao como fundacao atual.

## Estado funcional observado

Ja existe e compila:

- splash oficial em Compose;
- tela inicial institucional;
- login mobile com perfis `Administrador` e `Operador`;
- shell com drawer;
- dashboard;
- patio com novo atendimento rapido;
- cadastros de cliente e veiculo;
- produtos/insumos em leitura;
- tela de seguranca e sincronizacao com fila local e auditoria.

Ainda nao existe de forma real:

- dominio proprio de pagamentos;
- documentos/recibos;
- impressao termica;
- migracao Room segura sem fallback destrutivo;
- sync remoto real;
- modulos operacionais completos alem do patio.

## Riscos remanescentes

1. a base ainda depende de `fallbackToDestructiveMigration()`;
2. boa parte do codigo Android ainda nao estava commitada antes desta trilha mestre;
3. os contratos oficiais continuam fora do runtime Android;
4. o worktree geral do repositorio segue misturado com mudancas Web e Android preexistentes fora desta fatia.

## Rollback desta execucao

1. reverter os arquivos Android e docs desta fatia;
2. manter fora qualquer arquivo Web, `.gitignore` ou doc paralela fora do escopo Android;
3. reexecutar `git status --short`, `git diff --name-only`, `npm.cmd run primyo:gate`, `gradlew tasks` e `assembleDebug`.

## Proxima fatia objetiva

- consolidar o commit da fundacao Android atual;
- iniciar a fase `LP-AND-002` com migracao Room segura;
- depois separar dominios criticos: `Supply`, `Payment`, `Document` e `Company`.
