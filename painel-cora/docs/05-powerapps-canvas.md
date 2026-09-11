# 05 — Power Apps Canvas (telas e Power Fx)

> **Atualizado para o modelo v2.** A fonte operacional é **`ItensDaTarefa`**
> (dados + ações). Pontos a refletir nas fórmulas:
> - **Responsável múltiplo:** `Responsaveis` é *Person multi* — use `People Picker`
>   com múltipla seleção e teste pertencimento com
>   `User().Email in Responsaveis.Email` (ou a flag `Livre`).
> - **Edição compartilhada:** habilite as ações de iniciar/concluir para
>   `User().Email in Responsaveis.Email || Livre || perfilÉGestor`.
> - **Foto:** `Office365Users.UserPhotoV2(email)` com *fallback* para
>   `Solucionadores.Avatar` e, na ausência, **iniciais**.
> - **Exportar Excel:** botão chama o fluxo **F8** (`CoraExportar.Run(...)`) e abre
>   o arquivo retornado — não há download direto no cliente (docs/06 F8).
> - **Status terminal da ação:** `Concluída` (tarefa usa `Encerrada`).

Fórmulas de referência. Ajuste nomes de controles conforme a nomenclatura do seu
app (prefixos: `scr` tela, `gal` galeria, `frm` formulário, `btn` botão, `lbl`
rótulo, `pop` popup, `col` coleção, `var`/`gbl` variável).

## 0. Fontes de dados (conector SharePoint)

Adicione todas as listas de docs/02 mais `Office365Users` (para Object ID) e o
conector do fluxo de notificação, se for chamar por `.Run(...)`.

---

## 1. Identidade e contexto — `App.OnStart` / `scrLogin`

```powerfx
// App.OnStart
Set(gblEmail; Lower(User().Email));

// Object ID do Entra via Office365Users (Graph)
Set(gblMe; Office365Users.MyProfileV2());
Set(gblObjectId; gblMe.id);

// Registro do solucionador (perfil funcional)
Set(gblSolucionador;
    LookUp(Solucionadores; Lower(Email) = gblEmail && Ativo = true)
);
Set(gblPerfil; Coalesce(gblSolucionador.Perfil.Value; "Solucionador"));

Set(gblEhGestor;   gblPerfil = "Gestor");
Set(gblEhCriador;  gblPerfil = "Criador" || gblEhGestor);
```

> Se `EntraObjectId` estiver vazio no cadastro, gravar `gblObjectId` de volta:
> `Patch(Solucionadores; gblSolucionador; { EntraObjectId: gblObjectId })`.

Cores/tema em `App.OnStart` (ver docs/07):

```powerfx
Set(gblTema; {
    fundo:      ColorValue("#F5F8FC"),  // branco azul-gelo
    cartao:     ColorValue("#FFFFFF"),
    azulGelo:   ColorValue("#DCE9F5"),
    azul:       ColorValue("#4A78B0"),
    rosaPo:     ColorValue("#F3DDE3"),
    rosa:       ColorValue("#C98CA0"),
    texto:      ColorValue("#33404F"),
    textoSuave: ColorValue("#6B7A8D")
});
```

---

## 2. Painel matricial (`scrPainel`)

Estrutura: **linhas = processos/tarefas**, **colunas = solucionadores**, célula =
card da ação daquela pessoa naquela tarefa.

### 2.1 Coleções de eixos

```powerfx
// scrPainel.OnVisible

// Colunas: solucionadores ativos (editáveis em tela própria)
ClearCollect(colColunas;
    SortByColumns(
        Filter(Solucionadores; Ativo = true);
        "Title"; SortOrder.Ascending
    )
);

// Linhas: tarefas em andamento (ou filtro do gestor)
ClearCollect(colLinhas;
    SortByColumns(
        Filter(Tarefas; StatusGeral.Value = "Em andamento");
        "DataReferencia"; SortOrder.Descending
    )
);

// Ações visíveis conforme perfil (segurança real está no SharePoint - isto é UX)
ClearCollect(colAcoes;
    If(gblEhGestor || gblEhCriador;
        Filter(AcoesDaTarefa; Tarefa.Value in colLinhas.Title);
        // solucionador vê só as próprias
        Filter(AcoesDaTarefa; Solucionador.Email = gblEmail)
    )
);
```

> **Delegação:** `in` sobre coleção local e `Filter` por `Solucionador.Email` são
> parcialmente delegáveis. Para volumes grandes, filtre por `Tarefa` (indexado) e
> traga as ações da tarefa selecionada sob demanda, em vez do dataset inteiro.

### 2.2 Grade

Use uma **Galeria vertical** (`galLinhas`, `Items = colLinhas`) e, dentro, uma
**Galeria horizontal** (`galCelulas`, `Items = colColunas`). A célula localiza a
ação do cruzamento:

```powerfx
// galCelulas: dentro de cada célula, a ação (linha × coluna)
With(
    { acao:
        LookUp(colAcoes;
            Tarefa.Id = ThisItem /* da galLinhas */.ID
            && Solucionador.Email = ThisItem /* da galCelulas: coluna */.Email
        )
    };
    /* usar 'acao' para pintar o card; se IsBlank(acao) mostrar célula vazia */
)
```

Como o Power Fx não deixa referenciar duas `ThisItem` diretamente, exponha a linha
via variável de contexto ao renderizar cada linha, ou use
`galLinhas.Selected`/campos ocultos. Padrão recomendado:

```powerfx
// Em galLinhas.OnSelect (ou num rótulo oculto por linha) guarde o ID da linha:
// lblLinhaId.Text = ThisItem.ID   (dentro de galLinhas)

// Na célula (galCelulas dentro de galLinhas), a "linha" é o pai:
With(
    { idTarefa: galLinhas.AllItems /*...*/ }; // ou lblLinhaId.Text do template
    LookUp(colAcoes;
        Tarefa.Id = Value(lblLinhaId.Text) && Solucionador.Email = ThisItem.Email
    )
)
```

### 2.3 Aparência do card (farol de status)

```powerfx
// Cor de fundo do card conforme status (ver docs/07 §farol)
Switch(varAcaoCelula.Status.Value;
    "Aguardando dependência"; ColorValue("#E7EBF0");
    "Liberada";               gblTema.azulGelo;
    "Em execução";            ColorValue("#FBF3D6");
    "Enviada para validação"; ColorValue("#ECE1F2");
    "Encerrada";              ColorValue("#DCEEDD");
    "Rejeitada";              ColorValue("#F6DADE");
    gblTema.cartao
)

// Emoji/farol
Switch(varAcaoCelula.Status.Value;
    "Aguardando dependência"; "⚪";
    "Liberada";               "🔵";
    "Em execução";            "🟡";
    "Enviada para validação"; "🟣";
    "Encerrada";              "🟢";
    "Rejeitada";              "🔴"; "•"
)

// Texto de bloqueio
If(varAcaoCelula.Status.Value = "Aguardando dependência";
   "Aguardando etapa anterior"; varAcaoCelula.Title)
```

### 2.4 Editar solucionadores (colunas)

Tela `scrSolucionadores` (só `gblEhGestor`):

```powerfx
// Adicionar
Patch(Solucionadores; Defaults(Solucionadores);
    { Title: txtNome.Text; Email: Lower(txtEmail.Text);
      Funcao: txtFuncao.Text; Ativo: true;
      Perfil: { Value: ddPerfil.Selected.Value } }
);

// Renomear
Patch(Solucionadores; galSol.Selected; { Title: txtNome.Text });

// Desativar (nunca excluir com histórico)
Patch(Solucionadores; galSol.Selected; { Ativo: false });
```

---

## 3. Popup da ação (`popAcao`)

Ao clicar num card: `Set(gblAcao; varAcaoCelula); UpdateContext({ popAberto: true })`.

Conteúdo: nome, responsável, checklist/roteiro, prazo, observações, histórico,
anexos/evidências e botões (concluir/enviar, rejeitar, validar).

### 3.1 Dados de contexto (campos personalizados da tarefa)

```powerfx
// Valores dos campos personalizados visíveis ao solucionador
ClearCollect(colDadosTarefa;
    AddColumns(
        Filter(DadosDaTarefa; Tarefa.Id = gblAcao.Tarefa.Id);
        "Rotulo"; Campo.Value;
        "Valor";
            Switch(Campo.Value; // usa o tipo do campo p/ escolher a coluna
                // fallback: mostra o que estiver preenchido
                LookUp(CamposDeModelo; ID = Campo.Id).Tipo.Value;
                "";
                Coalesce(ValorTexto; Text(ValorNumero); Text(ValorData; "[$-pt-BR]dd/mm/yyyy"))
            )
    )
);
```

Simplificação prática (sem `Switch` por tipo, exibe o valor não vazio):

```powerfx
ClearCollect(colDadosTarefa;
    AddColumns(
        Filter(DadosDaTarefa; Tarefa.Id = gblAcao.Tarefa.Id);
        "Rotulo"; Campo.Value;
        "Valor"; Coalesce(ValorTexto; Text(ValorNumero); Text(ValorData; "[$-pt-BR]dd/mm/yyyy"))
    )
);
```

### 3.2 Checklist com estado em JSON

`ChecklistEstado` guarda um JSON `[{ "i": "texto do item", "ok": true }, ...]`.

```powerfx
// Ao abrir o popup, montar a coleção editável do checklist
ClearCollect(colChecklist;
    ForAll(
        Split(gblAcao.Checklist; Char(10)) As L;   // uma linha = um item
        {
            item: Trim(L.Value);
            ok: CountIf(
                    ForAll(Table(ParseJSON(Coalesce(gblAcao.ChecklistEstado; "[]")));
                        { i: Text(ThisRecord.i); ok: Boolean(ThisRecord.ok) });
                    i = Trim(L.Value) && ok
                ) > 0
        }
    )
);

// Ao marcar/desmarcar um item (chkItem.OnCheck / OnUncheck)
Patch(colChecklist; ThisItem; { ok: chkItem.Value });

// Salvar de volta na ação
Patch(AcoesDaTarefa; gblAcao;
    { ChecklistEstado:
        JSON(
            ForAll(colChecklist As C; { i: C.item; ok: C.ok });
            JSONFormat.Compact
        )
    }
);
```

### 3.3 Histórico

```powerfx
ClearCollect(colHistorico;
    SortByColumns(
        Filter(HistoricoDaAcao; AcaoDaTarefa.Id = gblAcao.ID);
        "DataHora"; SortOrder.Descending
    )
);
```

### 3.4 Evidências (anexos)

```powerfx
// Listar
ClearCollect(colEvidencias;
    Filter(Evidencias; AcaoDaTarefa.Id = gblAcao.ID)
);
Set(gblQtdEvidencias; CountRows(colEvidencias));
```

Upload: use um controle **Attachments** ligado a um formulário sobre a biblioteca
`Evidencias`, ou o conector para criar o arquivo. Sempre gravar `AcaoDaTarefa` e
`TipoDocumento`. Após subir, recontar `gblQtdEvidencias`.

---

## 4. Fórmula única de transição (helper)

Centralize a gravação + histórico + notificação numa fórmula reutilizável
(coloque em um botão ou componente):

```powerfx
// RegistrarTransicao(acao, novoStatus, comentario)
// Implementar como sequência (não há função nomeada; use With + Patch)

With({ ant: gblAcao.Status.Value };
    // 1) muda o status (+ carimbos conforme o caso)
    Patch(AcoesDaTarefa; gblAcao;
        {
            Status: { Value: novoStatus };
            EnviadoValidacaoEm: If(novoStatus = "Enviada para validação"; Now(); gblAcao.EnviadoValidacaoEm);
            ValidadoRejeitadoPor: If(novoStatus in ["Encerrada";"Rejeitada"]; gblMe; gblAcao.ValidadoRejeitadoPor);
            Justificativa: If(novoStatus = "Rejeitada"; txtJustificativa.Text; gblAcao.Justificativa)
        }
    );
    // 2) trilha de auditoria
    Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
        {
            AcaoDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title };
            Usuario: gblMe;
            DataHora: Now();
            StatusAnterior: ant;
            StatusNovo: novoStatus;
            Comentario:
                If(novoStatus = "Rejeitada"; txtJustificativa.Text;
                   gblQtdEvidencias > 0; "Evidências: " & gblQtdEvidencias; "")
        }
    )
);
// 3) notificação: chamar o fluxo (ver docs/06) — ex.:
// CoraNotificar.Run(gblAcao.ID; tipoNotificacao; destinatarioEmail; mensagem)
```

### 4.1 Botão "Iniciar" (Liberada → Em execução)

```powerfx
// DisplayMode: gblAcao.Status.Value = "Liberada" && gblAcao.Solucionador.Email = gblEmail
// OnSelect:
Set(gblAcao; Patch(AcoesDaTarefa; gblAcao; { Status: { Value: "Em execução" } }));
Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
    { AcaoDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
      DataHora: Now(); StatusAnterior: "Liberada"; StatusNovo: "Em execução" });
```

### 4.2 Botão "Enviar para validação" (Em execução → Enviada)

```powerfx
// Visible: gblAcao.Status.Value = "Em execução" && gblAcao.Solucionador.Email = gblEmail
// DisplayMode: exige evidência quando obrigatória
If(gblAcao.EvidenciaObrigatoria && gblQtdEvidencias = 0;
   DisplayMode.Disabled; DisplayMode.Edit)

// OnSelect:
If(gblAcao.EvidenciaObrigatoria && gblQtdEvidencias = 0;
    Notify("Anexe ao menos uma evidência antes de enviar."; NotificationType.Error);
    // ...RegistrarTransicao(gblAcao; "Enviada para validação"; "")
    Set(gblAcao; Patch(AcoesDaTarefa; gblAcao;
        { Status: { Value: "Enviada para validação" }; EnviadoValidacaoEm: Now() }));
    Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
        { AcaoDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
          DataHora: Now(); StatusAnterior: "Em execução"; StatusNovo: "Enviada para validação";
          Comentario: "Evidências: " & gblQtdEvidencias });
    // notificar gestor
    Notify("Enviado para validação."; NotificationType.Success)
)
```

### 4.3 Botão "Validar / Encerrar" (Gestor)

```powerfx
// Visible: gblEhGestor && gblAcao.Status.Value = "Enviada para validação"
// OnSelect: (releitura p/ evitar corrida entre gestores)
With({ atual: LookUp(AcoesDaTarefa; ID = gblAcao.ID) };
    If(atual.Status.Value <> "Enviada para validação";
        Notify("Esta ação já foi decidida por outro gestor."; NotificationType.Warning);
        Set(gblAcao; Patch(AcoesDaTarefa; atual;
            { Status: { Value: "Encerrada" }; ValidadoRejeitadoPor: gblMe }));
        Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
            { AcaoDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
              DataHora: Now(); StatusAnterior: "Enviada para validação"; StatusNovo: "Encerrada" });
        // liberar dependentes:
        CoraLiberarDependentes(gblAcao.ID)  // ver §5
    )
)
```

### 4.4 Botão "Rejeitar" (Gestor, justificativa obrigatória)

```powerfx
// Visible: gblEhGestor && gblAcao.Status.Value = "Enviada para validação"
// DisplayMode: If(IsBlank(Trim(txtJustificativa.Text)); DisplayMode.Disabled; DisplayMode.Edit)
Set(gblAcao; Patch(AcoesDaTarefa; gblAcao;
    { Status: { Value: "Rejeitada" }; ValidadoRejeitadoPor: gblMe;
      Justificativa: txtJustificativa.Text }));
Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
    { AcaoDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
      DataHora: Now(); StatusAnterior: "Enviada para validação"; StatusNovo: "Rejeitada";
      Comentario: txtJustificativa.Text });
Notify("Ação rejeitada e devolvida ao solucionador."; NotificationType.Warning);
```

---

## 5. Liberação de dependentes (no app)

```powerfx
// CoraLiberarDependentes(idAcao): libera quem depende de idAcao já encerrada
ForAll(
    Filter(AcoesDaTarefa;
        Dependencia.Id = idAcao && Status.Value = "Aguardando dependência") As Dep;
    // padrão = AposValidacaoGestor (já encerramos); AposEvidencia é tratado no envio
    Patch(AcoesDaTarefa; LookUp(AcoesDaTarefa; ID = Dep.ID);
        { Status: { Value: "Liberada" } });
    Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
        { AcaoDaTarefa: { Id: Dep.ID; Value: Dep.Title }; Usuario: gblMe;
          DataHora: Now(); StatusAnterior: "Aguardando dependência"; StatusNovo: "Liberada";
          Comentario: "Liberada após validação da etapa anterior" })
    // + notificar Dep.Solucionador (fluxo)
);
```

> Para `AposEvidencia`, replicar essa lógica no botão "Enviar para validação",
> avaliando dependentes com `ModoLiberacao = "AposEvidencia"` quando há evidência.
> Como reforço, um fluxo agendado (docs/06) reconcilia liberações pendentes.

---

## 6. Criação de tarefa (`scrCriarTarefa`)

Somente `gblEhCriador`. Fluxo: escolher modelo (ou do zero) → preencher campos →
definir D+0 → confirmar → materializar.

### 6.1 Carregar o modelo

```powerfx
// Ao escolher ddModelo:
Set(gblModelo; ddModelo.Selected);
ClearCollect(colCamposModelo;
    SortByColumns(Filter(CamposDeModelo; Modelo.Id = gblModelo.ID); "Ordem"));
ClearCollect(colAcoesModelo;
    SortByColumns(Filter(AcoesDeModelo; Modelo.Id = gblModelo.ID); "Ordem"));

// Coleção editável de campos (valor em branco p/ o criador preencher)
ClearCollect(colFormCampos;
    ForAll(colCamposModelo As C;
        { campoId: C.ID; rotulo: C.Title; tipo: C.Tipo.Value;
          obrig: C.Obrigatorio; valorTexto: ""; valorNumero: Blank(); valorData: Blank() }));

// Coleção editável de ações (responsável/prazo/dependência ajustáveis)
ClearCollect(colFormAcoes;
    ForAll(colAcoesModelo As A;
        { ordem: A.Ordem; nome: A.Title;
          responsavelEmail: A.ResponsavelSugerido.Email;
          prazoRel: A.PrazoRelativo; dependenciaOrdem: A.DependenciaOrdem;
          checklist: A.Checklist; evidObrig: A.EvidenciaObrigatoria;
          modo: Coalesce(A.ModoLiberacao.Value; "AposValidacaoGestor") }));
```

### 6.2 Confirmar e materializar

```powerfx
// btnConfirmar.OnSelect
// 0) validar obrigatórios
If(CountRows(Filter(colFormCampos; obrig && IsBlank(valorTexto) && IsBlank(valorNumero) && IsBlank(valorData))) > 0;
    Notify("Preencha os campos obrigatórios."; NotificationType.Error);

    // 1) criar a Tarefa
    Set(gblNovaTarefa;
        Patch(Tarefas; Defaults(Tarefas);
            { Title: txtNomeTarefa.Text;
              ModeloOrigem: { Id: gblModelo.ID; Value: gblModelo.Title };
              DataReferencia: dpReferencia.SelectedDate;
              Criador: gblMe;
              StatusGeral: { Value: "Em andamento" };
              GestorResponsavel: pkGestor.Selected }));

    // 2) gravar os DADOS da tarefa
    ForAll(colFormCampos As F;
        Patch(DadosDaTarefa; Defaults(DadosDaTarefa);
            { Tarefa: { Id: gblNovaTarefa.ID; Value: gblNovaTarefa.Title };
              Campo: { Id: F.campoId; Value: F.rotulo };
              ValorTexto: F.valorTexto; ValorNumero: F.valorNumero; ValorData: F.valorData }));

    // 3) materializar AÇÕES (1ª passada: cria; guarda mapa ordem→ID)
    ClearCollect(colMapaAcoes;
        ForAll(colFormAcoes As A;
            With({ dataCalc: DateAdd(gblNovaTarefa.DataReferencia; A.prazoRel; TimeUnit.Days);
                   solu: LookUp(Office365Users.SearchUserV2({searchTerm: A.responsavelEmail}).value; true) };
                With({ nova:
                    Patch(AcoesDaTarefa; Defaults(AcoesDaTarefa);
                        { Tarefa: { Id: gblNovaTarefa.ID; Value: gblNovaTarefa.Title };
                          Title: A.nome;
                          Solucionador: { Claims: "i:0#.f|membership|" & A.responsavelEmail;
                                          DisplayName: A.responsavelEmail; Email: A.responsavelEmail;
                                          Department: ""; JobTitle: ""; Picture: "" };
                          PrazoCalculado: dataCalc;
                          Checklist: A.checklist; ChecklistEstado: "[]";
                          EvidenciaObrigatoria: A.evidObrig;
                          ModoLiberacao: { Value: A.modo };
                          Ordem: A.ordem;
                          // status provisório; ajustado na 2ª passada
                          Status: { Value: If(IsBlank(A.dependenciaOrdem); "Liberada"; "Aguardando dependência") } }) };
                    { ordem: A.ordem; id: nova.ID; dependenciaOrdem: A.dependenciaOrdem }))));

    // 4) 2ª passada: amarrar Dependencia (ordem → ID real)
    ForAll(Filter(colMapaAcoes; !IsBlank(dependenciaOrdem)) As M;
        Patch(AcoesDaTarefa; LookUp(AcoesDaTarefa; ID = M.id);
            { Dependencia:
                { Id: LookUp(colMapaAcoes; ordem = M.dependenciaOrdem).id;
                  Value: LookUp(AcoesDaTarefa; ID = LookUp(colMapaAcoes; ordem = M.dependenciaOrdem).id).Title } }));

    // 5) notificar responsáveis das ações já "Liberada"
    //    (chamar fluxo CoraNotificar por ação liberada)

    Notify("Tarefa criada e ações distribuídas."; NotificationType.Success);
    Navigate(scrPainel)
)
```

> **Nota sobre `Solucionador` (Person):** para gravar a coluna de pessoa a partir de
> um e-mail, o registro precisa dos claims. Se preferir, troque `AcoesDaTarefa.Solucionador`
> por um **Lookup → `Solucionadores`** (mais simples de gravar e filtrar) e derive o
> e-mail para notificação. Escolha uma abordagem e mantenha-a consistente com docs/03.

### 6.3 Criar do zero (sem modelo)

Mesma tela, com `colFormCampos`/`colFormAcoes` iniciando vazias e botões
"Adicionar campo" / "Adicionar ação" que dão `Collect(...)` de um registro em
branco. Tipos de campo: `Texto`, `Numero`, `Data` (dropdown).

---

## 7. Notificações no app (`scrNotificacoes`)

```powerfx
// OnVisible
ClearCollect(colMinhasNotif;
    SortByColumns(
        Filter(Notificacoes; Destinatario.Email = gblEmail);
        "DataHora"; SortOrder.Descending));
Set(gblNaoLidas; CountRows(Filter(colMinhasNotif; Lida = false)));

// Marcar como lida (galNotif item)
Patch(Notificacoes; ThisItem; { Lida: true });
```

Badge no menu: `If(gblNaoLidas > 0; gblNaoLidas & "")`.

---

## 8. Delegação — lista de atenção

- Prefira filtrar por colunas **indexadas** (`Tarefa`, `Solucionador`, `Status`,
  `PrazoCalculado`).
- `Search`, `in` sobre coluna do SharePoint e algumas comparações de `Choice` não
  delegam bem — restrinja o conjunto por `Tarefa` primeiro.
- Evite trazer `AcoesDaTarefa` inteira: carregue por tarefa selecionada no painel.
- Ajuste o **limite de linhas não delegáveis** (Configurações → 2000) apenas como
  paliativo; a solução correta é filtro delegável.
