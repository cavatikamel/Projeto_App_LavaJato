# Integracoes

## Integracoes atuais observadas

### FIPE API

- usada pelo script `scripts/sync-fipe-local-db.mjs`
- endpoint base padrao observado: `https://fipe.parallelum.com.br/api/v2`
- objetivo: atualizar base local de fabricantes/modelos em `app/assets/data/`

### WhatsApp

- o web gera links `https://wa.me/...`
- uso observado para lembretes de manutencao e mensagens a clientes
- nao foi observada integracao oficial via API de servidor

### QR code externo

- o web usa `https://api.qrserver.com/v1/create-qr-code/`
- usado para gerar QR code a partir de payloads documentais/pagamento

### Hosting web

- Netlify previsto por `netlify.toml`
- Nginx em container para entrega estatica local/alternativa

### Build e validacao

- GitHub Actions para build e verificacoes de sintaxe/artefatos

## Integracoes planejadas

### Supabase

- variaveis web previstas: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- variaveis server-side previstas: `SUPABASE_PROJECT_REF`, `SUPABASE_DB_PASSWORD`, `SUPABASE_ACCESS_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY`
- Android recebe `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_ORGANIZATION_ID` via `BuildConfig`
- docs afirmam que a ligacao real ainda nao foi feita

### Buckets planejados

- `brand-assets`
- `documents`
- `attachments`

## Integracoes internas entre superficies

- Android e descrito como preparado para compartilhar a mesma base do web
- a sincronizacao mobile usa `SyncCoordinator`, `SupabaseRuntimeConfig` e `sync_queue`
- nenhuma sincronizacao remota efetiva foi observada em funcionamento no onboarding

## Dependencias de assets/documentos

- templates PDF/DOCX locais em `app/assets/templates/`
- base FIPE local em `app/assets/data/`
- icones de checklist e identidade visual locais

## Conclusao

- o produto ja possui varios pontos de integracao previstos, mas a maioria dos fluxos atuais observados ainda roda localmente ou via links simples
- a principal integracao futura estruturante e o Supabase
