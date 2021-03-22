const express = require('express')
const app = express()

const analytics = require("./routes/analytics")
const auth = require("./routes/auth")
const category = require("./routes/category")
const order = require("./routes/order")
const position = require("./routes/position")

app.use("/api/analytics", analytics)
app.use("/api/auth", auth)
app.use("/api/category", category)
app.use("/api/order", order)
app.use("/api/position", position)


module.exports = app