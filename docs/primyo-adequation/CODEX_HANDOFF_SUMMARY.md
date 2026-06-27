# Codex Handoff Summary

## 1. Objetivo do programa

O `Primyo Transformation Program` existe para transformar o conhecimento operacional do LavaPrime em uma trilha controlada, documentada, auditavel e reversivel, reduzindo risco tecnico antes de qualquer integracao real com runtime, Supabase, Android ou banco.

## 2. Produto piloto

- Produto piloto: `LavaPrime`

## 3. Branch atual

- Branch esperada e validada nesta fase: `primyo/onboarding`

## 4. Ultimos commits relevantes

- `62c0c13` — web boundaries, adapters e regression gate
- `fc3d19a` — serviceAdapter
- `5a77ded` — shared adapter helpers
- `774958c` — productAdapter
- `a3f26fa` — Lean Mode (`docs(primyo): introduce lean execution mode`)
- `6052b1e` — supplyAdapter

## 5. Status tecnico atual

- adapters puros existentes:
  - `customerAdapter`
  - `vehicleAdapter`
  - `serviceAdapter`
  - `productAdapter`
  - `supplyAdapter`
- `adapterHelpers` oficial em `app/adapters/shared/adapterHelpers.js`
- Adapter Gate cobrindo cinco adapters puros
- `app/main.js` continua fora da trilha de adapters
- runtime ainda nao integrado aos adapters
- Supabase ainda nao conectado ao runtime

## 6. Regras permanentes

- seguir `docs/primyo-adequation/EXECUTION_RULES.md`
- seguir Lean Mode em `docs/primyo-adequation/LEAN_PROMPT_POLICY.md`
- nao usar `git add .`
- nao fazer `git push` sem autorizacao explicita
- nao mexer em Android, CSS ou `.gitignore` sem fase especifica
- nao abrir Supabase sem decisao formal
- preservar `primyo:gate`, build e verify quando aplicavel
- preservar rollback e staging seletivo

## 7. Fora de escopo atual

O working tree continua sujo apenas com itens fora da trilha Primyo Web atual:

- `.gitignore`
- `app/styles.css`
- `LavaPrimeAndroidApp/**`

Esses itens nao devem entrar em commits Primyo Web sem fase especifica.

## 8. Proxima decisao recomendada

- escolher entre `LP-DATA-006`, `LP-WEB-ID-RESOLVER-001` ou `LP-TEST-AUTO-004`
- nao integrar adapters ao runtime ainda
- nao abrir Supabase ainda
- manter `LP-DATA-006` como proxima fatia oficial ate nova decisao formal

## 9. Criterios para compactar novamente no futuro

- fase atual fechada
- closure criada
- commit seletivo criado
- `npm.cmd run primyo:gate` aprovado
- sem staging pendente
- sem fase critica aberta
- handoff atualizado

## 10. Criterios para nao compactar

- working tree misturado com fase aberta
- commit pendente da fase atual
- gate falhando
- decisao arquitetural critica ainda aberta
- integracao com runtime, Supabase, Android ou banco em andamento
- arquivos staged ainda nao revisados
