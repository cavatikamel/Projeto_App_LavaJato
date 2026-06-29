# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos a implementacao de `LP-WEB-INTEGRATION-002`.

## Estado atual consolidado

- `customerAdapter` continua sendo consumido em `app/main.js` apenas em `shadow read`;
- o uso continua restrito a edicao de cliente existente em `Cadastros > Clientes`;
- o diagnostico da sombra agora registra snapshot rico e historico curto apenas em memoria;
- o legado continua sendo a fonte ativa de renderizacao e salvamento;
- `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam fora do runtime;
- `idResolver` continua fora do runtime;
- Supabase continua fechado;
- `npm.cmd run primyo:gate`, build e verify passaram;
- o smoke manual do fluxo de clientes e do patio admin/operador passou.

## Opcoes avaliadas

### `LP-WEB-INTEGRATION-002-CLOSURE`

- Vantagem: absorve formalmente a melhoria diagnostica da primeira trilha funcional em `app/main.js`;
- Vantagem: atualiza baseline, backlog e controle oficial antes de nova expansao;
- Vantagem: reduz o risco de crescer a integracao sem estabilizar a sombra e seu diagnostico.

### Expandir `customerAdapter` para novos pontos do runtime

- Risco: aumentaria a area tocada antes de fechar a diagnostica atual;
- Risco: misturaria nova cobertura funcional com uma fatia ainda sem closure.

### Integrar `idResolver`

- Risco: misturaria runtime shadow read com resolucao relacional cross-domain cedo demais;
- Risco: aumentaria troubleshooting e rollback antes de absorver o diagnostico enriquecido.

### Integrar `vehicleAdapter`, `serviceAdapter`, `productAdapter` ou `supplyAdapter`

- Risco: ampliaria a superficie antes de provar absorcao formal da primeira integracao;
- Risco: produtos, insumos, servicos e veiculos ainda possuem dependencias e ownership mais sensiveis do que clientes.

### Abrir `LP-SUPABASE-001`

- Risco: backend continua fora da ordem segura antes da estabilizacao do primeiro uso local em runtime.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-INTEGRATION-002-CLOSURE`

Titulo sugerido:

- `Customer Shadow Read Diagnostics Closure`

Direcao recomendada:

- formalizar encerramento da fase diagnostica da primeira integracao;
- atualizar baseline e backlog oficial;
- confirmar que `customerAdapter` continua em modo sombra;
- confirmar que o diagnostico continua silencioso e apenas em memoria;
- manter `idResolver` fora do runtime;
- nao expandir a integracao antes do closure.

## Justificativa

`LP-WEB-INTEGRATION-002-CLOSURE` passa a ser a melhor proxima fatia porque:

1. a trilha acabou de tocar `app/main.js` pela primeira vez;
2. o uso em runtime continua pequeno, reversivel e com legado preservado;
3. o diagnostico da sombra acabou de crescer e precisa ser absorvido formalmente antes de ganhar novos pontos de uso;
4. integrar `idResolver` ou outro adapter agora aumentaria risco sem necessidade;
5. Supabase continua cedo demais para a ordem segura definida.

## Resultado desta fase

Nenhuma nova expansao funcional foi iniciada alem do `shadow read` aprovado e do diagnostico interno em memoria.

Esta fase implementa apenas:

- `customerAdapter` em leitura/sombra;
- um unico fluxo de cliente;
- diagnostico interno mais rico e silencioso;
- sem escrita via adapter;
- sem `idResolver`;
- sem alterar UI, persistencia ou Supabase.
