# LP-APK-008

- Change ID: `LP-APK-008`
- Tipo: `Android + Documentation Phase`
- Data: `2026-07-04`

## Objetivo

Consolidar o shell de navegacao mobile do app Android `LavaPrime`, aproximando a estrutura de telas do Web com menu agrupado por menu/submenu, fechamento correto do drawer e inclusao das superficies Android que ainda faltavam para espelhar o Web sem remover telas existentes.

## Escopo

- preservar as telas Android ja existentes;
- acrescentar telas Android faltantes como espelhos mobile do Web;
- reorganizar a navegacao em grupos e submenus para reduzir o menu principal;
- garantir fechamento do menu ao selecionar rota e ao tocar fora do drawer;
- reforcar leitura mobile para evitar texto estourado nas areas tocadas;
- atualizar progresso, change record e closure;
- validar com gate Web e build Android.

## Fora de escopo

- remover telas Android ja existentes;
- implementar regras novas de negocio;
- alterar Web, contratos Web ou Supabase;
- abrir auth remota real;
- fechar paridade funcional completa de cada modulo;
- push.

## Arquivos permitidos

- `LavaPrimeAndroidApp/app/src/main/java/**`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-changes/LP-APK-008.md`
- `docs/primyo-changes/LP-APK-008-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`

## Arquivos proibidos

- `app/main.js`
- `app/styles.css`
- `app/adapters/**`
- `app/demo/**`
- `scripts/**`
- Supabase migrations
- contratos Web
- fluxo Web
- UI Web
- relatorios Web

## Validacoes previstas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`
- `.\gradlew.bat tasks --no-daemon --console=plain`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain`

## Risco

- abrir rotas Android sem correspondencia suficiente com o shell atual;
- criar drawer longo demais ou com hierarquia confusa;
- quebrar build por rotas, icones ou composables novos;
- aparentar paridade total quando algumas telas ainda sao espelhos estruturais e nao fluxo completo.

## Rollback

- reverter apenas arquivos Android e documentais desta fase;
- preservar dirty state preexistente fora do recorte;
- nao tocar Web, Supabase ou arquivos proibidos.
