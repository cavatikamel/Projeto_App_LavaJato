# LavaPrime Entity Migration Order

## 1. Objetivo

Definir a ordem recomendada de migracao por entidade, considerando risco, dependencia, impacto financeiro, impacto operacional e facilidade de rollback.

## 2. Principio de leitura

Esta ordem distingue duas coisas:

1. o que precisa ser planejado primeiro;
2. o que deve ser migrado primeiro em implementacao real.

Isso evita um erro comum: planejar por ultimo o dominio mais arriscado e descobrir tarde demais que ele trava toda a arquitetura.

## 3. Ordem de planejamento obrigatoria

Antes de qualquer implementacao real, a ordem de planejamento recomendada e:

1. Financeiro
2. Atendimentos
3. Clientes e veiculos
4. Configuracoes do negocio
5. Catalogos centrais
6. Documentos e rastreabilidade

Justificativa:

- financeiro concentra o maior risco de inconsistencias e depende de varias estruturas paralelas;
- atendimentos alimentam caixa, faturamento e historicos;
- clientes e veiculos sustentam quase todo o resto;
- configuracoes e catalogos precisam de contrato estavel antes de escrita remota.

## 4. Ordem recomendada de migracao real por entidade

| Ordem | Entidade ou dominio | Risco | Dependencias principais | Impacto operacional | Impacto financeiro | Facilidade de rollback | Justificativa |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Configuracoes do negocio | Medio | `organizations`, `business_profiles`, `payment_methods`, `finance_settings` | Medio | Medio | Alta | e um dominio estruturante, mas com rollback mais simples do que atendimento e financeiro |
| 2 | Servicos | Medio | configuracoes e contrato de catalogo | Medio | Medio | Alta | reduz chaveamento local espalhado e prepara quotes e atendimentos |
| 3 | Insumos e perfis de consumo | Medio | servicos | Medio | Medio | Media | dependem de servicos e ajudam a estabilizar estoque antes da operacao principal |
| 4 | Produtos e movimentos de estoque | Medio | configuracoes, insumos | Medio | Medio | Media | organizam venda e estoque antes de acoplar financeiro completo |
| 5 | Clientes | Alto | configuracoes e contrato de identidade organizacional | Alto | Medio | Media | removem uma das maiores duplicidades do web atual |
| 6 | Veiculos, owner history e cuidados especiais | Alto | clientes | Alto | Medio | Media | dependem de clientes e sustentam patio, check-list e atendimento |
| 7 | Operadores e usuarios | Alto | configuracoes e identidade | Alto | Medio | Media | precisam convergir com sessao e autorizacao futuras sem quebrar o fluxo local atual |
| 8 | Orcamentos | Medio | clientes, veiculos, servicos, produtos | Medio | Medio | Alta | dominio util para validar relacoes antes do atendimento oficial |
| 9 | Atendimentos e patio | Alto | clientes, veiculos, servicos, produtos, operadores | Muito alto | Alto | Baixa | e a origem operacional real de varios eventos sensiveis |
| 10 | Document history e metadados de relatorio | Medio | configuracoes, clientes, atendimentos | Medio | Medio | Media | deve vir apos os dominios que geram os artefatos |
| 11 | Financeiro | Critico | atendimentos, clientes, configuracoes, payment methods, produtos, faturamento | Muito alto | Muito alto | Baixa | deve ser o ultimo cutover operacional, mas o primeiro grande planejamento |

## 5. Leitura da ordem

### Por que financeiro nao e o primeiro cutover

Apesar de ser o dominio de maior risco, financeiro nao deve ser o primeiro dominio migrado em producao porque depende de:

- clientes reconciliados;
- veiculos e atendimentos com ids estaveis;
- metodos de pagamento e configuracoes oficiais;
- catalogos e eventos operacionais bem definidos.

### Por que financeiro deve ser a proxima fatia de planejamento

Mesmo nao sendo o primeiro cutover, financeiro deve ser a proxima fatia de planejamento porque:

- concentra maior exposicao a perda de rastreabilidade;
- hoje esta espalhado entre memoria, `localStorage` e estruturas derivadas;
- sua definicao influencia contratos de atendimento, faturamento e configuracoes.

## 6. Entidades que nao entram como fonte transacional

Itens que nao entram como migracao transacional principal:

- sessao atual;
- UI local;
- filtros e selecoes transitivas;
- FIPE local.

Esses itens permanecem locais ou referenciais por desenho.

## 7. Decisao desta fase

Decisao recomendada:

- planejar `Financeiro` primeiro;
- migrar `Configuracoes`, `Catalogos`, `Clientes`, `Veiculos` e `Atendimentos` antes do cutover financeiro final;
- adiar qualquer sincronizacao Android ate o contrato web/backend por dominio estar estabilizado.
