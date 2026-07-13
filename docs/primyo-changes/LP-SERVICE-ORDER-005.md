# LP-SERVICE-ORDER-005

## Fase

`LP-SERVICE-ORDER-005 - Service Order Shadow Write Design And Document Source Enrichment`

## Objetivo

Reduzir a dependencia de inferencia nos documentos derivados e desenhar o futuro `shadow write` da `Service Order` sem executar escrita real.

## Implementacao

- normalizacao tecnica da origem documental adicionada ao runtime;
- prioridade explicita de vinculo documento -> OS implementada;
- documentos derivados passam a carregar `documentServiceOrderSource`;
- recibos novos gerados por atendimento passam a nascer com metadados de OS mais completos;
- diagnostico `documentSourceQuality` adicionado;
- diagnostico `shadowWrite` adicionado;
- plano dry-run de `shadow write` documentado.

## Fora de escopo mantido

- Supabase;
- migration executavel;
- alteracao visual;
- troca da fonte principal de documentos;
- troca da fonte principal do dashboard;
- troca da fonte principal do financeiro;
- `shadow write` real.
