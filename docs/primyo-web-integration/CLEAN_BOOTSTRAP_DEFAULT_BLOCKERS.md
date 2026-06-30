# Clean Bootstrap Default Blockers

## Objetivo

Consolidar os bloqueios restantes que impedem `CLEAN_BOOTSTRAP` de virar modo padrao no LavaPrime Web.

## Estado atual resumido

- `DEMO_BOOTSTRAP` continua o modo padrao oficial;
- `CLEAN_BOOTSTRAP` continua protegido e inativo por padrao;
- a seed demo continua sustentando o uso comercial, o smoke e a demonstracao visual;
- o trial protegido ficou semanticamente mais seguro;
- a observabilidade tecnica ficou repetivel por `window` e por espelho DOM;
- ainda nao existe autorizacao tecnica para promover o modo limpo a `default`.

## Evidencias consolidadas das fases 006 a 010

### LP-WEB-DATA-CLEANUP-006

- o trial protegido passou a existir como diagnostico tecnico em memoria;
- o trial ainda apontava `5` superficies inseguras:
  - `dashboard`
  - `patio`
  - `reports`
  - `documents`
  - `customerVehicleBillingLinks`

### LP-WEB-DATA-CLEANUP-007

- essas superficies receberam hardening semantico minimo;
- o trial ficou mais seguro para diagnostico interno;
- o hardening nao mudou a regra de negocio nem autorizou troca de default.

### LP-WEB-DATA-CLEANUP-008

- a reavaliacao registrou `currentUnsafeSurfaceCount=0` e `improvedSurfaceCount=5`;
- os bloqueios deixaram de ser semanticos imediatos;
- o gargalo passou a ser falta de base limpa, relacionamentos persistidos e readiness operacional.

### LP-WEB-DATA-CLEANUP-009

- os diagnosticos passaram a ter leitura oficial por `window` e espelho somente leitura no DOM;
- o espelho DOM virou a evidencia automatizada mais confiavel.

### LP-WEB-DATA-CLEANUP-010

- a confirmacao repetiu a leitura com sucesso;
- os estados admin e operador convergiram para:
  - `activeMode=DEMO_BOOTSTRAP`
  - `defaultMode=DEMO_BOOTSTRAP`
  - `trialStatus=diagnostic-only`
  - `unsafeSurfaceCount=0`
  - `improvedSurfaceCount=5`
- o pre-login continuou com snapshot parcial, util para disponibilidade mas nao para readiness final.

## Bloqueios restantes para promocao a default

### 1. Base limpa insuficiente

- `CLEAN_BOOTSTRAP` ainda nao tem volume util de dados para sustentar uma operacao minimamente representativa;
- um bootstrap limpo vazio pode nao quebrar tecnicamente, mas ainda nao entrega utilidade operacional.

### 2. Relacionamentos persistidos ausentes

- cliente, veiculo, atendimento, faturamento, pagamento, documentos e relatorios ainda nao contam com relacionamento persistido real em uma base limpa;
- parte da degradacao atual ainda depende de fallback em runtime, nao de persistencia validada.

### 3. Massa real validada inexistente

- a base atual continua oficialmente demo/teste;
- nao existe ainda uma massa limpa institucional ou real aprovada para validar se o modo limpo e util fora do laboratorio tecnico.

### 4. Dependencia comercial da seed demo

- a seed demo ainda sustenta demonstracao visual, smoke e apresentacao comercial;
- remover ou trocar o bootstrap padrao cedo demais pode reduzir drasticamente a demonstrabilidade do produto.

### 5. Dashboards e superficies vazias

- mesmo com fallback estrutural e semantico, dashboards, patio, financeiro, relatorios e documentos podem ficar vazios ou pouco uteis;
- isso pode produzir um sistema aparentemente estavel, mas sem valor pratico para operacao ou demonstracao.

### 6. Relatorios e documentos pouco representativos

- uma base limpa sem dados suficientes pode gerar relatorios corretos do ponto de vista tecnico, porem vazios ou irrelevantes;
- isso ainda nao foi validado como criterio de aceite de negocio.

### 7. Supabase ainda fechado

- nao existe origem persistida oficial ativa para sustentar um bootstrap limpo mais realista;
- a trilha ainda nao autorizou runtime com Supabase.

### 8. Falta de plano formal de ativacao gradual

- ainda nao existe passo-a-passo oficial para sair de `DEMO_BOOTSTRAP` rumo a um modo limpo ou persistido;
- isso inclui criterios de entrada, criterios de saida, rollback e validacao incremental.

### 9. Falta de criterio formal de aceite para promover o modo limpo

- ainda nao existe definicao oficial de quando um modo limpo pode deixar de ser apenas diagnostico e virar comportamento padrao;
- esse criterio precisa cobrir tecnica, operacao, demonstracao e rollback.

### 10. Android em trilha propria

- o app Android continua em trilha separada;
- promover um bootstrap web limpo sem alinhamento minimo de estrategia pode criar divergencia de narrativa e readiness entre plataformas.

## Riscos se a promocao ocorrer cedo demais

- telas vazias, embora tecnicamente validas;
- dashboards com pouco valor operacional;
- relatorios e documentos sem contexto representativo;
- falsa sensacao de prontidao por conta de fallbacks bem comportados;
- ruptura da demonstracao comercial atual sustentada pela seed demo;
- pressao para abrir Supabase antes da fronteira de ativacao estar clara.

## Criterios minimos para futura promocao

### Dados

- base limpa com dados minimos reais ou seed institucional controlada;
- dados suficientes para validar dashboard, patio, financeiro, relatorios e documentos;
- ausencia de dependencia obrigatoria da seed demo para provar utilidade basica.

### Relacionamentos

- persistencia validada entre cliente, veiculo, atendimento, faturamento, pagamentos e documentos;
- reducao do uso de fallback como sustentacao principal de integridade.

### Runtime e operacao

- smoke com `CLEAN_BOOTSTRAP` real em cenarios vazios, parciais e completos;
- criterio de aceite claro para comportamento esperado em cada superficie;
- confirmacao de que o modo limpo nao quebra login, permissoes, salvamento e navegacao.

### Governanca

- plano formal de ativacao gradual;
- rollback simples e documentado;
- gates tecnicos aprovados;
- decisao formal registrada antes de qualquer promocao a `default`.

### Dados persistidos / Supabase

- ou existir um plano aprovado para origem persistida real;
- ou existir decisao formal explicita de continuar sem Supabase, mas com seed institucional controlada suficiente para suportar o modo limpo.

## Condicoes de rollback

- restaurar `DEMO_BOOTSTRAP` como unico padrao oficial;
- remover qualquer tentativa de ativacao do modo limpo;
- reexecutar gate, build, verify e smoke minimo;
- manter seed demo ativa enquanto a promocao nao for reautorizada formalmente.

## Recomendacao objetiva

`CLEAN_BOOTSTRAP` nao deve virar modo padrao agora.

O proximo passo seguro nao e ativacao, e sim planejamento de prerequisitos formais de ativacao gradual, com foco em dados limpos, relacionamentos persistidos e criterio de aceite operacional.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-012 - Clean bootstrap activation prerequisites plan`
