# 05 — Power Apps Canvas (telas e Power Fx)

Fórmulas de referência para o modelo **v2 (unificado)**. Ajuste nomes de controles
conforme a nomenclatura do seu app (prefixos: `scr` tela, `gal` galeria, `frm`
formulário, `btn` botão, `lbl` rótulo, `pop` popup, `col` coleção, `var`/`gbl`
variável).

Convenções deste modelo (docs/02):

- A lista operacional é **`ItensDaTarefa`**: cada item é um *dado* (sem responsável)
  ou uma *ação* (com `Responsaveis` ≥ 1, ou `Livre = Sim`).
- **`Responsaveis`** é *Person múltiplo*; **`Dependencias`** é *Lookup múltiplo* (self).
- Status terminal da **ação** é **`Concluída`** (a **tarefa** usa `Encerrada`).
- Foto do usuário vem da conta Microsoft; avatar/iniciais são *fallback*.

## 0. Fontes de dados (conector SharePoint)

Adicione as 8 listas de docs/02 (`Solucionadores`, `ModelosDeProcesso`,
`ItensDeModelo`, `Tarefas`, `ItensDaTarefa`, `HistoricoDaAcao`, `Notificacoes`,
`Evidencias`) + **`Office365Users`** (perfil/foto/Object ID) e os conectores dos
fluxos que for chamar por `.Run(...)` (F7 notificar, F8 exportar).

---

## 1. Identidade e contexto — `App.OnStart`

```powerfx
Set(gblEmail; Lower(User().Email));

// Perfil do Entra (foto, Object ID) via Graph
Set(gblMe; Office365Users.MyProfileV2());
Set(gblObjectId; gblMe.id);

// Registro funcional do solucionador
Set(gblSolucionador; LookUp(Solucionadores; Lower(Email) = gblEmail && Ativo = true));
Set(gblPerfil; Coalesce(gblSolucionador.Perfil.Value; "Solucionador"));
Set(gblEhGestor;  gblPerfil = "Gestor");
Set(gblEhCriador; gblPerfil = "Criador" || gblEhGestor);   // criador inclui gestor

// Semeia o Object ID no cadastro se estiver vazio
If(!IsBlank(gblSolucionador) && IsBlank(gblSolucionador.EntraObjectId);
   Patch(Solucionadores; gblSolucionador; { EntraObjectId: gblObjectId }));
```

Tema Cora (paleta de docs/07 — verde-floresta e âmbar):

```powerfx
Set(gblTema; {
    fundo:       ColorValue("#F4F7F5");
    cartao:      ColorValue("#FFFFFF");
    verde:       ColorValue("#005B4F");   // verde-floresta (primária)
    verdeClaro:  ColorValue("#DCEBE6");
    ambar:       ColorValue("#FFB51B");   // âmbar (destaque)
    texto:       ColorValue("#1F2A28");
    textoSuave:  ColorValue("#5B6B67")
});
```

---

## 2. Painel matricial (`scrPainel`)

Estrutura: **linhas = tarefas**, **colunas = solucionadores** (+ coluna 🔓 **Livre**
quando houver ações livres). Uma célula pode conter **vários** cards, pois uma ação
com múltiplos responsáveis aparece na coluna de **cada** um deles.

### 2.1 Coleções de eixos

```powerfx
// scrPainel.OnVisible

// Colunas: solucionadores que aparecem no painel e estão ativos
ClearCollect(colColunas;
    SortByColumns(Filter(Solucionadores; Ativo = true); "Title"; SortOrder.Ascending));

// Linhas: tarefas em andamento / finalizadas (o Arquivo mostra as encerradas/canceladas)
ClearCollect(colLinhas;
    SortByColumns(
        Filter(Tarefas; StatusGeral.Value in ["Em andamento"; "Finalizada"]);
        "DataReferencia"; SortOrder.Descending));

// Itens visíveis (segurança real está no SharePoint; aqui é UX)
// Só ações entram na matriz (dados aparecem no popup da tarefa)
ClearCollect(colAcoes;
    If(gblEhCriador;
        Filter(ItensDaTarefa; Tarefa.Value in colLinhas.Title
               && (CountRows(Responsaveis) > 0 || Livre = true));
        // solucionador: ações onde é responsável ou que são livres
        Filter(ItensDaTarefa;
               (gblEmail in Responsaveis.Email) || Livre = true)));
```

> **Delegação:** `in` sobre `Responsaveis.Email` (Person multi) **não delega**. Para
> volumes reais, filtre por `Tarefa` (indexado) e traga as ações da tarefa
> selecionada sob demanda; ou mantenha uma coluna de texto auxiliar
> `ResponsaveisEmails` (e-mails concatenados) delegável para `Search`.

### 2.2 Grade

Galeria vertical `galLinhas` (`Items = colLinhas`) e, dentro, galeria horizontal
`galCelulas` (`Items = colColunas`). Guarde o ID da linha num rótulo oculto do
template (`lblLinhaId.Text = ThisItem.ID`) para referenciá-lo na célula. A célula
reúne **todas** as ações do cruzamento:

```powerfx
// galCelulas → galeria interna "galCards" com os cards da célula
// galCards.Items:
Filter(colAcoes;
    Tarefa.Id = Value(lblLinhaId.Text)
    && ( ThisItem /*coluna*/.ID = -1 && Livre = true   // coluna especial "Livre"
         || gblEmailColuna in Responsaveis.Email ))
```

> Na coluna especial **Livre** (registro sintético `ID = -1`), mostre as ações com
> `Livre = true`. Nas demais, as ações cujo `Responsaveis` contém o e-mail da coluna
> (`gblEmailColuna` = `ThisItem.Email` da `galCelulas`).

### 2.3 Aparência do card (farol de status)

```powerfx
// Cor de fundo por status
Switch(ThisItem.Status.Value;
    "Aguardando dependência"; ColorValue("#E7EBEA");
    "Liberada";               gblTema.verdeClaro;
    "Em execução";            ColorValue("#FFF3D6");
    "Enviada para validação"; ColorValue("#EDE6F2");
    "Concluída";              ColorValue("#DCEEDD");
    "Rejeitada";              ColorValue("#F6DADE");
    gblTema.cartao)

// Farol
Switch(ThisItem.Status.Value;
    "Aguardando dependência"; "⚪"; "Liberada"; "🔵"; "Em execução"; "🟡";
    "Enviada para validação"; "🟣"; "Concluída"; "🟢"; "Rejeitada"; "🔴"; "•")

// Texto de bloqueio (mostra as pendentes)
If(ThisItem.Status.Value = "Aguardando dependência";
   "Aguardando: " & Concat(Filter(ThisItem.Dependencias; true); Value & "; ");
   ThisItem.Title)
```

### 2.4 Avatar/foto na coluna e no card

```powerfx
// Imagem da pessoa: foto do M365, senão avatar, senão iniciais (rótulo)
// imgPessoa.Image:
Coalesce(
    Office365Users.UserPhotoV2(ThisItem.Email);   // foto da conta Microsoft
    ThisItem.Avatar                                // fallback: URL/id do avatar
)
// Se ambos vazios, exibir um círculo com as iniciais (lblIniciais.Text):
Left(ThisItem.Title;1) & Mid(ThisItem.Title; Find(" "; ThisItem.Title & " ")+1; 1)
```

### 2.5 Busca e filtro

```powerfx
// Barra de filtro do painel: txtBusca, ddSituacao, ddSolucionador
// Aplique sobre colLinhas/colAcoes:
Filter(colLinhas;
    (IsBlank(txtBusca.Text)
        || txtBusca.Text in Title || txtBusca.Text in Subtitulo)
    && (ddSituacao.Selected.Value = "(todas)" || StatusGeral.Value = ddSituacao.Selected.Value))
```

---

## 3. Popup do item (`popItem`)

Ao clicar num card: `Set(gblAcao; ThisItem); UpdateContext({ popAberto: true })`.

Conteúdo: título + subtítulo da tarefa, tipo do campo e seu valor, responsáveis,
prazo, observação, histórico, evidências e botões (iniciar, concluir/enviar,
validar, rejeitar, reabrir).

### 3.1 Dados da tarefa (itens sem responsável)

```powerfx
// Os "dados" da tarefa são itens de ItensDaTarefa sem responsável
ClearCollect(colDadosTarefa;
    AddColumns(
        Filter(ItensDaTarefa; Tarefa.Id = gblAcao.Tarefa.Id
               && CountRows(Responsaveis) = 0 && Livre = false);
        "Valor";
            Switch(Tipo.Value;
                "Numero"; Text(ValorNumero);
                "Data";   Text(ValorData; "[$-pt-BR]dd/mm/yyyy");
                "Check";  If(ValorCheck; "Sim"; "Não");
                Coalesce(ValorTexto; ""))));   // Texto / Observacoes
```

### 3.2 Valor do próprio item (edição pelo executor)

O valor que o responsável preenche depende do `Tipo`:

```powerfx
// Controle de entrada visível conforme o tipo:
//  Texto/Observacoes -> txtValor (multi-linha p/ Observacoes)
//  Numero            -> txtNumero
//  Data              -> dpData
//  Check             -> tglCheck
//  Evidencia         -> anexos (§3.4)

// Ao salvar o valor (habilitado só se ehEditor — ver §4):
Patch(ItensDaTarefa; gblAcao;
    Switch(gblAcao.Tipo.Value;
        "Numero"; { ValorNumero: Value(txtNumero.Text) };
        "Data";   { ValorData: dpData.SelectedDate };
        "Check";  { ValorCheck: tglCheck.Value };
        { ValorTexto: txtValor.Text }));
```

### 3.3 Histórico

```powerfx
ClearCollect(colHistorico;
    SortByColumns(
        Filter(HistoricoDaAcao; ItemDaTarefa.Id = gblAcao.ID);
        "DataHora"; SortOrder.Descending));
```

### 3.4 Evidências (anexos)

```powerfx
ClearCollect(colEvidencias; Filter(Evidencias; ItemDaTarefa.Id = gblAcao.ID));
Set(gblQtdEvidencias; CountRows(colEvidencias));
```

Upload: controle **Attachments** sobre a biblioteca `Evidencias`, gravando sempre
`ItemDaTarefa` e `TipoDocumento`. Após subir, recontar `gblQtdEvidencias`.

---

## 4. Permissão de edição e transições

Fórmula central de "quem pode executar" (multi-responsável + gestor + livre):

```powerfx
// gblEhEditor: recalcule ao abrir o popup (Set no OnSelect do card)
Set(gblEhEditor;
    gblAcao.Livre = true
    || (gblEmail in gblAcao.Responsaveis.Email)
    || gblEhGestor);
```

Regra de preenchimento (bloqueia concluir/enviar):

```powerfx
Set(gblFaltaPreencher;
    // valor obrigatório do tipo
    ( gblAcao.Tipo.Value in ["Texto";"Observacoes"] && IsBlank(txtValor.Text) )
    || ( gblAcao.Tipo.Value = "Numero" && IsBlank(txtNumero.Text) )
    || ( gblAcao.Tipo.Value = "Data" && IsBlank(dpData.SelectedDate) )
    || ( gblAcao.Tipo.Value = "Check" && !tglCheck.Value )
    // evidência
    || ( (gblAcao.ExigeEvidencia || gblAcao.Tipo.Value = "Evidencia") && gblQtdEvidencias = 0 ));
```

### 4.1 Iniciar (Liberada → Em execução)

```powerfx
// Visible: gblAcao.Status.Value = "Liberada" && gblEhEditor
Set(gblAcao; Patch(ItensDaTarefa; gblAcao; { Status: { Value: "Em execução" } }));
Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
    { ItemDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
      DataHora: Now(); StatusAnterior: "Liberada"; StatusNovo: "Em execução" });
```

### 4.2 Concluir / Enviar (Em execução → Concluída | Enviada para validação)

```powerfx
// Visible: gblAcao.Status.Value = "Em execução" && gblEhEditor
// DisplayMode: If(gblFaltaPreencher; DisplayMode.Disabled; DisplayMode.Edit)
If(gblFaltaPreencher;
    Notify("Preencha o valor e/ou anexe a evidência."; NotificationType.Error);

    // exige aprovação e não sou gestor -> vai para validação
    If(gblAcao.ExigeAprovacao && !gblEhGestor;
        Set(gblAcao; Patch(ItensDaTarefa; gblAcao;
            { Status: { Value: "Enviada para validação" }; EnviadoValidacaoEm: Now() }));
        Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
            { ItemDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
              DataHora: Now(); StatusAnterior: "Em execução"; StatusNovo: "Enviada para validação" });
        // CoraNotificar.Run(...; "Enviada p/ validação"; gestorEmail; msg)
        Notify("Enviado para validação."; NotificationType.Success);

        // senão -> conclui direto (gestor é o aprovador quando conclui)
        Set(gblAcao; Patch(ItensDaTarefa; gblAcao;
            { Status: { Value: "Concluída" };
              ValidadoRejeitadoPor: If(gblEhGestor; gblMe; Blank()) }));
        Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
            { ItemDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
              DataHora: Now(); StatusAnterior: "Em execução"; StatusNovo: "Concluída" });
        CoraLiberarDependentes(gblAcao.ID);   // §5
        CoraRecalcularTarefa(gblAcao.Tarefa.Id);  // §6
        Notify("Ação concluída."; NotificationType.Success)))
```

### 4.3 Validar (Gestor: Enviada para validação → Concluída)

```powerfx
// Visible: gblEhGestor && gblAcao.Status.Value = "Enviada para validação"
// Releitura p/ evitar corrida entre gestores:
With({ atual: LookUp(ItensDaTarefa; ID = gblAcao.ID) };
    If(atual.Status.Value <> "Enviada para validação";
        Notify("Esta ação já foi decidida."; NotificationType.Warning);
        Set(gblAcao; Patch(ItensDaTarefa; atual;
            { Status: { Value: "Concluída" }; ValidadoRejeitadoPor: gblMe }));
        Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
            { ItemDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
              DataHora: Now(); StatusAnterior: "Enviada para validação"; StatusNovo: "Concluída" });
        CoraLiberarDependentes(gblAcao.ID);
        CoraRecalcularTarefa(gblAcao.Tarefa.Id)))
```

### 4.4 Rejeitar (Gestor, justificativa obrigatória)

```powerfx
// Visible: gblEhGestor && gblAcao.Status.Value = "Enviada para validação"
// DisplayMode: If(IsBlank(Trim(txtJustificativa.Text)); DisplayMode.Disabled; DisplayMode.Edit)
Set(gblAcao; Patch(ItensDaTarefa; gblAcao;
    { Status: { Value: "Rejeitada" }; ValidadoRejeitadoPor: gblMe;
      Justificativa: txtJustificativa.Text }));
Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
    { ItemDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
      DataHora: Now(); StatusAnterior: "Enviada para validação"; StatusNovo: "Rejeitada";
      Comentario: txtJustificativa.Text });
CoraRecalcularTarefa(gblAcao.Tarefa.Id);
Notify("Ação devolvida ao responsável."; NotificationType.Warning);
```

### 4.5 Reabrir após rejeição (Rejeitada → Em execução)

```powerfx
// Visible: gblEhEditor && gblAcao.Status.Value = "Rejeitada"
Set(gblAcao; Patch(ItensDaTarefa; gblAcao; { Status: { Value: "Em execução" } }));
Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
    { ItemDaTarefa: { Id: gblAcao.ID; Value: gblAcao.Title }; Usuario: gblMe;
      DataHora: Now(); StatusAnterior: "Rejeitada"; StatusNovo: "Em execução" });
```

---

## 5. Liberação de dependentes (`CoraLiberarDependentes`)

Libera as ações que estão `Aguardando dependência` cujas predecessoras estejam
**todas** `Concluída`. Como não há mais `ModoLiberacao`, a regra é única.

```powerfx
// idAcao acabou de virar "Concluída"
ForAll(
    Filter(ItensDaTarefa;
        Status.Value = "Aguardando dependência"
        && idAcao in Dependencias.Id) As Y;
    If( CountRows(Filter(Y.Dependencias As D;
            LookUp(ItensDaTarefa; ID = D.Id).Status.Value <> "Concluída")) = 0;
        Patch(ItensDaTarefa; LookUp(ItensDaTarefa; ID = Y.ID);
            { Status: { Value: "Liberada" } });
        Patch(HistoricoDaAcao; Defaults(HistoricoDaAcao);
            { ItemDaTarefa: { Id: Y.ID; Value: Y.Title }; Usuario: gblMe;
              DataHora: Now(); StatusAnterior: "Aguardando dependência"; StatusNovo: "Liberada";
              Comentario: "Liberada — predecessoras concluídas" })
        // + notificar todos os Responsaveis(Y) (fluxo F7), exceto se Livre
    ));
```

---

## 6. Status geral da tarefa (`CoraRecalcularTarefa`)

```powerfx
// idTarefa: recalcular após concluir/validar/rejeitar uma ação
With({ acoes: Filter(ItensDaTarefa; Tarefa.Id = idTarefa
                     && (CountRows(Responsaveis) > 0 || Livre = true)) };
    Patch(Tarefas; LookUp(Tarefas; ID = idTarefa);
        { StatusGeral: { Value:
            If(CountRows(acoes) > 0
               && CountRows(Filter(acoes;
                    !(Status.Value in ["Concluída"; "Enviada para validação"]))) = 0;
               "Finalizada"; "Em andamento") } }));
```

### 6.1 Encerrar a tarefa (conferência do gestor)

```powerfx
// Visible: gblEhGestor && gblTarefa.StatusGeral.Value = "Finalizada"
// Aprova as pendentes em validação e encerra:
ForAll(Filter(ItensDaTarefa; Tarefa.Id = gblTarefa.ID
              && Status.Value = "Enviada para validação") As A;
    Patch(ItensDaTarefa; A; { Status: { Value: "Concluída" }; ValidadoRejeitadoPor: gblMe }));
Patch(Tarefas; gblTarefa;
    { StatusGeral: { Value: "Encerrada" }; FechadaEm: Now() });
// notificar participantes (fluxo); a tarefa sai do painel e vai ao Arquivo
```

### 6.2 Cancelar a tarefa

```powerfx
// Visible: gblEhGestor && gblTarefa.StatusGeral.Value in ["Em andamento";"Finalizada"]
Patch(Tarefas; gblTarefa;
    { StatusGeral: { Value: "Cancelada" }; FechadaEm: Now();
      CancelJustificativa: txtCancelJust.Text });
```

---

## 7. Criar tarefa (`scrCriarTarefa`)

Somente `gblEhCriador`. Fluxo: escolher modelo (recorrente, vazio) **ou** criar do
zero → preencher dados → definir D+0 → confirmar → materializar.

### 7.1 Carregar o modelo

```powerfx
Set(gblModelo; galModelos.Selected);
ClearCollect(colItensModelo;
    SortByColumns(Filter(ItensDeModelo; Modelo.Id = gblModelo.ID); "Ordem"));

// Coleção editável (dados e ações juntos, na ordem)
ClearCollect(colForm;
    ForAll(colItensModelo As C;
        { ordem: C.Ordem; rotulo: C.Title; tipo: C.Tipo.Value;
          responsaveis: C.ResponsaveisSugeridos;   // Person multi (Table)
          livre: C.Livre;
          prazoRel: C.PrazoRelativo; depOrdens: C.DependenciaOrdens;
          exigeAprov: C.ExigeAprovacao; obrig: C.Obrigatorio;
          exigeEvid: C.ExigeEvidencia; visivelTodos: C.VisivelTodos;
          // valores em branco para dados; o criador preenche
          valorTexto: ""; valorNumero: Blank(); valorData: Blank(); valorCheck: false }));
```

### 7.2 Confirmar e materializar

```powerfx
// btnConfirmar.OnSelect
// 0) validar dados obrigatórios (itens sem responsável e sem valor)
If(CountRows(Filter(colForm;
        obrig && CountRows(responsaveis) = 0 && !livre
        && IsBlank(valorTexto) && IsBlank(valorNumero) && IsBlank(valorData) && !valorCheck)) > 0;
    Notify("Preencha os dados obrigatórios."; NotificationType.Error);

    // 1) criar a Tarefa
    Set(gblNovaTarefa;
        Patch(Tarefas; Defaults(Tarefas);
            { Title: txtNomeTarefa.Text; Subtitulo: txtSubtitulo.Text;
              ModeloOrigem: { Id: gblModelo.ID; Value: gblModelo.Title };
              Recorrente: tglRecorrente.Value;
              DataReferencia: dpReferencia.SelectedDate;
              Criador: gblMe; GestorResponsavel: pkGestor.Selected;
              StatusGeral: { Value: "Em andamento" } }));

    // 2) materializar todos os itens (1ª passada) e guardar mapa ordem→ID
    ClearCollect(colMapa;
        ForAll(colForm As A;
            With({ ehAcao: (CountRows(A.responsaveis) > 0) || A.livre;
                   dataCalc: DateAdd(gblNovaTarefa.DataReferencia; Coalesce(A.prazoRel;0); TimeUnit.Days) };
                With({ nova:
                    Patch(ItensDaTarefa; Defaults(ItensDaTarefa);
                        { Tarefa: { Id: gblNovaTarefa.ID; Value: gblNovaTarefa.Title };
                          Title: A.rotulo; Tipo: { Value: A.tipo };
                          Responsaveis: A.responsaveis;   // grava Person multi direto
                          Livre: A.livre;
                          PrazoCalculado: If(ehAcao; dataCalc; Blank());
                          ExigeAprovacao: A.exigeAprov; Obrigatorio: A.obrig;
                          ExigeEvidencia: A.exigeEvid; VisivelTodos: A.visivelTodos;
                          Ordem: A.ordem;
                          ValorTexto: A.valorTexto; ValorNumero: A.valorNumero;
                          ValorData: A.valorData; ValorCheck: A.valorCheck;
                          Status: { Value:
                              If(!ehAcao; "Dado";
                                 IsBlank(A.depOrdens); "Liberada"; "Aguardando dependência") } }) };
                    { ordem: A.ordem; id: nova.ID; depOrdens: A.depOrdens }))));

    // 3) 2ª passada: amarrar Dependencias (ordens → IDs reais). depOrdens = "5,7"
    ForAll(Filter(colMapa; !IsBlank(depOrdens)) As M;
        Patch(ItensDaTarefa; LookUp(ItensDaTarefa; ID = M.id);
            { Dependencias:
                ForAll(Split(M.depOrdens; ",") As O;
                    With({ alvo: LookUp(colMapa; ordem = Value(Trim(O.Value))) };
                        { Id: alvo.id;
                          Value: LookUp(ItensDaTarefa; ID = alvo.id).Title })) }));

    // 4) notificar responsáveis das ações já "Liberada" (fluxo F7, por responsável)

    Notify("Tarefa criada e etapas distribuídas."; NotificationType.Success);
    Navigate(scrPainel))
```

> **Gravar `Responsaveis` (Person multi):** passe uma **Table de registros de
> pessoa** (a mesma forma retornada pelo People Picker de seleção múltipla). Ao vir
> do modelo, `ResponsaveisSugeridos` já é dessa forma. Para "Livre", deixe
> `Responsaveis` vazio e `Livre = true`.

### 7.3 Criar do zero (sem modelo)

Mesma tela com `colForm` iniciando vazia e botões "Adicionar item":
`Collect(colForm; { ordem: CountRows(colForm)+1; rotulo: ""; tipo: "Texto"; responsaveis: Table(); livre: false; ... })`.
Por item, o criador escolhe o **tipo** (Texto/Número/Data/Check/Observações/Evidência),
os **responsáveis** (People Picker múltiplo) ou **Livre**, prazo, dependências
(ordens anteriores), e as flags (aprovação, evidência, obrigatório, visível a todos).
Se não escolher nenhum responsável e não marcar Livre, o item é um **dado**.

### 7.4 Cadastro de modelos (`scrTarefas`)

A tela **Tarefas** cadastra/edita/duplica/desativa modelos em `ModelosDeProcesso` +
`ItensDeModelo`, com a **mesma** UI de itens da §7.3. Cadastrar um modelo **não** o
coloca no painel — ele só vira ocorrência quando instanciado em "Criar tarefa".
Nesta tela, o botão "＋ Nova tarefa" do cabeçalho fica oculto.

---

## 8. Notificações no app (`scrNotificacoes`)

```powerfx
ClearCollect(colMinhasNotif;
    SortByColumns(Filter(Notificacoes; Destinatario.Email = gblEmail);
        "DataHora"; SortOrder.Descending));
Set(gblNaoLidas; CountRows(Filter(colMinhasNotif; Lida = false)));
// Marcar como lida: Patch(Notificacoes; ThisItem; { Lida: true });
```

A mensagem deve trazer **título e subtítulo da tarefa** e a **etapa** (rótulo da
ação). Badge no menu: `If(gblNaoLidas > 0; gblNaoLidas & "")`.

---

## 9. Exportar Excel (fluxo F8)

O Power Apps não baixa arquivos no cliente; a planilha é gerada pelo fluxo **F8**
(docs/06) e o app abre o link retornado.

```powerfx
// btnExportarPainel.OnSelect (Visible: gblEhCriador)
Set(gblArquivo;
    CoraExportar.Run("painel";
        JSON(colLinhas; JSONFormat.IncludeBinaryData)));  // tarefas já filtradas
Launch(gblArquivo.url);
```

Formato: uma linha por tarefa; colunas = ação × responsável; células com a **data de
conclusão** (dd/mm/aaaa), exceto Texto/Observações (conteúdo). Como "mistura"
tarefas diferentes numa grade única, o usuário atua com o **filtro do Excel**.

---

## 10. Cadastro próprio (`scrMeuCadastro`)

O solucionador edita **nome, e-mail, cargo e avatar**; o resto (perfil, aparece no
painel, ativo) é somente leitura — só o gestor altera na tela de Solucionadores.

```powerfx
// Salvar (o próprio usuário):
Patch(Solucionadores; gblSolucionador;
    { Title: txtNome.Text; Email: Lower(txtEmail.Text);
      Funcao: txtFuncao.Text; Avatar: galAvatares.Selected.Id });
```

Tela de Solucionadores (só `gblEhGestor`): adicionar, renomear, trocar perfil,
definir se aparece no painel e **desativar** (nunca excluir com histórico). Ao
desativar, as ações do solucionador ficam **livres** (`Livre = true`,
`Responsaveis` esvaziado) — ver docs/04 §2.

---

## 11. Delegação — lista de atenção

- Filtre por colunas **indexadas** (`Tarefa`, `Status`).
- `in` sobre **Person multi** (`Responsaveis.Email`) **não delega**: restrinja antes
  por `Tarefa`, ou mantenha uma coluna texto `ResponsaveisEmails` para `Search`.
- Evite trazer `ItensDaTarefa` inteira: carregue por tarefa selecionada.
- O limite de linhas não delegáveis (Configurações → 2000) é paliativo; a solução
  correta é filtro delegável.
