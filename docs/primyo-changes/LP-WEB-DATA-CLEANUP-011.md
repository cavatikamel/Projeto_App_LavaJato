# LP-WEB-DATA-CLEANUP-011

## Objetivo

Consolidar os bloqueios restantes que ainda impedem `CLEAN_BOOTSTRAP` de virar modo padrao, sem promover o modo limpo, sem remover massa demo e sem abrir Supabase.

## Escopo executado

- revisao documental das fases `LP-WEB-DATA-CLEANUP-006` a `LP-WEB-DATA-CLEANUP-010`;
- consolidacao dos bloqueios remanescentes em documento tecnico unico;
- definicao dos criterios minimos para futura promocao de `CLEAN_BOOTSTRAP` a `default`;
- atualizacao da trilha de cleanup, backlog, change control, next slice e politicas de teste.

## Resultado

- os bloqueios restantes deixaram de ficar espalhados entre trial, hardening, observabilidade e confirmacao;
- a trilha passou a separar claramente:
  - bloqueios de observabilidade ja mitigados;
  - bloqueios de semantica critica ja mitigados;
  - bloqueios de dados limpos e relacionamentos persistidos ainda abertos;
  - bloqueios operacionais para promocao segura do modo limpo.

## Bloqueios consolidados

- base limpa sem volume util suficiente;
- ausencia de relacionamentos persistidos reais entre cliente, veiculo, atendimento, faturamento, pagamentos e documentos;
- falta de massa real ou seed institucional controlada para validar uso representativo do modo limpo;
- dependencia da seed demo para demonstracao comercial e smoke funcional;
- risco de dashboards vazios ou pouco uteis fora do ambiente demo;
- risco de relatorios, recibos e documentos sem dados representativos;
- ausencia de ativacao gradual formalizada;
- Supabase ainda fechado e sem trilha de uso runtime aprovada;
- ausencia de criterio formal de aceite para promover o modo limpo;
- Android permanecendo em trilha propria, sem alinhamento de ativacao do bootstrap web.

## Criterios minimos para futura promocao

- base limpa com dados minimos reais ou seed institucional controlada;
- relacionamentos persistidos e verificaveis entre cliente, veiculo, atendimento e faturamento;
- confirmacao de contratos e regras minimas das entidades envolvidas;
- smoke com modo limpo real em cenarios vazio, parcial e suficiente;
- relatorios, documentos e dashboards validados com dados vazios, parciais e completos;
- plano formal de ativacao gradual;
- rollback simples e testado;
- gates tecnicos aprovados;
- decisao formal documentada antes de qualquer promocao a `default`.

## Confirmacoes preservadas

- `DEMO_BOOTSTRAP` continua como modo padrao oficial;
- `CLEAN_BOOTSTRAP` continua protegido e nao ativo como default;
- nenhuma seed demo foi removida;
- nenhuma integracao com Supabase foi iniciada;
- nenhuma alteracao funcional foi feita no runtime nesta fase.

## Riscos

- antecipar a promocao do modo limpo pode produzir telas vazias funcionalmente corretas, mas operacionalmente inuteis;
- relacoes fallback-based ainda podem mascarar ausencia de persistencia real;
- a dependencia comercial da seed demo ainda conflita com uma troca prematura de padrao.

## Rollback

1. remover o documento consolidado desta fase;
2. reverter os ajustes documentais em cleanup, backlog, change control, next slice e politicas de teste;
3. reexecutar `primyo:gate`, `build`, `verify:build` e smoke reduzido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-012 - Clean bootstrap activation prerequisites plan`

Objetivo sugerido:

- definir uma ativacao gradual formal;
- separar criterios para ambiente demo, ambiente limpo e futuro ambiente persistido;
- continuar sem promover `CLEAN_BOOTSTRAP` a default e sem abrir Supabase runtime.
