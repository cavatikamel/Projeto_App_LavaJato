# Next Slice Decision

## Objetivo

Registrar a decisao oficial apos `LP-WEB-DATA-CLEANUP-006`.

## Estado atual consolidado

- os `5` clientes de `clientRegistry` continuam oficialmente classificados como massa `demo/teste`;
- a massa demo principal permanece isolada em `app/demo/lavaprimeDemoData.js`;
- `app/main.js` passou a consumir o bootstrap por meio de `app/demo/lavaprimeBootstrapMode.js`;
- `app/demo/lavaprimeCleanBootstrap.js` passa a existir como bootstrap limpo estrutural e protegido;
- `window.__lavaprimeCleanBootstrapReadiness` passa a mapear dependencias residuais sem trocar o modo padrao;
- `window.__lavaprimeCleanBootstrapTrialReadiness` passa a registrar se um trial protegido futuro pode ser iniciado sem promover o modo limpo a default;
- `window.__lavaprimeCleanBootstrapTrialExecution` passa a registrar o resultado tecnico previsto do trial protegido;
- as superficies criticas agora possuem fallback estrutural minimo adicional para clientes, veiculos, pagamentos, caixa e faturas;
- `DEMO_BOOTSTRAP` continua o modo padrao;
- nenhuma remocao direta de seed foi executada;
- dashboard, clientes, patio, financeiro e relatorios continuam dependendo da seed demo;
- o trial protegido confirma que `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` continuam bloqueando qualquer promocao do modo limpo;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-007 - Targeted semantic hardening after protected clean bootstrap trial`

## Justificativa

`LP-WEB-DATA-CLEANUP-007` passa a ser a melhor proxima fatia porque:

1. a segregacao inicial entre bootstrap demo e bootstrap limpo ja existe;
2. a revisao de dependencias residuais ja confirmou que o modo limpo ainda nao pode virar padrao;
3. o trial protegido ja foi executado apenas como diagnostico e manteve `DEMO_BOOTSTRAP` como default;
4. o resultado do trial indica bloqueios semanticos residuais concentrados em `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks`;
5. o proximo passo seguro passa a ser endurecer essas lacunas sem abrir Supabase nem trocar o default.

## Fatias rejeitadas por enquanto

- qualquer remocao direta da massa demo:
  - rejeitada enquanto houver dependencia ativa de renderizacao, smoke e relatorios;
- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto os bloqueios semanticos residuais nao forem reduzidos de forma controlada;
- qualquer remocao real da seed demo:
  - rejeitada antes de nova rodada de hardening semantico e de comprovacao de que as superficies criticas sobrevivem sem a seed;
- qualquer ampliacao do `shadow read`:
  - rejeitada ate a trilha de cleanup estabilizar a diferenca entre ambiente demo e ambiente limpo;
- qualquer integracao de `idResolver` ao runtime:
  - continua cedo demais;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir bootstrap limpo validado.

## Direcao recomendada

`LP-WEB-DATA-CLEANUP-007` deve:

1. atacar os bloqueios semanticos residuais identificados no trial protegido;
2. continuar sem trocar o modo padrao;
3. manter `DEMO_BOOTSTRAP` como padrao oficial;
4. revalidar dashboard, clientes, patio, financeiro e relatorios em cada microajuste;
5. continuar sem abrir Supabase runtime.

## Resultado desta fase

- bootstrap demo e bootstrap limpo seguem segregados;
- a dependencia residual da seed demo segue mapeada por diagnosticos protegidos;
- clientes, veiculos, pagamentos, caixa e faturas continuam com fallback estrutural minimo;
- o trial protegido foi executado apenas de forma tecnica, sem troca de default;
- nenhuma seed foi removida;
- nenhuma tela foi quebrada;
- o modo demo continuou padrao;
- os bloqueios semanticos remanescentes ficaram mais claros.
