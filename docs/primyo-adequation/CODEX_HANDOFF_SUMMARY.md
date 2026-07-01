# Codex Handoff Summary

## 1. Objetivo do programa

O `Primyo Transformation Program` transformou o LavaPrime Web em uma trilha controlada, documentada, auditavel e reversivel antes de qualquer abertura real de Supabase, banco, runtime limpo padrao ou Android nativo integrado.

## 2. Status final do programa

- estado atual: `handoff final consolidado`
- fase de encerramento: `documental final`
- percentual de encerramento da trilha Primyo Web atual: `100%` ate `LP-DOC-FINAL-001`
- observacao: `LP-WEB-DATA-CLEANUP-013` passa a ser trilha futura independente e nao bloqueio do encerramento documental do programa

## 3. Produto piloto

- produto piloto: `LavaPrime`

## 4. Branch atual

- branch atual validada: `primyo/onboarding`

## 5. Ultimo commit base conhecido antes do handoff final

- `4ba62b3` - `docs(primyo): plan clean bootstrap activation prerequisites`

## 6. Commits principais recentes

- `4ba62b3` - `docs(primyo): plan clean bootstrap activation prerequisites`
- `61bc141` - `docs(primyo): consolidate clean bootstrap blockers`
- `df6adec` - `test(primyo): confirm clean bootstrap diagnostics`
- `ad763a7` - `test(primyo): improve clean bootstrap observability`
- `16822bf` - `test(primyo): reassess clean bootstrap trial`
- `bc0f61f` - `refactor(primyo): harden clean bootstrap semantics`
- `1e308de` - `test(primyo): execute protected clean bootstrap trial`
- `8036415` - `refactor(primyo): prepare clean bootstrap trial`
- `08a81d6` - `refactor(primyo): extract demo data seed`
- `ea21a61` - `test(primyo): validate legacy customer data`
- `0ac89d6` - `feat(primyo): add customer adapter shadow read`

## 7. Estado do working tree

- working tree atual continua sujo apenas com itens fora de escopo da trilha Primyo Web:
  - `.gitignore`
  - `app/styles.css`
  - `LavaPrimeAndroidApp/**`
- nenhum desses itens deve entrar em commit Primyo Web sem fase dedicada;
- nenhum push foi executado nos commits Primyo Web desta trilha.

## 8. Status tecnico atual

### Adapters e gate

- adapters puros oficiais existentes:
  - `customerAdapter`
  - `vehicleAdapter`
  - `serviceAdapter`
  - `productAdapter`
  - `supplyAdapter`
- `adapterHelpers` oficial em `app/adapters/shared/adapterHelpers.js`
- `idResolver` puro existente em `app/adapters/shared/idResolver.js`
- Adapter Gate cobre adapters, helper compartilhado e `idResolver`
- `npm.cmd run primyo:gate`, `build` e `verify:build` seguem como pacote minimo oficial

### Runtime Web atual

- `customerAdapter` continua no runtime apenas em `shadow read`
- o legado continua fonte ativa
- `idResolver` continua fora do runtime funcional
- nenhuma integracao funcional de `vehicle`, `service`, `product` ou `supply` foi iniciada no runtime

### Demo seed e bootstrap

- a massa `demo/teste` principal permanece isolada em `app/demo/lavaprimeDemoData.js`
- `DEMO_BOOTSTRAP` continua o unico modo padrao oficial
- `CLEAN_BOOTSTRAP` continua protegido, observavel, auditavel e semanticamente reforcado
- o trial protegido foi executado e reavaliado
- os diagnosticos tecnicos possuem leitura oficial por `window` e por espelho DOM
- o espelho DOM permanece a evidencia mais estavel para automacao
- nenhuma seed demo foi removida

### CLEAN_BOOTSTRAP

- status atual: `protegido para estudo tecnico`
- nao autorizado como `default`
- bloqueios remanescentes ja convertidos em pre-requisitos formais de ativacao
- trilha futura recomendada: `LP-WEB-DATA-CLEANUP-013 - Institutional clean dataset strategy`

### Supabase

- status atual: `fechado`
- nenhuma integracao runtime foi iniciada
- qualquer abertura futura exige trilha propria

### Android

- status atual: `trilha propria`
- continua fora da governanca do commit Primyo Web, salvo documentacao explicitamente autorizada
- nao bloqueia o encerramento do programa Web

## 9. Validacoes e smoke esperados

- pacote tecnico oficial:
  - `node --check app/main.js`
  - `node --check app/demo/lavaprimeDemoData.js`
  - `node --check app/demo/lavaprimeBootstrapMode.js`
  - `node --check app/demo/lavaprimeCleanBootstrap.js`
  - `node scripts/primyo-adapter-gate.mjs`
  - `npm.cmd run primyo:gate`
  - `npm.cmd run build`
  - `npm.cmd run verify:build`
- smoke reduzido oficial:
  - app abre
  - login admin funciona
  - dashboard carrega
  - patio carrega
  - documentos e relatorios nao quebram
  - logout funciona
  - operador acessa patio
  - `DEMO_BOOTSTRAP` continua padrao
  - `CLEAN_BOOTSTRAP` nao vira `default`
- observacao operacional:
  - o build continua emitindo warning nao bloqueante de chunk acima de `500 kB`

## 10. Regras permanentes

- seguir `docs/primyo-adequation/EXECUTION_RULES.md`
- seguir `docs/primyo-adequation/LEAN_PROMPT_POLICY.md`
- seguir `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`
- seguir `docs/primyo-adequation/COMMIT_RULES.md`
- nao usar `git add .`
- nao fazer `git push` sem autorizacao explicita
- nao mexer em Android, CSS ou `.gitignore` sem fase especifica
- nao abrir Supabase sem decisao formal
- preservar staging seletivo, rollback e pacote de validacao oficial

## 11. Proximas trilhas futuras independentes

1. `LP-WEB-DATA-CLEANUP-013 - Institutional clean dataset strategy`
2. trilha oficial de `Supabase/backend real`
3. trilha oficial de `producao controlada Web`
4. trilha oficial de `LavaPrime Android nativo`
5. futura ativacao do `CLEAN_BOOTSTRAP`, somente apos todos os pre-requisitos
6. funcionalidades futuras `LPFR`, incluindo fidelidade, marketing automatizado e abertura/fechamento diario de caixa opcional

## 12. Instrucoes para novo chat Android

- abrir chat proprio para Android
- manter `LavaPrimeAndroidApp/**` fora dos commits Primyo Web
- validar Android com escopo e backlog proprios
- nao usar a trilha Web como autorizacao automatica para mudancas nativas

## 13. Instrucoes para futura trilha Supabase

- iniciar chat proprio para Supabase/backend
- manter claro se a fase sera apenas documental, de contrato, de bootstrap persistido ou de runtime real
- nao abrir Supabase por inferencia a partir da trilha de cleanup
- preservar rollback e pacote de validacao do Web antes de qualquer integracao

## 14. Instrucoes para futura trilha clean dataset

- `LP-WEB-DATA-CLEANUP-013` deve definir se a base limpa usara seed institucional controlada, dados reais minimos ou estrategia hibrida
- a trilha deve documentar composicao minima para dashboard, patio, financeiro, relatorios e documentos
- a trilha nao e bloqueio para o encerramento documental do programa
- `DEMO_BOOTSTRAP` deve continuar padrao ate decisao formal posterior

## 15. Riscos restantes

- dependencia comercial da seed demo continua ativa
- base limpa futura ainda indefinida
- relacionamentos persistidos reais ainda nao existem de forma suficiente para promover `CLEAN_BOOTSTRAP`
- pressao prematura para abrir Supabase ainda seria risco de escopo
- narrativa entre Web e Android pode divergir se as trilhas forem misturadas

## 16. Rollback geral

1. manter `DEMO_BOOTSTRAP` como unico padrao oficial
2. nao promover `CLEAN_BOOTSTRAP` sem change record, gate, smoke e decisao formal
3. manter seed demo ativa enquanto a trilha futura nao provar substituicao segura
4. reexecutar `primyo:gate`, `build`, `verify:build` e smoke reduzido apos qualquer reversao relevante
5. manter Supabase fechado ate trilha propria

## 17. Criterios para compactar novamente no futuro

- fase atual fechada
- closure criada quando aplicavel
- commit seletivo criado
- `npm.cmd run primyo:gate` aprovado
- sem staging pendente
- sem fase critica aberta
- handoff atualizado

## 18. Criterios para nao compactar

- working tree misturado com fase aberta
- commit pendente da fase atual
- gate falhando
- decisao arquitetural critica ainda aberta
- integracao com runtime, Supabase, Android ou banco em andamento
- arquivos staged ainda nao revisados
