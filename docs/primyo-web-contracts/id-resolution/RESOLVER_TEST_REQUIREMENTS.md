# Resolver Test Requirements

## 1. Objetivo

Definir os testes minimos que a futura implementacao do resolvedor de IDs devera satisfazer.

## 2. Casos minimos obrigatorios

1. resolve ID canonico valido quando `sourceId`, `idStrategy` e contexto forem suficientes;
2. falha de forma controlada quando `sourceId` estiver ausente;
3. nao usa nome como ID oficial;
4. nao usa placa como ID oficial;
5. preserva `legacyRefs`;
6. nao cria relacao automatica quando houver ambiguidade;
7. nao altera o payload original recebido;
8. nao acessa runtime;
9. nao acessa Supabase.

## 3. Casos recomendados por tipo de relacao

### 3.1 `Vehicle -> Customer`

- resolve quando `currentClientId` legado e explicito;
- bloqueia quando houver apenas nome ou placa;
- preserva refs de ownership antigo em `legacyRefs`.

### 3.2 `Attendance -> Customer`

- resolve quando a origem apontar `customerId` ou vinculo estavel;
- bloqueia quando houver conflito entre cliente operacional e cliente faturado;
- nao escolhe automaticamente entre `clientRegistry` e `billingClients`.

### 3.3 `Attendance -> Vehicle`

- resolve quando `vehicleId` for explicito;
- nao usa placa como ID oficial;
- pode registrar placa apenas como pista em `legacyRefs`.

### 3.4 `Attendance -> Service`

- resolve quando existir `serviceId` ou `serviceCode` aprovado;
- bloqueia quando a relacao depender apenas de nome visual.

### 3.5 `Service -> Supply`

- bloqueia quando houver apenas `serviceSupplyProfiles` sem ID canonico;
- nao converte chave derivada em join oficial;
- preserva referencia historica para reconciliacao futura.

## 4. Regras de comportamento

O resolvedor futuro devera provar que:

- continua puro;
- nao muta `context`;
- nao muta `payload`;
- distingue bloqueio de warning;
- devolve erro controlado em caso ambiguo;
- continua independente de adapters especificos de runtime.

## 5. Decisao oficial desta fase

Nenhuma implementacao do resolvedor devera ser aprovada sem cobertura minima para sucesso controlado, falha controlada, ambiguidade bloqueada e preservacao de `legacyRefs`.
