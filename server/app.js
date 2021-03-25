// Modules
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const keys = require("./config/keys")

const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const chalk = require("chalk")

const passport = require("passport")

// Routes
const analytics = require("./routes/analytics")
const auth = require("./routes/auth")
const category = require("./routes/category")
const order = require("./routes/order")
const position = require("./routes/position")



mongoose.connect(keys.mongoURI)
    .then (() => {console.log(chalk.green("MongoDB connected."))})
    .catch(error => console.log(chalk.red(error)))

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(morgan("dev"))

// Get json from request
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

// Use routes
app.use("/api/analytics", analytics)
app.use("/api/auth", auth)
app.use("/api/category", category)
app.use("/api/order", order)
app.use("/api/position", position)



module.exports = app