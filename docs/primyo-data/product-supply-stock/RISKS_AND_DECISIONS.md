# Risks And Decisions

## 1. Decisoes oficiais

As decisoes abaixo passam a valer apos `LP-DATA-006`:

1. `Product` e `Supply` continuam separados.
2. `StockMovement` ainda nao sera implementado.
3. adapters continuam fora do runtime.
4. Supabase ainda nao sera aberto.
5. nenhuma baixa automatica sera criada.
6. estoque real nao sera alterado.
7. `stockBalance` continua tratado como projecao observada.
8. consumo por servico continua sem automacao.

## 2. Riscos principais

### Risco: confundir produto e insumo

- Classificacao: `Alto`
- Efeito: mistura venda comercial com consumo tecnico e dificulta catalogo, relatorios e integracao futura.

### Risco: usar stockBalance como verdade oficial

- Classificacao: `Alto`
- Efeito: mascara divergencias, impede auditoria e cristaliza saldo sem trilha.

### Risco: baixar estoque sem trilha

- Classificacao: `Critico`
- Efeito: torna impossivel reconciliar venda, consumo, perda e ajuste.

### Risco: alterar preco ou custo historico

- Classificacao: `Alto`
- Efeito: quebra snapshots financeiros e comparacoes futuras de margem ou custo operacional.

### Risco: resolver vinculos de servico cedo demais

- Classificacao: `Medio/Alto`
- Efeito: cristaliza relacionamento por nome, chave derivada ou heuristica fraca antes da politica de IDs.

### Risco: integrar Supabase antes da fronteira estar estavel

- Classificacao: `Critico`
- Efeito: aumenta custo de rollback e multiplica acoplamentos errados em Web, Android e backend.

## 3. Riscos remanescentes apos esta fase

- ownership cross-domain entre `service`, `supply`, `product` e futuro `attendance` ainda nao esta implementado;
- `stockBalance` continua util operacionalmente, mas ainda carrega risco de ser interpretado como verdade oficial por consumidores futuros;
- o dominio ainda nao possui entidade real de movimento nem snapshot de consumo;
- a diferenca entre item vendavel e item tecnico agora esta documentada, mas ainda nao esta protegida por runtime.

## 4. Recomendacao operacional

Antes de qualquer integracao funcional, a proxima etapa deve atacar identidade e ownership cross-domain, e nao runtime, Supabase ou baixa de estoque.

## 5. Rollback documental

1. remover a pasta `docs/primyo-data/product-supply-stock/`;
2. reverter `docs/primyo-changes/LP-DATA-006.md`;
3. reverter as atualizacoes objetivas em backlog, change control, next slice e contratos anotados;
4. reexecutar `npm.cmd run primyo:gate`;
5. confirmar retorno ao baseline documental anterior.
