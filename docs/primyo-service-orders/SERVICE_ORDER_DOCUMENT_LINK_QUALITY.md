# Service Order Document Link Quality

## Objetivo

Tornar auditavel a qualidade dos vinculos entre documentos derivados e `Service Order`.

## Indicadores tecnicos

O diagnostico `documentSourceQuality` mede:

- quantos documentos foram analisados;
- quantos ja chegam com `serviceOrderId` explicito;
- quantos carregam `serviceOrderNumber`;
- quantos foram resolvidos por `legacyAttendanceId`;
- quantos foram resolvidos por link de pagamento;
- quantos foram resolvidos por `sourceType/sourceId`;
- quantos ainda dependem de fallback por placa;
- quantos ficam sem OS associada;
- quantos vinculos ficaram com confianca `high`, `medium` ou `low`;
- qual e a taxa total de fallback.

## Escala de confianca

- `high`
  - `serviceOrderId` explicito;
  - `serviceOrderNumber` explicito;
  - `legacyAttendanceId` compativel;
  - link de pagamento compativel.
- `medium`
  - `sourceType/sourceId` compativel;
  - vinculo documental indireto, mas consistente.
- `low`
  - fallback por placa;
  - ausencia de OS resolvida apenas por heuristica residual.

## Uso esperado

- medir maturidade da trilha documental antes de `shadow write`;
- identificar onde o runtime ainda depende de inferencia;
- provar se a qualidade melhora conforme novos documentos passam a nascer enriquecidos.

## Leitura operacional

- `documentsMatchedByPlateFallback > 0` indica dependencia residual de heuristica;
- `documentsWithoutServiceOrder > 0` indica lacunas de origem ou cobertura legacy;
- `fallbackRate` deve cair nas proximas fases;
- vinculos `high` devem crescer conforme recibos novos carregam metadados explicitos.
