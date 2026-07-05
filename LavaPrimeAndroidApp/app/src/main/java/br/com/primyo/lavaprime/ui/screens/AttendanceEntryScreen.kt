package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.data.model.FormaPagamento
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.components.money

private val entryVehicleTypes = listOf("Carro", "Moto", "Caminhonete", "Van", "Utilitário")
private val entryVehicleCategories = listOf("Hatch", "Sedan", "SUV", "Picape", "Executivo", "Comercial", "Outro")
private val entryVehicleColors = listOf("Branco", "Preto", "Prata", "Cinza", "Vermelho", "Azul", "Marrom", "Outra")

enum class AttendanceEntryMode {
    ENTRY,
    SCHEDULE
}

data class AttendanceEntryDraft(
    val mode: AttendanceEntryMode = AttendanceEntryMode.ENTRY,
    val placa: String = "",
    val modelo: String = "",
    val cor: String = "Branco",
    val outraCor: String = "",
    val tipoVeiculo: String = entryVehicleTypes.first(),
    val categoriaVeiculo: String = entryVehicleCategories.first(),
    val selectedServiceIds: List<String> = emptyList(),
    val telefone: String = "",
    val clienteNome: String = "",
    val formaPagamento: FormaPagamento? = null,
    val pagoNaEntrada: Boolean = false,
    val alertaEspecial: String = "",
    val agendadoParaData: String = "",
    val agendadoParaHora: String = "",
    val error: String? = null
)

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun AttendanceEntryScreen(
    draft: AttendanceEntryDraft,
    servicos: List<ServicoEntity>,
    onDraftChange: (AttendanceEntryDraft) -> Unit,
    onClose: () -> Unit,
    onSave: (AttendanceEntryDraft) -> Unit
) {
    val availableServices = servicos
        .filter { it.ativo }
        .filter { it.tipoVeiculo.equals(draft.tipoVeiculo, ignoreCase = true) }
        .filter {
            !shouldUseEntryCategory(draft.tipoVeiculo) ||
                it.categoriaVeiculo.equals(draft.categoriaVeiculo, ignoreCase = true)
        }
        .sortedBy { it.nome.lowercase() }

    val selectedServices = availableServices.filter { it.id in draft.selectedServiceIds }
    val totalSelecionado = selectedServices.sumOf { it.precoBaseCentavos }
    val corEfetiva = if (draft.cor == "Outra") draft.outraCor else draft.cor

    LazyColumn(
        modifier = Modifier.padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 92.dp)
    ) {
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                AttendanceModeChip(
                    title = "Entrada no pátio",
                    selected = draft.mode == AttendanceEntryMode.ENTRY
                ) {
                    onDraftChange(
                        draft.copy(
                            mode = AttendanceEntryMode.ENTRY,
                            agendadoParaData = "",
                            agendadoParaHora = "",
                            error = null
                        )
                    )
                }
                AttendanceModeChip(
                    title = "Agendamento",
                    selected = draft.mode == AttendanceEntryMode.SCHEDULE
                ) {
                    onDraftChange(draft.copy(mode = AttendanceEntryMode.SCHEDULE, error = null))
                }
            }
        }
        item {
            SectionTitle(text = "Dados do veículo")
        }
        item {
            LavaPrimeCard {
                LavaPrimeTextField(
                    value = draft.placa,
                    onValueChange = {
                        onDraftChange(draft.copy(placa = it.uppercase().take(8), error = null))
                    },
                    label = "Placa",
                    singleLine = true
                )
                LavaPrimeTextField(
                    value = draft.modelo,
                    onValueChange = { onDraftChange(draft.copy(modelo = it, error = null)) },
                    label = "Modelo",
                    singleLine = true
                )
                SelectorGroupCompact(
                    label = "Cor",
                    options = entryVehicleColors,
                    selected = draft.cor,
                    onSelect = { onDraftChange(draft.copy(cor = it, error = null)) }
                )
                if (draft.cor == "Outra") {
                    LavaPrimeTextField(
                        value = draft.outraCor,
                        onValueChange = { onDraftChange(draft.copy(outraCor = it, error = null)) },
                        label = "Informe a cor",
                        singleLine = true
                    )
                }
                SelectorGroupCompact(
                    label = "Tipo de veículo",
                    options = entryVehicleTypes,
                    selected = draft.tipoVeiculo,
                    onSelect = {
                        onDraftChange(
                            draft.copy(
                                tipoVeiculo = it,
                                categoriaVeiculo = if (shouldUseEntryCategory(it)) draft.categoriaVeiculo else "",
                                selectedServiceIds = emptyList(),
                                error = null
                            )
                        )
                    }
                )
                if (shouldUseEntryCategory(draft.tipoVeiculo)) {
                    SelectorGroupCompact(
                        label = "Categoria de veículo",
                        options = entryVehicleCategories,
                        selected = draft.categoriaVeiculo,
                        onSelect = {
                            onDraftChange(
                                draft.copy(
                                    categoriaVeiculo = it,
                                    selectedServiceIds = emptyList(),
                                    error = null
                                )
                            )
                        }
                    )
                }
            }
        }
        item {
            SectionTitle(text = "Serviços cadastrados")
        }
        item {
            LavaPrimeCard {
                if (availableServices.isEmpty()) {
                    EmptyState(
                        title = "Nenhum serviço disponível",
                        description = "Cadastre ou ajuste os serviços para este tipo de veículo."
                    )
                } else {
                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        availableServices.forEach { servico ->
                            val selected = servico.id in draft.selectedServiceIds
                            FilterChip(
                                selected = selected,
                                onClick = {
                                    val next = if (selected) {
                                        draft.selectedServiceIds - servico.id
                                    } else {
                                        draft.selectedServiceIds + servico.id
                                    }
                                    onDraftChange(draft.copy(selectedServiceIds = next, error = null))
                                },
                                label = {
                                    Text("${servico.nome} · ${money(servico.precoBaseCentavos)}")
                                }
                            )
                        }
                    }
                }
                if (selectedServices.isNotEmpty()) {
                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        selectedServices.forEach { servico ->
                            LavaPrimeStatusChip(
                                text = "${servico.nome} · ${servico.tempoEstimadoMin} min",
                                tone = LavaPrimeStatusTone.Info
                            )
                        }
                    }
                }
                LavaPrimeStatusChip(
                    text = "Total previsto ${money(totalSelecionado)}",
                    tone = LavaPrimeStatusTone.Success
                )
            }
        }
        item {
            SectionTitle(text = "Dados do cliente e pagamento")
        }
        item {
            LavaPrimeCard {
                LavaPrimeTextField(
                    value = draft.telefone,
                    onValueChange = { onDraftChange(draft.copy(telefone = it, error = null)) },
                    label = "Telefone com DDD",
                    singleLine = true,
                    keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(keyboardType = KeyboardType.Phone)
                )
                LavaPrimeTextField(
                    value = draft.clienteNome,
                    onValueChange = { onDraftChange(draft.copy(clienteNome = it, error = null)) },
                    label = "Nome do cliente",
                    singleLine = true
                )
                SelectorGroupCompact(
                    label = "Forma de pagamento",
                    options = FormaPagamento.entries.map { it.name },
                    selected = draft.formaPagamento?.name.orEmpty(),
                    labelProvider = { paymentLabel(FormaPagamento.valueOf(it)) },
                    onSelect = { onDraftChange(draft.copy(formaPagamento = FormaPagamento.valueOf(it), error = null)) }
                )
                if (draft.mode == AttendanceEntryMode.ENTRY) {
                    SwitchLine(
                        label = "Pago na entrada",
                        checked = draft.pagoNaEntrada,
                        onCheckedChange = { onDraftChange(draft.copy(pagoNaEntrada = it, error = null)) }
                    )
                }
                LavaPrimeTextField(
                    value = draft.alertaEspecial,
                    onValueChange = { onDraftChange(draft.copy(alertaEspecial = it, error = null)) },
                    label = "Alerta especial do veículo",
                    placeholder = "Ex.: vitrificado, usar shampoo neutro",
                    minLines = 2
                )
            }
        }
        if (draft.mode == AttendanceEntryMode.SCHEDULE) {
            item {
                SectionTitle(text = "Agendamento")
            }
            item {
                LavaPrimeCard {
                    LavaPrimeTextField(
                        value = draft.agendadoParaData,
                        onValueChange = { onDraftChange(draft.copy(agendadoParaData = it.take(10), error = null)) },
                        label = "Data do agendamento",
                        placeholder = "AAAA-MM-DD",
                        singleLine = true
                    )
                    LavaPrimeTextField(
                        value = draft.agendadoParaHora,
                        onValueChange = { onDraftChange(draft.copy(agendadoParaHora = it.take(5), error = null)) },
                        label = "Horário do agendamento",
                        placeholder = "08:30",
                        singleLine = true
                    )
                }
            }
        }
        draft.error?.let { message ->
            item {
                Text(
                    text = message,
                    style = MaterialTheme.typography.bodySmall,
                    color = Color(0xFFB42318),
                    fontWeight = FontWeight.SemiBold
                )
            }
        }
        item {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                LavaPrimeActionButton(
                    text = if (draft.mode == AttendanceEntryMode.SCHEDULE) "Salvar agendamento" else "Adicionar ao pátio",
                    onClick = {
                        val validation = validateAttendanceDraft(draft, corEfetiva, selectedServices)
                        if (validation != null) {
                            onDraftChange(draft.copy(error = validation))
                        } else {
                            onSave(draft.copy(error = null))
                        }
                    },
                    modifier = Modifier.fillMaxWidth()
                )
                LavaPrimeActionButton(
                    text = "Fechar",
                    onClick = onClose,
                    style = LavaPrimeActionStyle.Outline,
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}

@Composable
private fun SwitchLine(
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    androidx.compose.foundation.layout.Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            color = Color(0xFF0B3348),
            fontWeight = FontWeight.SemiBold
        )
        Switch(checked = checked, onCheckedChange = onCheckedChange)
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun SelectorGroupCompact(
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
                    label = { Text(labelProvider(option)) }
                )
            }
        }
    }
}

@Composable
private fun AttendanceModeChip(
    title: String,
    selected: Boolean,
    onClick: () -> Unit
) {
    FilterChip(selected = selected, onClick = onClick, label = { Text(title) })
}

private fun shouldUseEntryCategory(type: String): Boolean = !type.equals("Moto", ignoreCase = true)

private fun validateAttendanceDraft(
    draft: AttendanceEntryDraft,
    corEfetiva: String,
    selectedServices: List<ServicoEntity>
): String? {
    if (draft.placa.trim().isBlank()) return "Informe a placa."
    if (draft.modelo.trim().isBlank()) return "Informe o modelo."
    if (corEfetiva.trim().isBlank()) return "Informe a cor."
    if (shouldUseEntryCategory(draft.tipoVeiculo) && draft.categoriaVeiculo.isBlank()) {
        return "Selecione a categoria do veículo."
    }
    if (selectedServices.isEmpty()) return "Selecione ao menos um serviço contratado."
    if (draft.telefone.trim().isBlank()) return "Informe o telefone com DDD."
    if (draft.clienteNome.trim().isBlank()) return "Informe o nome do cliente."
    if (draft.formaPagamento == null) return "Selecione a forma de pagamento."
    if (draft.mode == AttendanceEntryMode.SCHEDULE && draft.agendadoParaData.trim().isBlank()) {
        return "Informe a data do agendamento."
    }
    if (draft.mode == AttendanceEntryMode.SCHEDULE && draft.agendadoParaHora.trim().isBlank()) {
        return "Informe o horário do agendamento."
    }
    return null
}

fun paymentLabel(formaPagamento: FormaPagamento): String = when (formaPagamento) {
    FormaPagamento.PIX -> "Pix"
    FormaPagamento.DINHEIRO -> "Dinheiro"
    FormaPagamento.DEBITO -> "Cartão débito"
    FormaPagamento.CREDITO -> "Cartão crédito"
    FormaPagamento.BOLETO -> "Boleto"
    FormaPagamento.Faturado -> "Faturado"
    FormaPagamento.CORTESIA -> "Cortesia"
}
