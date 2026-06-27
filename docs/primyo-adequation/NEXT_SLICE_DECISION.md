# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos o encerramento formal de `LP-WEB-ADAPTER-HELPERS-001`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter` existe em `app/adapters/customerAdapter.js` e permanece como adapter de referencia da trilha;
- `vehicleAdapter` existe em `app/adapters/vehicleAdapter.js` como segundo adapter puro oficial;
- `serviceAdapter` existe em `app/adapters/serviceAdapter.js` como terceiro adapter puro oficial;
- `app/adapters/shared/adapterHelpers.js` agora concentra a camada compartilhada minima de identidade, envelope, metadata, warnings e `legacyRefs`;
- os tres adapters seguem puros, fora do runtime e com API publica preservada;
- `scripts/primyo-adapter-gate.mjs` e `scripts/primyo-gate.mjs` foram revalidados com o helper compartilhado;
- `app/main.js` continua intacto;
- `npm.cmd run primyo:gate`, build e verify passaram na revalidacao final desta closure;
- nenhuma integracao funcional foi autorizada.

## Opcoes avaliadas

### `LP-WEB-010`

- Vantagem: segue a ordem natural de criacao com `productAdapter` como quarto adapter puro oficial.
- Vantagem: aproveita imediatamente a camada compartilhada minima ja consolidada.
- Vantagem: continua em master data de baixo risco, sem integrar runtime e sem abrir Supabase.
- Vantagem: ajuda a provar que o helper comum funciona em um quarto dominio antes de qualquer integracao funcional.
- Risco: exige manter a disciplina de usar o helper apenas para estrutura comum, sem empurrar regra especifica de produto para a camada compartilhada.

### `LP-DATA-006`

- Vantagem: pode planejar resolver de IDs entre dominios e reduzir ambiguidade futura.
- Risco: amplia novamente a camada documental antes de validar o helper comum em um novo adapter real.
- Risco: rende menos valor imediato do que provar o baseline tecnico comum no proximo dominio de master data.

### `LP-WEB-ADAPTER-HELPERS-002`

- Vantagem: poderia aprofundar a camada compartilhada.
- Risco: extrair mais helpers agora seria abstracao cedo demais.
- Risco: o helper minimo ja consolidado ainda precisa ser provado em outro adapter antes de uma segunda rodada de consolidacao.

### `LP-WEB-007-INTEGRATION`

- Risco: integrar `customerAdapter` ao runtime continua cedo demais.
- Risco: ainda nao existe resolver maduro de IDs entre `customer` e `vehicle`, nem cobertura funcional suficiente para absorver impacto em runtime.

### `LP-WEB-008-INTEGRATION`

- Risco: integrar `vehicleAdapter` ao runtime continua cedo demais.
- Risco: ownership, historico e relacao com cliente ainda nao possuem camada de resolucao aprovada.

### `LP-WEB-009-INTEGRATION`

- Risco: integrar `serviceAdapter` ao runtime continua cedo demais.
- Risco: o dominio de servicos ainda depende de `sourceId` por contexto e `serviceCode` derivado em parte do baseline atual.

### `LP-SUPABASE-001`

- Risco: abrir Supabase antes do quarto adapter e antes de qualquer fatia especifica de integracao continua prematuro.
- Risco: aumentaria muito a complexidade de rollback, ownership e troubleshooting antes de a camada de adapters amadurecer mais.

### `LP-TEST-AUTO-004`

- Vantagem: poderia reforcar ainda mais a automacao.
- Risco: o retorno marginal agora e menor do que validar a nova camada compartilhada em um quarto adapter puro.
- Risco: a baseline tecnica ja esta protegida o suficiente para a proxima fatia continuar em baixo risco.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-010`

Direcao recomendada para a fatia:

- criar `productAdapter` como quarto adapter puro oficial do web;
- reutilizar `app/adapters/shared/adapterHelpers.js` apenas para estrutura realmente comum;
- manter `app/main.js` intacto;
- manter o adapter fora do runtime;
- atualizar o Adapter Gate para incluir fixture valida e invalida de produto;
- nao abrir Supabase nesta fase.

## Justificativa

`LP-WEB-010` e a melhor proxima fatia porque:

1. a trilha ja possui tres adapters puros e uma camada compartilhada minima oficialmente consolidada;
2. `productAdapter` e o proximo dominio natural de master data pela ordem tecnica ja aprovada;
3. criar o quarto adapter agora prova que o helper comum reduz drift sem forcar integracao funcional;
4. a fatia continua pequena, reversivel e fora do runtime, preservando o principio de baixo risco;
5. ainda e cedo para integrar adapters ao produto ou abrir Supabase;
6. `LP-DATA-006` continua importante, mas rende mais valor depois que o helper compartilhado for provado em mais um dominio real;
7. uma segunda rodada de helpers (`LP-WEB-ADAPTER-HELPERS-002`) so faz sentido depois que `productAdapter` revelar nova repeticao estavel.

## Resultado desta fase

Nenhuma nova implementacao funcional foi iniciada.

Esta fase apenas:

- encerra formalmente `LP-WEB-ADAPTER-HELPERS-001`;
- absorve `adapterHelpers` como modulo oficial da trilha de adapters;
- confirma que `customerAdapter`, `vehicleAdapter` e `serviceAdapter` continuam fora do runtime;
- confirma que o Adapter Gate continua protegendo os tres adapters e o helper compartilhado;
- escolhe `LP-WEB-010` como proxima fatia oficial.
