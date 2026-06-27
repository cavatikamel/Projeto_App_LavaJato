# Legacy ID Risks

## 1. Objetivo

Documentar os principais riscos de identidade legada antes de qualquer implementacao real de resolvedor.

## 2. Riscos principais

### 2.1 IDs legados instaveis

- registros podem depender de shape local, indice, seed ou estrutura nao governada;
- um mesmo dominio pode conviver com mais de uma origem paralela;
- risco: consolidar referencia fragil como se fosse ID canonico.

### 2.2 `sourceId` ausente

- alguns seeds ou estruturas observadas nao expõem ID tecnico estavel;
- risco: forcar geracao arbitraria e esconder a lacuna.

### 2.3 Placa usada como identidade

- placa e chave operacional forte, mas mutavel no contexto de ownership e historico;
- risco: transformar placa em identidade oficial de `Vehicle` ou ponte de `Customer`.

### 2.4 Nome usado como identidade

- nomes de cliente, servico, produto e insumo continuam sujeitos a colisao e renome;
- risco: quebrar relacoes quando o nome mudar.

### 2.5 Duplicidade de clientes

- `clientRegistry` e `billingClients` convivem como trilhas distintas;
- risco: resolver automaticamente entidades diferentes como se fossem a mesma ou manter duas identidades canonicas.

### 2.6 Produto e insumo parecidos

- itens parecidos por nome, categoria, fornecedor ou SKU podem existir em dominios distintos;
- risco: misturar `Product` e `Supply` por semelhança superficial.

### 2.7 `serviceSupplyProfiles` sem IDs canônicos

- o legado historico depende de chaves derivadas e composicao indireta;
- risco: promover perfil antigo a join oficial entre `Service` e `Supply`.

### 2.8 Relacoes financeiras sem referencia clara

- `Payment` e `Financial` podem nascer de atendimento, invoice, recebivel ou caixa;
- risco: resolver `customerId` ou `attendanceId` sem uma origem primaria suficientemente clara.

### 2.9 Migracao prematura para Supabase

- sem politica de resolucao madura, a migracao tende a copiar ambiguidade para o backend;
- risco: aumentar o custo de rollback e troubleshooting.

## 3. Riscos operacionais remanescentes

- automatizar reconciliacao em caso ambiguo;
- esconder heuristica em helper comum sem trilha documental;
- permitir que runtime dependa de relacao ainda nao aprovada;
- misturar ownership de negocio com rastreabilidade de legado.

## 4. Decisao oficial desta fase

Todos os riscos acima passam a ser considerados bloqueios formais para qualquer implementacao do resolvedor que tente usar nome, placa, texto livre ou relacao implicita como identidade oficial.
