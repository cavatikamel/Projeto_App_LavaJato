# LP-SERVICE-ORDER-004 - Closure

## Objetivo da fase

Adotar a `Service Order` de forma progressiva e segura como referencia auxiliar de leitura em documentos, mantendo o legado como fonte principal e sem tocar backend.

## Entrega tecnica

- leitura progressiva limitada a `documents`;
- `serviceOrderReadModel` auxiliar criado;
- helper de resolucao por legado, source link, payment link e placa criado;
- fallback legado preservado;
- diagnostico `progressiveRead` adicionado ao snapshot de OS;
- desenho de migration futura e schema draft Supabase documentados.

## Compatibilidade preservada

- `DEMO_BOOTSTRAP` mantido;
- `CLEAN_BOOTSTRAP` nao promovido;
- Supabase fechado;
- documentos continuam renderizando igual;
- `documentHistory` continua como fonte principal visual;
- dashboard, patio e financeiro seguem sem troca de fonte principal.

## Validacoes

- `git status --short`
- `git diff --name-only`
- `node --check app/main.js`
- `node --check app/demo/lavaprimeDemoData.js`
- `node --check app/demo/lavaprimeBootstrapMode.js`
- `node --check app/demo/lavaprimeCleanBootstrap.js`
- `node scripts/primyo-adapter-gate.mjs`
- `npm.cmd run primyo:gate`
- `npm.cmd run build`
- `npm.cmd run verify:build`

## Smoke funcional

Resultado parcial.

Evidencias obtidas:

- preview local abriu em `http://127.0.0.1:4173/`;
- a tela de login foi renderizada com os campos esperados;
- a automacao confirmou a presenca estrutural dos controles administrativos e da navegacao de documentos no DOM;
- a automacao embutida nao conseguiu propagar de forma confiavel o clique do seletor de perfil na tela de login;
- por isso, a confirmacao visual completa de login admin, logout, login operador e navegacao final de documentos ficou registrada como limitada;
- nao houve erro de console capturado durante a tentativa;
- o diagnostico `progressiveRead` ficou validado pela trilha tecnica local e pelas validacoes de build/gate, mas nao por browser automation completa nesta sessao.

## Riscos

- muitos documentos antigos ainda nao possuem `sourceType/sourceId` suficiente;
- alguns recibos dependem de inferencia por placa;
- a adocao continua auxiliar e nao persistida;
- a migration real ainda depende de trilha propria de backend.

## Rollback

`git revert <hash-do-commit-da-fase>`

Reverte:

- helpers de leitura progressiva;
- enriquecimento runtime de documentos;
- bloco `progressiveRead` do diagnostico;
- documentacao de migration e schema draft.

## Proxima fase recomendada

`LP-SERVICE-ORDER-005 - Service Order shadow write design and document source enrichment`
