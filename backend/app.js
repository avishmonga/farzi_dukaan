const express = require("express")
const cookieParser = require("cookie-parser")
const productRoute  = require("./routes/productRoute")
const app = express()
const errorMiddleware = require("./middlewares/error")
const userRoute = require("./routes/userRoute")
app.use(express.json())
app.use(cookieParser())

app.use("/",productRoute)
app.use("/",userRoute)
app.use(errorMiddleware)
module.exports = app