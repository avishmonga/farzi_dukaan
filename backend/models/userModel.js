const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const userScheama = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Your Name"],
  },
  email: {
    type: String,
    unique:true,
    required: [true, "Enter your Email Add"],
    validate: [validator.isEmail, "Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Enter an  Password"],
    minlength: [8, "password should be equal or greater than 8 charachters"],
    select: false,
  },
  profilePic: {
    publicId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role:{
      type:String,
      default:"user"
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date
});

userScheama.pre("save",async function(next){
  if(!this.isModified("password")){
    next()
  }
  this.password = await bcrypt.hash(this.password,10)
})

userScheama.methods.getJWTToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_KEY)
}


module.exports = mongoose.model("user",userScheama)
