# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos o encerramento formal de `LP-TEST-AUTO-003`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter` existe em `app/adapters/customerAdapter.js` e permanece como adapter de referencia da trilha;
- `vehicleAdapter` existe em `app/adapters/vehicleAdapter.js` como segundo adapter puro oficial;
- ambos seguem o baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
- ambos permanecem puros e fora do runtime;
- `scripts/primyo-adapter-gate.mjs` foi absorvido como subgate oficial do `primyo:gate`;
- `customerAdapter` e `vehicleAdapter` agora contam com regressao automatica minima;
- `app/main.js` continua intacto;
- `npm.cmd run primyo:gate`, build e verify passaram na revalidacao final desta closure;
- nenhuma integracao funcional foi autorizada.

## Opcoes avaliadas

### `LP-WEB-009`

- Vantagem: expande a trilha de adapters puros para um terceiro dominio sem tocar runtime.
- Vantagem: prova que o baseline do `customerAdapter` e do `vehicleAdapter` e repetivel em mais um dominio.
- Vantagem: aproveita imediatamente o Adapter Contract Gate ja incorporado.
- Risco: exigira fixture nova e validacao adicional no gate, mas ainda dentro de uma fatia pequena e reversivel.

### `LP-DATA-006`

- Vantagem: ajudaria a planejar resolver de IDs entre cliente e veiculo.
- Risco: amplia camada documental antes de provar um terceiro adapter puro.
- Risco: pode solidificar abstracoes cedo demais sem uma terceira evidencia pratica.

### `LP-WEB-ADAPTER-HELPERS-001`

- Vantagem: pode reduzir duplicacao futura entre adapters.
- Risco: criar helper comum antes do terceiro adapter puro pode congelar uma abstracao prematura.
- Risco: introduz acoplamento transversal novo antes de haver material suficiente para generalizacao segura.

### `LP-WEB-007-INTEGRATION`

- Risco: integrar `customerAdapter` ao runtime agora continua cedo demais.
- Risco: ainda nao existe maturidade suficiente de testes funcionais e de relacionamento entre adapters.

### `LP-WEB-008-INTEGRATION`

- Risco: integrar `vehicleAdapter` ao runtime agora e ainda mais sensivel por envolver relacionamento com cliente e identidade de veiculo.
- Risco: aumentaria a superficie de regressao antes de uma terceira prova de repetibilidade.

### `LP-SUPABASE-001`

- Risco: abrir Supabase antes de consolidar um terceiro adapter puro e prematuro.
- Risco: aumentaria a complexidade de rollback e de ownership sem maturidade suficiente da camada de adapters.

### `LP-TEST-AUTO-004`

- Vantagem: poderia expandir ainda mais a automacao.
- Risco: o retorno marginal agora e menor do que provar um terceiro adapter puro ja sob o gate atual.
- Risco: pode atrasar desnecessariamente a validacao da trilha contratual em um novo dominio.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-009`

Direcao recomendada para a fatia:

- criar o terceiro adapter puro do web;
- priorizar `serviceAdapter` como proximo dominio logico;
- manter o adapter fora do runtime;
- manter `app/main.js` intacto;
- manter Supabase fechado nesta fase.

## Justificativa

`LP-WEB-009` e a melhor proxima fatia porque:

1. a trilha ja possui dois adapters puros oficiais e um gate automatizado minimo para protege-los;
2. um terceiro adapter puro prova repetibilidade estrutural melhor do que integrar cedo demais ou abstrair helpers cedo demais;
3. o dominio de servicos e o proximo master data logico com valor tecnico alto e risco ainda controlavel;
4. a fase continua pequena, reversivel e fora do runtime;
5. ainda e cedo para `LP-WEB-007-INTEGRATION`, `LP-WEB-008-INTEGRATION` e `LP-SUPABASE-001`.

## Resultado desta fase

Nenhuma nova implementacao funcional foi iniciada.

Esta fase apenas:

- encerra formalmente `LP-TEST-AUTO-003`;
- absorve o Adapter Contract Gate na baseline oficial;
- confirma que adapters continuam fora do runtime;
- escolhe `LP-WEB-009` como proxima fatia oficial.
