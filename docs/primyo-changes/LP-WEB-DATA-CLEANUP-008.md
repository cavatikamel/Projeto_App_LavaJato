# LP-WEB-DATA-CLEANUP-008

## Objetivo

Reavaliar o trial protegido do `CLEAN_BOOTSTRAP` apos o hardening semantico da fase anterior, sem trocar o modo padrao, sem remover a massa `demo/teste` e sem abrir Supabase.

## Leitura comparativa

Base comparada:

- `LP-WEB-DATA-CLEANUP-006` registrou `5` superficies ainda inseguras para o trial protegido:
  - `dashboard`
  - `patio`
  - `reports`
  - `documents`
  - `customerVehicleBillingLinks`
- `LP-WEB-DATA-CLEANUP-007` adicionou hardening semantico minimo exatamente nessas cinco superficies.

## Resultado da reavaliacao

### Superficies melhoradas

- `dashboard`
- `patio`
- `reports`
- `documents`
- `customerVehicleBillingLinks`

### Superficies ainda inseguras

- nenhuma superficie permaneceu marcada como insegura para o diagnostico protegido do trial;
- o bloqueio remanescente passou a ser de promocao para `default`, nao de trial protegido.

### Bloqueios remanescentes para promocao de default

- `CLEAN_BOOTSTRAP` continua sem volume de dados limpos suficiente para operacao significativa;
- os relacionamentos cross-domain continuam dependentes de fallback e nao equivalem a uma base persistida real;
- a observabilidade tecnica no browser segue limitada, porque os objetos globais de diagnostico nao apareceram na inspecao visual anterior;
- `DEMO_BOOTSTRAP` continua sendo a unica origem funcional e padrao segura.

## Diagnosticos atualizados

- `window.__lavaprimeCleanBootstrapReadiness`
- `window.__lavaprimeCleanBootstrapTrialReadiness`
- `window.__lavaprimeCleanBootstrapTrialExecution`

Atualizacoes desta fase:

- comparacao explicita com a lista pre-hardening de superficies inseguras;
- `currentUnsafeSurfaceCount` esperado do trial protegido passa a `0`;
- `improvedSurfaceCount` esperado passa a `5`;
- a recomendacao interna deixa de pedir novo hardening imediato e passa a recomendar observabilidade controlada antes de qualquer promocao do modo limpo.

## Garantias preservadas

- `DEMO_BOOTSTRAP` continua como modo padrao;
- `CLEAN_BOOTSTRAP` continua protegido e nao funcional como origem ativa;
- nenhuma seed demo foi removida;
- nenhuma mudanca visual intencional foi introduzida;
- nenhuma regra de negocio, permissao, autenticacao ou salvamento foi alterada;
- Supabase continua fechado.

## Validacoes executadas

- `git status --short` -> executado;
- `git diff --name-only` -> executado;
- `node --check app/main.js` -> sucesso;
- `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
- `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
- `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
- `node scripts/primyo-adapter-gate.mjs` -> sucesso;
- `npm.cmd run primyo:gate` -> sucesso;
- `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
- `npm.cmd run verify:build` -> sucesso;
- smoke manual de dashboard, clientes, patio, financeiro, relatorios/documentos, logout e patio operador -> sucesso sem erro bloqueante no console.

## Resultado do smoke manual

- login admin com `mateus.admin` carregou `Visao Geral`;
- `Cadastros > Clientes` carregou;
- `Patio de Atendimento` carregou;
- `Fluxo de caixa` carregou;
- `Recibos e Documentos` carregou;
- logout admin funcionou;
- login operador com `carlos` carregou `Patio`;
- o console permaneceu sem erros ou warnings bloqueantes;
- o comportamento observado continuou compativel com `DEMO_BOOTSTRAP` como origem ativa;
- os objetos globais tecnicos de bootstrap limpo nao apareceram na inspecao visual do browser, mas sem erro funcional.

## Riscos

- o modo limpo continua sem base limpa real para promover comportamento operacional significativo;
- a observabilidade do trial no browser continua insuficiente para confiar apenas em inspecao visual;
- qualquer tentativa de promocao para `default` continua prematura sem nova prova de observabilidade e sem origem persistida real.

## Rollback

1. reverter `app/main.js`;
2. reverter `docs/primyo-web-integration/CLEAN_BOOTSTRAP_TRIAL_REASSESSMENT.md`;
3. reverter `docs/primyo-web-integration/DEMO_DATA_CLEANUP_PLAN.md`;
4. reverter backlog, change control, next slice e docs de teste;
5. reexecutar gate, build, verify e smoke rapido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-009 - Protected clean bootstrap trial observability review`
