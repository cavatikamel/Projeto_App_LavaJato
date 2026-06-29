# Next Slice Decision

## Objetivo

Registrar a decisao oficial apos `LP-WEB-DATA-CLEANUP-007`.

## Estado atual consolidado

- os `5` clientes de `clientRegistry` continuam oficialmente classificados como massa `demo/teste`;
- a massa demo principal permanece isolada em `app/demo/lavaprimeDemoData.js`;
- `app/main.js` consome o bootstrap por meio de `app/demo/lavaprimeBootstrapMode.js`;
- `app/demo/lavaprimeCleanBootstrap.js` continua existindo como bootstrap limpo estrutural e protegido;
- `window.__lavaprimeCleanBootstrapReadiness`, `window.__lavaprimeCleanBootstrapTrialReadiness` e `window.__lavaprimeCleanBootstrapTrialExecution` continuam como diagnosticos internos somente leitura;
- `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` receberam hardening semantico minimo adicional;
- `DEMO_BOOTSTRAP` continua o modo padrao;
- nenhuma remocao direta de seed foi executada;
- o modo limpo continua sem base suficiente para virar default;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-008 - Protected clean bootstrap trial reassessment after semantic hardening`

## Justificativa

`LP-WEB-DATA-CLEANUP-008` passa a ser a melhor proxima fatia porque:

1. a segregacao inicial entre bootstrap demo e bootstrap limpo ja existe;
2. a revisao de dependencias residuais e o trial protegido ja foram executados;
3. o hardening semantico reduziu o risco de quebra nas superficies criticas do trial;
4. o proximo passo seguro passa a ser reavaliar o trial protegido com essas novas protecoes;
5. ainda nao existe base limpa/persistida suficiente para discutir promocao de default.

## Fatias rejeitadas por enquanto

- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto a reavaliacao do trial protegido nao provar estabilidade suficiente;
- qualquer remocao real da seed demo:
  - rejeitada antes de comprovacao de que dashboard, patio, relatorios e documentos sobrevivem sem a seed;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir bootstrap limpo validado;
- qualquer ampliacao do `shadow read`:
  - rejeitada enquanto a trilha de cleanup nao estabilizar melhor a diferenca entre ambiente demo e ambiente limpo;
- qualquer integracao de `idResolver` ao runtime:
  - continua cedo demais.

## Direcao recomendada

`LP-WEB-DATA-CLEANUP-008` deve:

1. reexecutar o trial protegido com o hardening aplicado;
2. confirmar se o diagnostico reduz ou elimina superficies semanticamente inseguras para o trial;
3. manter `DEMO_BOOTSTRAP` como padrao oficial;
4. revalidar dashboard, clientes, patio, financeiro e relatorios/documentos;
5. continuar sem abrir Supabase runtime.

## Resultado desta fase

- bootstrap demo e bootstrap limpo seguem segregados;
- a dependencia residual da seed demo segue mapeada por diagnosticos protegidos;
- as superficies criticas do trial agora contam com fallback semantico adicional;
- nenhuma seed foi removida;
- nenhuma tela foi quebrada;
- o modo demo continuou padrao.
