# Power Automate — definições dos fluxos

Pseudocódigo e expressões prontas para reconstruir os fluxos no designer.
Especificação narrada em [`../docs/06-power-automate-fluxos.md`](../docs/06-power-automate-fluxos.md).

Como o Power Automate não versiona bem em texto, aqui ficam as **expressões**,
**trigger conditions** e **corpos de request** — as partes que valem copiar/colar.

---

## Trigger conditions (para não reprocessar)

Cole em *Settings → Trigger Conditions* do gatilho do SharePoint.

```
# F2 — só quando virou "Liberada"
@equals(triggerBody()?['Status']?['Value'], 'Liberada')

# F3 — só quando virou "Enviada para validação"
@equals(triggerBody()?['Status']?['Value'], 'Enviada para validação')

# F4 — só quando virou "Encerrada" OU "Rejeitada"
@or(equals(triggerBody()?['Status']?['Value'],'Encerrada'),equals(triggerBody()?['Status']?['Value'],'Rejeitada'))
```

> Para distinguir a **virada** do valor (e não qualquer edição), combine com a ação
> *Get changes for an item or a file* e teste `HasColumnChanged('Status')`.

---

## Padrão comum "Notificar destinatário" (usado por F1–F5, F7)

```
# 1) Criar item em Notificacoes
Site:  <site do Painel Cora>
List:  Notificacoes
Fields:
  Destinatario Claims = concat('i:0#.f|membership|', <emailDestinatario>)
  Acao (lookup id)    = <idAcao>
  Tipo                = <tipo>
  Mensagem            = <mensagem>
  Lida                = false
  DataHora            = utcNow()

# 2) Teams (Post message in a chat or channel)
Post as:   Flow bot
Post in:   Chat with Flow bot  (Recipient = <emailDestinatario>)
Message:   <mensagem> + '  •  Abrir no app: <deep-link>'

# 3) (Opcional) Outlook - Send an email (V2)
To:        <emailDestinatario>
Subject:   concat('[Painel Cora] ', <tipo>)
Body:      <mensagem>
```

Deep-link do app:
`https://apps.powerapps.com/play/<AppId>?tenantId=<Tid>&acao=<idAcao>` — e no
`App.OnStart` tratar `Param("acao")` para abrir o popup correspondente.

---

## F5 — Vencimento e atraso (agendado)

```
Recurrence: Frequency=Day, Interval=1, Hora=08:00, Fuso=E. South America Standard Time

Get items (AcoesDaTarefa) — Filter Query (OData):
  (Status eq 'Liberada' or Status eq 'Em execução')

Apply to each item:
  proximo = and(
      greaterOrEquals(item()?['PrazoCalculado'], utcNow()),
      less(item()?['PrazoCalculado'], addDays(utcNow(),1))
  )
  atrasada = less(item()?['PrazoCalculado'], utcNow())

  if proximo  -> Notificar(item.Solucionador.Email, 'Próxima do vencimento', ...)
  if atrasada -> Notificar(item.Solucionador.Email, 'Atrasada', ...)

  # anti-spam: gravar UltimoAviso = utcNow() e checar no início do laço
```

---

## F6 — Ajustar permissões (segurança) — requests SharePoint

Ação **Send an HTTP request to SharePoint** (site do Painel Cora).

```
# 1) Quebrar herança do item
Method: POST
Uri:    _api/web/lists/getbytitle('AcoesDaTarefa')/items(@{triggerBody()?['ID']})/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)

# 2) Resolver principalId de um e-mail (ensure user)
Method: POST
Uri:    _api/web/ensureuser
Body:   { "logonName": "i:0#.f|membership|@{variables('emailSolucionador')}" }
=> guardar d.Id como principalId

# 3) Conceder Contribuir (1073741827) ao solucionador
Method: POST
Uri:    _api/web/lists/getbytitle('AcoesDaTarefa')/items(@{triggerBody()?['ID']})/roleassignments/addroleassignment(principalid=@{variables('principalId')},roledefid=1073741827)

# 4) Conceder Controle total (1073741829) ao grupo de Gestores
#    (obter o principalId do grupo via _api/web/sitegroups/getbyname('SG-Cora-Gestores'))
```

Role definition IDs padrão (confirmar no site):
`Leitura=1073741826`, `Contribuir=1073741827`, `Edição=1073741830`,
`Controle total=1073741829`.

Repetir o gêmeo do fluxo para a biblioteca **Evidencias** amarrando pelo
`AcaoDaTarefa` → mesmo solucionador/gestores.

---

## F7 — Notificar (instantâneo, chamado pelo app)

```
Trigger: PowerApps (V2)
Inputs:
  idAcao (number)
  tipo (text)
  destinatarioEmail (text)
  mensagem (text)
Steps: padrão comum "Notificar destinatário"
```

Chamada no Power Apps:
```powerfx
CoraNotificar.Run(gblAcao.ID; "Atribuída"; email; "Você recebeu uma nova ação.")
```
