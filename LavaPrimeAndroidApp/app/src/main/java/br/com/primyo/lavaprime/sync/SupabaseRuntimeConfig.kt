package br.com.primyo.lavaprime.sync

import br.com.primyo.lavaprime.BuildConfig

data class SupabaseRuntimeConfig(
    val url: String,
    val anonKey: String,
    val organizationId: String
) {
    fun isConfigured(): Boolean = url.isNotBlank() && anonKey.isNotBlank()

    companion object {
        fun fromBuildConfig(): SupabaseRuntimeConfig {
            return SupabaseRuntimeConfig(
                url = BuildConfig.SUPABASE_URL,
                anonKey = BuildConfig.SUPABASE_ANON_KEY,
                organizationId = BuildConfig.SUPABASE_ORGANIZATION_ID
            )
        }
    }
}
