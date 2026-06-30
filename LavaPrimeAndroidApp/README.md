# LavaPrime Android App

Base Android nativa do LavaPrime para smartphone e tablet, sem WebView e preparada para operar offline com sincronizacao posterior.

## Versao

`LavaPrime_Mobile_V1.09`

## O que esta base entrega agora

- Kotlin + Jetpack Compose + Material 3.
- Room como base local principal.
- Estrutura pronta para backend compartilhado com a plataforma web.
- Login mobile com perfis Administrador e Operador.
- Menu lateral no padrao mobile, aberto por botao e recolhido ao tocar fora.
- Patio com cards grandes, filtro por status, alertas e acoes rapidas.
- Cadastro mobile funcional de clientes e veiculos.
- Auditoria local e fila de sincronizacao para mudancas importantes.
- Politica de conflito preparada como `last_write_wins` usando `updatedAt`.
- Monitor de conectividade para refletir online/offline na interface.

## Arquitetura atual

- `ui/screens/` concentra telas menores e mais focadas.
- `ui/viewmodel/` concentra estado por dominio: autenticacao, patio, cadastros e sync.
- `data/repository/` centraliza regras locais e escrita em Room.
- `sync/` concentra conectividade, configuracao de backend e coordenacao de sincronizacao.

## Como abrir no Android Studio

1. Abra a pasta `LavaPrimeAndroidApp`.
2. Aguarde o Gradle Sync.
3. Execute em aparelho ou emulador com o JDK embutido do Android Studio.

## Como apontar para a mesma base do web

Defina no ambiente local ou em `local.properties`:

- `LAVAPRIME_SUPABASE_URL=https://SEU-PROJETO.supabase.co`
- `LAVAPRIME_SUPABASE_ANON_KEY=...`
- `LAVAPRIME_SUPABASE_ORGANIZATION_ID=local-demo`

Esses valores entram no `BuildConfig` do app Android. A arquitetura ja ficou pronta para compartilhar a mesma base do web, mas a sincronizacao remota efetiva ainda depende das credenciais reais e da conclusao do conector Supabase/API.

## Regra de continuidade

O LavaPrime Web continua sendo a referencia funcional e visual. Cada modulo Android deve preservar a regra de negocio da web, mas com:

- formularios verticais e largos;
- cards no lugar de tabelas extensas;
- acoes principais acessiveis no polegar;
- funcionamento offline-first;
- sincronizacao segura ao reconectar.

## Status da sincronizacao

Nesta fase, a arquitetura offline/sync foi preparada, a fila local esta ativa e o app ja registra auditoria e pendencias. O conector remoto definitivo ainda precisa ser ligado ao Supabase do projeto web.
