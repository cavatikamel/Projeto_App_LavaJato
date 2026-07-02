# LP-APK-004-CLOSURE

- Change ID: `LP-APK-004-CLOSURE`
- Referencia: `LP-APK-004`
- Tipo: `Documentation Phase`
- Data: `2026-07-02`

## Fase executada

Finalizacao dos requisitos oficiais do app Android `LavaPrime` antes da primeira fase de codigo.

## Arquivos lidos

- governanca Primyo obrigatoria;
- governanca do `Programa LavaPrime APK`;
- baseline funcional Web, matriz de rotinas, targets de paridade e decisao de reuse;
- baseline visual mobile oficial;
- contratos em `docs/primyo-data/contracts/**`;
- `app/main.js`, `app/styles.css`, `app/adapters/**`, `app/demo/**`, `LavaPrimeAndroidApp/**` e `Material_Visual/**` em modo leitura.

## Arquivos criados/alterados

- `docs/primyo-apk/LP_APK_REQUIREMENTS.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS_MATRIX.md`
- `docs/primyo-apk/LP_APK_REQUIREMENTS_DEPENDENCY_MAP.md`
- `docs/primyo-apk/LP_APK_SCREEN_ACCEPTANCE_CRITERIA.md`
- `docs/primyo-apk/LP_APK_DATA_REQUIREMENTS_MAP.md`
- `docs/primyo-apk/LP_APK_PROGRESS.md`
- `docs/primyo-apk/LPFR.md`
- `docs/primyo-apk/LPFR_STATUS_MATRIX.md`
- `docs/primyo-changes/LP-APK-004.md`
- `docs/primyo-changes/LP-APK-004-CLOSURE.md`
- `docs/primyo-adequation/CHANGE_CONTROL.md`
- `docs/primyo-adequation/ADEQUATION_BACKLOG.md`
- `docs/primyo-adequation/NEXT_SLICE_DECISION.md`

## Requisitos finalizados

- foundation, auth, shell, dashboard, patio, atendimento, cadastros, comercial, documentos, impressao, empresa, relatorios, sync e auditoria foram reescritos com rotina Web, dependencias, offline, impactos e criterios de aceite;
- o item `APK-FIN-003 - Caixa` ficou explicitamente fora da baseline obrigatoria e continua absorvido por `LPFR-001`.

## Requisitos `ready-for-implementation`

- `APK-BOOT-001`, `APK-BOOT-002`
- `APK-AUTH-001`, `APK-AUTH-002`
- `APK-SHELL-001`, `APK-PERM-001`
- `APK-DASH-001`
- `APK-PATIO-001`, `APK-PATIO-002`, `APK-PATIO-003`, `APK-PATIO-004`
- `APK-ATT-001` ate `APK-ATT-008`
- `APK-CUST-001` ate `APK-CUST-003`
- `APK-VEH-001` ate `APK-VEH-003`
- `APK-SERV-001`, `APK-PROD-001`, `APK-SUP-001`
- `APK-BUD-001`, `APK-BUD-002`
- `APK-SALE-001`, `APK-SALE-002`
- `APK-PAY-001`, `APK-PAY-002`
- `APK-FIN-001`, `APK-FIN-002`
- `APK-DOC-001` ate `APK-DOC-003`
- `APK-PRINT-001` ate `APK-PRINT-004`
- `APK-COMP-001`
- `APK-REP-001`
- `APK-SYNC-001` ate `APK-SYNC-003`
- `APK-AUD-001`

## Requisitos `needs-decision`

- nenhum requisito obrigatorio novo ficou sem decisao de baseline;
- a unica exclusao deliberada foi `APK-FIN-003`, que permaneceu como `LPFR`.

## Requisitos convertidos em LPFR

- `APK-FIN-003 - Caixa` -> mantido em `LPFR-001 - Abertura e fechamento diario de caixa opcional`

## Dependencias criticas

- shell depende de auth e perfil;
- patio depende de atendimento, cliente, veiculo e status;
- finalizacao depende de total, pagamento e documento;
- impressao depende de documento estruturado, empresa e configuracao de impressora;
- sync depende de fila local oficial e base de dados coerente;
- dashboard e relatorios dependem de patio, financeiro, pagamentos e status de sync confiaveis.

## Percentual oficial

- antes: `19%`
- depois: `22%`

## Validacoes executadas

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

## Falhas encontradas

- nenhuma falha bloqueante nova nesta fase documental;
- build Android nao foi executado por nao haver alteracao de codigo Android.

## Commit

- mensagem prevista: `docs(apk): finalize apk requirements for implementation`

## Push

- nenhum push foi executado.

## Escopo preservado

- nenhum arquivo em `LavaPrimeAndroidApp/**` foi alterado;
- nenhum arquivo Web funcional foi alterado;
- nenhum contrato runtime foi reescrito;
- nenhuma integracao Supabase foi iniciada.

## Proxima fase recomendada

- `LP-APK-005 - Android Design System Foundation`
