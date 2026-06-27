# LavaPrime Regression Matrix

## Objetivo

Relacionar cada tipo de mudanca aos fluxos minimos de validacao obrigatoria.

Esta matriz serve para reduzir subjetividade e impedir que uma fatia avance sem validar o impacto mais provavel.

## Legenda de fluxos

- `LA`: login administrador
- `LO`: login operador
- `LG`: logout
- `PA`: acesso ao patio
- `AD`: acesso administrativo
- `NV`: navegacao principal
- `CD`: cadastros principais
- `FN`: financeiro principal
- `RL`: relatorios e documentos

## Matriz

| Mudanca | LA | LO | LG | PA | AD | NV | CD | FN | RL |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| LP-WEB-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional | Opcional |
| LP-SEC-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional | Opcional |
| LP-SEC-003 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional |
| LP-DATA-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-DATA-004 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-002 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional |
| LP-TEST-002 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Opcional | Opcional | Opcional |
| LP-WEB-003 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-007 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-007-REVISION | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-008 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-009 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-010 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-ADAPTER-HELPERS-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-TEST-AUTO-003 | Opcional | Opcional | Opcional | Opcional | Opcional | Opcional | Opcional | Opcional | Opcional |
| LP-PERM-001 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |
| LP-WEB-004 | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio | Obrigatorio |

## Regras de leitura

- `Obrigatorio` significa que o fluxo deve ser executado e registrado.
- `Opcional` significa que o fluxo entra quando a mudanca tocar o modulo correspondente ou gerar risco indireto relevante.
- Se houver duvida, executar o fluxo.

## Pacotes minimos recomendados

### Mudancas de sessao, perfil, permissao ou autenticacao

- `LA`
- `LO`
- `LG`
- `PA`
- `AD`
- `NV`

Quando a mudanca tocar regras de permissao, tambem devem ser avaliados os cenarios de `docs/primyo-permissions/PERMISSION_TEST_SCENARIOS.md`.

### Mudancas de dados ou financeiro

- pacote anterior
- `CD`
- `FN`
- `RL` quando houver emissao documental

### Mudancas de contratos e adapters web

- `LA`
- `LO`
- `LG`
- `PA`
- `AD`
- `NV`
- `CD`
- `FN`
- `RL`

Regra:

- mesmo quando a fatia for documental ou de adapter puro, tratar qualquer traducao entre legado e contrato como impacto potencial em todo o produto ate que exista segregacao maior por dominio.

Checklist complementar obrigatorio para futuras fases de adapter:

- validar entrada legada valida;
- validar entrada legada incompleta;
- validar campos obrigatorios ausentes;
- validar conversao para contrato;
- validar compatibilidade com `contractVersion`;
- validar ausencia de alteracao funcional no runtime.
- validar ausencia de efeitos colaterais sobre a entrada legada quando o adapter ainda nao estiver integrado ao produto.

Cobertura tecnica minima agora esperada para adapters puros:

- arquivo do adapter presente no workspace;
- exports minimos protegidos no gate quando o modulo for promovido a critico;
- importacao do adapter em Node puro;
- `node --check` do adapter;
- ausencia de integracao funcional prematura;
- compatibilidade explicita com `contractVersion`.
- envelope aderente ao padrao compartilhado com `payload`, `warnings`, `validation` e `metadata`.
- `customerAdapter` revisado tratado como baseline de regressao estrutural para os proximos adapters.
- `vehicleAdapter` tratado como segunda prova de repetibilidade do baseline estrutural dos adapters puros.
- `serviceAdapter` tratado como terceira prova de repetibilidade do baseline estrutural dos adapters puros.
- `productAdapter` tratado como quarta prova de repetibilidade do baseline estrutural dos adapters puros.
- todo novo adapter puro deve ser incorporado ao Adapter Contract Gate com pelo menos uma fixture valida e uma fixture invalida antes de qualquer integracao ao runtime.
- futuras mudancas em gate, helpers comuns de adapter, resolucao de IDs ou integracao funcional devem revalidar `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `productAdapter` em conjunto antes de avancar.
- cenarios validos e invalidos controlados devem continuar cobrindo `organizationId`, timestamps, `sourceId`, `id` canonico, envelope, `warnings` e `missingRequiredFields`.
- o estado oficial atual do Adapter Contract Gate cobre `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `productAdapter` como baseline minima obrigatoria da trilha.
- `app/adapters/shared/adapterHelpers.js` passa a ser parte do baseline estrutural minimo e deve ser validado por `node --check`.
- a regressao estrutural agora tambem deve provar que os quatro adapters continuam importando o helper compartilhado sem ganhar dependencia de runtime.
- a consolidacao de helpers nao autoriza mudanca de API publica, `contractVersion`, `contractName` ou integracao funcional antecipada.
- alteracoes em `adapterHelpers.js` passam a impactar simultaneamente `customerAdapter`, `vehicleAdapter`, `serviceAdapter` e `productAdapter`, exigindo revalidacao conjunta dos quatro adapters, do Adapter Gate, do Primyo Gate, do build e do verify.
- qualquer quinto adapter promovido a baseline deve entrar no Adapter Gate no mesmo slice da sua criacao, antes de qualquer integracao funcional ou abertura de Supabase.

Observacao para `LP-TEST-AUTO-003`:

- por ser uma fase de gate e documentacao, os fluxos funcionais ficam `Opcional` na matriz;
- ainda assim, a validacao tecnica do pacote da fase continua obrigatoria.

### Mudancas de navegacao ou modularizacao web

- `LA`
- `LO`
- `LG`
- `PA`
- `AD`
- `NV`
- `CD` quando a area tocada envolver cadastro

## Uso operacional

Antes de iniciar qualquer mudanca:

1. identificar o backlog ID;
2. localizar a linha correspondente nesta matriz;
3. transformar os fluxos `Obrigatorio` no checklist da execucao;
4. registrar resultado no `TEST_EXECUTION_TEMPLATE.md`.
