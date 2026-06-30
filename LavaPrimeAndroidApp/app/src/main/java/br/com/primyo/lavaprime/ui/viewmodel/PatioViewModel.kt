package br.com.primyo.lavaprime.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import br.com.primyo.lavaprime.data.model.AtendimentoEntity
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class PatioUiState(
    val atendimentos: List<AtendimentoEntity> = emptyList(),
    val servicos: List<ServicoEntity> = emptyList(),
    val filtroStatus: AtendimentoStatus? = null,
    val somenteAlertas: Boolean = false
) {
    val listaFiltrada: List<AtendimentoEntity>
        get() = atendimentos
            .filter { filtroStatus == null || it.status == filtroStatus }
            .filter { !somenteAlertas || !it.observacoes.isNullOrBlank() }
}

class PatioViewModel(private val repository: LavaPrimeRepository) : ViewModel() {
    private val filtroStatus = MutableStateFlow<AtendimentoStatus?>(null)
    private val somenteAlertas = MutableStateFlow(false)

    val state: StateFlow<PatioUiState> = combine(
        repository.patio,
        repository.servicosAtivos,
        filtroStatus,
        somenteAlertas
    ) { atendimentos, servicos, filtro, alertas ->
        PatioUiState(
            atendimentos = atendimentos,
            servicos = servicos,
            filtroStatus = filtro,
            somenteAlertas = alertas
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), PatioUiState())

    fun selecionarFiltro(status: AtendimentoStatus?) {
        filtroStatus.value = status
    }

    fun alternarSomenteAlertas() {
        somenteAlertas.update { !it }
    }

    fun criarAtendimento(
        clienteNome: String,
        telefone: String,
        placa: String,
        veiculoResumo: String,
        alerta: String,
        servico: ServicoEntity,
        usuario: UsuarioEntity
    ) {
        viewModelScope.launch {
            repository.criarAtendimentoRapido(
                clienteNome = clienteNome,
                telefone = telefone,
                placa = placa,
                veiculoResumo = veiculoResumo,
                alerta = alerta,
                servico = servico,
                usuario = usuario
            )
        }
    }

    fun avancarStatus(item: AtendimentoEntity, usuario: UsuarioEntity) {
        val proximo = when (item.status) {
            AtendimentoStatus.AGENDADO -> AtendimentoStatus.PATIO
            AtendimentoStatus.PATIO -> AtendimentoStatus.EXECUCAO
            AtendimentoStatus.EXECUCAO -> AtendimentoStatus.FINALIZADO
            AtendimentoStatus.FINALIZADO -> null
            AtendimentoStatus.CANCELADO -> null
        } ?: return
        viewModelScope.launch {
            repository.atualizarStatusAtendimento(item.id, proximo, usuario)
        }
    }

    fun voltarStatus(item: AtendimentoEntity, usuario: UsuarioEntity) {
        val anterior = when (item.status) {
            AtendimentoStatus.AGENDADO -> null
            AtendimentoStatus.PATIO -> AtendimentoStatus.AGENDADO
            AtendimentoStatus.EXECUCAO -> AtendimentoStatus.PATIO
            AtendimentoStatus.FINALIZADO -> AtendimentoStatus.EXECUCAO
            AtendimentoStatus.CANCELADO -> null
        } ?: return
        viewModelScope.launch {
            repository.atualizarStatusAtendimento(item.id, anterior, usuario)
        }
    }
}
