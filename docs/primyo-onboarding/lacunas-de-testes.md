# Lacunas de Testes

## Evidencia observada

- existe pipeline web de build e checagem de sintaxe
- nao foram observados testes unitarios web
- nao foram observados testes end-to-end web
- nao foram observados testes Android no repo lido
- nao foram observados testes de integracao reais com Supabase

## Lacunas principais

1. Fluxos criticos do patio nao possuem cobertura automatizada observada.
2. Fluxos financeiros, faturas e pagamentos em aberto nao possuem cobertura automatizada observada.
3. Geração de documentos/PDF nao possui testes automatizados observados.
4. Controle de permissao por perfil nao possui testes automatizados observados.
5. Android nao apresenta suites `test/` ou `androidTest/` no produto lido.
6. Nao ha estrategia observada de regressao para a migracao gradual do legado web.
