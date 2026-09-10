# 02 — Modelo de dados (SharePoint Online)

Esquema completo das **10 listas** e da **biblioteca de evidências**. Provisione
com os scripts em [`../provisioning/`](../provisioning/).

## Convenções

- **Nome interno** (coluna `Internal`) sem espaços/acentos — é o que o Power Fx usa.
- **Display** é o rótulo mostrado ao usuário.
- Tipos: `Text`, `Note` (multi-linha), `Number`, `DateTime`, `Boolean` (Sim/Não),
  `Choice`, `Lookup`, `Person`, `Currency`.
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

- **Índices:** `Email`, `Ativo`, `Perfil`.
- **Regra:** nunca excluir um solucionador com histórico; usar `Ativo = Não`.

---

## Lista 2 — `ModelosDeProcesso`

Gabaritos reutilizáveis (admissão, desligamento, férias, fechamento de folha…).

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Nome | `Title` | Text | Ex.: "Admissão" |
| Descrição | `Descricao` | Note | Texto livre |
| Ativo | `Ativo` | Boolean | Só modelos ativos aparecem para instanciar |
| Recorrente | `Recorrente` | Boolean | Marca processos periódicos (folha, ponto) |

---

## Lista 3 — `CamposDeModelo`

Definição dos campos personalizados de cada modelo.

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Modelo | `Modelo` | Lookup → `ModelosDeProcesso` | Coluna alvo: Título |
| Nome do campo | `Title` | Text | Ex.: "CPF", "Salário" |
| Tipo | `Tipo` | Choice | `Texto`, `Numero`, `Data` |
| Obrigatório | `Obrigatorio` | Boolean | Valida no preenchimento da tarefa |
| Ordem | `Ordem` | Number | Ordem de exibição no formulário |

- **Índice:** `Modelo`.

---

## Lista 4 — `AcoesDeModelo`

Ações-gabarito de cada modelo.

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Modelo | `Modelo` | Lookup → `ModelosDeProcesso` | |
| Nome da ação | `Title` | Text | Ex.: "Registrar dados do desligamento" |
| Responsável sugerido | `ResponsavelSugerido` | Lookup → `Solucionadores` | Editável ao instanciar |
| Prazo relativo (dias) | `PrazoRelativo` | Number | Offset em dias vs. D+0 (ex.: -3, 0, 1, 2) |
| Dependência (ordem) | `DependenciaOrdem` | Number | `Ordem` da ação que precede; vazio = sem dependência |
| Checklist | `Checklist` | Note | Um item por linha (roteiro) |
| Evidência obrigatória | `EvidenciaObrigatoria` | Boolean | Se envio de conclusão exige anexo |
| Modo de liberação | `ModoLiberacao` | Choice | `AposEvidencia`, `AposValidacaoGestor` (padrão) |
| Ordem | `Ordem` | Number | Sequência dentro do modelo; base da dependência |

- **Índice:** `Modelo`.
- **Nota:** a dependência no modelo é referenciada por `Ordem` (número estável),
  e só ao materializar vira o ID real da ação da tarefa (ver docs/01, §4).

---

## Lista 5 — `Tarefas`

Ocorrências concretas de um processo (ex.: "Admissão de João Silva").

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Nome | `Title` | Text | Ex.: "Admissão de João Silva" |
| Modelo de origem | `ModeloOrigem` | Lookup → `ModelosDeProcesso` | Vazio se criada do zero |
| Data de referência | `DataReferencia` | DateTime | **D+0**; base do cálculo de prazos |
| Criador | `Criador` | Person | Quem instanciou |
| Status geral | `StatusGeral` | Choice | `Em andamento`, `Concluída`, `Cancelada` |
| Gestor responsável | `GestorResponsavel` | Person | Quem valida/encerra |

- **Índices:** `Status geral`, `DataReferencia`.

---

## Lista 6 — `DadosDaTarefa`

Valores dos campos personalizados por tarefa (EAV: entity-attribute-value).

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Tarefa | `Tarefa` | Lookup → `Tarefas` | |
| Campo | `Campo` | Lookup → `CamposDeModelo` | Nome/tipo do campo |
| Valor texto | `ValorTexto` | Text | Preenchido se `Tipo = Texto` |
| Valor número | `ValorNumero` | Number | Preenchido se `Tipo = Numero` |
| Valor data | `ValorData` | DateTime | Preenchido se `Tipo = Data` |

- **Índice:** `Tarefa`.
- **Regra:** apenas **uma** das três colunas de valor é preenchida, conforme `Tipo`.
- Visível para os solucionadores da tarefa (evita troca por planilha/mensagem).

---

## Lista 7 — `AcoesDaTarefa`

**Núcleo operacional.** Ações materializadas, atribuídas e executadas.

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Tarefa | `Tarefa` | Lookup → `Tarefas` | |
| Nome da ação | `Title` | Text | Copiado da ação de modelo |
| Solucionador | `Solucionador` | Person | Responsável atual |
| Prazo calculado | `PrazoCalculado` | DateTime | `DataReferencia + PrazoRelativo` |
| Status | `Status` | Choice | Ver docs/04 (6 estados) |
| Dependência | `Dependencia` | Lookup → `AcoesDaTarefa` (self) | Ação que precede; vazio = sem |
| Checklist | `Checklist` | Note | Roteiro (um item por linha) |
| Estado do checklist | `ChecklistEstado` | Note | JSON: itens marcados (ver docs/05) |
| Observação | `Observacao` | Note | Anotações do solucionador |
| Evidência obrigatória | `EvidenciaObrigatoria` | Boolean | Copiado do modelo |
| Modo de liberação | `ModoLiberacao` | Choice | `AposEvidencia`, `AposValidacaoGestor` |
| Enviado p/ validação em | `EnviadoValidacaoEm` | DateTime | Carimbo do envio |
| Validado/rejeitado por | `ValidadoRejeitadoPor` | Person | Gestor que decidiu |
| Justificativa | `Justificativa` | Note | Obrigatória na rejeição |
| Ordem | `Ordem` | Number | Preserva a sequência do modelo |

- **Índices:** `Tarefa`, `Solucionador`, `Status`, `PrazoCalculado`.
- Ver a máquina de estados e as regras de transição em docs/04.

---

## Lista 8 — `HistoricoDaAcao`

Trilha de auditoria imutável (append-only). **Nunca editar/excluir itens.**

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Ação da tarefa | `AcaoDaTarefa` | Lookup → `AcoesDaTarefa` | |
| Usuário | `Usuario` | Person | Quem provocou a transição |
| Data/hora | `DataHora` | DateTime | Carimbo |
| Status anterior | `StatusAnterior` | Text | |
| Status novo | `StatusNovo` | Text | |
| Comentário | `Comentario` | Note | Justificativa e/ou links de evidências |

- **Índice:** `AcaoDaTarefa`.

---

## Lista 9 — `Notificacoes`

Central de avisos dentro do app (espelha o que o Power Automate envia).

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| Destinatário | `Destinatario` | Person | |
| Ação | `Acao` | Lookup → `AcoesDaTarefa` | Contexto |
| Tipo | `Tipo` | Choice | `Atribuída`, `Liberada`, `Próxima do vencimento`, `Atrasada`, `Enviada p/ validação`, `Rejeitada`, `Devolvida`, `Encerrada` |
| Mensagem | `Mensagem` | Note | Texto exibido |
| Lida | `Lida` | Boolean | Padrão Não |
| Data/hora | `DataHora` | DateTime | |

- **Índices:** `Destinatario`, `Lida`.

---

## Biblioteca 10 — `Evidencias` (Document Library)

Arquivos de evidência vinculados às ações.

| Display | Interno | Tipo | Detalhe |
|---------|---------|------|---------|
| (arquivo) | — | File | O documento em si |
| Ação da tarefa | `AcaoDaTarefa` | Lookup → `AcoesDaTarefa` | Vínculo obrigatório |
| Tipo de documento | `TipoDocumento` | Choice | Ex.: `Contrato`, `Comprovante`, `Termo`, `Outro` |
| Autor | `Author` | Person | Nativo (quem subiu) |
| Data | `Created` | DateTime | Nativo |

- **Índice:** `AcaoDaTarefa`.
- **Segurança:** por conter dados sensíveis do DP, a herança de permissão dos itens
  pode ser quebrada por automação (ver docs/03 e docs/06).

---

## Diagrama de relacionamentos

```
ModelosDeProcesso 1───* CamposDeModelo
        │
        1───* AcoesDeModelo ──(ResponsavelSugerido)──► Solucionadores
        │
        │ (instancia)
        ▼
     Tarefas 1───* DadosDaTarefa ──(Campo)──► CamposDeModelo
        │
        1───* AcoesDaTarefa ──(Solucionador)──► (Person / Solucionadores)
                    │  │
                    │  └──(Dependencia, self-lookup)
                    │
                    ├───* HistoricoDaAcao
                    ├───* Notificacoes
                    └───* Evidencias (biblioteca)
```
