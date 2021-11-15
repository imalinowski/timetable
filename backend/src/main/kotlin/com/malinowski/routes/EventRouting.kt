package com.malinowski.routes

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.eventRouting() {
    route("/event") {
        get {
            call.respondText("events...", status = HttpStatusCode.Accepted)
        }
        get("{id}") {
            val id = call.parameters["id"] ?: return@get call.respondText(
                "Missing or malformed id",
                status = HttpStatusCode.BadRequest
            )
            call.respondText("event $id...", status = HttpStatusCode.Accepted)
        }
    }
}

fun Application.registerEventRoutes(){
    routing {
        eventRouting()
    }
}