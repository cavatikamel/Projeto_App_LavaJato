# Service Order Numbering Strategy

## Estrategia adotada em LP-SERVICE-ORDER-001

Formato atual:

```text
OS-AAAA-######[-n]
```

### Regras

- `AAAA` vem do melhor ano operacional disponivel:
  - `createdAt`
  - `scheduledDate`
  - `entry`
  - `analyzedAt`
- `######` usa preferencialmente o identificador numerico legado do atendimento;
- quando nao houver base numerica confiavel, a bridge usa hash deterministico da placa/servico;
- quando houver colisao dentro da colecao atual, a bridge aplica sufixo `-2`, `-3`...

## Classificacao

- esta numeracao e `foundation/local/demo-compatible`;
- nao e numeracao definitiva de producao;
- nao substitui futuro numero sequencial persistido em backend.

## Limitacoes conhecidas

- a numeracao atual nao protege colisao entre dispositivos ou ambientes diferentes;
- a numeracao atual nao e trilha oficial de auditoria fiscal;
- a versao definitiva depende de persistencia controlada e politica futura de backend/Supabase.
