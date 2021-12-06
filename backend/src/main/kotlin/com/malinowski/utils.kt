package com.malinowski

import kotlinx.serialization.json.Json

val format = Json {
    isLenient = true
    encodeDefaults = true
    prettyPrint = true
}