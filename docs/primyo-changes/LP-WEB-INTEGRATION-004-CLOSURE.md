# LP-WEB-INTEGRATION-004-CLOSURE

## Objetivo real da fase

Validar a base legada de clientes antes de qualquer ampliacao do `Customer Adapter Shadow Read`, ajustando a regra de `document` para cliente comum versus cliente faturado e registrando que a base atual continua sendo massa `demo/teste`.

## Validacao adicionada ou documentada

- cliente comum sem `document` deixou de ser tratado como incompatibilidade bloqueante;
- cliente faturado sem `document` passou a ser tratado como bloqueio real;
- a validacao continuou silenciosa, apenas em memoria;
- a saida continuou restrita a `window.__lavaprimeCustomerLegacyDataValidation`.

## Resultado tecnico encontrado

- `5` clientes analisados;
- `5` registros classificados como `demo/teste`;
- `0` registros reais analisados;
- `5` clientes estruturalmente compativeis com a regra atual;
- `0` incompatibilidades reais;
- `2` ausencias opcionais de `document` em clientes comuns;
- `0` bloqueios atuais de faturamento por `document`;
- `canExpandShadowReadForCommonCustomers = true`;
- `canExpandShadowReadForBilledCustomers = true`;
- `canPrepareSupabaseMigration = false`.

## Alteracoes em `customerAdapter.js`

- `document` saiu da lista global de obrigatorios;
- a validacao passou a exigir `document` apenas para payload classificado como faturado;
- cliente comum sem `document` passou a gerar warning controlado;
- foi adicionada a funcao interna `isBilledCustomerPayload(...)`.

## Alteracoes em `primyo-adapter-gate.mjs`

- o gate passou a separar fixture de cliente comum sem `document`;
- o gate passou a separar fixture de cliente faturado sem `document`;
- o cenario de cliente comum agora precisa continuar valido com warning;
- o cenario de cliente faturado agora precisa falhar com `PAYLOAD_BILLED_DOCUMENT_REQUIRED`.

## Documentos criados ou alterados

- `app/adapters/customerAdapter.js`
- `scripts/primyo-adapter-gate.mjs`
- `docs/primyo-changes/LP-WEB-INTEGRATION-004.md`
- `docs/primyo-changes/LP-WEB-INTEGRATION-004-CLOSURE.md`
- `docs/primyo-web-integration/CUSTOMER_LEGACY_DATA_VALIDATION.md`

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `node --check app/adapters/customerAdapter.js`
- `node --check scripts/primyo-adapter-gate.mjs`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Warning nao bloqueante

- o build continua emitindo o warning nao bloqueante de chunk acima de `500 kB`.

## Riscos

- a massa `demo/teste` continuou sustentando parte do legado ate a fase seguinte de cleanup;
- `customerAdapter` continua fora da escrita e continua sendo apenas apoio tecnico;
- a validacao em memoria nao pode virar persistencia, telemetria externa ou dependencia funcional;
- `idResolver` continua fora do runtime.

## Rollback

1. reverter `app/adapters/customerAdapter.js`;
2. reverter `scripts/primyo-adapter-gate.mjs`;
3. reverter `docs/primyo-changes/LP-WEB-INTEGRATION-004.md`;
4. reverter `docs/primyo-changes/LP-WEB-INTEGRATION-004-CLOSURE.md`;
5. reverter `docs/primyo-web-integration/CUSTOMER_LEGACY_DATA_VALIDATION.md`;
6. reexecutar `node --check`, Adapter Gate, `primyo:gate`, build e verify.

## Recomendacao final

- a fase seguinte correta continua sendo `LP-WEB-DATA-CLEANUP-001`, ja absorvida depois desta validacao;
- qualquer ampliacao adicional de `shadow read` deve continuar bloqueada ate existir bootstrap demo separado de bootstrap limpo.

## Confirmacoes finais

- o legado continua fonte ativa;
- `customerAdapter` nao virou fonte ativa;
- `idResolver` continua fora do runtime;
- Supabase continua fechado;
- nao houve push.
