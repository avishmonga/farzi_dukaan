const app = require("./app")
const connect = require("./config/db")
const cloudinary = require("cloudinary")
require('dotenv').config() //dotenv
app.listen(process.env.PORT,async()=>{
    try{

        await connect()
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
        console.log(`server is running on ${process.env.PORT}`)

    }
    catch{
        console.log("Something went Wrong Port || DB")
    }
   
})