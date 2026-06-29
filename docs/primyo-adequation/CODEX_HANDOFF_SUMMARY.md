# Codex Handoff Summary

## 1. Objetivo do programa

O `Primyo Transformation Program` existe para transformar o conhecimento operacional do LavaPrime em uma trilha controlada, documentada, auditavel e reversivel, reduzindo risco tecnico antes de qualquer integracao real com runtime, Supabase, Android ou banco.

## 2. Produto piloto

- Produto piloto: `LavaPrime`

## 3. Branch atual

- Branch atual validada: `primyo/onboarding`

## 4. Ultimo commit

- `4e868ff` — `feat(primyo): add customer shadow diagnostics`

## 5. Ultimos commits relevantes

- `6a7063b` — `chore(primyo): add pure id resolver foundation`
- `b936250` — `docs(primyo): align web contract resolver test requirements`
- `ae59d49` — `test(primyo): harden id resolver regression gate`
- `2a6548e` — `docs(primyo): assess runtime integration readiness`
- `0ac89d6` — `feat(primyo): add customer adapter shadow read`
- `4e868ff` — `feat(primyo): add customer shadow diagnostics`

## 6. Status do working tree

- Working tree atual continua sujo apenas com itens fora de escopo da trilha Primyo Web:
  - `.gitignore`
  - `app/styles.css`
  - `LavaPrimeAndroidApp/**`
- nenhum desses itens deve entrar em commit Primyo Web sem fase dedicada;
- nao ha push executado apos os commits acima.

## 7. Status tecnico atual

- adapters puros existentes:
  - `customerAdapter`
  - `vehicleAdapter`
  - `serviceAdapter`
  - `productAdapter`
  - `supplyAdapter`
- `adapterHelpers` oficial em `app/adapters/shared/adapterHelpers.js`
- `idResolver` puro existente em `app/adapters/shared/idResolver.js`
- Adapter Gate reforcado e validando cinco adapters, helper compartilhado e `idResolver`
- `customerAdapter` ja foi integrado ao runtime apenas em `shadow read`
- `Customer Shadow Read Diagnostics` ja foi implementado em `app/main.js`
- o legado continua fonte ativa de renderizacao e salvamento
- `idResolver` continua fora do runtime
- Supabase continua fechado
- Android continua fora da trilha atual

## 8. Validacoes recentes

- `npm.cmd run primyo:gate` -> aprovado
- `npm.cmd run build` -> aprovado
- `npm.cmd run verify:build` -> aprovado
- observacao operacional: o build continua podendo emitir o warning nao bloqueante de chunk acima de `500 kB`

## 9. Regras permanentes

- seguir `docs/primyo-adequation/EXECUTION_RULES.md`
- seguir Lean Mode em `docs/primyo-adequation/LEAN_PROMPT_POLICY.md`
- nao usar `git add .`
- nao fazer `git push` sem autorizacao explicita
- nao mexer em Android, CSS ou `.gitignore` sem fase especifica
- nao abrir Supabase sem decisao formal
- preservar `primyo:gate`, build e verify quando aplicavel
- preservar rollback e staging seletivo

## 10. Proxima decisao recomendada

- o documento formal `docs/primyo-adequation/NEXT_SLICE_DECISION.md` ainda aponta para `LP-WEB-INTEGRATION-002-CLOSURE`
- essa closure ja foi executada e commitada em `4e868ff`
- portanto, a proxima conversa deve abrir uma nova fase curta para atualizar formalmente a decisao da proxima fatia antes de qualquer nova integracao
- direcao conservadora atual:
  - nao expandir `customerAdapter` no runtime ainda
  - nao integrar `idResolver` ao runtime ainda
  - nao abrir Supabase ainda

## 11. Criterios para compactar novamente no futuro

- fase atual fechada
- closure criada quando aplicavel
- commit seletivo criado
- `npm.cmd run primyo:gate` aprovado
- sem staging pendente
- sem fase critica aberta
- handoff atualizado

## 12. Criterios para nao compactar

- working tree misturado com fase aberta
- commit pendente da fase atual
- gate falhando
- decisao arquitetural critica ainda aberta
- integracao com runtime, Supabase, Android ou banco em andamento
- arquivos staged ainda nao revisados
