# Service Order Staging Activation Gate

## Objetivo

Definir o caminho minimo e seguro para uma futura ativacao de `shadow write` apenas em homologacao.

## Condicoes obrigatorias antes de qualquer ativacao

- branch `staging` validada;
- URL de staging real existente;
- Supabase staging criado;
- migrations aprovadas;
- RLS e isolamento por tenant documentados;
- `service role` fora do frontend;
- variaveis separadas por ambiente;
- rollback definido;
- diagnosticos ativos;
- autorizacao explicita do usuario;
- producao protegida.

## Ordem recomendada

1. validar branch e URL de staging;
2. validar schema e migrations em fase propria;
3. validar gate tecnico do adapter;
4. liberar write para poucos registros em staging;
5. comparar legado x `shadow write`;
6. registrar rollback e evidencias;
7. so depois discutir ampliacao.

## O que continua proibido nesta fase

- qualquer write em producao;
- qualquer write sem staging validado;
- qualquer write sem migration aprovada;
- qualquer write sem rollback;
- qualquer write sem autorizacao explicita do usuario.
