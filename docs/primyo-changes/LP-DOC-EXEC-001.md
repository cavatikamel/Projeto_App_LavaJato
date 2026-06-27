# LP-DOC-EXEC-001

## Objetivo

Criar a base documental oficial do Primyo Lean Mode para reduzir repeticao de regras nos proximos prompts do Codex.

## Arquivos criados

- `docs/primyo-adequation/EXECUTION_RULES.md`
- `docs/primyo-adequation/LEAN_PROMPT_POLICY.md`
- `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`
- `docs/primyo-adequation/COMMIT_RULES.md`
- `docs/primyo-adequation/PHASE_TYPES.md`
- `docs/primyo-changes/LP-DOC-EXEC-001.md`

## Motivo do Lean Mode

A trilha Primyo Web ja consolidou adapters puros, helper comum, Adapter Gate, Primyo Gate, baseline, backlog, change control e commits seletivos.

O custo restante passou a ser repetir essas mesmas regras em prompts longos a cada nova fase.

Lean Mode existe para mover essas regras permanentes para documentos locais e permitir prompts menores, sem perder controle.

## Como isso reduz repeticao

- regras permanentes de execucao ficam centralizadas em um unico documento;
- politica de prompt curto fica explicita;
- formato padrao de resposta final deixa de precisar ser reescrito a cada fase;
- regras de commit seletivo ficam referenciaveis;
- tipos de fase passam a definir tamanho de prompt e baseline esperado.

## Garantias preservadas

- nenhum atalho perigoso foi autorizado;
- gate, build, verify, rollback e controle de escopo continuam obrigatorios quando aplicaveis;
- `git add .` continua proibido;
- `git push` continua proibido sem autorizacao;
- `app/main.js`, Android, CSS, Supabase, banco e dependencias permanecem protegidos por fase;
- riscos e working tree misturado continuam precisando ser declarados.

## Limitacoes

- Lean Mode reduz repeticao, mas nao substitui criterio tecnico;
- fases de alto risco ainda exigem prompt mais detalhado;
- os documentos novos nao encerram automaticamente fases ja abertas no working tree;
- prompts curtos continuam obrigados a declarar escopo permitido, escopo proibido e validacoes da fase corrente.

## Rollback

1. Remover os documentos novos de Lean Mode.
2. Reverter as atualizacoes documentais propagadas para backlog, change control, next slice e gate policy.
3. Reexecutar `npm.cmd run primyo:gate`.
4. Voltar a usar prompts completos ate nova consolidacao documental aprovada.

## Proxima fase recomendada

`LP-WEB-011`, agora em modo Lean, usando referencias documentais locais no lugar de repetir todo o baseline a cada prompt.
