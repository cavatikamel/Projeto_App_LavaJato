package br.com.primyo.lavaprime

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import br.com.primyo.lavaprime.ui.screens.LavaPrimeRoot
import br.com.primyo.lavaprime.ui.theme.LavaPrimeTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val app = application as LavaPrimeApp
        setContent {
            LavaPrimeTheme {
                LavaPrimeRoot(
                    repository = app.repository,
                    connectivityMonitor = app.connectivityMonitor,
                    syncCoordinator = app.syncCoordinator
                )
            }
        }
    }
}
