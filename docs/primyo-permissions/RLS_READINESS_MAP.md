# LavaPrime RLS Readiness Map

## Objetivo

Preparar a traducao futura da matriz de permissoes para Supabase Row Level Security.

Este documento nao cria SQL, migrations, policies ou schema.

## Premissas futuras

A RLS futura deve considerar:

- usuario autenticado;
- organizacao ativa;
- membership do usuario na organizacao;
- papel do usuario;
- acao executada;
- entidade afetada;
- auditoria para acoes sensiveis.

## Perfis de referencia

Perfis atuais:

- `admin`
- `operator`

Perfis futuros planejados:

- `owner`
- `supervisor`
- `finance`
- `primyo_support`

## Mapa de prontidao RLS

| Tabela futura | Acao | Perfil | Regra esperada |
| --- | --- | --- | --- |
| `organizations` | `select` | owner, admin | Pode ler a propria organizacao. |
| `organizations` | `update` | owner, admin | Pode alterar dados comerciais/fiscais conforme politica. |
| `organizations` | `update` | operator | Negado. |
| `organization_memberships` | `select` | owner, admin | Pode listar membros da propria organizacao. |
| `organization_memberships` | `insert` | owner, admin | Pode convidar/criar membro conforme politica futura. |
| `organization_memberships` | `update_role` | owner | Deve ser restrito ao dono/proprietario futuro. |
| `organization_memberships` | `update` | operator | Negado. |
| `business_settings` | `select` | owner, admin, finance | Pode ler configuracoes necessarias. |
| `business_settings` | `update` | owner, admin | Pode alterar configuracoes do negocio. |
| `business_settings` | `update` | operator | Negado. |
| `customers` | `select` | owner, admin, supervisor, finance | Pode ler clientes da propria organizacao. |
| `customers` | `select` | operator | Permitido apenas quando necessario ao atendimento operacional. |
| `customers` | `insert` | owner, admin, supervisor | Pode criar cliente. |
| `customers` | `insert` | operator | Condicional ao fluxo de patio, se aprovado futuramente. |
| `customers` | `update` | owner, admin, supervisor | Pode editar cadastro. |
| `customers` | `delete` | todos | Negado por padrao; usar inativacao. |
| `vehicles` | `select` | owner, admin, supervisor, finance | Pode ler veiculos da propria organizacao. |
| `vehicles` | `select` | operator | Permitido apenas quando necessario ao atendimento operacional. |
| `vehicles` | `insert` | owner, admin, supervisor | Pode criar veiculo. |
| `vehicles` | `insert` | operator | Condicional ao fluxo de patio, se aprovado futuramente. |
| `vehicles` | `update` | owner, admin, supervisor | Pode editar cadastro e ownership. |
| `services` | `select` | owner, admin, supervisor, operator | Pode consultar catalogo ativo para atendimento. |
| `services` | `insert/update` | owner, admin | Pode gerenciar catalogo. |
| `services` | `delete` | todos | Negado por padrao; usar inativacao. |
| `products` | `select` | owner, admin, supervisor, operator | Pode consultar produtos ativos para atendimento/venda. |
| `products` | `insert/update` | owner, admin | Pode gerenciar catalogo e precos. |
| `products` | `delete` | todos | Negado por padrao; usar inativacao. |
| `supplies` | `select` | owner, admin, supervisor, operator | Pode consultar quando vinculado ao servico. |
| `supplies` | `insert/update` | owner, admin | Pode gerenciar insumos. |
| `inventory_movements` | `select` | owner, admin, supervisor, finance | Pode consultar movimentacoes. |
| `inventory_movements` | `insert` | owner, admin, supervisor | Pode registrar ajuste com motivo. |
| `inventory_movements` | `insert` | operator | Condicional apenas por consumo operacional aprovado. |
| `team_members` | `select` | owner, admin, supervisor | Pode consultar equipe. |
| `team_members` | `insert/update` | owner, admin | Pode gerenciar equipe. |
| `team_members` | `select/update` | operator | Negado para gestao de equipe. |
| `attendances` | `select` | owner, admin, supervisor, operator | Pode ler atendimentos permitidos da organizacao. |
| `attendances` | `insert/update_status` | owner, admin, supervisor, operator | Operador pode atuar no fluxo operacional. |
| `attendances` | `cancel` | owner, admin, supervisor | Deve exigir motivo e auditoria. |
| `attendances` | `delete` | todos | Negado por padrao. |
| `invoices` | `select` | owner, admin, finance | Pode ler faturas. |
| `invoices` | `insert/update/cancel` | owner, admin, finance | Deve exigir regra financeira e auditoria. |
| `invoices` | `select/update` | operator | Negado. |
| `invoice_items` | `select` | owner, admin, finance | Pode ler itens de fatura. |
| `invoice_items` | `insert/update` | owner, admin, finance | Deve manter vinculo com fatura. |
| `payments` | `select` | owner, admin, finance | Pode ler pagamentos. |
| `payments` | `insert` | owner, admin, finance | Pode registrar pagamento financeiro. |
| `payments` | `insert` | operator | Condicional apenas dentro de atendimento, se aprovado futuramente. |
| `payments` | `refund` | owner, finance | Deve exigir auditoria e motivo. |
| `cash_entries` | `select` | owner, admin, finance | Pode ler fluxo de caixa. |
| `cash_entries` | `insert/update` | owner, admin, finance | Pode alterar caixa com auditoria. |
| `cash_entries` | `insert/update` | operator | Negado. |
| `receivables` | `select` | owner, admin, finance | Pode ler recebiveis. |
| `receivables` | `update` | owner, admin, finance | Pode baixar/ajustar conforme politica. |
| `payables` | `select/insert/update` | owner, admin, finance | Pode gerir contas a pagar. |
| `payment_methods` | `select` | owner, admin, finance, operator | Operador pode ler metodos ativos se necessario ao atendimento. |
| `payment_methods` | `insert/update` | owner, admin, finance | Pode gerir metodos de pagamento. |
| `documents` | `select` | owner, admin, finance, supervisor | Pode ler historico documental. |
| `documents` | `insert` | owner, admin, supervisor, operator | Operador somente documento operacional vinculado ao atendimento. |
| `reports` | `select/export` | owner, admin, finance, supervisor | Pode consultar/exportar conforme papel. |
| `reports` | `select/export` | operator | Negado por padrao. |
| `audit_events` | `insert` | sistema | Deve registrar eventos sensiveis. |
| `audit_events` | `select` | owner, admin | Pode consultar auditoria conforme politica futura. |
| `support_sessions` | `select/insert/update` | primyo_support | Apenas com autorizacao, escopo e auditoria futura. |

## Regras globais futuras

- Todas as tabelas de negocio devem filtrar por `organization_id`.
- O usuario deve possuir membership ativa na organizacao.
- Acoes sensiveis devem gerar evento de auditoria.
- Exclusao fisica deve ser negada por padrao.
- Inativacao deve ser preferida a delete.
- Suporte Primyo nao deve ter acesso permanente e irrestrito.

## Lacunas antes de escrever SQL

Antes de criar RLS real, ainda sera necessario:

- definir schema final por entidade;
- definir modelo de membership;
- definir claims ou consultas auxiliares para role;
- definir papel `owner`;
- definir estrategia de auditoria;
- definir dados de teste;
- validar impacto no Android;
- validar rollback de policies.

## Conclusao

O LavaPrime esta preparado documentalmente para traduzir permissao em RLS futura, mas nenhuma policy SQL deve ser criada antes de uma fatia dedicada.
