package com.malinowski.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.SizedIterable

enum class UserRole(val role: String) {
    Teacher("teacher"),
    Student("student")
}

@Serializable
data class User(
    val id: Int = 0,
    val email: String = "",
    val name: String = "",
    val role: UserRole,
    @SerialName("group_id") val groupId: Int = -1
)

object UserTable : IntIdTable() {
    val name = varchar("name", 100)
    val email = varchar("email", 100)
    val role = enumeration("role", UserRole::class)
    val groupId = integer("group_id")
}

class UserEntity(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<UserEntity>(UserTable)

    var name by UserTable.name
    var email by UserTable.email
    var role by UserTable.role
    var groupId by UserTable.groupId
}

fun SizedIterable<UserEntity>.toGroups(): List<User> {
    val users = mutableListOf<User>()
    this.onEach {
        users.add(
            User(
                id = it.id.value,
                email = it.email,
                name = it.name,
                role = it.role,
                groupId = it.groupId,
            )
        )
    }
    return users
}