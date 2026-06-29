# Clean Bootstrap Fallback Plan

## Objetivo

Registrar os fallbacks minimos exigidos antes de qualquer teste controlado com `CLEAN_BOOTSTRAP`.

## Estado atual

- modo padrao: `DEMO_BOOTSTRAP`;
- modo limpo: `CLEAN_BOOTSTRAP`;
- Supabase: fechado;
- seed demo: mantida;
- diagnostico protegido: `window.__lavaprimeCleanBootstrapReadiness`.

## Superficies mapeadas

### Dashboard

- estado: parcialmente seguro;
- cobertura atual:
  - metricas com `reduce(..., 0)`;
  - denominadores protegidos com `Math.max(..., 1)`;
- risco restante:
  - alertas e cards continuam dependentes de relacionamentos seed.

### Clientes

- estado: endurecido nesta fase;
- cobertura atual:
  - tabela com empty state explicito;
  - validacao legado continua silenciosa e somente leitura;
- risco restante:
  - sem seed, a tela fica estruturalmente segura, mas sem relacionamentos operacionais.

### Veiculos

- estado: endurecido nesta fase;
- cobertura atual:
  - tabela com empty state explicito;
  - owner lookup tolera ausencia de vinculo;
- risco restante:
  - ownership e historico continuam dependentes de seed para demonstracao realista.

### Patio

- estado: parcialmente seguro;
- cobertura atual:
  - fallback operacional ja existente para filas vazias;
  - lookup de cliente por placa/telefone ja tolera ausencia;
- risco restante:
  - fluxo continua semanticamente dependente da seed.

### Financeiro

- estado: endurecido nesta fase;
- cobertura atual:
  - tabela de pagamentos com empty state explicito;
  - tabela de caixa com empty state explicito;
  - graficos com fallback existente para ausencia de movimentos;
- risco restante:
  - somatorios ficam seguros, mas continuam vazios sem seed.

### Faturas

- estado: endurecido nesta fase;
- cobertura atual:
  - tabela com empty state explicito;
  - geracao de IDs segura com colecao vazia;
- risco restante:
  - ciclo de faturamento ainda depende de cliente faturado aprovado.

### Relatorios

- estado: parcialmente seguro;
- cobertura atual:
  - graficos financeiros ja mostram empty state;
  - exportacoes continuam operando com colecoes vazias quando acionadas;
- risco restante:
  - relatorios continuam pobres ou vazios sem seed.

### Documentos e recibos

- estado: parcialmente seguro;
- cobertura atual:
  - historico documental ja possui empty state;
  - contadores de documentos e recibos suportam colecoes vazias;
- risco restante:
  - emissao real continua refletindo dados legados/demo quando presentes.

### Vinculos cliente/veiculo/faturamento

- estado: diagnostico apenas;
- cobertura atual:
  - readiness protegido mapeia dependencia residual;
- risco restante:
  - principal bloqueio para qualquer trial mais agressivo com bootstrap limpo.

## Fallback minimo considerado suficiente nesta fase

- nenhuma tabela critica renderiza corpo vazio sem mensagem;
- IDs de faturamento nao quebram em colecao vazia;
- somatorios principais nao geram `NaN`;
- o diagnostico protegido diferencia dependencia residual de cobertura estrutural de fallback.

## O que esta fase nao faz

- nao troca o modo padrao;
- nao remove seed demo;
- nao abre Supabase;
- nao altera save, autenticacao, permissao ou UI.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-005 - Protected CLEAN_BOOTSTRAP trial readiness`

Objetivo sugerido:

- exercitar um trial controlado e nao padrao do bootstrap limpo;
- verificar quais superficies permanecem apenas vazias e quais ainda quebram semanticamente;
- manter fallback protegido e rollback simples.
