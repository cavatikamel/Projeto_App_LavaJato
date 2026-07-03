package br.com.primyo.lavaprime.ui.navigation

enum class AppStage {
    SPLASH,
    INICIAL,
    LOGIN,
    APP
}

enum class MobileRoute(
    val title: String,
    val adminOnly: Boolean = false,
    val hint: String = ""
) {
    DASHBOARD("Dashboard", true, "Visão geral"),
    PATIO("Pátio", false, "Operação em tempo real"),
    AGENDAMENTOS("Agendamentos", false, "Agenda e conversão"),
    CLIENTES("Cadastros", false, "Clientes e veículos"),
    SERVICOS("Serviços", true, "Preços e insumos"),
    PRODUTOS("Produtos", true, "Estoque e venda"),
    FINANCEIRO("Financeiro", true, "Pagamentos e resumo"),
    RELATORIOS("Relatórios", true, "Indicadores"),
    CONFIG("Meu negócio", true, "Empresa e operadores"),
    SEGURANCA("Segurança e sync", true, "Backend e auditoria")
}
