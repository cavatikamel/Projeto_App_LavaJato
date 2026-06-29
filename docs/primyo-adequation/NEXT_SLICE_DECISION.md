# Next Slice Decision

## Objetivo

Registrar a decisao oficial apos `LP-WEB-DATA-CLEANUP-005`.

## Estado atual consolidado

- os `5` clientes de `clientRegistry` continuam oficialmente classificados como massa `demo/teste`;
- a massa demo principal permanece isolada em `app/demo/lavaprimeDemoData.js`;
- `app/main.js` passou a consumir o bootstrap por meio de `app/demo/lavaprimeBootstrapMode.js`;
- `app/demo/lavaprimeCleanBootstrap.js` passa a existir como bootstrap limpo estrutural e protegido;
- `window.__lavaprimeCleanBootstrapReadiness` passa a mapear dependencias residuais sem trocar o modo padrao;
- `window.__lavaprimeCleanBootstrapTrialReadiness` passa a registrar se um trial protegido futuro pode ser iniciado sem promover o modo limpo a default;
- as superficies criticas agora possuem fallback estrutural minimo adicional para clientes, veiculos, pagamentos, caixa e faturas;
- `DEMO_BOOTSTRAP` continua o modo padrao;
- nenhuma remocao direta de seed foi executada;
- dashboard, clientes, patio, financeiro e relatorios continuam dependendo da seed demo;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-006 - Protected CLEAN_BOOTSTRAP trial execution`

## Justificativa

`LP-WEB-DATA-CLEANUP-006` passa a ser a melhor proxima fatia porque:

1. a segregacao inicial entre bootstrap demo e bootstrap limpo ja existe;
2. a revisao de dependencias residuais ja confirmou que o modo limpo ainda nao pode virar padrao;
3. o mecanismo de trial protegido ja foi preparado e continua sem acionar o modo limpo;
4. o proximo passo seguro passa a ser executar um trial controlado e nao padrao do bootstrap limpo;
5. isso permite medir lacunas reais restantes sem abrir Supabase nem trocar o default.

## Fatias rejeitadas por enquanto

- qualquer remocao direta da massa demo:
  - rejeitada enquanto houver dependencia ativa de renderizacao, smoke e relatorios;
- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto o trial protegido nao for executado com sucesso e sem risco operacional;
- qualquer remocao real da seed demo:
  - rejeitada antes da execucao do trial protegido e da comprovacao de que as superficies criticas sobrevivem sem a seed;
- qualquer ampliacao do `shadow read`:
  - rejeitada ate a trilha de cleanup estabilizar a diferenca entre ambiente demo e ambiente limpo;
- qualquer integracao de `idResolver` ao runtime:
  - continua cedo demais;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir bootstrap limpo validado.

## Direcao recomendada

`LP-WEB-DATA-CLEANUP-006` deve:

1. executar um trial protegido do `CLEAN_BOOTSTRAP` sem trocar o modo padrao;
2. medir quais superficies ficam estruturalmente seguras e quais ainda falham semanticamente;
3. manter `DEMO_BOOTSTRAP` como padrao oficial;
4. revalidar dashboard, clientes, patio, financeiro e relatorios em cada microajuste;
5. continuar sem abrir Supabase runtime.

## Resultado desta fase

- bootstrap demo e bootstrap limpo seguem segregados;
- a dependencia residual da seed demo ficou mapeada por diagnostico protegido;
- clientes, veiculos, pagamentos, caixa e faturas ganharam fallback estrutural minimo;
- o mecanismo de trial protegido passou a ficar disponivel sem trocar o default;
- nenhuma seed foi removida;
- nenhuma tela foi quebrada;
- o modo demo continuou padrao;
- a preparacao para um trial limpo controlado ficou mais clara.
