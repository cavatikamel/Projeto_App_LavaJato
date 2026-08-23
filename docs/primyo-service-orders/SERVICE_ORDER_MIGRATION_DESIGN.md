# Service Order Migration Design

## Objetivo

Desenhar a migracao futura da `Service Order` para backend sem executar migracao real nesta fase.

## Sequencia sugerida

### 1. Shadow write

- gerar `service_orders` em paralelo ao legado;
- manter leitura principal no legado;
- registrar divergencias por diagnostico.

### 2. Dual read

- habilitar leitura controlada por dominio;
- documentos primeiro;
- financeiro apenas depois de consistencia comprovada;
- dashboard apenas apos consolidacao das fontes.

### 3. Promotion

- promover `service_orders` como fonte principal por dominio;
- manter fallback legado por periodo controlado.

### 4. Legacy fallback

- preservar fallback de rollback;
- bloquear limpeza do legado enquanto houver divergencia.

### 5. Cleanup

- remover dependencias legadas somente apos aceite formal;
- executar migracoes de dados e validacoes finais.

## Dependencias futuras

- desenho multi-tenant final;
- estrategia de numeracao definitiva;
- trilha propria de Supabase;
- trilha propria de migration;
- smoke remoto/manual apos adocao funcional.
