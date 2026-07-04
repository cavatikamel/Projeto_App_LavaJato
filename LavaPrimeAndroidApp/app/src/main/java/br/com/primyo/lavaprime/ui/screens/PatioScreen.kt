package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Event
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.data.model.AtendimentoEntity
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.formatTimestamp
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.components.syncStatusLabel
import br.com.primyo.lavaprime.ui.components.syncStatusTone
import br.com.primyo.lavaprime.ui.theme.InfoBg
import br.com.primyo.lavaprime.ui.theme.LavaPrimeRadii
import br.com.primyo.lavaprime.ui.theme.LavaPrimeSpacing
import br.com.primyo.lavaprime.ui.theme.PageBgAlt
import br.com.primyo.lavaprime.ui.theme.PositiveText
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.TextMuted
import br.com.primyo.lavaprime.ui.theme.TextPrimary
import br.com.primyo.lavaprime.ui.theme.TextSecondary
import br.com.primyo.lavaprime.ui.theme.WarningText
import br.com.primyo.lavaprime.ui.theme.WaterBlue
import br.com.primyo.lavaprime.ui.viewmodel.PatioUiState

private data class PatioSummaryItem(
    val label: String,
    val value: String,
    val icon: ImageVector,
    val support: String,
    val tone: LavaPrimeStatusTone = LavaPrimeStatusTone.Info
)

private data class PatioSection(
    val key: String,
    val title: String,
    val support: String,
    val icon: ImageVector,
    val items: List<AtendimentoEntity>,
    val emptyMessage: String
)

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun PatioScreen(
    state: PatioUiState,
    usuario: UsuarioEntity,
    onSelectFilter: (AtendimentoStatus?) -> Unit,
    onToggleAlerts: () -> Unit,
    onAdvance: (AtendimentoEntity, UsuarioEntity) -> Unit,
    onBack: (AtendimentoEntity, UsuarioEntity) -> Unit
) {
    val historico = state.historicoRecente
    val agendados = historico.filter { it.status == AtendimentoStatus.AGENDADO }
    val aguardando = historico
        .filter { it.status == AtendimentoStatus.PATIO }
        .sortedBy { it.criadoEm }
    val emServico = historico.filter { it.status == AtendimentoStatus.EXECUCAO }
    val finalizados = historico
        .filter { it.status == AtendimentoStatus.FINALIZADO }
        .sortedByDescending { it.finalizadoEm ?: it.updatedAt }
        .take(8)
    val prontos = emptyList<AtendimentoEntity>()

    val filtroSelecionado = state.filtroStatus
    val somarApenasAlertas: (List<AtendimentoEntity>) -> List<AtendimentoEntity> = { entries ->
        if (state.somenteAlertas) entries.filter { !it.observacoes.isNullOrBlank() || it.alertaConfirmado } else entries
    }

    val sections = listOf(
        PatioSection(
            key = "agendados",
            title = "Agendados",
            support = "Entradas aguardando confirmação no pátio.",
            icon = Icons.Filled.Event,
            items = somarApenasAlertas(agendados),
            emptyMessage = "Nenhum agendamento aguardando entrada."
        ),
        PatioSection(
            key = "aguardando",
            title = "Aguardando",
            support = "Fila de chegada e ordem de entrada no serviço.",
            icon = Icons.Filled.DirectionsCar,
            items = somarApenasAlertas(aguardando),
            emptyMessage = "Nenhum veículo aguardando no pátio."
        ),
        PatioSection(
            key = "em-servico",
            title = "Em Serviço",
            support = "Atendimentos em execução agora.",
            icon = Icons.Filled.Build,
            items = somarApenasAlertas(emServico),
            emptyMessage = "Nenhum atendimento em execução no momento."
        ),
        PatioSection(
            key = "prontos",
            title = "Prontos",
            support = "Etapa reservada para retirada e pagamento no espelho final do Web.",
            icon = Icons.Filled.CheckCircle,
            items = prontos,
            emptyMessage = "A etapa Prontos ainda não está separada na base local atual."
        ),
        PatioSection(
            key = "finalizados",
            title = "Finalizados",
            support = "Histórico recente já concluído no app.",
            icon = Icons.Filled.History,
            items = somarApenasAlertas(finalizados),
            emptyMessage = "Nenhum atendimento finalizado no histórico recente."
        )
    ).filter { section ->
        when (filtroSelecionado) {
            null -> true
            AtendimentoStatus.AGENDADO -> section.key == "agendados"
            AtendimentoStatus.PATIO -> section.key == "aguardando"
            AtendimentoStatus.EXECUCAO -> section.key == "em-servico"
            AtendimentoStatus.FINALIZADO -> section.key == "finalizados"
            AtendimentoStatus.CANCELADO -> false
        }
    }

    val summaryItems = listOf(
        PatioSummaryItem(
            label = "Agendados",
            value = agendados.size.toString(),
            icon = Icons.Filled.Event,
            support = "Entradas agendadas."
        ),
        PatioSummaryItem(
            label = "Aguardando",
            value = aguardando.size.toString(),
            icon = Icons.Filled.DirectionsCar,
            support = "Fila atual do pátio."
        ),
        PatioSummaryItem(
            label = "Em Serviço",
            value = emServico.size.toString(),
            icon = Icons.Filled.Build,
            support = "Rotina em execução."
        ),
        PatioSummaryItem(
            label = "Prontos",
            value = "--",
            icon = Icons.Filled.CheckCircle,
            support = "Separação prevista para a próxima evolução."
        ),
        PatioSummaryItem(
            label = "Finalizados",
            value = finalizados.size.toString(),
            icon = Icons.Filled.History,
            support = "Histórico recente concluído.",
            tone = if (finalizados.isNotEmpty()) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Info
        )
    )

    LazyColumn(
        modifier = Modifier.padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 92.dp)
    ) {
        item {
            HeroPanel(
                title = "Pátio",
                description = "Quadro operacional do Web adaptado ao mobile, com grupos por status, filtros e ações rápidas.",
                icon = Icons.Filled.DirectionsCar
            )
        }
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                summaryItems.forEach { item ->
                    LavaPrimeMetricCard(
                        label = item.label,
                        value = item.value,
                        icon = item.icon,
                        support = item.support,
                        tone = item.tone
                    )
                }
            }
        }
        item {
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                item {
                    FilterChip(
                        selected = filtroSelecionado == null,
                        onClick = { onSelectFilter(null) },
                        label = { Text("Todos") }
                    )
                }
                item {
                    FilterChip(
                        selected = filtroSelecionado == AtendimentoStatus.AGENDADO,
                        onClick = { onSelectFilter(AtendimentoStatus.AGENDADO) },
                        label = { Text("Agendados") }
                    )
                }
                item {
                    FilterChip(
                        selected = filtroSelecionado == AtendimentoStatus.PATIO,
                        onClick = { onSelectFilter(AtendimentoStatus.PATIO) },
                        label = { Text("Aguardando") }
                    )
                }
                item {
                    FilterChip(
                        selected = filtroSelecionado == AtendimentoStatus.EXECUCAO,
                        onClick = { onSelectFilter(AtendimentoStatus.EXECUCAO) },
                        label = { Text("Em Serviço") }
                    )
                }
                item {
                    FilterChip(
                        selected = false,
                        onClick = {},
                        enabled = false,
                        label = { Text("Prontos") }
                    )
                }
                item {
                    FilterChip(
                        selected = filtroSelecionado == AtendimentoStatus.FINALIZADO,
                        onClick = { onSelectFilter(AtendimentoStatus.FINALIZADO) },
                        label = { Text("Finalizados") }
                    )
                }
                item {
                    FilterChip(
                        selected = state.somenteAlertas,
                        onClick = onToggleAlerts,
                        label = { Text("Somente alertas") }
                    )
                }
            }
        }
        items(sections, key = { it.key }) { section ->
            PatioStatusSection(
                section = section,
                onAdvance = { atendimento -> onAdvance(atendimento, usuario) },
                onBack = { atendimento -> onBack(atendimento, usuario) }
            )
        }
    }
}

@Composable
private fun PatioStatusSection(
    section: PatioSection,
    onAdvance: (AtendimentoEntity) -> Unit,
    onBack: (AtendimentoEntity) -> Unit
) {
    LavaPrimeCard(
        modifier = Modifier.fillMaxWidth(),
        contentPadding = PaddingValues(LavaPrimeSpacing.md)
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .background(InfoBg, RoundedCornerShape(LavaPrimeRadii.medium))
                    .padding(10.dp),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = section.icon,
                    contentDescription = null,
                    tint = WaterBlue
                )
            }
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text(
                    text = section.title,
                    style = MaterialTheme.typography.titleMedium,
                    color = PrimeBlue,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = section.support,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary
                )
            }
            LavaPrimeStatusChip(
                text = section.items.size.toString(),
                tone = if (section.items.isNotEmpty()) LavaPrimeStatusTone.Info else LavaPrimeStatusTone.Neutral
            )
        }

        if (section.items.isEmpty()) {
            EmptyState(
                title = section.title,
                description = section.emptyMessage,
                icon = section.icon
            )
        } else {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                section.items.forEachIndexed { index, item ->
                    PatioVehicleCard(
                        item = item,
                        queuePosition = if (section.key == "aguardando") index + 1 else 0,
                        onAdvance = if (item.status == AtendimentoStatus.FINALIZADO) null else ({ onAdvance(item) }),
                        onBack = if (item.status == AtendimentoStatus.AGENDADO || section.key == "prontos") null else ({ onBack(item) })
                    )
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun PatioVehicleCard(
    item: AtendimentoEntity,
    queuePosition: Int,
    onAdvance: (() -> Unit)?,
    onBack: (() -> Unit)?
) {
    LavaPrimeCard(
        modifier = Modifier.fillMaxWidth(),
        tonal = true,
        contentPadding = PaddingValues(LavaPrimeSpacing.md)
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.Top
        ) {
            Box(
                modifier = Modifier
                    .background(PageBgAlt, RoundedCornerShape(LavaPrimeRadii.medium))
                    .padding(10.dp),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = when (item.status) {
                        AtendimentoStatus.AGENDADO -> Icons.Filled.Event
                        AtendimentoStatus.PATIO -> Icons.Filled.DirectionsCar
                        AtendimentoStatus.EXECUCAO -> Icons.Filled.Build
                        AtendimentoStatus.FINALIZADO -> Icons.Filled.CheckCircle
                        AtendimentoStatus.CANCELADO -> Icons.Filled.Info
                    },
                    contentDescription = null,
                    tint = PrimeBlue
                )
            }
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                if (queuePosition > 0) {
                    LavaPrimeStatusChip(
                        text = if (queuePosition == 1) "Próximo" else "Fila $queuePosition",
                        tone = LavaPrimeStatusTone.Warning
                    )
                }

                Text(
                    text = "${item.placaSnapshot} - ${item.clienteNomeSnapshot}",
                    style = MaterialTheme.typography.titleSmall,
                    color = TextPrimary,
                    fontWeight = FontWeight.Bold,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = item.servicoNomeSnapshot,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )

                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    LavaPrimeStatusChip(
                        text = patioStatusLabel(item.status),
                        tone = patioStatusTone(item.status)
                    )
                    LavaPrimeStatusChip(
                        text = patioTimeLabel(item),
                        tone = LavaPrimeStatusTone.Neutral
                    )
                    LavaPrimeStatusChip(
                        text = if (item.formaPagamento != null) "Pagamento ${item.formaPagamento.name.lowercase()}" else "Pagamento pendente",
                        tone = if (item.formaPagamento != null) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Warning
                    )
                    LavaPrimeStatusChip(
                        text = syncStatusLabel(item.syncStatus),
                        tone = syncStatusTone(item.syncStatus)
                    )
                }

                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    verticalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    LavaPrimeStatusChip(
                        text = money(item.valorCentavos),
                        tone = LavaPrimeStatusTone.Success
                    )
                    item.operadorNomeSnapshot?.takeIf { it.isNotBlank() }?.let {
                        LavaPrimeStatusChip(
                            text = it,
                            tone = LavaPrimeStatusTone.Info
                        )
                    }
                    if (item.alertaConfirmado || !item.observacoes.isNullOrBlank()) {
                        LavaPrimeStatusChip(
                            text = "Cuidado especial",
                            tone = LavaPrimeStatusTone.Warning,
                            icon = Icons.Filled.WarningAmber
                        )
                    }
                }

                if (!item.observacoes.isNullOrBlank()) {
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalAlignment = Alignment.Top
                    ) {
                        Icon(
                            imageVector = Icons.Filled.WarningAmber,
                            contentDescription = null,
                            tint = WarningText
                        )
                        Text(
                            text = item.observacoes,
                            style = MaterialTheme.typography.bodySmall,
                            color = WarningText
                        )
                    }
                }

                if (onAdvance != null || onBack != null) {
                    Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                        if (onBack != null) {
                            LavaPrimeActionButton(
                                text = patioBackLabel(item.status),
                                onClick = onBack,
                                style = LavaPrimeActionStyle.Outline,
                                modifier = Modifier.weight(1f)
                            )
                        }
                        if (onAdvance != null) {
                            LavaPrimeActionButton(
                                text = patioAdvanceLabel(item.status),
                                onClick = onAdvance,
                                style = LavaPrimeActionStyle.Dark,
                                modifier = Modifier.weight(1f)
                            )
                        }
                    }
                } else if (item.status == AtendimentoStatus.FINALIZADO) {
                    Text(
                        text = "Recibo e confirmação detalhada seguem para a fase própria de documentos.",
                        style = MaterialTheme.typography.bodySmall,
                        color = TextMuted
                    )
                }
            }
        }
    }
}

@Composable
fun AtendimentoCard(
    item: AtendimentoEntity,
    onAdvance: (() -> Unit)?,
    onBack: (() -> Unit)?
) {
    PatioVehicleCard(
        item = item,
        queuePosition = 0,
        onAdvance = onAdvance,
        onBack = onBack
    )
}

private fun patioStatusLabel(status: AtendimentoStatus): String = when (status) {
    AtendimentoStatus.AGENDADO -> "Agendado"
    AtendimentoStatus.PATIO -> "Aguardando"
    AtendimentoStatus.EXECUCAO -> "Em Serviço"
    AtendimentoStatus.FINALIZADO -> "Finalizado"
    AtendimentoStatus.CANCELADO -> "Cancelado"
}

private fun patioStatusTone(status: AtendimentoStatus): LavaPrimeStatusTone = when (status) {
    AtendimentoStatus.AGENDADO -> LavaPrimeStatusTone.Warning
    AtendimentoStatus.PATIO -> LavaPrimeStatusTone.Info
    AtendimentoStatus.EXECUCAO -> LavaPrimeStatusTone.Info
    AtendimentoStatus.FINALIZADO -> LavaPrimeStatusTone.Success
    AtendimentoStatus.CANCELADO -> LavaPrimeStatusTone.Danger
}

private fun patioAdvanceLabel(status: AtendimentoStatus): String = when (status) {
    AtendimentoStatus.AGENDADO -> "Confirmar chegada"
    AtendimentoStatus.PATIO -> "Iniciar serviço"
    AtendimentoStatus.EXECUCAO -> "Finalizar atendimento"
    AtendimentoStatus.FINALIZADO -> "Recibo"
    AtendimentoStatus.CANCELADO -> "Indisponível"
}

private fun patioBackLabel(status: AtendimentoStatus): String = when (status) {
    AtendimentoStatus.PATIO -> "Voltar para agendado"
    AtendimentoStatus.EXECUCAO -> "Voltar para aguardando"
    AtendimentoStatus.FINALIZADO -> "Reabrir execução"
    else -> "Voltar"
}

private fun patioTimeLabel(item: AtendimentoEntity): String = when (item.status) {
    AtendimentoStatus.AGENDADO -> "Agendado ${formatTimestamp(item.criadoEm)}"
    AtendimentoStatus.FINALIZADO -> "Finalizado ${formatTimestamp(item.finalizadoEm ?: item.updatedAt)}"
    else -> "Entrada ${formatTimestamp(item.criadoEm)}"
}

@Composable
fun NovoAtendimentoDialog(
    servicos: List<ServicoEntity>,
    onClose: () -> Unit,
    onSave: (String, String, String, String, String, ServicoEntity) -> Unit
) {
    var cliente by remember { mutableStateOf("") }
    var telefone by remember { mutableStateOf("") }
    var placa by remember { mutableStateOf("") }
    var veiculo by remember { mutableStateOf("") }
    var alerta by remember { mutableStateOf("") }
    var servicoSelecionado by remember(servicos) { mutableStateOf(servicos.firstOrNull()) }
    val exigeCiencia = alerta.isNotBlank() && servicoSelecionado?.let {
        it.usaProdutoAcido || it.usaProdutoAlcalino || ((it.phEstimado ?: 7.0) !in 6.0..8.0)
    } == true

    AlertDialog(
        onDismissRequest = onClose,
        confirmButton = {
            LavaPrimeActionButton(
                text = if (exigeCiencia) "Confirmar com ciência" else "Adicionar ao pátio",
                onClick = {
                    servicoSelecionado?.let { srv ->
                        onSave(cliente, telefone, placa, veiculo, alerta, srv)
                    }
                },
                enabled = servicoSelecionado != null
            )
        },
        dismissButton = {
            TextButton(onClick = onClose) {
                Text("Cancelar")
            }
        },
        title = {
            Text("Novo atendimento", color = Color(0xFF0B3348), fontWeight = FontWeight.Bold)
        },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                item {
                    LavaPrimeTextField(
                        value = cliente,
                        onValueChange = { cliente = it },
                        label = "Cliente",
                        singleLine = true
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = telefone,
                        onValueChange = { telefone = it },
                        label = "Telefone",
                        singleLine = true
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = placa,
                        onValueChange = { placa = it.uppercase().take(8) },
                        label = "Placa",
                        singleLine = true
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = veiculo,
                        onValueChange = { veiculo = it },
                        label = "Marca, modelo e cor",
                        singleLine = true
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = alerta,
                        onValueChange = { alerta = it },
                        label = "Alerta especial do veículo",
                        placeholder = "Ex.: vitrificado, usar shampoo neutro",
                        minLines = 2
                    )
                }
                item {
                    Text("Serviço", fontWeight = FontWeight.Bold, color = Color(0xFF0B3348))
                    Spacer(Modifier.height(8.dp))
                    LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        items(servicos, key = { it.id }) { srv ->
                            FilterChip(
                                selected = servicoSelecionado?.id == srv.id,
                                onClick = { servicoSelecionado = srv },
                                label = { Text(srv.nome) }
                            )
                        }
                    }
                }
                if (exigeCiencia) {
                    item {
                        LavaPrimeCard(tonal = true, contentPadding = PaddingValues(14.dp)) {
                            Row(verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                Icon(
                                    Icons.Filled.WarningAmber,
                                    contentDescription = null,
                                    tint = Color(0xFFB45309)
                                )
                                Text(
                                    text = "Atenção: o veículo possui alerta e o serviço selecionado pode usar produto ácido, alcalino ou pH fora da faixa neutra.",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = Color(0xFF7E5600)
                                )
                            }
                        }
                    }
                }
            }
        },
        shape = RoundedCornerShape(28.dp),
        containerColor = Color.White
    )
}
