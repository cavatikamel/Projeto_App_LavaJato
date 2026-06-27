# Primyo Lean Prompt Policy

## Objetivo

Definir como escrever prompts mais curtos sem perder qualidade, seguranca, rastreabilidade, gate, rollback ou controle de escopo.

## 1. Regra central

Prompts futuros devem referenciar documentos locais sempre que a regra ja estiver consolidada no repositorio.

Nao repetir no prompt aquilo que ja estiver estabilizado em:

- `docs/primyo-adequation/EXECUTION_RULES.md`
- `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`
- `docs/primyo-adequation/COMMIT_RULES.md`
- `docs/primyo-adequation/PHASE_TYPES.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

## 2. Tamanho recomendado por tipo de fase

- prompt grande: apenas para decisao arquitetural nova, fase critica, integracao arriscada, banco, Supabase, Android, autenticacao real ou rollout dificil;
- prompt medio: novo adapter, gate novo, helper novo, boundary nova, fase de implementacao controlada;
- prompt curto: closure, commit seletivo, documentacao, ajuste de backlog, baseline, policy ou next slice.

## 3. O que nunca pode ser cortado

- objetivo da fase;
- escopo permitido;
- escopo proibido;
- validacoes obrigatorias;
- criterio de aceite;
- riscos ou bloqueios conhecidos;
- regra de rollback quando houver alteracao tecnica;
- formato final de resposta quando a fase exigir.

## 4. Pacote minimo de referencia

### Para implementacao controlada

Referenciar:

- `docs/primyo-adequation/EXECUTION_RULES.md`
- `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`
- `docs/primyo-adequation/PHASE_TYPES.md`
- `docs/primyo-tests/TEST_GATE_POLICY.md`

### Para closure

Referenciar:

- `docs/primyo-adequation/EXECUTION_RULES.md`
- `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`
- `docs/primyo-adequation/PHASE_TYPES.md`

### Para commit seletivo

Referenciar:

- `docs/primyo-adequation/EXECUTION_RULES.md`
- `docs/primyo-adequation/COMMIT_RULES.md`
- `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`

### Para documentacao e governanca

Referenciar:

- `docs/primyo-adequation/EXECUTION_RULES.md`
- `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`
- `docs/primyo-adequation/PHASE_TYPES.md`

## 5. Exemplos de prompt curto

### 5.1 Prompt curto de adapter

```md
Usar:
- docs/primyo-adequation/EXECUTION_RULES.md
- docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md
- docs/primyo-adequation/PHASE_TYPES.md
- docs/primyo-tests/TEST_GATE_POLICY.md

Executar LP-WEB-XYZ.
Criar somente `app/adapters/exampleAdapter.js`.
Atualizar gate apenas se necessario.
Nao alterar `app/main.js`, runtime, Supabase, Android, CSS ou dependencias.
Rodar `npm.cmd run primyo:gate`, build e verify.
Responder no formato compacto padrao.
```

### 5.2 Prompt curto de closure

```md
Usar:
- docs/primyo-adequation/EXECUTION_RULES.md
- docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md
- docs/primyo-adequation/PHASE_TYPES.md

Encerrar formalmente LP-WEB-XYZ.
Atualizar baseline, backlog, change control e next slice.
Nao implementar nada novo.
Rodar as validacoes da fase e responder no formato compacto padrao.
```

### 5.3 Prompt curto de commit seletivo

```md
Usar:
- docs/primyo-adequation/EXECUTION_RULES.md
- docs/primyo-adequation/COMMIT_RULES.md
- docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md

Criar commit seletivo apenas da fase LP-WEB-XYZ.
Nao usar `git add .`
Nao fazer push.
Excluir Android, CSS e `.gitignore`, salvo autorizacao explicita.
Rodar validacoes antes do commit e responder com branch, arquivos, hash, mensagem, push e status final.
```

### 5.4 Prompt curto de documentacao

```md
Usar:
- docs/primyo-adequation/EXECUTION_RULES.md
- docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md
- docs/primyo-adequation/PHASE_TYPES.md

Executar fase documental LP-DOC-XYZ.
Criar apenas documentos em `docs/...`.
Nao alterar codigo, scripts, runtime, Supabase, Android, CSS ou dependencias.
Executar `git status --short`, `git diff --name-only` e `npm.cmd run primyo:gate`.
Responder de forma compacta.
```

## 6. Limite do Lean Mode

Lean Mode reduz repeticao.

Lean Mode nao autoriza:

- cortar validacao critica;
- omitir risco;
- omitir rollback;
- omitir restricao de escopo;
- improvisar atalho perigoso;
- pular aprovacao para push, Android, UI, banco ou Supabase.
