<#
.SYNOPSIS
    Provisiona as listas, colunas, escolhas e biblioteca do "Painel Cora - DP".
.DESCRIPTION
    Idempotente. Executar APÓS Connect-PnPOnline no site de destino.
    Requer módulo PnP.PowerShell.

    Modelo unificado (v2): "campos" e "ações" ficam numa única lista ordenada
    de itens (ItensDeModelo / ItensDaTarefa). Item sem responsável = dado;
    com responsável = ação.
.NOTES
    Consulte ../../docs/02-modelo-de-dados-sharepoint.md para o esquema completo.
    Nomes internos são definidos explicitamente para casar com as fórmulas Power Fx.
#>

#Requires -Modules PnP.PowerShell
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# --- helpers --------------------------------------------------------------

function Ensure-List {
    param([string]$Title, [string]$Template = "GenericList", [string]$Url)
    $list = Get-PnPList -Identity $Title -ErrorAction SilentlyContinue
    if ($null -eq $list) {
        Write-Host "Criando lista: $Title"
        if ($Url) {
            $list = New-PnPList -Title $Title -Template $Template -Url $Url
        } else {
            $list = New-PnPList -Title $Title -Template $Template
        }
    } else {
        Write-Host "Lista já existe: $Title"
    }
    return $list
}

function Ensure-Field {
    param(
        [string]$List, [string]$DisplayName, [string]$InternalName,
        [string]$Type,            # Text, Note, Number, DateTime, Boolean, Choice, User
        [string[]]$Choices = @(),
        [switch]$Required
    )
    $existing = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
    if ($null -ne $existing) { Write-Host "  campo já existe: $List/$InternalName"; return }

    Write-Host "  criando campo: $List/$InternalName ($Type)"
    if ($Type -eq "Choice") {
        Add-PnPField -List $List -DisplayName $DisplayName -InternalName $InternalName `
            -Type Choice -Choices $Choices -AddToDefaultView | Out-Null
    } else {
        Add-PnPField -List $List -DisplayName $DisplayName -InternalName $InternalName `
            -Type $Type -AddToDefaultView | Out-Null
    }
    if ($Required) {
        Set-PnPField -List $List -Identity $InternalName -Values @{ Required = $true } | Out-Null
    }
}

# Person (User) com múltipla seleção — via XML (Mult='TRUE')
function Ensure-UserMulti {
    param([string]$List, [string]$DisplayName, [string]$InternalName)
    $existing = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
    if ($null -ne $existing) { Write-Host "  person(multi) já existe: $List/$InternalName"; return }
    Write-Host "  criando person(multi): $List/$InternalName"
    Add-PnPFieldFromXml -List $List -FieldXml @"
<Field Type='UserMulti' DisplayName='$DisplayName' Name='$InternalName' StaticName='$InternalName'
       Mult='TRUE' UserSelectionMode='PeopleOnly' List='UserInfo'></Field>
"@ | Out-Null
}

function Ensure-Lookup {
    param(
        [string]$List, [string]$DisplayName, [string]$InternalName,
        [string]$LookupList, [string]$LookupField = "Title",
        [switch]$Multi, [switch]$Required
    )
    $existing = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
    if ($null -ne $existing) { Write-Host "  lookup já existe: $List/$InternalName"; return }
    $type = if ($Multi) { "LookupMulti" } else { "Lookup" }
    $mult = if ($Multi) { "TRUE" } else { "FALSE" }
    Write-Host "  criando lookup$(if($Multi){'(multi)'}): $List/$InternalName -> $LookupList.$LookupField"
    Add-PnPFieldFromXml -List $List -FieldXml @"
<Field Type='$type' Mult='$mult' DisplayName='$DisplayName' Name='$InternalName' StaticName='$InternalName'
       List='$LookupList' ShowField='$LookupField' Required='$([bool]$Required)'></Field>
"@ | Out-Null
}

function Ensure-Index {
    param([string]$List, [string]$InternalName)
    try {
        Set-PnPField -List $List -Identity $InternalName -Values @{ Indexed = $true } | Out-Null
        Write-Host "  índice: $List/$InternalName"
    } catch { Write-Warning "  não indexou $List/$InternalName: $_" }
}

# ==========================================================================
# 1. LISTAS BASE (sem lookups ainda) - criar todas antes de amarrar lookups
# ==========================================================================

Ensure-List -Title "Solucionadores"      | Out-Null
Ensure-List -Title "ModelosDeProcesso"    | Out-Null
Ensure-List -Title "ItensDeModelo"        | Out-Null
Ensure-List -Title "Tarefas"              | Out-Null
Ensure-List -Title "ItensDaTarefa"        | Out-Null
Ensure-List -Title "HistoricoDaAcao"      | Out-Null
Ensure-List -Title "Notificacoes"         | Out-Null
Ensure-List -Title "Evidencias" -Template "DocumentLibrary" | Out-Null

# ==========================================================================
# 2. COLUNAS
# ==========================================================================

# --- Solucionadores (Title = Nome) ---
Ensure-Field  -List "Solucionadores" -DisplayName "E-mail corporativo" -InternalName "Email"         -Type Text
Ensure-Field  -List "Solucionadores" -DisplayName "Entra Object ID"    -InternalName "EntraObjectId" -Type Text
Ensure-Field  -List "Solucionadores" -DisplayName "Função"             -InternalName "Funcao"        -Type Text
Ensure-Field  -List "Solucionadores" -DisplayName "Ativo"              -InternalName "Ativo"         -Type Boolean
Ensure-Field  -List "Solucionadores" -DisplayName "Perfil"             -InternalName "Perfil"        -Type Choice -Choices @("Gestor","Criador","Solucionador")
Ensure-Field  -List "Solucionadores" -DisplayName "Avatar"             -InternalName "Avatar"        -Type Text
Ensure-Index  -List "Solucionadores" -InternalName "Email"
Ensure-Index  -List "Solucionadores" -InternalName "Ativo"

# --- ModelosDeProcesso (Title = Nome) ---
Ensure-Field  -List "ModelosDeProcesso" -DisplayName "Descrição" -InternalName "Descricao"  -Type Note
Ensure-Field  -List "ModelosDeProcesso" -DisplayName "Ativo"     -InternalName "Ativo"      -Type Boolean
Ensure-Field  -List "ModelosDeProcesso" -DisplayName "Recorrente"-InternalName "Recorrente" -Type Boolean

# --- ItensDeModelo (Title = Rótulo) — dados e ações-gabarito ---
Ensure-Lookup    -List "ItensDeModelo" -DisplayName "Modelo" -InternalName "Modelo" -LookupList "ModelosDeProcesso"
Ensure-Field     -List "ItensDeModelo" -DisplayName "Tipo"                 -InternalName "Tipo"                 -Type Choice -Choices @("Texto","Numero","Data","Check","Observacoes","Evidencia")
Ensure-UserMulti -List "ItensDeModelo" -DisplayName "Responsáveis sugeridos" -InternalName "ResponsaveisSugeridos"
Ensure-Field     -List "ItensDeModelo" -DisplayName "Livre"                -InternalName "Livre"                -Type Boolean
Ensure-Field     -List "ItensDeModelo" -DisplayName "Prazo relativo (dias)" -InternalName "PrazoRelativo"       -Type Number
Ensure-Field     -List "ItensDeModelo" -DisplayName "Dependência (ordens)" -InternalName "DependenciaOrdens"    -Type Text
Ensure-Field     -List "ItensDeModelo" -DisplayName "Exige aprovação"      -InternalName "ExigeAprovacao"       -Type Boolean
Ensure-Field     -List "ItensDeModelo" -DisplayName "Obrigatório"          -InternalName "Obrigatorio"          -Type Boolean
Ensure-Field     -List "ItensDeModelo" -DisplayName "Exige evidência"      -InternalName "ExigeEvidencia"       -Type Boolean
Ensure-Field     -List "ItensDeModelo" -DisplayName "Visível a todos"      -InternalName "VisivelTodos"         -Type Boolean
Ensure-Field     -List "ItensDeModelo" -DisplayName "Valor inicial"        -InternalName "ValorInicial"         -Type Note
Ensure-Field     -List "ItensDeModelo" -DisplayName "Ordem"                -InternalName "Ordem"                -Type Number
Ensure-Index     -List "ItensDeModelo" -InternalName "Modelo"

# --- Tarefas (Title = Nome) ---
Ensure-Lookup -List "Tarefas" -DisplayName "Modelo de origem" -InternalName "ModeloOrigem" -LookupList "ModelosDeProcesso"
Ensure-Field  -List "Tarefas" -DisplayName "Subtítulo"          -InternalName "Subtitulo"         -Type Text
Ensure-Field  -List "Tarefas" -DisplayName "Recorrente"         -InternalName "Recorrente"        -Type Boolean
Ensure-Field  -List "Tarefas" -DisplayName "Data de referência" -InternalName "DataReferencia"    -Type DateTime
Ensure-Field  -List "Tarefas" -DisplayName "Criador"            -InternalName "Criador"           -Type User
Ensure-Field  -List "Tarefas" -DisplayName "Status geral"       -InternalName "StatusGeral"       -Type Choice -Choices @("Em andamento","Finalizada","Encerrada","Cancelada")
Ensure-Field  -List "Tarefas" -DisplayName "Gestor responsável" -InternalName "GestorResponsavel" -Type User
Ensure-Field  -List "Tarefas" -DisplayName "Encerrada/cancelada em" -InternalName "FechadaEm"     -Type DateTime
Ensure-Field  -List "Tarefas" -DisplayName "Justificativa (cancelamento)" -InternalName "CancelJustificativa" -Type Note
Ensure-Index  -List "Tarefas" -InternalName "StatusGeral"
Ensure-Index  -List "Tarefas" -InternalName "DataReferencia"

# --- ItensDaTarefa (Title = Rótulo) — núcleo operacional (dados + ações) ---
Ensure-Lookup    -List "ItensDaTarefa" -DisplayName "Tarefa" -InternalName "Tarefa" -LookupList "Tarefas"
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Tipo"          -InternalName "Tipo"          -Type Choice -Choices @("Texto","Numero","Data","Check","Observacoes","Evidencia")
Ensure-UserMulti -List "ItensDaTarefa" -DisplayName "Responsáveis"  -InternalName "Responsaveis"
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Livre"         -InternalName "Livre"         -Type Boolean
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Prazo calculado" -InternalName "PrazoCalculado" -Type DateTime
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Status" -InternalName "Status" -Type Choice `
    -Choices @("Dado","Aguardando dependência","Liberada","Em execução","Enviada para validação","Concluída","Rejeitada")
Ensure-Lookup    -List "ItensDaTarefa" -DisplayName "Dependências" -InternalName "Dependencias" -LookupList "ItensDaTarefa" -Multi
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Exige aprovação"    -InternalName "ExigeAprovacao"       -Type Boolean
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Obrigatório"        -InternalName "Obrigatorio"          -Type Boolean
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Exige evidência"    -InternalName "ExigeEvidencia"       -Type Boolean
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Visível a todos"    -InternalName "VisivelTodos"         -Type Boolean
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Valor texto"        -InternalName "ValorTexto"           -Type Note
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Valor número"       -InternalName "ValorNumero"          -Type Number
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Valor data"         -InternalName "ValorData"            -Type DateTime
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Valor check"        -InternalName "ValorCheck"           -Type Boolean
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Observação"         -InternalName "Observacao"           -Type Note
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Enviado p/ validação em" -InternalName "EnviadoValidacaoEm" -Type DateTime
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Validado/rejeitado por"  -InternalName "ValidadoRejeitadoPor" -Type User
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Justificativa"      -InternalName "Justificativa"        -Type Note
Ensure-Field     -List "ItensDaTarefa" -DisplayName "Ordem"              -InternalName "Ordem"                -Type Number
Ensure-Index     -List "ItensDaTarefa" -InternalName "Tarefa"
Ensure-Index     -List "ItensDaTarefa" -InternalName "Status"

# --- HistoricoDaAcao (Title = descrição/curto) ---
Ensure-Lookup -List "HistoricoDaAcao" -DisplayName "Item da tarefa" -InternalName "ItemDaTarefa" -LookupList "ItensDaTarefa"
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Usuário"         -InternalName "Usuario"        -Type User
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Data/hora"       -InternalName "DataHora"       -Type DateTime
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Status anterior" -InternalName "StatusAnterior" -Type Text
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Status novo"     -InternalName "StatusNovo"     -Type Text
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Comentário"      -InternalName "Comentario"     -Type Note
Ensure-Index  -List "HistoricoDaAcao" -InternalName "ItemDaTarefa"

# --- Notificacoes (Title = curto/assunto) ---
Ensure-Field  -List "Notificacoes" -DisplayName "Destinatário" -InternalName "Destinatario" -Type User
Ensure-Lookup -List "Notificacoes" -DisplayName "Item"         -InternalName "Item"         -LookupList "ItensDaTarefa"
Ensure-Field  -List "Notificacoes" -DisplayName "Tipo" -InternalName "Tipo" -Type Choice `
    -Choices @("Atribuída","Liberada","Próxima do vencimento","Atrasada","Enviada p/ validação","Concluída","Reprovada","Encerrada","Cancelada")
Ensure-Field  -List "Notificacoes" -DisplayName "Mensagem"  -InternalName "Mensagem" -Type Note
Ensure-Field  -List "Notificacoes" -DisplayName "Lida"      -InternalName "Lida"     -Type Boolean
Ensure-Field  -List "Notificacoes" -DisplayName "Data/hora" -InternalName "DataHora" -Type DateTime
Ensure-Index  -List "Notificacoes" -InternalName "Destinatario"
Ensure-Index  -List "Notificacoes" -InternalName "Lida"

# --- Evidencias (biblioteca) ---
Ensure-Lookup -List "Evidencias" -DisplayName "Item da tarefa" -InternalName "ItemDaTarefa" -LookupList "ItensDaTarefa"
Ensure-Field  -List "Evidencias" -DisplayName "Tipo de documento" -InternalName "TipoDocumento" -Type Choice -Choices @("Contrato","Comprovante","Termo","Outro")
Ensure-Index  -List "Evidencias" -InternalName "ItemDaTarefa"

Write-Host "`nProvisionamento (v2, modelo unificado) concluído." -ForegroundColor Green
Write-Host "No piloto, mantenha a segurança simplificada (docs/03 §piloto)." -ForegroundColor Green
