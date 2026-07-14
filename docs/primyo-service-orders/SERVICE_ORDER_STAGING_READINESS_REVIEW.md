# Service Order Staging Readiness Review

## Objetivo

Auditar se o projeto esta pronto para uma futura ativacao controlada do `shadow write` da `Service Order` em `staging`, sem tocar runtime, Supabase, Netlify ou producao.

## Decisao obrigatoria

`READY_FOR_STAGING_SHADOW_WRITE = false`

Motivo: os pre-requisitos externos de homologacao, backend staging, migration aprovada, seguranca multi-tenant e smoke remoto ainda nao estao comprovados em conjunto.

## Matriz de readiness

| Bloco | Status | Evidencia | Risco | Proxima acao |
| --- | --- | --- | --- | --- |
| Netlify staging readiness | `PARTIAL` | `origin/staging` existe em `cf2eb68`; branch local `staging` existe; `netlify.toml` confirma `build = npm run build` e `publish = dist`; `.netlify/state.json` esta ausente; a URL real de staging nao foi comprovada; `docs/primyo-deploy/NETLIFY_STAGING_TARGET_CONFIGURATION.md` nao existe no workspace. | O shadow write nao pode ser liberado sem saber qual URL, site ou branch deploy realmente representa a homologacao. | Confirmar a URL real de staging no Netlify e registrar o alvo oficial da branch `staging`. |
| Supabase staging readiness | `BLOCKED` | `SERVICE_ORDER_SUPABASE_READINESS.md` confirma `supabaseTouched = false`, `readyForSupabaseWrite = false` e ausencia de migration; `.env.example` so traz placeholders; nao ha prova de projeto Supabase staging configurado. | Qualquer tentativa futura de write ficaria sem backend homologado, sem isolamento por ambiente e sem base auditavel. | Criar trilha propria de backend staging e comprovar projeto, envs e conectividade sem abrir write no frontend. |
| Migration readiness | `BLOCKED` | `SERVICE_ORDER_SUPABASE_SCHEMA_DRAFT.md` e `SERVICE_ORDER_MIGRATION_DESIGN.md` sao apenas rascunhos documentais; `migrationRequired = true` continua exposto nos docs/diagnosticos; nenhuma migration real foi criada ou aprovada. | Nao existe schema homologado para receber `service_orders`, snapshots, payments, documents e events com seguranca. | Abrir fase propria de migration design review, aprovar schema e definir estrategia de backfill/rollback antes de qualquer write. |
| Shadow write adapter readiness | `PARTIAL` | LP-006 e LP-007 deixaram `shadowWriteAdapter.mode = disabled`, `canActivate = false`, `supabaseTouched = false`, `networkWriteAttempted = false`; o rehearsal local comprovou bloqueio e payload validation. | A arquitetura interna esta pronta para ensaio, mas nao para ativacao real em staging. | Manter adapter inerte e usar a proxima fase apenas para provar ambiente externo e criterios de liberacao. |
| Security readiness | `BLOCKED` | `SERVICE_ORDER_STAGING_ACTIVATION_GATE.md` e `SERVICE_ORDER_SHADOW_WRITE_GATE.md` ainda listam `RLS`, isolamento por tenant, separacao de envs e `service role` fora do frontend como pendencias. | Sem RLS e tenant isolation, qualquer write de homologacao carregaria risco de vazamento, mistura de tenants ou desenho inseguro. | Formalizar RLS, tenancy e fronteiras de credencial em fase propria de seguranca/backend. |
| Data readiness | `BLOCKED` | O handoff final e os docs de cleanup ainda mantem `DEMO_BOOTSTRAP` como padrao; a base demo/teste continua ativa; o backlog de clean dataset institucional continua futuro; nao ha limpeza comprovada para backend real. | O shadow write em staging poderia consolidar dados demo misturados como se fossem base real. | Definir estrategia de dataset staging, limpar a massa demo para backend real e planejar backfill controlado do legado. |
| Operation readiness | `PARTIAL` | Existem checklist, rollback e governanca de branch; `origin/staging` e `main` estao separados; porem o smoke remoto de staging nao foi executado e a evidencia oficial de URL/target Netlify segue ausente. | Sem runbook operacional fechado, uma ativacao futura pode acontecer no ambiente errado ou sem evidencia de rollback. | Fechar guia operacional do alvo `staging`, registrar URL, donos, passos de smoke remoto e criterio formal de rollback. |

## Leitura consolidada

- a readiness atual e suficiente para revisao tecnica local e documental;
- a readiness atual nao e suficiente para ativacao controlada em `staging`;
- o principal gargalo deixou de ser o adapter e passou a ser a prova externa de ambiente, backend e seguranca.

## Bloqueios centrais desta fase

1. a URL real de staging Netlify ainda nao foi comprovada;
2. `docs/primyo-deploy/NETLIFY_STAGING_TARGET_CONFIGURATION.md` nao existe no workspace;
3. Supabase staging ainda nao foi configurado ou comprovado;
4. nenhuma migration real foi criada ou aprovada;
5. `RLS` e isolamento por tenant seguem apenas desenhados;
6. o smoke remoto de staging ainda nao foi executado;
7. a base demo/teste ainda nao foi limpa para backend real.

## Regra de liberacao

Sem evidencia positiva para todos os blocos acima, a decisao continua:

`READY_FOR_STAGING_SHADOW_WRITE = false`
