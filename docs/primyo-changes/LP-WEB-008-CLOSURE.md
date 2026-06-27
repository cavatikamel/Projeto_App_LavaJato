# LP-WEB-008 CLOSURE

- Change ID: `LP-WEB-008`
- Backlog ID: `LP-WEB-008`
- Data de encerramento: `2026-06-26`
- Resultado final: `Aceito`
- Aceite tecnico: `Concluido com comportamento funcional preservado e sem integracao ao runtime`

## Resumo da fase

`LP-WEB-008` foi encerrado como a segunda implementacao controlada da trilha de adapters puros do LavaPrime Web.

O resultado absorvido nesta closure e:

- `app/adapters/vehicleAdapter.js` existe como segundo adapter puro oficial;
- a API publica segue o mesmo baseline do `customerAdapter` revisado;
- o modulo permanece fora de `app/main.js` e fora do runtime;
- `customerAdapter` permaneceu intacto;
- nenhum comportamento funcional foi alterado.

## Adapter criado

Modulo criado:

- `app/adapters/vehicleAdapter.js`

API exposta:

- `toVehicleContract(legacyVehicle, context)`
- `validateVehicleContract(vehicleContract)`
- `createVehicleContractEnvelope(vehicleContract, context)`
- `VEHICLE_CONTRACT_NAME`
- `VEHICLE_CONTRACT_VERSION`

## Campos mapeados

Mapeamentos principais absorvidos:

- `id` legado ou `context.sourceId` -> `sourceId`
- `sourceId` -> `id` canonico opaco no namespace `vehicle:legacy:<sourceId>`
- `currentClientId` -> `currentCustomerId` transitorio no namespace `customer:legacy:<currentClientId>`
- `plate` -> `plate`
- `brand` -> `brand`
- `model` -> `model`
- `type` ou `vehicleType` -> `vehicleType`
- `category` -> `category`
- `color` -> `color`
- `fuel` -> `fuel`
- `notes` -> `notes`
- `specialCareRecords[].id` -> `specialCareRefs`
- `currentClientId` -> `legacyRefs.relatedIds.currentCustomerLegacyId`
- `oldPlates`, `previousPlates` ou `legacyPlates` -> `legacyRefs.legacyPlates`
- `year` legado unico -> preservado como rastreabilidade, sem promover automaticamente para `manufactureYear` e `modelYear`

Campos dependentes de contexto:

- `organizationId`
- `status`
- `createdAt`
- `updatedAt`
- `contractVersion`
- `metadata.emittedAt`

## Campos ausentes ou problematicos

Lacunas formalmente registradas:

- o legado nao fornece `organizationId` autoritativo;
- o legado nao fornece `status` canonico do contrato;
- o legado nao fornece historico tecnico confiavel de `createdAt` e `updatedAt`;
- `year` legado nao resolve sozinho `manufactureYear` e `modelYear`;
- `ownerHistory` nao possui refs estaveis para ownership contratual;
- `currentClientId` continua sendo apenas referencia legada transitiva;
- o adapter nao consulta FIPE e nao resolve `fipeRef` automaticamente;
- o adapter nao deduplica veiculos nem resolve relacionamento real com cliente.

## Aderencia ao baseline compartilhado

`vehicleAdapter` foi aceito como aderente ao mesmo baseline do `customerAdapter` revisado:

- adapter puro e sem efeitos colaterais;
- contexto explicito para tenancy, status e timestamps;
- `id` canonico separado de `sourceId`;
- `legacyRefs` estruturado para rastreabilidade;
- envelope compativel com `payload`, `warnings`, `validation` e `metadata`;
- `warnings` padronizados;
- `validation` padronizada;
- nenhuma dependencia de DOM, `window`, `localStorage`, Supabase ou `app/main.js`.

## Cenarios conceituais validados

1. Veiculo legado valido com contexto completo:
   `ok: true`, `id` canonico gerado, `currentCustomerId` transitorio controlado e envelope completo.
2. Veiculo legado incompleto com warnings permitidos:
   `ok: true` quando o contrato minimo e atendido, com lacunas registradas em warning.
3. Veiculo sem placa:
   `ok: false`, com `missingRequiredFields` incluindo `plate`.
4. Veiculo sem ID legado estavel:
   `ok: false`, com bloqueio por ausencia de `id` e `sourceId`.
5. Contexto sem `organizationId`:
   `ok: false`, com lacuna controlada e sem fallback silencioso.
6. Contexto sem `now`:
   `ok: false` quando `createdAt` e `updatedAt` nao sao supridos por contexto alternativo.
7. `sourceId` ausente:
   `ok: false`, com bloqueio formal.
8. `legacyRefs` contendo placa antiga:
   placa antiga preservada em `legacyRefs.legacyPlates`, sem virar identidade oficial.
9. `legacyRefs` contendo referencia de cliente legado:
   `legacyRefs.relatedIds.currentCustomerLegacyId` preservado apenas como rastreabilidade.
10. Status padrao aplicado:
   status padrao controlado com warning registrado.
11. Envelope com `validation` e `warnings`:
   envelope completo gerado com rastreabilidade e sem efeitos colaterais.

## Validacoes executadas

- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## Riscos remanescentes

- `currentCustomerId` ainda e transitorio e nao representa ownership definitivo;
- `year` legado continua sem separacao oficial de ano de fabricacao e ano de modelo;
- `ownerHistory` continua sem contrato maduro de relacionamento;
- `specialCareRefs` depende de IDs legados explicitamente presentes;
- integrar `customerAdapter` ou `vehicleAdapter` ao runtime antes de reforcar gate e regressao elevaria risco demais.

## Rollback

1. Remover `app/adapters/vehicleAdapter.js`.
2. Reverter eventual ajuste minimo em `scripts/primyo-gate.mjs`.
3. Reverter `docs/primyo-changes/LP-WEB-008.md` e este closure.
4. Reexecutar `node --check app/adapters/customerAdapter.js`.
5. Reexecutar `node --check app/adapters/vehicleAdapter.js`, `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`.

## Decisao final

`LP-WEB-008` foi aceito e absorvido na baseline oficial.

Conclusoes do encerramento:

- o LavaPrime agora possui dois adapters puros oficiais fora do runtime;
- o baseline compartilhado provou ser repetivel em mais de um dominio;
- `customerAdapter` e `vehicleAdapter` continuam explicitamente nao integrados ao runtime;
- a proxima fatia nao deve integrar adapters ainda.
