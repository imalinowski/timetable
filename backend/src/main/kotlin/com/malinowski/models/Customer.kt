package com.jetbrains.handson.httpapi.models

import kotlinx.serialization.Serializable

val customerStorage = mutableListOf<Customer>(
    Customer("1","abc"),
    Customer("2","bcd"),
    Customer("3","cde"),
    Customer("4","def"),
    Customer("5","efg"),
)

@Serializable
data class Customer(val id: String, val name: String)