# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos a conclusao de `LP-WEB-INTEGRATION-002` e da atualizacao de handoff mais recente.

## Estado atual consolidado

- `customerAdapter` continua sendo consumido em `app/main.js` apenas em `shadow read`;
- o uso continua restrito a edicao de cliente existente em `Cadastros > Clientes`;
- o diagnostico da sombra registra sucesso, falha, campos obrigatorios ausentes e historico curto apenas em memoria;
- o legado continua sendo a fonte ativa de renderizacao e salvamento;
- `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam fora do runtime;
- `idResolver` continua fora do runtime;
- Supabase continua fechado;
- `npm.cmd run primyo:gate`, build e verify passaram;
- o warning de chunk acima de `500 kB` permanece nao bloqueante;
- o working tree continua sujo apenas com `.gitignore`, `app/styles.css` e `LavaPrimeAndroidApp/**`, todos fora da trilha Primyo Web.

## Opcoes avaliadas

### `LP-WEB-INTEGRATION-003`

- Vantagem: revisa a cobertura atual do `shadow read` antes de ampliar a integracao;
- Vantagem: permite confirmar se a sombra atual em clientes esta entregando sinal suficiente;
- Vantagem: mantem a proxima fatia pequena, reversivel e ainda centrada no dominio mais seguro;
- Vantagem: preserva o legado como fonte ativa enquanto aumenta confianca operacional.

### Expandir `customerAdapter` para novos fluxos de cliente sem revisao previa

- Risco: aumentaria a superficie tocada em `app/main.js` sem consolidar primeiro a cobertura atual;
- Risco: misturaria observabilidade com expansao funcional cedo demais.

### Integrar `idResolver`

- Risco: adicionaria resolucao relacional cross-domain antes de fechar a analise da sombra atual;
- Risco: ampliaria troubleshooting e rollback sem necessidade imediata.

### Integrar `vehicleAdapter`, `serviceAdapter`, `productAdapter` ou `supplyAdapter`

- Risco: ampliaria a superficie funcional antes de concluir a revisao do primeiro dominio em runtime;
- Risco: veiculos, servicos, produtos e insumos ainda possuem dependencias e ownership mais sensiveis do que clientes.

### Abrir `LP-SUPABASE-001`

- Risco: backend continua fora da ordem segura antes da estabilizacao da primeira trilha local em runtime.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-INTEGRATION-003`

Titulo sugerido:

- `Customer Shadow Read Coverage Review`

Direcao recomendada:

- avaliar a cobertura atual do `shadow read`;
- verificar se vale ampliar a sombra para mais fluxos de cliente;
- manter o legado como fonte ativa;
- manter `idResolver` fora do runtime;
- manter Supabase fechado;
- nao tocar em veiculos, servicos, produtos, insumos, financeiro ou estoque nesta proxima fatia.

## Justificativa

`LP-WEB-INTEGRATION-003` passa a ser a melhor proxima fatia porque:

1. a primeira integracao real e seu diagnostico ja foram implementados e fechados;
2. ainda faz sentido permanecer no dominio de clientes antes de abrir novas entidades;
3. uma revisao de cobertura reduz risco antes de expandir sombra ou considerar integracao mais profunda;
4. integrar `idResolver` ou outros adapters agora aumentaria risco sem necessidade;
5. Supabase continua cedo demais para a ordem segura definida.

## Resultado desta microfase documental

Nenhuma nova expansao funcional foi iniciada.

Esta microfase atualiza apenas a decisao oficial da proxima fatia para substituir a referencia ultrapassada a `LP-WEB-INTEGRATION-002-CLOSURE`.
