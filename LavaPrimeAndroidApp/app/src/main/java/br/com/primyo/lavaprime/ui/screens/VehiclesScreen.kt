package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Event
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.History
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.model.AtendimentoEntity
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.ClienteEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.model.VeiculoEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.formatTimestamp
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.viewmodel.CadastroUiState

private enum class VehiclesFilter(val label: String) {
    TODOS("Todos"),
    COM_CLIENTE("Com cliente"),
    SEM_CLIENTE("Sem cliente"),
    COM_HISTORICO("Com histórico"),
    NO_PATIO("No pátio")
}

private data class VehicleSnapshot(
    val veiculo: VeiculoEntity,
    val ownerName: String,
    val history: List<AtendimentoEntity>,
    val inPatio: Boolean
) {
    val historyCount: Int
        get() = history.size

    val vehicleLabel: String
        get() = listOfNotNull(veiculo.marca, veiculo.modelo).joinToString(" ").ifBlank {
            veiculo.modelo ?: "Modelo não informado"
        }
}

private data class VehicleEditorState(
    val vehicleId: String? = null,
    val placa: String = "",
    val marca: String = "",
    val modelo: String = "",
    val ano: String = "",
    val cor: String = "",
    val tipo: String = vehicleTypes.first(),
    val categoria: String = vehicleCategories.first(),
    val combustivel: String = vehicleFuels.first(),
    val clienteId: String = "sem-cliente",
    val observacoes: String = "",
    val error: String? = null
)

private val vehicleTypes = listOf("Carro", "Moto", "Caminhonete", "Van", "Utilitário")
private val vehicleCategories = listOf("Hatch", "Sedan", "SUV", "Picape", "Executivo", "Comercial", "Outro")
private val vehicleFuels = listOf("Flex", "Gasolina", "Etanol", "Diesel", "Híbrido", "Elétrico", "Outro")

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun VehiclesScreen(
    repository: LavaPrimeRepository,
    state: CadastroUiState,
    usuario: UsuarioEntity,
    onSearchChange: (String) -> Unit,
    onSaveVeiculo: (
        veiculoId: String?,
        placa: String,
        marca: String,
        modelo: String,
        ano: String,
        cor: String,
        tipo: String,
        categoria: String,
        combustivel: String,
        clienteId: String,
        observacoes: String,
        usuario: UsuarioEntity
    ) -> Unit
) {
    val atendimentos by repository.atendimentosRecentes.collectAsStateWithLifecycle(initialValue = emptyList())
    val clientMap = remember(state.clientes) { state.clientes.associateBy { it.id } }
    var selectedFilter by remember { mutableStateOf(VehiclesFilter.TODOS) }
    var editor by remember { mutableStateOf<VehicleEditorState?>(null) }
    var historySnapshot by remember { mutableStateOf<VehicleSnapshot?>(null) }

    val vehicleSnapshots = remember(state.veiculos, atendimentos, clientMap) {
        state.veiculos
            .map { vehicle ->
                val history = atendimentos
                    .filter { it.veiculoId == vehicle.id }
                    .sortedByDescending { it.criadoEm }
                VehicleSnapshot(
                    veiculo = vehicle,
                    ownerName = clientMap[vehicle.clienteId]?.displayName() ?: "Sem cliente vinculado",
                    history = history,
                    inPatio = history.any { it.status != AtendimentoStatus.FINALIZADO && it.status != AtendimentoStatus.CANCELADO }
                )
            }
            .sortedBy { it.veiculo.placa }
    }

    val filteredVehicles = remember(vehicleSnapshots, state.busca, selectedFilter) {
        val query = normalizeVehicleQuery(state.busca)
        vehicleSnapshots.filter { snapshot ->
            matchesVehicleQuery(snapshot, query) && matchesVehicleFilter(snapshot, selectedFilter)
        }
    }

    LazyColumn(
        modifier = Modifier.padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 92.dp)
    ) {
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                LavaPrimeMetricCard(
                    label = "Veículos cadastrados",
                    value = vehicleSnapshots.size.toString(),
                    icon = Icons.Filled.DirectionsCar,
                    support = "Base local"
                )
                LavaPrimeMetricCard(
                    label = "Com cliente",
                    value = vehicleSnapshots.count { it.veiculo.clienteId != "sem-cliente" }.toString(),
                    icon = Icons.Filled.Group,
                    support = "Proprietário vinculado"
                )
                LavaPrimeMetricCard(
                    label = "Com histórico",
                    value = vehicleSnapshots.count { it.historyCount > 0 }.toString(),
                    icon = Icons.Filled.History,
                    support = "Atendimentos lançados"
                )
                LavaPrimeMetricCard(
                    label = "No pátio",
                    value = vehicleSnapshots.count { it.inPatio }.toString(),
                    icon = Icons.Filled.Event,
                    support = "Operação ativa"
                )
            }
        }

        item {
            LavaPrimeTextField(
                value = state.busca,
                onValueChange = onSearchChange,
                label = "Buscar placa, modelo ou proprietário",
                singleLine = true
            )
        }

        item {
            LavaPrimeActionButton(
                text = "Novo veículo",
                onClick = { editor = VehicleEditorState() },
                icon = Icons.Filled.Add,
                modifier = Modifier.fillMaxWidth()
            )
        }

        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                VehiclesFilter.entries.forEach { filter ->
                    FilterChip(
                        selected = selectedFilter == filter,
                        onClick = { selectedFilter = filter },
                        label = { Text(filter.label) }
                    )
                }
            }
        }

        if (filteredVehicles.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum veículo encontrado",
                    description = "Ajuste a busca ou cadastre um veículo.",
                    icon = Icons.Filled.DirectionsCar
                )
            }
        } else {
            items(filteredVehicles, key = { it.veiculo.id }) { snapshot ->
                VehicleCard(
                    snapshot = snapshot,
                    onEdit = { editor = snapshot.toEditorState() },
                    onHistory = { historySnapshot = snapshot }
                )
            }
        }
    }

    editor?.let { draft ->
        VehicleEditorDialog(
            state = draft,
            clientes = state.clientes,
            onDismiss = { editor = null },
            onChange = { editor = it },
            onConfirm = { current ->
                val validation = validateVehicleDraft(current, state.veiculos)
                if (validation != null) {
                    editor = current.copy(error = validation)
                } else {
                    onSaveVeiculo(
                        current.vehicleId,
                        current.placa,
                        current.marca,
                        current.modelo,
                        current.ano,
                        current.cor,
                        current.tipo,
                        normalizedCategory(current.tipo, current.categoria),
                        current.combustivel,
                        current.clienteId,
                        current.observacoes,
                        usuario
                    )
                    editor = null
                }
            }
        )
    }

    historySnapshot?.let { snapshot ->
        VehicleHistoryDialog(
            snapshot = snapshot,
            onDismiss = { historySnapshot = null }
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun VehicleCard(
    snapshot: VehicleSnapshot,
    onEdit: () -> Unit,
    onHistory: () -> Unit
) {
    LavaPrimeCard(modifier = Modifier.fillMaxWidth()) {
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalAlignment = Alignment.Top
            ) {
                Surface(
                    color = Color(0xFFE8F7FE),
                    contentColor = Color(0xFF0B5876),
                    shape = RoundedCornerShape(16.dp)
                ) {
                    Box(
                        modifier = Modifier.padding(10.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Filled.DirectionsCar, contentDescription = null)
                    }
                }

                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(
                        text = snapshot.veiculo.placa,
                        style = MaterialTheme.typography.titleMedium,
                        color = Color(0xFF0B3348),
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = snapshot.vehicleLabel,
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(0xFF4E6470),
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                LavaPrimeStatusChip(
                    text = if (snapshot.veiculo.clienteId == "sem-cliente") "Sem cliente" else "Com cliente",
                    tone = if (snapshot.veiculo.clienteId == "sem-cliente") LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
                )
                LavaPrimeStatusChip(
                    text = if (snapshot.inPatio) "No pátio" else "Fora do pátio",
                    tone = if (snapshot.inPatio) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Neutral
                )
                LavaPrimeStatusChip(
                    text = "${snapshot.historyCount} registro(s)",
                    tone = if (snapshot.historyCount > 0) LavaPrimeStatusTone.Info else LavaPrimeStatusTone.Neutral
                )
            }

            VehicleInfoLine("Proprietário", snapshot.ownerName)
            VehicleInfoLine("Ano / Cor", listOfNotNull(snapshot.veiculo.ano, snapshot.veiculo.cor).joinToString(" / ").ifBlank { "-" })
            VehicleInfoLine(
                "Tipo",
                listOfNotNull(snapshot.veiculo.tipo, snapshot.veiculo.categoria?.takeIf { shouldUseVehicleCategory(snapshot.veiculo.tipo) }).joinToString(" / ")
            )
            VehicleInfoLine("Combustível", snapshot.veiculo.combustivel ?: "-")
            snapshot.veiculo.observacoes?.takeIf { it.isNotBlank() }?.let {
                VehicleInfoLine("Observações", it)
            }

            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                LavaPrimeActionButton(
                    text = "Editar",
                    onClick = onEdit,
                    icon = Icons.Filled.Edit,
                    style = LavaPrimeActionStyle.Outline,
                    modifier = Modifier.fillMaxWidth()
                )
                LavaPrimeActionButton(
                    text = "Histórico",
                    onClick = onHistory,
                    icon = Icons.Filled.History,
                    style = LavaPrimeActionStyle.Ghost,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}

@Composable
private fun VehicleInfoLine(
    label: String,
    value: String
) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "$label:",
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF4E6470),
            fontWeight = FontWeight.SemiBold
        )
        Text(
            text = value.ifBlank { "-" },
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF0B3348)
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun VehicleEditorDialog(
    state: VehicleEditorState,
    clientes: List<ClienteEntity>,
    onDismiss: () -> Unit,
    onChange: (VehicleEditorState) -> Unit,
    onConfirm: (VehicleEditorState) -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                if (state.vehicleId == null) "Novo veículo" else state.placa,
                color = Color(0xFF0B3348),
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item {
                    LavaPrimeTextField(
                        value = state.placa,
                        onValueChange = { onChange(state.copy(placa = formatPlateInput(it), error = null)) },
                        label = "Placa",
                        singleLine = true,
                        enabled = state.vehicleId == null
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.marca,
                        onValueChange = { onChange(state.copy(marca = it, error = null)) },
                        label = "Marca",
                        singleLine = true
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.modelo,
                        onValueChange = { onChange(state.copy(modelo = it, error = null)) },
                        label = "Modelo",
                        singleLine = true
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.ano,
                        onValueChange = { onChange(state.copy(ano = it.filter(Char::isDigit).take(4), error = null)) },
                        label = "Ano",
                        singleLine = true
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.cor,
                        onValueChange = { onChange(state.copy(cor = it, error = null)) },
                        label = "Cor",
                        singleLine = true
                    )
                }
                item {
                    SelectorGroup(
                        label = "Tipo de veículo",
                        options = vehicleTypes,
                        selected = state.tipo,
                        onSelect = { selected ->
                            onChange(
                                state.copy(
                                    tipo = selected,
                                    categoria = normalizedCategory(selected, state.categoria),
                                    error = null
                                )
                            )
                        }
                    )
                }
                if (shouldUseVehicleCategory(state.tipo)) {
                    item {
                        SelectorGroup(
                            label = "Categoria",
                            options = vehicleCategories,
                            selected = normalizedCategory(state.tipo, state.categoria),
                            onSelect = { selected -> onChange(state.copy(categoria = selected, error = null)) }
                        )
                    }
                }
                item {
                    SelectorGroup(
                        label = "Combustível",
                        options = vehicleFuels,
                        selected = state.combustivel,
                        onSelect = { selected -> onChange(state.copy(combustivel = selected, error = null)) }
                    )
                }
                item {
                    SelectorGroup(
                        label = "Proprietário atual",
                        options = listOf("sem-cliente") + clientes.map { it.id },
                        selected = state.clienteId.ifBlank { "sem-cliente" },
                        labelProvider = { id ->
                            if (id == "sem-cliente") "Sem cliente vinculado"
                            else clientes.firstOrNull { it.id == id }?.displayName() ?: "Cliente"
                        },
                        onSelect = { selected -> onChange(state.copy(clienteId = selected, error = null)) }
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.observacoes,
                        onValueChange = { onChange(state.copy(observacoes = it, error = null)) },
                        label = "Observações do veículo",
                        minLines = 2
                    )
                }
                state.error?.let { message ->
                    item {
                        Text(
                            text = message,
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFFB42318)
                        )
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = { onConfirm(state) }) {
                Text(if (state.vehicleId == null) "Salvar veículo" else "Atualizar veículo")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancelar")
            }
        },
        shape = RoundedCornerShape(28.dp),
        containerColor = Color.White
    )
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun SelectorGroup(
    label: String,
    options: List<String>,
    selected: String,
    labelProvider: (String) -> String = { it },
    onSelect: (String) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelLarge,
            color = Color(0xFF0B3348),
            fontWeight = FontWeight.SemiBold
        )
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            options.forEach { option ->
                FilterChip(
                    selected = selected == option,
                    onClick = { onSelect(option) },
                    label = {
                        Text(
                            text = labelProvider(option),
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                )
            }
        }
    }
}

@Composable
private fun VehicleHistoryDialog(
    snapshot: VehicleSnapshot,
    onDismiss: () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "Histórico do veículo",
                color = Color(0xFF0B3348),
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item {
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text(
                            text = snapshot.veiculo.placa,
                            style = MaterialTheme.typography.titleMedium,
                            color = Color(0xFF0B3348),
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = snapshot.vehicleLabel,
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFF4E6470)
                        )
                        Text(
                            text = snapshot.ownerName,
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFF4E6470)
                        )
                    }
                }
                if (snapshot.history.isEmpty()) {
                    item {
                        Text(
                            text = "Nenhum atendimento registrado para este veículo.",
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFF4E6470)
                        )
                    }
                } else {
                    items(snapshot.history.take(6), key = { it.id }) { atendimento ->
                        LavaPrimeCard(tonal = true, modifier = Modifier.fillMaxWidth()) {
                            Text(
                                text = atendimento.servicoNomeSnapshot,
                                style = MaterialTheme.typography.titleSmall,
                                color = Color(0xFF0B3348),
                                fontWeight = FontWeight.SemiBold
                            )
                            LavaPrimeStatusChip(
                                text = atendimento.status.name.replace('_', ' '),
                                tone = when (atendimento.status) {
                                    AtendimentoStatus.FINALIZADO -> LavaPrimeStatusTone.Success
                                    AtendimentoStatus.CANCELADO -> LavaPrimeStatusTone.Danger
                                    AtendimentoStatus.EXECUCAO -> LavaPrimeStatusTone.Warning
                                    else -> LavaPrimeStatusTone.Info
                                }
                            )
                            VehicleInfoLine("Cliente", atendimento.clienteNomeSnapshot)
                            VehicleInfoLine("Valor", money(atendimento.valorCentavos))
                            VehicleInfoLine("Data", formatTimestamp(atendimento.criadoEm))
                        }
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = onDismiss) {
                Text("Fechar")
            }
        },
        dismissButton = {}
    )
}

private fun matchesVehicleFilter(
    snapshot: VehicleSnapshot,
    filter: VehiclesFilter
): Boolean = when (filter) {
    VehiclesFilter.TODOS -> true
    VehiclesFilter.COM_CLIENTE -> snapshot.veiculo.clienteId != "sem-cliente"
    VehiclesFilter.SEM_CLIENTE -> snapshot.veiculo.clienteId == "sem-cliente"
    VehiclesFilter.COM_HISTORICO -> snapshot.historyCount > 0
    VehiclesFilter.NO_PATIO -> snapshot.inPatio
}

private fun matchesVehicleQuery(
    snapshot: VehicleSnapshot,
    query: String
): Boolean {
    if (query.isBlank()) return true
    val haystack = buildString {
        append(snapshot.veiculo.placa)
        append(' ')
        append(snapshot.veiculo.marca.orEmpty())
        append(' ')
        append(snapshot.veiculo.modelo.orEmpty())
        append(' ')
        append(snapshot.veiculo.ano.orEmpty())
        append(' ')
        append(snapshot.veiculo.cor.orEmpty())
        append(' ')
        append(snapshot.ownerName)
    }
    return normalizeVehicleQuery(haystack).contains(query)
}

private fun validateVehicleDraft(
    draft: VehicleEditorState,
    veiculos: List<VeiculoEntity>
): String? {
    if (draft.placa.length < 7) return "Informe uma placa válida."
    if (draft.modelo.trim().isBlank()) return "Informe o modelo do veículo."
    if (draft.ano.isNotBlank() && draft.ano.length != 4) return "Informe o ano com quatro dígitos."
    if (shouldUseVehicleCategory(draft.tipo) && normalizedCategory(draft.tipo, draft.categoria).isBlank()) {
        return "Selecione a categoria do veículo."
    }
    val duplicate = veiculos.firstOrNull {
        it.placa.equals(draft.placa, ignoreCase = true) && it.id != draft.vehicleId
    }
    if (duplicate != null) return "${draft.placa} já está cadastrada."
    return null
}

private fun VehicleSnapshot.toEditorState(): VehicleEditorState {
    return VehicleEditorState(
        vehicleId = veiculo.id,
        placa = veiculo.placa,
        marca = veiculo.marca.orEmpty(),
        modelo = veiculo.modelo.orEmpty(),
        ano = veiculo.ano.orEmpty(),
        cor = veiculo.cor.orEmpty(),
        tipo = veiculo.tipo,
        categoria = normalizedCategory(veiculo.tipo, veiculo.categoria.orEmpty()),
        combustivel = veiculo.combustivel ?: vehicleFuels.first(),
        clienteId = veiculo.clienteId,
        observacoes = veiculo.observacoes.orEmpty()
    )
}

private fun ClienteEntity.displayName(): String {
    return if (personType == "PJ") {
        legalName?.takeIf { it.isNotBlank() } ?: nome
    } else {
        nome
    }
}

private fun normalizeVehicleQuery(value: String): String {
    return value.lowercase()
        .replace("á", "a")
        .replace("à", "a")
        .replace("â", "a")
        .replace("ã", "a")
        .replace("é", "e")
        .replace("ê", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ô", "o")
        .replace("õ", "o")
        .replace("ú", "u")
        .replace("ç", "c")
}

private fun shouldUseVehicleCategory(type: String): Boolean = !type.equals("Moto", ignoreCase = true)

private fun normalizedCategory(type: String, category: String): String {
    if (!shouldUseVehicleCategory(type)) return ""
    return category.ifBlank { vehicleCategories.first() }
}

private fun formatPlateInput(value: String): String {
    return value.uppercase().filter { it.isLetterOrDigit() }.take(8)
}
