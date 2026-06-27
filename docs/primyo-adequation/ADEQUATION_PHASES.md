# LavaPrime Adequation Phases

## Fase 1. Seguranca e autenticacao

**Objetivo**

Criar a base segura para identidade, sessao e acesso antes de qualquer ampliacao estrutural.

**Escopo**

- consolidar o estado atual de autenticacao web, Android e backend planejado;
- definir contrato alvo de sessao, identidade e expiracao;
- remover dependencia de credenciais de demonstracao como mecanismo definitivo;
- preparar a fronteira tecnica para autenticacao real sem ativacao abrupta.

**Fora de escopo**

- reescrita completa do login;
- migracao total para backend unico;
- alteracao ampla de interfaces.

**Pre-requisitos**

- baseline de testes e fluxos criticos aprovada;
- mapa atual de perfis e acessos validado.

**Entregaveis**

- contrato de sessao e autenticacao aprovado;
- backlog detalhado de adequacao de acesso;
- definicao de rollout e rollback para autenticacao.

**Arquivos possivelmente afetados**

- `app/main.js`
- `app/src/App.jsx`
- `LavaPrimeAndroidApp/**`
- `supabase/**`
- `docs/**`

**Riscos**

- regressao de acesso em perfis existentes;
- divergencia entre web e Android;
- ativacao parcial de controle de acesso.

**Testes obrigatorios**

- login com perfil administrador;
- login com perfil operador;
- validacao de sessao expirada ou invalida;
- validacao de acesso negado em areas restritas.

**Criterio de conclusao**

Existe um mecanismo aprovado para evoluir autenticacao com baixo risco, e nenhuma tela critica depende mais de credencial de demonstracao como solucao definitiva planejada.

## Fase 2. Fonte unica de dados

**Objetivo**

Definir e iniciar a consolidacao da fonte de verdade para entidades, operacao e financeiro.

**Escopo**

- mapear o que continua local, o que migra e o que precisa de transicao controlada;
- definir contratos de leitura e escrita por dominio;
- priorizar os dados mais criticos para consistencia operacional.

**Fora de escopo**

- migracao completa de todo dado existente em uma unica liberacao;
- limpeza massiva de dados historicos.

**Pre-requisitos**

- contrato de autenticacao aprovado;
- classificacao de dominios de dados por risco.

**Entregaveis**

- estrategia oficial de persistencia por dominio;
- mapa de transicao entre armazenamento atual e alvo;
- backlog priorizado de consolidacao.

**Arquivos possivelmente afetados**

- `app/main.js`
- `app/assets/data/**`
- `scripts/**`
- `supabase/**`
- `docs/**`

**Riscos**

- duplicidade de cadastro;
- perdas silenciosas de consistencia;
- operacao financeira apoiada em estado local.

**Testes obrigatorios**

- criacao e atualizacao de cliente;
- criacao e atualizacao de veiculo;
- abertura e fechamento de atendimento;
- validacao de faturamento e contas em aberto.

**Criterio de conclusao**

Cada dominio critico possui fonte de verdade definida, plano de transicao aprovado e criterio objetivo para conviver temporariamente com estados legados.

## Fase 3. Modularizacao do core web

**Objetivo**

Reduzir o risco de regressao ao separar fronteiras do core web sem reescrita total.

**Escopo**

- isolar pontos de entrada, estado, servicos e regras de negocio mais criticos;
- reduzir acoplamento do monolito atual;
- preparar o produto para testes e integracao incremental.

**Fora de escopo**

- reescrita completa do frontend;
- substituicao integral do core legado.

**Pre-requisitos**

- baseline de fluxos criticos;
- definicao de contratos de autenticacao e dados para os dominios tocados.

**Entregaveis**

- fronteiras tecnicas documentadas;
- itens de modularizacao aprovados por fatia;
- mapa de impacto por arquivo.

**Arquivos possivelmente afetados**

- `app/main.js`
- `app/src/**`
- `app/styles/**`
- `docs/**`

**Riscos**

- quebrar eventos e renderizacoes atuais;
- mover responsabilidades sem cobertura minima de validacao.

**Testes obrigatorios**

- carga inicial do app;
- navegacao principal;
- patio;
- cadastros;
- financeiro;
- geracao de comprovantes ou relatorios atualmente disponiveis.

**Criterio de conclusao**

Os dominos mais criticos do web possuem fronteiras tecnicas identificaveis e alteraveis por fatias menores, sem dependencia obrigatoria de editar o arquivo monolitico inteiro.

## Fase 4. Permissoes e perfis

**Objetivo**

Alinhar perfis, permissoes e regras de acesso entre o comportamento atual e o modelo alvo.

**Escopo**

- revisar regras existentes de administrador e operador;
- mapear o impacto do modelo futuro de papeis;
- definir matriz minima de acesso por modulo e fluxo.

**Fora de escopo**

- expansao funcional de perfis;
- criacao de painel administrativo novo.

**Pre-requisitos**

- contrato de sessao aprovado;
- mapeamento de telas e fluxos concluido.

**Entregaveis**

- matriz de permissao por perfil;
- backlog de adequacao de autorizacao;
- criterio de validacao por perfil.

**Arquivos possivelmente afetados**

- `app/main.js`
- `LavaPrimeAndroidApp/**`
- `supabase/**`
- `docs/**`

**Riscos**

- permissao excessiva;
- bloqueio indevido de operacao;
- divergencia entre interfaces e backend.

**Testes obrigatorios**

- acesso de administrador a modulos sensiveis;
- restricao de operador em modulos administrativos;
- validacao de faturamento e cadastros por perfil.

**Criterio de conclusao**

Existe uma matriz de acesso objetiva, testavel e alinhada com a estrategia de autenticacao e dados.

## Fase 5. Testes minimos

**Objetivo**

Criar baseline minima de confianca para permitir mudancas futuras com menor risco.

**Escopo**

- formalizar validacoes automaticas ja existentes;
- definir cobertura minima obrigatoria para fluxos criticos;
- criar ritual de teste antes e depois de cada fatia.

**Fora de escopo**

- cobertura total do produto;
- automacao completa de todos os cenarios.

**Pre-requisitos**

- fluxos criticos aprovados;
- backlog inicial priorizado.

**Entregaveis**

- baseline oficial de testes;
- criterios de regressao por fluxo;
- definicao de evidencia minima.

**Arquivos possivelmente afetados**

- `package.json`
- `.github/workflows/**`
- `scripts/**`
- `LavaPrimeAndroidApp/**`
- `docs/**`

**Riscos**

- falsa sensacao de seguranca com cobertura insuficiente;
- dependencias em excesso para validar mudancas pequenas.

**Testes obrigatorios**

- build web;
- verificacao de consistencia de artefatos web;
- checagem sintatica dos scripts criticos;
- validacao manual dos fluxos de negocio mais sensiveis.

**Criterio de conclusao**

Toda fatia futura consegue ser validada com um pacote minimo de testes automaticos e manuais repetiveis.

## Fase 6. Observabilidade e operacao

**Objetivo**

Melhorar a capacidade de detectar falhas, rastrear impacto e operar o produto com menor dependencia tacita.

**Escopo**

- definir sinais minimos de saude do produto;
- formalizar registros operacionais e pontos de suporte;
- mapear verificacoes antes e depois de publicacao.

**Fora de escopo**

- plataforma completa de monitoramento corporativo;
- reestruturacao total de suporte.

**Pre-requisitos**

- fluxos criticos e pontos de falha mapeados;
- baseline de testes definida.

**Entregaveis**

- checklist operacional;
- sinais de observabilidade priorizados;
- plano de resposta inicial a falhas.

**Arquivos possivelmente afetados**

- `.github/workflows/**`
- `docker/**`
- `nginx/**`
- `docs/**`

**Riscos**

- incidentes sem rastreabilidade;
- operacao depender de memoria do fundador.

**Testes obrigatorios**

- validacao do build publicavel;
- verificacao de rotas e artefatos principais;
- confirmacao de checklist operacional.

**Criterio de conclusao**

Existe um conjunto minimo de indicadores, verificacoes e passos operacionais para suportar mudancas controladas.

## Fase 7. Android alinhado ao backend

**Objetivo**

Preparar o Android para operar sobre contratos consistentes com o backend e com as regras aprovadas no programa.

**Escopo**

- alinhar autenticacao, dados e sincronizacao com o desenho alvo;
- revisar dependencias de Room e sincronizacao local;
- eliminar caminhos destrutivos como dependencia permanente.

**Fora de escopo**

- reescrita do app Android;
- expansao funcional mobile.

**Pre-requisitos**

- fases 1, 2 e 4 consolidadas;
- contrato de dados e permissao aprovado.

**Entregaveis**

- plano de alinhamento Android-backend;
- backlog mobile priorizado;
- estrategia de migracao segura para dados mobile.

**Arquivos possivelmente afetados**

- `LavaPrimeAndroidApp/**`
- `supabase/**`
- `docs/**`

**Riscos**

- perda de dados locais;
- divergencia de comportamento com o web;
- sincronizacao incompleta.

**Testes obrigatorios**

- build Android;
- validacao de login;
- fluxos mobile criticos por perfil;
- confirmacao de integridade de armazenamento local durante transicoes.

**Criterio de conclusao**

O Android possui caminho aprovado para sair do estado atual local/demo e convergir para o backend sem ruptura operacional.

## Fase 8. Preparacao para publicacao controlada

**Objetivo**

Consolidar o estado minimo para liberacoes rastreaveis e de baixo risco.

**Escopo**

- amarrar backlog, testes, rollback e aprovacao final;
- formalizar criterio de pronto para publicar;
- reduzir improviso em liberacoes futuras.

**Fora de escopo**

- aceleracao comercial;
- novas funcionalidades.

**Pre-requisitos**

- fases anteriores com aceite tecnico;
- baseline operacional validada.

**Entregaveis**

- checklist final de release controlado;
- criterio de aprovacao tecnica de publicacao;
- pacote minimo de evidencias por release.

**Arquivos possivelmente afetados**

- `.github/workflows/**`
- `package.json`
- `docker/**`
- `nginx/**`
- `docs/**`

**Riscos**

- publicar com gaps conhecidos sem decisao formal;
- falta de rastreabilidade entre change set e validacao.

**Testes obrigatorios**

- bateria minima web e Android, quando aplicavel;
- validacao manual final dos fluxos criticos;
- revisao de rollback.

**Criterio de conclusao**

O LavaPrime possui um processo repetivel para publicar mudancas controladas com evidencia, aprovacao e rollback.
