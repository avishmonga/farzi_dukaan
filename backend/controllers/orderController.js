const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

exports.createNewOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).send({ success: true, order });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

//get Single Order

exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new ErrorHandler("Order not Found With this Account", 404));
    }

    res.status(200).send({ success: true, order });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//My orders

exports.myOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user._id });

    res.status(200).send({ success: true, order });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//allOrders --admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((e) => {
      totalAmount += e.totalPrice;
    });

    res.status(200).send({ success: true, orders, totalAmount });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//update Order --admin
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not Found With this Account", 404));
      }


    if (order.orderStatus == "Delivered") {
      return next(new ErrorHandler("You Have Already Delivered This Project",400));
    }

    order.orderItems.forEach(async(e)=>{
        await updateStock(e.product,e.quantity)
    })

    order.orderStatus = req.body.status

    if(req.body.status=="Delivered"){
        order.deliveredAt = Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).send({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//delete Order --admin
exports.deleteOrder = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
  
      if (!order) {
        return next(new ErrorHandler("Order not Found With this Account", 404));
      }

      await order.remove()
  
      res.status(200).send({ success: true, });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  };




//updateStock function 

async function updateStock(id,quantity){

    try {
        const product = await Product.findById(id)
        product.stock -= quantity
        await product.save({validateBeforeSave:false})
    } catch (error) {
        
    }

}