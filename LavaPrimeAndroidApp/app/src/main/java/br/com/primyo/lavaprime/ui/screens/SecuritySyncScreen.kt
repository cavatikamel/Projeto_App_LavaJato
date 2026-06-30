package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.ui.components.ChecklistCard
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LandingBadge
import br.com.primyo.lavaprime.ui.components.formatTimestamp
import br.com.primyo.lavaprime.ui.theme.Mint
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.TextPrimary
import br.com.primyo.lavaprime.ui.viewmodel.SyncUiState

@Composable
fun SecuritySyncScreen(
    state: SyncUiState,
    onManualSync: () -> Unit
) {
    LazyColumn(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
        contentPadding = PaddingValues(bottom = 90.dp)
    ) {
        item {
            HeroPanel(
                title = "Seguranca e sincronizacao",
                description = "Base preparada para Room offline, backend Supabase do LavaPrime Web e trilha de auditoria.",
                icon = "SC"
            )
        }
        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(22.dp)
            ) {
                androidx.compose.foundation.layout.Column(
                    modifier = Modifier.padding(16.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp)
                ) {
                    Text("Estado atual", fontWeight = FontWeight.Black, color = PrimeBlue)
                    LandingBadge(if (state.online) "Online" else "Offline")
                    LandingBadge(if (state.backendConfigured) "Backend configurado" else "Backend pendente")
                    LandingBadge("${state.pendingCount} alteracoes na fila")
                    Text(state.lastMessage, style = MaterialTheme.typography.bodyMedium, color = Color(0xFF4F6870))
                    Text("Ultima tentativa: ${formatTimestamp(state.lastAttemptAt)}", style = MaterialTheme.typography.bodySmall, color = Color(0xFF667980))
                    Text("Politica de conflito: ${state.policyLabel}", style = MaterialTheme.typography.bodySmall, color = Color(0xFF667980))
                    Button(
                        onClick = onManualSync,
                        colors = ButtonDefaults.buttonColors(containerColor = Mint, contentColor = TextPrimary),
                        shape = RoundedCornerShape(16.dp)
                    ) {
                        Text("Tentar sincronizar agora")
                    }
                }
            }
        }
        item {
            ChecklistCard(
                "Padroes ja previstos",
                listOf(
                    "Room como fonte local principal",
                    "Fila de sincronizacao por entidade",
                    "empresaId, syncStatus e updatedAt nas entidades",
                    "politica last-write-wins por updatedAt",
                    "trilha de auditoria para acoes criticas",
                    "monitor de conectividade para modo offline"
                )
            )
        }
        item {
            ChecklistCard(
                "Proximos conectores",
                listOf(
                    "Supabase Auth",
                    "PostgREST ou API de dominio",
                    "Edge Functions para regras sensiveis",
                    "WorkManager com rotina remota real",
                    "upload de anexos e documentos",
                    "migracao do web para a mesma base persistida"
                )
            )
        }
        item {
            Text("Auditoria recente", fontWeight = FontWeight.Black, color = PrimeBlue)
        }
        items(state.auditTrail, key = { it.id }) { log ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(18.dp)
            ) {
                androidx.compose.foundation.layout.Column(
                    modifier = Modifier.padding(14.dp),
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Text("${log.entidade}  ${log.acao}", fontWeight = FontWeight.Bold, color = PrimeBlue)
                    Text(log.detalhe ?: "Sem detalhes", style = MaterialTheme.typography.bodySmall, color = Color(0xFF506870))
                    Text(formatTimestamp(log.criadoEm), style = MaterialTheme.typography.labelSmall, color = Color(0xFF7B9096))
                }
            }
        }
    }
}
