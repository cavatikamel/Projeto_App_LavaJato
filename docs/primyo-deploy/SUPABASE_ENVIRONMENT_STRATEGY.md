# Supabase Environment Strategy

## Objetivo

Definir a governanca conceitual de ambientes Supabase para o LavaPrime, sem abrir runtime nem alterar banco nesta fase.

## Estado atual

- Supabase continua fechado para o runtime Web
- `DEMO_BOOTSTRAP` continua padrao
- `CLEAN_BOOTSTRAP` continua protegido
- `.env.example` existe apenas como referencia de variaveis
- nenhuma credencial real foi auditada ou alterada nesta fase

## Separacao de ambientes

### Web staging

- futuro ambiente Supabase de homologacao
- deve usar chaves publicas proprias de staging
- nunca compartilhar banco ou segredos de producao

### Web production

- futuro ambiente Supabase de producao
- deve usar projeto, anon key e credenciais separados de staging
- qualquer abertura deve ocorrer em fase propria

### Android

- Android deve usar namespace de ambiente proprio
- nao deve compartilhar governanca operacional com o Web por inferencia
- abertura de Supabase no Android nao autoriza abertura no Web

## Variaveis encontradas como referencia

Frontend/publicas:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Server-side/administrativas:

- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_SERVICE_ROLE_KEY`

## Regras obrigatorias

- nao expor `SUPABASE_SERVICE_ROLE_KEY` no frontend
- nao reutilizar as mesmas credenciais entre staging e producao
- nao ligar o runtime Web a Supabase nesta fase
- nao alterar banco nesta fase
- nao registrar segredos em repositório

## Decisao desta fase

- Supabase continua fechado
- a governanca fica apenas documentada
- qualquer abertura futura precisa de trilha propria de staging antes de producao

## Recomendacao objetiva

Antes de qualquer uso real de Supabase no Web:

1. definir projeto staging
2. definir projeto production
3. definir dono das credenciais
4. definir checklist de abertura controlada
5. validar rollback
