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
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Category
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.money
import kotlinx.coroutines.launch

private enum class ServicesFilter(val label: String) {
    TODOS("Todos"),
    ATIVOS("Ativos"),
    INATIVOS("Inativos"),
    COM_FICHA("Com ficha"),
    COM_MANUTENCAO("Com manutenção")
}

private data class ServiceEditorState(
    val serviceId: String? = null,
    val nome: String = "",
    val tipoVeiculo: String = serviceVehicleTypes.first(),
    val categoriaVeiculo: String = serviceVehicleCategories.first(),
    val valor: String = "",
    val tempo: String = "30",
    val status: String = serviceStatuses.first(),
    val fichaTecnicaAtiva: Boolean = false,
    val custoFicha: String = "",
    val usaProdutoAcido: Boolean = false,
    val usaProdutoAlcalino: Boolean = false,
    val phEstimado: String = "",
    val requerManutencao: Boolean = false,
    val intervaloManutencao: String = maintenanceIntervals.first(),
    val dataManutencao: String = "",
    val error: String? = null
)

private val serviceVehicleTypes = listOf("Carro", "Moto", "Caminhonete", "Van", "Utilitário")
private val serviceVehicleCategories = listOf("Hatch", "Sedan", "SUV", "Picape", "Executivo", "Comercial", "Outro")
private val serviceStatuses = listOf("Ativo", "Inativo")
private val maintenanceIntervals = listOf("monthly", "quarterly", "semiannual", "custom")

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ServicesScreen(
    repository: LavaPrimeRepository,
    usuario: UsuarioEntity
) {
    val servicos by repository.servicos.collectAsStateWithLifecycle(initialValue = emptyList())
    val scope = rememberCoroutineScope()
    var query by remember { mutableStateOf("") }
    var selectedFilter by remember { mutableStateOf(ServicesFilter.TODOS) }
    var editor by remember { mutableStateOf<ServiceEditorState?>(null) }

    val sortedServices = remember(servicos) {
        servicos.sortedWith(
            compareByDescending<ServicoEntity> { it.ativo }
                .thenBy { it.nome.lowercase() }
        )
    }
    val filteredServices = remember(sortedServices, query, selectedFilter) {
        val normalizedQuery = normalizeServiceQuery(query)
        sortedServices.filter { service ->
            matchesServiceQuery(service, normalizedQuery) && matchesServiceFilter(service, selectedFilter)
        }
    }

    val activeCount = sortedServices.count { it.ativo }
    val vehicleTypesCount = sortedServices.map { it.tipoVeiculo }.distinct().size
    val categoriesCount = sortedServices.mapNotNull { it.categoriaVeiculo }.distinct().size
    val technicalCount = sortedServices.count { it.fichaTecnicaAtiva }

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
                    label = "Serviços ativos",
                    value = activeCount.toString(),
                    icon = Icons.Filled.Build,
                    support = "Catálogo atual"
                )
                LavaPrimeMetricCard(
                    label = "Tipos de veículo",
                    value = vehicleTypesCount.toString(),
                    icon = Icons.Filled.DirectionsCar,
                    support = "Escopos atendidos"
                )
                LavaPrimeMetricCard(
                    label = "Categorias",
                    value = categoriesCount.toString(),
                    icon = Icons.Filled.Category,
                    support = "Recortes do catálogo"
                )
                LavaPrimeMetricCard(
                    label = "Fichas técnicas",
                    value = "$technicalCount/${sortedServices.size}",
                    icon = Icons.Filled.Description,
                    support = "Cobertura técnica"
                )
            }
        }
        item {
            LavaPrimeTextField(
                value = query,
                onValueChange = { query = it },
                label = "Buscar serviço, tipo ou categoria",
                singleLine = true
            )
        }
        item {
            LavaPrimeActionButton(
                text = "Novo serviço",
                onClick = { editor = ServiceEditorState() },
                icon = Icons.Filled.Add,
                modifier = Modifier.fillMaxWidth()
            )
        }
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                ServicesFilter.entries.forEach { filter ->
                    FilterChip(
                        selected = selectedFilter == filter,
                        onClick = { selectedFilter = filter },
                        label = { Text(filter.label) }
                    )
                }
            }
        }
        item {
            ServicesRegistryPanel(sortedServices)
        }
        if (filteredServices.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum serviço encontrado",
                    description = "Ajuste a busca ou cadastre um serviço.",
                    icon = Icons.Filled.Build
                )
            }
        } else {
            items(filteredServices, key = { it.id }) { service ->
                ServiceCard(
                    service = service,
                    onEdit = { editor = service.toEditorState() }
                )
            }
        }
    }

    editor?.let { current ->
        ServiceEditorDialog(
            state = current,
            onDismiss = { editor = null },
            onChange = { editor = it },
            onConfirm = { draft ->
                val validation = validateServiceDraft(draft, sortedServices)
                if (validation != null) {
                    editor = draft.copy(error = validation)
                } else {
                    scope.launch {
                        repository.salvarServicoCompleto(
                            servicoId = draft.serviceId,
                            nome = draft.nome.trim(),
                            tipoVeiculo = draft.tipoVeiculo,
                            categoriaVeiculo = normalizedServiceCategory(draft.tipoVeiculo, draft.categoriaVeiculo),
                            precoBaseCentavos = parseCurrencyToCents(draft.valor),
                            tempoEstimadoMin = draft.tempo.filter(Char::isDigit).toIntOrNull() ?: 30,
                            statusCatalogo = draft.status,
                            fichaTecnicaAtiva = draft.fichaTecnicaAtiva,
                            custoFichaTecnicaCentavos = parseCurrencyToCents(draft.custoFicha),
                            usaProdutoAcido = draft.usaProdutoAcido,
                            usaProdutoAlcalino = draft.usaProdutoAlcalino,
                            phEstimado = draft.phEstimado.replace(",", ".").toDoubleOrNull(),
                            requerManutencao = draft.requerManutencao,
                            intervaloManutencao = draft.intervaloManutencao,
                            dataManutencao = draft.dataManutencao.trim(),
                            usuario = usuario
                        )
                    }
                    editor = null
                }
            }
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ServicesRegistryPanel(services: List<ServicoEntity>) {
    val activeTypes = remember(services) {
        services.map { it.tipoVeiculo }.distinct().ifEmpty { serviceVehicleTypes }
    }
    val activeCategories = remember(services) {
        services.mapNotNull { it.categoriaVeiculo }.distinct().ifEmpty { serviceVehicleCategories }
    }

    LavaPrimeCard(modifier = Modifier.fillMaxWidth(), tonal = true) {
        Text(
            text = "Tipos e categorias",
            style = MaterialTheme.typography.titleMedium,
            color = Color(0xFF0B3348),
            fontWeight = FontWeight.Bold
        )
        Text(
            text = "Veículos",
            style = MaterialTheme.typography.labelLarge,
            color = Color(0xFF4E6470)
        )
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            activeTypes.forEach { type ->
                LavaPrimeStatusChip(
                    text = type,
                    tone = LavaPrimeStatusTone.Info,
                    icon = Icons.Filled.DirectionsCar
                )
            }
        }
        Text(
            text = "Categorias",
            style = MaterialTheme.typography.labelLarge,
            color = Color(0xFF4E6470)
        )
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            activeCategories.forEach { category ->
                LavaPrimeStatusChip(
                    text = category,
                    tone = LavaPrimeStatusTone.Neutral,
                    icon = Icons.Filled.Category
                )
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ServiceCard(
    service: ServicoEntity,
    onEdit: () -> Unit
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
                        Icon(Icons.Filled.Build, contentDescription = null)
                    }
                }
                Column(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Text(
                        text = service.nome,
                        style = MaterialTheme.typography.titleMedium,
                        color = Color(0xFF0B3348),
                        fontWeight = FontWeight.Bold,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                    Text(
                        text = formatVehicleScope(service.tipoVeiculo, service.categoriaVeiculo),
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
                    text = service.statusCatalogo,
                    tone = if (service.ativo) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Neutral
                )
                LavaPrimeStatusChip(
                    text = "${service.tempoEstimadoMin} min",
                    tone = LavaPrimeStatusTone.Info,
                    icon = Icons.Filled.Schedule
                )
                if (service.fichaTecnicaAtiva) {
                    LavaPrimeStatusChip(
                        text = "Ficha técnica",
                        tone = LavaPrimeStatusTone.Info,
                        icon = Icons.Filled.Description
                    )
                }
                if (service.requerManutencao) {
                    LavaPrimeStatusChip(
                        text = "Requer manutenção",
                        tone = LavaPrimeStatusTone.Warning,
                        icon = Icons.Filled.WarningAmber
                    )
                }
            }

            ServiceInfoLine("Preço", money(service.precoBaseCentavos))
            ServiceInfoLine("Tipo de veículo", service.tipoVeiculo)
            ServiceInfoLine(
                "Categoria de veículo",
                service.categoriaVeiculo.takeUnless { it.isNullOrBlank() } ?: "-"
            )
            if (service.fichaTecnicaAtiva) {
                ServiceInfoLine("Custo aproximado", money(service.custoFichaTecnicaCentavos))
                ServiceInfoLine(
                    "Química",
                    buildList {
                        if (service.usaProdutoAcido) add("Ácido")
                        if (service.usaProdutoAlcalino) add("Alcalino")
                    }.joinToString(" / ").ifBlank { "Sem alerta químico" }
                )
                ServiceInfoLine("pH estimado", service.phEstimado?.toString() ?: "-")
            }

            LavaPrimeActionButton(
                text = "Editar",
                onClick = onEdit,
                icon = Icons.Filled.Edit,
                style = LavaPrimeActionStyle.Outline,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}

@Composable
private fun ServiceInfoLine(
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
private fun ServiceEditorDialog(
    state: ServiceEditorState,
    onDismiss: () -> Unit,
    onChange: (ServiceEditorState) -> Unit,
    onConfirm: (ServiceEditorState) -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = if (state.serviceId == null) "Novo serviço" else "Editar serviço",
                color = Color(0xFF0B3348),
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item {
                    LavaPrimeTextField(
                        value = state.nome,
                        onValueChange = { onChange(state.copy(nome = it, error = null)) },
                        label = "Nome do serviço",
                        singleLine = true
                    )
                }
                item {
                    SelectorGroup(
                        label = "Tipo de veículo",
                        options = serviceVehicleTypes,
                        selected = state.tipoVeiculo,
                        onSelect = { selected ->
                            onChange(
                                state.copy(
                                    tipoVeiculo = selected,
                                    categoriaVeiculo = normalizedServiceCategory(selected, state.categoriaVeiculo),
                                    error = null
                                )
                            )
                        }
                    )
                }
                if (shouldUseServiceCategory(state.tipoVeiculo)) {
                    item {
                        SelectorGroup(
                            label = "Categoria de veículo",
                            options = serviceVehicleCategories,
                            selected = normalizedServiceCategory(state.tipoVeiculo, state.categoriaVeiculo),
                            onSelect = { selected ->
                                onChange(state.copy(categoriaVeiculo = selected, error = null))
                            }
                        )
                    }
                }
                item {
                    LavaPrimeTextField(
                        value = state.valor,
                        onValueChange = { onChange(state.copy(valor = formatCurrencyInput(it), error = null)) },
                        label = "Valor",
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.tempo,
                        onValueChange = { onChange(state.copy(tempo = it.filter(Char::isDigit).take(3), error = null)) },
                        label = "Tempo previsto (min)",
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                    )
                }
                item {
                    SelectorGroup(
                        label = "Status",
                        options = serviceStatuses,
                        selected = state.status,
                        onSelect = { onChange(state.copy(status = it, error = null)) }
                    )
                }
                item {
                    ToggleField(
                        label = "Ficha técnica",
                        checked = state.fichaTecnicaAtiva,
                        onCheckedChange = {
                            onChange(
                                state.copy(
                                    fichaTecnicaAtiva = it,
                                    custoFicha = if (it) state.custoFicha else "",
                                    usaProdutoAcido = if (it) state.usaProdutoAcido else false,
                                    usaProdutoAlcalino = if (it) state.usaProdutoAlcalino else false,
                                    phEstimado = if (it) state.phEstimado else "",
                                    error = null
                                )
                            )
                        }
                    )
                }
                if (state.fichaTecnicaAtiva) {
                    item {
                        LavaPrimeTextField(
                            value = state.custoFicha,
                            onValueChange = { onChange(state.copy(custoFicha = formatCurrencyInput(it), error = null)) },
                            label = "Custo aproximado",
                            singleLine = true,
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                        )
                    }
                    item {
                        ToggleField(
                            label = "Usa produto ácido",
                            checked = state.usaProdutoAcido,
                            onCheckedChange = { onChange(state.copy(usaProdutoAcido = it, error = null)) }
                        )
                    }
                    item {
                        ToggleField(
                            label = "Usa produto alcalino",
                            checked = state.usaProdutoAlcalino,
                            onCheckedChange = { onChange(state.copy(usaProdutoAlcalino = it, error = null)) }
                        )
                    }
                    item {
                        LavaPrimeTextField(
                            value = state.phEstimado,
                            onValueChange = {
                                onChange(
                                    state.copy(
                                        phEstimado = it.filter { char -> char.isDigit() || char == ',' || char == '.' }.take(4),
                                        error = null
                                    )
                                )
                            },
                            label = "pH estimado",
                            singleLine = true,
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal)
                        )
                    }
                }
                item {
                    ToggleField(
                        label = "Requer manutenção",
                        checked = state.requerManutencao,
                        onCheckedChange = {
                            onChange(
                                state.copy(
                                    requerManutencao = it,
                                    intervaloManutencao = if (it) state.intervaloManutencao else maintenanceIntervals.first(),
                                    dataManutencao = if (it) state.dataManutencao else "",
                                    error = null
                                )
                            )
                        }
                    )
                }
                if (state.requerManutencao) {
                    item {
                        SelectorGroup(
                            label = "Intervalo",
                            options = maintenanceIntervals,
                            selected = state.intervaloManutencao,
                            labelProvider = ::maintenanceLabel,
                            onSelect = {
                                onChange(
                                    state.copy(
                                        intervaloManutencao = it,
                                        dataManutencao = if (it == "custom") state.dataManutencao else "",
                                        error = null
                                    )
                                )
                            }
                        )
                    }
                    if (state.intervaloManutencao == "custom") {
                        item {
                            LavaPrimeTextField(
                                value = state.dataManutencao,
                                onValueChange = { onChange(state.copy(dataManutencao = it.take(10), error = null)) },
                                label = "Data da manutenção",
                                placeholder = "AAAA-MM-DD",
                                singleLine = true
                            )
                        }
                    }
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
                Text(if (state.serviceId == null) "Salvar serviço" else "Atualizar serviço")
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
private fun ToggleField(
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Box(modifier = Modifier.fillMaxWidth()) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            color = Color(0xFF0B3348),
            modifier = Modifier
                .align(Alignment.CenterStart)
                .padding(end = 56.dp)
        )
        Switch(
            checked = checked,
            onCheckedChange = onCheckedChange,
            modifier = Modifier.align(Alignment.CenterEnd)
        )
    }
}

private fun matchesServiceFilter(
    service: ServicoEntity,
    filter: ServicesFilter
): Boolean = when (filter) {
    ServicesFilter.TODOS -> true
    ServicesFilter.ATIVOS -> service.ativo
    ServicesFilter.INATIVOS -> !service.ativo
    ServicesFilter.COM_FICHA -> service.fichaTecnicaAtiva
    ServicesFilter.COM_MANUTENCAO -> service.requerManutencao
}

private fun matchesServiceQuery(
    service: ServicoEntity,
    query: String
): Boolean {
    if (query.isBlank()) return true
    val haystack = buildString {
        append(service.nome)
        append(' ')
        append(service.tipoVeiculo)
        append(' ')
        append(service.categoriaVeiculo.orEmpty())
        append(' ')
        append(service.statusCatalogo)
    }
    return normalizeServiceQuery(haystack).contains(query)
}

private fun validateServiceDraft(
    draft: ServiceEditorState,
    services: List<ServicoEntity>
): String? {
    if (draft.nome.trim().isBlank()) return "Informe o nome do serviço."
    if (shouldUseServiceCategory(draft.tipoVeiculo) && normalizedServiceCategory(draft.tipoVeiculo, draft.categoriaVeiculo).isBlank()) {
        return "Selecione a categoria do veículo."
    }
    if (parseCurrencyToCents(draft.valor) <= 0L) return "Informe um valor válido."
    if ((draft.tempo.filter(Char::isDigit).toIntOrNull() ?: 0) <= 0) return "Informe o tempo previsto."
    if (draft.fichaTecnicaAtiva && draft.phEstimado.isNotBlank() && draft.phEstimado.replace(",", ".").toDoubleOrNull() == null) {
        return "Informe um pH válido."
    }
    if (draft.requerManutencao && draft.intervaloManutencao == "custom" && draft.dataManutencao.trim().isBlank()) {
        return "Informe a data da manutenção."
    }
    val duplicate = services.firstOrNull {
        it.nome.equals(draft.nome.trim(), ignoreCase = true) && it.id != draft.serviceId
    }
    if (duplicate != null) return "Serviço já cadastrado."
    return null
}

private fun ServicoEntity.toEditorState(): ServiceEditorState {
    return ServiceEditorState(
        serviceId = id,
        nome = nome,
        tipoVeiculo = tipoVeiculo,
        categoriaVeiculo = normalizedServiceCategory(tipoVeiculo, categoriaVeiculo.orEmpty()),
        valor = formatCurrencyInputFromCents(precoBaseCentavos),
        tempo = tempoEstimadoMin.toString(),
        status = statusCatalogo,
        fichaTecnicaAtiva = fichaTecnicaAtiva,
        custoFicha = formatCurrencyInputFromCents(custoFichaTecnicaCentavos),
        usaProdutoAcido = usaProdutoAcido,
        usaProdutoAlcalino = usaProdutoAlcalino,
        phEstimado = phEstimado?.toString()?.replace('.', ',').orEmpty(),
        requerManutencao = requerManutencao,
        intervaloManutencao = intervaloManutencao ?: maintenanceIntervals.first(),
        dataManutencao = dataManutencao.orEmpty()
    )
}

private fun shouldUseServiceCategory(type: String): Boolean = !type.equals("Moto", ignoreCase = true)

private fun normalizedServiceCategory(type: String, category: String): String {
    if (!shouldUseServiceCategory(type)) return ""
    return category.ifBlank { serviceVehicleCategories.first() }
}

private fun formatVehicleScope(type: String, category: String?): String {
    return if (shouldUseServiceCategory(type) && !category.isNullOrBlank()) {
        "$type / $category"
    } else {
        type
    }
}

private fun normalizeServiceQuery(value: String): String {
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

private fun formatCurrencyInput(value: String): String {
    val digits = value.filter(Char::isDigit)
    if (digits.isBlank()) return ""
    val cents = digits.toLong()
    val integerPart = cents / 100
    val decimalPart = (cents % 100).toString().padStart(2, '0')
    return "$integerPart,$decimalPart"
}

private fun formatCurrencyInputFromCents(value: Long): String {
    val integerPart = value / 100
    val decimalPart = (value % 100).toString().padStart(2, '0')
    return "$integerPart,$decimalPart"
}

private fun parseCurrencyToCents(value: String): Long {
    val normalized = value.trim().replace(".", "").replace(",", ".")
    val amount = normalized.toDoubleOrNull() ?: return 0L
    return (amount * 100).toLong()
}

private fun maintenanceLabel(value: String): String = when (value) {
    "monthly" -> "Mensal"
    "quarterly" -> "Trimestral"
    "semiannual" -> "Semestral"
    "custom" -> "Data fixa"
    else -> value
}
