# Next Slice Decision

## Objetivo

Registrar a decisao oficial da proxima fatia apos a revisao de cobertura de `LP-WEB-INTEGRATION-003`.

## Estado atual consolidado

- `customerAdapter` continua sendo consumido em `app/main.js` apenas em `shadow read`;
- o uso continua restrito a edicao de cliente existente em `Cadastros > Clientes`;
- o diagnostico da sombra registra sucesso, falha, campos obrigatorios ausentes e historico curto apenas em memoria;
- `Novo cliente`, lista de clientes e salvamento continuam fora da sombra;
- o legado continua sendo a fonte ativa de renderizacao e salvamento;
- `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` continuam fora do runtime;
- `idResolver` continua fora do runtime;
- Supabase continua fechado;
- `npm.cmd run primyo:gate`, build e verify passaram;
- o warning de chunk acima de `500 kB` permanece nao bloqueante;
- o working tree continua sujo apenas com `.gitignore`, `app/styles.css` e `LavaPrimeAndroidApp/**`, todos fora da trilha Primyo Web.

## Opcoes avaliadas

### Ampliar sombra para `Novo cliente`

- Vantagem: aumentaria cobertura do formulario;
- Risco: a abertura de novo cliente nao possui registro legado persistido nem `sourceId` estabilizado, o que reduz valor diagnostico nesta ordem.

### Ampliar sombra para lista de clientes

- Vantagem: aumentaria volume de amostragem;
- Risco: elevaria ruido e superficie de execucao em `app/main.js` antes de qualificar a base legada.

### Ampliar sombra para salvamento de cliente

- Vantagem: aproximaria a sombra do ponto mais sensivel do fluxo;
- Risco: tocaria o caminho ativo de escrita cedo demais, com risco maior de troubleshooting e rollback.

### Nao ampliar e apenas observar

- Vantagem: mantem risco minimo;
- Risco: deixa sem resposta objetiva a qualidade da base legada antes da proxima expansao.

### Validar dados legados de clientes antes de ampliar

- Vantagem: qualifica a base real antes de crescer a superficie em runtime;
- Vantagem: reduz falsos negativos causados por PF sem documento, divergencia entre `clientRegistry` e `billingClients` e registros derivados;
- Vantagem: preserva a ordem segura sem tocar save, UI, permissao ou Supabase.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-INTEGRATION-004`

Titulo sugerido:

- `Customer Legacy Data Validation Before Shadow Expansion`

Direcao recomendada:

- validar representativamente a base legada de clientes contra `CUSTOMER_CONTRACT.md`;
- medir falhas esperadas por documento ausente, campos obrigatorios faltantes e divergencias entre fontes legadas;
- manter o legado como fonte ativa;
- manter `idResolver` fora do runtime;
- manter Supabase fechado;
- nao tocar em veiculos, servicos, produtos, insumos, financeiro ou estoque;
- so reconsiderar ampliacao do `shadow read` depois dessa validacao.

## Justificativa

`LP-WEB-INTEGRATION-004` passa a ser a melhor proxima fatia porque:

1. a primeira integracao real e seu diagnostico ja foram implementados e fechados;
2. a cobertura atual continua restrita a um unico ponto seguro do fluxo;
3. existe incerteza real sobre a qualidade do dado legado antes de ampliar a sombra;
4. expandir para lista, novo cliente ou save agora aumentaria risco em `app/main.js` sem ganho proporcional;
5. integrar `idResolver` ou abrir Supabase continua cedo demais para a ordem segura definida.

## Resultado desta fase

Nenhuma nova expansao funcional foi iniciada.

Esta fase apenas revisa a cobertura atual do `Customer Adapter Shadow Read` e redefine a proxima fatia recomendada para uma microfase de validacao de dados legados antes de qualquer ampliacao em runtime.
