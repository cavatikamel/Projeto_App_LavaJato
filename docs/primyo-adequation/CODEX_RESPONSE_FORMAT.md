# Codex Response Format

## Objetivo

Padronizar respostas finais compactas para a trilha Primyo.

## 1. Formato compacto padrao

Quando a fase nao pedir outro formato especifico, a resposta final deve seguir:

1. O que foi criado.
2. O que foi alterado.
3. O que ficou fora.
4. Validacoes executadas.
5. Riscos.
6. Rollback.
7. Confirmacao de escopo.

## 2. Variacoes por fase

### Implementacao Phase

- destacar modulo criado ou alterado;
- listar arquivos principais;
- resumir o gate, build e verify;
- confirmar que runtime e comportamento nao mudaram quando isso fizer parte do criterio.

### Closure Phase

- destacar fechamento, baseline, backlog, change control e next slice;
- informar validacoes e decisao da proxima fatia.

### Commit Phase

- informar branch;
- informar arquivos staged;
- informar arquivos deixados de fora;
- informar validacoes;
- informar hash, mensagem, push e estado final do git status.

### Documentation Phase

- listar documentos criados;
- listar documentos atualizados;
- resumir regras consolidadas;
- informar validacoes documentais;
- confirmar que nenhuma implementacao funcional foi iniciada.

## 3. Quando a resposta pode ser longa

Respostas longas so devem ocorrer quando houver:

- erro real;
- risco alto;
- falha de gate ou build;
- conflito de escopo;
- working tree misturado que afete a fase;
- decisao tecnica relevante;
- bloqueio operacional.

## 4. Regras de clareza

- nao transformar resposta curta em changelog enorme;
- nao repetir o prompt inteiro;
- nao listar comandos irrelevantes quando bastar o resultado;
- diferenciar claramente o que foi feito nesta fase do que ja estava sujo antes dela;
- confirmar sempre quando codigo funcional, runtime, UI, Android, banco ou Supabase nao foram alterados.

## 5. Regra de commit e push

Quando houver commit:

- informar hash e mensagem;
- confirmar se houve ou nao push;
- se nao houve push, dizer isso explicitamente.

## 6. Regra de honestidade

Se alguma validacao nao puder ser executada ou falhar por motivo fora do escopo, a resposta deve dizer isso de forma direta.
