# LavaPrime Test Baseline

## Objetivo

Definir a linha de base de validacao que deve ser executada antes e depois de qualquer alteracao aprovada no LavaPrime.

Esta baseline existe para reduzir regressao, comparar comportamento e impedir mudancas estruturais sem evidencia minima.

## 1. Comandos existentes observados

### Web

Comandos ja observados no repositorio:

- `npm run build`
- `npm run verify:build`
- `node --check app/main.js`
- `node --check scripts/sync-fipe-local-db.mjs`

### CI web

Validacoes ja observadas no fluxo atual:

- instalacao limpa de dependencias com `npm ci`
- build do frontend
- verificacao de artefatos de build
- checagem sintatica dos scripts criticos

## 2. Testes disponiveis

Disponiveis hoje de forma observavel:

- build do web;
- verificacao automatizada de artefatos de build;
- checagem sintatica de arquivos JavaScript criticos;
- validacao manual de fluxos apos subir o app.

## 3. Testes ausentes

Ausencias relevantes identificadas:

- testes unitarios do core web;
- testes de integracao do fluxo financeiro;
- testes automatizados de permissao por perfil;
- testes de regressao de patio, cadastros e faturamento;
- testes end-to-end do web;
- baseline automatica de Android integrada ao mesmo ritual;
- testes de integracao com backend real;
- testes de seguranca focados em autenticacao e autorizacao.

## 4. Validacoes manuais obrigatorias

Toda mudanca futura devera registrar resultado para os cenarios abaixo, quando aplicavel ao escopo:

- abrir o app e confirmar carga inicial sem erro visivel;
- executar login com perfil administrador;
- executar login com perfil operador;
- validar acesso ao patio;
- validar criacao ou edicao de atendimento sem quebra de fluxo;
- validar consulta de cliente e veiculo;
- validar fluxo financeiro principal, incluindo contas em aberto e confirmacao de pagamento;
- validar relatorios, comprovantes ou documentos emitidos pelo fluxo alterado;
- validar logout, troca de sessao ou bloqueio de acesso, quando a mudanca tocar autenticacao ou perfil.

## 5. Fluxos criticos que devem ser testados antes e depois

Os fluxos abaixo sao a linha minima de comparacao antes e depois:

1. Login e carregamento inicial
2. Navegacao principal entre modulos
3. Patio e abertura de atendimento
4. Cadastros de clientes e veiculos
5. Financeiro, faturamento e pagamentos
6. Acesso administrativo a areas restritas
7. Relatorios ou comprovantes ligados ao fluxo afetado

## 6. Pacote minimo por tipo de mudanca

### Mudanca web sem impacto em autenticacao

- `npm run build`
- `npm run verify:build`
- `node --check app/main.js`
- validacao manual dos fluxos impactados

### Mudanca web com impacto em autenticacao, sessao ou permissao

- `npm run build`
- `npm run verify:build`
- `node --check app/main.js`
- validacao manual de login por perfil
- validacao manual de acesso negado e acesso permitido
- revalidacao de um fluxo operacional apos login

### Mudanca com impacto em dados, financeiro ou integracao

- pacote anterior conforme escopo
- validacao manual de escrita, leitura e reabertura do fluxo alterado
- evidencia adicional do estado antes e depois

### Mudanca Android futura

- baseline Android devera ser incorporada formalmente quando a fase mobile iniciar;
- ate la, qualquer alteracao Android exige plano de validacao especifico aprovado.

## 7. Evidencias obrigatorias

Cada execucao de baseline devera anexar:

- data e responsavel;
- backlog ID;
- comandos executados;
- resultado resumido de cada comando;
- checklist manual preenchido;
- observacoes de diferenca antes e depois;
- decisao final: aprovado, aprovado com ressalva ou bloqueado.

## 8. Criterio de falha da baseline

A baseline deve ser considerada falha quando:

- qualquer comando obrigatorio falhar;
- um fluxo critico deixar de operar como antes;
- existir divergencia nao explicada entre perfis;
- nao houver evidencia suficiente para comparar antes e depois.
