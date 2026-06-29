# Next Slice Decision

## Objetivo

Registrar a decisao oficial apos `LP-WEB-DATA-CLEANUP-003`.

## Estado atual consolidado

- os `5` clientes de `clientRegistry` continuam oficialmente classificados como massa `demo/teste`;
- a massa demo principal permanece isolada em `app/demo/lavaprimeDemoData.js`;
- `app/main.js` passou a consumir o bootstrap por meio de `app/demo/lavaprimeBootstrapMode.js`;
- `app/demo/lavaprimeCleanBootstrap.js` passa a existir como bootstrap limpo estrutural e protegido;
- `window.__lavaprimeCleanBootstrapReadiness` passa a mapear dependencias residuais sem trocar o modo padrao;
- `DEMO_BOOTSTRAP` continua o modo padrao;
- nenhuma remocao direta de seed foi executada;
- dashboard, clientes, patio, financeiro e relatorios continuam dependendo da seed demo;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-004 - Critical surface fallback hardening before clean bootstrap trial`

## Justificativa

`LP-WEB-DATA-CLEANUP-004` passa a ser a melhor proxima fatia porque:

1. a segregacao inicial entre bootstrap demo e bootstrap limpo ja existe;
2. a revisao de dependencias residuais ja confirmou que o modo limpo ainda nao pode virar padrao;
3. o proximo passo seguro e endurecer fallback e estados vazios das superficies criticas;
4. isso prepara ambiente limpo e futura migracao sem abrir Supabase prematuramente;
5. tambem evita trocar o modo padrao sem fallback protegido para dashboard, clientes, patio, financeiro, relatorios e documentos.

## Fatias rejeitadas por enquanto

- qualquer remocao direta da massa demo:
  - rejeitada enquanto houver dependencia ativa de renderizacao, smoke e relatorios;
- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto a dependencia residual nao estiver validada;
- qualquer remocao real da seed demo:
  - rejeitada antes do hardening de fallback das telas criticas;
- qualquer ampliacao do `shadow read`:
  - rejeitada ate a trilha de cleanup estabilizar a diferenca entre ambiente demo e ambiente limpo;
- qualquer integracao de `idResolver` ao runtime:
  - continua cedo demais;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir bootstrap limpo validado.

## Direcao recomendada

`LP-WEB-DATA-CLEANUP-004` deve:

1. endurecer estados vazios e fallback de dashboard, clientes, patio, financeiro, relatorios e documentos;
2. validar fallback seguro antes de qualquer teste futuro com bootstrap limpo;
3. manter `DEMO_BOOTSTRAP` como padrao oficial;
4. revalidar dashboard, clientes, patio, financeiro e relatorios em cada microajuste;
5. continuar sem abrir Supabase runtime.

## Resultado desta fase

- bootstrap demo e bootstrap limpo seguem segregados;
- a dependencia residual da seed demo ficou mapeada por diagnostico protegido;
- nenhuma seed foi removida;
- nenhuma tela foi quebrada;
- o modo demo continuou padrao;
- a preparacao para um ambiente limpo controlado ficou mais clara.
