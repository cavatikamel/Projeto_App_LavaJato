# Test Execution Template

## Objetivo

Padronizar o registro manual das execucoes de fumaca e regressao do LavaPrime.

## Template

```md
# Test Execution Record

- Data:
- Responsavel:
- Produto: LavaPrime
- Versao:
- Commit:
- Branch:
- Backlog ID:
- Change ID:
- Resultado geral: Aprovado | Aprovado com ressalva | Bloqueado | Revertido

## Escopo validado

- Mudanca validada:
- Areas tocadas:
- Fluxos obrigatorios conforme REGRESSION_MATRIX:

## Validacoes automaticas

- npm.cmd run build:
- npm.cmd run verify:build:
- node --check app/main.js:
- node --check scripts/sync-fipe-local-db.mjs:

## Checklist manual

| Caso | Resultado | Evidencia | Falha observada | Observacoes |
| --- | --- | --- | --- | --- |
| ST-001 Login administrador | | | | |
| ST-002 Login operador | | | | |
| ST-003 Logout | | | | |
| ST-004 Acesso ao patio | | | | |
| ST-005 Acesso administrativo | | | | |
| ST-006 Navegacao principal | | | | |

## Evidencias anexadas

- screenshots:
- logs:
- anotacoes:

## Falhas

- Falha 1:
- Falha 2:

## Observacoes

- Observacao 1:
- Observacao 2:

## Decisao final

- Pode avancar:
- Exige correcao:
- Exige rollback:
```

## Regras de preenchimento

- `Versao` pode ser numero funcional, snapshot local ou tag interna.
- `Commit` deve ser informado quando houver mudanca versionada.
- `Resultado geral` nao pode ser `Aprovado` se algum fluxo critico falhar.
- `Evidencia` deve apontar o que foi de fato observado, nao apenas a intencao do teste.
