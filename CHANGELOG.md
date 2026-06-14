# Changelog

## 2026-06-14

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
