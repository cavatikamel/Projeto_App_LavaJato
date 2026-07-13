# LP-SERVICE-ORDER-002

## Fase

`LP-SERVICE-ORDER-002 - Service Order Persistence Boundary And Explicit Links`

## Objetivo

Evoluir a `Service Order` interna de uma camada apenas derivada para uma fronteira explicita de identidade, vinculo e futura persistencia, sem quebrar o fluxo atual de `Atendimento`.

## Implementacao

- resolucao explicita de `serviceOrderId`;
- reforco da numeracao local existente;
- links explicitos entre OS e pagamentos;
- links explicitos entre OS e documentos;
- links explicitos entre OS e eventos;
- snapshot de persistencia local/futuro backend;
- diagnostico ampliado com cobertura de vinculos.

## Fora de escopo mantido

- Supabase;
- migration;
- alteracao de bootstrap;
- refatoracao visual ampla;
- renomeacao de UX para `OS`.
