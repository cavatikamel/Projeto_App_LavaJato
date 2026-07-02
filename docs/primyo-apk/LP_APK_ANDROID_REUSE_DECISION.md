# LP APK Android Reuse Decision

## Objetivo

Registrar a decisao formal de reuso da base atual de `LavaPrimeAndroidApp` antes da reconstrucao tela por tela do app Android nativo `LavaPrime`.

## Resumo do estado atual do Android

O projeto Android atual e um checkpoint tecnico parcial com stack moderna e algumas telas reais, mas ainda sem fundacao de dados, identidade visual aplicada por asset oficial e paridade funcional suficiente para ser tratado como base final de produto.

### O que existe de fato

- projeto Android nativo em Kotlin com `Jetpack Compose`;
- modulo unico `:app`;
- `applicationId` e `namespace` oficiais: `br.com.primyo.lavaprime`;
- `Room`, `WorkManager`, `Navigation Compose`, `StateFlow` e monitor de conectividade;
- telas reais de `Splash`, `Initial`, `Login`, `Dashboard`, `Patio`, `Cadastros`, `Produtos` e `Security/Sync`;
- fila local `sync_queue`, auditoria minima e schema Room exportado.

### O que hoje e apenas shell

- sincronizacao remota: existe apenas mensagem de readiness e incremento de tentativas;
- `Agendamentos`, `Servicos`, `Financeiro`, `Relatorios` e `Config` ainda sao placeholders;
- auth atual e demonstrativa, baseada em heuristica local de email/senha;
- seed inicial e login demo estao embutidos no runtime;
- o fluxo de atendimento ainda cobre apenas atendimento rapido e transicao simples de status.

### O que nao tem paridade Web suficiente

- clientes e veiculos ainda estao combinados em um unico fluxo simplificado;
- produtos e insumos ainda nao estao modelados como dominios distintos;
- nao existe dominio local adequado para pagamentos, documentos, empresa, vendas, orcamentos e financeiro;
- o patio nao cobre a profundidade operacional do Web para atendimento completo;
- a trilha de sync nao possui estrategia real de conflito, reenvio por payload canonico nem interfaces remotas concretas.

### O que esta visualmente desalinhado

- `Material_Visual/**` contem assets oficiais, mas o app atual usa logo vetorial propria e nao os assets oficiais como fonte primaria;
- o icone de launcher atual e um placeholder vetorial, nao o monograma oficial quadrado observado em `Material_Visual`;
- existe boa direcao de paleta e componentes, mas ainda sem baseline visual oficial fechada contra Web + `Material_Visual`.

### O que esta funcionalmente incompleto

- atendimento nao suporta itens multiplos, fechamento completo, pagamento estruturado ou documento;
- cadastros nao preservam a riqueza funcional do Web;
- sync e auditoria existem apenas como fundacao parcial;
- nao ha suite minima de testes Android;
- Room segue com schema curto, sem migracoes explicitas e sem separacao alinhada aos contratos.

### O que representa risco principal

- `fallbackToDestructiveMigration()` segue ativo na base Room;
- entidades locais nao possuem envelope futuro consistente de `remoteId`, `deletedAt`, `syncVersion` e auditoria minima completa;
- `LavaPrimeRepository` concentra seed demo, auth demo, CRUD local e mudancas de sync em uma unica camada;
- placeholders e fluxos parciais aumentam o risco de continuar remendando a base atual em vez de fundar a arquitetura final.

## Decisao geral recomendada

`clean-foundation-inside-current-project`

## Justificativa da decisao principal

Essa e a opcao mais segura porque:

1. existe valor real a preservar no projeto atual: setup Gradle, modulo Android, empacotamento, Compose baseline, monitor de conectividade, WorkManager shell e parte do design system;
2. a fundacao de dados, auth, sync, repositorios e dominios centrais esta rasa demais para suportar a reconstrucao por cima sem alto risco de retrabalho;
3. arquivar tudo e reconstruir em outro projeto desperdicaria shell tecnico util e aumentaria o custo de setup sem necessidade;
4. seguir apenas com `controlled-refactor` subestima o quanto a base de dados e os modelos atuais conflitam com os contratos e com o baseline funcional do Web.

## Opcoes descartadas

| Opcao | Motivo para nao recomendar |
| --- | --- |
| `continue-current-base` | arrisca cristalizar demo auth, Room raso, placeholders e modelo de dados desalinhado |
| `controlled-refactor` | melhora a casca, mas nao reduz o risco estrutural de continuar expandindo fundacao inadequada |
| `archive-current-implementation-and-rebuild` | perde setup e shells realmente uteis que podem ser preservados no mesmo projeto |

## Leitura operacional da decisao

- `keep`: preservar empacotamento, stack, parte do tema, monitor de conectividade, WorkManager shell e documentacao;
- `refactor`: preservar conceito, mas reescrever com base oficial de visual, navegacao e estados;
- `replace`: substituir fundacao de dados, auth demo, repositorio monolitico e modulos combinados/desalinhados;
- `archive`: parar de tratar placeholders e seed/demo heuristica como fundacao evolutiva do produto.

## Resultado esperado para as proximas fases

- `LP-APK-003` deve fechar a baseline visual oficial;
- `LP-APK-004` deve congelar requisitos e aceite sobre base realista;
- `LP-APK-005` em diante deve construir a nova fundacao dentro do projeto atual, reaproveitando apenas as partes classificadas como seguras.
