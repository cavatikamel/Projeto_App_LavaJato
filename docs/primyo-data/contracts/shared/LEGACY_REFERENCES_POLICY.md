# LavaPrime Legacy References Policy

## 1. Objetivo

Definir como referencias do legado devem ser preservadas sem virar ownership oficial dos contratos.

## 2. Papel de `legacyRefs`

`legacyRefs` existe para:

- reconciliacao;
- auditoria;
- trilha de migracao;
- comparacao entre runtime legado e contrato oficial.

Ele nao existe para:

- substituir `id` canonico;
- sustentar join definitivo entre superficies;
- guardar estado de UI;
- esconder campo obrigatorio que deveria ter sido modelado.

## 3. Estrutura recomendada

Shape conceitual:

```json
{
  "sourceCollection": "clientRegistry",
  "sourceId": "42",
  "alternateIds": {},
  "relatedCollections": [],
  "legacyPlates": [],
  "derivedKeys": [],
  "notes": []
}
```

## 4. Regras gerais

1. Toda referencia legado deve entrar em `legacyRefs` com nome explicito.
2. `legacyRefs` deve ser legivel para auditoria e nao para semantica escondida.
3. Chaves antigas podem ser preservadas, mas nao podem voltar a comandar o runtime como se fossem canonicas.
4. Quando houver varias origens, uma delas deve ser declarada como `sourceCollection` principal.
5. Dados sensiveis so devem entrar em `legacyRefs` quando a rastreabilidade exigir e quando o contrato permitir isso de forma controlada.

## 5. Regra para `clientRegistry`

Quando a origem principal do cliente vier de `clientRegistry`:

- `legacyRefs.sourceCollection = "clientRegistry"`
- `legacyRefs.sourceId = <id legado>`
- `legacyRefs.alternateIds.billingClientId = <id faturado>`, se existir
- `legacyRefs.relatedCollections` pode incluir `billingClients`, quando houver correspondencia conhecida

## 6. Regra para `billingClients`

Quando a origem principal vier de `billingClients`:

- `legacyRefs.sourceCollection = "billingClients"`
- `legacyRefs.sourceId = <id faturado>`
- `legacyRefs.alternateIds.clientRegistryId = <id operacional>`, quando existir
- a existencia de `billingClients` nao autoriza manter duas identidades canonicas do mesmo cliente

## 7. Regra para IDs antigos

IDs antigos podem ser preservados em:

- `legacyRefs.sourceId`
- `legacyRefs.alternateIds`
- `legacyRefs.relatedCollections`

Regra:

- ID antigo preservado continua sendo pista de reconciliacao, nao chave oficial futura.

## 8. Regra para placas antigas

Placas antigas podem ser preservadas em:

- `legacyRefs.legacyPlates`
- `legacyRefs.plateHistory`, quando a fase futura formalizar historico detalhado

Regra:

- placa antiga nao vira `vehicleId`;
- placa nao pode ser promovida silenciosamente a chave canonica de cliente ou de veiculo.

## 9. Regra para chaves derivadas

Chaves derivadas, como combinacoes de nome + telefone ou nome + documento parcial, podem existir apenas como pista de reconciliacao.

Devem ser registradas em:

- `legacyRefs.derivedKeys`

Regra:

- chave derivada nunca pode virar `id` oficial sem aprovacao arquitetural especifica;
- chave derivada nao pode ser tratada como verdade se colidir com `sourceId` ou `id` canonico.

## 10. O que nao deve virar chave oficial futura

Itens proibidos como chave oficial:

- nome do cliente;
- telefone;
- documento como texto cru;
- placa;
- categoria visual;
- indice de array;
- chave de `localStorage`;
- combinacao textual montada no frontend para contornar ausencia de ID.

## 11. Decisao desta fase

O LavaPrime passa a preservar rastros do legado de forma explicita e controlada.

`legacyRefs` deixa de ser campo opcional sem semantica definida e passa a ser a fronteira oficial de convivencia com o passado.
