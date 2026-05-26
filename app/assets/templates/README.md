# Templates LavaPrime

Arquivos principais:

- `lavaprime-papel-timbrado.docx`: arquivo mestre editavel do papel timbrado.
- `lavaprime-papel-timbrado.pdf`: versao PDF de referencia para validacao visual.
- `lavaprime-papel-timbrado.html`: versao HTML/CSS para futuras exportacoes PDF pelo app.

Uso recomendado:

- Usar o `.docx` como fonte de design e ajustes manuais.
- Usar o `.pdf` como referencia visual do padrao que todas as exportacoes devem seguir.
- Para exportacoes geradas pelo app, preservar a mesma estrutura: logo no canto superior esquerdo, metadados no canto superior direito, cabecalhos em caixas arredondadas, tabela com cabecalho azul petroleo e rodape discreto.
- Regra futura: todo novo relatorio, recibo, fatura, check-list ou controle exportado em PDF pelo sistema deve usar o gerador central `downloadPdfFile()` do prototipo, mantendo este papel timbrado como padrao obrigatorio.

Tokens visuais:

- Formato: A4
- Fonte: Roboto, com fallback Arial/Helvetica
- Azul petroleo: `#0B1F2A`
- Ciano agua: `#00B8D9`
- Branco gelo: `#F4FAFC`
- Borda clara: `#D7E5EB`
- Texto secundario: `#64748B`
