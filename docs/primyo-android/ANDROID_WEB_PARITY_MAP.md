# Android Web Parity Map

## Objetivo

Mapear a paridade atual entre o LavaPrime Web e o app Android nativo observado em `LP-ANDROID-002`.

## Leitura consolidada

O Android ja replica a linguagem visual e alguns fluxos centrais do web, mas ainda cobre apenas uma parte da superficie funcional.

No nivel de dados, a referencia oficial desta comparacao passa a ser `docs/primyo-android/ANDROID_DATA_PARITY_MATRIX.md`.

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
- auth, membership e dados oficiais ainda nao sao compartilhados entre superficies;
- `ProdutoEntity` e usado como guarda-chuva parcial para produto e pseudo-insumo, enquanto o web ja trata dominios separados;
- pagamento e documento aparecem no web como dominios reais, mas no Android ainda nao passam de placeholders ou campos auxiliares de atendimento.

## Paridade de dados por dominio

| Dominio | Estado atual |
| --- | --- |
| Clientes | equivalente local existe, mas diverge do contrato oficial |
| Veiculos | equivalente local existe, mas sem owner history, status e shape canonico completo |
| Atendimentos | equivalente local existe, mas ainda sem itens executados, refs financeiras e historico estruturado |
| Servicos | equivalente local parcial |
| Produtos | equivalente local parcial e misturado com pseudo-insumos |
| Insumos | sem entidade propria no Android |
| Pagamentos e financeiro | ausentes no Android |
| Documentos e impressao | ausentes no Android |
| Empresa, auth e membership | ausentes ou somente demonstrativos no Android |

## Direcao de paridade

1. manter a mesma intencao funcional do web;
2. adaptar UX para mobile, sem copiar layout literal;
3. priorizar paridade operacional antes de paridade total de backoffice;
4. fechar contratos e ownership antes de abrir sync ou Supabase no Android;
5. nao iniciar impressao termica real enquanto pagamento, documento e configuracao de empresa nao tiverem base contratual local minima.
