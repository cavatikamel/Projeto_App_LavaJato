# LavaPrime Data Contracts Draft

## 1. Objetivo

Definir o rascunho dos contratos de dados das entidades prioritarias do LavaPrime sem implementar schema real nesta fase.

## 2. Principios comuns

Todo contrato prioritario deve prever:

- `id` canonico estavel;
- `organizationId` como ownership de tenant;
- `createdAt` e `updatedAt`;
- `status` quando aplicavel;
- relacoes explicitas, nao inferidas por nome;
- separacao entre dado primario e dado derivado;
- campos locais transitivos claramente identificados.

## 3. Organizacao

### Papel

Representar o tenant e a raiz de ownership corporativo do LavaPrime.

### Campos minimos

- `id`
- `slug`
- `name`
- `status`
- `createdAt`
- `updatedAt`

### Relacoes

- uma organizacao possui configuracoes do negocio;
- uma organizacao possui clientes, veiculos, servicos, produtos, insumos, equipe e metodos de pagamento;
- uma organizacao delimita todo dado operacional e financeiro compartilhado.

### Invariantes

- `organizationId` deve existir em todo dado mestre compartilhado;
- nenhum cadastro mestre pode existir fora do escopo da organizacao.

## 4. Configuracao do negocio

### Papel

Representar o envelope logico de identidade, regras e preferencias da organizacao.

### Campos minimos

- `id`
- `organizationId`
- `legalName`
- `tradeName`
- `cnpj`
- `phone`
- `email`
- `address`
- `reportPreferences`
- `receiptRules`
- `inventoryRules`
- `documentRules`
- `socialPreferences`
- `messageDefaults`
- `createdAt`
- `updatedAt`

### Relacoes

- depende de `organizationId`;
- suporta documentos, financeiro, estoque e comunicacao;
- influencia `payment_methods`, faturas, recibos, relatorios e regras de inventario.

### Invariantes

- o envelope logico pode ser fisicamente repartido entre `business_profiles`, `finance_settings`, `social_links` e `message_templates`;
- alteracao de configuracao vale para novos eventos, nao reescreve historico passado;
- `businessBankAccounts` e `businessPixInfo` podem permanecer como entidades filhas, nao como blobs invisiveis.

### Campos locais transitivos aceitaveis

- cache visual de logo;
- estados temporarios de formulario;
- selecao de abas administrativas.

## 5. Cliente

### Papel

Representar a pessoa ou empresa atendida pelo LavaPrime.

### Campos minimos

- `id`
- `organizationId`
- `name`
- `kind`
- `document`
- `phonePrimary`
- `email`
- `status`
- `createdAt`
- `updatedAt`

### Relacoes

- um cliente pode ter varios veiculos;
- um cliente pode possuir varios orcamentos;
- um cliente pode aparecer em atendimentos;
- um cliente pode possuir vinculos financeiros.

### Invariantes

- `billingClients` nao deve sobreviver como entidade paralela definitiva;
- telefone e documento devem ser normalizados;
- o nome nao pode ser o unico identificador de reconciliacao.

### Campos locais transitivos aceitaveis

- marcadores de selecao de UI;
- rascunhos de edicao;
- mapeamento legado temporario de `billingClientId`.

## 6. Veiculo

### Papel

Representar o ativo fisico associado ao cliente e aos atendimentos.

### Campos minimos

- `id`
- `organizationId`
- `clientId`
- `plate`
- `brand`
- `model`
- `year`
- `color`
- `category`
- `notes`
- `status`
- `createdAt`
- `updatedAt`

### Relacoes

- pertence a um cliente atual;
- pode possuir historico de proprietarios;
- pode possuir cuidados especiais;
- participa de orcamentos, atendimentos, documentos e financeiro.

### Invariantes

- placa deve ser unica por `organizationId`;
- historicos nao devem permanecer apenas aninhados no objeto principal;
- dados FIPE sao referencia, nao ownership do veiculo.

### Campos locais transitivos aceitaveis

- filtros da tela;
- cache de busca FIPE;
- indicadores temporarios de selecao no patio.

## 7. Membro de equipe

### Papel

Representar o cadastro mestre da pessoa da equipe, separado da autenticacao real futura.

### Campos minimos

- `id`
- `organizationId`
- `profileId`
- `name`
- `role`
- `accessProfile`
- `phone`
- `email`
- `shift`
- `commissionType`
- `commissionValue`
- `status`
- `createdAt`
- `updatedAt`

### Relacoes

- pode aparecer em atendimentos, relatorios, producao e comissao;
- futuramente deve se ligar a identidade/autenticacao por `profileId`.

### Invariantes

- `adminOperators` nao deve continuar misturando para sempre credencial demo/local com cadastro mestre;
- `username` local e apenas convivencia temporaria;
- inativacao nao pode apagar historico operacional.

### Campos locais transitivos aceitaveis

- estado atual de sessao;
- selecao de operador em filtro de relatorio;
- indicadores de UI e dashboard.

## 8. Servico

### Papel

Representar o catalogo de servicos oferecidos.

### Campos minimos

- `id`
- `organizationId`
- `name`
- `category`
- `basePrice`
- `estimatedDuration`
- `isActive`
- `createdAt`
- `updatedAt`

### Relacoes

- pode compor orcamentos;
- pode ser aplicado em atendimentos;
- pode possuir perfil de insumos associado.

### Invariantes

- perfis de insumo nao podem depender de nome livre do servico;
- o servico precisa de id tecnico estavel.

### Campos locais transitivos aceitaveis

- flags de edicao em andamento;
- ordenacao e filtros de tela.

## 9. Produto

### Papel

Representar itens vendidos ou consumidos operacionalmente.

### Campos minimos

- `id`
- `organizationId`
- `name`
- `sku`
- `unit`
- `salePrice`
- `costPrice`
- `stockBalance`
- `isActive`
- `createdAt`
- `updatedAt`

### Relacoes

- participa de vendas;
- pode gerar movimento de estoque;
- pode estar vinculado a atendimento ou orcamento.

### Invariantes

- saldo de estoque nao deve depender apenas de recalculo local oportunista;
- eventos de venda precisam apontar para produto canonico.

### Campos locais transitivos aceitaveis

- rascunho de venda;
- filtros e ordenacao.

## 10. Insumo

### Papel

Representar material consumido em servicos ou operacao.

### Campos minimos

- `id`
- `organizationId`
- `name`
- `unit`
- `costPrice`
- `stockBalance`
- `isActive`
- `createdAt`
- `updatedAt`

### Relacoes

- pode compor perfil de servico;
- pode gerar movimento de estoque;
- pode apoiar calculo operacional e relatorio.

### Invariantes

- relacao com servico deve ocorrer por id, nao por nome;
- saldo e movimento precisam de trilha auditavel.

### Campos locais transitivos aceitaveis

- busca e filtros;
- rascunhos de composicao de servico.

## 11. Metodo de pagamento

### Papel

Representar o cadastro mestre das regras de recebimento utilizadas pelo produto.

### Campos minimos

- `id`
- `organizationId`
- `name`
- `methodType`
- `linkedBankAccountId`
- `pixKeyId`
- `showInService`
- `showInProductSale`
- `showInQuote`
- `showInInvoice`
- `immediateSettlement`
- `settlementDays`
- `feePercent`
- `fixedFee`
- `notes`
- `isActive`
- `createdAt`
- `updatedAt`

### Relacoes

- pode apontar para conta bancaria da organizacao;
- pode se ligar a configuracao Pix;
- e consumido por atendimento, venda, invoice, receivable e cash entry.

### Invariantes

- `paymentMethod` e dado mestre, nao evento financeiro;
- renome de metodo nao deve depender de reescrita destrutiva de historico no estado futuro;
- taxa e prazo usados no evento precisam ser congelados em snapshot.

### Campos locais transitivos aceitaveis

- selecao momentanea de metodo em um formulario;
- filtros e ordenacao da tela financeira.

## 12. Atendimento

### Papel

Representar o ciclo operacional do veiculo no patio e sua execucao.

### Campos minimos

- `id`
- `organizationId`
- `clientId`
- `vehicleId`
- `operatorId`
- `status`
- `entryAt`
- `startAt`
- `endAt`
- `servicesTotal`
- `productsTotal`
- `notes`
- `createdAt`
- `updatedAt`

### Relacoes

- referencia cliente e veiculo;
- agrega servicos aplicados;
- pode originar documentos;
- pode originar eventos financeiros.

### Invariantes

- atendimento deve virar a origem oficial dos eventos operacionais;
- valores agregados nao substituem itens e eventos filhos;
- patio local nao pode continuar como unica fonte oficial desse dominio.

### Campos locais transitivos aceitaveis

- fila visual do patio;
- estados de modal;
- rascunhos de checkout antes da confirmacao.

## 13. Financeiro

### Papel

Representar o dominio financeiro do LavaPrime sem reduzir tudo a uma unica tabela.

### Subcontratos minimos

- `FinancialAccount`
- `PaymentMethod`
- `Receivable`
- `Invoice`
- `InvoiceLineItem`
- `Payment`
- `CashEntry`
- `PayableAccount`
- `FinancialDocument`

### Campos minimos do envelope financeiro compartilhado

- `id`
- `organizationId`
- `sourceType`
- `sourceId`
- `createdAt`
- `updatedAt`

### `FinancialAccount`

Campos minimos:

- `id`
- `organizationId`
- `kind`
- `label`
- `bankName`
- `pixKey`
- `pixKeyType`
- `showInInvoices`
- `isActive`

### `PaymentMethod`

Campos minimos:

- `id`
- `organizationId`
- `name`
- `methodType`
- `isActive`
- `settlementDays`
- `feePercent`
- `fixedFee`
- `immediateSettlement`
- `financialAccountId`

### `Receivable`

Campos minimos:

- `id`
- `organizationId`
- `sourceType`
- `sourceId`
- `clientId`
- `vehicleId`
- `attendanceId`
- `invoiceId`
- `description`
- `amount`
- `paidAmount`
- `balanceAmount`
- `status`
- `dueDate`

### `Invoice`

Campos minimos:

- `id`
- `organizationId`
- `clientId`
- `attendanceId`
- `invoiceNumber`
- `issueDate`
- `dueDate`
- `status`
- `subtotal`
- `discount`
- `total`
- `paidAmount`

### `InvoiceLineItem`

Campos minimos:

- `id`
- `organizationId`
- `invoiceId`
- `attendanceId`
- `clientId`
- `vehicleId`
- `serviceId`
- `productId`
- `description`
- `quantity`
- `unitPrice`
- `total`

### `Payment`

Campos minimos:

- `id`
- `organizationId`
- `sourceType`
- `sourceId`
- `receivableId`
- `invoiceId`
- `payableId`
- `methodId`
- `financialAccountId`
- `kind`
- `status`
- `grossAmount`
- `feeAmount`
- `netAmount`
- `paidAmount`
- `remainingAmount`
- `effectiveAt`
- `reversalOfPaymentId`

### `CashEntry`

Campos minimos:

- `id`
- `organizationId`
- `paymentId`
- `invoiceId`
- `attendanceId`
- `kind`
- `category`
- `costCenter`
- `description`
- `status`
- `amount`
- `entryDate`
- `dueDate`
- `paidAt`
- `attachmentPath`

### `PayableAccount`

Campos minimos:

- `id`
- `organizationId`
- `supplierName`
- `description`
- `category`
- `amount`
- `dueDate`
- `status`
- `paymentMethodId`

### `FinancialDocument`

Campos minimos:

- `id`
- `organizationId`
- `sourceType`
- `sourceId`
- `title`
- `documentNumber`
- `category`
- `storagePath`
- `summary`
- `createdAt`

### Relacoes obrigatorias

- um `Receivable` pode nascer de atendimento, fatura ou saldo remanescente;
- um `Invoice` pertence a um `Cliente`;
- um `Invoice` possui muitos `InvoiceLineItem`;
- um `Payment` liquida total ou parcialmente um `Receivable`, `Invoice` ou `PayableAccount`;
- um `CashEntry` representa o reflexo do `Payment`, nao seu substituto conceitual;
- um `FinancialDocument` referencia o evento ou documento que originou o artefato.

### Invariantes

- `invoiceAmounts` nao deve sobreviver como fonte primaria;
- totais de fatura devem ser derivados de itens e pagamentos consistentes;
- `Receivable` nao e a mesma coisa que `Payment`;
- `Payment` nao e a mesma coisa que `CashEntry`;
- `cashEntries` e `Receivable` precisam de origem rastreavel;
- qualquer parcial, baixa, cancelamento, estorno ou conciliacao deve preservar historico de evento;
- configuracao de taxa e prazo usada no evento deve ser congelada no snapshot historico quando necessario.

### Campos locais transitivos aceitaveis

- filtros e visoes de tela;
- pre-visualizacoes de pagamento;
- estados temporarios de dialogo antes da confirmacao.

## 14. Referencia FIPE local

### Papel

Representar a base de referencia local usada para apoiar o cadastro de marca e modelo de veiculo.

### Campos minimos

- `id`
- `sourceName`
- `sourceVersion`
- `filePath`
- `loadedAt`
- `status`

### Relacoes

- apoia o cadastro de `Veiculo`;
- nao substitui ownership de cliente, veiculo ou atendimento.

### Invariantes

- FIPE nao entra como fonte de verdade transacional;
- troca de versao da referencia nao deve reescrever cadastro de negocio automaticamente.

### Campos locais transitivos aceitaveis

- cache de leitura no browser;
- indices auxiliares para busca rapida.

## 15. Documento financeiro

### Papel

Representar recibo, comprovante, relatorio ou documento de cobranca associado ao dominio financeiro.

### Invariantes

- documento nao substitui o evento financeiro;
- documento emitido vira historico;
- nova versao gera novo registro documental.

## 16. Observacao final

Este rascunho nao e schema real, nao substitui migration e nao liga o backend. Ele existe para impedir que a futura implementacao de persistencia seja feita sem contrato minimo aprovado.
