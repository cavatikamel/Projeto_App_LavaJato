# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos o encerramento formal de `LP-WEB-009`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter` existe em `app/adapters/customerAdapter.js` e permanece como adapter de referencia da trilha;
- `vehicleAdapter` existe em `app/adapters/vehicleAdapter.js` como segundo adapter puro oficial;
- `serviceAdapter` existe em `app/adapters/serviceAdapter.js` como terceiro adapter puro oficial;
- os tres seguem o baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
- os tres permanecem puros e fora do runtime;
- `scripts/primyo-adapter-gate.mjs` foi absorvido como subgate oficial do `primyo:gate`;
- `customerAdapter`, `vehicleAdapter` e `serviceAdapter` agora contam com regressao automatica minima oficial;
- `app/main.js` continua intacto;
- `npm.cmd run primyo:gate`, build e verify passaram na revalidacao final desta closure;
- nenhuma integracao funcional foi autorizada.

## Opcoes avaliadas

### `LP-WEB-ADAPTER-HELPERS-001`

- Vantagem: reduz duplicacao estrutural ja repetida em tres adapters puros.
- Vantagem: ataca risco de drift antes do quarto adapter.
- Vantagem: continua pequena, reversivel e fora do runtime.
- Vantagem: prepara `productAdapter` sem congelar cedo demais um helper gigante.
- Risco: exige disciplina para extrair apenas o que ja provou ser realmente comum.

### `LP-WEB-010`

- Vantagem: seguiria a ordem natural de criacao com `productAdapter`.
- Vantagem: manteria a trilha em master data de baixo risco.
- Risco: criar um quarto adapter antes de consolidar helper minimo aumenta duplicacao e chance de divergencia entre modulos.
- Risco: empurra para frente a consolidacao estrutural que agora ja tem evidencia suficiente para acontecer.

### `LP-DATA-006`

- Vantagem: ajudaria a planejar resolver de IDs entre dominios.
- Risco: amplia camada documental antes de estabilizar o padrao tecnico local dos adapters.
- Risco: pode criar abstracao de identidade cedo demais sem a consolidacao minima do helper comum.

### `LP-WEB-009-INTEGRATION`

- Risco: integrar `serviceAdapter` ao runtime agora continua cedo demais.
- Risco: o dominio de servicos ainda tem `sourceId` obrigatorio por contexto e `serviceCode` provisoriamente derivado.

### `LP-WEB-007-INTEGRATION`

- Risco: integrar `customerAdapter` ao runtime agora continua cedo demais.
- Risco: ainda nao existe maturidade suficiente de testes funcionais, resolucao de IDs e relacionamento entre adapters.

### `LP-SUPABASE-001`

- Risco: abrir Supabase antes de consolidar helper comum e quarto adapter continua prematuro.
- Risco: aumentaria complexidade de rollback e de ownership sem maturidade suficiente da camada de adapters.

### `LP-TEST-AUTO-004`

- Vantagem: poderia reforcar ainda mais a automacao.
- Risco: o retorno marginal agora e menor do que consolidar o padrao tecnico comum ja repetido em tres adapters.
- Risco: a cobertura atual ja protege a baseline minima; o gargalo imediato passa a ser consistencia estrutural entre adapters.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-ADAPTER-HELPERS-001`

Direcao recomendada para a fatia:

- consolidar helper comum minimo para adapters puros;
- extrair apenas utilitarios claramente repetidos e estaveis;
- manter helpers fora do runtime;
- manter `app/main.js` intacto;
- nao criar novo adapter na mesma fatia;
- nao abrir Supabase nesta fase.

## Justificativa

`LP-WEB-ADAPTER-HELPERS-001` e a melhor proxima fatia porque:

1. a trilha ja possui tres adapters puros oficiais e agora existe evidencia suficiente de repeticao estrutural;
2. consolidar helper comum minimo antes do quarto adapter reduz drift, custo de manutencao e risco de divergencia entre modulos;
3. a fatia continua pequena, reversivel e fora do runtime, preservando o principio de baixo risco;
4. ainda e cedo para integrar adapters ao produto ou abrir Supabase;
5. `productAdapter` continua sendo o proximo adapter recomendado por ordem de dominio, mas fica mais seguro depois de uma pequena consolidacao tecnica comum;
6. o planejamento de resolver de IDs entre dominios continua importante, mas ainda rende mais valor depois da consolidacao desse helper minimo.

## Resultado desta fase

Nenhuma nova implementacao funcional foi iniciada.

Esta fase apenas:

- encerra formalmente `LP-WEB-009`;
- absorve `serviceAdapter` como terceiro adapter puro oficial;
- confirma que o Adapter Contract Gate cobre tres adapters;
- confirma que adapters continuam fora do runtime;
- escolhe `LP-WEB-ADAPTER-HELPERS-001` como proxima fatia oficial.
