# LavaPrime Web Boundary Risk Analysis

## 1. Objetivo

Classificar os riscos da separacao gradual do monolito web.

## 2. Riscos criticos

| Nivel | Risco | Area | Impacto | Mitigacao |
| --- | --- | --- | --- | --- |
| Critico | Quebrar pagamento de atendimento ao mover codigo financeiro ou de patio | patio, financeiro | perda de registro, saldo errado ou recibo inconsistente | nao extrair financeiro/patio antes de testes reforcados |
| Critico | Perder rastreabilidade entre `cashEntries`, `openPayments`, invoices e patio | financeiro | divergencia de caixa, fatura e saldo aberto | manter esses fluxos no monolito ate boundary dedicada e testes |
| Critico | Alterar ordem de execucao dos binds do DOM | navegacao, UI | telas e botoes deixam de responder | preservar bootstrap e validar navegacao principal |
| Critico | Mover persistencia local sem preservar chaves e normalizacao | dados locais | perda de configuracoes, produtos, insumos ou caixa local | criar adaptador com contrato e rollback antes de migrar |

## 3. Riscos altos

| Nivel | Risco | Area | Impacto | Mitigacao |
| --- | --- | --- | --- | --- |
| Alto | Criar circularidade entre modulos futuros | todos | build passa, mas runtime falha ou inicializa fora de ordem | extrair por API simples e dependencias unidirecionais |
| Alto | Quebrar relatorios e PDFs ao separar documentos | documentos | perda de recibos, checklists ou relatorios | testar ao menos um documento por familia |
| Alto | Quebrar master data ao separar clientes e veiculos | cadastros | placa, owner e faturamento podem divergir | seguir `MASTER_DATA_ENTITY_MODEL.md` e smoke dedicado |
| Alto | Separar inventario sem preservar movimentos | produtos/insumos | estoque incorreto ou venda sem baixa | validar produto, insumo, venda e movimento |
| Alto | Confundir extracao fisica com melhoria de regra | todos | mudanca cresce e perde rollback simples | cada fatia deve mover codigo sem alterar comportamento |

## 4. Riscos medios

| Nivel | Risco | Area | Impacto | Mitigacao |
| --- | --- | --- | --- | --- |
| Medio | Mover `sessionBoundary` e perder sincronizacao legada | sessao | `selectedProfile` ou `activeSessionUser` divergem | manter adaptador de compatibilidade e smoke de login |
| Medio | Mover `accessBoundary` e bloquear area administrativa | autorizacao | admin ou operador perde acesso esperado | validar admin, operador, patio, settings e financeiro |
| Medio | Extrair constantes usadas por renderizacao | UI | labels, opcoes ou icones quebram | manter nomes exportados e smoke das telas principais |
| Medio | Extrair helpers puros com diferenca sutil de formatacao | utilitarios | moeda, datas ou placa ficam inconsistentes | testar formatadores com exemplos representativos |

## 5. Riscos baixos

| Nivel | Risco | Area | Impacto | Mitigacao |
| --- | --- | --- | --- | --- |
| Baixo | Mover textos ou arrays estaticos pouco usados | constantes | build ou tela especifica falha rapido | extracao pequena e rollback direto |
| Baixo | Mover helpers de CSV/texto sem alterar chamadas | utilitarios | impacto restrito a exportacao | validar build e uma exportacao manual quando aplicavel |
| Baixo | Criar arquivos documentais de planejamento | docs | nenhum impacto funcional | revisao textual e gate tecnico |

## 6. Criterios de bloqueio

Uma extracao futura deve parar se exigir:

- alterar regra de negocio;
- alterar fluxo visual;
- alterar banco, Supabase ou Android;
- instalar dependencia;
- reescrever grandes blocos de DOM;
- migrar dados locais;
- alterar schema;
- tocar financeiro e patio na mesma fatia.

## 7. Criterios de rollback

Rollback futuro deve ser considerado obrigatorio quando:

- build falhar;
- `verify:build` falhar;
- `node --check` falhar;
- login admin ou operador falhar;
- logout falhar;
- admin perder acesso esperado;
- operador perder acesso ao patio;
- fluxo financeiro ou de patio afetado apresentar erro;
- console exibir erro visivel durante smoke obrigatorio.

## 8. Decisao desta fase

O risco geral de `LP-WEB-002` como planejamento e baixo.

O risco das futuras extracoes varia por dominio:

- baixo para helpers puros e policy helpers;
- medio para sessao, autorizacao e navegacao;
- alto para configuracoes, documentos, master data e inventario;
- critico para financeiro, pagamento e patio.

## 9. Resultado de LP-WEB-004

`LP-WEB-004` executou a extracao de risco medio previamente planejada.

Mitigacoes aplicadas:

- somente `sessionBoundary` e `accessBoundary` foram extraidas;
- a API publica foi preservada;
- `selectedProfile` e `activeSessionUser` continuaram sincronizados pelo `app/main.js`;
- nenhuma regra de negocio foi alterada;
- nenhuma tela, CSS, banco, Supabase, Android ou dependencia foi tocada;
- rollback permanece simples, restaurando as factories no `app/main.js`.

Risco remanescente:

- a autorizacao continua local ao frontend;
- a matriz de permissoes ainda nao e consumida automaticamente;
- financeiro e patio permanecem dominios criticos e nao foram extraidos.
