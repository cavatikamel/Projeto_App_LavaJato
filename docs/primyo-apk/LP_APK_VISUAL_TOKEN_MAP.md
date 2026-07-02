# LP APK Visual Token Map

## Objetivo

Mapear os tokens visuais que deverao orientar a futura implementacao Compose do `LavaPrime`.

| Token | Valor Web observado | Valor Material_Visual observado | Valor Android alvo | Uso | Observacao |
| --- | --- | --- | --- | --- | --- |
| `primary` | `#042434` | `#0B3348` ou `#0D1B2A` | `needs-confirmation` | estrutura principal, navegacao escura, texto forte | familia navy confirmada; hex final diverge entre guias |
| `primaryDark` | `#07384d` | `deep navy dark variant` | `needs-confirmation` | gradientes, estados mais profundos, top bars escuras | Web mostra variante escura coerente |
| `secondary` | `#00abd3` | `#228BEA` ou `#0DAEEF` | `needs-confirmation` | links, foco, destaque, acao secundaria de marca | familia cyan confirmada; hex final diverge entre guias |
| `accent` | `#a9d810` | `#22B8EA` no guia PT e `#AEEA00` no guia EN | `needs-confirmation` | CTA principal, confirmacao, pontos de destaque | ha conflito visual entre guias; CTA do Web usa lima |
| `success` | `status green family` | `lime/green family` | `accent-derived green` | finalizado, pronto, sync ok, feedback positivo | usar familia verde com contraste alto |
| `warning` | `#ffd66b` em CTA secundario; amarelo suave em chips | `yellow/amber examples` | `amber warning family` | aguardando, pendencia, alerta moderado | Material_Visual traz badges amarelos claros |
| `danger` | `not centralized in root vars` | `needs-confirmation` | `red/rose contrast family` | cancelado, erro, exclusao, bloqueio | Android atual ja usa `DangerBg` e `DangerText` como referencia parcial |
| `background` | `#f6fbfd` | `#EEF6F8` ou `#F5F7FA` | `#f6fbfd-like` | fundo base do app | familia clara bem consistente entre Web e guias |
| `surface` | `#ffffff` | `#ffffff` | `#ffffff` | cards, dialogs, drawers, formularios | alinhamento claro entre fontes |
| `card` | `#ffffff` + borda `#d8e8ee` + sombra suave | `white card examples` | `white surface with soft border` | metricas, listas, formularios, estados vazios | manter leitura limpa e profissional |
| `border` | `#d8e8ee` | `#C9DCE5` no guia PT | `#d8e8ee-like` | outlines, divisores, campos | familia clara coerente |
| `textPrimary` | `#042434` | `#0F2230` ou navy escuro | `needs-confirmation` | titulos, labels fortes, conteudo principal | ha proximidade visual, mas nao um unico hex confirmado |
| `textSecondary` | `#607783` | `gray secondary family` | `#607783-like` | apoio, descricao, hint, legenda | manter contraste suficiente |
| `textMuted` | `#8aa0aa` placeholder no Web | `soft gray examples` | `needs-confirmation` | placeholder e meta informacional | nao usar cinza claro demais |
| `radiusSmall` | `8px` | `4px` a `8px` em exemplos | `8dp-ish` | campos, chips pequenos, icon containers | Web e guias convergem para cantos suaves |
| `radiusMedium` | `8px` | `12px` a `16px` nos exemplos de espacos | `12dp-16dp` | cards menores, grupos e botoes | Android atual esta mais arredondado que o Web |
| `radiusLarge` | `8px` no Web estrutural | `24px` em avatar/app icon e cards grandes de exemplo | `18dp-24dp` | dialogs, cards hero, drawer header | precisa ser calibrado para nao ficar cartoon |
| `spacingXs` | `6px` | `8px` | `8dp` | gaps internos minimos | guias mostram grid de 8pt |
| `spacingSm` | `10px` a `12px` | `16px` | `12dp` | labels, grupos pequenos, chips | Web usa multiples de 10-12 no shell atual |
| `spacingMd` | `14px` a `16px` | `24px` | `16dp` | padding padrao de card/campo | alinhavel ao Android atual |
| `spacingLg` | `18px` a `22px` | `32px` | `20dp-24dp` | secoes, dialogs, blocos principais | guias indicam respiracao maior |
| `spacingXl` | `30px+` em containers | `40px+` em exemplos | `24dp-32dp` | topo de tela, hero, respiro entre secoes | mobile deve usar com moderacao |
| `elevationCard` | `0 22px 70px rgba(4, 36, 52, 0.16)` e varias sombras menores | `soft depth only` | `soft elevation` | destaque de cards, modals e top areas | nao transformar tudo em sombra pesada |
| `fontFamily` | `Roboto`, `Segoe UI`, `system-ui` | `Inter` | `Inter` | familia padrao do app | `Material_Visual` deve prevalecer aqui |
| `fontTitle` | `Roboto` medium/500 visual | `Inter Bold` / `Inter SemiBold` | `Inter SemiBold/Bold` | titulos de pagina e secao | guia oficial explicita hierarquia |
| `fontBody` | `Roboto` regular | `Inter Regular` | `Inter Regular` | texto padrao de conteudo | alvo oficial claro |
| `fontCaption` | `Roboto` regular pequeno | `Inter Regular` pequeno | `Inter Regular` pequeno | microtexto, legendas, hints | manter legibilidade minima |

## Leitura oficial do mapa

- `Material_Visual` confirma a direcao de marca, tipografia e iconografia;
- o Web confirma ritmo, contraste e prioridades de uso;
- quando os hexes divergirem entre pranchas, o token fica `needs-confirmation` ate a fase de implementacao validar a versao mestra escolhida.
