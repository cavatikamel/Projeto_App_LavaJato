# Integration Risk Matrix

## 1. Objetivo

Classificar os riscos tecnicos da primeira integracao futura ao runtime.

## 2. Matriz

| Risco | Nivel | Motivo | Mitigacao recomendada |
| --- | --- | --- | --- |
| Alteracao em `app/main.js` | Alto | concentra o runtime inteiro do web | slice pequena, diff minimo, rollback por arquivo unico |
| Alteracao de fluxo de cliente | Medio | primeiro dominio com menor acoplamento relativo | leitura/sombra, sem escrita, sem mudanca de UI |
| Alteracao de fluxo de veiculo | Alto | depende de ownership e placa | adiar para fatia posterior |
| Alteracao de fluxo de servico | Alto | toca catalogo usado em atendimento | adiar ate consumo e refs amadurecerem |
| Alteracao de estoque/produto/insumo | Critico | saldo observado pode ser confundido com trilha oficial | manter fora da primeira integracao |
| Uso prematuro de `idResolver` | Alto | relacoes reais ainda nao estao maduras | manter fora do runtime inicial |
| Regressao visual | Medio | monolito e sensivel a shape inesperado | smoke manual com console limpo |
| Regressao de dados | Alto | adaptacao pode omitir campos legados | modo sombra e comparacao de shape |
| Risco de duplicidade | Alto | cliente operacional e faturado ainda convivem no legado | limitar a leitura, nao reconciliar automatico |
| Perda de compatibilidade | Alto | runtime atual ainda nao conhece contratos | manter legado como fonte ativa na primeira fatia |

## 3. Leituras oficiais da matriz

- qualquer fatia que toque `app/main.js` com adapters sobe automaticamente para risco `Alto`;
- qualquer fatia que toque estoque sobe para `Critico`;
- qualquer fatia que combine adapter + `idResolver` + runtime no mesmo slice deve ser rejeitada.

## 4. Decisao oficial

A primeira integracao futura so e aceitavel se:

- tocar um unico dominio;
- evitar estoque e financeiro;
- evitar `idResolver`;
- manter rollback simples em `app/main.js`.
