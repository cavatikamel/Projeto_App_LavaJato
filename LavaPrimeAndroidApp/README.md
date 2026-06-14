# LavaPrime Android App — Starter Mobile Nativo

Base Android nativa do LavaPrime para tablets e smartphones, sem WebView e sem depender de conexão constante para operar.

## O que esta versão entrega

- App Android em Kotlin + Jetpack Compose + Material 3.
- Ícone nativo/adaptativo com marca LavaPrime em vetor.
- Tela de inicialização com identidade LavaPrime.
- Login mobile no padrão visual do produto.
- Perfis Administrador e Operador.
- Menu lateral que abre pelo botão menu e recolhe pelo toque fora/seleção.
- Pátio operacional com cards apropriados para toque.
- Popup mobile de novo atendimento.
- Cadastro rápido de cliente, veículo e alerta especial.
- Serviços com regra inicial de risco por produto ácido/alcalino/pH.
- Módulos espelhados do LavaPrime Web, adaptados ao formato mobile.
- Room como banco local offline-first.
- Estrutura preparada para Supabase, backend do LavaPrime Web, Netlify no front web e Primyo Console.
- Entidades com empresaId/tenant, syncStatus, trilha de auditoria e fila de sincronização.
- Proteção contra backup sensível no Manifest/data extraction rules.

## Credenciais de demonstração

- Administrador: qualquer e-mail que não contenha `operador`, senha com 4 caracteres ou mais.
- Operador: `operador@lavaprime.local`, senha `1234`.

Este login é apenas uma simulação local para desenvolvimento. A autenticação final deve usar Supabase Auth/Primyo Console, mantendo sessão offline controlada após primeira validação online.

## Como abrir no Android Studio

1. Extraia o ZIP.
2. Abra a pasta `LavaPrimeAndroidApp` no Android Studio.
3. Aguarde o Gradle Sync.
4. Execute em celular, tablet ou emulador.

## Diretriz de evolução

O LavaPrime Web continua sendo a referência funcional e visual. Sempre que a web mudar, o mobile deve receber a mesma regra de negócio, porém adaptada para:

- cards em vez de tabelas extensas;
- formulários verticais;
- botões grandes;
- navegação por menu lateral;
- operação offline-first;
- sincronização posterior segura.

## Versão

`LavaPrime_Mobile_V1.03`


## Correção V1.03 - Compose Compiler Kotlin 2.x

Esta versão corrige o erro do Android Studio:

`Starting in Kotlin 2.0, the Compose Compiler Gradle plugin is required when compose is enabled.`

A correção aplicada foi:

- inclusão do plugin `org.jetbrains.kotlin.plugin.compose` no `build.gradle.kts` raiz;
- aplicação do plugin no módulo `app`;
- remoção do bloco antigo `composeOptions.kotlinCompilerExtensionVersion`, que não deve ser usado com Kotlin 2.x;
- incremento da versão para `LavaPrime_Mobile_V1.03`.

Depois de abrir no Android Studio, use **File > Sync Project with Gradle Files** e rode novamente no aparelho.
