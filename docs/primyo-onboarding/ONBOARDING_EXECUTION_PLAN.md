# Onboarding Execution Plan

## Plan header

- Product name: LavaPrime
- Onboarding owner: Codex em execucao do Primyo Transformation Program
- Sponsor: autorizacao direta desta fase do programa
- Planned start: 2026-06-19
- Planned review date: 2026-06-19

## Execution sequence

| Step | Objective | Owner | Expected evidence | Required document | Approval criteria |
| --- | --- | --- | --- | --- | --- |
| 1 | Confirm onboarding authorization and scope boundaries | Primyo program | instrucao formal desta fase e governanca lida | este plano | escopo restrito ao LavaPrime e sem remediation |
| 2 | Create `primyo/onboarding` | Codex | branch criada no repo autorizado | git branch | branch separada criada sem mexer em funcionalidade |
| 3 | Complete legacy product intake | Codex | evidencia consolidada do repositorio | `LEGACY_PRODUCT_INTAKE.md` | campos preenchidos sem inferencia indevida |
| 4 | Map repository, environments, database, permissions, and integrations | Codex | leitura de docs, codigo e config do produto | `arquitetura.md`, `banco-de-dados.md`, `integracoes.md`, `dependencias.md`, `permissoes.md` | mapeamento rastreavel por arquivo |
| 5 | Document findings and open questions | Codex | consolidacao de telas, fluxos, requisitos e lacunas | `requisitos.md`, `fluxos.md` | fatos e duvidas claramente separados |
| 6 | Classify project stage and category | Codex | classificacao explicita com justificativa | intake e audit report | stage e classificacao registrados |
| 7 | Score maturity 0 to 5 by dimension | Codex | matriz com justificativa por dimensao | `matriz-de-maturidade.md` | todas as notas justificadas por evidencia |
| 8 | Produce audit report | Codex | resumo executivo, riscos e gaps | `PRODUCT_AUDIT_REPORT.md`, `riscos.md`, `divida-tecnica.md`, `lacunas-*` | riscos criticos e altos destacados |
| 9 | Produce adequacy plan | Codex | plano classificado por severidade e dependencia | `plano-de-adequacao.md`, `backlog.md` | sem implementacao, so planejamento |
| 10 | Validate outputs with checklist and request approval | Codex | checklist concluido | `CHECKLIST_STATUS.md` | onboarding pronto para aprovacao sem mudar codigo |

## Supporting notes

- Scope boundaries: somente descoberta, documentacao, auditoria, maturidade e planejamento; sem alterar codigo funcional
- Risks to monitor: contaminacao por conhecimento implicito, excesso de inferencia, confundir superficie web atual com backend futuro planejado
- Stakeholders: sponsor e governance owner nao observados no repositorio; produto autorizado pelo programa
- Approval gate owner: Primyo governance apos revisao dos artefatos
