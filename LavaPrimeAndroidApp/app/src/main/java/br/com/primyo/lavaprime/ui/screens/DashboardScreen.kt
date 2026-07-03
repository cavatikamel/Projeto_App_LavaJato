package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AttachMoney
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.Sync
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.viewmodel.PatioUiState
import br.com.primyo.lavaprime.ui.viewmodel.SyncUiState

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun DashboardScreen(
    repository: LavaPrimeRepository,
    patioState: PatioUiState,
    syncState: SyncUiState
) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    val faturamento = patioState.atendimentos.sumOf { it.valorCentavos }
    val estoqueCritico = produtos.count { it.estoqueAtual <= it.estoqueMinimo }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(bottom = 24.dp)
    ) {
        item {
            HeroPanel(
                title = "Dashboard",
                description = "Visão geral da operação com leitura rápida e hierarquia visual alinhada ao LavaPrime.",
                icon = Icons.Filled.AttachMoney
            )
        }
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                LavaPrimeMetricCard(
                    label = "Veículos no pátio",
                    value = patioState.atendimentos.size.toString(),
                    icon = Icons.Filled.DirectionsCar,
                    support = "Atendimentos ativos no momento"
                )
                LavaPrimeMetricCard(
                    label = "Receita prevista",
                    value = money(faturamento),
                    icon = Icons.Filled.AttachMoney,
                    support = "Total somado dos atendimentos em aberto",
                    tone = LavaPrimeStatusTone.Success
                )
                LavaPrimeMetricCard(
                    label = "Estoque crítico",
                    value = estoqueCritico.toString(),
                    icon = Icons.Filled.Inventory2,
                    support = "Itens abaixo do mínimo",
                    tone = if (estoqueCritico > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
                )
                LavaPrimeMetricCard(
                    label = "Sync pendente",
                    value = syncState.pendingCount.toString(),
                    icon = Icons.Filled.Sync,
                    support = "Fila local aguardando sincronização",
                    tone = if (syncState.pendingCount > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Success
                )
            }
        }
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                LavaPrimeStatusChip(
                    text = if (syncState.online) "Online" else "Offline",
                    tone = if (syncState.online) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Warning
                )
                LavaPrimeStatusChip(
                    text = if (syncState.pendingCount > 0) {
                        "${syncState.pendingCount} pendências de sync"
                    } else {
                        "Sem pendências de sync"
                    },
                    tone = if (syncState.pendingCount > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
                )
            }
        }
        item {
            SectionTitle(
                text = "Atendimentos recentes",
                support = "Itens operacionais ativos com status e valor previsto"
            )
        }
        if (patioState.atendimentos.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum atendimento ativo",
                    description = "Os próximos atendimentos do dia aparecerão aqui."
                )
            }
        } else {
            items(patioState.atendimentos, key = { it.id }) { item ->
                AtendimentoCard(item = item, onAdvance = null, onBack = null)
            }
        }
    }
}
