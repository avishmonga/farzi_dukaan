const express = require("express");
const {
  createUser,
  loginUser,
  signOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getAnyUserDetails,
  updateRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuth, roles } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(signOutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").patch(resetPassword);
router.route("/me").get(isAuth, getUserDetails);
router.route("/password/update").patch(isAuth, updatePassword);
router.route("/me/update").patch(isAuth, updateProfile);
router.route("/admin/users").get(isAuth, roles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuth, roles("admin"), getAnyUserDetails)
  .patch(isAuth, roles("admin"), updateRole)
  .delete(isAuth, roles("admin"), deleteUser);

module.exports = router;
