const express = require("express")
const {getallproducts,createProduct, updateProduct, deleteProduct, getProductDetails} = require("../controllers/productController")
const router = express.Router()

router.route("/products").get(getallproducts)
router.route("/product/new").post(createProduct)
router.route("/product/:id").get(getProductDetails)
router.route("/product/update/:id").patch(updateProduct)
router.route("/product/delete/:id").delete(deleteProduct)

module.exports = router