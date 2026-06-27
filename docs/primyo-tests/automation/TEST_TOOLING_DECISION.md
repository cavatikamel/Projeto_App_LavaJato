# LavaPrime Test Tooling Decision

## Objetivo

Comparar opcoes de ferramenta para automacao incremental de testes sem instalar nada nesta fase.

## Opcoes avaliadas

### Scripts Node simples

Uso possivel:

- executar comandos obrigatorios;
- validar presenca de arquivos criticos;
- registrar resultado local;
- orientar preenchimento do smoke manual.

Beneficios:

- nao exige dependencia nova;
- baixo risco;
- rollback simples;
- compativel com o estado atual do repositorio;
- bom para gate tecnico antes de extracoes.

Limitacoes:

- nao valida comportamento visual;
- nao substitui smoke manual;
- nao testa interacao real no navegador.

### Playwright

Uso possivel:

- smoke browser;
- login demo/local;
- navegacao;
- captura de evidencias.

Beneficios:

- bom para validar fluxos reais;
- reduz dependencia de validacao manual em navegador;
- pode gerar screenshots e traces.

Limitacoes:

- exige dependencia e instalacao de browsers;
- aumenta superficie operacional;
- ainda depende de ambiente estavel;
- prematuro antes da primeira automacao tecnica.

### Vitest

Uso possivel:

- testes de unidade para helpers puros;
- testes de boundaries extraidas;
- validacao de regras de permissao isoladas.

Beneficios:

- rapido;
- bom para logica pura;
- protege refatoracoes pequenas.

Limitacoes:

- exige dependencia;
- pouco eficiente enquanto o monolito concentra UI, DOM e estado;
- deve vir depois de extrair contratos testaveis.

### Cypress

Uso possivel:

- testes E2E de fluxos criticos;
- validacao browser com interface visual de depuracao.

Beneficios:

- maduro para testes ponta a ponta;
- bom para jornadas completas.

Limitacoes:

- mais pesado para o primeiro passo;
- exige dependencia e configuracao;
- nao e necessario para o gate tecnico inicial.

### Checklist manual estruturado

Uso possivel:

- validar fluxos criticos enquanto nao ha automacao browser;
- registrar evidencia por caso;
- manter criterio de aceite objetivo.

Beneficios:

- ja compativel com o processo atual;
- baixo risco;
- cobre julgamento visual e operacional.

Limitacoes:

- sujeito a erro humano;
- mais lento;
- evidencia pode variar entre execucoes.

## Decisao recomendada

A abordagem inicial recomendada e:

1. manter checklist manual estruturado como gate funcional;
2. planejar um script Node simples para o gate tecnico local;
3. adiar Playwright ate haver aprovacao explicita para smoke browser;
4. adiar Vitest ate haver helpers ou boundaries extraidos;
5. nao usar Cypress no primeiro ciclo de automacao.

## Justificativa

O LavaPrime ainda possui `app/main.js` como monolito operacional. Antes de instalar frameworks, a maior reducao de risco vem de automatizar aquilo que ja e obrigatorio e previsivel: build, verify, sintaxe e presenca de arquivos criticos.

Essa escolha preserva reversibilidade, evita dependencia nova e prepara a primeira extracao real com uma base tecnica objetiva.

## Decisao desta fase

Nenhuma ferramenta foi instalada.

Nenhum script foi criado.

A decisao inicial aprovada e planejar automacao futura com scripts Node simples e sem dependencias novas.
