# Project Status

## Estado atual

O projeto esta ativo, com repositorio principal funcional, publicacao no GitHub validada, base web migrada para React + Vite com compatibilidade legada e primeira etapa de autenticacao/sincronizacao com Supabase ja preparada em branch dedicada.

Na Fase A de estabilizacao, o legado passou a salvar um snapshot operacional local complementar para reduzir perda de dados em cadastros e faturamento durante a transicao, e o modo remoto deixou de repovoar automaticamente produtos, insumos e cuidados especiais com dados demo quando a organizacao esta vazia.

## Modulos presentes no repositorio

- app principal migrado para base React + Vite com compatibilidade legada
- pipeline de deploy com verificacao de assets criticos para Netlify
- financeiro com fluxo de caixa e pagamentos em aberto
- central de mensagens
- cadastro e historico de veiculos
- check-list veicular com exportacao
- base local FIPE para autocomplete
- migrations iniciais de backend para Supabase
- login remoto com Supabase e snapshot por organizacao preparados para teste local
- materiais de apoio da landing page

## Estado operacional do repositorio

- remoto GitHub configurado e funcional
- historico principal consolidado em `Projeto_App_LavaJato`
- `LavaPrime/` ignorado neste repositorio
- backlog em planilha mantido fora do Git
- deploy web preparado para publicar a pasta `dist/`
- branch dedicada para a primeira construcao do Supabase: `feat/supabase-bootstrap-test-user`
- ambiente de teste documentado em `docs/TESTING.md`

## Pendencias conhecidas

- migrar gradualmente a interface e a logica de `app/main.js` para componentes e modulos React
- aprofundar a migracao do snapshot remoto para tabelas relacionais por modulo
- configurar a chave publica `VITE_SUPABASE_ANON_KEY` nos ambientes locais e publicados
- aplicar no Supabase real as tabelas relacionais do dominio que ainda faltam na API publicada
- reduzir dependencia de conhecimento fora do repositorio
- melhorar a granularidade de `app/main.js`
- ampliar validacoes automaticas conforme o projeto evoluir

## Recomendacao de manutencao

- sempre registrar mudancas concluidas com commit e push
- manter `CHANGELOG.md` e `docs/` atualizados quando a mudanca mudar contexto do projeto
- refletir no repo qualquer backlog importante que esteja apenas em planilha local
