package br.com.primyo.lavaprime.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import br.com.primyo.lavaprime.data.model.AtendimentoEntity
import br.com.primyo.lavaprime.data.model.AuditLogEntity
import br.com.primyo.lavaprime.data.model.ClienteEntity
import br.com.primyo.lavaprime.data.model.ProdutoEntity
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.SyncQueueEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.model.VeiculoEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface UsuarioDao {
    @Query("SELECT * FROM usuarios WHERE ativo = 1 ORDER BY perfil, nome") fun listarAtivos(): Flow<List<UsuarioEntity>>
    @Query("SELECT * FROM usuarios WHERE id = :id LIMIT 1") suspend fun porId(id: String): UsuarioEntity?
    @Query("SELECT * FROM usuarios WHERE email = :email LIMIT 1") suspend fun porEmail(email: String): UsuarioEntity?
    @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun salvar(item: UsuarioEntity)
}

@Dao
interface ClienteDao {
    @Query("SELECT * FROM clientes ORDER BY nome") fun listar(): Flow<List<ClienteEntity>>
    @Query("SELECT * FROM clientes WHERE nome LIKE '%' || :busca || '%' OR telefone LIKE '%' || :busca || '%' ORDER BY nome LIMIT 20") fun buscar(busca: String): Flow<List<ClienteEntity>>
    @Query("SELECT * FROM clientes WHERE id = :id LIMIT 1") suspend fun obter(id: String): ClienteEntity?
    @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun salvar(item: ClienteEntity)
}

@Dao
interface VeiculoDao {
    @Query("SELECT * FROM veiculos ORDER BY updatedAt DESC LIMIT 100") fun listarRecentes(): Flow<List<VeiculoEntity>>
    @Query("SELECT * FROM veiculos WHERE placa LIKE '%' || :busca || '%' OR modelo LIKE '%' || :busca || '%' ORDER BY updatedAt DESC LIMIT 20") fun buscar(busca: String): Flow<List<VeiculoEntity>>
    @Query("SELECT * FROM veiculos WHERE id = :id LIMIT 1") suspend fun obter(id: String): VeiculoEntity?
    @Query("SELECT * FROM veiculos WHERE placa = :placa LIMIT 1") suspend fun porPlaca(placa: String): VeiculoEntity?
    @Query("SELECT * FROM veiculos WHERE clienteId = :clienteId ORDER BY updatedAt DESC") suspend fun listarPorClienteSnapshot(clienteId: String): List<VeiculoEntity>
    @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun salvar(item: VeiculoEntity)
}

@Dao
interface ServicoDao {
    @Query("SELECT * FROM servicos ORDER BY nome") fun listarTodos(): Flow<List<ServicoEntity>>
    @Query("SELECT * FROM servicos WHERE ativo = 1 ORDER BY categoria, nome") fun listarAtivos(): Flow<List<ServicoEntity>>
    @Query("SELECT * FROM servicos WHERE id = :id LIMIT 1") suspend fun obter(id: String): ServicoEntity?
    @Query("SELECT * FROM servicos WHERE lower(nome) = lower(:nome) LIMIT 1") suspend fun porNome(nome: String): ServicoEntity?
    @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun salvar(item: ServicoEntity)
}

@Dao
interface ProdutoDao {
    @Query("SELECT * FROM produtos ORDER BY nome") fun listar(): Flow<List<ProdutoEntity>>
    @Query("SELECT * FROM produtos WHERE ativo = 1 ORDER BY nome") fun listarAtivos(): Flow<List<ProdutoEntity>>
    @Query("SELECT * FROM produtos WHERE estoqueAtual <= estoqueMinimo ORDER BY nome") fun estoqueCritico(): Flow<List<ProdutoEntity>>
    @Query("SELECT * FROM produtos WHERE id = :id LIMIT 1") suspend fun obter(id: String): ProdutoEntity?
    @Query("SELECT * FROM produtos WHERE lower(sku) = lower(:sku) LIMIT 1") suspend fun porSku(sku: String): ProdutoEntity?
    @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun salvar(item: ProdutoEntity)
}

@Dao
interface AtendimentoDao {
    @Query("SELECT * FROM atendimentos WHERE status != 'FINALIZADO' AND status != 'CANCELADO' ORDER BY criadoEm DESC") fun patio(): Flow<List<AtendimentoEntity>>
    @Query("SELECT * FROM atendimentos ORDER BY criadoEm DESC LIMIT 100") fun ultimos(): Flow<List<AtendimentoEntity>>
    @Query("SELECT * FROM atendimentos WHERE id = :id LIMIT 1") suspend fun obter(id: String): AtendimentoEntity?
    @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun salvar(item: AtendimentoEntity)
}

@Dao
interface AuditLogDao {
    @Query("SELECT * FROM audit_logs ORDER BY criadoEm DESC LIMIT 50") fun recentes(): Flow<List<AuditLogEntity>>
    @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun salvar(item: AuditLogEntity)
}

@Dao
interface SyncQueueDao {
    @Query("SELECT * FROM sync_queue ORDER BY criadoEm ASC") fun pendentes(): Flow<List<SyncQueueEntity>>
    @Query("SELECT * FROM sync_queue ORDER BY criadoEm ASC") suspend fun pendentesSnapshot(): List<SyncQueueEntity>
    @Query("DELETE FROM sync_queue WHERE id IN (:ids)") suspend fun remover(ids: List<String>)
    @Query("UPDATE sync_queue SET tentativas = :tentativas, ultimaTentativaEm = :instante WHERE id = :id") suspend fun registrarTentativa(id: String, tentativas: Int, instante: Long)
    @Insert(onConflict = OnConflictStrategy.REPLACE) suspend fun salvar(item: SyncQueueEntity)
}
