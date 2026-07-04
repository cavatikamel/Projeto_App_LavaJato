package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.widthIn
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Security
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.R
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.ui.components.BrandLogo
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeSegmentedProfileSelector
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.LavaPrimeVersionFooter
import br.com.primyo.lavaprime.ui.theme.LavaPrimeSpacing
import br.com.primyo.lavaprime.ui.theme.PageBg
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.PrimeBlueDeep
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
    Box(modifier = Modifier.fillMaxSize()) {
        Image(
            painter = painterResource(R.drawable.lavaprime_startup_splash),
            contentDescription = "Splash LavaPrime",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        listOf(
                            Color.Transparent,
                            PrimeBlueDeep.copy(alpha = 0.10f),
                            PrimeBlueDeep.copy(alpha = 0.42f)
                        )
                    )
                )
        )
        Text(
            text = "Carregando sistema...",
            modifier = Modifier
                .align(Alignment.Center)
                .statusBarsPadding()
                .navigationBarsPadding()
                .padding(horizontal = 20.dp),
            style = MaterialTheme.typography.bodyLarge,
            color = Color.White,
            fontWeight = FontWeight.SemiBold,
            textAlign = TextAlign.Center
        )
    }
}

@Composable
fun LoginScreen(
    perfil: PerfilUsuario,
    email: String,
    senha: String,
    erro: String?,
    bootstrapSummary: String?,
    localDbReady: Boolean,
    bootstrapError: String?,
    onRetryBootstrap: () -> Unit,
    onSelectPerfil: (PerfilUsuario) -> Unit,
    onEmailChange: (String) -> Unit,
    onSenhaChange: (String) -> Unit,
    onLogin: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(PageBg)
            .statusBarsPadding()
            .navigationBarsPadding()
            .imePadding()
            .padding(horizontal = LavaPrimeSpacing.lg, vertical = LavaPrimeSpacing.lg)
    ) {
        Column(
            modifier = Modifier
                .align(Alignment.Center)
                .fillMaxWidth(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .widthIn(max = 520.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.lg)
            ) {
                BrandLogo(
                    showTagline = false,
                    modifier = Modifier.fillMaxWidth(0.92f)
                )

                Text(
                    text = "Autenticação",
                    style = MaterialTheme.typography.headlineMedium,
                    color = PrimeBlue,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth()
                )

                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.spacedBy(LavaPrimeSpacing.md)
                ) {
                    LavaPrimeTextField(
                        value = email,
                        onValueChange = onEmailChange,
                        label = "Usuário",
                        singleLine = true,
                        keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(
                            keyboardType = KeyboardType.Email
                        )
                    )

                    LavaPrimeTextField(
                        value = senha,
                        onValueChange = onSenhaChange,
                        label = "Senha",
                        singleLine = true,
                        keyboardOptions = androidx.compose.foundation.text.KeyboardOptions(
                            keyboardType = KeyboardType.Password
                        ),
                        visualTransformation = PasswordVisualTransformation()
                    )

                    LavaPrimeSegmentedProfileSelector(
                        selected = perfil,
                        onSelect = onSelectPerfil
                    )
                }

                LavaPrimeActionButton(
                    text = "Confirmar login",
                    onClick = onLogin,
                    enabled = localDbReady,
                    icon = if (perfil == PerfilUsuario.ADMINISTRADOR) {
                        Icons.Filled.Security
                    } else {
                        Icons.Filled.DirectionsCar
                    },
                    modifier = Modifier.fillMaxWidth(0.72f)
                )

                if (!localDbReady || bootstrapError != null) {
                    Text(
                        text = bootstrapError ?: "Falha ao preparar o acesso local.",
                        style = MaterialTheme.typography.bodySmall,
                        color = PrimeBlue,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                    LavaPrimeActionButton(
                        text = "Tentar novamente",
                        onClick = onRetryBootstrap,
                        style = LavaPrimeActionStyle.Outline,
                        modifier = Modifier.fillMaxWidth(0.62f)
                    )
                } else if (erro != null) {
                    Text(
                        text = erro,
                        style = MaterialTheme.typography.bodySmall,
                        color = PrimeBlue,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
        }

        LavaPrimeVersionFooter(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .fillMaxWidth()
        )
    }
}
