package br.com.primyo.lavaprime.sync

object LastWriteWinsPolicy {
    const val policyName = "last_write_wins"
    const val description = "Ultima alteracao vence usando o campo updatedAt."

    fun chooseLocalVersion(localUpdatedAt: Long, remoteUpdatedAt: Long): Boolean {
        return localUpdatedAt >= remoteUpdatedAt
    }
}
