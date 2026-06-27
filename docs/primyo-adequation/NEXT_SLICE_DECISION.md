# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos a conclusao documental de `LP-WEB-ID-RESOLVER-001`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam puros e fora do runtime;
- `adapterHelpers` continua sendo a camada compartilhada minima dos adapters;
- `Product` e `Supply` continuam formalmente separados;
- `stockBalance` continua tratado como projecao observada;
- `StockMovement` continua apenas como entidade futura;
- a necessidade de uma camada dedicada de resolucao de IDs cross-domain foi formalmente documentada;
- o mapa de relacoes futuras e os riscos de identidade legada ja estao registrados;
- nenhuma implementacao funcional foi iniciada;
- Supabase continua fechado.

## Opcoes avaliadas

### `LP-WEB-ID-RESOLVER-002`

- Vantagem: transforma o planejamento aprovado em uma implementacao pura, pequena e reversivel;
- Vantagem: pode criar o primeiro resolvedor isolado sem tocar runtime;
- Vantagem: pode ser protegido pelo gate antes de qualquer integracao funcional;
- Vantagem: reduz o principal risco restante de identidade cross-domain.

### `LP-TEST-AUTO-004`

- Vantagem: poderia expandir a automacao;
- Risco: o ganho imediato agora e menor do que implementar primeiro a camada pura que a automacao devera proteger;
- Risco: o gate atual ja cobre suficientemente uma futura implementacao pequena do resolvedor.

### `LP-SUPABASE-001`

- Risco: abrir Supabase antes do resolvedor continua prematuro;
- Risco: ampliaria troubleshooting, rollback e risco estrutural antes de a identidade cross-domain ficar tratada.

### Integracoes ao runtime

- Risco: integrar resolver ou adapters ao runtime ainda e cedo demais;
- Risco: `Attendance`, `Payment` e `Financial` ainda nao passaram pela mesma maturidade de master data puro;
- Risco: aumentaria impacto funcional sem necessidade.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-ID-RESOLVER-002`

Direcao recomendada para a fatia:

- implementar uma camada pura de resolucao de IDs;
- manter `app/main.js` intacto;
- manter adapters fora do runtime;
- nao abrir Supabase;
- nao alterar estoque real;
- nao automatizar consumo por servico;
- cobrir a implementacao com gate e cenarios validos, invalidos e ambiguos;
- preservar rollback simples.

## Justificativa

`LP-WEB-ID-RESOLVER-002` passa a ser a melhor proxima fatia porque:

1. `LP-WEB-ID-RESOLVER-001` ja consolidou estrategia, mapa, riscos, testes e readiness;
2. o principal gargalo aberto agora e executar essa camada de forma pura e controlada;
3. implementar o resolvedor antes de runtime e antes de Supabase reduz a chance de cristalizar chaves erradas;
4. a fatia pode continuar pequena, reversivel e sem impacto funcional percebido;
5. `LP-TEST-AUTO-004` rende mais valor depois que a primeira versao do resolvedor existir e puder ser protegida automaticamente.

## Resultado desta fase

Nenhuma nova implementacao funcional foi iniciada.

Esta fase apenas:

- documenta a estrategia futura do ID resolver;
- mapeia relacoes cross-domain e riscos de legado;
- define testes e readiness para a futura implementacao;
- escolhe `LP-WEB-ID-RESOLVER-002` como proxima fatia oficial.
