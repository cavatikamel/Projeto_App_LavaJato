# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos a conclusao documental de `LP-DATA-006`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam puros e fora do runtime;
- `app/adapters/shared/adapterHelpers.js` continua sendo a camada compartilhada minima dos adapters;
- `app/main.js` continua intacto;
- `scripts/primyo-adapter-gate.mjs` e `scripts/primyo-gate.mjs` continuam aprovados;
- `Product` e `Supply` continuam formalmente separados;
- `stockBalance` continua tratado como projecao observada;
- `StockMovement` continua apenas como entidade futura, sem implementacao;
- consumo por servico continua sem automacao e sem baixa de estoque;
- nenhuma abertura de Supabase foi autorizada.

## Opcoes avaliadas

### `LP-WEB-ID-RESOLVER-001`

- Vantagem: ataca o principal risco restante entre os dominios ja documentados;
- Vantagem: pode formalizar ou implementar, de forma pequena e reversivel, a reconciliacao de identidade entre `service`, `supply`, `product` e futuras relacoes de estoque;
- Vantagem: aproveita a maturidade dos cinco adapters puros sem integra-los ao runtime;
- Vantagem: prepara o terreno para futura trilha de `attendance`, consumo por servico e integracao com Supabase sem cristalizar chaves erradas.

### `LP-TEST-AUTO-004`

- Vantagem: poderia reforcar ainda mais a automacao;
- Risco: o retorno imediato agora e menor do que fechar ownership e identidade entre dominios antes de qualquer integracao funcional;
- Risco: o gate atual ja protege suficientemente uma proxima fatia pequena de identidade ou planejamento.

### `LP-SUPABASE-001`

- Risco: continua prematuro abrir Supabase antes de resolver identidade, ownership e evento de estoque;
- Risco: aumentaria custo de rollback e troubleshooting sem trilha estavel para `Product`, `Supply`, `StockMovement` e consumo por servico.

### Integracoes de adapters ao runtime

- Risco: integrar qualquer adapter agora continua cedo demais;
- Risco: produto, insumo, servico e estoque ja estao mais claros documentalmente, mas ainda nao possuem resolver comum de IDs nem ownership funcional aprovado;
- Risco: aumentaria impacto funcional sem necessidade.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-ID-RESOLVER-001`

Direcao recomendada para a fatia:

- manter `app/main.js` intacto;
- manter todos os adapters fora do runtime;
- nao abrir Supabase;
- nao implementar movimentacao de estoque;
- nao automatizar consumo por servico;
- consolidar regras de identidade, relacionamento e ownership cross-domain de forma pequena, pura e reversivel;
- diferenciar explicitamente referencias entre `service`, `supply`, `product` e futuros itens de estoque.

## Justificativa

`LP-WEB-ID-RESOLVER-001` passa a ser a melhor proxima fatia porque:

1. `LP-DATA-006` fechou a fronteira entre produto, insumo, estoque e consumo por servico;
2. o principal risco aberto agora nao esta mais na separacao conceitual, mas na reconciliacao de IDs e ownership entre dominios;
3. resolver isso antes de runtime, Supabase ou atendimento reduz a chance de cristalizar relacoes erradas;
4. a fatia continua pequena, reversivel e fora do produto em execucao;
5. ainda e cedo para integrar adapters ao runtime ou abrir Supabase;
6. `LP-TEST-AUTO-004` continua util, mas rende mais depois que a identidade cross-domain estiver mais bem consolidada.

## Resultado desta fase

Nenhuma implementacao funcional foi iniciada.

Esta fase apenas:

- documenta a fronteira oficial entre `Product`, `Supply`, `StockMovement` e consumo por servico;
- reafirma `stockBalance` como projecao observada;
- mantem adapters, runtime, estoque real e Supabase fora do escopo funcional;
- escolhe `LP-WEB-ID-RESOLVER-001` como proxima fatia oficial.
