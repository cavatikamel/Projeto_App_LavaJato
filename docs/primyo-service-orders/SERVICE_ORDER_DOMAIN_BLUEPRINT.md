# Service Order Domain Blueprint

## Objetivo

Definir a `Service Order` como o dossie operacional interno do LavaPrime, preservando a UX atual baseada em `Atendimento`.

## Decisao desta fase

- a interface continua chamando a rotina principal de `Atendimento`;
- internamente, o runtime passa a ter uma bridge capaz de montar uma `Service Order` a partir do legado;
- a primeira origem oficial da bridge e `patioVehicles`;
- a `Service Order` atual e derivada, local e sem persistencia propria.

## Papel da Service Order

A `Service Order` passa a concentrar ou referenciar:

- identificacao operacional;
- cliente;
- veiculo;
- servicos;
- produtos vendidos no atendimento;
- insumos tecnicos derivados da ficha de servico;
- pagamentos;
- vinculos financeiros;
- documentos;
- eventos do atendimento;
- totais gerenciais.

## Fronteira desta fase

Esta fase nao:

- troca o nome visual das telas para `OS`;
- cria persistencia dedicada;
- altera bootstrap;
- abre Supabase;
- altera documentos visuais;
- muda o fluxo do patio.

## Origem legacy atual

### Colecao primaria

- `patioVehicles`

### Colecoes relacionadas

- `clientRegistry`
- `vehicleRegistry`
- `cashEntries`
- `openPayments`
- `billingInvoices`
- `invoiceLineItems`
- `documentHistory`
- `serviceCatalog`
- `productCatalog`
- `supplyCatalog`
- `serviceSupplyProfiles`

## Qualidade atual

- `Service Order` nesta fase e `bridge/local-only`;
- os dados continuam dependentes do legado;
- a numeracao atual e fundacional, nao definitiva de producao;
- documentos ainda usam vinculos derivados por `sourceId`, `plate`, `fileName` e `summary`, porque o historico legado ainda nao grava relacionamento formal de OS.
