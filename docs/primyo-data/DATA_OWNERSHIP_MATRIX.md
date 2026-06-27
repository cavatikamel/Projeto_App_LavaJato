# LavaPrime Data Ownership Matrix

## 1. Objetivo

Explicitar quem e o dono atual observado de cada entidade, de onde ela nasce, onde persiste hoje, quem a consome e qual deve ser o destino futuro recomendado.

## 2. Matriz

| Entidade | Dono atual observado | Origem | Persistencia atual | Consumidores | Destino futuro recomendado |
| --- | --- | --- | --- | --- | --- |
| Clientes | Web monolitico em `app/main.js` | Cadastro manual em clientes e desdobramentos de faturamento | `clientRegistry` em memoria, `billingClients` em memoria, Room `clientes`, schema `public.clients` planejado | Clientes, veiculos, patio, orcamentos, financeiro, documentos | `public.clients` como fonte oficial, com o web e o Android como consumidores sincronizados |
| Veiculos | Web monolitico em `app/main.js` | Cadastro manual e entrada no patio | `vehicleRegistry` em memoria, referencias em `patioVehicles`, Room `veiculos`, schema `public.vehicles` planejado | Patio, check-list, recibos, financeiro, relatorios | `public.vehicles` + tabelas de historico e cuidado especial como fonte oficial |
| Servicos | Web monolitico em `app/main.js` | Cadastro manual em servicos | `serviceCatalog` em memoria, Room `servicos`, schema `public.services` planejado | Patio, orcamentos, servicos prestados, perfis de insumo | `public.services` como catalogo oficial |
| Produtos | Web monolitico + `localStorage` | Cadastro manual em produtos | `productCatalog` e `productSales` em `localStorage`, Room `produtos`, schema `public.products` planejado | Estoque, vendas, atendimentos, financeiro, relatorios | `public.products` e `public.product_sales` como fonte oficial |
| Insumos | Web monolitico + `localStorage` | Cadastro manual em insumos | `supplyCatalog`, `inventoryMovements` e `serviceSupplyProfiles` em `localStorage`, schema `public.supplies` planejado | Servicos, estoque, relatorios operacionais | `public.supplies` e `public.inventory_movements` como fonte oficial |
| Equipe | Web monolitico em `app/main.js` | Cadastro manual de operadores | `adminOperators` em memoria, Room `usuarios`, schema `public.operators` planejado | Login demo, patio, recibos, aprovacoes, relatorios | `public.operators` ligado a `profiles` e memberships formais |
| Usuarios de acesso | Sessao local do web | Login demo/local | `sessionBoundary`, `accessBoundary`, `selectedProfile`, `activeSessionUser` em memoria; `auth.users` apenas planejado | Navegacao, acesso admin, acesso operador | `auth.users` + `public.profiles` + `organization_memberships`, com sessao local apenas derivada |
| Orcamentos | Web monolitico em `app/main.js` | Jornada de orcamento no admin | `quoteEstimates` em memoria, schema `public.quotes` planejado | Comercial, WhatsApp, previsao operacional | `public.quotes` e `public.quote_items` |
| Atendimentos | Web monolitico em `app/main.js` | Entrada e ciclo do patio | `patioVehicles` em memoria, Room `atendimentos`, schema `public.attendances` planejado | Dashboard, patio, financeiro, recibos, documentos | `public.attendances` e `public.attendance_services` |
| Financeiro | Web monolitico misto | Caixa manual, checkout, faturamento, baixa de pagamentos | `cashEntries` em `localStorage`; `openPayments`, `payableAccounts`, `billingInvoices`, `invoiceLineItems`, `invoiceAmounts` em memoria; schema financeiro no Supabase planejado | Caixa, pagamentos, faturas, relatorios, dashboard | `public.cash_entries`, `public.open_payments`, `public.invoices`, `public.invoice_line_items`, `public.payable_accounts` |
| Configuracoes | Web monolitico + `localStorage` | Telas de negocio, bancos, PIX, financeiro, social e mensagens | `businessProfile`, `businessBankAccounts`, `businessPixInfo`, `businessPaymentMethods`, `businessFinanceSettings`, `businessSocialLinks`, `businessMessageTemplates` em `localStorage` | Relatorios, documentos, QR code, caixa, comunicacoes | Tabelas de organizacao no Supabase como fonte oficial |
| Relatorios e documentos | Web monolitico + browser | Gatilhos de geracao manual | `documentHistory` em `localStorage`, arquivos finais baixados localmente, schema `public.document_history` planejado | Operacao, comercial, financeiro, cliente | `public.document_history` como metadata oficial e estrategia futura de armazenamento de artefatos |
| Cuidados especiais | Web monolitico + `localStorage` | Registro manual por veiculo | `vehicleSpecialCareRecords` em `localStorage`, schema `public.vehicle_special_care` planejado | Patio, check-list, servicos, alertas | `public.vehicle_special_care` + `public.vehicle_special_care_history` |
| Referencia FIPE | Arquivo local do projeto | Base local sincronizada por script | `app/assets/data/fipe-veiculos.json`, `app/assets/data/fipe-veiculos.js`, cache em memoria | Cadastro de veiculos e seletores | Continuar como referencia local versionada ou ser substituida por servico externo; nao deve virar fonte transacional |

## 3. Leitura da matriz

- Hoje o dono efetivo de quase todo o dominio web e `app/main.js`.
- O `localStorage` atua como banco parcial para configuracoes, estoque, documentos e financeiro.
- O Android e o Supabase ja apontam para um modelo mais formal, mas ainda nao governam o web atual.
- A propriedade futura recomendada desloca o dominio compartilhado para backend oficial, deixando clientes locais apenas como cache, sessao e operacao offline controlada.
