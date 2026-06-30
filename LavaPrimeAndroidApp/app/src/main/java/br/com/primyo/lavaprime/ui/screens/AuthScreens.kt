package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AlternateEmail
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.AttachMoney
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.Security
import androidx.compose.material.icons.filled.Sync
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
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
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.LavaPrimeVersionFooter
import br.com.primyo.lavaprime.ui.components.perfilLabel
import br.com.primyo.lavaprime.ui.theme.Aqua
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.PrimeBlueDeep
import br.com.primyo.lavaprime.ui.theme.TextSecondary
import br.com.primyo.lavaprime.ui.theme.WaterBlue

@Composable
fun SplashLavaPrime() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(PrimeBlueDeep, PrimeBlue, WaterBlue))),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .statusBarsPadding()
                .navigationBarsPadding()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            BrandLogo(modifier = Modifier.size(110.dp), compact = true, showTagline = false)
            Text(
                "LavaPrime",
                style = MaterialTheme.typography.headlineLarge,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
            Text(
                "Gestão inteligente para sua operação de lavagem.",
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White.copy(alpha = 0.88f),
                textAlign = TextAlign.Center
            )
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun InitialScreen(onAccess: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(PageBg)
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(260.dp)
                .background(Brush.verticalGradient(listOf(PrimeBlueDeep, PrimeBlue, Aqua)))
        )
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .statusBarsPadding()
                .navigationBarsPadding(),
            contentPadding = PaddingValues(start = 20.dp, end = 20.dp, top = 18.dp, bottom = 20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                LavaPrimeCard(
                    modifier = Modifier.fillMaxWidth(),
                    contentPadding = PaddingValues(22.dp)
                ) {
                    BrandLogo(showTagline = false)
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text(
                            "Sua operação do pátio no celular, com identidade LavaPrime.",
                            style = MaterialTheme.typography.headlineSmall,
                            fontWeight = FontWeight.Bold,
                            color = PrimeBlue
                        )
                        Text(
                            "Uma experiência nativa, limpa e profissional para a rotina mobile do lava jato.",
                            style = MaterialTheme.typography.bodyMedium,
                            color = TextSecondary
                        )
                    }
                    FlowRow(
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        verticalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        LandingBadge("Offline-first")
                        LandingBadge("Supabase-ready")
                        LandingBadge("Mobile native")
                    }
                    LavaPrimeActionButton(
                        text = "Acessar LavaPrime",
                        onClick = onAccess
                    )
                }
            }
            item {
                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    WebLikeFeature("Pátio", "Cards operacionais e status claros", Icons.Filled.DirectionsCar)
                    WebLikeFeature("Gestão", "Indicadores compactos e legíveis", Icons.Filled.AttachMoney)
                    WebLikeFeature("Alertas", "Sinais visuais para risco e atenção", Icons.Filled.WarningAmber)
                    WebLikeFeature("Sync", "Operação local com base pronta para integração", Icons.Filled.Sync)
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
                .height(230.dp)
                .background(Brush.verticalGradient(listOf(PrimeBlueDeep, PrimeBlue, WaterBlue)))
        )
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .statusBarsPadding()
                .navigationBarsPadding()
                .imePadding(),
            contentPadding = PaddingValues(start = 20.dp, end = 20.dp, top = 16.dp, bottom = 18.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    LavaPrimeActionButton(
                        text = "Voltar",
                        onClick = onBack,
                        icon = Icons.Filled.ArrowBack,
                        style = LavaPrimeActionStyle.Ghost,
                        modifier = Modifier.width(120.dp)
                    )
                    Spacer(Modifier.weight(1f))
                    Text(
                        "Acesso local seguro",
                        style = MaterialTheme.typography.labelMedium,
                        color = Color.White.copy(alpha = 0.88f)
                    )
                }
            }
            item {
                ElevatedCard(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(28.dp),
                    colors = CardDefaults.elevatedCardColors(containerColor = Color.White)
                ) {
                    Column(
                        modifier = Modifier.padding(horizontal = 20.dp, vertical = 22.dp),
                        verticalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        BrandLogo(showTagline = false)
                        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                            Text(
                                "Entrar no sistema",
                                style = MaterialTheme.typography.headlineSmall,
                                fontWeight = FontWeight.Bold,
                                color = PrimeBlue
                            )
                            Text(
                                "Escolha o perfil e continue na rotina do lava jato.",
                                style = MaterialTheme.typography.bodyMedium,
                                color = TextSecondary
                            )
                        }

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
                            keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(keyboardType = KeyboardType.Email)
                        )
                        LavaPrimeTextField(
                            value = senha,
                            onValueChange = onSenhaChange,
                            label = "Senha",
                            singleLine = true,
                            placeholder = "Digite sua senha",
                            visualTransformation = PasswordVisualTransformation(),
                            keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(keyboardType = KeyboardType.Password)
                        )
                        erro?.let {
                            LavaPrimeCard(tonal = true, contentPadding = PaddingValues(14.dp)) {
                                Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    Icon(Icons.Filled.WarningAmber, contentDescription = null, tint = Color(0xFFB45309))
                                    Text(it, style = MaterialTheme.typography.bodySmall, color = PrimeBlue)
                                }
                            }
                        }
                        LavaPrimeActionButton(
                            text = "Entrar como ${perfilLabel(perfil)}",
                            onClick = onLogin,
                            icon = if (perfil == PerfilUsuario.ADMINISTRADOR) Icons.Filled.Security else Icons.Filled.DirectionsCar
                        )
                        Text(
                            "Perfil Administrador: visão gerencial. Perfil Operador: foco em pátio, clientes e veículos.",
                            style = MaterialTheme.typography.bodySmall,
                            color = TextSecondary,
                            textAlign = TextAlign.Center,
                            modifier = Modifier.fillMaxWidth()
                        )
                    }
                }
            }
            item {
                LavaPrimeVersionFooter(modifier = Modifier.fillMaxWidth())
            }
        }
    }
}

@Composable
private fun WebLikeFeature(
    title: String,
    subtitle: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector
) {
    LavaPrimeCard(
        modifier = Modifier
            .width(168.dp)
            .height(144.dp),
        tonal = true,
        contentPadding = PaddingValues(16.dp)
    ) {
        Box(
            modifier = Modifier
                .size(42.dp)
                .background(Color.White, RoundedCornerShape(14.dp))
                .padding(10.dp),
            contentAlignment = Alignment.Center
        ) {
            Icon(icon, contentDescription = null, tint = WaterBlue)
        }
        Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold, color = PrimeBlue)
        Text(subtitle, style = MaterialTheme.typography.bodySmall, color = TextSecondary)
    }
}
