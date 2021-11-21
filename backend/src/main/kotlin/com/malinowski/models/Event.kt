package com.malinowski.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.SizedIterable

@Serializable
data class Event(
    val id: Int,
    val name: String,
    @SerialName("location_id") val locationId: Int,
    val members: List<User> = listOf(),
    val time: Long,
)

object EventTable : IntIdTable() {
    val name = varchar("name", 100)
    val locationId = integer("location_id")
    val time = long("time_date")
}

class EventEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<EventEntity>(EventTable)

    var name by EventTable.name
    var locationId by EventTable.locationId
    var time by EventTable.time
    var members by UserEntity via UserEventTable
}

fun SizedIterable<EventEntity>.toEvents(): List<Event> {
    val events = mutableListOf<Event>()
    this.onEach {
        events.add(
            Event(
                id = it.id.value,
                name = it.name,
                locationId = it.locationId,
                time = it.time,
                members = it.members.toUsers()
            )
        )
    }
    return events
}