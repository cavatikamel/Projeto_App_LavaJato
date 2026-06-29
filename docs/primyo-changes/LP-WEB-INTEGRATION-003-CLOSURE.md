# LP-WEB-INTEGRATION-003-CLOSURE

## Objetivo da fase

Revisar a cobertura atual do `Customer Adapter Shadow Read` e decidir se ja era seguro ampliar a sombra para outros pontos do fluxo de clientes.

## Cobertura atual

- o `shadow read` roda apenas na edicao de cliente existente em `Cadastros > Clientes`;
- o diagnostico segue tecnico, silencioso e apenas em memoria;
- o legado continua fonte ativa de renderizacao e salvamento.

## Fluxos candidatos

- `Novo cliente`, mas somente depois de validar melhor o dado legado e a ausencia de `sourceId` persistido;
- lista de clientes, como opcao futura de maior cobertura;
- microfase previa de validacao dos dados legados de clientes.

## Fluxos rejeitados

- salvamento de cliente;
- lista de clientes, por enquanto;
- fluxos indiretos de ownership, veiculo, faturamento e placa;
- qualquer uso com `idResolver` ou Supabase.

## Recomendacao final

- nao ampliar a sombra nesta fase;
- recomendar como proxima fatia `LP-WEB-INTEGRATION-004 — Customer Legacy Data Validation Before Shadow Expansion`.

## Proxima fatia sugerida

- `LP-WEB-INTEGRATION-004`

## Arquivos criados/alterados

- `docs/primyo-web-integration/CUSTOMER_SHADOW_READ_COVERAGE_REVIEW.md`
- `docs/primyo-changes/LP-WEB-INTEGRATION-003.md`
- `docs/primyo-changes/LP-WEB-INTEGRATION-003-CLOSURE.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`

## Validações

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Warning nao bloqueante

- o build dentro de `primyo:gate` manteve apenas o warning conhecido de chunk acima de `500 kB`, sem bloquear gate, build ou verify.

## Riscos

- ampliar a sombra agora em lista ou save aumentaria a superficie tocada em `app/main.js` sem qualificar primeiro a base legada;
- clientes PF sem documento e divergencias entre `clientRegistry` e `billingClients` ainda podem distorcer a leitura diagnostica.

## Rollback

1. remover `docs/primyo-web-integration/CUSTOMER_SHADOW_READ_COVERAGE_REVIEW.md`;
2. remover `docs/primyo-changes/LP-WEB-INTEGRATION-003.md`;
3. remover `docs/primyo-changes/LP-WEB-INTEGRATION-003-CLOSURE.md`;
4. reverter `docs/primyo-adequation/NEXT_SLICE_DECISION.md`;
5. reverter `docs/primyo-adequation/ADEQUATION_BACKLOG.md`;
6. reverter `docs/primyo-adequation/CHANGE_CONTROL.md`;
7. reexecutar `npm.cmd run primyo:gate`.

## Aceite tecnico

Fase aceita como revisao documental conservadora, sem ampliacao funcional do runtime.

## Confirmacoes

- nenhum codigo foi alterado;
- nenhum push foi executado.
