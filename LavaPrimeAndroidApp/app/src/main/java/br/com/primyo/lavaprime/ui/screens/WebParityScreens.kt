package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.Business
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Event
import androidx.compose.material.icons.filled.Forum
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.ManageAccounts
import androidx.compose.material.icons.filled.Payments
import androidx.compose.material.icons.filled.PointOfSale
import androidx.compose.material.icons.filled.ReceiptLong
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material.icons.filled.WorkspacePremium
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.model.ClienteEntity
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.ProdutoEntity
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.model.VeiculoEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.FormPreview
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.components.money
import br.com.primyo.lavaprime.ui.components.perfilLabel
import br.com.primyo.lavaprime.ui.viewmodel.PatioUiState
import br.com.primyo.lavaprime.ui.viewmodel.SyncUiState

private data class MirrorMetric(
    val label: String,
    val value: String,
    val icon: ImageVector,
    val support: String? = null,
    val tone: LavaPrimeStatusTone = LavaPrimeStatusTone.Info
)

private data class MirrorInsight(
    val title: String,
    val value: String,
    val detail: String
)

private data class MirrorField(
    val label: String,
    val value: String
)

@Composable
fun AgendamentosScreen(
    patioState: PatioUiState
) {
    val metrics = listOf(
        MirrorMetric("Na fila hoje", patioState.atendimentos.size.toString(), Icons.Filled.DirectionsCar, "Atendimentos em aberto"),
        MirrorMetric("Agendados", patioState.atendimentos.count { it.status.name == "AGENDADO" }.toString(), Icons.Filled.Event, "Entrada pronta para virar pátio"),
        MirrorMetric("Orçamentos pendentes", "0", Icons.Filled.ReceiptLong, "Base local ainda sem propostas persistidas"),
        MirrorMetric("Receita prevista", money(patioState.atendimentos.sumOf { it.valorCentavos }), Icons.Filled.AccountBalanceWallet, "Total dos atendimentos ativos", LavaPrimeStatusTone.Success)
    )
    val insights = listOf(
        MirrorInsight("Novo veículo no pátio", "Atalho mobile", "Na versão Android, a entrada rápida continua saindo do botão do pátio."),
        MirrorInsight("Ver orçamentos", "Tela dedicada", "A área de orçamentos já existe no menu para receber a paridade completa."),
        MirrorInsight("Acompanhar o pátio", "Leitura imediata", "A fila operacional continua sendo a principal referência do turno.")
    )

    WebMirrorCollectionScreen(
        title = "Agendamentos",
        description = "Espelho mobile da entrada operacional do Web, com foco em fila do dia e atalhos do turno.",
        icon = Icons.Filled.Event,
        metrics = metrics,
        searchPlaceholder = "Buscar cliente, placa ou serviço",
        filters = listOf("Todos", "Agendado", "No pátio", "Execução"),
        records = patioState.atendimentos,
        emptyTitle = "Nenhuma entrada programada",
        emptyDescription = "Os próximos atendimentos do dia aparecerão aqui.",
        queryProvider = { "${it.clienteNomeSnapshot} ${it.placaSnapshot} ${it.servicoNomeSnapshot}" },
        filterProvider = { item, filter ->
            when (filter) {
                "Agendado" -> item.status.name == "AGENDADO"
                "No pátio" -> item.status.name == "PATIO"
                "Execução" -> item.status.name == "EXECUCAO"
                else -> true
            }
        },
        sideTitle = "Base do turno",
        sideItems = insights
    ) { item ->
        MirrorRecordCard(
            title = item.clienteNomeSnapshot,
            subtitle = "${item.placaSnapshot} • ${item.servicoNomeSnapshot}",
            badges = listOf(
                item.status.name.replace("_", " ") to LavaPrimeStatusTone.Info,
                money(item.valorCentavos) to LavaPrimeStatusTone.Success
            ),
            fields = listOf(
                MirrorField("Operador", item.operadorNomeSnapshot ?: "Não definido"),
                MirrorField("Sync", item.syncStatus.name),
                MirrorField("Observação", item.observacoes ?: "Sem observação")
            )
        )
    }
}

@Composable
fun QuotesScreen() {
    WebMirrorCollectionScreen(
        title = "Orçamentos",
        description = "Espelho mobile da central de orçamentos do Web, preparado para propostas, validade e conversão em pátio.",
        icon = Icons.Filled.ReceiptLong,
        metrics = listOf(
            MirrorMetric("Orçamentos", "0", Icons.Filled.ReceiptLong, "Nenhuma proposta local ainda"),
            MirrorMetric("Pendentes", "0", Icons.Filled.Description, "Aguardando fundação funcional"),
            MirrorMetric("Aprovados", "0", Icons.Filled.WorkspacePremium, "Conversão futura para pátio"),
            MirrorMetric("Vencidos", "0", Icons.Filled.Event, "Controle por validade", LavaPrimeStatusTone.Warning)
        ),
        searchPlaceholder = "Buscar número, cliente ou veículo",
        filters = listOf("Todos", "Pendentes", "Aprovados", "Vencidos"),
        records = emptyList<String>(),
        emptyTitle = "Nenhum orçamento local",
        emptyDescription = "A estrutura visual já espelha o Web. A persistência de propostas entra na fase funcional correspondente.",
        queryProvider = { it },
        sideTitle = "Como esta tela deve funcionar",
        sideItems = listOf(
            MirrorInsight("Validade", "Obrigatória", "Toda proposta precisa mostrar prazo de aprovação."),
            MirrorInsight("Conversão", "Pátio", "O Web envia o orçamento aprovado para o pátio."),
            MirrorInsight("Itens", "Serviços e extras", "A composição deve preservar serviços principais e avulsos.")
        )
    ) { }
}

@Composable
fun ClientsMirrorScreen(repository: LavaPrimeRepository) {
    val clientes by repository.clientes.collectAsStateWithLifecycle(initialValue = emptyList())
    WebMirrorCollectionScreen(
        title = "Clientes",
        description = "Espelho mobile de Cadastros > Clientes do Web, com foco em relacionamento, documento e faturamento.",
        icon = Icons.Filled.Group,
        metrics = listOf(
            MirrorMetric("Clientes ativos", clientes.size.toString(), Icons.Filled.Group, "Base local disponível"),
            MirrorMetric("Com documento", clientes.count { !it.documento.isNullOrBlank() }.toString(), Icons.Filled.Description, "Prontos para cobrança formal"),
            MirrorMetric("Com telefone", clientes.count { !it.telefone.isNullOrBlank() }.toString(), Icons.Filled.Payments, "Contato rápido no mobile")
        ),
        searchPlaceholder = "Buscar cliente, documento ou telefone",
        filters = listOf("Todos", "Com documento", "Sem documento", "Com telefone"),
        records = clientes,
        emptyTitle = "Nenhum cliente cadastrado",
        emptyDescription = "Os clientes cadastrados no Android aparecerão aqui em formato adaptado ao mobile.",
        queryProvider = { "${it.nome} ${it.documento.orEmpty()} ${it.telefone.orEmpty()}" },
        filterProvider = { item, filter ->
            when (filter) {
                "Com documento" -> !item.documento.isNullOrBlank()
                "Sem documento" -> item.documento.isNullOrBlank()
                "Com telefone" -> !item.telefone.isNullOrBlank()
                else -> true
            }
        },
        sideTitle = "Regras do Web preservadas",
        sideItems = listOf(
            MirrorInsight("Documento", "Regra mista", "Cliente comum pode não ter documento. Cliente faturado exige documento."),
            MirrorInsight("Telefone", "Prioridade alta", "O número continua sendo chave de contato operacional."),
            MirrorInsight("Vínculo com veículo", "Obrigatório", "A relação com veículos continua sendo parte do fluxo real.")
        )
    ) { cliente ->
        MirrorRecordCard(
            title = cliente.nome,
            subtitle = cliente.telefone ?: "Telefone não informado",
            badges = listOf(
                (cliente.documento ?: "Sem documento") to if (cliente.documento.isNullOrBlank()) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
            ),
            fields = listOf(
                MirrorField("Empresa", cliente.empresaId),
                MirrorField("Observações", cliente.observacoes ?: "Sem observações")
            )
        )
    }
}

@Composable
fun VehiclesMirrorScreen(repository: LavaPrimeRepository) {
    val veiculos by repository.veiculos.collectAsStateWithLifecycle(initialValue = emptyList())
    WebMirrorCollectionScreen(
        title = "Veículos",
        description = "Espelho mobile de Cadastros > Veículos do Web, priorizando placa, modelo e alerta especial.",
        icon = Icons.Filled.DirectionsCar,
        metrics = listOf(
            MirrorMetric("Veículos", veiculos.size.toString(), Icons.Filled.DirectionsCar, "Base local recente"),
            MirrorMetric("Com alerta", veiculos.count { !it.alertaEspecial.isNullOrBlank() }.toString(), Icons.Filled.WorkspacePremium, "Cuidados especiais"),
            MirrorMetric("Com modelo", veiculos.count { !it.modelo.isNullOrBlank() }.toString(), Icons.Filled.Description, "Identificação mais completa")
        ),
        searchPlaceholder = "Buscar placa, modelo ou cor",
        filters = listOf("Todos", "Com alerta", "Sem alerta", "Com modelo"),
        records = veiculos,
        emptyTitle = "Nenhum veículo cadastrado",
        emptyDescription = "Os veículos vinculados aos clientes aparecem aqui com leitura rápida por placa.",
        queryProvider = { "${it.placa} ${it.modelo.orEmpty()} ${it.cor.orEmpty()}" },
        filterProvider = { item, filter ->
            when (filter) {
                "Com alerta" -> !item.alertaEspecial.isNullOrBlank()
                "Sem alerta" -> item.alertaEspecial.isNullOrBlank()
                "Com modelo" -> !item.modelo.isNullOrBlank()
                else -> true
            }
        },
        sideTitle = "Leituras do Web mantidas",
        sideItems = listOf(
            MirrorInsight("Placa", "Campo central", "A placa continua sendo a principal busca operacional."),
            MirrorInsight("Alerta especial", "Sempre visível", "Veículos sensíveis precisam aparecer com destaque."),
            MirrorInsight("Histórico", "Fase futura", "O vínculo completo com atendimentos será aprofundado depois.")
        )
    ) { veiculo ->
        MirrorRecordCard(
            title = veiculo.placa,
            subtitle = listOfNotNull(veiculo.marca, veiculo.modelo, veiculo.cor).joinToString(" • ").ifBlank { "Modelo não informado" },
            badges = listOf(
                (if (veiculo.alertaEspecial.isNullOrBlank()) "Sem alerta" else "Com alerta") to
                    if (veiculo.alertaEspecial.isNullOrBlank()) LavaPrimeStatusTone.Info else LavaPrimeStatusTone.Warning
            ),
            fields = listOf(
                MirrorField("Cliente", veiculo.clienteId),
                MirrorField("Alerta", veiculo.alertaEspecial ?: "Sem observações especiais")
            )
        )
    }
}

@Composable
fun OperatorsMirrorScreen(repository: LavaPrimeRepository) {
    val usuarios by repository.usuariosAtivos.collectAsStateWithLifecycle(initialValue = emptyList())
    WebMirrorCollectionScreen(
        title = "Operadores",
        description = "Espelho mobile da tela de equipe do Web, com foco em perfil, função e estado do colaborador.",
        icon = Icons.Filled.ManageAccounts,
        metrics = listOf(
            MirrorMetric("Ativos", usuarios.size.toString(), Icons.Filled.ManageAccounts, "Usuários salvos localmente"),
            MirrorMetric("Administradores", usuarios.count { it.perfil == PerfilUsuario.ADMINISTRADOR }.toString(), Icons.Filled.Business, "Visão completa"),
            MirrorMetric("Operadores", usuarios.count { it.perfil == PerfilUsuario.OPERADOR }.toString(), Icons.Filled.DirectionsCar, "Rotina do pátio")
        ),
        searchPlaceholder = "Buscar nome ou e-mail",
        filters = listOf("Todos", "Administradores", "Operadores", "Com login local"),
        records = usuarios,
        emptyTitle = "Nenhum operador salvo",
        emptyDescription = "Os perfis locais entram aqui conforme forem usados no aparelho.",
        queryProvider = { "${it.nome} ${it.email}" },
        filterProvider = { item, filter ->
            when (filter) {
                "Administradores" -> item.perfil == PerfilUsuario.ADMINISTRADOR
                "Operadores" -> item.perfil == PerfilUsuario.OPERADOR
                "Com login local" -> item.ultimoLoginLocal != null
                else -> true
            }
        },
        sideTitle = "Perfis preservados",
        sideItems = listOf(
            MirrorInsight("Operador", "Pátio", "Entrada, status e acompanhamento continuam sendo o foco do perfil."),
            MirrorInsight("Administrador", "Completo", "Segue com visão de gestão, cadastro e financeiro."),
            MirrorInsight("Sessão local", "Ativa", "O app já restaura o último login local válido.")
        )
    ) { usuario ->
        MirrorRecordCard(
            title = usuario.nome,
            subtitle = usuario.email,
            badges = listOf(
                perfilLabel(usuario.perfil) to LavaPrimeStatusTone.Info,
                (if (usuario.ativo) "Ativo" else "Inativo") to if (usuario.ativo) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Danger
            ),
            fields = listOf(
                MirrorField("Último login", usuario.ultimoLoginLocal?.toString() ?: "Ainda não registrado"),
                MirrorField("Empresa", usuario.empresaId)
            )
        )
    }
}

@Composable
fun ServicesMirrorScreen(repository: LavaPrimeRepository) {
    val servicos by repository.servicosAtivos.collectAsStateWithLifecycle(initialValue = emptyList())
    val precoMedio = if (servicos.isNotEmpty()) servicos.sumOf { it.precoBaseCentavos } / servicos.size else 0L
    val maiorDuracao = servicos.maxOfOrNull { it.tempoEstimadoMin } ?: 0

    WebMirrorCollectionScreen(
        title = "Serviços",
        description = "Espelho mobile da tabela de serviços do Web, com preço, duração e categoria operacional.",
        icon = Icons.Filled.WorkspacePremium,
        metrics = listOf(
            MirrorMetric("Serviços ativos", servicos.size.toString(), Icons.Filled.WorkspacePremium, "Catálogo local"),
            MirrorMetric("Preço médio", money(precoMedio), Icons.Filled.AccountBalanceWallet, "Base do ticket"),
            MirrorMetric("Maior duração", "${maiorDuracao} min", Icons.Filled.Event, "Capacidade de agenda")
        ),
        searchPlaceholder = "Buscar serviço ou categoria",
        filters = listOf("Todos", "Lavagem", "Estética", "Com risco químico"),
        records = servicos,
        emptyTitle = "Nenhum serviço ativo",
        emptyDescription = "O catálogo de serviços aparecerá aqui com os mesmos campos essenciais do Web.",
        queryProvider = { "${it.nome} ${it.categoria} ${it.descricao.orEmpty()}" },
        filterProvider = { item, filter ->
            when (filter) {
                "Lavagem" -> item.categoria.equals("Lavagem", true)
                "Estética" -> item.categoria.equals("Estética", true)
                "Com risco químico" -> item.usaProdutoAcido || item.usaProdutoAlcalino
                else -> true
            }
        },
        sideTitle = "Composição preservada",
        sideItems = listOf(
            MirrorInsight("Preço base", "Obrigatório", "Segue como fundamento de atendimento e faturamento."),
            MirrorInsight("Duração", "Obrigatória", "Continua servindo como base de capacidade da operação."),
            MirrorInsight("Química", "Visível", "Risco ácido, alcalino e pH precisam ficar claros no mobile.")
        )
    ) { servico ->
        MirrorRecordCard(
            title = servico.nome,
            subtitle = "${servico.categoria} • ${servico.tempoEstimadoMin} min",
            badges = listOf(
                money(servico.precoBaseCentavos) to LavaPrimeStatusTone.Success,
                (if (servico.usaProdutoAcido || servico.usaProdutoAlcalino) "Risco químico" else "Seguro") to
                    if (servico.usaProdutoAcido || servico.usaProdutoAlcalino) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
            ),
            fields = listOf(
                MirrorField("Descrição", servico.descricao ?: "Sem descrição detalhada"),
                MirrorField("pH estimado", servico.phEstimado?.toString() ?: "Não informado")
            )
        )
    }
}

@Composable
fun SuppliesMirrorScreen(repository: LavaPrimeRepository) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    val insumos = produtos.filter { it.tipo.contains("insumo", ignoreCase = true) }

    WebMirrorCollectionScreen(
        title = "Insumos",
        description = "Espelho mobile da tela de insumos do Web, separado do catálogo de venda e focado em estoque interno.",
        icon = Icons.Filled.Science,
        metrics = listOf(
            MirrorMetric("Insumos ativos", insumos.size.toString(), Icons.Filled.Science, "Base interna"),
            MirrorMetric("Baixo estoque", insumos.count { it.estoqueAtual <= it.estoqueMinimo }.toString(), Icons.Filled.Inventory2, "Itens que pedem reposição", LavaPrimeStatusTone.Warning),
            MirrorMetric("Saldo total", insumos.sumOf { it.estoqueAtual }.toString(), Icons.Filled.SwapHoriz, "Soma simples das quantidades")
        ),
        searchPlaceholder = "Buscar insumo ou unidade",
        filters = listOf("Todos", "Baixo estoque", "Saudável"),
        records = insumos,
        emptyTitle = "Nenhum insumo local",
        emptyDescription = "Os insumos internos aparecem aqui em separado dos produtos vendáveis.",
        queryProvider = { "${it.nome} ${it.unidade} ${it.tipo}" },
        filterProvider = { item, filter ->
            when (filter) {
                "Baixo estoque" -> item.estoqueAtual <= item.estoqueMinimo
                "Saudável" -> item.estoqueAtual > item.estoqueMinimo
                else -> true
            }
        },
        sideTitle = "Diferença preservada",
        sideItems = listOf(
            MirrorInsight("Produto", "Vendável", "Produto segue fluxo comercial."),
            MirrorInsight("Insumo", "Interno", "Insumo continua ligado ao consumo da operação."),
            MirrorInsight("Reposição", "Visível", "A criticidade de estoque precisa ser rápida no mobile.")
        )
    ) { item ->
        MirrorRecordCard(
            title = item.nome,
            subtitle = "${item.estoqueAtual} ${item.unidade} • mínimo ${item.estoqueMinimo}",
            badges = listOf(
                item.tipo to LavaPrimeStatusTone.Info,
                (if (item.estoqueAtual <= item.estoqueMinimo) "Baixo estoque" else "Saudável") to
                    if (item.estoqueAtual <= item.estoqueMinimo) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Success
            ),
            fields = listOf(
                MirrorField("Preço/custo", money(item.precoVendaCentavos)),
                MirrorField("Empresa", item.empresaId)
            )
        )
    }
}

@Composable
fun InventoryMirrorScreen(repository: LavaPrimeRepository) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())

    WebMirrorCollectionScreen(
        title = "Inventário",
        description = "Espelho mobile da posição de estoques do Web, somando produtos e insumos em uma leitura compacta.",
        icon = Icons.Filled.Inventory2,
        metrics = listOf(
            MirrorMetric("Itens monitorados", produtos.size.toString(), Icons.Filled.Inventory2, "Produtos e insumos"),
            MirrorMetric("Baixo estoque", produtos.count { it.estoqueAtual <= it.estoqueMinimo }.toString(), Icons.Filled.SwapHoriz, "Alertas atuais", LavaPrimeStatusTone.Warning),
            MirrorMetric("Produtos", produtos.count { !it.tipo.contains("insumo", ignoreCase = true) }.toString(), Icons.Filled.PointOfSale),
            MirrorMetric("Insumos", produtos.count { it.tipo.contains("insumo", ignoreCase = true) }.toString(), Icons.Filled.Science)
        ),
        searchPlaceholder = "Buscar item, tipo ou unidade",
        filters = listOf("Todos", "Produtos", "Insumos", "Baixo estoque"),
        records = produtos,
        emptyTitle = "Inventário vazio",
        emptyDescription = "Assim que houver base local, os itens passam a aparecer com estado de estoque e saúde.",
        queryProvider = { "${it.nome} ${it.tipo} ${it.unidade}" },
        filterProvider = { item, filter ->
            when (filter) {
                "Produtos" -> !item.tipo.contains("insumo", ignoreCase = true)
                "Insumos" -> item.tipo.contains("insumo", ignoreCase = true)
                "Baixo estoque" -> item.estoqueAtual <= item.estoqueMinimo
                else -> true
            }
        },
        sideTitle = "Leitura do Web no mobile",
        sideItems = listOf(
            MirrorInsight("Estado", "Sempre visível", "O Web diferencia item saudável de item em atenção."),
            MirrorInsight("Ajuste", "Fase futura", "O ajuste operacional entra quando o fluxo de estoque for aprofundado."),
            MirrorInsight("Histórico", "Separado", "Movimentos de estoque ainda precisam de fundação dedicada.")
        )
    ) { item ->
        MirrorRecordCard(
            title = item.nome,
            subtitle = "${item.tipo} • ${item.estoqueAtual} ${item.unidade}",
            badges = listOf(
                (if (item.estoqueAtual <= item.estoqueMinimo) "Atenção" else "Saudável") to
                    if (item.estoqueAtual <= item.estoqueMinimo) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Success
            ),
            fields = listOf(
                MirrorField("Mínimo", "${item.estoqueMinimo} ${item.unidade}"),
                MirrorField("Preço de venda", money(item.precoVendaCentavos))
            )
        )
    }
}

@Composable
fun ProductSalesMirrorScreen() {
    WebMirrorCollectionScreen(
        title = "Vendas",
        description = "Espelho mobile da tela de vendas do Web, preparado para balcão, comprovante e histórico comercial.",
        icon = Icons.Filled.PointOfSale,
        metrics = listOf(
            MirrorMetric("Vendas registradas", "0", Icons.Filled.PointOfSale, "Sem vendas locais ainda"),
            MirrorMetric("Itens vendidos", "0", Icons.Filled.Inventory2, "Saída futura do estoque"),
            MirrorMetric("Faturamento", money(0), Icons.Filled.AccountBalanceWallet, "Resumo comercial")
        ),
        searchPlaceholder = "Buscar venda, cliente, placa ou produto",
        filters = listOf("Todos", "Hoje", "Com placa", "Sem placa"),
        records = emptyList<String>(),
        emptyTitle = "Nenhuma venda local",
        emptyDescription = "A estrutura visual do espelho já está pronta. A venda real entra na fase funcional do módulo.",
        queryProvider = { it },
        sideTitle = "Pontos do Web preservados",
        sideItems = listOf(
            MirrorInsight("Comprovante", "Obrigatório", "A venda precisa manter saída documental própria."),
            MirrorInsight("Placa", "Opcional", "A venda do Web aceita vínculo com veículo quando fizer sentido."),
            MirrorInsight("Pagamento", "Integrado", "O fechamento comercial conversa com o fluxo de pagamento.")
        )
    ) { }
}

@Composable
fun FinanceOverviewScreen(
    repository: LavaPrimeRepository,
    patioState: PatioUiState,
    syncState: SyncUiState
) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    val totalAtivo = patioState.atendimentos.sumOf { it.valorCentavos }

    WebMirrorCollectionScreen(
        title = "Financeiro geral",
        description = "Resumo mobile da leitura financeira do Web, com foco em caixa, pendências e documentos vinculados.",
        icon = Icons.Filled.AccountBalanceWallet,
        metrics = listOf(
            MirrorMetric("Receita prevista", money(totalAtivo), Icons.Filled.AccountBalanceWallet, "Atendimentos em aberto", LavaPrimeStatusTone.Success),
            MirrorMetric("Sync pendente", syncState.pendingCount.toString(), Icons.Filled.SwapHoriz, "Fila aguardando sincronização", if (syncState.pendingCount > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info),
            MirrorMetric("Itens críticos", produtos.count { it.estoqueAtual <= it.estoqueMinimo }.toString(), Icons.Filled.Inventory2, "Reflexo em operação e venda")
        ),
        searchPlaceholder = "Buscar referência financeira",
        filters = listOf("Todos", "Recebimentos", "Pendências", "Resumo"),
        records = patioState.atendimentos,
        emptyTitle = "Sem movimento financeiro local",
        emptyDescription = "Quando a base financeira local evoluir, esta tela reunirá a leitura rápida do Web no formato mobile.",
        queryProvider = { "${it.clienteNomeSnapshot} ${it.placaSnapshot} ${it.servicoNomeSnapshot}" },
        filterProvider = { _, _ -> true },
        sideTitle = "Leitura atual",
        sideItems = listOf(
            MirrorInsight("Pagamentos em aberto", "Tela dedicada", "A cobrança do Web segue para a tela própria."),
            MirrorInsight("Fluxo de caixa", "Tela dedicada", "Entradas e saídas ficam agrupadas fora do resumo."),
            MirrorInsight("Documentos", "Conectados", "Recibos e comprovantes continuam dependentes do financeiro.")
        )
    ) { item ->
        MirrorRecordCard(
            title = item.clienteNomeSnapshot,
            subtitle = "${item.placaSnapshot} • ${item.servicoNomeSnapshot}",
            badges = listOf(
                money(item.valorCentavos) to LavaPrimeStatusTone.Success
            ),
            fields = listOf(
                MirrorField("Status", item.status.name),
                MirrorField("Pagamento", item.formaPagamento?.name ?: "Ainda não definido")
            )
        )
    }
}

@Composable
fun OpenPaymentsMirrorScreen() {
    WebMirrorCollectionScreen(
        title = "Pagamentos em aberto",
        description = "Espelho mobile da cobrança do Web, com foco em lembretes, valor pendente e baixa controlada.",
        icon = Icons.Filled.Payments,
        metrics = listOf(
            MirrorMetric("Em aberto", "0", Icons.Filled.Payments, "Nenhuma cobrança local"),
            MirrorMetric("Valor pendente", money(0), Icons.Filled.AccountBalanceWallet, "Sem saldo aberto"),
            MirrorMetric("Baixados", "0", Icons.Filled.WorkspacePremium, "Histórico de baixas")
        ),
        searchPlaceholder = "Buscar cliente, placa ou serviço",
        filters = listOf("Todos", "Aberto", "Baixado"),
        records = emptyList<String>(),
        emptyTitle = "Sem pagamentos em aberto",
        emptyDescription = "A tela já espelha a organização do Web. Os registros reais entram quando o domínio financeiro local for ampliado.",
        queryProvider = { it },
        sideTitle = "Fluxo esperado",
        sideItems = listOf(
            MirrorInsight("Lembrete", "Diário", "O Web destaca lembretes ativos por cliente e serviço."),
            MirrorInsight("Baixa", "Controlada", "A cobrança precisa registrar o encerramento com rastreabilidade."),
            MirrorInsight("WhatsApp", "Futuro", "A integração de mensagem continua separada do shell visual.")
        )
    ) { }
}

@Composable
fun CashflowMirrorScreen(patioState: PatioUiState) {
    val totalPrevisto = patioState.atendimentos.sumOf { it.valorCentavos }
    WebMirrorCollectionScreen(
        title = "Fluxo de caixa",
        description = "Espelho mobile do fluxo do Web, com foco em entradas, saídas e saldo previsto do dia.",
        icon = Icons.Filled.SwapHoriz,
        metrics = listOf(
            MirrorMetric("Entradas previstas", money(totalPrevisto), Icons.Filled.AccountBalanceWallet, "Baseada nos atendimentos ativos", LavaPrimeStatusTone.Success),
            MirrorMetric("Saídas", money(0), Icons.Filled.Payments, "Sem contas locais lançadas ainda"),
            MirrorMetric("Saldo previsto", money(totalPrevisto), Icons.Filled.Assessment, "Entradas menos saídas")
        ),
        searchPlaceholder = "Buscar lançamento",
        filters = listOf("Todos", "Entradas", "Saídas", "Pendentes"),
        records = patioState.atendimentos,
        emptyTitle = "Sem lançamentos no caixa",
        emptyDescription = "Os lançamentos reais entram quando o domínio financeiro local estiver completo.",
        queryProvider = { "${it.clienteNomeSnapshot} ${it.servicoNomeSnapshot}" },
        filterProvider = { _, filter -> filter == "Todos" || filter == "Entradas" },
        sideTitle = "Uso no mobile",
        sideItems = listOf(
            MirrorInsight("Resumo do dia", "Rápido", "A leitura do caixa precisa funcionar em poucos toques."),
            MirrorInsight("Pendências", "Destacadas", "Lançamentos agendados e pendentes continuam em destaque."),
            MirrorInsight("Exportação", "Futura", "A saída detalhada continua reservada à fase funcional.")
        )
    ) { item ->
        MirrorRecordCard(
            title = item.clienteNomeSnapshot,
            subtitle = item.servicoNomeSnapshot,
            badges = listOf(
                money(item.valorCentavos) to LavaPrimeStatusTone.Success
            ),
            fields = listOf(
                MirrorField("Tipo", "Entrada prevista"),
                MirrorField("Status", item.status.name)
            )
        )
    }
}

@Composable
fun PayablesMirrorScreen() {
    WebMirrorCollectionScreen(
        title = "Contas a pagar",
        description = "Espelho mobile das obrigações do Web, preparado para fornecedores, categoria e vencimento.",
        icon = Icons.Filled.Description,
        metrics = listOf(
            MirrorMetric("Em aberto", "0", Icons.Filled.Description, "Sem contas locais"),
            MirrorMetric("Valor aberto", money(0), Icons.Filled.AccountBalanceWallet, "Sem obrigações registradas"),
            MirrorMetric("Pagas", "0", Icons.Filled.WorkspacePremium, "Histórico futuro")
        ),
        searchPlaceholder = "Buscar conta ou fornecedor",
        filters = listOf("Todas", "A vencer", "Pagas", "Vencidas"),
        records = emptyList<String>(),
        emptyTitle = "Nenhuma conta registrada",
        emptyDescription = "A organização visual já espelha o Web. O cadastro real entra em fase financeira própria.",
        queryProvider = { it },
        sideTitle = "Leituras preservadas",
        sideItems = listOf(
            MirrorInsight("Fornecedor", "Obrigatório", "A obrigação do Web sempre destaca a origem da conta."),
            MirrorInsight("Categoria", "Obrigatória", "A classificação continua sendo parte da leitura gerencial."),
            MirrorInsight("Vencimento", "Obrigatório", "O status do prazo precisa ser claro no mobile.")
        )
    ) { }
}

@Composable
fun InvoicesMirrorScreen() {
    WebMirrorCollectionScreen(
        title = "Faturas",
        description = "Espelho mobile da central de faturas do Web, com filtro por aberto, vencido e pago.",
        icon = Icons.Filled.ReceiptLong,
        metrics = listOf(
            MirrorMetric("Faturas abertas", "0", Icons.Filled.ReceiptLong, "Sem faturas locais"),
            MirrorMetric("Vencidas", "0", Icons.Filled.Event, "Sem atraso registrado", LavaPrimeStatusTone.Warning),
            MirrorMetric("Pagas", "0", Icons.Filled.WorkspacePremium, "Baixas confirmadas")
        ),
        searchPlaceholder = "Buscar fatura ou cliente",
        filters = listOf("Todas", "Abertas", "Vencidas", "Pagas"),
        records = emptyList<String>(),
        emptyTitle = "Nenhuma fatura local",
        emptyDescription = "A central de faturamento já existe no Android em formato espelhado, aguardando a fundação funcional.",
        queryProvider = { it },
        sideTitle = "Leitura do Web",
        sideItems = listOf(
            MirrorInsight("Cliente", "Obrigatório", "A fatura sempre destaca o cliente associado."),
            MirrorInsight("Vencimento", "Obrigatório", "A data de vencimento continua sendo o principal alerta."),
            MirrorInsight("Baixa", "Controlada", "A ação de baixa precisa manter histórico e saldo.")
        )
    ) { }
}

@Composable
fun DocumentsMirrorScreen(syncState: SyncUiState) {
    WebMirrorCollectionScreen(
        title = "Documentos",
        description = "Espelho mobile do histórico documental do Web, preservando recibos, comprovantes e relatórios.",
        icon = Icons.Filled.Description,
        metrics = listOf(
            MirrorMetric("Documentos gerados", "0", Icons.Filled.Description, "Sem histórico local ainda"),
            MirrorMetric("Sync pendente", syncState.pendingCount.toString(), Icons.Filled.SwapHoriz, "Impacta documentos futuros"),
            MirrorMetric("Hoje", "0", Icons.Filled.Event, "Produção documental do dia")
        ),
        searchPlaceholder = "Buscar número, título ou responsável",
        filters = listOf("Todos", "Recibo", "Relatório", "Documento"),
        records = emptyList<String>(),
        emptyTitle = "Nenhum documento local",
        emptyDescription = "Os documentos estruturados entram depois, mas a superfície visual já acompanha a linguagem do Web.",
        queryProvider = { it },
        sideTitle = "Padrão preservado",
        sideItems = listOf(
            MirrorInsight("Recibos", "Histórico", "O Web mantém recibos e comprovantes no mesmo centro."),
            MirrorInsight("Responsável", "Rastreável", "Toda emissão precisa indicar origem."),
            MirrorInsight("Financeiro", "Conectado", "Documentos compatíveis com cobrança dependem dos dados financeiros.")
        )
    ) { }
}

@Composable
fun ReportsMirrorScreen(
    repository: LavaPrimeRepository,
    patioState: PatioUiState,
    syncState: SyncUiState
) {
    val clientes by repository.clientes.collectAsStateWithLifecycle(initialValue = emptyList())
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())

    WebMirrorCollectionScreen(
        title = "Relatórios",
        description = "Espelho mobile dos resumos do Web, priorizando leitura operacional, estoque crítico e indicadores rápidos.",
        icon = Icons.Filled.Assessment,
        metrics = listOf(
            MirrorMetric("Atendimentos ativos", patioState.atendimentos.size.toString(), Icons.Filled.DirectionsCar, "Fila atual"),
            MirrorMetric("Clientes", clientes.size.toString(), Icons.Filled.Group, "Base local"),
            MirrorMetric("Estoque crítico", produtos.count { it.estoqueAtual <= it.estoqueMinimo }.toString(), Icons.Filled.Inventory2, "Itens sob atenção", LavaPrimeStatusTone.Warning),
            MirrorMetric("Sync pendente", syncState.pendingCount.toString(), Icons.Filled.SwapHoriz, "Fila operacional")
        ),
        searchPlaceholder = "Buscar indicador ou origem",
        filters = listOf("Todos", "Operação", "Estoque", "Sync"),
        records = patioState.atendimentos,
        emptyTitle = "Sem dados de relatório",
        emptyDescription = "A camada visual já acompanha o Web; os relatórios completos entram em fase própria.",
        queryProvider = { "${it.clienteNomeSnapshot} ${it.servicoNomeSnapshot}" },
        filterProvider = { _, _ -> true },
        sideTitle = "Perguntas que o mobile responde",
        sideItems = listOf(
            MirrorInsight("Pátio", "Agora", "Quantos veículos estão ativos na operação?"),
            MirrorInsight("Estoque", "Atenção", "Quais itens já estão no mínimo?"),
            MirrorInsight("Sync", "Risco", "Quantas alterações ainda não saíram do aparelho?")
        )
    ) { item ->
        MirrorRecordCard(
            title = item.clienteNomeSnapshot,
            subtitle = item.servicoNomeSnapshot,
            badges = listOf(
                item.status.name to LavaPrimeStatusTone.Info
            ),
            fields = listOf(
                MirrorField("Valor", money(item.valorCentavos)),
                MirrorField("Operador", item.operadorNomeSnapshot ?: "Não definido")
            )
        )
    }
}

@Composable
fun BusinessOverviewScreen() {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
        contentPadding = PaddingValues(bottom = 24.dp)
    ) {
        item {
            HeroPanel(
                title = "Empresa",
                description = "Espelho mobile da área de dados do negócio do Web, com identidade oficial e leitura por seções.",
                icon = Icons.Filled.Business
            )
        }
        item {
            FlowMetricRow(
                metrics = listOf(
                    MirrorMetric("Perfil", "Pendente", Icons.Filled.Business, "Dados institucionais ainda locais", LavaPrimeStatusTone.Warning),
                    MirrorMetric("Pix", "Pendente", Icons.Filled.Payments, "Configuração futura", LavaPrimeStatusTone.Warning),
                    MirrorMetric("Logo", "Oficial", Icons.Filled.WorkspacePremium, "Marca nova aplicada", LavaPrimeStatusTone.Success)
                )
            )
        }
        item {
            FormPreview(
                title = "Dados do negócio",
                fields = listOf("CNPJ", "Razão social", "Nome fantasia", "Telefone", "E-mail", "Endereço")
            )
        }
        item {
            InsightPanel(
                title = "O que o Web preserva aqui",
                items = listOf(
                    MirrorInsight("Dados institucionais", "Obrigatórios", "O cabeçalho dos documentos usa os dados do negócio."),
                    MirrorInsight("Logo oficial", "Obrigatória", "A marca do Web continua sendo a mesma do app."),
                    MirrorInsight("Contato", "Obrigatório", "Telefone e e-mail seguem como referência rápida.")
                )
            )
        }
    }
}

@Composable
fun BusinessFinanceScreen() {
    StaticBusinessScreen(
        title = "Configurações financeiras",
        description = "Espelho mobile do Web para Pix, bancos, métodos e preferências de cobrança.",
        icon = Icons.Filled.Settings,
        formTitle = "Campos esperados",
        formFields = listOf("Chave Pix", "Tipo da chave", "Conta bancária", "Métodos ativos", "Prefixo de recibo"),
        insights = listOf(
            MirrorInsight("Pix", "Obrigatório", "O Web usa Pix e contas bancárias em documentos compatíveis com cobrança."),
            MirrorInsight("Métodos", "Ativos", "Os meios ativos influenciam caixa, venda e atendimento."),
            MirrorInsight("Numeração", "Padronizada", "Recibos, orçamentos e comprovantes seguem prefixos próprios.")
        )
    )
}

@Composable
fun BusinessSocialScreen() {
    StaticBusinessScreen(
        title = "Canais sociais",
        description = "Espelho mobile dos canais sociais do Web, preservando WhatsApp e destinos de relatório.",
        icon = Icons.Filled.Forum,
        formTitle = "Canais esperados",
        formFields = listOf("WhatsApp", "Instagram", "Facebook", "Destino dos relatórios"),
        insights = listOf(
            MirrorInsight("WhatsApp", "Prioritário", "Segue como principal canal operacional."),
            MirrorInsight("Redes", "Institucionais", "Os canais sociais continuam vinculados ao negócio."),
            MirrorInsight("Relatórios", "Destino", "O Web já separa o alvo de compartilhamento por canal.")
        )
    )
}

@Composable
fun BusinessMessagesScreen() {
    StaticBusinessScreen(
        title = "Central de mensagens",
        description = "Espelho mobile da central de templates do Web, focado em lembretes, cobrança e relacionamento.",
        icon = Icons.Filled.Forum,
        formTitle = "Templates esperados",
        formFields = listOf("Lembrete de pagamento", "Cobrança", "Confirmação de serviço", "Pós-atendimento"),
        insights = listOf(
            MirrorInsight("Templates", "Reutilizáveis", "O Web organiza mensagens por contexto de uso."),
            MirrorInsight("Cobrança", "Separada", "A mensagem de pagamento em aberto segue fluxo próprio."),
            MirrorInsight("Operação", "Curta", "A comunicação precisa caber no ritmo do pátio e do caixa.")
        )
    )
}

@Composable
private fun StaticBusinessScreen(
    title: String,
    description: String,
    icon: ImageVector,
    formTitle: String,
    formFields: List<String>,
    insights: List<MirrorInsight>
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
        contentPadding = PaddingValues(bottom = 24.dp)
    ) {
        item { HeroPanel(title = title, description = description, icon = icon) }
        item { FormPreview(title = formTitle, fields = formFields) }
        item { InsightPanel(title = "Referência do Web", items = insights) }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun FlowMetricRow(metrics: List<MirrorMetric>) {
    FlowRow(
        horizontalArrangement = Arrangement.spacedBy(12.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        metrics.forEach { metric ->
            LavaPrimeMetricCard(
                label = metric.label,
                value = metric.value,
                icon = metric.icon,
                support = metric.support,
                tone = metric.tone
            )
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun <T> WebMirrorCollectionScreen(
    title: String,
    description: String,
    icon: ImageVector,
    metrics: List<MirrorMetric>,
    searchPlaceholder: String,
    filters: List<String>,
    records: List<T>,
    emptyTitle: String,
    emptyDescription: String,
    queryProvider: (T) -> String,
    filterProvider: (T, String) -> Boolean = { _, _ -> true },
    sideTitle: String,
    sideItems: List<MirrorInsight>,
    rowContent: @Composable (T) -> Unit
) {
    var query by rememberSaveable(title) { mutableStateOf("") }
    var selectedFilter by rememberSaveable(title) { mutableStateOf(filters.firstOrNull().orEmpty()) }

    val filteredItems = remember(records, query, selectedFilter) {
        records.filter { item ->
            val queryOk = query.isBlank() || queryProvider(item).contains(query, ignoreCase = true)
            val filterOk = selectedFilter.isBlank() || selectedFilter == filters.firstOrNull() || filterProvider(item, selectedFilter)
            queryOk && filterOk
        }
    }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
        contentPadding = PaddingValues(bottom = 24.dp)
    ) {
        item { HeroPanel(title = title, description = description, icon = icon) }
        item { FlowMetricRow(metrics) }
        item {
            LavaPrimeTextField(
                value = query,
                onValueChange = { query = it },
                label = "Busca",
                placeholder = searchPlaceholder,
                singleLine = true
            )
        }
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                filters.forEach { filter ->
                    FilterChip(
                        selected = selectedFilter == filter,
                        onClick = { selectedFilter = filter },
                        label = { Text(filter) }
                    )
                }
            }
        }
        item {
            SectionTitle(
                text = "Lista principal",
                support = "Estrutura mobile espelhada do Web, adaptada para leitura por cards"
            )
        }
        if (filteredItems.isEmpty()) {
            item {
                EmptyState(
                    title = emptyTitle,
                    description = emptyDescription
                )
            }
        } else {
            items(filteredItems) { item ->
                rowContent(item)
            }
        }
        item {
            InsightPanel(title = sideTitle, items = sideItems)
        }
    }
}

@Composable
private fun InsightPanel(
    title: String,
    items: List<MirrorInsight>
) {
    LavaPrimeCard(tonal = true) {
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold
        )
        items.forEach { item ->
            LavaPrimeCard(
                tonal = false,
                contentPadding = PaddingValues(14.dp)
            ) {
                Text(
                    text = item.title,
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.primary
                )
                Text(
                    text = item.value,
                    style = MaterialTheme.typography.titleSmall,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = item.detail,
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun MirrorRecordCard(
    title: String,
    subtitle: String,
    badges: List<Pair<String, LavaPrimeStatusTone>>,
    fields: List<MirrorField>
) {
    LavaPrimeCard(modifier = Modifier.fillMaxWidth()) {
        Text(
            text = title,
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            maxLines = 2,
            overflow = TextOverflow.Ellipsis
        )
        Text(
            text = subtitle,
            style = MaterialTheme.typography.bodySmall,
            maxLines = 2,
            overflow = TextOverflow.Ellipsis
        )
        if (badges.isNotEmpty()) {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                badges.forEach { (text, tone) ->
                    LavaPrimeStatusChip(
                        text = text,
                        tone = tone
                    )
                }
            }
        }
        fields.forEach { field ->
            Text(
                text = "${field.label}: ${field.value}",
                style = MaterialTheme.typography.bodySmall
            )
        }
    }
}
