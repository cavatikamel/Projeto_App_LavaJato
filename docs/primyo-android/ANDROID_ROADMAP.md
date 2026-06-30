# Android Roadmap

## Objetivo

Definir a sequencia recomendada para a trilha Android apos `LP-ANDROID-001`.

## Estado destravado por esta fase

`LP-ANDROID-001` fecha a leitura de baseline, documenta riscos e evita que a trilha Android continue evoluindo sem governanca explicita.

## Proxima fase recomendada

### `LP-AND-001 - Revisar estrategia de dados Android vs backend`

Motivo:

- o principal risco atual nao e visual;
- o principal risco atual e o modelo Android paralelo com `Room` + seed + `fallbackToDestructiveMigration()` + sync remoto inexistente;
- a decisao de dados precisa vir antes de qualquer expansao funcional de mobile.

## Ordem recomendada

1. `LP-AND-001` para estrategia de dados Android vs backend;
2. `LP-AND-002` para plano de substituicao de migracao destrutiva;
3. fase dedicada de contratos Android por dominio;
4. bootstrap remoto pequeno para catalogos e membership;
5. primeiro slice de sync remoto operacional e reversivel;
6. expansao gradual de modulos placeholder conforme dados e auth ficarem prontos.

## Fases explicitamente rejeitadas por enquanto

- abrir Supabase direto no Android sem estrategia de dados;
- transformar placeholder em modulo real sem contratos e ownership;
- adicionar impressao real junto com sync;
- misturar auth real, financeiro e migracao de banco na mesma fase;
- evoluir `Room` como autoridade definitiva.
