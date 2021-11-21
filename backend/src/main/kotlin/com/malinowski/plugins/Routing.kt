package com.malinowski.plugins

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

fun Application.configureRouting() {

    // Starting point for a Ktor app:
    routing {
        get("/") {
            headersOf()
            call.respondText("\n\n\n\nServer works!")
        }
    }
}
