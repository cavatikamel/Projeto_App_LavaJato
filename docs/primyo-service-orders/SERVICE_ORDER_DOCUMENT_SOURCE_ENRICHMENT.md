# Service Order Document Source Enrichment

## Objetivo

Reduzir a dependencia de heuristica nos documentos derivados e aumentar a rastreabilidade entre documento legado e `Service Order`, sem alterar a saida visual nem tocar persistencia real.

## Escopo LP-SERVICE-ORDER-005

- normalizacao tecnica da origem documental em runtime;
- prioridade oficial de vinculo documento -> OS;
- preservacao dos campos legados;
- enriquecimento auxiliar para documentos novos gerados pelo runtime;
- diagnostico silencioso da qualidade dos vinculos.

## Estrutura auxiliar adicionada

Cada documento derivado pode passar a carregar, em runtime:

```javascript
documentServiceOrderSource: {
  sourceType: "",
  sourceId: "",
  legacyAttendanceId: "",
  serviceOrderId: "",
  serviceOrderNumber: "",
  paymentSourceType: "",
  paymentSourceId: "",
  matchedBy: "",
  confidence: "",
  fallbackUsed: false,
  fallbackReason: ""
}
```

## Ordem oficial de prioridade

O runtime deve priorizar os vinculos nesta ordem:

1. `serviceOrderId` explicito.
2. `serviceOrderNumber` explicito.
3. `legacyAttendanceId` ou `sourceId` compativel.
4. `paymentSourceType/paymentSourceId` compativel.
5. `sourceType/sourceId` compativel.
6. placa do veiculo apenas como fallback.
7. fallback sem OS quando nenhum vinculo for confiavel.

## Regras de enriquecimento

- manter `documentHistory` como fonte visual principal;
- nao alterar texto, layout ou template dos documentos;
- nao mutar dados originais quando o fluxo usar derivacao;
- preservar `sourceType`, `sourceId`, `documentId` e `documentNumber` legados;
- registrar `matchedBy`, `confidence`, `fallbackUsed` e `fallbackReason`.

## Documentos novos

Recibos e documentos novos gerados a partir de atendimento passam a carregar, desde a origem:

- `serviceOrderId`, quando disponivel;
- `serviceOrderNumber`, quando disponivel;
- `legacyAttendanceId`;
- `sourcePlate`;
- `paymentSourceType/paymentSourceId`, quando aplicavel.

Isso reduz a necessidade de inferencia futura por placa.

## O que continua fora

- persistencia definitiva;
- Supabase;
- migration;
- alteracao visual;
- promocao da OS como fonte primaria de documentos.
