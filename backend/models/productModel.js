const mongoose = require("mongoose");

const productScheama = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Enter Price Of Product"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: [
    {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ], //image contain array of Objects  because 1 product can have multiple images

  category: {
    type: String,
    required: [true, "Enter Product Category"],
  },
  stock: {
    type: Number,
    require: [true, "Enter Stock Of Product"],
    default:1
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [{
      name:{
          type:String,
          required:true
      },
      rating:{
          type:Number,
          required:true,
      },
      comment:{
          type:String,
          required:true
      }
  }],
  createdAt:{
      type:Date,
      default:Date.now
  }
});

module.exports = mongoose.model("product",productScheama)