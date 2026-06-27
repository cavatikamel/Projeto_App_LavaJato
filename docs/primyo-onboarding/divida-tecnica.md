# Divida Tecnica

## Dividas principais observadas

1. `app/main.js` concentra logica funcional, dados iniciais, persistencia local, UI, PDFs, financeiro e mensagens.
2. A camada React atual funciona mais como shell/bootstrapping do que como modularizacao real do produto.
3. O web ainda mistura arrays hardcoded, `localStorage` e backend planejado nao conectado.
4. O modelo de dados existe em tres formas paralelas: web local, Android Room e Supabase planejado.
5. O Android ainda usa login demo local e sincronizacao apenas preparada.
6. O repositorio mantem materiais auxiliares e superficies distintas no mesmo conjunto sem dossie operacional unico anterior.
7. O Room Android usa `fallbackToDestructiveMigration()`, o que sinaliza debito de evolucao de schema.
