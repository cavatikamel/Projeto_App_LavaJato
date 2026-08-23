# Service Order Staging Activation Checklist

## Objetivo

Registrar a checklist minima antes de qualquer futura ativacao real de `shadow write` em homologacao.

## Checklist minima

- URL real de staging Netlify confirmada;
- branch `staging` validada;
- Supabase staging criado;
- migrations aprovadas;
- RLS e isolamento por tenant definidos;
- variaveis por ambiente separadas;
- `service role` nunca exposta no frontend;
- rollback documentado;
- logs de `shadow write` definidos;
- volume inicial limitado;
- dry-run local validado;
- rehearsal local validado;
- dual read planejado;
- producao protegida;
- autorizacao explicita do usuario.

## Regra

Sem todos os itens acima, `canActivate` deve continuar `false`.

## Atualizacao LP-SERVICE-ORDER-008

Estado auditado nesta fase:

- branch local `staging`: existente;
- `origin/staging`: existente em `cf2eb68`;
- URL real de staging Netlify: nao comprovada;
- alvo operacional Netlify staging: nao comprovado;
- `.netlify/state.json`: ausente;
- Supabase staging: nao comprovado;
- migration aprovada: ausente;
- `RLS` e isolamento por tenant: nao implementados;
- smoke remoto de staging: ausente;
- base demo/teste para backend real: ainda nao limpa.

Conclusao:

- a checklist continua incompleta;
- `READY_FOR_STAGING_SHADOW_WRITE` permanece `false`.

## Atualizacao LP-SERVICE-ORDER-009

Estado auditado nesta fase:

- branch local `staging`: existente;
- `origin/staging`: existente em `cf2eb68`;
- `origin/main`: separado em `c040408`;
- `docs/primyo-deploy/NETLIFY_STAGING_TARGET_CONFIGURATION.md`: agora existe;
- `.netlify/state.json`: ausente;
- Netlify CLI: indisponivel no ambiente local auditado;
- URL real de staging Netlify: nao comprovada;
- alvo operacional Netlify staging: nao comprovado;
- baseline atual da trilha `Service Order` em `origin/staging`: nao comprovada;
- Supabase staging: nao comprovado;
- migration aprovada: ausente;
- `RLS` e isolamento por tenant: nao implementados;
- smoke remoto de staging: ausente;
- base demo/teste para backend real: ainda nao limpa.

Conclusao:

- a checklist continua incompleta;
- `NETLIFY_STAGING_URL_PROVEN = false`;
- `READY_FOR_STAGING_SHADOW_WRITE` permanece `false`.

## Atualizacao LP-SERVICE-ORDER-010

Estado auditado nesta fase:

- `origin/staging`: confirmado em `cf2eb68`;
- `origin/main`: confirmado em `c040408`;
- commits `25569e8`, `802af1c`, `e135931`, `a119d9b`, `801e2ad`, `1e8e735`, `e471e91`, `c7dd0ba` e `6ee9773`: ausentes de `origin/staging`;
- `.netlify/state.json`: ausente;
- Netlify CLI: indisponivel;
- URL real de staging Netlify: nao comprovada;
- smoke remoto publicado: nao executado;
- baseline atual da trilha `Service Order` em staging remoto: nao comprovada.

Conclusao:

- `NETLIFY_STAGING_URL_PROVEN = false`;
- `STAGING_CONTAINS_SERVICE_ORDER_CURRENT_BASELINE = false`;
- `READY_FOR_STAGING_SHADOW_WRITE` permanece `false`.

## Atualizacao LP-DEPLOY-GOV-010

Estado operacional apos a criacao do guia manual:

- existe runbook explicito para habilitar `staging` como branch deploy no painel Netlify;
- a configuracao recomendada imediata e `Opcao A - Branch deploy no mesmo site`;
- `Production branch` deve permanecer `main`;
- o usuario deve trazer URL real, branch, commit, status e horario do deploy antes do smoke remoto;
- a baseline atual de `Service Order` continua fora de `origin/staging`.

Conclusao:

- o checklist segue incompleto;
- `NETLIFY_STAGING_URL_PROVEN = false`;
- `STAGING_CONTAINS_SERVICE_ORDER_CURRENT_BASELINE = false`;
- `READY_FOR_STAGING_SHADOW_WRITE` permanece `false`.
