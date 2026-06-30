package br.com.primyo.lavaprime.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.sync.ConnectivityMonitor
import br.com.primyo.lavaprime.sync.SyncCoordinator

class LavaPrimeViewModelFactory(
    private val repository: LavaPrimeRepository,
    private val connectivityMonitor: ConnectivityMonitor,
    private val syncCoordinator: SyncCoordinator
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {
            modelClass.isAssignableFrom(AuthViewModel::class.java) -> AuthViewModel(repository) as T
            modelClass.isAssignableFrom(PatioViewModel::class.java) -> PatioViewModel(repository) as T
            modelClass.isAssignableFrom(CadastroViewModel::class.java) -> CadastroViewModel(repository) as T
            modelClass.isAssignableFrom(SyncViewModel::class.java) -> SyncViewModel(repository, connectivityMonitor, syncCoordinator) as T
            else -> error("ViewModel nao suportado: ${modelClass.name}")
        }
    }
}
