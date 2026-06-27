# LavaPrime Adapter Context Standard

## 1. Objetivo

Definir o contexto minimo que todo adapter contratual do LavaPrime deve receber para operar sem depender de `app/main.js`, DOM, `window`, `localStorage` ou Supabase.

## 2. Principio central

Todo adapter deve receber contexto explicitamente.

Ele nao pode:

- descobrir tenancy por conta propria;
- inferir timestamps silenciosamente a partir de runtime global;
- ler variaveis globais;
- assumir colecao de origem sem receber isso por parametro.

## 3. Contexto minimo recomendado

Shape conceitual:

```json
{
  "organizationId": "org_123",
  "now": "2026-06-26T12:00:00Z",
  "defaultStatus": "active",
  "source": "web.clientRegistry",
  "sourceId": "42",
  "idStrategy": "namespaceLegacySource",
  "legacyRefs": {},
  "strictMode": true,
  "allowWarnings": false
}
```

## 4. Campos compartilhados

| Campo | Papel | Regra |
| --- | --- | --- |
| `organizationId` | ownership de tenant | obrigatorio para contratos compartilhados de negocio |
| `now` | referencia temporal da emissao | obrigatorio quando o adapter precisar timestamps tecnicos |
| `defaultStatus` | status padrao quando o legado nao tiver status confiavel | obrigatorio quando o contrato exigir status e o legado nao o fornecer |
| `source` | origem declarada do dado | obrigatorio |
| `sourceId` | ID primario da origem lida | obrigatorio quando existir na origem |
| `idStrategy` | politica de resolucao do `id` canonico | obrigatorio quando o ID canonico nao vier pronto |
| `legacyRefs` | refs adicionais aprovadas para rastreabilidade | opcional, mas controlado |
| `strictMode` | define se lacuna bloqueia a emissao | recomendado |
| `allowWarnings` | define se o adapter pode devolver resultado com warnings nao bloqueantes | recomendado |

## 5. Politicas de `idStrategy`

Politicas recomendadas:

- `preserveCanonicalId`: usar `id` ja canonico fornecido por camada oficial;
- `namespaceLegacySource`: gerar ID transitorio namespaced a partir do `sourceId`;
- `externalResolverRequired`: bloquear sem resolvedor externo aprovado.

Regra:

- cada adapter deve documentar qual politica aceita e quando.

## 6. Regras de obrigatoriedade

### 6.1 Sempre obrigatorios

- `source`
- `strictMode`
- `allowWarnings`

### 6.2 Obrigatorios para contratos compartilhados de negocio

- `organizationId`
- `idStrategy`

### 6.3 Obrigatorios quando o legado nao trouxer o campo

- `now`
- `defaultStatus`
- `sourceId`

## 7. Contexto e validacao

1. Contexto invalido deve gerar erro controlado ou resultado bloqueado.
2. O adapter nao deve mutar o contexto recebido.
3. O adapter nao deve "completar" contexto ausente com leitura global.
4. Warnings por contexto ausente devem ser rastreaveis no resultado.

## 8. Contexto e timestamps

Uso recomendado:

- `now` representa o instante tecnico da adaptacao;
- `createdAt` e `updatedAt` historicos devem vir do legado ou de contexto explicito de backfill, nunca de intuicao silenciosa;
- `metadata.emittedAt` pode derivar de `now`.

## 9. Contexto e futuras superficies

### 9.1 Web

- fornece contexto do runtime controlado;
- nao embute regras de UI dentro do adapter.

### 9.2 Android

- fornece contexto da replica local ou da fila de sync;
- nao deve substituir `organizationId` por dado de cache sem trilha.

### 9.3 Backend

- fornece contexto oficial quando a origem ja for remota;
- pode dispensar `namespaceLegacySource` quando houver ID canonico definitivo.

## 10. Decisao desta fase

Todos os adapters futuros do LavaPrime passam a depender de contexto explicito e controlado.

O contexto deixa de ser detalhe local de implementacao e vira parte da governanca do contrato.
