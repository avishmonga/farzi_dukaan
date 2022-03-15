const express = require("express")
const {getallproducts,createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController")
const {isAuth, roles} = require("../middlewares/auth")
const router = express.Router()

router.route("/products").get(  getallproducts)
router.route("/product/new").post(isAuth,roles("admin"),createProduct)
router.route("/product/:id").get(getProductDetails)
router.route("/product/update/:id").patch(isAuth,updateProduct)
router.route("/product/delete/:id").delete(isAuth,deleteProduct)

module.exports = router