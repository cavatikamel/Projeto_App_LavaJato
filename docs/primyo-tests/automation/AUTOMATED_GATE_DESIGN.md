# LavaPrime Automated Gate Design

## Objetivo

Definir o desenho oficial do gate automatizado do LavaPrime e registrar sua implementacao em `LP-TEST-AUTO-001`.

## Papel do gate

O gate automatizado organiza validacoes tecnicas repetiveis antes que uma mudanca seja considerada pronta para smoke manual.

Ele nao substitui a validacao funcional de login, perfil, patio, admin, navegacao e console.

## Estado implementado

Comando oficial:

```text
npm.cmd run primyo:gate
```

Script:

```text
scripts/primyo-gate.mjs
```

## Ordem proposta

### 1. Preflight

Verificacoes:

- confirmar que Node esta disponivel;
- confirmar que os arquivos criticos existem;
- falhar com `Gate Result: FAILED` se um arquivo obrigatorio estiver ausente.

### 2. Sintaxe

Executar:

- `node --check app/main.js`
- `node --check app/boundaries/sessionAccessBoundary.js`
- `node --check scripts/sync-fipe-local-db.mjs`

### 3. Build

Executar:

- `npm.cmd run build`

### 4. Verificacao de artefatos

Executar:

- `npm.cmd run verify:build`

### 5. Resumo tecnico

Gerar saida com:

- comando executado;
- status;
- duracao aproximada;
- resultado final;
- proximo passo manual exigido.

### 6. Ponte para smoke manual

Ao final, a documentacao da mudanca deve indicar quais casos do `SMOKE_TEST_PLAN.md` precisam ser executados com base na `REGRESSION_MATRIX.md`.

O gate implementado ainda nao gera checklist dinamico de smoke. Essa capacidade fica para fatia futura.

## Falhas bloqueantes

Devem bloquear a mudanca:

- erro de sintaxe em arquivo critico;
- falha no build;
- falha no `verify:build`;
- arquivo critico ausente;
- impossibilidade de registrar resultado;
- divergencia entre escopo aprovado e arquivos alterados.

## Saida esperada

Saida minima desejada para a automacao futura:

```text
Primyo Engineering Gate
Workspace: C:\Users\kamel\OneDrive\Projetos Kamel\Projeto_App_LavaJato

PASS Preflight - Node v24.16.0
PASS Required Files
PASS Syntax app/main.js
PASS Syntax app/boundaries/sessionAccessBoundary.js
PASS Syntax scripts/sync-fipe-local-db.mjs
PASS Build
PASS Verify Build

Gate Result: SUCCESS
```

## Criterios para avancar

Uma mudanca so deve ir para smoke manual se o gate tecnico estiver verde.

Se o gate tecnico falhar, a mudanca fica bloqueada antes de qualquer validacao funcional.

## Rollback

Se a automacao futura causar instabilidade:

- remover o script automatizado;
- voltar aos comandos manuais;
- manter a politica de gate vigente;
- registrar a falha no change control.

## Decisao de adocao

O desenho do gate foi implementado em `LP-TEST-AUTO-001`.

`npm.cmd run primyo:gate` passa a ser a validacao tecnica oficial minima do LavaPrime Web.
