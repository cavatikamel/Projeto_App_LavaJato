# Service Order Shadow Write Gate

## Objetivo

Definir a barreira tecnica obrigatoria antes de qualquer futura ativacao de `shadow write`.

## Estado na LP-SERVICE-ORDER-006

- `enabled = false`
- `canActivate = false`
- `allowedEnvironment = false`
- `supabaseTouched = false`
- `networkWriteAttempted = false`

## Campos principais do gate

- `environment`
- `allowedEnvironment`
- `hasValidatedStagingBranch`
- `hasStagingUrl`
- `hasSupabaseConfig`
- `hasApprovedMigration`
- `hasRlsDesign`
- `hasRollbackPlan`
- `hasExplicitUserApproval`
- `canActivate`
- `blockers`

## Bloqueios atuais esperados

- `environment-not-staging`
- `staging-branch-not-validated`
- `staging-url-unavailable`
- `supabase-staging-config-unavailable`
- `approved-migration-unavailable`
- `rls-design-unavailable`
- `rollback-plan-unavailable`
- `explicit-user-approval-missing`
- `phase-keeps-shadow-write-disabled`

## Regra critica

Mesmo que parte dos pre-requisitos futuros exista, o gate desta fase deve continuar negando ativacao.

Motivo:

- ainda nao ha backend staging aprovado;
- ainda nao ha migration validada;
- ainda nao ha RLS formal;
- ainda nao ha autorizacao para write real.
