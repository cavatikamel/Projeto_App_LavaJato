# Service Order Shadow Write Design

## Objetivo

Desenhar a futura gravacao paralela da `Service Order` sem executar escrita real, sem abrir Supabase e sem alterar producao.

## Definicao

`Shadow write` significa gravar a `Service Order` em uma estrutura nova, em paralelo ao legado, mantendo o legado como fonte primaria durante a fase de transicao.

## Estado na LP-SERVICE-ORDER-005

- `designed = true`
- `enabled = false`
- `mode = dry-run`
- `supabaseTouched = false`
- `migrationRequired = true`

## Escopo planejado do payload

O plano de escrita futura considera, no minimo:

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

## Sequencia futura recomendada

1. aprovar schema e migration em ambiente seguro;
2. criar staging backend proprio;
3. habilitar `shadow write` apenas em staging;
4. comparar legado x OS com diagnostico;
5. validar rollback;
6. so depois discutir `dual read`.

## Criterios minimos de ativacao

- Supabase staging disponivel;
- migrations aprovadas;
- isolamento por tenant definido;
- variaveis de ambiente separadas por ambiente;
- logs auditaveis;
- rollback documentado;
- contrato de leitura e escrita estabilizado;
- testes de escrita aprovados em staging;
- producao protegida.

## O que continua proibido

- `fetch` para backend;
- escrita em Supabase;
- shadow write em producao;
- alteracao de dominio ou ambiente;
- promocao de `enabled = true`.
