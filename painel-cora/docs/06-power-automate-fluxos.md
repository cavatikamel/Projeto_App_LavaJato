# 06 — Power Automate (fluxos)

Especificação dos *cloud flows*. Cada fluxo tem: **gatilho**, **entradas**,
**passos** e **saídas**. Reconstrua no designer; pseudocódigo em
[`../power-automate/`](../power-automate/).

Notificar por **Teams** e/ou **e-mail (Outlook)** e **sempre** gravar um item em
`Notificacoes` para a central interna do app.

> **Modelo unificado (v2).** A lista operacional é **`ItensDaTarefa`** (não mais
> `AcoesDaTarefa`); o status terminal de uma ação é **`Concluída`** (`Encerrada`
> ficou só para a *tarefa*). Responsável é **múltiplo** (`Responsaveis`, Person
> multi) + flag `Livre` — ao notificar, percorra todos (exceto quando `Livre`).
> Não há mais `ModoLiberacao`: a dependência libera quando **todas** as
> predecessoras estão `Concluída`.
>
> **Piloto:** com a segurança simplificada, **F6 fica desligado**. Já **F8**
> (exportar Excel) entra no piloto.

## Visão geral dos fluxos

| # | Fluxo | Gatilho | Para quê |
|---|-------|---------|----------|
| F1 | `Cora - Acao atribuida` | Item criado em `ItensDaTarefa` (com responsável) | Avisar os responsáveis |
| F2 | `Cora - Dependente liberada` | Item modificado: `Status`→`Liberada` | Avisar próximos responsáveis |
| F3 | `Cora - Enviada para validacao` | Item modificado: `Status`→`Enviada para validação` | Avisar o gestor |
| F4 | `Cora - Decisao do gestor` | Item modificado: `Status`→`Concluída`/`Rejeitada` | Avisar os responsáveis |
| F5 | `Cora - Vencimento e atraso` | Agendado (diário) | Avisar próximas do vencimento e atrasadas |
| F6 | `Cora - Ajustar permissoes` | Item criado/modificado em `ItensDaTarefa` e `Evidencias` | Quebra de herança (segurança) — **pós-piloto** |
| F7 | `Cora - Notificar (instantaneo)` | Chamado pelo Power Apps (`.Run`) | Notificação sob demanda a partir do app |
| F8 | `Cora - Exportar Excel` | Chamado pelo Power Apps (`.Run`) | Gerar a planilha do painel/arquivo |

---

## Padrão comum: "Notificar destinatário"

Sub-rotina lógica reutilizada por F1–F5 e F7:

```
ENTRADAS: destinatarioEmail, tipo, mensagem, idItem
PASSOS:
  1. Criar item em 'Notificacoes':
       Destinatario  = destinatarioEmail
       Item          = idItem
       Tipo          = tipo
       Mensagem      = mensagem    (traz título + subtítulo da tarefa e a etapa)
       Lida          = false
       DataHora      = utcNow()
  2. Postar no Teams (chat 1:1 via 'Post message in a chat or channel',
       recipient = destinatarioEmail) com 'mensagem' + link deep-link do app.
  3. (Opcional) Enviar e-mail (Outlook 'Send an email V2') com o mesmo conteúdo.
```

> **Multi-responsável:** `ItensDaTarefa.Responsaveis` é *Person múltiplo*. Nos fluxos
> que avisam "o responsável", faça **Apply to each** sobre `Responsaveis` e chame o
> padrão acima para cada e-mail. **Não** notifique quando `Livre = Sim` (ação aberta
> a todos) — nesse caso, o aviso é opcional e vai só ao gestor/criador.

> **Anti-duplicidade:** F1–F4 disparam a partir do SharePoint; se o app também
> chamar F7 para a mesma transição, use uma coluna de controle
> (`UltimaNotificacaoTipo`) ou escolha **um** caminho por evento. Recomendado:
> deixar as transições de status a cargo de F2/F3/F4 (SharePoint) e usar F7 só para
> avisos que não correspondem a mudança de status (ex.: item recém-atribuído em
> lote).

---

## F1 — `Cora - Acao atribuida`

- **Gatilho:** *When an item is created* em `ItensDaTarefa`.
- **Condição:** item é **ação** (`Responsaveis` não vazio) e `Status` ∈
  {`Liberada`, `Aguardando dependência`}. Ignorar *dados* (`Status = Dado`) e `Livre`.
- **Passos:** *Apply to each* em `Responsaveis`:
  1. Se `Status = Liberada`: Notificar tipo `Atribuída` —
     "Você recebeu a ação '{Title}' na tarefa '{Tarefa} — {Subtitulo}'. Prazo: {PrazoCalculado}."
  2. Se `Status = Aguardando dependência`: Notificar tipo `Atribuída` com aviso
     "aguardando etapa anterior".

## F2 — `Cora - Dependente liberada`

- **Gatilho:** *When an item is created or modified* em `ItensDaTarefa`.
- **Disparar somente na virada de status** — *trigger condition*:
  `@equals(triggerBody()?['Status']?['Value'], 'Liberada')`
  combinado com *Get changes for an item* (`HasColumnChanged('Status')`). Evita reprocessar.
- **Passos:** *Apply to each* em `Responsaveis`, tipo `Liberada`:
  "A etapa anterior foi concluída. Sua ação '{Title}' está liberada."

## F3 — `Cora - Enviada para validacao`

- **Gatilho:** modificação com `Status = Enviada para validação`.
- **Destinatário:** `GestorResponsavel` da `Tarefa` (*Get item* da tarefa).
- **Mensagem:** "A ação '{Title}' ({Tarefa} — {Subtitulo}) foi enviada para validação.
  Evidências anexadas: {contagem}."
- Tipo `Enviada p/ validação`.

## F4 — `Cora - Decisao do gestor`

- **Gatilho:** modificação com `Status` ∈ {`Concluída`, `Rejeitada`}.
- **Passos:** *Apply to each* em `Responsaveis`:
  - `Concluída`: tipo `Concluída` — "Sua ação '{Title}' foi validada e concluída."
  - `Rejeitada`: tipo `Reprovada` — inclui `Justificativa`.
- **Reforço de dependência** (se `Concluída`): buscar itens cuja `Dependencias`
  contenha este ID e `Status = Aguardando dependência`; para cada, se **todas** as
  suas dependências estão `Concluída`, atualizar para `Liberada` (idempotente com a
  lógica do app). Não há `ModoLiberacao` — a regra é única.

## F5 — `Cora - Vencimento e atraso` (agendado)

- **Gatilho:** *Recurrence* diário (ex.: 08:00, dias úteis).
- **Passos:**
  1. `Get items` de `ItensDaTarefa` com `Status` em
     {`Liberada`, `Em execução`} (filtro OData; usar colunas indexadas).
  2. Para cada, *Apply to each* em `Responsaveis`:
     - **Próxima do vencimento:** `PrazoCalculado` entre hoje e hoje+1 dia →
       tipo `Próxima do vencimento`.
     - **Atrasada:** `PrazoCalculado` < hoje → tipo `Atrasada`.
  3. Evitar spam: gravar `UltimoAvisoVencimento`/`UltimoAvisoAtraso` (data) no item
     e só notificar se ainda não avisou hoje.

> Filtro OData exemplo (atraso):
> `PrazoCalculado lt '@{utcNow()}' and (Status eq 'Liberada' or Status eq 'Em execução')`

## F6 — `Cora - Ajustar permissoes` (segurança) — **pós-piloto**

> **No piloto, F6 fica desligado** (segurança simplificada — docs/03). Esta seção
> descreve a evolução para segurança por item, quando o piloto for aprovado.

Quebra a herança do item e concede acesso mínimo. Com **múltiplos responsáveis**, o
`Apply to each` concede acesso a **cada** um; se `Livre = Sim`, conceder ao grupo de
solucionadores em vez de a pessoas específicas.

- **Gatilho:** item criado/modificado em `ItensDaTarefa` (e um gêmeo para `Evidencias`).
- **Passos (via ação HTTP "Send an HTTP request to SharePoint"):**
  1. `POST .../items(ID)/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)`
  2. Resolver `principalid` para **cada** `Responsaveis` (via
     `.../web/siteusers(@v)?@v='i:0%23.f|membership|{email}'`), o grupo
     `SG-Cora-Gestores` e o `GestorResponsavel`.
  3. `POST .../items(ID)/roleassignments/addroleassignment(principalid={pid},roledefid={Contribute=1073741827})`
     — Gestores/Grupo Gestores: **Controle total** (`1073741829`).
  4. Em reatribuição: `removeroleassignment` dos responsáveis anteriores que saíram.
- **IDs de role definition padrão:** Leitura `1073741826`, Contribuir `1073741827`,
  Edição `1073741830`, Controle total `1073741829` (confirmar no seu site).

## F7 — `Cora - Notificar (instantaneo)`

- **Gatilho:** *PowerApps (V2)*.
- **Entradas (do app):** `idItem` (número), `tipo` (texto), `destinatarioEmail`
  (texto), `mensagem` (texto).
- **Passos:** executa o padrão comum "Notificar destinatário". Para uma ação com
  vários responsáveis, o app chama uma vez por responsável (ou passa a lista e o
  fluxo faz *Apply to each*).
- **Chamada no app:** `CoraNotificar.Run(gblAcao.ID; "Atribuída"; email; "texto")`.

---

## F8 — `Cora - Exportar Excel`

Reproduz a exportação do protótipo: uma **linha por tarefa**; **colunas = ação ×
responsável**; células com a **data de conclusão** (dd/mm/aaaa), exceto campos de
texto/observações (que trazem o próprio conteúdo). O usuário atua com filtro no
Excel — por isso a planilha "mistura" tarefas diferentes numa grade única.

- **Gatilho:** *PowerApps (V2)*.
- **Entradas (do app):** `escopo` (texto: `painel` ou `arquivo`), `payload` (texto
  JSON com as tarefas visíveis já filtradas no app — evita relê-las e respeita a
  busca/filtro atual).
- **Passos (opção recomendada — Office Script):**
  1. `Get file content` de um **modelo .xlsx** vazio no SharePoint/OneDrive.
  2. Ação **Excel Online (Business) → Run script**: um Office Script recebe o
     `payload`, monta o cabeçalho dinâmico (Tarefa, Subtítulo, Situação, Data de
     referência, + uma coluna por ação×responsável) e as linhas, e aplica
     `AutoFilter`.
  3. `Create file` numa pasta temporária e retornar o **link**/conteúdo ao app.
- **Alternativa sem Office Script:** montar um **CSV** (concatenando strings) e
  `Create file` `.csv`; abre no Excel, porém sem autofiltro pré-aplicado.
- **Chamada no app:** `CoraExportar.Run("painel"; JSON(colTarefasFiltradas))` e
  então abrir o link retornado com `Launch(...)`.

> Como o Power Apps não baixa arquivos direto do cliente, a geração fica no fluxo
> e o app só abre o arquivo resultante — diferente do protótipo, que usa uma
> biblioteca JS no navegador.

---

## Boas práticas

- **Trigger conditions** para não reprocessar (só rodar na virada de status certa).
- **Concurrency control**: para F6, limitar a 1 execução paralela por item evita
  corrida na quebra de herança.
- **Tratamento de erro**: configurar *Configure run after* + escopo Try/Catch;
  em falha, registrar em uma lista `LogFluxos` (opcional) e alertar admin.
- **Fuso**: usar `convertFromUtc(utcNow(),'E. South America Standard Time')` ao
  formatar datas para o usuário.
