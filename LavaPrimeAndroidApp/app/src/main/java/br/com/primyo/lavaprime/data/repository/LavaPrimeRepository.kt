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
    val servicos: Flow<List<ServicoEntity>> = db.servicoDao().listarTodos()
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
                tipoVeiculo = "Carro",
                categoriaVeiculo = "Hatch",
                precoBaseCentavos = 3500,
                tempoEstimadoMin = 30
            )
        )
        db.servicoDao().salvar(
            ServicoEntity(
                "srv-lavagem-premium",
                nome = "Lavagem premium",
                tipoVeiculo = "Carro",
                categoriaVeiculo = "SUV",
                fichaTecnicaAtiva = true,
                custoFichaTecnicaCentavos = 1200,
                precoBaseCentavos = 6500,
                tempoEstimadoMin = 55
            )
        )
        db.servicoDao().salvar(
            ServicoEntity(
                "srv-descontaminacao",
                nome = "Descontaminação técnica",
                categoria = "Estética",
                tipoVeiculo = "Carro",
                categoriaVeiculo = "Sedan",
                fichaTecnicaAtiva = true,
                custoFichaTecnicaCentavos = 2800,
                precoBaseCentavos = 18000,
                tempoEstimadoMin = 120,
                usaProdutoAcido = true,
                phEstimado = 3.5
            )
        )
        db.produtoDao().salvar(
            ProdutoEntity(
                id = "prd-shampoo-neutro",
                nome = "Shampoo neutro",
                sku = "PRD-001",
                tipo = "Produto",
                estoqueAtual = 8.0,
                estoqueMinimo = 2.0,
                unidade = "L",
                custoCentavos = 1890,
                precoVendaCentavos = 2990,
                observacoes = "Produto de balcão."
            )
        )
        db.produtoDao().salvar(
            ProdutoEntity(
                id = "prd-limpa-rodas",
                nome = "Limpa rodas ácido",
                sku = "PRD-002",
                tipo = "Produto",
                estoqueAtual = 1.0,
                estoqueMinimo = 2.0,
                unidade = "L",
                custoCentavos = 2490,
                precoVendaCentavos = 3890,
                observacoes = "Produto de balcão."
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
            ano = "2024",
            cor = "Prata",
            tipo = "Carro",
            categoria = "Sedan",
            combustivel = "Flex",
            observacoes = "Cliente prefere checklist visual antes da entrega.",
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
                telefoneSnapshot = cliente.telefone,
                veiculoId = veiculo.id,
                placaSnapshot = veiculo.placa,
                veiculoResumoSnapshot = "${veiculo.marca} ${veiculo.modelo}",
                corSnapshot = veiculo.cor,
                tipoVeiculoSnapshot = veiculo.tipo,
                categoriaVeiculoSnapshot = veiculo.categoria,
                servicoId = "srv-lavagem-premium",
                servicoNomeSnapshot = "Lavagem premium",
                servicosRelacionadosSnapshot = "Lavagem premium",
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
        cor: String,
        tipoVeiculo: String,
        categoriaVeiculo: String,
        alerta: String,
        servicos: List<ServicoEntity>,
        formaPagamento: FormaPagamento?,
        pagoNaEntrada: Boolean,
        modoAgendamento: Boolean,
        agendadoParaData: String,
        agendadoParaHora: String,
        usuario: UsuarioEntity
    ) {
        val servicoPrincipal = servicos.firstOrNull() ?: return
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
            marca = veiculoResumo.substringBefore(' ').takeIf { it.isNotBlank() },
            modelo = veiculoResumo.ifBlank { null },
            cor = cor.ifBlank { null },
            tipo = tipoVeiculo.ifBlank { "Carro" },
            categoria = categoriaVeiculo.ifBlank { null },
            combustivel = "Flex",
            observacoes = alerta.ifBlank { null },
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
            telefoneSnapshot = cliente.telefone,
            veiculoId = veiculo.id,
            placaSnapshot = veiculo.placa,
            veiculoResumoSnapshot = veiculoResumo.ifBlank { null },
            corSnapshot = cor.ifBlank { null },
            tipoVeiculoSnapshot = veiculo.tipo,
            categoriaVeiculoSnapshot = veiculo.categoria,
            servicoId = servicoPrincipal.id,
            servicoNomeSnapshot = servicoPrincipal.nome,
            servicosRelacionadosSnapshot = servicos.joinToString(", ") { it.nome },
            status = if (modoAgendamento) AtendimentoStatus.AGENDADO else AtendimentoStatus.PATIO,
            valorCentavos = servicos.sumOf { it.precoBaseCentavos },
            formaPagamento = formaPagamento,
            pagoNaEntrada = pagoNaEntrada,
            agendadoParaData = agendadoParaData.ifBlank { null },
            agendadoParaHora = agendadoParaHora.ifBlank { null },
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
            tipo = "Carro",
            categoria = "Hatch",
            combustivel = "Flex",
            observacoes = alertaEspecial.ifBlank { null },
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

    suspend fun salvarClienteCompleto(
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
        val agora = System.currentTimeMillis()
        val normalizedClientId = clienteId ?: UUID.randomUUID().toString()
        val normalizedPersonType = if (personType == "PJ") "PJ" else "PF"
        val normalizedBillingApproved = billing && billingApproved
        val persisted = db.clienteDao().obter(normalizedClientId)
        val effectiveName = if (normalizedPersonType == "PJ") {
            legalName.ifBlank { nome.ifBlank { "Cliente sem nome" } }
        } else {
            nome.ifBlank { "Cliente sem nome" }
        }
        val cliente = ClienteEntity(
            id = normalizedClientId,
            empresaId = persisted?.empresaId ?: "local-demo",
            personType = normalizedPersonType,
            billing = billing,
            nome = effectiveName,
            legalName = legalName.trim().ifBlank { null },
            telefone = telefone.trim().ifBlank { null },
            documento = documento.trim().ifBlank { null },
            address = if (billing) address.trim().ifBlank { null } else null,
            email = if (billing) email.trim().ifBlank { null } else null,
            responsible = if (billing) responsible.trim().ifBlank { null } else null,
            approver = if (normalizedBillingApproved) usuario.nome else null,
            billingApproved = normalizedBillingApproved,
            billingCycle = if (normalizedBillingApproved) billingCycle.trim().ifBlank { null } else null,
            allowMultipleOpenInvoices = normalizedBillingApproved && allowMultipleOpenInvoices,
            observacoes = observacoes.trim().ifBlank { null },
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        db.clienteDao().salvar(cliente)

        val veiculosAtuais = db.veiculoDao().listarPorClienteSnapshot(normalizedClientId)
        val normalizedPlates = placas.map { it.uppercase().trim() }.filter { it.isNotBlank() }.distinct()
        normalizedPlates.forEach { placa ->
            val existente = db.veiculoDao().porPlaca(placa)
            val veiculo = if (existente != null) {
                existente.copy(
                    clienteId = normalizedClientId,
                    placa = placa,
                    syncStatus = SyncStatus.PENDING_SYNC,
                    updatedAt = agora
                )
            } else {
                VeiculoEntity(
                    id = UUID.randomUUID().toString(),
                    clienteId = normalizedClientId,
                    placa = placa,
                    tipo = "Carro",
                    categoria = "Hatch",
                    combustivel = "Flex",
                    syncStatus = SyncStatus.PENDING_SYNC,
                    updatedAt = agora
                )
            }
            db.veiculoDao().salvar(veiculo)
            registrarMudanca(
                entidade = "vehicles",
                entidadeId = veiculo.id,
                operacao = if (existente == null) "insert" else "upsert",
                payloadResumo = "Veículo ${veiculo.placa}",
                usuario = usuario
            )
        }

        veiculosAtuais
            .filter { atual -> atual.placa.uppercase() !in normalizedPlates }
            .forEach { veiculo ->
                db.veiculoDao().salvar(
                    veiculo.copy(
                        clienteId = "sem-cliente",
                        syncStatus = SyncStatus.PENDING_SYNC,
                        updatedAt = agora
                    )
                )
                registrarMudanca(
                    entidade = "vehicles",
                    entidadeId = veiculo.id,
                    operacao = "unlink",
                    payloadResumo = "Veículo ${veiculo.placa}",
                    usuario = usuario
                )
            }

        registrarMudanca(
            entidade = "clients",
            entidadeId = cliente.id,
            operacao = if (persisted == null) "insert" else "upsert",
            payloadResumo = "Cliente ${cliente.nome}",
            usuario = usuario
        )
    }

    suspend fun salvarVeiculoCompleto(
        veiculoId: String?,
        placa: String,
        marca: String,
        modelo: String,
        ano: String,
        cor: String,
        tipo: String,
        categoria: String,
        combustivel: String,
        clienteId: String,
        observacoes: String,
        usuario: UsuarioEntity
    ) {
        val agora = System.currentTimeMillis()
        val normalizedPlate = placa.uppercase().trim()
        val duplicate = db.veiculoDao().porPlaca(normalizedPlate)
        val persisted = veiculoId?.let { db.veiculoDao().obter(it) }
        val base = when {
            persisted != null -> persisted
            duplicate != null -> duplicate
            else -> null
        }
        val vehicle = VeiculoEntity(
            id = base?.id ?: UUID.randomUUID().toString(),
            empresaId = base?.empresaId ?: usuario.empresaId,
            clienteId = clienteId.ifBlank { "sem-cliente" },
            placa = normalizedPlate,
            marca = marca.trim().ifBlank { null },
            modelo = modelo.trim(),
            ano = ano.trim().ifBlank { null },
            cor = cor.trim().ifBlank { null },
            tipo = tipo,
            categoria = if (tipo.equals("Moto", ignoreCase = true)) null else categoria.trim().ifBlank { null },
            combustivel = combustivel.trim().ifBlank { null },
            observacoes = observacoes.trim().ifBlank { null },
            alertaEspecial = base?.alertaEspecial,
            restringirProdutosAcidos = base?.restringirProdutosAcidos ?: false,
            restringirProdutosAlcalinos = base?.restringirProdutosAlcalinos ?: false,
            phMinimoRecomendado = base?.phMinimoRecomendado,
            phMaximoRecomendado = base?.phMaximoRecomendado,
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        db.veiculoDao().salvar(vehicle)
        registrarMudanca(
            entidade = "vehicles",
            entidadeId = vehicle.id,
            operacao = if (base == null) "insert" else "upsert",
            payloadResumo = "Veículo ${vehicle.placa}",
            usuario = usuario
        )
    }

    suspend fun salvarServicoCompleto(
        servicoId: String?,
        nome: String,
        tipoVeiculo: String,
        categoriaVeiculo: String,
        precoBaseCentavos: Long,
        tempoEstimadoMin: Int,
        statusCatalogo: String,
        fichaTecnicaAtiva: Boolean,
        custoFichaTecnicaCentavos: Long,
        usaProdutoAcido: Boolean,
        usaProdutoAlcalino: Boolean,
        phEstimado: Double?,
        requerManutencao: Boolean,
        intervaloManutencao: String,
        dataManutencao: String,
        usuario: UsuarioEntity
    ) {
        val agora = System.currentTimeMillis()
        val normalizedName = nome.trim()
        val duplicate = db.servicoDao().porNome(normalizedName)
        val persisted = servicoId?.let { db.servicoDao().obter(it) }
        val base = when {
            persisted != null -> persisted
            duplicate != null -> duplicate
            else -> null
        }
        val normalizedType = tipoVeiculo.ifBlank { "Carro" }
        val normalizedVehicleCategory = if (normalizedType.equals("Moto", ignoreCase = true)) {
            null
        } else {
            categoriaVeiculo.trim().ifBlank { "Hatch" }
        }
        val normalizedStatus = if (statusCatalogo == "Inativo") "Inativo" else "Ativo"
        val service = ServicoEntity(
            id = base?.id ?: UUID.randomUUID().toString(),
            empresaId = base?.empresaId ?: usuario.empresaId,
            nome = normalizedName,
            categoria = base?.categoria ?: "Lavagem",
            descricao = base?.descricao,
            precoBaseCentavos = precoBaseCentavos,
            tempoEstimadoMin = tempoEstimadoMin,
            tipoVeiculo = normalizedType,
            categoriaVeiculo = normalizedVehicleCategory,
            statusCatalogo = normalizedStatus,
            fichaTecnicaAtiva = fichaTecnicaAtiva,
            custoFichaTecnicaCentavos = if (fichaTecnicaAtiva) custoFichaTecnicaCentavos else 0,
            requerManutencao = requerManutencao,
            intervaloManutencao = if (requerManutencao) intervaloManutencao.ifBlank { "monthly" } else null,
            dataManutencao = if (requerManutencao && intervaloManutencao == "custom") dataManutencao.ifBlank { null } else null,
            usaProdutoAcido = if (fichaTecnicaAtiva) usaProdutoAcido else false,
            usaProdutoAlcalino = if (fichaTecnicaAtiva) usaProdutoAlcalino else false,
            phEstimado = if (fichaTecnicaAtiva) phEstimado else null,
            ativo = normalizedStatus == "Ativo",
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        db.servicoDao().salvar(service)
        registrarMudanca(
            entidade = "services",
            entidadeId = service.id,
            operacao = if (base == null) "insert" else "upsert",
            payloadResumo = "Serviço ${service.nome}",
            usuario = usuario
        )
    }

    suspend fun salvarProdutoCompleto(
        produtoId: String?,
        nome: String,
        sku: String,
        unidade: String,
        estoqueAtual: Double,
        estoqueMinimo: Double,
        custoCentavos: Long,
        precoVendaCentavos: Long,
        observacoes: String,
        ativo: Boolean,
        usuario: UsuarioEntity
    ) {
        val agora = System.currentTimeMillis()
        val normalizedName = nome.trim()
        val normalizedSku = sku.trim()
        val duplicate = db.produtoDao().porSku(normalizedSku)
        val persisted = produtoId?.let { db.produtoDao().obter(it) }
        val base = when {
            persisted != null -> persisted
            duplicate != null -> duplicate
            else -> null
        }
        val produto = ProdutoEntity(
            id = base?.id ?: UUID.randomUUID().toString(),
            empresaId = base?.empresaId ?: usuario.empresaId,
            nome = normalizedName,
            sku = normalizedSku,
            tipo = base?.tipo ?: "Produto",
            estoqueAtual = estoqueAtual,
            estoqueMinimo = estoqueMinimo,
            unidade = unidade.ifBlank { "un" },
            custoCentavos = custoCentavos,
            precoVendaCentavos = precoVendaCentavos,
            observacoes = observacoes.trim().ifBlank { null },
            ativo = ativo,
            syncStatus = SyncStatus.PENDING_SYNC,
            updatedAt = agora
        )
        db.produtoDao().salvar(produto)
        registrarMudanca(
            entidade = "products",
            entidadeId = produto.id,
            operacao = if (base == null) "insert" else "upsert",
            payloadResumo = "Produto ${produto.nome}",
            usuario = usuario
        )
    }

    suspend fun ajustarEstoqueProduto(
        produtoId: String,
        quantidade: Double,
        tipoMovimento: String,
        usuario: UsuarioEntity
    ) {
        val produto = db.produtoDao().obter(produtoId) ?: return
        val sinal = if (tipoMovimento == "Ajuste de saída") -1 else 1
        val novoEstoque = (produto.estoqueAtual + quantidade * sinal).coerceAtLeast(0.0)
        db.produtoDao().salvar(
            produto.copy(
                estoqueAtual = novoEstoque,
                syncStatus = SyncStatus.PENDING_SYNC,
                updatedAt = System.currentTimeMillis()
            )
        )
        registrarMudanca(
            entidade = "products",
            entidadeId = produto.id,
            operacao = "stock-adjustment",
            payloadResumo = "Produto ${produto.nome}: ${produto.estoqueAtual} -> $novoEstoque",
            usuario = usuario
        )
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
