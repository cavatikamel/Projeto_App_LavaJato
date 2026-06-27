# Primyo Commit Rules

## Objetivo

Consolidar as regras permanentes de commit seletivo da trilha Primyo.

## 1. Regras obrigatorias

- commits devem ser pequenos e coerentes por fase;
- staging deve ser seletivo por caminho explicito;
- nunca usar `git add .`;
- nao misturar fases diferentes no mesmo commit;
- nao incluir Android, CSS, `.gitignore` ou mudanca visual fora da fase autorizada;
- rodar validacoes obrigatorias antes do commit;
- nao fazer `git push` sem autorizacao explicita;
- nao usar rebase, stash, reset destrutivo ou troca de branch como atalho para limpar o estado.

## 2. Fluxo minimo de commit seletivo

1. rodar `git status --short`;
2. rodar `git diff --name-only`;
3. separar arquivos em:
   - entra no commit;
   - fica fora do commit;
   - revisar antes de decidir;
4. fazer `git add` apenas com caminhos explicitos;
5. conferir `git diff --cached --name-only`;
6. reexecutar validacoes da fase;
7. criar commit;
8. confirmar que nao houve push.

## 3. Itens que ficam fora por padrao

Sem autorizacao explicita, manter fora:

- `LavaPrimeAndroidApp/**`
- `app/styles.css`
- `.gitignore`
- qualquer ajuste visual
- qualquer arquivo sem relacao clara com a fase corrente

## 4. Validacoes antes do commit

O pacote minimo deve seguir a fase.

Para fatias web da trilha atual, o baseline normal continua sendo:

- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

Se a fase exigir `node --check` adicional ou Adapter Gate direto, isso tambem deve ser executado.

## 5. Formato minimo da resposta final de commit

A resposta final de commit deve informar:

1. branch atual;
2. arquivos staged no commit;
3. arquivos deixados fora;
4. validacoes executadas;
5. se o commit foi criado;
6. hash do commit;
7. mensagem do commit;
8. confirmacao de que nao houve push;
9. estado final do `git status`.

## 6. Exemplo de commit seletivo enxuto

```powershell
git status --short
git diff --name-only
git add app/adapters/productAdapter.js
git add scripts/primyo-adapter-gate.mjs scripts/primyo-gate.mjs
git add docs/primyo-changes/LP-WEB-010.md docs/primyo-changes/LP-WEB-010-CLOSURE.md
git add docs/primyo-baseline/BASELINE_SYSTEM_STATE.md docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md docs/primyo-baseline/BASELINE_EXECUTION_REPORT.md
git add docs/primyo-adequation/ADEQUATION_BACKLOG.md docs/primyo-adequation/CHANGE_CONTROL.md docs/primyo-adequation/NEXT_SLICE_DECISION.md
git add docs/primyo-web-contracts/WEB_ADAPTER_EXTRACTION_ORDER.md docs/primyo-web-contracts/WEB_CONTRACT_TEST_REQUIREMENTS.md
git add docs/primyo-tests/REGRESSION_MATRIX.md docs/primyo-tests/TEST_GATE_POLICY.md
git diff --cached --name-only
npm.cmd run primyo:gate
git commit -m "chore(primyo): add product adapter to adapter gate"
```

## 7. Regra de Lean Mode

Prompts futuros de commit nao precisam repetir toda esta politica.

Basta referenciar:

- `docs/primyo-adequation/EXECUTION_RULES.md`
- `docs/primyo-adequation/COMMIT_RULES.md`
- `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`
