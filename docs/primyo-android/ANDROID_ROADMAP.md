# Android Roadmap

## Objetivo

Definir a sequencia recomendada para a trilha Android apos `LP-ANDROID-002`.

## Estado destravado por esta fase

- `LP-ANDROID-001` fechou a baseline do app nativo;
- `LP-ANDROID-002` fechou a leitura de estrategia de dados, ownership, lacunas contratuais e paridade Android x Web;
- `LP-ANDROID-004` fechou a correcao de paridade visual mobile com melhoria de tipografia, componentes e shell;
- o objetivo antes descrito no backlog como `LP-AND-001` passa a estar documentado e absorvido por esta fase.

## Proxima fase recomendada

### `LP-AND-002 - Planejar substituicao controlada de migracao destrutiva`

Motivo:

- a leitura de dados ja confirmou que o Android ainda carrega modelos parciais, conflitados e ausentes;
- o maior risco imediato agora e continuar evoluindo `Room` com `fallbackToDestructiveMigration()` sem plano de preservacao;
- sem estrategia de migracao, qualquer alinhamento contratual posterior continua vulneravel a perda de dados offline.

## Ordem recomendada

1. `LP-AND-002` para plano de substituicao de migracao destrutiva;
2. fase dedicada para separar dominios ausentes ou conflitados no modelo Android;
3. bootstrap remoto pequeno para catalogos e membership;
4. primeiro slice de sync remoto operacional e reversivel;
5. entrada controlada de pagamento e documento so depois do dominio operacional basico;
6. expansao gradual de modulos placeholder conforme dados, auth e migracoes ficarem prontos.

## Fases explicitamente rejeitadas por enquanto

- abrir Supabase direto no Android sem estrategia de dados;
- transformar placeholder em modulo real sem contratos e ownership;
- adicionar impressao real junto com sync;
- misturar auth real, financeiro e migracao de banco na mesma fase;
- evoluir `Room` como autoridade definitiva.
