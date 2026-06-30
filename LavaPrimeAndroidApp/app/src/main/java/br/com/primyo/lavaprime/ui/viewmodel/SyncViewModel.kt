package br.com.primyo.lavaprime.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import br.com.primyo.lavaprime.data.model.AuditLogEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.sync.ConnectivityMonitor
import br.com.primyo.lavaprime.sync.LastWriteWinsPolicy
import br.com.primyo.lavaprime.sync.SyncCoordinator
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class SyncUiState(
    val online: Boolean = false,
    val pendingCount: Int = 0,
    val backendConfigured: Boolean = false,
    val lastAttemptAt: Long? = null,
    val lastMessage: String = "Aguardando primeira sincronização.",
    val policyLabel: String = LastWriteWinsPolicy.description,
    val auditTrail: List<AuditLogEntity> = emptyList()
)

class SyncViewModel(
    private val repository: LavaPrimeRepository,
    private val connectivityMonitor: ConnectivityMonitor,
    private val syncCoordinator: SyncCoordinator
) : ViewModel() {
    val state: StateFlow<SyncUiState> = combine(
        repository.filaSync,
        repository.auditoriaRecente,
        connectivityMonitor.isOnline,
        syncCoordinator.state
    ) { fila, auditoria, online, runtime ->
        SyncUiState(
            online = online,
            pendingCount = fila.size,
            backendConfigured = runtime.backendConfigured,
            lastAttemptAt = runtime.lastAttemptAt,
            lastMessage = runtime.lastMessage,
            policyLabel = runtime.policyLabel,
            auditTrail = auditoria
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), SyncUiState())

    fun sincronizarAgora() {
        viewModelScope.launch {
            syncCoordinator.performSync("manual")
        }
    }
}
