# Service Contract

## 1. Objetivo

Definir o contrato oficial de comunicacao do servico entre Web, Android, API e futuras integracoes.

O header comum `contractName`, `contractVersion` e `emittedAt` segue `CONTRACT_GUIDELINES.md`.

## 2. Identificador canonico

- `id`
- `organizationId`

Regra:

- o contrato assume `serviceCode` e `id` estaveis; nome sozinho nao pode sustentar integracao futura.

## 3. Campos obrigatorios

| Campo | Tipo | Papel |
| --- | --- | --- |
| `id` | string | identificador canonico do servico |
| `organizationId` | string | ownership de tenant |
| `serviceCode` | string | codigo tecnico estavel |
| `name` | string | nome exibido do servico |
| `price` | money | preco padrao atual |
| `isActive` | boolean | status de disponibilidade |
| `createdAt` | datetime | criacao do registro |
| `updatedAt` | datetime | ultima atualizacao |

## 4. Campos opcionais

| Campo | Tipo | Papel |
| --- | --- | --- |
| `description` | string | descricao detalhada |
| `durationMinutes` | number | duracao estimada |
| `vehicleType` | string | tipo de veiculo suportado |
| `vehicleCategory` | string | categoria suportada |
| `defaultVehicleCareType` | string | classificacao tecnica padrao |
| `maintenanceRequired` | boolean | indica manutencao recorrente |
| `maintenanceInterval` | string | janela ou frequencia de manutencao |
| `maintenanceDate` | date | referencia de manutencao quando aplicavel |
| `supplyProfileRefs` | string[] | referencias para perfis de consumo de insumos |
| `notes` | string | observacoes administrativas |
| `legacyRefs` | object | referencias transitivas do legado |

## 5. Relacionamentos

- `Service` -> `Supply`: N:N via perfis de consumo
- `Service` -> `Attendance`: 1:N por aplicacao operacional
- `Service` -> `Financial`: 1:N por invoice items, pagamentos e relatorios

## 6. Regras obrigatorias

1. renome de servico nao pode quebrar relacionamento com insumos.
2. perfis de consumo devem apontar para `serviceId`, nunca para chave derivada de nome.
3. `price` atual vale para novos eventos; eventos antigos exigem snapshot do valor usado.
4. duplicidade nao pode ser decidida apenas por comparacao visual de nome.
5. se o servico ja sustentou atendimento ou invoice item, deve preferir inativacao a exclusao.

## 7. Campos nao autoritativos

Nao definem ownership do contrato:

- filtros de tela;
- flags de edicao local;
- ordenacao do catalogo;
- calculos temporarios de checkout.

## 8. Decisao desta fase

`Service` passa a ser um contrato com identificacao tecnica estavel, preparado para separar catalogo mestre de snapshots operacionais e financeiros.
