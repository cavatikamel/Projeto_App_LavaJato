# Changelog

## 2026-07-13

- removidas credenciais fixas do codigo: o gate de login passa a ler `VITE_LOGIN_USERNAME`/`VITE_LOGIN_PASSWORD` do build; sem essas variaveis o login fica desativado
- documentadas as novas variaveis de login em `.env.example`
- senha de operador nao e mais armazenada nem exibida em texto claro (campo agora usa `type="password"`, so registra que uma credencial foi definida)
- corrigidas 4 injecoes de HTML (XSS) em `app/main.js`: nome do cliente, nome do servico e dono/servico do veiculo passam por `escapeHtml`
- corrigido e ampliado o conjunto de testes (`app/dashboard`, `app/utils`, `app/boundaries`) e adicionada a execucao de `npm test` no GitHub Actions

## 2026-06-14

- corrigida a publicacao web para copiar `app/assets/` no build do Vite e evitar 404 na Netlify
- adicionada verificacao automatica de artefatos criticos em `scripts/verify-build-artifacts.mjs`
- adicionados `netlify.toml`, `.env.example` e checklist de deploy
- corrigidos textos corrompidos no bootstrap legado que apareciam na interface publicada
- adicionada a base versionada do backend no Supabase com migration inicial, RLS e documentacao
- migrada a aplicacao web para uma base React + Vite sem remover a logica funcional existente
- preservada a marcacao atual em `app/legacy-body.html` para manter compatibilidade durante a transicao
- adicionado shell React em `app/src/` para inicializar o app legado com build moderno
- atualizado o `Dockerfile` para buildar com Node e publicar `dist/` no Nginx
- ampliada a validacao do GitHub Actions com `npm ci` e `npm run build`
- atualizada a documentacao de arquitetura, desenvolvimento e status do projeto

## 2026-06-07

- consolidada a configuracao do repositorio principal `Projeto_App_LavaJato`
- `LavaPrime/` removido do escopo de versionamento deste repositorio
- documentada a arquitetura estatica com Nginx e Docker
- documentados os modulos principais do app e a estrutura de pastas
- registrado o fluxo recomendado para versionamento e publicacao
- adicionada documentacao de handoff, arquitetura, desenvolvimento, status e decisoes
- adicionada validacao automatica no GitHub Actions
- adicionados templates basicos para pull request e bug report
