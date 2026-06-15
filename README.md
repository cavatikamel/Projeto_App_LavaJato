# Projeto App LavaJato

Aplicacao web da marca LavaPrime para operacao de patio, cadastro, financeiro, comunicacao com clientes e emissoes em PDF.

## Visao geral

O projeto usa React + Vite como base de execucao da interface e preserva a logica funcional legada em JavaScript puro durante a migracao. O repositorio concentra:

- app principal com shell React e bootstrap legado
- ativos visuais e templates PDF
- banco local de veiculos para autocomplete
- script de sincronizacao da base FIPE
- materiais de apoio da landing page

## Modulos principais

- Login com perfis de administrador e operador
- Patio operacional com fluxo por status
- Cadastro de clientes, veiculos, operadores e servicos
- Financeiro com fluxo de caixa, pagamentos em aberto e faturas
- Meu Negocio com dados empresariais, financeiro, social e central de mensagens
- Check-list veicular com icones e exportacao em PDF
- Autocomplete local de modelos de veiculos via base FIPE

## Estrutura

```text
app/                   Aplicacao principal servida pelo Vite e publicada apos build
app/src/               Shell React e bootstrap da migracao
app/legacy-body.html   Marcacao HTML preservada da aplicacao original
app/assets/brand/      Logos e icones da marca
app/assets/checklist-icons/
                       Icones usados no check-list
app/assets/data/       Base local FIPE em JSON e JS
app/assets/templates/  Templates de papel timbrado e referencias PDF/DOCX
scripts/               Scripts utilitarios de manutencao
Projeto Landingpage/   Materiais de apoio da landing page
Dockerfile             Build com Vite + entrega estatica em Nginx
docker-compose.yml     Execucao local com Docker
nginx.conf             Configuracao do servidor estatico
vite.config.js         Configuracao do Vite
```

## Documentacao do repositorio

Para garantir handoff completo para qualquer dev futuro, use estes arquivos como ponto de partida:

- `docs/HANDOFF.md` - guia rapido para entender o projeto e por onde comecar
- `docs/ARCHITECTURE.md` - arquitetura atual e decisoes tecnicas principais
- `docs/DEVELOPMENT.md` - rotina de desenvolvimento, validacao, commit e publicacao
- `docs/DEPLOYMENT.md` - fluxo de publicacao web e checklist de release
- `docs/PROJECT_STATUS.md` - estado atual do produto, modulos e pendencias conhecidas
- `docs/SUPABASE_BACKEND.md` - plano do backend, seguranca e estrutura do Supabase
- `docs/DECISIONS.md` - registro de decisoes estruturais do projeto

## Como rodar localmente

### Opcao 1: Desenvolvimento com Vite

```powershell
npm install
npm run dev
```

Depois acesse o endereco exibido pelo Vite, normalmente `http://localhost:5173`.

### Opcao 2: Docker Compose

```powershell
docker compose up --build
```

Depois acesse [http://localhost:8080](http://localhost:8080).

### Opcao 3: Build local

```powershell
npm run build
```

Os arquivos finais de publicacao ficam em `dist/`.

## Base local FIPE

O script `scripts/sync-fipe-local-db.mjs` atualiza os arquivos:

- `app/assets/data/fipe-veiculos.json`
- `app/assets/data/fipe-veiculos.js`

Variaveis opcionais:

- `FIPE_API_BASE_URL`
- `FIPE_TOKEN`
- `FIPE_SYNC_CONCURRENCY`

## Versionamento do projeto

- `Projeto_App_LavaJato` e o repositorio principal
- `LavaPrime/` foi desconsiderado neste repositorio para evitar historico duplicado
- `Gestao do Projeto.xlsx` e um artefato operacional local e nao entra no versionamento
- toda alteracao relevante deve deixar rastros no GitHub: codigo, commit e, quando necessario, documentacao

Fluxo recomendado:

1. Fazer alteracoes no projeto.
2. Validar visualmente e tecnicamente.
3. Atualizar a documentacao quando houver mudanca relevante.
4. Criar commit com mensagem objetiva.
5. Publicar no GitHub pelo branch principal ou por branch de trabalho.

## Deploy

O deploy atual esta preparado para entrega como site estatico com Nginx:

- `Dockerfile` executa `npm run build`
- o resultado de `dist/` e copiado para `/usr/share/nginx/html`
- `nginx.conf` faz fallback para `index.html`
- arquivos estaticos recebem cache publico
- `netlify.toml` define build, fallback SPA e headers basicos de seguranca

## Supabase

O repositorio agora inclui a base inicial para o backend no Supabase:

- migration inicial em `supabase/migrations/`
- documentacao operacional em `docs/SUPABASE_BACKEND.md`
- variaveis esperadas em `.env.example`
- cliente browser do Supabase para login real e sincronizacao inicial do estado do app
- script `npm run bootstrap:test-user` para preparar o usuario `Teste` com base vazia

Importante:

- esta primeira etapa passa a autenticar no Supabase e sincronizar o estado do LavaPrime por organizacao
- a aplicacao real no projeto remoto ainda depende de aplicar as migrations e informar as credenciais locais

## Observacoes

- O ambiente atual permitiu validar acesso ao GitHub e publicacao por `git push`.
- A migracao atual preserva a logica do app em `app/main.js` para evitar regressao funcional.
- O repositorio deve manter validacao automatica no GitHub Actions sempre que possivel.
