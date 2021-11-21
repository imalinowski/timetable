package com.malinowski.routes

import com.malinowski.models.User
import com.malinowski.models.UserEntity
import com.malinowski.models.toUsers
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
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
            val id = call.parameters["id"] ?: return@get call.respondText(
                "Missing or malformed id",
                status = HttpStatusCode.BadRequest
            )
            call.respondText("\n${users[id.toInt()]}", status = HttpStatusCode.Accepted)
        }
        post {
            try {
                val user = call.receive<User>()
                users.add(user)
                // insert new city. SQL: INSERT INTO Cities (name) VALUES ('St. Petersburg')
                val id = transaction {
                    UserEntity.new {
                        name = user.name
                        email = user.email
                        groupId = user.groupId
                        role = user.role
                    }.id
                }
                call.respondText("User stored correctly ID = $id", status = HttpStatusCode.Created)

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