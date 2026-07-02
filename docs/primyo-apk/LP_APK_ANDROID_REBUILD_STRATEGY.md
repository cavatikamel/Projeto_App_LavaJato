# LP APK Android Rebuild Strategy

## Objetivo

Traduzir a decisao `clean-foundation-inside-current-project` em uma estrategia operacional clara para as proximas fases do `Programa LavaPrime APK`.

## Principio central

O rebuild deve acontecer dentro do projeto atual `LavaPrimeAndroidApp`, preservando apenas as partes classificadas como seguras e impedindo que modelos demo, placeholders e schema Room parcial continuem crescendo como se fossem base oficial.

## Leitura pratica da estrategia

### Keep

Preservar sem reescrever como prioridade:

- projeto Android atual e empacotamento `:app`;
- configuracao Gradle, namespace e `applicationId`;
- `ConnectivityMonitor`;
- parte da fundacao Compose/tema como ponto de partida;
- documentacao Android e APK ja consolidada.

### Refactor

Preservar conceito, mas reescrever a implementacao:

- manifest, splash e identidade aplicada;
- top bar, drawer, cards, chips, buttons e demais componentes Compose;
- root/navigation;
- dashboard, patio e security/sync shell;
- `SyncWorker`, `SyncCoordinator`, `AuditLog` e `sync_queue`.

### Replace

Substituir a fundacao por implementacao nova dentro do mesmo projeto:

- schema Room;
- entidades e DAOs;
- repositorios;
- auth demo, sessao local demo e defaults de seed;
- cadastros combinados de clientes/veiculos;
- modelagem de produtos/insumos;
- fluxo simplificado de atendimento.

### Archive

Parar de tratar como parte evolutiva do produto:

- `ModuleScreen` como placeholder definitivo;
- `loginDemo()` como auth aceitavel;
- `seedInicial()` como fundacao de negocio;
- qualquer leitura de progresso que confunda shell visual com funcionalidade pronta.

## Sequencia recomendada de execucao

1. `LP-APK-003`
   - fechar baseline visual oficial usando `Material_Visual` + Web;
   - definir logo principal, monograma, iconografia e tipografia de referencia.
2. `LP-APK-004`
   - congelar requisitos oficiais com leitura explicita do que ja e parcial, do que deve ser substituido e do que ainda esta ausente.
3. `LP-APK-005`
   - fundar design system Compose oficial sobre a baseline visual aprovada.
4. `LP-APK-006` a `LP-APK-010`
   - reconstruir shell de splash, login, permissao, navegacao, dashboard e patio sobre a nova base visual.
5. `LP-APK-027` a `LP-APK-029`
   - tratar a fundacao de dados, sync e auditoria como hardening obrigatorio, nao como detalhe posterior.

## Regra para evitar retrabalho

As proximas fases nao devem:

- ampliar o schema Room atual;
- adicionar mais responsabilidades ao `LavaPrimeRepository`;
- transformar placeholders de modulo em falsa conclusao funcional;
- tratar o auth demo atual como ponte aceitavel para um release candidate.

## Gatilhos de reuso autorizados

Uma parte atual so pode ser efetivamente reaproveitada se atender aos tres pontos abaixo:

1. nao conflitar com o baseline funcional do Web;
2. nao depender do modelo demo atual para existir;
3. nao aumentar o custo de migracao para a arquitetura final.

## Gatilhos de substituicao obrigatoria

Uma parte atual deve ser substituida quando:

- conflitar com contratos oficiais;
- depender de `fallbackToDestructiveMigration()`;
- misturar multiplos dominios em uma unica entidade ou tela;
- simular sync ou auth de forma enganosa para o roadmap final.

## Resultado esperado dessa estrategia

O projeto atual continua sendo o container oficial do app, mas a fundacao final passa a nascer de forma controlada, com reuso tecnico seletivo e sem herdar como obrigacao os atalhos do checkpoint parcial.
