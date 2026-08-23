# Change Record

- Change ID: `LP-SERVICE-ORDER-001`
- Backlog ID: `LP-SERVICE-ORDER-001`
- Titulo: `Service Order Foundation And Legacy Attendance Bridge`
- Objetivo: criar a primeira camada tecnica para tratar `Atendimento` como `Service Order` interna sem quebrar a UX atual.
- Motivo da mudanca: preparar rastreabilidade operacional, financeira e documental por atendimento antes de persistencia real.
- Area afetada: `Web runtime`, `documentacao tecnica`, `governanca de testes`
- Arquivos afetados:
  - `app/main.js`
  - `docs/primyo-service-orders/**`
  - `docs/primyo-changes/LP-SERVICE-ORDER-001-CLOSURE.md`
  - `docs/primyo-adequation/CHANGE_CONTROL.md`
  - `docs/primyo-adequation/NEXT_SLICE_DECISION.md`
  - `docs/primyo-tests/REGRESSION_MATRIX.md`
  - `docs/primyo-tests/TEST_GATE_POLICY.md`
- Risco: `Alto`
- Dependencias:
  - `Attendance Contract`
  - `Payment Contract`
  - `Financial Contract`
  - `patioVehicles`, `cashEntries`, `openPayments`, `invoiceLineItems`, `documentHistory`
- Responsavel: `Codex`
- Aprovador tecnico: `Usuario`
- Data: `2026-07-13`

## Escopo

- criar bridge interna de `Service Order`;
- mapear lifecycle minimo;
- gerar numeracao local;
- expor diagnostico tecnico silencioso;
- documentar fundacao e limites.

## Fora de escopo

- abrir Supabase;
- criar persistencia definitiva de OS;
- reescrever telas;
- renomear toda a interface para `OS`;
- alterar bootstrap padrao;
- alterar Android.

## Plano de implementacao

1. auditar as estruturas reais do legado operacional;
2. montar modelo interno de OS em `app/main.js`;
3. ligar cliente, veiculo, pagamentos, faturamento e documentos por bridge controlada;
4. expor diagnostico tecnico somente leitura;
5. documentar limites e proxima trilha.

## Plano de teste

- `node --check` dos modulos obrigatorios;
- `node scripts/primyo-adapter-gate.mjs`;
- `npm.cmd run primyo:gate`;
- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- smoke funcional de login, patio, financeiro, documentos e diagnostico global.

## Plano de rollback

- reverter o commit da fase;
- remover helpers e diagnosticos de `Service Order` em `app/main.js`;
- remover documentos de `docs/primyo-service-orders/`;
- reexecutar gate, build, verify e smoke.

## Resultado da validacao

- `node --check` dos arquivos obrigatorios passou;
- `node scripts/primyo-adapter-gate.mjs` passou;
- `npm.cmd run primyo:gate` passou;
- `npm.cmd run build` passou;
- `npm.cmd run verify:build` passou;
- warning nao bloqueante de chunk acima de `500 kB` permaneceu conhecido;
- smoke funcional ficou parcial por limitacao do browser automatizado no fluxo interativo de login e navegacao.

## Evidencias anexadas

- auditoria git inicial;
- leitura dos contratos de `Attendance`, `Payment` e `Financial`;
- mapeamento real de `patioVehicles`, `cashEntries`, `openPayments`, `invoiceLineItems` e `documentHistory`.

## Resultado de npm.cmd run primyo:gate

- aprovado, sem evidencia de regressao funcional bloqueante no bridge de `Service Order`.

## Decisao final

- fase implementada e documentada;
- arquitetura interna de `Service Order` ficou criada sem abrir Supabase;
- runtime permaneceu compativel com o fluxo atual de `Atendimento`;
- liberada para commit seletivo, sem push.
