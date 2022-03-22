const express = require("express");
const cookieParser = require("cookie-parser");
const productRoute = require("./routes/productRoute");
const app = express();
const errorMiddleware = require("./middlewares/error");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

app.use("/api/", productRoute);
app.use("/api/", userRoute);
app.use("/api/", orderRoute);

app.use(errorMiddleware);
module.exports = app;
