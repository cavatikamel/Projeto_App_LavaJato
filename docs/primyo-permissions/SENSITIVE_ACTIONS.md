# LavaPrime Sensitive Actions

## Objetivo

Classificar acoes sensiveis do LavaPrime por risco e definir a regra esperada para Administrador, Operador e perfis futuros.

Nenhuma regra foi implementada nesta fase.

## Classificacao de risco

- `Critico`: pode causar perda financeira, perda de dados, acesso indevido ou efeito irreversivel.
- `Alto`: pode alterar operacao, historico, configuracao ou informacao relevante.
- `Medio`: pode afetar fluxo operacional, comunicacao ou consistencia.
- `Baixo`: impacto limitado e reversivel.

## Acoes sensiveis

| Acao sensivel | Risco | Administrador | Operador | Perfil futuro sugerido | Observacoes |
| --- | --- | --- | --- | --- | --- |
| Excluir cliente | Critico | Negado por padrao | Negado | Dono/Proprietario | Preferir inativacao com historico. |
| Excluir veiculo | Critico | Negado por padrao | Negado | Dono/Proprietario | Pode quebrar historico de atendimentos. |
| Excluir atendimento | Critico | Negado por padrao | Negado | Dono/Proprietario | Deve ser substituido por cancelamento auditado. |
| Cancelar atendimento | Alto | Permitido | Negado | Supervisor, Dono/Proprietario | Deve exigir motivo e registro de responsavel. |
| Estornar pagamento | Critico | Permitido | Negado | Financeiro, Dono/Proprietario | Exige auditoria futura e vinculo com pagamento original. |
| Alterar financeiro | Critico | Permitido | Negado | Financeiro, Dono/Proprietario | Inclui caixa, recebiveis, contas a pagar e faturas. |
| Alterar configuracoes do negocio | Alto | Permitido | Negado | Dono/Proprietario | Afeta documentos, cobrancas e comunicacao. |
| Criar usuarios | Alto | Permitido | Negado | Dono/Proprietario | Pode criar novo vetor de acesso. |
| Editar permissoes de usuario | Critico | Permitido | Negado | Dono/Proprietario | Deve ser auditado futuramente. |
| Inativar usuario | Alto | Permitido | Negado | Dono/Proprietario | Preferivel a exclusao. |
| Editar metodos de pagamento | Alto | Permitido | Negado | Financeiro, Dono/Proprietario | Afeta recebimento e documento. |
| Emitir documentos | Medio | Permitido | Condicional | Supervisor, Financeiro | Operador somente em documento operacional vinculado ao atendimento. |
| Acessar historico documental | Alto | Permitido | Negado | Supervisor, Financeiro | Pode expor dados de cliente e financeiro. |
| Alterar preco de servico | Alto | Permitido | Negado | Dono/Proprietario | Afeta receita e orcamento. |
| Alterar preco de produto | Alto | Permitido | Negado | Dono/Proprietario | Afeta venda e estoque. |
| Alterar estoque manualmente | Alto | Permitido | Negado | Supervisor, Dono/Proprietario | Ajustes devem ter motivo. |
| Alterar dados fiscais/comerciais | Critico | Permitido | Negado | Dono/Proprietario | Afeta documentos e cobrancas. |
| Exportar relatorios financeiros | Alto | Permitido | Negado | Financeiro, Dono/Proprietario | Pode expor dados sensiveis. |
| Aprovar cliente faturado | Alto | Permitido | Negado | Financeiro, Dono/Proprietario | Afeta risco de credito. |
| Alterar templates de mensagem | Medio | Permitido | Negado | Supervisor, Dono/Proprietario | Afeta comunicacao externa. |
| Transferir veiculo entre clientes | Alto | Permitido | Negado | Supervisor, Dono/Proprietario | Afeta historico e ownership. |
| Inativar cliente | Alto | Permitido | Negado | Supervisor, Dono/Proprietario | Deve manter historico. |
| Inativar produto/servico/insumo | Medio | Permitido | Negado | Supervisor, Dono/Proprietario | Preferivel a exclusao. |

## Politica para acoes sensiveis nao mapeadas

Qualquer acao sensivel nao listada deve ser tratada como:

- `Negado` para Operador;
- `Bloqueado ate classificacao` para Administrador;
- `Pendente de matriz` para perfis futuros.

## Auditoria futura esperada

Acoes sensiveis devem registrar futuramente:

- usuario;
- perfil;
- organizacao;
- entidade afetada;
- valor anterior;
- valor novo;
- motivo;
- data/hora;
- origem da acao;
- correlacao com atendimento, fatura, pagamento ou documento quando aplicavel.

## Conclusao

As acoes de maior risco estao concentradas em exclusao, financeiro, usuarios, permissao, configuracao, dados fiscais/comerciais e estoque.

Nenhuma dessas acoes deve ser ampliada para Operador sem nova fatia aprovada.
