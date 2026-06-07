# Decisions

## 2026-06-07 - Repositorio principal unico

Decisao:

- `Projeto_App_LavaJato` passa a ser o repositorio principal do projeto

Motivo:

- evitar historico duplicado e confusao com repositorios aninhados

Impacto:

- `LavaPrime/` fica fora do versionamento deste repo

## 2026-06-07 - Materiais da landing page dentro do repo

Decisao:

- `Projeto Landingpage/` permanece versionado como referencia

Motivo:

- preserva contexto visual e materiais de apoio para manutencao futura

## 2026-06-07 - Backlog operacional fora do Git

Decisao:

- `Gestao do Projeto.xlsx` permanece local e ignorado pelo repositorio

Motivo:

- evitar versionamento de artefato operacional pesado e sujeito a lock do OneDrive

Consequencia:

- informacoes importantes da planilha precisam ser refletidas em Markdown dentro do repositorio
