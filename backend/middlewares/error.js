const ErrorHandler = require("../utils/errorHandler")

module.exports = (err,req,res,next)=>{

    err.statuscode = err.statuscode || 500
    err.message = err.message || "Something Went Wrong"

     res.status(err.statuscode).send({
         success:false,
         error:err.message
     })

}