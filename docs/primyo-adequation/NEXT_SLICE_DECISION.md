# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos o encerramento formal de `LP-WEB-010`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter` existe em `app/adapters/customerAdapter.js` e permanece como adapter de referencia da trilha;
- `vehicleAdapter` existe em `app/adapters/vehicleAdapter.js` como segundo adapter puro oficial;
- `serviceAdapter` existe em `app/adapters/serviceAdapter.js` como terceiro adapter puro oficial;
- `productAdapter` existe em `app/adapters/productAdapter.js` como quarto adapter puro oficial;
- `app/adapters/shared/adapterHelpers.js` continua concentrando a camada compartilhada minima de identidade, envelope, metadata, warnings e `legacyRefs`;
- os quatro adapters seguem puros, fora do runtime e com API publica preservada;
- `scripts/primyo-adapter-gate.mjs` e `scripts/primyo-gate.mjs` foram revalidados com cobertura minima para quatro adapters;
- `app/main.js` continua intacto;
- `npm.cmd run primyo:gate`, build e verify passaram na revalidacao final desta closure;
- nenhuma integracao funcional foi autorizada.

## Opcoes avaliadas

### `LP-WEB-011`

- Vantagem: segue a ordem natural de criacao com `supplyAdapter` como quinto adapter puro oficial.
- Vantagem: aprofunda a separacao entre produto vendavel, insumo tecnico e estoque sem tocar runtime.
- Vantagem: conversa diretamente com os dominios ja provados por `serviceAdapter` e `productAdapter`.
- Vantagem: continua em master data de risco controlado, sem integrar runtime e sem abrir Supabase.
- Risco: exige disciplina para nao misturar `supplierName`, compatibilidade tecnica e movimento de estoque no mesmo slice.

### `LP-WEB-010-INTEGRATION`

- Risco: integrar `productAdapter` ao runtime continua cedo demais.
- Risco: o dominio ainda nao tem resolver aprovado para relacionamento entre produto, insumo, venda e estoque.
- Risco: aumentaria o impacto funcional antes de a trilha provar mais um adapter puro ligado ao mesmo dominio.

### `LP-WEB-ADAPTER-HELPERS-002`

- Vantagem: poderia aprofundar a camada compartilhada.
- Risco: extrair mais helpers agora continua abstracao cedo demais.
- Risco: o helper minimo atual ja provou repetibilidade suficiente; o maior valor agora esta em provar o proximo dominio puro.

### `LP-DATA-006`

- Vantagem: pode planejar resolver de IDs entre dominios e reduzir ambiguidade futura.
- Risco: amplia novamente a camada documental antes de validar a separacao entre produto e insumo com mais um adapter real.
- Risco: rende menos valor imediato do que provar o baseline tecnico comum no proximo dominio de master data.

### `LP-SUPABASE-001`

- Risco: abrir Supabase antes do quinto adapter e antes de qualquer fatia especifica de integracao continua prematuro.
- Risco: aumentaria muito a complexidade de rollback, ownership, estoque e troubleshooting antes de a camada de adapters amadurecer mais.

### `LP-TEST-AUTO-004`

- Vantagem: poderia reforcar ainda mais a automacao.
- Risco: o retorno marginal agora e menor do que validar a trilha de adapters em mais um dominio real ligado a produtos e servicos.
- Risco: o gate atual ja protege suficientemente a proxima fatia de baixo risco.

### `LP-WEB-ID-RESOLVER-001`

- Vantagem: pode preparar reconciliacao futura entre IDs cross-domain.
- Risco: resolver de IDs antes de `supplyAdapter` abre a chance de antecipar acoplamento entre dominios ainda incompletos.
- Risco: e mais seguro capturar primeiro mais um shape real do dominio de estoque/insumos antes de consolidar um resolver transversal.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-011`

Direcao recomendada para a fatia:

- criar `supplyAdapter` como quinto adapter puro oficial do web;
- manter `app/main.js` intacto;
- manter `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `adapterHelpers` intactos, salvo mudanca minima estritamente justificada pelo gate;
- manter o adapter fora do runtime;
- atualizar o Adapter Gate para incluir fixture valida e invalida de insumo;
- nao abrir Supabase nesta fase;
- documentar explicitamente a diferenca entre produto vendavel, insumo tecnico e movimentacao de estoque.

## Justificativa

`LP-WEB-011` e a melhor proxima fatia porque:

1. a trilha ja possui quatro adapters puros e uma camada compartilhada minima oficialmente consolidada;
2. `supplyAdapter` e o proximo dominio natural pela ordem tecnica ja aprovada, alem de dialogar diretamente com `serviceAdapter` e `productAdapter`;
3. criar o quinto adapter agora ajuda a separar melhor produto, insumo e estoque antes de qualquer integracao funcional;
4. a fatia continua pequena, reversivel e fora do runtime, preservando o principio de baixo risco;
5. ainda e cedo para integrar adapters ao produto ou abrir Supabase;
6. `LP-DATA-006` e `LP-WEB-ID-RESOLVER-001` continuam importantes, mas rendem mais valor depois que o dominio de insumos estiver provado em adapter puro;
7. uma segunda rodada de helpers (`LP-WEB-ADAPTER-HELPERS-002`) so faz sentido depois que `supplyAdapter` revelar nova repeticao realmente estavel.

## Resultado desta fase

Nenhuma nova implementacao funcional foi iniciada.

Esta fase apenas:

- encerra formalmente `LP-WEB-010`;
- absorve `productAdapter` como quarto adapter puro oficial da trilha;
- confirma que `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `productAdapter` continuam fora do runtime;
- confirma que o Adapter Gate continua protegendo os quatro adapters e o helper compartilhado;
- escolhe `LP-WEB-011` como proxima fatia oficial.

## Operacao apos `LP-DOC-EXEC-001`

Com a consolidacao do Primyo Lean Mode:

- `LP-WEB-011` continua sendo a proxima fatia tecnica recomendada;
- os proximos prompts podem referenciar `EXECUTION_RULES.md`, `LEAN_PROMPT_POLICY.md`, `CODEX_RESPONSE_FORMAT.md`, `COMMIT_RULES.md` e `PHASE_TYPES.md` no lugar de repetir o baseline inteiro;
- a recomendacao tecnica nao muda: ainda nao e hora de integrar adapters ao runtime nem de abrir Supabase;
- a reducao de prompt nao altera a obrigatoriedade de gate, rollback, riscos, escopo e validacoes.
