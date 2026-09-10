# 08 — Guia de implementação (passo a passo)

Ordem recomendada de construção. Cada etapa referencia o documento detalhado.

## Fase 0 — Pré-requisitos

- [ ] Licenças Power Apps/Power Automate para os usuários (por app ou por usuário).
- [ ] Permissão para criar **site SharePoint** e **grupos do Entra**.
- [ ] Conta de serviço (ou app registration) para os fluxos que ajustam permissões
      via HTTP ao SharePoint (F6).

## Fase 1 — SharePoint (dados)

1. [ ] Criar site de equipe `/sites/PainelCora` (docs/03 §2).
2. [ ] Provisionar as 10 listas + biblioteca `Evidencias` com
       [`../provisioning/`](../provisioning/) (docs/02).
3. [ ] Conferir tipos de coluna, escolhas (`Choice`) exatas e **índices**.
4. [ ] Popular `Solucionadores` com o time do DP (Nome, Email, Perfil, Ativo).
5. [ ] Popular `ModelosDeProcesso` iniciais: Admissão, Desligamento, Férias,
       Fechamento de folha (Recorrente = Sim onde couber).
6. [ ] Para cada modelo, cadastrar `CamposDeModelo` e `AcoesDeModelo`
       (responsável sugerido, prazo relativo, dependência por `Ordem`, checklist,
       evidência obrigatória, modo de liberação).

## Fase 2 — Segurança

7. [ ] Criar grupos do Entra `SG-Cora-Gestores/Criadores/Solucionadores` (docs/03 §1).
8. [ ] Quebrar herança do site; aplicar permissões por lista (docs/03 §2).
9. [ ] Testar acesso: um solucionador **não** deve enxergar dados de outro.

## Fase 3 — App (Power Apps Canvas)

10. [ ] Novo app Canvas; adicionar as fontes de dados (todas as listas +
        `Office365Users`).
11. [ ] `App.OnStart`: identidade, perfil, tema (docs/05 §1).
12. [ ] Tela **Painel matricial** (docs/05 §2).
13. [ ] **Popup de ação** com seções e checklist JSON (docs/05 §3).
14. [ ] Botões de transição com guardas (docs/05 §4) + liberação de dependentes
        (docs/05 §5).
15. [ ] Tela **Solucionadores** (adicionar/renomear/desativar) (docs/05 §2.4).
16. [ ] Tela **Criar tarefa** com materialização modelo→tarefa (docs/05 §6).
17. [ ] Tela **Notificações** internas (docs/05 §7).
18. [ ] Aplicar guia visual (docs/07).

## Fase 4 — Power Automate (automação)

19. [ ] F7 `Cora - Notificar (instantaneo)` — usado pelo app; criar primeiro para
        referenciar no Power Apps (docs/06 F7).
20. [ ] F1–F4 (atribuição, liberação, envio, decisão) com *trigger conditions*.
21. [ ] F5 vencimento/atraso (agendado).
22. [ ] F6 ajuste de permissões (segurança) — testar reatribuição.
23. [ ] Conectar `CoraNotificar.Run(...)` nas transições do app onde aplicável.

## Fase 5 — Testes

24. [ ] Criar uma tarefa de **Admissão** a partir do modelo; conferir datas
        calculadas (D-3, D+0, D+1…) e distribuição.
25. [ ] Percorrer a máquina de estados de ponta a ponta (docs/04):
        Liberada → Em execução → Enviada → Encerrada; e um caminho de Rejeição.
26. [ ] Testar **dependência**: B só libera após validação de A (padrão);
        e um caso `AposEvidencia`.
27. [ ] Testar **evidência obrigatória** bloqueando o envio.
28. [ ] Testar **justificativa obrigatória** na rejeição.
29. [ ] Conferir **histórico** completo e **notificações** (Teams/e-mail + lista).
30. [ ] Validar isolamento de permissões (docs/03 checklist).

## Fase 6 — Publicação e operação

31. [ ] Compartilhar o app com os grupos do Entra (não com usuários avulsos).
32. [ ] Compartilhar os fluxos (co-owners) e validar as conexões.
33. [ ] Publicar; fixar no Teams (aba) se desejado.
34. [ ] Documentar para o DP: como criar tarefa, como executar, como validar.

## Rollback / manutenção

- Modelos são versionáveis por convenção (duplicar e marcar o antigo `Ativo = Não`).
- Nunca excluir itens de `HistoricoDaAcao`.
- Alterar um modelo **não** afeta tarefas já criadas (cópias independentes).
