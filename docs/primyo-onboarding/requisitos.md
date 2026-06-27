# Requisitos Descobertos

## Regra de leitura

Os requisitos abaixo foram inferidos somente a partir de comportamento, telas, docs e estruturas observadas no repositorio.

## Requisitos funcionais observados

### Acesso e perfis

- o sistema deve permitir entrada por perfil Administrador ou Operador
- o Operador deve acessar o patio operacional
- o Administrador deve acessar o conjunto completo de modulos administrativos

### Patio e atendimento

- deve permitir novo atendimento e nova entrada de veiculo
- deve permitir agendamento de veiculo
- deve permitir evolucao de status do atendimento
- deve permitir registrar servicos, produtos vendidos, pagamento e observacoes
- deve permitir check-list veicular por area e condicao

### Cadastros

- deve manter cadastro de clientes
- deve manter cadastro e historico de veiculos
- deve manter cadastro de servicos
- deve manter cadastro de operadores/usuarios
- deve manter cadastro de produtos de venda
- deve manter cadastro de insumos internos

### Financeiro

- deve manter fluxo de caixa
- deve controlar recebimentos em aberto
- deve controlar contas a pagar
- deve manter faturas e cobrancas
- deve permitir pagamento parcial e roteamento de saldo remanescente
- deve manter configuracoes financeiras por meio de pagamento

### Empresa e relacionamento

- deve manter dados da empresa
- deve manter contas bancarias, PIX e preferencia documental
- deve manter canais sociais e configuracoes de comunicacao
- deve manter templates de mensagem
- deve permitir mensagens operacionais e de cobranca por WhatsApp

### Relatorios e documentos

- deve gerar recibos de atendimento
- deve gerar check-list veicular em PDF
- deve gerar relatorio de fluxo de caixa
- deve gerar relatorio de pagamentos em aberto
- deve gerar comprovante de venda
- deve gerar relatorios de producao e comissao de operador

### Mobile

- a base Android deve refletir a regra funcional da web
- a base Android deve permitir operacao offline-first
- a base Android deve manter sincronizacao preparada para backend futuro

## Requisitos nao funcionais observados

- o build web deve ser reproduzivel por `npm run build`
- o build final deve incluir `app/assets/` em `dist/assets/`
- a publicacao web deve funcionar como SPA com fallback para `index.html`
- o projeto deve manter checks automatizados de build e sintaxe no GitHub Actions
- o app Android deve rodar com minSdk 26 e targetSdk 35
- a integracao futura com Supabase deve respeitar modelo multi-tenant por empresa

## Requisitos que ainda nao puderam ser confirmados

- SLA operacional
- volume real de usuarios e clientes
- ambientes oficiais de producao homologacao e suporte
- politicas reais de backup, restore e retenção
- requisitos regulatórios formais
