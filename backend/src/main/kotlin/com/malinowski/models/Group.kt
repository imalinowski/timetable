package com.malinowski.models

import kotlinx.serialization.Serializable

@Serializable
data class Group(
    val id: Int,
    val name: String
)