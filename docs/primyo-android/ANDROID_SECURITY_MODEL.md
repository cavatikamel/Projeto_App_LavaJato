# Android Security Model

## Objetivo

Registrar o estado de seguranca atual do app Android e a direcao futura esperada pelo programa.

## Estado atual auditado

- `allowBackup=false` e `fullBackupContent=false` no `AndroidManifest.xml`;
- permissoes observadas: `INTERNET` e `ACCESS_NETWORK_STATE`;
- login atual e demonstrativo, baseado em email + senha curta e selecao de perfil;
- `security-crypto` esta nas dependencias, mas nao foi encontrado uso funcional;
- nao foi encontrado `Supabase Auth`, armazenamento seguro de token, refresh token ou sessao real;
- `AuditLogEntity` e `SyncQueueEntity` existem apenas como trilha local por enquanto.

## Leitura tecnica

O app tem preocupacoes estruturais iniciais de seguranca, mas ainda nao possui modelo de autenticacao ou protecao de dados compativel com operacao real.

## Riscos atuais

- credencial demo continua como mecanismo de acesso;
- perfil `Administrador` pode ser obtido localmente sem identidade real;
- dados locais nao mostram camada observada de criptografia at-rest;
- sem membership real por organizacao no runtime;
- sem prova de hardening para sync remoto, documentos ou financeiro;
- `empresaId = local-demo` nao equivale a tenancy oficial e pode mascarar ownership real;
- trilha de auditoria local pode ser gerada por identidade demonstrativa, o que reduz valor forense;
- ausencia de dominio local de pagamento e documento evita exposicao imediata, mas tambem impede governanca segura de recibo, comprovante e impressao futura.

## Modelo futuro recomendado

1. autenticacao real por Supabase Auth ou backend equivalente;
2. membership por organizacao e perfil vindo do backend oficial;
3. sessao mobile armazenada com protecao adequada;
4. auditoria local conciliada com rastreabilidade remota;
5. politicas de acesso coerentes com a trilha `LP-PERM-001`;
6. identidade de dados alinhada a `id`, `sourceId`, `legacyRefs` e `organizationId` oficiais.

## Guardrails

- nenhuma fase deve misturar auth real, migracao de banco, sync remoto e financeiro ao mesmo tempo;
- o primeiro slice de seguranca real precisa ser pequeno e reversivel;
- o modelo Android nao deve divergir das regras oficiais de acesso entre Web, Android e backend;
- nenhuma fila ou auditoria futura deve publicar payload sem envelope contratual minimo.
