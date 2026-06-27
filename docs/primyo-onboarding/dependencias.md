# Dependencias

## Web runtime

- `react` `^18.3.1`
- `react-dom` `^18.3.1`

## Web build e tooling

- `vite` `^5.4.10`
- `@vitejs/plugin-react` `^4.3.1`
- Node.js 22 no workflow e no `Dockerfile`

## Infra web

- Nginx 1.27 Alpine
- Docker / Docker Compose
- GitHub Actions
- Netlify

## Scripts utilitarios

- `scripts/verify-build-artifacts.mjs`
- `scripts/sync-fipe-local-db.mjs`

## Dependencias Android observadas

- `androidx.core:core-ktx:1.15.0`
- `androidx.activity:activity-compose:1.9.3`
- `androidx.lifecycle:lifecycle-runtime-ktx:2.8.7`
- `androidx.lifecycle:lifecycle-runtime-compose:2.8.7`
- `androidx.lifecycle:lifecycle-viewmodel-compose:2.8.7`
- `androidx.compose:compose-bom:2024.10.01`
- `androidx.compose.material3:material3`
- `androidx.navigation:navigation-compose:2.8.3`
- `androidx.room:room-runtime:2.6.1`
- `androidx.room:room-ktx:2.6.1`
- `androidx.room:room-compiler:2.6.1` via KSP
- `androidx.work:work-runtime-ktx:2.10.0`
- `androidx.security:security-crypto:1.1.0-alpha06`

## Dependencias externas de dados/servico

- FIPE API
- WhatsApp via link
- QRServer
- Supabase planejado

## Dependencias de repositorio e ativos

- `app/assets/data/fipe-veiculos.json`
- `app/assets/data/fipe-veiculos.js`
- `app/assets/templates/*`
- `app/assets/brand/*`
- `app/assets/checklist-icons/*`
- `supabase/migrations/*`

## Observacoes

- o frontend atual ainda nao declara cliente Supabase ativo em `package.json`
- a base web depende fortemente de assets locais copiados no build
- o Android depende de credenciais locais/ambiente para apontar ao Supabase futuro
