package br.com.primyo.lavaprime.ui.navigation

enum class AppStage {
    SPLASH,
    INICIAL,
    LOGIN,
    APP
}

enum class MobileRoute(val title: String, val adminOnly: Boolean = false, val hint: String = "") {
    DASHBOARD("Dashboard", true, "Visao geral"),
    PATIO("Patio", false, "Operacao em tempo real"),
    AGENDAMENTOS("Agendamentos", false, "Agenda e conversao"),
    CLIENTES("Clientes e veiculos", false, "Cadastro e historico"),
    SERVICOS("Servicos", true, "Precos e insumos"),
    PRODUTOS("Produtos e insumos", true, "Estoque e venda"),
    FINANCEIRO("Financeiro", true, "Caixa e margens"),
    RELATORIOS("Relatorios", true, "Indicadores"),
    CONFIG("Meu negocio", true, "Empresa e operadores"),
    SEGURANCA("Seguranca e sincronizacao", true, "Backend e auditoria")
}
