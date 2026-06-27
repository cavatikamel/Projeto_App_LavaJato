# LP-WEB-010

## Objetivo

Criar o quarto adapter puro do LavaPrime Web: `productAdapter`.

Esta fase existe para adaptar o dominio de produtos ao contrato oficial `Product`, sem integrar o adapter a `app/main.js`, sem alterar comportamento funcional e sem abrir Supabase.

## Arquivos criados ou alterados

- `app/adapters/productAdapter.js`
- `scripts/primyo-adapter-gate.mjs`
- `scripts/primyo-gate.mjs`
- `docs/primyo-changes/LP-WEB-010.md`
- `docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md`
- `docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md`
- `docs/primyo-tests/REGRESSION_MATRIX.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## API do adapter

O modulo expoe:

- `toProductContract(legacyProduct, context)`
- `validateProductContract(productContract)`
- `createProductContractEnvelope(productContract, context)`
- `PRODUCT_CONTRACT_NAME`
- `PRODUCT_CONTRACT_VERSION`

## Campos mapeados

Campos principais cobertos nesta fase:

- `id` canonico a partir de `sourceId`
- `organizationId`
- `sku`
- `name`
- `unit`
- `salePrice`
- `isActive`
- `createdAt`
- `updatedAt`

Campos opcionais mapeados quando existirem:

- `costPrice`
- `stockBalance`
- `minStock`
- `category`
- `barcode`
- `notes`
- `legacyRefs`

## Campos ausentes ou problematicos

Lacunas observadas no legado atual:

- `productCatalog` observado em `app/main.js` nao expone `organizationId` nativo por item;
- `category` nao aparece no seed legado observado;
- `barcode` nao aparece no seed legado observado;
- `supplier` nao pertence ao contrato `Product` e por isso fica preservado apenas em `legacyRefs`;
- `type` legado nao possui semantica contratual fechada e tambem fica preservado em `legacyRefs`;
- `description` legado nao existe de forma estavel no seed atual e, quando aparecer, nao deve sobrescrever silenciosamente `notes`.

Decisoes aplicadas:

- `sourceId` permanece obrigatorio via contexto ou legado;
- `id` canonico segue `product:legacy:<sourceId>` e permanece separado de `sourceId`;
- `price -> salePrice`, `cost -> costPrice` e `stock -> stockBalance` sao renames explicitos e controlados;
- `status` permanece controlado pelo envelope, enquanto o payload segue com `isActive`;
- `supplier`, `type` e descricao legada excedente ficam preservados em `legacyRefs` quando aparecerem, sem virar ownership oficial do contrato.

## Aderencia ao padrao dos adapters anteriores

O `productAdapter` segue o baseline de `customerAdapter`, `vehicleAdapter` e `serviceAdapter`:

- modulo puro e sem IO;
- ausencia de acesso a `window`, `localStorage`, DOM, Supabase ou `app/main.js`;
- uso de `app/adapters/shared/adapterHelpers.js` para identidade, envelope, metadata, warnings e validation compartilhada;
- `id` canonico separado de `sourceId`;
- `organizationId`, timestamps e `status` controlados por contexto;
- envelope com `payload`, `warnings`, `validation` e `metadata`;
- warnings e erros controlados, sem efeitos colaterais na entrada.

## Cenarios automatizados no Adapter Gate

O gate passa a cobrir:

- produto valido com contexto completo;
- produto invalido sem nome;
- produto invalido sem `sourceId`;
- produto invalido sem `organizationId`;
- envelope valido com `validation`, `warnings`, `metadata` e `sourceId` preservado.

## Riscos

- `supplier` legado continua sem ownership contratual de primeiro nivel no dominio `Product`;
- `type` legado continua ambiguidade aberta enquanto `category` nao estiver mais madura;
- `stockBalance` segue sendo apenas projecao atual e nao trilha auditavel de movimentos;
- integrar `productAdapter` ao runtime antes de uma fatia propria continua prematuro.

## Limitacoes

- nenhuma baixa de estoque real foi alterada;
- nenhuma persistencia, deduplicacao ou migracao foi iniciada;
- nenhum relacionamento com `Supply`, `Attendance`, `Payment` ou `Financial` foi integrado;
- o adapter ainda nao e consumido por nenhuma tela do produto.

## Rollback

1. Remover `app/adapters/productAdapter.js`.
2. Reverter os ajustes em `scripts/primyo-adapter-gate.mjs`.
3. Reverter eventual ajuste minimo em `scripts/primyo-gate.mjs`.
4. Reverter este registro e as atualizacoes documentais da fase.
5. Reexecutar `node scripts/primyo-adapter-gate.mjs`.
6. Reexecutar `npm.cmd run primyo:gate`, build e verify.
