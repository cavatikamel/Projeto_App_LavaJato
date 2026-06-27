# LavaPrime Change Control

## Objetivo

Estabelecer a regra oficial de controle de mudancas do LavaPrime a partir da fase de adequacao.

Nenhuma mudanca futura devera ser iniciada sem rastreabilidade entre:

- backlog aprovado;
- objetivo da mudanca;
- arquivos afetados;
- risco assumido;
- plano de teste;
- plano de rollback;
- resultado da validacao.

## 1. Regras obrigatorias

- Toda mudanca deve estar vinculada a um item de `ADEQUATION_BACKLOG.md`.
- Toda mudanca deve ter escopo pequeno e reversivel.
- Uma mudanca nao pode misturar backlog IDs nao relacionados sem aprovacao formal.
- Mudancas em autenticacao, permissao, banco, financeiro ou Android exigem aprovacao tecnica explicita antes da implementacao.
- Nao e permitido corrigir "aproveitando a janela" sem registrar novo item de backlog.
- Nao e permitido publicar mudanca sem baseline antes e depois.
- Toda mudanca web deve registrar evidencia de `npm.cmd run primyo:gate`.

## 2. Registro minimo obrigatorio por mudanca

Toda proposta futura devera registrar, no minimo:

- `Change ID`
- `Backlog ID`
- `Titulo`
- `Objetivo`
- `Motivo da mudanca`
- `Arquivos afetados`
- `Area afetada`
- `Risco`
- `Dependencias`
- `Plano de implementacao`
- `Plano de teste`
- `Plano de rollback`
- `Resultado da validacao`
- `Resultado de npm.cmd run primyo:gate`
- `Aprovador tecnico`
- `Data`

## 3. Template oficial de registro

```md
# Change Record

- Change ID:
- Backlog ID:
- Titulo:
- Objetivo:
- Motivo da mudanca:
- Area afetada:
- Arquivos afetados:
- Risco:
- Dependencias:
- Responsavel:
- Aprovador tecnico:
- Data:

## Escopo

## Fora de escopo

## Plano de implementacao

## Plano de teste

## Plano de rollback

## Resultado da validacao

## Evidencias anexadas

## Resultado de npm.cmd run primyo:gate

## Decisao final
```

## 4. Niveis de risco

- `Baixo`: mudanca localizada, com rollback simples e sem impacto em dados ou acesso.
- `Medio`: muda comportamento interno de fluxo conhecido, mas com cobertura de validacao suficiente.
- `Alto`: toca autenticacao, permissao, financeiro, persistencia ou integracao relevante.
- `Critico`: pode afetar acesso, dados, publicacao, sincronizacao ou multiplas superficies simultaneamente.

## 5. Exigencia por nivel de risco

- `Baixo`: baseline minima e rollback simples.
- `Medio`: baseline minima, checklist manual completo e revisao tecnica.
- `Alto`: baseline reforcada, rollback detalhado, aprovacao tecnica explicita e evidencias antes/depois.
- `Critico`: aprovacao tecnica previa, fase dedicada, rollback testavel, janela controlada e criterio de abortar mudanca definido antes de iniciar.

## 6. Criticos que exigem controle reforcado

As categorias abaixo sempre entram como `Alto` ou `Critico`:

- autenticacao;
- sessao;
- permissao;
- faturamento;
- persistencia de dados;
- integracao backend;
- sincronizacao Android;
- configuracao de publicacao.

## 7. Resultado da validacao

Ao final de cada mudanca futura, o resultado devera ser classificado como:

- `Aprovado`
- `Aprovado com ressalva`
- `Bloqueado`
- `Revertido`

Toda classificacao diferente de `Aprovado` deve explicar:

- qual evidencia falhou;
- qual risco permaneceu aberto;
- qual decisao operacional foi tomada.

## 8. Criterio de encerramento

Uma mudanca so pode ser encerrada quando:

- o backlog ID estiver atendido;
- os arquivos alterados estiverem registrados;
- o plano de teste tiver sido executado;
- o rollback estiver atualizado;
- `npm.cmd run primyo:gate` tiver sido executado e registrado para mudancas web;
- a documentacao impactada tiver sido revisada;
- a decisao final estiver assinada pelo aprovador tecnico.

## 9. Gate tecnico oficial

Desde `LP-TEST-AUTO-001`, o gate tecnico oficial minimo do LavaPrime Web e:

```text
npm.cmd run primyo:gate
```

Esse comando deve ser tratado como evidencia obrigatoria em novas mudancas web.

Os comandos individuais de build, verify e `node --check` continuam validos para diagnostico, mas o encerramento formal deve registrar o resultado do gate oficial.

## 10. Encerramentos registrados

### LP-WEB-001

- Change record: `docs/primyo-changes/LP-WEB-001.md`
- Closure: `docs/primyo-changes/LP-WEB-001-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: a `sessionBoundary` foi aceita e incorporada a baseline, mantendo convivencia controlada com variaveis legadas do monolito.

### LP-SEC-001

- Change record: `docs/primyo-changes/LP-SEC-001.md`
- Closure: `docs/primyo-changes/LP-SEC-001-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: a `accessBoundary` foi aceita e incorporada a baseline, mas a autorizacao real e a matriz formal de acesso seguem pendentes.

### LP-WEB-004

- Change record: `docs/primyo-changes/LP-WEB-004.md`
- Closure: `docs/primyo-changes/LP-WEB-004-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `sessionBoundary` e `accessBoundary` foram extraidas para `app/boundaries/sessionAccessBoundary.js`, preservando instanciacao e compatibilidade no `app/main.js`.

### LP-TEST-AUTO-001

- Change record: `docs/primyo-tests/automation/LP-TEST-AUTO-001.md`
- Closure: `docs/primyo-changes/LP-TEST-AUTO-001-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `npm.cmd run primyo:gate` foi adotado como validacao tecnica oficial minima para mudancas futuras no LavaPrime Web, sem instalar dependencias e sem substituir smoke manual.

### LP-WEB-005

- Change record: `docs/primyo-changes/LP-WEB-005.md`
- Closure: `docs/primyo-changes/LP-WEB-005-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: helpers puros de texto e formatacao foram extraidos para `app/utils/textFormatters.js`, preservando chamadas em `app/main.js`, sem alterar storage, Supabase, banco, Android, CSS, layout ou dependencias.

### LP-WEB-006

- Change record: `docs/primyo-changes/LP-WEB-006.md`
- Closure: `docs/primyo-changes/LP-WEB-006-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: a `storageBoundary` foi criada em `app/storage/storageBoundary.js`, absorvendo apenas as 2 chamadas diretas simples de `localStorage` ja centralizadas no monolito, sem migrar novos call sites de dominio e sem alterar Supabase, banco, Android, CSS, layout ou dependencias.

### LP-WEB-003

- Change record: `fase documental sem adapter JS`
- Closure: `docs/primyo-changes/LP-WEB-003-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: a estrategia oficial de adapters do web foi absorvida na baseline sem alterar runtime, e a proxima fatia recomendada passa a ser `LP-WEB-007` com `customerAdapter` como primeira implementacao controlada.
- Observacao operacional: a validacao registrou lock transitorio em `dist/assets/checklist-icons` no primeiro `npm.cmd run primyo:gate`; a reexecucao concluiu com sucesso e o evento ficou documentado no closure.

### LP-WEB-007

- Change record: `docs/primyo-changes/LP-WEB-007.md`
- Closure: `docs/primyo-changes/LP-WEB-007-CLOSURE.md`
- Resultado: `Aceito com observacoes`
- Observacao principal: `customerAdapter` foi aceito como primeiro adapter puro oficial do web, com gate atualizado e sem qualquer integracao a `app/main.js` ou ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar o adapter antes da consolidacao de identidade, envelope e `legacyRefs`.

### LP-DATA-005

- Change record: `fase documental de padronizacao transversal`
- Closure: `encerramento absorvido em backlog, next slice e contratos compartilhados`
- Resultado: `Aceito`
- Observacao principal: foram formalizadas as regras compartilhadas de identidade, envelope, contexto de adapter, `legacyRefs`, status, timestamps e compatibilidade, sem alterar runtime, adapter JS existente ou qualquer comportamento funcional.
- Observacao de risco: a proxima fatia recomendada deve revisar `customerAdapter` para aderir plenamente ao padrao comum antes da criacao de um segundo adapter ou de qualquer integracao ao runtime.

### LP-WEB-007-REVISION

- Change record: `docs/primyo-changes/LP-WEB-007-REVISION.md`
- Closure: `docs/primyo-changes/LP-WEB-007-REVISION-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `customerAdapter` foi alinhado ao baseline compartilhado de identidade, envelope, contexto, `legacyRefs`, status e timestamps, preservando pureza, API publica e ausencia de integracao ao runtime.
- Observacao de risco: a proxima fatia deve criar `vehicleAdapter` sob o mesmo baseline e nao integrar `customerAdapter` ao runtime antes de mais maturidade da trilha.

### LP-WEB-008

- Change record: `docs/primyo-changes/LP-WEB-008.md`
- Closure: `docs/primyo-changes/LP-WEB-008-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `vehicleAdapter` foi aceito como segundo adapter puro oficial do web, aderente ao baseline compartilhado e sem qualquer integracao a `app/main.js` ou ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar adapters ainda; a prioridade recomendada passa a ser reforcar gate e regressao estrutural da trilha em `LP-TEST-AUTO-003`.

### LP-TEST-AUTO-003

- Change record: `docs/primyo-tests/automation/LP-TEST-AUTO-003.md`
- Closure: `docs/primyo-changes/LP-TEST-AUTO-003-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `scripts/primyo-adapter-gate.mjs` foi incorporado oficialmente ao `primyo:gate`, protegendo `customerAdapter` e `vehicleAdapter` com cenarios validos e invalidos, envelope, `validation`, `warnings`, contexto e separacao entre `id` e `sourceId`.
- Observacao de risco: a proxima fatia deve permanecer fora do runtime e fora de Supabase; a prioridade recomendada passa a ser `LP-WEB-009` antes de helpers comuns ou integracao funcional.

### LP-WEB-009

- Change record: `docs/primyo-changes/LP-WEB-009.md`
- Closure: `docs/primyo-changes/LP-WEB-009-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `serviceAdapter` foi aceito como terceiro adapter puro oficial do web, aderente ao baseline compartilhado e com o Adapter Contract Gate ampliado para tres adapters, sem qualquer integracao a `app/main.js` ou ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar adapters nem abrir Supabase; a prioridade recomendada passa a ser `LP-WEB-ADAPTER-HELPERS-001` para consolidar helper comum minimo antes do quarto adapter.

### LP-WEB-ADAPTER-HELPERS-001

- Change record: `docs/primyo-changes/LP-WEB-ADAPTER-HELPERS-001.md`
- Closure: `docs/primyo-changes/LP-WEB-ADAPTER-HELPERS-001-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `app/adapters/shared/adapterHelpers.js` foi aceito como camada compartilhada minima oficial da trilha de adapters, com `customerAdapter`, `vehicleAdapter` e `serviceAdapter` refatorados sem mudanca de API publica e sem qualquer integracao a `app/main.js` ou ao runtime.
- Observacao de risco: a proxima fatia nao deve integrar adapters nem abrir Supabase; a prioridade recomendada passa a ser `LP-WEB-010` com `productAdapter` como quarto adapter puro oficial, aproveitando o helper comum ja consolidado.

### LP-WEB-010

- Change record: `docs/primyo-changes/LP-WEB-010.md`
- Closure: `docs/primyo-changes/LP-WEB-010-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `productAdapter` foi aceito como quarto adapter puro oficial do web, aderente ao baseline compartilhado e com o Adapter Contract Gate ampliado para quatro adapters, sem qualquer integracao a `app/main.js`, ao runtime ou ao estoque real.
- Observacao de risco: a proxima fatia nao deve integrar adapters nem abrir Supabase; a prioridade recomendada passa a ser `LP-WEB-011` com `supplyAdapter` como proximo adapter puro oficial, preservando a diferenca entre produto vendavel, insumo tecnico e movimento de estoque.

### LP-DOC-EXEC-001

- Change record: `docs/primyo-changes/LP-DOC-EXEC-001.md`
- Closure: `fase documental sem closure separado`
- Resultado: `Aceito`
- Observacao principal: o Primyo Lean Mode foi consolidado em documentos locais para reduzir repeticao de regras nos proximos prompts sem perder gate, rollback, rastreabilidade, controle de escopo ou proibicao de push sem autorizacao.
- Observacao de risco: prompts curtos continuam exigindo objetivo, escopo, validacoes e criterio de aceite; Lean Mode reduz repeticao, mas nao autoriza atalho perigoso nem integracao funcional prematura.

### LP-WEB-011

- Change record: `docs/primyo-changes/LP-WEB-011.md`
- Closure: `docs/primyo-changes/LP-WEB-011-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: `supplyAdapter` foi aceito como quinto adapter puro oficial do web, aderente ao baseline compartilhado e com o Adapter Contract Gate ampliado para cinco adapters, sem qualquer integracao a `app/main.js`, ao runtime, ao estoque real ou ao Supabase.
- Observacao de risco: a proxima fatia nao deve integrar adapters nem abrir Supabase; a prioridade recomendada passa a ser `LP-DATA-006` para formalizar resolver de IDs, ownership cross-domain e relacoes entre produto, insumo e servico antes de qualquer integracao funcional.

### LP-DOC-HANDOFF-001

- Change record: `docs/primyo-changes/LP-DOC-HANDOFF-001.md`
- Closure: `docs/primyo-changes/LP-DOC-HANDOFF-001-CLOSURE.md`
- Resultado: `Aceito`
- Observacao principal: o handoff seguro do Codex foi consolidado em documentos locais para permitir compactacao do chat sem perda do contexto critico da trilha Primyo, preservando branch esperada, commits relevantes, fora de escopo persistente e checklist de retomada.
- Observacao de risco: o handoff precisa ser atualizado sempre que uma nova fase for concluida; a proxima fatia tecnica continua sendo `LP-DATA-006`, sem integracao de adapters ao runtime e sem abertura de Supabase.

### LP-DATA-006

- Change record: `docs/primyo-changes/LP-DATA-006.md`
- Closure: `fase documental absorvida no proprio change record e nos documentos de dados`
- Resultado: `Aceito`
- Observacao principal: a fronteira oficial entre `Product`, `Supply`, `StockMovement` e consumo por servico foi documentada sem alterar runtime, adapters, scripts, estoque real ou Supabase.
- Observacao de risco: a proxima fatia nao deve integrar adapters ao runtime nem abrir Supabase; a prioridade recomendada passa a ser `LP-WEB-ID-RESOLVER-001` para consolidar identidade e ownership cross-domain antes de qualquer integracao funcional.

### LP-WEB-ID-RESOLVER-001

- Change record: `docs/primyo-changes/LP-WEB-ID-RESOLVER-001.md`
- Closure: `fase documental absorvida no proprio change record e nos documentos de id-resolution`
- Resultado: `Aceito`
- Observacao principal: a estrategia oficial da futura camada de resolucao de IDs foi documentada sem alterar runtime, adapters, scripts, `app/main.js` ou Supabase.
- Observacao de risco: a proxima fatia nao deve integrar o resolvedor ao runtime; a prioridade recomendada passa a ser `LP-WEB-ID-RESOLVER-002` como implementacao pura, pequena e reversivel.
