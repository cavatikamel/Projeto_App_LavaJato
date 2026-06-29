# Clean Bootstrap Trial Readiness

## Objetivo

Registrar quando sera seguro iniciar um trial protegido do `CLEAN_BOOTSTRAP` sem alterar o modo padrao do LavaPrime Web.

## Estado atual

- modo padrao: `DEMO_BOOTSTRAP`;
- modo limpo: `CLEAN_BOOTSTRAP`;
- trial protegido: preparado;
- trial ativo por padrao: nao;
- Supabase: fechado;
- seed demo: mantida.

## Diagnostico protegido

Objeto global somente leitura:

- `window.__lavaprimeCleanBootstrapTrialReadiness`

Garantias:

- silencioso;
- em memoria;
- sem troca de modo;
- sem persistencia;
- sem telemetria externa;
- sem alterar UI;
- sem alterar autenticacao, permissoes ou salvamento.

## Campos esperados do trial readiness

- `activeBootstrapMode`
- `defaultBootstrapMode`
- `cleanBootstrapAvailable`
- `cleanBootstrapProtected`
- `protectedTrialOnly`
- `canStartProtectedTrial`
- `canPromoteCleanBootstrapToDefault`
- `coveredSurfaceFallbacks`
- `surfacesStillUnsafe`
- `reasonNotSafeForDefault`
- `trialChecklist`
- `futureTrialChecklist`
- `rollbackPath`

## Leitura recomendada

### Pode preparar trial

Quando:

- `DEMO_BOOTSTRAP` continua default;
- `CLEAN_BOOTSTRAP` continua protegido;
- superficies criticas possuem fallback estrutural minimo;
- o teste pretendido nao muda save, permissao, autenticacao ou UI.

### Nao pode promover a default

Enquanto:

- dashboard depender semanticamente de seed demo;
- patio depender semanticamente de seed demo;
- relatorios e documentos dependerem de colecoes seed para conteudo util;
- vinculos cliente/veiculo/faturamento continuarem residuais e nao resolvidos.

## Checklist minimo para trial futuro

- manter `DEMO_BOOTSTRAP` como default;
- executar apenas trial protegido e controlado;
- revalidar dashboard;
- revalidar `Cadastros > Clientes`;
- revalidar patio;
- revalidar financeiro;
- revalidar relatorios e documentos;
- confirmar console sem erro bloqueante;
- manter rollback imediato para o estado demo.

## Resultado desta fase

- o mecanismo de readiness do trial foi preparado;
- o modo padrao nao mudou;
- nenhuma seed demo foi removida;
- a promocao de `CLEAN_BOOTSTRAP` para default continua bloqueada.

## Proxima fatia recomendada

`LP-WEB-DATA-CLEANUP-006 - Protected CLEAN_BOOTSTRAP trial execution`

Objetivo sugerido:

- executar um trial protegido e explicitamente nao padrao do bootstrap limpo;
- observar quais superficies ficam apenas vazias e quais ainda abrem falha semantica;
- manter rollback simples e sem Supabase.
