package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.ui.components.ChecklistCard
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.formatTimestamp
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
                title = "Segurança e sincronização",
                description = "Base local, auditoria e fila de sincronização com linguagem clara para operação mobile.",
                icon = Icons.Filled.Security
            )
        }
        item {
            LavaPrimeCard(modifier = Modifier.fillMaxWidth()) {
                Text("Estado atual", fontWeight = FontWeight.Bold, color = Color(0xFF0B3348))
                androidx.compose.foundation.layout.Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    LavaPrimeStatusChip(
                        text = if (state.online) "Online" else "Offline",
                        tone = if (state.online) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Warning,
                        icon = if (state.online) Icons.Filled.CheckCircle else Icons.Filled.WarningAmber
                    )
                    LavaPrimeStatusChip(
                        text = if (state.backendConfigured) "Backend configurado" else "Backend pendente",
                        tone = if (state.backendConfigured) LavaPrimeStatusTone.Info else LavaPrimeStatusTone.Warning,
                        icon = Icons.Filled.Sync
                    )
                }
                LavaPrimeStatusChip(
                    text = if (state.pendingCount > 0) "${state.pendingCount} alterações na fila" else "Fila sem pendências",
                    tone = if (state.pendingCount > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Success
                )
                Text(state.lastMessage, style = MaterialTheme.typography.bodyMedium, color = Color(0xFF4F6870))
                Text("Última tentativa: ${formatTimestamp(state.lastAttemptAt)}", style = MaterialTheme.typography.bodySmall, color = Color(0xFF64748B))
                Text("Política de conflito: ${state.policyLabel}", style = MaterialTheme.typography.bodySmall, color = Color(0xFF64748B))
                LavaPrimeActionButton(
                    text = "Tentar sincronizar agora",
                    onClick = onManualSync,
                    icon = Icons.Filled.Sync
                )
            }
        }
        item {
            ChecklistCard(
                "Padrões já previstos",
                listOf(
                    "Room como fonte local principal",
                    "Fila de sincronização por entidade",
                    "empresaId, syncStatus e updatedAt nas entidades",
                    "política last-write-wins por updatedAt",
                    "trilha de auditoria para ações críticas",
                    "monitor de conectividade para modo offline"
                )
            )
        }
        item {
            ChecklistCard(
                "Próximos conectores",
                listOf(
                    "Supabase Auth",
                    "PostgREST ou API de domínio",
                    "Edge Functions para regras sensíveis",
                    "WorkManager com rotina remota real",
                    "Upload de anexos e documentos",
                    "Migração do web para a mesma base persistida"
                )
            )
        }
        item {
            Text("Auditoria recente", fontWeight = FontWeight.Bold, color = Color(0xFF0B3348))
        }
        items(state.auditTrail, key = { it.id }) { log ->
            LavaPrimeCard(modifier = Modifier.fillMaxWidth(), tonal = true) {
                Text("${log.entidade} • ${log.acao}", fontWeight = FontWeight.SemiBold, color = Color(0xFF0B3348))
                Text(log.detalhe ?: "Sem detalhes", style = MaterialTheme.typography.bodySmall, color = Color(0xFF506870))
                Text(formatTimestamp(log.criadoEm), style = MaterialTheme.typography.labelSmall, color = Color(0xFF7B9096))
            }
        }
    }
}
