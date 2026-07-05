package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AttachMoney
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.CreditCard
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Event
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.PointOfSale
import androidx.compose.material.icons.filled.ReceiptLong
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.viewmodel.PatioUiState
import br.com.primyo.lavaprime.ui.viewmodel.SyncUiState

private data class DashboardMetric(
    val label: String,
    val value: String,
    val icon: ImageVector,
    val tone: LavaPrimeStatusTone = LavaPrimeStatusTone.Info,
    val opensPatio: Boolean = false
)

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun DashboardScreen(
    repository: LavaPrimeRepository,
    patioState: PatioUiState,
    syncState: SyncUiState,
    onOpenPatio: () -> Unit
) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    val veiculos by repository.veiculos.collectAsStateWithLifecycle(initialValue = emptyList())
    val servicos by repository.servicos.collectAsStateWithLifecycle(initialValue = emptyList())
    val atendimentosRecentes by repository.atendimentosRecentes.collectAsStateWithLifecycle(initialValue = emptyList())

    val receitaPrevista = patioState.atendimentos.sumOf { it.valorCentavos }
    val taxasPrevistas = 0L
    val liquidoEstimado = receitaPrevista - taxasPrevistas
    val pagamentosEmAberto = atendimentosRecentes.count {
        it.formaPagamento == null && it.status != AtendimentoStatus.CANCELADO
    }
    val faturadoAberto = 0L
    val estoqueCritico = produtos.count { it.estoqueAtual <= it.estoqueMinimo }
    val agendados = atendimentosRecentes.count { it.status == AtendimentoStatus.AGENDADO }
    val noPatio = atendimentosRecentes.count { it.status == AtendimentoStatus.PATIO }
    val emExecucao = atendimentosRecentes.count { it.status == AtendimentoStatus.EXECUCAO }
    val prontos = 0
    val finalizados = atendimentosRecentes.count { it.status == AtendimentoStatus.FINALIZADO }
    val alertasConfirmados = atendimentosRecentes.count { it.alertaConfirmado }
    val comCuidadoEspecial = veiculos.count { !it.alertaEspecial.isNullOrBlank() }
    val servicosSemFicha = servicos.count { !it.fichaTecnicaAtiva }

    val negocioMetrics = listOf(
        DashboardMetric("Receita prevista", money(receitaPrevista), Icons.Filled.AttachMoney, LavaPrimeStatusTone.Success),
        DashboardMetric("Vendas de produtos", money(0), Icons.Filled.PointOfSale),
        DashboardMetric("Taxas previstas", money(taxasPrevistas), Icons.Filled.CreditCard),
        DashboardMetric("Líquido estimado", money(liquidoEstimado), Icons.Filled.TrendingUp, LavaPrimeStatusTone.Success),
        DashboardMetric(
            "Pagamentos em aberto",
            pagamentosEmAberto.toString(),
            Icons.Filled.ReceiptLong,
            if (pagamentosEmAberto > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric("Faturado aberto", money(faturadoAberto), Icons.Filled.Shield)
    )

    val operacaoMetrics = listOf(
        DashboardMetric("Veículos no pátio", noPatio.toString(), Icons.Filled.DirectionsCar, opensPatio = true),
        DashboardMetric(
            "Agendados",
            agendados.toString(),
            Icons.Filled.Event,
            if (agendados > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info,
            true
        ),
        DashboardMetric("Em Serviço", emExecucao.toString(), Icons.Filled.Build, opensPatio = true),
        DashboardMetric("Prontos", prontos.toString(), Icons.Filled.CheckCircle, opensPatio = true),
        DashboardMetric(
            "Finalizados",
            finalizados.toString(),
            Icons.Filled.History,
            if (finalizados > 0) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Info,
            true
        )
    )

    val apoioMetrics = listOf(
        DashboardMetric(
            "Alertas de estoque",
            estoqueCritico.toString(),
            Icons.Filled.Inventory2,
            if (estoqueCritico > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            "Com cuidado especial",
            comCuidadoEspecial.toString(),
            Icons.Filled.WarningAmber,
            if (comCuidadoEspecial > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            "Alertas confirmados",
            alertasConfirmados.toString(),
            Icons.Filled.Shield,
            if (alertasConfirmados > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            "Serviços sem ficha",
            servicosSemFicha.toString(),
            Icons.Filled.Build,
            if (servicosSemFicha > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            "Pendências de sync",
            syncState.pendingCount.toString(),
            Icons.Filled.History,
            if (syncState.pendingCount > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        )
    )

    LazyColumn(
        modifier = Modifier.padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 24.dp)
    ) {
        item {
            SectionTitle(text = "Visão do negócio")
        }
        item {
            DashboardMetricGrid(metrics = negocioMetrics, onOpenPatio = onOpenPatio)
        }
        item {
            SectionTitle(text = "Operação atual")
        }
        item {
            DashboardMetricGrid(metrics = operacaoMetrics, onOpenPatio = onOpenPatio)
        }
        item {
            SectionTitle(text = "Atenções")
        }
        item {
            DashboardMetricGrid(metrics = apoioMetrics, onOpenPatio = onOpenPatio)
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun DashboardMetricGrid(
    metrics: List<DashboardMetric>,
    onOpenPatio: () -> Unit
) {
    FlowRow(
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        metrics.forEach { metric ->
            LavaPrimeMetricCard(
                label = metric.label,
                value = metric.value,
                icon = metric.icon,
                tone = metric.tone,
                onClick = if (metric.opensPatio) onOpenPatio else null
            )
        }
    }
}
