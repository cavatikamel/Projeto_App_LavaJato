# Service Order Storage Contract

## Objetivo

Formalizar o contrato canonico local da `Service Order` antes de qualquer escrita real em backend.

## Estrutura oficial desta fase

O snapshot persistivel passa a ser montado com:

- `schemaVersion`
- `serviceOrder`
- `customerSnapshot`
- `vehicleSnapshot`
- `items`
- `payments`
- `documents`
- `events`
- `totals`
- `audit`
- `legacy`
- `readiness`

## Campos obrigatorios minimos

- `serviceOrder.id`
- `serviceOrder.orderNumber`
- `serviceOrder.status`
- `serviceOrder.createdAt`
- `legacy.legacyAttendanceId`
- `schemaVersion = 1`

## Subestruturas persistiveis previstas

Esta fase ainda nao cria banco, mas documenta a separacao futura em:

- `service_orders`
- `service_order_customer_snapshots`
- `service_order_vehicle_snapshots`
- `service_order_items`
- `service_order_payments`
- `service_order_documents`
- `service_order_events`
- `service_order_totals`
- `service_order_audit`
- `service_order_legacy_references`

## Limites desta fase

- nao grava no banco;
- nao abre Supabase;
- nao cria migration;
- nao troca a UX de `Atendimento`;
- nao promove a OS como fonte oficial unica do runtime.
