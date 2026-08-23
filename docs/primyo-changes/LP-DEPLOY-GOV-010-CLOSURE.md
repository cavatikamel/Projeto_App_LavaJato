# LP-DEPLOY-GOV-010 - Closure

## Objetivo da fase

Criar um guia operacional final para configurar manualmente o branch deploy `staging` no Netlify, mantendo `main` como producao e o dominio `app.lavaprime.com.br` protegido.

## Entrega documental

- `NETLIFY_STAGING_MANUAL_CONFIGURATION.md` criado;
- `NETLIFY_STAGING_TARGET_CONFIGURATION.md` atualizado com recomendacao imediata de branch deploy;
- `NETLIFY_STAGING_TARGET_PROOF.md` e `STAGING_VALIDATION_CHECKLIST.md` atualizados;
- bloqueios e checklist de `Service Order staging` propagados;
- governanca e trilha de testes atualizadas.

## Decisoes formais

- `Production branch = main` permanece obrigatoria;
- `staging` deve ser configurada apenas como branch deploy de homologacao;
- a URL real de staging deve ser trazida pelo usuario antes de qualquer smoke remoto;
- a baseline atual de `Service Order` continua fora de `origin/staging`.

## Compatibilidade preservada

- runtime nao alterado;
- Netlify nao alterado diretamente;
- Supabase nao tocado;
- env nao alterada;
- nenhuma migration criada;
- nenhum push executado.

## Proxima fase recomendada

`LP-DEPLOY-GOV-011 - Netlify Staging Remote Smoke Proof`

## Observacao adicional

Depois da comprovacao da URL, ainda sera necessaria uma fase propria para promover a baseline correta de `Service Order` a `staging`, se o objetivo for validar essa trilha remotamente.
