# 07 — Interface visual

Design **calmo e sereno**: fundo claro com azul-gelo e detalhes rosa-pó, poucos
negritos, cards discretos, popups claros e linguagem simples.

## 1. Paleta (tokens)

| Token | Hex | Uso |
|-------|-----|-----|
| `fundo` | `#F5F8FC` | Fundo geral (branco azul-gelo) |
| `cartao` | `#FFFFFF` | Cards e popups |
| `azulGelo` | `#DCE9F5` | Realces suaves, cabeçalhos, chips |
| `azul` | `#4A78B0` | Ação primária, títulos essenciais |
| `rosaPo` | `#F3DDE3` | Detalhes, realce secundário |
| `rosa` | `#C98CA0` | Acentos, badges discretos |
| `texto` | `#33404F` | Texto principal |
| `textoSuave` | `#6B7A8D` | Texto secundário, legendas |
| `borda` | `#E4EAF1` | Bordas de card 1px |

Definidos em `App.OnStart` como `gblTema` (ver docs/05 §1).

## 2. Farol de status

| Status | Emoji | Fundo do card | Texto |
|--------|-------|---------------|-------|
| Aguardando dependência | ⚪ | `#E7EBF0` | "Aguardando etapa anterior" |
| Liberada | 🔵 | `#DCE9F5` | nome da ação |
| Em execução | 🟡 | `#FBF3D6` | nome da ação |
| Enviada para validação | 🟣 | `#ECE1F2` | nome da ação |
| Encerrada | 🟢 | `#DCEEDD` | nome da ação |
| Rejeitada | 🔴 | `#F6DADE` | nome + "revisar" |

Cores de fundo do farol são pastéis para manter a serenidade; o emoji dá o sinal
rápido. Fórmula `Switch` pronta em docs/05 §2.3.

## 3. Tipografia

- **Fonte:** *San Francisco* quando disponível; **fallback Segoe UI** no Windows.
  No Power Apps, defina a fonte dos controles como `"Segoe UI"` (SF não é fonte
  padrão do Windows; Segoe UI é o fallback natural). Para web/Teams, a stack CSS
  equivalente seria `-apple-system, "Segoe UI", sans-serif`.
- **Pesos:** poucos negritos — usar **bold apenas** em títulos de tela, nome da
  tarefa no popup e rótulos essenciais. Corpo em regular.
- **Escala sugerida:** título 20–24, subtítulo 16, corpo 14, legenda 12.

## 4. Componentes

- **Card de célula:** cantos arredondados (raio 8), sombra sutil, borda 1px
  `borda`, padding interno confortável. Conteúdo: emoji de status + nome da ação +
  prazo (dd/mm) + iniciais do responsável.
- **Popup:** fundo `cartao`, largura ~640, cabeçalho com nome da ação (bold) e chip
  de status; corpo em seções (Responsável, Prazo, Roteiro, Dados da tarefa,
  Observações, Evidências, Histórico); rodapé com botões.
- **Botões:** primário `azul` (texto branco); secundário contorno `azul`;
  destrutivo/rejeição em tom `rosa` (nunca vermelho forte — manter serenidade).
- **Chips/badges:** fundo `azulGelo` ou `rosaPo`, texto `texto`.

## 5. Layout do painel matricial

```
┌──────────────────────────────────────────────────────────────────┐
│  Painel Cora — Departamento Pessoal            🔔 3   [Nova tarefa]│
├───────────────┬──────────┬──────────┬──────────┬─────────────────┤
│  Processo \ 👤 │  Ana     │  Bruno   │  Carla   │  ...            │
├───────────────┼──────────┼──────────┼──────────┼─────────────────┤
│ Admissão João │ 🟢 Dados │ 🔵 Cálc. │  —       │                 │
│ Deslig. Maria │ 🟡 Reg.  │ ⚪ Resc. │ 🟣 Doc.  │                 │
│ Férias julho  │  —       │ 🔴 Aviso │ 🟢 Escala│                 │
└───────────────┴──────────┴──────────┴──────────┴─────────────────┘
```

- Primeira coluna fixa (nome do processo/tarefa).
- Colunas = solucionadores ativos; roláveis na horizontal.
- Célula vazia (`—`) quando não há ação para o cruzamento.

## 6. Acessibilidade e tom

- Contraste mínimo AA para texto sobre pastéis (usar `texto`/`textoSuave`, não cores
  claras sobre claras).
- Linguagem simples e direta nos rótulos ("Enviar para validação", "Rejeitar",
  "Anexar evidência").
- Mensagens de erro gentis e específicas ("Anexe ao menos uma evidência antes de
  enviar.").
