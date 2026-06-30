package br.com.primyo.lavaprime.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.AttachMoney
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Business
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Event
import androidx.compose.material.icons.filled.ExitToApp
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material.icons.filled.Wifi
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material.icons.filled.Dashboard
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.R
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.SyncStatus
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.ui.navigation.MobileRoute
import br.com.primyo.lavaprime.ui.theme.DangerBg
import br.com.primyo.lavaprime.ui.theme.DangerText
import br.com.primyo.lavaprime.ui.theme.InfoBg
import br.com.primyo.lavaprime.ui.theme.InfoText
import br.com.primyo.lavaprime.ui.theme.Mint
import br.com.primyo.lavaprime.ui.theme.MobileVersionName
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.theme.PageBgAlt
import br.com.primyo.lavaprime.ui.theme.PositiveBg
import br.com.primyo.lavaprime.ui.theme.PositiveText
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.PrimeBlueDeep
import br.com.primyo.lavaprime.ui.theme.SoftLine
import br.com.primyo.lavaprime.ui.theme.SurfaceMuted
import br.com.primyo.lavaprime.ui.theme.TextPrimary
import br.com.primyo.lavaprime.ui.theme.TextSecondary
import br.com.primyo.lavaprime.ui.theme.WarningBg
import br.com.primyo.lavaprime.ui.theme.WarningText
import br.com.primyo.lavaprime.ui.theme.WaterBlue
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.launch

enum class LavaPrimeStatusTone {
    Neutral,
    Info,
    Success,
    Warning,
    Danger
}

enum class LavaPrimeActionStyle {
    Primary,
    Dark,
    Outline,
    Ghost
}

@Composable
fun BrandLogo(
    modifier: Modifier = Modifier,
    compact: Boolean = false,
    showTagline: Boolean = true
) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Image(
            painter = painterResource(R.drawable.ic_lavaprime_logo),
            contentDescription = "Logo LavaPrime",
            modifier = modifier.then(
                if (compact) {
                    Modifier.size(72.dp)
                } else {
                    Modifier.size(width = 220.dp, height = 68.dp)
                }
            ),
            contentScale = ContentScale.Fit
        )
        if (!compact && showTagline) {
            Spacer(Modifier.width(12.dp))
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    "LavaPrime",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                    color = PrimeBlue
                )
                Text(
                    "Gestão inteligente para sua operação de lavagem.",
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary
                )
            }
        }
    }
}

@Composable
fun LavaPrimeVersionFooter(modifier: Modifier = Modifier) {
    Text(
        text = MobileVersionName,
        modifier = modifier,
        style = MaterialTheme.typography.labelSmall,
        color = TextSecondary,
        textAlign = TextAlign.Center
    )
}

@Composable
fun LavaPrimeCard(
    modifier: Modifier = Modifier,
    tonal: Boolean = false,
    contentPadding: PaddingValues = PaddingValues(18.dp),
    content: @Composable ColumnScope.() -> Unit
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = if (tonal) SurfaceMuted else Color.White),
        shape = RoundedCornerShape(24.dp),
        border = BorderStroke(1.dp, SoftLine),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
    ) {
        Column(
            modifier = Modifier.padding(contentPadding),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            content = content
        )
    }
}

@Composable
fun LavaPrimeMetricCard(
    label: String,
    value: String,
    icon: ImageVector,
    modifier: Modifier = Modifier,
    support: String? = null,
    tone: LavaPrimeStatusTone = LavaPrimeStatusTone.Info
) {
    LavaPrimeCard(modifier = modifier.widthIn(min = 160.dp), tonal = true) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Surface(
                color = toneContainerColor(tone),
                contentColor = toneContentColor(tone),
                shape = RoundedCornerShape(18.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(42.dp)
                        .padding(10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(icon, contentDescription = null)
                }
            }
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(label, style = MaterialTheme.typography.labelMedium, color = TextSecondary)
                Text(value, style = MaterialTheme.typography.titleLarge, color = TextPrimary, fontWeight = FontWeight.Bold)
            }
        }
        support?.let {
            Text(it, style = MaterialTheme.typography.bodySmall, color = TextSecondary)
        }
    }
}

@Composable
fun LavaPrimeStatusChip(
    text: String,
    modifier: Modifier = Modifier,
    tone: LavaPrimeStatusTone = LavaPrimeStatusTone.Neutral,
    icon: ImageVector? = null
) {
    Surface(
        modifier = modifier,
        color = toneContainerColor(tone),
        contentColor = toneContentColor(tone),
        shape = RoundedCornerShape(999.dp),
        border = BorderStroke(1.dp, toneContainerColor(tone))
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            icon?.let {
                Icon(it, contentDescription = null, modifier = Modifier.size(15.dp))
            }
            Text(text, style = MaterialTheme.typography.labelMedium, fontWeight = FontWeight.SemiBold)
        }
    }
}

@Composable
fun LavaPrimeActionButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    icon: ImageVector? = null,
    enabled: Boolean = true,
    style: LavaPrimeActionStyle = LavaPrimeActionStyle.Primary
) {
    val containerColor = when (style) {
        LavaPrimeActionStyle.Primary -> Mint
        LavaPrimeActionStyle.Dark -> PrimeBlue
        LavaPrimeActionStyle.Outline, LavaPrimeActionStyle.Ghost -> Color.White
    }
    val contentColor = when (style) {
        LavaPrimeActionStyle.Primary -> TextPrimary
        LavaPrimeActionStyle.Dark -> Color.White
        LavaPrimeActionStyle.Outline -> PrimeBlue
        LavaPrimeActionStyle.Ghost -> TextSecondary
    }
    val border = when (style) {
        LavaPrimeActionStyle.Primary, LavaPrimeActionStyle.Dark -> null
        LavaPrimeActionStyle.Outline -> BorderStroke(1.dp, WaterBlue)
        LavaPrimeActionStyle.Ghost -> BorderStroke(1.dp, SoftLine)
    }

    Surface(
        modifier = modifier
            .clip(RoundedCornerShape(18.dp))
            .clickable(enabled = enabled, onClick = onClick),
        color = if (enabled) containerColor else SoftLine,
        contentColor = if (enabled) contentColor else TextSecondary,
        shape = RoundedCornerShape(18.dp),
        border = border
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(54.dp)
                .padding(horizontal = 18.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            icon?.let {
                Icon(it, contentDescription = null, modifier = Modifier.size(18.dp))
                Spacer(Modifier.width(8.dp))
            }
            Text(text, fontWeight = FontWeight.SemiBold)
        }
    }
}

@Composable
fun LavaPrimeTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier,
    placeholder: String? = null,
    singleLine: Boolean = false,
    minLines: Int = 1,
    keyboardOptions: KeyboardOptions = KeyboardOptions.Default,
    visualTransformation: VisualTransformation = VisualTransformation.None,
    enabled: Boolean = true
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        label = { Text(label) },
        placeholder = placeholder?.let { { Text(it, color = TextSecondary.copy(alpha = 0.75f)) } },
        modifier = modifier.fillMaxWidth(),
        singleLine = singleLine,
        minLines = minLines,
        enabled = enabled,
        keyboardOptions = keyboardOptions,
        visualTransformation = visualTransformation,
        shape = RoundedCornerShape(18.dp),
        colors = OutlinedTextFieldDefaults.colors(
            unfocusedContainerColor = Color.White,
            focusedContainerColor = Color.White,
            unfocusedBorderColor = SoftLine,
            focusedBorderColor = WaterBlue,
            focusedLabelColor = PrimeBlueDeep,
            unfocusedLabelColor = TextSecondary,
            cursorColor = PrimeBlueDeep
        )
    )
}

@Composable
fun LavaPrimeSegmentedProfileSelector(
    selected: PerfilUsuario,
    onSelect: (PerfilUsuario) -> Unit
) {
    LavaPrimeCard(tonal = true, contentPadding = PaddingValues(8.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            LavaPrimeProfileOption(
                title = "Administrador",
                subtitle = "Visão completa",
                icon = Icons.Filled.Security,
                active = selected == PerfilUsuario.ADMINISTRADOR,
                modifier = Modifier.weight(1f)
            ) { onSelect(PerfilUsuario.ADMINISTRADOR) }
            LavaPrimeProfileOption(
                title = "Operador",
                subtitle = "Pátio e rotina",
                icon = Icons.Filled.DirectionsCar,
                active = selected == PerfilUsuario.OPERADOR,
                modifier = Modifier.weight(1f)
            ) { onSelect(PerfilUsuario.OPERADOR) }
        }
    }
}

@Composable
private fun LavaPrimeProfileOption(
    title: String,
    subtitle: String,
    icon: ImageVector,
    active: Boolean,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Surface(
        modifier = modifier
            .clip(RoundedCornerShape(18.dp))
            .clickable(onClick = onClick),
        color = if (active) PrimeBlue else Color.Transparent,
        contentColor = if (active) Color.White else PrimeBlue,
        shape = RoundedCornerShape(18.dp)
    ) {
        Column(
            modifier = Modifier.padding(horizontal = 14.dp, vertical = 16.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp),
            horizontalAlignment = Alignment.Start
        ) {
            Icon(icon, contentDescription = null, tint = if (active) WaterBlue else PrimeBlue)
            Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
            Text(
                subtitle,
                style = MaterialTheme.typography.bodySmall,
                color = if (active) Color.White.copy(alpha = 0.82f) else TextSecondary
            )
        }
    }
}

@Composable
fun LandingBadge(text: String) {
    LavaPrimeStatusChip(text = text, tone = LavaPrimeStatusTone.Info)
}

@Composable
fun HeroPanel(title: String, description: String, icon: ImageVector) {
    LavaPrimeCard(tonal = true) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Surface(
                color = PrimeBlue,
                contentColor = Color.White,
                shape = RoundedCornerShape(20.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(52.dp)
                        .padding(12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(icon, contentDescription = null)
                }
            }
            Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(title, style = MaterialTheme.typography.titleLarge, color = PrimeBlue, fontWeight = FontWeight.Bold)
                Text(description, style = MaterialTheme.typography.bodyMedium, color = TextSecondary)
            }
        }
    }
}

@Composable
fun SectionTitle(text: String, support: String? = null) {
    Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
        Text(text, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = PrimeBlue)
        support?.let { Text(it, style = MaterialTheme.typography.bodySmall, color = TextSecondary) }
    }
}

@Composable
fun ChecklistCard(title: String, items: List<String>) {
    LavaPrimeCard {
        Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = PrimeBlue)
        items.forEach { item ->
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp), verticalAlignment = Alignment.Top) {
                Icon(
                    Icons.Filled.CheckCircle,
                    contentDescription = null,
                    tint = PositiveText,
                    modifier = Modifier.size(16.dp)
                )
                Text(item, style = MaterialTheme.typography.bodySmall, color = TextSecondary)
            }
        }
    }
}

@Composable
fun EmptyState(title: String, description: String, icon: ImageVector = Icons.Filled.Info) {
    LavaPrimeCard(tonal = true) {
        Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Surface(
                color = InfoBg,
                contentColor = InfoText,
                shape = CircleShape
            ) {
                Box(
                    modifier = Modifier
                        .size(48.dp)
                        .padding(12.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(icon, contentDescription = null)
                }
            }
            Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = PrimeBlue)
            Text(description, style = MaterialTheme.typography.bodySmall, color = TextSecondary, textAlign = TextAlign.Center)
        }
    }
}

@Composable
fun ModuleScreen(title: String, description: String, icon: ImageVector) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(PageBg)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        HeroPanel(title, description, icon)
        ChecklistCard(
            title = "Paridade mobile planejada",
            items = listOf(
                "Campos verticais, legíveis e confortáveis para toque",
                "Cards no lugar de tabelas extensas",
                "Atalhos principais ao alcance do polegar",
                "Visual alinhado ao LavaPrime Web sem usar WebView",
                "Fundação pronta para receber módulo real na próxima fatia"
            )
        )
    }
}

@Composable
fun FormPreview(title: String, fields: List<String>) {
    LavaPrimeCard {
        Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = PrimeBlue)
        fields.forEach { field ->
            LavaPrimeTextField(
                value = "",
                onValueChange = {},
                label = field,
                enabled = false
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LavaPrimeTopBar(
    title: String,
    subtitle: String,
    online: Boolean,
    onMenuClick: () -> Unit
) {
    TopAppBar(
        title = {
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(title, maxLines = 1, overflow = TextOverflow.Ellipsis, fontWeight = FontWeight.Bold, color = PrimeBlue)
                Text(subtitle, style = MaterialTheme.typography.labelMedium, color = TextSecondary)
            }
        },
        navigationIcon = {
            IconButton(onClick = onMenuClick) {
                Icon(Icons.Filled.Menu, contentDescription = "Abrir menu", tint = PrimeBlue)
            }
        },
        actions = {
            LavaPrimeStatusChip(
                text = if (online) "Online" else "Offline",
                tone = if (online) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Warning,
                icon = if (online) Icons.Filled.Wifi else Icons.Filled.WifiOff
            )
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = Color.White,
            scrolledContainerColor = Color.White
        )
    )
}

@Composable
fun LavaPrimeScaffold(
    title: String,
    subtitle: String,
    online: Boolean,
    onMenuClick: () -> Unit,
    floatingActionButton: @Composable () -> Unit = {},
    content: @Composable (PaddingValues) -> Unit
) {
    Scaffold(
        containerColor = PageBg,
        topBar = { LavaPrimeTopBar(title = title, subtitle = subtitle, online = online, onMenuClick = onMenuClick) },
        floatingActionButton = floatingActionButton,
        content = content
    )
}

@Composable
fun LavaPrimeMenuItem(
    route: MobileRoute,
    selected: Boolean,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(18.dp))
            .background(if (selected) InfoBg else Color.Transparent)
            .clickable(onClick = onClick)
            .padding(horizontal = 14.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Surface(
            color = if (selected) PrimeBlue else PageBgAlt,
            contentColor = if (selected) Color.White else PrimeBlue,
            shape = RoundedCornerShape(14.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(38.dp)
                    .padding(9.dp),
                contentAlignment = Alignment.Center
            ) {
                Icon(routeIcon(route), contentDescription = null)
            }
        }
        Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(1.dp)) {
            Text(route.title, style = MaterialTheme.typography.titleSmall, fontWeight = if (selected) FontWeight.Bold else FontWeight.SemiBold, color = PrimeBlue)
            Text(route.hint, style = MaterialTheme.typography.bodySmall, color = TextSecondary)
        }
    }
}

@Composable
fun LavaPrimeDrawer(
    drawerState: androidx.compose.material3.DrawerState,
    scope: CoroutineScope,
    usuario: UsuarioEntity,
    selected: MobileRoute,
    onSelect: (MobileRoute) -> Unit,
    onLogout: () -> Unit
) {
    val routes = MobileRoute.entries.filter { usuario.perfil == PerfilUsuario.ADMINISTRADOR || !it.adminOnly }
    ModalDrawerSheet(
        modifier = Modifier
            .fillMaxWidth(0.84f)
            .widthIn(max = 320.dp),
        drawerContainerColor = Color.White
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(14.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            LavaPrimeCard(
                tonal = true,
                contentPadding = PaddingValues(16.dp)
            ) {
                Row(verticalAlignment = Alignment.Top, horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    BrandLogo(compact = true, showTagline = false)
                    Column(Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text("Menu operacional", style = MaterialTheme.typography.titleMedium, color = PrimeBlue, fontWeight = FontWeight.Bold)
                        Text("Navegação nativa com foco em rotina mobile.", style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                    }
                    IconButton(onClick = { scope.launch { drawerState.close() } }) {
                        Icon(Icons.Filled.Close, contentDescription = "Fechar menu", tint = TextSecondary)
                    }
                }
                Surface(color = Color.White, shape = RoundedCornerShape(18.dp), border = BorderStroke(1.dp, SoftLine)) {
                    Row(
                        modifier = Modifier.padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(10.dp)
                    ) {
                        Surface(
                            color = if (usuario.perfil == PerfilUsuario.ADMINISTRADOR) PrimeBlue else WaterBlue,
                            contentColor = Color.White,
                            shape = CircleShape
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(42.dp)
                                    .padding(10.dp),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(
                                    if (usuario.perfil == PerfilUsuario.ADMINISTRADOR) Icons.Filled.Security else Icons.Filled.Person,
                                    contentDescription = null
                                )
                            }
                        }
                        Column(Modifier.weight(1f)) {
                            Text(usuario.nome, style = MaterialTheme.typography.titleSmall, color = TextPrimary, fontWeight = FontWeight.SemiBold)
                            Text(perfilLabel(usuario.perfil), style = MaterialTheme.typography.bodySmall, color = TextSecondary)
                        }
                    }
                }
            }

            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                routes.forEach { route ->
                    LavaPrimeMenuItem(
                        route = route,
                        selected = selected == route
                    ) {
                        onSelect(route)
                        scope.launch { drawerState.close() }
                    }
                }
            }

            LavaPrimeActionButton(
                text = "Sair",
                onClick = onLogout,
                icon = Icons.Filled.ExitToApp,
                style = LavaPrimeActionStyle.Outline
            )
            LavaPrimeVersionFooter(modifier = Modifier.fillMaxWidth())
        }
    }
}

fun perfilLabel(perfil: PerfilUsuario): String = when (perfil) {
    PerfilUsuario.ADMINISTRADOR -> "Administrador"
    PerfilUsuario.OPERADOR -> "Operador"
}

fun statusLabel(status: AtendimentoStatus): String = when (status) {
    AtendimentoStatus.AGENDADO -> "Agendado"
    AtendimentoStatus.PATIO -> "No pátio"
    AtendimentoStatus.EXECUCAO -> "Execução"
    AtendimentoStatus.FINALIZADO -> "Finalizado"
    AtendimentoStatus.CANCELADO -> "Cancelado"
}

fun syncStatusLabel(status: SyncStatus): String = when (status) {
    SyncStatus.LOCAL_ONLY -> "Somente local"
    SyncStatus.PENDING_SYNC -> "Pendente de sincronização"
    SyncStatus.SYNCED -> "Sincronizado"
    SyncStatus.CONFLICT -> "Conflito"
}

fun syncStatusTone(status: SyncStatus): LavaPrimeStatusTone = when (status) {
    SyncStatus.LOCAL_ONLY -> LavaPrimeStatusTone.Info
    SyncStatus.PENDING_SYNC -> LavaPrimeStatusTone.Warning
    SyncStatus.SYNCED -> LavaPrimeStatusTone.Success
    SyncStatus.CONFLICT -> LavaPrimeStatusTone.Danger
}

fun routeIcon(route: MobileRoute): ImageVector = when (route) {
    MobileRoute.DASHBOARD -> Icons.Filled.Dashboard
    MobileRoute.PATIO -> Icons.Filled.DirectionsCar
    MobileRoute.AGENDAMENTOS -> Icons.Filled.Event
    MobileRoute.CLIENTES -> Icons.Filled.Group
    MobileRoute.SERVICOS -> Icons.Filled.Build
    MobileRoute.PRODUTOS -> Icons.Filled.Inventory2
    MobileRoute.FINANCEIRO -> Icons.Filled.AccountBalanceWallet
    MobileRoute.RELATORIOS -> Icons.Filled.Assessment
    MobileRoute.CONFIG -> Icons.Filled.Business
    MobileRoute.SEGURANCA -> Icons.Filled.Security
}

fun money(cents: Long): String {
    val reais = cents / 100
    val centavos = (cents % 100).toString().padStart(2, '0')
    return "R$ $reais,$centavos"
}

fun formatTimestamp(value: Long?): String {
    if (value == null) return "Ainda não sincronizado"
    return java.text.SimpleDateFormat("dd/MM HH:mm", java.util.Locale("pt", "BR")).format(java.util.Date(value))
}

private fun toneContainerColor(tone: LavaPrimeStatusTone): Color = when (tone) {
    LavaPrimeStatusTone.Neutral -> PageBgAlt
    LavaPrimeStatusTone.Info -> InfoBg
    LavaPrimeStatusTone.Success -> PositiveBg
    LavaPrimeStatusTone.Warning -> WarningBg
    LavaPrimeStatusTone.Danger -> DangerBg
}

private fun toneContentColor(tone: LavaPrimeStatusTone): Color = when (tone) {
    LavaPrimeStatusTone.Neutral -> PrimeBlue
    LavaPrimeStatusTone.Info -> InfoText
    LavaPrimeStatusTone.Success -> PositiveText
    LavaPrimeStatusTone.Warning -> WarningText
    LavaPrimeStatusTone.Danger -> DangerText
}
