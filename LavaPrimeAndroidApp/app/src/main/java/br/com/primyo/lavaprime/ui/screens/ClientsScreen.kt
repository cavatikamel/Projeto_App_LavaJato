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
import androidx.compose.material.icons.filled.Business
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Message
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material.icons.filled.DirectionsCar
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
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.data.model.ClienteEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.model.VeiculoEntity
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.viewmodel.CadastroUiState

private enum class ClientsFilter(val label: String) {
    TODOS("Todos"),
    AVULSOS("Avulsos"),
    FATURADOS("Faturados"),
    PF("PF"),
    PJ("PJ")
}

private data class ClientSnapshot(
    val cliente: ClienteEntity,
    val veiculos: List<VeiculoEntity>
) {
    val displayName: String
        get() = if (cliente.personType == "PJ") {
            cliente.legalName?.takeIf { it.isNotBlank() } ?: cliente.nome
        } else {
            cliente.nome
        }
}

private data class ClientEditorState(
    val clientId: String? = null,
    val personType: String = "PF",
    val billing: Boolean = false,
    val nome: String = "",
    val legalName: String = "",
    val telefone: String = "",
    val documento: String = "",
    val address: String = "",
    val email: String = "",
    val responsible: String = "",
    val billingApproved: Boolean = false,
    val billingCycle: String = "",
    val allowMultipleOpenInvoices: Boolean = false,
    val observacoes: String = "",
    val placas: List<String> = emptyList(),
    val novaPlaca: String = "",
    val error: String? = null
)

private val billingCycles = listOf("Mensal", "Bimestral", "Trimestral", "Semestral")

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ClientsScreen(
    state: CadastroUiState,
    usuario: UsuarioEntity,
    onSearchChange: (String) -> Unit,
    onSaveCliente: (
        clientId: String?,
        personType: String,
        billing: Boolean,
        nome: String,
        legalName: String,
        telefone: String,
        documento: String,
        address: String,
        email: String,
        responsible: String,
        billingApproved: Boolean,
        billingCycle: String,
        allowMultipleOpenInvoices: Boolean,
        observacoes: String,
        placas: List<String>,
        usuario: UsuarioEntity
    ) -> Unit
) {
    val uriHandler = LocalUriHandler.current
    var selectedFilter by remember { mutableStateOf(ClientsFilter.TODOS) }
    var editor by remember { mutableStateOf<ClientEditorState?>(null) }

    val clientSnapshots = remember(state.clientes, state.veiculos) {
        state.clientes.map { cliente ->
            ClientSnapshot(
                cliente = cliente,
                veiculos = state.veiculos
                    .filter { it.clienteId == cliente.id }
                    .sortedBy { it.placa }
            )
        }.sortedBy { it.displayName.lowercase() }
    }

    val filteredClients = remember(clientSnapshots, state.busca, selectedFilter) {
        val query = normalizeQuery(state.busca)
        clientSnapshots.filter { item ->
            matchesClientQuery(item, query) && matchesClientFilter(item.cliente, selectedFilter)
        }
    }

    val totalPlates = clientSnapshots.sumOf { it.veiculos.size }
    val totalBilling = clientSnapshots.count { it.cliente.billing }
    val totalCommon = clientSnapshots.count { !it.cliente.billing }

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
                    label = "Clientes ativos",
                    value = clientSnapshots.size.toString(),
                    icon = Icons.Filled.Group,
                    support = "Base local"
                )
                LavaPrimeMetricCard(
                    label = "Avulsos",
                    value = totalCommon.toString(),
                    icon = Icons.Filled.Person,
                    support = "Cadastro comum"
                )
                LavaPrimeMetricCard(
                    label = "Faturados",
                    value = totalBilling.toString(),
                    icon = Icons.Filled.Business,
                    support = "Cobrança formal"
                )
                LavaPrimeMetricCard(
                    label = "Placas vinculadas",
                    value = totalPlates.toString(),
                    icon = Icons.Filled.DirectionsCar,
                    support = "Veículos ligados"
                )
            }
        }

        item {
            LavaPrimeTextField(
                value = state.busca,
                onValueChange = onSearchChange,
                label = "Buscar cliente ou placa",
                singleLine = true
            )
        }

        item {
            LavaPrimeActionButton(
                text = "Novo cliente",
                onClick = { editor = ClientEditorState() },
                icon = Icons.Filled.Add,
                modifier = Modifier.fillMaxWidth()
            )
        }

        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                ClientsFilter.entries.forEach { filter ->
                    FilterChip(
                        selected = selectedFilter == filter,
                        onClick = { selectedFilter = filter },
                        label = { Text(filter.label) }
                    )
                }
            }
        }

        if (filteredClients.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum cliente encontrado",
                    description = "Ajuste a busca ou cadastre um cliente.",
                    icon = Icons.Filled.Group
                )
            }
        } else {
            items(filteredClients, key = { it.cliente.id }) { item ->
                ClientCard(
                    snapshot = item,
                    onEdit = {
                        editor = item.toEditorState()
                    },
                    onMessage = {
                        val phone = item.cliente.telefone.orEmpty().digitsOnly()
                        if (phone.isNotBlank()) {
                            uriHandler.openUri(
                                "https://wa.me/55$phone?text=${encodeForUri("Olá, ${item.displayName}.")}"
                            )
                        }
                    }
                )
            }
        }
    }

    editor?.let { current ->
        ClientEditorDialog(
            state = current,
            usuario = usuario,
            allVehicles = state.veiculos,
            onDismiss = { editor = null },
            onChange = { editor = it },
            onConfirm = { draft ->
                val validation = validateClientDraft(draft, state.veiculos)
                if (validation != null) {
                    editor = draft.copy(error = validation)
                } else {
                    onSaveCliente(
                        draft.clientId,
                        draft.personType,
                        draft.billing,
                        draft.nome,
                        draft.legalName,
                        draft.telefone,
                        draft.documento,
                        draft.address,
                        draft.email,
                        draft.responsible,
                        draft.billingApproved,
                        draft.billingCycle,
                        draft.allowMultipleOpenInvoices,
                        draft.observacoes,
                        draft.placas,
                        usuario
                    )
                    editor = null
                }
            }
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ClientCard(
    snapshot: ClientSnapshot,
    onEdit: () -> Unit,
    onMessage: () -> Unit
) {
    LavaPrimeCard(modifier = Modifier.fillMaxWidth()) {
        Column(
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
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
                        Icon(
                            if (snapshot.cliente.personType == "PJ") Icons.Filled.Business else Icons.Filled.Person,
                            contentDescription = null
                        )
                    }
                }

                Column(
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Text(
                        text = snapshot.displayName,
                        style = MaterialTheme.typography.titleMedium,
                        color = Color(0xFF0B3348),
                        fontWeight = FontWeight.Bold,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                    Text(
                        text = snapshot.cliente.telefone ?: "Telefone não informado",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(0xFF4E6470)
                    )
                }
            }

            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                LavaPrimeStatusChip(text = snapshot.cliente.personType)
                LavaPrimeStatusChip(
                    text = if (snapshot.cliente.billing) "Faturado" else "Avulso",
                    tone = if (snapshot.cliente.billing) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Info
                )
                if (snapshot.cliente.billingApproved) {
                    LavaPrimeStatusChip(
                        text = "Aprovado",
                        tone = LavaPrimeStatusTone.Success
                    )
                }
            }

            ClientInfoLine("Documento", snapshot.cliente.documento ?: "-")
            if (snapshot.cliente.billingApproved && !snapshot.cliente.billingCycle.isNullOrBlank()) {
                ClientInfoLine("Ciclo", snapshot.cliente.billingCycle)
            }
            ClientInfoLine(
                "Placas",
                snapshot.veiculos.joinToString(", ") { it.placa }.ifBlank { "-" }
            )

            Column(
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                LavaPrimeActionButton(
                    text = "Editar",
                    onClick = onEdit,
                    icon = Icons.Filled.Edit,
                    style = LavaPrimeActionStyle.Outline,
                    modifier = Modifier.fillMaxWidth()
                )
                LavaPrimeActionButton(
                    text = "Mensagem",
                    onClick = onMessage,
                    icon = Icons.Filled.Message,
                    style = LavaPrimeActionStyle.Ghost,
                    enabled = !snapshot.cliente.telefone.isNullOrBlank(),
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}

@Composable
private fun ClientInfoLine(
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
            text = value,
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF0B3348)
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ClientEditorDialog(
    state: ClientEditorState,
    usuario: UsuarioEntity,
    allVehicles: List<VeiculoEntity>,
    onDismiss: () -> Unit,
    onChange: (ClientEditorState) -> Unit,
    onConfirm: (ClientEditorState) -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                if (state.clientId == null) "Novo cliente" else "Editar cliente",
                color = Color(0xFF0B3348),
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                item {
                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        listOf("PF", "PJ").forEach { type ->
                            FilterChip(
                                selected = state.personType == type,
                                onClick = {
                                    onChange(
                                        state.copy(
                                            personType = type,
                                            documento = "",
                                            error = null
                                        )
                                    )
                                },
                                label = { Text(type) }
                            )
                        }
                    }
                }

                item {
                    ToggleField(
                        label = "Cliente faturado",
                        checked = state.billing,
                        onCheckedChange = {
                            onChange(
                                state.copy(
                                    billing = it,
                                    billingApproved = if (it) state.billingApproved else false,
                                    billingCycle = if (it) state.billingCycle else "",
                                    allowMultipleOpenInvoices = if (it) state.allowMultipleOpenInvoices else false,
                                    error = null
                                )
                            )
                        }
                    )
                }

                item {
                    if (state.personType == "PJ") {
                        LavaPrimeTextField(
                            value = state.legalName,
                            onValueChange = { onChange(state.copy(legalName = it, error = null)) },
                            label = "Razão social",
                            singleLine = true
                        )
                    } else {
                        LavaPrimeTextField(
                            value = state.nome,
                            onValueChange = { onChange(state.copy(nome = it, error = null)) },
                            label = "Nome",
                            singleLine = true
                        )
                    }
                }

                item {
                    LavaPrimeTextField(
                        value = state.telefone,
                        onValueChange = { onChange(state.copy(telefone = formatPhoneInput(it), error = null)) },
                        label = "Telefone com DDD",
                        singleLine = true
                    )
                }

                item {
                    LavaPrimeTextField(
                        value = state.documento,
                        onValueChange = { onChange(state.copy(documento = formatDocumentInput(it, state.personType), error = null)) },
                        label = if (state.personType == "PJ") "CNPJ" else "CPF",
                        singleLine = true
                    )
                }

                if (state.billing) {
                    item {
                        LavaPrimeTextField(
                            value = state.address,
                            onValueChange = { onChange(state.copy(address = it, error = null)) },
                            label = "Endereço",
                            minLines = 2
                        )
                    }
                    item {
                        LavaPrimeTextField(
                            value = state.email,
                            onValueChange = { onChange(state.copy(email = it, error = null)) },
                            label = "Email",
                            singleLine = true
                        )
                    }
                    item {
                        LavaPrimeTextField(
                            value = state.responsible,
                            onValueChange = { onChange(state.copy(responsible = it, error = null)) },
                            label = "Pessoa responsável",
                            singleLine = true
                        )
                    }
                    item {
                        ToggleField(
                            label = "Aprovar faturamento",
                            checked = state.billingApproved,
                            onCheckedChange = {
                                onChange(
                                    state.copy(
                                        billingApproved = it,
                                        billingCycle = if (it) state.billingCycle else "",
                                        allowMultipleOpenInvoices = if (it) state.allowMultipleOpenInvoices else false,
                                        error = null
                                    )
                                )
                            }
                        )
                    }
                }

                if (state.billingApproved) {
                    item {
                        Text(
                            text = "Aprovador: ${usuario.nome}",
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFF4E6470)
                        )
                    }
                    item {
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            billingCycles.forEach { cycle ->
                                FilterChip(
                                    selected = state.billingCycle == cycle,
                                    onClick = { onChange(state.copy(billingCycle = cycle, error = null)) },
                                    label = { Text(cycle) }
                                )
                            }
                        }
                    }
                    item {
                        ToggleField(
                            label = "Permitir mais de uma fatura aberta",
                            checked = state.allowMultipleOpenInvoices,
                            onCheckedChange = {
                                onChange(state.copy(allowMultipleOpenInvoices = it, error = null))
                            }
                        )
                    }
                }

                item {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text(
                            text = "Placas vinculadas",
                            style = MaterialTheme.typography.labelLarge,
                            color = Color(0xFF0B3348),
                            fontWeight = FontWeight.SemiBold
                        )
                        FlowRow(
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            state.placas.forEach { plate ->
                                FilterChip(
                                    selected = false,
                                    onClick = {
                                        onChange(state.copy(placas = state.placas - plate, error = null))
                                    },
                                    label = { Text(plate) }
                                )
                            }
                        }
                        LavaPrimeTextField(
                            value = state.novaPlaca,
                            onValueChange = { onChange(state.copy(novaPlaca = formatPlateInput(it), error = null)) },
                            label = "Nova placa",
                            singleLine = true
                        )
                        LavaPrimeActionButton(
                            text = "Adicionar placa",
                            onClick = {
                                val plate = state.novaPlaca.trim()
                                val conflito = allVehicles.any {
                                    it.placa.equals(plate, ignoreCase = true) &&
                                        it.clienteId != state.clientId &&
                                        it.clienteId != "sem-cliente"
                                }
                                when {
                                    plate.isBlank() -> onChange(state.copy(error = "Informe uma placa para vincular."))
                                    conflito -> onChange(state.copy(error = "$plate já está vinculada a outro cliente."))
                                    plate in state.placas -> onChange(state.copy(error = "$plate já foi adicionada."))
                                    else -> onChange(
                                        state.copy(
                                            placas = state.placas + plate,
                                            novaPlaca = "",
                                            error = null
                                        )
                                    )
                                }
                            },
                            icon = Icons.Filled.Add,
                            style = LavaPrimeActionStyle.Outline,
                            modifier = Modifier.fillMaxWidth()
                        )
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
                Text("Salvar")
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

private fun ClientSnapshot.toEditorState(): ClientEditorState {
    return ClientEditorState(
        clientId = cliente.id,
        personType = cliente.personType,
        billing = cliente.billing,
        nome = if (cliente.personType == "PF") cliente.nome else "",
        legalName = cliente.legalName ?: if (cliente.personType == "PJ") cliente.nome else "",
        telefone = cliente.telefone.orEmpty(),
        documento = cliente.documento.orEmpty(),
        address = cliente.address.orEmpty(),
        email = cliente.email.orEmpty(),
        responsible = cliente.responsible.orEmpty(),
        billingApproved = cliente.billingApproved,
        billingCycle = cliente.billingCycle.orEmpty(),
        allowMultipleOpenInvoices = cliente.allowMultipleOpenInvoices,
        observacoes = cliente.observacoes.orEmpty(),
        placas = veiculos.map { it.placa },
        novaPlaca = ""
    )
}

private fun matchesClientFilter(
    cliente: ClienteEntity,
    filter: ClientsFilter
): Boolean = when (filter) {
    ClientsFilter.TODOS -> true
    ClientsFilter.AVULSOS -> !cliente.billing
    ClientsFilter.FATURADOS -> cliente.billing
    ClientsFilter.PF -> cliente.personType == "PF"
    ClientsFilter.PJ -> cliente.personType == "PJ"
}

private fun matchesClientQuery(
    item: ClientSnapshot,
    query: String
): Boolean {
    if (query.isBlank()) return true
    val haystack = buildString {
        append(item.displayName)
        append(' ')
        append(item.cliente.documento.orEmpty())
        append(' ')
        append(item.cliente.telefone.orEmpty())
        append(' ')
        append(item.veiculos.joinToString(" ") { it.placa })
    }
    return normalizeQuery(haystack).contains(query)
}

private fun validateClientDraft(
    draft: ClientEditorState,
    veiculos: List<VeiculoEntity>
): String? {
    val displayName = if (draft.personType == "PJ") draft.legalName.trim() else draft.nome.trim()
    if (displayName.isBlank()) {
        return if (draft.personType == "PJ") "Informe a razão social." else "Informe o nome do cliente."
    }
    if (draft.telefone.digitsOnly().length < 10) return "Informe um telefone com DDD."
    if (draft.placas.isEmpty()) return "Vincule ao menos uma placa."
    val duplicatePlate = draft.placas.firstOrNull { plate ->
        veiculos.any {
            it.placa.equals(plate, ignoreCase = true) &&
                it.clienteId != draft.clientId &&
                it.clienteId != "sem-cliente"
        }
    }
    if (duplicatePlate != null) return "$duplicatePlate já está vinculada a outro cliente."
    if (draft.personType == "PJ" && draft.documento.digitsOnly().length != 14) {
        return "Informe o CNPJ completo."
    }
    if (draft.billing && draft.personType == "PF" && draft.documento.digitsOnly().length != 11) {
        return "Cliente faturado PF exige CPF completo."
    }
    if (draft.billing) {
        if (draft.address.trim().isBlank()) return "Informe o endereço do cliente faturado."
        if (draft.email.trim().isBlank()) return "Informe o email do cliente faturado."
        if (draft.responsible.trim().isBlank()) return "Informe a pessoa responsável."
    }
    if (draft.billingApproved && draft.billingCycle.isBlank()) return "Selecione o ciclo de faturamento."
    return null
}

private fun normalizeQuery(value: String): String {
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

private fun formatPhoneInput(value: String): String {
    val digits = value.digitsOnly().take(11)
    return when {
        digits.length <= 2 -> digits
        digits.length <= 7 -> "(${digits.take(2)}) ${digits.drop(2)}"
        digits.length <= 10 -> "(${digits.take(2)}) ${digits.drop(2).take(4)}-${digits.drop(6)}"
        else -> "(${digits.take(2)}) ${digits.drop(2).take(5)}-${digits.drop(7)}"
    }
}

private fun formatDocumentInput(value: String, personType: String): String {
    val digits = value.digitsOnly()
    return if (personType == "PJ") {
        val limited = digits.take(14)
        when {
            limited.length <= 2 -> limited
            limited.length <= 5 -> "${limited.take(2)}.${limited.drop(2)}"
            limited.length <= 8 -> "${limited.take(2)}.${limited.drop(2).take(3)}.${limited.drop(5)}"
            limited.length <= 12 -> "${limited.take(2)}.${limited.drop(2).take(3)}.${limited.drop(5).take(3)}/${limited.drop(8)}"
            else -> "${limited.take(2)}.${limited.drop(2).take(3)}.${limited.drop(5).take(3)}/${limited.drop(8).take(4)}-${limited.drop(12)}"
        }
    } else {
        val limited = digits.take(11)
        when {
            limited.length <= 3 -> limited
            limited.length <= 6 -> "${limited.take(3)}.${limited.drop(3)}"
            limited.length <= 9 -> "${limited.take(3)}.${limited.drop(3).take(3)}.${limited.drop(6)}"
            else -> "${limited.take(3)}.${limited.drop(3).take(3)}.${limited.drop(6).take(3)}-${limited.drop(9)}"
        }
    }
}

private fun formatPlateInput(value: String): String {
    return value.uppercase().filter { it.isLetterOrDigit() }.take(8)
}

private fun String.digitsOnly(): String = filter(Char::isDigit)

private fun encodeForUri(text: String): String {
    return java.net.URLEncoder.encode(text, Charsets.UTF_8.name())
}
