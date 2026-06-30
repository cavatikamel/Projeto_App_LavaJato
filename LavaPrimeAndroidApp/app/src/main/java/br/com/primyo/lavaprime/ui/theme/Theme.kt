package br.com.primyo.lavaprime.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LavaPrimeLight = lightColorScheme(
    primary = WaterBlue,
    secondary = PrimeBlue,
    tertiary = Mint,
    background = PageBg,
    surface = Color.White,
    onBackground = TextPrimary,
    onSurface = TextPrimary,
    outline = SoftLine,
    error = Color(0xFFB3261E)
)

private val LavaPrimeDark = darkColorScheme(
    primary = WaterBlue,
    secondary = Color(0xFF7DD3FC),
    tertiary = Mint,
    background = PrimeBlue,
    surface = Color(0xFF0F2434),
    onBackground = Color(0xFFF8FAFC),
    onSurface = Color(0xFFF8FAFC),
    outline = Color(0xFF334155)
)

@Composable
fun LavaPrimeTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = if (isSystemInDarkTheme()) LavaPrimeDark else LavaPrimeLight,
        content = content
    )
}
