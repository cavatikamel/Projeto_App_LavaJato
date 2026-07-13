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
