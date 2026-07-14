# Netlify Staging Target Configuration

## Objetivo

Definir o alvo operacional recomendado para homologacao `staging` do LavaPrime Web sem alterar producao, DNS, runtime ou painel Netlify nesta fase.

## Estado comprovado nesta fase

- `origin/staging` existe e aponta para `cf2eb68 - fix(primyo): align overview dashboard chart grid`;
- `origin/main` existe e aponta para `c040408 - feat(lavaprime): refine dashboard and operations experience`;
- `netlify.toml` confirma `command = "npm run build"` e `publish = "dist"`;
- `.netlify/` e `.netlify/state.json` nao existem no workspace;
- Netlify CLI nao esta disponivel no ambiente local auditado;
- a URL real de `staging` nao esta comprovada por evidencia local;
- a trilha atual de `Service Order` ainda nao esta comprovadamente publicada em `origin/staging`.

## Decisao desta fase

`NETLIFY_STAGING_URL_PROVEN = false`

## Estrategias possiveis

### Opcao A - Branch deploy no mesmo site

Usar o mesmo site Netlify da producao com branch deploy dedicado para `staging`.

Vantagens:

- setup mais rapido;
- reaproveita o mesmo projeto Netlify;
- facilita comparacao entre `main` e `staging`.

Riscos:

- exige confirmar no painel que `Production branch = main`;
- exige cuidado para nao confundir URL de branch deploy com dominio oficial;
- continua inseguro se a branch `staging` remota nao carregar a baseline correta.

### Opcao B - Site Netlify separado para staging

Criar um segundo site Netlify apenas para homologacao.

Vantagens:

- maior isolamento entre producao e homologacao;
- URL de staging fica inequivoca;
- reduz risco operacional para futuras fases de backend staging e `shadow write`.

Riscos:

- configuracao adicional no painel;
- exige documentar ownership do novo site;
- exige repetir variaveis publicas seguras no ambiente correto.

### Opcao C - Deploy Preview como apoio tecnico

Usar previews de PR apenas como apoio visual.

Vantagens:

- agiliza verificacao tecnica pontual;
- bom para comparacoes rapidas.

Riscos:

- nao substitui homologacao oficial;
- nao serve como prova operacional permanente de `staging`.

## Estrategia recomendada

Recomendacao principal: `Opcao B - Site Netlify separado para staging`.

Motivos:

1. a producao ja esta associada a `app.lavaprime.com.br` e deve permanecer isolada;
2. a trilha futura de `Service Order shadow write` vai exigir backend staging proprio e observabilidade separada;
3. uma URL independente facilita smoke remoto, rollback e comparacao entre baseline legacy e futura ativacao controlada.

## Passo a passo no painel Netlify

1. Abrir o site atual ligado a `app.lavaprime.com.br`.
2. Confirmar em `Site configuration > Build & deploy` que `Production branch = main`.
3. Confirmar que o dominio oficial continua ligado apenas a producao.
4. Escolher uma das estrategias:
   - `Opcao A`: habilitar branch deploy para `staging`;
   - `Opcao B`: criar site separado e conectar a branch `staging`.
5. Confirmar `Build command = npm run build`.
6. Confirmar `Publish directory = dist`.
7. Confirmar que nenhuma credencial `service role` sera usada no frontend.
8. Salvar a configuracao sem alterar o dominio de producao.
9. Aguardar o deploy automatico de `staging`.
10. Copiar a URL real publicada.
11. Registrar a URL nos documentos de deploy e de `Service Order`.
12. Executar smoke remoto antes de qualquer discussao sobre backend staging ou `shadow write`.

## Como capturar a URL real

Registrar apenas a URL mostrada pelo proprio painel Netlify apos o deploy concluir.

Nao assumir:

- URL por convencao de branch;
- URL por nome guessed de site;
- URL de preview como se fosse homologacao oficial.

## Como registrar a URL no projeto

Assim que a URL real existir, atualizar:

- `docs/primyo-deploy/NETLIFY_STAGING_ENVIRONMENT_PROOF.md`
- `docs/primyo-service-orders/SERVICE_ORDER_STAGING_ENVIRONMENT_PROOF.md`
- `docs/primyo-service-orders/SERVICE_ORDER_STAGING_ACTIVATION_CHECKLIST.md`

## O que nao alterar

- `main`
- producao
- `app.lavaprime.com.br`
- DNS
- `netlify.toml`
- runtime Web
- Supabase
- variaveis reais de ambiente

## Rollback

Se a configuracao futura de `staging` ficar errada:

1. remover ou desabilitar o branch deploy/site de homologacao incorreto;
2. manter `main` como unica branch de producao;
3. remover a URL incorreta dos documentos;
4. repetir a validacao do alvo antes de novo smoke remoto.

## Criterios antes do smoke remoto

- URL real publicada e comprovada;
- branch associada claramente identificada;
- build remoto concluido;
- baseline correta confirmada;
- dominio de producao preservado;
- `READY_FOR_STAGING_SHADOW_WRITE` ainda `false` ate backend staging e seguranca estarem prontos.
