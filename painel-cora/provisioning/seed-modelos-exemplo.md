# Seed de exemplo — Modelos de processo

Dados de exemplo para popular `ModelosDeProcesso`, `CamposDeModelo` e
`AcoesDeModelo`. Ilustra os exemplos do briefing (admissão, desligamento).
A dependência é referenciada pela **`Ordem`** da ação predecessora.

---

## Modelo: Admissão  (`Recorrente = Sim`)

### Campos (`CamposDeModelo`)

| Ordem | Nome do campo | Tipo | Obrigatório |
|-------|---------------|------|-------------|
| 1 | Nome completo | Texto | Sim |
| 2 | CPF | Texto | Sim |
| 3 | Data de admissão | Data | Sim |
| 4 | Cargo | Texto | Sim |
| 5 | Salário | Numero | Sim |
| 6 | Centro de custo | Texto | Sim |

### Ações (`AcoesDeModelo`)

| Ordem | Nome da ação | Responsável sugerido | Prazo rel. | Dep. (ordem) | Evid. obrig. | Modo liberação |
|-------|--------------|----------------------|-----------|--------------|--------------|----------------|
| 1 | Coletar documentos do admitido | Analista DP | D-3 | — | Sim | AposValidacaoGestor |
| 2 | Registrar admissão no sistema | Analista DP | D+0 | 1 | Sim | AposValidacaoGestor |
| 3 | Configurar ponto e acessos | TI/DP | D+0 | 2 | Não | AposValidacaoGestor |
| 4 | Inclusão em benefícios | Analista Benefícios | D+1 | 2 | Sim | AposValidacaoGestor |
| 5 | Comunicar gestor e equipe | Business Partner | D+1 | 3 | Não | AposEvidencia |

**Checklist (exemplo, ação 1 "Coletar documentos"):**
```
RG e CPF
Comprovante de residência
Carteira de trabalho / eSocial
Exame admissional
Dados bancários
```

---

## Modelo: Desligamento  (`Recorrente = Sim`)

### Campos (`CamposDeModelo`)

| Ordem | Nome do campo | Tipo | Obrigatório |
|-------|---------------|------|-------------|
| 1 | Nome completo | Texto | Sim |
| 2 | CPF | Texto | Sim |
| 3 | Data do desligamento | Data | Sim |
| 4 | Motivo | Texto | Sim |
| 5 | Aviso prévio (dias) | Numero | Não |

### Ações (`AcoesDeModelo`)

| Ordem | Nome da ação | Responsável sugerido | Prazo rel. | Dep. (ordem) | Evid. obrig. | Modo liberação |
|-------|--------------|----------------------|-----------|--------------|--------------|----------------|
| 1 | Registrar dados do desligamento | Solucionador A (Analista DP) | D+0 | — | Sim | AposValidacaoGestor |
| 2 | Calcular rescisão | Solucionador B (Analista Folha) | D+1 | 1 | Sim | AposValidacaoGestor |
| 3 | Agendar exame demissional | Analista DP | D+0 | 1 | Não | AposEvidencia |
| 4 | Revogar acessos e recolher ativos | TI | D+0 | 1 | Não | AposValidacaoGestor |
| 5 | Homologação e pagamento | Business Partner | D+2 | 2 | Sim | AposValidacaoGestor |

> Este modelo materializa o exemplo do briefing: **B (cálculo rescisório) só inicia
> após A (registrar dados) ser validado pelo gestor** — `Dependência = 1`,
> `Modo = AposValidacaoGestor`.

---

## Como carregar

- Manualmente pela UI do SharePoint, **ou**
- Estenda [`scripts/Provision-PainelCora.ps1`](scripts/Provision-PainelCora.ps1) com
  `Add-PnPListItem` para cada linha acima (criar os `ModelosDeProcesso` primeiro,
  guardar os IDs e referenciá-los nos lookups `Modelo`).

Exemplo (trecho PnP):
```powershell
$adm = Add-PnPListItem -List "ModelosDeProcesso" -Values @{
    Title="Admissão"; Descricao="Processo de admissão de colaborador";
    Ativo=$true; Recorrente=$true }

Add-PnPListItem -List "AcoesDeModelo" -Values @{
    Title="Registrar admissão no sistema"; Modelo=$adm.Id;
    PrazoRelativo=0; DependenciaOrdem=1; EvidenciaObrigatoria=$true;
    ModoLiberacao="AposValidacaoGestor"; Ordem=2 }
```
