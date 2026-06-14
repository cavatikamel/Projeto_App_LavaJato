# Deployment

## Frontend atual

O frontend do LavaPrime e um site estatico buildado com Vite e publicado a partir de `dist/`.

Arquivos importantes:

- `netlify.toml`
- `vite.config.js`
- `scripts/verify-build-artifacts.mjs`
- `.github/workflows/validate.yml`

## Netlify

Configuracao padrao do repositorio:

- build command: `npm run build`
- publish directory: `dist`
- SPA fallback para `index.html`
- headers basicos de seguranca

## O que corrigimos para a publicacao

- o build agora copia `app/assets/` para `dist/assets/`
- isso garante a entrega da logomarca, base FIPE e templates usados pelo app legado
- o pipeline valida que os arquivos criticos realmente foram publicados

## Checklist antes de publicar

1. Rodar `npm run build`.
2. Rodar `npm run verify:build`.
3. Validar visualmente o fluxo principal.
4. Confirmar que a documentacao continua coerente.
5. Commitar e publicar no GitHub.

## Checklist depois de publicar

1. Abrir a URL publicada.
2. Confirmar que nao ha erro 404 em `/assets/data/fipe-veiculos.js`.
3. Confirmar que a logomarca carrega.
4. Confirmar login, patio e telas administrativas.

## Backend futuro

O backend planejado para Supabase esta documentado em `docs/SUPABASE_BACKEND.md` e versionado em `supabase/`.
