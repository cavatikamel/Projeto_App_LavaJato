# Seed de exemplo — Modelos de processo (modelo unificado v2)

Dados de exemplo para popular `ModelosDeProcesso` e `ItensDeModelo` (docs/02).
No modelo unificado, **campos e ações ficam na mesma lista ordenada**: item **sem**
responsável é um *dado*; item **com** responsável (ou `Livre = Sim`) é uma *ação*.
A dependência é referenciada pela **`Ordem`** da(s) ação(ões) predecessora(s)
(coluna `DependenciaOrdens`, várias ordens separadas por vírgula).

---

## Modelo: Admissão  (`Recorrente = Sim`)

### Itens (`ItensDeModelo`) — dados e ações em ordem

| Ordem | Rótulo | Tipo | Responsáveis | Prazo | Dep. | Aprov. | Evid. | Obrig. |
|-------|--------|------|--------------|-------|------|--------|-------|--------|
| 1 | Nome completo | Texto | — (dado) | — | — | — | — | Sim |
| 2 | CPF | Texto | — (dado) | — | — | — | — | Sim |
| 3 | Data de admissão | Data | — (dado) | — | — | — | — | Sim |
| 4 | Cargo | Texto | — (dado) | — | — | — | — | Sim |
| 5 | Coletar documentos do admitido | Evidencia | Analista DP | D-3 | — | Sim | Sim | Sim |
| 6 | Registrar admissão no sistema | Check | Analista DP | D+0 | 5 | Sim | Sim | Sim |
| 7 | Configurar ponto e acessos | Check | TI/DP | D+0 | 6 | Sim | Não | Sim |
| 8 | Inclusão em benefícios | Evidencia | Benefícios | D+1 | 6 | Sim | Sim | Sim |
| 9 | Comunicar gestor e equipe | Check | Business Partner | D+1 | 7 | Não | Não | Não |

> "Dado" (itens 1–4) são informações da tarefa, preenchidas na criação e visíveis
> aos envolvidos. "Ação" (itens 5–9) são etapas atribuídas e executadas.

---

## Modelo: Desligamento  (`Recorrente = Sim`)

### Itens (`ItensDeModelo`)

| Ordem | Rótulo | Tipo | Responsáveis | Prazo | Dep. | Aprov. | Evid. | Obrig. |
|-------|--------|------|--------------|-------|------|--------|-------|--------|
| 1 | Nome completo | Texto | — (dado) | — | — | — | — | Sim |
| 2 | CPF | Texto | — (dado) | — | — | — | — | Sim |
| 3 | Data do desligamento | Data | — (dado) | — | — | — | — | Sim |
| 4 | Motivo | Observacoes | — (dado) | — | — | — | — | Sim |
| 5 | Registrar dados do desligamento | Evidencia | Analista DP | D+0 | — | Sim | Sim | Sim |
| 6 | Calcular rescisão | Evidencia | Analista Folha | D+1 | 5 | Sim | Sim | Sim |
| 7 | Agendar exame demissional | Check | Analista DP | D+0 | 5 | Não | Não | Sim |
| 8 | Revogar acessos e recolher ativos | Check | TI | D+0 | 5 | Sim | Não | Sim |
| 9 | Homologação e pagamento | Evidencia | Business Partner | D+2 | 6 | Sim | Sim | Sim |

> Materializa o exemplo do briefing: **"Calcular rescisão" (6) só libera após
> "Registrar dados" (5) ser concluído** — e, como 5 tem `ExigeAprovacao = Sim`,
> só conta como concluído depois da validação do gestor.

---

## Multi-responsável e "Livre"

- Para uma ação com **vários** responsáveis, informe mais de uma pessoa em
  `ResponsaveisSugeridos`. Qualquer um deles — ou o gestor — inicia e conclui.
- Para uma ação executável por **qualquer** solucionador, marque `Livre = Sim`
  (e deixe `ResponsaveisSugeridos` vazio).

## Como carregar

- Manualmente pela UI do SharePoint, **ou** pela tela **Tarefas** do próprio app,
  **ou** estenda [`scripts/Provision-PainelCora.ps1`](scripts/Provision-PainelCora.ps1)
  com `Add-PnPListItem` para cada linha (criar `ModelosDeProcesso` primeiro,
  guardar o Id e referenciá-lo em `ItensDeModelo.Modelo`).

Exemplo (trecho PnP):
```powershell
$adm = Add-PnPListItem -List "ModelosDeProcesso" -Values @{
    Title="Admissão"; Descricao="Processo de admissão de colaborador";
    Ativo=$true; Recorrente=$true }

# Dado (sem responsável)
Add-PnPListItem -List "ItensDeModelo" -Values @{
    Title="CPF"; Modelo=$adm.Id; Tipo="Texto"; Obrigatorio=$true; Ordem=2 }

# Ação (com responsável, prazo e dependência pela ordem 5)
Add-PnPListItem -List "ItensDeModelo" -Values @{
    Title="Registrar admissão no sistema"; Modelo=$adm.Id; Tipo="Check";
    ResponsaveisSugeridos=@("analista.dp@grupocoroa.com"); PrazoRelativo=0;
    DependenciaOrdens="5"; ExigeAprovacao=$true; ExigeEvidencia=$true;
    Obrigatorio=$true; Ordem=6 }
```
