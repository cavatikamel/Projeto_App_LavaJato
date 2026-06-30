# Next Slice Decision

## Objetivo

Registrar a decisao oficial apos `LP-WEB-DATA-CLEANUP-011`.

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
- os bloqueios restantes para promocao de `CLEAN_BOOTSTRAP` a default passam a ficar consolidados em documento unico;
- o modo limpo continua sem base suficiente para virar default, apesar da observabilidade tecnica confirmada;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-012 - Clean bootstrap activation prerequisites plan`

## Justificativa

`LP-WEB-DATA-CLEANUP-012` passa a ser a melhor proxima fatia porque:

1. a segregacao inicial entre bootstrap demo e bootstrap limpo ja existe;
2. a revisao de dependencias residuais e o trial protegido ja foram executados;
3. o hardening semantico reduziu o risco de quebra nas superficies criticas do trial;
4. a reavaliacao confirmou que o trial protegido ficou mais viavel e nao manteve superficies semanticamente inseguras imediatas;
5. a observabilidade tecnica agora foi confirmada em `window` e no espelho do DOM;
6. os bloqueios remanescentes ja foram consolidados e deixam claro que o gargalo principal e readiness de dados e ativacao gradual;
7. o proximo passo seguro e transformar esses bloqueios em prerequisitos formais antes de qualquer conversa sobre ativacao do modo limpo.

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

`LP-WEB-DATA-CLEANUP-012` deve:

1. transformar os bloqueios consolidados em prerequisitos formais de ativacao gradual;
2. definir criterios de entrada e saida para um futuro trial de ativacao controlada;
3. manter `DEMO_BOOTSTRAP` como padrao oficial;
4. continuar sem abrir Supabase runtime;
5. continuar sem remover a seed demo.

## Resultado desta fase

- bootstrap demo e bootstrap limpo seguem segregados;
- a dependencia residual da seed demo segue mapeada por diagnosticos protegidos;
- as superficies criticas do trial agora contam com fallback semantico adicional;
- a reavaliacao, a confirmacao operacional e a consolidacao dos bloqueios nao autorizaram promocao do modo limpo;
- nenhuma seed foi removida;
- nenhuma tela foi quebrada;
- o modo demo continuou padrao.
