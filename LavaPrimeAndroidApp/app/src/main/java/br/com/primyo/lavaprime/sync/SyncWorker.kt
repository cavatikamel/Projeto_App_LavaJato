package br.com.primyo.lavaprime.sync

import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import br.com.primyo.lavaprime.LavaPrimeApp

class SyncWorker(appContext: Context, params: WorkerParameters) : CoroutineWorker(appContext, params) {
    override suspend fun doWork(): Result {
        val app = applicationContext as LavaPrimeApp
        app.syncCoordinator.performSync("worker")
        return Result.success()
    }
}
