# LavaPrime Web Contract Compatibility Risks

## 1. Objetivo

Mapear os riscos de compatibilidade entre o legado atual do web e os contratos oficiais.

## 2. Riscos criticos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Critico | Cliente operacional e cliente faturado coexistem como duas fontes locais | `clientRegistry` x `billingClients` | adapter de cliente pode publicar ownership errado ou duplicado | implementar `customerAdapter` com reconciliacao explicita e `legacyRefs` controladas |
| Critico | Atendimento ainda e denormalizado e sem IDs canonicos completos | `patioVehicles` | `Attendance` pode nascer sem `clientId`, `vehicleId` ou `operatorId` confiaveis | atrasar `attendanceAdapter` ate estabilizar master data e `legacyIdResolver` |
| Critico | Pagamento atual esta espalhado entre `cashEntries`, `openPayments`, `billingInvoices` e `invoiceAmounts` | financeiro legado | adapter pode duplicar ou perder valor, parcial e origem | separar `paymentAdapter` de `financialAdapter` e exigir snapshots obrigatorios |
| Critico | `serviceSupplyProfiles` depende de chave derivada por nome/tipo/categoria | perfis de insumo por servico | renome de servico quebra a ligacao com o contrato `Service` | estabilizar `serviceId` e migrar lookup tecnico para ID |
| Critico | O contrato `Payment` existe logicamente, mas ainda nao existe como entidade fisica unica no runtime | dominio financeiro | o web pode tentar adaptar liquidacao e caixa como se fossem a mesma coisa | manter `Payment` como camada logica separada e adiar cutover remoto |

## 3. Riscos altos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Alto | Nome textual de metodo de pagamento ainda governa varias relacoes | `businessPaymentMethods`, `cashEntries`, `openPayments`, `invoiceLineItems` | adapter pode gerar `methodId` inconsistente | criar snapshot e resolucao canonica por catalogo |
| Alto | `invoiceAmounts` e agregado derivado fora dos itens de fatura | financeiro legado | total financeiro pode divergir do detalhe | tratar `invoiceAmounts` apenas como apoio de compatibilidade, nunca como origem primaria |
| Alto | `Supply` contrato pede `compatibilityMetadata`, mas o shape normalizado atual perde parte desses dados | `normalizeSupplyCatalog(...)` | contrato pode sair empobrecido ou inconsistente | decidir como recuperar ou republicar metadados tecnicos antes de `supplyAdapter` |
| Alto | `Vehicle` guarda ownership historico aninhado no objeto | `vehicleRegistry.ownerHistory` | adapter pode misturar contrato mestre e historico relacional | publicar apenas refs e manter historico em camada dedicada |
| Alto | Datas e timestamps usam formatos mistos | `createdAt`, `date`, `time`, `createdAt` textual, `YYYY-MM-DD HH:mm` | contratos podem sair sem padrao temporal unico | padronizar no adapter para ISO 8601 em UTC quando o payload sair do web |

## 4. Riscos medios

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Medio | Servicos seed nao possuem ID tecnico explicito no shape inicial | `serviceCatalog` | `Service` exige `id` e `serviceCode` | definir geracao controlada sem quebrar convivencia atual |
| Medio | `Financial` e contrato agregador, nao tabela; o legado atual pode tentar tratá-lo como resumo unico | invoices, receivables e caixa | perda de separacao entre primario e derivado | manter `financialAdapter` como ultima camada da onda inicial |
| Medio | `Product` e `Supply` usam campos `stock`, `cost` e `price` locais | catalogos locais | naming inconsistente com contrato | concentrar rename apenas nos adapters |
| Medio | Estados de UI e campos denormalizados aparecem misturados com dados de negocio | `patioVehicles`, filtros, labels e owner display | risco de adapter publicar campo visual como dado canonico | documentar lista de campos nao autoritativos e filtrar no adapter |

## 5. Riscos baixos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Baixo | FIPE local pode variar de versao e enriquecimento | base FIPE local | afeta apenas complemento tecnico do veiculo | manter `fipeRef` como opcional e nao transacional |
| Baixo | Campos de exibicao documental podem mudar sem quebrar ownership | `documentHistory`, PDFs e resumo financeiro | impacto menor na camada de cadastro | tratar esses campos como refs ou snapshots documentais |

## 6. Leitura consolidada

Os maiores riscos nao estao em criar o arquivo do adapter. Eles estao em decidir:

- quem e a fonte primaria;
- quando um valor e derivado;
- quando um snapshot e obrigatorio;
- quando uma estrutura legada precisa continuar apenas como compatibilidade temporaria.
