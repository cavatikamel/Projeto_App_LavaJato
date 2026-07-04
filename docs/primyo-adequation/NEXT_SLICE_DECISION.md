# Next Slice Decision

## Objetivo

Registrar a proxima trilha oficial apos `LP-DEPLOY-GOV-005`.

## Estado atual consolidado

- o encerramento documental do Primyo Transformation Program no Web continua consolidado
- `DEMO_BOOTSTRAP` continua o modo padrao
- `CLEAN_BOOTSTRAP` continua protegido e nao `default`
- `customerAdapter` continua em `shadow read`
- `idResolver` continua fora do runtime
- Supabase continua fechado
- a governanca de deploy, homologacao e producao para `app.lavaprime.com.br` continua documentada
- `staging` foi criada localmente e publicada em `origin/staging`
- a baseline Web usada para `staging` foi `9205f09`
- o `HEAD` atual de `primyo/onboarding` passou a ser `79ae86e`
- os commits acima da baseline Web revisada passaram a incluir documentacao APK, sem alterar runtime Web, mas reabrindo risco de mistura de trilhas no ramo futuro de homologacao
- o working tree continua com arquivos fora de escopo que bloqueiam push ou deploy sem isolamento:
  - `.gitignore`
  - `app/styles.css`
  - `LavaPrimeAndroidApp/**`
  - `app/assets/data/fipe-veiculos.js`
  - `app/assets/data/fipe-veiculos.json`
- `docs/primyo-apk/LP_APK_REQUIREMENTS.md` nao apareceu mais como item sujo nesta auditoria
- o plano de isolamento do working tree foi criado
- `main` permaneceu intocada
- nenhum deploy manual foi executado

## Decisao oficial

- encerramento documental do programa: `consolidado`
- proxima trilha recomendada: `LP-DEPLOY-GOV-006 - Validate Netlify staging deployment`
- demais trilhas futuras independentes:
  - `LP-DEPLOY-GOV-007 - Production release decision after staging approval`
  - `LP-WEB-DATA-CLEANUP-013 - Institutional clean dataset strategy`
  - `LavaPrime Android nativo oficial`
  - `Supabase/backend real`
  - `producao controlada Web`
  - `ativacao futura do CLEAN_BOOTSTRAP`
  - `funcionalidades futuras LPFR`

## Justificativa

`LP-DEPLOY-GOV-006` passa a ser a melhor proxima fase porque:

1. a branch `staging` ja existe localmente e remotamente;
2. a baseline conservadora `9205f09` ja foi usada com sucesso;
3. o proximo bloqueio deixou de ser Git e passou a ser a validacao do ambiente publicado;
4. a producao continua protegida em `main` e em `app.lavaprime.com.br`;
5. a proxima acao segura e confirmar a homologacao Netlify, nao abrir deploy manual;
6. `LP-WEB-DATA-CLEANUP-013` continua importante, mas segue paralela ao fluxo de staging.

## Fatias rejeitadas por enquanto

- qualquer tentativa de publicar producao sem validar `origin/staging`:
  - rejeitada, porque a homologacao agora precisa ser observada e aprovada antes de qualquer promocao;
- qualquer tentativa de repushar `staging` a partir do `HEAD` atual `79ae86e` sem nova revisao:
  - rejeitada, porque a branch homologada oficial ja foi fixada em `9205f09`;
- qualquer tentativa de publicar `app.lavaprime.com.br` direto de `primyo/onboarding`:
  - rejeitada, porque a estrategia aprovada exige homologacao e aprovacao previa;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir trilha propria e autorizacao explicita;
- qualquer remocao real da seed demo:
  - rejeitada antes de trilha propria de dados limpos;
- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto a base limpa seguir insuficiente.

## Direcao recomendada

Para a proxima fase, `LP-DEPLOY-GOV-006` deve:

1. validar se a publicacao automatica de `origin/staging` ocorreu corretamente, se aplicavel;
2. confirmar que o ambiente publicado preserva `DEMO_BOOTSTRAP` como padrao;
3. revalidar smoke reduzido em homologacao;
4. manter `main` e `app.lavaprime.com.br` protegidos de publicacao direta;
5. continuar sem abrir Supabase runtime e sem remover a seed demo;
6. preparar a decisao de promocao somente apos aprovacao explicita do usuario.

## Resultado desta fase

- a branch `staging` passou a existir em `origin` a partir de `9205f09`
- a baseline Web revisada `9205f09` foi promovida com sucesso para homologacao Git
- o `HEAD` atual `72b2e8d` da branch de trabalho continuou separado da branch homologada
- nenhuma seed foi removida
- nenhuma tela foi quebrada
- o modo demo continuou padrao
- nenhum deploy manual foi executado
