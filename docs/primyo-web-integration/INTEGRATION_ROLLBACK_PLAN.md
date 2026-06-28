# Integration Rollback Plan

## 1. Objetivo

Definir como reverter a primeira integracao futura ao runtime.

## 2. Premissas

Premissas obrigatorias:

- o legado continua funcionando sem depender dos adapters;
- a primeira integracao tocara no maximo um fluxo;
- o adapter integrado continuara puro e sem side effects;
- o rollback deve caber em um unico slice tecnico pequeno.

## 3. Arquivos que poderao ser revertidos

Arquivos candidatos a reversao na primeira integracao:

- `app/main.js`
- eventual helper minimo de orquestracao local, se aprovado em fase propria
- documentacao da fase de integracao

Arquivos que idealmente nao devem precisar de reversao:

- adapters existentes
- `idResolver`
- scripts de gate

## 4. Como desativar o uso do adapter

Sequencia recomendada:

1. remover o import do adapter em `app/main.js`;
2. restaurar o path legado original de leitura;
3. remover qualquer branch de modo sombra criada na fase;
4. manter o adapter puro no repositorio, fora do runtime novamente.

## 5. Como manter o legado funcionando

Regras:

- nunca substituir a origem legada inteira na primeira fatia;
- nao alterar persistencia;
- nao reformatar payload salvo;
- nao trocar chaves de `localStorage`;
- nao usar contrato como formato persistido.

## 6. Revalidacao obrigatoria apos rollback

Depois do rollback:

- executar `npm.cmd run primyo:gate`;
- executar o smoke manual minimo da fase;
- confirmar que o fluxo voltou a usar somente o legado;
- confirmar ausencia de erro no console.

## 7. Como detectar regressao

Sinais de regressao:

- lista vazia ou parcial em fluxo que antes carregava;
- erro de console na abertura de tela;
- campos obrigatorios sumindo na UI;
- mudanca inesperada de permissao, navegacao ou ordenacao;
- mismatch claro entre dado legado exibido e contrato derivado.

## 8. Decisao oficial

A primeira integracao so e aceitavel se o rollback puder ser feito:

- sem tocar adapters;
- sem tocar `idResolver`;
- sem tocar Supabase;
- sem tocar persistencia;
- com reversao pequena em `app/main.js` e documentacao.
