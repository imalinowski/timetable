package com.malinowski.models

import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: Int,
    val email: String,
    val name: String,
    val role: UserRole,
    val groupId: Int
)

enum class UserRole {
    Teacher, Student
}