# Android Sync Strategy

## Objetivo

Registrar o estado atual e a direcao futura da sincronizacao Android do LavaPrime sem abrir Supabase nem implementar integracao real.

## Estado atual auditado

- `BuildConfig` recebe `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_ORGANIZATION_ID`;
- `SupabaseRuntimeConfig` apenas expoe configuracao;
- `SyncCoordinator` apenas contabiliza pendencias, conectividade e mensagens;
- `SyncWorker` existe, mas nao foi encontrado agendamento em `WorkManager`;
- nao existe cliente HTTP, SDK Supabase, DAO remoto, mapper contratual nem rotina de pull/push.

## Cobertura atual da fila

- `sync_queue` so recebe mutacoes de `clients`, `vehicles` e `attendances`;
- `usuarios`, `servicos`, `produtos`, `audit_logs`, pagamentos, documentos e configuracoes nao entram em um fluxo remoto observavel;
- o item de fila carrega apenas `entidade`, `entidadeId`, `operacao`, `payloadResumo`, `tentativas` e datas de tentativa;
- o baseline oficial do programa exige evolucao para envelope com `contractName`, `contractVersion`, `payload`, `organizationId`, `source`, `sourceId`, `legacyRefs`, `warnings`, `validation` e `metadata`.

## Leitura tecnica

O app esta preparado para sync futuro, mas ainda nao executa sync remoto de verdade.

Isso significa:

- existe trilha estrutural para evolucao;
- ainda nao existe protocolo de sincronizacao em runtime;
- qualquer claim de sincronizacao atual precisa ser tratada como preparacao, nao como entrega funcional.

## Direcao recomendada

### 1. Bootstrap controlado

- baixar identidade, membership e catalogos oficiais por organizacao;
- carregar `Room` como replica local coerente;
- manter seed demo apenas como suporte de desenvolvimento, nao como base definitiva.

### 2. Fila de saida

- cada mudanca local precisa gerar item de fila com identidade estavel por entidade e operacao;
- o payload futuro deve refletir contrato oficial, nao apenas `payloadResumo`;
- o item de fila precisa distinguir `id` canonico futuro de identificadores locais transitivos;
- retries e backoff precisam ser observaveis.

### 3. Fila de entrada

- o app precisa receber atualizacoes oficiais do backend por timestamp, cursor ou lote controlado;
- catalogos e configuracoes oficiais nao devem depender de recadastro manual local permanente.

### 4. Conflitos

- `last_write_wins` hoje e apenas rascunho de politica;
- conflito real precisa considerar ownership, relacao entre dominios e rastreabilidade;
- conflitos de cliente, veiculo, atendimento e estoque nao podem compartilhar a mesma regra cega;
- financeiro e configuracoes nao devem entrar no primeiro slice remoto.

## Precondicoes antes de sync real

1. contratos Android alinhados aos contratos oficiais do programa;
2. plano para sair de `fallbackToDestructiveMigration()`;
3. ids estaveis por dominio;
4. auth e membership reais;
5. matriz de testes de sync e rollback.

## Ordem recomendada de adocao

1. `LP-ANDROID-002` para fechar estrategia de dados e matriz Android x Web;
2. `LP-AND-002` para plano de migracao nao destrutiva;
3. fase dedicada para split de dominios criticos ausentes ou conflitados no Android;
4. bootstrap remoto pequeno de catalogos e membership;
5. primeiro push pequeno de dominio operacional;
6. sync incremental por mais dominios.
