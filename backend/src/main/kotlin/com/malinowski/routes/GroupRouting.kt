package com.malinowski.routes

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.groupRouting() {
    route("/group") {
        get {
            call.respondText("groups...", status = HttpStatusCode.Accepted)
        }
        get("{id}") {
            val id = call.parameters["id"] ?: return@get call.respondText(
                "Missing or malformed id",
                status = HttpStatusCode.BadRequest
            )
            call.respondText("group $id...", status = HttpStatusCode.Accepted)
        }
    }
}

fun Application.registerGroupsRoutes(){
    routing {
        groupRouting()
    }
}