# Android Room Migration Plan

## Objetivo

Definir a saida segura de `fallbackToDestructiveMigration()` para o `LavaPrimeAndroidApp`, preservando dados offline sempre que possivel.

## Estado observado em `2026-06-30`

- banco atual: `lavaprime.db`;
- versao Room atual: `2`;
- schema exportado observado: `app/schemas/br.com.primyo.lavaprime.data.local.LavaPrimeDatabase/2.json`;
- schema `1.json` nao foi encontrado no workspace atual;
- `LavaPrimeDatabase` ainda chama `fallbackToDestructiveMigration()`;
- `assembleDebug` e `gradlew tasks` passaram no estado atual da base.

## Risco atual

Sem schema historico completo e sem migrations explicitas, a remocao imediata de `fallbackToDestructiveMigration()` pode impedir upgrade ou quebrar usuarios que ainda possuam base local anterior.

Ao mesmo tempo, manter essa chamada na base final continua aceitando perda silenciosa de dados offline, o que conflita com a estrategia oficial do programa.

## Decisao desta fase

- a migracao destrutiva nao sera removida cegamente nesta fatia;
- primeiro sera consolidado um baseline confiavel da versao `2`;
- a saida final fica registrada como prioridade tecnica para a proxima fase Android de dados.

## Sequencia recomendada

### 1. Congelar baseline versionada

- manter export de schema ativo;
- versionar `2.json` como baseline oficial do estado atual;
- registrar quais tabelas e colunas ja sao parte do contrato local observado.

### 2. Reconstruir historico minimo

- localizar, se existir fora do workspace atual, qualquer schema anterior ou commit com versao `1`;
- se o schema `1` nao existir, documentar explicitamente que a primeira migracao segura passara a ser da versao `2` em diante.

### 3. Introduzir classe de migrations

- criar objeto dedicado de migrations Room;
- mover a configuracao de banco para usar `addMigrations(...)`;
- manter rollback claro por versao.

### 4. Primeira migracao segura

- a proxima mudanca estrutural deve subir a base para `version = 3`;
- a migracao `2 -> 3` deve ser explicita, coberta por schema exportado e sem perda silenciosa;
- a partir desse ponto, `fallbackToDestructiveMigration()` deve ser removido.

### 5. Cobertura minima esperada

- `gradlew tasks --no-daemon --console=plain`;
- `gradlew assembleDebug --no-daemon --console=plain`;
- teste de migration, se viavel no ambiente da fase;
- smoke manual minimo de login, dashboard, patio e cadastro local.

## Requisitos antes da remocao final

1. baseline de schema atual commitada;
2. estrategia clara para casos com banco local preexistente;
3. entidades criticas estabilizadas o suficiente para evitar churn de schema em cascata;
4. plano de rollback documentado.

## Relacao com a trilha mestre

Este documento destrava a proxima fatia recomendada em `ANDROID_ROADMAP.md`:

- `LP-AND-002 - Planejar substituicao controlada de migracao destrutiva`

Enquanto essa fase nao ocorrer, o app pode continuar evoluindo em UI e identidade, mas ainda nao deve ser tratado como base final segura para dados offline persistentes.
