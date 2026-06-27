# Legacy Product Intake

## Intake record

- Product name: LavaPrime
- Declared objective: aplicacao digital para operacao de patio, cadastros, financeiro, comunicacao com clientes e emissoes em PDF, com superficie web e base Android nativa observadas
- Target audience: operadores de patio, administradores, time financeiro e equipe interna do negocio; clientes finais aparecem como publico indireto em fluxos de atendimento e comunicacao
- Current stage: produto ativo com superficie web pronta para operacao e base Android em estado preparatorio/prototipo funcional offline-first
- Project classification: Legacy
- Primary owner: nao identificado por evidencia direta no repositorio
- Technical owner: nao identificado por evidencia direta no repositorio

## Technical landscape

- Technologies: React 18, Vite 5, JavaScript legado em `app/main.js`, CSS, Nginx, Docker, Node.js scripts, Android Kotlin + Jetpack Compose + Room + WorkManager, Supabase planejado
- Repository: `C:\Users\kamel\OneDrive\Projetos Kamel\Projeto_App_LavaJato`
- Environments: desenvolvimento web com `npm run dev`, build web estatico em `dist/`, execucao local via Docker Compose, publicacao web prevista para Netlify, execucao Android via Android Studio, backend futuro no Supabase
- Database: web atual com dados locais em memoria/localStorage e base FIPE local em JSON/JS; Android com Room local (`lavaprime.db`); schema inicial do backend versionado em `supabase/migrations/20260614133000_init_lavaprime.sql`
- Authentication: web com login visual por perfil Administrador ou Operador; Android com login demo local e perfis `ADMINISTRADOR` e `OPERADOR`; integracao real com Supabase Auth ainda nao observada em execucao
- Permissions: web restringe operacao administrativa ao perfil Administrador e patio ao perfil Operador; Android filtra rotas `adminOnly` por perfil; manifest Android declara apenas `INTERNET` e `ACCESS_NETWORK_STATE`
- Integrations: FIPE API por script de sincronizacao local, links WhatsApp `wa.me`, geracao de QR code via `api.qrserver.com`, Netlify para hospedagem web, Supabase planejado, assets locais para PDFs e papel timbrado

## Functional landscape

- Main screens: login, patio operador, dashboard administrador, patio administrador, orcamentos/pre-vendas, documentos/recibos, clientes, veiculos, servicos, equipe e usuarios, produtos, insumos, inventario, fluxo de caixa, recebimentos em aberto, contas a pagar, faturas, dados da empresa, configuracoes financeiras, comunicacao social, mensagens e avisos; Android com dashboard, patio, agendamentos, clientes e veiculos, servicos, produtos, financeiro, relatorios, meu negocio, seguranca e sincronizacao
- Main flows: autenticacao por perfil, entrada/agendamento de veiculos, operacao do patio por status, cadastro de clientes e veiculos, faturamento e pagamentos em aberto, controle de estoque, emissao de PDFs, mensagens via WhatsApp, configuracao da empresa, sync mobile offline-first
- Known business-critical flows: patio operacional, cobranca/faturamento, controle financeiro, cadastro de clientes e veiculos, documentos/check-list, configuracoes empresariais e de pagamento

## Risks and unknowns

- Known risks: login visual/demo sem autenticacao real observada; logica web concentrada em `app/main.js`; dados ainda locais no web; knowledge backlog fora do Git em `Gestao do Projeto.xlsx`; Android usa `fallbackToDestructiveMigration()`
- Known dependencies: assets locais, dados locais em localStorage, build Vite, hosting estatico, script FIPE, schema Supabase planejado, Room local no Android
- Open questions: URL publica oficial em producao nao foi encontrada no repositorio; politicas reais de acesso, observabilidade, backup e suporte nao foram encontradas; dono tecnico formal nao foi encontrado; integracao real do Supabase ainda nao foi ligada
- Constraints: onboarding executado sem alterar comportamento funcional e sem assumir informacoes nao observadas

## Intake status

- Intake author: Codex em execucao do Primyo Transformation Program
- Intake date: 2026-06-19
- Evidence sources reviewed: `README.md`, `docs/ARCHITECTURE.md`, `docs/PROJECT_STATUS.md`, `docs/SUPABASE_BACKEND.md`, `docs/DEPLOYMENT.md`, `docs/DEVELOPMENT.md`, `docs/HANDOFF.md`, `package.json`, `vite.config.js`, `.env.example`, `Dockerfile`, `docker-compose.yml`, `netlify.toml`, `app/index.html`, `app/legacy-body.html`, `app/main.js`, `scripts/sync-fipe-local-db.mjs`, `supabase/migrations/20260614133000_init_lavaprime.sql`, `LavaPrimeAndroidApp/README.md`, `LavaPrimeAndroidApp/app/build.gradle.kts`, `LavaPrimeAndroidApp/app/src/main/AndroidManifest.xml`, `LavaPrimeAndroidApp/app/src/main/java/**`
- Confidence level: media para web e arquitetura geral; baixa a media para operacao real, ownership formal e contexto comercial
