# LavaPrime Baseline System State

## 1. Identificacao da baseline

- Produto: LavaPrime
- Escopo de origem: `LP-TEST-001`
- Ultima mudanca absorvida na baseline: `LP-WEB-011`
- Data da baseline: `2026-06-27`
- Repositorio: `C:\Users\kamel\OneDrive\Projetos Kamel\Projeto_App_LavaJato`
- Branch atual: `primyo/onboarding`
- HEAD observado: `a3f26fa`

## 2. Versao atual

- Versao declarada em `package.json`: `1.0.0`
- Runtime local observado: `node v24.16.0`
- NPM local observado: `11.13.0`
- Runtime esperado no workflow CI: `Node.js 22`

## 3. Estado atual do worktree

O estado atual do repositorio nao esta limpo. A baseline foi congelada sobre um worktree com alteracoes preexistentes fora do escopo desta fase.

Alteracoes observadas fora do escopo de `LP-TEST-001`:

- modificacoes locais em `LavaPrimeAndroidApp/**`
- documentacao local presente em `docs/primyo-adequation/`
- documentacao local presente em `docs/primyo-onboarding/`
- documentacao local presente em `docs/primyo-changes/`
- documentacao local presente em `docs/primyo-tests/`
- documentacao local presente em `docs/primyo-web-contracts/`
- script local presente em `scripts/primyo-adapter-gate.mjs`
- modulo local presente em `app/adapters/shared/adapterHelpers.js`
- modulo local presente em `app/adapters/customerAdapter.js`
- modulo local presente em `app/adapters/vehicleAdapter.js`
- modulo local presente em `app/adapters/serviceAdapter.js`
- modulo local presente em `app/adapters/productAdapter.js`
- modulo local presente em `app/adapters/supplyAdapter.js`
- modulo local presente em `app/boundaries/sessionAccessBoundary.js`
- modulo local presente em `app/utils/textFormatters.js`
- modulo local presente em `app/storage/storageBoundary.js`

Observacao importante:

- esta baseline registra a fotografia do filesystem atual, nao apenas o commit `5e95b04`;
- a primeira implementacao controlada devera comparar comportamento e arquivos contra esta baseline, nao assumir que o repositorio estava limpo.

## 4. Estrutura atual do repositorio

Estrutura de primeiro nivel observada:

```text
.github/
app/
dist/
docs/
LavaPrimeAndroidApp/
node_modules/
Projeto Landingpage/
scripts/
supabase/
.dockerignore
.editorconfig
.env.example
.gitattributes
.gitignore
CHANGELOG.md
docker-compose.yml
Dockerfile
Gestao do Projeto.xlsx
netlify.toml
nginx.conf
package-lock.json
package.json
README.md
vite.config.js
```

Estrutura web critica observada:

```text
app/index.html
app/legacy-body.html
app/main.js
app/adapters/shared/adapterHelpers.js
app/adapters/customerAdapter.js
app/adapters/vehicleAdapter.js
app/adapters/serviceAdapter.js
app/adapters/productAdapter.js
app/adapters/supplyAdapter.js
app/boundaries/sessionAccessBoundary.js
app/utils/textFormatters.js
app/storage/storageBoundary.js
app/src/main.jsx
app/src/App.jsx
app/styles.css
app/assets/brand/*
app/assets/checklist-icons/*
app/assets/data/fipe-veiculos.json
app/assets/data/fipe-veiculos.js
app/assets/templates/*
```

## 5. Build atual

Build web observado:

- comando logico: `npm run build`
- execucao efetiva usada na baseline: `npm.cmd run build`
- motivo: o alias `npm` via `npm.ps1` estava bloqueado pela politica local do PowerShell

Resultado do build:

- status: sucesso
- ferramenta: `vite v5.4.21`
- tempo observado na revalidacao mais recente: `3.58s`

Artefatos principais gerados em `dist/`:

- `dist/index.html`
- `dist/assets/manifest-cNhc6SOh.webmanifest`
- `dist/assets/index-CS6PTNb8.css`
- `dist/assets/index-CAkQpPxh.js`
- `dist/assets/main-DoX5P4YS.js`
- `dist/assets/lavaprime-icon-BPXeL0tg.png`

## 6. Comandos existentes observados

Comandos declarados em `package.json`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run verify:build`
- `npm run primyo:gate`

Validacoes observadas no workflow `.github/workflows/validate.yml`:

- `npm ci`
- `npm run build`
- `npm run verify:build`
- `node --check app/main.js`
- `node --check app/boundaries/sessionAccessBoundary.js`
- `node --check scripts/sync-fipe-local-db.mjs`
- verificacao de arquivos obrigatorios do repositorio

Validacao estrutural observada no gate local atual:

- `node --check scripts/primyo-adapter-gate.mjs`
- `node scripts/primyo-adapter-gate.mjs`
- `node --check app/adapters/shared/adapterHelpers.js`
- `node --check app/adapters/customerAdapter.js`
- `node --check app/adapters/vehicleAdapter.js`
- `node --check app/adapters/serviceAdapter.js`
- `node --check app/adapters/productAdapter.js`
- `node --check app/adapters/supplyAdapter.js`
- verificacao de existencia de `app/adapters/shared/adapterHelpers.js`
- verificacao de existencia de `app/adapters/customerAdapter.js`
- verificacao de existencia de `app/adapters/vehicleAdapter.js`
- verificacao de existencia de `app/adapters/serviceAdapter.js`
- verificacao de existencia de `app/adapters/productAdapter.js`
- verificacao de existencia de `app/adapters/supplyAdapter.js`
- verificacao de exports minimos do helper compartilhado
- verificacao de exports minimos do adapter
- verificacao de exports minimos do adapter de veiculo
- verificacao de exports minimos do adapter de servico
- verificacao de exports minimos do adapter de produto
- verificacao de cenarios validos e invalidos controlados para cliente, veiculo, servico e produto
- verificacao de envelope, `validation`, `warnings`, `organizationId`, timestamps e separacao entre `id` e `sourceId`

## 7. Dependencias atuais

Dependencias web runtime:

- `react ^18.3.1`
- `react-dom ^18.3.1`

Dependencias web build:

- `vite ^5.4.10`
- `@vitejs/plugin-react ^4.3.1`

Dependencias externas e de suporte observadas:

- FIPE API pelo script `scripts/sync-fipe-local-db.mjs`
- WhatsApp via links `wa.me`
- QRServer para geracao de QR code
- Nginx, Docker, Docker Compose, Netlify
- Supabase planejado, mas nao ligado ao frontend observado

## 8. Tecnologias atuais

- web: React + Vite + JavaScript legado
- bootstrap: `app/src/main.jsx` + `app/src/App.jsx`
- core funcional web: `app/main.js`
- modulo de adapter puro de cliente: `app/adapters/customerAdapter.js`
- modulo de adapter puro de veiculo: `app/adapters/vehicleAdapter.js`
- modulo de adapter puro de servico: `app/adapters/serviceAdapter.js`
- modulo de adapter puro de produto: `app/adapters/productAdapter.js`
- modulo de adapter puro de insumo: `app/adapters/supplyAdapter.js`
- modulo de helpers compartilhados de adapter: `app/adapters/shared/adapterHelpers.js`
- subgate conceitual de adapters: `scripts/primyo-adapter-gate.mjs`, orquestrado por `scripts/primyo-gate.mjs`
- modulo de fronteiras locais: `app/boundaries/sessionAccessBoundary.js`
- modulo de helpers puros de texto e formatacao: `app/utils/textFormatters.js`
- modulo de persistencia local: `app/storage/storageBoundary.js`
- estrategia oficial de adapters do web: `docs/primyo-web-contracts/*.md`
- fronteira local de sessao/perfil: `sessionBoundary` instanciada em `app/main.js` a partir de factory em `app/boundaries/sessionAccessBoundary.js`
- fronteira local de autorizacao: `accessBoundary` instanciada em `app/main.js` a partir de factory em `app/boundaries/sessionAccessBoundary.js`
- acesso bruto ao `localStorage`: encapsulado pela `storageBoundary`, consumida por `loadBusinessStorageItem(...)` e `saveBusinessStorageItem(...)`
- markup legado preservado: `app/legacy-body.html`
- persistencia web atual: arrays em memoria + `storageBoundary` sobre `localStorage` + assets locais
- dados locais de veiculos: base FIPE em JSON/JS
- mobile: Android nativo em Kotlin + Jetpack Compose + Room
- backend futuro: Supabase com migrations versionadas

## 9. Estado atual de sessao, perfil e autorizacao local no web

O estado atual do web agora inclui duas fronteiras locais oficiais:

- `sessionBoundary`
  - possui factory em `app/boundaries/sessionAccessBoundary.js`;
  - e instanciada em `app/main.js`;
  - e exposta em `window.__lavaprimeSessionBoundary`;
  - representa perfil ativo, usuario atual e estado autenticado;
  - inicia sessao em `showPatio(...)` e `showAdmin(...)`;
  - limpa sessao em `returnToLogin()`;
  - participa da escolha de perfil em `selectProfile(...)` e da confirmacao em `confirmLogin()`;
  - ainda sincroniza `selectedProfile` e `activeSessionUser` para manter compatibilidade com o restante do monolito.

- `accessBoundary`
  - possui factory em `app/boundaries/sessionAccessBoundary.js`;
  - e instanciada em `app/main.js`;
  - e exposta em `window.__lavaprimeAccessBoundary`;
  - centraliza regras locais de autorizacao por perfil;
  - responde por acesso administrativo, acesso de operador, acesso ao patio, logout e acoes sensiveis locais;
  - e consultada por pontos criticos do web antes de navegar ou editar cadastros;
  - prepara o sistema para autenticacao e autorizacao reais futuras, sem ativa-las nesta fase.

Metodos expostos na baseline atual:

- `canAccessAdminArea()`
- `canAccessOperatorArea()`
- `canAccessYard()`
- `canManageBusinessSettings()`
- `canViewFinancial()`
- `canManageUsers()`
- `canManageClientRegistrations()`
- `canManageVehicleRegistrations()`
- `canApproveBillingClients()`
- `canLogout()`

## 10. Conclusao da fotografia tecnica

O LavaPrime atual e um produto multi-superficie com:

- shell React moderna;
- core web legado centralizado em `app/main.js`;
- fronteiras locais de sessao/perfil e autorizacao extraidas para `app/boundaries/sessionAccessBoundary.js` e oficialmente incorporadas a baseline;
- helpers puros de texto e formatacao extraidos para `app/utils/textFormatters.js`;
- boundary tecnica de persistencia local extraida para `app/storage/storageBoundary.js`;
- contratos oficiais agora conectados a uma estrategia web formal de adapters em `docs/primyo-web-contracts/`;
- `customerAdapter` criado em `app/adapters/customerAdapter.js` como primeiro adapter puro oficial, depois revisado para aderir ao baseline compartilhado de contratos, ainda sem integracao ao runtime;
- `vehicleAdapter` criado em `app/adapters/vehicleAdapter.js` como segundo adapter puro oficial, seguindo o mesmo baseline compartilhado e ainda sem integracao ao runtime;
- `serviceAdapter` criado em `app/adapters/serviceAdapter.js` como terceiro adapter puro oficial, seguindo o mesmo baseline compartilhado e ainda sem integracao ao runtime;
- `productAdapter` criado em `app/adapters/productAdapter.js` como quarto adapter puro oficial, seguindo o mesmo baseline compartilhado e ainda sem integracao ao runtime;
- `supplyAdapter` criado em `app/adapters/supplyAdapter.js` como quinto adapter puro oficial, seguindo o mesmo baseline compartilhado e ainda sem integracao ao runtime;
- `adapterHelpers` criado em `app/adapters/shared/adapterHelpers.js` como camada comum minima para identidade, envelope, metadata, warnings e `legacyRefs` dos adapters puros;
- adapters puros agora protegidos por regressao automatica minima via `scripts/primyo-adapter-gate.mjs`, ainda sem integracao ao runtime;
- persistencia web local e distribuida;
- Android existente, mas fora do escopo da primeira implementacao;
- backend Supabase preparado documentalmente e por migration, mas nao ativo no frontend atual.

## 11. Baseline de LP-WEB-004

`LP-WEB-004` passa a ser o estado oficial atual do web.

Estado absorvido:

- `app/main.js` importa `createSessionBoundary(...)` e `createAccessBoundary(...)`;
- `app/main.js` continua instanciando `sessionBoundary` e `accessBoundary`;
- `app/main.js` continua sincronizando `selectedProfile` e `activeSessionUser`;
- `app/boundaries/sessionAccessBoundary.js` hospeda somente as factories extraidas;
- nenhuma regra de negocio, tela, CSS, Supabase, banco, Android ou dependencia foi alterada.

Validacoes de encerramento:

- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- `node --check app/main.js` -> sucesso
- `node --check app/boundaries/sessionAccessBoundary.js` -> sucesso
- `node --check scripts/sync-fipe-local-db.mjs` -> sucesso
- smoke minimo de login, admin, patio, financeiro, logout, operador e console -> aprovado

## 12. Baseline de LP-WEB-005

`LP-WEB-005` passa a ser o estado oficial atual do web.

Estado absorvido:

- `app/main.js` importa helpers puros de texto e formatacao a partir de `app/utils/textFormatters.js`;
- `app/utils/textFormatters.js` hospeda apenas funcoes puras de texto, escape e mascaras simples;
- os nomes e pontos de chamada usados pelo monolito foram preservados;
- nenhuma regra de negocio, tela, CSS, storage, Supabase, banco, Android ou dependencia foi alterada.

Helpers oficialmente fora do monolito:

- `capitalize(...)`
- `escapeHtml(...)`
- `cssEscape(...)`
- `normalizeText(...)`
- `onlyDigits(...)`
- `formatPlate(...)`
- `formatPhone(...)`
- `formatCpf(...)`
- `formatCnpj(...)`

Validacoes de encerramento:

- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- `node --check app/utils/textFormatters.js` -> sucesso
- smoke minimo de login admin, navegacao, patio, financeiro, documentos, logout, login operador, patio operador e console -> aprovado

## 13. Baseline de LP-WEB-006

`LP-WEB-006` passa a ser o estado oficial atual do web.

Estado absorvido:

- `app/main.js` importa `storageBoundary` a partir de `app/storage/storageBoundary.js`;
- `app/storage/storageBoundary.js` centraliza o acesso bruto de leitura e escrita ao `localStorage`;
- `loadBusinessStorageItem(...)` e `saveBusinessStorageItem(...)` continuam existindo em `app/main.js`;
- apenas 2 chamadas diretas simples foram migradas;
- nenhuma chave, payload JSON, regra de negocio, tela, CSS, Supabase, banco, Android ou dependencia foi alterada.

Metodos expostos pela Storage Boundary:

- `read(key)`
- `write(key, value)`
- `remove(key)`
- `exists(key)`
- `safeRead(key, fallback)`
- `safeWrite(key, value)`

Validacoes de encerramento:

- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- `node --check app/storage/storageBoundary.js` -> sucesso
- smoke minimo de login administrador, financeiro, documentos, logout, login operador, patio operador e console -> aprovado

## 14. Baseline de LP-WEB-003

`LP-WEB-003` passa a ser o estado oficial atual do planejamento web para contratos.

Estado absorvido:

- `docs/primyo-web-contracts/` passa a existir como pasta oficial da estrategia de adapters do web;
- o legado web agora possui mapa formal entre shapes atuais e contratos `Customer`, `Vehicle`, `Service`, `Product`, `Supply`, `Attendance`, `Payment` e `Financial`;
- a relacao entre `app/main.js`, contratos de dados e futuros adapters foi registrada na baseline tecnica;
- o primeiro adapter recomendado passa a ser `customerAdapter`, a ser tratado em `LP-WEB-007`;
- a implementacao de adapters permanece nao iniciada nesta baseline.

Validacoes de encerramento:

- `npm.cmd run primyo:gate` -> falha inicial por lock transitorio em `dist/assets/checklist-icons`, seguida de reexecucao com sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## 15. Baseline de LP-WEB-007

`LP-WEB-007` passa a ser o estado oficial atual da camada inicial de adapters do web.

Estado absorvido:

- `app/adapters/customerAdapter.js` passa a existir como primeiro adapter puro oficial do LavaPrime Web;
- o modulo expoe `toCustomerContract(...)`, `validateCustomerContract(...)` e `createCustomerContractEnvelope(...)`;
- o modulo continua sem integracao a `app/main.js`;
- `app/main.js` permaneceu intacto;
- nenhuma tela, fluxo visual, persistencia, Supabase, banco, Android, CSS, UI ou dependencia foi alterado.

Validacoes de encerramento:

- `node --check app/adapters/customerAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## 16. Baseline de LP-WEB-007-REVISION

`LP-WEB-007-REVISION` passa a ser o estado oficial atual da camada de adapters puros do web.

Estado absorvido:

- `app/adapters/customerAdapter.js` continua sendo o primeiro adapter puro oficial do LavaPrime Web;
- a API publica `toCustomerContract(...)`, `validateCustomerContract(...)` e `createCustomerContractEnvelope(...)` foi preservada;
- o adapter agora adere ao baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
- `id` canonico, `sourceId` e `legacyRefs` passam a ter papeis formalmente distintos;
- `organizationId`, status, `createdAt`, `updatedAt` e `metadata.emittedAt` passam a depender de contexto controlado;
- `app/main.js` permaneceu intacto;
- nenhuma integracao ao runtime foi iniciada;
- `customerAdapter` passa a ser o modelo oficial de referencia para os proximos adapters.

Validacoes de encerramento:

- `node --check app/adapters/customerAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
- ocorrencia operacional de lock transitorio em `dist` durante um build isolado -> resolvida por reexecucao com resultado final limpo

## 17. Baseline de LP-WEB-008

`LP-WEB-008` passa a ser o estado oficial atual da camada de adapters puros do web.

Estado absorvido:

- `app/adapters/vehicleAdapter.js` passa a existir como segundo adapter puro oficial do LavaPrime Web;
- o modulo expoe `toVehicleContract(...)`, `validateVehicleContract(...)` e `createVehicleContractEnvelope(...)`;
- o modulo segue o baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
- `customerAdapter` permanece intacto e continua sendo o adapter de referencia da trilha;
- `vehicleAdapter` permanece fora do runtime e sem qualquer integracao a `app/main.js`;
- nenhuma regra de negocio, tela, persistencia, Supabase, banco, Android, CSS, UI ou dependencia foi alterada nesta closure;
- a baseline passa a reconhecer dois adapters puros oficiais no web antes de qualquer integracao funcional.

Validacoes de encerramento:

- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## 18. Baseline de LP-TEST-AUTO-003

`LP-TEST-AUTO-003` passa a ser o estado oficial atual do gate tecnico da trilha de adapters do web.

Estado absorvido:

- `scripts/primyo-adapter-gate.mjs` passa a existir como subgate oficial do Primyo Gate;
- `scripts/primyo-gate.mjs` passa a executar o Adapter Contract Gate antes do build e do verify;
- `customerAdapter` e `vehicleAdapter` passam a contar com regressao automatica minima em Node puro;
- o gate valida imports, exports, cenarios validos e invalidos, envelope, `validation`, `warnings`, `organizationId`, timestamps, `id` canonico e `sourceId`;
- os adapters continuam fora do runtime;
- `app/main.js` permaneceu intacto;
- nenhuma regra de negocio, Supabase, banco, Android, CSS, UI ou dependencia foi alterada nesta closure.

Validacoes de encerramento:

- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> `Adapter Gate Result: SUCCESS`
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `npm.cmd run primyo:gate` -> `Gate Result: SUCCESS`
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## 19. Baseline de LP-WEB-009

`LP-WEB-009` passa a ser o estado oficial atual da camada de adapters puros do web.

Estado absorvido:

- `app/adapters/serviceAdapter.js` passa a existir como terceiro adapter puro oficial do LavaPrime Web;
- o modulo expoe `toServiceContract(...)`, `validateServiceContract(...)` e `createServiceContractEnvelope(...)`;
- o modulo segue o baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
- `customerAdapter`, `vehicleAdapter` e `serviceAdapter` permanecem fora do runtime e sem qualquer integracao a `app/main.js`;
- o Adapter Contract Gate passa a cobrir tres adapters oficiais em Node puro;
- nenhuma regra de negocio, tela, persistencia, Supabase, banco, Android, CSS, UI ou dependencia foi alterada nesta closure.

Validacoes de encerramento:

- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `node --check app/adapters/serviceAdapter.js` -> sucesso
- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> `Adapter Gate Result: SUCCESS`
- `npm.cmd run primyo:gate` -> `Gate Result: SUCCESS`
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## 22. Baseline de LP-WEB-011

`LP-WEB-011` passa a ser o estado oficial atual da camada de adapters puros do web.

Estado absorvido:

- `app/adapters/supplyAdapter.js` passa a existir como quinto adapter puro oficial do LavaPrime Web;
- o modulo expoe `toSupplyContract(...)`, `validateSupplyContract(...)` e `createSupplyContractEnvelope(...)`;
- o modulo segue o baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
- a diferenca entre `Product` e `Supply` permanece preservada, sem misturar item vendavel, insumo tecnico ou movimentacao de estoque no mesmo contrato;
- `customerAdapter`, `vehicleAdapter`, `serviceAdapter`, `productAdapter` e `supplyAdapter` permanecem fora do runtime e sem qualquer integracao a `app/main.js`;
- o Adapter Contract Gate passa a cobrir cinco adapters oficiais em Node puro;
- nenhuma regra de negocio, tela, persistencia, Supabase, banco, Android, CSS, UI, estoque real ou dependencia foi alterada nesta closure.

Validacoes de encerramento:

- `node --check app/adapters/shared/adapterHelpers.js` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `node --check app/adapters/serviceAdapter.js` -> sucesso
- `node --check app/adapters/productAdapter.js` -> sucesso
- `node --check app/adapters/supplyAdapter.js` -> sucesso
- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> `Adapter Gate Result: SUCCESS`
- `npm.cmd run primyo:gate` -> `Gate Result: SUCCESS`
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## 20. Baseline de LP-WEB-ADAPTER-HELPERS-001

`LP-WEB-ADAPTER-HELPERS-001` passa a ser o estado oficial atual da camada compartilhada de adapters do web.

Estado absorvido:

- `app/adapters/shared/adapterHelpers.js` passa a existir como modulo oficial da trilha de adapters puros;
- `customerAdapter`, `vehicleAdapter` e `serviceAdapter` passam a reutilizar helpers estruturais comuns para identidade, envelope, metadata, warnings e `legacyRefs`;
- a API publica dos tres adapters foi preservada;
- `serviceAdapter` manteve sua propria semantica local de `validation`, sem forcar uma unificacao arriscada;
- os adapters continuam fora do runtime e sem qualquer integracao a `app/main.js`;
- nenhuma regra de negocio, tela, persistencia, Supabase, banco, Android, CSS, UI ou dependencia foi alterada nesta closure.

Validacoes de encerramento:

- `node --check app/adapters/shared/adapterHelpers.js` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `node --check app/adapters/serviceAdapter.js` -> sucesso
- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> `Adapter Gate Result: SUCCESS`
- `npm.cmd run primyo:gate` -> `Gate Result: SUCCESS`
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

## 21. Baseline de LP-WEB-010

`LP-WEB-010` passa a ser o estado oficial atual da camada de adapters puros do web.

Estado absorvido:

- `app/adapters/productAdapter.js` passa a existir como quarto adapter puro oficial do LavaPrime Web;
- o modulo expoe `toProductContract(...)`, `validateProductContract(...)` e `createProductContractEnvelope(...)`;
- o modulo segue o baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status, timestamps e compatibilidade;
- `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `productAdapter` permanecem fora do runtime e sem qualquer integracao a `app/main.js`;
- o Adapter Contract Gate passa a cobrir quatro adapters oficiais em Node puro;
- nenhuma regra de negocio, tela, persistencia, Supabase, banco, Android, CSS, UI, estoque real ou dependencia foi alterada nesta closure.

Validacoes de encerramento:

- `node --check app/adapters/shared/adapterHelpers.js` -> sucesso
- `node --check app/adapters/customerAdapter.js` -> sucesso
- `node --check app/adapters/vehicleAdapter.js` -> sucesso
- `node --check app/adapters/serviceAdapter.js` -> sucesso
- `node --check app/adapters/productAdapter.js` -> sucesso
- `node --check scripts/primyo-adapter-gate.mjs` -> sucesso
- `node scripts/primyo-adapter-gate.mjs` -> `Adapter Gate Result: SUCCESS`
- `npm.cmd run primyo:gate` -> `Gate Result: SUCCESS`
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso
