package com.malinowski.plugins

import io.ktor.routing.*
import io.ktor.application.*
import io.ktor.response.*

fun Application.configureRouting() {

    // Starting point for a Ktor app:
    routing {
        get("/") {
            call.respondText("\n\n\n\nServer works!")
        }
    }
    routing {

    }
}
