# Android Offline First

## Objetivo

Consolidar a leitura oficial de offline-first para o Android do LavaPrime depois da auditoria `LP-ANDROID-002`.

## O que ja existe na base

- `Room` como persistencia local principal;
- `SyncQueueEntity` para pendencias;
- `AuditLogEntity` para rastreabilidade local;
- `ConnectivityMonitor` para refletir online/offline;
- `SyncCoordinator` para consolidar estado de tentativa;
- criacao e atualizacao local de clientes, veiculos e atendimentos.

## O que isso significa hoje

- o app nao depende de internet para abrir a base local e operar os fluxos observados;
- mudancas locais entram com `syncStatus = PENDING_SYNC`;
- o app consegue acumular pendencias mesmo sem backend real conectado;
- o modo offline atual e estrutural, mas ainda nao foi fechado com protocolo remoto real.

## Limites do offline atual

- nao existe bootstrap remoto oficial do banco local;
- nao existe confirmacao remota de ack por entidade;
- nao existe reconciliacao real de conflito;
- nao existe politica por dominio para merge, rejeicao ou replay;
- `fallbackToDestructiveMigration()` conflita com a ambicao de offline-first duravel;
- nao ha evidencia executada de retomada real apos reinstall, migration ou troca de dispositivo.

## Lacunas de identidade e ownership

- todas as entidades locais usam `id` como string opaca, mas o app ainda nao separa `id` canonico, `sourceId` e `legacyRefs`;
- `empresaId` local ainda nasce como `local-demo`, sem governance equivalente a `organizationId`;
- o app nao mostra regra oficial para promover um ID local a referencia remota futura ou para reconciliar IDs temporarios com IDs canonicos.

## Cobertura offline real por dominio

- clientes, veiculos e atendimentos possuem escrita local e entram na fila;
- servicos, produtos, usuarios e auditoria existem localmente, mas nao entram no fluxo de saida como contratos completos;
- pagamentos, financeiro, documentos e configuracoes da empresa nao possuem modelo offline local;
- por isso o offline atual cobre operacao basica de patio, mas nao fecha operacao administrativa, recibo ou conciliacao.

## Regra oficial de programa para o Android

- o Android pode operar offline;
- o backend continua decidindo o estado final dos dados compartilhados;
- o cliente local deve publicar eventos ou snapshots controlados;
- a replica local nao pode divergir semanticamente do contrato oficial.

## Regras operacionais futuras

1. toda escrita local sincronizavel deve manter `empresaId`, `syncStatus`, `updatedAt` e identidade estavel;
2. fila local nao deve carregar apenas texto resumido para sempre; ela precisa evoluir para envelope de sync por contrato;
3. dados de sessao, filtros e UI podem permanecer locais;
4. dados de clientes, veiculos, catalogos, atendimentos e financeiro nao podem permanecer locais como autoridade final;
5. migracoes de banco precisam deixar de ser destrutivas antes de chamar o offline de pronto para producao;
6. conflito offline so pode ser tratado como resolvido quando houver regra por dominio, nao apenas um rotulo global de `last write wins`.
