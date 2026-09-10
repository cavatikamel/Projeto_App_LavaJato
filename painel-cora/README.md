# Painel Cora — Departamento Pessoal | Grupo Coroa

Blueprint de implementação para a aplicação **Power Apps Canvas** que substitui as
planilhas do Departamento Pessoal (DP), organizando tarefas, responsáveis,
dependências, prazos, evidências e notificações.

> Este diretório contém **documentação de implementação e artefatos de
> provisionamento**, não código executável. A solução é construída nas
> ferramentas low-code do Microsoft 365 (Power Apps, SharePoint Online, Power
> Automate). Nada aqui é compilado ou publicado a partir do repositório — os
> documentos servem como especificação técnica pronta para um desenvolvedor
> Power Platform executar.

## Pilha tecnológica

| Camada            | Tecnologia                                   |
|-------------------|----------------------------------------------|
| Interface         | Power Apps Canvas                            |
| Dados             | SharePoint Online (listas + biblioteca)     |
| Automação         | Power Automate (Cloud Flows)                |
| Notificações      | Microsoft Teams / Outlook (via Power Automate)|
| Identidade        | Microsoft Entra ID (contas corporativas)    |

**Não** é utilizado Dataverse neste momento (decisão do projeto).

## Índice da documentação

| Documento | Conteúdo |
|-----------|----------|
| [`docs/01-arquitetura.md`](docs/01-arquitetura.md) | Visão geral, componentes, fluxo de dados, decisões de design |
| [`docs/02-modelo-de-dados-sharepoint.md`](docs/02-modelo-de-dados-sharepoint.md) | Esquema completo das 10 listas/biblioteca (colunas, tipos, escolhas, índices) |
| [`docs/03-modelo-de-seguranca.md`](docs/03-modelo-de-seguranca.md) | Grupos, permissões SharePoint, quebra de herança, RLS de item |
| [`docs/04-maquina-de-estados-e-dependencias.md`](docs/04-maquina-de-estados-e-dependencias.md) | Ciclo de status, regras de transição, dependências, modos de liberação |
| [`docs/05-powerapps-canvas.md`](docs/05-powerapps-canvas.md) | Telas, controles, coleções e fórmulas Power Fx (painel matricial, popup, criação) |
| [`docs/06-power-automate-fluxos.md`](docs/06-power-automate-fluxos.md) | Especificação dos fluxos de notificação e automação de permissões |
| [`docs/07-interface-visual.md`](docs/07-interface-visual.md) | Guia de estilo: paleta, tipografia, farol de status, tokens |
| [`docs/08-guia-de-implementacao.md`](docs/08-guia-de-implementacao.md) | Passo a passo de construção, na ordem correta |
| [`docs/09-criterios-de-aceite.md`](docs/09-criterios-de-aceite.md) | Checklist de aceite mapeado para os artefatos que o atendem |
| [`provisioning/`](provisioning/) | Scripts PnP PowerShell para criar listas, colunas e grupos |
| [`power-automate/`](power-automate/) | Pseudocódigo/definição dos fluxos para reconstrução no designer |

## Perfis de usuário

| Perfil | Capacidades |
|--------|-------------|
| **Gestor** | Vê tudo, cria tarefas/modelos, gerencia solucionadores, valida ou encerra ações |
| **Criador designado** | Cria tarefas e distribui ações, conforme permissão |
| **Solucionador** | Vê e executa suas ações, anexa evidências, informa conclusão ou rejeita com justificativa |

## Convenções

- **Nomes internos** de listas e colunas em SharePoint sem espaços nem acentos
  (ex.: `AcoesDaTarefa`, `PrazoCalculado`). O *display name* pode ter acento.
- **Idioma**: pt-BR na interface e nos dados; nomes técnicos em ASCII.
- **Data de referência D+0**: âncora de cálculo dos prazos relativos de cada ação.

## Como usar este blueprint

1. Leia [`docs/01-arquitetura.md`](docs/01-arquitetura.md) para o panorama.
2. Provisione o SharePoint com [`docs/02`](docs/02-modelo-de-dados-sharepoint.md) +
   [`provisioning/`](provisioning/).
3. Configure segurança com [`docs/03`](docs/03-modelo-de-seguranca.md).
4. Construa o app seguindo [`docs/05`](docs/05-powerapps-canvas.md) e a máquina de
   estados em [`docs/04`](docs/04-maquina-de-estados-e-dependencias.md).
5. Monte os fluxos de [`docs/06`](docs/06-power-automate-fluxos.md).
6. Valide contra [`docs/09`](docs/09-criterios-de-aceite.md).
