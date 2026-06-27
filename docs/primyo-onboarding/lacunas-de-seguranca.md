# Lacunas de Seguranca

## Lacunas observadas

1. A superficie web observada nao usa autenticacao real conectada ao backend.
2. Credenciais/demo login aparecem no codigo observado.
3. Nao foi observada estrategia formal de gestao de secrets alem das variaveis previstas.
4. Nao foi observada politica operacional de rotacao de credenciais, auditoria de acesso ou resposta a incidente.
5. O modelo de roles mais completo existe no Supabase planejado, mas nao foi observado como enforce real no frontend atual.
6. O produto web atual depende fortemente de estado local, o que reduz trilha centralizada de auditoria.
7. O Android desabilita backup, mas ainda nao apresenta estrategia documentada de recovery e sincronizacao remota efetiva.

## Controles positivos observados

- `netlify.toml` define CSP e headers basicos de seguranca
- o schema Supabase planejado cita RLS e separacao multi-tenant
- o Android declara somente as permissoes de rede estritamente necessarias lidas no manifest
