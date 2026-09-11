# 08 — Guia de implementação (passo a passo)

Ordem recomendada de construção para levar o **piloto** ao ar. Cada etapa
referencia o documento detalhado.

> **Decisões do piloto**
> - **Segurança simplificada:** todo o time do DP no piloto enxerga todas as
>   tarefas/ações. Dispensa a conta de serviço e o fluxo F6 (permissão por item),
>   que entram só depois do piloto.
> - **Exportação por fluxo:** o botão "Exportar Excel" chama um fluxo do Power
>   Automate (F8) que monta a planilha e devolve o arquivo.
> - **Modelo de dados unificado (v2):** campos e ações numa única lista ordenada
>   de itens (docs/02).

## Fase 0 — Pré-requisitos

- [ ] Licenças Power Apps/Power Automate para os usuários do piloto (per-app plan serve).
- [ ] Permissão para criar **site SharePoint** e **grupos do Entra**.
- [ ] Lista dos **usuários-piloto** com o perfil de cada um (Gestor/Criador/Solucionador).

## Fase 1 — SharePoint (dados)

1. [ ] Criar site de equipe `/sites/PainelCora`.
2. [ ] Provisionar as **8 listas** + biblioteca `Evidencias` com
       [`../provisioning/`](../provisioning/) (docs/02, modelo unificado v2).
3. [ ] Conferir tipos de coluna, escolhas (`Choice`) exatas, colunas **Person
       múltiplas** (`Responsaveis`) e **lookup múltiplo** (`Dependencias`), e **índices**.
4. [ ] Popular `Solucionadores` com o time do DP (Nome, Email, Perfil, Ativo, Avatar).
5. [ ] (Opcional) Popular `ModelosDeProcesso` + `ItensDeModelo` iniciais
       (ex.: Admissão, Desligamento) — ver [`../provisioning/seed-modelos-exemplo.md`](../provisioning/seed-modelos-exemplo.md).
       Também dá para criar tudo do zero pela tela **Tarefas** do app.

## Fase 2 — Segurança (piloto: simplificada)

6. [ ] Criar grupos do Entra `SG-Cora-Gestores/Criadores/Solucionadores` (docs/03 §1).
7. [ ] Dar aos grupos acesso de **Contribuir** no site (sem quebrar herança por item).
8. [ ] A distinção de perfis (quem cria, quem valida) é feita **no app** por
       `Solucionadores.Perfil` — não por permissão de lista, no piloto.

> A segurança por item (cada solucionador só vê o que é dele) via fluxo F6 fica
> planejada em docs/03/06 para depois do piloto.

## Fase 3 — App (Power Apps Canvas)

9.  [ ] Novo app Canvas; adicionar as fontes: as 8 listas + `Office365Users`.
10. [ ] `App.OnStart`: identidade, perfil, tema (docs/05 §1).
11. [ ] Tela **Painel matricial** — tarefa × solucionador, com avatares/foto (docs/05 §2).
12. [ ] **Popup de ação**: campos por tipo (Texto/Número/Data/Check/Observações/Evidência),
        múltiplos responsáveis, visível-a-todos, transições (docs/05 §3–4).
13. [ ] Liberação de dependentes (todas as predecessoras concluídas) (docs/05 §5).
14. [ ] Tela **Tarefas** (cadastro de modelos): criar/editar/duplicar/desativar (docs/05 §6).
15. [ ] Tela **Criar tarefa**: do zero ou a partir de modelo; materialização modelo→tarefa.
16. [ ] Tela **Arquivo** (tarefas encerradas/canceladas) com busca e filtro.
17. [ ] Busca e filtro no Painel e no Arquivo (por texto, situação, solucionador).
18. [ ] Tela **Notificações** internas.
19. [ ] **Cadastro próprio**: o solucionador edita nome, e-mail, cargo e avatar;
        o resto é somente leitura (só o gestor altera).
20. [ ] **Foto:** `Office365Users.UserPhotoV2(Email)` com *fallback* para o avatar
        (`Solucionadores.Avatar`) e, na ausência, **iniciais**.
21. [ ] Aplicar guia visual (docs/07): logo, verde-floresta `#005B4F`, âmbar `#FFB51B`.

## Fase 4 — Power Automate (automação)

22. [ ] F7 `Cora - Notificar (instantaneo)` — usado pelo app; criar primeiro (docs/06 F7).
23. [ ] F1–F4 (atribuição, liberação, envio, decisão) com *trigger conditions*.
24. [ ] F5 vencimento/atraso (agendado).
25. [ ] **F8 `Cora - Exportar Excel`** — recebe o escopo (painel/arquivo), monta a
        planilha (uma linha por tarefa; colunas = ação × responsável; só datas de
        conclusão, exceto textos) e devolve o arquivo (docs/06 F8).
26. [ ] Conectar `CoraNotificar.Run(...)` e `CoraExportar.Run(...)` no app.

> F6 (ajuste de permissões por item) fica fora do piloto.

## Fase 5 — Testes

27. [ ] Criar uma tarefa (ex.: **Admissão**) do zero e a partir de modelo; conferir
        datas calculadas (D-3, D+0, D+1…) e distribuição por responsável.
28. [ ] Percorrer a máquina de estados (docs/04): Liberada → Em execução →
        Enviada → **Concluída**; e um caminho de **Rejeição** com reabertura.
29. [ ] **Multi-responsável:** um responsável inicia e **outro** conclui; o **gestor**
        inicia/conclui ação de qualquer um; ação **Livre** executável por qualquer um.
30. [ ] Testar **dependência** múltipla (só libera após todas as predecessoras concluídas).
31. [ ] Testar **evidência obrigatória** bloqueando o envio; **justificativa** na rejeição.
32. [ ] Conclusão de todos os designados → tarefa **Finalizada**; conferência do
        gestor → **Encerrada** → some do painel e vai para o **Arquivo**.
33. [ ] **Cancelar** tarefa (gestor), inclusive não iniciada; conferir Arquivo.
34. [ ] Conferir **histórico** completo e **notificações** (com título, subtítulo e etapa).
35. [ ] Testar **desativar solucionador**: ações dele ficam **livres**.
36. [ ] **Exportar Excel** do painel e do arquivo (F8); validar o formato "misturando" tarefas.

## Fase 6 — Publicação e operação

37. [ ] Compartilhar o app com os grupos do Entra (não com usuários avulsos).
38. [ ] Compartilhar os fluxos (co-owners) e validar as conexões.
39. [ ] Publicar; fixar no Teams (aba) se desejado.
40. [ ] Documentar para o DP: como criar tarefa, como executar, como validar.

## Rollback / manutenção

- Modelos são versionáveis por convenção (duplicar e marcar o antigo `Ativo = Não`).
- Nunca excluir itens de `HistoricoDaAcao`.
- Alterar um modelo **não** afeta tarefas já criadas (cópias independentes).
- Pós-piloto: habilitar segurança por item (docs/03/06 F6) e revisar licenciamento.
