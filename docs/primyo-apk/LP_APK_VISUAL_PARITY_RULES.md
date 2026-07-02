# LP APK Visual Parity Rules

## Objetivo

Definir as regras visuais oficiais do app Android `LavaPrime`.

## Fontes oficiais

1. `LavaPrimeAndroidApp/Material_Visual/**`
2. `app/styles.css` em modo leitura
3. telas e termos reais do `app/main.js` em modo leitura

## Regras obrigatorias

- o Web e referencia de identidade e dominio;
- o Android deve continuar nativo e mobile-first;
- toda tela deve passar por baseline visual antes de implementacao;
- nenhuma tela pode ser aceita apenas por compilar;
- nao copiar layout desktop literalmente;
- preservar cores, linguagem, hierarquia e estilo do LavaPrime;
- usar `Material_Visual` como fonte oficial de marca;
- usar tipografia moderna, limpa e legivel;
- nao usar fonte serifada como padrao principal;
- textos visiveis devem ter acentuacao correta;
- nao usar iniciais genericas como iconografia final;
- contraste deve ser suficiente em campos, cards, status e rodapes;
- status precisa ter contraste suficiente e leitura rapida;
- placeholders grosseiros nao podem ser aceitos como visual final;
- componentes devem ser reutilizaveis;
- drawer deve parecer navegacao mobile nativa;
- dashboard deve priorizar operacao real;
- login deve ter proporcao profissional;
- estados vazios e erros devem ser padronizados;
- espacamento deve ser consistente;
- o Web define linguagem e hierarquia;
- o Android adapta a experiencia para toque e tela pequena.

## Regra de adaptacao mobile

- equivalencia funcional nao significa espelhar desktop;
- o mobile deve priorizar toque, leitura rapida, listas e cards;
- safe areas, teclado e notch devem ser tratados como parte do aceite visual.

## Regra de aceite visual

Uma tela so pode ser considerada visualmente aceita quando:

- a referencia oficial usada estiver identificada;
- tipografia, cor, contraste e hierarquia estiverem coerentes;
- textos visiveis estiverem corretos;
- screenshot review ou validacao em dispositivo tiver sido registrada.

## Regra para conflitos entre Web e marca

- se o Web ainda expuser asset legado e `Material_Visual` expuser a marca oficial nova, a marca oficial nova prevalece para logo, icon e tipografia;
- o Web continua sendo a referencia de termos, layout language e operacao;
- nenhuma fase futura deve copiar automaticamente o logo legado do Web para o Android sem comparacao com `Material_Visual`.
