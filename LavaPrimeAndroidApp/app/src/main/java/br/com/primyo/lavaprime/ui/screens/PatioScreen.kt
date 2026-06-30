package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.data.model.AtendimentoEntity
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LandingBadge
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.components.statusLabel
import br.com.primyo.lavaprime.ui.components.syncStatusLabel
import br.com.primyo.lavaprime.ui.components.syncStatusTone
import br.com.primyo.lavaprime.ui.viewmodel.PatioUiState

@Composable
fun PatioScreen(
    state: PatioUiState,
    usuario: UsuarioEntity,
    onSelectFilter: (AtendimentoStatus?) -> Unit,
    onToggleAlerts: () -> Unit,
    onAdvance: (AtendimentoEntity, UsuarioEntity) -> Unit,
    onBack: (AtendimentoEntity, UsuarioEntity) -> Unit
) {
    LazyColumn(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
        contentPadding = PaddingValues(bottom = 92.dp)
    ) {
        item {
            HeroPanel(
                title = "Pátio operacional",
                description = "Fila de veículos em atendimento com status claro, alerta visível e ações rápidas.",
                icon = Icons.Filled.DirectionsCar
            )
        }
        item {
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                item { LandingBadge("Todos ${state.atendimentos.size}") }
                item { LandingBadge("Execução ${state.atendimentos.count { it.status == AtendimentoStatus.EXECUCAO }}") }
                item { LandingBadge("Com alerta ${state.atendimentos.count { !it.observacoes.isNullOrBlank() }}") }
                item { LandingBadge("Filtro ${state.filtroStatus?.let(::statusLabel) ?: "Todos"}") }
            }
        }
        item {
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                item {
                    FilterChip(
                        selected = state.filtroStatus == null,
                        onClick = { onSelectFilter(null) },
                        label = { Text("Todos") }
                    )
                }
                items(listOf(AtendimentoStatus.AGENDADO, AtendimentoStatus.PATIO, AtendimentoStatus.EXECUCAO)) { status ->
                    FilterChip(
                        selected = state.filtroStatus == status,
                        onClick = { onSelectFilter(status) },
                        label = { Text(statusLabel(status)) }
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
        items(state.listaFiltrada, key = { it.id }) { item ->
            AtendimentoCard(
                item = item,
                onAdvance = { onAdvance(item, usuario) },
                onBack = { onBack(item, usuario) }
            )
        }
        if (state.listaFiltrada.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum veículo no pátio",
                    description = "Toque em Novo atendimento para iniciar uma entrada rápida."
                )
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
    LavaPrimeCard(modifier = Modifier.fillMaxWidth()) {
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            LavaPrimeStatusChip(
                text = item.placaSnapshot,
                tone = LavaPrimeStatusTone.Info,
                icon = Icons.Filled.DirectionsCar
            )
            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(
                    item.clienteNomeSnapshot,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF0F2230),
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(item.servicoNomeSnapshot, style = MaterialTheme.typography.bodySmall, color = Color(0xFF4E6470))
            }
            LavaPrimeStatusChip(
                text = statusLabel(item.status),
                tone = when (item.status) {
                    AtendimentoStatus.AGENDADO -> LavaPrimeStatusTone.Warning
                    AtendimentoStatus.PATIO -> LavaPrimeStatusTone.Info
                    AtendimentoStatus.EXECUCAO -> LavaPrimeStatusTone.Info
                    AtendimentoStatus.FINALIZADO -> LavaPrimeStatusTone.Success
                    AtendimentoStatus.CANCELADO -> LavaPrimeStatusTone.Danger
                }
            )
        }

        if (!item.observacoes.isNullOrBlank()) {
            LavaPrimeCard(
                modifier = Modifier.fillMaxWidth(),
                tonal = true,
                contentPadding = PaddingValues(14.dp)
            ) {
                Row(verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    androidx.compose.material3.Icon(
                        Icons.Filled.WarningAmber,
                        contentDescription = null,
                        tint = Color(0xFFB45309)
                    )
                    Text(
                        "Atenção: ${item.observacoes}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(0xFF7E5600)
                    )
                }
            }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            LavaPrimeStatusChip(
                text = money(item.valorCentavos),
                tone = LavaPrimeStatusTone.Success
            )
            LavaPrimeStatusChip(
                text = syncStatusLabel(item.syncStatus),
                tone = syncStatusTone(item.syncStatus)
            )
        }

        if (onAdvance != null || onBack != null) {
            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                if (onBack != null) {
                    LavaPrimeActionButton(
                        text = "Voltar",
                        onClick = onBack,
                        style = LavaPrimeActionStyle.Outline,
                        modifier = Modifier.weight(1f)
                    )
                }
                if (onAdvance != null) {
                    LavaPrimeActionButton(
                        text = if (item.status == AtendimentoStatus.EXECUCAO) "Finalizar" else "Avançar",
                        onClick = onAdvance,
                        style = LavaPrimeActionStyle.Primary,
                        modifier = Modifier.weight(1f)
                    )
                }
            }
        }
    }
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
                                androidx.compose.material3.Icon(
                                    Icons.Filled.WarningAmber,
                                    contentDescription = null,
                                    tint = Color(0xFFB45309)
                                )
                                Text(
                                    "Atenção: o veículo possui alerta e o serviço selecionado pode usar produto ácido, alcalino ou pH fora da faixa neutra.",
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
