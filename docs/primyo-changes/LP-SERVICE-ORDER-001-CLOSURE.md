# LP-SERVICE-ORDER-001 - Closure

- Objetivo da fase: criar a fundacao tecnica para tratar cada atendimento como `Service Order` interna, mantendo a interface atual orientada a `Atendimento`.
- Bridge implementada: `app/main.js` agora constroi `Service Orders` a partir de `patioVehicles`, vinculando cliente, veiculo, servicos, produtos, insumos, pagamentos, documentos e faturamento derivado quando disponiveis.
- Modelo criado: OS interna com `id`, `orderNumber`, `legacyAttendanceId`, `customer`, `vehicle`, `status`, datas operacionais, itens, pagamentos, totais, documentos, eventos, diagnostico de origem e metadados de compatibilidade.
- Numeracao inicial: formato local `OS-AAAA-######`, deterministico a partir do legado atual, com sufixo incremental para colisao detectada na mesma coleta. Numeracao definitiva continua dependente de backend/Supabase.
- Lifecycle mapeado: `agendado -> scheduled`, `aguardando -> waiting`, `lavando -> in_progress`, `pronto -> ready`, `finalizado -> completed`, `cancelado -> cancelled`, com fallback controlado para status nao suportado.
- Diagnostico criado: `window.__lavaprimeGetServiceOrderDiagnostics?.()` e espelho silencioso em `document.documentElement.dataset.*` + `#lavaprime-service-order-diagnostics`.
- Arquivos alterados: `app/main.js`, `docs/primyo-service-orders/**`, `docs/primyo-changes/LP-SERVICE-ORDER-001.md`, `docs/primyo-adequation/CHANGE_CONTROL.md`, `docs/primyo-adequation/NEXT_SLICE_DECISION.md`, `docs/primyo-tests/REGRESSION_MATRIX.md`, `docs/primyo-tests/TEST_GATE_POLICY.md`.
- Validações executadas: `node --check app/main.js`, `node --check app/demo/lavaprimeDemoData.js`, `node --check app/demo/lavaprimeBootstrapMode.js`, `node --check app/demo/lavaprimeCleanBootstrap.js`, `node scripts/primyo-adapter-gate.mjs`, `npm.cmd run primyo:gate`, `npm.cmd run build`, `npm.cmd run verify:build`.
- Resultado das validacoes: pack tecnico passou; warning nao bloqueante de chunk acima de 500 kB permaneceu conhecido.
- Smoke funcional: parcial por limitacao do browser automatizado. Splash/login renderizaram, o shell administrativo foi observado carregado, e os checks de build/gate nao indicaram regressao estrutural. A interacao completa de login admin/operador, logout e consulta direta do diagnostico por console nao ficou confirmada via automacao.
- Supabase: continua fechado.
- Bootstrap: `DEMO_BOOTSTRAP` permanece padrao; `CLEAN_BOOTSTRAP` nao foi promovido.
- Riscos: persistencia de OS ainda nao existe; numeracao local nao e definitiva; smoke funcional ficou parcial; a confirmacao remota do diagnostico global depende de fase especifica de observabilidade/interacao mais confiavel.
- Rollback: `git revert <hash-do-commit-da-fase>` e remocao das funcoes/helpers de Service Order e dos documentos criados nesta fase.
- Proxima fatia recomendada: `LP-SERVICE-ORDER-002 - Service Order persistence boundary and explicit links`.
- Push: nao houve push.
