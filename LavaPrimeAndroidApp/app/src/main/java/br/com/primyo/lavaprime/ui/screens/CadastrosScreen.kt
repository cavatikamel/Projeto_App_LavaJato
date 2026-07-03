package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.LavaPrimeActionButton
import br.com.primyo.lavaprime.ui.components.LavaPrimeCard
import br.com.primyo.lavaprime.ui.components.LavaPrimeTextField
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.viewmodel.CadastroUiState

@Composable
fun CadastrosScreen(
    state: CadastroUiState,
    usuario: UsuarioEntity,
    onSearchChange: (String) -> Unit,
    onSaveCadastro: (String, String, String, String, String, String, String, String, UsuarioEntity) -> Unit
) {
    var showDialog by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = Modifier,
        verticalArrangement = Arrangement.spacedBy(12.dp),
        contentPadding = PaddingValues(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 90.dp)
    ) {
        item {
            HeroPanel(
                title = "Clientes e veículos",
                description = "Cadastro rápido com leitura simples, busca útil e cards prontos para rotina mobile.",
                icon = Icons.Filled.Group
            )
        }
        item {
            LavaPrimeTextField(
                value = state.busca,
                onValueChange = onSearchChange,
                label = "Buscar por nome, telefone, placa ou modelo",
                singleLine = true
            )
        }
        item {
            LavaPrimeActionButton(
                text = "Novo cadastro",
                onClick = { showDialog = true }
            )
        }
        item { SectionTitle("Clientes", "Consulta rápida da base local") }
        if (state.clientesFiltrados.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum cliente cadastrado",
                    description = "Cadastre um cliente para iniciar o histórico mobile.",
                    icon = Icons.Filled.Person
                )
            }
        } else {
            items(state.clientesFiltrados, key = { it.id }) { cliente ->
                CadastroCard(
                    title = cliente.nome,
                    subtitle = cliente.telefone ?: "Telefone não informado",
                    extra = cliente.documento ?: (cliente.observacoes ?: "Sem observações"),
                    icon = Icons.Filled.Person
                )
            }
        }
        item { SectionTitle("Veículos", "Itens vinculados a clientes já cadastrados") }
        if (state.veiculosFiltrados.isEmpty()) {
            item {
                EmptyState(
                    title = "Nenhum veículo cadastrado",
                    description = "Os veículos vinculados aparecerão aqui.",
                    icon = Icons.Filled.DirectionsCar
                )
            }
        } else {
            items(state.veiculosFiltrados, key = { it.id }) { veiculo ->
                CadastroCard(
                    title = veiculo.placa,
                    subtitle = veiculo.modelo ?: "Modelo não informado",
                    extra = veiculo.alertaEspecial ?: (veiculo.cor ?: "Sem alerta"),
                    icon = Icons.Filled.DirectionsCar
                )
            }
        }
    }

    if (showDialog) {
        NovoCadastroDialog(
            onClose = { showDialog = false },
            onSave = { clienteNome, telefone, documento, observacoes, placa, marcaModelo, cor, alerta ->
                onSaveCadastro(clienteNome, telefone, documento, observacoes, placa, marcaModelo, cor, alerta, usuario)
                showDialog = false
            }
        )
    }
}

@Composable
private fun CadastroCard(
    title: String,
    subtitle: String,
    extra: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector
) {
    LavaPrimeCard {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            androidx.compose.material3.Surface(
                color = Color(0xFFE8F7FE),
                contentColor = Color(0xFF0B5876),
                shape = RoundedCornerShape(16.dp)
            ) {
                Box(modifier = Modifier.padding(10.dp)) {
                    androidx.compose.material3.Icon(icon, contentDescription = null)
                }
            }
            androidx.compose.foundation.layout.Column(
                verticalArrangement = Arrangement.spacedBy(4.dp),
                modifier = Modifier.weight(1f)
            ) {
                Text(title, fontWeight = FontWeight.Bold, color = Color(0xFF0B3348))
                Text(subtitle, style = MaterialTheme.typography.bodyMedium, color = Color(0xFF4E6470))
                Text(extra, style = MaterialTheme.typography.bodySmall, color = Color(0xFF64748B))
            }
        }
    }
}

@Composable
private fun NovoCadastroDialog(
    onClose: () -> Unit,
    onSave: (String, String, String, String, String, String, String, String) -> Unit
) {
    var clienteNome by remember { mutableStateOf("") }
    var telefone by remember { mutableStateOf("") }
    var documento by remember { mutableStateOf("") }
    var observacoes by remember { mutableStateOf("") }
    var placa by remember { mutableStateOf("") }
    var marcaModelo by remember { mutableStateOf("") }
    var cor by remember { mutableStateOf("") }
    var alerta by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onClose,
        confirmButton = {
            LavaPrimeActionButton(
                text = "Salvar cadastro",
                onClick = { onSave(clienteNome, telefone, documento, observacoes, placa, marcaModelo, cor, alerta) }
            )
        },
        dismissButton = {
            TextButton(onClick = onClose) {
                Text("Cancelar")
            }
        },
        title = {
            Text("Novo cadastro", color = Color(0xFF0B3348), fontWeight = FontWeight.Bold)
        },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                item { LavaPrimeTextField(clienteNome, { clienteNome = it }, label = "Nome do cliente") }
                item { LavaPrimeTextField(telefone, { telefone = it }, label = "Telefone") }
                item { LavaPrimeTextField(documento, { documento = it }, label = "Documento") }
                item { LavaPrimeTextField(observacoes, { observacoes = it }, label = "Observações", minLines = 2) }
                item { LavaPrimeTextField(placa, { placa = it.uppercase().take(8) }, label = "Placa") }
                item { LavaPrimeTextField(marcaModelo, { marcaModelo = it }, label = "Marca / modelo") }
                item { LavaPrimeTextField(cor, { cor = it }, label = "Cor") }
                item { LavaPrimeTextField(alerta, { alerta = it }, label = "Alerta especial", minLines = 2) }
            }
        },
        shape = RoundedCornerShape(28.dp),
        containerColor = Color.White
    )
}
