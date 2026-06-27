# ID Resolver Strategy

## 1. Objetivo

Definir a estrategia oficial para uma futura camada de resolucao de IDs entre contratos e adapters do LavaPrime, sem implementar codigo nesta fase.

## 2. Por que um resolvedor de IDs sera necessario

O resolvedor de IDs sera necessario porque a trilha atual ja possui cinco adapters puros, mas varias relacoes entre dominios ainda dependem de:

- `sourceId` de origem local;
- `legacyRefs` de estruturas paralelas;
- chaves derivadas do legado;
- vinculos ainda nao promovidos a ownership canonico.

Sem uma camada controlada de resolucao, o risco e:

- usar nome como identidade;
- usar placa como identidade;
- promover `legacyRefs` a join definitivo;
- resolver relacoes ambiguas cedo demais;
- cristalizar acoplamento errado antes de runtime ou Supabase.

## 3. Problemas que o resolvedor deve resolver

A futura camada devera resolver apenas problemas de identidade e referencia entre dominios, por exemplo:

- reconciliar `currentClientId` legado com `currentCustomerId` canonico;
- orientar como `Attendance` apontara para `Customer`, `Vehicle` e `Service`;
- orientar como `Service` apontara para `Supply` em perfis de consumo;
- separar `sourceId`, `id` canonico e `legacyRefs` em relacoes futuras;
- identificar quando uma relacao pode ser resolvida automaticamente e quando deve ser bloqueada.

## 4. Problemas que o resolvedor nao deve resolver

O resolvedor nao deve:

- deduplicar entidades por heuristica fraca;
- decidir regra de negocio financeira;
- gerar baixa de estoque;
- automatizar consumo por servico;
- consultar Supabase;
- acessar runtime, DOM, `window`, `localStorage` ou `app/main.js`;
- mutar payloads de adapters;
- corrigir inconsistencias de catalogo sozinho.

## 5. Por que ainda nao deve ser integrado ao runtime

Ele ainda nao deve ser integrado ao runtime porque:

1. a fase atual ainda e de planejamento;
2. ha relacoes cross-domain que continuam ambiguas no legado;
3. `Attendance`, `Payment` e `Financial` ainda nao foram extraidos como adapters puros;
4. abrir resolucao automatica cedo demais aumentaria o risco de comportamento invisivel;
5. Supabase continua fechado e nao ha ownership definitivo remoto aprovado.

## 6. Relacao futura com adapters

Estado pretendido:

- adapters continuam convertendo shape legado para contrato;
- resolvedor entra depois como camada pura e separada de reconciliacao de referencias;
- adapters nao devem esconder logica cross-domain dentro do proprio modulo;
- quando uma relacao for ambigua, o adapter deve continuar emitindo `legacyRefs` e o resolvedor deve bloquear ou devolver resultado controlado.

## 7. Relacao futura com Supabase

Antes de Supabase:

- a camada devera provar que distingue identidade canonica de rastreabilidade;
- devera bloquear relacoes sem `sourceId` ou sem ownership claro;
- devera preparar referencia estavel para futuras tabelas e joins.

Depois de Supabase:

- o resolvedor podera reduzir uso de IDs transitorios;
- `id` canonico remoto passara a dominar onde existir;
- `legacyRefs` continuara como trilha de migracao, nao como join oficial.

## 8. Relacao futura com migracao de dados

O resolvedor sera uma ponte entre:

- adapters de master data;
- futuro `attendanceAdapter`;
- futura trilha de `StockMovement`;
- futuros contratos financeiros e de atendimento;
- migracao gradual do legado para armazenamento oficial.

Sem ele, a migracao arrisca copiar ambiguidade do legado para contratos canônicos.

## 9. Limites de escopo desta fase

Esta fase nao autoriza:

- criar `legacyIdResolver.js`;
- alterar adapters;
- alterar gate;
- alterar runtime;
- abrir Supabase;
- criar vinculos funcionais entre dominios.

## 10. Decisao oficial desta fase

O LavaPrime passa a reconhecer formalmente a necessidade de uma camada dedicada de resolucao de IDs cross-domain, mas sua implementacao continua adiada para uma fatia propria, pequena, pura e reversivel.
