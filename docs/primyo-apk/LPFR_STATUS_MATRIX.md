# LPFR Status Matrix

## Objetivo

Controlar o estado atual dos `LavaPrime Future Requirements`.

| LPFR ID | Nome | Status | Prioridade | Risco | Complexidade | Escopo afetado | Dependencias | Fase sugerida | Decisao atual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `LPFR-001` | Abertura e fechamento diario de caixa opcional | `accepted-future` | `P2` | `Medio` | `Medio/Alto` | `Android, Web, Backend` | pagamentos, financeiro, auditoria | `LPFR-001-FIN-*` | manter fora da baseline obrigatoria do APK |
| `LPFR-002` | Cliente fidelidade | `needs-analysis` | `P3` | `Medio` | `Medio` | `Android, Web, Backend` | clientes, vendas, pagamentos | fase futura propria | analisar so depois da base operacional |
| `LPFR-003` | Geracao de posts para Instagram | `needs-analysis` | `P4` | `Medio` | `Medio/Alto` | `Android, Web, todos` | conteudo, aprovacao, auth | fase futura de marketing | manter separado da trilha APK core |
| `LPFR-004` | Organizacao avancada de cuidados especiais do veiculo | `accepted-future` | `P3` | `Medio` | `Medio` | `Android, Web, Backend` | veiculos, atendimentos, auditoria | extensao futura de dominio operacional | priorizar so apos base de veiculos/atendimentos |

## Observacao apos LP-APK-004

- `LPFR-001` passa a absorver explicitamente o item descartado `APK-FIN-003`.
