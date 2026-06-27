# LavaPrime Master Data Migration Risks

## 1. Objetivo

Classificar os riscos especificos da migracao dos dados mestres do LavaPrime.

## 2. Riscos criticos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Critico | Cliente operacional e cliente faturado coexistem como entidades paralelas | `clientRegistry` x `billingClients` | risco de faturamento no cliente errado, duplicidade de IDs e perda de rastreabilidade | reconciliar em contrato unico de `customers` antes de qualquer sync real |
| Critico | Ownership de veiculo esta espelhado em mais de um lugar | `vehicleRegistry.currentClientId`, `client.plates`, `ownerHistory` | placa pode apontar para cliente diferente conforme a fonte lida | definir fonte primaria de ownership e migrar `vehicle_owner_history` primeiro |
| Critico | Parte relevante do master data do web vive apenas em memoria | `clientRegistry`, `vehicleRegistry`, `adminOperators`, `serviceCatalog` | refresh, troca de navegador ou captura incompleta podem distorcer a base de migracao | congelar extracao controlada e nao assumir que o browser sempre representa o estado inteiro |
| Critico | `serviceSupplyProfiles` depende de chave derivada de nome/tipo/categoria | `getServiceSupplyProfileKey(...)` | renome de servico pode romper composicao tecnica e consumo de insumos | migrar o vinculo para `serviceId` canonico antes de sincronizar |
| Critico | Metodos de pagamento ainda reescrevem referencias legadas por nome | `renameBusinessPaymentMethodReferences(...)` | historico pode divergir ao renomear metodo usado em caixa, invoices e open payments | migrar para `paymentMethodId` e snapshots de evento |

## 3. Riscos altos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Alto | Configuracoes do negocio estao repartidas em varias chaves locais | perfil, bancos, Pix, metodos, financeiro, social e mensagens | migracao parcial pode quebrar documentos, cobranca ou regras de estoque | tratar configuracao como pacote coerente por organizacao |
| Alto | Equipe mistura cadastro mestre e credencial local demo | `adminOperators` com `username`, `password`, `accessProfile` | futura autenticacao real pode duplicar ownership e perfis | separar `team_members` de identidade/autenticacao |
| Alto | Historicos relevantes ainda estao aninhados no cadastro | `ownerHistory`, `serviceHistory`, `accessHistory`, `production` | perda de trilha ou achatamento indevido do modelo relacional | decidir o que vira entidade propria e o que fica como historico derivado |
| Alto | Produtos e insumos convivem com eventos de estoque no mesmo runtime local | `productCatalog`, `supplyCatalog`, `inventoryMovements`, `productSales` | saldo pode ser migrado sem causa historica coerente | mover por dominio com reconciliacao entre catalogo e movimentos |
| Alto | Cuidados especiais do veiculo ficam fora do cadastro principal | `vehicleSpecialCareRecords` em `localStorage` separado | veiculo migrado sem restricoes relevantes pode gerar erro operacional | consolidar o vinculo entre veiculo e registro especial antes de sync |

## 4. Riscos medios

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Medio | Seeds e defaults se misturam com dados reais | `getDefault*` e arrays hardcoded | bootstrap pode ser tratado como historico valido | separar seed de dado observado em toda extracao |
| Medio | Regra atual de duplicidade de servico considera basicamente o nome | `saveServiceRegistration(...)` | variantes por categoria ou tipo podem ficar ambiguas | introduzir `serviceCode` e criterio de unicidade por contexto |
| Medio | SKU e plate podem existir sem governanca global | IDs locais incrementais e chaves textuais | merge com backend pode gerar colisao ou reconciliacao errada | padronizar identificadores tecnicos antes do primeiro cutover |
| Medio | RLS planejado e permissoes locais ainda nao estao plenamente alinhados | schema Supabase x `accessBoundary` local | writes futuros podem ficar permissivos ou restritivos demais | validar regras em `LP-PERM-001` antes de runtime real |
| Medio | FIPE local nao possui governanca formal de versao no runtime | arquivo local + cache em memoria | divergencia silenciosa entre referencia e cadastro | registrar versao ou checksum da base de referencia |

## 5. Riscos baixos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Baixo | Cache local da FIPE pode expirar ou ser descartado | `localVehicleDatabase` | afeta apenas conveniencia de busca | manter como cache descartavel |
| Baixo | Links sociais e templates ainda nao sustentam dominio critico | `businessSocialLinks`, `businessMessageTemplates` | impacto operacional baixo no curto prazo | migrar depois do nucleo mestre principal |
| Baixo | Logo e preferencias de exibicao variam por armazenamento local | `businessProfile.logoDataUrl`, `reportFields` | afeta apresentacao, nao ownership central | migrar junto com configuracao do negocio |

## 6. Leitura consolidada dos riscos

1. O maior risco do dominio mestre esta nas duplicidades e espelhamentos, nao na falta de tabelas alvo.
2. Cliente, veiculo e metodo de pagamento formam o maior ponto de contaminacao do dominio financeiro.
3. Servico, produto e insumo precisam sair do modelo baseado em texto e indice local para contratos com IDs estaveis.
4. Equipe nao pode migrar para o backend carregando a mesma mistura atual de credencial local e cadastro operacional.
5. Nenhum desses riscos autoriza implementacao funcional agora; eles orientam a proxima fatia controlada.
