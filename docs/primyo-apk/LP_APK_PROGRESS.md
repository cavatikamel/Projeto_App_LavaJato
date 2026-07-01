# LP APK Progress

## Objetivo

Definir a regra oficial de progresso percentual do `Programa LavaPrime APK`.

## Regra central

O percentual oficial do programa so pode subir quando uma fase tiver:

1. artefato previsto entregue;
2. validacao minima executada e registrada;
3. closure formal criada;
4. commit seletivo local quando a fase pedir.

Checkpoint tecnico parcial nao sobe percentual sozinho.

## Distribuicao inicial oficial

| Macroetapa | Percentual |
| --- | ---: |
| Governanca do programa | 3% |
| Baseline funcional Web | 7% |
| Auditoria Android / reuse decision | 5% |
| Requisitos oficiais do APK | 5% |
| Design system e paridade visual | 10% |
| Splash / login / shell | 10% |
| Dashboard / patio | 10% |
| Atendimento completo | 15% |
| Cadastros principais | 10% |
| Comercial / pagamentos / documentos / backoffice mobile | 10% |
| Impressao termica | 7% |
| Offline / sync / auditoria | 5% |
| QA / release candidate | 3% |
| **Total** | **100%** |

## Estado oficial inicial

- progresso oficial antes de `LP-APK-000`: `0%`
- progresso oficial apos concluir `LP-APK-000`: `3%`
- estimativa do checkpoint Android atual em relacao ao produto final: `8%`

## Regra de leitura do `8% estimado`

O `8% estimado` representa apenas a maturidade tecnica observada do checkpoint Android atual.

Ele nao substitui o progresso oficial do programa e nao autoriza pular fases de baseline, requisitos, QA ou governanca.

## Regras operacionais

- uma fase concluida sem closure nao sobe percentual;
- uma fase com build falho, gate falho ou smoke bloqueado pode ficar `aprovada com ressalvas`, mas o percentual so sobe se o criterio de aceite da propria fase permitir;
- LPFRs nao contam percentual oficial enquanto nao forem convertidos em fase aprovada;
- progresso deve ser atualizado sempre no fechamento da fase correspondente.

## Regra de checkpoint

- checkpoint parcial: registra estado tecnico, nao progresso final;
- release candidate: exige pacote de QA antes do ultimo percentual.

