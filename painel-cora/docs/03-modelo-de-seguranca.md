# 03 — Modelo de segurança

> **Princípio:** o filtro do Power Apps **não** é controle de acesso. Um usuário
> mal-intencionado pode contornar a UI e chamar o conector direto. A proteção real
> vem das **permissões do SharePoint** e dos **grupos do Entra**. Por se tratar do
> Departamento Pessoal (dados sensíveis), reforçar com quebra de herança em itens.

## 1. Grupos do Microsoft Entra

Criar (ou reutilizar) três grupos de segurança corporativos:

| Grupo | Membros | Papel |
|-------|---------|-------|
| `SG-Cora-Gestores` | Gestores de DP | Acesso global (leitura/escrita em tudo) |
| `SG-Cora-Criadores` | Criadores designados | Criam tarefas e distribuem ações |
| `SG-Cora-Solucionadores` | Executores | Acesso restrito às próprias ações/evidências |

O perfil funcional dentro do app vem da lista `Solucionadores.Perfil`; os grupos do
Entra governam o acesso **de dados**. Manter os dois alinhados (ver docs/06 —
sincronização opcional).

## 2. Permissões por lista (site SharePoint dedicado)

Criar um **site de equipe dedicado** (`/sites/PainelCora`) para isolar os dados.
Remover o grupo "Membros do site" padrão do acesso amplo e conceder por grupo:

| Lista / Biblioteca | Gestores | Criadores | Solucionadores |
|--------------------|----------|-----------|----------------|
| `Solucionadores` | Controle total | Leitura | Leitura |
| `ModelosDeProcesso` | Controle total | Contribuir | Leitura |
| `CamposDeModelo` | Controle total | Contribuir | Leitura |
| `AcoesDeModelo` | Controle total | Contribuir | Leitura |
| `Tarefas` | Controle total | Contribuir | Leitura* |
| `DadosDaTarefa` | Controle total | Contribuir | Leitura* |
| `AcoesDaTarefa` | Controle total | Contribuir | **Contribuir (item próprio)** |
| `HistoricoDaAcao` | Controle total | Contribuir (adicionar) | Adicionar |
| `Notificacoes` | Controle total | Contribuir | Leitura (próprias) |
| `Evidencias` | Controle total | Contribuir | **Contribuir (item próprio)** |

\* Leitura restrita via permissão de item (ver §4) para tarefas nas quais o
solucionador participa.

## 3. Configurações de lista úteis

Em `AcoesDaTarefa`, `Evidencias` e `Notificacoes`, em **Configurações avançadas**:

- **Permissões de item →** "Ler itens criados pelo usuário" + "Editar itens criados
  pelo usuário" **não** basta (o solucionador não é o *autor* da ação — o criador é).
  Por isso a restrição real é feita por **quebra de herança via fluxo** (§4).

## 4. Quebra de herança por automação (dados sensíveis)

Como o solucionador precisa ver **apenas** as ações/evidências das tarefas em que
atua, e não é o autor do item, use Power Automate para ajustar permissões de item:

**Fluxo `Cora - Ajustar permissoes da acao`** (ver docs/06):

1. Gatilho: item criado/modificado em `AcoesDaTarefa` (ou ao materializar a tarefa).
2. Ação HTTP ao SharePoint: `breakRoleInheritance(copyRoleAssignments=false)`.
3. Conceder ao `Solucionador` da ação o nível **Contribuir** naquele item.
4. Conceder a `SG-Cora-Gestores` e ao `GestorResponsavel` **Controle total**.
5. Conceder ao `Criador`/`SG-Cora-Criadores` **Leitura/Contribuir** conforme regra.
6. Ao **reatribuir** a ação (troca de solucionador), remover a atribuição antiga e
   conceder ao novo.

Repetir a lógica para os arquivos em `Evidencias`, amarrando pela coluna
`AcaoDaTarefa` → mesmo solucionador/gestores.

> Endpoint REST de referência:
> `POST _api/web/lists/getbytitle('AcoesDaTarefa')/items(<id>)/breakroleinheritance(copyRoleAssignments=false,clearSubscopes=true)`
> depois `roleassignments/addroleassignment(principalid=<id>,roledefid=<Contribute>)`.

## 5. Acesso global dos gestores

- `SG-Cora-Gestores` recebe **Controle total** no site → enxerga e edita tudo,
  inclusive após quebras de herança (a concessão explícita ao grupo é reaplicada
  pelo fluxo em cada item).

## 6. Camada de UI (defesa em profundidade)

O app **também** filtra por perfil — não como segurança, mas como ergonomia:

- Solucionador: painel mostra só colunas/linhas com ações suas.
- Botões de "Validar/Encerrar/Rejeitar" só aparecem para `Perfil = Gestor`.
- Botões de "Criar tarefa/modelo" só para `Gestor`/`Criador`.

Ver as fórmulas de visibilidade em docs/05.

## 7. Checklist de segurança

- [ ] Site dedicado `/sites/PainelCora` com herança do site quebrada.
- [ ] Três grupos do Entra criados e populados.
- [ ] Permissões por lista aplicadas conforme §2.
- [ ] Fluxo de quebra de herança em `AcoesDaTarefa` e `Evidencias` testado
      (solucionador A **não** vê ação do solucionador B).
- [ ] Gestores validados com acesso global.
- [ ] Trilha `HistoricoDaAcao` sem permissão de *exclusão* para ninguém além de
      administradores.
- [ ] Conector SharePoint compartilhado no app com as permissões corretas.
