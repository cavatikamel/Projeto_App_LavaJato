# LP APK Mobile Visual Baseline

## Objetivo

Definir a referencia visual oficial do app Android `LavaPrime` antes de qualquer correcao de tela ou implementacao de design system Compose.

## Decisao visual central

O baseline visual do APK passa a ser composto por duas fontes com papeis distintos:

1. `app/styles.css` + estrutura real do `app/main.js`
   - definem a linguagem visual do produto, a hierarquia, os modulos, os estados operacionais e o ritmo dos componentes.
2. `LavaPrimeAndroidApp/Material_Visual/**`
   - define a identidade oficial mais recente de marca, incluindo logo principal, monograma, avatar/app icon, paleta e recomendacao tipografica.

## Regra de precedencia visual

Quando Web e `Material_Visual` divergirem:

- marca, logo, icone e familia tipografica oficial devem vir de `Material_Visual`;
- linguagem, organizacao de informacao, nomes dos modulos e hierarquia operacional devem vir do Web;
- o Android nao deve copiar literalmente o layout desktop do Web;
- o Android nao deve reaproveitar automaticamente a identidade grafica antiga que ainda apareca em assets legados do Web.

## Inventario visual consolidado

### Web observado

- paleta base em `app/styles.css`:
  - `--ink: #042434`
  - `--ink-2: #07384d`
  - `--water: #00abd3`
  - `--water-2: #19c6e8`
  - `--lime: #a9d810`
  - `--ice: #f6fbfd`
  - `--paper: #ffffff`
  - `--line: #d8e8ee`
  - `--muted: #607783`
- tipografia Web:
  - `Roboto`, `Segoe UI`, `ui-sans-serif`, `system-ui`, `Arial`, `sans-serif`
- radius e sombra:
  - `--radius: 8px`
  - `--shadow: 0 22px 70px rgba(4, 36, 52, 0.16)`
- linguagem de layout:
  - superfices claras, cards brancos, borda leve, sombra suave, navegação escura em modulos administrativos e CTAs de alto contraste.

### Material_Visual observado

- ha pelo menos uma prancha de identidade completa com:
  - logo principal `LP + LavaPrime`;
  - icone isolado `LP`;
  - icone app/avatar em fundo navy;
  - versoes monocromaticas;
  - paleta navy/cyan/lime + fundos claros;
  - recomendacao tipografica `Inter`;
  - exemplos de botoes, campos, cards, chips, status, tabela/lista e mini layouts;
- ha pelo menos um asset quadrado forte para launcher/app icon;
- ha pelo menos um banner/lockup horizontal forte para splash/login/header;
- ha divergencia menor de hex exatos entre artes diferentes, portanto o alvo de token final deve respeitar a familia cromatica aprovada e nao assumir um unico hex sem confirmacao.

### Android atual observado

- paleta Compose ja aponta para navy/cyan/lime e fundos claros;
- tipografia atual esta em `FontFamily.SansSerif`, sem fonte oficial explicita;
- cards Android usam radius grande (`24.dp`) e visual limpo;
- existe shell visual real para `Splash`, `Initial`, `Login`, `Dashboard`, `Patio`, `Cadastros`, `Produtos` e `Security/Sync`;
- logo, icone e adaptive icon atuais usam recurso vetorial proprio, nao a marca oficial atual de `Material_Visual`.

## Referencia visual oficial do APK

### 1. Marca

- nome oficial: `LavaPrime`
- wordmark oficial: versao `LP + LavaPrime` de `Material_Visual`
- monograma oficial: `LP`
- app icon oficial: versao quadrada escura com monograma `LP`

### 2. Direcao cromatica

- estrutura: azul marinho/profundo
- destaque principal: azul ciano/agua
- acao positiva e CTA primario: verde lima
- fundos: branco e gelo muito claro
- bordas: azul/cinza claro suave
- texto principal: navy escuro
- texto secundario: azul/cinza dessaturado

### 3. Tipografia

- referencia oficial preferida: `Inter`
- fallback aceitavel quando necessario: `Roboto`
- proibicao pratica: fonte serifada como padrao principal
- hierarquia esperada:
  - titulos de pagina fortes, limpos e sem peso excessivo de jornal/template;
  - titulos de secao mais contidos;
  - corpo legivel e neutro;
  - captions e auxiliares discretos.

### 4. Componentes base

- botoes:
  - primario em lima;
  - secundario em outline claro;
  - secundario escuro em navy para acoes operacionais fortes;
  - texto neutro para cancelar/voltar quando apropriado.
- campos:
  - fundo branco;
  - borda clara;
  - foco em cyan;
  - placeholder legivel, nunca lavado demais.
- cards:
  - fundo branco;
  - borda leve;
  - sombra suave;
  - hierarquia interna forte por titulo + apoio + status.
- chips/status:
  - formato pill;
  - contraste alto;
  - cores semanticas consistentes para agendado, aguardando, em servico, pronto, finalizado, alerta e sync.

## Principios mobile oficiais

- mobile-first de verdade, sem tentar encolher o desktop;
- uma acao principal por contexto;
- listas e cards no lugar de tabelas densas;
- safe area, notch, teclado e rolagem fazem parte do aceite visual;
- toque confortavel e leitura rapida tem prioridade sobre densidade de escritorio;
- o dashboard deve parecer painel operacional mobile, nao landing page;
- o patio deve parecer fila real de operacao, nao mini modulo demonstrativo.

## O que deve ser preservado do Web

- linguagem operacional: `Dashboard`, `Patio`, `Clientes`, `Veiculos`, `Servicos`, `Produtos`, `Insumos`, `Financeiro`, `Relatorios`, `Seguranca`, `Sincronizacao`, `Meu negocio`;
- uso de fundo claro com superfices brancas;
- acao primaria em verde/lima;
- navegacao administrativa escura;
- cards e chips como linguagem central de estado;
- hierarquia por modulo, resumo e acao;
- estados de status em portugues e com leitura rapida.

## O que deve ser adaptado para mobile

- sidebar desktop vira drawer mobile ou shell de navegacao equivalente;
- tabelas do Web viram listas, cards ou secoes expansivas;
- dialogs densos do Web viram passos curtos ou folhas mais focadas;
- grids amplas viram blocos verticais e cards metricos;
- a barra superior mobile deve ser mais contida que a versao Web.

## O que nao deve ser copiado literalmente

- logo/icone legados do Web com carro/gota como base automatica do Android;
- layout desktop de sidebar fixa + grade larga;
- tabelas extensas como visual principal de cadastros, patio ou relatorios;
- dialogs muito densos com muitos campos em uma unica tela;
- qualquer placeholder de modulo como se fosse tela final.

## Problemas visuais conhecidos do APK atual

- visual ainda distante do Web como produto final;
- tipografia ainda provisoria, sem familia oficial declarada;
- acentuacao precisa ser revalidada e normalizada antes do aceite visual final;
- contraste ainda e insuficiente em alguns secundarios e textos de apoio;
- cards atuais dependem demais de `HeroPanel` e ainda tem hierarquia operacional fraca em alguns modulos;
- parte da iconografia atual e generica ou ainda ligada a shell parcial;
- drawer ainda parece fundacao de shell, nao navegacao final polida;
- dashboard ainda esta pouco operacional em comparacao com o Web;
- login ainda esta melhor que o baseline anterior, mas continua abaixo da proporcao e sobriedade do alvo final;
- `Material_Visual` ainda nao e a fonte primaria real de logo, icon e tipografia no runtime Android;
- o Android atual usa a marca vetorial propria, enquanto o Web ainda exibe assets legados com carro/gota, o que evidencia drift visual entre superficies.

## Regras por tela

### Splash

- usar lockup oficial ou monograma oficial conforme contexto;
- fundo simples, contraste alto e sem poluicao;
- nao virar tela institucional longa.

### Login

- logo oficial visivel sem dominar metade da tela;
- formulario com contraste pleno;
- seletor `Administrador` / `Operador` com cara de controle profissional;
- rodape de versao discreto.

### Dashboard

- metricas reais primeiro;
- status claros;
- atalhos e pendencias com leitura imediata;
- nada de iniciais genericas como iconografia final.

### Patio

- lista operacional viva;
- status e placas precisam saltar aos olhos;
- acoes rapidas claras;
- cuidado especial, sync e pagamento precisam ter linguagem visual propria.

### Drawer

- parecer navegacao nativa;
- marca menor e mais equilibrada;
- icones reais;
- destaque de item ativo sutil, nao pesado.

## Criterios de aceite visual desta baseline

- fonte de verdade visual identificada por categoria;
- conflito entre marca legada do Web e marca oficial nova explicitado;
- tokens principais mapeados;
- alvo visual por tela registrado;
- gaps visuais do Android atual classificados;
- nenhuma implementacao Compose iniciada nesta fase.
