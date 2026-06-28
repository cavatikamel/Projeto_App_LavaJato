# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos o encerramento formal de `LP-WEB-ID-RESOLVER-002`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam puros e fora do runtime;
- `adapterHelpers` continua sendo a camada compartilhada minima dos adapters;
- `idResolver` agora existe em `app/adapters/shared/idResolver.js` como modulo puro, reversivel e fechado formalmente;
- o Adapter Gate agora cobre os cinco adapters puros e o resolvedor de IDs;
- `app/main.js` continua intacto;
- nenhuma integracao funcional foi iniciada;
- Supabase continua fechado.

## Opcoes avaliadas

### `LP-TEST-AUTO-004`

- Vantagem: reforca a regressao automatica agora que existe um sexto modulo critico na trilha de adapters/identidade;
- Vantagem: reduz risco antes de qualquer integracao funcional futura;
- Vantagem: continua respeitando a estrategia de manter runtime e Supabase fora do escopo;
- Vantagem: ajuda a estabilizar a camada de identidade antes de qualquer uso em `Attendance`, `Payment` ou `Financial`.

### Integracao do resolvedor ao runtime

- Risco: continua prematura;
- Risco: attendance, payment e financial ainda nao passaram pela mesma maturidade de adaptacao e ownership;
- Risco: aumentaria impacto funcional sem necessidade nesta janela.

### `LP-SUPABASE-001`

- Risco: abrir Supabase antes de amadurecer automacao e identidade cross-domain continua fora da ordem segura;
- Risco: ampliaria troubleshooting, rollback e superficie de falha cedo demais.

## Decisao oficial

Proxima fatia recomendada: `LP-TEST-AUTO-004`

Direcao recomendada para a fatia:

- reforcar o gate para a nova camada de identidade;
- manter `app/main.js` intacto;
- manter adapters e resolvedor fora do runtime;
- nao abrir Supabase;
- nao alterar comportamento funcional.

## Justificativa

`LP-TEST-AUTO-004` passa a ser a melhor proxima fatia porque:

1. `LP-WEB-ID-RESOLVER-002` ja foi implementado e encerrado formalmente;
2. o resolvedor puro amplia a trilha estrutural e merece protecao automatica mais forte antes de qualquer integracao;
3. a proxima mudanca mais segura continua sendo estrutural, reversivel e sem impacto funcional;
4. integrar runtime ou abrir Supabase agora continuaria prematuro;
5. a trilha fica mais robusta quando automacao acompanha a nova camada de identidade antes da proxima onda de uso real.

## Resultado desta fase

Nenhuma nova integracao funcional foi iniciada.

Esta fase apenas:

- formaliza o encerramento de `LP-WEB-ID-RESOLVER-002`;
- registra o resolvedor puro como mudanca aceita;
- preserva rollback simples;
- escolhe `LP-TEST-AUTO-004` como proxima fatia oficial.
