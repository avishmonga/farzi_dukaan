const ErrorHandler = require("../utils/errorHandler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
exports.isAuth  = async(req,res,next)=>{
    try{
        const {token}  = req.cookies
        console.log("token",token)
        if(!token){
            return next( new ErrorHandler("please Sign In",401))
        }

        const decode = jwt.verify(token,process.env.JWT_KEY)

        req.user = await User.findById(decode.id)
        next()

    }catch(err){
        return next( new ErrorHandler(err,401))
    }
}

exports.roles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} is not allowed to access this`,403))
        }
        next()
    }
}