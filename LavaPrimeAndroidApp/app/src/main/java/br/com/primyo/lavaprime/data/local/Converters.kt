package br.com.primyo.lavaprime.data.local

import androidx.room.TypeConverter
import br.com.primyo.lavaprime.data.model.AtendimentoStatus
import br.com.primyo.lavaprime.data.model.FormaPagamento
import br.com.primyo.lavaprime.data.model.PerfilUsuario
import br.com.primyo.lavaprime.data.model.SyncStatus

class Converters {
    @TypeConverter fun toAtendimentoStatus(value: String?): AtendimentoStatus? = value?.let { AtendimentoStatus.valueOf(it) }
    @TypeConverter fun fromAtendimentoStatus(value: AtendimentoStatus?): String? = value?.name
    @TypeConverter fun toSyncStatus(value: String?): SyncStatus? = value?.let { SyncStatus.valueOf(it) }
    @TypeConverter fun fromSyncStatus(value: SyncStatus?): String? = value?.name
    @TypeConverter fun toPerfilUsuario(value: String?): PerfilUsuario? = value?.let { PerfilUsuario.valueOf(it) }
    @TypeConverter fun fromPerfilUsuario(value: PerfilUsuario?): String? = value?.name
    @TypeConverter fun toFormaPagamento(value: String?): FormaPagamento? = value?.let { FormaPagamento.valueOf(it) }
    @TypeConverter fun fromFormaPagamento(value: FormaPagamento?): String? = value?.name
}
