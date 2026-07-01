# Clean Bootstrap Activation Prerequisites

## Objetivo

Definir os pre-requisitos obrigatorios para qualquer futura ativacao de `CLEAN_BOOTSTRAP`, mantendo `DEMO_BOOTSTRAP` como modo padrao oficial nesta etapa.

## Status atual

- `DEMO_BOOTSTRAP` continua o unico modo padrao seguro;
- `CLEAN_BOOTSTRAP` continua protegido, observavel, auditavel e semanticamente reforcado;
- o trial protegido e util para estudo tecnico;
- o modo limpo ainda nao pode virar `default`.

## Por que ainda nao pode virar padrao

- a base limpa ainda nao tem volume util suficiente;
- os relacionamentos persistidos reais ainda nao existem de forma minima e verificavel;
- a demonstracao comercial ainda depende da seed demo;
- dashboards, relatorios e documentos ainda nao foram validados num modo limpo real em cenarios vazio, parcial e completo;
- nao existe ainda plano formal de ativacao gradual;
- nao existe ainda decisao formal documentada para a promocao.

## Pre-requisitos obrigatorios

### 1. Dados de base

- base limpa com dados minimos reais ou seed institucional controlada;
- definicao explicita do que pode ou nao continuar vindo da seed demo;
- estrategia documentada para ambiente demo, ambiente limpo e futuro ambiente persistido.

### 2. Relacionamentos persistidos

- cliente <-> veiculo;
- cliente/veiculo <-> atendimento;
- atendimento <-> faturamento;
- faturamento <-> pagamentos;
- faturamento/atendimento <-> documentos e relatorios.

Sem isso, a degradacao por fallback continua sendo util apenas para estudo tecnico, nao para `default`.

### 3. Contratos confirmados

- contratos das entidades principais confirmados;
- regras minimas entre dominios alinhadas;
- ausencia de ambiguidade relevante entre dados de atendimento, faturamento e documentos.

### 4. Smoke do modo limpo

O futuro modo limpo precisa ser validado em tres cenarios:

- vazio;
- parcial;
- completo.

Cada cenario precisa revalidar pelo menos:

- login admin;
- dashboard;
- patio;
- clientes;
- financeiro;
- relatorios/documentos;
- logout;
- patio operador.

### 5. Dashboards validados

- com dados vazios: sem erro, com comportamento intencional;
- com dados parciais: sem leituras enganosas;
- com dados completos: com utilidade operacional minima.

### 6. Relatorios e documentos validados

- vazios: sem quebra;
- parciais: com degradacao controlada;
- completos: com contexto representativo suficiente.

### 7. Politica da seed demo

Precisa existir criterio claro para decidir:

- quando a seed demo permanece;
- quando passa a ficar restrita a ambiente demo;
- quando pode ser desligada do fluxo principal.

### 8. Plano de ativacao gradual

A ativacao futura nao deve acontecer em troca unica.

Sequencia minima recomendada:

1. base limpa ou seed institucional definida;
2. relacionamentos minimos persistidos;
3. smoke do modo limpo em ambiente controlado;
4. validacao de dashboards, relatorios e documentos;
5. trial controlado de ativacao;
6. rollback ensaiado;
7. decisao formal de promocao.

### 9. Rollback formal

Antes de qualquer ativacao futura, precisa existir rollback claro para:

- restaurar `DEMO_BOOTSTRAP` como unico padrao;
- reativar seed demo principal se necessario;
- repetir gate, build, verify e smoke minimo.

### 10. Gates tecnicos obrigatorios

- `node --check` dos modulos criticos;
- `node scripts/primyo-adapter-gate.mjs`;
- `npm.cmd run primyo:gate`;
- `npm.cmd run build`;
- `npm.cmd run verify:build`.

### 11. Decisao formal documentada

Nenhuma promocao de `CLEAN_BOOTSTRAP` a `default` deve acontecer sem:

- change record;
- criterio de aceite;
- criterio de bloqueio;
- rollback;
- aprovacao documentada.

### 12. Relacao com Supabase

- Supabase continua fechado nesta trilha;
- qualquer abertura de Supabase precisa ser decidida em fase propria;
- caso a base limpa dependa de origem persistida real, isso deve ser documentado antes da ativacao.

### 13. Relacao com Android

- Android continua em trilha propria;
- a ativacao do bootstrap web nao depende de conclusao da trilha Android;
- a trilha Android tambem nao autoriza, por si so, ativacao do bootstrap limpo no Web.

## Critérios de aceite para futura ativacao

- todos os pre-requisitos criticos acima atendidos;
- smoke do modo limpo aprovado nos tres cenarios;
- dashboards, relatorios e documentos aprovados;
- rollback validado;
- gates tecnicos aprovados;
- decisao formal registrada.

## Critérios de bloqueio

Bloquear qualquer promocao futura quando houver:

- base limpa insuficiente;
- relacao persistida ausente;
- dependencia obrigatoria da seed demo para valor minimo do produto;
- documentos ou dashboards sem validacao representativa;
- ausencia de plano de ativacao gradual;
- ausencia de rollback;
- ausencia de decisao formal.

## Matriz de risco resumida

- Dados: alto risco enquanto a base limpa continuar pobre.
- Relacionamentos: alto risco enquanto persistencia real nao existir.
- Demonstracao comercial: medio/alto risco enquanto a seed demo sustentar a narrativa principal.
- Dashboards e documentos: medio risco de vazios tecnicamente corretos, mas pouco uteis.
- Supabase: medio risco de pressao prematura para abertura fora de fase propria.
- Android: baixo risco direto para o Web, mas com risco de narrativa desalinhada entre plataformas.

## Recomendação objetiva

`CLEAN_BOOTSTRAP` nao deve virar padrao agora.

O proximo passo seguro e preparar a estrategia da base limpa que sustentara uma futura ativacao controlada.

## Próxima fatia recomendada

`LP-WEB-DATA-CLEANUP-013 - Institutional clean dataset strategy`
