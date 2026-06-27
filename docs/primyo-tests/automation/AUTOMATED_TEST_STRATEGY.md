# LavaPrime Automated Test Strategy

## Objetivo

Definir a estrategia incremental de automacao de testes do LavaPrime antes de criar scripts, instalar ferramentas ou alterar o produto.

Esta estrategia pertence a `LP-TEST-003` e tem carater exclusivamente documental.

## Principios

- Automatizar primeiro verificacoes tecnicas de baixo risco.
- Manter smoke manual para fluxos de negocio ate existir automacao comprovada.
- Nao instalar dependencias sem decisao tecnica posterior.
- Nao substituir validacao humana de login, perfil, patio e area administrativa nesta fase.
- Proteger futuras extracoes do monolito sem iniciar refatoracao agora.
- Registrar evidencia repetivel para cada fatia controlada.

## O que sera automatizado primeiro

Primeira frente futura recomendada:

- consolidacao dos comandos de gate tecnico ja existentes;
- validacao de sintaxe dos arquivos criticos;
- validacao de build;
- validacao de artefatos;
- checagem de presenca de arquivos criticos;
- geracao de relatorio local de execucao;
- orientacao para preencher smoke manual apos o gate tecnico.

Comandos que devem continuar sendo a base do primeiro gate:

- `npm.cmd run build`
- `npm.cmd run verify:build`
- `node --check app/main.js`
- `node --check scripts/sync-fipe-local-db.mjs`

## O que continuara manual

Continuara manual ate nova aprovacao:

- login administrador;
- login operador;
- logout;
- acesso ao patio;
- acesso administrativo;
- navegacao principal;
- validacao visual;
- ausencia de erro visivel no console;
- fluxo financeiro;
- emissao de documentos;
- validacoes com dados reais ou sensiveis.

## O que nao deve ser automatizado ainda

Nao deve ser automatizado nesta etapa:

- autenticacao real;
- Supabase;
- banco de dados;
- app Android;
- fluxo financeiro completo;
- suites E2E completas;
- testes de unidade sobre codigo ainda nao modularizado;
- browser automation com nova dependencia;
- pipelines de CI/CD.

## Riscos que a automacao deve reduzir

A automacao futura deve reduzir:

- esquecimento de comandos obrigatorios;
- evidencia incompleta de validacao;
- regressao de build apos extracoes pequenas;
- erro de sintaxe em arquivos criticos;
- publicacao de fatias sem gate tecnico;
- inconsistencias entre validacoes executadas por pessoas diferentes;
- risco de extrair `sessionBoundary` e `accessBoundary` sem base minima.

## Estrategia por horizonte

### Horizonte 1: gate tecnico local

Criar futuramente um script Node simples, sem dependencias novas, para executar os comandos obrigatorios e registrar resultado.

### Horizonte 2: checklist estruturado

Padronizar a coleta de evidencia manual para smoke tests, vinculando cada execucao a um ID de backlog.

### Horizonte 3: smoke assistido

Gerar instrucoes ou formularios locais para guiar login, logout, patio, admin e navegacao.

### Horizonte 4: smoke browser

Avaliar Playwright apenas quando houver decisao explicita e necessidade de validar comportamento no navegador.

### Horizonte 5: testes de unidade

Considerar Vitest somente depois que helpers puros e boundaries forem extraidos com contratos claros.

### Horizonte 6: E2E critico

Criar testes E2E apenas para fluxos de alto valor e alto risco, depois de estabilizar seletores, ambiente e dados.

## Decisao desta fase

`LP-TEST-003` aprova a estrategia, mas nao implementa nenhuma automacao.

O primeiro passo futuro recomendado e um gate tecnico local em Node sem novas dependencias.
