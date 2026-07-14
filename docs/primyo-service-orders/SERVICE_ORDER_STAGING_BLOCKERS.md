# Service Order Staging Blockers

## Objetivo

Consolidar os bloqueios atuais que impedem a futura ativacao controlada do `shadow write` da `Service Order` em `staging`.

## Bloqueios confirmados

### 1. URL real de staging Netlify nao comprovada

- status: `BLOCKED`
- evidencia: o repositorio possui `origin/staging`, mas nao ha `.netlify/state.json`, nao ha Netlify CLI disponivel e nenhuma URL real foi comprovada por painel ou metadata local.
- risco: ativar o fluxo no site errado ou sem visibilidade de smoke remoto.
- proxima acao: identificar e registrar a URL real e o site/branch deploy oficial do Netlify staging.

### 2. Baseline remota de staging nao carrega a trilha atual de Service Order

- status: `BLOCKED`
- evidencia: `origin/staging` aponta para `cf2eb68`; `git merge-base --is-ancestor c7dd0ba origin/staging` e `git merge-base --is-ancestor e471e91 origin/staging` retornaram `false`.
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

## Regra final

Enquanto qualquer um dos bloqueios acima permanecer aberto:

- `READY_FOR_STAGING_SHADOW_WRITE = false`
- `shadowWrite.enabled` deve permanecer `false`
- `shadowWriteAdapter.mode` deve permanecer `disabled`
