package br.com.primyo.lavaprime

import android.app.Application
import br.com.primyo.lavaprime.data.local.LavaPrimeDatabase
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.sync.AndroidConnectivityMonitor
import br.com.primyo.lavaprime.sync.SyncCoordinator
import br.com.primyo.lavaprime.sync.SupabaseRuntimeConfig

class LavaPrimeApp : Application() {
    val database: LavaPrimeDatabase by lazy { LavaPrimeDatabase.getDatabase(this) }
    val repository: LavaPrimeRepository by lazy { LavaPrimeRepository(database) }
    val connectivityMonitor by lazy { AndroidConnectivityMonitor(this) }
    val supabaseConfig by lazy { SupabaseRuntimeConfig.fromBuildConfig() }
    val syncCoordinator by lazy { SyncCoordinator(repository, connectivityMonitor, supabaseConfig) }
}
