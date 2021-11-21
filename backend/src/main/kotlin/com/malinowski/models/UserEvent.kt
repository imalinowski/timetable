package com.malinowski.models

import org.jetbrains.exposed.sql.Table

object UserEventTable : Table() {
    private val eventId = reference("event_id", EventTable)
    private val userId = reference("user_id", UserTable)
    override val primaryKey = PrimaryKey(eventId, userId)
}