# Service Order Staging Blockers

## Objetivo

Consolidar os bloqueios atuais que impedem a futura ativacao controlada do `shadow write` da `Service Order` em `staging`.

## Bloqueios confirmados

### 1. URL real de staging Netlify nao comprovada

- status: `RESOLVIDO_DOCUMENTALMENTE`
- evidencia: a URL `https://staging--lavaprime.netlify.app/` foi informada pelo usuario e validada no smoke remoto; o deploy publicado foi informado como `staging@cf2eb68`.
- risco: nenhum risco residual de prova de URL nesta etapa; o bloqueio remanescente agora e baseline antiga.
- proxima acao: manter a URL registrada e seguir para a promocao controlada da baseline `Service Order`.

### 2. Baseline remota de staging nao carrega a trilha atual de Service Order

- status: `BLOCKED`
- evidencia: `origin/staging` aponta para `cf2eb68`; os comandos `git merge-base --is-ancestor <commit> origin/staging` retornaram `false` para todos os commits `25569e8`, `802af1c`, `e135931`, `a119d9b`, `801e2ad`, `1e8e735`, `e471e91`, `c7dd0ba` e `6ee9773`.
- risco: mesmo que exista URL de staging, ela ainda nao prova a baseline atual da trilha de `Service Order`.
- proxima acao: confirmar a URL real e, em fase propria/autorizada, alinhar a branch remota de staging com a baseline correta antes do smoke remoto.

### 3. Supabase staging nao comprovado

- status: `BLOCKED`
- evidencia: `SERVICE_ORDER_SUPABASE_READINESS.md` confirma `supabaseTouched = false`, ausencia de migration e backend ainda fechado; `.env.example` contem apenas placeholders.
- risco: qualquer write futuro ficaria sem backend homologado e sem fronteira real de ambiente.
- proxima acao: abrir trilha propria para backend staging e provar envs, projeto e conectividade.

### 4. Migration real nao criada nem aprovada

- status: `BLOCKED`
- evidencia: existem apenas `SERVICE_ORDER_MIGRATION_DESIGN.md` e `SERVICE_ORDER_SUPABASE_SCHEMA_DRAFT.md`; `migrationRequired = true` continua valido.
- risco: o write nao teria schema oficial, rollback nem backfill aprovados.
- proxima acao: revisar schema, aprovar migration e definir estrategia de reversao.

### 5. RLS e tenant isolation nao implementados

- status: `BLOCKED`
- evidencia: os gates de `shadow write` continuam listando `rls-design-unavailable` e dependencia de isolamento por tenant.
- risco: write inseguro, mistura de organizacoes e quebra de seguranca.
- proxima acao: desenhar e aprovar o modelo de seguranca antes da fase de write.

### 6. Smoke remoto de staging nao executado

- status: `BLOCKED`
- evidencia: as fases anteriores validaram localmente e em browser embutido com limitacao de splash; nao existe evidencia remota oficial da URL de staging.
- risco: o primeiro write poderia acontecer sem prova de comportamento publicado.
- proxima acao: executar fase propria de smoke remoto assim que a URL de staging estiver comprovada.

### 7. Massa demo/teste ainda nao limpa para backend real

- status: `BLOCKED`
- evidencia: `DEMO_BOOTSTRAP` continua padrao e o clean dataset institucional segue em trilha futura; os docs de cleanup e handoff final mantem a dependencia da seed demo.
- risco: staging backend receber dados demo como se fossem base operacional real.
- proxima acao: separar dataset de homologacao e definir politica de backfill/seed institucional.

## Bloqueio resolvido documentalmente na LP-009

- `docs/primyo-deploy/NETLIFY_STAGING_TARGET_CONFIGURATION.md` foi recriado;
- o runbook local de target Netlify agora existe;
- isso remove o bloqueio de ausencia documental, mas nao remove o bloqueio de prova operacional da URL/alvo real.

## Leitura LP-010

- o caminho seguinte imediato continua `A`, porque a URL real de staging segue nao comprovada;
- o caminho `B` ja esta preparado documentalmente para a fase seguinte ao momento em que a URL existir, porque a baseline remota segue defasada.

## Leitura LP-DEPLOY-GOV-010

- a fase atual criou o runbook manual final para o usuario configurar `staging` no painel Netlify sem tocar em producao;
- o proximo desbloqueio esperado e trazer a URL real gerada pelo branch deploy;
- mesmo com a URL, a trilha atual de `Service Order` continuara bloqueada ate uma futura promocao controlada da baseline para `origin/staging`.

## Leitura LP-DEPLOY-GOV-011

- a URL real de staging foi comprovada;
- o smoke remoto basico foi executado com classificacao `partial`;
- o bloqueio principal remanescente agora e somente a defasagem da baseline `Service Order` em `origin/staging`.

## Leitura LP-SERVICE-ORDER-011

- a baseline local candidata `a3302df` foi auditada contra `origin/staging`;
- o diff ficou limpo de `app/styles.css`, `app/demo/**`, `scripts/**`, `package*.json`, `netlify.toml`, `.env*`, Android, FIPE e Supabase;
- o lock anterior em `dist/assets` nao reapareceu nesta rodada de validacao;
- `PROMOTION_READY = true`, mas o push continua bloqueado por governanca ate autorizacao explicita do usuario.

### 8. Push para `origin/staging` ainda nao autorizado nesta execucao

- status: `BLOCKED`
- evidencia: a fase atual nao recebeu autorizacao explicita para executar `git push origin HEAD:staging`
- risco: executar push automatico violaria a governanca e poderia publicar a baseline sem aprovacao formal do usuario
- proxima acao: repetir a fase com autorizacao explicita para push ou abrir fase curta apenas de execucao do push controlado

### 9. Lock em `dist/assets` nao e bloqueio atual

- status: `RESOLVED_IN_THIS_PHASE`
- evidencia: `npm.cmd run primyo:gate`, `npm.cmd run build` e `npm.cmd run verify:build` passaram em sequencia
- risco residual: OneDrive/Windows ainda pode reproduzir lock em outra execucao
- proxima acao: manter validacao sequencial antes do push e registrar qualquer recidiva operacional

## Regra final

Enquanto qualquer um dos bloqueios acima permanecer aberto:

- `READY_FOR_STAGING_SHADOW_WRITE = false`
- `shadowWrite.enabled` deve permanecer `false`
- `shadowWriteAdapter.mode` deve permanecer `disabled`
