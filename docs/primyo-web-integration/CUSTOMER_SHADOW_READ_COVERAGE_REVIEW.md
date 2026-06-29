# Customer Shadow Read Coverage Review

## 1. Onde o shadow read ja roda hoje

- o `customerAdapter` roda apenas em `openClientDialog(clientId)`;
- a execucao acontece somente quando existe `clientId` valido e o cliente legado e localizado;
- o fluxo atual e `Cadastros > Clientes > editar cliente existente`;
- a sombra usa `toCustomerContract(client, context)` com:
  - `organizationId` tecnico local;
  - `source` = `web.clientDialog.shadowRead`;
  - `sourceCollection` = `clientRegistry`;
  - `sourceId` = `String(client.id)`;
  - `now` gerado localmente;
  - `allowWarnings: true`;
  - `strictMode: false`;
- o resultado fica apenas em memoria tecnica:
  - `lastCustomerShadowReadReport`;
  - `window.__lavaprimeCustomerShadowReadDiagnostics`.

## 2. Onde ele ainda nao roda

- abertura de `Novo cliente` via `openClientDialog()` sem `clientId`;
- renderizacao da lista de clientes em `renderClientsScreen(container)`;
- salvamento de cliente em `saveClientRegistration(container)`;
- criacao de cliente faturado derivado em `syncBillingClientFromRegistry(client)`;
- fluxos auxiliares ligados a veiculo/placa que acabam refletindo cliente, como `saveClientVehicleRegistrationFromDialog()` e sincronizacoes de ownership;
- tela administrativa resumida de clientes em `getClientsScreenContent()`, que hoje usa `billingClients`.

## 3. Quais fluxos de cliente existem no app/main.js

- abertura da lista principal de clientes em `renderClientsScreen(container)`;
- abertura de edicao de cliente existente em `openClientDialog(clientId)`;
- abertura de novo cliente em `openClientDialog()` via `#startClientFormButton`;
- validacao e salvamento de cadastro em `saveClientRegistration(container)`;
- construcao do payload legado em `buildClientRegistration(container)`;
- sincronizacao de cliente faturado derivado em `syncBillingClientFromRegistry(client)` e `syncBillingClientRecord(client)`;
- vinculacao de placas ao cliente e sincronizacao com veiculos em `syncVehiclesFromClientRegistration(client)` e `syncPlateOwnership(plate, nextClientId)`;
- edicao indireta de ownership do cliente por fluxos de veiculo e faturamento.

## 4. Quais fluxos sao candidatos para futura ampliacao

### Candidato A - abertura de novo cliente

- valor tecnico: medio;
- risco: medio;
- observacao: a tela abre sem cliente legado persistido, entao a sombra precisaria operar sobre rascunho local ou permanecer inativa ate existir um registro completo.

### Candidato B - lista de clientes

- valor tecnico: medio;
- risco: alto;
- observacao: ampliaria volume, frequencia e ruido diagnostico de uma vez, alem de misturar `clientRegistry` com leitura administrativa mais ampla.

### Candidato C - validacao previa ao salvamento, sem alterar save

- valor tecnico: alto;
- risco: alto;
- observacao: mesmo em modo sombra, encostaria no fluxo mais sensivel do dominio e exigiria prova mais forte de qualidade do dado legado.

### Candidato D - microfase de validacao de dados legados antes de ampliar

- valor tecnico: alto;
- risco: baixo/medio;
- observacao: permite medir quantos clientes reais do seed atual falham por documento ausente, campos incompletos ou divergencia entre `clientRegistry` e `billingClients`, sem tocar runtime.

## 5. Quais fluxos devem ser rejeitados por enquanto

- salvamento de cliente:
  - continua fora da ordem segura porque toca o caminho ativo de escrita e sincronizacao com placas, faturamento e dashboard;
- lista de clientes:
  - continua rejeitada por enquanto porque multiplicaria a execucao do adapter sem primeiro qualificar a base legada;
- fluxos indiretos de veiculo/faturado:
  - continuam rejeitados porque misturam ownership, placa, faturamento e derivados de `billingClients`;
- qualquer uso junto com `idResolver`:
  - continua rejeitado porque a trilha atual ainda e somente de cliente em sombra local.

## 6. Riscos de ampliar agora

- ampliar a sombra sem qualificar os dados legados pode aumentar falsos negativos por:
  - PF sem documento;
  - dados incompletos em `clientRegistry`;
  - divergencia entre `clientRegistry` e `billingClients`;
  - registros derivados por placa ou faturamento;
- qualquer expansao em lista ou save aumenta o risco operacional em `app/main.js`;
- ampliar antes de uma revisao de dados reduziria a clareza diagnostica da fase anterior.

## 7. Riscos de nao ampliar agora

- a cobertura atual continua restrita a um unico ponto de edicao;
- o time pode ficar sem evidencia sobre a qualidade do dado legado fora do fluxo editado manualmente;
- a proxima integracao pode atrasar se a validacao da base nao for tratada logo.

## 8. Evidencias das fases anteriores

- `LP-WEB-INTEGRATION-001` confirmou:
  - sombra apenas em edicao de cliente existente;
  - legado preservado como fonte ativa;
  - smoke manual do fluxo de clientes, patio admin e operador aprovado;
- `LP-WEB-INTEGRATION-002` confirmou:
  - diagnostico interno mais rico e historico curto em memoria;
  - `Novo cliente` continuou fora da sombra;
  - console permaneceu sem erro bloqueante;
- `npm.cmd run primyo:gate` permanece aprovado com build e verify.

## 9. Criterios para liberar proxima ampliacao

- mapear a taxa de clientes legados validos e invalidos contra `CUSTOMER_CONTRACT.md`;
- identificar quantos registros falham por documento ausente, nome incompleto ou campos faturados paralelos;
- provar que a ampliacao escolhida nao toca save, permissao, UI ou persistencia;
- manter `idResolver` fora do runtime;
- manter Supabase fechado;
- manter rollback simples em `app/main.js`.

## 10. Recomendacao final

Recomendacao conservadora: `opcao 5`

- fazer uma microfase de validacao de dados legados de clientes antes de ampliar o `shadow read`.

Fatia futura recomendada:

- `LP-WEB-INTEGRATION-004 — Customer Legacy Data Validation Before Shadow Expansion`

Motivo:

- existe incerteza real sobre a qualidade e consistencia dos dados legados de cliente;
- o fluxo atual ja entrega observabilidade suficiente para justificar uma validacao documental/tecnica antes de crescer a superficie em `app/main.js`;
- abrir `Novo cliente`, lista ou save agora aumentaria risco antes de qualificar melhor a base.
