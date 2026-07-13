# Service Order Implementation Roadmap

## LP-SERVICE-ORDER-001

- fundacao interna criada em `app/main.js`;
- bridge `legacy attendance -> service order`;
- numeracao local;
- lifecycle inicial;
- diagnostico silencioso.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-002 - Service Order persistence boundary and explicit links

Objetivo sugerido:

- separar a montagem da OS do markup;
- criar boundary de persistencia local controlada para snapshots de OS;
- tornar explicito o vinculo de documentos, pagamentos e invoices com a OS;
- preparar storage e contratos sem abrir Supabase.

## Trilha posterior

### LP-SERVICE-ORDER-003 - Service Order UI progressive adoption

- introduzir numero de OS em detalhes, recibos e relatórios sem renomear toda a UX;
- manter `Atendimento` como linguagem principal para o usuario final, com `OS` aparecendo onde fizer sentido operacional.

### LP-SERVICE-ORDER-004 - Service Order backend and sync readiness

- definir contrato persistido;
- definir sequencia de integracao com backend/Supabase;
- definir numeracao definitiva.
