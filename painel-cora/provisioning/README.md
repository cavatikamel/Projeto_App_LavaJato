# Provisionamento SharePoint

Scripts para criar as listas, colunas, escolhas e índices do Painel Cora.

## Opções

1. **PnP PowerShell** (recomendado, canônico) —
   [`scripts/Provision-PainelCora.ps1`](scripts/Provision-PainelCora.ps1).
   Idempotente e com nomes internos explícitos.
2. **Template PnP (XML)** — se preferir um artefato declarativo, gere-o **a partir
   de um site já provisionado** com:
   ```powershell
   Get-PnPSiteTemplate -Out ./pnp-template.xml -Handlers Lists
   ```
   e reaplique em outros ambientes com `Invoke-PnPSiteTemplate -Path ./pnp-template.xml`.
   (Não versionamos um XML manual aqui para evitar divergência com o esquema.)

## Pré-requisitos

- Módulo **PnP.PowerShell**:
  ```powershell
  Install-Module PnP.PowerShell -Scope CurrentUser
  ```
- Um site já criado (ex.: `https://<tenant>.sharepoint.com/sites/PainelCora`).
- Permissão de administrador do site.

## Uso (script)

```powershell
Connect-PnPOnline -Url "https://<tenant>.sharepoint.com/sites/PainelCora" -Interactive
./scripts/Provision-PainelCora.ps1
```

O script é **idempotente**: verifica existência antes de criar listas/colunas.

## Depois de provisionar

- Amarre os *lookups* que dependem de ordem de criação (o script cria as listas
  primeiro e as colunas de lookup depois).
- Aplique a segurança conforme [`../docs/03-modelo-de-seguranca.md`](../docs/03-modelo-de-seguranca.md).
- Marque os índices sugeridos em [`../docs/02-modelo-de-dados-sharepoint.md`](../docs/02-modelo-de-dados-sharepoint.md).

> **Nota:** os nomes internos de coluna gerados pelo SharePoint ao criar via UI
> podem diferir do *display*. Estes scripts definem o **nome interno** explícito
> (via `-InternalName` onde suportado) para casar com as fórmulas de docs/05.
