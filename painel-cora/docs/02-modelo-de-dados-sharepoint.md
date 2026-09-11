# 02 — Modelo de dados (SharePoint Online)

Esquema das **8 listas** e da **biblioteca de evidências**. Provisione com os
scripts em [`../provisioning/`](../provisioning/).

> **Modelo unificado (v2).** O protótipo consolidou "campos" e "ações" numa
> **única lista ordenada de itens**: cada item tem um **tipo** e, opcionalmente,
> um ou mais **responsáveis**. Item **sem** responsável é um *dado* (informação
> da tarefa); item **com** responsável é uma *ação* (etapa que alguém executa).
> Por isso `CamposDeModelo`+`AcoesDeModelo` viraram **`ItensDeModelo`** e
> `DadosDaTarefa`+`AcoesDaTarefa` viraram **`ItensDaTarefa`**. Isso casa 1:1 com
> o protótipo e simplifica o app.

## Convenções

- **Nome interno** (coluna `Internal`) sem espaços/acentos — é o que o Power Fx usa.
- **Display** é o rótulo mostrado ao usuário.
- Tipos: `Text`, `Note` (multi-linha), `Number`, `DateTime`, `Boolean` (Sim/Não),
  `Choice`, `Lookup`, `Person`, `PersonMulti` (Person com múltipla seleção),
  `LookupMulti` (Lookup com múltipla seleção).
- Toda lista já traz `ID`, `Created`, `Modified`, `Author`, `Editor` — não repetir.
- **Índices**: marcar as colunas de *lookup*/filtro mais usadas para evitar o limite
  de listas grandes (5.000 itens) em consultas.

---

## Lista 1 — `Solucionadores`

Cadastro de pessoas que executam ou gerenciam ações. Editável (adicionar, renomear,
desativar).

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Nome | `Title` | Text | Nome de exibição |
| E-mail corporativo | `Email` | Text | UPN/e-mail; chave para `User().Email` |
| Entra Object ID | `EntraObjectId` | Text | GUID do usuário no Entra |
| Função | `Funcao` | Text | Cargo/área (ex.: "Analista DP") |
| Ativo | `Ativo` | Boolean | Padrão **Sim**; desativar em vez de excluir |
| Perfil | `Perfil` | Choice | `Gestor`, `Criador`, `Solucionador` |
| Avatar | `Avatar` | Text | Id do avatar de *fallback* (ver nota de foto) |

- **Índices:** `Email`, `Ativo`, `Perfil`.
- **Regra:** nunca excluir um solucionador com histórico; usar `Ativo = Não`.
  Ao desativar, as ações atribuídas a ele ficam **livres** (ver `ItensDaTarefa.Livre`).
- **Foto:** a foto real vem da conta Microsoft via `Office365Users.UserPhotoV2(Email)`.
  `Avatar` guarda só o *fallback* (avatar de animal) quando não há foto no M365;
  na ausência de ambos, o app mostra as **iniciais**.

---

## Lista 2 — `ModelosDeProcesso`

Gabaritos reutilizáveis (admissão, desligamento, férias, fechamento de folha…).
Cadastrados na tela **Tarefas** do app; não entram no painel até serem instanciados.

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Nome | `Title` | Text | Ex.: "Admissão" |
| Descrição | `Descricao` | Note | Texto livre |
| Ativo | `Ativo` | Boolean | Só modelos ativos aparecem para instanciar |
| Recorrente | `Recorrente` | Boolean | Marca processos periódicos (folha, ponto) |

---

## Lista 3 — `ItensDeModelo`

Itens-gabarito de cada modelo (dados **e** ações), na ordem de exibição.
Substitui `CamposDeModelo` + `AcoesDeModelo`.

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Modelo | `Modelo` | Lookup → `ModelosDeProcesso` | |
| Rótulo | `Title` | Text | Ex.: "CPF", "Registrar admissão" |
| Tipo | `Tipo` | Choice | `Texto`, `Numero`, `Data`, `Check`, `Observacoes`, `Evidencia` |
| Responsáveis sugeridos | `ResponsaveisSugeridos` | PersonMulti | Vazio = **dado**; ≥1 = **ação**. Editável ao instanciar |
| Livre | `Livre` | Boolean | Ação executável por **qualquer** solucionador |
| Prazo relativo (dias) | `PrazoRelativo` | Number | Offset vs. D+0 (ex.: -3, 0, 1) — só ações |
| Dependência (ordens) | `DependenciaOrdens` | Text | `Ordem`(ns) predecessora(s), separadas por vírgula; vazio = sem |
| Exige aprovação | `ExigeAprovacao` | Boolean | Ao concluir, vai para validação do gestor |
| Obrigatório | `Obrigatorio` | Boolean | Valida no preenchimento/execução |
| Exige evidência | `ExigeEvidencia` | Boolean | `Tipo = Evidencia` já força; pode marcar em outros tipos |
| Visível a todos | `VisivelTodos` | Boolean | Todos veem; **editável** só pelos responsáveis (e gestor) |
| Valor inicial | `ValorInicial` | Note | Só para *dados* (ex.: default de Check) |
| Ordem | `Ordem` | Number | Sequência; base da dependência |

- **Índice:** `Modelo`.
- **Nota:** a dependência no modelo é referenciada por `Ordem` (número estável),
  e só ao materializar vira o(s) ID(s) real(is) dos itens da tarefa (docs/01, §4).

---

## Lista 4 — `Tarefas`

Ocorrências concretas de um processo (ex.: "Admissão de João Silva").

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Nome | `Title` | Text | Ex.: "Demissão" |
| Subtítulo | `Subtitulo` | Text | Ex.: "Fulano de Tal" (opcional) |
| Modelo de origem | `ModeloOrigem` | Lookup → `ModelosDeProcesso` | Vazio se criada do zero |
| Recorrente | `Recorrente` | Boolean | Marca a ocorrência como periódica |
| Data de referência | `DataReferencia` | DateTime | **D+0**; base do cálculo de prazos |
| Criador | `Criador` | Person | Quem instanciou (também pode executar) |
| Status geral | `StatusGeral` | Choice | `Em andamento`, `Finalizada`, `Encerrada`, `Cancelada` |
| Gestor responsável | `GestorResponsavel` | Person | Quem valida/encerra |
| Encerrada/cancelada em | `FechadaEm` | DateTime | Carimbo do encerramento ou cancelamento |
| Justificativa (cancelamento) | `CancelJustificativa` | Note | Opcional, no cancelamento |

- **Índices:** `StatusGeral`, `DataReferencia`.
- **Status geral:** `Em andamento` → todos os designados cumpriram → `Finalizada`
  (aguarda conferência) → gestor encerra → `Encerrada` (vai para o Arquivo).
  `Cancelada` é ação direta do gestor a qualquer momento. Ver docs/04.

---

## Lista 5 — `ItensDaTarefa`

**Núcleo operacional.** Itens materializados de uma tarefa: *dados* preenchidos e
*ações* executadas. Substitui `DadosDaTarefa` + `AcoesDaTarefa`.

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Tarefa | `Tarefa` | Lookup → `Tarefas` | |
| Rótulo | `Title` | Text | Copiado do item de modelo |
| Tipo | `Tipo` | Choice | `Texto`, `Numero`, `Data`, `Check`, `Observacoes`, `Evidencia` |
| Responsáveis | `Responsaveis` | PersonMulti | Vazio = dado; ≥1 = ação. Qualquer um deles executa |
| Livre | `Livre` | Boolean | Ação executável por qualquer solucionador |
| Prazo calculado | `PrazoCalculado` | DateTime | `DataReferencia + PrazoRelativo` (só ações) |
| Status | `Status` | Choice | Ações: ver docs/04. *Dados* usam `Dado` |
| Dependências | `Dependencias` | LookupMulti → `ItensDaTarefa` (self) | Predecessoras; vazio = sem |
| Exige aprovação | `ExigeAprovacao` | Boolean | Copiado do modelo |
| Obrigatório | `Obrigatorio` | Boolean | Copiado do modelo |
| Exige evidência | `ExigeEvidencia` | Boolean | Copiado do modelo |
| Visível a todos | `VisivelTodos` | Boolean | Copiado do modelo |
| Valor texto | `ValorTexto` | Note | Preenchido se `Tipo ∈ {Texto, Observacoes}` |
| Valor número | `ValorNumero` | Number | Preenchido se `Tipo = Numero` |
| Valor data | `ValorData` | DateTime | Preenchido se `Tipo = Data` |
| Valor check | `ValorCheck` | Boolean | Preenchido se `Tipo = Check` |
| Observação | `Observacao` | Note | Anotações do executor |
| Enviado p/ validação em | `EnviadoValidacaoEm` | DateTime | Carimbo do envio |
| Validado/rejeitado por | `ValidadoRejeitadoPor` | Person | Gestor que decidiu |
| Justificativa | `Justificativa` | Note | Obrigatória na rejeição |
| Ordem | `Ordem` | Number | Preserva a sequência do modelo |

- **Índices:** `Tarefa`, `Status`.
- **Regra de valor:** apenas a coluna de valor compatível com `Tipo` é usada;
  `Evidencia` usa a biblioteca `Evidencias`.
- **Execução compartilhada:** qualquer um dos `Responsaveis` **ou** o gestor pode
  iniciar e concluir a ação, independentemente de quem começou (docs/04).
- Ver a máquina de estados e as regras de transição em docs/04.

---

## Lista 6 — `HistoricoDaAcao`

Trilha de auditoria imutável (append-only). **Nunca editar/excluir itens.**

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Item da tarefa | `ItemDaTarefa` | Lookup → `ItensDaTarefa` | |
| Usuário | `Usuario` | Person | Quem provocou a transição |
| Data/hora | `DataHora` | DateTime | Carimbo |
| Status anterior | `StatusAnterior` | Text | |
| Status novo | `StatusNovo` | Text | |
| Comentário | `Comentario` | Note | Justificativa e/ou links de evidências |

- **Índice:** `ItemDaTarefa`.

---

## Lista 7 — `Notificacoes`

Central de avisos dentro do app (espelha o que o Power Automate envia).

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Destinatário | `Destinatario` | Person | |
| Item | `Item` | Lookup → `ItensDaTarefa` | Contexto (opcional) |
| Tipo | `Tipo` | Choice | `Atribuída`, `Liberada`, `Próxima do vencimento`, `Atrasada`, `Enviada p/ validação`, `Concluída`, `Reprovada`, `Encerrada`, `Cancelada` |
| Mensagem | `Mensagem` | Note | Texto exibido (traz título, subtítulo e etapa) |
| Lida | `Lida` | Boolean | Padrão Não |
| Data/hora | `DataHora` | DateTime | |

- **Índices:** `Destinatario`, `Lida`.

---

## Biblioteca 8 — `Evidencias` (Document Library)

Arquivos de evidência vinculados às ações.

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| (arquivo) | — | File | O documento em si |
| Item da tarefa | `ItemDaTarefa` | Lookup → `ItensDaTarefa` | Vínculo obrigatório |
| Tipo de documento | `TipoDocumento` | Choice | Ex.: `Contrato`, `Comprovante`, `Termo`, `Outro` |
| Autor | `Author` | Person | Nativo (quem subiu) |
| Data | `Created` | DateTime | Nativo |

- **Índice:** `ItemDaTarefa`.
- **Segurança:** contém dados sensíveis do DP. **No piloto** a segurança é
  simplificada (todo o time do DP tem acesso). A quebra de herança por item
  (docs/03/06, fluxo F6) fica para depois do piloto.

---

## Diagrama de relacionamentos

```
ModelosDeProcesso 1───* ItensDeModelo ──(ResponsaveisSugeridos)──► Solucionadores
        │
        │ (instancia)
        ▼
     Tarefas ──(Criador / GestorResponsavel)──► (Person)
        │
        1───* ItensDaTarefa ──(Responsaveis, multi)──► (Person / Solucionadores)
                    │  │
                    │  └──(Dependencias, self-lookup múltiplo)
                    │
                    ├───* HistoricoDaAcao
                    ├───* Notificacoes
                    └───* Evidencias (biblioteca)
```

---

## Nota de migração (v1 → v2)

Se você já tinha provisionado o esquema antigo (10 listas), o modelo unificado
troca quatro listas por duas. Como ainda estamos em fase de piloto (sem dados de
produção), o caminho recomendado é **reprovisionar** num site limpo com o script
atualizado. As demais listas (`Solucionadores`, `ModelosDeProcesso`, `Tarefas`,
`HistoricoDaAcao`, `Notificacoes`, `Evidencias`) só **ganham colunas** — o script
é idempotente e as adiciona sem apagar dados.
