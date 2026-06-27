# LavaPrime Master Data Relationship Rules

## 1. Objetivo

Definir as relacoes principais do dominio de dados mestres do LavaPrime e as regras que devem governa-las no estado futuro.

## 2. Matriz de relacoes principais

| Relacao | Cardinalidade alvo | Estado legado observado | Regra futura obrigatoria |
| --- | --- | --- | --- |
| `organizations` -> `business_settings` | 1:1 logico | dados repartidos em varias chaves locais | ownership unico por organizacao |
| `organizations` -> `business_bank_accounts` | 1:N | contas locais ligadas a documentos e metodos | conta deve pertencer a uma organizacao e ser referenciavel por ID |
| `organizations` -> `business_pix_keys` | 1:N | Pix unico local com metadados acoplados | chaves devem ser entidades rastreaveis |
| `organizations` -> `payment_methods` | 1:N | metodos locais com taxas e prazo | metodo e cadastro mestre da organizacao |
| `organizations` -> `customers` | 1:N | clientes locais em memoria | todo cliente pertence a um tenant |
| `customers` -> `vehicles` | 1:N atual, com historico N:N no tempo | ownership espelhado entre cliente e veiculo | owner atual por `currentCustomerId` e historico por entidade dedicada |
| `services` -> `service_supply_profiles` | 1:1 ou 1:N conforme versao do perfil | chave derivada por nome/tipo/categoria | sempre por `serviceId` |
| `service_supply_profiles` -> `supplies` | N:N | composicao local com `supplyId` e quantidade | itens do perfil devem apontar para insumos canonicos |
| `products` -> `inventory_movements` | 1:N | produto baixa estoque em vendas e atendimentos | movimento preserva trilha historica |
| `supplies` -> `inventory_movements` | 1:N | insumo baixa em servico e ajuste manual | movimento preserva trilha historica |
| `team_members` -> `attendances` | 1:N | operador local e vinculado por nome ou id local | atendimento futuro deve apontar para `teamMemberId` estavel |
| `business_settings` -> financeiro | 1:N por efeito de regra | configuracoes locais afetam prazos, documentos e estoque | configuracao define defaults; evento financeiro grava snapshot |
| `payment_methods` -> pagamentos | 1:N | metodo local alimenta caixa, fatura e open payment | pagamento deve apontar para metodo canonico e congelar taxa/prazo |
| `vehicles` -> referencia FIPE | N:1 logico | busca local por arquivo e cache | FIPE permanece somente como referencia tecnica |

## 3. Regras por relacionamento

### 3.1 Cliente e veiculo

Regras obrigatorias:

1. cada veiculo possui no maximo um owner atual por organizacao;
2. a placa e a chave operacional mais estavel do dominio, mas nao substitui o `vehicleId`;
3. transferencia de owner deve gerar novo registro em `vehicle_owner_history`;
4. `client.plates` passa a ser apenas derivacao util ou cache, nao ownership primario.

Consequencia:

- em caso de divergencia entre `client.plates` e `vehicle.currentCustomerId`, a reconciliacao deve partir do registro de ownership aprovado.

### 3.2 Servico e consumo de insumos

Regras obrigatorias:

1. servico precisa de `serviceId` canonico;
2. composicao tecnica nao pode depender de nome livre;
3. cada item do perfil deve registrar `supplyId`, quantidade padrao e contexto;
4. renome de servico nao pode quebrar o vinculo com insumos.

Consequencia:

- `serviceSupplyProfiles` deve deixar de ser um dicionario indexado por chave derivada.

### 3.3 Produto e estoque

Regras obrigatorias:

1. saldo de produto e dado derivado do estado atual, nao substitui historico;
2. cada baixa ou reposicao precisa de `inventory_movement`;
3. venda avulsa e venda dentro de atendimento devem convergir para a mesma regra de trilha de estoque;
4. SKU deve ser unico por organizacao.

### 3.4 Insumo e estoque

Regras obrigatorias:

1. insumo segue o mesmo principio de trilha auditavel de estoque;
2. ajuste manual de insumo precisa respeitar configuracao da organizacao;
3. consumo de servico deve apontar para o insumo canonico;
4. risco tecnico e compatibilidade nao podem ser perdidos na migracao.

### 3.5 Equipe e atendimento

Regras obrigatorias:

1. equipe e um cadastro mestre, nao um estado de sessao;
2. atendimento, producao e comissao devem referenciar `teamMemberId`;
3. regra de acesso futura precisa ser ligada a identidade, nao apenas ao texto `accessProfile`;
4. inativacao do membro nao pode apagar relatorios historicos.

### 3.6 Configuracoes e financeiro

Regras obrigatorias:

1. `business_settings` define regras de vencimento, inventario e documentos;
2. evento financeiro deve gravar snapshot da configuracao relevante quando houver impacto historico;
3. alteracao de regra futura nao pode recalcular silenciosamente documentos e eventos passados;
4. contas bancarias, Pix e metodos de pagamento pertencem ao dominio mestre e sustentam o dominio financeiro.

### 3.7 Metodos de pagamento e pagamentos

Regras obrigatorias:

1. `payment_methods` e o cadastro mestre;
2. pagamento futuro deve apontar para `paymentMethodId`;
3. taxa, prazo, conta vinculada e comportamento de liquidacao devem ser congelados em snapshot no evento financeiro;
4. renome de metodo nao deve depender de reescrever registros historicos no futuro.

### 3.8 Veiculo e referencia FIPE

Regras obrigatorias:

1. FIPE auxilia marca/modelo, nao ownership;
2. veiculo pode guardar ponteiros de referencia, mas continua entidade de negocio independente;
3. troca de versao da base FIPE nao deve reescrever cadastro de veiculo automaticamente.

## 4. Regras transversais de consistencia

1. Toda relacao compartilhada deve usar ID estavel por entidade.
2. Nenhuma relacao critica deve depender exclusivamente de texto livre.
3. Historico nao deve ficar apenas aninhado em estruturas locais se ele sustentar auditoria futura.
4. Dado mestre nao deve ser recalculado a partir de eventos quando ele for fonte de catalogo.
5. Evento operacional e financeiro pode consumir dado mestre, mas nao deve redefinir seu ownership.

## 5. Decisao desta fase

O modelo futuro do LavaPrime passa a tratar clientes, veiculos, servicos, catalogos, equipe, configuracoes e metodos de pagamento como dominios relacionados, porem distintos.

Isso prepara:

- modularizacao do web por fronteiras reais;
- integracao com backend sem relacoes orfas;
- migracao de financeiro apoiada em cadastros estaveis.
