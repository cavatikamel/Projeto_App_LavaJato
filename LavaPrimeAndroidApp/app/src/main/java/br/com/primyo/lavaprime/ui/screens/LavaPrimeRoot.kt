package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Divider
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.sync.ConnectivityMonitor
import br.com.primyo.lavaprime.sync.SyncCoordinator
import br.com.primyo.lavaprime.ui.components.BrandLogo
import br.com.primyo.lavaprime.ui.components.ModuleScreen
import br.com.primyo.lavaprime.ui.components.perfilLabel
import br.com.primyo.lavaprime.ui.components.routeIcon
import br.com.primyo.lavaprime.ui.navigation.AppStage
import br.com.primyo.lavaprime.ui.navigation.MobileRoute
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.WaterBlue
import br.com.primyo.lavaprime.ui.viewmodel.AuthViewModel
import br.com.primyo.lavaprime.ui.viewmodel.CadastroViewModel
import br.com.primyo.lavaprime.ui.viewmodel.LavaPrimeViewModelFactory
import br.com.primyo.lavaprime.ui.viewmodel.PatioViewModel
import br.com.primyo.lavaprime.ui.viewmodel.SyncViewModel
import kotlinx.coroutines.launch

@Composable
fun LavaPrimeRoot(
    repository: LavaPrimeRepository,
    connectivityMonitor: ConnectivityMonitor,
    syncCoordinator: SyncCoordinator
) {
    val factory = remember(repository, connectivityMonitor, syncCoordinator) {
        LavaPrimeViewModelFactory(repository, connectivityMonitor, syncCoordinator)
    }
    val authViewModel: AuthViewModel = viewModel(factory = factory)
    val patioViewModel: PatioViewModel = viewModel(factory = factory)
    val cadastroViewModel: CadastroViewModel = viewModel(factory = factory)
    val syncViewModel: SyncViewModel = viewModel(factory = factory)

    val authState by authViewModel.state.collectAsStateWithLifecycle()
    val patioState by patioViewModel.state.collectAsStateWithLifecycle()
    val cadastroState by cadastroViewModel.state.collectAsStateWithLifecycle()
    val syncState by syncViewModel.state.collectAsStateWithLifecycle()

    when (authState.stage) {
        AppStage.SPLASH -> SplashLavaPrime()
        AppStage.INICIAL -> InitialScreen(onAccess = authViewModel::abrirLogin)
        AppStage.LOGIN -> LoginScreen(
            perfil = authState.perfilSelecionado,
            email = authState.email,
            senha = authState.senha,
            erro = authState.erro,
            onBack = authViewModel::voltarParaInicial,
            onSelectPerfil = authViewModel::selecionarPerfil,
            onEmailChange = authViewModel::atualizarEmail,
            onSenhaChange = authViewModel::atualizarSenha,
            onLogin = authViewModel::fazerLogin
        )
        AppStage.APP -> {
            val usuario = authState.usuario ?: return
            LavaPrimeShell(
                repository = repository,
                usuario = usuario,
                patioViewModel = patioViewModel,
                patioState = patioState,
                cadastroViewModel = cadastroViewModel,
                cadastroState = cadastroState,
                syncViewModel = syncViewModel,
                syncState = syncState,
                onLogout = authViewModel::logout
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun LavaPrimeShell(
    repository: LavaPrimeRepository,
    usuario: UsuarioEntity,
    patioViewModel: PatioViewModel,
    patioState: br.com.primyo.lavaprime.ui.viewmodel.PatioUiState,
    cadastroViewModel: CadastroViewModel,
    cadastroState: br.com.primyo.lavaprime.ui.viewmodel.CadastroUiState,
    syncViewModel: SyncViewModel,
    syncState: br.com.primyo.lavaprime.ui.viewmodel.SyncUiState,
    onLogout: () -> Unit
) {
    var route by remember {
        mutableStateOf(if (usuario.perfil == PerfilUsuario.ADMINISTRADOR) MobileRoute.DASHBOARD else MobileRoute.PATIO)
    }
    var showNewAttendance by remember { mutableStateOf(false) }
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()
    val isTablet = LocalConfiguration.current.screenWidthDp >= 720

    ModalNavigationDrawer(
        drawerState = drawerState,
        gesturesEnabled = false,
        drawerContent = {
            DrawerContent(
                usuario = usuario,
                selected = route,
                onClose = { scope.launch { drawerState.close() } },
                onSelect = {
                    route = it
                    scope.launch { drawerState.close() }
                },
                onLogout = onLogout
            )
        }
    ) {
        Scaffold(
            containerColor = PageBg,
            topBar = {
                TopAppBar(
                    title = {
                        Column {
                            Text(route.title, maxLines = 1, overflow = TextOverflow.Ellipsis, fontWeight = FontWeight.Black, color = PrimeBlue)
                            Text("${perfilLabel(usuario.perfil)}  ${route.hint}", style = MaterialTheme.typography.labelSmall, color = WaterBlue)
                        }
                    },
                    navigationIcon = {
                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                            Text("|||", style = MaterialTheme.typography.titleLarge, color = PrimeBlue, fontWeight = FontWeight.Black)
                        }
                    },
                    actions = {
                        AssistChip(
                            onClick = {},
                            label = { Text(if (syncState.online) "Online" else "Offline") }
                        )
                    },
                    colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
                )
            },
            floatingActionButton = {
                if (route == MobileRoute.PATIO) {
                    ExtendedFloatingActionButton(
                        onClick = { showNewAttendance = true },
                        icon = { Text("+") },
                        text = { Text("Novo atendimento") },
                        containerColor = PrimeBlue,
                        contentColor = Color.White
                    )
                }
            }
        ) { padding ->
            Surface(
                modifier = Modifier
                    .padding(padding)
                    .fillMaxSize(),
                color = PageBg
            ) {
                when (route) {
                    MobileRoute.DASHBOARD -> DashboardScreen(repository, patioState, syncState)
                    MobileRoute.PATIO -> PatioScreen(
                        state = patioState,
                        usuario = usuario,
                        onSelectFilter = patioViewModel::selecionarFiltro,
                        onToggleAlerts = patioViewModel::alternarSomenteAlertas,
                        onAdvance = patioViewModel::avancarStatus,
                        onBack = patioViewModel::voltarStatus
                    )
                    MobileRoute.AGENDAMENTOS -> ModuleScreen("Agendamentos", "Agenda por horarios, chegada no patio, faltas, reagendamento e conversao para atendimento.", "AG")
                    MobileRoute.CLIENTES -> CadastrosScreen(
                        state = cadastroState,
                        usuario = usuario,
                        onSearchChange = cadastroViewModel::atualizarBusca,
                        onSaveCadastro = cadastroViewModel::cadastrar
                    )
                    MobileRoute.SERVICOS -> ModuleScreen("Servicos", "Cadastro de servicos, preco, tempo medio, insumos consumidos, regra de pH e riscos por produto.", "SV")
                    MobileRoute.PRODUTOS -> ProductsScreen(repository)
                    MobileRoute.FINANCEIRO -> ModuleScreen("Financeiro", "Caixa do dia, contas a pagar e receber, taxas por forma de pagamento e margem.", "FI")
                    MobileRoute.RELATORIOS -> ModuleScreen("Relatorios", "Indicadores mobile: faturamento, ticket medio, ocupacao, produtividade e estoque critico.", "RE")
                    MobileRoute.CONFIG -> ModuleScreen("Meu negocio", "Dados do lava jato, operadores, fiscal, formas de pagamento e integracao com Primyo Console.", "MN")
                    MobileRoute.SEGURANCA -> SecuritySyncScreen(syncState, syncViewModel::sincronizarAgora)
                }
            }
        }
    }

    if (showNewAttendance) {
        NovoAtendimentoDialog(
            servicos = patioState.servicos,
            onClose = { showNewAttendance = false },
            onSave = { cliente, telefone, placa, veiculo, alerta, servico ->
                patioViewModel.criarAtendimento(cliente, telefone, placa, veiculo, alerta, servico, usuario)
                showNewAttendance = false
            }
        )
    }
}

@Composable
private fun DrawerContent(
    usuario: UsuarioEntity,
    selected: MobileRoute,
    onClose: () -> Unit,
    onSelect: (MobileRoute) -> Unit,
    onLogout: () -> Unit
) {
    val routes = MobileRoute.entries.filter { usuario.perfil == PerfilUsuario.ADMINISTRADOR || !it.adminOnly }
    ModalDrawerSheet(Modifier.width(318.dp), drawerContainerColor = Color.White) {
        Column(Modifier.fillMaxHeight()) {
            androidx.compose.foundation.layout.Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Brush.verticalGradient(listOf(PrimeBlue, WaterBlue)))
                    .padding(18.dp)
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        BrandLogo(modifier = Modifier.size(54.dp), compact = true)
                        Spacer(Modifier.width(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text("LavaPrime", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Black, color = Color.White)
                            Text("Menu operacional", style = MaterialTheme.typography.labelMedium, color = Color.White.copy(alpha = 0.80f))
                        }
                        Text(
                            "X",
                            modifier = Modifier.clickable(onClick = onClose),
                            style = MaterialTheme.typography.titleLarge,
                            color = Color.White.copy(alpha = 0.75f)
                        )
                    }
                    Surface(color = Color.White.copy(alpha = 0.16f), shape = RoundedCornerShape(18.dp)) {
                        Row(Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                            androidx.compose.foundation.layout.Box(
                                modifier = Modifier
                                    .size(42.dp)
                                    .clip(CircleShape)
                                    .background(Color.White),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(if (usuario.perfil == PerfilUsuario.ADMINISTRADOR) "A" else "O", color = PrimeBlue, fontWeight = FontWeight.Black)
                            }
                            Spacer(Modifier.width(10.dp))
                            Column {
                                Text(usuario.nome, color = Color.White, fontWeight = FontWeight.Bold)
                                Text(perfilLabel(usuario.perfil), color = Color.White.copy(alpha = 0.82f), style = MaterialTheme.typography.labelSmall)
                            }
                        }
                    }
                }
            }
            LazyColumn(
                modifier = Modifier
                    .weight(1f)
                    .padding(12.dp),
                verticalArrangement = Arrangement.spacedBy(7.dp)
            ) {
                items(routes) { item ->
                    val active = selected == item
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(18.dp))
                            .background(if (active) Color(0xFFE5F8FB) else Color.White)
                            .clickable { onSelect(item) }
                            .padding(13.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Surface(
                            modifier = Modifier.size(38.dp),
                            color = if (active) PrimeBlue else Color(0xFFEAF7FA),
                            shape = RoundedCornerShape(13.dp)
                        ) {
                            androidx.compose.foundation.layout.Box(contentAlignment = Alignment.Center) {
                                Text(routeIcon(item), modifier = Modifier.align(Alignment.Center), color = if (active) Color.White else PrimeBlue)
                            }
                        }
                        Spacer(Modifier.width(12.dp))
                        Column(Modifier.weight(1f)) {
                            Text(item.title, fontWeight = if (active) FontWeight.Black else FontWeight.SemiBold, color = PrimeBlue)
                            Text(item.hint, style = MaterialTheme.typography.labelSmall, color = Color(0xFF64777D))
                        }
                    }
                }
            }
            Divider()
            androidx.compose.material3.OutlinedButton(
                onClick = onLogout,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(14.dp),
                shape = RoundedCornerShape(14.dp)
            ) {
                Text("Sair do LavaPrime")
            }
        }
    }
}
