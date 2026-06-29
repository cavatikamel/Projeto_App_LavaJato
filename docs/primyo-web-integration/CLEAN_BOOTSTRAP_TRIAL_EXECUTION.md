# Clean Bootstrap Trial Execution

## Objetivo

Registrar a execucao protegida do trial tecnico do `CLEAN_BOOTSTRAP`, sem troca de modo padrao e sem impacto funcional no LavaPrime Web.

## Estado atual

- modo padrao: `DEMO_BOOTSTRAP`;
- modo limpo: `CLEAN_BOOTSTRAP`;
- trial protegido: executado apenas como diagnostico em memoria;
- `CLEAN_BOOTSTRAP` ativado como default: nao;
- `CLEAN_BOOTSTRAP` ativado funcionalmente no runtime: nao;
- Supabase: fechado;
- seed demo: mantida.

## Diagnostico tecnico

Objeto global previsto:

- `window.__lavaprimeCleanBootstrapTrialExecution`

Garantias:

- somente leitura;
- silencioso;
- em memoria;
- sem troca de modo;
- sem persistencia;
- sem telemetria externa;
- sem alterar UI;
- sem alterar autenticacao, permissoes ou salvamento.

## Leitura consolidada do trial

### Superficies que passam com fallback estrutural

- `dashboard`
- `clients`
- `vehicles`
- `patio`
- `financial`
- `invoices`
- `reports`
- `documents`

### Superficies ainda inseguras para promocao

- `dashboard`
- `patio`
- `reports`
- `documents`
- `customerVehicleBillingLinks`

### Resultado resumido

- `fallbackCoverageCount`: `8`
- `unsafeSurfaceCount`: `5`
- `cleanBootstrapEvaluatedOnly`: `true`
- `cleanBootstrapActivatedInRuntime`: `false`
- `cleanBootstrapActivatedAsDefault`: `false`

## Observacao operacional

- o browser manteve o comportamento padrao em `DEMO_BOOTSTRAP`;
- o console permaneceu sem erro bloqueante;
- a inspecao visual do browser nao expôs os objetos globais tecnicos de readiness/trial, entao a leitura operacional continua dependente do codigo e da documentacao, nao de um painel visual.

## Decisao

- o trial protegido foi executado apenas como comparacao tecnica;
- `CLEAN_BOOTSTRAP` continua proibido como default;
- nenhuma seed demo pode ser removida ainda;
- a proxima etapa segura deve atacar somente os bloqueios semanticos remanescentes.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-007 - Targeted semantic hardening after protected clean bootstrap trial`

Objetivo sugerido:

- reduzir dependencias semanticas residuais de `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks`;
- manter `DEMO_BOOTSTRAP` como default;
- continuar sem Supabase e sem remocao de seed demo.
