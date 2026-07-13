# Service Order Runtime Adoption

## Escolha desta fase

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
