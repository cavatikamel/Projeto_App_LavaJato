# Android Data Parity Matrix

## Objetivo

Registrar a comparacao oficial entre o dominio atual do LavaPrime Web e o modelo de dados hoje observado no Android nativo apos `LP-ANDROID-002`.

## Legenda de classificacao

- `aligned`: equivalente suficiente para evolucao controlada.
- `partial`: equivalente existe, mas ainda incompleto.
- `missing`: equivalente nao existe no Android.
- `conflict`: equivalente existe, mas diverge semanticamente do contrato ou mistura dominios.
- `future`: dominio ainda depende de fase propria antes de entrar no Android.

## Matriz resumida

| Entidade | Origem no Web | Equivalente atual no Android | Campos obrigatorios | Campos opcionais | ID local | ID remoto futuro | Status offline | Risco de conflito | Acao recomendada | Classificacao |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Usuarios e perfis | `adminOperators`, `sessionBoundary`, `accessBoundary`, memberships futuras | `UsuarioEntity` | `id`, `organizationId`, `nome`, `email`, `perfil`, `ativo`, `updatedAt` | `ultimoLoginLocal` | string local/demo, sem separacao formal entre `id` e `sourceId` | identidade canonica de auth/profile por organizacao | `partial` | Alto: login demo, perfil admin local e sem membership real | substituir login demo por identidade oficial e separar sessao, perfil e membership | `conflict` |
| Clientes | `clientRegistry`, `billingClients`, contrato `Customer` | `ClienteEntity` | Web pede `id`, `organizationId`, `kind`, `name`, `document`, `status`, `billingApproved`, `createdAt`, `updatedAt`; Android tem `id`, `empresaId`, `nome`, `updatedAt` | `telefone`, `documento`, `observacoes` | string local opaca | `customer:*` canonico do contrato | `partial` | Alto: `document` e `billingApproved` nao seguem contrato, sem `kind` e sem `createdAt` | criar mapper contratual e regra explicita para cliente comum x faturado | `conflict` |
| Veiculos | `vehicleRegistry`, `vehicleSpecialCareRecords`, owner history, contrato `Vehicle` | `VeiculoEntity` | Web pede `id`, `organizationId`, `currentCustomerId`, `plate`, `brand`, `model`, `vehicleType`, `status`, `createdAt`, `updatedAt`; Android cobre so parte disso | `cor`, alertas e limites de pH | string local opaca | `vehicle:*` canonico do contrato | `partial` | Alto: sem `status`, owner history, `vehicleType` formal nem `legacyRefs` | alinhar ownership do cliente atual e separar cuidado especial do cadastro base | `conflict` |
| Atendimentos | `patioVehicles`, contrato `Attendance` | `AtendimentoEntity` | Web pede `id`, `organizationId`, `clientId`, `vehicleId`, `status`, `entryAt`, `createdAt`, `updatedAt`; Android tem `id`, `empresaId`, `clienteId`, `veiculoId`, `status`, `criadoEm`, `updatedAt` | snapshots de nome/placa, `formaPagamento`, `operadorId`, `observacoes`, `finalizadoEm` | string local opaca | `attendance:*` canonico do contrato | `partial` | Alto: sem `serviceEntries`, `productEntries`, `statusHistory`, refs financeiras ou totais canonicos | modelar atendimento como agregado contratual, nao apenas snapshot local do patio | `conflict` |
| Servicos | `serviceCatalog`, `serviceSupplyProfiles`, contrato `Service` | `ServicoEntity` | Web pede `id`, `organizationId`, `serviceCode`, `name`, `price`, `isActive`, `createdAt`, `updatedAt`; Android cobre `id`, `empresaId`, `nome`, `precoBaseCentavos`, `ativo`, `updatedAt` | `descricao`, `tempoEstimadoMin`, flags de quimica | string local opaca | `service:*` canonico do contrato | `partial` | Medio/Alto: faltam `serviceCode`, manutencao, `supplyProfileRefs` e tipos veiculares | alinhar servico ao contrato e remover dependencia de seed como fonte definitiva | `partial` |
| Produtos | `productCatalog`, `productSales`, contrato `Product` | `ProdutoEntity` | Web pede `id`, `organizationId`, `sku`, `name`, `unit`, `salePrice`, `isActive`, `createdAt`, `updatedAt`; Android cobre `id`, `empresaId`, `nome`, `unidade`, `precoVendaCentavos`, `updatedAt` | `tipo`, `estoqueAtual`, `estoqueMinimo` | string local opaca | `product:*` canonico do contrato | `partial` | Alto: falta `sku`, `isActive` formal e o modelo tambem tenta representar insumo | separar produto de insumo e introduzir codigo contratual estavel | `conflict` |
| Insumos | `supplyCatalog`, `inventoryMovements`, `serviceSupplyProfiles`, contrato `Supply` | nao existe entidade propria; hoje aparece diluido em `ProdutoEntity(tipo = "Insumo")` | Web pede `id`, `organizationId`, `sku`, `name`, `unit`, `costPrice`, `isActive`, `createdAt`, `updatedAt` | `stockBalance`, `minStock`, `supplierName`, `riskTags`, `compatibilityMetadata` | nao ha chave local dedicada | `supply:*` canonico do contrato | `missing` | Alto: mistura de catalogo comercial com estoque tecnico e quimica | criar entidade Android separada para insumo antes de sync real ou impressao operacional | `conflict` |
| Pagamentos | `openPayments`, `invoiceLineItems`, contrato `Payment` | nao existe entidade propria; so `formaPagamento` em `AtendimentoEntity` | Web pede `id`, `organizationId`, `sourceType`, `sourceId`, `methodId`, `kind`, `status`, valores e timestamps financeiros | refs de cliente, veiculo, atendimento, documentos e reversao | inexistente | `payment:*` canonico do contrato | `missing` | Alto: perda de rastreabilidade financeira e impossibilidade de recibo confiavel offline | criar dominio local de pagamento separado do status do atendimento | `missing` |
| Financeiro | `cashEntries`, `billingInvoices`, `invoiceLineItems`, `openPayments`, contrato `Financial` | nao existe | Web pede `id`, `organizationId`, `sourceType`, `sourceId`, `financialKind`, `status`, valores, moeda e timestamps | refs de cliente, veiculo, pagamento, caixa, invoice e lembretes | inexistente | `financial:*` canonico do contrato | `missing` | Alto: Android nao consegue fechar conciliacao, cobranca ou baixa offline | manter financeiro fora do primeiro sync e planejar entrada por fase propria | `missing` |
| Documentos e impressao | `documentHistory`, recibos e relatorios | nao existe | metadados documentais, refs de origem e timestamps | anexos, notas e configuracoes de layout | inexistente | ids canonicos de documento/receipt | `future` | Medio/Alto: sem base local de comprovante, impressao termica futura fica sem payload confiavel | entrar so depois de pagamento, financeiro e empresa estarem alinhados | `future` |
| Empresa e configuracoes | `businessProfile`, contas bancarias, PIX e configuracoes oficiais | nao existe | dados de organizacao, exibicao, contato, fiscal e operacionais | logo, layout, preferencias e campos auxiliares | inexistente | `organizationId` e perfis oficiais de configuracao | `missing` | Alto: seed local usa `empresaId = local-demo`, sem tenancy real | separar configuracao institucional da seed e vincular ao backend oficial | `missing` |
| Auditoria minima | historicos web, diagnosticos e trilhas futuras | `AuditLogEntity` | `id`, `organizationId`, `usuarioId`, `acao`, `entidade`, `entidadeId`, `criadoEm` | `detalhe` | string local opaca | ids canonicos por evento ou trilha de sync | `partial` | Medio: trilha existe, mas sem diff estruturado, sem actor remoto e sem envelope | evoluir auditoria para evento contratual ou snapshot validavel | `partial` |
| Fila de sync | requisitos futuros de envelopes entre superficies | `SyncQueueEntity` | o programa exige `contractName`, `contractVersion`, `payload`, `organizationId`, `source`, `sourceId`, timestamps e validacao; Android hoje tem `entidade`, `entidadeId`, `operacao`, `payloadResumo` e `tentativas` | `ultimaTentativaEm` | string local opaca por item | envelope contratual por entidade | `partial` | Alto: cobre so clientes, veiculos e atendimentos, e ainda sem payload de contrato | migrar fila para envelope contratual e ampliar cobertura antes de push remoto real | `partial` |

## Respostas de smoke documental

- Android possui modelo local para atendimento: `Sim`, via `AtendimentoEntity`.
- Android possui modelo local para cliente: `Sim`, via `ClienteEntity`.
- Android possui modelo local para veiculo: `Sim`, via `VeiculoEntity`.
- Android possui modelo local para pagamento: `Nao`.
- Android possui modelo local para produtos, servicos e insumos: `Parcial`; produtos e servicos existem, insumo nao tem entidade propria.
- Android possui fila para operacoes pendentes: `Sim`, via `SyncQueueEntity`.
- Android possui estrategia clara de ID local/remoto: `Nao`.
- Android possui regra de conflito offline: `Nao`; existe apenas rascunho visual de `LastWriteWins`.
- Android esta alinhado ao Web: `Nao`; ha paridade visual e de parte do patio, mas nao de contratos e dominios.
- Android esta pronto para iniciar Room foundation/migrations: `Nao`; antes disso precisa fechar identidade, separacao de dominios e plano de migracao nao destrutiva.
