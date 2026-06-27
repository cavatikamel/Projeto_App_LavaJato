# LavaPrime Contract Status And Timestamp Policy

## 1. Objetivo

Definir a politica oficial de status e timestamps compartilhados dos contratos do LavaPrime.

## 2. Status transversal padrao

Estados transversais permitidos por padrao:

- `draft`
- `active`
- `inactive`
- `archived`

## 3. Semantica dos estados transversais

### 3.1 `draft`

Usar quando:

- o registro ainda nao esta pronto para circular oficialmente;
- faltam campos obrigatorios aprovados;
- a entidade ainda vive em fase de preparacao controlada.

### 3.2 `active`

Usar quando:

- a entidade esta valida para operacao atual;
- pode participar de novos fluxos de negocio;
- nao ha restricao de uso futuro naquele contrato.

### 3.3 `inactive`

Usar quando:

- a entidade nao deve mais ser usada em novos eventos;
- o historico precisa permanecer preservado;
- a exclusao fisica nao e aceitavel ou nao foi aprovada.

### 3.4 `archived`

Usar quando:

- a entidade ou envelope deve ser retido apenas para historico, auditoria ou migracao;
- o consumo deve ser somente leitura;
- a superficie nao deve mais trata-la como item operacional vivo.

## 4. Status por familia de contrato

### 4.1 Master data

Padrao recomendado:

- `active` por default
- `inactive` quando o cadastro deixar de aceitar novos usos
- `archived` quando ficar apenas para historico
- `draft` quando ainda nao puder circular como contrato valido

### 4.2 Operacional e financeiro

Quando o contrato tiver status de dominio mais especifico, como `pending`, `confirmed`, `cancelled` ou `reverted`, a semantica do proprio contrato prevalece.

Regra:

- `defaultStatus` do contexto deve respeitar o catalogo oficial daquele contrato;
- nao e permitido forcar `active/inactive/archived/draft` sobre um contrato cujo dominio ja exige outro conjunto de estados.

## 5. Politica de timestamps tecnicos

Campos tecnicos compartilhados:

- `createdAt`
- `updatedAt`
- `deletedAt`, quando a fase futura aprovar soft delete
- `metadata.emittedAt`, no envelope

## 6. Responsabilidade por `createdAt`

`createdAt` representa a criacao do registro compartilhado ou o melhor timestamp historico confiavel disponivel.

Regra:

- se o legado possuir timestamp historico confiavel, ele deve ser preservado;
- se o legado nao possuir esse valor, o adapter so pode usar contexto explicito de backfill ou emissao tecnica;
- o adapter nao pode fingir historico real que nao existe.

## 7. Responsabilidade por `updatedAt`

`updatedAt` representa a ultima atualizacao conhecida do registro compartilhado.

Regra:

- se houver timestamp historico confiavel, ele deve ser preservado;
- se nao houver, pode ser usado timestamp tecnico do contexto, desde que isso gere warning ou metadado explicito quando a fase exigir rastreabilidade;
- `updatedAt` nao pode ser omitido silenciosamente em contratos que o exigem.

## 8. Regra para `deletedAt`

`deletedAt` e reservado para soft delete futuro.

Regras:

- ausencia de `deletedAt` significa apenas "nao marcado como deletado";
- `deletedAt` nao autoriza apagar historico;
- exclusao fisica continua dependente de regras do dominio e de aprovacao especifica.

## 9. Timestamp vindo de contexto

Quando o legado nao trouxer timestamp suficiente, o contexto pode fornecer:

- `now`
- `createdAt`
- `updatedAt`
- `emittedAt`

Regra:

- todo timestamp vindo de contexto deve ser identificavel como decisao tecnica controlada, nao como fato historico inferido.

## 10. Data operacional x data tecnica

### 10.1 Datas operacionais

Exemplos:

- `entryAt`
- `startAt`
- `endAt`
- `effectiveAt`
- `paymentDate`
- `issueDate`
- `dueDate`

Essas datas descrevem o negocio.

### 10.2 Datas tecnicas

Exemplos:

- `createdAt`
- `updatedAt`
- `deletedAt`
- `metadata.emittedAt`

Essas datas descrevem a vida tecnica do registro.

Regra:

- data operacional nunca deve ser usada automaticamente como substituta de data tecnica sem regra explicita aprovada;
- data tecnica nao substitui data operacional na leitura de negocio.

## 11. Decisao desta fase

O LavaPrime passa a tratar status e timestamps como parte da governanca contratual, e nao como detalhe livre de cada adapter.

O que for historico, tecnico ou operacional deixa de ser misturado sem criterio.
