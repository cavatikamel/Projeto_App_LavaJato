# Project Status

## Estado atual

O projeto esta ativo, com repositorio principal funcional, publicacao no GitHub validada, base web migrada para React + Vite com compatibilidade legada, autenticacao remota por Supabase estabilizada e Fase B iniciada para tirar os cadastros principais do snapshot e coloca-los em tabelas relacionais reais.

Na Fase A de estabilizacao, o legado passou a salvar um snapshot operacional local complementar para reduzir perda de dados em cadastros e faturamento durante a transicao, e o modo remoto deixou de repovoar automaticamente produtos, insumos e cuidados especiais com dados demo quando a organizacao esta vazia.

Na primeira fatia da Fase B, o app passou a hidratar e gravar `clients`, `vehicles`, `operators`, `services`, `products` e `supplies` tambem nas tabelas do Supabase, sem remover o snapshot legado dos modulos que ainda nao foram migrados.

Na continuidade atual da Fase B, `service_supply_profiles` e `vehicle_special_care` tambem passaram a ser restaurados e sincronizados pelas tabelas relacionais, reduzindo mais um bloco relevante que antes dependia so do snapshot.

Na etapa seguinte da Fase B, `quotes`, `quote_items` e `cash_entries` tambem passaram a hidratar e gravar pelas tabelas relacionais, cobrindo uma parte importante da operacao comercial e financeira sem remover ainda o snapshot dos modulos restantes.

No passo atual da Fase B, `open_payments`, `invoices` e `invoice_line_items` tambem passaram a hidratar e gravar pelas tabelas relacionais, incluindo baixa, faturamento parcial, atualizacao de valores e remocao remota dos itens de fatura que saem do fluxo local.

## Modulos presentes no repositorio

- app principal migrado para base React + Vite com compatibilidade legada
- pipeline de deploy com verificacao de assets criticos para Netlify
- financeiro com fluxo de caixa e pagamentos em aberto
- central de mensagens
- cadastro e historico de veiculos
- check-list veicular com exportacao
- base local FIPE para autocomplete
- migrations iniciais de backend para Supabase
- login remoto com Supabase, snapshot por organizacao e primeira camada relacional preparados para teste local
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
- concluir a migracao dos modulos restantes do snapshot remoto para tabelas relacionais por modulo, com foco em atendimentos e historicos auxiliares
- configurar a chave publica `VITE_SUPABASE_ANON_KEY` nos ambientes locais e publicados
- aplicar no Supabase real as tabelas relacionais do dominio que ainda faltam na API publicada e validar o uso efetivo dos modulos financeiros ja conectados
- reduzir dependencia de conhecimento fora do repositorio
- melhorar a granularidade de `app/main.js`
- ampliar validacoes automaticas conforme o projeto evoluir

## Recomendacao de manutencao

- sempre registrar mudancas concluidas com commit e push
- manter `CHANGELOG.md` e `docs/` atualizados quando a mudanca mudar contexto do projeto
- refletir no repo qualquer backlog importante que esteja apenas em planilha local
