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
