package br.com.primyo.lavaprime.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import br.com.primyo.lavaprime.data.model.AtendimentoEntity
import br.com.primyo.lavaprime.data.model.AuditLogEntity
import br.com.primyo.lavaprime.data.model.ClienteEntity
import br.com.primyo.lavaprime.data.model.ProdutoEntity
import br.com.primyo.lavaprime.data.model.ServicoEntity
import br.com.primyo.lavaprime.data.model.SyncQueueEntity
import br.com.primyo.lavaprime.data.model.UsuarioEntity
import br.com.primyo.lavaprime.data.model.VeiculoEntity

@Database(
    entities = [
        UsuarioEntity::class,
        ClienteEntity::class,
        VeiculoEntity::class,
        ServicoEntity::class,
        ProdutoEntity::class,
        AtendimentoEntity::class,
        AuditLogEntity::class,
        SyncQueueEntity::class
    ],
    version = 2,
    exportSchema = true
)
@TypeConverters(Converters::class)
abstract class LavaPrimeDatabase : RoomDatabase() {
    abstract fun usuarioDao(): UsuarioDao
    abstract fun clienteDao(): ClienteDao
    abstract fun veiculoDao(): VeiculoDao
    abstract fun servicoDao(): ServicoDao
    abstract fun produtoDao(): ProdutoDao
    abstract fun atendimentoDao(): AtendimentoDao
    abstract fun auditLogDao(): AuditLogDao
    abstract fun syncQueueDao(): SyncQueueDao

    companion object {
        @Volatile private var INSTANCE: LavaPrimeDatabase? = null
        fun getDatabase(context: Context): LavaPrimeDatabase = INSTANCE ?: synchronized(this) {
            Room.databaseBuilder(context.applicationContext, LavaPrimeDatabase::class.java, "lavaprime.db")
                .fallbackToDestructiveMigration()
                .build()
                .also { INSTANCE = it }
        }
    }
}
