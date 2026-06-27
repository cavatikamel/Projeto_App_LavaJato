# LavaPrime Extraction Test Requirements

## Objetivo

Definir requisitos minimos de teste antes de extrair partes do monolito `app/main.js`.

Nenhuma extracao e autorizada por este documento.

## Requisitos gerais

Toda extracao futura deve cumprir:

- gate tecnico obrigatorio;
- smoke manual conforme `SMOKE_TEST_PLAN.md`;
- matriz de regressao conforme `REGRESSION_MATRIX.md`;
- rollback descrito;
- change control registrado;
- ausencia de alteracao visual nao aprovada;
- ausencia de dependencia nova sem aprovacao.

## sessionBoundary

Antes de extrair:

- `npm.cmd run build`;
- `npm.cmd run verify:build`;
- `node --check app/main.js`;
- `node --check scripts/sync-fipe-local-db.mjs`;
- `ST-001` login administrador;
- `ST-002` login operador;
- `ST-003` logout;
- `ST-006` navegacao principal.

Validacoes especificas:

- administrador continua logado com perfil correto;
- operador continua logado com perfil correto;
- troca de perfil preserva comportamento atual;
- logout limpa estado esperado;
- pontos legados que consomem sessao continuam funcionando.

## accessBoundary

Antes de extrair:

- todos os requisitos de `sessionBoundary`;
- `ST-004` acesso ao patio;
- `ST-005` acesso administrativo;
- validacao de administrador em financeiro, configuracoes e cadastros quando aplicavel;
- validacao de operador no patio;
- console sem erro ou warning visivel.

Validacoes especificas:

- administrador continua acessando areas administrativas;
- operador nao recebe shell administrativa indevida;
- patio continua acessivel para operador;
- a politica local permanece sem autenticacao real.

## Helpers puros

Antes de extrair:

- gate tecnico obrigatorio;
- navegacao da tela afetada;
- evidencia de entrada e saida do helper quando aplicavel.

Validacoes especificas:

- formato exibido permanece igual;
- calculo permanece igual;
- nenhum fluxo visual e alterado.

## Storage e persistencia local

Antes de extrair:

- gate tecnico obrigatorio;
- smoke completo;
- registro do estado antes e depois;
- validacao de configuracoes;
- validacao de produtos, insumos ou financeiro se afetados;
- plano de rollback de dados locais.

Validacoes especificas:

- nenhuma chave de `localStorage` e removida sem plano;
- dados existentes continuam legiveis;
- falha de leitura nao quebra login ou navegacao principal.

## Financeiro

Antes de extrair:

- gate tecnico obrigatorio;
- smoke completo;
- cenarios financeiros manuais definidos;
- validacao de venda a vista;
- validacao de pagamento em aberto;
- validacao de pagamento parcial;
- validacao de recibo ou comprovante quando aplicavel;
- validacao de relatorio financeiro quando aplicavel.

Validacoes especificas:

- valores calculados permanecem iguais;
- historico financeiro nao e perdido;
- pagamentos e faturas mantem vinculo com cliente, veiculo e atendimento.

## Patio

Antes de extrair:

- gate tecnico obrigatorio;
- smoke completo;
- validacao de acesso ao patio por administrador;
- validacao de acesso ao patio por operador;
- validacao de atendimento;
- validacao de status operacional;
- validacao de produtos/insumos usados se aplicavel.

Validacoes especificas:

- o fluxo de atendimento continua acessivel;
- nao ha alteracao indevida de permissao;
- estado do patio nao e perdido durante navegacao.

## Requisito minimo para a primeira extracao futura

A primeira extracao futura recomendada, `sessionBoundary` + `accessBoundary`, so deve iniciar apos:

- `LP-TEST-003` concluido;
- `LP-PERM-001` concluido ou decisao explicita de excecao;
- gate tecnico local aprovado ou comandos manuais obrigatorios reexecutados;
- smoke manual completo executado antes e depois;
- rollback aprovado.

## Decisao desta fase

Os requisitos foram definidos, mas nenhuma extracao foi iniciada.
