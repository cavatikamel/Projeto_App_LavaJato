# Primyo Phase Types

## Objetivo

Definir os tipos de fase do programa, o tamanho recomendado do prompt e o baseline minimo esperado por tipo.

## Tabela oficial

| Tipo | Objetivo | Prompt recomendado | Validacoes minimas | Documentos comuns | Risco |
| --- | --- | --- | --- | --- | --- |
| Implementation Phase | implementar fatia pequena e reversivel | medio | gate + checks da fase + build/verify quando aplicavel | change record, backlog, baseline ou docs tecnicos | Medio |
| Closure Phase | encerrar formalmente uma fatia concluida | curto | gate da fase + evidencias de encerramento | closure, baseline, backlog, change control, next slice | Medio |
| Commit Phase | criar commit seletivo seguro | curto | `git status`, `git diff`, validacoes da fase, `git diff --cached` | normalmente sem novos docs; resposta git obrigatoria | Baixo/Medio |
| Documentation Phase | consolidar regra, politica, padrao ou guia | curto | `git status`, `git diff`, `npm.cmd run primyo:gate` | docs de adequacao, change record, backlog, policy | Baixo |
| Planning Phase | planejar proxima camada sem implementar | medio | gate minimo + consistencia documental | backlog, next slice, planos, mapas, riscos | Baixo/Medio |
| Integration Phase | integrar algo ao runtime, a dados reais ou a modulo ativo | grande | gate completo + smoke/manual + validacoes especificas | change record, baseline, backlog, change control, rollback detalhado | Alto |
| Data Phase | tratar contratos, ownership, banco, persistencia ou migracao | grande | gate + validacoes de dados da fase + build/verify | data docs, backlog, change control, riscos, plano de rollback | Alto |
| UI Phase | alterar visual, layout, texto visivel ou fluxo de tela | medio ou grande | gate + validacao visual + smoke da area | change record, baseline visual, backlog | Medio/Alto |
| Android Phase | alterar app Android ou build mobile | grande | validacoes Android da fase + gate se houver impacto web | change record, backlog, plano Android, rollback | Alto |
| Emergency Fix Phase | conter falha critica com seguranca | grande | validacao minima de restauracao + gate possivel + registro do incidente | change record, incidente, rollback, backlog de follow-up | Critico |

## Regras de uso

- usar prompt grande apenas quando a fase realmente aumentar risco;
- usar prompt curto em closures, commits e documentacao sempre que os documentos locais ja cobrirem as regras repetidas;
- mesmo em prompt curto, nao cortar escopo permitido/proibido, validacoes, riscos e rollback quando aplicaveis.

## Diretriz de Lean Mode

Antes de escrever um prompt longo, verificar se a fase pode ser coberta apenas com:

- tipo de fase;
- objetivo;
- referencias documentais;
- escopo permitido/proibido;
- validacoes;
- formato de resposta.
