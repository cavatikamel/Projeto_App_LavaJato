# LavaPrime Supabase Adoption Plan

## 1. Objetivo

Planejar a adocao gradual do Supabase pelo LavaPrime sem iniciar implementacao nesta fase.

## 2. Premissas obrigatorias

- Supabase ja foi aprovado como fonte oficial de verdade.
- Nenhuma adocao deve acontecer sem contrato de dados por dominio.
- Nenhuma fase pode misturar leitura, escrita e migracao ampla sem rollback claro.
- O web e o Android devem conviver com o legado apenas por transicao controlada.

## 3. Fases de adocao

### Fase 1 - Preparacao de contrato de dados

Objetivo:

- formalizar contratos canonicos por entidade e por relacionamento.

Entradas:

- `DATA_ARCHITECTURE_DECISION.md`
- `DATA_CONTRACTS_DRAFT.md`
- `ENTITY_MIGRATION_ORDER.md`

Saidas esperadas:

- contratos aprovados por dominio;
- ownership por entidade;
- ids, relacionamentos e invariantes definidos;
- criterios de migracao e rollback por dominio.

Criterio de saida:

- nenhuma entidade prioritaria permanece sem contrato minimo aprovado.

### Fase 2 - Cliente Supabase isolado

Objetivo:

- isolar o cliente tecnico de backend sem conecta-lo ao fluxo principal do produto.

Escopo planejado:

- camada tecnica separada do monolito;
- adaptadores por dominio;
- sem ativar leitura ou escrita em producao local.

Saidas esperadas:

- cliente desacoplado do fluxo funcional atual;
- pontos de chamada identificados;
- risco tecnico documentado.

Criterio de saida:

- o cliente existe como fronteira tecnica isolada e reversivel.

### Fase 3 - Leitura controlada

Objetivo:

- introduzir leitura controlada e observavel por dominios de menor risco.

Escopo planejado:

- comparacao entre fonte legada e leitura remota;
- modo somente leitura;
- gates manuais e tecnicos antes de ampliar cobertura.

Saidas esperadas:

- checklist de paridade por dominio;
- estrategia de fallback para fonte legada;
- dominios piloto identificados.

Criterio de saida:

- leitura remota de um dominio piloto validada sem substituir a fonte legada de forma abrupta.

### Fase 4 - Escrita controlada

Objetivo:

- permitir escrita controlada por dominio, com rollback simples e rastreabilidade.

Escopo planejado:

- escrita observavel;
- dupla validacao do evento gravado;
- rastreamento de erro e criterios de abortar.

Saidas esperadas:

- politica de escrita por dominio;
- plano de rollback por entidade;
- evidencias de consistencia minima.

Criterio de saida:

- a escrita de um dominio piloto pode ser interrompida sem perda de rastreabilidade.

### Fase 5 - Migracao por entidade

Objetivo:

- migrar entidades segundo ordem aprovada e dependencia real.

Escopo planejado:

- executar a ordem definida em `ENTITY_MIGRATION_ORDER.md`;
- tratar reconciliacao, deduplicacao e historicos por fase;
- retirar o legado apenas apos paridade comprovada.

Saidas esperadas:

- dominios migrados com evidencias;
- matriz de convivio legado x backend;
- remocao gradual de ownership local.

Criterio de saida:

- cada entidade migra apenas apos contrato, leitura, escrita e rollback estarem aprovados.

### Fase 6 - Sincronizacao Android futura

Objetivo:

- alinhar o Android ao backend como replica offline controlada.

Escopo planejado:

- contratos de sincronizacao;
- estrategia de conflito;
- fila `sync_queue` alinhada ao ownership oficial;
- substituicao gradual de pressupostos locais atuais.

Saidas esperadas:

- estrategia mobile de sincronizacao;
- matriz de conflitos;
- plano para sair de migracao destrutiva.

Criterio de saida:

- Android deixa de operar como trilha paralela sem governanca.

### Fase 7 - Retirada gradual de fontes locais antigas

Objetivo:

- remover ownership legado de memoria e `localStorage` apos estabilizacao do backend.

Escopo planejado:

- desligamento gradual de arrays em memoria;
- retirada de chaves locais por dominio;
- limpeza controlada de duplicidades.

Saidas esperadas:

- inventario legado reduzido;
- ownership consolidado no backend;
- rollback final definido por dominio.

Criterio de saida:

- nenhuma entidade compartilhada continua dependendo de fonte local antiga como autoridade.

## 4. Gates transversais

Toda fase futura devera responder:

- qual dominio esta em foco;
- qual fonte atual sera preservada durante a convivencia;
- qual evidencia confirma paridade;
- qual comando e smoke test deverao passar;
- qual e o rollback exato;
- o que precisa acontecer para abortar a fase.

## 5. Riscos que bloqueiam adocao prematura

- iniciar cliente Supabase sem contrato aprovado;
- conectar leitura remota antes de decidir ownership;
- migrar financeiro sem reconciliacao de eventos e totais;
- alinhar Android antes de estabilizar o contrato web/backend;
- remover `localStorage` antes de existir fallback seguro.

## 6. Decisao desta fase

Supabase esta aprovado como destino arquitetural, mas sua adocao continuara em fases pequenas, reversiveis e auditaveis.
