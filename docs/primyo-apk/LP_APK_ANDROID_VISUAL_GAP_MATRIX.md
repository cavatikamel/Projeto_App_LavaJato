# LP APK Android Visual Gap Matrix

## Objetivo

Classificar as principais lacunas visuais entre o Web, `Material_Visual` e o APK atual.

| Area/tela | Estado Web observado | Estado Android atual | Lacuna | Severidade | Decisao | Fase responsavel |
| --- | --- | --- | --- | --- | --- | --- |
| Marca oficial | Web ainda usa assets legados de carro/gota em `app/assets/brand` | Android usa vetor proprio `ic_lavaprime_logo` | marca oficial nova de `Material_Visual` ainda nao e fonte primaria em nenhuma das duas superficies | `critical` | `replace` | `LP-APK-005`, `LP-APK-006` |
| App icon | Web possui `lavaprime-icon.png` legado | Android usa adaptive icon vetorial proprio | icone oficial quadrado `LP` ainda nao foi adotado | `critical` | `replace` | `LP-APK-005` |
| Tipografia | Web usa `Roboto` e o guia visual oficial recomenda `Inter` | Android usa `FontFamily.SansSerif` generico | falta fonte oficial unica e hierarquia tipografica consolidada | `high` | `redesign` | `LP-APK-005` |
| Paleta | Web confirma navy/cyan/lime/ice | Android paleta aponta nessa direcao, mas sem baseline oficial fechada | precisa consolidar hex oficial e regra de uso por contexto | `medium` | `adjust` | `LP-APK-005` |
| Login | Web tem painel limpo, botao lime, outline claro e logo de largura controlada | Android login ja melhorou, mas ainda usa card alto, copy extra e marca nao oficial | proporcao, sobriedade e asset oficial ainda abaixo do alvo | `high` | `redesign` | `LP-APK-006`, `LP-APK-007` |
| Seletor Admin/Operador | Web usa profile buttons claros, escuros quando ativos | Android usa segmented selector util, mas ainda parcial | controle ainda precisa acabamento premium e peso visual melhor | `medium` | `adjust` | `LP-APK-007` |
| Drawer/Menu | Web sidebar administrativa e forte, com hierarquia clara | Android drawer e funcional, mas ainda parece shell de transicao | precisa parecer navegacao nativa final, menos bloco provisiorio | `high` | `redesign` | `LP-APK-008` |
| Dashboard | Web tem KPI, alertas, cards operacionais e leitura gerencial mais rica | Android tem metric cards + lista curta | painel Android ainda esta raso e genericamente heroizado | `high` | `redesign` | `LP-APK-009` |
| Patio | Web mostra pátio mais rico, com status, fila, quotes, checklist e acoes | Android patio ja e a melhor tela atual | boa fundacao, mas ainda sem densidade operacional suficiente e com visual parcial | `medium` | `adjust` | `LP-APK-010` |
| Clientes/Veiculos | Web trata os modulos separadamente e com mais profundidade | Android junta clientes e veiculos na mesma tela | linguagem e organizacao visual nao respeitam a separacao funcional | `high` | `redesign` | `LP-APK-014`, `LP-APK-015` |
| Produtos/Insumos | Web separa produto, insumo e inventario | Android junta tudo em `Produtos e insumos` | falta identidade visual distinta entre catalogo comercial e tecnico | `high` | `redesign` | `LP-APK-017`, `LP-APK-018` |
| Status e chips | Web usa pills e semantica forte por cor | Android ja usa chips reutilizaveis | boa base, mas falta baseline final de cores/status e alguns textos mais humanos | `medium` | `adjust` | `LP-APK-005`, `LP-APK-009`, `LP-APK-010` |
| Cards | Web usa branco, borda clara, sombra suave e radius menor | Android usa cards limpos com radius muito maior e sem elevacao | base boa, mas precisa calibracao para ficar menos generica e mais LavaPrime | `medium` | `adjust` | `LP-APK-005` |
| Campos | Web tem campos claros com foco cyan e altura objetiva | Android fields seguem a mesma direcao | falta apenas consolidar tipografia e contraste de placeholder/label | `low` | `keep` | `LP-APK-005` |
| Iconografia | Web usa icones lineares reais | Android usa Material Icons corretos, mas ainda com alguns blocos genericos de hero/placeholder | iconografia final ainda nao esta sistematizada por modulo | `medium` | `adjust` | `LP-APK-005` |
| Acentuacao | Web titulos e labels principais estao em portugues operacional coerente | Android fontes lidas em shell exibem mojibake em varias strings | precisa validacao/normalizacao para aceite visual final | `high` | `needs-confirmation` | `LP-APK-005`, `LP-APK-006`, `LP-APK-007` |
| Placeholders de modulo | Web tem modulos reais para financeiro, relatorios, servicos e empresa | Android ainda usa `ModuleScreen` para varios modulos | placeholder nao pode contaminar a linguagem visual final | `critical` | `replace` | `LP-APK-005` a `LP-APK-026` |
| Security/Sync | Web nao define linguagem final aqui, mas usa semantica clara de estados e operacao | Android screen ja e legivel e reutiliza shell | modulo e util, mas checklist ocupa espaco demais e o estado real ainda e pouco dominante | `medium` | `adjust` | `LP-APK-028`, `LP-APK-029` |

## Leitura executiva

### Telas/areas para redesign

- marca/logo/icon
- login
- drawer/menu
- dashboard
- clientes
- veiculos
- produtos
- insumos
- placeholders de modulo

### Telas/areas para ajuste

- patio
- seletor de perfil
- cards
- chips/status
- iconografia
- seguranca/sync

### Telas/areas que podem ser mantidas como base

- direcao de paleta parcial
- campos/formularios
- uso de cards e lista mobile
- conectividade entre shell, top bar e status local
