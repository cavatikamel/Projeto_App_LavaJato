# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos o encerramento formal de `LP-WEB-011`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter` existe em `app/adapters/customerAdapter.js` e permanece como adapter de referencia da trilha;
- `vehicleAdapter` existe em `app/adapters/vehicleAdapter.js` como segundo adapter puro oficial;
- `serviceAdapter` existe em `app/adapters/serviceAdapter.js` como terceiro adapter puro oficial;
- `productAdapter` existe em `app/adapters/productAdapter.js` como quarto adapter puro oficial;
- `supplyAdapter` existe em `app/adapters/supplyAdapter.js` como quinto adapter puro oficial;
- `app/adapters/shared/adapterHelpers.js` continua concentrando a camada compartilhada minima de identidade, envelope, metadata, warnings e `legacyRefs`;
- os cinco adapters seguem puros, fora do runtime e com API publica preservada;
- `scripts/primyo-adapter-gate.mjs` e `scripts/primyo-gate.mjs` foram revalidados com cobertura minima para cinco adapters;
- `app/main.js` continua intacto;
- `npm.cmd run primyo:gate`, build e verify passaram na revalidacao final desta closure;
- nenhuma integracao funcional foi autorizada.

## Opcoes avaliadas

### `LP-DATA-006`

- Vantagem: pode formalizar resolver de IDs, ownership cross-domain e relacoes entre `customer`, `vehicle`, `service`, `product` e `supply`;
- Vantagem: reduz o risco de integrar adapters ao runtime com identidade ambigua entre dominios;
- Vantagem: prepara uma futura leitura/escrita controlada em Supabase sem improvisar acoplamento de runtime;
- Vantagem: mantem a proxima fatia pequena, reversivel e ainda fora de runtime.

### `LP-WEB-ID-RESOLVER-001`

- Vantagem: pode preparar reconciliacao futura entre IDs cross-domain;
- Risco: implementar resolver agora, antes de uma decisao documental propria de ownership, ainda aumenta o risco de cristalizar uma regra cedo demais;
- Risco: a fase tecnica rende mais se vier depois de uma fase formal de dados que consolide as regras comuns.

### `LP-TEST-AUTO-004`

- Vantagem: poderia reforcar ainda mais a automacao;
- Risco: o retorno marginal agora e menor do que eliminar a ambiguidade de identidade entre os cinco adapters ja existentes;
- Risco: o gate atual ja protege suficientemente a proxima fatia de planejamento de dados.

### `LP-WEB-011-INTEGRATION`

- Risco: integrar `supplyAdapter` ao runtime continua cedo demais;
- Risco: o dominio ainda nao tem ownership aprovado para relacoes entre produto, insumo, servico e estoque;
- Risco: aumentaria o impacto funcional antes de uma fase formal de IDs e ownership cross-domain.

### `LP-SUPABASE-001`

- Risco: abrir Supabase antes de resolver identidade e ownership cross-domain continua prematuro;
- Risco: aumentaria muito a complexidade de rollback, relacionamento, estoque e troubleshooting antes de a camada de adapters amadurecer mais.

## Decisao oficial

Proxima fatia recomendada: `LP-DATA-006`

Direcao recomendada para a fatia:

- formalizar resolver de IDs e ownership cross-domain entre os contratos puros ja existentes;
- manter `app/main.js` intacto;
- manter `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter`, `supplyAdapter` e `adapterHelpers` intactos;
- manter os adapters fora do runtime;
- nao implementar resolver funcional ainda; apenas decidir e documentar;
- nao abrir Supabase nesta fase;
- documentar explicitamente relacoes, ownership e fronteiras entre produto vendavel, insumo tecnico, servico e identidade canonica.

## Justificativa

`LP-DATA-006` e a melhor proxima fatia porque:

1. a trilha ja possui cinco adapters puros e uma camada compartilhada minima oficialmente consolidada;
2. o maior risco restante antes de qualquer integracao nao esta mais em shape de contrato, mas em identidade, ownership e relacao entre dominios;
3. resolver isso primeiro em fase documental reduz a chance de cristalizar acoplamento errado em runtime, em helper tecnico ou em Supabase;
4. a fatia continua pequena, reversivel e fora do runtime, preservando o principio de baixo risco;
5. ainda e cedo para integrar adapters ao produto ou abrir Supabase;
6. `LP-WEB-ID-RESOLVER-001` rende mais valor depois que a politica transversal de IDs estiver formalmente aprovada;
7. `LP-TEST-AUTO-004` e `LP-SUPABASE-001` continuam importantes, mas ainda nao atacam o principal gargalo estrutural aberto apos o quinto adapter.

## Resultado desta fase

Nenhuma nova implementacao funcional foi iniciada.

Esta fase apenas:

- encerra formalmente `LP-WEB-011`;
- absorve `supplyAdapter` como quinto adapter puro oficial da trilha;
- confirma que `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam fora do runtime;
- confirma que o Adapter Gate continua protegendo os cinco adapters e o helper compartilhado;
- escolhe `LP-DATA-006` como proxima fatia oficial.

## Operacao apos `LP-DOC-EXEC-001`

Com a consolidacao do Primyo Lean Mode:

- `LP-DATA-006` passa a ser a proxima fatia tecnica recomendada;
- os proximos prompts podem referenciar `EXECUTION_RULES.md`, `LEAN_PROMPT_POLICY.md`, `CODEX_RESPONSE_FORMAT.md`, `COMMIT_RULES.md` e `PHASE_TYPES.md` no lugar de repetir o baseline inteiro;
- a recomendacao tecnica nao muda: ainda nao e hora de integrar adapters ao runtime nem de abrir Supabase;
- a reducao de prompt nao altera a obrigatoriedade de gate, rollback, riscos, escopo e validacoes.
