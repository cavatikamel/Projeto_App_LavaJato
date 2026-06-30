# Android App Strategy

## Objetivo

Definir a direcao oficial do app Android nativo do LavaPrime apos a auditoria `LP-ANDROID-001`, sem iniciar nova implementacao funcional.

## Estado atual auditado

- o app existe como base nativa em `LavaPrimeAndroidApp/`;
- a stack atual e `Kotlin` + `Jetpack Compose` + `Material 3` + `Room`;
- o app opera hoje sobre dados locais seeded e fila local de sync;
- o web continua sendo a referencia funcional e visual;
- o backend real e o Supabase ainda nao foram ligados ao runtime Android.

## Direcao oficial

1. O Android deve permanecer nativo e offline-first, sem `WebView` como solucao principal.
2. O LavaPrime Web continua como referencia de negocio, linguagem e cobertura funcional.
3. O backend compartilhado futuro continua sendo a fonte oficial de verdade para dados cross-device e cross-platform.
4. O `Room` do Android deve evoluir para replica offline controlada, e nao para autoridade definitiva.
5. A trilha Android deve convergir para os contratos oficiais do programa antes de ganhar sync remoto real.

## Principios de produto

- preservar o `Patio` como centro operacional do perfil `Operador`;
- preservar `Dashboard` como entrada do perfil `Administrador`;
- trocar tabelas extensas por cards, listas e fluxos verticais;
- manter campos grandes, acoes acessiveis no polegar e leitura rapida em smartphone e tablet;
- tratar auditoria, fila de sync e rastreabilidade como capacidade estrutural, nao como detalhe opcional.

## O que a base atual ja sustenta

- splash, tela institucional e login local;
- perfis `Administrador` e `Operador`;
- shell mobile com drawer lateral;
- dashboard com KPIs locais;
- patio operacional com filtros, alertas e mudanca de status;
- cadastro rapido de cliente e veiculo;
- produtos e insumos em leitura local;
- auditoria local e fila `sync_queue`;
- monitor de conectividade e mensagem de sync.

## Desalinhamentos que precisam governanca antes de evoluir

- login ainda e demonstrativo e nao representa autenticacao real;
- o modelo Android ainda nao consome os contratos oficiais de dados;
- as entidades locais nao carregam `contractVersion`, `legacyRefs` nem camada formal de mapeamento;
- `fallbackToDestructiveMigration()` permanece ativo;
- o conector remoto ainda e apenas preparado, sem sincronizacao real;
- modulos como `Agendamentos`, `Servicos`, `Financeiro`, `Relatorios` e `Meu negocio` ainda estao em estado placeholder.

## Resultado esperado da trilha futura

- Android alinhado ao modelo de dados oficial do programa;
- sync remoto pequeno, reversivel e auditavel;
- operacao offline preservada;
- mesma intencao funcional do web, mas com experiencia mobile propria;
- reducao progressiva do modelo Android paralelo.
