# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos a implementacao de `LP-WEB-INTEGRATION-001`.

## Estado atual consolidado

- `customerAdapter` passou a ser consumido em `app/main.js` apenas em `shadow read`;
- o uso ficou restrito a edicao de cliente existente em `Cadastros > Clientes`;
- o legado continua sendo a fonte ativa de renderizacao e salvamento;
- `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam fora do runtime;
- `idResolver` continua fora do runtime;
- Supabase continua fechado;
- `npm.cmd run primyo:gate`, build e verify passaram;
- o smoke manual do fluxo de clientes e do patio admin/operador passou.

## Opcoes avaliadas

### `LP-WEB-INTEGRATION-001-CLOSURE`

- Vantagem: absorve formalmente a primeira alteracao real em `app/main.js`;
- Vantagem: atualiza baseline, backlog e controle oficial antes de nova expansao;
- Vantagem: reduz o risco de crescer a integracao sem estabilizar a primeira fatia.

### Expandir `customerAdapter` para novos pontos do runtime

- Risco: aumentaria a area tocada antes de fechar a primeira entrada;
- Risco: misturaria nova cobertura funcional com uma fatia ainda sem closure.

### Integrar `idResolver`

- Risco: misturaria runtime shadow read com resolucao relacional cross-domain cedo demais;
- Risco: aumentaria troubleshooting e rollback na primeira alteracao real do monolito.

### Integrar `vehicleAdapter`, `serviceAdapter`, `productAdapter` ou `supplyAdapter`

- Risco: ampliaria a superficie antes de provar absorcao formal da primeira integracao;
- Risco: produtos, insumos, servicos e veiculos ainda possuem dependencias e ownership mais sensiveis do que clientes.

### Abrir `LP-SUPABASE-001`

- Risco: backend continua fora da ordem segura antes da estabilizacao do primeiro uso local em runtime.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-INTEGRATION-001-CLOSURE`

Titulo sugerido:

- `Customer Adapter Shadow Read Closure`

Direcao recomendada:

- formalizar encerramento da primeira integracao;
- atualizar baseline e backlog oficial;
- confirmar que `customerAdapter` continua em modo sombra;
- manter `idResolver` fora do runtime;
- nao expandir a integracao antes do closure.

## Justificativa

`LP-WEB-INTEGRATION-001-CLOSURE` passa a ser a melhor proxima fatia porque:

1. a trilha acabou de tocar `app/main.js` pela primeira vez;
2. o uso em runtime continua pequeno, reversivel e com legado preservado;
3. a primeira integracao precisa ser absorvida formalmente antes de ganhar novos pontos de uso;
4. integrar `idResolver` ou outro adapter agora aumentaria risco sem necessidade;
5. Supabase continua cedo demais para a ordem segura definida.

## Resultado desta fase

Nenhuma nova expansao funcional foi iniciada alem do `shadow read` aprovado.

Esta fase implementa apenas:

- `customerAdapter` em leitura/sombra;
- um unico fluxo de cliente;
- sem escrita via adapter;
- sem `idResolver`;
- sem alterar UI, persistencia ou Supabase.
