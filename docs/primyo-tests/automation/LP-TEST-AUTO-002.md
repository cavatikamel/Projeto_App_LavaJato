# LP-TEST-AUTO-002

## Objetivo

Evoluir o gate tecnico oficial da Primyo para detectar regressoes estruturais antes de novas extracoes arquiteturais, sem alterar comportamento do LavaPrime e sem adicionar dependencias.

## Escopo

- atualizar `scripts/primyo-gate.mjs`;
- manter `npm.cmd run build` e `npm.cmd run verify:build` como etapas obrigatorias;
- adicionar verificacoes estruturais e de integridade de modulos criticos;
- registrar a mudanca neste documento.

## Fora de escopo

- testes E2E;
- Playwright, Vitest, Cypress ou qualquer outro framework;
- alteracao em `app/main.js`, Android, Supabase, CSS, React shell, banco ou layout;
- validacao de regra de negocio, UI ou navegador.

## Arquivos alterados

- `scripts/primyo-gate.mjs`
- `docs/primyo-tests/automation/LP-TEST-AUTO-002.md`

## Novas validacoes adicionadas ao gate

### 1. Estrutura minima obrigatoria

O gate agora falha se diretorios criticos estiverem ausentes ou substituidos por outro tipo de caminho:

- `app/`
- `app/boundaries/`
- `app/storage/`
- `app/utils/`
- `app/src/`
- `scripts/`

### 2. Modulos e arquivos criticos

O gate agora verifica explicitamente a existencia de:

- `app/main.js`
- `app/src/main.jsx`
- `app/src/App.jsx`
- `app/boundaries/sessionAccessBoundary.js`
- `app/storage/storageBoundary.js`
- `app/utils/textFormatters.js`
- `app/index.html`
- `app/legacy-body.html`
- `scripts/sync-fipe-local-db.mjs`
- `scripts/verify-build-artifacts.mjs`
- `package.json`

### 3. Integridade minima de imports e boundaries

O gate agora verifica por assinatura textual minima:

- `app/main.js` continua importando `sessionAccessBoundary`, `storageBoundary` e `textFormatters`;
- `app/main.js` continua expondo `window.__lavaprimeSessionBoundary` e `window.__lavaprimeAccessBoundary`;
- `app/boundaries/sessionAccessBoundary.js` continua exportando `createSessionBoundary` e `createAccessBoundary`;
- `app/storage/storageBoundary.js` continua exportando `createStorageBoundary` e a instancia `storageBoundary`;
- `app/utils/textFormatters.js` continua exportando os helpers criticos de texto e formatacao.

### 4. Sintaxe de modulos extraidos

O gate passa a executar tambem:

- `node --check app/storage/storageBoundary.js`
- `node --check app/utils/textFormatters.js`

## Validacoes mantidas

O gate continua executando:

- preflight de Node;
- verificacao de arquivos obrigatorios;
- `node --check app/main.js`;
- `node --check app/boundaries/sessionAccessBoundary.js`;
- `node --check scripts/sync-fipe-local-db.mjs`;
- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- resumo final com `Gate Result`.

## Limitacoes atuais

- a verificacao de integridade e textual, nao semantica;
- o gate nao valida comportamento funcional;
- o gate nao valida navegador, console visual ou layout;
- o gate nao substitui smoke manual;
- reorganizacoes futuras aprovadas de estrutura exigirao ajuste sincronizado do gate.

## Riscos

- falso positivo se uma extracao aprovada alterar paths ou nomes esperados sem atualizar o gate;
- falso negativo se um modulo mantiver as assinaturas textuais esperadas, mas quebrar comportamento interno;
- acoplamento intencional do gate a estrutura atual para proteger a baseline.

## Rollback

Se a evolucao do gate causar bloqueio indevido:

1. reverter `scripts/primyo-gate.mjs` para a versao anterior de `LP-TEST-AUTO-001`;
2. remover este registro se a fatia for cancelada;
3. voltar temporariamente ao gate tecnico anterior enquanto a regra estrutural e recalibrada;
4. registrar a decisao no change control antes de nova tentativa.

## Evidencias esperadas

- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Resultado esperado

Depois desta fase, o gate deve detectar automaticamente:

- arquivos ausentes;
- diretorios criticos ausentes;
- boundaries ausentes;
- imports essenciais removidos;
- modulos criticos removidos;
- estrutura minima comprometida.
