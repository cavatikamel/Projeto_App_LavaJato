# LP-WEB-ADAPTER-HELPERS-001

## Objetivo

Criar uma camada minima de helpers compartilhados para adapters puros do LavaPrime Web, reduzindo repeticao estrutural entre `customerAdapter`, `vehicleAdapter` e `serviceAdapter` sem alterar runtime, comportamento funcional ou integracao com `app/main.js`.

## Motivo da extracao

Depois de tres adapters puros oficiais, a trilha passou a repetir o mesmo conjunto de estruturas transversais:

- normalizacao de `sourceId`;
- montagem de `id` canonico;
- erros e warnings padronizados;
- criacao de metadata;
- montagem de envelope;
- normalizacao de `legacyRefs`.

Essa repeticao ja estava madura o suficiente para uma extracao pequena e reversivel, sem abrir um framework e sem esconder regras de dominio.

## Helpers criados

Arquivo criado:

- `app/adapters/shared/adapterHelpers.js`

API compartilhada exposta:

- `normalizeSourceId(sourceId)`
- `buildCanonicalId(entityName, sourceId)`
- `createError(code, message)`
- `createWarning(code, message, details)`
- `createValidationResult(...)`
- `mergeValidationResults(...)`
- `toValidationSummary(validation)`
- `createMetadata(baseMetadata, extraMetadata)`
- `normalizeLegacyRefs(legacyRefs)`
- `createContractEnvelope(options)`

## Adapters refatorados

Arquivos refatorados:

- `app/adapters/customerAdapter.js`
- `app/adapters/vehicleAdapter.js`
- `app/adapters/serviceAdapter.js`

Mudancas aplicadas:

- `customerAdapter` passou a reutilizar helpers compartilhados para `sourceId`, `id` canonico, erros, warnings, validation compartilhada, metadata e envelope;
- `vehicleAdapter` passou a reutilizar os mesmos helpers estruturais do `customerAdapter`;
- `serviceAdapter` passou a reutilizar helpers compartilhados para `sourceId`, `id` canonico, erros, warnings, metadata e envelope;
- a validacao especifica de `serviceAdapter` permaneceu local, porque o shape de `validation` continua ligeiramente diferente do baseline de `customerAdapter` e `vehicleAdapter`.

## Garantias preservadas

- nenhum adapter foi integrado ao runtime;
- `app/main.js` permaneceu intacto;
- as APIs publicas dos tres adapters foram preservadas;
- `contractName` e `contractVersion` nao foram alterados;
- a separacao entre `id` canonico e `sourceId` foi preservada;
- `organizationId`, `status` e timestamps continuam vindo de contexto controlado;
- `legacyRefs`, `warnings`, `validation` e `metadata` continuam no shape esperado pelo Adapter Gate.

## Gate e validacoes executadas

Validacoes executadas com sucesso:

- `node --check app/adapters/shared/adapterHelpers.js`
- `node --check app/adapters/customerAdapter.js`
- `node --check app/adapters/vehicleAdapter.js`
- `node --check app/adapters/serviceAdapter.js`
- `node --check scripts/primyo-adapter-gate.mjs`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Resultado observado:

- Adapter Gate: `SUCCESS`
- Primyo Gate: `SUCCESS`
- Build: aprovado
- Verify Build: aprovado

## Riscos residuais

- `serviceAdapter` ainda preserva sua propria semantica local de `validation`, entao nem todo helper de validacao foi consolidado;
- uma futura extracao exagerada poderia esconder regra de dominio dentro do helper comum;
- qualquer mudanca futura em `adapterHelpers.js` passa a exigir revalidacao conjunta de `customerAdapter`, `vehicleAdapter` e `serviceAdapter`.

## Limitacoes

- esta fase nao criou novo adapter;
- esta fase nao criou helper para resolver relacionamento entre dominios;
- esta fase nao mexeu em `app/main.js`, `localStorage`, Supabase, Android, CSS ou UI;
- esta fase nao unificou regras especificas de cliente, veiculo ou servico que ainda nao provaram ser realmente comuns.

## Rollback

Rollback esperado:

1. remover `app/adapters/shared/adapterHelpers.js`;
2. reverter `customerAdapter.js`, `vehicleAdapter.js` e `serviceAdapter.js` ao estado anterior da fatia;
3. reverter ajustes em `scripts/primyo-adapter-gate.mjs`;
4. reverter eventual ajuste em `scripts/primyo-gate.mjs`;
5. reverter esta documentacao;
6. reexecutar Adapter Gate, `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build`.
