# LP-WEB-DATA-CLEANUP-004

## Objetivo

Endurecer fallbacks minimos das superficies criticas antes de qualquer teste real com `CLEAN_BOOTSTRAP`, mantendo `DEMO_BOOTSTRAP` como modo padrao.

## Fallbacks mapeados

- dashboard;
- clientes;
- veiculos;
- patio;
- financeiro;
- faturas;
- pagamentos;
- relatorios;
- documentos e recibos;
- vinculos entre cliente, veiculo e faturamento.

## Fallbacks adicionados

- geracao segura de `billingClient.id` com colecao vazia;
- geracao segura de `billingInvoice.id` com colecao vazia;
- empty state explicito na tabela de clientes;
- empty state explicito na tabela de veiculos;
- empty state explicito na tabela de pagamentos em aberto;
- empty state explicito na tabela do fluxo de caixa;
- empty state explicito na tabela de faturas.

## Diagnostico protegido

`window.__lavaprimeCleanBootstrapReadiness` foi mantido como diagnostico silencioso e passou a expor cobertura adicional de fallback por superficie critica.

## Validacoes executadas

- `node --check app/main.js` -> sucesso;
- `node --check app/demo/lavaprimeDemoData.js` -> sucesso;
- `node --check app/demo/lavaprimeBootstrapMode.js` -> sucesso;
- `node --check app/demo/lavaprimeCleanBootstrap.js` -> sucesso;
- `node scripts/primyo-adapter-gate.mjs` -> sucesso;
- `npm.cmd run primyo:gate` -> sucesso;
- `npm.cmd run build` -> sucesso com warning nao bloqueante de chunk acima de `500 kB`;
- `npm.cmd run verify:build` -> sucesso.

## Smoke manual

- dashboard admin carregou;
- `Cadastros > Clientes` carregou;
- patio admin carregou;
- financeiro admin carregou;
- `Recibos e Documentos` carregou;
- logout admin funcionou;
- patio operador carregou;
- console permaneceu sem erro bloqueante;
- o browser nao expôs o objeto global de readiness durante a verificacao visual, mas o comportamento observado permaneceu coerente com `DEMO_BOOTSTRAP` como padrao.

## Garantias preservadas

- `DEMO_BOOTSTRAP` continua o modo padrao;
- `CLEAN_BOOTSTRAP` continua protegido e nao ativo por padrao;
- nenhuma seed demo foi removida;
- nenhuma alteracao visual intencional foi introduzida;
- nenhuma regra de negocio, salvamento, permissao ou autenticacao foi alterada;
- Supabase continua fechado.

## Limitacoes

- os fallbacks impedem quebra estrutural basica, mas nao substituem a massa demo para uso semantico real;
- os vinculos cross-domain continuam sendo o principal bloqueio para um bootstrap limpo completo;
- relatorios e documentos continuam dependentes de colecoes seed para conteudo util.

## Riscos

- algumas superficies continuam seguras apenas para vazio estrutural, nao para operacao completa em modo limpo;
- faturamento, patio e relatorios ainda dependem de vinculos seed para resultados significativos;
- qualquer troca prematura de default ainda pode produzir telas vazias demais para o fluxo real.

## Rollback

1. reverter `app/main.js`;
2. remover `docs/primyo-web-integration/CLEAN_BOOTSTRAP_FALLBACK_PLAN.md`;
3. reverter a documentacao desta fase;
4. reexecutar `node --check`, Adapter Gate, `primyo:gate`, `build`, `verify:build` e smoke rapido.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-005 - Protected CLEAN_BOOTSTRAP trial readiness`
