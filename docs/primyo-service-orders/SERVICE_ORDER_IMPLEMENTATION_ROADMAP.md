# Service Order Implementation Roadmap

## LP-SERVICE-ORDER-001

- fundacao interna criada em `app/main.js`;
- bridge `legacy attendance -> service order`;
- numeracao local;
- lifecycle inicial;
- diagnostico silencioso.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-002 - Service Order persistence boundary and explicit links

Objetivo sugerido:

- separar a montagem da OS do markup;
- criar boundary de persistencia local controlada para snapshots de OS;
- tornar explicito o vinculo de documentos, pagamentos e invoices com a OS;
- preparar storage e contratos sem abrir Supabase.

## Trilha posterior

### LP-SERVICE-ORDER-003 - Service Order UI progressive adoption

- introduzir numero de OS em detalhes, recibos e relatórios sem renomear toda a UX;
- manter `Atendimento` como linguagem principal para o usuario final, com `OS` aparecendo onde fizer sentido operacional.

### LP-SERVICE-ORDER-004 - Service Order backend and sync readiness

- definir contrato persistido;
- definir sequencia de integracao com backend/Supabase;
- definir numeracao definitiva.

## Atualizacao LP-SERVICE-ORDER-002

- identidade explicita de OS consolidada no runtime;
- pagamentos, documentos e eventos passam a carregar `serviceOrderId` e `serviceOrderNumber`;
- snapshot `serviceOrder.persistence` passa a representar a fronteira futura de persistencia;
- diagnostico silencioso agora mede cobertura de IDs, links, eventos e snapshots;
- Supabase continua fechado e a persistencia segue somente preparada, nao executada.

## Atualizacao LP-SERVICE-ORDER-003

- contrato canonico de storage criado no runtime;
- validacao local do contrato criada;
- builder em lote de storage snapshots criado;
- diagnostico da OS passa a medir `storage` e readiness de design;
- adocao runtime escolhida fica restrita ao diagnostico tecnico.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-004 - Service Order progressive read adoption and migration design

- escolher um ponto de leitura funcional de baixo risco para consumir o contrato da OS;
- detalhar o desenho de migration para `service_orders` e tabelas relacionadas;
- decidir se documentos, financeiro ou detalhes operacionais serao a primeira leitura controlada;
- manter Supabase fechado ate existir fase propria de backend.

## Atualizacao LP-SERVICE-ORDER-004

- a primeira adocao controlada foi fixada em `documents`;
- helper de leitura progressiva e `read model` leve foram adicionados ao runtime;
- o fallback legado continua ativo;
- migration design e schema draft Supabase foram documentados;
- a promocao de leitura principal continua adiada.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-005 - Service Order shadow write design and document source enrichment

- enriquecer a emissao de recibos e documentos novos com `serviceOrderId/serviceOrderNumber` desde a origem;
- reduzir dependencia de inferencia por placa;
- desenhar `shadow write` local/adapter-friendly antes da futura trilha Supabase.

## Atualizacao LP-SERVICE-ORDER-005

- origem documental passa a ser normalizada com prioridade explicita de vinculos;
- documentos novos gerados por atendimento passam a carregar metadados de OS desde a origem;
- diagnostico da OS passa a medir qualidade de vinculo documental e readiness de `shadow write`;
- `shadow write` passa a existir como desenho e dry-run, ainda sem qualquer escrita real.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-006 - Service Order shadow write adapters and staging activation gate

- transformar o desenho atual em contrato de adapter-friendly payload;
- preparar o checklist tecnico para futura ativacao em staging;
- definir comparacao controlada entre legado e payload de `shadow write`;
- manter `enabled = false` ate existir trilha propria de backend/Supabase.

## Atualizacao LP-SERVICE-ORDER-006

- gate explicito de ativacao de `shadow write` criado;
- adapter interno inerte criado;
- validacao local de payload de `shadow write` criada;
- dry-run integrado ao adapter;
- diagnostico da OS passa a expor `shadowWriteAdapter`;
- staging passa a ser pre-condicao formal antes de qualquer write futuro.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-007 - Service Order staging shadow write rehearsal

- usar o gate criado para ensaiar ativacao apenas em homologacao;
- continuar sem tocar producao;
- validar comparacao legado x payload elegivel;
- preparar criterio formal para primeira escrita controlada.

## Atualizacao LP-SERVICE-ORDER-007

- rehearsal tecnico local criado;
- payloads da OS passam a ser analisados e classificados em lote;
- bloqueio do adapter passa a ficar verificavel por diagnostico;
- checklist de ativacao em staging fica formalizada.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-008 - Service Order staging activation prerequisites review

- revisar se a branch `staging`, a URL real de homologacao e o backend staging existem de fato;
- transformar a checklist em criterio formal de liberacao;
- continuar sem write real ate a fase propria de ativacao controlada.

## Atualizacao LP-SERVICE-ORDER-008

- a branch local `staging` e `origin/staging` agora existem, mas isso nao bastou para readiness de write;
- a URL real de staging Netlify continua sem comprovacao;
- o backend Supabase staging continua sem comprovacao;
- migrations, `RLS`, tenant isolation e smoke remoto continuam bloqueando a ativacao;
- a decisao formal passa a ser `READY_FOR_STAGING_SHADOW_WRITE = false`.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-009 - Service Order staging environment proof and backend staging preparation

- comprovar URL real de staging e alvo operacional do Netlify;
- comprovar ambiente Supabase staging sem abrir write no frontend;
- revisar pacote de seguranca, rollback e observabilidade antes de qualquer ativacao controlada.

## Atualizacao LP-SERVICE-ORDER-009

- `origin/staging` foi comprovada em `cf2eb68`, mas a URL real de homologacao continua sem prova;
- `NETLIFY_STAGING_TARGET_CONFIGURATION.md` foi recriado como runbook operacional;
- a trilha passa a distinguir `staging branch existence` de `staging environment proof`;
- a preparacao de backend staging foi documentada sem abrir Supabase;
- a baseline remota de `staging` ainda nao prova a trilha atual de `Service Order`;
- `READY_FOR_STAGING_SHADOW_WRITE` continua `false`.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-010 - Service Order staging target confirmation and remote smoke proof

- confirmar no painel Netlify a URL real de `staging`;
- confirmar qual branch/site esta de fato publicada;
- provar se a baseline atual da trilha esta ou nao nessa URL;
- executar smoke remoto controlado sem ativar backend nem `shadow write`.

## Atualizacao LP-SERVICE-ORDER-010

- o alvo Netlify continua nao comprovado por ausencia de URL real, metadata local e CLI;
- o smoke remoto ficou formalmente bloqueado por falta de URL confiavel;
- `origin/staging` foi confirmado como desatualizado para toda a trilha atual de `Service Order`;
- o caminho seguinte imediato passa a ser `A`, focado em configuracao/prova manual do target Netlify;
- o caminho `B` fica registrado como proxima dependencia depois da URL, para promover a baseline correta a `staging`.

## Proxima trilha recomendada

### LP-DEPLOY-GOV-010 - Netlify staging branch deploy manual configuration

- confirmar no painel qual site/branch representam homologacao;
- capturar e registrar a URL real de `staging`;
- provar se existe branch deploy ou site separado;
- manter producao protegida e sem push nesta etapa.

## Atualizacao LP-DEPLOY-GOV-011

- o staging remoto agora esta comprovado em `https://staging--lavaprime.netlify.app/`;
- o deploy remoto informado e `staging@cf2eb68`;
- o smoke remoto basico do app foi executado com classificacao `partial`, sem erro bloqueante de console e sem redireciono para producao;
- o diagnostico de `Service Order` nao esta disponivel nesse staging remoto, o que e esperado para baseline antiga;
- a prioridade imediata passa a ser promover controladamente a baseline atual de `Service Order` para `origin/staging`.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-011 - Controlled Service Order Branch Promotion To Staging

- preparar promocao controlada da baseline atual de `Service Order` para `origin/staging`;
- manter `main` e producao protegidos;
- continuar sem abrir Supabase, DNS ou runtime de backend;
- preparar futura validacao remota da trilha `Service Order` somente apos essa promocao.

## Atualizacao LP-SERVICE-ORDER-011

- a baseline local candidata foi consolidada em `a3302df`;
- o diff contra `origin/staging` foi auditado como restrito ao runtime `Service Order` esperado em `app/main.js` e a documentacao da trilha;
- os arquivos proibidos da fase nao apareceram no diff;
- o pacote de validacao oficial passou integralmente;
- o lock historico em `dist/assets` nao reapareceu nesta execucao;
- `PROMOTION_READY = true`, mas o push ficou retido por ausencia de autorizacao explicita do usuario.

## Proxima trilha recomendada

### LP-SERVICE-ORDER-011 - Controlled Service Order Branch Promotion To Staging (execucao autorizada)

- repetir a fase com autorizacao explicita para `git push origin HEAD:staging`;
- confirmar o novo hash remoto de `origin/staging`;
- somente depois abrir smoke remoto da baseline atual de `Service Order`.
