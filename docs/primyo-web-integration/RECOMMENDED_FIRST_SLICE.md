# Recommended First Slice

## 1. Fatia recomendada

Fatia recomendada:

- `LP-WEB-INTEGRATION-001`
- titulo sugerido: `Customer Adapter Shadow Read`

## 2. Escopo recomendado

Usar `customerAdapter` apenas em:

- leitura controlada;
- modo sombra;
- fluxo unico de cliente;
- sem substituir persistencia;
- sem alterar shape salvo;
- sem mudar layout;
- sem usar `idResolver`.

Forma sugerida:

- o runtime continua usando o legado como fonte ativa;
- o adapter roda em paralelo apenas para derivar contrato e validar paridade minima;
- qualquer divergencia relevante vira warning/control log interno da fase, nao nova regra de negocio;
- nenhuma tela passa a depender estruturalmente do contrato nessa primeira entrada.

## 3. Fatias rejeitadas

Rejeitadas como primeira integracao:

- `vehicleAdapter` no runtime
- `serviceAdapter` no runtime
- `productAdapter` no runtime
- `supplyAdapter` no runtime
- `idResolver` no runtime
- qualquer integracao que combine adapter + `idResolver`
- qualquer integracao que toque estoque, consumo por servico, financeiro ou Supabase

## 4. Justificativa

`customerAdapter` e a melhor primeira fatia porque:

- foi o primeiro adapter da trilha;
- ja serve de referencia tecnica para os demais;
- tem menor dependencia operacional imediata do que veiculo, servico, produto e insumo;
- permite modo sombra com rollback simples;
- nao exige `idResolver` para produzir valor tecnico inicial.

## 5. Criterios de entrada

Antes da fase futura:

- `npm.cmd run primyo:gate` verde;
- adapters e `idResolver` continuam fora do runtime;
- gate dos adapters continua verde;
- smoke plan aprovado;
- diff limitado a um fluxo e com rollback documentado.

## 6. Criterios de saida

Ao final da fase futura:

- `app/main.js` alterado minimamente;
- `customerAdapter` consumido somente no fluxo aprovado;
- `idResolver` ainda fora do runtime;
- nenhuma escrita nova;
- nenhuma alteracao visual intencional;
- gate verde;
- smoke manual aprovado;
- rollback validado.

## 7. Decisao oficial

Primeiro uso recomendado no runtime:

- `customerAdapter` em leitura/sombra;
- `idResolver` explicitamente fora do primeiro slice.
