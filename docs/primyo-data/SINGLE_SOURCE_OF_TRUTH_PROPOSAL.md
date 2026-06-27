# LavaPrime Single Source of Truth Proposal

## 1. Objetivo

Definir qual deve ser a fonte oficial de verdade do LavaPrime por dominio, sem iniciar migracao nesta fase.

## 2. Recomendacao oficial

### 2.1 Fonte unica de verdade recomendada

A fonte oficial de verdade recomendada para o LavaPrime deve ser o backend Supabase planejado em `supabase/migrations/20260614133000_init_lavaprime.sql`.

Justificativa:

- ja existe um modelo relacional cobrindo os principais dominios;
- o dominio atual do web esta espalhado entre memoria e `localStorage`;
- o Android ja sinaliza necessidade de sincronizacao e auditoria;
- dados compartilhados de operacao, faturamento e configuracao nao devem depender do navegador ativo.

### 2.2 Principio de decisao

Regra proposta:

- dado compartilhado entre usuarios, dispositivos ou plataformas deve ir para Supabase;
- dado apenas de sessao, cache, selecao de tela ou rascunho curto pode permanecer local;
- dado mobile offline deve existir no Android como replica operacional, nunca como autoridade definitiva;
- referencia externa estavel, como FIPE local, pode continuar fora da fonte transacional.

## 3. O que deve permanecer local

Pode permanecer local:

- `sessionBoundary` e `accessBoundary` enquanto a autenticacao real nao for ativada;
- `selectedProfile`, `activeSessionUser` e demais estados transitorios de sessao;
- filtros de tela, modais, selecoes em andamento e rascunhos curtos;
- cache em memoria do arquivo FIPE local;
- caches locais temporarios de documentos gerados antes de upload ou sincronizacao futura.

Nao deve permanecer local como fonte oficial:

- clientes;
- veiculos;
- atendimentos;
- orcamentos;
- financeiro;
- catalogos centrais;
- configuracoes oficiais do negocio.

## 4. O que deve ir para Supabase

Deve migrar para Supabase como fonte oficial:

- identidade e membership:
  - `profiles`
  - `organizations`
  - `organization_memberships`
- configuracoes do negocio:
  - perfil do negocio
  - bancos
  - PIX
  - metodos de pagamento
  - configuracoes financeiras
  - links sociais
  - templates de mensagem
- cadastros:
  - clientes
  - veiculos
  - operadores
  - servicos
  - produtos
  - insumos
  - perfis de insumo por servico
- operacao:
  - orcamentos
  - atendimentos
  - servicos aplicados no atendimento
  - vendas de produtos
- financeiro:
  - pagamentos em aberto
  - faturas
  - itens de fatura
  - lancamentos de caixa
  - contas a pagar
- rastreabilidade:
  - cuidados especiais
  - historico documental
  - historicos relacionais que hoje estao aninhados no web

## 5. O que deve ser sincronizado

Deve ser sincronizado futuramente entre cliente e backend:

- catalogos operacionais usados offline no Android;
- atendimentos iniciados offline;
- filas de envio do Android (`sync_queue`);
- configuracoes oficiais do negocio quando houver edicao local;
- historico documental e metadados de comprovantes;
- movimentos de estoque e vendas de produto.

Regra de sincronizacao recomendada:

- backend decide o estado final;
- clientes locais apenas publicam eventos ou snapshots controlados;
- conflitos precisam de ids estaveis, timestamps, ownership e trilha auditavel.

## 6. O que deve ser removido futuramente

Deve sair da estrategia definitiva:

- `clientRegistry` e `billingClients` como fontes paralelas do mesmo cliente;
- `billingInvoices`, `invoiceLineItems`, `invoiceAmounts`, `openPayments` e `cashEntries` como malha financeira espalhada entre memoria e `localStorage`;
- `quoteEstimates` e `patioVehicles` como estado operacional exclusivamente em memoria;
- `adminOperators` como cadastro e autenticacao local ao mesmo tempo;
- defaults hardcoded funcionando como dado de negocio;
- `localStorage` como banco principal para catalogo, financeiro e configuracoes oficiais.

## 7. Proposta por dominio

| Dominio | Fonte oficial recomendada | O que pode continuar local | Observacao |
| --- | --- | --- | --- |
| Sessao e perfil ativo | Autenticacao futura + perfis no backend | sessao corrente e estado de UI | local apenas como reflexo da autenticacao real |
| Clientes e veiculos | Supabase | cache de leitura e formularios em andamento | remover duplicidades antes da migracao completa |
| Servicos, produtos e insumos | Supabase | cache e selecoes do atendimento | ids estaveis sao obrigatorios |
| Patio e atendimentos | Supabase | estado local transitivo durante execucao | atendimento deve virar origem oficial dos eventos operacionais |
| Financeiro | Supabase | calculos de tela e filtros | dominio mais sensivel, precisa de trilha auditavel |
| Configuracoes | Supabase | cache local para leitura rapida | manter sincronizacao eventual so se houver offline real |
| Relatorios e documentos | metadata em Supabase | arquivos ainda nao sincronizados e downloads locais | definir depois estrategia de storage de artefatos |
| FIPE | arquivo local versionado ou servico externo controlado | cache em memoria | nao faz parte da fonte de verdade do negocio |

## 8. Sequencia recomendada para migracao futura

Quando a execucao for autorizada, a ordem recomendada e:

1. consolidar ownership por dominio e ids estaveis;
2. formalizar atendimento e financeiro como eventos persistidos;
3. migrar cadastros centrais;
4. migrar configuracoes oficiais do negocio;
5. alinhar Android como replica offline controlada;
6. apos isso, remover persistencias locais redundantes.

## 9. Decisao desta fase

Decisao recomendada:

- Supabase deve ser a fonte oficial de verdade do LavaPrime;
- `localStorage` deve encolher para cache e configuracoes transitivas;
- Room deve evoluir para replica offline e fila de sincronizacao, nao para autoridade final;
- memoria do navegador deve deixar de sustentar entidades de negocio criticas.

Esta fase apenas define a direcao. Nenhuma migracao foi iniciada aqui.
