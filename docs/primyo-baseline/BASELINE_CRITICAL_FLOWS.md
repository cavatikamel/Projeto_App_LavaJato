# LavaPrime Baseline Critical Flows

## Objetivo

Registrar a baseline funcional oficial do LavaPrime antes da primeira implementacao controlada.

Os fluxos abaixo foram mapeados com base no comportamento observado e na documentacao de onboarding. Esta baseline descreve o que deve continuar verdadeiro apos `LP-WEB-001`, salvo aprovacao formal em sentido contrario.

## Fluxos criticos

| Fluxo | Objetivo | Entrada | Saida | Resultado esperado |
| --- | --- | --- | --- | --- |
| Login | Permitir acesso inicial ao sistema | Usuario informa login, senha e escolhe perfil | Usuario entra na shell administrativa ou no patio | Credenciais validas com perfil `Administrador` abrem o ambiente administrativo; com perfil `Operador` abrem o patio operacional |
| Troca de perfil | Definir qual superficie o usuario acessa | Escolha de perfil na tela de login ou retorno ao login | Novo contexto de sessao | A escolha de perfil controla a experiencia exibida e o logout retorna o sistema ao estado inicial |
| Dashboard | Exibir visao gerencial resumida | Login como `Administrador` ou navegacao para `dashboard` | Cartoes, metricas e acessos rapidos administrativos | O administrador visualiza indicadores de operacao, vendas, financeiro e atalhos dos modulos principais |
| Patio | Operar atendimentos e status de veiculos | Login como `Operador` ou acesso ao modulo `patio` | Atendimento criado, atualizado ou finalizado | O patio permite abrir atendimento, acompanhar status, registrar servicos, produtos, pagamento e checklist |
| Clientes | Gerenciar base de clientes | Navegacao administrativa para `clients` | Cliente criado, editado, consultado ou usado em outros fluxos | O modulo permite consulta e cadastro; edicao administrativa deve continuar restrita ao perfil adequado |
| Veiculos | Gerenciar base de veiculos e vinculos | Navegacao administrativa para `vehicles` ou entrada pelo patio | Veiculo localizado, cadastrado, transferido ou associado a cliente | O modulo deve manter busca, cadastro, historico e uso do veiculo nos atendimentos |
| Servicos | Definir servicos operacionais e perfis de consumo | Navegacao administrativa para `services` | Servico consultado, cadastrado ou preparado para uso no patio | O modulo deve manter catalogo de servicos, parametros e relacoes com insumos |
| Produtos | Gerenciar produtos de venda e estoque | Navegacao administrativa para `products`, `supplies` ou `productSales` | Produto consultado, vendido, ajustado ou movimentado | O sistema deve manter catalogo, estoque, insumos e venda de produtos sem quebrar o vinculo com o financeiro |
| Financeiro | Controlar recebimentos, pagamentos e caixa | Navegacao para modulos financeiros ou conclusao de atendimento | Lancamentos, recebimentos em aberto, faturamento ou comprovantes | O financeiro deve continuar registrando caixa, contas em aberto, contas a pagar, faturas e pagamentos parciais ou totais |
| Relatorios | Gerar documentos e historico operacional | Acao de emissao dentro dos modulos operacionais ou financeiros | PDF, recibo, comprovante ou relatorio | O sistema deve continuar emitindo recibos, relatorios de caixa, pagamentos em aberto, producao e comissao sem quebrar o layout base |
| Configuracoes | Ajustar dados do negocio e mensagens | Navegacao administrativa para `business*` ou modulos de configuracao | Configuracao salva em persistencia local | O modulo deve continuar salvando perfil da empresa, bancos, PIX, metodos de pagamento, regras financeiras, sociais e templates de mensagem |

## Dependencias funcionais da baseline

Dependencias diretamente ligadas aos fluxos acima:

- sessao e perfil em `app/main.js`
- shell React em `app/src/App.jsx`
- markup legado em `app/legacy-body.html`
- dados locais em `localStorage`
- base FIPE local para busca de veiculos
- assets de template para documentos e PDFs

## Regressao funcional a evitar na primeira implementacao

A primeira implementacao controlada nao pode alterar:

- o resultado do login por perfil;
- a capacidade de abrir o patio apos login;
- o acesso do administrador ao dashboard e modulos administrativos;
- a navegacao principal entre telas;
- o comportamento atual de consulta/cadastro basico;
- a emissao de documentos do fluxo ja existente.
