# Smoke Test Script Proposal

## Objetivo

Registrar oportunidades futuras de automacao leve para a fumaca do LavaPrime, sem implementar automacao nesta fase.

## Principio

Nesta etapa, a prioridade e padronizar o processo, nao introduzir framework novo.

Por isso:

- nenhuma dependencia nova deve ser instalada agora;
- nenhuma pipeline nova deve ser criada agora;
- nenhuma automacao complexa deve ser iniciada agora.

## Oportunidades futuras de automacao

### 1. Script de gate tecnico local

Proposta:

- criar futuramente um script simples que execute:
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
  - `node --check app/main.js`
  - `node --check scripts/sync-fipe-local-db.mjs`

Beneficio:

- reduzir erro humano na etapa automatica minima;
- gerar um resumo unico para anexar ao registro de teste.

Risco:

- baixo, desde que permaneça sem dependencias novas.

### 2. Gerador de checklist de execucao

Proposta:

- criar futuramente um script simples que copie o `TEST_EXECUTION_TEMPLATE.md` e preencha campos basicos como data, branch e commit.

Beneficio:

- acelerar a abertura de um registro de teste;
- melhorar consistencia do historico.

Risco:

- baixo.

### 3. Smoke assistido por navegador para sessao e navegacao

Proposta:

- avaliar no futuro uma automacao minima dos fluxos:
  - login administrador
  - login operador
  - logout
  - acesso ao patio
  - acesso administrativo

Beneficio:

- detectar regressao de sessao mais cedo;
- reduzir custo repetitivo de validacao manual.

Risco:

- medio, porque o web ainda depende de um monolito grande e marcacao legada.

Condicao para considerar:

- so depois que a politica de regressao manual estiver estavel;
- sem introduzir framework novo sem aprovacao explicita.

### 4. Captura automatica de evidencias

Proposta:

- no futuro, padronizar captura de:
  - screenshot da tela de login;
  - screenshot do dashboard admin;
  - screenshot do patio operador;
  - resumo dos comandos obrigatorios.

Beneficio:

- tornar o aceite mais auditavel;
- acelerar revisoes de mudanca.

Risco:

- baixo a medio, dependendo da ferramenta escolhida.

## Recomendacao de prioridade futura

Ordem sugerida quando a automacao leve for autorizada:

1. script de gate tecnico local
2. gerador de checklist de execucao
3. captura automatica de evidencias
4. smoke assistido por navegador

## Motivo para nao implementar agora

Nao implementar agora porque:

- esta fase e de fundacao, nao de expansao;
- a regressao formal ainda esta sendo padronizada;
- a automacao deve vir depois da politica, da matriz e do template;
- qualquer automacao precipitada aumentaria o escopo sem ganho proporcional imediato.
