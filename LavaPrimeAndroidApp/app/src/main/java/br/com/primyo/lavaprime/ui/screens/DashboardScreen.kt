package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.KpiCard
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.viewmodel.PatioUiState
import br.com.primyo.lavaprime.ui.viewmodel.SyncUiState
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun DashboardScreen(
    repository: LavaPrimeRepository,
    patioState: PatioUiState,
    syncState: SyncUiState
) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    val faturamento = patioState.atendimentos.sumOf { it.valorCentavos }

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
                description = "Resumo gerencial no padrao LavaPrime Web, adaptado para leitura rapida no mobile.",
                icon = "DB"
            )
        }
        item {
            FlowRow(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                KpiCard("Veiculos no patio", patioState.atendimentos.size.toString(), "PA")
                KpiCard("Receita em aberto", money(faturamento), "R$")
                KpiCard("Estoque critico", produtos.count { it.estoqueAtual <= it.estoqueMinimo }.toString(), "PI")
                KpiCard("Sync pendente", syncState.pendingCount.toString(), "SY")
            }
        }
        item { SectionTitle("Atendimentos recentes") }
        items(patioState.atendimentos, key = { it.id }) { item ->
            AtendimentoCard(item = item, onAdvance = null, onBack = null)
        }
    }
}
