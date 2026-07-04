package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalNavigationDrawer
import androidx.compose.material3.Surface
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.sync.ConnectivityMonitor
import br.com.primyo.lavaprime.sync.SyncCoordinator
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeDrawer
import br.com.primyo.lavaprime.ui.components.LavaPrimeScaffold
import br.com.primyo.lavaprime.ui.components.perfilLabel
import br.com.primyo.lavaprime.ui.navigation.AppStage
import br.com.primyo.lavaprime.ui.navigation.MobileRoute
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.viewmodel.AuthViewModel
import br.com.primyo.lavaprime.ui.viewmodel.CadastroUiState
import br.com.primyo.lavaprime.ui.viewmodel.CadastroViewModel
import br.com.primyo.lavaprime.ui.viewmodel.LavaPrimeViewModelFactory
import br.com.primyo.lavaprime.ui.viewmodel.PatioUiState
import br.com.primyo.lavaprime.ui.viewmodel.PatioViewModel
import br.com.primyo.lavaprime.ui.viewmodel.SyncUiState
import br.com.primyo.lavaprime.ui.viewmodel.SyncViewModel
import kotlinx.coroutines.launch

@Composable
fun LavaPrimeRoot(
    repository: LavaPrimeRepository,
    connectivityMonitor: ConnectivityMonitor,
    syncCoordinator: SyncCoordinator
) {
    val app = androidx.compose.ui.platform.LocalContext.current.applicationContext as br.com.primyo.lavaprime.LavaPrimeApp
    val factory = remember(repository, connectivityMonitor, syncCoordinator, app.localSessionStore) {
        LavaPrimeViewModelFactory(repository, app.localSessionStore, connectivityMonitor, syncCoordinator)
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
        AppStage.SPLASH -> SplashLavaPrime(
            title = authState.splashTitle,
            message = authState.splashMessage,
            localDbState = authState.localDbState,
            localDbMessage = authState.localDbMessage,
            sessionState = authState.sessionState,
            sessionMessage = authState.sessionMessage,
            routeState = authState.routeState,
            routeMessage = authState.routeMessage
        )

        AppStage.INICIAL,
        AppStage.LOGIN -> LoginScreen(
            perfil = authState.perfilSelecionado,
            email = authState.email,
            senha = authState.senha,
            erro = authState.erro,
            bootstrapSummary = authState.bootstrapSummary,
            localDbReady = authState.localDbState == br.com.primyo.lavaprime.ui.viewmodel.BootstrapStepState.READY,
            bootstrapError = authState.bootstrapError,
            onRetryBootstrap = authViewModel::iniciarBootstrap,
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
    patioState: PatioUiState,
    cadastroViewModel: CadastroViewModel,
    cadastroState: CadastroUiState,
    syncViewModel: SyncViewModel,
    syncState: SyncUiState,
    onLogout: () -> Unit
) {
    var route by remember {
        mutableStateOf(if (usuario.perfil == PerfilUsuario.ADMINISTRADOR) MobileRoute.DASHBOARD else MobileRoute.PATIO)
    }
    var showNewAttendance by remember { mutableStateOf(false) }
    val drawerState = rememberDrawerState(DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    ModalNavigationDrawer(
        drawerState = drawerState,
        gesturesEnabled = false,
        drawerContent = {
            LavaPrimeDrawer(
                drawerState = drawerState,
                scope = scope,
                usuario = usuario,
                selected = route,
                onSelect = { route = it },
                onLogout = onLogout
            )
        }
    ) {
        LavaPrimeScaffold(
            title = route.title,
            subtitle = "${perfilLabel(usuario.perfil)} | ${route.hint}",
            online = syncState.online,
            onMenuClick = { scope.launch { drawerState.open() } },
            floatingActionButton = {
                if (route == MobileRoute.PATIO) {
                    LavaPrimeActionButton(
                        text = "Novo atendimento",
                        onClick = { showNewAttendance = true },
                        icon = Icons.Filled.Add,
                        style = LavaPrimeActionStyle.Dark,
                        modifier = Modifier.width(210.dp)
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

                    MobileRoute.AGENDAMENTOS -> AgendamentosScreen(patioState)
                    MobileRoute.QUOTES -> QuotesScreen()
                    MobileRoute.CADASTROS -> CadastrosScreen(
                        state = cadastroState,
                        usuario = usuario,
                        onSearchChange = cadastroViewModel::atualizarBusca,
                        onSaveCadastro = cadastroViewModel::cadastrar
                    )

                    MobileRoute.CLIENTES -> ClientsScreen(
                        state = cadastroState,
                        usuario = usuario,
                        onSearchChange = cadastroViewModel::atualizarBusca,
                        onSaveCliente = cadastroViewModel::salvarClienteCompleto
                    )
                    MobileRoute.VEICULOS -> VehiclesScreen(
                        repository = repository,
                        state = cadastroState,
                        usuario = usuario,
                        onSearchChange = cadastroViewModel::atualizarBusca,
                        onSaveVeiculo = cadastroViewModel::salvarVeiculoCompleto
                    )
                    MobileRoute.OPERADORES -> OperatorsMirrorScreen(repository)
                    MobileRoute.SERVICOS -> ServicesScreen(repository, usuario)
                    MobileRoute.PRODUTOS -> ProductsScreen(repository)
                    MobileRoute.INSUMOS -> SuppliesMirrorScreen(repository)
                    MobileRoute.INVENTARIO -> InventoryMirrorScreen(repository)
                    MobileRoute.VENDAS -> ProductSalesMirrorScreen()
                    MobileRoute.FINANCEIRO -> FinanceOverviewScreen(repository, patioState, syncState)
                    MobileRoute.OPEN_PAYMENTS -> OpenPaymentsMirrorScreen()
                    MobileRoute.CASHFLOW -> CashflowMirrorScreen(patioState)
                    MobileRoute.PAYABLES -> PayablesMirrorScreen()
                    MobileRoute.INVOICES -> InvoicesMirrorScreen()
                    MobileRoute.DOCUMENTOS -> DocumentsMirrorScreen(syncState)
                    MobileRoute.RELATORIOS -> ReportsMirrorScreen(repository, patioState, syncState)
                    MobileRoute.BUSINESS -> BusinessOverviewScreen()
                    MobileRoute.BUSINESS_FINANCE -> BusinessFinanceScreen()
                    MobileRoute.BUSINESS_SOCIAL -> BusinessSocialScreen()
                    MobileRoute.BUSINESS_MESSAGES -> BusinessMessagesScreen()
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
