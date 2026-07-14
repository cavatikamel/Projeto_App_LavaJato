# Netlify Staging Environment Proof

## Objetivo

Consolidar a prova local disponivel sobre o ambiente de homologacao Netlify sem alterar painel, DNS, runtime ou producao.

## Evidencias auditadas

| Item | Estado | Evidencia |
| --- | --- | --- |
| `origin/staging` existe | `true` | `git ls-remote --heads origin staging -> cf2eb68 refs/heads/staging` |
| `origin/main` existe | `true` | `git ls-remote --heads origin main -> c040408 refs/heads/main` |
| branch local `staging` existe | `true` | `git branch --list staging` retornou `staging` |
| `origin/staging` carrega a trilha de `Service Order` | `false` | `git merge-base --is-ancestor c7dd0ba origin/staging -> false` |
| `netlify.toml` existe | `true` | arquivo presente no repo |
| build command comprovado | `true` | `npm run build` |
| publish directory comprovado | `true` | `dist` |
| `.netlify/` existe | `false` | diretorio ausente |
| `.netlify/state.json` existe | `false` | arquivo ausente |
| Netlify CLI disponivel | `false` | `NETLIFY_CLI_UNAVAILABLE` |
| URL real de staging comprovada | `false` | sem metadata local, sem CLI e sem evidencia de painel |
| `Production branch = main` comprovada por painel | `false` | regra documental existe, mas painel nao foi auditado nesta fase |

## Leitura consolidada

- existe branch `staging` local e remota;
- existe configuracao de build/publicacao para Netlify;
- nao existe prova local de qual URL de staging o Netlify esta usando;
- nao existe prova local de qual site Netlify esta conectado ao repo;
- a branch remota `origin/staging` ainda esta em `cf2eb68`, anterior a trilha atual de `Service Order staging readiness`.

## Decisoes formais

- `NETLIFY_STAGING_URL_PROVEN = false`
- `NETLIFY_STAGING_TARGET_PROVEN = false`
- `SERVICE_ORDER_STAGING_REMOTE_BASELINE_PROVEN = false`

## Riscos imediatos

1. confundir branch remota existente com homologacao real publicada;
2. assumir que `staging` no GitHub ja representa a trilha atual de `Service Order`;
3. usar uma URL errada em smoke remoto;
4. ativar qualquer write futuro sem prova do alvo certo.

## Proxima acao segura

Usar `docs/primyo-deploy/NETLIFY_STAGING_TARGET_CONFIGURATION.md` como runbook para confirmar no painel:

1. qual site representa homologacao;
2. se a branch conectada e realmente `staging`;
3. qual e a URL real publicada;
4. se `main` continua como producao;
5. se a baseline remota precisa ser atualizada em fase propria antes de qualquer smoke de `Service Order`.
