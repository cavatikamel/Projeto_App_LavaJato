# LP-WEB-003 Closure

- Change ID: `LP-WEB-003-CLOSURE`
- Backlog ID: `LP-WEB-003`
- Titulo: Encerramento formal da estrategia de adapters do web
- Tipo: Fase documental de planejamento
- Data: `2026-06-26`
- Decisao final: `Aceito com observacoes`
- Aceite tecnico: `Aprovado para liberar LP-WEB-007`

## 1. Resumo da fase

`LP-WEB-003` encerra a fase documental que conectou o legado web do LavaPrime aos contratos oficiais de dados, sem criar adapter JS e sem alterar runtime.

O resultado formal desta fase foi:

- estrategia oficial de adapters do web definida;
- mapa legado -> contrato criado para os dominios prioritarios;
- candidatos a adapters e ordem de criacao futura definidos;
- riscos de compatibilidade registrados;
- requisitos minimos de teste para adapters definidos;
- recomendacao formal de primeira implementacao controlada consolidada em `LP-WEB-007`.

## 2. Documentos criados e atualizados

Documentos criados por `LP-WEB-003`:

- `docs/primyo-web-contracts/WEB_CONTRACT_ADAPTER_STRATEGY.md`
- `docs/primyo-web-contracts/WEB_LEGACY_TO_CONTRACT_MAP.md`
- `docs/primyo-web-contracts/WEB_ADAPTER_CANDIDATES.md`
- `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_COMPATIBILITY_RISKS.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`

Documentos atualizados no encerramento:

- `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
- `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`

## 3. Decisoes arquiteturais absorvidas

- O web legado nao deve conhecer diretamente os contratos oficiais em todos os pontos; a traducao futura deve ocorrer por adapters puros e controlados.
- Contrato continua significando comunicacao entre web, backend, Android e futuras integracoes, nao tabela fisica.
- A primeira onda de adapters deve atacar master data antes de atendimento, pagamento ou financeiro.
- O primeiro adapter recomendado passa a ser `customerAdapter`, por atacar a maior duplicidade atual com risco menor que dominios operacionais e financeiros.
- Nenhuma implementacao real de adapter foi iniciada nesta fase.

## 4. Adapters candidatos reconhecidos

Adapters candidatos formalizados:

- `customerAdapter`
- `vehicleAdapter`
- `serviceAdapter`
- `productAdapter`
- `supplyAdapter`
- `attendanceAdapter`
- `paymentAdapter`
- `financialAdapter`

Componentes de suporte recomendados:

- `contractEnvelopeFactory`
- `legacyIdResolver`
- `paymentMethodSnapshotResolver`

## 5. Ordem recomendada

Ordem oficial absorvida pela baseline:

1. `customerAdapter`
2. `vehicleAdapter`
3. `serviceAdapter`
4. `productAdapter`
5. `supplyAdapter`
6. `attendanceAdapter`
7. `paymentAdapter`
8. `financialAdapter`

## 6. Riscos de compatibilidade remanescentes

- `clientRegistry` e `billingClients` continuam convivendo como fontes paralelas para cliente.
- `vehicleRegistry` ainda depende de reconciliacao cuidadosa com ownership historico e referencias indiretas.
- `serviceCatalog` e `serviceSupplyProfiles` ainda dependem de chaves derivadas por nome/tipo/categoria.
- `Attendance`, `Payment` e `Financial` continuam sendo dominios de maior risco por snapshots, agregacoes e dependencias cruzadas.
- `contractVersion`, `legacyRefs` e resolucao de IDs continuam exigindo disciplina explicita na primeira implementacao real.

## 7. Validacoes executadas

Validacoes obrigatorias executadas:

- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Resultado observado:

- primeira execucao de `npm.cmd run primyo:gate`: falhou por ocorrencia operacional transitoria de lock em `dist/assets/checklist-icons` dentro do workspace em OneDrive;
- `npm.cmd run build`: sucesso;
- `npm.cmd run verify:build`: sucesso;
- reexecucao de `npm.cmd run primyo:gate` apos a ocorrencia operacional: sucesso;
- resultado final aceito para encerramento: `gate`, `build` e `verify` aprovados.

## 8. Fora de escopo preservado

Nada abaixo foi iniciado ou alterado por esta fase:

- adapter JS de producao;
- `app/main.js`;
- `app/storage/storageBoundary.js`;
- `app/boundaries/sessionAccessBoundary.js`;
- `app/utils/textFormatters.js`;
- Supabase;
- banco de dados;
- Android;
- CSS;
- UI;
- dependencias.

## 9. Rollout recomendado

Fase liberada para proxima fatia:

- `LP-WEB-007`

Motivo:

- e a menor implementacao capaz de transformar o planejamento em fronteira concreta;
- mantem alta reversibilidade;
- prepara Supabase sem ativar leitura ou escrita remota;
- pode ser protegida pelo gate atual mais os requisitos especificos de adapter ja documentados.
