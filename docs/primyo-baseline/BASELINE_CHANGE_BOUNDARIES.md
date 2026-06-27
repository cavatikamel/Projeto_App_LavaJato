# LavaPrime Baseline Change Boundaries

## Objetivo

Definir os limites oficiais da primeira implementacao controlada do LavaPrime com base na baseline estabelecida nesta fase.

Escopo de referencia:

- item autorizado futuro: `LP-WEB-001`
- item ja executado nesta fase: `LP-TEST-001`

## 1. Arquivos que poderao ser alterados na primeira implementacao

A primeira implementacao devera permanecer restrita, preferencialmente, aos seguintes alvos:

- `app/main.js`
- `app/src/App.jsx`
- `app/src/main.jsx` somente se for indispensavel para acomodar o bootstrap sem mudar comportamento
- `docs/primyo-adequation/**`
- `docs/primyo-baseline/**`
- futuro registro de change control da fatia

Regra adicional:

- qualquer necessidade de tocar arquivo fora desta lista exige reavaliacao formal do escopo antes da implementacao.

## 2. Arquivos que nao poderao ser alterados na primeira implementacao

Arquivos e areas bloqueadas:

- `LavaPrimeAndroidApp/**`
- `supabase/**`
- `app/assets/data/**`
- `app/assets/templates/**`
- `app/assets/brand/**`
- `app/legacy-body.html`
- `app/styles.css`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `.github/workflows/**`
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`
- `netlify.toml`
- `.env*`

Motivo do bloqueio:

- a primeira fatia aprovada nao trata Android, backend, dados, deploy, estilo ou pipeline;
- qualquer alteracao nessas areas ampliaria escopo e risco sem autorizacao.

## 3. Areas que exigirao rollback obrigatorio

Mesmo dentro do escopo permitido, rollback sera obrigatorio se a mudanca tocar:

- autenticacao web
- sessao web
- escolha de perfil
- roteamento entre login, dashboard e patio
- qualquer rotina que persista dados em `localStorage`
- qualquer trecho que possa bloquear acesso administrativo ou operacional

Rollback reforcado tambem sera obrigatorio se, por excecao aprovada, a mudanca tocar:

- arquivos de build ou bootstrap
- scripts de validacao
- arquivos com impacto em financeiro ou documentos

## 4. Regra de protecao de escopo

Durante a primeira implementacao, nao e permitido:

- introduzir autenticacao real;
- ligar Supabase ao fluxo ativo;
- alterar regras funcionais de administrador ou operador;
- alterar persistencia de dados;
- mover ou renomear arquivos estruturais;
- ajustar estilos, layout ou assets sem justificativa formal vinculada ao item.

## 5. Criterio de extrapolacao

A implementacao sera considerada fora de escopo se exigir qualquer uma das condicoes abaixo:

- tocar Android;
- tocar Supabase;
- tocar `app/assets/data/`;
- tocar `app/legacy-body.html` ou `app/styles.css`;
- criar dependencia nova;
- exigir mudanca de build, deploy ou infraestrutura;
- alterar fluxo financeiro, de cadastro ou de documentos alem do efeito indireto estritamente necessario para sessao.

## 6. Conclusao

O limite oficial da primeira implementacao e:

- concentrar a mudanca no bootstrap e na fronteira de sessao do web;
- preservar comportamento atual;
- impedir que a primeira fatia se transforme em refatoracao ampla.
