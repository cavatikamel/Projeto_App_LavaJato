# Testing

## Ambiente de teste com Supabase

O projeto ja possui uma base minima no Supabase para autenticar e salvar o snapshot operacional do LavaPrime por organizacao.

O ambiente de teste usa:

- projeto Supabase remoto configurado
- usuario de teste real criado via bootstrap
- organizacao isolada para teste
- tabelas minimas de `profiles`, `organizations`, `organization_memberships` e `organization_app_states`

## O que falta na maquina local

Para o navegador entrar no modo remoto, ainda e necessario preencher um arquivo local com as credenciais publicas do Supabase.

Crie um arquivo `.env.local` na raiz do projeto com:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_PUBLICA_ANON
```

Importante:

- nao use `SUPABASE_SERVICE_ROLE_KEY` no frontend
- `.env.local` nao deve ser commitado
- a chave `anon` fica no painel do Supabase em `Project Settings` > `API`

## Como rodar o ambiente de teste

1. Abrir a raiz do projeto no terminal.
2. Confirmar que o `.env.local` existe com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
3. Rodar `npm install` se ainda nao houver dependencias instaladas.
4. Rodar `npm run dev`.
5. Abrir no navegador o endereco exibido pelo Vite, normalmente `http://localhost:5173`.

## Como validar que esta no modo remoto

Sinais de que o frontend entrou no modo Supabase:

- o login aceita email e senha reais do Supabase
- a sessao persiste apos recarregar a pagina
- os dados da operacao passam a ser sincronizados por organizacao
- ao sair e entrar novamente, o estado salvo continua disponivel

Se o frontend entrar no modo local legado, o app continua abrindo, mas os dados ficam apenas no navegador. Isso normalmente indica ausencia ou erro em `VITE_SUPABASE_URL` ou `VITE_SUPABASE_ANON_KEY`.

Se voce abrir o app e ainda enxergar clientes, veiculos e servicos ficticios, isso significa que o navegador entrou no modo demo local, nao no ambiente remoto limpo do Supabase.

## Checklist de teste funcional

1. Fazer login com o usuario de teste.
2. Confirmar que a base inicial esta vazia.
3. Cadastrar pelo menos um cliente.
4. Cadastrar pelo menos um veiculo.
5. Criar um servico ou atendimento de teste.
6. Recarregar a pagina.
7. Confirmar que os dados continuam presentes.
8. Sair da conta e entrar novamente.
9. Confirmar que o estado da organizacao foi restaurado.

## Reset do ambiente de teste

Se precisar zerar novamente a base do usuario de teste, execute o bootstrap de servidor com as variaveis privadas preenchidas:

```powershell
npm run bootstrap:test-user
```

Esse comando depende de `SUPABASE_SERVICE_ROLE_KEY` no ambiente do terminal e nao deve ser usado no navegador.
