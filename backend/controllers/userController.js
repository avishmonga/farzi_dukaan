const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary")

//SignUP
exports.createUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale"
    })
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      profilePic: {
        publicId: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendToken(user, 201, res);
  } catch (err) {
    console.log("err",err)
    return next(new ErrorHandler(err), 500);
  }
};

//SignIN

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //user and pass is there or not
    if (!email || !password) {
      return next(new ErrorHandler("Enter Email and Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    //is user is available in database
    if (!user) {
      // if not return invalid email
      console.log("bakend se gya")
      return next(new ErrorHandler("Invlaid Email", 401));
    }

    //password is matched?
    const isPass = await user.comparePass(password);
    console.log(isPass);
    if (!isPass) {
      return next(new ErrorHandler("Invlaid Email or Password", 401));
    }

    //send Token
    sendToken(user, 200, res);
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

//SignOUT

exports.signOutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.status(200).send({ message: "Sign Out" });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

//getUserDetails

exports.getUserDetails = async (req, res, next) => {
  try {
    const userDetail = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      userDetail,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//updateProfile

exports.updateProfile = async (req,res,next) =>{
  try {

    const newUserData = {
      name:req.body.name,
      email:req.body.email
    }

    if(req.user.profilePic!=""){
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
        })
        newUserData.profilePic={
          publicId:myCloud.public_id,
          url:myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    })

    if(!user){
      return next(new ErrorHandler("User Not Found",500))
    }

    res.status(200).send({success:true})

    
  } catch (error) {
    return next(new ErrorHandler(error,500))
  }
}

//getAllUsers --admin

exports.getAllUsers = async (req,res,next)=>{
  try {
    const users = await User.find()

    res.status(200).send({
      success:true,
      users
    })
    
  } catch (error) {
    return next(new ErrorHandler(error,500))
  }
}

//getAny user Detail --admin

exports.getAnyUserDetails = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      return next(new ErrorHandler("user doesnot exist"))
    }
    res.status(200).send({
      success:true,
      user
    })
  } catch (error) {
    return next(new ErrorHandler(error,500))
  }
}

//updateRole
exports.updateRole = async (req,res,next) =>{
  try {

    const newUserData = {
      name:req.body.name,
      email:req.body.email,
      role:req.body.role
    }

    //we will add Cloudinary later

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    })
    if(!user){
      return next(new ErrorHandler("User Not Found",500))
    }

    res.status(200).send({success:true})

    
  } catch (error) {
    return next(new ErrorHandler(error,500))
  }
}

//deleteUser --admin
exports.deleteUser = async (req,res,next) =>{
  try {

   const user = await User.findById(req.params.id)
    
    if(!user){
      return next(new ErrorHandler("User Not Found",500))
    }
    //we will remove Cloudinary later
    await user.remove()

    res.status(200).send({success:true})

    
  } catch (error) {
    return next(new ErrorHandler(error,500))
  }
}


//Forgot

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("User not found check Your Email", 404));
    }
    //Get forgot tokken from method
    const resetToken = await user.getForgotPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;

    const message = `Hi Avish here from FarziDukaan your To Reset Password click link below \n\n ${resetPasswordUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: `FarziDukaan Pasword Recovery`,
        message,
      });

      res.status(200).send({
        success: true,
        message: `Email sent to ${user.email} sucessfully confirm within 15 mins`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      next(new ErrorHandler(error, 500));
    }
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};

//reset password

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log("user", user);

    if (!user) {
      return next(
        new ErrorHandler("Token Expired or Invalid please re-generate", 404)
      );
    }

    if (req.body.password != req.body.confirmpassword) {
      return next(new ErrorHandler("PassWord should be Matched", 404));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
};
//update Password
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const isPass = await user.comparePass(req.body.oldPassword);
    if (!isPass) {
      return next(new ErrorHandler("old password is incorrect", 401));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
      return next(new ErrorHandler("PassWord should be Matched", 404));
    }

    user.password = req.body.newPassword
    await user.save()

    sendToken(user,200,res)


    
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};