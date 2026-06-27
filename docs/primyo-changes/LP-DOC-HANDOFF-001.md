# LP-DOC-HANDOFF-001

## Objetivo

Criar um handoff seguro para permitir compactacao do chat do Codex sem perda do contexto critico da trilha Primyo no LavaPrime.

## Motivo

O historico da trilha ja acumulou closures, gates, adapters, commits seletivos e regras de Lean Mode suficientes para que a perda de contexto passe a ser um risco real de execucao.

Esta fase concentra o minimo necessario para reabrir o trabalho com seguranca, sem repetir toda a trilha no prompt seguinte.

## Arquivos criados

- `docs/primyo-adequation/CODEX_HANDOFF_SUMMARY.md`
- `docs/primyo-adequation/HANDOFF_COMPACTION_CHECKLIST.md`
- `docs/primyo-changes/LP-DOC-HANDOFF-001.md`
- `docs/primyo-changes/LP-DOC-HANDOFF-001-CLOSURE.md`

## Relacao com Lean Mode

- reaproveita as regras consolidadas em `EXECUTION_RULES.md`, `LEAN_PROMPT_POLICY.md`, `CODEX_RESPONSE_FORMAT.md`, `COMMIT_RULES.md` e `PHASE_TYPES.md`;
- reduz ainda mais a repeticao em novos chats ao explicitar branch, commits relevantes, fora de escopo e proxima decisao tecnica;
- preserva o modelo de prompt curto sem perder gate, rollback, controle de escopo ou staging seletivo.

## Protecao contra perda de contexto

- registra a branch esperada;
- registra os commits relevantes da trilha;
- registra o estado tecnico atual dos adapters e do Adapter Gate;
- registra o que esta fora de escopo no working tree;
- registra quando e seguro compactar e quando nao e.

## Limites

- esta fase nao altera codigo, scripts, runtime, `app/main.js`, Android, CSS, `.gitignore`, Supabase, banco, UI ou dependencias;
- esta fase nao inicia `LP-DATA-006`;
- esta fase nao faz push.

## Rollback

1. Remover `docs/primyo-adequation/CODEX_HANDOFF_SUMMARY.md`.
2. Remover `docs/primyo-adequation/HANDOFF_COMPACTION_CHECKLIST.md`.
3. Reverter `docs/primyo-changes/LP-DOC-HANDOFF-001.md` e `docs/primyo-changes/LP-DOC-HANDOFF-001-CLOSURE.md`.
4. Reverter eventuais atualizacoes documentais em backlog e change control.
5. Reexecutar `git status --short`, `git log --oneline -n 12` e `npm.cmd run primyo:gate`.
