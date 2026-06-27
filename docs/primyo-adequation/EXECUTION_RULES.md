# Primyo Execution Rules

## Objetivo

Consolidar as regras permanentes de execucao da trilha Primyo no LavaPrime para que futuros prompts possam apenas referenciar este documento.

## 1. Regras permanentes de escopo

- nunca usar `git add .`;
- nunca executar `git push` sem autorizacao explicita do usuario;
- nao alterar `app/main.js` sem fase autorizada para isso;
- nao alterar Android sem fase Android dedicada;
- nao alterar CSS, UI ou layout sem fase visual dedicada;
- nao alterar Supabase, banco, schema ou migracao sem fase de dados ou integracao aprovada;
- nao instalar dependencias sem justificativa tecnica e autorizacao explicita;
- nao misturar backlog IDs ou fases nao relacionadas no mesmo pacote sem aprovacao formal;
- manter mudancas pequenas, reversiveis e rastreaveis;
- separar mudancas fora de escopo em staging, commit e relato final.

## 2. Regras de working tree

- se o repositorio ja estiver sujo com mudancas fora da fase atual, nao reverter automaticamente;
- deixar Android, CSS, `.gitignore` e outras trilhas nao autorizadas fora do commit quando nao fizerem parte da fase;
- usar apenas caminhos explicitos para staging seletivo;
- registrar no relato final o que entrou, o que ficou de fora e qualquer risco de mistura no working tree.

## 3. Regras de validacao

- preservar rollback em toda fase que alterar codigo, gate, baseline ou documento de controle;
- preservar `npm.cmd run primyo:gate`, build e verify quando a fase tocar web, scripts, gate, adapters, baseline tecnica ou regras de regressao;
- em fase documental pura, executar pelo menos:
  - `git status --short`
  - `git diff --name-only`
  - `npm.cmd run primyo:gate`
- se o gate falhar por motivo fora do escopo da fase atual, registrar a ocorrencia sem improvisar correcao lateral;
- nao omitir riscos, bloqueios, falhas transitivas ou dependencias abertas.

## 4. Regras de documentacao

- criar ou atualizar change record quando a fase pedir;
- atualizar backlog, change control, baseline, gate policy ou next slice quando a fase exigir propagacao de estado;
- registrar criterios de aceite, riscos remanescentes e rollback;
- confirmar explicitamente quando nada funcional foi alterado.

## 5. Regras de resposta

- responder de forma compacta por padrao;
- alongar a resposta apenas quando houver erro, risco alto, bloqueio, decisao tecnica relevante ou evidencia contraditoria;
- sempre confirmar escopo preservado;
- sempre informar validacoes executadas;
- sempre diferenciar o que foi feito nesta fase do que ja estava sujo no working tree antes dela.

## 6. Regra de Lean Mode

Quando estas regras ja cobrirem a fase, os prompts futuros nao precisam repetir tudo.

Basta referenciar:

- `docs/primyo-adequation/EXECUTION_RULES.md`
- `docs/primyo-adequation/LEAN_PROMPT_POLICY.md`
- `docs/primyo-adequation/CODEX_RESPONSE_FORMAT.md`
- `docs/primyo-adequation/COMMIT_RULES.md`
- `docs/primyo-adequation/PHASE_TYPES.md`

e adicionar apenas:

- objetivo da fase;
- fontes obrigatorias da fase;
- escopo permitido e proibido;
- validacoes da fase;
- criterio de aceite;
- formato da resposta final, quando necessario.
