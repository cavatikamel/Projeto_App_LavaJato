# LavaPrime Master Data Ownership Rules

## 1. Objetivo

Definir ownership, editabilidade, exclusao e historico dos dados mestres do LavaPrime.

## 2. Regras gerais

1. Dado mestre pertence a organizacao, nunca ao navegador.
2. Dado mestre que ja sustentou evento operacional ou financeiro deve preferir inativacao a exclusao.
3. Historico relevante nao pode ser apagado silenciosamente.
4. Duplicidade precisa ser tratada por regra objetiva, nao por julgamento visual.
5. Credencial de acesso definitiva nao deve permanecer misturada ao cadastro mestre da equipe.

## 3. Ownership por entidade

| Entidade | Dono oficial futuro | Quem pode criar | Quem pode editar | Quando pode excluir | Quando deve inativar | Regra principal |
| --- | --- | --- | --- | --- | --- | --- |
| `organizations` | governance corporativa | aprovador tecnico autorizado | aprovador tecnico autorizado | praticamente nunca no fluxo normal | nao aplicavel | tenant raiz nao deve ser recriado por improviso |
| `business_settings` | organizacao | administrador | administrador | apenas antes de uso real | nao aplicavel | regra vale para eventos futuros, nao reescreve historico |
| `business_bank_accounts` | organizacao | administrador | administrador | somente se nunca houve uso historico | apos uso em documento ou recebimento | conta usada deve permanecer rastreavel |
| `business_pix_keys` | organizacao | administrador | administrador | somente se nunca houve uso historico | apos uso em documento ou cobranca | chave historica nao deve sumir sem substituta |
| `payment_methods` | organizacao | administrador | administrador | somente se nunca usada | apos uso em caixa, fatura ou recebivel | historico financeiro deve preservar o metodo antigo |
| `customers` | organizacao | administrador ou fluxo sistemico controlado de atendimento | administrador; fluxo sistemico controlado para ajustes limitados | somente se nunca houve veiculo, atendimento ou financeiro | quando ja houver relacoes historicas | cliente faturado e cliente operacional devem convergir para um unico ownership |
| `vehicles` | organizacao | administrador ou fluxo sistemico controlado de entrada | administrador; fluxo sistemico controlado para troca de owner | somente se nunca houve atendimento ou historico | quando ja houver placa reconhecida ou historico | placa unica por organizacao |
| `vehicle_owner_history` | organizacao | sistema ou administrador | administrador com controle reforcado | nao deve excluir sem trilha | nao aplicavel | transferencia vira historico, nao sobrescrita silenciosa |
| `services` | organizacao | administrador | administrador | somente se nunca usado | apos vinculo a atendimento, relatorio ou perfil tecnico | nome pode mudar, mas ID tecnico precisa permanecer |
| `service_supply_profiles` | organizacao | administrador | administrador | somente se servico ainda nao foi operado ou se houver revisao controlada | quando perfil antigo ja sustentou historico tecnico | vinculacao deve ser por `serviceId` |
| `products` | organizacao | administrador | administrador | somente se nunca houve venda ou movimento | apos uso em venda, atendimento ou estoque | SKU e historico de saldo devem permanecer auditaveis |
| `supplies` | organizacao | administrador | administrador | somente se nunca houve consumo ou movimento | apos uso em servico ou estoque | risco tecnico e fornecedor nao devem ser perdidos |
| `inventory_movements` | dominio de estoque | sistema ou administrador | correcao apenas por evento complementar | nunca por fluxo normal | nao aplicavel | movimento historico nao deve ser apagado |
| `team_members` | organizacao | administrador | administrador | somente se nunca houve acesso, atendimento ou relatorio | apos uso real | status deve preferir inativacao |
| `fipe_reference_versions` | governance tecnica | manutencao tecnica controlada | manutencao tecnica controlada | quando substituida por versao posterior validada | nao aplicavel | referencia local nao pode contaminar dado de negocio |

## 4. Regras de criacao e edicao

### 4.1 Organizacao e configuracoes

- `business_settings`, bancos, Pix e metodos de pagamento sao cadastros administrativos;
- alteracoes produzem efeito para novos eventos;
- eventos passados devem manter snapshot do contexto usado.

### 4.2 Clientes

- operador pode originar cliente casual via fluxo sistemico controlado de atendimento;
- administrador pode enriquecer documento, faturamento, ciclo e aprovacao;
- a aprovacao de faturamento nao deve nascer automaticamente sem trilha.

### 4.3 Veiculos

- operador pode originar veiculo minimo no intake;
- administrador pode consolidar marca, modelo, owner e notas;
- troca de proprietario deve gerar historico novo, nunca apagar o anterior.

### 4.4 Servicos, produtos e insumos

- sao cadastros mestres administrativos;
- alteracoes de preco, custo, composicao ou configuracao nao devem reescrever eventos passados;
- exclusao fisica deve ser excecao e somente antes de uso real.

### 4.5 Equipe

- cadastro de equipe e administrativo;
- acesso local demo e apenas convivencia temporaria;
- qualquer migracao futura de credencial precisa separar identidade de cadastro operacional.

## 5. Regras de exclusao e inativacao

1. Se a entidade ja foi usada em documento, atendimento, estoque, caixa ou faturamento, preferir inativacao.
2. Exclusao so e aceita quando nao houver referencias filhas nem historico relevante.
3. Exclusao de conta bancaria, Pix ou metodo de pagamento exige verificar referencias financeiras anteriores.
4. Exclusao de cliente ou veiculo nao pode quebrar faturamento, recebiveis, historico de ownership ou documentos.
5. Exclusao de servico, produto ou insumo nao pode apagar o rastro de venda, consumo ou custo.

## 6. Regras de duplicidade

### 6.1 Clientes

Duplicidade deve ser avaliada por ordem:

1. documento;
2. telefone normalizado;
3. combinacao de nome/razao social com contexto operacional;
4. placas ja vinculadas.

Regra:

- `billingClients` nao deve permanecer como segunda entidade autoritativa.

### 6.2 Veiculos

Regra obrigatoria:

- placa unica por `organizationId`.

Se houver divergencia entre `currentCustomerId` e `client.plates`, o ownership valido deve ser reconciliado com historico.

### 6.3 Servicos

Enquanto o legado ainda usa nome como chave de duplicidade:

- bloquear nome duplicado;
- na arquitetura alvo, migrar para `serviceCode` + `id` estavel.

### 6.4 Produtos e insumos

Regras:

- SKU unico por `organizationId`;
- nome sozinho nao e suficiente como chave.

### 6.5 Equipe

Regras:

- `username` local nao pode duplicar no legado atual;
- no futuro, identidade real deve ser unica por `profileId`.

## 7. Regras de historico

1. `vehicle_owner_history` deve ser entidade separada e permanente.
2. Alteracao de custo, preco ou taxa nao deve apagar o valor usado em evento passado.
3. `inventory_movements` e historico obrigatorio de estoque.
4. `team_members` deve preservar status e papel historico quando ja participou de operacao.
5. `business_settings` precisa versionar campos sensiveis ao menos por `updatedAt`, mesmo antes de uma trilha completa de auditoria.

## 8. Decisao desta fase

O dominio mestre do LavaPrime passa a seguir a regra de que somente cadastros ainda sem uso real podem ser excluidos livremente.

Toda entidade que ja sustentou:

- documento;
- atendimento;
- faturamento;
- estoque;
- acesso;
- relatorio;

deve preferir inativacao, historico e reconciliacao controlada.
