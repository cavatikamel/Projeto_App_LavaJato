# Plano de Adequacao

## Regra

Este plano nao implementa nada. Ele organiza a sequencia recomendada apos aprovacao formal.

## Critico

### C1 - Endurecer autenticacao e autorizacao

- Dependencia: decisao de arquitetura + decisao de seguranca + integracao Supabase/Auth
- Evidencia: web com login visual; Android com login demo; modelo de roles futuro ainda nao conectado
- Resultado esperado: controle de acesso real, auditavel e alinhado ao modelo multi-tenant

### C2 - Definir fonte de verdade de dados

- Dependencia: arquitetura de dados + plano de migracao + integracao Supabase
- Evidencia: estado atual dividido entre arrays locais, localStorage, Room e schema futuro
- Resultado esperado: trilha consistente entre web, mobile e backend

## Alto

### A1 - Quebrar o monolito funcional web

- Dependencia: arquitetura alvo aprovada
- Evidencia: `app/main.js` concentra responsabilidades demais
- Resultado esperado: modulos menores e governaveis por dominio

### A2 - Eliminar migracao destrutiva do Android

- Dependencia: modelo de evolucao de schema Room aprovado
- Evidencia: `fallbackToDestructiveMigration()` observado
- Resultado esperado: evolucao segura do banco local

### A3 - Formalizar matriz de permissoes

- Dependencia: decisao de produto + seguranca
- Evidencia: regras de perfil estao majoritariamente embutidas no codigo
- Resultado esperado: permissions matrix documentada e implementavel

### A4 - Criar estrategia de testes para fluxos criticos

- Dependencia: priorizacao de cobertura e ambiente de testes
- Evidencia: apenas build/sintaxe observados
- Resultado esperado: cobertura minima para patio, financeiro, cobranca e documentos

## Medio

### M1 - Consolidar ownership, ambientes e operacao

- Dependencia: alinhamento organizacional
- Evidencia: owner tecnico, suporte, SLA e ambientes oficiais nao foram encontrados
- Resultado esperado: operacao menos dependente de memoria pessoal

### M2 - Consolidar documentacao de produto

- Dependencia: manutencao continua da pasta `docs/`
- Evidencia: docs tecnicas existem, mas estavam espalhadas e sem dossie unico
- Resultado esperado: repo como fonte principal de contexto

### M3 - Planejar integracao progressiva web/mobile/backend

- Dependencia: backlog aprovado por superficie
- Evidencia: Android e web compartilham intencao, mas ainda nao compartilham runtime real
- Resultado esperado: convergencia gradual sem regressao

## Baixo

### B1 - Refinar materiais auxiliares e separacao de artefatos

- Dependencia: organizacao repositorio aprovada
- Evidencia: landing page e materiais de apoio coexistem com o produto principal
- Resultado esperado: navegacao de repositorio mais clara sem mexer em funcionalidade

### B2 - Expandir observabilidade documental

- Dependencia: desenho operacional
- Evidencia: faltam docs formais de monitoracao, incidente e restore
- Resultado esperado: operacao mais previsivel
