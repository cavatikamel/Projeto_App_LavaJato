# Telas, Fluxos e Funcionalidades

## Superficie web

### Telas principais observadas

- login
- patio do operador
- dashboard do administrador
- patio de atendimento
- orcamentos e pre-vendas
- venda de produtos
- recibos e documentos
- clientes
- veiculos
- servicos
- equipe e usuarios
- produtos para venda
- insumos de uso interno
- inventario de estoque
- fluxo de caixa
- recebimentos em aberto
- contas a pagar
- faturas e cobrancas
- dados da empresa
- configuracoes financeiras
- comunicacao com clientes
- mensagens e avisos

### Fluxo de autenticacao

1. usuario informa usuario e senha
2. usuario escolhe perfil Administrador ou Operador
3. se Administrador, a shell administrativa e exibida
4. se Operador, o patio operacional e exibido

### Fluxo de patio

1. abrir novo atendimento ou novo veiculo
2. escolher entre entrada imediata ou agendamento
3. vincular/registrar cliente e veiculo
4. selecionar servicos
5. registrar pagamento ou faturamento
6. acompanhar o veiculo por status
7. registrar checklist, produtos adicionais e recibo

### Fluxo de cadastro de clientes e veiculos

- cadastro/edicao de clientes
- cadastro/edicao de veiculos
- historico de proprietario do veiculo
- transferencia de veiculo entre clientes
- aprovacao de cliente faturado

### Fluxo de servicos e estoque

- cadastro de servicos
- cadastro de produtos de venda
- cadastro de insumos
- perfis de insumos por servico
- movimentacao e monitoramento de estoque
- venda de produtos no atendimento

### Fluxo financeiro

- caixa e lancamentos
- pagamentos em aberto
- contas a pagar
- faturas e cobrancas
- baixa total e parcial
- roteamento de saldo remanescente para nova fatura, fatura existente ou pagamento em aberto

### Fluxo documental

- recibo de atendimento
- comprovante de venda
- relatorio de pagamentos em aberto
- relatorio de fluxo de caixa
- relatorio de producao do operador
- relatorio de comissao do operador
- check-list veicular em PDF

### Fluxo de comunicacao

- templates de mensagem por categoria
- lembretes de manutencao via WhatsApp
- aviso de fatura em aberto
- confirmacao de agendamento
- confirmacao de pagamento
- mensagens de relacionamento

## Superficie Android

### Rotas observadas

- Dashboard
- Patio
- Agendamentos
- Clientes e veiculos
- Servicos
- Produtos e insumos
- Financeiro
- Relatorios
- Meu negocio
- Seguranca e sincronizacao

### Fluxos mobile observados

- splash -> tela inicial -> login -> shell principal
- login demo local por perfil
- dashboard resumido
- patio com filtro e evolucao de status
- cadastro vertical de clientes e veiculos
- sync manual e indicador online/offline
- novo atendimento via FAB no patio

## Cadastros observados

- clientes
- veiculos
- servicos
- operadores
- produtos
- insumos
- contas bancarias
- chaves PIX
- metodos de pagamento
- canais sociais
- templates de mensagem

## Relatorios observados

- check-list veicular
- recibos
- comprovantes
- fluxo de caixa
- pagamentos em aberto
- producao de operador
- comissao de operador
- historico documental

## Configuracoes observadas

- dados da empresa
- nome em relatorios
- contas bancarias exibidas em faturas
- PIX e URL de pagamento
- regras de recebimento
- configuracoes de inventario
- canais sociais e visibilidade em relatorios
- templates de mensagem
