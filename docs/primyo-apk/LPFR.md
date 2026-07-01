# LavaPrime Future Requirements

## Objetivo

Formalizar o registro oficial de requisitos futuros do LavaPrime sem autorizacao automatica de implementacao.

## Definicao oficial

`LPFR` significa `LavaPrime Future Requirement`.

Um `LPFR` representa ideia, melhoria, funcionalidade ou necessidade futura que:

- surgiu durante o desenvolvimento;
- ainda nao possui fase aprovada para implementacao;
- depende de analise, prioridade, risco, dependencias e janela propria.

## Regra de governanca

- `LP_APK_REQUIREMENTS.md` registra requisitos obrigatorios do app Android oficial;
- `LPFR.md` registra futuros requisitos e ideias;
- nenhum `LPFR` pode ser implementado enquanto nao for convertido em fase aprovada.

## Status permitidos

- `requested`
- `needs-analysis`
- `accepted-future`
- `parked`
- `converted-to-phase`
- `implemented`
- `rejected`

## Registro inicial

| LPFR ID | Nome | Objetivo | Descricao | Origem da solicitacao | Impacto | Complexidade | Risco | Prioridade | Dependencias | Melhor momento de execucao | Escopo afetado | Decisao | Fase sugerida | Observacoes | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `LPFR-001` | Abertura e fechamento diario de caixa opcional | permitir sessao diaria opcional de caixa | criar abertura, fechamento e conciliacao simplificada de caixa diario | necessidade futura recorrente do produto | Alto | Medio/Alto | Medio | `P2` | pagamentos, financeiro, auditoria | apos `LP-APK-025` e antes do RC final, se priorizado | Android, Web, Backend | `accepted-future` | familia `LPFR-001-FIN-*` | nao implementar nesta fase | `accepted-future` |
| `LPFR-002` | Cliente fidelidade | permitir mecanicas simples de fidelizacao | pontos, recorrencia ou beneficios controlados para clientes | backlog funcional futuro do produto | Medio | Medio | Medio | `P3` | clientes, vendas, pagamentos | depois da estabilizacao operacional base | Android, Web, Backend | `needs-analysis` | fase futura propria | risco de escopo se entrar cedo | `needs-analysis` |
| `LPFR-003` | Geracao de posts para Instagram | apoiar marketing automatizado | gerar conteudo promocional a partir da operacao do lava jato | ideia futura ja conhecida | Medio | Medio/Alto | Medio | `P4` | auth, assets, conteudo, aprovacoes | somente apos produto operacional estavel | Android, Web, todos | `needs-analysis` | fase de marketing separada | totalmente fora da trilha APK base | `needs-analysis` |
| `LPFR-004` | Organizacao avancada de cuidados especiais do veiculo | aprofundar controle de cuidados e alertas especiais | manter regras detalhadas, historico e classificacao de sensitividade do veiculo | necessidade funcional futura observada no dominio | Medio/Alto | Medio | Medio | `P3` | veiculos, atendimentos, auditoria | apos estabilizar `Customers`, `Vehicles` e `Attendance` | Android, Web, Backend | `accepted-future` | fase futura de dominio operacional | pode virar extensao de veiculos/atendimentos | `accepted-future` |

