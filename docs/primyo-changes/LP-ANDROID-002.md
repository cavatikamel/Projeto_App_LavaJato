# LP-ANDROID-002

- Change ID: `LP-ANDROID-002`
- Backlog ID: `LP-AND-001`
- Titulo: Revisao da estrategia de dados Android e dos contratos futuros de backend
- Objetivo: revisar o modelo de dados atual do `LavaPrimeAndroidApp` em relacao ao LavaPrime Web e aos contratos futuros do programa, sem criar integracao real e sem alterar codigo funcional
- Motivo da mudanca: apos a baseline de `LP-ANDROID-001`, a principal lacuna remanescente estava na convivencia entre Room local, seed demo, dominios do Web e contratos oficiais de dados
- Area afetada: `Android`, `Backend`, `Docs`, `Governanca`
- Arquivos afetados:
  - `docs/primyo-android/ANDROID_ARCHITECTURE.md`
  - `docs/primyo-android/ANDROID_OFFLINE_FIRST.md`
  - `docs/primyo-android/ANDROID_SYNC_STRATEGY.md`
  - `docs/primyo-android/ANDROID_WEB_PARITY_MAP.md`
  - `docs/primyo-android/ANDROID_SECURITY_MODEL.md`
  - `docs/primyo-android/ANDROID_ROADMAP.md`
  - `docs/primyo-android/ANDROID_DATA_PARITY_MATRIX.md`
  - `docs/primyo-changes/LP-ANDROID-002.md`
  - `docs/primyo-changes/LP-ANDROID-002-CLOSURE.md`
  - `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
- Risco: `Alto`
- Dependencias:
  - `LP-ANDROID-001`
  - `LP-DATA-004`
  - `LP-DATA-005`
  - `LP-SEC-001`
- Responsavel: `Codex`
- Aprovador tecnico: `Kamel / Primyo`
- Data: `2026-06-30`

## Escopo

- auditar em modo leitura entidades Room, DAOs, repository, fila de sync, auditoria, ViewModels e modelos usados nas telas reais do Android;
- auditar em modo leitura o dominio funcional do Web para clientes, veiculos, atendimentos, servicos, produtos, insumos, pagamentos, documentos, usuarios, empresa e auditoria minima;
- registrar matriz Android x Web com equivalencias, ausencias, conflitos, IDs, status offline e acao recomendada;
- atualizar documentacao Android e propagar o encerramento desta fase na governanca.

## Fora de escopo

- alterar qualquer arquivo em `LavaPrimeAndroidApp/**`;
- alterar `app/main.js`, `app/styles.css`, `app/adapters/**`, `app/demo/**`, `scripts/**` ou migracoes Supabase;
- criar API, integrar Supabase, abrir auth real, criar migration Room ou remover `fallbackToDestructiveMigration()`;
- corrigir build Android, placeholders ou fluxos funcionais;
- fazer push.

## Diagnostico consolidado

### Tabelas e entidades Android observadas

- tabelas Room atuais: `usuarios`, `clientes`, `veiculos`, `servicos`, `produtos`, `atendimentos`, `audit_logs`, `sync_queue`;
- entidades observadas: `UsuarioEntity`, `ClienteEntity`, `VeiculoEntity`, `ServicoEntity`, `ProdutoEntity`, `AtendimentoEntity`, `AuditLogEntity`, `SyncQueueEntity`;
- nao foram encontradas entidades proprias para pagamento, financeiro, documentos, empresa, orcamentos ou insumos separados.

### Fluxos de dados realmente usados pelas telas

- `DashboardScreen` usa `produtos`, `atendimentos` e estado local de sync;
- `PatioViewModel` e `PatioScreen` usam `AtendimentoEntity` e `ServicoEntity`;
- `CadastroViewModel` e `CadastrosScreen` usam `ClienteEntity` e `VeiculoEntity`;
- `ProductsScreen` apenas le `ProdutoEntity`;
- `SyncViewModel` e `SecuritySyncScreen` usam `SyncQueueEntity`, `AuditLogEntity`, conectividade e `SyncCoordinator`.

### Matriz resumida Android x Web

- clientes: equivalente existe, mas nao cumpre o contrato oficial de `Customer`;
- veiculos: equivalente existe, mas falta status, tipo veicular canonico, owner history e refs de cuidado especial;
- atendimentos: equivalente existe, mas falta agregado de servicos, produtos, historico e refs financeiras;
- servicos: equivalente parcial;
- produtos: equivalente parcial e misturado com pseudo-insumo;
- insumos: sem entidade propria no Android;
- pagamentos, financeiro, documentos e empresa: ausentes no Android;
- auditoria e fila de sync: existem, mas ainda sem envelope contratual oficial.

### IDs, ownership e sync

- os modelos locais usam `id` em string, mas sem separar `id` canonico, `sourceId` e `legacyRefs`;
- `empresaId` aparece como marcador local, normalmente `local-demo`, e nao como `organizationId` oficial;
- `sync_queue` so cobre `clients`, `vehicles` e `attendances`;
- a fila carrega apenas `payloadResumo`, nao um payload contratual validavel.

### Impacto sobre offline e impressao futura

- o Android ja suporta operacao local basica de patio e cadastro, mas nao operacao financeira offline confiavel;
- sem pagamento, documento e configuracao de empresa locais, impressao termica futura ainda nao tem base canonica suficiente;
- `fallbackToDestructiveMigration()` continua sendo o maior risco de perda de dados offline.

## Principais riscos

1. perda de dados offline por migracao destrutiva ainda ativa.
2. conflito semantico entre contratos oficiais e modelos locais parciais ou misturados.
3. impossibilidade de conciliar pagamento, recibo e impressao futura com o modelo atual.
4. fila de sync incapaz de representar o contrato oficial ou cobrir dominios criticos.
5. login demo e `empresaId` local mascarando tenancy e ownership reais.

## Plano de implementacao

1. confirmar governanca e baseline Android existentes;
2. reler o modelo Room e seus fluxos de tela em modo leitura;
3. comparar o Android ao dominio funcional do Web e aos contratos oficiais;
4. registrar a matriz documental e atualizar a trilha Android sem tocar runtime.

## Plano de teste

- `git status --short`;
- `git diff --name-only`;
- listagem das entidades e tabelas Room atuais;
- verificacao dos pontos de dados usados pelas telas atuais;
- verificacao de modelos duplicados ou paralelos;
- verificacao de dependencia real de internet e cobertura da `sync_queue`;
- `npm.cmd run primyo:gate`.

## Resultado da validacao

- `git status --short` executado;
- `git diff --name-only` executado;
- entidades, tabelas, telas consumidoras e dependencias reais de dados auditadas;
- `sync_queue` confirmada como parcial, cobrindo apenas clientes, veiculos e atendimentos;
- `npm.cmd run primyo:gate` reexecutado para validar o baseline documental;
- `gradlew tasks` nao foi reexecutado nesta fase porque o objetivo era apenas revisar dados e o lock externo de JDK ja havia sido diagnosticado em `LP-ANDROID-001`, sem correcao autorizada.

## Smoke documental

- Android possui modelo local para atendimento: `Sim`
- Android possui modelo local para cliente: `Sim`
- Android possui modelo local para veiculo: `Sim`
- Android possui modelo local para pagamento: `Nao`
- Android possui modelo local para produtos/servicos/insumos: `Parcial`
- Android possui fila para operacoes pendentes: `Sim`
- Android possui estrategia clara de ID local/remoto: `Nao`
- Android possui regra de conflito offline: `Nao`
- Android esta alinhado ao Web: `Nao`
- Android esta pronto para iniciar Room foundation/migrations: `Nao`

## Plano de rollback

1. remover `docs/primyo-android/ANDROID_DATA_PARITY_MATRIX.md`;
2. reverter as atualizacoes em `ANDROID_ARCHITECTURE.md`, `ANDROID_OFFLINE_FIRST.md`, `ANDROID_SYNC_STRATEGY.md`, `ANDROID_WEB_PARITY_MAP.md`, `ANDROID_SECURITY_MODEL.md` e `ANDROID_ROADMAP.md`;
3. reverter `docs/primyo-changes/LP-ANDROID-002.md` e `docs/primyo-changes/LP-ANDROID-002-CLOSURE.md`;
4. reverter as entradas desta fase em `ADEQUATION_BACKLOG.md` e `CHANGE_CONTROL.md`;
5. reexecutar `git status --short`, `git diff --name-only` e `npm.cmd run primyo:gate`.

## Decisao final

- `Aprovado com ressalvas`
- ressalvas:
  - Android continua sem dominio local de pagamento, financeiro, documentos e empresa;
  - conflito de identidade e ownership ainda nao foi resolvido em runtime;
  - migracao destrutiva continua bloqueando qualquer claim de offline-first pronto para producao.
