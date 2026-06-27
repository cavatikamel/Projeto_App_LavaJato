# LavaPrime Web Contract Adapter Strategy

## 1. Objetivo

Definir a estrategia oficial para a futura camada de adapters do LavaPrime Web.

Nesta fase, adapter significa uma fronteira documental e tecnica entre:

- estruturas legadas atuais do `app/main.js`;
- contratos oficiais em `docs/primyo-data/contracts/`;
- payloads futuros de backend Supabase;
- sincronizacao futura do Android.

## 2. O que e um adapter no contexto do LavaPrime

No contexto do LavaPrime, adapter e uma funcao ou conjunto pequeno de funcoes puras que:

1. recebe uma estrutura legada conhecida do web;
2. normaliza, converte e completa o envelope minimo do contrato;
3. devolve um payload compativel com `contractName`, `contractVersion` e semantica aprovada.

O fluxo inverso tambem sera necessario em alguns dominios:

1. receber payload contratual;
2. traduzi-lo para a projecao local que o legado consegue consumir durante a convivencia;
3. impedir que o monolito precise conhecer diretamente a forma fisica do backend ou do Android.

## 3. Por que adapters sao necessarios

Adapters sao necessarios porque o legado atual e os contratos oficiais nao possuem o mesmo shape.

Principais diferencas observadas:

- nomes de campos diferentes: `stock` x `stockBalance`, `cost` x `costPrice`, `price` x `salePrice`;
- estruturas paralelas no legado: `clientRegistry` x `billingClients`;
- IDs ausentes ou nao canonicos em alguns dominios;
- dados denormalizados em `patioVehicles`, `invoiceLineItems` e `cashEntries`;
- campos financeiros derivados que hoje aparecem como primarios;
- snapshots historicos ainda nao explicitados em todos os pontos do runtime.

Sem adapters, o web legado precisaria conhecer:

- naming de contrato;
- naming fisico do Supabase;
- forma de sincronizacao do Android;
- regras de fallback da convivio local;
- estrategia de versionamento de payload.

Isso aumentaria o acoplamento exatamente no ponto onde o programa quer reduzi-lo.

## 4. Quais dados precisam ser traduzidos

A primeira onda de traducao futura deve cobrir:

- `Customer`
- `Vehicle`
- `Service`
- `Product`
- `Supply`
- `Attendance`
- `Payment`
- `Financial`

Dados de suporte que tambem influenciam adapters:

- `businessPaymentMethods`
- `businessFinanceSettings`
- `inventoryMovements`
- `serviceSupplyProfiles`
- `documentHistory`
- `vehicleSpecialCareRecords`

## 5. Onde os adapters devem ficar futuramente

Local recomendado para a implementacao futura:

```text
app/adapters/contracts/
```

Excecao aprovada para a primeira fatia controlada:

- `LP-WEB-007` inicia em `app/adapters/customerAdapter.js` para reduzir impacto estrutural;
- a consolidacao futura em `app/adapters/contracts/` continua em aberto e devera ocorrer apenas quando houver segunda onda aprovada de adapters.

Estrutura recomendada:

```text
app/adapters/contracts/customerAdapter.js
app/adapters/contracts/vehicleAdapter.js
app/adapters/contracts/serviceAdapter.js
app/adapters/contracts/productAdapter.js
app/adapters/contracts/supplyAdapter.js
app/adapters/contracts/attendanceAdapter.js
app/adapters/contracts/paymentAdapter.js
app/adapters/contracts/financialAdapter.js
app/adapters/contracts/shared/contractEnvelopeFactory.js
app/adapters/contracts/shared/legacyIdResolver.js
app/adapters/contracts/shared/paymentMethodSnapshotResolver.js
```

Regras para essa futura pasta:

- sem DOM;
- sem acesso direto a tela;
- sem dependencia de `window`;
- sem acesso bruto a `localStorage`;
- sem cliente Supabase embutido;
- sem regra visual.

## 6. Principios obrigatorios da futura camada

1. Adapter nao define regra de negocio, apenas traduz shape e semantica aprovada.
2. Adapter nao recalcula ownership por intuicao.
3. Adapter nao cria fonte paralela de verdade.
4. Campo ausente obrigatorio deve gerar erro, bloqueio ou resultado explicitamente incompleto.
5. Campo derivado deve ser marcado como derivado.
6. Snapshot historico deve ser produzido quando o contrato ou o dominio exigir.
7. `contractVersion` deve ser controlado no proprio envelope do adapter.

## 7. Tipos de adapter que o web precisara

### 7.1 Legacy -> Contract

Uso futuro:

- exportacao controlada do legado;
- leitura comparativa contra backend;
- escrita remota futura;
- fila de sync para Android.

### 7.2 Contract -> Legacy Projection

Uso futuro:

- convivencia gradual com o monolito;
- leitura controlada do backend sem trocar toda a tela de uma vez;
- shadow mode para comparacao entre payload remoto e estado local.

### 7.3 Snapshot Adapters

Uso futuro:

- pagamento;
- financeiro;
- atendimento;
- documentos.

Esses adapters nao existem para CRUD de cadastro. Eles existem para congelar contexto historico.

## 8. O que o web legado nao deve mais conhecer diretamente no futuro

O `app/main.js` nao deve mais conhecer diretamente:

- nomes fisicos de tabelas Supabase;
- estrutura Room do Android;
- formato de payload do backend;
- `contractVersion` por entidade;
- mapeamento de `billingClients` como fonte paralela definitiva;
- montagem de snapshots financeiros em varios pontos espalhados;
- reescrita por nome de metodo de pagamento como estrategia definitiva;
- relacoes futuras de ownership baseadas em texto livre.

## 9. Fronteiras de uso futuro

Os adapters devem ser usados nos seguintes pontos de fronteira:

1. antes de publicar dados do web para backend;
2. antes de comparar legado com leitura remota;
3. antes de entregar payload para sync mobile;
4. antes de montar snapshots financeiros canonicos;
5. antes de remover estruturas paralelas do legado.

## 10. Nao objetivos desta fase

Esta fase nao autoriza:

- criar arquivos JS de producao;
- conectar Supabase;
- mover `app/main.js`;
- alterar `storageBoundary`;
- alterar Android;
- alterar schema;
- migrar dados.

## 11. Decisao desta fase

O LavaPrime Web passa a ter uma estrategia oficial para adapters contratuais.

A sequencia futura recomendada e:

1. consolidar adapters puros de master data;
2. adaptar atendimento;
3. adaptar pagamento;
4. adaptar financeiro consolidado;
5. somente depois conectar leitura e escrita remotas por dominio.
