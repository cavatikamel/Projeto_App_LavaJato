# LP-WEB-005 Closure

## Resumo da extracao

`LP-WEB-005` executou a segunda extracao fisica controlada do monolito web.

A responsabilidade extraida foi limitada a helpers puros de texto e formatacao simples, movidos de `app/main.js` para `app/utils/textFormatters.js`.

Nenhuma regra de negocio, fluxo de tela, layout, storage, Supabase, banco, Android, CSS ou dependencia foi alterada nesta fase de encerramento.

## Helpers extraidos

- `capitalize(...)`
- `escapeHtml(...)`
- `cssEscape(...)`
- `normalizeText(...)`
- `onlyDigits(...)`
- `formatPlate(...)`
- `formatPhone(...)`
- `formatCpf(...)`
- `formatCnpj(...)`

## Arquivos criados ou alterados pela mudanca

Arquivos de runtime da fatia implementada:

- `app/main.js`
- `app/utils/textFormatters.js`

Arquivos documentais da fatia e do encerramento:

- `docs/primyo-changes/LP-WEB-005.md`
- `docs/primyo-changes/LP-WEB-005-CLOSURE.md`
- `docs/primyo-baseline/BASELINE_SYSTEM_STATE.md`
- `docs/primyo-baseline/BASELINE_TECHNICAL_MAP.md`
- `docs/primyo-web-boundaries/WEB_EXTRACTION_ORDER.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`

## Validacoes executadas

### Gate tecnico

Comando:

```text
npm.cmd run primyo:gate
```

Resultado:

```text
PASS Preflight - Node v24.16.0
PASS Required Files
PASS Syntax app/main.js
PASS Syntax app/boundaries/sessionAccessBoundary.js
PASS Syntax scripts/sync-fipe-local-db.mjs
PASS Build
PASS Verify Build

Gate Result: SUCCESS
```

### Build separado

Comando:

```text
npm.cmd run build
```

Resultado:

```text
vite v5.4.21 building for production...
36 modules transformed.
assets/index-Cs2VZ8-3.js
assets/main-vDlsGnnc.js
built in 1.23s
```

### Verify separado

Comando:

```text
npm.cmd run verify:build
```

Resultado:

```text
Build verificado com sucesso.
```

### Sintaxe do novo modulo

Comando:

```text
node --check app/utils/textFormatters.js
```

Resultado:

```text
sucesso sem saida
```

## Smoke test

Smoke minimo executado em preview local `http://127.0.0.1:4174`.

Resultado:

- login administrador: `sucesso`
- acesso administrativo: `sucesso`
- navegacao principal: `sucesso`
- acesso ao patio pelo admin: `sucesso`
- financeiro pelo admin: `sucesso`
- documentos pelo admin: `sucesso`
- logout: `sucesso`
- login operador: `sucesso`
- acesso ao patio pelo operador: `sucesso`
- operador sem shell administrativa visivel: `sucesso`
- console sem `warn` ou `error` visivel: `sucesso`

## Riscos remanescentes

- `app/main.js` continua sendo o coordenador funcional do web legado.
- Os helpers extraidos continuam sendo consumidos transversalmente pelo monolito.
- `cssEscape(...)` permanece dependente de `window.CSS?.escape` quando disponivel, como no comportamento anterior.
- O gate tecnico ainda nao substitui smoke funcional manual.

## Decisao final

Decisao: `Aceito`

`LP-WEB-005` esta formalmente encerrado.

## Aceite tecnico

A mudanca e aceita porque:

- apenas uma responsabilidade foi extraida;
- a API usada por `app/main.js` foi preservada;
- o comportamento observado permaneceu equivalente;
- o gate oficial passou;
- build e verify passaram;
- o novo modulo passou em `node --check`;
- o smoke minimo passou;
- rollback esta documentado em `docs/primyo-changes/LP-WEB-005.md`;
- nenhum item fora do escopo foi alterado nesta fase de encerramento.
