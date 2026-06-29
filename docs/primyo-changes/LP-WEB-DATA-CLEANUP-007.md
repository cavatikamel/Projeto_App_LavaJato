# LP-WEB-DATA-CLEANUP-007

## Objetivo

Endurecer semanticamente as superficies criticas que ainda bloqueavam um trial limpo mais real do `CLEAN_BOOTSTRAP`, sem trocar o modo padrao e sem remover a massa `demo/teste`.

## Superficies reforcadas

- `dashboard`
- `patio`
- `reports`
- `documents`
- `customerVehicleBillingLinks`

## Hardening aplicado

- agregacoes numericas do dashboard passam a usar normalizacao finita para evitar `NaN`;
- recibos, documentos e relatorios passam a normalizar linhas antes da geracao de PDF;
- lookups cross-domain entre cliente, veiculo e faturamento passam a degradar com fallback de placa, telefone e `billingClientId`;
- recibo de atendimento passa a resolver cliente/telefone com fallback sem depender de vinculo forte;
- nome do cliente e dono do veiculo passam a tolerar registros parciais sem quebrar tela ou diagnostico.

## Diagnosticos atualizados

- `window.__lavaprimeCleanBootstrapReadiness`
- `window.__lavaprimeCleanBootstrapTrialReadiness`
- `window.__lavaprimeCleanBootstrapTrialExecution`

Mudancas esperadas:

- `dashboard`, `patio`, `reports`, `documents` e `customerVehicleBillingLinks` deixam de ser tratados como bloqueios semanticos do trial protegido;
- o trial protegido continua nao autorizando promocao de `CLEAN_BOOTSTRAP` para modo padrao;
- a razao residual passa a ser falta de volume e relacionamentos persistidos suficientes para uma base limpa significativa.

## Garantias preservadas

- `DEMO_BOOTSTRAP` continua como modo padrao;
- `CLEAN_BOOTSTRAP` continua protegido e nao funcional;
- nenhuma seed demo foi removida;
- nenhuma mudanca visual intencional foi introduzida;
- nenhuma regra de negocio, permissao, autenticacao ou salvamento foi alterada;
- Supabase continua fechado.

## Validacoes previstas

- `git status --short` -> executado;
- `git diff --name-only` -> executado;
- `node --check app/main.js` -> sucesso;
- `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
- `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
- `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
- `node scripts/primyo-adapter-gate.mjs` -> sucesso;
- `npm.cmd run primyo:gate` -> sucesso;
- `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
- `npm.cmd run verify:build` -> sucesso;
- smoke manual de dashboard, clientes, patio, financeiro, relatorios/documentos, logout e patio operador -> sucesso sem erro bloqueante no console.

## Resultado do smoke manual

- login admin com `mateus.admin` carregou `Visao Geral`;
- `Cadastros > Clientes` carregou;
- `Patio de Atendimento` carregou;
- `Fluxo de caixa` carregou;
- `Recibos e Documentos` carregou;
- logout admin funcionou;
- login operador com `carlos` carregou `Patio`;
- o console permaneceu sem erros ou warnings bloqueantes;
- o comportamento observado continuou compatível com `DEMO_BOOTSTRAP` como origem ativa.

## Riscos

- os relatorios e documentos continuam semanticamente pobres sem uma base limpa real;
- os vinculos cross-domain agora degradam com fallback, mas ainda nao substituem uma origem persistida;
- o modo limpo continua inadequado para virar default mesmo com o trial mais seguro.

## Rollback

1. reverter `app/main.js`;
2. reverter `docs/primyo-web-integration/CLEAN_BOOTSTRAP_SEMANTIC_HARDENING.md`;
3. reverter a documentacao desta fase;
4. reexecutar gate, build, verify e smoke rapido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-008 - Protected clean bootstrap trial reassessment after semantic hardening`
