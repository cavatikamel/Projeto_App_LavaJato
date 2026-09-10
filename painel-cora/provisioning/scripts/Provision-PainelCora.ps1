<#
.SYNOPSIS
    Provisiona as listas, colunas, escolhas e biblioteca do "Painel Cora - DP".
.DESCRIPTION
    Idempotente. Executar APÓS Connect-PnPOnline no site de destino.
    Requer módulo PnP.PowerShell.
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
        [string]$Type,            # Text, Note, Number, DateTime, Boolean, Choice, User, Currency
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

function Ensure-Lookup {
    param(
        [string]$List, [string]$DisplayName, [string]$InternalName,
        [string]$LookupList, [string]$LookupField = "Title", [switch]$Required
    )
    $existing = Get-PnPField -List $List -Identity $InternalName -ErrorAction SilentlyContinue
    if ($null -ne $existing) { Write-Host "  lookup já existe: $List/$InternalName"; return }
    Write-Host "  criando lookup: $List/$InternalName -> $LookupList.$LookupField"
    Add-PnPFieldFromXml -List $List -FieldXml @"
<Field Type='Lookup' DisplayName='$DisplayName' Name='$InternalName' StaticName='$InternalName'
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

Ensure-List -Title "Solucionadores"        | Out-Null
Ensure-List -Title "ModelosDeProcesso"      | Out-Null
Ensure-List -Title "CamposDeModelo"         | Out-Null
Ensure-List -Title "AcoesDeModelo"          | Out-Null
Ensure-List -Title "Tarefas"                | Out-Null
Ensure-List -Title "DadosDaTarefa"          | Out-Null
Ensure-List -Title "AcoesDaTarefa"          | Out-Null
Ensure-List -Title "HistoricoDaAcao"        | Out-Null
Ensure-List -Title "Notificacoes"           | Out-Null
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
Ensure-Index  -List "Solucionadores" -InternalName "Email"
Ensure-Index  -List "Solucionadores" -InternalName "Ativo"

# --- ModelosDeProcesso (Title = Nome) ---
Ensure-Field  -List "ModelosDeProcesso" -DisplayName "Descrição" -InternalName "Descricao"  -Type Note
Ensure-Field  -List "ModelosDeProcesso" -DisplayName "Ativo"     -InternalName "Ativo"      -Type Boolean
Ensure-Field  -List "ModelosDeProcesso" -DisplayName "Recorrente"-InternalName "Recorrente" -Type Boolean

# --- CamposDeModelo (Title = Nome do campo) ---
Ensure-Lookup -List "CamposDeModelo" -DisplayName "Modelo" -InternalName "Modelo" -LookupList "ModelosDeProcesso"
Ensure-Field  -List "CamposDeModelo" -DisplayName "Tipo"        -InternalName "Tipo"        -Type Choice -Choices @("Texto","Numero","Data")
Ensure-Field  -List "CamposDeModelo" -DisplayName "Obrigatório" -InternalName "Obrigatorio" -Type Boolean
Ensure-Field  -List "CamposDeModelo" -DisplayName "Ordem"       -InternalName "Ordem"       -Type Number
Ensure-Index  -List "CamposDeModelo" -InternalName "Modelo"

# --- AcoesDeModelo (Title = Nome da ação) ---
Ensure-Lookup -List "AcoesDeModelo" -DisplayName "Modelo"               -InternalName "Modelo"               -LookupList "ModelosDeProcesso"
Ensure-Lookup -List "AcoesDeModelo" -DisplayName "Responsável sugerido" -InternalName "ResponsavelSugerido"  -LookupList "Solucionadores"
Ensure-Field  -List "AcoesDeModelo" -DisplayName "Prazo relativo (dias)" -InternalName "PrazoRelativo"       -Type Number
Ensure-Field  -List "AcoesDeModelo" -DisplayName "Dependência (ordem)"   -InternalName "DependenciaOrdem"    -Type Number
Ensure-Field  -List "AcoesDeModelo" -DisplayName "Checklist"             -InternalName "Checklist"           -Type Note
Ensure-Field  -List "AcoesDeModelo" -DisplayName "Evidência obrigatória" -InternalName "EvidenciaObrigatoria"-Type Boolean
Ensure-Field  -List "AcoesDeModelo" -DisplayName "Modo de liberação"     -InternalName "ModoLiberacao"       -Type Choice -Choices @("AposValidacaoGestor","AposEvidencia")
Ensure-Field  -List "AcoesDeModelo" -DisplayName "Ordem"                 -InternalName "Ordem"               -Type Number
Ensure-Index  -List "AcoesDeModelo" -InternalName "Modelo"

# --- Tarefas (Title = Nome) ---
Ensure-Lookup -List "Tarefas" -DisplayName "Modelo de origem" -InternalName "ModeloOrigem" -LookupList "ModelosDeProcesso"
Ensure-Field  -List "Tarefas" -DisplayName "Data de referência" -InternalName "DataReferencia"    -Type DateTime
Ensure-Field  -List "Tarefas" -DisplayName "Criador"            -InternalName "Criador"           -Type User
Ensure-Field  -List "Tarefas" -DisplayName "Status geral"       -InternalName "StatusGeral"       -Type Choice -Choices @("Em andamento","Concluída","Cancelada")
Ensure-Field  -List "Tarefas" -DisplayName "Gestor responsável" -InternalName "GestorResponsavel" -Type User
Ensure-Index  -List "Tarefas" -InternalName "StatusGeral"
Ensure-Index  -List "Tarefas" -InternalName "DataReferencia"

# --- DadosDaTarefa (Title = descrição livre; valores por tipo) ---
Ensure-Lookup -List "DadosDaTarefa" -DisplayName "Tarefa" -InternalName "Tarefa" -LookupList "Tarefas"
Ensure-Lookup -List "DadosDaTarefa" -DisplayName "Campo"  -InternalName "Campo"  -LookupList "CamposDeModelo"
Ensure-Field  -List "DadosDaTarefa" -DisplayName "Valor texto"  -InternalName "ValorTexto"  -Type Text
Ensure-Field  -List "DadosDaTarefa" -DisplayName "Valor número" -InternalName "ValorNumero" -Type Number
Ensure-Field  -List "DadosDaTarefa" -DisplayName "Valor data"   -InternalName "ValorData"   -Type DateTime
Ensure-Index  -List "DadosDaTarefa" -InternalName "Tarefa"

# --- AcoesDaTarefa (Title = Nome da ação) ---
Ensure-Lookup -List "AcoesDaTarefa" -DisplayName "Tarefa"      -InternalName "Tarefa"      -LookupList "Tarefas"
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Solucionador" -InternalName "Solucionador" -Type User
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Prazo calculado" -InternalName "PrazoCalculado" -Type DateTime
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Status" -InternalName "Status" -Type Choice `
    -Choices @("Aguardando dependência","Liberada","Em execução","Enviada para validação","Encerrada","Rejeitada")
Ensure-Lookup -List "AcoesDaTarefa" -DisplayName "Dependência" -InternalName "Dependencia" -LookupList "AcoesDaTarefa"
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Checklist"            -InternalName "Checklist"            -Type Note
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Estado do checklist"  -InternalName "ChecklistEstado"      -Type Note
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Observação"           -InternalName "Observacao"           -Type Note
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Evidência obrigatória" -InternalName "EvidenciaObrigatoria" -Type Boolean
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Modo de liberação"    -InternalName "ModoLiberacao"        -Type Choice -Choices @("AposValidacaoGestor","AposEvidencia")
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Enviado p/ validação em" -InternalName "EnviadoValidacaoEm" -Type DateTime
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Validado/rejeitado por"  -InternalName "ValidadoRejeitadoPor" -Type User
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Justificativa"        -InternalName "Justificativa"        -Type Note
Ensure-Field  -List "AcoesDaTarefa" -DisplayName "Ordem"                -InternalName "Ordem"                -Type Number
Ensure-Index  -List "AcoesDaTarefa" -InternalName "Tarefa"
Ensure-Index  -List "AcoesDaTarefa" -InternalName "Status"
Ensure-Index  -List "AcoesDaTarefa" -InternalName "PrazoCalculado"

# --- HistoricoDaAcao (Title = descrição/curto) ---
Ensure-Lookup -List "HistoricoDaAcao" -DisplayName "Ação da tarefa" -InternalName "AcaoDaTarefa" -LookupList "AcoesDaTarefa"
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Usuário"         -InternalName "Usuario"        -Type User
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Data/hora"       -InternalName "DataHora"       -Type DateTime
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Status anterior" -InternalName "StatusAnterior" -Type Text
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Status novo"     -InternalName "StatusNovo"     -Type Text
Ensure-Field  -List "HistoricoDaAcao" -DisplayName "Comentário"      -InternalName "Comentario"     -Type Note
Ensure-Index  -List "HistoricoDaAcao" -InternalName "AcaoDaTarefa"

# --- Notificacoes (Title = curto/assunto) ---
Ensure-Field  -List "Notificacoes" -DisplayName "Destinatário" -InternalName "Destinatario" -Type User
Ensure-Lookup -List "Notificacoes" -DisplayName "Ação"         -InternalName "Acao"         -LookupList "AcoesDaTarefa"
Ensure-Field  -List "Notificacoes" -DisplayName "Tipo" -InternalName "Tipo" -Type Choice `
    -Choices @("Atribuída","Liberada","Próxima do vencimento","Atrasada","Enviada p/ validação","Rejeitada","Devolvida","Encerrada")
Ensure-Field  -List "Notificacoes" -DisplayName "Mensagem"  -InternalName "Mensagem" -Type Note
Ensure-Field  -List "Notificacoes" -DisplayName "Lida"      -InternalName "Lida"     -Type Boolean
Ensure-Field  -List "Notificacoes" -DisplayName "Data/hora" -InternalName "DataHora" -Type DateTime
Ensure-Index  -List "Notificacoes" -InternalName "Destinatario"
Ensure-Index  -List "Notificacoes" -InternalName "Lida"

# --- Evidencias (biblioteca) ---
Ensure-Lookup -List "Evidencias" -DisplayName "Ação da tarefa" -InternalName "AcaoDaTarefa" -LookupList "AcoesDaTarefa"
Ensure-Field  -List "Evidencias" -DisplayName "Tipo de documento" -InternalName "TipoDocumento" -Type Choice -Choices @("Contrato","Comprovante","Termo","Outro")
Ensure-Index  -List "Evidencias" -InternalName "AcaoDaTarefa"

Write-Host "`nProvisionamento concluído. Aplique a segurança (docs/03) em seguida." -ForegroundColor Green
