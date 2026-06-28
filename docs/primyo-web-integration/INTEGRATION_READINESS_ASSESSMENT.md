# Integration Readiness Assessment

## 1. Objetivo

Avaliacao oficial de quando e como sera seguro iniciar o primeiro uso de adapters e do `idResolver` no runtime do LavaPrime Web.

Esta fase nao autoriza implementacao.

## 2. Estado tecnico atual

Camada disponivel hoje:

- `customerAdapter`
- `vehicleAdapter`
- `serviceAdapter`
- `productAdapter`
- `supplyAdapter`
- `app/adapters/shared/adapterHelpers.js`
- `app/adapters/shared/idResolver.js`

Estado comum:

- todos os adapters continuam puros;
- todos continuam fora do runtime;
- `idResolver` continua puro e fora do runtime;
- `app/main.js` continua intacto;
- nenhuma tela depende dessa camada em producao.

## 3. Cobertura automatica atual

O baseline atual ja cobre:

- `node --check` dos cinco adapters;
- `node --check` de `adapterHelpers.js`;
- `node --check` de `idResolver.js`;
- fixtures validas e invalidas para cliente, veiculo, servico, produto e insumo;
- envelope, `validation`, `warnings`, `organizationId`, timestamps e separacao entre `id` e `sourceId`;
- cenarios endurecidos do `idResolver`, incluindo ambiguidade, query vazia, bloqueio por nome e bloqueio por placa.

Conclusao:

- a trilha esta suficientemente protegida para planejar a primeira integracao;
- a trilha ainda nao esta madura para integrar varios dominios ao mesmo tempo.

## 4. O que ja esta pronto para uma primeira integracao

Sinais positivos:

- padrao comum de identidade e envelope consolidado;
- cinco dominios puros ja repetem o mesmo baseline;
- `idResolver` ja bloqueia ambiguidade e identidade por texto livre;
- gate estrutural e conceitual ja existe;
- rollback tecnico de modulo isolado continua simples.

## 5. O que ainda nao esta pronto

Dependencias ainda ausentes:

- nenhuma fatia de runtime consumindo adapters em modo controlado;
- nenhuma camada de observacao de paridade entre shape legado e contrato em tempo de execucao;
- nenhum smoke plan executado sobre um fluxo realmente adaptado;
- nenhuma validacao real de relacoes cross-domain com dados do runtime;
- nenhuma estrategia aprovada para ligar `idResolver` a atendimento, pagamento ou financeiro.

## 6. Riscos de integrar cedo demais

Riscos imediatos:

- tocar `app/main.js` antes de isolar um unico fluxo de leitura;
- integrar `vehicleAdapter` sem ownership de cliente maduro;
- integrar `serviceAdapter` antes de estabilizar relacao com insumos;
- integrar `productAdapter` ou `supplyAdapter` antes de trilha auditavel de estoque;
- integrar `idResolver` antes de um caso unico de relacao de baixo risco;
- transformar `legacyRefs` em dependencia funcional silenciosa.

## 7. Por que Supabase ainda nao deve ser aberto

Supabase continua prematuro porque:

- o runtime ainda nao provou sequer um consumo local e reversivel dos adapters;
- relacoes cross-domain continuam em maturacao;
- estoque, consumo por servico e ownership historico ainda nao estao prontos para persistencia remota;
- abrir leitura remota agora misturaria integracao de contrato, runtime e backend na mesma janela.

## 8. Diretriz oficial de readiness

A primeira integracao futura deve ser:

- pequena;
- reversivel;
- limitada a leitura;
- preferencialmente em modo sombra;
- sem escrita;
- sem alterar contrato visual da tela;
- sem usar `idResolver` no runtime;
- sem tocar estoque, financeiro ou ownership cross-domain.

## 9. Conclusao

Readiness atual:

- pronto para a primeira fatia minima de runtime;
- nao pronto para integracao ampla;
- nao pronto para integracao relacional;
- nao pronto para Supabase.

Decisao:

- a primeira integracao deve priorizar `customerAdapter` em leitura controlada;
- `idResolver` deve permanecer fora do runtime na primeira fatia.
