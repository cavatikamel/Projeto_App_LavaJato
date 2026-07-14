# Netlify Staging Remote Smoke

## Objetivo

Registrar se o smoke remoto de homologacao foi executado e, quando nao foi, documentar o bloqueio com evidencias.

## Resultado da LP-DEPLOY-GOV-011

Status: `PARTIAL`

Motivo:

- a URL real de staging foi comprovada;
- o branch deploy informado ficou consistente com `staging@cf2eb68`;
- a tela de autenticacao carregou corretamente, sem erro bloqueante de console;
- o login administrativo nao ficou comprovado nesta automacao, entao a validacao pos-login ficou parcial.

## Smoke remoto executado?

Sim.

## URL validada

- `https://staging--lavaprime.netlify.app/`

## Evidencias usadas

- URL final carregada permaneceu `https://staging--lavaprime.netlify.app/`;
- titulo remoto: `LavaPrime`;
- nenhum redirecionamento para `app.lavaprime.com.br`;
- tela remota carregada com `ACESSO SEGURO`, `Autenticacao`, `Usuario`, `Senha`, `Administrador`, `Operador` e `Confirmar login`;
- console remoto sem `error` ou `warn` bloqueante;
- diagnostico `Service Order` indisponivel no staging atual.

## Conclusao

- `NETLIFY_STAGING_URL_PROVEN = true`
- `NETLIFY_STAGING_REMOTE_SMOKE = partial`
- `SERVICE_ORDER_REMOTE_SMOKE = blocked-by-outdated-staging`
- `REMOTE_SMOKE_TARGET_CONFIRMED = true`

## Proxima acao segura

Preparar a promocao controlada da baseline atual de `Service Order` para `origin/staging`, sem tocar `main`, producao, Supabase ou DNS.

## Complemento LP-SERVICE-ORDER-011

- a baseline local candidata para substituir `staging@cf2eb68` foi auditada como `a3302df`;
- as validacoes locais passaram integralmente;
- o lock historico em `dist/assets` nao reapareceu;
- o smoke remoto continua limitado ao staging antigo ate que a baseline atual seja realmente promovida para `origin/staging`;
- nenhum push foi executado nesta fase por falta de autorizacao explicita.
