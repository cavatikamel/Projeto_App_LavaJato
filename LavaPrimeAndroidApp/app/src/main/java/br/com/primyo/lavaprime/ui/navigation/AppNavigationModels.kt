package br.com.primyo.lavaprime.ui.navigation

enum class AppStage {
    SPLASH,
    INICIAL,
    LOGIN,
    APP
}

enum class MobileRoute(val title: String, val adminOnly: Boolean = false, val hint: String = "") {
    DASHBOARD("Dashboard", true, "Visão geral"),
    PATIO("Pátio", false, "Operação em tempo real"),
    AGENDAMENTOS("Agendamentos", false, "Agenda e conversão"),
    CLIENTES("Clientes e veículos", false, "Cadastro e histórico"),
    SERVICOS("Serviços", true, "Preços e insumos"),
    PRODUTOS("Produtos e insumos", true, "Estoque e venda"),
    FINANCEIRO("Financeiro", true, "Caixa e margens"),
    RELATORIOS("Relatórios", true, "Indicadores"),
    CONFIG("Meu negócio", true, "Empresa e operadores"),
    SEGURANCA("Segurança e sincronização", true, "Backend e auditoria")
}
