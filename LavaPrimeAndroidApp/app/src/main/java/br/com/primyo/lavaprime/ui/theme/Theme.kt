package br.com.primyo.lavaprime.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Shapes
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.foundation.shape.RoundedCornerShape

private val LavaPrimeLight = lightColorScheme(
    primary = PrimeBlue,
    onPrimary = Color.White,
    secondary = WaterBlue,
    onSecondary = PrimeBlueDeep,
    tertiary = Mint,
    onTertiary = TextPrimary,
    background = PageBg,
    onBackground = TextPrimary,
    surface = Color.White,
    onSurface = TextPrimary,
    surfaceVariant = SurfaceMuted,
    onSurfaceVariant = TextSecondary,
    outline = SoftLine,
    outlineVariant = SoftLineStrong,
    error = DangerText,
    onError = Color.White
)

private val LavaPrimeDark = darkColorScheme(
    primary = WaterBlue,
    onPrimary = PrimeBlueDeep,
    secondary = Aqua,
    onSecondary = PrimeBlueDeep,
    tertiary = Mint,
    onTertiary = PrimeBlueDeep,
    background = PrimeBlueDeep,
    onBackground = Color(0xFFF5FBFD),
    surface = PrimeBlueSurface,
    onSurface = Color(0xFFF5FBFD),
    surfaceVariant = PrimeBlue,
    onSurfaceVariant = Color(0xFFD5E8EF),
    outline = Color(0xFF355A6E),
    outlineVariant = Color(0xFF244658),
    error = Color(0xFFFFB4AB),
    onError = Color(0xFF690005)
)

private val LavaPrimeShapes = Shapes(
    small = RoundedCornerShape(LavaPrimeRadii.small),
    medium = RoundedCornerShape(LavaPrimeRadii.medium),
    large = RoundedCornerShape(LavaPrimeRadii.large)
)

@Composable
fun LavaPrimeTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LavaPrimeLight,
        typography = LavaPrimeTypography,
        shapes = LavaPrimeShapes,
        content = content
    )
}
