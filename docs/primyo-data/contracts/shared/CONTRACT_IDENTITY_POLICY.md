# LavaPrime Contract Identity Policy

## 1. Objetivo

Definir a regra oficial de identidade compartilhada entre Web, Android, backend e futuras integracoes do LavaPrime.

Esta politica vale para qualquer contrato em `docs/primyo-data/contracts/`.

## 2. Conceitos centrais

### 2.1 `id` canonico

`id` canonico e o identificador principal do payload contratual.

Ele deve ser:

- opaco;
- estavel;
- independente de texto exibido em UI;
- independente de tabela fisica;
- seguro para circular entre superficies.

### 2.2 `sourceId`

`sourceId` identifica o registro de origem usado pelo adapter no momento da traducao.

Ele nao substitui o `id` canonico.

### 2.3 `legacyRefs`

`legacyRefs` preserva rastreabilidade do legado sem promover chaves antigas a ownership oficial.

## 3. Regra oficial para `id` canonico

1. Todo contrato compartilhado deve possuir um `id` canonico.
2. O `id` canonico nao deve depender de nome, telefone, documento, placa, label visual ou posicao em lista.
3. O `id` canonico deve sobreviver a renome, edicao de cadastro e mudanca de persistencia.
4. O `id` canonico deve ser tratado como string opaca em todas as superficies.
5. Quando o backend oficial existir, o `id` canonico aprovado por ele passa a ser a referencia definitiva.

## 4. Nomeacao recomendada de IDs

Padrao recomendado durante a fase de convivencia:

- `<contract-namespace>:<opaque-token>`
- `<contract-namespace>:legacy:<source-id>`

Exemplos aceitaveis nesta fase:

- `customer:8f4d2a`
- `vehicle:legacy:car-102`
- `service:legacy:lavagem-premium`

Exemplos proibidos:

- `cliente-joao-silva`
- `cpf-12345678900`
- `placa-ABC1D23`
- `telefone-11999999999`
- `billingClients-17-clientRegistry-42`

## 5. O que pode ou nao virar ID oficial

### 5.1 Pode virar `id` oficial

- UUID, ULID ou token opaco emitido pela fonte oficial;
- chave legado estavel encapsulada por namespace controlado, enquanto nao houver fonte oficial remota;
- identificador aprovado por contrato e sem dependencia de PII.

### 5.2 Nao pode virar `id` oficial

- nome de cliente, servico, produto ou operador;
- documento fiscal ou pessoal;
- telefone;
- placa;
- chave derivada de texto livre;
- path de arquivo;
- nome de tabela, collection ou chave de `localStorage`;
- hash opaco sem governanca aprovada de como foi gerado.

## 6. Diferenca entre `id`, `sourceId` e `legacyRefs`

| Campo | Papel | Estabilidade | Ownership |
| --- | --- | --- | --- |
| `id` | identificador canonico do contrato | alta | oficial |
| `sourceId` | identificador primario do registro de origem usado pelo adapter | media | rastreabilidade da origem |
| `legacyRefs` | conjunto de referencias antigas, auxiliares ou paralelas | variavel | compatibilidade e reconciliacao |

Regras:

1. `sourceId` deve ser unico dentro da origem declarada, mas nao precisa ser global.
2. `legacyRefs` pode carregar varios IDs antigos, desde que nao sejam promovidos silenciosamente a chave oficial.
3. Um contrato pode ter `sourceId` vazio apenas quando a origem nao tiver ID proprio e isso estiver documentado.

## 7. ID definitivo x ID transitorio

### 7.1 ID definitivo

Um `id` e definitivo quando:

- foi aprovado como identidade oficial do contrato; e
- pode ser mantido mesmo depois de mover a persistencia para Supabase ou Android offline sync.

### 7.2 ID transitorio

Um `id` e transitorio quando:

- foi criado apenas para a fase de adapter;
- depende de namespace legado temporario; ou
- ainda precisa ser substituido por identidade oficial remota.

Regra obrigatoria:

- IDs transitorios devem ser explicitamente documentados como transitorios e nao podem esconder essa condicao.

## 8. Regra para nao expor detalhes internos do legado

O contrato nao deve vazar:

- nome de collection local;
- nome de tabela fisica;
- nome de chave interna de `localStorage`;
- algoritmo interno de deduplicacao;
- composicao textual usada para remendo temporario.

Quando esse detalhe precisar sobreviver para auditoria ou reconciliacao, ele deve ficar em `legacyRefs` ou `metadata`, nunca no `id` canonico.

## 9. Relacao com `organizationId`

`organizationId` nao substitui o `id` canonico.

Regra:

- `id` identifica a entidade;
- `organizationId` define o escopo de tenancy;
- o par `organizationId` + `id` deve ser suficiente para localizar o registro nas superficies compartilhadas.

## 10. Decisao desta fase

O LavaPrime passa a tratar identidade contratual como um problema separado de origem legado.

`id`, `sourceId` e `legacyRefs` deixam de ser conceitos misturados e passam a ter papeis distintos, obrigatorios e auditaveis.
