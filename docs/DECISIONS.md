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

## 2026-06-14 - Migracao segura para React + Vite

Decisao:

- a base web passa a rodar com React + Vite
- a logica existente em `app/main.js` permanece ativa durante a transicao
- a marcacao atual fica preservada em `app/legacy-body.html`

Motivo:

- modernizar build, deploy e manutencao sem perder o comportamento ja implementado

Consequencia:

- o projeto ganha base moderna para componentizacao gradual
- a reescrita deixa de ser um corte brusco e passa a ser feita por etapas
