# Riscos

## Criticos

1. Autenticacao e controle de acesso ainda nao estao conectados a um backend real observado.
2. A superficie web concentra regras de negocio, estado e documentos em um unico arquivo legado principal.
3. O produto ainda depende fortemente de conhecimento externo ao repositorio, inclusive backlog em planilha local.

## Altos

1. Web, Android e backend futuro ainda nao compartilham uma fonte unica de verdade.
2. A persistencia web atual e majoritariamente local.
3. O Android usa migracao destrutiva no Room.
4. Fluxos financeiros e documentais rodam no cliente observado, aumentando risco de inconsistencias e acoplamento.

## Medios

1. O modelo de papeis futuro do Supabase ainda nao esta refletido nas superficies ativas.
2. Ownership, suporte e observabilidade nao estao claramente formalizados no repositorio.
3. Nao foi encontrada evidencia de inventario de ambientes produtivos oficial.

## Baixos

1. O deploy web estatico possui docs e pipeline minima.
2. O repositorio ja mantem parte da base de backend futuro versionada.
