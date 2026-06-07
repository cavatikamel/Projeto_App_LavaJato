# Architecture

## Stack atual

- HTML
- CSS
- JavaScript puro
- Nginx para servir o app
- Docker para empacotamento e execucao local

## Modelo de entrega

O projeto e uma aplicacao estatica.

- `Dockerfile` copia `app/` para `/usr/share/nginx/html`
- `nginx.conf` usa fallback para `index.html`
- `docker-compose.yml` expoe a aplicacao em `localhost:8080`

## Estrutura funcional do app

- autenticacao visual com perfis de administrador e operador
- area de patio
- cadastro de clientes
- cadastro e historico de veiculos
- cadastro de servicos
- area Meu Negocio
- financeiro
- mensagens
- check-list veicular
- exportacoes em PDF

## Dados locais relevantes

- `app/main.js` concentra a maior parte da logica da aplicacao
- `app/assets/data/fipe-veiculos.json` guarda a base local de modelos de veiculos
- `app/assets/data/fipe-veiculos.js` expoe a mesma base para uso direto no navegador
- `scripts/sync-fipe-local-db.mjs` atualiza os arquivos da base local

## Decisoes estruturais atuais

- `Projeto_App_LavaJato` e o unico repositorio principal deste projeto
- `LavaPrime/` foi removido do escopo de versionamento deste repo
- `Projeto Landingpage/` fica versionado como material de referencia e apoio
- o app depende fortemente de assets locais, por isso o versionamento desses arquivos e parte do produto

## Riscos tecnicos atuais

- `app/main.js` esta grande e concentra muitas responsabilidades
- parte importante do conhecimento do projeto ainda pode estar fora do repositorio
- validacoes locais automaticas estao limitadas neste ambiente Windows atual

## Direcao recomendada

- manter a documentacao tecnica dentro de `docs/`
- quando um modulo crescer demais, separar responsabilidades em arquivos menores
- registrar no repo qualquer integracao futura com hospedagem, banco ou servicos externos
