# LavaPrime Master Data Test Scenarios

## 1. Objetivo

Definir os cenarios futuros de validacao do dominio de dados mestres antes da primeira integracao real com backend.

## 2. Cenarios minimos

| ID | Cenario | Pre-condicao | Passos principais | Resultado esperado | Severidade |
| --- | --- | --- | --- | --- | --- |
| MD-001 | Cadastro de cliente | usuario administrador autenticado no fluxo atual | abrir cadastro, informar dados minimos, vincular placa e salvar | cliente nasce com dados coerentes e placa vinculada | Alta |
| MD-002 | Edicao de cliente | cliente existente | alterar telefone, email ou ciclo de faturamento e salvar | cliente atualiza sem quebrar vinculos com placa e faturamento | Alta |
| MD-003 | Duplicidade de cliente | cliente ja existente por documento, telefone ou placa | tentar cadastrar novo cliente conflitante | sistema deve bloquear ou sinalizar reconciliacao obrigatoria | Critica |
| MD-004 | Cadastro de veiculo | cliente existente ou intake controlado | informar placa, dados do veiculo e owner | veiculo nasce com placa unica e owner atual coerente | Alta |
| MD-005 | Vinculo cliente-veiculo | cliente e veiculo existentes | associar ou transferir o owner | `currentCustomerId`, `client.plates` e historico permanecem coerentes | Critica |
| MD-006 | Cadastro de servico | administrador no modulo de servicos | criar servico com preco, duracao, tipo e categoria | servico nasce com identificacao tecnica e sem duplicidade indevida | Alta |
| MD-007 | Servico com insumo | servico e insumos ativos | configurar perfil tecnico do servico | composicao aponta para insumos validos e mantem quantidades corretas | Alta |
| MD-008 | Produto com estoque | produto ativo | cadastrar produto com SKU, saldo, custo e preco | produto nasce com SKU unico e saldo inicial coerente | Alta |
| MD-009 | Baixa de estoque | produto ou insumo existente | registrar venda ou ajuste permitido | saldo muda com `inventory_movement` correspondente | Critica |
| MD-010 | Cadastro de operador | administrador no modulo de equipe | criar operador com papel, status e dados basicos | equipe nasce sem duplicidade de login local e com papel coerente | Alta |
| MD-011 | Metodo de pagamento | conta bancaria e/ou Pix configurados | criar metodo, definir taxa, prazo e conta vinculada | metodo nasce valido, sem nome duplicado e com vinculo consistente | Alta |
| MD-012 | Configuracao financeira | administrador no modulo financeiro | alterar regras de vencimento, estoque ou documentos | configuracao salva sem invalidar metodos e dados bancarios existentes | Alta |
| MD-013 | Configuracao do negocio | administrador no modulo do negocio | atualizar identidade, contatos e logo | dados do negocio ficam coerentes para documentos e relatorios | Media |
| MD-014 | Busca FIPE local | base local carregada | buscar marca/modelo durante cadastro de veiculo | referencia ajuda o cadastro sem assumir ownership do veiculo | Media |

## 3. Cenarios complementares recomendados

### 3.1 Clientes e veiculos

- cliente faturado aprovado passa a enxergar politica correta de uma ou multiplas faturas;
- transferencia de placa entre clientes preserva historico;
- cadastro de cliente casual via intake nao cria duplicidade silenciosa.

### 3.2 Servicos, produtos e insumos

- renome de servico nao rompe seu perfil tecnico;
- inativacao de produto usado em venda nao apaga historico;
- inativacao de insumo usado em composicao tecnica nao apaga rastreabilidade.

### 3.3 Equipe e configuracoes

- operador inativo nao aparece como opcao operacional futura, mas continua em relatorios historicos;
- exclusao de conta bancaria vinculada a metodo de pagamento deve ser bloqueada;
- inativacao de metodo de pagamento usado em caixa preserva referencias antigas.

## 4. Gate minimo antes da primeira integracao real

Antes de qualquer runtime remoto para master data, a mudanca precisa validar no minimo:

1. cliente;
2. veiculo;
3. servico com insumo;
4. produto e estoque;
5. operador;
6. metodo de pagamento;
7. configuracao financeira;
8. ausencia de erro visivel no console e build tecnico aprovado.

## 5. Decisao desta fase

O dominio mestre do LavaPrime passa a possuir um conjunto minimo de cenarios de validacao capaz de proteger:

- cadastro operacional;
- ownership entre cliente e veiculo;
- catalogos e estoque;
- equipe;
- configuracao do negocio;
- relacao entre metodos de pagamento e financeiro futuro.
