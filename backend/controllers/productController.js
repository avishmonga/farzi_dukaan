const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeature = require("../utils/apiFeatures");
//getallProducts
exports.getallproducts = async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeature(Product.find(), req.query)
      .search()
      .filter()
      .pagination(8);
    const products = await apiFeature.query;

    res.status(200).send({ success:true, products, productsCount });
  } catch {
    console.log("Something Went Wrong getProduct");
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

//getProductDetail

exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product is not Listed", 404));
    }

    res.status(201).send(product);
  } catch {
    console.log("Something Went Wrong getProduct");
    return next(new ErrorHandler("Something went Wrong", 500));
  }
};

//Post --admin

exports.createProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).send({
      success: true,
      product,
    });
  } catch (err) {
    console.log("Something Went Wrong postProduct");
    return next(new ErrorHandler(err, 500));
  }
};

//patch --admin

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product is not Listed", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).send(product);
  } catch (err) {
    console.log("Something Went Wrong patchProduct");
    return next(new ErrorHandler(err, 500));
  }
};

//delete Product --admin

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product is not Listed", 404));
    }

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).send({ message: "Product has been Deleted" });
  } catch (err) {
    console.log("Something Went Wrong delProduct");
    return next(new ErrorHandler(err, 500));
  }
};
//add and Update Reviews
exports.createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user.id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    //checking user already reviewed that product or Not
    const isReviewd = product.reviews.find(
      (review) => review.user.toString() == req.user._id
    );

    if (isReviewd) {
      product.reviews.forEach((review) => {
        if (review.user.toString() == req.user._id) {
          (review.rating = rating), (review.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((e) => {
      avg += e.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).send({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};
//get all reviews

exports.getAllReviews = async (req, res, next) => {
  try {
    const product =await Product.findById(req.query.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }


    res.status(200).send({ success: true, reviews: product.reviews });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//delete Review

exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    const reviews = product.reviews.filter(
      (review) => review._id.toString() != req.query.id.toString()
    );

    //update Ratings again

    let avg = 0;
    reviews.forEach((e) => {
      avg += e.rating;
    });
    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {reviews, 
      ratings,
      numOfReviews},{
        new:true,
        runValidators:true,
        useFindAndModify:false
      }
    );

    res.status(200).send({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};
