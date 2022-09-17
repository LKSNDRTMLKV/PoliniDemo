import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";


//Create Order
const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order
    })

});
//Get All Orders --User
const getUserOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    // if(!orders) {
    //     return next(new ErrorHandler("You have no orders", 400));
    // }
  
    res.status(200).json({
      success: true,
      orders,
    });
  });

//Get All Orders --Admin
const getAllOrders = catchAsyncErrors(async (req, res, next ) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => totalAmount+=order.totalPrice);

    res.status(200).json({
        success: true,
        message:`There are currently ${orders.length} orders`,
        totalAmount,
        orders
    })
});

//Get Order 
const getOrder = catchAsyncErrors(async (req, res, next ) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(!order) {
        return next(new ErrorHandler("Order not found with this id",404));
    }
    res.status(200).json({
        success: true,
        order,
    });
})

//Update Order Status --Admin
const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === "Delivered") {
        return next(new ErrorHandler("This order has been delivered",400));
    }

    order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false})

    res.status(200).json({
        success: true,
        order
    })
});

async function updateStock(id,quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;
    await product.save({validateBeforeSave: false})
};

//Delete Order --Admin
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if(!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
        success: true,
    })
});


const orderController = {
newOrder,
getUserOrders,
getAllOrders,
getOrder,
updateOrder,
deleteOrder,
};

export default orderController;