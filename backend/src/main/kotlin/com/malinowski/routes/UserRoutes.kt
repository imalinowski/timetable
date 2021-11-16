package com.malinowski.routes

import com.malinowski.models.User
import com.malinowski.models.UserTable
import com.malinowski.models.users
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction

fun Route.userRouting() {
    route("/user") {
        get {
            call.respondText("$users", status = HttpStatusCode.Accepted)
        }
        get("{id}") {
            val id = call.parameters["id"] ?: return@get call.respondText(
                "Missing or malformed id",
                status = HttpStatusCode.BadRequest
            )
            call.respondText("\n\n\n ${users[id.toInt()]}", status = HttpStatusCode.Accepted)
        }
        post {
            try {
                val user = call.receive<User>()
                users.add(user)
                // insert new city. SQL: INSERT INTO Cities (name) VALUES ('St. Petersburg')
                val id = transaction {
                    UserTable.insert {
                        it[email] = user.email
                        it[name] = user.name
                        it[groupId] = user.groupId
                    } get UserTable.id
                }
                call.respondText("Customer stored correctly ID = $id", status = HttpStatusCode.Created)

            } catch (e: Throwable) {
                call.respondText(e.message ?: "error", status = HttpStatusCode.Created)
            }
            call.respondText("Customer stored correctly", status = HttpStatusCode.Created)
        }
    }
}

fun Application.registerUserRoutes() {
    routing {
        userRouting()
    }
}