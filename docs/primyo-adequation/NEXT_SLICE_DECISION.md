# Next Slice Decision

## Objetivo

Registrar a decisao oficial apos `LP-WEB-DATA-CLEANUP-010`.

## Estado atual consolidado

- os `5` clientes de `clientRegistry` continuam oficialmente classificados como massa `demo/teste`;
- a massa demo principal permanece isolada em `app/demo/lavaprimeDemoData.js`;
- `app/main.js` consome o bootstrap por meio de `app/demo/lavaprimeBootstrapMode.js`;
- `app/demo/lavaprimeCleanBootstrap.js` continua existindo como bootstrap limpo estrutural e protegido;
- `window.__lavaprimeCleanBootstrapReadiness`, `window.__lavaprimeCleanBootstrapTrialReadiness` e `window.__lavaprimeCleanBootstrapTrialExecution` continuam como diagnosticos internos somente leitura;
- `window.__lavaprimeGetCleanBootstrapDiagnostics?.()` e `window.__lavaprimeDiagnostics?.cleanBootstrap` passam a existir como ponto oficial de leitura manual no browser;
- o runtime publica tambem um espelho tecnico somente leitura no DOM para automacao e inspecao controlada;
- `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` receberam hardening semantico minimo adicional;
- a reavaliacao do trial protegido agora compara explicitamente o estado pre-hardening com o estado atual;
- as `5` superficies antes inseguras deixaram de bloquear o trial protegido;
- `DEMO_BOOTSTRAP` continua o modo padrao;
- nenhuma remocao direta de seed foi executada;
- a confirmacao operacional mostrou que os globais de `window` ficam repetiveis no contexto de avaliacao direta da pagina;
- o espelho DOM continua sendo a evidencia mais estavel para automacao e aceite repetivel;
- o estado pre-login ainda expoe snapshot parcial e nao deve ser usado como referencia final de readiness operacional;
- o modo limpo continua sem base suficiente para virar default, apesar da observabilidade tecnica confirmada;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-011 - Clean bootstrap default blockers consolidation`

## Justificativa

`LP-WEB-DATA-CLEANUP-011` passa a ser a melhor proxima fatia porque:

1. a segregacao inicial entre bootstrap demo e bootstrap limpo ja existe;
2. a revisao de dependencias residuais e o trial protegido ja foram executados;
3. o hardening semantico reduziu o risco de quebra nas superficies criticas do trial;
4. a reavaliacao confirmou que o trial protegido ficou mais viavel e nao manteve superficies semanticamente inseguras imediatas;
5. a observabilidade tecnica agora foi confirmada em `window` e no espelho do DOM;
6. o bloqueio principal deixou de ser observabilidade e voltou a ser falta de base limpa/persistida suficiente para discutir promocao de default;
7. o proximo passo seguro e consolidar esses bloqueios remanescentes antes de qualquer nova conversa sobre ativacao do modo limpo.

## Fatias rejeitadas por enquanto

- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto a base limpa seguir semanticamente pobre e sem relacionamentos persistidos suficientes;
- qualquer remocao real da seed demo:
  - rejeitada antes de comprovacao de que dashboard, patio, relatorios e documentos sobrevivem sem a seed;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir bootstrap limpo validado;
- qualquer ampliacao do `shadow read`:
  - rejeitada enquanto a trilha de cleanup nao estabilizar melhor a diferenca entre ambiente demo e ambiente limpo;
- qualquer integracao de `idResolver` ao runtime:
  - continua cedo demais.

## Direcao recomendada

`LP-WEB-DATA-CLEANUP-011` deve:

1. consolidar os bloqueios restantes para promocao de `CLEAN_BOOTSTRAP` a default;
2. separar bloqueios de observabilidade ja resolvidos dos bloqueios de dados limpos e relacionamentos persistidos;
3. manter `DEMO_BOOTSTRAP` como padrao oficial;
4. continuar sem abrir Supabase runtime;
5. continuar sem remover a seed demo.

## Resultado desta fase

- bootstrap demo e bootstrap limpo seguem segregados;
- a dependencia residual da seed demo segue mapeada por diagnosticos protegidos;
- as superficies criticas do trial agora contam com fallback semantico adicional;
- a reavaliacao e a confirmacao operacional consolidaram a melhora do trial protegido, mas nao autorizaram promocao do modo limpo;
- nenhuma seed foi removida;
- nenhuma tela foi quebrada;
- o modo demo continuou padrao.
