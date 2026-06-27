# LavaPrime Master Data Supabase Readiness

## 1. Objetivo

Definir o que precisa existir antes de conectar o dominio de dados mestres do LavaPrime ao Supabase.

## 2. Tabelas necessarias ja observadas no schema

### 2.1 Raiz de tenant e identidade

- `organizations`
- `profiles`
- `organization_memberships`

### 2.2 Configuracao do negocio

- `business_profiles`
- `business_bank_accounts`
- `business_pix_keys`
- `payment_methods`
- `finance_settings`
- `social_links`
- `message_templates`

### 2.3 Cadastros mestres operacionais

- `clients`
- `vehicles`
- `vehicle_owner_history`
- `operators`
- `services`
- `supplies`
- `products`
- `service_supply_profiles`
- `inventory_movements`
- `vehicle_special_care`
- `vehicle_special_care_history`

## 3. Condicoes obrigatorias antes da conexao real

### 3.1 Contratos e ownership

Antes de qualquer runtime real, precisa existir decisao aprovada para:

- `customers` unificando o papel hoje dividido entre `clientRegistry` e `billingClients`;
- `vehicles` com owner atual e historico sem ambiguidades;
- `services` com `serviceId` estavel, desacoplado de nome livre;
- `service_supply_profiles` vinculados por `serviceId`;
- `team_members` separados de credencial local;
- `payment_methods` ligados a conta bancaria e snapshot financeiro futuro;
- `business_settings` tratados como pacote coerente de organizacao.

### 3.2 Validacoes de dados

Antes de ativar leitura ou escrita remota, validar:

- clientes duplicados por documento, telefone e placa;
- placas com ownership consistente;
- veiculos com owner atual e historico coerentes;
- servicos sem quebra de composicao tecnica;
- produtos e insumos com SKU unico por organizacao;
- movimentos de estoque reconciliados com saldo atual;
- metodos de pagamento com `linkedBankAccountId` valido;
- Pix, bancos e regras de documento coerentes entre si.

### 3.3 Lacunas ainda abertas

Bloqueios atuais:

- parte do master data do web ainda nao possui persistencia duravel;
- `adminOperators` ainda misturam cadastro e credencial local;
- a FIPE local nao tem governanca formal de versao dentro do produto;
- a matriz definitiva de permissao ainda depende de `LP-PERM-001`.

## 4. Relacionamentos obrigatorios a validar

1. `clients.organization_id` e `vehicles.organization_id` precisam respeitar o mesmo tenant.
2. `vehicles.client_id` e `vehicle_owner_history.client_id` precisam convergir sem divergencia silenciosa.
3. `service_supply_profiles.service_id` precisa apontar para `services.id`, nunca para nome derivado.
4. `inventory_movements` precisa apontar para `products.id` ou `supplies.id` de forma exclusiva.
5. `payment_methods.organization_id` precisa permanecer no mesmo tenant das contas bancarias e chaves Pix relacionadas.
6. `operators.profile_id` precisa caber no modelo futuro de identidade real sem reutilizar senha local.

## 5. RLS futura e papel por dominio

Base observada no schema:

- configuracoes e catalogos estruturantes hoje seguem padrao de `select member` e `write admin`;
- entidades operacionais e historicas seguem padrao de `select member`, `insert/update member` e `delete admin`.

Decisao de readiness:

1. `business_profiles`, `business_bank_accounts`, `business_pix_keys`, `payment_methods`, `finance_settings`, `social_links`, `message_templates`, `operators`, `services`, `supplies`, `products` e `service_supply_profiles` devem continuar como `write admin` ate validacao formal em `LP-PERM-001`.
2. `clients`, `vehicles`, `vehicle_owner_history` e `inventory_movements` podem admitir fluxos sistemicos de member write, mas apenas apos contrato e smoke de permissao aprovados.
3. Nenhuma permissao remota deve ser ativada por analogia simples com a camada local atual.

## 6. Rollback minimo obrigatorio

Se qualquer fase futura de conexao de master data falhar, o rollback precisa permitir:

1. desligar imediatamente a leitura ou escrita remota por dominio;
2. voltar para arrays locais e `localStorage` sem apagar dados legados;
3. preservar snapshot de exportacao do dominio afetado;
4. registrar diferencas entre legado e remoto antes de nova tentativa.

## 7. Dados que nao podem ser perdidos

Itens obrigatorios:

- identidade do negocio, CNPJ, nome legal e nome fantasia;
- contas bancarias, configuracao Pix e exibicao documental;
- regras de recebimento, estoque e documento;
- aprovacao de faturamento do cliente e politica de multiplas faturas;
- ownership atual do veiculo e historico de transferencia;
- composicao tecnica entre servico e insumo;
- estoque atual e historico minimo de movimentos;
- papel, status e comissao da equipe;
- referencia da versao FIPE utilizada no periodo de convivencia.

## 8. Estado de readiness desta fase

Conclusao:

- o schema alvo ja contem a maior parte das tabelas necessarias;
- o dominio mestre ainda NAO esta pronto para conexao runtime;
- a proxima etapa segura deve isolar melhor as fronteiras do web antes da primeira integracao real.
