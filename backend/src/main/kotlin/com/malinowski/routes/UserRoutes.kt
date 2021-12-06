package com.malinowski.routes

import com.malinowski.models.User
import com.malinowski.models.UserEntity
import com.malinowski.models.toUsers
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.transactions.transaction

val users by lazy {
    transaction {
        UserEntity.all().toUsers().toMutableList()
    }
}

fun Route.userRouting() {
    route("/user") {
        get {
            call.respondText(users.joinToString("\n"), status = HttpStatusCode.Accepted)
        }
        get("{id}") {
            val id = call.parameters["id"]?.toInt() ?: return@get call.respondText(
                "Missing or malformed id",
                status = HttpStatusCode.BadRequest
            )
            val user = users.find { it.id == id }
            if (user == null)
                call.respondText("User with id $id not found!", status = HttpStatusCode.BadRequest)
            else
                call.respondText(Json.encodeToString(user), status = HttpStatusCode.Accepted)
        }
        post {
            try {
                val user = call.receive<User>()

                val exUser = users.find { it.name == user.name && it.email == user.email }
                if (exUser != null) {
                    call.respondText("${exUser.id}", status = HttpStatusCode.Created)
                    return@post
                }
                val id = transaction {
                    UserEntity.new {
                        name = user.name
                        email = user.email
                        groupId = user.groupId
                        role = user.role
                    }.id
                }
                users.add(user.copy(id = id.value))
                call.respondText("$id", status = HttpStatusCode.Created)

            } catch (e: Throwable) {
                call.respondText(e.message ?: "error", status = HttpStatusCode.BadRequest)
            }
        }
    }
}

fun Application.registerUserRoutes() {
    routing {
        userRouting()
    }
}