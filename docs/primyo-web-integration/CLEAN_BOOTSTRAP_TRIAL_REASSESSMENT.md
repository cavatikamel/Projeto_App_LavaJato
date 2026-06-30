# Clean Bootstrap Trial Reassessment

## Objetivo

Registrar a reavaliacao do trial protegido do `CLEAN_BOOTSTRAP` apos o hardening semantico aplicado em `LP-WEB-DATA-CLEANUP-007`.

## Referencia anterior

Em `LP-WEB-DATA-CLEANUP-006`, o trial protegido registrava as seguintes superficies ainda inseguras:

- `dashboard`
- `patio`
- `reports`
- `documents`
- `customerVehicleBillingLinks`

Total anterior:

- `previousUnsafeSurfaceCount`: `5`

## Estado apos o hardening semantico

As cinco superficies acima passaram a contar com fallback semantico adicional:

- `dashboard` agora agrega metricas com normalizacao finita;
- `patio` agora degrada melhor relacoes de proprietario e cliente;
- `reports` agora normaliza linhas e tolera melhor colecoes vazias;
- `documents` agora resolve cliente, telefone e vencimento com fallback seguro;
- `customerVehicleBillingLinks` agora usa degradacao mais segura para vinculos cruzados.

## Resultado da reavaliacao

### Superficies melhoradas

- `dashboard`
- `patio`
- `reports`
- `documents`
- `customerVehicleBillingLinks`

### Superficies ainda inseguras para o trial protegido

- nenhuma

Total atual esperado:

- `currentUnsafeSurfaceCount`: `0`
- `improvedSurfaceCount`: `5`

## O que melhorou

- o trial protegido passa a ser mais viavel como diagnostico interno;
- a trilha deixa de apontar bloqueios semanticos imediatos nas superficies criticas;
- a comparacao entre antes e depois passa a ficar explicita nos objetos internos de diagnostico.

## O que continua bloqueado

Mesmo com `0` superficies inseguras para o trial protegido:

- `CLEAN_BOOTSTRAP` continua sem massa limpa suficiente para ser um `default` util;
- os relacionamentos cross-domain continuam fallback-based, nao persistidos;
- a observabilidade no browser continua limitada, porque os objetos globais internos nao apareceram na inspecao visual anterior;
- `DEMO_BOOTSTRAP` continua como unica origem funcional segura.

## Evidencia operacional

- o smoke manual continuou carregando `Visao Geral`, `Cadastros > Clientes`, `Patio de Atendimento`, `Fluxo de caixa` e `Recibos e Documentos` para admin;
- o patio do operador continuou carregando com `carlos`;
- o console do browser permaneceu sem erro bloqueante;
- a inspecao visual do browser continuou sem expor `window.__lavaprimeCleanBootstrapReadiness`, `window.__lavaprimeCleanBootstrapTrialReadiness` e `window.__lavaprimeCleanBootstrapTrialExecution`, reforcando a necessidade de uma microfase de observabilidade.

## Decisao

- o trial protegido ficou mais seguro;
- a promocao de `CLEAN_BOOTSTRAP` a `default` continua bloqueada;
- nenhuma seed demo pode ser removida nesta fase;
- a proxima fatia segura deve reforcar observabilidade e evidencia do trial, nao promocao funcional.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-009 - Protected clean bootstrap trial observability review`

Objetivo sugerido:

- melhorar a confirmacao pratica dos diagnosticos internos;
- registrar evidencias mais confiaveis do trial no browser/runtime sem trocar o modo padrao;
- continuar sem Supabase e sem remocao de seed demo.

## Rollback

1. reverter `app/main.js` se o diagnostico desta reavaliacao tiver sido ajustado;
2. reverter este registro documental;
3. reexecutar gate, build, verify e smoke rapido.
