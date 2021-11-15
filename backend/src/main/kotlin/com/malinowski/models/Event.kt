package com.malinowski.models

import kotlinx.serialization.Serializable

@Serializable
class Event(
    val name: String,
    val locationId: Int,
    val members: List<User>,
    val time: Long,
)