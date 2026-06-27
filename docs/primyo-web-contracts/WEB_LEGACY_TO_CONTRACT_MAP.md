# LavaPrime Web Legacy to Contract Map

## 1. Objetivo

Mapear como as estruturas atuais do `app/main.js` precisam ser traduzidas para os contratos oficiais.

Este documento nao define implementacao. Ele define o delta entre:

- shape legado atual;
- contrato alvo;
- lacunas a resolver;
- snapshots obrigatorios;
- decisoes ainda abertas.

## 2. Cliente

| Aspecto | Conteudo |
| --- | --- |
| Estrutura atual | `clientRegistry` + `billingClients` |
| Contrato alvo | `Customer` |
| Campos equivalentes | `id`, `document`, `phone -> phonePrimary`, `email`, `address`, `billingApproved`, `billingCycle`, `allowMultipleOpenInvoices`, `plates -> vehicleIds` |
| Campos ausentes | `organizationId`, `status`, `createdAt`, `updatedAt`, `customerCode` |
| Campos derivados ou renomeados | `personType -> kind`, `name/legalName` precisam virar a forma canonica do contrato, `billingClientId -> legacyRefs.billingClientId` |
| Campos que exigem snapshot | nome exibido e aprovacao de faturamento quando um evento financeiro ou documento precisar congelar o contexto do cliente |
| Campos que exigem decisao futura | regra definitiva de unificacao `clientRegistry` x `billingClients`, geracao de `customerCode`, criterio de status para PF/PJ e cliente casual |

## 3. Veiculo

| Aspecto | Conteudo |
| --- | --- |
| Estrutura atual | `vehicleRegistry` + `vehicleSpecialCareRecords` + referencias em `patioVehicles` |
| Contrato alvo | `Vehicle` |
| Campos equivalentes | `id`, `plate`, `brand`, `model`, `type -> vehicleType`, `category`, `fuel`, `currentClientId`, `notes` |
| Campos ausentes | `organizationId`, `status`, `createdAt`, `updatedAt`, `manufactureYear`, `modelYear`, `fipeRef`, `specialCareRefs`, `ownerHistoryRefs` |
| Campos derivados ou renomeados | `year` unico precisa ser repartido em ano de fabricacao e ano modelo ou permanecer como regra de compatibilidade, `ownerHistory` aninhado precisa virar relacao, `serviceHistory` sai do contrato mestre e vai para atendimento ou historico operacional |
| Campos que exigem snapshot | owner exibido em recibo/documento, alertas de cuidado especial, referencia FIPE usada no momento de cadastro quando isso impactar auditoria |
| Campos que exigem decisao futura | regra oficial para separar `year`, modelo do historico de ownership, ligacao formal entre veiculo e cuidados especiais, forma de expor `status` do cadastro sem confundir com `status` do patio |

## 4. Servico

| Aspecto | Conteudo |
| --- | --- |
| Estrutura atual | `serviceCatalog` + `serviceSupplyProfiles` |
| Contrato alvo | `Service` |
| Campos equivalentes | `name`, `price`, `vehicleType`, `vehicleCategory`, `maintenanceRequired`, `maintenanceInterval`, `maintenanceDate`, `autoCreateVehicleCareType -> defaultVehicleCareType` |
| Campos ausentes | `id`, `organizationId`, `serviceCode`, `description`, `createdAt`, `updatedAt`, `durationMinutes`, `isActive` formal |
| Campos derivados ou renomeados | `duration` texto precisa virar `durationMinutes`, `status -> isActive`, `serviceSupplyProfiles` precisam migrar de chave derivada por nome para `supplyProfileRefs` ligados a `serviceId` |
| Campos que exigem snapshot | preco, duracao e perfil tecnico usados no momento do atendimento, orcamento, invoice item e relatorio |
| Campos que exigem decisao futura | criterio oficial de `serviceCode`, migracao da composicao tecnica por nome para ID, tratamento de servico sem ID atual no seed legado |

## 5. Produto

| Aspecto | Conteudo |
| --- | --- |
| Estrutura atual | `productCatalog` + `productSales` + `inventoryMovements` |
| Contrato alvo | `Product` |
| Campos equivalentes | `id`, `sku`, `name`, `unit`, `stock -> stockBalance`, `minStock`, `cost -> costPrice`, `price -> salePrice`, `active -> isActive`, `notes`, `createdAt`, `updatedAt` |
| Campos ausentes | `organizationId`, `category`, `barcode`, `status` como enum formal |
| Campos derivados ou renomeados | saldo atual e historico de venda dependem tambem de `inventoryMovements`, `cashEntryId` das vendas fica fora do contrato mestre e vai para contratos operacionais/financeiros |
| Campos que exigem snapshot | `salePrice`, `costPrice`, `unit` e descricao usada no momento da venda ou do atendimento |
| Campos que exigem decisao futura | se `stockBalance` sera publicado como campo canonico ou apenas como projecao derivada, relacao formal entre produto, atendimento e invoice item |

## 6. Insumo

| Aspecto | Conteudo |
| --- | --- |
| Estrutura atual | `supplyCatalog` + `serviceSupplyProfiles` + `inventoryMovements` |
| Contrato alvo | `Supply` |
| Campos equivalentes | `id`, `sku`, `name`, `unit`, `stock -> stockBalance`, `minStock`, `cost -> costPrice`, `supplier -> supplierName`, `riskTags`, `notes`, `createdAt`, `updatedAt`, `active -> isActive` |
| Campos ausentes | `organizationId`, `compatibilityMetadata` estruturado, `status` formal |
| Campos derivados ou renomeados | detalhes tecnicos como `phType`, `phApproximate`, `aggressivenessLevel`, `safeForCoating`, `safeForWrap` e `safeForMattePaint` aparecem nos seeds, mas nao sobrevivem integralmente ao shape normalizado atual; isso precisa de adapter ou recuperacao controlada |
| Campos que exigem snapshot | custo, unidade e classificacao tecnica no momento do consumo por servico ou ajuste de estoque |
| Campos que exigem decisao futura | recuperar e formalizar `compatibilityMetadata`, escolher se o contrato publicara metadados tecnicos completos ou apenas subconjunto seguro para o runtime |

## 7. Atendimento

| Aspecto | Conteudo |
| --- | --- |
| Estrutura atual | `patioVehicles` + referencias indiretas a `clientRegistry`, `vehicleRegistry`, `cashEntries`, `openPayments`, `billingInvoices` |
| Contrato alvo | `Attendance` |
| Campos equivalentes | `id`, `status`, `scheduledDate` e `entry` como base temporal, `service` como pista inicial de `serviceEntries`, `payment` como pista de fluxo financeiro |
| Campos ausentes | `organizationId`, `clientId`, `vehicleId`, `operatorId`, `entryAt` formal em ISO, `createdAt`, `updatedAt`, `startAt`, `endAt`, `serviceEntries`, `productEntries`, `statusHistory`, `paymentRefs`, `invoiceRefs`, `receivableRefs` |
| Campos derivados ou renomeados | `owner`, `phone`, `model`, `color`, `service` e `payment` sao campos denormalizados de tela; precisam ser recalculados a partir de cliente, veiculo, servicos e contratos financeiros |
| Campos que exigem snapshot | nome do owner, telefone, servicos aplicados, totais, metodo escolhido e observacoes no momento do checkout ou da emissao de recibo |
| Campos que exigem decisao futura | definicao oficial do ID de atendimento no legado, backfill de `clientId` e `vehicleId`, estrategia para separar agenda, patio e atendimento finalizado no mesmo contrato |

## 8. Pagamento

| Aspecto | Conteudo |
| --- | --- |
| Estrutura atual | `cashEntries` + `openPayments` + `businessPaymentMethods` + partes de `billingInvoices` e `invoiceLineItems` |
| Contrato alvo | `Payment` |
| Campos equivalentes | `id` parcial por origem, `status`, `grossAmount` ou `paidAmount` a partir de `value`, `feePercent`, `fixedFee`, `feeAmount`, `netAmount`, `expectedReceiptDate`, `settlementDays`, `vehicleId`, `invoiceId`, `clientId`, `attendanceId` quando inferivel |
| Campos ausentes | `organizationId`, `sourceType`, `sourceId` padronizados, `methodId` canonico, `kind` formal, `financialAccountId`, `effectiveAt` unico, `methodSnapshot`, `financialAccountSnapshot`, `reversalOfPaymentId` |
| Campos derivados ou renomeados | `cashEntries.method` textual precisa virar `methodId`, `openPayments.paymentMethod` precisa virar referencia canonica, `value` precisa ser interpretado conforme contexto de entrada, saida ou parcial |
| Campos que exigem snapshot | metodo de pagamento, taxa, prazo, conta vinculada, conta Pix, labels exibidos e valor remanescente da operacao |
| Campos que exigem decisao futura | entidade fisica futura de `payments`, ligacao oficial entre `cashEntry` e `payment`, estrategia para cadeia de parcial e estorno sem perder rastreabilidade |

## 9. Financeiro

| Aspecto | Conteudo |
| --- | --- |
| Estrutura atual | `billingInvoices` + `invoiceLineItems` + `invoiceAmounts` + `openPayments` + `cashEntries` + `payableAccounts` + `documentHistory` |
| Contrato alvo | `Financial` |
| Campos equivalentes | `sourceType` e `sourceId` podem ser inferidos do bloco dominante, `status`, `grossAmount`, `confirmedAmount`, `openAmount`, `clientId`, `vehicleId`, `attendanceId`, `invoiceRef`, `receivableRefs`, `paymentRefs`, `cashEntryRefs`, `documentRefs`, `dueDate`, `issueDate` |
| Campos ausentes | `organizationId`, `financialKind` formal, `currencyCode`, IDs estaveis para payable e invoice line items, estrutura canonica de `totalsBreakdown`, `reminderState` padronizado |
| Campos derivados ou renomeados | `invoiceAmounts` e agregado derivado, `openAmount` vem da combinacao entre invoice, receivable e parcial, `documentHistory` traz metadata mas nao ownership do evento |
| Campos que exigem snapshot | numero de invoice, totais, cadeia de parcial, metodo, conta, contexto documental, dados do negocio exibidos no documento |
| Campos que exigem decisao futura | resolver o gap entre `Payment` e `Financial`, decidir a representacao oficial de contas a pagar com baixa evidência atual e definir como o web distinguirá claramente receivable, invoice, payment e cash entry em convivio |

## 10. Conclusao do mapa

O legado atual ja contem dados suficientes para alimentar os contratos, mas nao no mesmo shape e nem com a mesma clareza de ownership.

Conclusoes principais:

1. master data pode ser adaptado primeiro, com risco menor;
2. atendimento precisa de reconciliacao de IDs e referencias;
3. pagamento exige snapshots obrigatorios;
4. financeiro exige a maior disciplina porque hoje mistura primario e derivado.
