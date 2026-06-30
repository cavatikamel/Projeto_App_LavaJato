package br.com.primyo.lavaprime.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.ui.components.EmptyState
import br.com.primyo.lavaprime.ui.components.HeroPanel
import br.com.primyo.lavaprime.ui.components.SectionTitle
import br.com.primyo.lavaprime.ui.theme.Mint
import br.com.primyo.lavaprime.ui.theme.PrimeBlue
import br.com.primyo.lavaprime.ui.theme.SoftLine
import br.com.primyo.lavaprime.ui.theme.TextPrimary
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
        modifier = Modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
        contentPadding = PaddingValues(bottom = 90.dp)
    ) {
        item {
            HeroPanel(
                title = "Clientes e veiculos",
                description = "Cadastro em formato vertical, com busca rapida e historico adaptado para celular.",
                icon = "CV"
            )
        }
        item {
            OutlinedTextField(
                value = state.busca,
                onValueChange = onSearchChange,
                label = { Text("Buscar por nome, telefone, placa ou modelo") },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp)
            )
        }
        item {
            Button(
                onClick = { showDialog = true },
                colors = ButtonDefaults.buttonColors(containerColor = Mint, contentColor = TextPrimary),
                shape = RoundedCornerShape(16.dp)
            ) {
                Text("Novo cadastro")
            }
        }
        item { SectionTitle("Clientes") }
        if (state.clientesFiltrados.isEmpty()) {
            item { EmptyState("Nenhum cliente", "Cadastre um cliente para iniciar o historico mobile.") }
        } else {
            items(state.clientesFiltrados, key = { it.id }) { cliente ->
                CadastroCard(
                    title = cliente.nome,
                    subtitle = cliente.telefone ?: "Telefone nao informado",
                    extra = cliente.documento ?: (cliente.observacoes ?: "Sem observacoes")
                )
            }
        }
        item { SectionTitle("Veiculos") }
        if (state.veiculosFiltrados.isEmpty()) {
            item { EmptyState("Nenhum veiculo", "Os veiculos cadastrados aparecerao aqui.") }
        } else {
            items(state.veiculosFiltrados, key = { it.id }) { veiculo ->
                CadastroCard(
                    title = veiculo.placa,
                    subtitle = veiculo.modelo ?: "Modelo nao informado",
                    extra = veiculo.alertaEspecial ?: (veiculo.cor ?: "Sem alerta")
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
private fun CadastroCard(title: String, subtitle: String, extra: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(20.dp),
        border = BorderStroke(1.dp, SoftLine)
    ) {
        androidx.compose.foundation.layout.Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Text(title, fontWeight = FontWeight.Black, color = PrimeBlue)
            Text(subtitle, style = MaterialTheme.typography.bodyMedium, color = Color(0xFF455F67))
            Surface(color = Color(0xFFEAF7FA), shape = RoundedCornerShape(12.dp)) {
                Text(extra, modifier = Modifier.padding(horizontal = 10.dp, vertical = 8.dp), style = MaterialTheme.typography.bodySmall, color = Color(0xFF4F6870))
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
            Button(
                onClick = { onSave(clienteNome, telefone, documento, observacoes, placa, marcaModelo, cor, alerta) },
                colors = ButtonDefaults.buttonColors(containerColor = Mint, contentColor = TextPrimary)
            ) {
                Text("Salvar cadastro")
            }
        },
        dismissButton = { TextButton(onClick = onClose) { Text("Cancelar") } },
        title = { Text("Novo cadastro", color = PrimeBlue, fontWeight = FontWeight.Black) },
        text = {
            LazyColumn(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                item { OutlinedTextField(clienteNome, { clienteNome = it }, label = { Text("Nome do cliente") }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp)) }
                item { OutlinedTextField(telefone, { telefone = it }, label = { Text("Telefone") }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp)) }
                item { OutlinedTextField(documento, { documento = it }, label = { Text("Documento") }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp)) }
                item { OutlinedTextField(observacoes, { observacoes = it }, label = { Text("Observacoes") }, modifier = Modifier.fillMaxWidth(), minLines = 2, shape = RoundedCornerShape(14.dp)) }
                item { OutlinedTextField(placa, { placa = it.uppercase().take(8) }, label = { Text("Placa") }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp)) }
                item { OutlinedTextField(marcaModelo, { marcaModelo = it }, label = { Text("Marca / modelo") }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp)) }
                item { OutlinedTextField(cor, { cor = it }, label = { Text("Cor") }, modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(14.dp)) }
                item { OutlinedTextField(alerta, { alerta = it }, label = { Text("Alerta especial") }, modifier = Modifier.fillMaxWidth(), minLines = 2, shape = RoundedCornerShape(14.dp)) }
            }
        },
        shape = RoundedCornerShape(24.dp),
        containerColor = Color.White
    )
}
