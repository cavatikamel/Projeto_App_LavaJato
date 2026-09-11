# 09 — Critérios de aceite

> **Atualizado para o modelo v2 / piloto.** Some a estes critérios os cenários
> novos do protótipo: **multi-responsável** (um inicia, outro conclui; vale para o
> gestor), ação **Livre**, **dependência múltipla**, ciclo da **tarefa**
> (Em andamento → Finalizada → Encerrada/Cancelada → Arquivo), **desativar
> solucionador** libera as ações dele, e **exportar Excel via fluxo F8**. A lista
> operacional é `ItensDaTarefa` e o status terminal da ação é `Concluída`. Ver o
> roteiro completo em docs/08 (Fase 5).

Cada critério do briefing mapeado para o artefato que o atende e como validar.

| # | Critério | Onde é atendido | Como validar |
|---|----------|-----------------|--------------|
| 1 | Criar tarefa avulsa **ou** a partir de modelo | docs/05 §6 (criação + "do zero") | Criar uma de cada; ambas geram `Tarefas` + `AcoesDaTarefa` |
| 2 | Adicionar campos personalizados e dados específicos | Listas `CamposDeModelo`/`DadosDaTarefa` (docs/02); UI docs/05 §6.1 | Campo Texto/Número/Data salvo e visível no popup |
| 3 | Criar, editar e atribuir ações aos solucionadores | `AcoesDaTarefa` (docs/02); docs/05 §6 e §2.4 | Ação aparece na célula do solucionador certo |
| 4 | Definir prazos relativos e dependências | `PrazoRelativo`→`PrazoCalculado`; `Dependencia` (docs/02, docs/04) | D-3/D+0/D+1 calculam a data real; B espera A |
| 5 | Notificar quando liberada ou pendente | Fluxos F1/F2/F5 (docs/06); `Notificacoes` | Teams/e-mail + item na central interna |
| 6 | Exigir evidência para conclusão | `EvidenciaObrigatoria` + guarda no envio (docs/04, docs/05 §4.2) | Sem anexo, botão "Enviar" desabilitado |
| 7 | Exigir justificativa para rejeição | Guarda no botão Rejeitar (docs/04, docs/05 §4.4) | Sem justificativa, "Rejeitar" desabilitado |
| 8 | Manter histórico auditável | `HistoricoDaAcao` gravado em toda transição (docs/04, docs/05 §4) | Cada mudança gera linha com usuário/data/antes/depois |
| 9 | Gestor encerra após validação | Botão Validar restrito a `Perfil = Gestor` (docs/04, docs/05 §4.3) | Solucionador não vê o botão; gestor encerra |
| 10 | Painel matricial tarefas × solucionadores | docs/05 §2, docs/07 §5 | Grade com linhas=tarefas, colunas=solucionadores |

## Requisitos transversais

| Requisito | Atendimento |
|-----------|-------------|
| Identificação por `User().Email` e Entra Object ID | docs/05 §1 (`gblEmail`, `gblObjectId` via `Office365Users`) |
| Perfis Gestor/Criador/Solucionador | `Solucionadores.Perfil` + guardas de UI (docs/03, docs/05) |
| Solucionadores editáveis (add/renomear/desativar) | docs/05 §2.4 (nunca excluir com histórico) |
| Popup com nome, responsável, checklist, prazo, obs., histórico, anexos, ações | docs/05 §3 |
| Dependência exibe "Aguardando etapa anterior" | docs/04 §1, docs/05 §2.3 |
| Modo de liberação (evidência × validação do gestor) | `ModoLiberacao` (docs/02, docs/04 §4.1) |
| Ações rejeitadas mantêm próximas bloqueadas | docs/04 §4.3 |
| Notificações: atribuída/liberada/vencimento/atraso/validação/rejeição/encerramento | docs/06 F1–F5 + `Notificacoes` |
| Modelos reutilizáveis e recorrentes | `ModelosDeProcesso.Recorrente` (docs/02); materialização (docs/01 §4) |
| Data de referência D+0 | `Tarefas.DataReferencia` (docs/02, docs/05 §6.2) |
| Segurança além do filtro do app | Grupos + permissões SharePoint + F6 (docs/03, docs/06) |
| Design calmo (azul-gelo/rosa-pó, SF/Segoe UI, farol) | docs/07 |

## Roteiro de teste de aceite (E2E)

1. **Modelo → Tarefa:** criar "Admissão de João Silva" pelo modelo Admissão;
   preencher Nome/CPF/Data de admissão/Cargo/Salário/Centro de custo; D+0 = hoje.
2. **Distribuição:** conferir ações nas células dos solucionadores certos, com
   prazos calculados a partir de D+0.
3. **Execução:** solucionador inicia (Liberada→Em execução), anexa evidência, envia.
4. **Bloqueio de evidência:** tentar enviar sem anexo em ação com evidência
   obrigatória → bloqueado.
5. **Validação:** gestor valida → Encerrada; dependente é liberado e notificado.
6. **Rejeição:** gestor rejeita outra ação sem justificativa → bloqueado; com
   justificativa → Rejeitada e dependentes permanecem bloqueados.
7. **Notificações:** verificar Teams/e-mail e a central interna (`Notificacoes`).
8. **Auditoria:** abrir `HistoricoDaAcao` e conferir a trilha completa.
9. **Segurança:** logar como solucionador B e confirmar que não vê ações de A.
