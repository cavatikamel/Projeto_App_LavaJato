# Data Metrics Catalog

## Objetivo

Catalogar os dados atualmente movimentados pelo LavaPrime Web e classificar a confiabilidade de cada conjunto antes do uso gerencial no dashboard.

## Qualidade

- `CONFIRMED`: dado existente, lido diretamente de estrutura ativa do runtime.
- `DERIVED`: dado calculado a partir de estruturas confirmadas.
- `PARTIAL`: dado existente, mas incompleto para leitura gerencial plena.
- `DEMO_ONLY`: dado vindo da seed demo, util para operacao local e demonstracao, mas nao institucional.
- `FUTURE`: dado previsto apenas por contrato, documentacao ou fase futura.
- `UNSAFE`: dado existente sem consistencia suficiente para visualizacao gerencial confiavel.

## Entidades auditadas

| Campo | Origem | Tipo | Persistencia | Qualidade | Uso gerencial |
| --- | --- | --- | --- | --- | --- |
| `clientRegistry[]` | `app/demo/lavaprimeDemoData.js` consumido por `app/main.js` | array | memoria bootstrap demo | `DEMO_ONLY` | base de clientes, busca, relacao com veiculos |
| `vehicleRegistry[]` | `app/demo/lavaprimeDemoData.js` | array | memoria bootstrap demo | `DEMO_ONLY` | cadastro de veiculos, historico e propriedade |
| `patioVehicles[]` | `app/demo/lavaprimeDemoData.js` + estado vivo em `app/main.js` | array | memoria bootstrap demo + runtime | `CONFIRMED` | atendimentos, status do patio, agenda, receita operacional |
| `billingClients[]` | `app/demo/lavaprimeDemoData.js` | array | memoria bootstrap demo | `DEMO_ONLY` | clientes faturados, cobranca e classificacao financeira |
| `billingInvoices[]` | `app/demo/lavaprimeDemoData.js` | array | memoria bootstrap demo | `DEMO_ONLY` | faturamento emitido e ligacao documental |
| `invoiceLineItems[]` | `app/demo/lavaprimeDemoData.js` | array | memoria bootstrap demo | `DEMO_ONLY` | composicao de fatura, mix de servicos e produtos |
| `invoiceAmounts` | `app/demo/lavaprimeDemoData.js` | objeto | memoria bootstrap demo | `DEMO_ONLY` | totais de faturas e reconciliacao local |
| `openPayments[]` | `app/demo/lavaprimeDemoData.js` + funcoes de filtro em `app/main.js` | array | memoria bootstrap demo + runtime | `CONFIRMED` | contas a receber, inadimplencia e aging simples |
| `cashEntries[]` | `app/main.js` | array | memoria runtime | `CONFIRMED` | entradas, saidas, fluxo de caixa e formas de pagamento |
| `payableAccounts[]` | `app/main.js` | array | memoria runtime | `PARTIAL` | contas a pagar e pressao de caixa |
| `quoteEstimates[]` | `app/main.js` | array | memoria runtime | `PARTIAL` | orcamentos e pre-vendas |
| `adminOperators[]` | `app/main.js` | array | memoria runtime | `CONFIRMED` | equipe, produtividade local, distribuicao operacional |
| `serviceCatalog[]` | `app/main.js` | array | memoria runtime | `CONFIRMED` | servicos vendidos, duracao, preco e ficha tecnica |
| `productCatalog[]` | `app/main.js` | array | memoria runtime | `CONFIRMED` | produtos para venda e baixo estoque |
| `supplyCatalog[]` | `app/main.js` | array | memoria runtime | `CONFIRMED` | insumos internos e risco de abastecimento |
| `inventoryMovements[]` | `app/main.js` | array | memoria runtime | `PARTIAL` | movimentacao de estoque e consumo |
| `productSales[]` | `app/main.js` | array | memoria runtime | `PARTIAL` | venda de produtos e composicao de receita |
| `serviceSupplyProfiles[]` | `app/main.js` | array | memoria runtime | `CONFIRMED` | servicos sem ficha tecnica e consumo previsto |
| `documentHistory[]` | `app/main.js` | array | memoria runtime | `PARTIAL` | documentos emitidos, trilha documental |
| `businessProfile` | `app/main.js` | objeto | `localStorage` via boundary | `CONFIRMED` | logo, empresa, identidade e emissao documental |
| `businessFinanceSettings` | `app/main.js` | objeto | `localStorage` via boundary | `CONFIRMED` | regras de juros, desconto, configuracao financeira |
| `businessPaymentMethods[]` | `app/main.js` | array | `localStorage` via boundary | `CONFIRMED` | meios de pagamento e configuracao da operacao |
| `businessBankAccounts[]` | `app/main.js` | array | `localStorage` via boundary | `PARTIAL` | contas e conciliacao futura |
| `businessPixInfo` | `app/main.js` | objeto | `localStorage` via boundary | `PARTIAL` | PIX e cobranca |
| `businessMessageTemplates[]` | `app/main.js` | array | `localStorage` via boundary | `PARTIAL` | comunicacao com clientes e automacoes futuras |
| `vehicleSpecialCareRecords[]` | `app/main.js` | array | memoria runtime | `CONFIRMED` | cuidado especial, restricoes tecnicas e prioridade |
| `cleanBootstrapReadiness` e correlatos | `app/main.js` | objeto | memoria runtime | `PARTIAL` | diagnostico tecnico, nao gerencial |

## Persistencia observada

- `localStorage`: usado para perfil da empresa, configuracoes financeiras, mensagens e partes configuraveis da operacao.
- `sessionStorage`: nao identificado como fonte gerencial principal nesta fatia.
- seed demo: `app/demo/lavaprimeDemoData.js` continua sendo a base dominante para clientes, veiculos, patio, faturamento e cobranca.

## Fontes usadas no dashboard implementado agora

| Fonte | Campos usados | Motivo |
| --- | --- | --- |
| `patioVehicles[]` | `status`, `scheduledDate`, `finishedDate`, `date`, `scheduledTime`, `entry`, `payment`, `service`, `services`, `totalValue derivado` | KPIs de atendimento, patio e servicos |
| `cashEntries[]` | `date`, `time`, `value`, `status`, `method`, `category`, `type` | receita confirmada, caixa e formas de pagamento |
| `openPayments[]` | `value`, `status`, `dueDate` | contas a receber em aberto |
| `productCatalog[]` e `supplyCatalog[]` | niveis de estoque | alerta de estoque |
| `serviceCatalog[]` e `serviceSupplyProfiles[]` | perfil tecnico do servico | servicos sem ficha |
| `vehicleSpecialCareRecords[]` e flags do patio | restricoes e alertas | KPI de cuidado especial |
