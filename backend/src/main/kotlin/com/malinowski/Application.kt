package com.malinowski

import com.malinowski.models.UserTable
import com.malinowski.models.toUsers
import com.malinowski.models.users
import com.malinowski.plugins.configureRouting
import com.malinowski.routes.registerEventRoutes
import com.malinowski.routes.registerGroupsRoutes
import com.malinowski.routes.registerLocationRoutes
import com.malinowski.routes.registerUserRoutes
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.serialization.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module()
    }.start(wait = true)
}

fun Application.module(testing: Boolean = true) {
    install(ContentNegotiation) {
        json()
    }
    configureRouting()
    registerUserRoutes()
    registerLocationRoutes()
    registerEventRoutes()
    registerGroupsRoutes()
    test()
}

val db by lazy {
    Database.connect("jdbc:postgresql://localhost:5432/test_db", driver = "org.postgresql.Driver", user = "malinowski")
}

fun test() {
    db
    transaction {
        // print sql to std-out
        addLogger(StdOutSqlLogger)
        SchemaUtils.create(UserTable)

        // 'select *' SQL: SELECT Cities.id, Cities.name FROM Cities
        users.addAll(UserTable.selectAll().toUsers())
    }
}

object Cities : IntIdTable() {
    val name = varchar("name", 50)
}
