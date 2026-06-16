# Changelog

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

## 2026-06-15

- iniciada a primeira integracao real do frontend com Supabase para login por email e sincronizacao do estado do app por organizacao
- adicionada migration `organization_app_states` para armazenar o snapshot operacional do LavaPrime por empresa
- adicionado script `bootstrap:test-user` para criar ou resetar o usuario `Teste` com base vazia
- ampliado `.env.example` com variaveis do bootstrap do ambiente de teste
- documentado o fluxo de teste local com Supabase em `docs/TESTING.md`
- bloqueado o login por email no modo local para evitar abrir a base ficticia quando o Supabase nao estiver configurado
- ajustada a configuracao do Vite para ler o `.env.local` na pasta principal do projeto
- iniciada a Fase A de estabilizacao do legado com persistencia local do workspace operacional e marcacao consistente de sincronizacao remota
- corrigido o fallback indevido que repovoava produtos, insumos e cuidados especiais com dados demo mesmo quando o estado remoto estava vazio
- ajustado o login remoto para exigir email real do Supabase e evitar mistura com o fluxo legado
- liberado o host do QR Code Pix na politica de seguranca da publicacao web
- adicionada protecao no `.gitignore` para arquivos `*.hprof`
- restauradas a tela de operadores e a abertura do cadastro de novo operador no administrativo
- removido o bloco lateral de observacoes em recibos e documentos e adicionada a acao de baixar arquivo na tabela

## 2026-06-07

- consolidada a configuracao do repositorio principal `Projeto_App_LavaJato`
- `LavaPrime/` removido do escopo de versionamento deste repositorio
- documentada a arquitetura estatica com Nginx e Docker
- documentados os modulos principais do app e a estrutura de pastas
- registrado o fluxo recomendado para versionamento e publicacao
- adicionada documentacao de handoff, arquitetura, desenvolvimento, status e decisoes
- adicionada validacao automatica no GitHub Actions
- adicionados templates basicos para pull request e bug report
