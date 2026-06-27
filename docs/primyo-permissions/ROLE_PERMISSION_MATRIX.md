# LavaPrime Role Permission Matrix

## Objetivo

Formalizar a matriz oficial de permissoes do LavaPrime para os perfis atualmente observados:

- `Administrador`
- `Operador`

Este documento tambem prepara extensao futura para:

- `Dono/Proprietario`
- `Supervisor`
- `Financeiro`
- `Suporte Primyo`

Nenhum perfil futuro foi implementado nesta fase.

## Legenda

- `Permitido`: a acao faz parte do perfil atual.
- `Negado`: a acao nao deve ser autorizada para o perfil.
- `Condicional`: a acao pode existir apenas dentro de um fluxo operacional limitado, sem acesso amplo ao modulo administrativo.
- `Futuro`: papel sugerido para evolucao posterior, sem efeito no app atual.

## Matriz oficial

| Area / Acao | Administrador | Operador | Perfil futuro sugerido | Observacoes |
| --- | --- | --- | --- | --- |
| Login local por perfil | Permitido | Permitido | Dono/Proprietario, Supervisor, Financeiro, Suporte Primyo | Hoje e login demo/local por perfil, sem autenticacao real. |
| Logout | Permitido | Permitido | Todos os perfis autenticados | Deve permanecer sempre disponivel para sessao ativa. |
| Patio - acessar | Permitido | Permitido | Supervisor | Operador usa patio como shell principal. Administrador tambem pode acessar patio. |
| Patio - criar atendimento | Permitido | Permitido | Supervisor | Operador atua no fluxo operacional; regras financeiras sensiveis continuam restritas. |
| Patio - alterar status do atendimento | Permitido | Permitido | Supervisor | A acao e operacional, mas deve ser auditavel futuramente. |
| Patio - registrar checklist | Permitido | Permitido | Supervisor | Deve manter vinculo com atendimento, veiculo e usuario executor. |
| Clientes - visualizar em atendimento | Permitido | Condicional | Supervisor | Operador pode precisar consultar cliente dentro do atendimento. |
| Clientes - criar cadastro | Permitido | Condicional | Supervisor | Condicional apenas se o fluxo de patio exigir registro operacional; cadastro mestre segue administrativo. |
| Clientes - editar cadastro mestre | Permitido | Negado | Supervisor | Edicao cadastral plena deve ser administrativa. |
| Clientes - excluir | Negado por padrao | Negado | Dono/Proprietario | Exclusao fisica deve ser evitada; preferir inativacao. |
| Veiculos - visualizar em atendimento | Permitido | Condicional | Supervisor | Operador pode precisar consultar veiculo no patio. |
| Veiculos - criar cadastro | Permitido | Condicional | Supervisor | Condicional apenas no fluxo operacional de atendimento. |
| Veiculos - editar cadastro mestre | Permitido | Negado | Supervisor | Edicao plena deve permanecer administrativa. |
| Veiculos - transferir proprietario | Permitido | Negado | Supervisor | Acao sensivel por impacto historico. |
| Servicos - visualizar/selecionar | Permitido | Condicional | Supervisor | Operador pode selecionar servico no atendimento. |
| Servicos - criar/editar catalogo | Permitido | Negado | Dono/Proprietario | Afeta preco, operacao e financeiro. |
| Produtos - visualizar/selecionar | Permitido | Condicional | Supervisor | Operador pode usar produto no atendimento, se o fluxo atual permitir. |
| Produtos - criar/editar catalogo | Permitido | Negado | Dono/Proprietario | Afeta preco, estoque e receita. |
| Produtos - vender no atendimento | Permitido | Condicional | Supervisor | Condicional ao fluxo operacional; nao libera gestao de produto. |
| Insumos - visualizar/usar em servico | Permitido | Condicional | Supervisor | Operador pode registrar consumo operacional quando o fluxo permitir. |
| Insumos - criar/editar cadastro | Permitido | Negado | Dono/Proprietario | Afeta custo e estoque. |
| Estoque - visualizar | Permitido | Negado | Supervisor, Financeiro | Visibilidade futura pode variar por papel. |
| Estoque - ajustar entrada/saida | Permitido | Negado | Dono/Proprietario, Supervisor | Ajuste manual e sensivel e deve exigir auditoria futura. |
| Equipe - visualizar | Permitido | Negado | Supervisor | Operador nao deve acessar gestao de equipe. |
| Equipe - criar/editar membros | Permitido | Negado | Dono/Proprietario | Afeta acesso, comissao e responsabilidade operacional. |
| Usuarios - criar | Permitido | Negado | Dono/Proprietario | Acao sensivel; deve exigir auditoria futura. |
| Usuarios - editar permissao | Permitido | Negado | Dono/Proprietario | Futuramente deve exigir papel dono/admin com auditoria. |
| Usuarios - inativar | Permitido | Negado | Dono/Proprietario | Preferir inativacao a exclusao. |
| Financeiro - acessar modulo | Permitido | Negado | Financeiro, Dono/Proprietario | Operador nao deve acessar financeiro como modulo administrativo. |
| Financeiro - registrar pagamento no atendimento | Permitido | Condicional | Supervisor, Financeiro | Condicional apenas se estiver dentro do fluxo operacional aprovado. |
| Financeiro - alterar lancamento | Permitido | Negado | Financeiro, Dono/Proprietario | Acao sensivel. |
| Financeiro - fluxo de caixa | Permitido | Negado | Financeiro, Dono/Proprietario | Deve ser protegido por regra explicita. |
| Contas a pagar | Permitido | Negado | Financeiro, Dono/Proprietario | Operador nao deve acessar. |
| Recebimentos em aberto | Permitido | Negado | Financeiro, Dono/Proprietario | Operador nao deve acessar lista financeira. |
| Faturas - criar | Permitido | Negado | Financeiro, Dono/Proprietario | Acao financeira sensivel. |
| Faturas - editar | Permitido | Negado | Financeiro, Dono/Proprietario | Deve preservar historico e auditoria futura. |
| Faturas - cancelar | Permitido | Negado | Dono/Proprietario, Financeiro | Cancelamento deve exigir motivo. |
| Relatorios - acessar | Permitido | Negado | Supervisor, Financeiro, Dono/Proprietario | Operador pode ter relatorios proprios no futuro, mas nao e regra atual ampla. |
| Relatorios - exportar | Permitido | Negado | Financeiro, Dono/Proprietario | Exportacao pode expor dados sensiveis. |
| Documentos - emitir recibo/checklist | Permitido | Condicional | Supervisor | Operador pode gerar documento operacional quando vinculado ao atendimento. |
| Documentos - acessar historico | Permitido | Negado | Financeiro, Supervisor | Historico documental completo deve ser administrativo. |
| Configuracoes do negocio | Permitido | Negado | Dono/Proprietario | Inclui dados da empresa, preferencias e comunicacao. |
| Metodos de pagamento | Permitido | Negado | Financeiro, Dono/Proprietario | Afeta cobranca e documentos. |
| Dados fiscais/comerciais | Permitido | Negado | Dono/Proprietario | Inclui dados exibidos em documentos e cobrancas. |
| Templates de mensagem | Permitido | Negado | Supervisor, Dono/Proprietario | Afeta comunicacao externa. |
| Acoes sensiveis genericas | Permitido com regra explicita | Negado | Dono/Proprietario | Acoes nao mapeadas devem ser negadas por padrao. |
| Cancelar atendimento | Permitido | Negado | Supervisor, Dono/Proprietario | Deve exigir motivo e auditoria futura. |
| Estornar pagamento | Permitido | Negado | Financeiro, Dono/Proprietario | Critico; deve exigir trilha de auditoria futura. |
| Excluir dados | Negado por padrao | Negado | Dono/Proprietario | Preferir inativacao; exclusao fisica deve ser excecao controlada. |
| Inativar registro | Permitido | Negado | Supervisor, Dono/Proprietario | Inativacao e alternativa preferida a exclusao. |

## Regras de leitura

- `Operador` nao deve receber shell administrativa completa.
- `Condicional` para operador nao significa acesso ao modulo administrativo.
- Acoes sensiveis sem regra explicita devem ser negadas.
- Perfis futuros sao apenas alvo de arquitetura e nao possuem efeito no app atual.
- Supabase RLS futura devera traduzir esta matriz para regras por organizacao, usuario, papel e acao.

## Conclusao

A matriz formaliza que o estado atual deve permanecer baseado em dois papeis ativos:

- `Administrador`: acesso administrativo amplo, sujeito a regras sensiveis e auditoria futura.
- `Operador`: acesso operacional ao patio, com capacidades limitadas ao atendimento.

Qualquer expansao de papel ou permissao deve ser tratada como fatia controlada futura.
