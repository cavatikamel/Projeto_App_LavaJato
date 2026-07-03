package br.com.primyo.lavaprime.data.local

import android.content.Context
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.UsuarioEntity

data class LocalSessionSnapshot(
    val userId: String,
    val email: String?,
    val perfil: PerfilUsuario?
)

class LocalSessionStore(context: Context) {
    private val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    fun readSession(): LocalSessionSnapshot? {
        val userId = prefs.getString(KEY_USER_ID, null)?.takeIf { it.isNotBlank() } ?: return null
        val email = prefs.getString(KEY_EMAIL, null)?.takeIf { it.isNotBlank() }
        val perfil = prefs.getString(KEY_PROFILE, null)
            ?.let { raw -> runCatching { PerfilUsuario.valueOf(raw) }.getOrNull() }
        return LocalSessionSnapshot(
            userId = userId,
            email = email,
            perfil = perfil
        )
    }

    fun saveSession(usuario: UsuarioEntity) {
        prefs.edit()
            .putString(KEY_USER_ID, usuario.id)
            .putString(KEY_EMAIL, usuario.email)
            .putString(KEY_PROFILE, usuario.perfil.name)
            .apply()
    }

    fun clear() {
        prefs.edit().clear().apply()
    }

    companion object {
        private const val PREFS_NAME = "lavaprime_local_session"
        private const val KEY_USER_ID = "user_id"
        private const val KEY_EMAIL = "email"
        private const val KEY_PROFILE = "profile"
    }
}
