package com.malinowski.routes

import com.malinowski.format
import com.malinowski.models.*
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.encodeToString
import org.jetbrains.exposed.sql.transactions.transaction

val locations by lazy {
    transaction {
        LocationEntity.all().toLocations().toMutableList()
    }
}

fun Route.locationRouting() {
    route("/location") {
        get {
            call.respondText(format.encodeToString(locations), status = HttpStatusCode.Accepted)
        }
        get("{id}") {
            val id = call.parameters["id"]?.toInt() ?: return@get call.respondText(
                "Missing or malformed id",
                status = HttpStatusCode.BadRequest
            )
            call.respondText(locations[id].toString(), status = HttpStatusCode.Accepted)
        }
        post {
            try {
                val location = call.receive<Location>()
                locations.add(location)
                val id = transaction {
                    LocationEntity.new {
                        name = location.name
                        coordinates = location.coordinates
                    }.id
                }
                call.respondText("Location stored correctly ID = $id", status = HttpStatusCode.Created)

            } catch (e: Throwable) {
                call.respondText(e.message ?: "error", status = HttpStatusCode.BadRequest)
            }
        }
    }
}

fun Application.registerLocationRoutes() {
    routing {
        locationRouting()
    }
}