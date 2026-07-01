# LP APK Engineering Rules

## Objetivo

Consolidar as regras obrigatorias de engenharia da trilha APK.

## Regras obrigatorias

1. cada fase deve ter objetivo unico;
2. cada fase deve preservar rotinas Web quando aplicavel;
3. antes de implementar tela, mapear a rotina Web correspondente;
4. antes de alterar visual, mapear `Material_Visual` e a referencia Web;
5. nunca alterar o Web durante fase APK;
6. nunca abrir Supabase sem fase especifica;
7. nunca usar `WebView` como atalho de produto;
8. nunca usar `git add .`;
9. nunca fazer push sem autorizacao explicita;
10. sempre criar closure;
11. sempre atualizar progresso oficial quando a fase fechar;
12. sempre executar build Android quando codigo Android mudar;
13. sempre registrar falhas, riscos e bloqueios;
14. nunca mascarar erro de build, sync, dados ou smoke;
15. nunca marcar como pronto algo nao validado;
16. `LPFR` nao pode ser implementado sem conversao em fase aprovada.

## Regras de dados

- `Room` e replica local e fila offline;
- contratos oficiais governam identidade, envelope e compatibilidade;
- `fallbackToDestructiveMigration()` nao pode permanecer como base final;
- dominios criticos nao devem ser misturados por conveniencia.

## Regras de commit

- staging seletivo por caminho;
- commits pequenos e coerentes;
- separar no relato final o que entrou e o que ficou fora;
- se o worktree estiver sujo com itens paralelos, manter esses itens fora do commit.

## Regras de validacao

- fase documental: `git status --short`, `git diff --name-only`, `npm.cmd run primyo:gate`;
- fase Android com codigo: `git status --short`, `git diff --name-only`, `gradlew tasks --no-daemon --console=plain`, `gradlew assembleDebug --no-daemon --console=plain`, smoke correspondente;
- toda falha fora de escopo deve ser registrada sem correcao lateral improvisada.

