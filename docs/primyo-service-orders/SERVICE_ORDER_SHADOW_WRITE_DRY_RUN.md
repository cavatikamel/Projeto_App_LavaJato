# Service Order Shadow Write Dry Run

## Objetivo

Representar o plano de gravacao futura da `Service Order` sem executar nenhuma escrita real.

## Comportamento esperado

O dry-run deve apenas retornar um plano derivado com:

- quantidade de registros planejados;
- tabelas futuras envolvidas;
- bloqueios conhecidos;
- criterios de ativacao;
- confirmacao de que `enabled = false`;
- confirmacao de que `supabaseTouched = false`.

## Garantias

- nao persiste dados;
- nao chama rede;
- nao depende de variavel de ambiente;
- nao altera `documentHistory`, `cashEntries`, `openPayments` ou `patioVehicles`;
- nao altera a saida visual.

## Leitura do plano

- `recordsPlanned` indica o volume aproximado que seria gravado;
- `tables` lista as futuras superficies de storage;
- `blockers` lista o que ainda impede escrita real;
- `activationCriteria` lista as condicoes formais para futura ativacao.

## Atualizacao LP-SERVICE-ORDER-006

O dry-run passa a ficar integrado ao adapter inerte.

Agora ele tambem deve refletir:

- `mode = disabled`;
- `canActivate = false`;
- `payloadsValidated`;
- `payloadsEligible`;
- `writesAttempted = 0`;
- `writesBlocked = 0`;
- `networkWriteAttempted = false`.

## Atualizacao LP-SERVICE-ORDER-007

O dry-run passa a ser acompanhado por `shadowWriteRehearsal`, que consolida:

- contratos analisados;
- payloads validados;
- payloads elegiveis apenas localmente;
- payloads rejeitados;
- verificacao de bloqueio do adapter;
- blockers e warnings consolidados.

## Limites desta fase

O dry-run nao:

- valida credenciais;
- valida RLS real;
- valida migration real;
- substitui teste de staging;
- autoriza `shadow write` automatico.
