# 06 — Power Automate (fluxos)

Especificação dos *cloud flows*. Cada fluxo tem: **gatilho**, **entradas**,
**passos** e **saídas**. Reconstrua no designer; pseudocódigo em
[`../power-automate/`](../power-automate/).

Notificar por **Teams** e/ou **e-mail (Outlook)** e **sempre** gravar um item em
`Notificacoes` para a central interna do app.

## Visão geral dos fluxos

| # | Fluxo | Gatilho | Para quê |
|---|-------|---------|----------|
| F1 | `Cora - Acao atribuida` | Item criado em `AcoesDaTarefa` | Avisar o solucionador |
| F2 | `Cora - Dependente liberada` | Item modificado: `Status`→`Liberada` | Avisar próximo solucionador |
| F3 | `Cora - Enviada para validacao` | Item modificado: `Status`→`Enviada para validação` | Avisar o gestor |
| F4 | `Cora - Decisao do gestor` | Item modificado: `Status`→`Encerrada`/`Rejeitada` | Avisar o solucionador |
| F5 | `Cora - Vencimento e atraso` | Agendado (diário) | Avisar próximas do vencimento e atrasadas |
| F6 | `Cora - Ajustar permissoes` | Item criado/modificado em `AcoesDaTarefa` e `Evidencias` | Quebra de herança (segurança) |
| F7 | `Cora - Notificar (instantaneo)` | Chamado pelo Power Apps (`.Run`) | Notificação sob demanda a partir do app |

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

## Boas práticas

- **Trigger conditions** para não reprocessar (só rodar na virada de status certa).
- **Concurrency control**: para F6, limitar a 1 execução paralela por item evita
  corrida na quebra de herança.
- **Tratamento de erro**: configurar *Configure run after* + escopo Try/Catch;
  em falha, registrar em uma lista `LogFluxos` (opcional) e alertar admin.
- **Fuso**: usar `convertFromUtc(utcNow(),'E. South America Standard Time')` ao
  formatar datas para o usuário.
