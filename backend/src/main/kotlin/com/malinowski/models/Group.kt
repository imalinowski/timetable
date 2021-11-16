package com.malinowski.models

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.SizedIterable

@Serializable
data class Group(
    val id: Int,
    val name: String
)

object GroupTable : IntIdTable() {
    val name = varchar("name", 100)
}

class GroupEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<GroupEntity>(GroupTable)

    var name by GroupTable.name
}

fun SizedIterable<GroupEntity>.toGroups(): List<Group> {
    val users = mutableListOf<Group>()
    this.onEach {
        users.add(
            Group(
                id = it.id.value,
                name = it.name,
            )
        )
    }
    return users
}