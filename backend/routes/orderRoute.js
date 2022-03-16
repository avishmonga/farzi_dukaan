const express = require("express");
const {
  createNewOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuth, roles } = require("../middlewares/auth");

const router = express.Router();

router.route("/order/new").post(isAuth, createNewOrder);
router.route("/order/:id").get(isAuth, getSingleOrder);
router.route("/orders/me").get(isAuth, myOrders);
router.route("/admin/orders").get(isAuth, roles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .patch(isAuth, roles("admin"), updateOrder)
  .delete(isAuth, roles("admin"), deleteOrder);
module.exports = router;
