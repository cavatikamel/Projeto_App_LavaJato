# LP-SERVICE-ORDER-004

## Fase

`LP-SERVICE-ORDER-004 - Service Order Progressive Read Adoption And Migration Design`

## Objetivo

Iniciar a adocao progressiva da `Service Order` como fonte auxiliar de leitura em ponto de baixo risco e desenhar a futura migracao para backend/Supabase sem executar migration real.

## Implementacao

- area escolhida: `documents`;
- helper `findServiceOrderByLegacyReference(...)` criado;
- contexto runtime/indexadores de leitura criados;
- `buildServiceOrderReadModel(...)` criado;
- `resolveDocumentServiceOrderReadModel(...)` criado;
- `documentHistory` passa a receber `serviceOrderReadModel` derivado em runtime;
- diagnostico `progressiveRead` adicionado;
- migration design e schema draft documentados.

## Fora de escopo mantido

- Supabase;
- migration executavel;
- alteracao visual;
- troca da fonte principal de documentos;
- troca da fonte principal de dashboard;
- troca da fonte principal de financeiro;
- renomeacao ampla de UX para `OS`.
