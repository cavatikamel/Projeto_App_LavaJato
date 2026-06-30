# Android Web Parity Map

## Objetivo

Mapear a paridade atual entre o LavaPrime Web e o app Android nativo observado em `LP-ANDROID-001`.

## Leitura consolidada

O Android ja replica a linguagem visual e alguns fluxos centrais do web, mas ainda cobre apenas uma parte da superficie funcional.

## Paridade por area

| Area | Web como referencia | Android auditado | Estado atual |
| --- | --- | --- | --- |
| Entrada institucional | tela de entrada e identidade LavaPrime | `SplashLavaPrime` + `InitialScreen` | Parcial |
| Login e perfil | sessao local atual do web, com Admin/Operador | `LoginScreen` + seletor de perfil | Parcial |
| Dashboard | visao gerencial e KPIs | `DashboardScreen` local com KPIs de patio, receita, estoque e sync | Parcial |
| Patio | operacao principal | `PatioScreen` com filtros, alerta e mudanca de status | Parcial forte |
| Clientes e veiculos | cadastros e historico | `CadastrosScreen` com busca e novo cadastro local | Parcial |
| Agendamentos | fluxo operacional do web | `ModuleScreen` placeholder | Baixa |
| Servicos | catalogo e logica de insumos | `ModuleScreen` placeholder | Baixa |
| Produtos e insumos | catalogo, estoque e venda | `ProductsScreen` apenas leitura local | Parcial baixa |
| Financeiro | caixa, pagamentos, faturas e margens | `ModuleScreen` placeholder | Baixa |
| Relatorios e documentos | emissao e consulta | `ModuleScreen` placeholder | Baixa |
| Meu negocio | configuracoes oficiais | `ModuleScreen` placeholder | Baixa |
| Seguranca e sync | readiness futura | `SecuritySyncScreen` com estado local e auditoria | Parcial |

## Alinhamento visual observado

- paleta azul, agua e fundo claro;
- cards arredondados e badges;
- drawer lateral controlado por botao;
- foco mobile/tablet em vez de WebView;
- patio tratado como experiencia central do operador.

## Desalinhamentos principais com o web

- o Android ainda usa seed e modelo local proprio;
- nao ha consumo de contratos oficiais nem da massa funcional atual do web;
- varios modulos do menu estao presentes visualmente, mas nao funcionalmente;
- financeiro, relatorios, documentos e configuracoes ainda nao refletem a complexidade real do web;
- auth, membership e dados oficiais ainda nao sao compartilhados entre superfícies.

## Direcao de paridade

1. manter a mesma intencao funcional do web;
2. adaptar UX para mobile, sem copiar layout literal;
3. priorizar paridade operacional antes de paridade total de backoffice;
4. fechar contratos e ownership antes de abrir sync ou Supabase no Android.
