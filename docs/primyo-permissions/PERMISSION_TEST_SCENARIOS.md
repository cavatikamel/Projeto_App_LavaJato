# LavaPrime Permission Test Scenarios

## Objetivo

Definir cenarios de teste para validar a matriz de permissoes do LavaPrime.

Estes cenarios sao planejamento. Nenhum teste automatizado foi criado nesta fase.

## Cenarios obrigatorios futuros

| ID | Cenario | Perfil | Pre-condicao | Passos | Resultado esperado | Severidade |
| --- | --- | --- | --- | --- | --- | --- |
| PERM-001 | Administrador acessa financeiro | Administrador | Login admin concluido | Abrir shell administrativa e acessar financeiro | Financeiro abre sem bloqueio indevido | Critico |
| PERM-002 | Operador nao acessa financeiro | Operador | Login operador concluido | Tentar acessar financeiro por navegacao ou atalho | Acesso negado ou indisponivel | Critico |
| PERM-003 | Operador acessa patio | Operador | Login operador concluido | Abrir patio | Patio operacional abre corretamente | Critico |
| PERM-004 | Administrador acessa patio | Administrador | Login admin concluido | Abrir patio pela shell administrativa | Patio abre corretamente | Alto |
| PERM-005 | Administrador altera configuracoes | Administrador | Login admin concluido | Abrir configuracoes do negocio | Configuracoes abrem para edicao | Alto |
| PERM-006 | Operador nao altera configuracoes | Operador | Login operador concluido | Tentar acessar configuracoes | Acesso negado ou indisponivel | Alto |
| PERM-007 | Operador nao cria usuario | Operador | Login operador concluido | Tentar acessar usuarios/equipe | Acesso negado ou indisponivel | Critico |
| PERM-008 | Administrador cria ou edita usuario | Administrador | Login admin concluido | Abrir usuarios/equipe | Acao administrativa disponivel conforme fluxo atual | Alto |
| PERM-009 | Operador nao estorna pagamento | Operador | Login operador concluido | Tentar executar estorno | Acao indisponivel ou negada | Critico |
| PERM-010 | Administrador cancela atendimento | Administrador | Atendimento existente | Executar cancelamento quando existir interface | Acao permitida com necessidade futura de motivo | Alto |
| PERM-011 | Operador nao cancela atendimento sensivel | Operador | Atendimento existente | Tentar cancelamento sensivel | Acao indisponivel ou negada | Alto |
| PERM-012 | Perfil desconhecido deve ser bloqueado | Perfil desconhecido | Sessao com perfil nao mapeado | Tentar acessar area administrativa ou patio | Acesso negado por padrao | Critico |
| PERM-013 | Administrador acessa relatorios/documentos | Administrador | Login admin concluido | Abrir relatorios ou documentos | Area abre conforme fluxo atual | Alto |
| PERM-014 | Operador nao exporta relatorio | Operador | Login operador concluido | Tentar acessar/exportar relatorio | Acesso negado ou indisponivel | Alto |
| PERM-015 | Administrador edita metodo de pagamento | Administrador | Login admin concluido | Abrir metodos de pagamento | Edicao administrativa disponivel conforme fluxo atual | Alto |
| PERM-016 | Operador nao edita metodo de pagamento | Operador | Login operador concluido | Tentar abrir metodos de pagamento | Acesso negado ou indisponivel | Alto |
| PERM-017 | Operador registra acao operacional no patio | Operador | Login operador e atendimento aberto | Executar acao operacional permitida | Fluxo operacional continua funcionando | Alto |
| PERM-018 | Operador nao recebe shell administrativa | Operador | Login operador concluido | Verificar tela principal | Shell administrativa completa nao aparece | Critico |

## Pacote minimo para mudancas de permissao

Toda mudanca futura que tocar permissao deve executar:

- `ST-001` login administrador;
- `ST-002` login operador;
- `ST-003` logout;
- `ST-004` acesso ao patio;
- `ST-005` acesso administrativo;
- `ST-006` navegacao principal;
- `PERM-001`;
- `PERM-002`;
- `PERM-003`;
- `PERM-007`;
- `PERM-012`;
- validacao de console sem erro visivel.

## Evidencia esperada

Cada execucao futura deve registrar:

- data;
- backlog ID;
- perfil usado;
- cenario executado;
- resultado;
- evidencia;
- falhas;
- observacoes;
- decisao final.

## Conclusao

Os cenarios de permissao priorizam riscos de acesso indevido, bloqueio indevido, financeiro, usuarios, configuracoes e perfil desconhecido.

Eles devem ser usados antes de qualquer extracao de `accessBoundary` ou autenticacao real.
