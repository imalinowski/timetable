package com.malinowski.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.SizedIterable

@Serializable
data class Location(
    val id: Int = 0 ,
    val name: String,
    val coordinates: String,
)

object LocationTable : IntIdTable() {
    val name = varchar("name", 100)
    val coordinates = varchar("coordinates", 100)
}

class LocationEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<LocationEntity>(LocationTable)

    var name by LocationTable.name
    var coordinates by LocationTable.coordinates
}

fun SizedIterable<LocationEntity>.toLocations(): List<Location> =
    this.map {
        Location(
            id = it.id.value,
            name = it.name,
            coordinates = it.coordinates
        )
    }