# 01 — Arquitetura

## 1. Objetivo

Substituir as planilhas do Departamento Pessoal por uma aplicação que controla
**tarefas/processos** (admissão, desligamento, férias, folha, ponto), atribuídas a
**solucionadores**, com **dependências**, **prazos relativos**, **evidências
obrigatórias**, **validação do gestor** e **notificações**.

## 2. Componentes

```
                    ┌──────────────────────────────────────────────┐
                    │              Microsoft Entra ID              │
                    │   (contas corporativas, grupos de segurança) │
                    └───────────────┬──────────────────────────────┘
                                    │ User().Email / Object ID
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Power Apps Canvas ("Painel Cora")                    │
│  Telas: Login/Contexto · Painel Matricial · Popup de Ação · Criação de Tarefa │
│         Modelos · Solucionadores · Notificações                              │
└───────────────┬───────────────────────────────────────────────┬─────────────┘
                │ CRUD (conector SharePoint)                     │ dispara
                ▼                                                 ▼
┌────────────────────────────────────┐            ┌──────────────────────────────┐
│         SharePoint Online          │            │        Power Automate         │
│  10 listas + 1 biblioteca de docs  │◄───────────┤  Fluxos de notificação e     │
│  (ver docs/02)                     │  lê/grava  │  automação de permissões     │
└────────────────────────────────────┘            └───────────────┬──────────────┘
                                                                   │
                                                      ┌────────────┴───────────┐
                                                      ▼                        ▼
                                                ┌───────────┐            ┌───────────┐
                                                │  Teams    │            │  Outlook  │
                                                └───────────┘            └───────────┘
```

## 3. Fluxo de dados — visão macro

1. **Modelagem (uma vez por processo):** o gestor cria um *Modelo de Processo* com
   campos personalizados, ações, responsáveis sugeridos, prazos relativos,
   dependências, checklist e exigência de evidência.
2. **Instanciação (a cada ocorrência):** o criador escolhe um modelo, preenche os
   dados específicos (ex.: "Admissão de João Silva"), define a **data de referência
   D+0** e confirma. O app calcula as datas reais e **materializa** as ações da
   tarefa a partir das ações do modelo.
3. **Execução:** cada solucionador vê suas ações no painel matricial. Ao concluir,
   anexa evidência e **envia para validação** (não encerra sozinho).
4. **Validação:** o gestor valida (encerra) ou rejeita (justificativa obrigatória).
   A liberação da próxima etapa depende do **modo de liberação** configurado.
5. **Notificação:** cada transição relevante dispara Power Automate → Teams/e-mail e
   grava um item na lista *Notificações*.
6. **Auditoria:** cada transição grava um item em *Histórico da Ação*.

## 4. Materialização: modelo → tarefa

O modelo é um **gabarito reutilizável**. Ao instanciar:

| Origem (Modelo)        | Destino (Tarefa)                 | Transformação |
|------------------------|----------------------------------|---------------|
| `CamposDeModelo`       | `DadosDaTarefa`                  | Cria uma linha por campo; valor preenchido pelo criador |
| `AcoesDeModelo`        | `AcoesDaTarefa`                  | Copia nome, checklist, evidência obrigatória, modo de liberação |
| `PrazoRelativo` (dias) | `PrazoCalculado` (data)          | `DataReferencia + PrazoRelativo` |
| `Dependencia` (ordem)  | `Dependencia` (ID da ação-tarefa)| Reamarra a dependência para o ID materializado |
| `ResponsavelSugerido`  | `Solucionador`                   | Copiado, mas **editável** antes de distribuir |

> **Decisão-chave:** as ações da tarefa são **cópias independentes** das ações do
> modelo. Editar um modelo depois **não** altera tarefas já criadas. Isso preserva a
> auditoria e permite ajustes por ocorrência.

## 5. Decisões de design

| Decisão | Justificativa |
|---------|---------------|
| Sem Dataverse | Restrição do projeto; SharePoint atende ao volume do DP |
| Ações da tarefa desnormalizadas (checklist/evidência copiados) | Evita depender do modelo mutável; auditoria estável |
| Estado do checklist em JSON (`ChecklistEstado`) | Evita uma lista extra "item de checklist"; simples de ler no Power Fx |
| Liberação padrão = **após validação do gestor** | Requisito do DP; processos urgentes podem usar "após evidência" |
| Dependência como *lookup* para a própria lista | Modela cadeia A→B→C sem tabela de junção |
| Notificações também gravadas em lista | Central de avisos dentro do app, não só push externo |
| Segurança em SharePoint + grupos, não só filtros Power Fx | Filtro de app não é controle de acesso (ver docs/03) |

## 6. Limites e cuidados

- **Delegação:** o conector SharePoint delega um subconjunto do Power Fx. Modelar
  filtros para serem delegáveis (ver docs/05, seção "Delegação").
- **Concorrência de validação:** dois gestores validando a mesma ação — usar
  `Patch` com releitura do status atual antes de encerrar.
- **Permissão de item** para dados sensíveis do DP: automação via Power Automate
  (ver docs/03 e docs/06), pois o Power Apps não quebra herança sozinho.
- **Object ID do Entra:** capturado via `Office365Users` na abertura (ver docs/05).
