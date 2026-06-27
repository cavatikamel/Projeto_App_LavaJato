# LP-WEB-006 - Storage Boundary Extraction

## Objetivo

Executar a terceira extracao controlada do monolito web, criando uma camada unica para acesso ao `localStorage` sem alterar comportamento, regra de negocio, persistencia, formato de dados, Supabase, Android ou UI.

## Backlog ID

- `LP-WEB-006`

## Arquivos

Arquivos criados:

- `app/storage/storageBoundary.js`
- `docs/primyo-changes/LP-WEB-006.md`

Arquivos alterados:

- `app/main.js`

Arquivos explicitamente nao alterados:

- `app/boundaries/sessionAccessBoundary.js`
- `app/utils/textFormatters.js`
- `supabase/**`
- `LavaPrimeAndroidApp/**`
- `app/styles.css`
- `package.json`
- `vite.config.js`
- `scripts/**`

## Mapeamento das chamadas diretas

Chamadas diretas encontradas em `app/main.js`:

1. `window.localStorage?.getItem(key)` em `loadBusinessStorageItem(...)`
2. `window.localStorage?.setItem(key, JSON.stringify(value))` em `saveBusinessStorageItem(...)`

Chamadas diretas de `removeItem(...)` encontradas:

- nenhuma

## Criterio de migracao

Foram migradas apenas as chamadas diretas ja centralizadas na infraestrutura local de baixo risco:

- a leitura bruta dentro de `loadBusinessStorageItem(...)`;
- a escrita bruta dentro de `saveBusinessStorageItem(...)`.

Nao foram migrados:

- call sites de dominio;
- normalizadores;
- formatos de payload;
- chaves de negocio;
- qualquer fluxo de financeiro, patio, cadastros, estoque ou documentos.

Motivo:

- essas duas chamadas ja eram o ponto unico de contato com `localStorage`;
- substituir esse ponto reduz acoplamento sem espalhar alteracao pelo produto;
- a fatia permanece pequena, reversivel e compativel com futura convivencia com Supabase.

## Storage Boundary criada

Arquivo:

- `app/storage/storageBoundary.js`

API inicial criada:

- `read(key)`
- `write(key, value)`
- `remove(key)`
- `exists(key)`
- `safeRead(key, fallback)`
- `safeWrite(key, value)`

Uso efetivo nesta fase:

- `storageBoundary.read(...)`
- `storageBoundary.write(...)`

## Risco

Classificacao: `Alto`, com mitigacao de implementacao pequena.

Riscos encontrados:

- qualquer mudanca em acesso ao `localStorage` pode afetar configuracoes e catalogos se o contrato for alterado;
- erro na boundary poderia impedir leitura de dados locais ja gravados;
- erro na escrita poderia disparar regressao silenciosa em configuracoes do negocio.

Mitigacoes aplicadas:

- nenhuma chave foi alterada;
- nenhum formato JSON foi alterado;
- nenhum call site de dominio foi tocado;
- a boundary ficou restrita a operacoes brutas de storage;
- `loadBusinessStorageItem(...)` e `saveBusinessStorageItem(...)` preservaram seu papel atual.

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
37 modules transformed.
assets/index-CAkQpPxh.js
assets/main-DoX5P4YS.js
built in 1.25s
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

### Sintaxe da boundary

Comando:

```text
node --check app/storage/storageBoundary.js
```

Resultado:

```text
sucesso sem saida
```

## Smoke test

Smoke minimo executado em preview local `http://127.0.0.1:4174`.

Resultado:

- login admin: `sucesso`
- patio pelo admin: `sucesso`
- financeiro pelo admin: `sucesso`
- documentos pelo admin: `sucesso`
- logout: `sucesso`
- login operador: `sucesso`
- patio pelo operador: `sucesso`
- operador sem shell administrativa: `sucesso`
- console sem `warn` ou `error`: `sucesso`

## Compatibilidade preservada

A compatibilidade foi preservada assim:

- `app/main.js` continua expondo `loadBusinessStorageItem(...)` e `saveBusinessStorageItem(...)`;
- os consumidores de dominio continuam chamando exatamente os mesmos wrappers;
- a boundary nova opera apenas com strings cruas de `localStorage`;
- `JSON.parse(...)` e `JSON.stringify(...)` permaneceram nos mesmos pontos logicos;
- ausencia de `localStorage` continua sendo tratada como fallback/no-op, como antes.

## Rollback

Rollback simples:

1. remover o import de `./storage/storageBoundary.js` em `app/main.js`;
2. restaurar `window.localStorage?.getItem(key)` dentro de `loadBusinessStorageItem(...)`;
3. restaurar `window.localStorage?.setItem(key, JSON.stringify(value))` dentro de `saveBusinessStorageItem(...)`;
4. remover `app/storage/storageBoundary.js`;
5. reexecutar:

```text
npm.cmd run primyo:gate
npm.cmd run build
npm.cmd run verify:build
node --check app/storage/storageBoundary.js
```

## Resultado da validacao

Status: `Aceito`

Resumo:

- existe agora uma unica Storage Boundary;
- 2 chamadas diretas foram migradas;
- apenas chamadas simples e ja centralizadas foram substituidas;
- o comportamento observado permaneceu identico;
- nada fora do escopo autorizado foi alterado nesta fase.
