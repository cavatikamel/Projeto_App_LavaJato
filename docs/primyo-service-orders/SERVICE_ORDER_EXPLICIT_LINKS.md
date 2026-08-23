# Service Order Explicit Links

## Objetivo

Tornar explicito, no runtime atual, qual `Service Order` esta ligada a cada registro derivado importante.

## Campos derivados adicionados

Todos os registros derivados elegiveis passam a poder carregar:

- `serviceOrderId`
- `serviceOrderNumber`
- `legacyAttendanceId`

## Pagamentos

`buildServiceOrderPaymentEntries(...)` agora anexa link explicito para:

- entradas derivadas de `cashEntries`;
- registros derivados de `openPayments`.

Cada item tambem preserva:

- `sourceType`
- `sourceId`
- `legacyReference.collection`
- `legacyReference.id`

## Documentos

`buildServiceOrderDocumentEntries(...)` agora retorna documentos com:

- `serviceOrderId`
- `serviceOrderNumber`
- `legacyAttendanceId`
- `legacyReference.collection = documentHistory`
- `legacyReference.id`

## Eventos

`buildServiceOrderEvents(...)` agora normaliza eventos com link explicito da OS em:

- historico herdado do atendimento;
- criacao sintetica da OS;
- status mapeado;
- pagamento vinculado;
- documento vinculado;
- conclusao, quando aplicavel.

## Compatibilidade

Os campos legacy originais foram preservados.

Nenhum consumidor antigo precisou perder:

- `sourceId`
- `sourceType`
- `documentNumber`
- `cash entry id`
- `open payment id`
- `attendanceHistory id`
