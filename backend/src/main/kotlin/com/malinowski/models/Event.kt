package com.malinowski.models

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
    val location: Location,
    val members: List<User> = listOf(),
    val time: Long,
    val week_day: Int,
)

object EventTable : IntIdTable() {
    val name = varchar("name", 100)
    val locationId = reference("location_id", LocationTable) // many to one reference
    val time = long("time")
    val weekDay = integer("week_day")
}

class EventEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<EventEntity>(EventTable)

    var name by EventTable.name
    var locationId by LocationEntity referencedOn EventTable.locationId
    var time by EventTable.time
    var weekDay by EventTable.weekDay
    var members by UserEntity via UserEventTable
}

fun SizedIterable<EventEntity>.toEvents(): List<Event> {
    val events = mutableListOf<Event>()
    this.onEach {
        events.add(
            Event(
                id = it.id.value,
                name = it.name,
                location = Location(
                    id = it.locationId.id.value,
                    name = it.locationId.name,
                    coordinates = it.locationId.coordinates
                ),
                time = it.time,
                members = it.members.toUsers(),
                week_day = it.weekDay
            )
        )
    }
    return events
}