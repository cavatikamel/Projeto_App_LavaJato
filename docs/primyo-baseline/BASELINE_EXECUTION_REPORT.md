# LavaPrime Baseline Execution Report

## Objetivo

Registrar as validacoes tecnicas executadas durante a fase de baseline oficial do LavaPrime.

## Resumo executivo

- Baseline executada em: `2026-06-19`
- Escopo: `LP-TEST-001`
- Resultado geral: `Aprovado com ressalva de ambiente`
- Ressalva: o alias `npm` do PowerShell estava bloqueado por execution policy local, entao a execucao foi feita com `npm.cmd`, sem alterar o repositorio

## Validacoes executadas

### 1. Build web

- comando solicitado: `npm run build`
- execucao efetiva: `npm.cmd run build`
- status: sucesso
- avisos: nenhum aviso de build do projeto; apenas bloqueio de ambiente ao usar `npm.ps1`

Evidencia principal:

```text
vite v5.4.21 building for production...
34 modules transformed.
../dist/assets/manifest-cNhc6SOh.webmanifest  0.34 kB
../dist/index.html                            0.61 kB
../dist/assets/lavaprime-icon-BPXeL0tg.png   82.16 kB
../dist/assets/index-CS6PTNb8.css            87.25 kB
../dist/assets/index-BsB7d_l2.js            182.02 kB
../dist/assets/main-C1EwlV4T.js             486.48 kB
built in 1.34s
```

Observacao:

- a tentativa inicial com `npm run build` falhou por politica local do PowerShell sobre `npm.ps1`;
- o build do projeto foi validado com sucesso ao usar o executavel `npm.cmd`.

### 2. Verificacao de artefatos de build

- comando solicitado: `npm run verify:build`
- execucao efetiva: `npm.cmd run verify:build`
- status: sucesso
- avisos: nenhum

Evidencia principal:

```text
Build verificado com sucesso.
```

O script confirmou:

- existencia de `dist/index.html`
- existencia dos assets criticos de marca, FIPE e templates
- existencia de bundle principal JS/CSS
- referencia esperada a `/assets/` no HTML final
- referencia ao script legado da base FIPE no bundle bootstrap

### 3. Checagem sintatica do core web

- comando: `node --check app/main.js`
- status: sucesso
- avisos: nenhum
- evidencias: comando retornou com exit code `0` e sem saida de erro

### 4. Checagem sintatica do script de sincronizacao FIPE

- comando: `node --check scripts/sync-fipe-local-db.mjs`
- status: sucesso
- avisos: nenhum
- evidencias: comando retornou com exit code `0` e sem saida de erro

### 5. Verificacao de arquivos obrigatorios do workflow

Validacao executada com base no workflow atual:

- `README.md`
- `CHANGELOG.md`
- `package.json`
- `app/index.html`
- `app/legacy-body.html`
- `app/styles.css`
- `app/main.js`

Status:

- sucesso

Evidencia principal:

```text
All required files present
```

## Falhas observadas

Falhas de projeto:

- nenhuma falha de build ou sintaxe foi observada nesta baseline

Falhas de ambiente:

- PowerShell bloqueando `npm.ps1` por execution policy local

Impacto da falha de ambiente:

- nao invalida a baseline do produto;
- apenas exige uso de `npm.cmd` no ambiente atual para reproduzir a execucao.

## Atualizacao de baseline - LP-TEST-AUTO-001

Atualizacao registrada em: `2026-06-24`

`LP-TEST-AUTO-001` incorporou o comando abaixo como validacao tecnica oficial do LavaPrime Web:

```text
npm.cmd run primyo:gate
```

O gate oficial executa:

- preflight de ambiente Node;
- verificacao de arquivos obrigatorios;
- `node --check app/main.js`;
- `node --check app/boundaries/sessionAccessBoundary.js`;
- `node --check scripts/sync-fipe-local-db.mjs`;
- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- resumo final com `Gate Result: SUCCESS` ou `Gate Result: FAILED`.

Evidencia de adocao:

```text
PASS Preflight - Node v24.16.0
PASS Required Files
PASS Syntax app/main.js
PASS Syntax app/boundaries/sessionAccessBoundary.js
PASS Syntax scripts/sync-fipe-local-db.mjs
PASS Build
PASS Verify Build

Gate Result: SUCCESS
```

Comandos separados reexecutados nesta fase:

- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Observacao:

- o gate tecnico nao substitui smoke manual quando a mudanca tocar comportamento funcional, sessao, permissao, navegacao, dados ou financeiro.

## Atualizacao de baseline - LP-TEST-AUTO-003

Atualizacao registrada em: `2026-06-26`

`LP-TEST-AUTO-003` incorporou o comando e o comportamento abaixo como parte oficial do gate tecnico do LavaPrime Web:

```text
node scripts/primyo-adapter-gate.mjs
```

Esse subgate agora e executado dentro de:

```text
npm.cmd run primyo:gate
```

O estado oficial do gate apos esta absorcao passa a incluir:

- preflight de ambiente Node;
- verificacao de diretorios e arquivos obrigatorios;
- `node --check scripts/primyo-adapter-gate.mjs`;
- `node scripts/primyo-adapter-gate.mjs`;
- `node --check app/main.js`;
- `node --check app/boundaries/sessionAccessBoundary.js`;
- `node --check scripts/sync-fipe-local-db.mjs`;
- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- resumo final com `Gate Result: SUCCESS` ou `Gate Result: FAILED`.

Evidencia de adocao:

```text
PASS Customer Adapter Runtime Independence
PASS Vehicle Adapter Runtime Independence
PASS Customer Adapter Imports
PASS Vehicle Adapter Imports
PASS Customer Adapter Valid Scenario
PASS Customer Adapter Invalid Required Field Scenario
PASS Customer Adapter Invalid Context Scenario
PASS Vehicle Adapter Valid Scenario
PASS Vehicle Adapter Invalid Required Field Scenario
PASS Vehicle Adapter Invalid Context Scenario

Adapter Gate Result: SUCCESS
```

Comandos reexecutados nesta fase:

- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Ocorrencias operacionais:

- nenhuma falha real de gate, build ou verify foi observada no resultado final desta closure;
- nenhum lock transitorio em `dist` precisou de tratamento nesta revalidacao.

## Conclusao

O baseline de build e validacao automatica do LavaPrime foi estabelecido com sucesso.

O estado oficial observado nesta fase e:

- build web passa;
- verificacao de artefatos passa;
- sintaxe do core web passa;
- sintaxe do script FIPE passa;
- arquivos obrigatorios do workflow estao presentes.
- `npm.cmd run primyo:gate` e a validacao tecnica oficial minima para proximas mudancas web.
- `scripts/primyo-adapter-gate.mjs` agora compoe a baseline oficial do gate para proteger `customerAdapter` e `vehicleAdapter`.
