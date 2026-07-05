package br.com.primyo.lavaprime.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

enum class PerfilUsuario { ADMINISTRADOR, OPERADOR }
enum class AtendimentoStatus { AGENDADO, PATIO, EXECUCAO, FINALIZADO, CANCELADO }
enum class SyncStatus { LOCAL_ONLY, PENDING_SYNC, SYNCED, CONFLICT }
enum class FormaPagamento { PIX, DINHEIRO, DEBITO, CREDITO, BOLETO, Faturado, CORTESIA }

@Entity(tableName = "usuarios")
data class UsuarioEntity(
    @PrimaryKey val id: String,
    val empresaId: String,
    val nome: String,
    val email: String,
    val perfil: PerfilUsuario,
    val ativo: Boolean = true,
    val ultimoLoginLocal: Long? = null,
    val syncStatus: SyncStatus = SyncStatus.PENDING_SYNC,
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "clientes")
data class ClienteEntity(
    @PrimaryKey val id: String,
    val empresaId: String = "local-demo",
    val personType: String = "PF",
    val billing: Boolean = false,
    val nome: String,
    val legalName: String? = null,
    val telefone: String? = null,
    val documento: String? = null,
    val address: String? = null,
    val email: String? = null,
    val responsible: String? = null,
    val approver: String? = null,
    val billingApproved: Boolean = false,
    val billingCycle: String? = null,
    val allowMultipleOpenInvoices: Boolean = false,
    val observacoes: String? = null,
    val syncStatus: SyncStatus = SyncStatus.PENDING_SYNC,
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "veiculos")
data class VeiculoEntity(
    @PrimaryKey val id: String,
    val empresaId: String = "local-demo",
    val clienteId: String,
    val placa: String,
    val marca: String? = null,
    val modelo: String? = null,
    val ano: String? = null,
    val cor: String? = null,
    val tipo: String = "Carro",
    val categoria: String? = null,
    val combustivel: String? = null,
    val observacoes: String? = null,
    val alertaEspecial: String? = null,
    val restringirProdutosAcidos: Boolean = false,
    val restringirProdutosAlcalinos: Boolean = false,
    val phMinimoRecomendado: Double? = null,
    val phMaximoRecomendado: Double? = null,
    val syncStatus: SyncStatus = SyncStatus.PENDING_SYNC,
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "servicos")
data class ServicoEntity(
    @PrimaryKey val id: String,
    val empresaId: String = "local-demo",
    val nome: String,
    val categoria: String = "Lavagem",
    val descricao: String? = null,
    val precoBaseCentavos: Long,
    val tempoEstimadoMin: Int = 30,
    val tipoVeiculo: String = "Carro",
    val categoriaVeiculo: String? = "Hatch",
    val statusCatalogo: String = "Ativo",
    val fichaTecnicaAtiva: Boolean = false,
    val custoFichaTecnicaCentavos: Long = 0,
    val requerManutencao: Boolean = false,
    val intervaloManutencao: String? = null,
    val dataManutencao: String? = null,
    val usaProdutoAcido: Boolean = false,
    val usaProdutoAlcalino: Boolean = false,
    val phEstimado: Double? = null,
    val ativo: Boolean = true,
    val syncStatus: SyncStatus = SyncStatus.PENDING_SYNC,
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "produtos")
data class ProdutoEntity(
    @PrimaryKey val id: String,
    val empresaId: String = "local-demo",
    val nome: String,
    val sku: String = "",
    val tipo: String,
    val estoqueAtual: Double = 0.0,
    val estoqueMinimo: Double = 0.0,
    val unidade: String = "un",
    val custoCentavos: Long = 0,
    val precoVendaCentavos: Long = 0,
    val observacoes: String? = null,
    val ativo: Boolean = true,
    val syncStatus: SyncStatus = SyncStatus.PENDING_SYNC,
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "atendimentos")
data class AtendimentoEntity(
    @PrimaryKey val id: String,
    val empresaId: String = "local-demo",
    val clienteId: String,
    val clienteNomeSnapshot: String,
    val telefoneSnapshot: String? = null,
    val veiculoId: String,
    val placaSnapshot: String,
    val veiculoResumoSnapshot: String? = null,
    val corSnapshot: String? = null,
    val tipoVeiculoSnapshot: String? = null,
    val categoriaVeiculoSnapshot: String? = null,
    val servicoId: String,
    val servicoNomeSnapshot: String,
    val servicosRelacionadosSnapshot: String? = null,
    val status: AtendimentoStatus,
    val valorCentavos: Long,
    val formaPagamento: FormaPagamento? = null,
    val pagoNaEntrada: Boolean = false,
    val agendadoParaData: String? = null,
    val agendadoParaHora: String? = null,
    val operadorId: String? = null,
    val operadorNomeSnapshot: String? = null,
    val observacoes: String? = null,
    val alertaConfirmado: Boolean = false,
    val criadoEm: Long = System.currentTimeMillis(),
    val finalizadoEm: Long? = null,
    val syncStatus: SyncStatus = SyncStatus.PENDING_SYNC,
    val updatedAt: Long = System.currentTimeMillis()
)

@Entity(tableName = "audit_logs")
data class AuditLogEntity(
    @PrimaryKey val id: String,
    val empresaId: String = "local-demo",
    val usuarioId: String,
    val acao: String,
    val entidade: String,
    val entidadeId: String,
    val detalhe: String? = null,
    val criadoEm: Long = System.currentTimeMillis(),
    val syncStatus: SyncStatus = SyncStatus.PENDING_SYNC
)

@Entity(tableName = "sync_queue")
data class SyncQueueEntity(
    @PrimaryKey val id: String,
    val empresaId: String = "local-demo",
    val entidade: String,
    val entidadeId: String,
    val operacao: String,
    val payloadResumo: String? = null,
    val tentativas: Int = 0,
    val criadoEm: Long = System.currentTimeMillis(),
    val ultimaTentativaEm: Long? = null
)
