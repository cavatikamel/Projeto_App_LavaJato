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
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBalanceWallet
import androidx.compose.material.icons.filled.Assessment
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Business
import androidx.compose.material.icons.filled.Category
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Dashboard
import androidx.compose.material.icons.filled.Description
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Event
import androidx.compose.material.icons.filled.ExitToApp
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material.icons.filled.Forum
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.ManageAccounts
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PointOfSale
import androidx.compose.material.icons.filled.ReceiptLong
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.Wifi
import androidx.compose.material.icons.filled.WifiOff
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DrawerState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalDrawerSheet
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.BuildConfig
import br.com.primyo.lavaprime.R
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.SyncStatus
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.ui.navigation.MobileRoute
import br.com.primyo.lavaprime.ui.navigation.MobileRouteGroup
import br.com.primyo.lavaprime.ui.theme.DangerBg
import br.com.primyo.lavaprime.ui.theme.DangerText
import br.com.primyo.lavaprime.ui.theme.InfoBg
import br.com.primyo.lavaprime.ui.theme.InfoText
import br.com.primyo.lavaprime.ui.theme.LavaPrimeElevation
import br.com.primyo.lavaprime.ui.theme.LavaPrimeRadii
import br.com.primyo.lavaprime.ui.theme.LavaPrimeSpacing
import br.com.primyo.lavaprime.ui.theme.Mint
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.theme.PageBgAlt
import br.com.primyo.lavaprime.ui.theme.PositiveBg
import br.com.primyo.lavaprime.ui.theme.PositiveText
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.PrimeBlueDeep
import br.com.primyo.lavaprime.ui.theme.SoftLine
import br.com.primyo.lavaprime.ui.theme.SurfaceMuted
import br.com.primyo.lavaprime.ui.theme.TextMuted
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
    if (compact) {
        Image(
            painter = painterResource(R.drawable.lavaprime_app_icon),
            contentDescription = "Logo LavaPrime",
            modifier = modifier.size(74.dp),
            contentScale = ContentScale.Fit
        )
        return
    }

    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.xs)
    ) {
        Image(
            painter = painterResource(R.drawable.lavaprime_logo_primary),
            contentDescription = "Logo LavaPrime",
            modifier = Modifier
                .fillMaxWidth()
                .height(72.dp),
            contentScale = ContentScale.Fit
        )
        if (showTagline) {
            Text(
                text = "Gestão inteligente para sua operação de lavagem.",
                style = MaterialTheme.typography.bodySmall,
                color = TextSecondary
            )
        }
    }
}

@Composable
fun LavaPrimeVersionFooter(modifier: Modifier = Modifier) {
    Text(
        text = BuildConfig.VERSION_NAME,
        modifier = modifier,
        style = MaterialTheme.typography.labelSmall,
        color = TextMuted,
        textAlign = TextAlign.Center
    )
}

@Composable
fun LavaPrimeCard(
    modifier: Modifier = Modifier,
    tonal: Boolean = false,
    contentPadding: PaddingValues = PaddingValues(LavaPrimeSpacing.lg),
    content: @Composable ColumnScope.() -> Unit
) {
    Card(
        modifier = modifier,
        colors = CardDefaults.cardColors(containerColor = if (tonal) SurfaceMuted else Color.White),
        shape = RoundedCornerShape(LavaPrimeRadii.large),
        border = BorderStroke(1.dp, SoftLine),
        elevation = CardDefaults.cardElevation(defaultElevation = LavaPrimeElevation.soft)
    ) {
        Column(
            modifier = Modifier.padding(contentPadding),
            verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm),
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
    tone: LavaPrimeStatusTone = LavaPrimeStatusTone.Info,
    onClick: (() -> Unit)? = null
) {
    LavaPrimeCard(
        modifier = modifier
            .widthIn(min = 168.dp)
            .let { base ->
                if (onClick != null) {
                    base
                        .clip(RoundedCornerShape(LavaPrimeRadii.large))
                        .clickable(onClick = onClick)
                } else {
                    base
                }
            },
        tonal = true,
        contentPadding = PaddingValues(LavaPrimeSpacing.md)
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                color = toneContainerColor(tone),
                contentColor = toneContentColor(tone),
                shape = RoundedCornerShape(LavaPrimeRadii.medium)
            ) {
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .padding(10.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(icon, contentDescription = null)
                }
            }
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text(label, style = MaterialTheme.typography.labelMedium, color = TextSecondary)
                Text(
                    value,
                    style = MaterialTheme.typography.titleLarge,
                    color = TextPrimary,
                    fontWeight = FontWeight.Bold
                )
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
        shape = RoundedCornerShape(LavaPrimeRadii.pill),
        border = BorderStroke(1.dp, toneBorderColor(tone))
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(6.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            icon?.let {
                Icon(it, contentDescription = null, modifier = Modifier.size(15.dp))
            }
            Text(
                text = text,
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.SemiBold
            )
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
    val content: @Composable () -> Unit = {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.xs)
        ) {
            icon?.let { Icon(it, contentDescription = null, modifier = Modifier.size(18.dp)) }
            Text(text = text, fontWeight = FontWeight.SemiBold)
        }
    }

    when (style) {
        LavaPrimeActionStyle.Primary -> {
            Button(
                onClick = onClick,
                modifier = modifier.height(54.dp),
                enabled = enabled,
                shape = RoundedCornerShape(LavaPrimeRadii.medium),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Mint,
                    contentColor = TextPrimary,
                    disabledContainerColor = SoftLine,
                    disabledContentColor = TextMuted
                ),
                contentPadding = PaddingValues(horizontal = LavaPrimeSpacing.lg)
            ) { content() }
        }

        LavaPrimeActionStyle.Dark -> {
            Button(
                onClick = onClick,
                modifier = modifier.height(54.dp),
                enabled = enabled,
                shape = RoundedCornerShape(LavaPrimeRadii.medium),
                colors = ButtonDefaults.buttonColors(
                    containerColor = PrimeBlue,
                    contentColor = Color.White,
                    disabledContainerColor = SoftLine,
                    disabledContentColor = TextMuted
                ),
                contentPadding = PaddingValues(horizontal = LavaPrimeSpacing.lg)
            ) { content() }
        }

        LavaPrimeActionStyle.Outline -> {
            OutlinedButton(
                onClick = onClick,
                modifier = modifier.height(54.dp),
                enabled = enabled,
                shape = RoundedCornerShape(LavaPrimeRadii.medium),
                border = BorderStroke(1.dp, SoftLine),
                colors = ButtonDefaults.outlinedButtonColors(
                    contentColor = PrimeBlue,
                    disabledContentColor = TextMuted
                ),
                contentPadding = PaddingValues(horizontal = LavaPrimeSpacing.lg)
            ) { content() }
        }

        LavaPrimeActionStyle.Ghost -> {
            TextButton(
                onClick = onClick,
                modifier = modifier.height(48.dp),
                enabled = enabled,
                shape = RoundedCornerShape(LavaPrimeRadii.medium),
                colors = ButtonDefaults.textButtonColors(
                    contentColor = PrimeBlue,
                    disabledContentColor = TextMuted
                ),
                contentPadding = PaddingValues(horizontal = LavaPrimeSpacing.md)
            ) { content() }
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
        modifier = modifier.fillMaxWidth(),
        label = { Text(label) },
        placeholder = placeholder?.let { { Text(it, color = TextMuted) } },
        singleLine = singleLine,
        minLines = minLines,
        enabled = enabled,
        keyboardOptions = keyboardOptions,
        visualTransformation = visualTransformation,
        shape = RoundedCornerShape(LavaPrimeRadii.medium),
        colors = OutlinedTextFieldDefaults.colors(
            unfocusedContainerColor = Color.White,
            focusedContainerColor = Color.White,
            disabledContainerColor = SurfaceMuted,
            unfocusedBorderColor = SoftLine,
            focusedBorderColor = WaterBlue,
            disabledBorderColor = SoftLine,
            focusedLabelColor = PrimeBlue,
            unfocusedLabelColor = TextSecondary,
            focusedTextColor = TextPrimary,
            unfocusedTextColor = TextPrimary,
            cursorColor = WaterBlue
        )
    )
}

@Composable
fun LavaPrimeSegmentedProfileSelector(
    selected: PerfilUsuario,
    onSelect: (PerfilUsuario) -> Unit
) {
    LavaPrimeCard(tonal = true, contentPadding = PaddingValues(LavaPrimeSpacing.xs)) {
        Row(horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.xs)) {
            LavaPrimeProfileOption(
                title = "Administrador",
                icon = Icons.Filled.Security,
                active = selected == PerfilUsuario.ADMINISTRADOR,
                modifier = Modifier.weight(1f)
            ) { onSelect(PerfilUsuario.ADMINISTRADOR) }

            LavaPrimeProfileOption(
                title = "Operador",
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
    icon: ImageVector,
    active: Boolean,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Surface(
        modifier = modifier
            .clip(RoundedCornerShape(LavaPrimeRadii.medium))
            .clickable(onClick = onClick),
        color = if (active) PrimeBlue else Color.White,
        contentColor = if (active) Color.White else PrimeBlue,
        shape = RoundedCornerShape(LavaPrimeRadii.medium),
        border = BorderStroke(1.dp, if (active) PrimeBlue else SoftLine)
    ) {
        Column(
            modifier = Modifier.padding(horizontal = LavaPrimeSpacing.md, vertical = LavaPrimeSpacing.md),
            verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.xs)
        ) {
            Icon(
                icon,
                contentDescription = null,
                tint = if (active) WaterBlue else PrimeBlue
            )
            Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
        }
    }
}

@Composable
fun LandingBadge(text: String) {
    LavaPrimeStatusChip(text = text, tone = LavaPrimeStatusTone.Info)
}

@Composable
fun HeroPanel(
    title: String,
    description: String,
    icon: ImageVector,
    modifier: Modifier = Modifier
) {
    LavaPrimeCard(
        modifier = modifier.fillMaxWidth(),
        tonal = true,
        contentPadding = PaddingValues(LavaPrimeSpacing.lg)
    ) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.md),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                color = PrimeBlue,
                contentColor = Color.White,
                shape = RoundedCornerShape(LavaPrimeRadii.large)
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
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleLarge,
                    color = TextPrimary,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
            }
        }
    }
}

@Composable
fun SectionTitle(text: String, support: String? = null) {
    Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
        Text(
            text = text,
            style = MaterialTheme.typography.titleMedium,
            color = PrimeBlue,
            fontWeight = FontWeight.Bold
        )
        support?.let {
            Text(
                text = it,
                style = MaterialTheme.typography.bodySmall,
                color = TextSecondary
            )
        }
    }
}

@Composable
fun ChecklistCard(title: String, items: List<String>) {
    LavaPrimeCard {
        Text(
            text = title,
            style = MaterialTheme.typography.titleSmall,
            color = PrimeBlue,
            fontWeight = FontWeight.SemiBold
        )
        items.forEach { item ->
            Row(
                horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.xs),
                verticalAlignment = Alignment.Top
            ) {
                Icon(
                    Icons.Filled.CheckCircle,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp),
                    tint = PositiveText
                )
                Text(item, style = MaterialTheme.typography.bodySmall, color = TextSecondary)
            }
        }
    }
}

@Composable
fun EmptyState(
    title: String,
    description: String,
    icon: ImageVector = Icons.Filled.Info
) {
    LavaPrimeCard(tonal = true) {
        Column(
            modifier = Modifier.fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm)
        ) {
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
            Text(
                text = title,
                style = MaterialTheme.typography.titleSmall,
                color = PrimeBlue,
                fontWeight = FontWeight.SemiBold,
                textAlign = TextAlign.Center
            )
            Text(
                text = description,
                style = MaterialTheme.typography.bodySmall,
                color = TextSecondary,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
fun ModuleScreen(title: String, description: String, icon: ImageVector) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(PageBg)
            .padding(LavaPrimeSpacing.md),
        verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.md)
    ) {
        HeroPanel(title = title, description = description, icon = icon)
        ChecklistCard(
            title = "Base pronta para evolução",
            items = listOf(
                "Tema e componentes oficiais do LavaPrime aplicados",
                "Leitura mobile-first com cards e listas",
                "Textos e estados visuais alinhados ao Web",
                "Área preparada para receber fluxo real nas próximas fases"
            )
        )
        EmptyState(
            title = "Módulo em fundação controlada",
            description = "A identidade visual desta área já faz parte do app. A regra de negócio entra na fase funcional correspondente.",
            icon = icon
        )
    }
}

@Composable
fun FormPreview(title: String, fields: List<String>) {
    LavaPrimeCard {
        Text(
            text = title,
            style = MaterialTheme.typography.titleSmall,
            color = PrimeBlue,
            fontWeight = FontWeight.SemiBold
        )
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
    pendingSyncCount: Int,
    onMenuClick: () -> Unit,
    onSyncClick: (() -> Unit)? = null
) {
    TopAppBar(
        title = {
            Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
                Text(
                    text = title,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    fontWeight = FontWeight.Bold,
                    color = PrimeBlue
                )
                Text(
                    text = subtitle,
                    style = MaterialTheme.typography.labelMedium,
                    color = TextSecondary,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
        },
        navigationIcon = {
            IconButton(onClick = onMenuClick) {
                Icon(Icons.Filled.Menu, contentDescription = "Abrir menu", tint = PrimeBlue)
            }
        },
        actions = {
            Row(
                modifier = Modifier.padding(end = LavaPrimeSpacing.sm),
                horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.xs),
                verticalAlignment = Alignment.CenterVertically
            ) {
                LavaPrimeStatusChip(
                    text = if (online) "Online" else "Offline",
                    tone = if (online) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Warning,
                    icon = if (online) Icons.Filled.Wifi else Icons.Filled.WifiOff
                )
                LavaPrimeStatusChip(
                    text = if (pendingSyncCount > 0) "$pendingSyncCount pendência(s)" else "Sync em dia",
                    tone = if (pendingSyncCount > 0) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info,
                    icon = Icons.Filled.Sync,
                    modifier = if (onSyncClick != null) {
                        Modifier
                            .clip(RoundedCornerShape(LavaPrimeRadii.pill))
                            .clickable(onClick = onSyncClick)
                    } else {
                        Modifier
                    }
                )
            }
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
    pendingSyncCount: Int,
    onMenuClick: () -> Unit,
    onSyncClick: (() -> Unit)? = null,
    floatingActionButton: @Composable () -> Unit = {},
    content: @Composable (PaddingValues) -> Unit
) {
    Scaffold(
        containerColor = PageBg,
        topBar = {
            LavaPrimeTopBar(
                title = title,
                subtitle = subtitle,
                online = online,
                pendingSyncCount = pendingSyncCount,
                onMenuClick = onMenuClick,
                onSyncClick = onSyncClick
            )
        },
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
            .clip(RoundedCornerShape(LavaPrimeRadii.medium))
            .background(if (selected) InfoBg else Color.Transparent)
            .clickable(onClick = onClick)
            .padding(horizontal = LavaPrimeSpacing.md, vertical = LavaPrimeSpacing.sm),
        horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Surface(
            color = if (selected) PrimeBlue else PageBgAlt,
            contentColor = if (selected) Color.White else PrimeBlue,
            shape = RoundedCornerShape(LavaPrimeRadii.medium)
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .padding(9.dp),
                contentAlignment = Alignment.Center
            ) {
                Icon(routeIcon(route), contentDescription = null)
            }
        }
        Column(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(1.dp)
        ) {
            Text(
                text = route.title,
                style = MaterialTheme.typography.titleSmall,
                color = TextPrimary,
                fontWeight = if (selected) FontWeight.Bold else FontWeight.SemiBold,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = route.hint,
                style = MaterialTheme.typography.bodySmall,
                color = TextSecondary,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
        }
    }
}

@Composable
private fun LavaPrimeDrawerGroup(
    group: MobileRouteGroup,
    routes: List<MobileRoute>,
    selected: MobileRoute,
    expanded: Boolean,
    onToggle: () -> Unit,
    onRouteClick: (MobileRoute) -> Unit
) {
    LavaPrimeCard(
        tonal = expanded || selected.group == group,
        contentPadding = PaddingValues(LavaPrimeSpacing.sm)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(LavaPrimeRadii.medium))
                .clickable(onClick = onToggle)
                .padding(horizontal = LavaPrimeSpacing.sm, vertical = LavaPrimeSpacing.sm),
            horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                color = if (selected.group == group) PrimeBlue else PageBgAlt,
                contentColor = if (selected.group == group) Color.White else PrimeBlue,
                shape = RoundedCornerShape(LavaPrimeRadii.medium)
            ) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .padding(9.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(groupIcon(group), contentDescription = null)
                }
            }
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Text(
                    text = group.title,
                    style = MaterialTheme.typography.titleSmall,
                    color = TextPrimary,
                    fontWeight = FontWeight.SemiBold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = group.hint,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
            }
            Icon(
                imageVector = if (expanded) Icons.Filled.ExpandMore else Icons.Filled.ChevronRight,
                contentDescription = if (expanded) "Recolher submenu" else "Expandir submenu",
                tint = TextSecondary
            )
        }

        if (expanded) {
            Column(
                modifier = Modifier,
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                routes.forEach { route ->
                    LavaPrimeMenuItem(
                        route = route,
                        selected = selected == route
                    ) {
                        onRouteClick(route)
                    }
                }
            }
        }
    }
}

@Composable
fun LavaPrimeDrawer(
    drawerState: DrawerState,
    scope: CoroutineScope,
    usuario: UsuarioEntity,
    selected: MobileRoute,
    onSelect: (MobileRoute) -> Unit,
    onLogout: () -> Unit
) {
    val routes = MobileRoute.entries.filter { usuario.perfil == PerfilUsuario.ADMINISTRADOR || !it.adminOnly }
    val groupedRoutes = routes.groupBy { it.group }
    val expandedGroups = remember {
        mutableStateMapOf<MobileRouteGroup, Boolean>().apply {
            MobileRouteGroup.entries.forEach { put(it, false) }
        }
    }

    LaunchedEffect(selected, routes) {
        groupedRoutes.keys.forEach { group ->
            if (selected.group == group) {
                expandedGroups[group] = true
            }
        }
    }

    ModalDrawerSheet(
        modifier = Modifier
            .fillMaxWidth(0.84f)
            .widthIn(max = 324.dp),
        drawerContainerColor = Color.White
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(LavaPrimeSpacing.sm),
            verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm)
        ) {
            LavaPrimeCard(tonal = true, contentPadding = PaddingValues(LavaPrimeSpacing.md)) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm),
                    verticalAlignment = Alignment.Top
                ) {
                    BrandLogo(compact = true, showTagline = false)
                    Column(
                        modifier = Modifier.weight(1f),
                        verticalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Text(
                            text = "Menu operacional",
                            style = MaterialTheme.typography.titleMedium,
                            color = PrimeBlue,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Navegação nativa com foco em rotina mobile.",
                            style = MaterialTheme.typography.bodySmall,
                            color = TextSecondary
                        )
                    }
                    IconButton(onClick = { scope.launch { drawerState.close() } }) {
                        Icon(Icons.Filled.Close, contentDescription = "Fechar menu", tint = TextSecondary)
                    }
                }

                Surface(
                    color = Color.White,
                    border = BorderStroke(1.dp, SoftLine),
                    shape = RoundedCornerShape(LavaPrimeRadii.large)
                ) {
                    Row(
                        modifier = Modifier.padding(LavaPrimeSpacing.sm),
                        horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm),
                        verticalAlignment = Alignment.CenterVertically
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
                                    imageVector = if (usuario.perfil == PerfilUsuario.ADMINISTRADOR) {
                                        Icons.Filled.Security
                                    } else {
                                        Icons.Filled.Person
                                    },
                                    contentDescription = null
                                )
                            }
                        }
                        Column(Modifier.weight(1f)) {
                            Text(
                                text = usuario.nome,
                                style = MaterialTheme.typography.titleSmall,
                                color = TextPrimary,
                                fontWeight = FontWeight.SemiBold
                            )
                            Text(
                                text = perfilLabel(usuario.perfil),
                                style = MaterialTheme.typography.bodySmall,
                                color = TextSecondary
                            )
                        }
                    }
                }
            }

            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                MobileRouteGroup.entries.forEach { group ->
                    val groupRoutes = groupedRoutes[group].orEmpty()
                    if (groupRoutes.isNotEmpty()) {
                        LavaPrimeDrawerGroup(
                            group = group,
                            routes = groupRoutes,
                            selected = selected,
                            expanded = expandedGroups[group] == true,
                            onToggle = { expandedGroups[group] = expandedGroups[group] != true },
                            onRouteClick = { route ->
                                onSelect(route)
                                scope.launch { drawerState.close() }
                            }
                        )
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
    MobileRoute.QUOTES -> Icons.Filled.ReceiptLong
    MobileRoute.CADASTROS -> Icons.Filled.Category
    MobileRoute.CLIENTES -> Icons.Filled.Group
    MobileRoute.VEICULOS -> Icons.Filled.DirectionsCar
    MobileRoute.OPERADORES -> Icons.Filled.ManageAccounts
    MobileRoute.SERVICOS -> Icons.Filled.Build
    MobileRoute.PRODUTOS -> Icons.Filled.Inventory2
    MobileRoute.INSUMOS -> Icons.Filled.LocalShipping
    MobileRoute.INVENTARIO -> Icons.Filled.Inventory2
    MobileRoute.VENDAS -> Icons.Filled.PointOfSale
    MobileRoute.FINANCEIRO -> Icons.Filled.AccountBalanceWallet
    MobileRoute.OPEN_PAYMENTS -> Icons.Filled.ReceiptLong
    MobileRoute.CASHFLOW -> Icons.Filled.SwapHoriz
    MobileRoute.PAYABLES -> Icons.Filled.Description
    MobileRoute.INVOICES -> Icons.Filled.ReceiptLong
    MobileRoute.DOCUMENTOS -> Icons.Filled.Description
    MobileRoute.RELATORIOS -> Icons.Filled.Assessment
    MobileRoute.BUSINESS -> Icons.Filled.Business
    MobileRoute.BUSINESS_FINANCE -> Icons.Filled.Settings
    MobileRoute.BUSINESS_SOCIAL -> Icons.Filled.Forum
    MobileRoute.BUSINESS_MESSAGES -> Icons.Filled.Forum
    MobileRoute.SEGURANCA -> Icons.Filled.Security
}

private fun groupIcon(group: MobileRouteGroup): ImageVector = when (group) {
    MobileRouteGroup.OPERACAO -> Icons.Filled.Dashboard
    MobileRouteGroup.CADASTROS -> Icons.Filled.Category
    MobileRouteGroup.ESTOQUE -> Icons.Filled.ShoppingCart
    MobileRouteGroup.FINANCEIRO -> Icons.Filled.AccountBalanceWallet
    MobileRouteGroup.NEGOCIO -> Icons.Filled.Business
    MobileRouteGroup.SISTEMA -> Icons.Filled.Security
}

fun money(cents: Long): String {
    val reais = cents / 100
    val centavos = (cents % 100).toString().padStart(2, '0')
    return "R$ $reais,$centavos"
}

fun formatTimestamp(value: Long?): String {
    if (value == null) return "Ainda não sincronizado"
    return java.text.SimpleDateFormat("dd/MM HH:mm", java.util.Locale("pt", "BR"))
        .format(java.util.Date(value))
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

private fun toneBorderColor(tone: LavaPrimeStatusTone): Color = when (tone) {
    LavaPrimeStatusTone.Neutral -> SoftLine
    LavaPrimeStatusTone.Info -> WaterBlue.copy(alpha = 0.24f)
    LavaPrimeStatusTone.Success -> PositiveText.copy(alpha = 0.16f)
    LavaPrimeStatusTone.Warning -> WarningText.copy(alpha = 0.18f)
    LavaPrimeStatusTone.Danger -> DangerText.copy(alpha = 0.18f)
}
