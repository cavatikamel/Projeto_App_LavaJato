# LP-DEPLOY-GOV-002

## Objetivo

Preparar documentalmente e tecnicamente o caminho seguro para homologacao Netlify do LavaPrime Web, usando a branch `staging`, sem tocar producao.

## Auditoria executada

- branch atual confirmada: `primyo/onboarding`
- ultimo commit auditado: `87975a5`
- `staging` local: ausente
- `origin/staging`: ausente
- `netlify.toml`: presente
- `vite.config.js`: presente
- `package.json`: presente
- comando de build confirmado: `npm run build`
- pasta de publicacao confirmada: `dist`
- runtime inalterado
- producao preservada

## Decisoes registradas

- `main` continua reservado para producao
- `app.lavaprime.com.br` continua protegido para producao apenas
- `staging` continua sendo a branch alvo de homologacao
- a branch `staging` nao deve ser criada cegamente a partir do `HEAD` atual
- a baseline Web precisa ser revisada antes da criacao remota da homologacao

## Risco encontrado

O `HEAD` atual `87975a5` em `primyo/onboarding` inclui governanca APK. Isso exige revisao antes de usar esse ponto como baseline da homologacao Web.

## Resultado da fase

- plano de preparacao de staging criado
- comandos futuros documentados sem execucao
- checklist de staging reforcado
- producao mantida bloqueada
- nenhuma mudanca de Netlify, DNS, Supabase ou runtime executada

## Proxima fase recomendada

`LP-DEPLOY-GOV-003 - Create and push staging branch candidate`

## Confirmacoes

- nenhum `push` executado
- nenhum deploy executado
- nenhuma alteracao de DNS executada
- nenhuma alteracao de Supabase executada
