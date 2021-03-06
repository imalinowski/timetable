package com.malinowski.routes

import com.malinowski.format
import com.malinowski.models.*
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.encodeToString
import org.jetbrains.exposed.sql.SizedCollection
import org.jetbrains.exposed.sql.transactions.transaction

var events = getEventsDB()
fun getEventsDB() = transaction {
    EventEntity.all().toEvents().toMutableList()
}

fun Route.eventRouting() {
    route("/event") {
        get {
            call.respondText(format.encodeToString(events), status = HttpStatusCode.Accepted)
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
                val id = transaction {
                    val location = LocationEntity.find { LocationTable.id eq event.location.id }.let {
                        it.firstOrNull() ?: LocationEntity.new {
                            name = event.location.name
                            coordinates = event.location.coordinates
                        }
                    }
                    EventEntity.new {
                        name = event.name
                        locationId = location
                        time = event.time
                        weekDay = event.week_day
                    }.id
                }
                events = getEventsDB()
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
                    val eventEnt = EventEntity.find { EventTable.id eq eventId }.let {
                        if (it.empty()) throw IllegalStateException("Event with id = $eventId not exist!")
                        it.first()
                    }
                    val userEnt = UserEntity.find { UserTable.id eq userId }.let {
                        if (it.empty()) throw IllegalStateException("User with id = $userId not exist!")
                        it.first()
                    }
                    val user = User(
                        id = userEnt.id.value,
                        email = userEnt.email,
                        name = userEnt.name,
                        role = userEnt.role,
                        groupId = userEnt.groupId,
                    )

                    events.filter { event -> event.members.contains(user) }
                        .filter { event ->
                            event.time == eventEnt.time && event.week_day == eventEnt.weekDay
                        }.also {
                            if(it.isNotEmpty()) throw java.lang.IllegalStateException("User is busy. ${it.first().name} at that time")
                        }

                    val copy = eventEnt.members.toMutableList().apply { add(userEnt) }
                    eventEnt.members = SizedCollection(copy)
                    events = getEventsDB()
                }
                call.respondText("User added to event correctly", status = HttpStatusCode.Created)
            } catch (e: Throwable) {
                call.respondText("${e.message}", status = HttpStatusCode.BadRequest)
            }
        }
        delete("{id}/deleteuser/{userid}") {
            try {
                val eventId = call.parameters["id"]?.toInt() ?: return@delete call.respondText(
                    "Missing or malformed id",
                    status = HttpStatusCode.BadRequest
                )
                val userId = call.parameters["userid"]?.toInt() ?: return@delete call.respondText(
                    "Missing or malformed user id",
                    status = HttpStatusCode.BadRequest
                )
                transaction {
                    val user = UserEntity.find { UserTable.id eq userId }.let {
                        if (it.empty()) throw IllegalStateException("User with id = $userId not exist!")
                        it.first()
                    }
                    val event = EventEntity.find { EventTable.id eq eventId }.let {
                        if (it.empty()) throw IllegalStateException("Event with id = $eventId not exist!")
                        it.first()
                    }
                    val copy = event.members.toMutableList().apply { remove(user) }
                    event.members = SizedCollection(copy)
                    events = getEventsDB()
                }
                call.respondText("User deleted from event correctly", status = HttpStatusCode.Accepted)
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