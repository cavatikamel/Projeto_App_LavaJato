package br.com.primyo.lavaprime.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.navigation.AppStage
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class AuthUiState(
    val stage: AppStage = AppStage.SPLASH,
    val usuario: UsuarioEntity? = null,
    val perfilSelecionado: PerfilUsuario = PerfilUsuario.ADMINISTRADOR,
    val email: String = "admin@lavaprime.local",
    val senha: String = "1234",
    val erro: String? = null
)

class AuthViewModel(private val repository: LavaPrimeRepository) : ViewModel() {
    private val _state = MutableStateFlow(AuthUiState())
    val state: StateFlow<AuthUiState> = _state.asStateFlow()

    init {
        viewModelScope.launch {
            repository.seedInicial()
            delay(750)
            _state.update { it.copy(stage = AppStage.INICIAL) }
        }
    }

    fun abrirLogin() {
        _state.update { it.copy(stage = AppStage.LOGIN, erro = null) }
    }

    fun voltarParaInicial() {
        _state.update { it.copy(stage = AppStage.INICIAL, erro = null) }
    }

    fun selecionarPerfil(perfil: PerfilUsuario) {
        _state.update {
            it.copy(
                perfilSelecionado = perfil,
                email = if (perfil == PerfilUsuario.OPERADOR) "operador@lavaprime.local" else "admin@lavaprime.local",
                erro = null
            )
        }
    }

    fun atualizarEmail(value: String) {
        _state.update { it.copy(email = value, erro = null) }
    }

    fun atualizarSenha(value: String) {
        _state.update { it.copy(senha = value, erro = null) }
    }

    fun fazerLogin() {
        val snapshot = _state.value
        viewModelScope.launch {
            val email = if (snapshot.perfilSelecionado == PerfilUsuario.OPERADOR) {
                "operador@lavaprime.local"
            } else {
                snapshot.email
            }
            val usuario = repository.loginDemo(email, snapshot.senha)
            if (usuario != null) {
                _state.update { it.copy(usuario = usuario, stage = AppStage.APP, erro = null) }
            } else {
                _state.update { it.copy(erro = "Informe email e senha com pelo menos 4 caracteres.") }
            }
        }
    }

    fun logout() {
        _state.update {
            it.copy(
                stage = AppStage.LOGIN,
                usuario = null,
                erro = null,
                senha = "1234"
            )
        }
    }
}
