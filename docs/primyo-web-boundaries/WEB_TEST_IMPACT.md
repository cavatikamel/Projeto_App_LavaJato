# LavaPrime Web Test Impact

## 1. Objetivo

Mapear quais validacoes serao obrigatorias para cada tipo de extracao futura do `app/main.js`.

## 2. Gate tecnico sempre obrigatorio

Toda extracao futura deve executar:

- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- `node --check app/main.js`;
- `node --check scripts/sync-fipe-local-db.mjs`.

## 3. Matriz de impacto por fronteira

| Tipo de extracao | Smoke tests obrigatorios | Validacoes complementares |
| --- | --- | --- |
| `sessionBoundary` | login Administrador, login Operador, logout, estado logado/deslogado | verificar `selectedProfile` e `activeSessionUser` por comportamento visivel |
| `accessBoundary` ou policy helpers | admin acessa area administrativa, operador acessa patio, admin acessa patio, logout | financeiro, configuracoes, cadastros e documentos como admin |
| navegacao e `renderAdminScreen` | navegacao principal, dashboard, patio, clientes, veiculos, servicos, produtos, financeiro | troca entre abas sem erro no console |
| helpers DOM/UI | login, toast, dialogo de confirmacao, abrir/fechar modal | icones renderizados e botoes respondendo |
| formatadores e texto | telas com moeda, data, placa, telefone e documentos | recibo ou relatorio gerado com valores legiveis |
| constantes e opcoes | telas que usam selects e labels: servicos, veiculos, pagamento, status | verificar opcoes padrao e labels |
| persistencia local | configuracoes do negocio, metodos de pagamento, produtos, insumos, caixa | recarregar pagina e confirmar dados locais quando aplicavel |
| business settings | dados do negocio, contas bancarias, Pix, metodos, regras financeiras | gerar documento que usa dados do negocio |
| master data | cliente, veiculo, servico, operador | duplicidade de placa, vinculo cliente-veiculo, edicao de cadastro |
| inventario | produto, insumo, ajuste de estoque, venda de produto | baixa de estoque, movimento registrado, sem saldo indevido |
| documentos/PDF | recibo, checklist, relatorio de caixa, comprovante de venda | historico documental e download gerado |
| financeiro | caixa, pagamento em aberto, fatura, baixa total/parcial | saldo aberto, pagamento parcial, invoice e cash entry coerentes |
| patio/atendimento | novo atendimento, status, checklist, pagamento, recibo | produto no atendimento, consumo de insumos, cancelamento |
| orcamentos/agendamento | criar orcamento, agendar, confirmar entrada | converter para patio sem perder cliente/veiculo |

## 4. Smoke minimo por risco

### Baixo

- gate tecnico;
- navegacao da tela afetada.

### Medio

- gate tecnico;
- login admin;
- login operador quando envolver acesso;
- navegacao principal;
- console sem erro visivel.

### Alto

- gate tecnico;
- smoke minimo completo;
- fluxo manual do dominio afetado;
- rollback documentado.

### Critico

- gate tecnico;
- smoke minimo completo;
- fluxo antes/depois;
- evidencia manual;
- criterio de rollback obrigatorio;
- aprovacao tecnica explicita antes da implementacao.

## 5. Smoke minimo completo

Smoke minimo completo:

- login Administrador;
- acesso administrativo;
- navegacao principal;
- acesso ao patio pelo admin;
- logout;
- login Operador;
- acesso ao patio;
- console sem `warn` ou `error` visivel.

## 6. Testes que devem ser reforcados antes de dominios criticos

Antes de extrair financeiro, patio ou persistencia local, criar ou formalizar validacoes para:

- pagamento confirmado;
- pagamento em aberto;
- pagamento parcial;
- fatura;
- caixa;
- recibo;
- cliente e veiculo;
- produto no atendimento;
- baixa de estoque.

## 7. Decisao desta fase

`LP-TEST-003` deve ser a proxima fatia recomendada para planejar cobertura automatizada incremental antes de qualquer extracao fisica relevante do monolito.

## 8. Aplicacao em LP-WEB-004

`LP-WEB-004` aplica a linha de impacto para:

- `sessionBoundary`;
- `accessBoundary`;
- policy helpers locais da fronteira.

Smoke minimo completo exigido:

- login Administrador;
- acesso administrativo;
- navegacao principal;
- acesso ao patio pelo admin;
- logout;
- login Operador;
- acesso ao patio;
- validacoes basicas de permissao;
- console sem `warn` ou `error` visivel.

Checks tecnicos adicionais:

- `node --check app/boundaries/sessionAccessBoundary.js`.
