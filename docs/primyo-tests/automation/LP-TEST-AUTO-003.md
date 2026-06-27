# LP-TEST-AUTO-003

## Objetivo

Evoluir o gate tecnico oficial da Primyo para validar automaticamente os adapters puros do LavaPrime, sem alterar comportamento do produto, sem integrar adapters ao runtime e sem adicionar dependencias.

## Motivo

`customerAdapter` e `vehicleAdapter` agora existem como baseline estrutural da trilha de contratos do web.

Antes de criar um terceiro adapter, helper comum ou qualquer integracao funcional, a engenharia precisava ganhar uma verificacao automatica minima que provasse:

- importacao dos adapters em ambiente Node puro;
- exports minimos esperados;
- cenarios validos e invalidos controlados;
- envelope, `validation`, `warnings`, `organizationId`, timestamps e relacao entre `id` e `sourceId`;
- ausencia de dependencia de runtime do LavaPrime.

## Escopo

- criar `scripts/primyo-adapter-gate.mjs`;
- atualizar `scripts/primyo-gate.mjs` com alteracao minima;
- manter `npm.cmd run build` e `npm.cmd run verify:build` como etapas obrigatorias;
- registrar a mudanca neste documento;
- atualizar a documentacao oficial de gate, regressao, backlog, change control e decisao da trilha.

## Fora de escopo

- integracao de `customerAdapter` ou `vehicleAdapter` ao runtime;
- alteracao em `app/main.js`;
- criacao de novo adapter;
- Supabase, banco, Android, CSS, UI, React shell ou dependencias;
- navegador, E2E, Playwright, Vitest, Cypress ou qualquer framework externo.

## Scripts criados ou alterados

- `scripts/primyo-adapter-gate.mjs`
- `scripts/primyo-gate.mjs`
- `docs/primyo-tests/automation/LP-TEST-AUTO-003.md`

## Cenarios cobertos

### 1. Validacao estrutural dos adapters

O novo gate verifica:

- importacao de `app/adapters/customerAdapter.js`;
- importacao de `app/adapters/vehicleAdapter.js`;
- exports minimos de ambos os modulos;
- ausencia de referencias proibidas a `window`, `localStorage`, Supabase, DOM e `app/main.js`.

### 2. Customer adapter

O gate cobre:

- cenario valido com contexto completo;
- cenario invalido por ausencia de campo obrigatorio (`document`);
- cenario invalido por ausencia de `organizationId` no contexto;
- geracao de envelope;
- `validation.ok = true` no caso valido;
- `validation.ok = false` no caso invalido;
- `missingRequiredFields` preenchido quando aplicavel;
- `organizationId`, `createdAt` e `updatedAt` vindos de contexto;
- separacao entre `id` canonico e `sourceId`;
- preservacao de `sourceId`.

### 3. Vehicle adapter

O gate cobre:

- cenario valido com contexto completo;
- cenario invalido por ausencia de campo obrigatorio (`plate`);
- cenario invalido por ausencia simultanea de `id` legado e `sourceId`;
- geracao de envelope;
- `validation.ok = true` no caso valido;
- `validation.ok = false` no caso invalido;
- `missingRequiredFields` preenchido quando aplicavel;
- `organizationId`, `createdAt` e `updatedAt` vindos de contexto;
- separacao entre `id` canonico e `sourceId`;
- preservacao de `sourceId`.

### 4. Regras conceituais automatizadas

O gate agora valida automaticamente:

- `warnings` como arrays;
- `validation` como bloco estruturado;
- `metadata` presente no envelope;
- `contractName` e `contractVersion` presentes;
- `payload` presente no envelope;
- adapters executando em Node puro sem exigir runtime do LavaPrime;
- ausencia de mutacao dos fixtures de entrada durante a adaptacao.

## Limitacoes atuais

- a validacao continua conceitual e local, nao browser-based;
- os fixtures sao pequenos e controlados, nao equivalem a toda a variabilidade do legado;
- o gate nao substitui smoke funcional quando uma futura fase tocar runtime;
- a verificacao de "ausencia de runtime" e feita por importacao em Node e por marcadores proibidos, nao por analise estatica profunda.

## Riscos

- falso positivo se uma evolucao aprovada dos adapters alterar API ou shape sem atualizar o gate junto;
- falso negativo se um adapter mantiver shape esperado, mas quebrar um caso de negocio nao coberto pelos fixtures minimos;
- necessidade de expandir o gate quando novos adapters ou helpers comuns forem adicionados.

## Rollback

1. Remover `scripts/primyo-adapter-gate.mjs`.
2. Reverter o ajuste minimo em `scripts/primyo-gate.mjs`.
3. Reverter este registro e as atualizacoes documentais de `LP-TEST-AUTO-003`.
4. Reexecutar `npm.cmd run primyo:gate`.
5. Reexecutar `npm.cmd run build`.
6. Reexecutar `npm.cmd run verify:build`.

## Evidencias esperadas

- `node --check scripts/primyo-adapter-gate.mjs`
- `node scripts/primyo-adapter-gate.mjs`
- `node --check app/adapters/customerAdapter.js`
- `node --check app/adapters/vehicleAdapter.js`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Validacoes executadas

- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> `Adapter Gate Result: SUCCESS`
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> `Gate Result: SUCCESS`
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## Resultado esperado

Depois desta fase, o `primyo:gate` passa a validar automaticamente:

- os dois adapters puros atuais;
- a estrutura minima do baseline compartilhado;
- os casos validos e invalidos essenciais dos contratos de cliente e veiculo;
- a existencia de envelope, `validation`, `warnings` e metadata;
- a ausencia de dependencia de runtime do LavaPrime.
