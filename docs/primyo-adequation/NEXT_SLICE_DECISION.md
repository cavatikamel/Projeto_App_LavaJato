# Next Slice Decision

## Objetivo

Registrar a decisao oficial apos `LP-WEB-DATA-CLEANUP-001`.

## Estado atual consolidado

- os `5` clientes de `clientRegistry` continuam oficialmente classificados como massa `demo/teste`;
- a massa demo principal de clientes, veiculos, patio, faturamento, itens de fatura e pagamentos foi isolada em `app/demo/lavaprimeDemoData.js`;
- `app/main.js` continua fonte ativa do runtime, agora consumindo o modulo demo dedicado;
- nenhuma remocao direta de seed foi executada;
- dashboard, clientes, patio, financeiro e relatorios continuam dependendo desses seeds;
- `customerAdapter` continua em `shadow read`;
- `idResolver` continua fora do runtime;
- Supabase continua fechado.

## Decisao oficial

Proxima fatia recomendada: `LP-WEB-DATA-CLEANUP-002 - Segregacao entre bootstrap demo e bootstrap limpo`

## Justificativa

`LP-WEB-DATA-CLEANUP-002` passa a ser a melhor proxima fatia porque:

1. a massa demo central ja foi mapeada e isolada;
2. a remocao ainda nao e segura enquanto dashboard, patio, clientes, financeiro e relatorios dependem dela;
3. o passo conservador agora e separar bootstrap demo de bootstrap limpo antes de qualquer remocao real;
4. isso prepara uma trilha mais segura para Supabase sem abrir runtime remoto prematuramente;
5. tambem reduz responsabilidade residual de `app/main.js` sem mexer no comportamento visivel.

## Fatias rejeitadas por enquanto

- qualquer remocao direta da massa demo:
  - rejeitada enquanto houver dependencia ativa de renderizacao, smoke e relatorios;
- qualquer ampliacao do `shadow read`:
  - rejeitada ate existir bootstrap limpo separado da massa demo;
- qualquer integracao de `idResolver` ao runtime:
  - continua cedo demais;
- qualquer etapa de Supabase:
  - continua bloqueada ate a segregacao entre ambiente demo e ambiente limpo.

## Direcao recomendada

`LP-WEB-DATA-CLEANUP-002` deve:

1. introduzir um bootstrap limpo separado do bootstrap demo;
2. manter um modo demo controlado para renderizacao local e smoke visual;
3. permitir ambiente sem seed demo central;
4. revalidar dashboard, clientes, patio, financeiro e relatorios apos a segregacao;
5. continuar sem abrir Supabase runtime.

## Resultado desta fase

- a massa demo/teste ficou mapeada e classificada;
- a massa demo central passou a ter modulo proprio;
- nenhuma tela foi quebrada;
- nenhuma remocao de dado demo foi executada;
- a preparacao para uma futura migracao limpa ficou mais clara.
