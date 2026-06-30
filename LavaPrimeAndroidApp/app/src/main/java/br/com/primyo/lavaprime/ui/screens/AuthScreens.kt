package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import br.com.primyo.lavaprime.ui.components.perfilLabel
import br.com.primyo.lavaprime.ui.theme.Aqua
import br.com.primyo.lavaprime.ui.theme.Mint
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.TextPrimary
import br.com.primyo.lavaprime.ui.theme.WaterBlue
import br.com.primyo.lavaprime.ui.theme.MobileVersionName

@Composable
fun SplashLavaPrime() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Brush.verticalGradient(listOf(PrimeBlue, WaterBlue, PageBg))),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            BrandLogo(modifier = Modifier.size(104.dp), compact = true)
            Spacer(Modifier.height(18.dp))
            Text("LavaPrime", style = MaterialTheme.typography.headlineLarge, color = Color.White, fontWeight = FontWeight.Black)
            Text("Gestao inteligente para sua operacao de lavagem.", color = Color.White.copy(alpha = 0.86f))
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
                .height(310.dp)
                .background(Brush.verticalGradient(listOf(PrimeBlue, WaterBlue, Aqua)))
        )
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(20.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                Spacer(Modifier.height(18.dp))
                Surface(color = Color.White, shape = RoundedCornerShape(28.dp), shadowElevation = 8.dp) {
                    Column(Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(16.dp)) {
                        BrandLogo()
                        Text(
                            "Sua operacao no patio, no celular e no tablet.",
                            style = MaterialTheme.typography.headlineSmall,
                            fontWeight = FontWeight.Black,
                            color = PrimeBlue
                        )
                        Text(
                            "Visual inspirado na ferramenta web do LavaPrime, com cards, paineis, menu lateral e rotinas adaptadas para toque.",
                            style = MaterialTheme.typography.bodyMedium,
                            color = Color(0xFF365A64)
                        )
                        Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                            LandingBadge("Offline-first")
                            LandingBadge("Supabase-ready")
                            LandingBadge("Mobile")
                        }
                        Button(
                            onClick = onAccess,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(54.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = Mint, contentColor = TextPrimary),
                            shape = RoundedCornerShape(16.dp)
                        ) {
                            Text("Acessar LavaPrime")
                        }
                    }
                }
            }
            item {
                FlowRow(
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    WebLikeFeature("Patio", "Cards de veiculos e status", "PA")
                    WebLikeFeature("Gestao", "Indicadores e caixa", "GE")
                    WebLikeFeature("Alertas", "Restricoes de produto", "AL")
                    WebLikeFeature("Sync", "Base local + Supabase", "SY")
                }
            }
        }
        Text(
            MobileVersionName,
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(10.dp),
            style = MaterialTheme.typography.labelSmall,
            color = WaterBlue
        )
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
                .height(270.dp)
                .background(Brush.verticalGradient(listOf(PrimeBlue, WaterBlue)))
        )
        LazyColumn(
            modifier = Modifier.fillMaxSize(),
            contentPadding = PaddingValues(20.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            item {
                Spacer(Modifier.height(8.dp))
                Row(Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                    TextButton(onClick = onBack) { Text("< Voltar", color = Color.White) }
                    Spacer(Modifier.weight(1f))
                    Text("Ambiente seguro", color = Color.White.copy(alpha = 0.85f), style = MaterialTheme.typography.labelMedium)
                }
            }
            item {
                ElevatedCard(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(28.dp),
                    colors = androidx.compose.material3.CardDefaults.elevatedCardColors(containerColor = Color.White)
                ) {
                    Column(
                        modifier = Modifier.padding(20.dp),
                        verticalArrangement = Arrangement.spacedBy(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        BrandLogo()
                        Text("Entrar no sistema", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Black, color = PrimeBlue)
                        Text(
                            "Escolha o perfil exatamente como na rotina web para carregar os modulos corretos.",
                            textAlign = TextAlign.Center,
                            color = Color(0xFF4F6870)
                        )

                        ProfileSelector(selected = perfil, onSelect = onSelectPerfil)

                        OutlinedTextField(
                            value = email,
                            onValueChange = onEmailChange,
                            label = { Text("Email") },
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(14.dp)
                        )
                        OutlinedTextField(
                            value = senha,
                            onValueChange = onSenhaChange,
                            label = { Text("Senha") },
                            singleLine = true,
                            visualTransformation = PasswordVisualTransformation(),
                            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                            modifier = Modifier.fillMaxWidth(),
                            shape = RoundedCornerShape(14.dp)
                        )
                        if (erro != null) {
                            Text(erro, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodySmall)
                        }
                        Button(
                            onClick = onLogin,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(54.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = Mint, contentColor = TextPrimary),
                            shape = RoundedCornerShape(16.dp)
                        ) {
                            Text("Entrar como ${perfilLabel(perfil)}")
                        }
                        Text(
                            "Protótipo local: Administrador ve todos os modulos; Operador ve Patio, Agendamentos, Clientes e Veiculos.",
                            style = MaterialTheme.typography.labelSmall,
                            color = Color(0xFF6A7C82),
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }
        }
        Text(
            MobileVersionName,
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(10.dp),
            style = MaterialTheme.typography.labelSmall,
            color = WaterBlue
        )
    }
}

@Composable
private fun ProfileSelector(selected: PerfilUsuario, onSelect: (PerfilUsuario) -> Unit) {
    Surface(
        modifier = Modifier.fillMaxWidth(),
        color = Color(0xFFEAF7FA),
        shape = RoundedCornerShape(18.dp),
        border = BorderStroke(1.dp, Color(0xFFE3F2F5))
    ) {
        Row(Modifier.padding(6.dp), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            ProfileOption(
                title = "Administrador",
                subtitle = "Visao completa",
                symbol = "AD",
                active = selected == PerfilUsuario.ADMINISTRADOR,
                modifier = Modifier.weight(1f)
            ) { onSelect(PerfilUsuario.ADMINISTRADOR) }
            ProfileOption(
                title = "Operador",
                subtitle = "Patio e rotina",
                symbol = "OP",
                active = selected == PerfilUsuario.OPERADOR,
                modifier = Modifier.weight(1f)
            ) { onSelect(PerfilUsuario.OPERADOR) }
        }
    }
}

@Composable
private fun ProfileOption(
    title: String,
    subtitle: String,
    symbol: String,
    active: Boolean,
    modifier: Modifier,
    onClick: () -> Unit
) {
    Surface(
        modifier = modifier.clickable(onClick = onClick),
        color = if (active) PrimeBlue else Color.Transparent,
        shape = RoundedCornerShape(14.dp)
    ) {
        Column(
            modifier = Modifier.padding(12.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            Text(symbol)
            Text(
                title,
                fontWeight = FontWeight.Black,
                color = if (active) Color.White else PrimeBlue,
                style = MaterialTheme.typography.labelLarge
            )
            Text(
                subtitle,
                color = if (active) Color.White.copy(alpha = 0.82f) else Color(0xFF5B737B),
                style = MaterialTheme.typography.labelSmall
            )
        }
    }
}

@Composable
private fun WebLikeFeature(title: String, subtitle: String, symbol: String) {
    ElevatedCard(
        modifier = Modifier
            .width(158.dp)
            .height(118.dp),
        colors = androidx.compose.material3.CardDefaults.elevatedCardColors(containerColor = Color.White)
    ) {
        Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(symbol, style = MaterialTheme.typography.titleLarge)
            Text(title, fontWeight = FontWeight.Black, color = PrimeBlue)
            Text(subtitle, style = MaterialTheme.typography.labelSmall, color = Color(0xFF57727B))
        }
    }
}
