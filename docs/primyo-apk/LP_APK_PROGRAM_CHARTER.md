# Programa LavaPrime APK Charter

## Identificacao oficial

- nome oficial do programa: `Programa LavaPrime APK`
- app oficial: `LavaPrime`
- produto de referencia funcional: `LavaPrime Web`
- referencia oficial de marca: `LavaPrimeAndroidApp/Material_Visual/**`

## Declaracao central

"O app Android atual e um checkpoint tecnico parcial e nao representa ainda o produto final esperado."

## Objetivo do programa

Conduzir a criacao controlada do app Android nativo oficial do LavaPrime com governanca, rastreabilidade, validacao por fase, paridade funcional progressiva com o Web, experiencia mobile propria, operacao offline-first e preparacao segura para backend/Supabase futuro.

## Escopo

- app Android nativo em `Kotlin` + `Jetpack Compose`;
- identidade visual oficial alinhada ao Web e ao `Material_Visual`;
- fluxos mobile operacionais do LavaPrime;
- persistencia local segura;
- fila offline e sincronizacao futura controlada;
- impressao termica futura;
- QA, aceite, backlog, requisitos, LPFRs, progresso e rastreabilidade.

## Fora de escopo

- transformar o app em `WebView`;
- alterar o Web como atalho para paridade Android;
- abrir Supabase sem fase especifica;
- tratar o checkpoint Android atual como release final;
- fazer push sem autorizacao explicita.

## Plataformas

- Android smartphone;
- Android tablet, quando a fase exigir;
- Web permanece apenas como referencia funcional e visual.

## Premissas

- o Web continua sendo a referencia de dominio e fluxo;
- o Android deve adaptar a experiencia para uso mobile real;
- `Room` e persistencia offline, nao fonte final de verdade;
- o backend futuro definira identidade canonica compartilhada;
- a trilha deve evoluir por fases pequenas, reversiveis e auditaveis.

## Riscos oficiais iniciais

- `fallbackToDestructiveMigration()` ainda ativo na base atual;
- paridade funcional e visual ainda parcial;
- auth Android ainda demonstrativo;
- dominios `Payment`, `Document`, `Company` e `Financial` ainda nao estao prontos no runtime Android;
- worktree do repositorio pode conter mudancas paralelas fora da trilha APK;
- drift entre Android e Web se a referencia funcional nao for mapeada antes de implementar.

## Principios tecnicos

1. Android nativo primeiro.
2. Sem `WebView` como produto.
3. `Kotlin`, `Jetpack Compose`, `Material 3`, `Room`, `WorkManager`, `Flow`, `ViewModel`.
4. Offline-first com preservacao de dados.
5. Contratos oficiais antes de sync real.
6. `Material_Visual` como fonte oficial de marca.
7. Web e Android isolados em implementacao, alinhados em dominio.
8. Cada fase deve ter rollback, validacao minima e closure.

## Regra Android nativo

O app oficial `LavaPrime` deve ser entregue como aplicacao Android nativa, com UX mobile propria e sem dependencia de renderizacao Web embutida para cumprir a rotina principal.

## Proibicao de WebView

- `WebView` nao pode ser usado como substituto da implementacao nativa;
- referencias ao Web servem para linguagem, fluxo, dados e identidade, nao para espelhar telas desktop.

## Web como referencia funcional

- toda tela Android relevante deve mapear antes o modulo Web equivalente;
- toda mudanca estrutural Android deve registrar qual rotina Web esta sendo preservada;
- paridade significa equivalencia de intencao e operacao, nao copia literal de layout desktop.

## Material_Visual como referencia oficial de marca

- logos, icones, splash, paleta e mockups oficiais devem partir de `LavaPrimeAndroidApp/Material_Visual/**`;
- identidade paralela fica proibida.

## Isolamento Web x Android

- fases APK nao devem alterar `app/main.js`, `app/styles.css`, `app/adapters/**`, `app/demo/**`, `scripts/**`, contratos Web ou UI Web;
- excecao: documentacao de alinhamento explicitamente permitida.

## Regra de execucao

- fases pequenas;
- staging seletivo;
- nunca usar `git add .`;
- nunca fazer push sem autorizacao;
- nunca mascarar falha de validacao;
- nunca marcar requisito como pronto sem artefato, validacao e closure.

## Regra oficial de progresso percentual

- o percentual do programa vive em `docs/primyo-apk/LP_APK_PROGRESS.md`;
- o percentual so sobe quando houver artefato, validacao minima executada e closure formal;
- checkpoint tecnico parcial nao equivale automaticamente a progresso oficial consolidado do programa.

## Definicoes oficiais

### Definicao de pronto

Uma fase esta pronta quando:

- o artefato previsto existe;
- o escopo foi preservado;
- as validacoes minimas foram executadas e registradas;
- os riscos remanescentes foram declarados;
- a closure foi criada;
- houve commit seletivo local quando aplicavel.

### Definicao de checkpoint

Checkpoint e um estado tecnico parcial validado o suficiente para continuar sem perder rastreabilidade, mas ainda insuficiente para declarar paridade final ou release candidate.

### Definicao de release candidate

Release candidate e o primeiro APK que:

- cobre os requisitos obrigatorios aprovados;
- possui build validado;
- passou pelo baseline de QA e smoke manual exigido;
- nao depende de migration destrutiva como base final;
- possui riscos residuais aceitaveis e documentados.

