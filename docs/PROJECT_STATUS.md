# Project Status

## Estado atual

O projeto esta ativo, com repositorio principal funcional, publicacao no GitHub validada, base web migrada para React + Vite com compatibilidade legada e primeira etapa de autenticacao/sincronizacao com Supabase em construcao.

## Modulos presentes no repositorio

- app principal migrado para base React + Vite com compatibilidade legada
- pipeline de deploy com verificacao de assets criticos para Netlify
- financeiro com fluxo de caixa e pagamentos em aberto
- central de mensagens
- cadastro e historico de veiculos
- check-list veicular com exportacao
- base local FIPE para autocomplete
- migrations iniciais de backend para Supabase
- login remoto com Supabase e snapshot por organizacao em desenvolvimento
- materiais de apoio da landing page

## Estado operacional do repositorio

- remoto GitHub configurado e funcional
- historico principal consolidado em `Projeto_App_LavaJato`
- `LavaPrime/` ignorado neste repositorio
- backlog em planilha mantido fora do Git
- deploy web preparado para publicar a pasta `dist/`
- branch dedicada para a primeira construcao do Supabase: `feat/supabase-bootstrap-test-user`

## Pendencias conhecidas

- migrar gradualmente a interface e a logica de `app/main.js` para componentes e modulos React
- conectar autenticacao, banco e storage do frontend ao Supabase
- aplicar as migrations no projeto remoto e executar o bootstrap do usuario `Teste`
- reduzir dependencia de conhecimento fora do repositorio
- melhorar a granularidade de `app/main.js`
- ampliar validacoes automaticas conforme o projeto evoluir

## Recomendacao de manutencao

- sempre registrar mudancas concluidas com commit e push
- manter `CHANGELOG.md` e `docs/` atualizados quando a mudanca mudar contexto do projeto
- refletir no repo qualquer backlog importante que esteja apenas em planilha local
