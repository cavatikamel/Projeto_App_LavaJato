package br.com.primyo.lavaprime.data.repository

import br.com.primyo.lavaprime.data.local.LavaPrimeDatabase
import br.com.primyo.lavaprime.data.model.AtendimentoEntity
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.AuditLogEntity
import br.com.primyo.lavaprime.data.model.ClienteEntity
import br.com.primyo.lavaprime.data.model.FormaPagamento
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.ProdutoEntity
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.SyncQueueEntity
import br.com.primyo.lavaprime.data.model.SyncStatus
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.model.VeiculoEntity
import kotlinx.coroutines.flow.Flow
import java.util.UUID

data class LocalBootstrapSnapshot(
    val localDbReady: Boolean,
    val seedApplied: Boolean
)

class LavaPrimeRepository(private val db: LavaPrimeDatabase) {
    val usuariosAtivos: Flow<List<UsuarioEntity>> = db.usuarioDao().listarAtivos()
    val patio: Flow<List<AtendimentoEntity>> = db.atendimentoDao().patio()
    val atendimentosRecentes: Flow<List<AtendimentoEntity>> = db.atendimentoDao().ultimos()
    val servicosAtivos: Flow<List<ServicoEntity>> = db.servicoDao().listarAtivos()
    val clientes: Flow<List<ClienteEntity>> = db.clienteDao().listar()
    val veiculos: Flow<List<VeiculoEntity>> = db.veiculoDao().listarRecentes()
    val produtos: Flow<List<ProdutoEntity>> = db.produtoDao().listar()
    val filaSync: Flow<List<SyncQueueEntity>> = db.syncQueueDao().pendentes()
    val auditoriaRecente: Flow<List<AuditLogEntity>> = db.auditLogDao().recentes()

    suspend fun loginDemo(email: String, senha: String): UsuarioEntity? {
        val normalized = email.trim().lowercase()
        if (senha.length < 4) return null
        return when {
            normalized.contains("operador") -> UsuarioEntity(
                id = "user-operador-local",
                empresaId = "local-demo",
                nome = "Operador LavaPrime",
                email = normalized,
                perfil = PerfilUsuario.OPERADOR,
                ultimoLoginLocal = System.currentTimeMillis()
            )

            normalized.isNotBlank() -> UsuarioEntity(
                id = "user-admin-local",
                empresaId = "local-demo",
                nome = "Administrador LavaPrime",
                email = normalized,
                perfil = PerfilUsuario.ADMINISTRADOR,
                ultimoLoginLocal = System.currentTimeMillis()
            )

            else -> null
        }?.also { db.usuarioDao().salvar(it) }
    }

    suspend fun prepararBancoLocal(): LocalBootstrapSnapshot {
        val baseJaExistia = db.servicoDao().obter("srv-lavagem-simples") != null
        if (!baseJaExistia) {
            seedInicial()
        }
        val pronto = db.servicoDao().obter("srv-lavagem-simples") != null
        return LocalBootstrapSnapshot(
            localDbReady = pronto,
            seedApplied = !baseJaExistia && pronto
        )
    }

    suspend fun restaurarUsuarioSessao(userId: String?, email: String?): UsuarioEntity? {
        val existente = userId
            ?.takeIf { it.isNotBlank() }
            ?.let { db.usuarioDao().porId(it) }
            ?: email
                ?.trim()
                ?.lowercase()
                ?.takeIf { it.isNotBlank() }
                ?.let { db.usuarioDao().porEmail(it) }

        if (existente == null) return null

        val atualizado = existente.copy(
            ultimoLoginLocal = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis()
        )
        db.usuarioDao().salvar(atualizado)
        return atualizado
    }

    suspend fun seedInicial() {
        if (db.servicoDao().obter("srv-lavagem-simples") != null) return

        db.servicoDao().salvar(
            ServicoEntity(
                "srv-lavagem-simples",
                nome = "Lavagem simples",
                precoBaseCentavos = 3500,
                tempoEstimadoMin = 30
            )
        )
        db.servicoDao().salvar(
            ServicoEntity(
                "srv-lavagem-premium",
                nome = "Lavagem premium",
                precoBaseCentavos = 6500,
                tempoEstimadoMin = 55
            )
        )
        db.servicoDao().salvar(
            ServicoEntity(
                "srv-descontaminacao",
                nome = "Descontaminação técnica",
                categoria = "Estética",
                precoBaseCentavos = 18000,
                tempoEstimadoMin = 120,
                usaProdutoAcido = true,
                phEstimado = 3.5
            )
        )
        db.produtoDao().salvar(
            ProdutoEntity(
                "prd-shampoo-neutro",
                nome = "Shampoo neutro",
                tipo = "Insumo",
                estoqueAtual = 8.0,
                estoqueMinimo = 2.0,
                unidade = "L"
            )
        )
        db.produtoDao().salvar(
            ProdutoEntity(
                "prd-limpa-rodas",
                nome = "Limpa rodas ácido",
                tipo = "Insumo",
                estoqueAtual = 1.0,
                estoqueMinimo = 2.0,
                unidade = "L"
            )
        )

        val cliente = ClienteEntity("cli-demo", nome = "Cliente exemplo", telefone = "(27) 99999-0000")
        db.clienteDao().salvar(cliente)
        val veiculo = VeiculoEntity(
            id = "vei-demo",
            clienteId = cliente.id,
            placa = "ABC1D23",
            marca = "Toyota",
            modelo = "Corolla",
            cor = "Prata",
            alertaEspecial = "Veículo vitrificado: usar produto neutro. Evitar ácidos e alcalinos fortes.",
            restringirProdutosAcidos = true,
            restringirProdutosAlcalinos = true,
            phMinimoRecomendado = 6.0,
            phMaximoRecomendado = 8.0
        )
        db.veiculoDao().salvar(veiculo)
        db.atendimentoDao().salvar(
            AtendimentoEntity(
                id = "atd-demo",
                clienteId = cliente.id,
                clienteNomeSnapshot = cliente.nome,
                veiculoId = veiculo.id,
                placaSnapshot = veiculo.placa,
                servicoId = "srv-lavagem-premium",
                servicoNomeSnapshot = "Lavagem premium",
                status = AtendimentoStatus.EXECUCAO,
                valorCentavos = 6500,
                operadorNomeSnapshot = "Operador LavaPrime",
                alertaConfirmado = true
            )
        )
    }

    suspend fun criarAtendimentoRapido(
        clienteNome: String,
        telefone: String,
        placa: String,
        veiculoResumo: String,
        alerta: String,
        servico: ServicoEntity,
        usuario: UsuarioEntity
    ) {
        val agora = System.currentTimeMillis()
        val cliente = ClienteEntity(
            id = UUID.randomUUID().toString(),
            nome = clienteNome.ifBlank { "Cliente sem nome" },
            telefone = telefone.ifBlank { null },
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        val veiculo = VeiculoEntity(
            id = UUID.randomUUID().toString(),
            clienteId = cliente.id,
            placa = placa.uppercase().ifBlank { "SEMPLACA" },
            modelo = veiculoResumo.ifBlank { null },
            alertaEspecial = alerta.ifBlank { null },
            restringirProdutosAcidos = alerta.contains("vitr", ignoreCase = true) || alerta.contains("acid", ignoreCase = true),
            restringirProdutosAlcalinos = alerta.contains("vitr", ignoreCase = true) || alerta.contains("alcal", ignoreCase = true),
            phMinimoRecomendado = if (alerta.isBlank()) null else 6.0,
            phMaximoRecomendado = if (alerta.isBlank()) null else 8.0,
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        val atendimento = AtendimentoEntity(
            id = UUID.randomUUID().toString(),
            clienteId = cliente.id,
            clienteNomeSnapshot = cliente.nome,
            veiculoId = veiculo.id,
            placaSnapshot = veiculo.placa,
            servicoId = servico.id,
            servicoNomeSnapshot = servico.nome,
            status = AtendimentoStatus.PATIO,
            valorCentavos = servico.precoBaseCentavos,
            operadorId = usuario.id,
            operadorNomeSnapshot = usuario.nome,
            observacoes = alerta.takeIf { it.isNotBlank() },
            alertaConfirmado = alerta.isNotBlank(),
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        db.clienteDao().salvar(cliente)
        db.veiculoDao().salvar(veiculo)
        db.atendimentoDao().salvar(atendimento)
        registrarMudanca("clients", cliente.id, "upsert", "Cliente ${cliente.nome}", usuario)
        registrarMudanca("vehicles", veiculo.id, "upsert", "Veículo ${veiculo.placa}", usuario)
        registrarMudanca("attendances", atendimento.id, "insert", "Atendimento ${atendimento.placaSnapshot}", usuario)
    }

    suspend fun cadastrarClienteVeiculo(
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
        val agora = System.currentTimeMillis()
        val cliente = ClienteEntity(
            id = UUID.randomUUID().toString(),
            nome = clienteNome.ifBlank { "Cliente sem nome" },
            telefone = telefone.ifBlank { null },
            documento = documento.ifBlank { null },
            observacoes = observacoes.ifBlank { null },
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        val veiculo = VeiculoEntity(
            id = UUID.randomUUID().toString(),
            clienteId = cliente.id,
            placa = placa.uppercase().ifBlank { "SEMPLACA" },
            modelo = marcaModelo.ifBlank { null },
            cor = cor.ifBlank { null },
            alertaEspecial = alertaEspecial.ifBlank { null },
            restringirProdutosAcidos = alertaEspecial.contains("vitr", ignoreCase = true) || alertaEspecial.contains("acid", ignoreCase = true),
            restringirProdutosAlcalinos = alertaEspecial.contains("vitr", ignoreCase = true) || alertaEspecial.contains("alcal", ignoreCase = true),
            phMinimoRecomendado = if (alertaEspecial.isBlank()) null else 6.0,
            phMaximoRecomendado = if (alertaEspecial.isBlank()) null else 8.0,
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        db.clienteDao().salvar(cliente)
        db.veiculoDao().salvar(veiculo)
        registrarMudanca("clients", cliente.id, "insert", "Cliente ${cliente.nome}", usuario)
        registrarMudanca("vehicles", veiculo.id, "insert", "Veículo ${veiculo.placa}", usuario)
    }

    suspend fun atualizarStatusAtendimento(
        atendimentoId: String,
        novoStatus: AtendimentoStatus,
        usuario: UsuarioEntity,
        formaPagamento: FormaPagamento? = null
    ) {
        val atual = db.atendimentoDao().obter(atendimentoId) ?: return
        val agora = System.currentTimeMillis()
        val atualizado = atual.copy(
            status = novoStatus,
            formaPagamento = formaPagamento ?: atual.formaPagamento,
            finalizadoEm = if (novoStatus == AtendimentoStatus.FINALIZADO) agora else atual.finalizadoEm,
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        db.atendimentoDao().salvar(atualizado)
        registrarMudanca(
            entidade = "attendances",
            entidadeId = atualizado.id,
            operacao = "status",
            payloadResumo = "${atual.status.name} -> ${novoStatus.name}",
            usuario = usuario
        )
    }

    suspend fun listarPendenciasSyncSnapshot(): List<SyncQueueEntity> {
        return db.syncQueueDao().pendentesSnapshot()
    }

    suspend fun registrarTentativaSync(item: SyncQueueEntity, instante: Long = System.currentTimeMillis()) {
        db.syncQueueDao().registrarTentativa(item.id, item.tentativas + 1, instante)
    }

    suspend fun removerPendenciasSync(ids: List<String>) {
        if (ids.isNotEmpty()) {
            db.syncQueueDao().remover(ids)
        }
    }

    private suspend fun registrarMudanca(
        entidade: String,
        entidadeId: String,
        operacao: String,
        payloadResumo: String,
        usuario: UsuarioEntity
    ) {
        val agora = System.currentTimeMillis()
        db.auditLogDao().salvar(
            AuditLogEntity(
                id = UUID.randomUUID().toString(),
                empresaId = usuario.empresaId,
                usuarioId = usuario.id,
                acao = operacao,
                entidade = entidade,
                entidadeId = entidadeId,
                detalhe = payloadResumo,
                criadoEm = agora,
                syncStatus = SyncStatus.PENDING_SYNC
            )
        )
        db.syncQueueDao().salvar(
            SyncQueueEntity(
                id = UUID.randomUUID().toString(),
                empresaId = usuario.empresaId,
                entidade = entidade,
                entidadeId = entidadeId,
                operacao = operacao,
                payloadResumo = payloadResumo,
                criadoEm = agora
            )
        )
    }
}
