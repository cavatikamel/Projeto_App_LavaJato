# Service Order Data Model

## Modelo atual da bridge

| Campo | Origem principal | Tipo | Qualidade | Observacao |
| --- | --- | --- | --- | --- |
| `id` | `patioVehicles.id` ou `plate` | string | DERIVED | canonico local `service-order:legacy:*` |
| `orderNumber` | bridge local | string | DERIVED | numeracao fundacional `OS-AAAA-######` |
| `legacyAttendanceId` | `patioVehicles.id` | string | CONFIRMED | referencia direta ao atendimento legado |
| `customerId` | `clientRegistry` | string | DERIVED | por `currentClientId`, `plate` ou `phone` |
| `customerName` | `clientRegistry` / `owner` | string | DERIVED | nome exibivel atual |
| `vehicleId` | `vehicleRegistry.id` | string | DERIVED | por `id`, `plate` ou `currentClientId` |
| `vehiclePlate` | `patioVehicles.plate` | string | CONFIRMED | placa operacional principal |
| `status` | `patioVehicles.status` | string | DERIVED | mapeado para lifecycle interno |
| `createdAt` | historico / agenda / entrada | string | PARTIAL | pode usar fallback operacional |
| `startedAt` | inicio legado ou entrada | string | PARTIAL | ainda sem timestamp dedicado no legado |
| `completedAt` | `finishedAt` / `paymentConfirmedAt` | string | PARTIAL | depende da forma atual de encerramento |
| `deliveredAt` | `completedAt` | string | PARTIAL | repetido apenas quando finalizado |
| `operator` | atendimento / `cashEntries` / sessao | string | DERIVED | operador mais confiavel disponivel |
| `services[]` | `services` / `serviceCatalog` | array | CONFIRMED | itens do servico contratado |
| `products[]` | `productsSold` / `productCatalog` | array | CONFIRMED | venda de produto no atendimento |
| `supplies[]` | `serviceSupplyProfiles` / `supplyCatalog` | array | DERIVED | consumo tecnico estimado |
| `payments[]` | `cashEntries` / `openPayments` | array | DERIVED | eventos financeiros vinculados |
| `totals.serviceAmount` | `serviceCatalog` | money | DERIVED | soma dos servicos ativos do atendimento |
| `totals.productAmount` | `productsSold` | money | CONFIRMED | soma dos produtos vendidos |
| `totals.extraAmount` | `extraCharges` | money | CONFIRMED | adicional operacional atual |
| `totals.grossAmount` | calculo local | money | DERIVED | servicos + produtos + extras |
| `totals.discountAmount` | `discount` | money | CONFIRMED | desconto atual do atendimento |
| `totals.netAmount` | calculo local | money | DERIVED | bruto - desconto |
| `totals.paidAmount` | `cashEntries confirmados` | money | DERIVED | liquidacao confirmada vinculada |
| `totals.pendingAmount` | `openPayments` / saldo parcial | money | DERIVED | saldo em aberto atual |
| `totals.feeAmount` | `cashEntries.feeAmount` | money | DERIVED | taxas agregadas dos eventos |
| `totals.estimatedCost` | produtos + insumos | money | DERIVED | custo tecnico estimado |
| `totals.estimatedProfit` | calculo local | money | DERIVED | liquido - custo - taxas |
| `notes[]` | `notes`, `vehicle.notes`, descricoes | array | PARTIAL | notas operacionais unificadas |
| `documents[]` | `documentHistory` | array | PARTIAL | vinculo ainda derivado |
| `events[]` | `attendanceHistory` + sinteticos | array | DERIVED | trilha minima da OS |
| `source.*` | bridge | object | CONFIRMED | rastreabilidade do legado |
| `bridgeIssues.*` | bridge | object | CONFIRMED | lacunas detectadas para diagnostico |

## Campos ainda ausentes como fonte oficial

- numero de OS persistido;
- evento formal de criacao do atendimento;
- timestamps dedicados de inicio e entrega;
- vinculo explicito entre documento e atendimento em todos os casos;
- consumo real de insumos por execucao;
- relacionamento persistido entre atendimento e invoice em todos os caminhos.
