//creating token and saving in cookie

require("dotenv").config()
const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 3600 * 1000
        ),
        httpOnly:true
    }
    res.status(statusCode).cookie("token",token,options).send({token,user})
}

module.exports = sendToken