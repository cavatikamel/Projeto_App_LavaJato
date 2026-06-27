# LavaPrime Permission Policy

## Objetivo

Definir a politica oficial de permissao do LavaPrime para o estado atual e para evolucao futura.

Esta politica nao implementa autenticacao real, Supabase, RLS ou novos perfis.

## Regra principal

O LavaPrime deve adotar `negar por padrao`.

Uma acao so deve ser considerada permitida quando:

- estiver mapeada na matriz oficial;
- estiver associada a um perfil conhecido;
- possuir escopo de modulo claro;
- possuir criterio de teste;
- nao violar regra sensivel especifica.

## Perfis ativos atuais

### Administrador

Perfil com acesso administrativo amplo no estado atual.

Pode acessar:

- shell administrativa;
- patio;
- cadastros;
- financeiro;
- relatorios;
- documentos;
- configuracoes;
- usuarios;
- catalogos;
- acoes sensiveis permitidas pela matriz.

### Operador

Perfil operacional restrito ao patio.

Pode acessar:

- login local por perfil;
- patio;
- atendimento;
- acoes operacionais condicionais dentro do atendimento;
- logout.

Nao deve acessar:

- shell administrativa completa;
- financeiro administrativo;
- usuarios;
- configuracoes;
- relatorios administrativos;
- gestao de permissoes;
- exclusoes;
- estornos;
- configuracoes fiscais/comerciais.

## Perfis futuros

Perfis futuros devem permanecer inativos ate fase especifica:

- `Dono/Proprietario`
- `Supervisor`
- `Financeiro`
- `Suporte Primyo`

Nenhum perfil futuro pode ser tratado como alias automatico de Administrador.

Cada novo perfil deve ter:

- matriz propria;
- escopo por modulo;
- cenarios de teste;
- regra de auditoria;
- plano de rollback;
- decisao de RLS futura.

## Acoes nao mapeadas

Acoes nao mapeadas devem ser:

- negadas para Operador;
- bloqueadas para Administrador ate classificacao;
- registradas como lacuna de permissao;
- avaliadas antes de qualquer implementacao.

## Permissoes temporarias

Permissoes temporarias nao devem ser implementadas no frontend local sem arquitetura aprovada.

Quando existirem futuramente, deverao ter:

- motivo;
- aprovador;
- prazo de expiracao;
- escopo minimo;
- auditoria;
- revogacao.

## Auditoria futura

A autorizacao real futura deve registrar:

- usuario autenticado;
- perfil ativo;
- organizacao;
- acao;
- entidade afetada;
- resultado permitido ou negado;
- origem da chamada;
- data/hora;
- motivo quando aplicavel.

## Relacao com `sessionBoundary`

`sessionBoundary` representa sessao e perfil local atual.

Ela nao deve decidir autorizacao de negocio sozinha.

## Relacao com `accessBoundary`

`accessBoundary` deve ser o ponto local de decisao de acesso enquanto a autenticacao real nao existir.

A matriz formal de permissoes deve orientar futuras evolucoes da `accessBoundary`.

## Relacao com Supabase RLS futura

Quando Supabase for ativado, esta politica devera ser traduzida para:

- membership por organizacao;
- papel por usuario;
- politicas de leitura e escrita por tabela;
- controle de acoes sensiveis;
- auditoria de eventos.

Nenhuma policy SQL deve ser criada ate a fase de implementacao correspondente.

## Criterio de aceite para mudancas futuras

Mudancas futuras de permissao so podem avancar se:

- preservarem Administrador com acesso administrativo esperado;
- preservarem Operador restrito ao patio;
- nao ativarem perfil futuro sem matriz;
- executarem a matriz de regressao aplicavel;
- documentarem rollback;
- atualizarem cenarios de teste.

## Conclusao

A politica oficial e negar por padrao, permitir somente o que estiver mapeado e tratar qualquer permissao nova como mudanca controlada.
