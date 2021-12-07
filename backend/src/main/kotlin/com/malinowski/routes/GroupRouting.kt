package com.malinowski.routes

import com.malinowski.format
import com.malinowski.models.Group
import com.malinowski.models.GroupEntity
import com.malinowski.models.toGroups
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.encodeToString
import org.jetbrains.exposed.sql.transactions.transaction

val groups by lazy {
    transaction {
        GroupEntity.all().toGroups().toMutableList()
    }
}

fun Route.groupRouting() {
    route("/group") {
        get {
            call.respondText(format.encodeToString(groups), status = HttpStatusCode.Accepted)
        }
        get("{id}") {
            val id = call.parameters["id"]?.toInt() ?: return@get call.respondText(
                "Missing or malformed id",
                status = HttpStatusCode.BadRequest
            )
            if (id >= groups.size)
                call.respondText("unknown id", status = HttpStatusCode.BadRequest)
            else
                call.respondText("\n${groups[id]}", status = HttpStatusCode.Accepted)
        }
        post {
            try {
                val group = call.receive<Group>()
                groups.add(group)
                val id = transaction {
                    GroupEntity.new {
                        name = group.name
                    }.id
                }
                call.respondText("Group stored correctly ID = $id", status = HttpStatusCode.Created)
            } catch (e: Throwable) {
                call.respondText("${e.message}", status = HttpStatusCode.BadRequest)
            }
        }

    }
}

fun Application.registerGroupsRoutes() {
    routing {
        groupRouting()
    }
}