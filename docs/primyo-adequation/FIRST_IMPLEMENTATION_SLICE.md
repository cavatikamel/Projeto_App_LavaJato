# First Implementation Slice

## Recomendacao oficial

A primeira fatia de implementacao recomendada para o LavaPrime e:

`LP-TEST-001 + LP-WEB-001 (escopo minimo)`

Em termos praticos, isso significa:

- formalizar a baseline de validacao do web;
- preparar uma fronteira tecnica unica para sessao e perfil no web;
- preservar integralmente o comportamento funcional atual;
- nao ativar autenticacao real ainda;
- nao migrar banco ainda;
- nao tocar no Android ainda.

## Por que esta deve ser a primeira fatia

Esta fatia oferece o melhor equilibrio entre reducao de risco e baixa chance de quebra porque:

- ataca o risco mais transversal do produto, que e a dispersao de acesso e sessao;
- cria um ponto de controle para fases futuras de autenticacao e permissao;
- evita iniciar pela migracao de dados, que tem maior risco operacional;
- evita iniciar pelo Android, que depende de definicoes anteriores;
- e reversivel, pois pode manter a experiencia atual enquanto reorganiza apenas a fronteira tecnica necessaria.

## Objetivo da fatia

Criar um ponto unico e rastreavel para sessao e perfil no web, acompanhado de um pacote minimo de validacao antes e depois da mudanca.

## Escopo permitido da fatia

- mapear as funcoes e trechos do web responsaveis por sessao, login e perfil;
- introduzir uma camada unica de acesso a sessao e perfil;
- ajustar os pontos de chamada estritamente necessarios para usar essa camada;
- registrar baseline manual e automatica do comportamento atual;
- documentar os arquivos tocados e o rollback.

## Fora de escopo da fatia

- trocar o mecanismo atual por autenticacao real;
- ligar Supabase ou outro backend como dependencia obrigatoria do login;
- alterar permissao funcional de administrador ou operador;
- reestruturar dominios de dados;
- alterar Android;
- alterar schema, migracao ou sincronizacao.

## Arquivos que poderao ser afetados

Os arquivos exatos deverao ser confirmados no controle de mudanca, mas a fatia deve se restringir preferencialmente a:

- `app/main.js`
- `app/src/App.jsx`
- `docs/primyo-adequation/**`
- outros arquivos web apenas se forem necessarios para encapsular sessao sem alterar comportamento.

## Riscos da fatia

- regressao de login ou navegacao inicial;
- permissao indevida por erro de roteamento da sessao;
- alteracao acidental de fluxo ao tocar no core monolitico.

## Mitigacoes

- limitar a mudanca ao menor numero de pontos de entrada possivel;
- manter comportamento visual e funcional identico;
- executar baseline antes e depois;
- ter rollback simples baseado em poucos arquivos.

## Testes obrigatorios da fatia

- `npm run build`
- `npm run verify:build`
- `node --check app/main.js`
- validacao manual de login administrador
- validacao manual de login operador
- acesso ao patio apos login
- acesso a uma tela administrativa apos login administrador
- tentativa de acesso restrito com perfil operador

## Evidencias esperadas

- lista final de arquivos alterados;
- captura do resultado dos comandos da baseline;
- checklist manual preenchido com resultado antes e depois;
- descricao do rollback;
- referencia ao item de backlog associado.

## Criterio de conclusao da fatia

A fatia so podera ser considerada concluida quando:

- o comportamento atual de login e acesso permanecer funcional;
- a sessao e o perfil passarem por uma fronteira unica identificavel;
- nao houver mudanca de regra de negocio, persistencia ou interface alem do estritamente necessario;
- a baseline de testes passar integralmente;
- existir rollback simples e validado documentalmente.
