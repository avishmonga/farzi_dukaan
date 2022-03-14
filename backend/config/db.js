const mongoose = require("mongoose")
require("dotenv").config()
module.exports = ()=>{
    try{
        mongoose.connect(process.env.DBURL)

    }
    catch { 
        console.log("problem in DB")
    }
    
}