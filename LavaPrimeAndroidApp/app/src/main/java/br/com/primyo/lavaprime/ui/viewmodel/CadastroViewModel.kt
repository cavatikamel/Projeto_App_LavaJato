package br.com.primyo.lavaprime.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import br.com.primyo.lavaprime.data.model.ClienteEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.model.VeiculoEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class CadastroUiState(
    val busca: String = "",
    val clientes: List<ClienteEntity> = emptyList(),
    val veiculos: List<VeiculoEntity> = emptyList()
) {
    private val termoNormalizado = busca.trim().lowercase()

    val clientesFiltrados: List<ClienteEntity>
        get() = if (termoNormalizado.isBlank()) {
            clientes
        } else {
            clientes.filter {
                it.nome.lowercase().contains(termoNormalizado) ||
                    (it.telefone ?: "").lowercase().contains(termoNormalizado)
            }
        }

    val veiculosFiltrados: List<VeiculoEntity>
        get() = if (termoNormalizado.isBlank()) {
            veiculos
        } else {
            veiculos.filter {
                it.placa.lowercase().contains(termoNormalizado) ||
                    (it.modelo ?: "").lowercase().contains(termoNormalizado) ||
                    (it.cor ?: "").lowercase().contains(termoNormalizado)
            }
        }
}

class CadastroViewModel(private val repository: LavaPrimeRepository) : ViewModel() {
    private val busca = MutableStateFlow("")

    val state: StateFlow<CadastroUiState> = combine(
        repository.clientes,
        repository.veiculos,
        busca
    ) { clientes, veiculos, termo ->
        CadastroUiState(busca = termo, clientes = clientes, veiculos = veiculos)
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), CadastroUiState())

    fun atualizarBusca(value: String) {
        busca.value = value
    }

    fun cadastrar(
        clienteNome: String,
        telefone: String,
        documento: String,
        observacoes: String,
        placa: String,
        marcaModelo: String,
        cor: String,
        alertaEspecial: String,
        usuario: UsuarioEntity
    ) {
        viewModelScope.launch {
            repository.cadastrarClienteVeiculo(
                clienteNome = clienteNome,
                telefone = telefone,
                documento = documento,
                observacoes = observacoes,
                placa = placa,
                marcaModelo = marcaModelo,
                cor = cor,
                alertaEspecial = alertaEspecial,
                usuario = usuario
            )
        }
    }

    fun salvarClienteCompleto(
        clienteId: String?,
        personType: String,
        billing: Boolean,
        nome: String,
        legalName: String,
        telefone: String,
        documento: String,
        address: String,
        email: String,
        responsible: String,
        billingApproved: Boolean,
        billingCycle: String,
        allowMultipleOpenInvoices: Boolean,
        observacoes: String,
        placas: List<String>,
        usuario: UsuarioEntity
    ) {
        viewModelScope.launch {
            repository.salvarClienteCompleto(
                clienteId = clienteId,
                personType = personType,
                billing = billing,
                nome = nome,
                legalName = legalName,
                telefone = telefone,
                documento = documento,
                address = address,
                email = email,
                responsible = responsible,
                billingApproved = billingApproved,
                billingCycle = billingCycle,
                allowMultipleOpenInvoices = allowMultipleOpenInvoices,
                observacoes = observacoes,
                placas = placas,
                usuario = usuario
            )
        }
    }
}
