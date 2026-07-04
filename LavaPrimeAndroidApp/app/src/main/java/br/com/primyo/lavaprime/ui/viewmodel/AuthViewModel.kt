package br.com.primyo.lavaprime.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import br.com.primyo.lavaprime.data.local.LocalSessionStore
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.navigation.AppStage
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

enum class BootstrapStepState {
    PENDING,
    READY,
    MISSING,
    FAILED
}

data class AuthUiState(
    val stage: AppStage = AppStage.SPLASH,
    val usuario: UsuarioEntity? = null,
    val perfilSelecionado: PerfilUsuario = PerfilUsuario.ADMINISTRADOR,
    val email: String = "admin@lavaprime.local",
    val senha: String = "1234",
    val erro: String? = null,
    val splashTitle: String = "Abrindo LavaPrime",
    val splashMessage: String = "Carregando identidade visual, banco local e sessão deste aparelho.",
    val localDbState: BootstrapStepState = BootstrapStepState.PENDING,
    val localDbMessage: String = "Banco local em validação",
    val sessionState: BootstrapStepState = BootstrapStepState.PENDING,
    val sessionMessage: String = "Sessão local em validação",
    val routeState: BootstrapStepState = BootstrapStepState.PENDING,
    val routeMessage: String = "Definindo entrada inicial",
    val bootstrapSummary: String? = null,
    val bootstrapError: String? = null
)

class AuthViewModel(
    private val repository: LavaPrimeRepository,
    private val localSessionStore: LocalSessionStore
) : ViewModel() {
    private val _state = MutableStateFlow(AuthUiState())
    val state: StateFlow<AuthUiState> = _state.asStateFlow()

    private var bootstrapJob: Job? = null

    init {
        iniciarBootstrap()
    }

    fun iniciarBootstrap() {
        bootstrapJob?.cancel()
        bootstrapJob = viewModelScope.launch {
            val inicio = System.currentTimeMillis()
            _state.value = AuthUiState()

            try {
                _state.update {
                    it.copy(
                        splashTitle = "Abrindo LavaPrime",
                        splashMessage = "Validando a estrutura local antes de exibir a autenticação.",
                        localDbState = BootstrapStepState.PENDING,
                        localDbMessage = "Banco local em validação",
                        sessionState = BootstrapStepState.PENDING,
                        sessionMessage = "Sessão local em espera",
                        routeState = BootstrapStepState.PENDING,
                        routeMessage = "Entrada inicial em definição",
                        bootstrapError = null,
                        bootstrapSummary = null
                    )
                }

                val dbSnapshot = repository.prepararBancoLocal()
                _state.update {
                    it.copy(
                        splashTitle = "Abrindo LavaPrime",
                        splashMessage = "Banco local pronto. Agora vamos verificar a sessão salva neste aparelho.",
                        localDbState = if (dbSnapshot.localDbReady) BootstrapStepState.READY else BootstrapStepState.FAILED,
                        localDbMessage = if (dbSnapshot.localDbReady) {
                            if (dbSnapshot.seedApplied) "Banco local preparado para o primeiro uso"
                            else "Banco local validado com sucesso"
                        } else {
                            "Banco local indisponível"
                        }
                    )
                }

                if (!dbSnapshot.localDbReady) {
                    throw IllegalStateException("Não foi possível validar o banco local do app.")
                }

                val sessaoSalva = localSessionStore.readSession()
                val usuarioRestaurado = sessaoSalva?.let {
                    repository.restaurarUsuarioSessao(it.userId, it.email)
                }

                if (sessaoSalva != null && usuarioRestaurado == null) {
                    localSessionStore.clear()
                }

                _state.update {
                    it.copy(
                        splashTitle = "Abrindo LavaPrime",
                        splashMessage = "Sessão local verificada. Preparando a tela de autenticação.",
                        sessionState = when {
                            usuarioRestaurado != null -> BootstrapStepState.READY
                            sessaoSalva != null -> BootstrapStepState.FAILED
                            else -> BootstrapStepState.MISSING
                        },
                        sessionMessage = when {
                            usuarioRestaurado != null -> "Sessão local restaurada para ${usuarioRestaurado.nome}"
                            sessaoSalva != null -> "Sessão local inválida. Novo login necessário"
                            else -> "Nenhuma sessão salva neste aparelho"
                        },
                        routeState = BootstrapStepState.PENDING,
                        routeMessage = "Calculando destino inicial"
                    )
                }

                val restante = MIN_SPLASH_MS - (System.currentTimeMillis() - inicio)
                if (restante > 0) {
                    delay(restante)
                }

                _state.update {
                    it.copy(
                        usuario = null,
                        perfilSelecionado = usuarioRestaurado?.perfil ?: it.perfilSelecionado,
                        email = usuarioRestaurado?.email ?: it.email,
                        stage = AppStage.LOGIN,
                        routeState = BootstrapStepState.READY,
                        routeMessage = "Autenticação definida como entrada inicial",
                        bootstrapSummary = when {
                            usuarioRestaurado != null -> "Sessão local encontrada para ${usuarioRestaurado.nome}. Confirme o acesso para continuar."
                            dbSnapshot.seedApplied -> "Banco local preparado e pronto para autenticação."
                            else -> "Banco local validado. Faça login para continuar."
                        },
                        bootstrapError = null,
                        erro = null
                    )
                }
            } catch (error: Throwable) {
                _state.update {
                    it.copy(
                        stage = AppStage.LOGIN,
                        splashTitle = "Falha ao iniciar",
                        splashMessage = "Não foi possível preparar a abertura do app.",
                        localDbState = BootstrapStepState.FAILED,
                        localDbMessage = "Banco local não validado",
                        sessionState = BootstrapStepState.FAILED,
                        sessionMessage = "Sessão local não validada",
                        routeState = BootstrapStepState.READY,
                        routeMessage = "Autenticação exibida com alerta técnico",
                        bootstrapSummary = "A autenticação foi aberta, mas a inicialização precisa de nova tentativa.",
                        bootstrapError = error.message ?: "Erro interno ao iniciar o app."
                    )
                }
            }
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
                localSessionStore.saveSession(usuario)
                _state.update {
                    it.copy(
                        usuario = usuario,
                        stage = AppStage.APP,
                        erro = null,
                        sessionState = BootstrapStepState.READY,
                        sessionMessage = "Sessão local salva neste aparelho",
                        routeState = BootstrapStepState.READY,
                        routeMessage = "Home liberada após login local",
                        bootstrapSummary = "Sessão local ativa para as próximas aberturas."
                    )
                }
            } else {
                _state.update { it.copy(erro = "Informe e-mail e senha com pelo menos 4 caracteres.") }
            }
        }
    }

    fun logout() {
        localSessionStore.clear()
        _state.update {
            it.copy(
                stage = AppStage.LOGIN,
                usuario = null,
                erro = null,
                senha = "1234",
                sessionState = BootstrapStepState.MISSING,
                sessionMessage = "Sessão encerrada neste aparelho",
                routeState = BootstrapStepState.READY,
                routeMessage = "Retorno ao login"
            )
        }
    }

    companion object {
        private const val MIN_SPLASH_MS = 1200L
    }
}
