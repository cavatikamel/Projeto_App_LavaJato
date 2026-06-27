# LavaPrime Baseline Acceptance

## Objetivo

Definir criterios objetivos para declarar sucesso na primeira implementacao controlada do LavaPrime.

Referencia:

- baseline tecnica: `docs/primyo-baseline/`
- plano de adequacao: `docs/primyo-adequation/`
- primeira fatia aprovada: `LP-WEB-001`

## 1. Criterios obrigatorios de aceite

Todos os criterios abaixo devem ser atendidos:

1. O conjunto de arquivos alterados permanece dentro dos limites definidos em `BASELINE_CHANGE_BOUNDARIES.md`.
2. `npm run build` continua funcional no ambiente de execucao equivalente da baseline, admitindo uso de `npm.cmd` quando o PowerShell bloquear `npm.ps1`.
3. `npm run verify:build` continua aprovando o pacote gerado.
4. `node --check app/main.js` continua aprovando o core web.
5. `node --check scripts/sync-fipe-local-db.mjs` continua aprovando o script FIPE.
6. O login com perfil `Administrador` continua abrindo a shell administrativa.
7. O login com perfil `Operador` continua abrindo o patio operacional.
8. O logout continua retornando o sistema ao estado inicial sem erro visivel.
9. O administrador continua acessando `dashboard` e `patio` apos login.
10. O operador continua sem acesso indevido a area administrativa completa.
11. Nao ha alteracao funcional em patio, clientes, veiculos, servicos, produtos, financeiro, relatorios ou configuracoes alem do efeito indireto da nova fronteira de sessao.
12. Existe rollback documentado, simples e executavel para todos os arquivos alterados.

## 2. Criterios de bloqueio

A primeira implementacao deve ser bloqueada se ocorrer qualquer uma das situacoes abaixo:

- necessidade de tocar arquivos fora do limite aprovado;
- falha de build ou de verificacao de artefatos;
- regressao no login, logout ou troca de perfil;
- regressao de navegacao entre login, dashboard e patio;
- mudanca nao planejada em `localStorage`, dados, financeiro ou documentos;
- necessidade de alterar Android, Supabase, styles ou assets para completar a fatia.

## 3. Evidencias minimas para aceite

O aceite da primeira implementacao so podera ocorrer com:

- lista final de arquivos alterados;
- saida dos comandos de baseline;
- checklist manual dos fluxos de sessao;
- descricao do rollback;
- referencia ao backlog ID e ao change record correspondente.

## 4. Criterio de reprovacao

A implementacao deve ser considerada reprovada se:

- quebrar qualquer validacao automatica da baseline;
- introduzir comportamento diferente por perfil sem aprovacao formal;
- exigir ampliacao de escopo no meio da execucao;
- nao permitir reversao simples.

## 5. Declaracao objetiva de sucesso

A primeira implementacao sera considerada bem-sucedida quando:

- a fronteira de sessao estiver mais controlada e identificavel;
- o comportamento do usuario final permanecer equivalente ao da baseline;
- a mudanca estiver contida em poucos arquivos aprovados;
- toda a baseline tecnica e funcional continuar passando.
