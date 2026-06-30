import java.io.File

plugins {
    id("com.android.application") version "8.7.3" apply false
    id("org.jetbrains.kotlin.android") version "2.0.21" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.0.21" apply false
    id("com.google.devtools.ksp") version "2.0.21-1.0.27" apply false
}

val localAppData = System.getenv("LOCALAPPDATA")
val externalBuildRoot = if (!localAppData.isNullOrBlank()) {
    File(localAppData, "LavaPrimeAndroidBuild/${rootProject.name}")
} else {
    rootProject.layout.projectDirectory.dir(".gradle-build").asFile
}

layout.buildDirectory.set(externalBuildRoot.resolve("root"))

subprojects {
    layout.buildDirectory.set(externalBuildRoot.resolve(name))
}
