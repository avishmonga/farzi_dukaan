const express = require("express")
const productRoute  = require("./routes/productRoute")
const app = express()
const errorMiddleware = require("./middlewares/error")

app.use(express.json())

app.use("/",productRoute)
app.use(errorMiddleware)
module.exports = app