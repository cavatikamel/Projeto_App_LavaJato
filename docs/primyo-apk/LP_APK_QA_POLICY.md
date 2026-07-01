# LP APK QA Policy

## Objetivo

Definir a politica oficial de QA do `Programa LavaPrime APK`.

## Camadas obrigatorias de validacao por fase

1. validacao documental;
2. build;
3. smoke manual;
4. screenshot review quando houver mudanca visual;
5. checklist funcional quando houver mudanca de fluxo;
6. regressao minima antes de avancar para fases sensiveis;
7. `APK debug` quando houver alteracao de codigo Android.

## Regras fixas

- quando codigo Android mudar, executar `gradlew assembleDebug --no-daemon --console=plain`;
- quando tela mudar, testar em aparelho/emulador ou registrar `Nao validado` com motivo tecnico;
- quando visual mudar, comparar com Web e `Material_Visual`;
- quando fluxo mudar, comparar com a rotina Web equivalente;
- quando nada funcional mudar, registrar que a fase foi documental.

## Validacoes minimas por tipo

### Fase documental

- `git status --short`
- `git diff --name-only`
- `npm.cmd run primyo:gate`

### Fase Android com codigo

- `git status --short`
- `git diff --name-only`
- `.\gradlew.bat tasks --no-daemon --console=plain` ou `./gradlew tasks --no-daemon --console=plain`
- `.\gradlew.bat assembleDebug --no-daemon --console=plain` ou `./gradlew assembleDebug --no-daemon --console=plain`
- smoke da area alterada

## Criterio de avance de fase

A fase pode avancar quando:

- as validacoes obrigatorias da fase foram executadas;
- nao existe erro bloqueante aberto;
- o escopo aprovado foi preservado;
- a closure registra claramente riscos residuais e proxima fase.

## Criterio de bloqueio

A fase deve ser bloqueada quando:

- build falhar por regressao da propria fase;
- requisito critico perder rastreabilidade;
- UI quebrar visualmente sem plano seguro na mesma janela;
- dados locais ficarem sujeitos a perda silenciosa nao documentada;
- a fase extrapolar para Web, Supabase ou contrato fora do escopo.

## Criterio para marcar requisito como `validated`

Um requisito so pode virar `validated` quando:

- a funcionalidade existe;
- o build passou;
- a validacao funcional da area foi executada;
- a evidencia foi registrada em change record/closure.

