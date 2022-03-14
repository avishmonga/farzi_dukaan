const app = require("./app")
const connect = require("./config/db")
require('dotenv').config() //dotenv
app.listen(process.env.PORT,async()=>{
    try{

        await connect()
        console.log(`server is running on ${process.env.PORT}`)

    }
    catch{
        console.log("Something went Wrong Port || DB")
    }
   
})