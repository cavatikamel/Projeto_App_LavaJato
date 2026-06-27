# LavaPrime

## Resumo executivo

LavaPrime e um produto digital para operacao de lava jato com forte foco em patio, cadastros, financeiro, comunicacao com clientes e geracao de documentos. O repositorio observado concentra duas superficies principais:

- superficie web estaticamente publicada, baseada em React + Vite com logica funcional legada em JavaScript puro
- superficie Android nativa em Kotlin + Jetpack Compose, preparada para operacao offline-first e sincronizacao futura

## O que o produto entrega hoje por evidencia observada

- autenticacao por perfil Administrador e Operador
- operacao de patio com fluxo por status
- agendamento e entrada de veiculos
- cadastros de clientes, veiculos, servicos, operadores, produtos e insumos
- financeiro com caixa, pagamentos em aberto, contas a pagar e faturas
- comunicacao com clientes e templates de mensagem
- check-list veicular e emissao de documentos/PDFs
- base FIPE local para apoio a busca de modelos
- base Android nativa com Room local e fila de sincronizacao

## Estado atual

- o produto esta ativo e possui documentacao tecnica previa em `docs/`
- a superficie web ainda depende fortemente de `app/main.js`
- o backend Supabase esta planejado e versionado, mas ainda nao foi conectado ao frontend observado
- a base Android esta estruturada, com login demo local, persistencia Room e sincronizacao preparada

## Superficies do produto

### Web

- shell React em `app/src/`
- markup preservado em `app/legacy-body.html`
- logica principal em `app/main.js`
- assets locais em `app/assets/`

### Android

- app nativo em `LavaPrimeAndroidApp/`
- Room local, fluxo mobile e sync preparado

### Backend planejado

- migration inicial do Supabase em `supabase/migrations/`
- documentacao de backend em `docs/SUPABASE_BACKEND.md`

## Ambientes observados

- desenvolvimento web: `npm run dev`
- build web: `npm run build`
- verificacao de build: `npm run verify:build`
- execucao local estaticamente via Docker Compose
- publicacao web prevista para Netlify
- execucao mobile via Android Studio

## Resultado do onboarding

Este onboarding nao alterou comportamento funcional do produto. Ele gerou documentacao formal, auditoria inicial, matriz de maturidade e plano de adequacao em `docs/primyo-onboarding/`.
