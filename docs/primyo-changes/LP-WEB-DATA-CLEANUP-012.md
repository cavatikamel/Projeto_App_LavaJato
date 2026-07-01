# LP-WEB-DATA-CLEANUP-012

## Objetivo

Transformar os bloqueios restantes do `CLEAN_BOOTSTRAP` em um plano objetivo de pre-requisitos para futura ativacao, sem promover o modo limpo a `default`, sem remover massa demo e sem abrir Supabase.

## Escopo executado

- conversao dos bloqueios consolidados em pre-requisitos formais;
- definicao de criterios de aceite e de bloqueio antes de qualquer ativacao futura;
- definicao de sequencia recomendada para ativacao gradual;
- atualizacao da trilha documental, backlog, change control, next slice e politicas de teste.

## Resultado

- a trilha deixa de ter apenas bloqueios listados e passa a ter um plano operacional de pre-requisitos;
- os pre-requisitos passam a ficar agrupados por dados, relacionamentos, smoke, dashboards, documentos, governance, rollback e decisao formal;
- a futura ativacao do `CLEAN_BOOTSTRAP` passa a depender de evidencia objetiva e nao apenas de maturidade tecnica parcial.

## Pre-requisitos definidos

1. base limpa com dados minimos reais ou seed institucional controlada;
2. relacionamentos persistidos entre cliente, veiculo, atendimento, faturamento, pagamentos e documentos;
3. contratos das entidades confirmados;
4. smoke do modo limpo em cenarios vazio, parcial e completo;
5. dashboards validados com dados vazios, parciais e completos;
6. relatorios e documentos validados com dados vazios, parciais e completos;
7. criterio claro para manter, reduzir ou desligar a seed demo;
8. plano de ativacao gradual;
9. plano de rollback;
10. gates e builds aprovados;
11. decisao formal documentada antes de qualquer promocao;
12. Supabase explicitamente decidido como fechado, planejado ou ativado em fase propria;
13. Android explicitamente mantido em trilha propria, sem bloquear o Web.

## Critérios de aceite

- nenhum pre-requisito critico pode permanecer indefinido;
- a sequencia de ativacao futura precisa estar clara;
- os criterios de aceite e de bloqueio precisam ser verificaveis;
- `DEMO_BOOTSTRAP` precisa continuar como unico padrao oficial nesta fase;
- `CLEAN_BOOTSTRAP` precisa continuar protegido;
- nenhuma seed demo pode ser removida;
- Supabase precisa continuar fechado.

## Critérios de bloqueio

- ausencia de base limpa util;
- ausencia de relacionamentos persistidos minimos;
- dashboards, relatorios ou documentos sem validacao em cenarios vazio/parcial/completo;
- inexistencia de plano de ativacao gradual;
- inexistencia de rollback formal;
- tentativa de abrir Supabase ou de promover `CLEAN_BOOTSTRAP` sem decisao formal.

## Rollback

1. remover este change record e o plano de pre-requisitos;
2. reverter ajustes documentais em cleanup, backlog, change control, next slice e politicas de teste;
3. reexecutar `primyo:gate`, `build`, `verify:build` e smoke reduzido.

## Próxima fatia recomendada

`LP-WEB-DATA-CLEANUP-013 - Institutional clean dataset strategy`

Objetivo sugerido:

- definir se a futura base limpa usara seed institucional controlada, dados reais minimos ou estrategia hibrida;
- documentar criterios de composicao dessa base sem abrir Supabase e sem trocar o bootstrap padrao.
