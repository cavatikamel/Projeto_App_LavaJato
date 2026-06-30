# Android Printing Strategy

## Objetivo

Registrar a leitura oficial sobre impressao mobile do LavaPrime apos `LP-ANDROID-001`.

## Estado atual auditado

- nao foram encontrados modulos de impressao;
- nao foram encontrados fluxos de recibo, PDF, ESC/POS, Bluetooth ou spool local;
- nao foram encontrados adapters para impressora termica ou compartilhamento de documento.

## Implicacao

Impressao no Android ainda nao existe como capacidade funcional.

Qualquer emissao futura deve nascer em fase propria, depois de:

- contratos documentais estabilizados;
- ownership de documentos definido;
- estrategia de armazenamento e historico alinhada ao backend.

## Direcao recomendada

1. tratar metadados de documento como parte da trilha oficial de dados compartilhados;
2. gerar visualizacao mobile primeiro;
3. separar artefato visual, transporte e destino de impressao;
4. suportar impressao termica e compartilhamento/PDF em adaptadores separados;
5. manter o backend como fonte de rastreabilidade documental quando essa camada for aberta.

## Riscos a evitar

- gerar comprovante local sem trilha auditavel;
- imprimir a partir de snapshots divergentes do web;
- acoplar impressao diretamente ao primeiro slice de sync;
- misturar impressao, financeiro e autenticacao na mesma fase.
