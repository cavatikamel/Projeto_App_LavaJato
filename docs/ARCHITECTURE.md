# Architecture

## Stack atual

- React
- Vite
- CSS
- JavaScript puro para o bootstrap legado
- Nginx para servir o app
- Docker para empacotamento e execucao local

## Modelo de entrega

O projeto entrega uma aplicacao web compilada pelo Vite e publicada como arquivos estaticos.

- `Dockerfile` executa o build com Node
- `dist/` e publicado pelo Nginx
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

## Estrutura tecnica da migracao

- `app/src/App.jsx` renderiza a marcacao preservada do app e inicializa o legado
- `app/legacy-body.html` guarda a estrutura HTML migrada da versao estatica
- `app/main.js` concentra a maior parte da logica funcional legada
- `app/assets/data/fipe-veiculos.json` guarda a base local de modelos de veiculos
- `app/assets/data/fipe-veiculos.js` expoe a mesma base para uso direto no navegador
- `scripts/sync-fipe-local-db.mjs` atualiza os arquivos da base local
- `supabase/migrations/` guarda a base versionada do backend planejado

## Decisoes estruturais atuais

- `Projeto_App_LavaJato` e o unico repositorio principal deste projeto
- `LavaPrime/` foi removido do escopo de versionamento deste repo
- `Projeto Landingpage/` fica versionado como material de referencia e apoio
- o app depende fortemente de assets locais, por isso o versionamento desses arquivos e parte do produto
- a publicacao web precisa copiar `app/assets/` para `dist/assets/` no build final
- o backend planejado segue um modelo multi-tenant por empresa no Supabase

## Riscos tecnicos atuais

- `app/main.js` esta grande e concentra muitas responsabilidades
- parte da interface ainda esta em markup legado, apesar de o bootstrap agora estar em React
- parte importante do conhecimento do projeto ainda pode estar fora do repositorio
- o frontend ainda nao esta conectado ao backend do Supabase

## Direcao recomendada

- manter a documentacao tecnica dentro de `docs/`
- migrar telas e fluxos do legado para componentes React em etapas pequenas
- quando um modulo crescer demais, separar responsabilidades em arquivos menores
- registrar no repo qualquer integracao futura com hospedagem, banco ou servicos externos
- migrar o estado persistido localmente para a camada versionada em `supabase/`
