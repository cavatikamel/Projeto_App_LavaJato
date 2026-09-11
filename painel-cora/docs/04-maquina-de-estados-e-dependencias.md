# 04 — Máquina de estados e dependências

Modelo v2 (unificado). A lista operacional é **`ItensDaTarefa`**: cada item é um
*dado* (sem responsável) ou uma *ação* (com um ou mais responsáveis, ou `Livre`).
Só **ações** percorrem a máquina de estados; *dados* ficam no status `Dado`.

## 1. Ciclo de status (coluna `ItensDaTarefa.Status`)

Escolhas (valores exatos da coluna `Choice`):

| # | Valor | Farol | Aplica a | Significado |
|---|-------|-------|----------|-------------|
| 0 | `Dado` | — | dado | Item informativo, sem execução (não é ação) |
| 1 | `Aguardando dependência` | ⚪ / cinza | ação | Predecessora(s) ainda não concluída(s) |
| 2 | `Liberada` | 🔵 / azul | ação | Pode ser iniciada |
| 3 | `Em execução` | 🟡 / amarelo | ação | Alguém trabalhando |
| 4 | `Enviada para validação` | 🟣 / roxo | ação | Aguardando decisão do gestor |
| 5 | `Concluída` | 🟢 / verde | ação | Finalizada (com ou sem validação) |
| 6 | `Rejeitada` | 🔴 / vermelho | ação | Devolvida com justificativa |

> **`Concluída`** é o estado terminal da **ação**. Não confundir com **`Encerrada`**,
> que é status da **tarefa** (§5), atribuído pelo gestor na conferência final.

## 2. Quem pode executar (multi-responsável)

Uma ação tem `Responsaveis` (Person **múltiplo**) e/ou a flag `Livre`. É **editor**
da ação (pode iniciar, preencher, enviar e concluir) quem satisfaz:

```
ehEditor(ação) =
      ação.Livre = Sim                       (qualquer solucionador)
   OU User().Email ∈ ação.Responsaveis.Email  (é um dos responsáveis)
   OU Perfil = Gestor                          (gestor executa qualquer ação)
```

- **Compartilhado:** se **um** responsável inicia, **qualquer outro** responsável —
  ou o **gestor** — pode continuar e concluir. Não há trava por "quem começou".
- **Criador** executa as ações em que é responsável (aparece como coluna no painel);
  além disso cria tarefas. O **Gestor** executa e valida qualquer ação.
- **Visibilidade:** ver docs/03. Resumindo: dado e `Livre` são visíveis a todos;
  ação atribuída é visível ao(s) responsável(is), ao gestor/criador, e a todos se
  `VisivelTodos = Sim` (mas, nesse caso, **editável** só pelos responsáveis/gestor).

## 3. Diagrama de transições (ação)

```
                        (materialização)
                               │
        tem dependência? ──sim──► ┌───────────────────────┐
               │                  │ Aguardando dependência│
               │não               └───────────┬───────────┘
               │       todas as predecessoras Concluída
               ▼                              ▼
          ┌───────────┐   iniciar     ┌──────────────┐
          │  Liberada │──────────────►│  Em execução │
          └───────────┘               └──────┬───────┘
                                              │ concluir / enviar
                          ExigeAprovacao? ────┴──────────┐
                       sim (e não é gestor)          não  │  (ou concluído pelo gestor)
                              ▼                            ▼
                 ┌───────────────────────┐          ┌────────────┐
                 │ Enviada para validação│          │  Concluída │
                 └───────────┬───────────┘          └─────┬──────┘
                   gestor decide                          │ libera dependentes
                  ┌──────────┴──────────┐                 ▼
              valida                rejeita          (reavaliar ações
                  ▼                    ▼              "Aguardando dependência")
            ┌───────────┐       ┌───────────┐
            │ Concluída │       │ Rejeitada │
            └───────────┘       └─────┬─────┘
                                      │ reabrir
                                      └──► Em execução (reenvio)
```

## 4. Transições permitidas (tabela)

| De | Para | Ator | Pré-condição |
|----|------|------|--------------|
| — | `Dado` | Sistema | Item **sem** responsável (não é ação) |
| — | `Aguardando dependência` | Sistema | Ação materializada **com** dependência(s) não concluída(s) |
| — | `Liberada` | Sistema | Ação materializada **sem** dependência |
| `Aguardando dependência` | `Liberada` | Sistema | **Todas** as predecessoras chegaram a `Concluída` |
| `Liberada` | `Em execução` | Editor | É responsável, `Livre`, ou gestor |
| `Em execução` | `Enviada para validação` | Editor | `ExigeAprovacao = Sim` **e** ator ≠ Gestor; valor preenchido; evidência anexada se exigida |
| `Em execução` | `Concluída` | Editor | `ExigeAprovacao = Não` **ou** ator = Gestor; valor preenchido; evidência anexada se exigida |
| `Enviada para validação` | `Concluída` | Gestor | — (validação/aprovação) |
| `Enviada para validação` | `Rejeitada` | Gestor | `Justificativa` preenchida |
| `Rejeitada` | `Em execução` | Editor | Reabre para correção e reenvio |
| qualquer | (sem mudança) | — | Transições não listadas são **bloqueadas** |

Regras invariantes:

- **Só o Gestor valida ou rejeita** um item enviado para validação.
- Uma ação `ExigeAprovacao = Sim` concluída **pelo próprio gestor** vai direto a
  `Concluída` (o gestor é o aprovador — não há autovalidação em duas etapas).
- **Rejeitar exige `Justificativa`** (não vazia).
- **Concluir/Enviar exige preenchimento**: valor obrigatório do tipo (Texto, Número,
  Data, Check marcado) e, se `ExigeEvidencia = Sim` (ou `Tipo = Evidencia`), ao menos
  um arquivo em `Evidencias`.
- Toda transição grava um item em `HistoricoDaAcao` (usuário, data/hora, status
  anterior, novo, comentário) e pode disparar notificação a **todos** os
  responsáveis (exceto na coluna `Livre`) e/ou ao gestor.

## 5. Dependências (múltiplas)

Uma ação (`ItensDaTarefa.Dependencias`, **lookup múltiplo**) aponta para uma ou mais
ações da **mesma tarefa**.

- Enquanto **qualquer** predecessora não estiver `Concluída`, a ação fica
  `Aguardando dependência` e a UI mostra **"Aguardando: <nomes das pendentes>"**.
- A ação libera **somente quando todas** as predecessoras estão `Concluída`.
- Cadeias e leques (A,B → C) são suportados. A dependência é definida no modelo por
  **`Ordem`** (`DependenciaOrdens`, ex.: "5,7") e vira ID(s) real(is) ao materializar.

> Não há mais o conceito de `ModoLiberacao`. Como uma predecessora com
> `ExigeAprovacao = Sim` só chega a `Concluída` **após** a validação do gestor, o
> efeito "só libera após o gestor" acontece naturalmente. Para liberar sem
> validação, basta a predecessora ter `ExigeAprovacao = Não`.

### 5.1 Regra de propagação (app e/ou fluxo)

Quando **qualquer** ação muda de status, reavaliar as ações que estão
`Aguardando dependência`:

```
Para cada Y com Status = "Aguardando dependência":
    Se todas as Dependencias(Y) têm Status = "Concluída":
        Y.Status ← "Liberada"
        notificar(todos os Responsaveis(Y) exceto Livre, "Liberada")
```

### 5.2 Bloqueio por rejeição

Se uma predecessora **X** é rejeitada, as ações dependentes **permanecem**
`Aguardando dependência` — só liberam quando X for corrigida e reenviada e voltar a
`Concluída`. Não reverter ações já liberadas: reavaliar apenas as que estão
`Aguardando dependência`.

## 6. Status geral da tarefa (`Tarefas.StatusGeral`)

Derivado das ações da tarefa (itens **com** responsável):

| Condição | `StatusGeral` |
|----------|---------------|
| Existe ação e **todas** estão `Concluída` **ou** `Enviada para validação` | `Finalizada` |
| Há ação ainda em aberto (`Liberada`/`Em execução`/`Aguardando`/`Rejeitada`) | `Em andamento` |
| Gestor conferiu e encerrou | `Encerrada` |
| Gestor cancelou (a qualquer momento) | `Cancelada` |

- **Finalizada** = todos os designados cumpriram (concluído ou enviado); a tarefa
  aguarda a **conferência** do gestor.
- **Encerrar** (gestor): aprova as ações ainda em `Enviada para validação`, marca a
  tarefa `Encerrada`, carimba `FechadaEm` e **arquiva** (some do painel principal).
- **Cancelar** (gestor): marca `Cancelada` (com justificativa opcional) mesmo que a
  tarefa não tenha sido iniciada ou esteja parcialmente concluída; também vai ao
  Arquivo.
- Recalcular ao concluir/validar cada ação (no app, ou por fluxo de retaguarda).

## 7. Pseudocódigo das ações do usuário

```
AÇÃO: Iniciar (Liberada → Em execução)
  guarda: ehEditor(ação)
  efeito: Status ← "Em execução"; historico(...)

AÇÃO: Concluir/Enviar (Em execução → Concluída | Enviada para validação)
  guarda: ehEditor(ação); valor preenchido; evidência se exigida
  se ExigeAprovacao e ator ≠ Gestor:
      Status ← "Enviada para validação"; EnviadoValidacaoEm ← Agora
      historico(...); notificar(Gestor, "Enviada p/ validação")
  senão:
      Status ← "Concluída"; se ator = Gestor: ValidadoRejeitadoPor ← ator
      historico(...); propagarDependencias(ação)
      notificar(Gestor, "Concluída"); recalcularStatusGeral(Tarefa)

AÇÃO: Validar (Enviada para validação → Concluída)
  guarda: Perfil = Gestor
  efeito: Status ← "Concluída"; ValidadoRejeitadoPor ← ator
          historico(...); propagarDependencias(ação)
          notificar(Responsaveis, "Concluída"); recalcularStatusGeral(Tarefa)

AÇÃO: Rejeitar (Enviada para validação → Rejeitada)
  guarda: Perfil = Gestor; Justificativa não vazia
  efeito: Status ← "Rejeitada"; ValidadoRejeitadoPor ← ator
          historico(..., comentário=Justificativa)
          notificar(Responsaveis, "Reprovada"); recalcularStatusGeral(Tarefa)

AÇÃO: Reabrir após rejeição (Rejeitada → Em execução)
  guarda: ehEditor(ação)
  efeito: Status ← "Em execução"; historico(...)

AÇÃO: Encerrar tarefa (conferência do gestor)
  guarda: Perfil = Gestor
  efeito: aprova ações em "Enviada para validação" → "Concluída"
          Tarefa.StatusGeral ← "Encerrada"; FechadaEm ← Agora
          notificar(participantes, "Encerrada"); arquiva

AÇÃO: Cancelar tarefa
  guarda: Perfil = Gestor
  efeito: Tarefa.StatusGeral ← "Cancelada"; FechadaEm ← Agora
          CancelJustificativa ← texto (opcional)
          notificar(participantes, "Cancelada"); arquiva
```
