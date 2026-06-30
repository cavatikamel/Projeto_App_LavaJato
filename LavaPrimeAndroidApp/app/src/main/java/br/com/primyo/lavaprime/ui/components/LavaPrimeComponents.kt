package br.com.primyo.lavaprime.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ElevatedCard
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.R
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.ui.navigation.MobileRoute
import br.com.primyo.lavaprime.ui.theme.Aqua
import br.com.primyo.lavaprime.ui.theme.Mint
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.SoftLine
import br.com.primyo.lavaprime.ui.theme.TextSecondary
import br.com.primyo.lavaprime.ui.theme.WaterBlue

@Composable
fun BrandLogo(modifier: Modifier = Modifier, compact: Boolean = false) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
            modifier = Modifier
                .size(68.dp)
                .then(modifier)
                .clip(RoundedCornerShape(if (compact) 14.dp else 22.dp))
                .background(Brush.linearGradient(listOf(Aqua, Mint))),
            contentAlignment = Alignment.Center
        ) {
            Image(
                painter = painterResource(R.drawable.ic_lavaprime_logo),
                contentDescription = "Logo LavaPrime",
                modifier = Modifier
                    .padding(8.dp)
                    .fillMaxSize(),
                contentScale = ContentScale.Fit
            )
        }
        if (!compact) {
            Spacer(Modifier.width(12.dp))
            Column {
                Text(
                    "LavaPrime",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Black,
                    color = PrimeBlue
                )
                Text(
                    "Gestao inteligente para sua operacao de lavagem.",
                    style = MaterialTheme.typography.labelMedium,
                    color = WaterBlue
                )
            }
        }
    }
}

@Composable
fun LandingBadge(text: String) {
    Surface(
        color = Color(0xFFE5FAFF),
        shape = RoundedCornerShape(50.dp),
        border = BorderStroke(1.dp, Color(0xFFC6EEF5))
    ) {
        Text(
            text,
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 7.dp),
            style = MaterialTheme.typography.labelSmall,
            color = PrimeBlue,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun HeroPanel(title: String, description: String, icon: String) {
    ElevatedCard(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.elevatedCardColors(containerColor = Color.White)
    ) {
        Row(Modifier.padding(18.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(54.dp)
                    .clip(RoundedCornerShape(18.dp))
                    .background(Brush.linearGradient(listOf(Aqua, Mint))),
                contentAlignment = Alignment.Center
            ) {
                Text(icon, style = MaterialTheme.typography.titleLarge)
            }
            Spacer(Modifier.width(14.dp))
            Column(Modifier.weight(1f)) {
                Text(title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Black, color = PrimeBlue)
                Text(description, style = MaterialTheme.typography.bodyMedium, color = TextSecondary)
            }
        }
    }
}

@Composable
fun SectionTitle(text: String) {
    Text(text, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Black, color = PrimeBlue)
}

@Composable
fun KpiCard(label: String, value: String, icon: String) {
    ElevatedCard(
        modifier = Modifier
            .width(166.dp)
            .height(112.dp),
        colors = CardDefaults.elevatedCardColors(containerColor = Color.White),
        shape = RoundedCornerShape(22.dp)
    ) {
        Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.SpaceBetween) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(icon)
                Spacer(Modifier.width(6.dp))
                Text(label, style = MaterialTheme.typography.labelMedium, color = TextSecondary)
            }
            Text(value, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Black, color = PrimeBlue)
        }
    }
}

@Composable
fun ChecklistCard(title: String, items: List<String>) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(22.dp),
        border = BorderStroke(1.dp, SoftLine)
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(title, fontWeight = FontWeight.Black, color = PrimeBlue)
            items.forEach { item ->
                Text("OK  $item", color = TextSecondary)
            }
        }
    }
}

@Composable
fun EmptyState(title: String, description: String) {
    ElevatedCard(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.elevatedCardColors(containerColor = Color.White),
        shape = RoundedCornerShape(22.dp)
    ) {
        Column(
            modifier = Modifier.padding(22.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(title, fontWeight = FontWeight.Black, color = PrimeBlue)
            Text(description, textAlign = TextAlign.Center, color = TextSecondary)
        }
    }
}

@Composable
fun ModuleScreen(title: String, description: String, icon: String) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(PageBg)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        HeroPanel(title, description, icon)
        ChecklistCard(
            title = "Adaptacao mobile",
            items = listOf(
                "Campos verticais e largos",
                "Cards substituem tabelas grandes",
                "Acoes principais ficam visiveis no polegar",
                "Menu lateral abre pelo botao e recolhe ao tocar fora",
                "Mesma identidade do LavaPrime Web"
            )
        )
    }
}

@Composable
fun FormPreview(title: String, fields: List<String>) {
    ElevatedCard(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.elevatedCardColors(containerColor = Color.White),
        shape = RoundedCornerShape(22.dp)
    ) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
            Text(title, fontWeight = FontWeight.Black, color = PrimeBlue)
            fields.forEach { field ->
                OutlinedTextField(
                    value = "",
                    onValueChange = {},
                    label = { Text(field) },
                    modifier = Modifier.fillMaxWidth(),
                    enabled = false,
                    shape = RoundedCornerShape(14.dp)
                )
            }
        }
    }
}

fun perfilLabel(perfil: PerfilUsuario): String = when (perfil) {
    PerfilUsuario.ADMINISTRADOR -> "Administrador"
    PerfilUsuario.OPERADOR -> "Operador"
}

fun statusLabel(status: AtendimentoStatus): String = when (status) {
    AtendimentoStatus.AGENDADO -> "Agendado"
    AtendimentoStatus.PATIO -> "No patio"
    AtendimentoStatus.EXECUCAO -> "Execucao"
    AtendimentoStatus.FINALIZADO -> "Finalizado"
    AtendimentoStatus.CANCELADO -> "Cancelado"
}

fun routeIcon(route: MobileRoute): String = when (route) {
    MobileRoute.DASHBOARD -> "DI"
    MobileRoute.PATIO -> "PA"
    MobileRoute.AGENDAMENTOS -> "AG"
    MobileRoute.CLIENTES -> "CV"
    MobileRoute.SERVICOS -> "SV"
    MobileRoute.PRODUTOS -> "PI"
    MobileRoute.FINANCEIRO -> "FI"
    MobileRoute.RELATORIOS -> "RE"
    MobileRoute.CONFIG -> "MN"
    MobileRoute.SEGURANCA -> "SC"
}

fun money(cents: Long): String {
    val reais = cents / 100
    val centavos = (cents % 100).toString().padStart(2, '0')
    return "R$ $reais,$centavos"
}

fun formatTimestamp(value: Long?): String {
    if (value == null) return "Ainda nao sincronizado"
    return java.text.SimpleDateFormat("dd/MM HH:mm", java.util.Locale("pt", "BR")).format(java.util.Date(value))
}
