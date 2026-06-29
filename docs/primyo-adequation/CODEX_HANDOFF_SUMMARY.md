# Codex Handoff Summary

## 1. Objetivo do programa

O `Primyo Transformation Program` existe para transformar o conhecimento operacional do LavaPrime em uma trilha controlada, documentada, auditavel e reversivel, reduzindo risco tecnico antes de qualquer integracao real com runtime, Supabase, Android ou banco.

## 2. Produto piloto

- Produto piloto: `LavaPrime`

## 3. Branch atual

- Branch atual validada: `primyo/onboarding`

## 4. Ultimo commit

- `ea21a61` - `test(primyo): validate legacy customer data`

## 5. Ultimos commits relevantes

- `08a81d6` - `refactor(primyo): extract demo data seed`
- `ea21a61` - `test(primyo): validate legacy customer data`
- `9c52840` - `docs(primyo): review customer shadow coverage`
- `41cb954` - `docs(primyo): update next slice decision`
- `1fc6a21` - `docs(primyo): update codex handoff summary`
- `4e868ff` - `feat(primyo): add customer shadow diagnostics`
- `0ac89d6` - `feat(primyo): add customer adapter shadow read`

## 6. Status do working tree

- Working tree atual continua sujo apenas com itens fora de escopo da trilha Primyo Web:
  - `.gitignore`
  - `app/styles.css`
  - `LavaPrimeAndroidApp/**`
- nenhum desses itens deve entrar em commit Primyo Web sem fase dedicada;
- nenhum push foi executado apos os commits recentes acima.

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
- `customerAdapter` segue integrado ao runtime apenas em `shadow read`
- `Customer Shadow Read Diagnostics` segue implementado em `app/main.js`
- `LP-WEB-INTEGRATION-004` foi encerrada separadamente:
  - objetivo: validar dados legados de clientes antes de ampliar `Customer Shadow Read`
  - arquivos principais: `app/adapters/customerAdapter.js`, `scripts/primyo-adapter-gate.mjs` e `docs/primyo-web-integration/CUSTOMER_LEGACY_DATA_VALIDATION.md`
  - `customerAdapter` nao virou fonte ativa
  - `idResolver` continua fora do runtime
  - o legado continua fonte ativa
  - Supabase continua fechado
- `LP-WEB-DATA-CLEANUP-001` foi aceita como fase valida separada:
  - nasceu como desvio de escopo controlado
  - isolou a massa demo hardcoded em `app/demo/lavaprimeDemoData.js`
  - `app/main.js` passou a consumir o modulo demo dedicado
  - nenhuma seed foi removida
  - comportamento visual e funcional foi preservado
  - Supabase continua fechado

## 8. Validacoes recentes

- `npm.cmd run primyo:gate` -> aprovado
- `npm.cmd run build` -> aprovado
- `npm.cmd run verify:build` -> aprovado
- observacao operacional: o build continua emitindo o warning nao bloqueante de chunk acima de `500 kB`

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

- proxima decisao sugerida: `LP-WEB-DATA-CLEANUP-002 - Segregacao entre bootstrap demo e bootstrap limpo`
- nao iniciar automaticamente;
- a proxima fatia deve ser pequena, reversivel e sem Supabase;
- nao remover massa demo sem alternativa segura para renderizacao e smoke;
- manter o fluxo legado funcionando;
- manter Android, CSS e `.gitignore` fora.

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
