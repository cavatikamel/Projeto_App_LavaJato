# Next Slice Decision

## Objetivo

Registrar a proxima trilha oficial apos `LP-DEPLOY-GOV-004`.

## Estado atual consolidado

- o encerramento documental do Primyo Transformation Program no Web continua consolidado
- `DEMO_BOOTSTRAP` continua o modo padrao
- `CLEAN_BOOTSTRAP` continua protegido e nao `default`
- `customerAdapter` continua em `shadow read`
- `idResolver` continua fora do runtime
- Supabase continua fechado
- a governanca de deploy, homologacao e producao para `app.lavaprime.com.br` continua documentada
- `staging` continua ausente local e remotamente
- a baseline Web revisada especificamente para homologacao permanece `9205f09`
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

## Decisao oficial

- encerramento documental do programa: `consolidado`
- proxima trilha recomendada: `LP-DEPLOY-GOV-005 - Execute authorized working tree isolation and prepare clean staging source`
- demais trilhas futuras independentes:
  - `LP-DEPLOY-GOV-006 - Validate Netlify staging deployment`
  - `LP-WEB-DATA-CLEANUP-013 - Institutional clean dataset strategy`
  - `LavaPrime Android nativo oficial`
  - `Supabase/backend real`
  - `producao controlada Web`
  - `ativacao futura do CLEAN_BOOTSTRAP`
  - `funcionalidades futuras LPFR`

## Justificativa

`LP-DEPLOY-GOV-005` passa a ser a melhor proxima fase porque:

1. a baseline Web candidata ja foi revisada;
2. o plano de isolamento agora classifica cada item fora de escopo por trilha propria;
3. o bloqueio restante deixou de ser descobrir o problema e passou a ser executar a limpeza/isolation autorizada;
4. o `HEAD` atual `79ae86e` reintroduziu delta documental APK acima da baseline Web revisada `9205f09`;
5. o proximo passo seguro e isolar os arquivos fora de escopo e preparar uma origem limpa para `staging`, sem criar a branch ainda;
6. `LP-WEB-DATA-CLEANUP-013` continua importante, mas como trilha paralela de dados limpos e nao como passo obrigatorio previo ao staging.

## Fatias rejeitadas por enquanto

- qualquer tentativa de criar ou pushar `staging` com o working tree atual:
  - rejeitada, porque os itens fora de escopo continuam misturados e podem contaminar a homologacao;
- qualquer tentativa de usar automaticamente o `HEAD` atual `79ae86e` como origem de `staging`:
  - rejeitada, porque a linha acima da baseline Web revisada ja inclui documentacao APK que nao foi reavaliada como baseline de homologacao Web;
- qualquer tentativa de publicar `app.lavaprime.com.br` direto de `primyo/onboarding`:
  - rejeitada, porque a estrategia aprovada exige homologacao e aprovacao previa;
- qualquer etapa de Supabase:
  - continua bloqueada ate existir trilha propria e autorizacao explicita;
- qualquer remocao real da seed demo:
  - rejeitada antes de trilha propria de dados limpos;
- qualquer ativacao do `CLEAN_BOOTSTRAP` como padrao:
  - rejeitada enquanto a base limpa seguir insuficiente.

## Direcao recomendada

Para a proxima fase, `LP-DEPLOY-GOV-005` deve:

1. executar a isolation autorizada de `.gitignore`, `app/styles.css`, `LavaPrimeAndroidApp/**` e `app/assets/data/fipe-veiculos.*` sem misturar trilhas;
2. confirmar se a futura `staging` nascera de `9205f09` ou de outra baseline Web reavaliada explicitamente;
3. manter `main` e `app.lavaprime.com.br` protegidos de publicacao direta;
4. pedir autorizacao antes de qualquer `push` remoto;
5. manter `DEMO_BOOTSTRAP` como padrao oficial;
6. continuar sem abrir Supabase runtime e sem remover a seed demo.

## Resultado desta fase

- o working tree passou a ter plano de isolamento formal antes de qualquer branch de homologacao
- a baseline Web revisada `9205f09` continua segura do ponto de vista de runtime
- o `HEAD` atual `79ae86e` foi reclassificado como delta documental APK acima da baseline Web revisada
- nenhuma seed foi removida
- nenhuma tela foi quebrada
- o modo demo continuou padrao
- nenhuma branch foi criada
- nenhum push ou deploy foi executado
