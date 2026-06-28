# Integration Smoke Test Plan

## 1. Objetivo

Definir o smoke manual minimo da primeira integracao futura ao runtime.

## 2. Smoke comum obrigatorio

Executar sempre:

1. abrir o app;
2. fazer login;
3. trocar perfil, quando aplicavel;
4. abrir o patio;
5. navegar ate o cadastro relacionado ao dominio integrado;
6. verificar carregamento de dados;
7. verificar ausencia de erro no console;
8. fazer logout.

## 3. Smoke especifico recomendado para primeira fatia

Se a primeira fatia usar `customerAdapter`:

1. abrir cadastro/lista de clientes;
2. verificar cliente legado conhecido;
3. abrir detalhe ou edicao simples sem salvar;
4. validar nome, documento, telefone e status exibidos;
5. confirmar que nenhum campo obrigatorio some;
6. confirmar que o fluxo de faturamento relacionado nao muda;
7. confirmar que o runtime continua abrindo patio, financeiro e documentos.

## 4. Regras adicionais

- nao automatizar nesta fase;
- nao considerar apenas o gate suficiente quando `app/main.js` for tocado;
- registrar resultado com console limpo ou ocorrencias visiveis.

## 5. Decisao oficial

A primeira integracao futura devera sair acompanhada de smoke manual focado no dominio tocado e de regressao minima do app inteiro.
