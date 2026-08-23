# Service Order Legacy Compatibility

## Objetivo

Registrar como a nova camada de `Service Order` convive com o atendimento atual sem quebrar o produto.

## Compatibilidade preservada

- o patio continua usando `patioVehicles`;
- a UI continua chamando o fluxo de `Atendimento`;
- `cashEntries`, `openPayments`, `billingInvoices` e `documentHistory` continuam nas estruturas atuais;
- nenhum dado demo foi removido;
- nenhum bootstrap foi trocado;
- nenhum adaptador runtime novo foi criado fora do escopo desta fase.

## Bridge atual

A bridge monta a OS por leitura e derivacao a partir de:

- `patioVehicles`
- `clientRegistry`
- `vehicleRegistry`
- `cashEntries`
- `openPayments`
- `invoiceLineItems`
- `documentHistory`

## Lacunas aceitas nesta fase

- alguns documentos ainda sao ligados por heuristica de `plate` e `fileName`;
- timestamps de criacao/inicio/conclusao ainda dependem de fallback operacional;
- pagamento aberto e pagamento confirmado ainda convivem com a semantica atual do legado;
- custos de insumos ainda sao estimados pela ficha tecnica, nao por consumo real.

## Fora de escopo

- persistir `Service Order` em storage proprio;
- reescrever o patio;
- reescrever financeiro;
- abrir Supabase;
- renomear toda a interface para `OS`.
