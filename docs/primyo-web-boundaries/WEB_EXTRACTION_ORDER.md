# LavaPrime Web Extraction Order

## 1. Objetivo

Definir a ordem recomendada de extracao futura do `app/main.js`.

Esta ordem nao autoriza implementacao imediata.

## 2. Principios

1. Comecar por blocos pequenos, ja delimitados e com rollback simples.
2. Preservar comportamento e visual em todas as extracoes.
3. Evitar extrair primeiro dominios que gravam dados ou calculam valores financeiros.
4. Separar mudanca fisica de mudanca de regra.
5. Aumentar testes antes de tocar fluxo critico.

## 3. Ordem recomendada

| Ordem | Fronteira | Risco | Justificativa | Gate minimo |
| --- | --- | --- | --- | --- |
| 1 | `sessionBoundary` e `accessBoundary` | Medio | concluido em `LP-WEB-004`; factories extraidas para `app/boundaries/sessionAccessBoundary.js` com API preservada | login admin, login operador, logout, admin e patio |
| 2 | policy helpers de acesso | Baixo/Medio | adiado porque a fatia `LP-WEB-005` nao podia alterar `app/boundaries/sessionAccessBoundary.js` | smoke de navegacao administrativa |
| 3 | formatadores puros e helpers de texto | Baixo | concluido em `LP-WEB-005`; helpers extraidos para `app/utils/textFormatters.js` com chamadas preservadas | build, `node --check`, validacao visual basica |
| 4 | constantes estaticas e opcoes de dominio | Baixo/Medio | reduz volume do arquivo sem alterar regras | build e smoke das telas que usam opcoes |
| 5 | DOM/UI helpers de feedback | Medio | toast, message box e icones sao transversais, mas simples | login, dialogos e navegacao |
| 6 | adaptador de persistencia local | Alto | concluido em `LP-WEB-006` como primeira fatia da boundary; `app/storage/storageBoundary.js` criado e 2 chamadas diretas simples migradas | smoke de configuracoes, produtos, caixa e documentos |
| 7 | business settings boundary | Alto | separa configuracoes estruturantes antes de dominios dependentes | negocio, financeiro do negocio, Pix, metodos |
| 8 | documents/PDF boundary | Alto | muito usado, mas pode virar API por dominio | recibo, checklist, relatorios e comprovantes |
| 9 | master data boundary | Alto | depende de contratos aprovados em `LP-DATA-003` | clientes, veiculos, servicos, equipe |
| 10 | inventory boundary | Alto | cruza produtos, insumos, servicos, estoque e caixa | produto, insumo, estoque, venda |
| 11 | navigation/admin screen boundary | Alto | dispatch central de telas e DOM | navegacao principal completa |
| 12 | finance boundary | Critico | maior risco de dado, saldo e rastreabilidade | caixa, open payments, invoices, parcial, baixa |
| 13 | yard/attendance boundary | Critico | fluxo operacional principal e mais integrado | intake, patio, status, pagamento, recibo |
| 14 | quotes/schedule boundary | Alto | depende de veiculo, cliente, servico, patio e documentos | orcamento, agenda e entrada |

## 4. O que deve ficar por ultimo

Devem esperar cobertura e contrato mais fortes:

- `confirmVehiclePayment(...)`;
- `upsertCashEntryFromVehicle(...)`;
- `upsertOpenPaymentFromVehicle(...)`;
- `settleOpenPayment(...)`;
- `settleInvoice(...)`;
- `attachVehicleToInvoice(...)`;
- `updateVehicleStatus(...)`;
- qualquer rotina que mexa simultaneamente em patio, financeiro e documento.

## 5. Marcos de seguranca

### Marco A - Fronteiras locais

Objetivo:

- mover apenas fronteiras ja identificadas e helpers puros.

Saida esperada:

- `sessionBoundary` e `accessBoundary` fora do corpo principal `concluido em LP-WEB-004`;
- helpers puros de texto e formatacao fora do corpo principal `concluido em LP-WEB-005`;
- comportamento preservado;
- smoke de login/acesso/logout aprovado.

### Marco B - Infra local

Objetivo:

- isolar helpers, constantes, storage local e documentos.

Saida esperada:

- `app/main.js` ainda coordena, mas deixa de hospedar toda infra compartilhada;
- `storageBoundary` passa a existir fora do corpo principal `concluido em LP-WEB-006`.

### Marco C - Dominios mestres

Objetivo:

- isolar clientes, veiculos, servicos, equipe, produtos e insumos.

Saida esperada:

- dominio mestre pronto para contratos de backend.

### Marco D - Dominios criticos

Objetivo:

- isolar financeiro e patio com cobertura reforcada.

Saida esperada:

- dominios prontos para integracao controlada posterior.

## 6. Decisao apos LP-WEB-006

Extracoes fisicas concluidas:

- `sessionBoundary` e `accessBoundary` foram extraidas em `LP-WEB-004`;
- o modulo criado foi `app/boundaries/sessionAccessBoundary.js`;
- helpers puros de texto e formatacao foram extraidos em `LP-WEB-005`;
- o modulo criado foi `app/utils/textFormatters.js`;
- a primeira fatia da `storageBoundary` foi extraida em `LP-WEB-006`;
- o modulo criado foi `app/storage/storageBoundary.js`;
- apenas 2 chamadas diretas simples foram migradas;
- o comportamento foi preservado e o smoke minimo foi aprovado nas tres extracoes.

Percepcao de risco atualizada:

- as tres primeiras extracoes reduziram risco estrutural sem alterar regra de negocio;
- o gate tecnico oficial ja existe, mas ainda nao cobre smoke browser automatizado;
- nova extracao fisica ou nova migracao de storage deve aguardar reforco de regressao ou uma aprovacao especifica de baixo risco;
- `constantes estaticas e opcoes de dominio` sao a proxima extracao fisica candidata de menor risco;
- `policy helpers de acesso` continuam relevantes, mas dependem de autorizacao para alterar `app/boundaries/sessionAccessBoundary.js`.

Proxima etapa recomendada antes de nova extracao fisica:

- `LP-TEST-AUTO-002` para aumentar a protecao contra regressao e tornar futuras extracoes mais seguras.
