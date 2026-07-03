package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.AttachMoney
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.ui.components.BrandLogo
import br.com.primyo.lavaprime.ui.components.LandingBadge
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeSegmentedProfileSelector
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.LavaPrimeVersionFooter
import br.com.primyo.lavaprime.ui.components.perfilLabel
import br.com.primyo.lavaprime.ui.theme.Aqua
import br.com.primyo.lavaprime.ui.theme.InfoBg
import br.com.primyo.lavaprime.ui.theme.LavaPrimeSpacing
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.PrimeBlueDeep
import br.com.primyo.lavaprime.ui.theme.TextSecondary
import br.com.primyo.lavaprime.ui.theme.WaterBlue
import br.com.primyo.lavaprime.ui.viewmodel.BootstrapStepState

@Composable
fun SplashLavaPrime(
    title: String,
    message: String,
    localDbState: BootstrapStepState,
    localDbMessage: String,
    sessionState: BootstrapStepState,
    sessionMessage: String,
    routeState: BootstrapStepState,
    routeMessage: String
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(PrimeBlueDeep, PrimeBlue, Aqua))),
        contentAlignment = Alignment.Center
    ) {
        ColumnCenterBlock {
            BrandLogo(compact = true, showTagline = false, modifier = Modifier.size(108.dp))
            Text(
                text = "LavaPrime",
                style = MaterialTheme.typography.headlineLarge,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = title,
                style = MaterialTheme.typography.titleLarge,
                color = Color.White,
                textAlign = TextAlign.Center
            )
            Text(
                text = message,
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White.copy(alpha = 0.9f),
                textAlign = TextAlign.Center
            )

            LavaPrimeCard(
                tonal = true,
                contentPadding = PaddingValues(LavaPrimeSpacing.lg)
            ) {
                Text(
                    text = "Preload inicial",
                    style = MaterialTheme.typography.titleMedium,
                    color = PrimeBlue,
                    fontWeight = FontWeight.Bold
                )
                StatusLine("Banco local", localDbMessage, localDbState)
                StatusLine("Sessão local", sessionMessage, sessionState)
                StatusLine("Entrada inicial", routeMessage, routeState)
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun InitialScreen(
    onAccess: () -> Unit,
    bootstrapSummary: String?,
    localDbReady: Boolean,
    sessionRestored: Boolean,
    bootstrapError: String?,
    onRetry: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(PageBg)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(232.dp)
                .background(Brush.verticalGradient(listOf(PrimeBlueDeep, PrimeBlue, WaterBlue)))
        )

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .statusBarsPadding()
                .navigationBarsPadding(),
            contentPadding = PaddingValues(
                start = LavaPrimeSpacing.lg,
                end = LavaPrimeSpacing.lg,
                top = LavaPrimeSpacing.md,
                bottom = LavaPrimeSpacing.lg
            ),
            verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.md)
        ) {
            item {
                LavaPrimeCard(contentPadding = PaddingValues(LavaPrimeSpacing.xl)) {
                    BrandLogo(showTagline = true)
                    Text(
                        text = "Seu pátio no celular, com identidade oficial e leitura rápida.",
                        style = MaterialTheme.typography.headlineSmall,
                        color = PrimeBlue,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = bootstrapSummary ?: "Base nativa pronta para a rotina mobile do LavaPrime.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondary
                    )
                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        LandingBadge(if (localDbReady) "Banco local pronto" else "Banco local pendente")
                        LandingBadge(if (sessionRestored) "Sessão restaurável" else "Novo login")
                        LandingBadge("Mobile native")
                    }

                    bootstrapError?.let {
                        LavaPrimeCard(
                            tonal = true,
                            contentPadding = PaddingValues(LavaPrimeSpacing.md)
                        ) {
                            Text(
                                text = it,
                                style = MaterialTheme.typography.bodySmall,
                                color = PrimeBlue
                            )
                        }
                    }

                    LavaPrimeActionButton(
                        text = "Ir para o login",
                        onClick = onAccess
                    )
                    if (bootstrapError != null) {
                        LavaPrimeActionButton(
                            text = "Tentar novamente",
                            onClick = onRetry,
                            style = LavaPrimeActionStyle.Outline
                        )
                    }
                }
            }

            item {
                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    WebLikeFeature("Pátio", "Fila operacional com estados claros", Icons.Filled.DirectionsCar)
                    WebLikeFeature("Gestão", "Indicadores compactos e úteis", Icons.Filled.AttachMoney)
                    WebLikeFeature("Alertas", "Sinais visuais para risco e atenção", Icons.Filled.WarningAmber)
                    WebLikeFeature("Sync", "Estado local pronto para sincronização futura", Icons.Filled.Sync)
                }
            }

            item {
                LavaPrimeVersionFooter(modifier = Modifier.fillMaxWidth())
            }
        }
    }
}

@Composable
fun LoginScreen(
    perfil: PerfilUsuario,
    email: String,
    senha: String,
    erro: String?,
    onBack: () -> Unit,
    onSelectPerfil: (PerfilUsuario) -> Unit,
    onEmailChange: (String) -> Unit,
    onSenhaChange: (String) -> Unit,
    onLogin: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(PageBg)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(220.dp)
                .background(Brush.verticalGradient(listOf(PrimeBlueDeep, PrimeBlue, WaterBlue)))
        )

        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .statusBarsPadding()
                .navigationBarsPadding()
                .imePadding(),
            contentPadding = PaddingValues(
                start = LavaPrimeSpacing.lg,
                end = LavaPrimeSpacing.lg,
                top = LavaPrimeSpacing.md,
                bottom = LavaPrimeSpacing.lg
            ),
            verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.md)
        ) {
            item {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    LavaPrimeActionButton(
                        text = "Voltar",
                        onClick = onBack,
                        icon = Icons.AutoMirrored.Filled.ArrowBack,
                        style = LavaPrimeActionStyle.Ghost
                    )
                }
            }

            item {
                LavaPrimeCard(contentPadding = PaddingValues(LavaPrimeSpacing.xl)) {
                    BrandLogo(showTagline = false)
                    Text(
                        text = "Entrar no sistema",
                        style = MaterialTheme.typography.headlineSmall,
                        color = PrimeBlue,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "Escolha o perfil e continue na rotina do lava jato.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextSecondary
                    )

                    LavaPrimeSegmentedProfileSelector(
                        selected = perfil,
                        onSelect = onSelectPerfil
                    )

                    LavaPrimeTextField(
                        value = email,
                        onValueChange = onEmailChange,
                        label = "E-mail",
                        singleLine = true,
                        placeholder = "admin@lavaprime.local",
                        keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(
                            keyboardType = KeyboardType.Email
                        )
                    )

                    LavaPrimeTextField(
                        value = senha,
                        onValueChange = onSenhaChange,
                        label = "Senha",
                        singleLine = true,
                        placeholder = "Digite sua senha",
                        visualTransformation = PasswordVisualTransformation(),
                        keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(
                            keyboardType = KeyboardType.Password
                        )
                    )

                    erro?.let {
                        LavaPrimeCard(
                            tonal = true,
                            contentPadding = PaddingValues(LavaPrimeSpacing.md)
                        ) {
                            Text(
                                text = it,
                                style = MaterialTheme.typography.bodySmall,
                                color = PrimeBlue
                            )
                        }
                    }

                    LavaPrimeActionButton(
                        text = "Entrar como ${perfilLabel(perfil)}",
                        onClick = onLogin,
                        icon = if (perfil == PerfilUsuario.ADMINISTRADOR) {
                            Icons.Filled.Security
                        } else {
                            Icons.Filled.DirectionsCar
                        }
                    )

                    Text(
                        text = "Administrador: visão gerencial. Operador: foco em pátio, clientes e veículos.",
                        style = MaterialTheme.typography.bodySmall,
                        color = TextSecondary,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }

            item {
                LavaPrimeVersionFooter(modifier = Modifier.fillMaxWidth())
            }
        }
    }
}

@Composable
private fun StatusLine(
    label: String,
    description: String,
    state: BootstrapStepState
) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.sm),
        verticalAlignment = Alignment.CenterVertically
    ) {
        LavaPrimeStatusChip(
            text = label,
            tone = when (state) {
                BootstrapStepState.PENDING -> LavaPrimeStatusTone.Info
                BootstrapStepState.READY -> LavaPrimeStatusTone.Success
                BootstrapStepState.MISSING -> LavaPrimeStatusTone.Warning
                BootstrapStepState.FAILED -> LavaPrimeStatusTone.Danger
            }
        )
        Text(
            text = description,
            style = MaterialTheme.typography.bodySmall,
            color = TextSecondary
        )
    }
}

@Composable
private fun WebLikeFeature(
    title: String,
    subtitle: String,
    icon: ImageVector
) {
    LavaPrimeCard(
        modifier = Modifier
            .fillMaxWidth()
            .height(132.dp),
        tonal = true,
        contentPadding = PaddingValues(LavaPrimeSpacing.md)
    ) {
        Box(
            modifier = Modifier
                .size(44.dp)
                .background(InfoBg, RoundedCornerShape(16.dp))
                .padding(10.dp),
            contentAlignment = Alignment.Center
        ) {
            Icon(icon, contentDescription = null, tint = WaterBlue)
        }
        Text(
            text = title,
            style = MaterialTheme.typography.titleSmall,
            color = PrimeBlue,
            fontWeight = FontWeight.SemiBold
        )
        Text(
            text = subtitle,
            style = MaterialTheme.typography.bodySmall,
            color = TextSecondary
        )
    }
}

@Composable
private fun ColumnCenterBlock(content: @Composable ColumnScope.() -> Unit) {
    Column(
        modifier = Modifier
            .statusBarsPadding()
            .navigationBarsPadding()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.md),
        content = content
    )
}
