# LP-DEPLOY-GOV-001

## Objetivo

Definir a governanca oficial de repositorio, homologacao, producao, Netlify e ambientes Supabase para a publicacao segura do LavaPrime Web apos o encerramento do `Primyo Transformation Program`.

## Auditoria desta fase

- branch atual auditada: `primyo/onboarding`
- ultimo commit auditado: `094a5b7`
- remote principal auditado: `origin`
- `netlify.toml` confirmado
- `vite.config.js` confirmado
- `.env.example` confirmado como referencia de variaveis, sem abertura de runtime
- working tree segue contendo arquivos fora de escopo que bloqueiam qualquer push ou deploy sem isolamento previo

## Resultado

- estrategia de branches definida
- estrategia Netlify definida
- estrategia Supabase staging/production definida conceitualmente
- fluxo de promocao para `app.lavaprime.com.br` documentado
- checklist de homologacao criado
- checklist de producao criado
- rollback de publicacao documentado

## Proxima fase recomendada

`LP-DEPLOY-GOV-002 - Prepare Netlify staging deployment`

## Regras preservadas

- nenhum push foi executado
- nenhum deploy foi executado
- nenhum DNS foi alterado
- nenhuma configuracao real de Netlify ou Supabase foi alterada
- nenhum codigo de runtime foi alterado
