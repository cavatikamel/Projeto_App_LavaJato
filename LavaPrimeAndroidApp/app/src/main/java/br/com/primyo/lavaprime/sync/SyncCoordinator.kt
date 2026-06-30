package br.com.primyo.lavaprime.sync

import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

data class SyncRuntimeState(
    val backendConfigured: Boolean = false,
    val lastAttemptAt: Long? = null,
    val lastMessage: String = "Aguardando primeira sincronizacao.",
    val policyLabel: String = LastWriteWinsPolicy.description
)

class SyncCoordinator(
    private val repository: LavaPrimeRepository,
    private val connectivityMonitor: ConnectivityMonitor,
    private val config: SupabaseRuntimeConfig
) {
    private val _state = MutableStateFlow(
        SyncRuntimeState(
            backendConfigured = config.isConfigured(),
            policyLabel = LastWriteWinsPolicy.description
        )
    )
    val state: StateFlow<SyncRuntimeState> = _state.asStateFlow()

    suspend fun performSync(reason: String): SyncRuntimeState {
        val now = System.currentTimeMillis()
        val pendencias = repository.listarPendenciasSyncSnapshot()
        val canAttemptRemoteSync = pendencias.isNotEmpty() &&
            connectivityMonitor.isCurrentlyOnline() &&
            config.isConfigured()
        val message = when {
            pendencias.isEmpty() -> "Sem alteracoes locais pendentes."
            !connectivityMonitor.isCurrentlyOnline() -> "Sem internet. As alteracoes continuam no aparelho."
            !config.isConfigured() -> "Configure SUPABASE_URL e SUPABASE_ANON_KEY para sincronizar com a mesma base do web."
            else -> "Conector remoto preparado para Supabase. Politica ativa: ultima alteracao vence por updatedAt. Ultima tentativa: $reason."
        }

        if (canAttemptRemoteSync) {
            pendencias.forEach { repository.registrarTentativaSync(it, now) }
        }
        _state.value = SyncRuntimeState(
            backendConfigured = config.isConfigured(),
            lastAttemptAt = now,
            lastMessage = message,
            policyLabel = LastWriteWinsPolicy.description
        )
        return _state.value
    }
}
