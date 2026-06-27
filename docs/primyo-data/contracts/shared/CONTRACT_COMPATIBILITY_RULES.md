# LavaPrime Contract Compatibility Rules

## 1. Objetivo

Definir como contratos evoluem, como superficies reagem a versoes diferentes e como evitar drift entre Web, Android, backend e Supabase.

## 2. Regra oficial de versionamento

`contractVersion` segue semver:

- `major`: quebra de contrato
- `minor`: extensao compativel
- `patch`: ajuste sem impacto estrutural

## 3. Mudanca compativel

E considerada compativel quando:

- adiciona campo opcional;
- adiciona bloco complementar sem remover o vigente;
- adiciona warning, metadata ou validacao nao bloqueante sem mudar semantica do payload;
- amplia enum de forma controlada e documentada;
- melhora envelope sem exigir comportamento novo de consumidor antigo.

## 4. Mudanca que exige coordenacao

Exige coordenacao entre superficies quando:

- campo opcional passa a ser obrigatorio;
- `sourceId`, `legacyRefs` ou status mudam de semantica;
- a politica de contexto do adapter muda;
- o consumidor precisa interpretar `validation` ou `warnings` de forma nova.

## 5. Quebra de contrato

E quebra de contrato quando:

- remove campo consumido;
- renomeia campo sem transicao;
- muda tipo de campo de forma incompatavel;
- muda semantica de `id`, `sourceId` ou `legacyRefs`;
- muda estrutura do envelope exigido na fronteira;
- passa a exigir contexto que antes nao existia sem fase de convivencia.

## 6. Reacao esperada por superficie

### 6.1 Web

- deve produzir a ultima versao aprovada da fatia atual;
- pode ler versao de mesmo `major` e `minor` menor, desde que os campos obrigatorios continuem atendidos;
- deve bloquear escrita se encontrar quebra de contrato nao tratada.

### 6.2 Android

- deve tolerar adicoes compativeis;
- deve enfileirar ou recusar payload quando o `major` for maior que o suportado;
- nao deve improvisar downgrade silencioso.

### 6.3 Backend e Supabase

- devem rejeitar escrita estruturalmente incompativel;
- devem expor claramente a versao aceita;
- nao devem reescrever semantica do contrato sem atualizar a documentacao comum.

## 7. Regra para versoes diferentes

| Situacao | Reacao recomendada |
| --- | --- |
| mesmo `major`, mesmo `minor` | processar normalmente |
| mesmo `major`, `minor` mais novo no produtor | aceitar se campos extras forem opcionais e documentados |
| `major` mais novo no produtor | bloquear ou entrar em modo de compatibilidade explicitamente documentado |
| `major` mais antigo no produtor | aceitar apenas durante janela de convivencia formal |

## 8. Como evitar drift entre superficies

Medidas obrigatorias:

1. atualizar primeiro a documentacao em `docs/primyo-data/contracts/`;
2. atualizar os padroes compartilhados em `docs/primyo-data/contracts/shared/` quando a mudanca for transversal;
3. alinhar constantes de adapter com a versao documental aprovada;
4. revisar requisitos de teste e gate quando a estrutura minima mudar;
5. registrar backlog, change control e decisao da proxima fatia quando houver impacto no programa.

## 9. Regra para coexistencia temporaria

Quando uma mudanca quebradora for inevitavel:

- publicar nova versao `major`;
- manter janela de transicao documentada;
- explicitar quem le a versao antiga e quem le a nova;
- documentar criterio de desativacao da versao anterior;
- impedir que cada superficie escolha sua propria semantica sem alinhamento central.

## 10. Regra para adapters futuros

Todo adapter futuro deve:

- declarar `contractName`;
- declarar `contractVersion`;
- alinhar a versao declarada com o contrato documental;
- falhar de forma controlada quando nao conseguir honrar o contrato esperado;
- nao mascarar incompatibilidade estrutural como warning cosmetico.

## 11. Decisao desta fase

Compatibilidade contratual passa a ser governada de forma central.

Versao, envelope, contexto e identidade deixam de evoluir por adapter isolado e passam a seguir regras comuns, revisaveis e auditaveis.
