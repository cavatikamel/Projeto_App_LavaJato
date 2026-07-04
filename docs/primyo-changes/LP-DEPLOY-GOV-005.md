# LP-DEPLOY-GOV-005 - Create And Push Clean Staging Branch Candidate

## Objetivo

Criar a branch `staging` a partir da baseline Web conservadora `9205f09`, publicar `origin/staging` sem tocar `main` e registrar a validacao da operacao.

## Auditoria inicial

- branch de trabalho original: `primyo/onboarding`
- `HEAD` atual da branch de trabalho: `72b2e8d`
- `9205f09` confirmado localmente
- `staging` local: ausente antes da fase
- `origin/staging`: ausente antes da fase
- `origin`: `https://github.com/cavatikamel/Projeto_App_LavaJato.git`
- staged pendente: inexistente
- working tree sujo: presente, mas mantido fora da operacao por criacao direta da referencia Git em `9205f09`

## Execucao autorizada

### Branch local

Comando executado:

```bash
git branch staging 9205f09
```

Resultado:

- `staging` local criada com sucesso
- `git log -1 --oneline staging` confirmou `9205f09`
- `git show --stat --oneline --summary staging` confirmou a baseline documental esperada

### Push remoto autorizado

Comando executado:

```bash
git push -u origin staging
```

Resultado:

- `origin/staging` criada com sucesso
- upstream configurado para a branch local `staging`
- nenhum outro push foi executado

## Producao protegida

- nenhuma alteracao em `main`
- nenhum merge
- nenhum rebase
- nenhum deploy manual
- nenhuma alteracao manual de Netlify
- nenhuma alteracao de DNS
- nenhuma alteracao de Supabase

## Working tree fora de escopo preservado

Os itens abaixo permaneceram fora da branch criada e fora do commit documental:

- `.gitignore`
- `app/styles.css`
- `app/assets/data/fipe-veiculos.js`
- `app/assets/data/fipe-veiculos.json`
- `LavaPrimeAndroidApp/**`
- itens APK/Android adicionais presentes no working tree local

## Validacoes da branch staging

- `git show --stat --oneline --summary staging`
- `git log -1 --oneline staging`
- `git branch -r`
- `git ls-remote --heads origin staging`

Resultado consolidado:

- `staging` local e `origin/staging` apontam para `9205f09`

## Efeito externo esperado

- a fase nao abriu o Netlify nem executou deploy manual
- se houver branch deploy automatico configurado externamente para `staging`, um deploy pode ser disparado pela plataforma sem interacao manual nesta fase

## Proxima fase recomendada

`LP-DEPLOY-GOV-006 - Validate Netlify staging deployment`
