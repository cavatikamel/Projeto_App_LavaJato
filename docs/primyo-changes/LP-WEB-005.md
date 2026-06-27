# LP-WEB-005 - Low Risk Web Extraction

## Objetivo

Executar a segunda extracao fisica controlada do monolito web `app/main.js`, reduzindo acoplamento sem alterar comportamento, regra de negocio, UI, Supabase, banco, Android ou dependencias.

## Candidato escolhido

Candidato: `text/format helpers`.

Responsabilidade unica extraida:

- sanitizacao de HTML;
- escape de seletor CSS;
- normalizacao textual;
- mascaras simples de placa, telefone, CPF e CNPJ;
- capitalizacao simples.

Funcoes extraidas:

- `capitalize(...)`
- `escapeHtml(...)`
- `cssEscape(...)`
- `normalizeText(...)`
- `onlyDigits(...)`
- `formatPlate(...)`
- `formatPhone(...)`
- `formatCpf(...)`
- `formatCnpj(...)`

## Motivo

`policy helpers` seriam o proximo candidato natural pela ordem de extracao, mas os mapas de policy atuais ficam em `app/boundaries/sessionAccessBoundary.js`, arquivo explicitamente proibido nesta fase.

O proximo candidato de menor risco dentro do escopo permitido e um conjunto de helpers puros de texto e formatacao simples. Eles:

- nao gravam dados;
- nao acessam Supabase;
- nao acessam banco;
- nao alteram Android;
- nao alteram CSS;
- nao executam regra financeira;
- nao dependem de estado global do LavaPrime;
- preservam exatamente nomes, parametros e retornos usados pelo monolito.

## Risco

Classificacao: `Baixo/Medio`.

Riscos:

- uma importacao incorreta poderia quebrar o bootstrap do web;
- uma diferenca sutil em `escapeHtml`, `normalizeText` ou mascaras poderia afetar renderizacao e filtros;
- `cssEscape(...)` continua dependente de `window.CSS?.escape`, como antes.

Mitigacoes:

- funcoes foram movidas sem alterar logica;
- nomes publicos usados pelo `app/main.js` foram preservados;
- apenas uma responsabilidade foi extraida;
- `node --check` sera executado no novo modulo;
- `primyo:gate`, build, verify e smoke manual serao executados.

## Arquivos

Arquivos criados:

- `app/utils/textFormatters.js`
- `docs/primyo-changes/LP-WEB-005.md`

Arquivos alterados:

- `app/main.js`

Arquivos explicitamente nao alterados:

- `app/boundaries/sessionAccessBoundary.js`
- `LavaPrimeAndroidApp/**`
- `supabase/**`
- `app/styles.css`
- `package.json`
- `vite.config.js`
- `scripts/**`
- banco de dados
- React shell

## Implementacao

1. Criar `app/utils/textFormatters.js`.
2. Mover as funcoes puras de texto e formatacao simples para o novo modulo.
3. Importar as mesmas funcoes em `app/main.js`.
4. Manter todos os pontos de chamada com os mesmos nomes.
5. Nao alterar chamadas, fluxo, seletores, DOM, CSS, dados ou regra de negocio.

## Validacoes

Status: `Aprovado`.

Validacoes obrigatorias:

- `node --check app/utils/textFormatters.js` -> sucesso
- `npm.cmd run primyo:gate` -> sucesso
- `npm.cmd run build` -> sucesso
- `npm.cmd run verify:build` -> sucesso

Evidencia do gate:

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

Evidencia do build separado:

```text
vite v5.4.21 building for production...
36 modules transformed.
assets/index-Cs2VZ8-3.js
assets/main-vDlsGnnc.js
built in 1.13s
```

Evidencia do verify separado:

```text
Build verificado com sucesso.
```

Smoke minimo obrigatorio executado:

- login admin -> sucesso, shell administrativa visivel;
- patio admin -> sucesso, `adminPatioView` ativo e visivel;
- financeiro admin -> sucesso, `adminCashflowView` ativo e visivel;
- documentos admin -> sucesso, `adminDocumentsView` ativo e visivel;
- logout -> sucesso, tela de login visivel e shells ocultas;
- login operador -> sucesso, patio operacional visivel;
- operador sem shell administrativa -> sucesso;
- console sem `warn` ou `error` visivel -> sucesso.

## Rollback

Rollback simples:

1. Remover o import de `./utils/textFormatters.js` em `app/main.js`.
2. Restaurar as funcoes extraidas no corpo de `app/main.js`.
3. Remover `app/utils/textFormatters.js`.
4. Reexecutar:

```text
npm.cmd run primyo:gate
npm.cmd run build
npm.cmd run verify:build
node --check app/main.js
```

## Resultado da validacao

Status: `Aprovado`.

Resultado:

- apenas uma responsabilidade foi extraida;
- comportamento observado permaneceu equivalente;
- gate passou;
- build passou;
- verify passou;
- smoke minimo passou;
- rollback esta documentado;
- Supabase nao foi alterado;
- Android nao foi alterado;
- CSS nao foi alterado;
- banco nao foi alterado;
- `sessionAccessBoundary.js` nao foi alterado.

## Decisao final

Status: `Aceito`.

`LP-WEB-005` concluiu a segunda extracao fisica controlada do monolito web.
