# Development

## Fluxo padrao

1. Fazer a alteracao.
2. Validar o que for possivel no ambiente local.
3. Atualizar documentacao quando houver mudanca funcional, estrutural ou operacional.
4. Criar commit com mensagem objetiva.
5. Publicar no GitHub.

## Padrao de commit

- `feat:` nova funcionalidade
- `fix:` correcao de bug
- `docs:` documentacao
- `chore:` manutencao geral
- `refactor:` reorganizacao sem mudar comportamento esperado

## Validacao minima esperada

- revisar o diff antes do commit
- validar o fluxo alterado no app
- verificar se assets e arquivos auxiliares necessarios foram versionados
- confirmar se a documentacao continua coerente

## Validacao automatica

O repositorio deve manter checks no GitHub Actions.

Hoje a validacao automatica prevista inclui:

- checagem de sintaxe de `app/main.js`
- checagem de sintaxe de `scripts/sync-fipe-local-db.mjs`

## Regra de documentacao

Atualize `docs/` quando houver:

- mudanca de arquitetura
- novo modulo ou fluxo importante
- mudanca em deploy ou execucao local
- nova dependencia externa
- decisao estrutural que afete manutencao futura

## O que nao deve depender so de contexto humano

- como rodar o projeto
- como publicar
- onde ficam os dados relevantes
- quais modulos existem
- quais decisoes estruturais ja foram tomadas
