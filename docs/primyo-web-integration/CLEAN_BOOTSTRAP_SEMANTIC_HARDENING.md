# Clean Bootstrap Semantic Hardening

## Objetivo

Registrar o endurecimento semantico minimo aplicado apos o trial protegido de `CLEAN_BOOTSTRAP`.

## Superficies-alvo

- `dashboard`
- `patio`
- `reports`
- `documents`
- `customerVehicleBillingLinks`

## Ajustes aplicados

### Dashboard

- somatorios passam a usar normalizacao numerica finita;
- metricas deixam de depender de `Number(...)` cru em receitas, taxas e liquido.

### Patio

- resolucao de proprietario passa a degradar por `currentClientId`, placa e telefone;
- o patio continua funcional mesmo com vinculo parcial entre veiculo e cliente.

### Reports

- linhas de PDF passam a ser normalizadas antes da geracao;
- colecoes vazias continuam sendo tratadas como estado valido, sem artefatos `undefined` ou `null`.

### Documents / Receipts

- recibo de atendimento passa a resolver cliente e telefone por fallback seguro;
- vencimentos documentais passam a tolerar ausencia de data valida sem quebrar a composicao.

### Customer / Vehicle / Billing Links

- `billingClientId` ausente ou vazio deixa de gerar lookup espurio;
- nomes de cliente passam a degradar com fallback de cadastro legado;
- contexto de fatura passa a centralizar cliente faturado, cliente legado, item principal e veiculo ligado.

## Efeito esperado no trial protegido

- o trial passa a tratar essas superficies como `semantic-*safe` para diagnostico protegido;
- o numero de superficies semanticamente inseguras para o trial protegido tende a cair para `0`;
- a promocao de `CLEAN_BOOTSTRAP` a default continua bloqueada por falta de volume e relacionamentos persistidos em base limpa.

## O que esta fase nao faz

- nao ativa `CLEAN_BOOTSTRAP` como padrao;
- nao remove seed demo;
- nao abre Supabase;
- nao altera UI, CSS, permissao, autenticacao ou salvamento;
- nao transforma fallback semantico em garantia de negocio.

## Rollback

1. reverter `app/main.js`;
2. remover este registro documental;
3. reexecutar gate, build, verify e smoke rapido.
