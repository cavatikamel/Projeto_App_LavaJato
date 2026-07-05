package br.com.primyo.lavaprime.ui.navigation

enum class AppStage {
    SPLASH,
    INICIAL,
    LOGIN,
    APP
}

enum class MobileRouteGroup(
    val title: String,
    val hint: String
) {
    OPERACAO("Operação", "Pátio, agenda e atendimento"),
    CADASTROS("Cadastros", "Clientes, veículos, equipe e serviços"),
    ESTOQUE("Estoque e vendas", "Produtos, insumos, inventário e vendas"),
    FINANCEIRO("Financeiro", "Caixa, cobranças, documentos e relatórios"),
    NEGOCIO("Meu negócio", "Empresa, canais e comunicação"),
    SISTEMA("Sistema", "Segurança, sincronização e suporte")
}

enum class MobileRoute(
    val title: String,
    val adminOnly: Boolean = false,
    val hint: String = "",
    val group: MobileRouteGroup
) {
    DASHBOARD("Visão Geral", true, "Resumo operacional", MobileRouteGroup.OPERACAO),
    PATIO("Pátio", false, "Operação em tempo real", MobileRouteGroup.OPERACAO),
    AGENDAMENTOS("Agendamentos", false, "Entrada e agenda", MobileRouteGroup.OPERACAO),
    QUOTES("Orçamentos", false, "Propostas e conversão", MobileRouteGroup.OPERACAO),

    CADASTROS("Cadastros", false, "Visão geral", MobileRouteGroup.CADASTROS),
    CLIENTES("Clientes", false, "Relacionamento e faturamento", MobileRouteGroup.CADASTROS),
    VEICULOS("Veículos", false, "Placa, vínculo e histórico", MobileRouteGroup.CADASTROS),
    OPERADORES("Operadores", true, "Equipe e perfis", MobileRouteGroup.CADASTROS),
    SERVICOS("Serviços", true, "Tabela e composição", MobileRouteGroup.CADASTROS),

    PRODUTOS("Produtos", true, "Cadastro e preço", MobileRouteGroup.ESTOQUE),
    INSUMOS("Insumos", true, "Uso interno e consumo", MobileRouteGroup.ESTOQUE),
    INVENTARIO("Inventário", true, "Posição de estoque", MobileRouteGroup.ESTOQUE),
    VENDAS("Vendas", true, "Balcão e comprovantes", MobileRouteGroup.ESTOQUE),

    FINANCEIRO("Financeiro geral", true, "Resumo operacional", MobileRouteGroup.FINANCEIRO),
    OPEN_PAYMENTS("Pagamentos em aberto", true, "Cobrança e lembretes", MobileRouteGroup.FINANCEIRO),
    CASHFLOW("Fluxo de caixa", true, "Entradas e saídas", MobileRouteGroup.FINANCEIRO),
    PAYABLES("Contas a pagar", true, "Obrigações", MobileRouteGroup.FINANCEIRO),
    INVOICES("Faturas", true, "Faturamento", MobileRouteGroup.FINANCEIRO),
    DOCUMENTOS("Documentos", true, "Recibos e histórico", MobileRouteGroup.FINANCEIRO),
    RELATORIOS("Relatórios", true, "Indicadores e leitura rápida", MobileRouteGroup.FINANCEIRO),

    BUSINESS("Empresa", true, "Dados do negócio", MobileRouteGroup.NEGOCIO),
    BUSINESS_FINANCE("Configurações financeiras", true, "Pix, bancos e métodos", MobileRouteGroup.NEGOCIO),
    BUSINESS_SOCIAL("Canais sociais", true, "WhatsApp e redes", MobileRouteGroup.NEGOCIO),
    BUSINESS_MESSAGES("Central de mensagens", true, "Templates e comunicação", MobileRouteGroup.NEGOCIO),

    SEGURANCA("Segurança e sync", true, "Backend e auditoria", MobileRouteGroup.SISTEMA)
}
