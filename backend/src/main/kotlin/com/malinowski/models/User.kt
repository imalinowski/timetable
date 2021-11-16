package com.malinowski.models

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.Query

val users = mutableListOf<User>()

@Serializable
data class User(
    val id: Int = 0,
    val email: String = "",
    val name: String = "",
    val role: UserRole = UserRole.Teacher,
    @SerialName("group_id") val groupId: Int = -1
)

object UserTable : IntIdTable() {
    val email = varchar("email", 100)
    val name = varchar("name", 100)
    val groupId = integer("group_id")
}

fun Query.toUsers(): List<User> {
    val users = mutableListOf<User>()
    this.onEach {
        users.add(
            User(
                id = it[UserTable.id].value,
                email = it[UserTable.email],
                name = it[UserTable.name],
                groupId = it[UserTable.groupId],
            )
        )
    }
    return users
}

enum class UserRole {
    Teacher, Student
}