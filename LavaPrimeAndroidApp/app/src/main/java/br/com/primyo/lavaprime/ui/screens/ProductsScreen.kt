package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.WarningAmber
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import br.com.primyo.lavaprime.data.model.ProdutoEntity
import br.com.primyo.lavaprime.data.repository.LavaPrimeRepository
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusChip
import br.com.primyo.lavaprime.ui.components.LavaPrimeStatusTone

@Composable
fun ProductsScreen(repository: LavaPrimeRepository) {
    val produtos by repository.produtos.collectAsStateWithLifecycle(initialValue = emptyList())
    LazyColumn(
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            HeroPanel(
                title = "Produtos e insumos",
                description = "Catálogo local com leitura clara de estoque, venda e criticidade.",
                icon = Icons.Filled.Inventory2
            )
        }
        items(produtos, key = { it.id }) { produto ->
            ProdutoCard(produto)
        }
    }
}

@Composable
private fun ProdutoCard(produto: ProdutoEntity) {
    LavaPrimeCard(modifier = Modifier.fillMaxWidth()) {
        Row(
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            LavaPrimeStatusChip(
                text = produto.tipo,
                tone = LavaPrimeStatusTone.Info,
                icon = Icons.Filled.Inventory2
            )
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                androidx.compose.material3.Text(produto.nome, fontWeight = FontWeight.Bold, color = androidx.compose.ui.graphics.Color(0xFF0B3348))
                androidx.compose.material3.Text(
                    "${produto.estoqueAtual} ${produto.unidade} • mínimo ${produto.estoqueMinimo}",
                    style = androidx.compose.material3.MaterialTheme.typography.bodySmall,
                    color = androidx.compose.ui.graphics.Color(0xFF64748B)
                )
            }
            if (produto.estoqueAtual <= produto.estoqueMinimo) {
                LavaPrimeStatusChip(
                    text = "Crítico",
                    tone = LavaPrimeStatusTone.Warning,
                    icon = Icons.Filled.WarningAmber
                )
            }
        }
    }
}
