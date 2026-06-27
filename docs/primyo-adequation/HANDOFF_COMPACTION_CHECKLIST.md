# Handoff Compaction Checklist

## Pode compactar quando

- [ ] fase fechada
- [ ] closure criada
- [ ] commit seletivo feito
- [ ] gate, build e verify passando quando aplicavel
- [ ] sem fase critica aberta
- [ ] sem conflito ativo
- [ ] sem staging pendente
- [ ] proxima fase ainda nao iniciada
- [ ] handoff atualizado

## Nao compactar quando

- [ ] working tree misturado com fase aberta
- [ ] commit pendente
- [ ] gate falhando
- [ ] decisao arquitetural pendente
- [ ] Supabase ou integracao em andamento
- [ ] Android, CSS ou `.gitignore` misturados com a trilha web
- [ ] Codex ainda executando algo
- [ ] arquivos staged nao revisados

## Antes de compactar

- [ ] rodar `git status --short`
- [ ] rodar `git log --oneline -n 12`
- [ ] rodar `npm.cmd run primyo:gate`
- [ ] confirmar os ultimos commits relevantes
- [ ] confirmar os arquivos fora de escopo atuais
- [ ] atualizar `docs/primyo-adequation/CODEX_HANDOFF_SUMMARY.md` se necessario

## Depois de compactar

- [ ] iniciar o novo chat lendo `docs/primyo-adequation/CODEX_HANDOFF_SUMMARY.md`
- [ ] reler `docs/primyo-adequation/EXECUTION_RULES.md`
- [ ] reler `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- [ ] nao executar nada antes de confirmar branch, working tree e proxima fase oficial
