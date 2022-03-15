const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail")
//SignUP
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      profilePic: {
        publicId: "sampleID",
        url: "sampleURL",
      },
    });

    sendToken(user, 201, res);
  } catch (err) {
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

    const resetPasswordUrl =  `${req.protocol}://${req.get(
      "host"
    )}/passwod/reset/${resetToken}`;

    const message = `Hi Avish here from FarziDukaan your To Reset Password click link below \n\n ${resetPasswordUrl}`


    try {

      await sendEmail({
        email : user.email,
       subject:`FarziDukaan Pasword Recovery`,
       message 
      })

      res.status(200).send({
        success:true,
        message:`Email sent to ${user.email} sucessfully confirm within 15 mins`
      })
      
    } catch (error) {
      user.resetPasswordToken  = undefined
      user.resetPasswordExpire = undefined
      await user.save({ validateBeforeSave: false });

      next(new ErrorHandler(error,500))
    }


  } catch (error) {
    next(new ErrorHandler(error,500))
  }
};
