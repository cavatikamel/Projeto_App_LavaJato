# Implementation Readiness

## 1. Objetivo

Definir quando sera seguro implementar a primeira camada real de resolucao de IDs do LavaPrime.

## 2. Condicoes minimas de prontidao

A implementacao so passa a ser considerada segura quando:

1. os contratos de master data estiverem estabilizados;
2. existir pelo menos um caso real de relacao validado documentalmente;
3. o Adapter Gate estiver pronto para cobrir fixtures do resolvedor;
4. a implementacao continuar fora do runtime;
5. a implementacao continuar antes de qualquer abertura real de Supabase;
6. existir rollback simples;
7. nenhuma mudanca funcional no produto for exigida.

## 3. Sinais de que ainda nao esta pronto

Ainda nao esta pronto quando:

- a relacao depender apenas de nome;
- a relacao depender apenas de placa;
- `sourceId` estiver ausente sem estrategia aprovada;
- `legacyRefs` estiver sendo usado como ownership escondido;
- a fatia exigir integracao direta com `app/main.js`;
- a fatia exigir runtime, storage ou Supabase.

## 4. Forma recomendada da primeira implementacao

Quando chegar a hora de implementar:

- a fatia deve ser pequena;
- o modulo deve ser puro;
- a API deve ser explicita;
- o resolvedor deve operar por entrada e contexto;
- o gate deve cobrir cenario valido, invalido e ambiguo;
- a integracao ao runtime deve continuar fora do escopo.

## 5. Rollback esperado

O rollback futuro deve ser simples:

1. remover o modulo do resolvedor;
2. reverter eventuais ajustes no gate;
3. reverter documentacao da fase de implementacao;
4. reexecutar `npm.cmd run primyo:gate`.

## 6. Estado desta fase

Esta fase e apenas planejamento.

Nenhum resolvedor foi criado, nenhum adapter foi alterado e nenhuma integracao funcional foi iniciada.

## 7. Decisao oficial desta fase

O programa considera segura apenas uma futura implementacao pura, documentada, coberta por gate e ainda fora do runtime.
