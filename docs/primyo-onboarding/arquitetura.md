# Arquitetura Atual

## Visao geral

O LavaPrime observado e um produto multi-superficie concentrado em um unico repositorio principal:

- web principal em React + Vite com bootstrap legado
- base Android nativa em Kotlin + Jetpack Compose
- backend futuro planejado em Supabase

## Estrutura fisica do repositorio

```text
app/                    superficie web principal
app/src/                shell React e bootstrap
app/legacy-body.html    markup legado preservado
app/main.js             logica funcional principal do web
app/assets/             logos, templates, base FIPE, icones
docs/                   documentacao tecnica do produto
scripts/                scripts utilitarios
supabase/               migrations e backend planejado
LavaPrimeAndroidApp/    superficie Android nativa
Projeto Landingpage/    material de apoio visual
```

## Arquitetura web observada

### Camadas

- `app/src/App.jsx` injeta o markup legado e faz bootstrap da logica antiga
- `app/main.js` concentra estado, regras, telas, templates de mensagem, PDFs, financeiro, patio e cadastros
- `app/assets/` guarda base local, templates e identidade visual
- `vite.config.js` monta a app a partir de `app/` e copia os assets legados para `dist/`

### Estilo de persistencia web

- dados de configuracao e catalogos usam `localStorage`
- parte dos dados operacionais esta inicializada diretamente em arrays JavaScript
- base FIPE e servida localmente em JSON/JS
- o frontend observado ainda nao usa cliente Supabase real

## Arquitetura Android observada

### Camadas

- `ui/screens/` concentra telas mobile
- `ui/viewmodel/` concentra estado e interacao de dominio
- `data/repository/` centraliza persistencia local e auditoria
- `data/local/` define Room
- `sync/` concentra conectividade e coordenacao de sincronizacao futura

### Persistencia Android

- banco local Room em `lavaprime.db`
- entidades: usuarios, clientes, veiculos, servicos, produtos, atendimentos, audit_logs, sync_queue
- fila local de sincronizacao com status `LOCAL_ONLY`, `PENDING_SYNC`, `SYNCED`, `CONFLICT`

## Arquitetura de backend planejada

- migration inicial do Supabase versionada em `supabase/migrations/20260614133000_init_lavaprime.sql`
- organizacao multi-tenant por `organization_id`
- grupos de tabelas para identidade, configuracao da empresa, cadastros, operacao, financeiro e rastreabilidade
- Auth, RLS e buckets de storage descritos mas ainda nao ligados ao frontend observado

## Entrega e deploy

- build web por Vite
- container estatico em Nginx
- `docker-compose.yml` para execucao local
- `netlify.toml` para publicacao SPA com headers de seguranca
- GitHub Actions para build, verificacao de assets e checagem de sintaxe

## Decisoes arquiteturais observadas

- manter logica legado em `app/main.js` durante migracao gradual
- manter o repositorio principal como fonte unica do produto
- preparar Supabase antes de ligar o frontend
- manter Android como base mobile offline-first

## Tensoes arquiteturais observadas

- web moderno no shell, mas legado no core funcional
- modelo de dados atual distribuido entre memoria, localStorage, Room e schema futuro
- produto ja tem mais de uma superficie, mas ainda nao ha arquitetura consolidada de integracao entre elas
