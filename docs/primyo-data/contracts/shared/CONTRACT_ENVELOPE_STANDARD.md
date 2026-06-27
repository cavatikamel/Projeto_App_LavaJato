# LavaPrime Contract Envelope Standard

## 1. Objetivo

Definir o envelope oficial que envolve payloads contratuais quando eles circulam entre superficies.

Este padrao vale para Web, Android, backend, Supabase, filas futuras de sincronizacao e adapters puros.

## 2. Estrutura oficial do envelope

Envelope padrao:

```json
{
  "contractName": "Customer",
  "contractVersion": "1.0.0",
  "payload": {},
  "organizationId": "org_123",
  "source": "web.clientRegistry",
  "sourceId": "42",
  "legacyRefs": {},
  "createdAt": "2026-06-26T12:00:00Z",
  "updatedAt": "2026-06-26T12:00:00Z",
  "status": "active",
  "warnings": [],
  "validation": {},
  "metadata": {}
}
```

## 3. Campos obrigatorios do envelope

| Campo | Papel |
| --- | --- |
| `contractName` | nome logico do contrato compartilhado |
| `contractVersion` | versao semantica do contrato |
| `payload` | corpo contratual da entidade |
| `organizationId` | escopo de tenancy da emissao |
| `source` | superficie e origem declarada do dado adaptado |
| `sourceId` | identificador primario do registro de origem |
| `createdAt` | timestamp tecnico ou refletido do registro compartilhado |
| `updatedAt` | timestamp tecnico ou refletido da ultima atualizacao conhecida |
| `status` | estado compartilhado da emissao segundo politica oficial |
| `warnings` | lista de alertas nao bloqueantes |
| `validation` | resultado estruturado de validacao |
| `metadata` | espaco controlado para informacoes auxiliares |

## 4. Campos condicionais

| Campo | Quando usar |
| --- | --- |
| `legacyRefs` | quando houver origem, colecao, IDs ou pistas do legado que precisem sobreviver |

Observacao:

- `legacyRefs` pode ser obrigatorio de fato em fases de migracao, mesmo sendo condicional no shape base.

## 5. Regra de relacao entre envelope e payload

1. O payload carrega semantica de dominio.
2. O envelope carrega semantica de transporte, rastreabilidade, validacao e governanca.
3. Se `organizationId`, `status`, `createdAt` ou `updatedAt` existirem tambem no payload, os valores devem ser identicos aos do envelope.
4. Divergencia entre envelope e payload deve ser tratada como erro de contrato, nunca como detalhe cosmetico.

## 6. Distincao entre `sourceId` do envelope e `sourceId` do payload

Alguns contratos, como `Payment` e `Financial`, usam `sourceId` dentro do proprio dominio.

Regra oficial:

- `envelope.sourceId` identifica o registro de origem lido pelo adapter;
- `payload.sourceId` identifica a origem de negocio definida pelo proprio contrato;
- quando ambos existirem, eles podem ter valores diferentes e isso nao e erro por si so;
- a documentacao do contrato deve explicar a diferenca.

## 7. Estrutura recomendada de `validation`

Estrutura recomendada:

```json
{
  "ok": true,
  "errors": [],
  "missingRequiredFields": [],
  "blocking": false
}
```

Regras:

- `ok` resume o resultado final;
- `errors` lista violacoes detectadas;
- `missingRequiredFields` explicita lacunas obrigatorias;
- `blocking` indica se a emissao pode seguir ou deve parar.

## 8. Estrutura recomendada de `metadata`

Campos recomendados:

- `emittedAt`
- `adapterName`
- `adapterMode`
- `notes`
- `contractNamespace`
- `deletedAt`, quando a fase futura aprovar soft delete transversal

Regra:

- `metadata` nao pode virar deposito livre de campos de dominio nao modelados.

## 9. Quando usar envelope completo

Envelope completo e obrigatorio quando:

- o payload sair de uma superficie para outra;
- houver fila de sincronizacao;
- houver comparacao entre legado e backend;
- houver leitura ou escrita remota;
- houver auditoria de warnings, validacao ou rastreabilidade;
- houver snapshot financeiro, operacional ou documental.

## 10. Quando usar apenas `payload`

Payload isolado pode ser usado quando:

- a funcao ainda esta dentro de uma cadeia pura e local de mapeamento;
- o envelope ja foi validado em etapa anterior do mesmo fluxo;
- o consumo for apenas interno a um adapter helper;
- o teste quiser validar somente a forma do dominio antes da emissao do envelope.

Regra:

- payload isolado nao substitui o envelope nas fronteiras entre superficies.

## 11. Decisao desta fase

O LavaPrime passa a ter um envelope contratual unico.

Adapters futuros nao devem mais inventar envelopes por dominio. Eles devem partir deste padrao comum e so especializar o `payload`.
