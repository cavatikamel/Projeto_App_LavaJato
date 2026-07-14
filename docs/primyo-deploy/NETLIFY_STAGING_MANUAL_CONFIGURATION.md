# Netlify Staging Manual Configuration

## Objetivo

Configurar manualmente o deploy da branch `staging` no Netlify sem alterar a producao, mantendo `main` como branch oficial do dominio `app.lavaprime.com.br`.

## Checklist antes de mexer no painel

- confirmar que o site aberto no Netlify e o mesmo ligado a `app.lavaprime.com.br`;
- confirmar que o dominio oficial continua em producao;
- confirmar que `Production branch = main`;
- confirmar `Build command = npm run build`;
- confirmar `Publish directory = dist`;
- confirmar que `staging` sera apenas homologacao;
- confirmar que nenhum DNS sera alterado.

## Passo a passo no painel Netlify

1. Abrir o painel do Netlify.
2. Entrar no site atualmente ligado ao dominio `app.lavaprime.com.br`.
3. Abrir `Site configuration`.
4. Entrar em `Build & deploy`.
5. Confirmar que `Production branch = main`.
6. Localizar a area de `Branch deploys`.
7. Habilitar deploy apenas para branches selecionadas, se ainda estiver desabilitado.
8. Adicionar a branch `staging`.
9. Confirmar novamente `Build command = npm run build`.
10. Confirmar novamente `Publish directory = dist`.
11. Salvar a configuracao.
12. Aguardar a conclusao do build da branch `staging`.
13. Copiar a URL real gerada pelo Netlify para essa branch.
14. Nao alterar `app.lavaprime.com.br`.
15. Nao alterar DNS.

## Opcoes aceitas

### Opcao A - Branch deploy no mesmo site

Recomendada nesta fase.

- `main = producao`
- `staging = branch deploy / homologacao`

### Opcao B - Site Netlify separado para staging

Mais isolado, mas exige configuracao adicional e nao e necessario para destravar a prova inicial da URL.

### Opcao C - Deploy Preview

Apenas apoio tecnico. Nao substitui homologacao oficial.

## O que copiar do painel

Depois que o branch deploy existir, registrar:

- URL real de staging;
- branch publicada;
- commit publicado;
- status do build;
- data e hora do deploy;
- erros de build, se existirem.

## O que nao fazer

- nao mudar `Production branch` para `staging`;
- nao apontar `app.lavaprime.com.br` para `staging`;
- nao alterar DNS;
- nao disparar deploy manual de producao;
- nao mexer em Supabase nesta fase;
- nao adicionar secrets no frontend sem fase propria.

## Proxima fase apos a URL real

Quando o usuario trouxer a URL real de staging, a proxima fase recomendada sera:

`LP-DEPLOY-GOV-011 - Netlify Staging Remote Smoke Proof`

Essa fase deve validar:

- URL real;
- branch e commit publicados;
- carregamento do app;
- login;
- Visao Geral;
- documentos e relatorios;
- producao protegida.

## Observacao sobre a baseline de Service Order

A branch `origin/staging` atual ainda nao contem a trilha atual de `Service Order`.

Depois que a URL real de staging for comprovada, ainda sera necessaria uma fase separada para promover a baseline correta de `Service Order` para `staging`, caso o objetivo seja validar essa trilha remotamente.

Fase futura prevista:

`LP-SERVICE-ORDER-011 - Controlled Service Order Branch Promotion To Staging`
