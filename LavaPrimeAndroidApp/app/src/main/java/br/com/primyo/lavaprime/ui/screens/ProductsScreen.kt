package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.model.ProdutoEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionStyle
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeMetricCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.components.money
import kotlinx.coroutines.launch

private enum class ProductsFilter(val label: String) {
    TODOS("Todos"),
    ATIVOS("Ativos"),
    BAIXO_ESTOQUE("Baixo estoque"),
    INATIVOS("Inativos")
}

private data class ProductEditorState(
    val productId: String? = null,
    val nome: String = "",
    val sku: String = "",
    val unidade: String = "un",
    val estoqueAtual: String = "0",
    val estoqueMinimo: String = "0",
    val custo: String = "",
    val precoVenda: String = "",
    val observacoes: String = "",
    val ativo: Boolean = true,
    val error: String? = null
)

private data class ProductAdjustmentState(
    val productId: String,
    val nome: String,
    val movimento: String = "Reposição",
    val quantidade: String = "",
    val motivo: String = "",
    val error: String? = null
)

private val productUnits = listOf("un", "ml", "L", "kg", "pct")
private val stockMovements = listOf("Reposição", "Ajuste de entrada", "Ajuste de saída")

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ProductsScreen(
    repository: LavaPrimeRepository,
    usuario: UsuarioEntity
) {
    val allProducts by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    val scope = rememberCoroutineScope()
    var query by remember { mutableStateOf("") }
    var selectedFilter by remember { mutableStateOf(ProductsFilter.TODOS) }
    var editor by remember { mutableStateOf<ProductEditorState?>(null) }
    var adjustment by remember { mutableStateOf<ProductAdjustmentState?>(null) }

    val products = remember(allProducts) {
        allProducts
            .filter { !it.tipo.contains("insumo", ignoreCase = true) }
            .sortedWith(compareByDescending<ProdutoEntity> { it.ativo }.thenBy { it.nome.lowercase() })
    }
    val lowStock = remember(products) { products.filter { it.estoqueAtual <= it.estoqueMinimo } }
    val filteredProducts = remember(products, query, selectedFilter) {
        val normalizedQuery = normalizeProductsQuery(query)
        products.filter { product ->
            matchesProductsQuery(product, normalizedQuery) && matchesProductsFilter(product, selectedFilter)
        }
    }
    val averageMargin = if (products.isEmpty()) {
        "0%"
    } else {
        val margin = products.sumOf { getProductMarginPercent(it) } / products.size
        "${margin.toString().replace('.', ',')}%"
    }
    val inventoryValue = products.sumOf { (it.estoqueAtual * it.custoCentavos.toDouble()).toLong() }

    LazyColumn(
        modifier = Modifier.padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(top = 16.dp, bottom = 92.dp)
    ) {
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                LavaPrimeMetricCard(
                    label = "Produtos ativos",
                    value = products.count { it.ativo }.toString(),
                    icon = Icons.Filled.Inventory2
                )
                LavaPrimeMetricCard(
                    label = "Baixo estoque",
                    value = lowStock.size.toString(),
                    icon = Icons.Filled.WarningAmber,
                    tone = if (lowStock.isNotEmpty()) LavaPrimeStatusTone.Warning else LavaPrimeStatusTone.Info
                )
                LavaPrimeMetricCard(
                    label = "Margem média",
                    value = averageMargin,
                    icon = Icons.Filled.Inventory2
                )
                LavaPrimeMetricCard(
                    label = "Valor em estoque",
                    value = money(inventoryValue),
                    icon = Icons.Filled.Inventory2
                )
            }
        }
        item {
            LavaPrimeTextField(
                value = query,
                onValueChange = { query = it },
                label = "Buscar produto, SKU ou observação",
                singleLine = true
            )
        }
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                LavaPrimeActionButton(
                    text = "Novo produto",
                    onClick = { editor = ProductEditorState() },
                    icon = Icons.Filled.Add,
                    modifier = Modifier.weight(1f)
                )
                LavaPrimeActionButton(
                    text = "Ajustar estoque",
                    onClick = {
                        val product = filteredProducts.firstOrNull() ?: products.firstOrNull()
                        if (product != null) {
                            adjustment = ProductAdjustmentState(productId = product.id, nome = product.nome)
                        }
                    },
                    style = LavaPrimeActionStyle.Outline,
                    modifier = Modifier.weight(1f)
                )
            }
        }
        item {
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                ProductsFilter.entries.forEach { filter ->
                    FilterChip(
                        selected = selectedFilter == filter,
                        onClick = { selectedFilter = filter },
                        label = { Text(filter.label) }
                    )
                }
            }
        }
        item {
            SectionTitle(text = "Produtos em foco")
        }
        item {
            ProductsFocusPanel(lowStock = lowStock)
        }
        if (filteredProducts.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum produto encontrado",
                    description = "Ajuste a busca ou cadastre um novo produto.",
                    icon = Icons.Filled.Inventory2
                )
            }
        } else {
            items(filteredProducts, key = { it.id }) { product ->
                ProductCard(
                    product = product,
                    onEdit = { editor = product.toEditorState() },
                    onAdjust = { adjustment = ProductAdjustmentState(productId = product.id, nome = product.nome) }
                )
            }
        }
    }

    editor?.let { current ->
        ProductEditorDialog(
            state = current,
            onDismiss = { editor = null },
            onChange = { editor = it },
            onConfirm = { draft ->
                val validation = validateProductDraft(draft, products)
                if (validation != null) {
                    editor = draft.copy(error = validation)
                } else {
                    scope.launch {
                        repository.salvarProdutoCompleto(
                            produtoId = draft.productId,
                            nome = draft.nome.trim(),
                            sku = draft.sku.trim(),
                            unidade = draft.unidade,
                            estoqueAtual = parseQuantity(draft.estoqueAtual),
                            estoqueMinimo = parseQuantity(draft.estoqueMinimo),
                            custoCentavos = parseCurrencyToCents(draft.custo),
                            precoVendaCentavos = parseCurrencyToCents(draft.precoVenda),
                            observacoes = draft.observacoes,
                            ativo = draft.ativo,
                            usuario = usuario
                        )
                    }
                    editor = null
                }
            }
        )
    }

    adjustment?.let { current ->
        ProductAdjustmentDialog(
            state = current,
            onDismiss = { adjustment = null },
            onChange = { adjustment = it },
            onConfirm = { draft ->
                val quantity = parseQuantity(draft.quantidade)
                if (quantity <= 0.0) {
                    adjustment = draft.copy(error = "Informe uma quantidade válida.")
                } else {
                    scope.launch {
                        repository.ajustarEstoqueProduto(
                            produtoId = draft.productId,
                            quantidade = quantity,
                            tipoMovimento = draft.movimento,
                            usuario = usuario
                        )
                    }
                    adjustment = null
                }
            }
        )
    }
}

@Composable
private fun ProductsFocusPanel(lowStock: List<ProdutoEntity>) {
    LavaPrimeCard(modifier = Modifier.fillMaxWidth(), tonal = true) {
        if (lowStock.isEmpty()) {
            Text(
                text = "Todos os produtos estão acima do estoque mínimo.",
                style = MaterialTheme.typography.bodyMedium,
                color = Color(0xFF4E6470)
            )
        } else {
            lowStock.forEach { item ->
                Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text(
                        text = item.nome,
                        style = MaterialTheme.typography.titleSmall,
                        color = Color(0xFF0B3348),
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "${formatQuantity(item.estoqueAtual)} ${item.unidade} em estoque · mínimo ${formatQuantity(item.estoqueMinimo)} ${item.unidade}",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color(0xFF4E6470)
                    )
                }
            }
        }
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ProductCard(
    product: ProdutoEntity,
    onEdit: () -> Unit,
    onAdjust: () -> Unit
) {
    LavaPrimeCard(modifier = Modifier.fillMaxWidth()) {
        Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(
                text = product.nome,
                style = MaterialTheme.typography.titleMedium,
                color = Color(0xFF0B3348),
                fontWeight = FontWeight.Bold,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            Text(
                text = product.observacoes ?: "Produto de balcão.",
                style = MaterialTheme.typography.bodySmall,
                color = Color(0xFF4E6470),
                maxLines = 2,
                overflow = TextOverflow.Ellipsis
            )
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                LavaPrimeStatusChip(text = "SKU ${product.sku}", tone = LavaPrimeStatusTone.Info)
                LavaPrimeStatusChip(
                    text = if (product.ativo) "Ativo" else "Inativo",
                    tone = if (product.ativo) LavaPrimeStatusTone.Success else LavaPrimeStatusTone.Neutral
                )
                if (product.estoqueAtual <= product.estoqueMinimo) {
                    LavaPrimeStatusChip(
                        text = "Baixo estoque",
                        tone = LavaPrimeStatusTone.Warning,
                        icon = Icons.Filled.WarningAmber
                    )
                }
            }
            ProductInfoLine("Estoque", "${formatQuantity(product.estoqueAtual)} ${product.unidade}")
            ProductInfoLine("Mínimo", "${formatQuantity(product.estoqueMinimo)} ${product.unidade}")
            ProductInfoLine("Custo", money(product.custoCentavos))
            ProductInfoLine("Venda", money(product.precoVendaCentavos))
            ProductInfoLine("Margem", "${getProductMarginPercent(product).toString().replace('.', ',')}%")
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                LavaPrimeActionButton(
                    text = "Editar",
                    onClick = onEdit,
                    icon = Icons.Filled.Edit,
                    style = LavaPrimeActionStyle.Outline,
                    modifier = Modifier.weight(1f)
                )
                LavaPrimeActionButton(
                    text = "Estoque",
                    onClick = onAdjust,
                    style = LavaPrimeActionStyle.Dark,
                    modifier = Modifier.weight(1f)
                )
            }
        }
    }
}

@Composable
private fun ProductInfoLine(label: String, value: String) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "$label:",
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF4E6470),
            fontWeight = FontWeight.SemiBold
        )
        Text(
            text = value,
            style = MaterialTheme.typography.bodySmall,
            color = Color(0xFF0B3348)
        )
    }
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ProductEditorDialog(
    state: ProductEditorState,
    onDismiss: () -> Unit,
    onChange: (ProductEditorState) -> Unit,
    onConfirm: (ProductEditorState) -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = if (state.productId == null) "Novo produto" else "Editar produto",
                color = Color(0xFF0B3348),
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item {
                    LavaPrimeTextField(
                        value = state.nome,
                        onValueChange = { onChange(state.copy(nome = it, error = null)) },
                        label = "Nome do produto",
                        singleLine = true
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.sku,
                        onValueChange = { onChange(state.copy(sku = it.uppercase(), error = null)) },
                        label = "SKU",
                        singleLine = true
                    )
                }
                item {
                    ProductSelectorGroup(
                        label = "Unidade",
                        options = productUnits,
                        selected = state.unidade,
                        onSelect = { onChange(state.copy(unidade = it, error = null)) }
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.estoqueAtual,
                        onValueChange = { onChange(state.copy(estoqueAtual = normalizeQuantityInput(it), error = null)) },
                        label = "Estoque atual",
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal)
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.estoqueMinimo,
                        onValueChange = { onChange(state.copy(estoqueMinimo = normalizeQuantityInput(it), error = null)) },
                        label = "Estoque mínimo",
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal)
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.custo,
                        onValueChange = { onChange(state.copy(custo = formatCurrencyInput(it), error = null)) },
                        label = "Custo unitário",
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.precoVenda,
                        onValueChange = { onChange(state.copy(precoVenda = formatCurrencyInput(it), error = null)) },
                        label = "Preço de venda",
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number)
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.observacoes,
                        onValueChange = { onChange(state.copy(observacoes = it, error = null)) },
                        label = "Observações",
                        minLines = 2
                    )
                }
                item {
                    ProductSwitchLine(
                        label = "Item ativo",
                        checked = state.ativo,
                        onCheckedChange = { onChange(state.copy(ativo = it, error = null)) }
                    )
                }
                state.error?.let { message ->
                    item {
                        Text(
                            text = message,
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFFB42318)
                        )
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = { onConfirm(state) }) {
                Text(if (state.productId == null) "Cadastrar item" else "Salvar alterações")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancelar")
            }
        },
        shape = RoundedCornerShape(28.dp),
        containerColor = Color.White
    )
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ProductAdjustmentDialog(
    state: ProductAdjustmentState,
    onDismiss: () -> Unit,
    onChange: (ProductAdjustmentState) -> Unit,
    onConfirm: (ProductAdjustmentState) -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "Ajuste de estoque",
                color = Color(0xFF0B3348),
                fontWeight = FontWeight.Bold
            )
        },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                item {
                    Text(
                        text = state.nome,
                        style = MaterialTheme.typography.titleSmall,
                        color = Color(0xFF0B3348),
                        fontWeight = FontWeight.SemiBold
                    )
                }
                item {
                    ProductSelectorGroup(
                        label = "Tipo de movimento",
                        options = stockMovements,
                        selected = state.movimento,
                        onSelect = { onChange(state.copy(movimento = it, error = null)) }
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.quantidade,
                        onValueChange = { onChange(state.copy(quantidade = normalizeQuantityInput(it), error = null)) },
                        label = "Quantidade",
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal)
                    )
                }
                item {
                    LavaPrimeTextField(
                        value = state.motivo,
                        onValueChange = { onChange(state.copy(motivo = it, error = null)) },
                        label = "Motivo",
                        minLines = 2
                    )
                }
                state.error?.let { message ->
                    item {
                        Text(
                            text = message,
                            style = MaterialTheme.typography.bodySmall,
                            color = Color(0xFFB42318)
                        )
                    }
                }
            }
        },
        confirmButton = {
            TextButton(onClick = { onConfirm(state) }) {
                Text("Salvar ajuste")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancelar")
            }
        },
        shape = RoundedCornerShape(28.dp),
        containerColor = Color.White
    )
}

private fun matchesProductsFilter(product: ProdutoEntity, filter: ProductsFilter): Boolean = when (filter) {
    ProductsFilter.TODOS -> true
    ProductsFilter.ATIVOS -> product.ativo
    ProductsFilter.BAIXO_ESTOQUE -> product.estoqueAtual <= product.estoqueMinimo
    ProductsFilter.INATIVOS -> !product.ativo
}

private fun matchesProductsQuery(product: ProdutoEntity, query: String): Boolean {
    if (query.isBlank()) return true
    val haystack = buildString {
        append(product.nome)
        append(' ')
        append(product.sku)
        append(' ')
        append(product.observacoes.orEmpty())
    }
    return normalizeProductsQuery(haystack).contains(query)
}

private fun validateProductDraft(
    draft: ProductEditorState,
    products: List<ProdutoEntity>
): String? {
    if (draft.nome.trim().isBlank()) return "Preencha nome e SKU do item."
    if (draft.sku.trim().isBlank()) return "Preencha nome e SKU do item."
    if (parseQuantity(draft.estoqueAtual) < 0.0 || parseQuantity(draft.estoqueMinimo) < 0.0) {
        return "Estoque e estoque mínimo não podem ser negativos."
    }
    if (parseCurrencyToCents(draft.custo) < 0 || parseCurrencyToCents(draft.precoVenda) < 0) {
        return "Custo e preço de venda não podem ser negativos."
    }
    val duplicate = products.firstOrNull {
        it.sku.equals(draft.sku.trim(), ignoreCase = true) && it.id != draft.productId
    }
    if (duplicate != null) return "Já existe um item com esse SKU."
    return null
}

private fun ProdutoEntity.toEditorState(): ProductEditorState {
    return ProductEditorState(
        productId = id,
        nome = nome,
        sku = sku,
        unidade = unidade,
        estoqueAtual = formatQuantity(estoqueAtual),
        estoqueMinimo = formatQuantity(estoqueMinimo),
        custo = formatCurrencyInputFromCents(custoCentavos),
        precoVenda = formatCurrencyInputFromCents(precoVendaCentavos),
        observacoes = observacoes.orEmpty(),
        ativo = ativo
    )
}

private fun getProductMarginPercent(product: ProdutoEntity): Double {
    if (product.precoVendaCentavos <= 0) return 0.0
    return ((product.precoVendaCentavos - product.custoCentavos).toDouble() / product.precoVendaCentavos.toDouble() * 10000.0)
        .toInt()
        .toDouble() / 100.0
}

private fun normalizeProductsQuery(value: String): String {
    return value.lowercase()
        .replace("á", "a")
        .replace("à", "a")
        .replace("â", "a")
        .replace("ã", "a")
        .replace("é", "e")
        .replace("ê", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ô", "o")
        .replace("õ", "o")
        .replace("ú", "u")
        .replace("ç", "c")
}

private fun normalizeQuantityInput(value: String): String {
    return value.filter { it.isDigit() || it == ',' || it == '.' }
}

private fun parseQuantity(value: String): Double {
    return value.trim().replace(",", ".").toDoubleOrNull() ?: 0.0
}

private fun formatQuantity(value: Double): String {
    val normalized = if (value % 1.0 == 0.0) value.toInt().toString() else "%.2f".format(value)
    return normalized.replace('.', ',')
}

private fun formatCurrencyInput(value: String): String {
    val digits = value.filter(Char::isDigit)
    if (digits.isBlank()) return ""
    val cents = digits.toLong()
    val integerPart = cents / 100
    val decimalPart = (cents % 100).toString().padStart(2, '0')
    return "$integerPart,$decimalPart"
}

private fun formatCurrencyInputFromCents(value: Long): String {
    val integerPart = value / 100
    val decimalPart = (value % 100).toString().padStart(2, '0')
    return "$integerPart,$decimalPart"
}

private fun parseCurrencyToCents(value: String): Long {
    val normalized = value.trim().replace(".", "").replace(",", ".")
    val amount = normalized.toDoubleOrNull() ?: return 0L
    return (amount * 100).toLong()
}

@OptIn(ExperimentalLayoutApi::class)
@Composable
private fun ProductSelectorGroup(
    label: String,
    options: List<String>,
    selected: String,
    labelProvider: (String) -> String = { it },
    onSelect: (String) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(
            text = label,
            style = MaterialTheme.typography.labelLarge,
            color = Color(0xFF0B3348),
            fontWeight = FontWeight.SemiBold
        )
        FlowRow(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            options.forEach { option ->
                FilterChip(
                    selected = selected == option,
                    onClick = { onSelect(option) },
                    label = { Text(labelProvider(option)) }
                )
            }
        }
    }
}

@Composable
private fun ProductSwitchLine(
    label: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            color = Color(0xFF0B3348),
            fontWeight = FontWeight.SemiBold
        )
        Switch(checked = checked, onCheckedChange = onCheckedChange)
    }
}
