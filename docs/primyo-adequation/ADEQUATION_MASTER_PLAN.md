# LavaPrime Adequation Master Plan

## 1. Visao geral

Este documento consolida o plano oficial de adequacao do LavaPrime a partir do dossie produzido em `docs/primyo-onboarding/`.

O onboarding concluiu que o produto se encontra em maturidade geral `2/5`, com maior concentracao de risco em:

- seguranca e autenticacao;
- ausencia de fonte unica de dados;
- concentracao de logica critica no core web atual;
- cobertura insuficiente de testes e validacoes;
- dependencia operacional elevada de conhecimento nao formalizado.

O objetivo desta fase nao e corrigir o produto imediatamente. O objetivo e transformar o diagnostico em um plano de execucao controlado, incremental, auditavel e reversivel.

## 2. Objetivo da adequacao

Adequar o LavaPrime para um patamar operacional e tecnico mais seguro, previsivel e sustentavel, sem perder continuidade do negocio e sem introduzir mudancas descontroladas.

Ao final do programa de adequacao, o produto devera:

- possuir autenticacao e autorizacao coerentes com o risco do negocio;
- operar com uma estrategia clara de fonte unica de dados;
- ter fronteiras tecnicas mais previsiveis entre interface, regras de negocio e persistencia;
- possuir baseline minima de testes e validacoes de regressao;
- ter operacao, observabilidade e publicacao controladas;
- permitir evolucao futura com menor dependencia de conhecimento tacito.

## 3. Principios de execucao

- Nenhuma fase deve iniciar sem backlog aprovado e criterio de aceite definido.
- Toda mudanca deve ser pequena, reversivel e vinculada a um item do backlog.
- Reducao de risco tem precedencia sobre ganho cosmetico ou conveniencia tecnica.
- Mudancas estruturais devem ser precedidas por baseline de testes e validacoes manuais.
- Seguranca, autenticacao e permissao devem ser tratadas antes de expansao funcional.
- Integracao entre web, Android e backend deve ocorrer por etapas, nunca por substituicao abrupta.
- Nao sera executada alteracao em arquitetura, banco ou autenticacao sem plano de rollback documentado.

## 4. Fases oficiais

As fases oficiais da adequacao sao:

1. Seguranca e autenticacao
2. Fonte unica de dados
3. Modularizacao do core web
4. Permissoes e perfis
5. Testes minimos
6. Observabilidade e operacao
7. Android alinhado ao backend
8. Preparacao para publicacao controlada

O detalhamento operacional de cada fase esta em `ADEQUATION_PHASES.md`.

## 5. Dependencias principais

Dependencias logicas do programa:

- Fase 1 desbloqueia decisoes seguras de permissao, sessao e integracao.
- Fase 2 depende de direcao aprovada para autenticacao, persistencia e contratos de dados.
- Fase 3 depende de baseline de comportamento atual e da definicao de pontos de integracao.
- Fase 4 depende da existencia de uma camada confiavel de identidade e sessao.
- Fase 5 deve acompanhar todas as fases, mas precisa de escopo minimo estavel das fases 1 a 4.
- Fase 6 depende de fluxos criticos identificados e pontos de falha conhecidos.
- Fase 7 depende de contratos claros entre app Android, backend e regras de permissao.
- Fase 8 depende de aceite tecnico das fases anteriores e baseline operacional consolidada.

Dependencias documentais obrigatorias:

- `docs/primyo-onboarding/PRODUCT_AUDIT_REPORT.md`
- `docs/primyo-onboarding/plano-de-adequacao.md`
- `docs/primyo-onboarding/backlog.md`
- `docs/primyo-onboarding/matriz-de-maturidade.md`
- `docs/primyo-onboarding/riscos.md`
- `docs/primyo-onboarding/divida-tecnica.md`
- `docs/primyo-onboarding/lacunas-de-seguranca.md`
- `docs/primyo-onboarding/lacunas-de-testes.md`
- `docs/primyo-onboarding/arquitetura.md`
- `docs/primyo-onboarding/banco-de-dados.md`
- `docs/primyo-onboarding/permissoes.md`

## 6. Riscos do programa

Riscos criticos a controlar durante a adequacao:

- alterar comportamento de acesso antes de estabilizar o contrato de sessao;
- criar mais de uma fonte de verdade entre web, Android e backend;
- introduzir regressao em faturamento, patio, cadastros e relatorios;
- acoplar a adequacao a uma refatoracao ampla sem testes suficientes;
- promover mudancas de banco ou autenticacao sem rollback validado;
- alterar o Android antes de estabilizar o backend de referencia.

Riscos de execucao:

- backlog muito amplo para a primeira fatia;
- aprovacao de mudancas sem evidencia observavel;
- mistura de correcoes oportunistas com itens de adequacao;
- dependencia excessiva de validacao manual nao repetivel.

## 7. Arquivos potencialmente afetados por fase

Os arquivos exatos serao definidos item a item via controle de mudanca, mas os grupos mais provaveis sao:

- Web shell e bootstrap: `app/src/App.jsx`, `app/main.js`, `app/index.html`
- Dados e persistencia web: `app/assets/data/**`, `scripts/**`
- Build e publicacao web: `package.json`, `vite.config.*`, `.github/workflows/**`, `docker/**`, `nginx/**`
- Android app: `LavaPrimeAndroidApp/**`
- Infra de backend e contratos de dados: `supabase/**`, `docs/**`
- Documentacao operacional e tecnica: `docs/**`

## 8. Criterios de aceite

Uma fase ou fatia de implementacao so pode ser considerada concluida quando:

- o backlog associado estiver concluido com evidencias anexadas;
- os testes obrigatorios da fase tiverem sido executados com resultado registrado;
- os fluxos criticos impactados tiverem validacao manual antes e depois;
- houver plano de rollback valido e compreendido pelo responsavel tecnico;
- a documentacao impactada tiver sido atualizada no mesmo ciclo;
- nao houver regressao aberta sem classificacao de severidade e decisao formal.

## 9. Criterios de bloqueio

Uma fase deve ser bloqueada quando ocorrer qualquer um dos cenarios abaixo:

- nao existe baseline confiavel para validar a mudanca;
- o impacto atinge autenticacao, banco ou integracoes sem plano aprovado;
- existe dependencia anterior nao concluida;
- a mudanca proposta amplia escopo alem da fatia aprovada;
- nao ha ambiente ou evidencia suficiente para validar rollback;
- o item exige instalacao de dependencia, migracao ou alteracao estrutural sem justificativa formal.

## 10. Criterios de rollback

Toda mudanca futura devera possuir rollback antes de implementacao. O rollback minimo aceitavel deve responder:

- como reverter os arquivos alterados;
- como restaurar o comportamento anterior;
- como confirmar que o fluxo critico voltou ao estado esperado;
- como tratar dados ou configuracoes transitadas durante a mudanca;
- quem aprova a reversao e em que janela.

Nao sera aceita mudanca sem rollback definido para os cenarios:

- autenticacao;
- permissoes;
- persistencia;
- sincronizacao de dados;
- publicacao em producao;
- alteracoes no Android conectadas ao backend.

## 11. Resultado esperado desta fase

Ao final da fase de planejamento de adequacao, o LavaPrime deve possuir:

- plano mestre aprovado;
- fases formalmente definidas;
- backlog executavel priorizado;
- primeira fatia de implementacao recomendada;
- baseline de testes antes de qualquer mudanca;
- regra oficial de controle de mudancas.
