# Next Slice Decision

## Objetivo

Registrar a decisao oficial apos `LP-WEB-DATA-CLEANUP-008`.

## Estado atual consolidado

- os `5` clientes de `clientRegistry` continuam oficialmente classificados como massa `demo/teste`;
- a massa demo principal permanece isolada em `app/demo/lavaprimeDemoData.js`;
- `app/main.js` consome o bootstrap por meio de `app/demo/lavaprimeBootstrapMode.js`;
- `app/demo/lavaprimeCleanBootstrap.js` continua existindo como bootstrap limpo estrutural e protegido;
- `window.__lavaprimeCleanBootstrapReadiness`, `window.__lavaprimeCleanBootstrapTrialReadiness` e `window.__lavaprimeCleanBootstrapTrialExecution` continuam como diagnosticos internos somente leitura;
- `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` receberam hardening semantico minimo adicional;
- a reavaliacao do trial protegido agora compara explicitamente o estado pre-hardening com o estado atual;
- as `5` superficies antes inseguras deixaram de bloquear o trial protegido;
- `DEMO_BOOTSTRAP` continua o modo padrao;
- nenhuma remocao direta de seed foi executada;
- o modo limpo continua sem base suficiente nem observabilidade suficiente para virar default;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-009 - Protected clean bootstrap trial observability review`

## Justificativa

`LP-WEB-DATA-CLEANUP-009` passa a ser a melhor proxima fatia porque:

1. a segregacao inicial entre bootstrap demo e bootstrap limpo ja existe;
2. a revisao de dependencias residuais e o trial protegido ja foram executados;
3. o hardening semantico reduziu o risco de quebra nas superficies criticas do trial;
4. a reavaliacao confirmou que o trial protegido ficou mais viavel e nao manteve superficies semanticamente inseguras imediatas;
5. ainda nao existe base limpa/persistida suficiente para discutir promocao de default;
6. a observabilidade do trial no browser continua fraca e vira o proximo gargalo conservador.

## Fatias rejeitadas por enquanto

- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto a observabilidade do trial protegido nao produzir evidencia mais confiavel e enquanto a base limpa seguir semanticamente pobre;
- qualquer remocao real da seed demo:
  - rejeitada antes de comprovacao de que dashboard, patio, relatorios e documentos sobrevivem sem a seed;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir bootstrap limpo validado;
- qualquer ampliacao do `shadow read`:
  - rejeitada enquanto a trilha de cleanup nao estabilizar melhor a diferenca entre ambiente demo e ambiente limpo;
- qualquer integracao de `idResolver` ao runtime:
  - continua cedo demais.

## Direcao recomendada

`LP-WEB-DATA-CLEANUP-009` deve:

1. melhorar a verificacao pratica de `window.__lavaprimeCleanBootstrapReadiness`, `window.__lavaprimeCleanBootstrapTrialReadiness` e `window.__lavaprimeCleanBootstrapTrialExecution`;
2. manter `DEMO_BOOTSTRAP` como padrao oficial;
3. revalidar dashboard, clientes, patio, financeiro e relatorios/documentos;
4. continuar sem abrir Supabase runtime;
5. continuar sem remover a seed demo.

## Resultado desta fase

- bootstrap demo e bootstrap limpo seguem segregados;
- a dependencia residual da seed demo segue mapeada por diagnosticos protegidos;
- as superficies criticas do trial agora contam com fallback semantico adicional;
- a reavaliacao confirmou melhora do trial protegido, mas nao autorizou promocao do modo limpo;
- nenhuma seed foi removida;
- nenhuma tela foi quebrada;
- o modo demo continuou padrao.
