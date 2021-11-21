package com.malinowski.routes

import com.malinowski.models.*
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import org.jetbrains.exposed.sql.SizedCollection
import org.jetbrains.exposed.sql.transactions.transaction

val events by lazy {
    transaction {
        EventEntity.all().toEvents().toMutableList()
    }
}

fun Route.eventRouting() {
    route("/event") {
        get {
            call.respondText(events.joinToString("\n"), status = HttpStatusCode.Accepted)
        }
        get("{id}") {
            val id = call.parameters["id"]?.toInt() ?: return@get call.respondText(
                "Missing or malformed id",
                status = HttpStatusCode.BadRequest
            )
            if (id >= events.size)
                call.respondText("unknown id", status = HttpStatusCode.BadRequest)
            else
                call.respondText(events[id].toString(), status = HttpStatusCode.Accepted)
        }
        post {
            try {
                val event = call.receive<Event>()
                events.add(event)
                val id = transaction {
                    EventEntity.new {
                        name = event.name
                        locationId = event.locationId
                        time = event.time
                        // members = SizedCollection(event.members)
                    }.id
                }
                call.respondText("Event stored correctly ID = $id", status = HttpStatusCode.Created)
            } catch (e: Throwable) {
                call.respondText("${e.message}", status = HttpStatusCode.BadRequest)
            }
        }
        post("{id}/adduser/{userid}") {
            try {
                val eventId = call.parameters["id"]?.toInt() ?: return@post call.respondText(
                    "Missing or malformed id",
                    status = HttpStatusCode.BadRequest
                )
                val userId = call.parameters["userid"]?.toInt() ?: return@post call.respondText(
                    "Missing or malformed user id",
                    status = HttpStatusCode.BadRequest
                )
                transaction {
                    val event = EventEntity.find { EventTable.id eq eventId }.let {
                        if (it.empty()) throw IllegalStateException("Event with id = $eventId not exist!")
                        it.first()
                    }
                    val user = UserEntity.find { UserTable.id eq userId }.let {
                        if (it.empty()) throw IllegalStateException("User with id = $userId not exist!")
                        it.first()
                    }
                    val copy = event.members.toMutableList().apply { add(user) }
                    event.members = SizedCollection(copy)
                    // todo update cache
                }
                call.respondText("User added correctly", status = HttpStatusCode.Created)
            } catch (e: Throwable) {
                call.respondText("${e.message}", status = HttpStatusCode.BadRequest)
            }
        }
    }
}

fun Application.registerEventRoutes() {
    routing {
        eventRouting()
    }
}