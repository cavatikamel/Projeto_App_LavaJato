# Supabase

Esta pasta guarda a base versionada do backend planejado para o LavaPrime.

## O que existe aqui

- `migrations/` com o schema inicial do banco
- politicas de RLS
- funcoes utilitarias para perfil, organizacao e `updated_at`

## Como usar

1. Criar o projeto no Supabase.
2. Aplicar a migration inicial desta pasta.
3. Criar os buckets descritos em `docs/SUPABASE_BACKEND.md`.
4. Configurar as variaveis de ambiente em `.env` e na hospedagem.
5. So depois conectar a aplicacao web ao Supabase.

## Importante

- o frontend atual ainda funciona com dados locais
- esta estrutura deixa o repositorio pronto para migrar para backend real sem perder historico
- nunca publique `SUPABASE_SERVICE_ROLE_KEY` no frontend
