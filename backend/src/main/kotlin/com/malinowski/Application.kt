package com.malinowski

import com.malinowski.models.GroupTable
import com.malinowski.models.UserTable
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
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        module()
    }.start(wait = true)
}

fun Application.module(testing: Boolean = true) {
    initDB()
    install(ContentNegotiation) {
        json()
    }
    configureRouting()
    registerUserRoutes()
    registerLocationRoutes()
    registerEventRoutes()
    registerGroupsRoutes()
}

fun initDB() {
    Database.connect(
        url = "jdbc:postgresql://localhost:5432/test_db",
        driver = "org.postgresql.Driver",
        user = "malinowski",
        password = ""
    )
    transaction {
        addLogger(StdOutSqlLogger)
        SchemaUtils.create(UserTable)
        SchemaUtils.create(GroupTable)
    }
}
