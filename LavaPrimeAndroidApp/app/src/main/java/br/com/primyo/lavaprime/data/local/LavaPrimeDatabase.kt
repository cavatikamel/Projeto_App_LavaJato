package br.com.primyo.lavaprime.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase
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
    version = 5,
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
        val MIGRATION_2_3 = object : Migration(2, 3) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL("ALTER TABLE clientes ADD COLUMN personType TEXT NOT NULL DEFAULT 'PF'")
                db.execSQL("ALTER TABLE clientes ADD COLUMN billing INTEGER NOT NULL DEFAULT 0")
                db.execSQL("ALTER TABLE clientes ADD COLUMN legalName TEXT")
                db.execSQL("ALTER TABLE clientes ADD COLUMN address TEXT")
                db.execSQL("ALTER TABLE clientes ADD COLUMN email TEXT")
                db.execSQL("ALTER TABLE clientes ADD COLUMN responsible TEXT")
                db.execSQL("ALTER TABLE clientes ADD COLUMN approver TEXT")
                db.execSQL("ALTER TABLE clientes ADD COLUMN billingApproved INTEGER NOT NULL DEFAULT 0")
                db.execSQL("ALTER TABLE clientes ADD COLUMN billingCycle TEXT")
                db.execSQL("ALTER TABLE clientes ADD COLUMN allowMultipleOpenInvoices INTEGER NOT NULL DEFAULT 0")
            }
        }

        val MIGRATION_3_4 = object : Migration(3, 4) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL("ALTER TABLE veiculos ADD COLUMN ano TEXT")
                db.execSQL("ALTER TABLE veiculos ADD COLUMN tipo TEXT NOT NULL DEFAULT 'Carro'")
                db.execSQL("ALTER TABLE veiculos ADD COLUMN categoria TEXT")
                db.execSQL("ALTER TABLE veiculos ADD COLUMN combustivel TEXT")
                db.execSQL("ALTER TABLE veiculos ADD COLUMN observacoes TEXT")
            }
        }

        val MIGRATION_4_5 = object : Migration(4, 5) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL("ALTER TABLE servicos ADD COLUMN tipoVeiculo TEXT NOT NULL DEFAULT 'Carro'")
                db.execSQL("ALTER TABLE servicos ADD COLUMN categoriaVeiculo TEXT DEFAULT 'Hatch'")
                db.execSQL("ALTER TABLE servicos ADD COLUMN statusCatalogo TEXT NOT NULL DEFAULT 'Ativo'")
                db.execSQL("ALTER TABLE servicos ADD COLUMN fichaTecnicaAtiva INTEGER NOT NULL DEFAULT 0")
                db.execSQL("ALTER TABLE servicos ADD COLUMN custoFichaTecnicaCentavos INTEGER NOT NULL DEFAULT 0")
                db.execSQL("ALTER TABLE servicos ADD COLUMN requerManutencao INTEGER NOT NULL DEFAULT 0")
                db.execSQL("ALTER TABLE servicos ADD COLUMN intervaloManutencao TEXT")
                db.execSQL("ALTER TABLE servicos ADD COLUMN dataManutencao TEXT")
            }
        }

        @Volatile private var INSTANCE: LavaPrimeDatabase? = null
        fun getDatabase(context: Context): LavaPrimeDatabase = INSTANCE ?: synchronized(this) {
            Room.databaseBuilder(context.applicationContext, LavaPrimeDatabase::class.java, "lavaprime.db")
                .addMigrations(MIGRATION_2_3, MIGRATION_3_4, MIGRATION_4_5)
                .fallbackToDestructiveMigration()
                .build()
                .also { INSTANCE = it }
        }
    }
}
