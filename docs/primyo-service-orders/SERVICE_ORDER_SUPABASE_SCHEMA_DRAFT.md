# Service Order Supabase Schema Draft

## Estado

Rascunho documental. Nao executavel. Nao aplicar em banco nesta fase.

## Tabelas sugeridas

### `service_orders`

- finalidade: cabecalho principal da OS;
- campos principais: `id`, `organization_id`, `order_number`, `status`, `legacy_attendance_id`, `created_at`, `started_at`, `completed_at`, `delivered_at`;
- obrigatoriedade inicial: alta.

### `service_order_customer_snapshots`

- finalidade: congelar referencia de cliente usada pela OS;
- campos principais: `service_order_id`, `customer_id`, `customer_name`, `document`, `phone`;
- obrigatoriedade inicial: media.

### `service_order_vehicle_snapshots`

- finalidade: congelar referencia do veiculo;
- campos principais: `service_order_id`, `vehicle_id`, `plate`, `model`, `category`, `color`;
- obrigatoriedade inicial: media.

### `service_order_items`

- finalidade: itens de servico e produto;
- campos principais: `service_order_id`, `item_type`, `source_id`, `name`, `quantity`, `unit_price`, `total_amount`;
- obrigatoriedade inicial: alta.

### `service_order_payments`

- finalidade: pagamentos vinculados a OS;
- campos principais: `service_order_id`, `payment_type`, `source_id`, `status`, `gross_amount`, `net_amount`, `fee_amount`, `effective_at`;
- obrigatoriedade inicial: alta.

### `service_order_documents`

- finalidade: documentos e recibos vinculados;
- campos principais: `service_order_id`, `document_type`, `source_id`, `document_number`, `title`, `issued_at`;
- obrigatoriedade inicial: media.

### `service_order_events`

- finalidade: historico operacional;
- campos principais: `service_order_id`, `event_type`, `occurred_at`, `source_type`, `source_id`, `description`;
- obrigatoriedade inicial: media.

### `service_order_totals`

- finalidade: totais consolidados e auditaveis;
- campos principais: `service_order_id`, `gross_amount`, `discount_amount`, `net_amount`, `paid_amount`, `pending_amount`, `estimated_cost`, `estimated_profit`;
- obrigatoriedade inicial: alta.

### `service_order_audit`

- finalidade: auditoria tecnica e rastreabilidade de write;
- campos principais: `service_order_id`, `schema_version`, `created_by`, `updated_by`, `source_mode`, `runtime_version`;
- obrigatoriedade inicial: futura.

### `service_order_legacy_references`

- finalidade: ponte oficial com ids e colecoes legadas;
- campos principais: `service_order_id`, `legacy_collection`, `legacy_id`, `reference_kind`;
- obrigatoriedade inicial: alta durante transicao.

## Regras do rascunho

- `organization_id` deve existir em todas as tabelas multi-tenant relevantes;
- `service_order_id` deve ser a chave de relacionamento principal;
- `legacy_attendance_id` deve permanecer enquanto houver fallback legado;
- a numeracao definitiva continua dependente de backend;
- nenhuma tabela foi criada nesta fase.
