const express = require("express");
const { createUser, loginUser, signOutUser, forgotPassword } = require("../controllers/userController");

const router = express.Router()

router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/logout").get(signOutUser)
router.route("/password/forgot").post(forgotPassword)



module.exports = router