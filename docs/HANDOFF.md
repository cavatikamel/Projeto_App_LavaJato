# Handoff

## Objetivo

Este repositorio deve permitir que qualquer dev entenda o projeto apenas com o conteudo versionado no GitHub.

## Por onde comecar

1. Ler `README.md`.
2. Ler `docs/ARCHITECTURE.md`.
3. Ler `docs/DEPLOYMENT.md`.
4. Ler `docs/SUPABASE_BACKEND.md`.
5. Ler `docs/PROJECT_STATUS.md`.
6. Ver os ultimos commits e o `CHANGELOG.md`.
7. Rodar o projeto localmente e validar os fluxos principais.

## O que este projeto e hoje

- app estatico da marca LavaPrime
- servido por Nginx
- publicado a partir da pasta `app/`
- com backend planejado e versionado em `supabase/`
- com dados locais em JavaScript e JSON para alguns fluxos

## Pastas mais importantes

- `app/` - aplicacao principal
- `app/assets/data/` - base local de veiculos
- `app/assets/templates/` - padroes de documentos e relatorios
- `scripts/` - scripts utilitarios
- `supabase/` - schema e migrations do backend planejado
- `Projeto Landingpage/` - materiais de apoio da landing page

## Regras de continuidade

- qualquer mudanca estrutural deve atualizar a documentacao em `docs/`
- qualquer nova dependencia externa deve ser registrada no repositorio
- qualquer fluxo operacional importante deve ficar descrito em Markdown dentro do repo
- evitar conhecimento apenas em planilhas locais, conversas soltas ou memoria externa

## Limites atuais

- o backlog operacional em `Gestao do Projeto.xlsx` esta fora do versionamento
- se esse backlog continuar sendo usado, o ideal e refletir os pontos relevantes em `docs/PROJECT_STATUS.md`
- neste ambiente local, `node.exe` nao permitiu validacao direta, entao a checagem automatica no GitHub e especialmente importante
