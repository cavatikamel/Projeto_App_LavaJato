# Attendance Contract

## 1. Objetivo

Definir o contrato oficial de comunicacao do atendimento entre Web, Android, API e futuras integracoes.

O header comum `contractName`, `contractVersion` e `emittedAt` segue `CONTRACT_GUIDELINES.md`.

## 2. Identificador canonico

- `id`
- `organizationId`

Regra:

- o atendimento e a origem operacional primaria de servicos aplicados e de boa parte dos eventos financeiros do LavaPrime.

## 3. Campos obrigatorios

| Campo | Tipo | Papel |
| --- | --- | --- |
| `id` | string | identificador canonico do atendimento |
| `organizationId` | string | ownership de tenant |
| `clientId` | string | cliente principal do atendimento |
| `vehicleId` | string | veiculo principal do atendimento |
| `status` | string | estado operacional do atendimento |
| `entryAt` | datetime | entrada no fluxo operacional |
| `createdAt` | datetime | criacao do registro |
| `updatedAt` | datetime | ultima atualizacao |

## 4. Campos opcionais

| Campo | Tipo | Papel |
| --- | --- | --- |
| `operatorId` | string | operador responsavel quando definido |
| `startAt` | datetime | inicio da execucao |
| `endAt` | datetime | fim da execucao |
| `notes` | string | observacoes operacionais |
| `serviceEntries` | object[] | itens de servico aplicados ou planejados |
| `productEntries` | object[] | itens de produto usados ou vendidos |
| `statusHistory` | object[] | trilha de mudanca de status |
| `invoiceRefs` | string[] | referencias de faturamento geradas a partir do atendimento |
| `receivableRefs` | string[] | referencias de obrigacoes abertas |
| `paymentRefs` | string[] | referencias de pagamentos vinculados |
| `totalsSnapshot` | object | agregados exibidos na troca entre superficies |
| `legacyRefs` | object | referencias transitivas do legado |

## 5. Relacionamentos

- `Attendance` -> `Customer`: N:1
- `Attendance` -> `Vehicle`: N:1
- `Attendance` -> `Service`: 1:N por itens aplicados
- `Attendance` -> `Product`: 1:N por itens vendidos ou consumidos
- `Attendance` -> `Payment`: 1:N
- `Attendance` -> `Financial`: 1:N por receivables, invoices e documentos

## 6. Regras obrigatorias

1. o atendimento nao pode depender apenas do estado visual do patio.
2. `totalsSnapshot` e derivado de itens e eventos; nao substitui registros filhos.
3. pagamento, invoice e receivable devem referenciar o atendimento quando a origem operacional vier dele.
4. troca de status deve ser rastreavel.
5. cancelamento nao apaga historico operacional ou financeiro ja emitido.
6. atendimento e o ponto oficial para reconciliar cliente, veiculo, servicos e reflexo financeiro.

## 7. Campos nao autoritativos

Nao definem o registro oficial:

- fila visual do patio;
- dialogos abertos;
- selecoes temporarias;
- filtros de tela;
- previews de checkout antes de confirmacao.

## 8. Decisao desta fase

`Attendance` passa a ser o contrato operacional central do LavaPrime, servindo como ponte formal entre cadastro, execucao de servico, venda de produto e financeiro.
