# LavaPrime Data Migration Risks

## 1. Objetivo

Classificar os riscos de migracao de dados observados no estado atual do LavaPrime.

## 2. Riscos criticos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Critico | Nao existe fonte unica de verdade no web atual | Arrays em memoria + `localStorage` + Room + schema Supabase ainda inativo | Alto risco de divergencia entre dispositivos, sessoes e plataformas | Definir ownership por dominio antes de qualquer migracao tecnica |
| Critico | Financeiro espalhado em multiplas estruturas paralelas | `cashEntries`, `openPayments`, `billingInvoices`, `invoiceLineItems`, `invoiceAmounts`, `payableAccounts` | Totais, saldos e vinculos podem migrar inconsistentes | Migrar financeiro por trilha de evento e reconciliar totais antes de mover dados |
| Critico | Duplicidade de cliente operacional e cliente faturado | `clientRegistry` x `billingClients` | Pode gerar registros duplicados, faturamento associado ao cliente errado e perda de historico | Criar estrategia de deduplicacao e mapeamento de ids antes da migracao |
| Critico | Estado operacional essencial vive apenas em memoria | `patioVehicles`, `quoteEstimates`, `vehicleRegistry`, `billingInvoices`, `openPayments` | Refresh ou troca de contexto pode eliminar ou distorcer a base a ser migrada | Congelar captura de evidencias e definir extracao controlada antes de migrar dominios sensiveis |
| Critico | Android e web seguem modelos locais distintos | Room no Android, arrays e `localStorage` no web | Migracao pode quebrar convergencia entre mobile e web ou gerar sobrescrita indevida | Tratar Android como trilha separada de reconciliacao com ownership claro |

## 3. Riscos altos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Alto | IDs locais e relacionamentos sem governanca central | Arrays locais, ids incrementais e referencias cruzadas no web | Colisao de ids, referencias orfas e dificuldade de merge | Padronizar ids estaveis por entidade antes de sincronizar |
| Alto | Historicos aninhados dificultam modelo relacional | `ownerHistory`, `serviceHistory`, historico de cuidados especiais | Perda de rastreabilidade ou achatamento indevido do historico | Extrair historicos para entidades dedicadas no plano de migracao |
| Alto | Perfis de insumo dependem de chave local derivada do servico | `serviceSupplyProfiles` | Renome de servico pode quebrar o vinculo com estoque | Migrar perfis para relacao por id tecnico de servico |
| Alto | Configuracoes oficiais do negocio estao repartidas em muitas chaves locais | perfil, bancos, PIX, metodos, financeiro, social, mensagens | Migracao parcial pode quebrar documentos, recebimentos e relatorios | Migrar configuracoes por pacote coerente de organizacao |
| Alto | Documentos gerados nao retornam a repositorio central | `documentHistory` local + downloads no cliente | Perda de historico, auditoria incompleta e divergencia entre metadata e arquivo real | Separar metadata transacional de estrategia futura de storage de artefatos |
| Alto | Room ainda convive com `fallbackToDestructiveMigration()` | `LavaPrimeDatabase.kt` | Mudancas futuras podem apagar base mobile durante convergencia | Planejar migracoes versionadas antes de alinhar Android ao backend |

## 4. Riscos medios

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Medio | Seeds e defaults podem ser confundidos com dados reais | funcoes `getDefault*` e arrays hardcoded | Dado ficticio pode ser tratado como historico de negocio | Diferenciar claramente bootstrap de dado capturado do mundo real |
| Medio | FIPE local pode divergir da realidade ou de futuras APIs | `fipe-veiculos.json` e `fipe-veiculos.js` | Inconsistencia em marca/modelo durante migracoes ou integracoes | Versionar referencia FIPE e isolar seu papel como dado de apoio |
| Medio | Regras de acesso ainda sao locais ao frontend | `sessionBoundary` e `accessBoundary` | Migracao de usuario e permissao pode ser feita sem reflexo completo no dominio | Fechar modelo de identidade e autorizacao antes de ativar sync real |
| Medio | Historico financeiro combina campos derivados e calculados em tela | `invoiceAmounts`, parciais, baixas e recibos | Reprocessamento pode recalcular valores de forma diferente | Migrar usando origem primaria do evento e nao apenas total agregado |
| Medio | Cobertura de regressao ainda e minima | smoke tests e politica inicial de gate | Uma migracao pode preservar build, mas quebrar semantica de dado | Expandir validacao por dominio antes de alteracoes persistentes |

## 5. Riscos baixos

| Nivel | Risco | Onde aparece hoje | Impacto | Mitigacao recomendada |
| --- | --- | --- | --- | --- |
| Baixo | Estado temporario de tela e filtros pode se perder | seletores, modais, filtros e caches visuais | Afeta experiencia local, mas nao o dado oficial | Manter fora da migracao principal |
| Baixo | Cache em memoria de logo e PDF pode ser descartado | geracao de PDF no navegador | Nao compromete historico transacional | Tratar como estado descartavel |
| Baixo | Referencias de menu e navegacao estao no mesmo monolito | `app/main.js` | Pode dificultar leitura da migracao, mas nao altera dado por si | Documentar pontos de consumo antes de extrair dominios |

## 6. Leitura final dos riscos

1. O maior risco nao e a migracao em si, mas migrar sem primeiro decidir ownership e reconciliacao.
2. Financeiro, clientes e atendimentos formam o nucleo mais sensivel.
3. O Android nao pode ser tratado como mero detalhe, porque ele ja possui banco proprio e fila de sincronizacao.
4. O schema Supabase reduz incerteza do alvo, mas nao elimina a necessidade de limpar duplicidades e derivados locais.
5. Nenhum risco aqui autoriza alteracao funcional imediata; todos servem para orientar as proximas fatias controladas.
