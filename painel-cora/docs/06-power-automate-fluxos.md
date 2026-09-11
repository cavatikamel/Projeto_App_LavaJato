# 06 — Power Automate (fluxos)

Especificação dos *cloud flows*. Cada fluxo tem: **gatilho**, **entradas**,
**passos** e **saídas**. Reconstrua no designer; pseudocódigo em
[`../power-automate/`](../power-automate/).

Notificar por **Teams** e/ou **e-mail (Outlook)** e **sempre** gravar um item em
`Notificacoes` para a central interna do app.

> **Modelo unificado (v2).** A lista operacional agora é **`ItensDaTarefa`**
> (não mais `AcoesDaTarefa`); o status terminal de uma ação é **`Concluída`**
> (não `Encerrada` — esse nome ficou só para a *tarefa*). Responsável agora é
> **múltiplo** (`Responsaveis`, Person multi) + flag `Livre`; ao notificar,
> percorra todos os responsáveis (exceto quando `Livre`). Ajuste as *trigger
> conditions* e os nomes de coluna abaixo conforme docs/02.
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
ENTRADAS: destinatarioEmail, tipo, mensagem, idAcao
PASSOS:
  1. Criar item em 'Notificacoes':
       Destinatario  = destinatarioEmail
       Acao          = idAcao
       Tipo          = tipo
       Mensagem      = mensagem
       Lida          = false
       DataHora      = utcNow()
  2. Postar no Teams (chat 1:1 via 'Post message in a chat or channel',
       recipient = destinatarioEmail) com 'mensagem' + link deep-link do app.
  3. (Opcional) Enviar e-mail (Outlook 'Send an email V2') com o mesmo conteúdo.
```

> **Anti-duplicidade:** F1–F4 disparam a partir do SharePoint; se o app também
> chamar F7 para a mesma transição, use uma coluna de controle
> (`UltimaNotificacaoTipo`) ou escolha **um** caminho por evento. Recomendado:
> deixar as transições de status a cargo de F2/F3/F4 (SharePoint) e usar F7 só para
> avisos que não correspondem a mudança de status (ex.: ação recém-atribuída em
> lote).

---

## F1 — `Cora - Acao atribuida`

- **Gatilho:** *When an item is created* em `AcoesDaTarefa`.
- **Condição:** `Status` = `Liberada` **ou** `Aguardando dependência` (recém-criada).
- **Passos:**
  1. Obter e-mail do `Solucionador` (campo Person → Email).
  2. Se `Status = Liberada`: Notificar tipo `Atribuída`, mensagem
     "Você recebeu a ação '{Title}' na tarefa '{Tarefa}'. Prazo: {PrazoCalculado}."
  3. Se `Status = Aguardando dependência`: Notificar tipo `Atribuída` com aviso
     "aguardando etapa anterior".

## F2 — `Cora - Dependente liberada`

- **Gatilho:** *When an item is created or modified* em `AcoesDaTarefa`.
- **Disparar somente na virada de status** — use *trigger condition*:
  `@equals(triggerBody()?['Status']?['Value'], 'Liberada')`
  e compare com o valor anterior (guardar `StatusAnterior` ou usar
  *Get changes for an item*). Evita reprocessar.
- **Passos:** Notificar `Solucionador` da ação, tipo `Liberada`:
  "A etapa anterior foi concluída. Sua ação '{Title}' está liberada."

## F3 — `Cora - Enviada para validacao`

- **Gatilho:** modificação com `Status = Enviada para validação`.
- **Destinatário:** `GestorResponsavel` da `Tarefa` (fazer *Get item* da tarefa).
- **Mensagem:** "A ação '{Title}' foi enviada para validação por
  {Solucionador}. Evidências anexadas: {contagem}."
- Tipo `Enviada p/ validação`.

## F4 — `Cora - Decisao do gestor`

- **Gatilho:** modificação com `Status` ∈ {`Encerrada`, `Rejeitada`}.
- **Passos:**
  - `Encerrada`: Notificar `Solucionador`, tipo `Encerrada` — "Sua ação foi validada
    e encerrada."
  - `Rejeitada`: Notificar `Solucionador`, tipo `Rejeitada` — inclui `Justificativa`.
  - (Reforço de dependência) Se `Encerrada`, buscar ações com `Dependencia = ID` e
    `Status = Aguardando dependência` e `ModoLiberacao = AposValidacaoGestor`;
    atualizar para `Liberada` (idempotente com a lógica do app).

## F5 — `Cora - Vencimento e atraso` (agendado)

- **Gatilho:** *Recurrence* diário (ex.: 08:00, dias úteis).
- **Passos:**
  1. `Get items` de `AcoesDaTarefa` com `Status` em
     {`Liberada`, `Em execução`} (filtro OData; usar colunas indexadas).
  2. Para cada:
     - **Próxima do vencimento:** `PrazoCalculado` entre hoje e hoje+1 dia →
       Notificar tipo `Próxima do vencimento`.
     - **Atrasada:** `PrazoCalculado` < hoje → Notificar tipo `Atrasada`.
  3. Evitar spam: gravar `UltimoAvisoVencimento`/`UltimoAvisoAtraso` (data) na ação
     e só notificar se ainda não avisou hoje.

> Filtro OData exemplo (atraso):
> `PrazoCalculado lt '@{utcNow()}' and (Status eq 'Liberada' or Status eq 'Em execução')`

## F6 — `Cora - Ajustar permissoes` (segurança)

Ver docs/03 §4. Quebra a herança do item e concede acesso mínimo.

- **Gatilho:** item criado/modificado em `AcoesDaTarefa` (e um gêmeo para `Evidencias`).
- **Passos (via ação HTTP "Send an HTTP request to SharePoint"):**
  1. `POST .../items(ID)/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)`
  2. Resolver `principalid`:
     - do `Solucionador` (via `.../web/siteusers(@v)?@v='i:0%23.f|membership|{email}'`)
     - do grupo `SG-Cora-Gestores`
     - do `GestorResponsavel`
  3. `POST .../items(ID)/roleassignments/addroleassignment(principalid={pid},roledefid={Contribute=1073741827})`
     - Gestores/Grupo Gestores: `roledefid` de **Controle total** (`1073741829`).
  4. Em reatribuição: `removeroleassignment` do solucionador anterior.
- **IDs de role definition padrão:** Leitura `1073741826`, Contribuir `1073741827`,
  Edição `1073741830`, Controle total `1073741829` (confirmar no seu site).

## F7 — `Cora - Notificar (instantaneo)`

- **Gatilho:** *PowerApps (V2)*.
- **Entradas (do app):** `idAcao` (número), `tipo` (texto), `destinatarioEmail`
  (texto), `mensagem` (texto).
- **Passos:** executa o padrão comum "Notificar destinatário".
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
