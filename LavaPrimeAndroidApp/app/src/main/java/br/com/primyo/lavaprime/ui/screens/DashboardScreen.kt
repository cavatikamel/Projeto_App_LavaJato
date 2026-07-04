package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.TrendingUp
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.Icon
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.components.formatTimestamp
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.theme.LavaPrimeRadii
import br.com.primyo.lavaprime.ui.theme.PositiveText
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.TextMuted
import br.com.primyo.lavaprime.ui.theme.TextPrimary
import br.com.primyo.lavaprime.ui.theme.TextSecondary
import br.com.primyo.lavaprime.ui.theme.WarningText
import br.com.primyo.lavaprime.ui.theme.WaterBlue
import br.com.primyo.lavaprime.ui.viewmodel.PatioUiState
import br.com.primyo.lavaprime.ui.viewmodel.SyncUiState

private data class DashboardMetric(
    val label: String,
    val value: String,
    val icon: ImageVector,
    val support: String,
    val tone: LavaPrimeStatusTone = LavaPrimeStatusTone.Info
)

private data class DashboardFlowItem(
    val label: String,
    val count: Int,
    val tone: LavaPrimeStatusTone
)

private data class DashboardAlert(
    val title: String,
    val detail: String,
    val tone: LavaPrimeStatusTone,
    val icon: ImageVector
)

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun DashboardScreen(
    repository: LavaPrimeRepository,
    patioState: PatioUiState,
    syncState: SyncUiState
) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    val clientes by repository.clientes.collectAsStateWithLifecycle(initialValue = emptyList())
    val veiculos by repository.veiculos.collectAsStateWithLifecycle(initialValue = emptyList())
    val atendimentosRecentes by repository.atendimentosRecentes.collectAsStateWithLifecycle(initialValue = emptyList())

    val receitaPrevista = patioState.atendimentos.sumOf { it.valorCentavos }
    val estoqueCritico = produtos.count { it.estoqueAtual <= it.estoqueMinimo }
    val agendados = atendimentosRecentes.count { it.status == AtendimentoStatus.AGENDADO }
    val noPatio = atendimentosRecentes.count { it.status == AtendimentoStatus.PATIO }
    val emExecucao = atendimentosRecentes.count { it.status == AtendimentoStatus.EXECUCAO }
    val finalizados = atendimentosRecentes.count { it.status == AtendimentoStatus.FINALIZADO }
    val alertasConfirmados = atendimentosRecentes.count { it.alertaConfirmado }
    val comCuidadoEspecial = veiculos.count { !it.alertaEspecial.isNullOrBlank() }

    val metrics = listOf(
        DashboardMetric(
            label = "Receita prevista",
            value = money(receitaPrevista),
            icon = Icons.Filled.AttachMoney,
            support = "Total atual dos atendimentos abertos no app.",
            tone = LavaPrimeStatusTone.Success
        ),
        DashboardMetric(
            label = "Vendas de produtos",
            value = "--",
            icon = Icons.Filled.PointOfSale,
            support = "Painel reservado para a fase de vendas mobile."
        ),
        DashboardMetric(
            label = "Taxas previstas",
            value = "--",
            icon = Icons.Filled.CreditCard,
            support = "Leitura financeira ainda depende do modulo de pagamentos."
        ),
        DashboardMetric(
            label = "Líquido estimado",
            value = "--",
            icon = Icons.Filled.TrendingUp,
            support = "Sera calculado quando vendas e taxas estiverem completas."
        ),
        DashboardMetric(
            label = "Veículos no pátio",
            value = patioState.atendimentos.size.toString(),
            icon = Icons.Filled.DirectionsCar,
            support = "Atendimentos ativos agora."
        ),
        DashboardMetric(
            label = "Agendados",
            value = agendados.toString(),
            icon = Icons.Filled.Event,
            support = "Entradas aguardando chegada.",
            tone = if (agendados > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            label = "Em Serviço",
            value = emExecucao.toString(),
            icon = Icons.Filled.Build,
            support = "Rotina em execucao neste momento."
        ),
        DashboardMetric(
            label = "Prontos",
            value = "--",
            icon = Icons.Filled.CheckCircle,
            support = "A etapa pronta ainda nao tem status local dedicado."
        ),
        DashboardMetric(
            label = "Finalizados",
            value = finalizados.toString(),
            icon = Icons.Filled.History,
            support = "Historico recente salvo no banco local.",
            tone = if (finalizados > 0) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            label = "Faturado aberto",
            value = "--",
            icon = Icons.Filled.ReceiptLong,
            support = "Leitura reservada para cobrancas e faturamento."
        ),
        DashboardMetric(
            label = "Com cuidado especial",
            value = comCuidadoEspecial.toString(),
            icon = Icons.Filled.WarningAmber,
            support = "Veiculos com alerta tecnico cadastrado.",
            tone = if (comCuidadoEspecial > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            label = "Alertas confirmados",
            value = alertasConfirmados.toString(),
            icon = Icons.Filled.Shield,
            support = "Atendimentos com alerta reconhecido na base local.",
            tone = if (alertasConfirmados > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            label = "Alertas de estoque",
            value = estoqueCritico.toString(),
            icon = Icons.Filled.Inventory2,
            support = "Produtos ou insumos abaixo do minimo.",
            tone = if (estoqueCritico > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
        ),
        DashboardMetric(
            label = "Serviços sem ficha",
            value = "--",
            icon = Icons.Filled.Build,
            support = "Sera medido quando o perfil tecnico de servicos entrar no app."
        )
    )

    val flowItems = listOf(
        DashboardFlowItem("Agendados", agendados, LavaPrimeStatusTone.Warning),
        DashboardFlowItem("No pátio", noPatio, LavaPrimeStatusTone.Info),
        DashboardFlowItem("Em execução", emExecucao, LavaPrimeStatusTone.Info),
        DashboardFlowItem("Finalizados", finalizados, LavaPrimeStatusTone.Success)
    )

    val alerts = buildList {
        if (agendados > 0) {
            add(
                DashboardAlert(
                    title = "Agendamentos aguardando entrada",
                    detail = "$agendados atendimento(s) esperando chegada ao pátio.",
                    tone = LavaPrimeStatusTone.Warning,
                    icon = Icons.Filled.Event
                )
            )
        }
        if (emExecucao > 0) {
            add(
                DashboardAlert(
                    title = "Serviços em execução",
                    detail = "$emExecucao veículo(s) em rotina operacional agora.",
                    tone = LavaPrimeStatusTone.Info,
                    icon = Icons.Filled.Build
                )
            )
        }
        if (syncState.pendingCount > 0) {
            add(
                DashboardAlert(
                    title = "Pendências de sincronização",
                    detail = "${syncState.pendingCount} item(ns) aguardando envio seguro.",
                    tone = LavaPrimeStatusTone.Warning,
                    icon = Icons.Filled.Sync
                )
            )
        }
        if (comCuidadoEspecial > 0) {
            add(
                DashboardAlert(
                    title = "Veículos com cuidado especial",
                    detail = "$comCuidadoEspecial cadastro(s) exigem atenção na execução.",
                    tone = LavaPrimeStatusTone.Warning,
                    icon = Icons.Filled.WarningAmber
                )
            )
        }
        if (estoqueCritico > 0) {
            add(
                DashboardAlert(
                    title = "Alerta de estoque",
                    detail = "$estoqueCritico item(ns) estao abaixo do mínimo local.",
                    tone = LavaPrimeStatusTone.Warning,
                    icon = Icons.Filled.Inventory2
                )
            )
        }
        if (alertasConfirmados > 0) {
            add(
                DashboardAlert(
                    title = "Alertas técnicos confirmados",
                    detail = "$alertasConfirmados atendimento(s) ja marcaram cuidado especial.",
                    tone = LavaPrimeStatusTone.Info,
                    icon = Icons.Filled.Shield
                )
            )
        }
    }

    LazyColumn(
        modifier = Modifier.padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 24.dp)
    ) {
        item {
            HeroPanel(
                title = "Dashboard",
                description = "Leitura operacional do dia com os mesmos blocos centrais do Dashboard Web, adaptados ao uso mobile.",
                icon = Icons.Filled.AttachMoney
            )
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
                        "${syncState.pendingCount} pendência(s) de sync"
                    } else {
                        "Sem pendências de sync"
                    },
                    tone = if (syncState.pendingCount > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
                )
                LavaPrimeStatusChip(
                    text = "Clientes ${clientes.size}",
                    tone = LavaPrimeStatusTone.Info
                )
                LavaPrimeStatusChip(
                    text = "Veículos ${veiculos.size}",
                    tone = LavaPrimeStatusTone.Info
                )
                LavaPrimeStatusChip(
                    text = "Última sync ${formatTimestamp(syncState.lastAttemptAt)}",
                    tone = LavaPrimeStatusTone.Neutral
                )
            }
        }
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                metrics.forEach { metric ->
                    LavaPrimeMetricCard(
                        label = metric.label,
                        value = metric.value,
                        icon = metric.icon,
                        support = metric.support,
                        tone = metric.tone
                    )
                }
            }
        }
        item {
            SectionTitle(
                text = "Fluxo da operação",
                support = "O mesmo bloco central do Web, com leitura compacta para tela pequena."
            )
        }
        item {
            LavaPrimeCard(modifier = Modifier.fillMaxWidth()) {
                flowItems.forEach { flow ->
                    DashboardFlowRow(
                        label = flow.label,
                        count = flow.count,
                        total = atendimentosRecentes.size,
                        tone = flow.tone
                    )
                }
            }
        }
        item {
            SectionTitle(
                text = "Alertas do painel",
                support = "Resumo operacional que pede atenção imediata no mobile."
            )
        }
        if (alerts.isEmpty()) {
            item {
                EmptyState(
                    title = "Sem alertas operacionais agora",
                    description = "Quando o pátio, o estoque ou a sincronização exigirem ação, os avisos aparecem aqui."
                )
            }
        } else {
            items(alerts, key = { it.title }) { alert ->
                DashboardAlertCard(alert = alert)
            }
        }
        item {
            SectionTitle(
                text = "Manutenções próximas",
                support = "Bloco preservado do Web para futura leitura operacional de manutenção."
            )
        }
        item {
            EmptyState(
                title = "Nenhuma manutenção próxima ao vencimento.",
                description = "A leitura de manutenção ainda nao foi conectada ao estado local do app."
            )
        }
        item {
            SectionTitle(
                text = "Fila do momento",
                support = "Leitura rápida dos atendimentos que sustentam a operação agora."
            )
        }
        if (patioState.atendimentos.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum atendimento ativo",
                    description = "Os proximos atendimentos do dia aparecerao aqui assim que entrarem no pátio."
                )
            }
        } else {
            items(patioState.atendimentos.take(4), key = { it.id }) { atendimento ->
                AtendimentoCard(
                    item = atendimento,
                    onAdvance = null,
                    onBack = null
                )
            }
        }
    }
}

@Composable
private fun DashboardFlowRow(
    label: String,
    count: Int,
    total: Int,
    tone: LavaPrimeStatusTone
) {
    val progress = if (total <= 0) 0f else count.toFloat() / total.toFloat()

    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = label,
                modifier = Modifier.weight(1f),
                style = MaterialTheme.typography.titleSmall,
                color = TextPrimary,
                fontWeight = FontWeight.SemiBold,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            LavaPrimeStatusChip(
                text = count.toString(),
                tone = tone
            )
        }
        LinearProgressIndicator(
            progress = { progress },
            modifier = Modifier
                .fillMaxWidth()
                .height(8.dp),
            color = when (tone) {
                LavaPrimeStatusTone.Success -> PositiveText
                LavaPrimeStatusTone.Warning -> WarningText
                LavaPrimeStatusTone.Info -> WaterBlue
                LavaPrimeStatusTone.Danger -> WarningText
                LavaPrimeStatusTone.Neutral -> PrimeBlue
            },
            trackColor = WaterBlue.copy(alpha = 0.12f)
        )
    }
}

@Composable
private fun DashboardAlertCard(alert: DashboardAlert) {
    LavaPrimeCard(
        modifier = Modifier.fillMaxWidth(),
        tonal = true,
        contentPadding = PaddingValues(14.dp)
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            verticalAlignment = Alignment.Top
        ) {
            Surface(
                color = when (alert.tone) {
                    LavaPrimeStatusTone.Success -> PositiveText.copy(alpha = 0.14f)
                    LavaPrimeStatusTone.Warning -> WarningText.copy(alpha = 0.14f)
                    LavaPrimeStatusTone.Info -> WaterBlue.copy(alpha = 0.14f)
                    LavaPrimeStatusTone.Danger -> WarningText.copy(alpha = 0.14f)
                    LavaPrimeStatusTone.Neutral -> PrimeBlue.copy(alpha = 0.08f)
                },
                contentColor = when (alert.tone) {
                    LavaPrimeStatusTone.Success -> PositiveText
                    LavaPrimeStatusTone.Warning -> WarningText
                    LavaPrimeStatusTone.Info -> PrimeBlue
                    LavaPrimeStatusTone.Danger -> WarningText
                    LavaPrimeStatusTone.Neutral -> PrimeBlue
                },
                shape = androidx.compose.foundation.shape.RoundedCornerShape(LavaPrimeRadii.medium)
            ) {
                Icon(
                    imageVector = alert.icon,
                    contentDescription = null,
                    modifier = Modifier.padding(10.dp)
                )
            }
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = alert.title,
                    style = MaterialTheme.typography.titleSmall,
                    color = TextPrimary,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = alert.detail,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextMuted
                )
            }
        }
    }
}
