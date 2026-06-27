# LavaPrime Contract Guidelines

## 1. Objetivo

Definir a regra oficial dos contratos de dados do LavaPrime.

Estes contratos representam comunicacao entre:

- Web
- Android
- API
- Supabase
- integracoes futuras

Eles nao representam tabelas fisicas, migrations ou implementacao de banco.

## 2. Padroes compartilhados obrigatorios

Os contratos oficiais do LavaPrime passam a depender dos seguintes padroes comuns:

- `shared/CONTRACT_IDENTITY_POLICY.md`
- `shared/CONTRACT_ENVELOPE_STANDARD.md`
- `shared/ADAPTER_CONTEXT_STANDARD.md`
- `shared/LEGACY_REFERENCES_POLICY.md`
- `shared/CONTRACT_STATUS_AND_TIMESTAMP_POLICY.md`
- `shared/CONTRACT_COMPATIBILITY_RULES.md`

Regra:

- qualquer adapter, payload ou envelope futuro deve respeitar esses documentos antes de especializar regras por dominio.

## 3. Envelope minimo comum

Todo payload compartilhado entre superficies deve carregar um header logico comum:

- `contractName`
- `contractVersion`
- `emittedAt`

E, quando o contrato representar dado compartilhado do negocio:

- `id`
- `organizationId`

Regras:

1. `contractName` identifica o contrato logico, nao o nome da tabela.
2. `contractVersion` controla compatibilidade de payload.
3. `emittedAt` registra quando o envelope foi gerado.
4. `organizationId` e obrigatorio para dado mestre, operacional e financeiro compartilhado.

Observacao:

- a forma detalhada do envelope, com `payload`, `source`, `sourceId`, `legacyRefs`, `warnings`, `validation` e `metadata`, passa a ser governada por `shared/CONTRACT_ENVELOPE_STANDARD.md`;
- este capitulo continua servindo como resumo minimo comum, nao como substituto da especificacao detalhada.

## 4. Convencoes de nomenclatura

### 4.1 Nome dos contratos

- nome logico em PascalCase: `Customer`, `Vehicle`, `Attendance`, `Payment`
- arquivos em caixa alta com sufixo `_CONTRACT.md`

### 4.2 Campos

- campos em camelCase
- referencias por ID com sufixo `Id`
- colecoes em plural: `vehicleIds`, `paymentRefs`, `documentRefs`
- snapshots com sufixo `Snapshot`
- referencias legadas com sufixo `legacyRefs`

### 4.3 Tipos recomendados

- IDs: string opaca e estavel
- datas e timestamps: ISO 8601 em UTC
- valores monetarios: formato decimal normalizado, sem mascara local
- enums: string controlada por contrato, nunca texto livre para decisao critica

## 5. Principios obrigatorios

1. Contrato nao e tabela.
2. Contrato nao e componente de UI.
3. Dado derivado nao substitui dado primario.
4. Relacao critica nao deve depender de nome livre.
5. Snapshot historico deve ser preservado quando houver impacto financeiro ou operacional.
6. Campos locais de UI nao podem virar ownership de negocio por acidente.

## 6. Compatibilidade

### 6.1 Mudanca compativel

E considerada compativel quando:

- adiciona campo opcional;
- adiciona enum sem quebrar interpretacao anterior;
- adiciona bloco complementar sem remover bloco vigente;
- documenta fallback para consumidores antigos.

### 6.2 Mudanca parcialmente compativel

Exige coordenacao entre consumidores quando:

- campo opcional passa a ser obrigatorio;
- enum existente muda de semantica;
- estrutura aninhada muda mas ainda existe adaptacao temporaria.

### 6.3 Quebra de contrato

E quebra de contrato quando:

- remove campo consumido;
- renomeia campo sem alias de transicao;
- muda tipo de campo de forma incompatavel;
- altera a semantica do identificador;
- muda a regra de cardinalidade sem plano de migracao.

## 7. Versionamento

Regra oficial:

- `major`: quebra de contrato
- `minor`: adicao compativel
- `patch`: correcao documental ou clarificacao sem impacto estrutural

Exemplos:

- `1.0.0`: primeira versao aprovada
- `1.1.0`: novo campo opcional
- `2.0.0`: campo obrigatorio renomeado ou estrutura alterada

## 8. Evolucao futura

Toda evolucao futura deve responder:

- qual problema motivou a mudanca;
- quem consome o contrato hoje;
- se a mudanca e aditiva ou quebradora;
- qual o periodo de convivencia;
- como o rollback documental sera feito.

## 9. Quebra de contrato e transicao

Quando uma quebra for inevitavel:

1. publicar nova versao major;
2. manter alias, adapter ou dupla leitura durante a transicao;
3. registrar consumidores impactados;
4. definir data de desativacao da versao antiga;
5. atualizar Web, Android e backend com rastreabilidade.

## 10. Responsabilidades

### 10.1 Produto e arquitetura

- definir semantica do dominio;
- aprovar ownership e relacoes;
- impedir duplicidade entre contratos.

### 10.2 Web

- consumir e produzir payloads conforme contrato;
- nao inventar campos autoritativos fora do contrato;
- marcar campos locais transitivos separadamente.

### 10.3 Android

- respeitar o mesmo contrato logico;
- tratar Room como persistencia local e nao como definicao de contrato;
- manter fila de sincronizacao coerente com a versao do contrato.

### 10.4 Backend e Supabase

- persistir e expor dados sem mudar a semantica do contrato sem aprovacao;
- garantir mapeamento entre contrato logico e armazenamento fisico.

## 11. Limites desta fase

Esta fase nao autoriza:

- criar codigo;
- criar schema;
- criar migrations;
- conectar Supabase;
- alterar `app/main.js`;
- alterar Android;
- alterar storage legado.

## 12. Decisao desta fase

Os contratos de dados do LavaPrime passam a seguir um envelope comum, versionado e orientado a comunicacao, agora sustentado por padroes compartilhados de identidade, contexto, referencias legadas, status, timestamps e compatibilidade.

A camada de persistencia futura devera se adaptar a esses contratos, e nao o contrario.
