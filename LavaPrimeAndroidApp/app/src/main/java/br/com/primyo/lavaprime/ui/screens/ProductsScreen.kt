package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.model.ProdutoEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.SoftLine

@Composable
fun ProductsScreen(repository: LavaPrimeRepository) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    LazyColumn(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            HeroPanel(
                title = "Produtos e insumos",
                description = "Controle local de estoque, venda de produtos e consumo medio por servico.",
                icon = "PI"
            )
        }
        items(produtos, key = { it.id }) { produto ->
            ProdutoCard(produto)
        }
    }
}

@Composable
private fun ProdutoCard(produto: ProdutoEntity) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(22.dp),
        border = BorderStroke(1.dp, SoftLine)
    ) {
        Row(Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            androidx.compose.foundation.layout.Column(Modifier.weight(1f)) {
                Text(produto.nome, fontWeight = FontWeight.Black, color = PrimeBlue)
                Text(
                    "${produto.estoqueAtual} ${produto.unidade}  minimo ${produto.estoqueMinimo}",
                    style = MaterialTheme.typography.bodySmall,
                    color = Color(0xFF617981)
                )
            }
            if (produto.estoqueAtual <= produto.estoqueMinimo) {
                AssistChip(onClick = {}, label = { Text("Critico") })
            }
        }
    }
}
