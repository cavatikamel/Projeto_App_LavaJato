# Service Order Runtime Adoption

## Escolha LP-SERVICE-ORDER-003

Adocao runtime escolhida:

- `Option A - diagnostico ampliado usa storage contract`

## Motivo

Esta e a opcao de menor risco porque:

- nao troca a fonte visual de dashboard;
- nao troca a fonte visual de financeiro;
- nao troca a fonte visual de documentos;
- nao muda persistencia;
- nao muda save;
- nao muda bootstrap.

## O que passa a acontecer

- o runtime monta contratos de storage em lote apenas para auditoria tecnica;
- o diagnostico da OS passa a medir cobertura e validade desses contratos;
- a readiness para backend passa a ficar observavel sem tocar Supabase.

## O que continua legado

- renderizacao principal de atendimento/patio;
- documentos e recibos visuais;
- fluxo financeiro;
- save do runtime;
- bootstrap atual.

## Atualizacao LP-SERVICE-ORDER-004

Adocao runtime escolhida:

- `Option A - documentos/relatorios como referencia auxiliar de OS`

### O que mudou

- `documentHistory` passa a ser enriquecido em runtime com `serviceOrderReadModel`;
- o enriquecimento usa contrato de storage e fallback legado;
- a tela continua visualmente igual;
- `visualOutputChanged = false`;
- `primarySourceChanged = false`.

### O que continua legado

- `documentHistory` continua sendo a fonte principal de renderizacao;
- dashboard continua visualmente ligado ao legado;
- financeiro continua visualmente ligado ao legado;
- nenhum save ou persistencia foi alterado.

## Atualizacao LP-SERVICE-ORDER-005

### O que mudou

- documentos passam a carregar `documentServiceOrderSource` auxiliar em runtime;
- a resolucao de origem documental passa a priorizar `serviceOrderId`, `serviceOrderNumber`, `legacyAttendanceId`, links de pagamento e `sourceType/sourceId` antes de usar placa;
- recibos novos gerados pelo fluxo de atendimento passam a nascer com mais metadados de OS;
- o diagnostico tecnico passa a expor `documentSourceQuality` e `shadowWrite`.

### O que continua igual

- `documentHistory` continua fonte principal visual;
- `visualOutputChanged = false`;
- `primarySourceChanged = false`;
- dashboard e financeiro nao trocam de fonte principal;
- nenhuma escrita real e executada.
