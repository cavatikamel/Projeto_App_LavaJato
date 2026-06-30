package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
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
import br.com.primyo.lavaprime.data.model.AtendimentoEntity
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LandingBadge
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.components.statusLabel
import br.com.primyo.lavaprime.ui.theme.Mint
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.SoftLine
import br.com.primyo.lavaprime.ui.theme.TextPrimary
import br.com.primyo.lavaprime.ui.theme.WaterBlue
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
                title = "Patio operacional",
                description = "Cards grandes, status claro e alerta do veiculo em destaque para uso com uma mao.",
                icon = "PA"
            )
        }
        item {
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                item { LandingBadge("Todos ${state.atendimentos.size}") }
                item { LandingBadge("Execucao ${state.atendimentos.count { it.status == AtendimentoStatus.EXECUCAO }}") }
                item { LandingBadge("Com alerta ${state.atendimentos.count { !it.observacoes.isNullOrBlank() }}") }
                item { LandingBadge("Filtro ${state.filtroStatus?.name ?: "TODOS"}") }
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
                    title = "Nenhum veiculo no patio",
                    description = "Toque em Novo atendimento para iniciar uma entrada rapida."
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
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(24.dp),
        border = BorderStroke(1.dp, SoftLine)
    ) {
        androidx.compose.foundation.layout.Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Surface(
                    modifier = Modifier.height(52.dp),
                    color = Color(0xFFE5F8FB),
                    shape = RoundedCornerShape(18.dp)
                ) {
                    Text(
                        "PA",
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 14.dp),
                        fontWeight = FontWeight.Bold,
                        color = PrimeBlue
                    )
                }
                Spacer(Modifier.padding(horizontal = 6.dp))
                androidx.compose.foundation.layout.Column(Modifier.weight(1f)) {
                    Text(item.placaSnapshot, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Black, color = PrimeBlue)
                    Text(item.clienteNomeSnapshot, maxLines = 1, overflow = TextOverflow.Ellipsis, color = Color(0xFF435F67))
                    Text(item.servicoNomeSnapshot, style = MaterialTheme.typography.labelMedium, color = WaterBlue, fontWeight = FontWeight.Bold)
                }
                AssistChip(onClick = {}, label = { Text(statusLabel(item.status)) })
            }
            if (!item.observacoes.isNullOrBlank()) {
                Surface(
                    color = Color(0xFFFFF2D9),
                    shape = RoundedCornerShape(16.dp),
                    border = BorderStroke(1.dp, Color(0xFFFFD58A))
                ) {
                    Text(
                        "Alerta: ${item.observacoes}",
                        modifier = Modifier.padding(12.dp),
                        color = Color(0xFF744600),
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                LandingBadge(money(item.valorCentavos))
                LandingBadge(item.syncStatus.name.replace('_', ' '))
            }
            if (onAdvance != null || onBack != null) {
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    if (onBack != null) {
                        OutlinedButton(onClick = onBack, shape = RoundedCornerShape(14.dp)) {
                            Text("Voltar")
                        }
                    }
                    if (onAdvance != null) {
                        Button(
                            onClick = onAdvance,
                            colors = ButtonDefaults.buttonColors(containerColor = Mint, contentColor = TextPrimary),
                            shape = RoundedCornerShape(14.dp)
                        ) {
                            Text(if (item.status == AtendimentoStatus.EXECUCAO) "Finalizar" else "Avancar")
                        }
                    }
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
            Button(
                enabled = servicoSelecionado != null,
                onClick = {
                    servicoSelecionado?.let { srv ->
                        onSave(cliente, telefone, placa, veiculo, alerta, srv)
                    }
                },
                colors = ButtonDefaults.buttonColors(containerColor = Mint, contentColor = TextPrimary)
            ) {
                Text(if (exigeCiencia) "Confirmar com ciencia" else "Adicionar ao patio")
            }
        },
        dismissButton = { TextButton(onClick = onClose) { Text("Cancelar") } },
        title = { Text("Novo atendimento", color = PrimeBlue, fontWeight = FontWeight.Black) },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                item {
                    OutlinedTextField(cliente, { cliente = it }, label = { Text("Cliente") }, modifier = Modifier.fillMaxWidth(), singleLine = true, shape = RoundedCornerShape(14.dp))
                }
                item {
                    OutlinedTextField(telefone, { telefone = it }, label = { Text("Telefone") }, modifier = Modifier.fillMaxWidth(), singleLine = true, shape = RoundedCornerShape(14.dp))
                }
                item {
                    OutlinedTextField(placa, { placa = it.uppercase().take(8) }, label = { Text("Placa") }, modifier = Modifier.fillMaxWidth(), singleLine = true, shape = RoundedCornerShape(14.dp))
                }
                item {
                    OutlinedTextField(veiculo, { veiculo = it }, label = { Text("Marca/modelo/cor") }, modifier = Modifier.fillMaxWidth(), singleLine = true, shape = RoundedCornerShape(14.dp))
                }
                item {
                    OutlinedTextField(
                        alerta,
                        { alerta = it },
                        label = { Text("Alerta especial do veiculo") },
                        placeholder = { Text("Ex.: vitrificado, usar shampoo neutro") },
                        modifier = Modifier.fillMaxWidth(),
                        minLines = 2,
                        shape = RoundedCornerShape(14.dp)
                    )
                }
                item {
                    Text("Servico", fontWeight = FontWeight.Black, color = PrimeBlue)
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
                        Surface(
                            color = Color(0xFFFFF2D9),
                            shape = RoundedCornerShape(16.dp),
                            border = BorderStroke(1.dp, Color(0xFFFFD58A))
                        ) {
                            Text(
                                "Atencao: o veiculo possui alerta e o servico selecionado pode usar produto acido/alcalino ou pH fora da faixa neutra.",
                                modifier = Modifier.padding(12.dp),
                                color = Color(0xFF744600)
                            )
                        }
                    }
                }
            }
        },
        shape = RoundedCornerShape(24.dp),
        containerColor = Color.White
    )
}
