# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos a implementacao de `LP-TEST-AUTO-004`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam puros e fora do runtime;
- `adapterHelpers` continua sendo a camada compartilhada minima dos adapters;
- `idResolver` agora existe em `app/adapters/shared/idResolver.js` como modulo puro, reversivel e fechado formalmente;
- o Adapter Gate agora cobre os cinco adapters puros e o resolvedor de IDs com regressao endurecida;
- `app/main.js` continua intacto;
- nenhuma integracao funcional foi iniciada;
- Supabase continua fechado.

## Opcoes avaliadas

### `LP-TEST-AUTO-004-CLOSURE`

- Vantagem: absorve formalmente a nova baseline automatizada antes de qualquer nova fase tecnica;
- Vantagem: atualiza baseline, backlog, policy e change control sem abrir escopo funcional;
- Vantagem: preserva o padrao seguro de implementar, fechar e so depois decidir o proximo passo funcional ou estrutural.

### Integracao do resolvedor ao runtime

- Risco: continua prematura;
- Risco: attendance, payment e financial ainda nao passaram pela mesma maturidade de adaptacao e ownership;
- Risco: aumentaria impacto funcional sem necessidade nesta janela.

### `LP-SUPABASE-001`

- Risco: abrir Supabase antes de amadurecer automacao e identidade cross-domain continua fora da ordem segura;
- Risco: ampliaria troubleshooting, rollback e superficie de falha cedo demais.

## Decisao oficial

Proxima fatia recomendada: `LP-TEST-AUTO-004-CLOSURE`

Direcao recomendada para a fatia:

- fechar formalmente a baseline do `idResolver` endurecido;
- manter `app/main.js` intacto;
- manter adapters e resolvedor fora do runtime;
- nao abrir Supabase;
- nao alterar comportamento funcional.

## Justificativa

`LP-TEST-AUTO-004-CLOSURE` passa a ser a melhor proxima fatia porque:

1. `LP-TEST-AUTO-004` ja reforcou a automacao do `idResolver`;
2. a nova cobertura precisa ser absorvida formalmente em baseline, backlog e policy antes de qualquer proximo movimento;
3. a proxima mudanca mais segura continua sendo documental, reversivel e sem impacto funcional;
4. integrar runtime ou abrir Supabase agora continuaria prematuro;
5. a trilha fica mais robusta quando a automacao endurecida e fechada formalmente antes da proxima onda de uso real.

## Resultado desta fase

Nenhuma nova integracao funcional foi iniciada.

Esta fase apenas:

- registra a implementacao de `LP-TEST-AUTO-004`;
- amplia o gate do resolvedor sem tocar runtime;
- preserva rollback simples;
- escolhe `LP-TEST-AUTO-004-CLOSURE` como proxima fatia oficial.
