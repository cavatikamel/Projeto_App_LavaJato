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
- progresso oficial antes de `LP-APK-001`: `3%`
- progresso oficial apos concluir `LP-APK-001`: `10%`
- progresso oficial antes de `LP-APK-002`: `10%`
- progresso oficial apos concluir `LP-APK-002`: `15%`
- progresso oficial antes de `LP-APK-003`: `15%`
- progresso oficial apos concluir `LP-APK-003`: `19%`
- progresso oficial antes de `LP-APK-004`: `19%`
- progresso oficial apos concluir `LP-APK-004`: `22%`
- progresso oficial antes de `LP-APK-005`: `22%`
- progresso oficial apos concluir `LP-APK-005`: `28%`
- progresso oficial antes de `LP-APK-006`: `28%`
- progresso oficial apos concluir `LP-APK-006`: `31%`
- progresso oficial antes de `LP-APK-008`: `31%`
- progresso oficial apos concluir `LP-APK-008`: `34%`
- progresso oficial antes de `LP-APK-009`: `34%`
- progresso oficial apos concluir `LP-APK-009`: `39%`
- progresso oficial antes de `LP-APK-010`: `39%`
- progresso oficial apos concluir `LP-APK-010`: `44%`
- estimativa do checkpoint Android atual em relacao ao produto final: `8%`

## Regra de leitura do `8% estimado`

O `8% estimado` representa apenas a maturidade tecnica observada do checkpoint Android atual.

Ele nao substitui o progresso oficial do programa e nao autoriza pular fases de baseline, requisitos, QA ou governanca.

## Regras operacionais

- uma fase concluida sem closure nao sobe percentual;
- uma fase com build falho, gate falho ou smoke bloqueado pode ficar `aprovada com ressalvas`, mas o percentual so sobe se o criterio de aceite da propria fase permitir;
- LPFRs nao contam percentual oficial enquanto nao forem convertidos em fase aprovada;
- progresso deve ser atualizado sempre no fechamento da fase correspondente.

## Estado oficial atual

- baseline funcional Web do programa APK: `concluida`
- decisao oficial de reuse do Android atual: `concluida`
- baseline visual mobile oficial: `concluida`
- requisitos oficiais do APK finalizados para implementacao: `concluida`
- design system Android oficial: `concluido`
- splash e inicializacao Android: `concluidos`
- shell de navegacao mobile com paridade estrutural do Web: `concluido`
- dashboard mobile com paridade operacional base do Web: `concluido`
- patio mobile com paridade operacional base do Web: `concluido`
- progresso oficial consolidado nesta data: `44%`
- proxima etapa recomendada: `LP-APK-014 - Customers Flow`

## Regra especifica da LP-APK-003

- esta fase nao significa que o visual do APK foi corrigido;
- esta fase apenas cria a referencia oficial para corrigir o visual nas proximas fases;
- o ganho de progresso desta fase vem da baseline visual documentada, nao de implementacao Android.

## Regra especifica da LP-APK-004

- esta fase nao implementa o app;
- esta fase fecha os requisitos, dependencias, criterios de aceite e mapa de dados antes do codigo;
- o ganho de progresso desta fase vem da prontidao documental para iniciar `LP-APK-005`, nao de qualquer entrega funcional no Android.

## Regra especifica da LP-APK-005

- esta fase implementa a fundacao visual oficial do Android;
- o ganho de progresso desta fase vem do tema Compose, tipografia oficial, componentes reutilizaveis, iconografia e shell mobile buildado;
- a fase nao fecha negocio, dados, pagamentos ou sync real;
- a proxima fase deve consolidar splash e inicializacao usando a base visual agora estabilizada.

## Regra especifica da LP-APK-006

- esta fase consolida a abertura nativa do app com preload, banco local, sessao local e roteamento inicial;
- o ganho de progresso desta fase vem do fluxo de entrada buildado e rastreavel;
- a fase nao implementa auth remota, sync remoto ou regras novas de negocio;
- a proxima fase deve aprofundar login e selecao de perfil sobre a inicializacao ja estabilizada.

## Regra especifica da LP-APK-008

- esta fase consolida o shell de navegacao mobile e a paridade estrutural das telas do Web;
- o ganho de progresso desta fase vem da navegacao agrupada, das rotas espelho adicionadas e do build Android validado;
- a fase nao fecha paridade funcional completa de cada modulo nem substitui as fases especificas de dashboard, patio, atendimento, cadastros ou financeiro;
- a proxima fase deve aprofundar a paridade operacional do `Dashboard` sobre o shell agora estabilizado.

## Regra especifica da LP-APK-009

- esta fase consolida os blocos centrais do Dashboard Web no Android;
- o ganho de progresso desta fase vem da leitura mobile do dashboard, dos indicadores operacionais e do build Android validado;
- a fase nao fecha vendas, cobrancas, manutencoes nem todas as metricas financeiras do Web;
- a proxima fase deve aprofundar a paridade operacional do `Patio`.

## Regra especifica da LP-APK-010

- esta fase consolida o quadro do `Patio` Web no Android e simplifica a abertura para `Splash -> Login`;
- o ganho de progresso desta fase vem da leitura mobile do patio, da fila por status e do build Android validado;
- a fase nao fecha o status `Prontos` como estado de dados proprio nem implementa pagamento completo do patio;
- a proxima fase segura passa a ser a base de `Clientes`, necessaria para o fluxo completo de atendimento oficial.

## Regra de checkpoint

- checkpoint parcial: registra estado tecnico, nao progresso final;
- release candidate: exige pacote de QA antes do ultimo percentual.
