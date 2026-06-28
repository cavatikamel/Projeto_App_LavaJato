# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos `LP-WEB-INTEGRATION-READINESS-001`.

## Estado atual consolidado

Estado atual da trilha:

- `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam puros e fora do runtime;
- `adapterHelpers` continua sendo a camada compartilhada minima dos adapters;
- `idResolver` existe como modulo puro, endurecido por gate e ainda fora do runtime;
- o Adapter Gate cobre os cinco adapters e o resolvedor de IDs;
- `app/main.js` continua intacto;
- nenhuma integracao funcional foi iniciada;
- Supabase continua fechado.

## Opcoes avaliadas

### `LP-WEB-INTEGRATION-001`

- Vantagem: inicia a primeira integracao real de forma pequena e reversivel;
- Vantagem: usa o adapter mais maduro da trilha;
- Vantagem: permite validar runtime sem abrir estoque, financeiro ou Supabase;
- Vantagem: mantem `idResolver` fora do primeiro slice.

### `vehicleAdapter` como primeira integracao

- Risco: ownership de cliente ainda e transitorio;
- Risco: placa continua sendo pista forte do legado;
- Risco: historico de ownership ainda nao esta maduro.

### `serviceAdapter` como primeira integracao

- Risco: aproxima a fase de atendimento e consumo tecnico cedo demais;
- Risco: `supplyProfileRefs` ainda nao deve virar relacao funcional.

### `productAdapter` ou `supplyAdapter` como primeira integracao

- Risco: aproximam a trilha de estoque e consumo real;
- Risco: `stockBalance` continua sendo projecao observada, nao trilha auditavel.

### Integracao de `idResolver` no primeiro slice

- Risco: eleva o risco relacional sem necessidade;
- Risco: mistura identidade cross-domain com a primeira alteracao em `app/main.js`.

### `LP-SUPABASE-001`

- Risco: abrir backend antes da primeira prova de runtime local continua fora da ordem segura;
- Risco: aumentaria troubleshooting e rollback cedo demais.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-INTEGRATION-001`

Titulo sugerido:

- `Customer Adapter Shadow Read`

Direcao recomendada:

- tocar um unico fluxo de cliente;
- usar `customerAdapter` apenas em leitura/sombra;
- manter legado como fonte ativa;
- manter `idResolver` fora do runtime;
- nao tocar estoque, financeiro ou Supabase.

## Justificativa

`LP-WEB-INTEGRATION-001` passa a ser a melhor proxima fatia porque:

1. a trilha ja provou cinco adapters puros, helper comum e resolvedor endurecido;
2. falta agora uma primeira prova pequena de uso em runtime;
3. `customerAdapter` e o dominio menos arriscado para essa entrada;
4. `idResolver` ainda deve ficar fora do primeiro slice funcional;
5. integrar veiculo, servico, produto, insumo ou Supabase agora aumentaria o risco sem necessidade.

## Resultado desta fase

Nenhuma integracao funcional foi iniciada.

Esta fase apenas:

- documenta a readiness de runtime;
- compara candidatos;
- define riscos, rollback e smoke futuro;
- escolhe `LP-WEB-INTEGRATION-001` como proxima fatia oficial.
