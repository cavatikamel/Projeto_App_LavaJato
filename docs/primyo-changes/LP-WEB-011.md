# LP-WEB-011

## Objetivo

Criar o quinto adapter puro do LavaPrime Web: `supplyAdapter`.

Esta fase existe para adaptar o dominio de insumos ao contrato oficial `Supply`, sem integrar o adapter a `app/main.js`, sem alterar comportamento funcional, sem abrir Supabase e sem iniciar movimentacao real de estoque.

## Arquivos criados ou alterados

- `app/adapters/supplyAdapter.js`
- `scripts/primyo-adapter-gate.mjs`
- `scripts/primyo-gate.mjs`
- `docs/primyo-changes/LP-WEB-011.md`
- `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## API do adapter

O modulo expoe:

- `toSupplyContract(legacySupply, context)`
- `validateSupplyContract(supplyContract)`
- `createSupplyContractEnvelope(supplyContract, context)`
- `SUPPLY_CONTRACT_NAME`
- `SUPPLY_CONTRACT_VERSION`

## Campos mapeados

Campos principais cobertos nesta fase:

- `id` canonico a partir de `sourceId`
- `organizationId`
- `sku`
- `name`
- `unit`
- `costPrice`
- `isActive`
- `createdAt`
- `updatedAt`

Campos opcionais mapeados quando existirem:

- `stockBalance`
- `minStock`
- `supplierName`
- `riskTags`
- `compatibilityMetadata`
- `notes`
- `legacyRefs`

## Campos ausentes ou problematicos

Lacunas observadas no legado atual:

- `supplyCatalog` observado em `app/main.js` nao expone `organizationId` nativo por item;
- o shape legado nao traz `status` formal separado de `active`;
- relacao com `serviceSupplyProfiles` ainda nao aparece como ownership oficial no item do catalogo;
- `category` e `type` podem existir no legado ou em expansoes futuras, mas ainda nao possuem campo canonico aprovado no contrato `Supply`;
- o legado atual nao traz trilha auditavel de movimento de estoque dentro do item do catalogo.

Decisoes aplicadas:

- `sourceId` permanece obrigatorio via contexto ou legado;
- `id` canonico segue `supply:legacy:<sourceId>` e permanece separado de `sourceId`;
- `cost -> costPrice`, `stock -> stockBalance` e `supplier -> supplierName` sao renames explicitos e controlados;
- `riskTags` sao preservados como lista contratual quando existirem no legado;
- metadados tecnicos como `phType`, `phApproximate`, `aggressivenessLevel` e flags de seguranca entram em `compatibilityMetadata` sem consultar runtime externo;
- `category`, `type`, `description` excedente e futuras relacoes com servicos permanecem em `legacyRefs` ate que haja decisao transversal propria.

## Aderencia ao padrao dos adapters anteriores

O `supplyAdapter` segue o baseline de `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `productAdapter`:

- modulo puro e sem IO;
- ausencia de acesso a `window`, `localStorage`, DOM, Supabase ou `app/main.js`;
- uso de `app/adapters/shared/adapterHelpers.js` para identidade, envelope, metadata, warnings e validation compartilhada;
- `id` canonico separado de `sourceId`;
- `organizationId`, timestamps e `status` controlados por contexto;
- envelope com `payload`, `warnings`, `validation` e `metadata`;
- warnings e erros controlados, sem efeitos colaterais na entrada.

## Diferenca preservada entre produto e insumo

Nesta fase, a separacao entre `Product` e `Supply` foi mantida de forma explicita:

- `Supply` nao possui `salePrice`;
- `Supply` nao representa produto vendavel nem item de vitrine;
- `supplierName` pertence ao contrato `Supply`, ao contrario do dominio `Product`, onde fornecedor continua apenas em `legacyRefs`;
- `stockBalance` continua sendo apenas saldo observado, nao trilha auditavel nem movimentacao operacional;
- nenhuma baixa, reposicao ou consumo por servico foi integrada ao adapter;
- nenhuma aproximacao entre `supplyAdapter`, `productAdapter` e `serviceAdapter` foi feita no runtime.

## Cenarios automatizados no Adapter Gate

O gate passa a cobrir:

- insumo valido com contexto completo;
- insumo invalido sem nome;
- insumo invalido sem `sourceId`;
- insumo invalido sem `organizationId`;
- envelope valido com `validation`, `warnings`, `metadata`, `organizationId` e `sourceId` preservados.

## Riscos

- `compatibilityMetadata` ainda depende do shape tecnico legado atual e pode precisar revisao quando surgirem novos metadados;
- relacoes com `serviceSupplyProfiles` continuam apenas documentais e ainda nao resolvidas por IDs canonicos neste adapter;
- `stockBalance` continua sendo apenas projecao atual e nao trilha auditavel de consumo ou reposicao;
- integrar `supplyAdapter` ao runtime antes de uma fatia propria continua prematuro.

## Limitacoes

- nenhuma movimentacao de estoque real foi alterada;
- nenhuma persistencia, deduplicacao ou migracao foi iniciada;
- nenhum relacionamento com `Product`, `Service`, `Attendance`, `Payment` ou `Financial` foi integrado;
- o adapter ainda nao e consumido por nenhuma tela do produto.

## Rollback

1. Remover `app/adapters/supplyAdapter.js`.
2. Reverter os ajustes em `scripts/primyo-adapter-gate.mjs`.
3. Reverter eventual ajuste minimo em `scripts/primyo-gate.mjs`.
4. Reverter este registro e as atualizacoes documentais da fase.
5. Reexecutar `node scripts/primyo-adapter-gate.mjs`.
6. Reexecutar `npm.cmd run primyo:gate`, build e verify.
