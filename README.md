# Projeto App LavaJato

Aplicacao estatica da marca LavaPrime para operacao de patio, cadastro, financeiro, comunicacao com clientes e emissoes em PDF.

## Visao geral

O projeto e servido como app estatico via Nginx e pode ser executado localmente com Docker. O repositorio concentra:

- app principal em HTML, CSS e JavaScript puro
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
app/                   Aplicacao principal publicada pelo Nginx
app/assets/brand/      Logos e icones da marca
app/assets/checklist-icons/
                       Icones usados no check-list
app/assets/data/       Base local FIPE em JSON e JS
app/assets/templates/  Templates de papel timbrado e referencias PDF/DOCX
scripts/               Scripts utilitarios de manutencao
Projeto Landingpage/   Materiais de apoio da landing page
Dockerfile             Imagem de deploy estatico
docker-compose.yml     Execucao local com Docker
nginx.conf             Configuracao do servidor estatico
```

## Como rodar localmente

### Opcao 1: Docker Compose

```powershell
docker compose up --build
```

Depois acesse [http://localhost:8080](http://localhost:8080).

### Opcao 2: Servidor estatico

Abra `app/index.html` por um servidor HTTP local de sua preferencia. Como o projeto usa arquivos JS, CSS, JSON e assets locais, prefira servidor HTTP em vez de abrir o arquivo diretamente no navegador.

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
- `Gestão do Projeto.xlsx` e um artefato operacional local e nao entra no versionamento

Fluxo recomendado:

1. Fazer alteracoes no projeto.
2. Validar visualmente e tecnicamente.
3. Atualizar a documentacao quando houver mudanca relevante.
4. Criar commit com mensagem objetiva.
5. Publicar no GitHub pelo branch principal ou por branch de trabalho.

## Deploy

O deploy atual esta preparado para entrega como site estatico com Nginx:

- `Dockerfile` copia `app/` para `/usr/share/nginx/html`
- `nginx.conf` faz fallback para `index.html`
- arquivos estaticos recebem cache publico

## Observacoes

- O ambiente atual permitiu validar acesso ao GitHub e publicacao por `git push`.
- Neste turno, a checagem por `node --check` nao foi possivel porque `node.exe` retornou erro de acesso no Windows local.
