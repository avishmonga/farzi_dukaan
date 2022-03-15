const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeature = require("../utils/apiFeatures")
//getallProducts
exports.getallproducts = async (req, res) => {
  try {
      const totalProducts = await Product.countDocuments()
      const apiFeature = new ApiFeature(Product.find(),req.query).search().filter()
      .pagination(5)
    const products = await apiFeature.query;

    res.status(200).send({products,totalProducts});
  } catch {
    console.log("Something Went Wrong getProduct");
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

//getProductDetail

exports.getProductDetails = async (req, res,next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product is not Listed",404))
    }

    res.status(201).send(product);
  } catch {
    console.log("Something Went Wrong getProduct");
    return next(new ErrorHandler("Something went Wrong",500))
  }
};

//Post --admin

exports.createProduct = async (req, res,next) => {
  try {
    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).send({
      success: true,
      product,
    });
  } catch (err){
    console.log("Something Went Wrong postProduct");
    return next(new ErrorHandler(err,500))
  }
};

//patch --admin

exports.updateProduct = async (req, res,next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product is not Listed",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).send(product);
  } catch (err){
    console.log("Something Went Wrong patchProduct");
    return next(new ErrorHandler(err,500))
  }
};

//delete Product --admin

exports.deleteProduct = async (req, res,next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product is not Listed",404))
    }

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Product has been Deleted" });
  } catch (err){
    console.log("Something Went Wrong delProduct");
    return next(new ErrorHandler(err,500))
  }
};
