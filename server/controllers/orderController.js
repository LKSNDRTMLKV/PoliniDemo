import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import messageHandler from "../utils/messageHandler.js";
import successHandler from "../utils/successHandler.js";

const {
    ORDER_CREATE,
    ORDERS_LENGTH,
    ORDERS_NONE,
    ORDER_FOUND,
    ORDER_NOT_FOUND,
    ORDER_DELIVERED,
    ORDER_UPDATE,
    ORDER_DELETE
} = messageHandler.orderMessages;


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

    successHandler(res, 201, order, ORDER_CREATE);
});
//Get All Orders --User
const getUserOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new ErrorHandler(ORDERS_NONE, 400));
    }

    successHandler(res, 200, orders, ORDERS_LENGTH(orders.length));
});

//Get All Orders --Admin
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice);

    successHandler(res, 200, { orders, totalAmount }, ORDERS_LENGTH(orders.length));
});

//Get Order 
const getOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler(ORDER_NOT_FOUND(req.params.id), 404));
    }

    successHandler(res, 200, order, ORDER_FOUND)
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;
    await product.save({ validateBeforeSave: false })
};


//Update Order Status --Admin
const updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(ORDER_NOT_FOUND(req.params.id), 404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler(ORDER_DELIVERED, 400));
    }

    order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false })

    successHandler(res, 200, order, ORDER_UPDATE);
});


//Delete Order --Admin
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(new ErrorHandler(ORDER_NOT_FOUND(req.params.id), 404));
    }

    successHandler(res,200, order, ORDER_DELETE);
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