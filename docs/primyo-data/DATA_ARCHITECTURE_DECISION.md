# LavaPrime Data Architecture Decision

## 1. Status

Status da decisao: `Aceita`

Data de aceite tecnico: `2026-06-23`

## 2. Objetivo

Formalizar a arquitetura alvo de dados do LavaPrime antes da primeira implementacao de persistencia real.

## 3. Contexto

A descoberta de `LP-DATA-001` confirmou que o LavaPrime ainda opera com dados distribuidos entre:

- memoria do navegador;
- `localStorage`;
- arquivos locais versionados;
- Room no Android;
- schema Supabase ainda nao conectado ao runtime do web.

Essa distribuicao impede ownership claro, aumenta o risco de divergencia entre superficies e torna insegura qualquer implementacao de persistencia sem decisao arquitetural previa.

## 4. Decisao oficial

A arquitetura alvo de dados do LavaPrime fica oficialmente definida assim:

### 4.1 Supabase como fonte oficial de verdade

Supabase passa a ser a fonte oficial de verdade para todo dado compartilhado entre:

- usuarios;
- dispositivos;
- superficies web e Android;
- operacao, financeiro, cadastros, configuracoes e rastreabilidade.

Isso inclui, quando implementado:

- identidade e membership;
- configuracoes da empresa;
- cadastros centrais;
- operacao de atendimento;
- financeiro;
- historico documental e rastreabilidade.

### 4.2 `localStorage` apenas como suporte temporario

`localStorage` deixa de ser considerado destino definitivo para dados de negocio.

Seu papel futuro permitido fica restrito a:

- cache local;
- convivencia temporaria durante migracao controlada;
- rascunhos e estados auxiliares de baixo risco;
- suporte de transicao enquanto o backend nao assumir um dominio por completo.

### 4.3 Room Android como replica offline futura

Room no Android passa a ser classificado como replica offline futura com fila de sincronizacao controlada.

Principios:

- Room nao e autoridade definitiva para dados compartilhados;
- o backend decide o estado final;
- o Android pode operar offline, mas precisa convergir por contrato de sincronizacao;
- migracoes destrutivas nao podem permanecer como estrategia permanente.

### 4.4 FIPE local como base de referencia

A base FIPE local permanece autorizada como referencia tecnica local para busca de marca e modelo.

Limite explicito:

- FIPE nao e fonte de verdade transacional do negocio;
- FIPE nao substitui cadastro oficial de cliente, veiculo ou atendimento.

### 4.5 Sessao e UI como estado local legitimo

Os seguintes estados podem permanecer locais por natureza:

- sessao atual;
- perfil ativo;
- estado de interface;
- filtros;
- selecoes temporarias;
- caches de leitura e renderizacao.

Esses estados nao devem ser usados como autoridade de dados compartilhados.

## 5. Regras invariantes

A partir desta decisao, os seguintes invariantes passam a valer:

1. Nenhuma entidade compartilhada deve ter duas fontes autoritativas ativas por design.
2. `localStorage` nao pode ser promovido novamente a banco definitivo de negocio.
3. Room Android nao pode divergir semanticamente do contrato oficial de backend.
4. Todo dado financeiro deve convergir para um modelo auditavel e relacional.
5. Dado derivado em memoria nao pode ser tratado como registro primario durante migracao.

## 6. Implicacoes por superficie

### Web

- deve deixar de depender de arrays em memoria e `localStorage` como autoridade definitiva;
- deve consumir contratos de dados estabilizados antes de qualquer cutover;
- pode manter estado local apenas para UI, sessao e convivio controlado.

### Android

- deve convergir para replica offline com sincronizacao futura;
- nao deve seguir evoluindo como modelo paralelo sem governance de contratos;
- exige plano especifico para sair de `fallbackToDestructiveMigration()`.

### Backend

- torna-se o centro oficial de ownership por entidade;
- deve receber migracao por fases, com rollback e observabilidade;
- nao deve ser ligado ao web antes de contratos e ordem de migracao aprovados.

## 7. Nao objetivos desta decisao

Esta decisao nao autoriza:

- ligar Supabase ao runtime;
- criar migrations novas;
- alterar schema existente;
- migrar dados reais;
- alterar comportamento do web;
- alterar Android;
- refatorar o monolito.

## 8. Consequencias praticas

Consequencias imediatas:

- qualquer proxima fatia de persistencia precisa respeitar esta arquitetura;
- o dominio financeiro exige planejamento dedicado antes de implementacao;
- a ordem de migracao deve ser controlada por dependencia e rollback;
- contratos de dados passam a ser obrigatorios antes de conectar o backend.

## 9. Aceite tecnico

Aceite tecnico: `Aprovado`

Esta decisao passa a ser a referencia oficial da arquitetura de dados do LavaPrime ate revisao formal futura.
