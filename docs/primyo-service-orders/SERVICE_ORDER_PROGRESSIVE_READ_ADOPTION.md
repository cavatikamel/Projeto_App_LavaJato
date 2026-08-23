# Service Order Progressive Read Adoption

## Fase

`LP-SERVICE-ORDER-004 - Service Order Progressive Read Adoption And Migration Design`

## Area escolhida

- `documents`

## Motivo da escolha

- documentos e recibos ja sao naturalmente derivados do atendimento;
- `documentHistory` ja preserva `sourceType` e `sourceId`;
- o enriquecimento interno com OS pode ocorrer sem trocar a fonte visual principal;
- o risco operacional e menor do que iniciar por financeiro ou dashboard.

## O que passou a ler OS

- o runtime de documentos agora monta um `serviceOrderReadModel` auxiliar para cada item de `documentHistory`;
- a leitura tenta resolver a OS por:
  - `document source link`;
  - `payment source link`;
  - `legacy attendance id`;
  - placa inferida do documento.

## Fallback legado

- fallback continua obrigatorio;
- quando nao ha OS resolvida, o item continua valido via `legacy-document-fallback`;
- a renderizacao visual de documentos nao muda;
- `visualOutputChanged = false`;
- `primarySourceChanged = false`.

## Limites mantidos

- nenhum documento passou a persistir em Supabase;
- nenhum template visual foi alterado;
- `documentHistory` continua sendo a fonte principal da tela;
- dashboard e financeiro continuam fora da adocao runtime desta fase.
