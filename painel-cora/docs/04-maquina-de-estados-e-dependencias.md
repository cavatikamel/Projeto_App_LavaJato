# 04 — Máquina de estados e dependências

> **Atualizado para o modelo v2.** A coluna de status agora é
> **`ItensDaTarefa.Status`**. O estado terminal de uma **ação** passou a se chamar
> **`Concluída`** (o nome `Encerrada` ficou reservado para a **tarefa**, após a
> conferência do gestor). Uma ação pode ter **vários responsáveis**: **qualquer um
> deles ou o gestor** pode iniciar e concluir, independentemente de quem começou;
> ações **Livre** são executáveis por qualquer solucionador. Dependência é
> **múltipla** — o item libera quando **todas** as predecessoras estão `Concluída`.
> Itens sem responsável (*dados*) usam o status `Dado`.

## 1. Ciclo de status (coluna `ItensDaTarefa.Status`)

Escolhas (valores exatos da coluna `Choice`):

| # | Valor | Farol | Significado |
|---|-------|-------|-------------|
| 1 | `Aguardando dependência` | ⚪ / cinza | Etapa anterior ainda não liberou |
| 2 | `Liberada` | 🔵 / azul | Pode ser iniciada |
| 3 | `Em execução` | 🟡 / amarelo | Solucionador trabalhando |
| 4 | `Enviada para validação` | 🟣 / roxo | Aguardando decisão do gestor |
| 5 | `Encerrada` | 🟢 / verde | Validada e concluída |
| 6 | `Rejeitada` | 🔴 / vermelho | Devolvida com justificativa (impedida) |

## 2. Diagrama de transições

```
                        (materialização)
                               │
              ┌────────────────┴────────────────┐
       tem dependência?                    sem dependência
              │                                  │
              ▼                                  ▼
   ┌───────────────────────┐              ┌───────────┐
   │ Aguardando dependência│──libera─────►│  Liberada │
   └───────────────────────┘              └─────┬─────┘
                                                 │ solucionador inicia
                                                 ▼
                                          ┌──────────────┐
                                          │ Em execução  │
                                          └──────┬───────┘
                                     envia p/ validação (evidência ok)
                                                 ▼
                                    ┌───────────────────────────┐
                          ┌────────►│ Enviada para validação    │
                          │         └──────────┬────────────────┘
                          │            gestor decide
                          │          ┌─────────┴──────────┐
                          │      valida                rejeita
                          │          ▼                    ▼
                          │   ┌────────────┐        ┌───────────┐
                          │   │  Encerrada │        │ Rejeitada │
                          │   └─────┬──────┘        └─────┬─────┘
                          │         │ libera dependentes  │ devolve p/ correção
                          │         ▼                     │
                          │   (próximas ações)            └──► volta p/ Em execução
                          │                                     (reenvio) 
                          └─────────────────────────────────────┘
```

## 3. Transições permitidas (tabela)

| De | Para | Ator | Pré-condição |
|----|------|------|--------------|
| — | `Aguardando dependência` | Sistema | Ação materializada **com** dependência não encerrada |
| — | `Liberada` | Sistema | Ação materializada **sem** dependência |
| `Aguardando dependência` | `Liberada` | Sistema | Dependência atingiu o gatilho do modo de liberação |
| `Liberada` | `Em execução` | Solucionador | É o responsável |
| `Em execução` | `Enviada para validação` | Solucionador | Evidência anexada **se** `EvidenciaObrigatoria` |
| `Enviada para validação` | `Encerrada` | Gestor | — |
| `Enviada para validação` | `Rejeitada` | Gestor | `Justificativa` preenchida |
| `Rejeitada` | `Em execução` | Solucionador | Reabre para correção e reenvio |
| qualquer | (sem mudança) | — | Transições não listadas são **bloqueadas** |

Regras invariantes:

- **O solucionador nunca encerra** definitivamente. O máximo que faz é
  `Enviada para validação`.
- **Encerrar** e **Rejeitar** são exclusivos do **Gestor**.
- **Rejeitar exige `Justificativa`** (não vazia).
- **Enviar exige evidência** quando `EvidenciaObrigatoria = Sim` (contagem de itens
  em `Evidencias` para a ação > 0).
- Toda transição grava um item em `HistoricoDaAcao` (usuário, data/hora, status
  anterior, novo, comentário) e pode disparar notificação.

## 4. Dependências

Uma ação (`AcoesDaTarefa.Dependencia`) aponta para outra ação da **mesma tarefa**.

- Enquanto a dependência não estiver satisfeita, a ação fica
  `Aguardando dependência` e a UI exibe **"Aguardando etapa anterior"**.
- Cadeias A→B→C são suportadas (cada ação aponta para a imediatamente anterior).

### 4.1 Modos de liberação (`ModoLiberacao`)

| Valor | Gatilho que libera a próxima ação |
|-------|-----------------------------------|
| `AposValidacaoGestor` (**padrão**) | A dependência chega a `Encerrada` (validada) |
| `AposEvidencia` | A dependência chega a `Enviada para validação` **com** evidência anexada |

> **Recomendação do projeto:** liberar **somente após validação do gestor**, salvo
> processos urgentes explicitamente configurados como `AposEvidencia`.

### 4.2 Regra de propagação (executada pelo app e/ou por fluxo)

Ao uma ação **X** mudar de status, avaliar todas as ações **Y** cuja
`Dependencia = X`:

```
Para cada Y com Dependencia = X e Status = "Aguardando dependência":
    Se Y.ModoLiberacao = "AposValidacaoGestor" e X.Status = "Encerrada":
        Y.Status ← "Liberada"; notificar(Y.Solucionador, "Liberada")
    Se Y.ModoLiberacao = "AposEvidencia"
       e X.Status = "Enviada para validação"
       e existe evidência de X:
        Y.Status ← "Liberada"; notificar(Y.Solucionador, "Liberada")
```

### 4.3 Bloqueio por rejeição

Se **X** é rejeitada/impedida, as ações dependentes **permanecem**
`Aguardando dependência` — nunca são liberadas enquanto X não for corrigida e
atingir de novo o gatilho. Não reverter ações já liberadas por engano: preferir
reavaliar apenas as que estão `Aguardando dependência`.

## 5. Status geral da tarefa (`Tarefas.StatusGeral`)

Derivado das ações:

| Condição | `StatusGeral` |
|----------|---------------|
| Todas as ações `Encerrada` | `Concluída` |
| Ao menos uma ação não encerrada e nenhuma rejeitada travando | `Em andamento` |
| Tarefa interrompida manualmente pelo gestor | `Cancelada` |

Recalcular ao encerrar cada ação (no app ao validar, ou por fluxo de retaguarda).

## 6. Pseudocódigo das ações do usuário

```
AÇÃO: Iniciar (Liberada → Em execução)
  guarda: usuárioAtual = Solucionador
  efeito: Status ← "Em execução"; historico(...)

AÇÃO: Enviar para validação (Em execução → Enviada para validação)
  guarda: usuárioAtual = Solucionador
  guarda: se EvidenciaObrigatoria então contarEvidencias(ação) > 0
  efeito: Status ← "Enviada para validação"; EnviadoValidacaoEm ← Agora
          historico(...); notificar(Gestor, "Enviada p/ validação")

AÇÃO: Validar (Enviada para validação → Encerrada)
  guarda: Perfil = Gestor
  efeito: Status ← "Encerrada"; ValidadoRejeitadoPor ← usuárioAtual
          historico(...); propagarDependencias(ação)
          notificar(Solucionador, "Encerrada"); recalcularStatusGeral(Tarefa)

AÇÃO: Rejeitar (Enviada para validação → Rejeitada)
  guarda: Perfil = Gestor
  guarda: Justificativa não vazia
  efeito: Status ← "Rejeitada"; ValidadoRejeitadoPor ← usuárioAtual
          historico(..., comentário=Justificativa)
          notificar(Solucionador, "Rejeitada")

AÇÃO: Reabrir após rejeição (Rejeitada → Em execução)
  guarda: usuárioAtual = Solucionador
  efeito: Status ← "Em execução"; historico(...)
```
