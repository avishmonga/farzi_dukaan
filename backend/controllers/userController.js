const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

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

    const token = user.getJWTToken()

    res.status(201).send({
      success: true,
      token,
    });
  } catch (err) {
    return next(new ErrorHandler(err), 500);
  }
};
