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

var users = getUsersDB()
fun getUsersDB() = transaction {
    UserEntity.all().toUsers().toMutableList()
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
            println("----------------------DEBUG-GET-USER----------------------")
            println(format.encodeToString(user))
            if (user == null)
                call.respondText("User with id $id not found!", status = HttpStatusCode.BadRequest)
            else
                call.respondText(format.encodeToString(user), status = HttpStatusCode.Accepted)
        }
        put("{userId}/toGroup/{groupId}") {
            val userId = call.parameters["userId"]?.toInt() ?: return@put call.respondText(
                "Missing or malformed userId",
                status = HttpStatusCode.BadRequest
            )
            val groupId = call.parameters["groupId"]?.toInt() ?: return@put call.respondText(
                "Missing or malformed groupId",
                status = HttpStatusCode.BadRequest
            )
            try {
                transaction {
                    GroupEntity[groupId]
                    UserEntity[userId].groupId = groupId
                }
                users = getUsersDB()
                call.respond(HttpStatusCode.Accepted)
            } catch (e: Throwable) {
                call.respondText("${e.message}", status = HttpStatusCode.BadRequest)
            }
        }
        post { // return id of a new user or existing one
            try {
                val user = call.receive<User>()
                println("----------------------DEBUG-GET-USER----------------------")
                println(format.encodeToString(user))
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
                users.add(
                    User(
                        id = id.value,
                        name = user.name,
                        email = user.email,
                        groupId = 0,
                        role = UserRole.Student
                    )
                )
                call.respondText("$id", status = HttpStatusCode.Created)

            } catch (e: Throwable) {
                println("----------------------DEBUG-GET-USER----------------------")
                println(e.message.toString())
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