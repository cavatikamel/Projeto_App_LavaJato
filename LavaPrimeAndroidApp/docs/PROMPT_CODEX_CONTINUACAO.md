# Prompt para continuar o app LavaPrime Android no Codex

Você está continuando o desenvolvimento do app Android nativo do LavaPrime, produto da Primyo Sistema de Gestão e Serviços Ltda.

## Contexto do produto

O LavaPrime Web é a referência principal de funcionalidades, linguagem visual e regras de negócio. O app Android não deve ser WebView e não deve depender de conexão constante. Ele deve ser um app nativo, offline-first, com experiência familiar para quem já usa o LavaPrime Web.

O projeto web ainda está em desenvolvimento e suas evoluções deverão ser refletidas no mobile. Sempre que adaptar uma tela da web, preserve a mesma intenção funcional, mas redesenhe a experiência para celular/tablet.

## Stack obrigatória

- Kotlin.
- Jetpack Compose.
- Material 3.
- Room como fonte local principal.
- Repositórios como camada de dados.
- WorkManager para sincronização futura.
- Sem WebView como solução principal.
- Arquitetura preparada para Supabase + backend/API + Primyo Console.

## Já existe nesta base

- Splash screen visual.
- Login mobile.
- Perfis Administrador e Operador.
- Menu lateral controlado por botão.
- Pátio com cards.
- Popup de novo atendimento.
- Cadastro rápido de cliente e veículo.
- Alertas especiais de veículo.
- Serviços com risco por produto/pH.
- Módulos: Dashboard, Pátio, Agendamentos, Clientes e Veículos, Serviços, Produtos e Insumos, Financeiro, Relatórios, Meu Negócio, Segurança e Sincronização.
- Entidades locais com empresaId/tenant, syncStatus e updatedAt.
- SyncQueue e AuditLog preparados.
- SyncWorker preparado para integração futura.

## Regras obrigatórias de continuidade

1. Não transformar o app em WebView.
2. Manter o LavaPrime Web como referência funcional e visual.
3. Tudo que for criado deve funcionar em smartphone e tablet.
4. Campos devem ser grandes, verticais e apropriados para toque.
5. Tabelas web devem virar cards, listas, painéis ou fluxos passo a passo.
6. O app precisa funcionar sem internet depois da sessão validada.
7. Supabase/Primyo Console entram como sincronização/autenticação/controle comercial, não como dependência permanente para operar o pátio.
8. Toda entidade sincronizável deve manter empresaId, syncStatus e updatedAt.
9. Ações críticas devem gerar AuditLog.
10. Alterações locais devem entrar na SyncQueue.
11. Operador pode executar operação, entrada no pátio, cadastro rápido e alertas especiais; administrador tem acesso completo.
12. Não remover módulos existentes sem justificativa técnica.
13. Sempre incrementar versão seguindo `LavaPrime_Mobile_V[versão].0[revisão]`.

## Próxima fase técnica sugerida

### 1. Separar UI em arquivos menores
Mover cada tela para seu próprio arquivo:
- SplashScreen.kt
- LoginScreen.kt
- LavaPrimeShell.kt
- PatioScreen.kt
- NovoAtendimentoDialog.kt
- DashboardScreen.kt
- ClientesVeiculosScreen.kt
- ProdutosScreen.kt
- SecuritySyncScreen.kt

### 2. Criar ViewModels
Criar ViewModels por módulo:
- AuthViewModel
- PatioViewModel
- CadastroViewModel
- ServicosViewModel
- FinanceiroViewModel
- SyncViewModel

### 3. Transformar os módulos em funcionalidades reais
Priorizar:
- Pátio real com mudança de status.
- Agendamentos reais.
- Cadastros completos.
- Serviços com insumos e margem.
- Produtos e estoque.
- Caixa do dia.
- Relatórios mobile.

### 4. Integração futura
Preparar, mas não acoplar de forma rígida:
- Supabase Auth.
- Supabase Database/PostgREST ou backend próprio.
- Edge Functions para regras sensíveis.
- Primyo Console para licenças, tenants, usuários e assinatura.
- SyncWorker periódico.
- Resolução de conflito.

## Versão atual

`LavaPrime_Mobile_V1.02`
